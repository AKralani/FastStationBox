const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const { discoverEpic, discoverRegistry, discoverLocalGames } = require("../electron/local-discovery.cjs");
const { reconcileSources } = require("../steam-library.js");
const backup = require("../library-backup.js");

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "fsb-local-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  async function installation(name) {
    const directory = path.join(root, name);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, "game.exe"), "fixture");
    return directory;
  }
  return { root, installation };
}

test("Epic imports launchable base games and filters DLC, downloads and stale records", async (t) => {
  const { root, installation } = await fixture(t);
  const directory = await installation("Epic Game");
  const manifests = path.join(root, "Manifests");
  await fs.mkdir(manifests);
  const data = { AppName: "app", DisplayName: "Epic Game", InstallLocation: directory, LaunchExecutable: "game.exe", CatalogNamespace: "namespace", CatalogItemId: "catalog" };
  for (const [name, entry] of Object.entries({ base: data, dlc: { ...data, AppName: "dlc", MainGameAppName: "app" },
    incomplete: { ...data, bIsIncompleteInstall: true }, stale: { ...data, InstallLocation: path.join(root, "missing") },
    unsafe: { ...data, LaunchExecutable: "../outside.exe" } })) {
    await fs.writeFile(path.join(manifests, `${name}.item`), JSON.stringify(entry));
  }
  const result = await discoverEpic(manifests);
  assert.equal(result.ok, true);
  assert.equal(result.games.length, 1);
  assert.equal(result.games[0].path, "com.epicgames.launcher://apps/namespace%3Acatalog%3Aapp?action=launch&silent=true");
  await fs.writeFile(path.join(manifests, "bad.item"), "invalid JSON");
  const partial = await discoverEpic(manifests);
  assert.equal(partial.ok, false);
  assert.equal(partial.games.length, 1);
});

test("GOG, Ubisoft, EA, Battle.net and Xbox use their installation records and launch data", async (t) => {
  const { root, installation } = await fixture(t);
  const gog = await installation("GOG");
  const ea = await installation("EA");
  const ubisoft = await installation("Ubisoft");
  const blizzard = await installation("Blizzard");
  const xbox = await installation("Xbox");
  const battleExe = path.join(blizzard, "Battle.net.exe");
  await fs.writeFile(battleExe, "fixture");
  await fs.writeFile(path.join(gog, "goggame-123.info"), JSON.stringify({ rootGameId: "123", playTasks: [{ isPrimary: true, type: "FileTask", path: "game.exe", workingDir: ".", arguments: '--profile "Player One"' }] }));
  const snapshot = { errors: [], programs: [
    { id: "123_is1", name: "GOG Game", publisher: "GOG.com", directory: gog },
    { id: "ea-123", name: "EA Game", publisher: "Electronic Arts", directory: ea, icon: `"${path.join(ea, "game.exe")}",0`, uninstall: "EAInstaller cleanup" },
    { id: "ea-client", name: "EA app", publisher: "Electronic Arts", directory: ea },
    { id: "Uplay Install 42", name: "Ubisoft Game", directory: ubisoft },
    { id: "battle-123", name: "World of Warcraft", directory: blizzard, uninstall: `"${battleExe}" --uid=wow` },
  ], ubisoft: [{ id: "42", directory: ubisoft }], xbox: [{ id: "Fixture.Package_abcd!Game", name: "Xbox Game", directory: xbox }] };
  const results = await discoverRegistry(snapshot);
  for (const source of ["gog", "ubisoft", "ea", "battlenet", "xbox"]) {
    assert.equal(results[source].ok, true, source);
    assert.equal(results[source].games.length, 1, source);
  }
  assert.deepEqual(JSON.parse(results.gog.games[0].launchArguments), ["--profile", "Player One"]);
  assert.equal(results.gog.games[0].workingDir, gog);
  assert.equal(results.ubisoft.games[0].path, "uplay://launch/42");
  assert.deepEqual(JSON.parse(results.battlenet.games[0].launchArguments), ["--exec=launch WoW"]);
  assert.equal(results.xbox.games[0].path, "shell:AppsFolder\\Fixture.Package_abcd!Game");
  const games = Object.values(results).flatMap((result) => result.games);
  assert.deepEqual(backup.parse(backup.serialize(games)), games);
  const failed = await discoverRegistry({ errors: ["registry", "xbox"] });
  assert.ok(Object.values(failed).every((result) => !result.ok));
  const aggregate = await discoverLocalGames({ steam: { ok: true, games: [] }, epicFolder: path.join(root, "absent"), snapshot, platform: "win32" });
  assert.equal(Object.keys(aggregate).length, 7);
  const selected = await discoverLocalGames({ steam: { ok: true, games: [] }, epicFolder: path.join(root, "absent"), snapshot, platform: "win32", sources: ["ea"] });
  assert.deepEqual(Object.keys(selected), ["ea"]);
  assert.equal(selected.ea.games.length, 1);
  assert.deepEqual(await discoverLocalGames({ sources: [], platform: "win32" }), {});
});

test("reconciliation matches executables and resolved shortcuts, preserves edits, failures and hidden entries", () => {
  const game = { id: "epic-1", source: "epic", externalId: "1", title: "Discovered", platform: "Epic", path: "com.epicgames.launcher://apps/a", installDir: "D:/Games/My Game", cover: "", background: "" };
  const reports = { epic: { ok: true, games: [game] } };
  const manual = { id: "mine", title: "Custom", platform: "Standalone", path: "D:\\Games\\My Game\\bin\\game.exe", cover: "custom-art", description: "Custom description" };
  const result = reconcileSources([manual], reports);
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "mine");
  assert.equal(result[0].cover, "custom-art");
  assert.equal(result[0].description, "Custom description");
  assert.equal(result[0].source, "epic");
  assert.equal(reconcileSources([{ ...manual, path: "C:/Desktop/game.lnk" }], reports, { resolvedPaths: { mine: manual.path } }).length, 1);
  assert.equal(reconcileSources([{ ...manual, path: "D:/Games/My Game Other/game.exe" }], reports).length, 2);
  assert.equal(reconcileSources(result, { epic: { ok: true, games: [] } }).length, 0);
  assert.deepEqual(reconcileSources(result, { epic: { ok: false, games: [] } }), result);
  assert.deepEqual(reconcileSources(result, { epic: { ok: true, games: [], unavailableLibraries: [game.installDir] } }), result);
  assert.equal(reconcileSources(result, reports, { hidden: ["epic:1"] }).length, 0);
  const shared = { ...game, id: "ubisoft-2", source: "ubisoft", externalId: "2" };
  assert.equal(reconcileSources([], { ...reports, ubisoft: { ok: true, games: [shared] } }).length, 1);
  const unselected = { ...game, source: "ubisoft", externalId: "2", id: "ubisoft-2" };
  const retained = reconcileSources([unselected], reports);
  assert.equal(retained.length, 1);
  assert.equal(retained[0], unselected);
});
