// Exercise the real renderer without changing the user's library or opening a window.
const { app, BrowserWindow } = require("electron");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const profile = require("node:fs").mkdtempSync(path.join(os.tmpdir(), "fsb-xboxone-test-"));
app.setPath("userData", profile);

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, width: 1440, height: 900,
    webPreferences: { partition: `xboxone-${Date.now()}`, backgroundThrottling: false, offscreen: true } });
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
    // Inspect final layouts deterministically in the hidden renderer.
    await win.webContents.insertCSS("* { transition-duration: 0s !important; animation-duration: 0s !important; scroll-behavior: auto !important; }");
    await run(`skipBoot(); state.settings.boot = false; setSoundEnabled(false);
      openSettingsPanel('theme'); document.querySelector('[data-theme="xboxone"]').click();`);
    await settle();
    assert.equal(await run("state.settings.theme"), "xboxone");
    assert.equal(await run("JSON.parse(localStorage.getItem(STORAGE_KEYS.settings)).theme"), "xboxone");
    assert.equal(await run("document.documentElement.dataset.xboxoneScreen"), "home");
    assert.equal(await run("elements.settingsPanel.classList.contains('open')"), false);
    assert.equal(await run("elements.ambientVideo.hasAttribute('src')"), false);
    assert.equal(await run("elements.bootVideo.getAttribute('src')"), "assets/themes/xboxone/startup.mp4");
    assert.match(await run("uiAudio.select.getAttribute('src')"), /assets\/themes\/xboxone\/select\.mp3/);
    assert.equal(await run("uiAudio.navigation.hasAttribute('src')"), false);
    assert.equal(await run("uiAudio.back.hasAttribute('src')"), false);
    assert.match(await run("getComputedStyle(document.querySelector('.ambient')).backgroundImage"), /assets\/themes\/xboxone\/background\.png/);
    assert.equal(await run("elements.ambientVideo.muted"), true);
    assert.equal(await run("document.querySelectorAll('.xboxone-shortcut').length"), 0);
    assert.equal(await run(`[...document.querySelectorAll('.game-card')].every(card => {
      const rect = card.getBoundingClientRect(); return Math.abs(rect.width - rect.height) < 0.1;
    })`), true, "Home game tiles must be square");
    assert.equal(await run(`(async () => {
      const image = new Image(); image.src = THEMES.xboxone.assets.backgroundImage;
      await image.decode(); return image.naturalWidth > 0;
    })()`), true);

    assert.equal(await run("document.querySelector('.xboxone-nav')"), null, 'Redundant header navigation must be removed');
    for (const control of ["#xboxOneLibraryTile", "#addGameButton", "#xboxOneProfileButton", "#searchButton", "#settingsButton", "#moreButton"]) {
      assert.equal(await reachable(control), true, `${control} cannot be reached on Home`);
    }
    assert.equal(await run("elements.addGameButton.parentElement.classList.contains('hero-actions')"), true);
    assert.equal(await run(`(() => {
      const tiles = [elements.xboxOneLibraryTile, elements.addGameButton, elements.moreButton];
      const rail = elements.gameRail.getBoundingClientRect();
      return tiles.every(tile => tile.getBoundingClientRect().top >= rail.bottom) &&
        [...document.querySelector('.hero-actions').children].filter(button => button.checkVisibility()).length === 3;
    })()`), true, 'Exactly three quick-action tiles must appear below the games');
    assert.equal(await run(`(async () => {
      for (const tile of [elements.xboxOneLibraryTile, elements.addGameButton, elements.moreButton]) {
        const source = getComputedStyle(tile).backgroundImage.match(/url\\("?([^"\\)]+)/)[1];
        const image = new Image(); image.src = source; await image.decode();
        if (!image.naturalWidth) return false;
      }
      return true;
    })()`), true, 'All three packaged tile images must load');
    assert.equal(await run(`(() => {
      const rail = elements.gameRail.getBoundingClientRect();
      const cards = [...document.querySelectorAll('.game-card')];
      const first = cards[0].getBoundingClientRect(), last = cards.at(-1).getBoundingClientRect();
      return Math.abs((first.left + last.right) / 2 - (rail.left + rail.right) / 2) < 2;
    })()`), true, 'A short game row must be centered');
    await capture("xboxone-home.png");
    await run("document.querySelector('.game-card.selected').focus(); moveFocus('down');");
    assert.equal(await run("document.activeElement.id"), 'xboxOneLibraryTile');
    await run("moveFocus('right');");
    assert.equal(await run("document.activeElement.id"), 'addGameButton');
    await run("moveFocus('right'); activateFocused();");
    assert.equal(await run("elements.contextMenu.hidden"), false, 'Game options tile must open the selected game menu');
    await run("hideContextMenu(); elements.xboxOneLibraryTile.click();");
    await settle();
    assert.equal(await run("state.xboxOneScreen"), 'library');
    assert.equal(await run("isControllerFocusable(elements.xboxOneLibraryTile)"), false);
    await run("elements.xboxOneLibraryBack.click();");
    await settle();
    assert.equal(await run("state.xboxOneScreen"), 'home', 'Library Home button must return to the dashboard');
    // Center a single game, then verify an overflowing Home row starts at its first tile.
    await run("window.savedXboxOneGames = state.games; state.games = state.games.slice(0, 1); state.selectedId = null; renderCurrentView();");
    assert.equal(await run(`(() => {
      const rail = elements.gameRail.getBoundingClientRect(), card = document.querySelector('.game-card').getBoundingClientRect();
      return Math.abs((card.left + card.right) / 2 - (rail.left + rail.right) / 2) < 1;
    })()`), true, 'A single game must be centered');
    await run(`state.games = normalizeGames(Array.from({ length: 24 }, (_, i) => ({ id: 'home-' + i, title: 'Game ' + i, platform: 'Xbox' })));
      state.selectedId = null; renderCurrentView(); elements.gameRail.scrollLeft = 0;`);
    assert.equal(await reachable('[data-game-id="home-0"]'), true, 'Overflow must not hide the first game to the left');
    assert.equal(await run("elements.gameRail.scrollWidth > elements.gameRail.clientWidth"), true);
    await run("selectGame('home-23', true);");
    for (let attempt = 0; attempt < 4 && !(await reachable('[data-game-id="home-23"]')); attempt++) await settle();
    assert.equal(await reachable('[data-game-id="home-23"]'), true, 'The last game must remain reachable in a scrolling Home row');
    await run("state.games = window.savedXboxOneGames; state.selectedId = null; renderCurrentView(); elements.gameRail.scrollLeft = 0;");
    await run("elements.settingsButton.click();");
    await capture("xboxone-settings.png");
    assert.equal(await reachable('[data-theme="xboxone"]'), true);
    assert.equal(await reachable('[data-theme="ps5"]'), true);
    assert.equal(await reachable('#closeSettings'), true);
    // Wheel input must stay inside Settings, including at its scroll boundary.
    await run("elements.settingsPanel.scrollTop = elements.settingsPanel.scrollHeight;");
    const settingsBounds = await run(`(() => {
      const rect = elements.settingsPanel.getBoundingClientRect();
      return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.bottom - 50) };
    })()`);
    for (const x of [settingsBounds.x, 100]) {
      win.webContents.sendInputEvent({ type: "mouseWheel", x, y: settingsBounds.y,
        deltaX: 0, deltaY: -600, canScroll: true });
      await settle();
      assert.equal(await run("elements.uiRoot.scrollTop"), 0, "Settings wheel input scrolled the screen behind it");
      assert.equal(await run("Math.abs(elements.settingsPanel.getBoundingClientRect().bottom - innerHeight) < 1"), true,
        "Settings must cover the bottom of the screen");
    }
    await run("elements.settingsPanel.scrollTop = 0;");
    await run("closeOverlays();");

    await run("elements.xboxOneProfileButton.click();");
    await settle();
    assert.equal(await run("elements.profilePanel.hidden"), false);
    assert.equal(await reachable("#profileSettingsButton"), true);
    await run("elements.profileNameInput.value = 'Xbox Player'; saveProfileName(); closeOverlays();");
    assert.equal(await run("elements.xboxOneProfileName.textContent"), "Xbox Player");
    assert.equal(await run("elements.xboxOneAvatar.textContent"), "X");

    await run("openSettingsPanel('sound');");
    await settle();
    assert.equal(await run("state.settingsPanelGroup"), "sound");
    assert.equal(await reachable(".settings-group-sound .toggle-row"), true);
    await capture("xboxone-sound.png");
    assert.equal(await run("handleBackAction()"), true);
    assert.equal(await run("state.xboxOneScreen"), "home");

    await run("elements.addGameButton.click();");
    await settle();
    assert.equal(await run("elements.gameModal.hidden"), false);
    assert.equal(await reachable("#gameTitle"), true);
    await run(`elements.gameTitle.value = 'Xbox One test game'; elements.gamePath.value = 'C:\\Games\\test.exe';
      elements.gameForm.requestSubmit();`);
    assert.equal(await run("state.games.some(game => game.title === 'Xbox One test game')"), true);
    await run("elements.xboxOneLibraryTile.click();");
    await settle();
    assert.equal(await run("state.xboxOneScreen"), "library");
    assert.equal(await run("getComputedStyle(elements.gameRail).display"), "grid");
    assert.equal(await run("elements.addGameButton.parentElement.classList.contains('library-actions')"), true);
    assert.equal(await run(`[...document.querySelectorAll('.game-card')].every(card => {
      const rect = card.getBoundingClientRect(); return Math.abs(rect.width - rect.height) < 0.1;
    })`), true, "Library game tiles must be square");
    assert.equal(await reachable("#sortButton"), true);
    await run("elements.sortButton.click();");
    assert.equal(await run("state.settings.sort"), "title-asc");
    await run("elements.searchButton.click(); elements.searchInput.value = 'Xbox One test'; elements.searchInput.dispatchEvent(new Event('input'));");
    assert.equal(await run("state.visibleGameIds.length"), 1);
    await run("elements.searchInput.value = 'no matching game'; elements.searchInput.dispatchEvent(new Event('input'));");
    assert.equal(await run("state.visibleGameIds.length"), 0);
    assert.equal(await run("elements.gameRail.textContent.trim()"), "No games found.");
    await run("handleBackAction(); handleBackAction();");
    assert.equal(await run("state.xboxOneScreen"), "home");
    assert.equal(await run("elements.searchInput.value"), "");

    // Selection changes the full-screen artwork; missing artwork clears it again.
    await run(`state.games[0].background = 'assets/themes/xboxone/background.png';
      state.games[0].cover = 'assets/themes/xboxone/background.png';
      renderCurrentView(); selectGame(state.games[0].id); updateHero();`);
    assert.equal(await run("elements.xboxOneBackdrop.classList.contains('has-artwork')"), true);
    assert.equal(await run(`(async () => {
      const card = document.querySelector('.game-card.selected');
      const source = getComputedStyle(card, '::before').backgroundImage.match(/url\\("?([^"\\)]+)/)[1];
      const image = new Image(); image.src = source; await image.decode(); return image.naturalWidth > 0;
    })()`), true, "game covers must resolve from the launcher root");
    await run("state.games[0].background = ''; state.games[0].cover = ''; updateHero();");
    assert.equal(await run("elements.xboxOneBackdrop.classList.contains('has-artwork')"), false);

    // Gamepad activation and keyboard Enter both launch the selected tile once.
    await run(`window.testLaunches = 0; window.realLaunch = launchSelectedGame;
      launchSelectedGame = async () => { window.testLaunches++; };
      document.querySelector('.game-card').focus(); activateFocused(); window.testLaunchAfterController = window.testLaunches;
      document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));`);
    assert.deepEqual(await run("({ controller: window.testLaunchAfterController, total: window.testLaunches })"),
      { controller: 1, total: 2 });
    await run("launchSelectedGame = window.realLaunch; void 0;");

    // A large library must navigate to and scroll the final row into view.
    await run(`state.games = normalizeGames(Array.from({ length: 48 }, (_, index) => ({
      id: 'xboxone-' + index, title: 'Game ' + String(index + 1).padStart(2, '0'), platform: 'Xbox', accent: '#107c10'
    }))); state.settings.sort = 'library'; setXboxOneScreen('library');`);
    await settle();
    await run("document.querySelector('.game-card').focus(); moveFocus('right');");
    assert.equal(await run("document.activeElement.dataset.gameId"), "xboxone-1");
    await run("moveFocus('down');");
    assert.ok(Number((await run("document.activeElement.dataset.gameId")).split("-")[1]) > 1);
    await run("selectGame('xboxone-47', true);");
    await settle();
    assert.equal(await reachable('[data-game-id="xboxone-47"]'), true);
    assert.equal(await run("elements.uiRoot.scrollHeight > elements.uiRoot.clientHeight && elements.uiRoot.scrollTop > 0"), true,
      "large libraries must remain vertically scrollable");
    await capture("xboxone-library.png");

    await run("state.games = []; state.selectedId = null; setXboxOneScreen('home');");
    await settle();
    assert.equal(await run("elements.playButton.disabled"), true);
    assert.equal(await run("elements.xboxOneBackdrop.classList.contains('has-artwork')"), false);
    assert.equal(await reachable('#xboxOneLibraryTile'), true);
    assert.equal(await reachable('#addGameButton'), true);
    await run("setXboxOneScreen('library');");
    await settle();
    assert.equal(await run("document.activeElement.id"), "xboxOneLibraryBack");

    await run("state.games = normalizeGames(defaultGames); state.selectedId = null; setXboxOneScreen('home');");
    for (const [width, height, size] of [[1920, 1080, "tv"], [1280, 720, "large"], [1024, 768, "monitor"], [640, 720, "large"]]) {
      win.setSize(width, height);
      await run(`applyInterfaceSize(${JSON.stringify(size)}); elements.uiRoot.scrollTo(0, 0);`);
      await settle();
      assert.equal(await run("document.documentElement.scrollWidth <= innerWidth"), true, `${width}: horizontal overflow`);
      assert.equal(await run("elements.uiRoot.scrollHeight <= elements.uiRoot.clientHeight + 1"), true,
        `${width}/${size}: Home has unnecessary vertical scrolling`);
      assert.equal(await run("document.querySelector('.controller-hints').getBoundingClientRect().bottom <= innerHeight + 1"), true,
        `${width}/${size}: controller hints are clipped`);
      for (const control of ["#xboxOneProfileButton", "#searchButton", "#settingsButton", "#xboxOneLibraryTile", "#addGameButton", "#moreButton"]) {
        assert.equal(await reachable(control), true, `${width}/${size}: ${control} unreachable`);
      }
      await capture(`xboxone-${width}-${size}.png`);
    }

    win.setSize(1440, 900);
    await run("applyInterfaceSize('large'); closeOverlays(); applyThemeNow('fsb'); renderCurrentView();");
    assert.equal(await run("document.documentElement.dataset.xboxoneScreen"), undefined);
    assert.equal(await run("isControllerFocusable(elements.xboxOneProfileButton)"), false);
    assert.equal(await run("isControllerFocusable(elements.xboxOneLibraryTile)"), false);
    await run("applyThemeNow('xboxone', { persist: true }); saveState();");
    const reloaded = new Promise((resolve) => win.webContents.once("did-finish-load", resolve));
    win.reload();
    await reloaded;
    await run("skipBoot();");
    assert.equal(await run("state.settings.theme"), "xboxone");
    assert.equal(await run("state.xboxOneScreen"), "home");

    // Use reference game artwork for the optional preview, without adding games to the user's storage.
    const referenceRoot = path.join(__dirname, "..", "xboxone-dashboard-main", "src", "assets", "game-list");
    if (require("node:fs").existsSync(referenceRoot)) {
      const titles = ["Dead Rising 3 Apocalypse Edition", "Forza Horizon 5", "Halo 5 Guardians", "Grand Theft Auto V", "Dark Souls III Deluxe Edition", "Minecraft", "Kingdom Hearts II", "The Witcher 3 Complete Edition", "Paladins"];
      const games = titles.map((title, index) => ({ id: `preview-${index}`, title, platform: "Xbox", accent: "#107c10",
        cover: `xboxone-dashboard-main/src/assets/game-list/game-cover/${title.replaceAll(" ", "-")}.jpg`,
        background: `xboxone-dashboard-main/src/assets/game-list/game-background/${title.replaceAll(" ", "-")}.jpg` }));
      await run(`state.games = normalizeGames(${JSON.stringify(games)}); state.selectedId = 'preview-1'; renderCurrentView();`);
      await capture("xboxone-preview.png");
    }
    assert.deepEqual(errors, [], "renderer errors");
    // Verify the separate startup track without playing audio on the user's computer.
    await run(`window.savedAudioPlay = Audio.prototype.play;
      Audio.prototype.play = () => Promise.resolve();
      state.settings.boot = true; state.settings.sound = true;
      setupBoot(); elements.bootVideo.dispatchEvent(new Event('playing')); void 0;`);
    assert.equal(await run("elements.bootVideo.muted"), true);
    assert.match(await run("startupFallbackAudio.getAttribute('src')"), /assets\/themes\/xboxone\/startup\.m4a/);
    await run("skipBoot(); Audio.prototype.play = window.savedAudioPlay; void 0;");
    assert.equal(await run("startupFallbackAudio"), null);
    console.log("PASS Xbox One selection/persistence, shortcuts, profile, add, sort, search, launch input, artwork, empty/large libraries, display sizes and theme isolation.");
    console.log(`Screenshots: ${profile}`);
    win.destroy();
    app.exit(0);
  } catch (error) {
    await capture("xboxone-failure.png");
    console.error(error);
    console.error(await run(`['#xboxOneLibraryBack', '#xboxOneProfileButton', '#playButton'].map(selector => {
      const button = document.querySelector(selector), rect = button.getBoundingClientRect();
      return { selector, focusable: isControllerFocusable(button), visible: button.checkVisibility(),
        rect: rect.toJSON(), hit: document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)?.outerHTML.slice(0, 220),
        hiddenAncestor: button.closest('[hidden], [inert], [aria-hidden="true"]')?.outerHTML.slice(0, 160) };
    })`));
    console.error(`Screenshot: ${path.join(profile, "xboxone-failure.png")}`);
    win.destroy();
    app.exit(1);
  }
});
