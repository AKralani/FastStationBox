// Verify the actual renderer in an isolated profile without opening a window.
const { app, BrowserWindow } = require("electron");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const profile = require("node:fs").mkdtempSync(path.join(os.tmpdir(), "fsb-xboxseries-test-"));
app.setPath("userData", profile);

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, width: 1440, height: 900,
    webPreferences: { partition: `xboxseries-${Date.now()}`, backgroundThrottling: false, offscreen: true } });
  const run = (code) => win.webContents.executeJavaScript(code, true);
  const settle = () => new Promise((resolve) => setTimeout(resolve, 450));
  const errors = [];
  win.webContents.on("console-message", (event) => {
    if (event.level === "error" && !event.message.includes("Autofill")) errors.push(event.message);
  });
  const reachable = (selector) => run(`(() => {
    const button = document.querySelector(${JSON.stringify(selector)});
    const rect = button.getBoundingClientRect();
    return isControllerFocusable(button) && button.checkVisibility() &&
      button.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
  })()`);
  const capture = async (name) => {
    await settle();
    await fs.writeFile(path.join(profile, name), (await win.webContents.capturePage()).toPNG());
  };
  try {
    await win.loadFile(path.join(__dirname, "..", "index.html"));
    await win.webContents.insertCSS("* { transition-duration: 0s !important; animation-duration: 0s !important; scroll-behavior: auto !important; }");
    await run(`skipBoot(); state.settings.boot = false; setSoundEnabled(false);
      openSettingsPanel('theme'); document.querySelector('[data-theme="xboxseries"]').click();`);
    await settle();
    assert.equal(await run("state.settings.theme"), "xboxseries");
    assert.equal(await run("JSON.parse(localStorage.getItem(STORAGE_KEYS.settings)).theme"), "xboxseries");
    assert.equal(await run("elements.settingsPanel.classList.contains('open')"), false);
    assert.equal(await run("elements.ambientVideo.hasAttribute('src')"), false);
    assert.match(await run("uiAudio.select.getAttribute('src')"), /assets\/themes\/xboxseries\/select\.mp3/);
    assert.equal(await run(`(async () => {
      const image = new Image(); image.src = THEMES.xboxseries.assets.backgroundImage;
      await image.decode(); return image.naturalWidth > 0;
    })()`), true);
    assert.equal(await run(`(() => {
      const [first, second] = document.querySelectorAll('.game-card');
      return first.offsetWidth > second.offsetWidth * 1.9 &&
        [...document.querySelectorAll('.game-card')].every(card => card.offsetWidth === card.offsetHeight);
    })()`), true, "Home must start with the selected tile enlarged and smaller square games");
    for (const selector of ['#xboxSeriesLibraryTile', '#addGameButton', '#moreButton', '#xboxOneProfileButton', '#settingsButton', '#searchButton']) {
      assert.equal(await reachable(selector), true, `${selector} unreachable on Home`);
    }
    await capture("xboxseries-home.png");

    // Every Home tile must be able to reach the header, including enlarged middle tiles.
    const homeUpTargets = await run(`(() => {
      const header = document.querySelector('.topbar');
      return [...document.querySelectorAll('.game-card')].map(card => {
        selectGame(card.dataset.gameId, false, false); focusWithoutScroll(card); moveFocus('up');
        return { game: card.dataset.gameId, reachesHeader: header.contains(document.activeElement) };
      });
    })()`);
    assert.equal(homeUpTargets.every(result => result.reachesHeader), true, JSON.stringify(homeUpTargets));
    await run("selectGame(state.games[0].id, false, false); elements.gameRail.scrollLeft = 0;");

    // Real mouse movement must transfer the large tile without moving the pointer off it.
    for (const index of [1, 2, 0]) {
      const point = await run(`(() => {
        const rect = document.querySelectorAll('.game-card')[${index}].getBoundingClientRect();
        return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
      })()`);
      win.webContents.sendInputEvent({ type: 'mouseMove', ...point });
      await settle();
      assert.equal(await run(`(() => {
        const cards = [...document.querySelectorAll('.game-card')];
        const hovered = cards[${index}];
        return hovered.matches(':hover') && hovered.classList.contains('selected') &&
          cards.every(card => card.offsetWidth === card.offsetHeight &&
            (card === hovered || hovered.offsetWidth > card.offsetWidth * 1.9));
      })()`), true, `Hovering tile ${index} must enlarge it and shrink all other tiles`);
    }
    win.webContents.sendInputEvent({ type: 'mouseMove', x: 10, y: 10 });

    // Decode the URL actually consumed by the theme's CSS, not just the input path.
    await run("state.games[0].cover = THEMES.xboxseries.assets.logo; renderCurrentView();");
    assert.equal(await run(`(async () => {
      const card = document.querySelector('.game-card');
      const source = getComputedStyle(card, '::before').backgroundImage.match(/url\\("?([^"\\)]+)/)[1];
      const image = new Image(); image.src = source; await image.decode(); return image.naturalWidth > 0;
    })()`), true, "Relative cover art must resolve from the launcher root");
    await run("state.games[0].cover = ''; renderCurrentView();");

    // Wallpaper replaces the stripes; cover art alone must keep the fallback.
    await run("state.games[0].background = 'assets/themes/xboxone/background.png'; updateHero();");
    assert.equal(await run("getComputedStyle(elements.xboxOneBackdrop).display"), 'block');
    assert.equal(await run("getComputedStyle(document.querySelector('.ambient')).backgroundImage"), 'none');
    assert.equal(await run(`(async () => {
      const source = getComputedStyle(elements.xboxOneBackdrop).backgroundImage.match(/url\\("?([^"\\)]+)/)[1];
      const image = new Image(); image.src = source; await image.decode(); return image.naturalWidth > 0;
    })()`), true, 'Game wallpaper must load from the launcher root');
    await capture('xboxseries-wallpaper.png');
    await run("selectGame(state.games[1].id, false, false);");
    assert.equal(await run("elements.xboxOneBackdrop.classList.contains('has-artwork')"), false);
    assert.match(await run("getComputedStyle(document.querySelector('.ambient')).backgroundImage"), /background\.png/);
    await run("state.games[0].background = ''; state.games[0].cover = THEMES.xboxseries.assets.logo; selectGame(state.games[0].id, false, false);");
    assert.equal(await run("elements.xboxOneBackdrop.classList.contains('has-artwork')"), false, 'Cover art must not replace the wallpaper fallback');
    await run("state.games[0].cover = ''; renderCurrentView();");

    await run("elements.xboxOneProfileButton.click();");
    await settle();
    assert.equal(await reachable('#profileSettingsButton'), true);
    await run("moveFocus('up');");
    assert.equal(await run("elements.profilePanel.contains(document.activeElement)"), true, 'Up in the profile must stay inside the overlay');
    await run("elements.profileNameInput.value = 'Series Player'; saveProfileName(); closeOverlays();");
    assert.equal(await run("elements.xboxOneProfileName.textContent"), "Series Player");
    await run("elements.addGameButton.click();");
    await settle();
    assert.equal(await reachable('#gameTitle'), true);
    await run(`elements.gameTitle.value = 'Series test game'; elements.gamePath.value = 'C:\\Games\\test.exe'; elements.gameForm.requestSubmit();`);
    assert.equal(await run("state.games.some(game => game.title === 'Series test game')"), true);
    await run("elements.moreButton.click();");
    await settle();
    assert.equal(await run("elements.contextMenu.hidden"), false);
    await run("hideContextMenu(); elements.xboxSeriesLibraryTile.click();");
    await settle();
    assert.equal(await run("state.xboxOneScreen"), "library");
    assert.equal(await run("getComputedStyle(elements.gameRail).display"), "grid");
    assert.equal(await reachable('#sortButton'), true);
    assert.equal(await reachable('#addGameButton'), true);
    await run("elements.sortButton.click();");
    assert.equal(await run("state.settings.sort"), "title-asc");
    await run("elements.searchButton.click(); elements.searchInput.value = 'Series test'; elements.searchInput.dispatchEvent(new Event('input'));");
    assert.equal(await run("state.visibleGameIds.length"), 1);
    await run("elements.searchInput.value = 'no match'; elements.searchInput.dispatchEvent(new Event('input'));");
    assert.equal(await run("elements.gameRail.textContent.trim()"), "No games found.");
    await run("handleBackAction(); handleBackAction(); elements.searchButton.click();");
    assert.equal(await run("state.xboxOneScreen"), "library", "Search from Home must open the full library");
    await run("handleBackAction(); handleBackAction();");

    // Controller A and keyboard Enter activate the selected game exactly once.
    await run(`window.testLaunches = 0; window.realLaunch = launchSelectedGame;
      launchSelectedGame = async () => { window.testLaunches++; };
      document.querySelector('.game-card').focus(); moveFocus('right');
      window.secondCardFocused = document.activeElement === document.querySelectorAll('.game-card')[1];
      activateFocused(); document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));`);
    assert.equal(await run("window.secondCardFocused"), true);
    assert.equal(await run(`(() => {
      const [first, second] = document.querySelectorAll('.game-card');
      return second.offsetWidth > first.offsetWidth * 1.9;
    })()`), true, 'Controller navigation must enlarge the newly focused tile');
    assert.equal(await run("window.testLaunches"), 2);
    await run("launchSelectedGame = window.realLaunch; void 0;");

    await run(`state.games = normalizeGames(Array.from({ length: 48 }, (_, i) => ({
      id: 'series-' + i, title: 'Game ' + String(i + 1).padStart(2, '0'), platform: 'Xbox', accent: '#107c10'
    }))); state.settings.sort = 'library'; setXboxOneScreen('library');`);
    await settle();
    await run("document.querySelector('.game-card').focus(); moveFocus('down');");
    assert.notEqual(await run("document.activeElement.dataset.gameId"), 'series-0');
    await run("moveFocus('up');");
    assert.equal(await run("document.activeElement.dataset.gameId"), 'series-0', 'Up in the library must still navigate to the previous game row');
    await run("selectGame('series-47', true);");
    await settle();
    assert.equal(await reachable('[data-game-id="series-47"]'), true);
    assert.equal(await run("elements.uiRoot.scrollTop > 0"), true);
    await capture("xboxseries-library.png");

    await run("state.games = []; state.selectedId = null; setXboxOneScreen('home');");
    await settle();
    assert.equal(await reachable('#xboxSeriesLibraryTile'), true);
    assert.equal(await reachable('#addGameButton'), true);
    assert.equal(await run("elements.moreButton.disabled"), true);
    await run("elements.xboxSeriesLibraryTile.click();");
    await settle();
    assert.equal(await run("document.activeElement.id"), 'xboxOneLibraryBack');
    await run("handleBackAction();");
    await settle();
    assert.equal(await run("document.activeElement.id"), 'xboxSeriesLibraryTile');
    await run("state.games = normalizeGames(defaultGames); renderCurrentView();");

    for (const [width, height, size] of [[1920, 1080, 'tv'], [1280, 720, 'large'], [1024, 768, 'monitor'], [640, 720, 'large'], [800, 600, 'tv']]) {
      win.setSize(width, height);
      await run(`applyInterfaceSize(${JSON.stringify(size)}); elements.uiRoot.scrollTo(0, 0);`);
      await settle();
      assert.equal(await run(`(() => {
        const header = document.querySelector('.topbar');
        return [...document.querySelectorAll('.game-card')].every(card => {
          selectGame(card.dataset.gameId, false, false); focusWithoutScroll(card); moveFocus('up');
          return header.contains(document.activeElement);
        });
      })()`), true, `${width}/${size}: Up from every Home tile must reach the header`);
      assert.equal(await run("document.documentElement.scrollWidth <= innerWidth"), true, `${width}: horizontal overflow`);
      assert.equal(await run("elements.uiRoot.scrollHeight <= elements.uiRoot.clientHeight + 1"), true, `${width}/${size}: Home overflow`);
      assert.equal(await run("document.querySelector('.controller-hints').getBoundingClientRect().bottom <= innerHeight + 1"), true, `${width}/${size}: clipped hints`);
      for (const selector of ['#xboxSeriesLibraryTile', '#addGameButton', '#xboxOneProfileButton', '#settingsButton', '#searchButton']) {
        assert.equal(await reachable(selector), true, `${width}/${size}: ${selector} unreachable`);
      }
      await capture(`xboxseries-${width}-${size}.png`);
    }
    win.setSize(1440, 900);
    await run("applyInterfaceSize('large'); openSettingsPanel('system');");
    await settle();
    await run("moveFocus('up');");
    assert.equal(await run("elements.settingsPanel.contains(document.activeElement)"), true, 'Up in Settings must stay inside the overlay');
    await run("elements.backupLibraryButton.scrollIntoView({ block: 'center' });");
    await settle();
    assert.equal(await reachable('#backupLibraryButton'), true);
    assert.equal(await reachable('#loadLibraryButton'), true);
    await capture('xboxseries-settings.png');
    await run("closeOverlays(); applyThemeNow('fsb'); renderCurrentView();");
    assert.equal(await run("isControllerFocusable(elements.xboxSeriesLibraryTile)"), false);
    assert.equal(await run("document.documentElement.dataset.xboxoneScreen"), undefined);
    assert.equal(await run("elements.addGameButton.parentElement.classList.contains('library-actions')"), true);
    await run("applyThemeNow('xboxone'); renderCurrentView();");
    assert.equal(await run("isControllerFocusable(elements.xboxSeriesLibraryTile)"), false);
    assert.equal(await run(`document.querySelector('.game-card').offsetWidth === document.querySelectorAll('.game-card')[1].offsetWidth`), true);
    await run("applyThemeNow('xboxseries', { persist: true }); saveState();");
    const reloaded = new Promise(resolve => win.webContents.once('did-finish-load', resolve));
    win.reload();
    await reloaded;
    await run("skipBoot();");
    assert.equal(await run("state.settings.theme"), 'xboxseries');
    assert.equal(await run("state.xboxOneScreen"), 'home');
    assert.equal(await run("elements.bootVideo.getAttribute('src')"), 'assets/themes/xboxseries/startup.mp4');
    assert.equal(await run("Number.isFinite(elements.bootVideo.duration) && elements.bootVideo.duration > 0"), true, 'Startup video must decode');
    await run(`window.savedMediaPlay = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = () => Promise.resolve();
      state.settings.boot = true; state.settings.sound = true; setupBoot();
      elements.bootVideo.dispatchEvent(new Event('playing')); void 0;`);
    assert.equal(await run("elements.bootVideo.muted"), true, 'Video must be muted while separate startup audio plays');
    assert.equal(await run("elements.bootFallback.hidden"), true);
    assert.match(await run("startupFallbackAudio.getAttribute('src')"), /assets\/themes\/xboxseries\/startup\.m4a/);
    await run("skipBoot();");
    assert.equal(await run("startupFallbackAudio"), null, 'Skipping startup must stop its audio');
    await run("state.settings.sound = false; setupBoot(); elements.bootVideo.dispatchEvent(new Event('playing')); void 0;");
    assert.equal(await run("elements.bootVideo.muted"), true);
    assert.equal(await run("startupFallbackAudio"), null, 'Sound-off startup must remain silent');
    await run("skipBoot(); state.settings.sound = true; setupBoot(); elements.bootVideo.dispatchEvent(new Event('playing')); elements.bootVideo.dispatchEvent(new Event('ended')); void 0;");
    assert.equal(await run("startupFallbackAudio"), null, 'Ending startup must stop its audio');
    await run("HTMLMediaElement.prototype.play = window.savedMediaPlay; void 0;");
    assert.deepEqual(errors, []);
    console.log('PASS Xbox Series layouts, profile, add, options, search, sorting, input, large/empty libraries, responsive sizes, backups, persistence and isolation.');
    console.log(`Screenshots: ${profile}`);
    win.destroy();
    app.exit(0);
  } catch (error) {
    await capture('xboxseries-failure.png');
    console.error(error);
    console.error(`Screenshot: ${path.join(profile, 'xboxseries-failure.png')}`);
    win.destroy();
    app.exit(1);
  }
});
