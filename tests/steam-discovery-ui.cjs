const { app, BrowserWindow, ipcMain } = require("electron");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const { discoverLocalGames } = require("../electron/local-discovery.cjs");
const { reconcileSources } = require("../steam-library.js");
const profile = require("node:fs").mkdtempSync(path.join(os.tmpdir(), "fsb-steam-ui-"));
app.setPath("userData", profile);

app.whenReady().then(async () => {
  const reports = await discoverLocalGames();
  let response = { ok: true, reports };
  const installedGames = reconcileSources([], reports);
  let launched;
  let scanCount = 0;
  ipcMain.handle("launcher:discover-local", (_event, _games, sources) => {
    scanCount += 1;
    return response.reports ? { ...response, reports: Object.fromEntries(Object.entries(response.reports).filter(([source]) => sources.includes(source))) } : response;
  });
  ipcMain.handle("launcher:get-fullscreen", () => false);
  ipcMain.handle("launcher:get-auto-start", () => ({ ok: true, supported: true, enabled: false }));
  ipcMain.handle("launcher:launch", (_event, target) => { launched = target; return { ok: true }; });
  ipcMain.handle("launcher:launch-discovered", (_event, source, externalId) => {
    launched = installedGames.find((game) => game.source === source && game.externalId === externalId)?.path;
    return { ok: Boolean(launched) };
  });
  const win = new BrowserWindow({ show: false, width: 1440, height: 900, webPreferences: {
    preload: path.join(__dirname, "../electron/preload.cjs"), contextIsolation: true,
    nodeIntegration: false, sandbox: true, backgroundThrottling: false, offscreen: true,
  } });
  const run = (code) => win.webContents.executeJavaScript(code, true);
  const errors = [];
  win.webContents.on("console-message", (event) => { if (event.level === "error") errors.push(event.message); });
  try {
    await win.loadFile(path.join(__dirname, "../index.html"));
    await run("skipBoot(); state.settings.boot = false; setSoundEnabled(false);");
    assert.equal(scanCount, 0, "Startup must not scan installed games.");
    await run("window.dispatchEvent(new Event('focus'));");
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(scanCount, 0, "Window focus must not scan installed games.");
    await run("elements.refreshSteamButton.click();");
    await run("(async () => { while (steamDiscoveryBusy) await new Promise(r => setTimeout(r, 20)); })()");
    assert.equal(await run("state.games.length"), installedGames.length);
    assert.equal(scanCount, 1, "The import button must trigger one scan.");
    await run("openSettingsPanel('system');");
    await new Promise((resolve) => setTimeout(resolve, 500));
    await run("elements.importLauncher.focus(); activateFocused();");
    assert.equal(await run("elements.importLauncher.value"), "steam");
    assert.equal(scanCount, 1, "Choosing a launcher must not trigger an import.");
    const otherGames = await run("JSON.stringify(state.games.filter(game => game.source !== 'steam'))");
    await run("elements.importLauncher.value = 'steam'; elements.importLauncher.dispatchEvent(new Event('change')); elements.refreshSteamButton.click();");
    await run("(async () => { while (steamDiscoveryBusy) await new Promise(r => setTimeout(r, 20)); })()");
    assert.equal(await run("JSON.stringify(state.games.filter(game => game.source !== 'steam'))"), otherGames);
    assert.equal(await run("state.settings.importLauncher"), "steam");
    await run("elements.importLauncher.value = 'all';");
    assert.ok(installedGames.length > 0, "Expected real installed games for this local smoke test.");
    const first = installedGames[0];
    await run(`state.selectedId = ${JSON.stringify(first.id)}; launchSelectedGame();`);
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(launched, first.path);
    await run("(async () => { state.games[0].title = 'Custom Steam title'; state.games[0].cover = ''; await refreshSteamGames(true); })()");
    assert.equal(await run("state.games[0].title"), "Custom Steam title");
    for (const theme of await run("Object.keys(THEMES)")) {
      await run(`closeOverlays(); applyThemeNow(${JSON.stringify(theme)}); openSettingsPanel('system', { xbox360Detail: true });
        elements.refreshSteamButton.scrollIntoView({ block: 'center', behavior: 'instant' }); elements.refreshSteamButton.focus();`);
      await new Promise((resolve) => setTimeout(resolve, 400));
      await run("focusWithoutScroll(elements.refreshSteamButton); elements.refreshSteamButton.scrollIntoView({ block: 'center', behavior: 'instant' });");
      win.webContents.invalidate();
      await new Promise((resolve) => setTimeout(resolve, 400));
      assert.equal(await run("elements.refreshSteamButton.checkVisibility() && isControllerFocusable(elements.refreshSteamButton) && !elements.refreshSteamButton.disabled"), true, theme);
      assert.equal(await run("[elements.importLauncher, elements.restoreRemovedToggle].every(control => control.checkVisibility() && isControllerFocusable(control) && !control.disabled)"), true, `${theme}: import options unavailable`);
      assert.equal(await run(`(() => { const b = elements.refreshSteamButton; const r = b.getBoundingClientRect();
        return b.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); })()`), true, theme);
      if (theme === "fsb") {
        win.webContents.invalidate();
        await new Promise((resolve) => setTimeout(resolve, 300));
        await fs.writeFile(path.join(profile, "steam-settings.png"), (await win.webContents.capturePage()).toPNG());
      }
    }
    await run(`(async () => { closeOverlays(); state.deleteTargetId = ${JSON.stringify(first.id)}; confirmDeleteGame(); await refreshSteamGames(true); })()`);
    assert.equal(await run(`state.games.some(g => g.id === ${JSON.stringify(first.id)})`), false);
    await run("elements.restoreRemovedToggle.click(); elements.refreshSteamButton.click();");
    await run("(async () => { while (steamDiscoveryBusy) await new Promise(r => setTimeout(r, 20)); })()");
    assert.equal(await run(`state.games.some(g => g.id === ${JSON.stringify(first.id)})`), true);
    const beforeFailure = await run("JSON.stringify(state.games)");
    response = { ok: false, error: "Test scan unavailable" };
    await run("refreshSteamGames(true)");
    assert.equal(await run("JSON.stringify(state.games)"), beforeFailure);
    response = { ok: true, reports: Object.fromEntries(Object.keys(reports).map((source) => [source, { ok: true, games: [], warnings: [], unavailableLibraries: [] }])) };
    await run("refreshSteamGames(true)");
    assert.equal(await run("state.games.length"), 0);
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(`PASS real discovery (${installedGames.length} games), launch bridge, edits, all themes, hidden games, scan failure and uninstall refresh. Screenshot: ${path.join(profile, "steam-settings.png")}`);
  } catch (error) {
    win.webContents.invalidate();
    await new Promise((resolve) => setTimeout(resolve, 200));
    await fs.writeFile(path.join(profile, "failure.png"), (await win.webContents.capturePage()).toPNG());
    console.log("Failure screenshot", path.join(profile, "failure.png"));
    console.log(await run(`(() => { const b = elements.refreshSteamButton; const r = b.getBoundingClientRect();
      return { theme: state.settings.theme, rect: r.toJSON(), hit: document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.id, scroll: elements.settingsPanel.scrollTop }; })()`));
    console.error(error);
    process.exitCode = 1;
  } finally {
    win.destroy();
    app.exit(process.exitCode || 0);
  }
});
