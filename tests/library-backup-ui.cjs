// Runs the real renderer with isolated, temporary storage and no visible window.
const { app, BrowserWindow } = require("electron");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const temporaryProfile = require("node:fs").mkdtempSync(path.join(os.tmpdir(), "fsb-test-profile-"));
app.setPath("userData", temporaryProfile);

app.whenReady().then(async () => {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), "fsb-backup-test-"));
  const win = new BrowserWindow({ show: false, width: 1440, height: 900,
    webPreferences: { partition: `backup-test-${Date.now()}`, backgroundThrottling: false, offscreen: true } });
  const run = (code) => win.webContents.executeJavaScript(code, true);
  const runAsync = (code) => run(`(async () => { ${code} })()`);
  win.webContents.on("console-message", (event) => {
    if (event.level === "error") console.error(event.message);
  });
  try {
    await win.loadFile(path.join(__dirname, "..", "index.html"));
    await run("skipBoot(); state.settings.boot = false; setSoundEnabled(false);");
    for (const theme of ["fsb", "ps5", "ps4", "ps3", "ps2", "ps1", "xbox-classic", "xbox360", "wii", "stadia"]) {
      await run(`closeOverlays(); applyThemeNow(${JSON.stringify(theme)}); openSettingsPanel("system", { xbox360Detail: true });`);
      await new Promise((resolve) => setTimeout(resolve, 500));
      assert.equal(await run("document.documentElement.dataset.theme"), theme);
      const controls = await run(`elements.loadLibraryButton.focus();
        elements.loadLibraryButton.scrollIntoView({ block: "center", behavior: "instant" });
        [elements.backupLibraryButton, elements.loadLibraryButton].map(button => ({
          visible: button.checkVisibility(), focusable: isControllerFocusable(button),
          disabled: button.disabled, hidden: Boolean(button.closest('[hidden], [inert]'))
        }));`);
      assert.ok(controls.every((item) => item.visible && item.focusable && !item.disabled && !item.hidden), `${theme}: backup controls unavailable`);
      await new Promise((resolve) => setTimeout(resolve, 400));
      assert.equal(await run(`(() => {
        const button = elements.loadLibraryButton;
        const rect = button.getBoundingClientRect();
        return button.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
      })()`), true, `${theme}: load button cannot be reached on screen`);
      await fs.writeFile(path.join(output, `${theme}.png`), (await win.webContents.capturePage()).toPNG());
      console.log(`PASS ${theme}: backup controls visible and controller-focusable`);
    }

    // Export through the browser button, then load that real download via the file input.
    const downloaded = new Promise((resolve, reject) => {
      win.webContents.session.once("will-download", (_event, item) => {
        const target = path.join(output, item.getFilename());
        item.setSavePath(target);
        item.once("done", (_event, status) => status === "completed" ? resolve(target) : reject(new Error(status)));
      });
    });
    await run("elements.backupLibraryButton.click();");
    const backupPath = await Promise.race([downloaded, new Promise((_, reject) => setTimeout(() => reject(new Error("Backup download timed out")), 10000))]);
    const contents = await fs.readFile(backupPath, "utf8");
    const savedGames = JSON.parse(contents).games;
    assert.ok(savedGames.length > 0);
    await runAsync(`state.games = normalizeGames([{ id: "unrelated", title: "Keep me", platform: "Standalone" }]);
      localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(state.games));
      window.loadTestBackup = async function (text) {
        const transfer = new DataTransfer();
        transfer.items.add(new File([text], "backup.json", { type: "application/json" }));
        elements.libraryBackupInput.files = transfer.files;
        elements.libraryBackupInput.dispatchEvent(new Event("change"));
        while (libraryBackupBusy) await new Promise(resolve => setTimeout(resolve, 10));
      }
      await loadTestBackup(${JSON.stringify(contents)});`);
    assert.equal(await run("state.games.length"), savedGames.length + 1);
    await runAsync(`await loadTestBackup(${JSON.stringify(contents)});`);
    assert.equal(await run("state.games.length"), savedGames.length + 1);
    assert.equal(await run("state.games[0].title"), "Keep me");
    const before = await run("JSON.stringify(state.games)");
    await runAsync('await loadTestBackup("invalid json");');
    assert.equal(await run("JSON.stringify(state.games)"), before);
    assert.equal(await run("localStorage.getItem(STORAGE_KEYS.games)"), before);
    await runAsync(`const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = () => { throw new DOMException("Storage full", "QuotaExceededError"); };
      try {
        const largeBackup = LibraryBackup.serialize([{ ...state.games[0], cover: "data:image/png;base64," + "A".repeat(33 * 1024 * 1024) }]);
        await loadTestBackup(largeBackup);
      }
      finally { Storage.prototype.setItem = originalSetItem; }`);
    assert.equal(await run("JSON.stringify(state.games)"), before);
    assert.match(await run("elements.toast.textContent"), /storage is full/);
    assert.equal(await run("elements.loadLibraryButton.disabled"), false);
    const reloaded = new Promise((resolve) => win.webContents.once("did-finish-load", resolve));
    win.reload();
    await reloaded;
    assert.equal(await run("JSON.stringify(state.games)"), before);
    console.log("PASS download, file import, repeated import, invalid input, storage failure, and reload persistence");

    const largeDownload = new Promise((resolve, reject) => {
      win.webContents.session.once("will-download", (_event, item) => {
        const target = path.join(output, "large-library.json");
        item.setSavePath(target);
        item.once("done", (_event, status) => status === "completed" ? resolve(target) : reject(new Error(status)));
      });
    });
    await runAsync(`state.games[0].cover = "data:image/png;base64," + "A".repeat(33 * 1024 * 1024);
      await backupLibrary();`);
    const largePath = await Promise.race([largeDownload, new Promise((_, reject) => setTimeout(() => reject(new Error("Large backup download timed out")), 10000))]);
    assert.ok((await fs.stat(largePath)).size > 32 * 1024 * 1024);
    const largeGames = JSON.parse(await fs.readFile(largePath, "utf8")).games;
    assert.equal(largeGames[0].cover.length, "data:image/png;base64,".length + 33 * 1024 * 1024);
    console.log("PASS backups larger than 32 MB export intact and reach storage validation on import");
    console.log(`Screenshots and backup: ${output}`);
    win.destroy();
    app.exit(0);
  } catch (error) {
    console.error(error);
    win.destroy();
    app.exit(1);
  }
});
