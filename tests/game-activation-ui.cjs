const { app, BrowserWindow } = require("electron");
const assert = require("node:assert/strict");
const path = require("node:path");

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, width: 1440, height: 900, webPreferences: {
    partition: `activation-${Date.now()}`, backgroundThrottling: false,
  } });
  try {
    await win.loadFile(path.join(__dirname, "..", "index.html"));
    const run = (code) => win.webContents.executeJavaScript(code, true);
    await win.webContents.insertCSS('* { transition: none !important; animation: none !important; scroll-behavior: auto !important; }');
    await run(`skipBoot(); state.settings.boot = false; setSoundEnabled(false);
      window.mouseLaunches = []; launchSelectedGame = async () => { window.mouseLaunches.push(state.selectedId); };
      applyTheme('fsb'); renderGames();`);
    const settle = () => new Promise(resolve => setTimeout(resolve, 150));
    await settle();
    const point = await run(`(() => {
      const card = elements.gameRail.querySelector('.game-card');
      const rect = card.getBoundingClientRect();
      return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
    })()`);
    win.webContents.sendInputEvent({ type: 'mouseMove', ...point });
    await settle();
    win.webContents.sendInputEvent({ type: 'mouseDown', button: 'left', clickCount: 1, ...point });
    win.webContents.sendInputEvent({ type: 'mouseUp', button: 'left', clickCount: 1, ...point });
    await settle();
    assert.equal(await run('window.mouseLaunches.length'), 1, 'Native mouse click must launch a cover');
    win.webContents.sendInputEvent({ type: 'mouseDown', button: 'left', clickCount: 1, ...point });
    win.webContents.sendInputEvent({ type: 'mouseMove', x: point.x + 40, y: point.y });
    win.webContents.sendInputEvent({ type: 'mouseUp', button: 'left', clickCount: 1, x: point.x + 40, y: point.y });
    await settle();
    assert.equal(await run('window.mouseLaunches.length'), 1, 'Native mouse drag must not launch a cover');
    await run('new Promise(resolve => setTimeout(resolve, 0))');
    assert.equal(await run('railDrag.active || railDrag.suppressClick'), false, 'Drag state must reset after release');
    const results = await win.webContents.executeJavaScript(`(() => {
      skipBoot(); state.settings.boot = false; setSoundEnabled(false);
      const launches = [];
      launchSelectedGame = async () => { launches.push(state.selectedId); };
      return Object.keys(THEMES).map(theme => {
        state.settings.theme = theme;
        renderGames();
        const cards = [...elements.gameRail.querySelectorAll('.game-card')];
        const first = cards[0], second = cards[1];
        const start = launches.length;
        first.dispatchEvent(new MouseEvent('mouseenter'));
        first.focus();
        const navigationOnly = launches.length === start;
        state.selectedId = first.dataset.gameId;
        second.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
        const clicked = launches.at(-1) === second.dataset.gameId && launches.length === start + 1;
        second.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 2 }));
        second.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, detail: 2 }));
        const doubleClickSafe = launches.length === start + 1;
        first.focus(); activateFocused();
        const controller = launches.at(-1) === first.dataset.gameId && launches.length === start + 2;
        for (const key of ['Enter', ' ']) {
          first.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        }
        const keyboard = launches.length === start + 4;
        first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', repeat: true, bubbles: true }));
        railDrag.suppressClick = true;
        second.click();
        railDrag.suppressClick = false;
        const suppressed = launches.length === start + 4;
        return { theme, navigationOnly, clicked, doubleClickSafe, controller, keyboard, suppressed };
      });
    })()`, true);
    for (const result of results) {
      for (const [check, passed] of Object.entries(result)) {
        if (check !== "theme") assert.equal(passed, true, `${result.theme}: ${check}`);
      }
    }
    console.log(`PASS mouse, controller activation, keyboard and drag/double-click suppression across ${results.length} themes.`);
    win.destroy(); app.exit(0);
  } catch (error) {
    console.error(error); win.destroy(); app.exit(1);
  }
});
