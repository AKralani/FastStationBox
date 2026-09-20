const { test } = require("node:test");
const assert = require("node:assert/strict");
const backup = require("../library-backup.js");

const game = {
  id: "test-game", title: "Test 🎮", platform: "Steam",
  path: "D:\\Games\\Test\\game.exe", description: "A game\nwith details",
  cover: "data:image/png;base64,aGVsbG8=", background: "file:///D:/Art/background.jpg",
  accent: "#526fff", addedAt: 123456789, lastPlayed: "Yesterday", playtime: "42 hours",
};

test("all saved game fields and library order survive a backup round trip", () => {
  const games = [game, { ...game, id: "second", title: "Second" }];
  assert.deepEqual(backup.parse(backup.serialize(games)), games);
  assert.deepEqual(backup.parse(backup.serialize([])), []);
});

test("loading updates matching IDs, keeps unrelated games, and is repeatable", () => {
  const current = [game, { ...game, id: "keep" }];
  const incoming = [{ ...game, title: "Restored title" }, { ...game, id: "new" }];
  const result = backup.merge(current, incoming);
  assert.equal(result.added, 1);
  assert.equal(result.updated, 1);
  assert.deepEqual(result.games.map((entry) => entry.id), ["test-game", "keep", "new"]);
  assert.equal(result.games[0].title, "Restored title");
  assert.equal(current[0].title, game.title);
  assert.deepEqual(backup.merge(result.games, incoming).games, result.games);
});

test("invalid files and unsupported formats are rejected", () => {
  for (const value of ["not json", "null", "[]", "{}", '{"format":"other","version":1}']) {
    assert.throws(() => backup.parse(value));
  }
  const future = JSON.parse(backup.serialize([game]));
  future.version = 2;
  assert.throws(() => backup.parse(JSON.stringify(future)), /version/);
});

test("one malformed entry rejects the entire backup", () => {
  for (const invalid of [null, [], {}, { ...game, id: "" }, { ...game, title: " " },
    { ...game, platform: 12 }, { ...game, cover: {} }, { ...game, addedAt: "today" }]) {
    const file = JSON.parse(backup.serialize([game]));
    file.games.push(invalid);
    assert.throws(() => backup.parse(JSON.stringify(file)));
  }
  assert.throws(() => backup.serialize([game, game]), /duplicate/);
});

test("unrecognized properties cannot become restored game fields", () => {
  const file = JSON.parse(backup.serialize([game]));
  file.games[0].unexpected = { nested: true };
  const restored = backup.parse(JSON.stringify(file));
  assert.deepEqual(restored, [game]);
});
