const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const backup = require("../library-backup.js");

function desktopHandlers(dialog, fileIO, shell = {}, options = {}) {
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
    BrowserWindow: Window, dialog, ipcMain: { handle: (name, fn) => handlers.set(name, fn) }, shell,
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, "../electron/main.cjs"), "utf8"), {
    require: (name) => name === "electron" ? electron : name === "fs" ? { promises: fileIO }
      : name === "../library-backup.js" ? backup
      : name === "./steam-discovery.cjs" ? require("../electron/steam-discovery.cjs")
      : name === "./local-discovery.cjs" ? options.discovery || require("../electron/local-discovery.cjs")
      : name === "child_process" && options.spawn ? { ...require(name), spawn: options.spawn } : require(name),
    __dirname: path.join(__dirname, "../electron"), process, Buffer,
  });
  return {
    save: (text) => handlers.get("launcher:save-library-backup")({ sender: {} }, text),
    load: () => handlers.get("launcher:load-library-backup")({ sender: {} }),
    launch: (target) => handlers.get("launcher:launch")({ sender: {} }, target),
    discover: (games) => handlers.get("launcher:discover-local")({ sender: {} }, games),
    launchDiscovered: (source, id, game) => handlers.get("launcher:launch-discovered")({ sender: {} }, source, id, game),
  };
}

test("discovered launches use main-process scan data, preserve arguments and reject unknown games", async () => {
  const commands = [];
  const urls = [];
  const entries = [
    { source: "epic", externalId: "epic1", path: "com.epicgames.launcher://apps/a%3Ab%3Ac?action=launch&silent=true" },
    { source: "ubisoft", externalId: "42", path: "uplay://launch/42" },
    { source: "gog", externalId: "123", path: "C:/Games/game.exe", installDir: "C:/Games", workingDir: "C:/Games/bin", launchArguments: '["--profile","Player One"]' },
    { source: "xbox", externalId: "Package_abcd!Game", path: "shell:AppsFolder\\Package_abcd!Game" },
  ];
  const reports = Object.fromEntries(entries.map((entry) => [entry.source, { ok: true, games: [entry] }]));
  const handlers = desktopHandlers({}, {}, { openExternal: async (url) => urls.push(url),
    readShortcutLink: () => ({ target: "C:/Games/game.exe" }) }, {
    discovery: { discoverLocalGames: async () => reports },
    spawn: (executable, args, options) => {
      commands.push({ executable, args, options });
      const child = new (require("node:events").EventEmitter)();
      child.unref = () => {};
      process.nextTick(() => child.emit("spawn"));
      return child;
    },
  });
  assert.equal((await handlers.launchDiscovered("gog", "123")).ok, false);
  assert.equal((await handlers.launchDiscovered("gog", "123", entries[2])).ok, true);
  assert.equal(commands[0].executable, entries[2].path);
  commands.length = 0;
  assert.equal((await handlers.launchDiscovered("gog", "123", { ...entries[2], path: "https://example.com" })).ok, false);
  const result = await handlers.discover([{ id: "manual", path: "C:/Desktop/game.lnk" }]);
  assert.equal(result.resolvedPaths.manual, "C:/Games/game.exe");
  for (const entry of entries) assert.equal((await handlers.launchDiscovered(entry.source, entry.externalId)).ok, true);
  assert.deepEqual(urls, entries.slice(0, 2).map((entry) => entry.path));
  assert.equal(commands[0].executable, "C:/Games/game.exe");
  assert.deepEqual([...commands[0].args], ["--profile", "Player One"]);
  assert.equal(commands[0].options.cwd, "C:/Games/bin");
  assert.equal(commands[0].options.shell, false);
  assert.ok(commands[1].executable.endsWith("explorer.exe"));
  assert.equal(commands[1].args[0], "shell:AppsFolder\\Package_abcd!Game");
  assert.equal((await handlers.launchDiscovered("gog", "unknown")).ok, false);
});

test("Steam launches use the Steam protocol and normal games retain local launching", async () => {
  const calls = [];
  const handlers = desktopHandlers({}, {}, {
    openExternal: async (target) => calls.push(["external", target]),
    openPath: async (target) => { calls.push(["path", target]); return ""; },
  });
  assert.equal((await handlers.launch("steam://rungameid/123")).ok, true);
  assert.equal((await handlers.launch("C:/Games/game.exe")).ok, true);
  assert.deepEqual(calls, [["external", "steam://rungameid/123"], ["path", "C:/Games/game.exe"]]);
  assert.equal((await handlers.launch("")).ok, false);
  const failing = desktopHandlers({}, {}, { openExternal: async () => { throw new Error("Steam unavailable"); } });
  assert.match((await failing.launch("steam://rungameid/123")).error, /Steam unavailable/);
});

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
