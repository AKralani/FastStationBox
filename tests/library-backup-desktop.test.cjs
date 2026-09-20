const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const backup = require("../library-backup.js");

function desktopHandlers(dialog, fileIO) {
  const handlers = new Map();
  class Window {
    static fromWebContents() { return null; }
    on() {}
    setTitle() {}
    loadFile() {}
  }
  const electron = {
    app: { commandLine: { appendSwitch() {} }, getPath: () => "test",
      setPath() {}, setName() {}, setAppUserModelId() {}, on() {},
      whenReady: () => ({ then: (fn) => fn() }) },
    BrowserWindow: Window, dialog, ipcMain: { handle: (name, fn) => handlers.set(name, fn) }, shell: {},
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../electron/main.cjs"), "utf8"), {
    require: (name) => name === "electron" ? electron : name === "fs" ? { promises: fileIO }
      : name === "../library-backup.js" ? backup : require(name),
    __dirname: path.join(__dirname, "../electron"), process, Buffer,
  });
  return {
    save: (text) => handlers.get("launcher:save-library-backup")({ sender: {} }, text),
    load: () => handlers.get("launcher:load-library-backup")({ sender: {} }),
  };
}

test("desktop saves and reads the chosen backup file, including Unicode", async () => {
  const contents = backup.serialize([{ id: "1", title: "Game 🎮", platform: "Steam" }]);
  let written;
  const handlers = desktopHandlers({
    showSaveDialog: async () => ({ filePath: "chosen.json" }),
    showOpenDialog: async () => ({ filePaths: ["chosen.json"] }),
  }, {
    writeFile: async (...args) => { written = args; },
    readFile: async (file, encoding) => {
      assert.equal(file, "chosen.json"); assert.equal(encoding, "utf8"); return contents;
    },
  });
  assert.equal((await handlers.save(contents)).ok, true);
  assert.deepEqual(written, ["chosen.json", contents, "utf8"]);
  assert.equal((await handlers.load()).contents, contents);
});

test("canceling desktop dialogs performs no file operations", async () => {
  const handlers = desktopHandlers({
    showSaveDialog: async () => ({ canceled: true }),
    showOpenDialog: async () => ({ canceled: true }),
  }, {});
  assert.equal((await handlers.save(backup.serialize([]))).canceled, true);
  assert.equal((await handlers.load()).canceled, true);
});

test("desktop reports write/read errors and invalid backup contents", async () => {
  const handlers = desktopHandlers({
    showSaveDialog: async () => ({ filePath: "chosen.json" }),
    showOpenDialog: async () => ({ filePaths: ["chosen.json"] }),
  }, {
    writeFile: async () => { throw new Error("Disk full"); },
    readFile: async () => { throw new Error("Could not read file"); },
  });
  assert.match((await handlers.save(backup.serialize([]))).error, /Disk full/);
  assert.equal((await handlers.save("invalid")).ok, false);
  assert.match((await handlers.save({})).error, /JSON text/);
  assert.match((await handlers.load()).error, /Could not read file/);
});

test("desktop writes and loads backups larger than 32 MB without losing artwork", async () => {
  const directory = await fs.promises.mkdtemp(path.join(require("node:os").tmpdir(), "fsb-large-backup-"));
  const filePath = path.join(directory, "library.json");
  try {
    const cover = "data:image/png;base64," + "A".repeat(33 * 1024 * 1024);
    const games = [{ id: "large", title: "Large artwork", platform: "Standalone", cover }];
    const contents = backup.serialize(games);
    const handlers = desktopHandlers({
      showSaveDialog: async () => ({ filePath }),
      showOpenDialog: async () => ({ filePaths: [filePath] }),
    }, fs.promises);
    assert.equal((await handlers.save(contents)).ok, true);
    assert.ok((await fs.promises.stat(filePath)).size > 32 * 1024 * 1024);
    const loaded = await handlers.load();
    assert.equal(loaded.ok, true);
    assert.deepEqual(backup.parse(loaded.contents), games);
  } finally {
    await fs.promises.unlink(filePath).catch((error) => { if (error.code !== "ENOENT") throw error; });
    await fs.promises.rmdir(directory);
  }
});
