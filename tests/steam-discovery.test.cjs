const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const vdf = require("@node-steam/vdf");
const { discoverSteamGames } = require("../electron/steam-discovery.cjs");
const { reconcile } = require("../steam-library.js");
const backup = require("../library-backup.js");

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "fsb-steam-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const steam = path.join(root, "Steam");
  const secondary = path.join(root, "Second library");
  for (const folder of [steam, secondary]) await fs.mkdir(path.join(folder, "steamapps"), { recursive: true });
  await fs.writeFile(path.join(steam, "steamapps/libraryfolders.vdf"), vdf.stringify({
    libraryfolders: { 0: { path: steam }, 1: { path: secondary } },
  }));
  async function game(folder, appid, { flags = 4, installed = true, dir = `Game ${appid}` } = {}) {
    if (installed) await fs.mkdir(path.join(folder, "steamapps/common", dir), { recursive: true });
    await fs.writeFile(path.join(folder, `steamapps/appmanifest_${appid}.acf`), vdf.stringify({
      AppState: { appid: String(appid), name: `Title ${appid}`, installdir: dir, StateFlags: String(flags) },
    }));
  }
  return { steam, secondary, game };
}

test("discovers multiple library drives and filters incomplete, stale and runtime installations", async (t) => {
  const { steam, secondary, game } = await fixture(t);
  await game(steam, 10);
  await game(secondary, 20, { flags: 6 });
  await game(secondary, 30, { flags: 1024 });
  await game(secondary, 40, { flags: 4 | 1024 });
  await game(secondary, 50, { installed: false });
  await game(secondary, 228980);
  await game(secondary, 60, { dir: "../outside" });
  const result = await discoverSteamGames({ roots: [steam, steam] });
  assert.equal(result.ok, true);
  assert.deepEqual(result.games.map((entry) => entry.steamAppId).sort(), ["10", "20"]);
  assert.equal(result.games[0].path, "steam://rungameid/10");
  assert.equal(result.games[1].steamLibrary, secondary);
  assert.equal(result.warnings.length, 0);
});

test("legacy library paths, malformed manifests and disconnected drives", async (t) => {
  const { steam, secondary, game } = await fixture(t);
  await game(steam, 10);
  await fs.writeFile(path.join(steam, "steamapps/libraryfolders.vdf"), vdf.stringify({ LibraryFolders: { 1: secondary } }));
  await fs.writeFile(path.join(secondary, "steamapps/appmanifest_20.acf"), '"wrong" "data"');
  let result = await discoverSteamGames({ roots: [steam] });
  assert.deepEqual(result.unavailableLibraries, [secondary]);
  assert.equal(result.games.length, 1);
  await fs.rm(secondary, { recursive: true });
  result = await discoverSteamGames({ roots: [steam] });
  assert.deepEqual(result.unavailableLibraries, [secondary]);
  await fs.writeFile(path.join(steam, "steamapps/libraryfolders.vdf"), '"invalid" "data"');
  assert.equal((await discoverSteamGames({ roots: [steam] })).ok, false);
  assert.equal((await discoverSteamGames({ roots: [] })).ok, false);
});

test("reconciliation preserves edits/manual games, removes uninstalled games and respects hidden games", () => {
  const discovered = [10, 20].map((id) => ({ id: `steam-${id}`, title: `Title ${id}`, platform: "Steam",
    source: "steam", steamAppId: String(id), path: `steam://rungameid/${id}`, steamLibrary: "D:/Steam",
    installDir: `D:/Steam/common/${id}`, cover: "cached-cover", background: "" }));
  const manual = { id: "manual", title: "Manual", platform: "Epic", path: "game.exe" };
  const edited = { ...discovered[0], title: "Custom title", cover: "custom-cover", addedAt: 123 };
  const stale = { ...edited, id: "steam-30", steamAppId: "30", steamLibrary: "E:/Steam" };
  const result = reconcile([manual, edited, stale], discovered);
  assert.equal(result.length, 3);
  assert.equal(result[0], manual);
  assert.equal(result[1].cover, "custom-cover");
  assert.equal(result[1].title, "Custom title");
  assert.equal(result[1].addedAt, 123);
  assert.deepEqual(reconcile(result, discovered), result);
  assert.equal(reconcile([stale], [], { unavailableLibraries: ["E:/Steam"] })[0], stale);
  assert.equal(reconcile(result, discovered, { hidden: ["10"] }).length, 2);
  const legacy = { id: "old", title: "My title", platform: "Steam", path: discovered[0].path };
  const adopted = reconcile([legacy], discovered);
  assert.equal(adopted.length, 2);
  assert.equal(adopted[0].id, "old");
  assert.equal(adopted[0].source, "steam");
  assert.deepEqual(backup.parse(backup.serialize(result)), result);
});
