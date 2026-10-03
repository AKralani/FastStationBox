(function (root) {
  const FORMAT = "faststationbox-library";
  const VERSION = 1;
  const stringFields = [
    "id", "title", "platform", "path", "description", "cover", "background",
    "accent", "lastPlayed", "playtime", "source", "steamAppId", "steamLibrary", "installDir",
    "externalId", "launchArguments", "workingDir",
  ];

  function validateGames(games) {
    if (!Array.isArray(games)) throw new Error("The backup must contain a game library.");
    const ids = new Set();
    return games.map((game, index) => {
      const invalid = () => new Error(`Game ${index + 1} in the backup is invalid.`);
      if (!game || typeof game !== "object" || Array.isArray(game)) throw invalid();
      for (const field of ["id", "title", "platform"]) {
        if (typeof game[field] !== "string" || !game[field].trim()) throw invalid();
      }
      if (ids.has(game.id)) throw new Error("The backup contains duplicate game IDs.");
      ids.add(game.id);
      const result = {};
      for (const field of stringFields) {
        if (game[field] === undefined) continue;
        if (typeof game[field] !== "string") throw invalid();
        result[field] = game[field];
      }
      if (game.addedAt !== undefined) {
        if (!Number.isFinite(game.addedAt) || game.addedAt < 0) throw invalid();
        result.addedAt = game.addedAt;
      }
      return result;
    });
  }

  function serialize(games) {
    return JSON.stringify({
      format: FORMAT,
      version: VERSION,
      createdAt: new Date().toISOString(),
      games: validateGames(games),
    }, null, 2);
  }

  function parse(text) {
    let backup;
    try {
      backup = JSON.parse(text);
    } catch {
      throw new Error("This file is not a valid JSON library backup.");
    }
    if (!backup || backup.format !== FORMAT) {
      throw new Error("Choose a FastStationBox library backup.");
    }
    if (backup.version !== VERSION) {
      throw new Error("This backup version is not supported by this launcher.");
    }
    return validateGames(backup.games);
  }

  // Matching IDs are updated in place; unrelated games retain their order.
  function merge(current, incoming) {
    const games = new Map(current.map((game) => [game.id, game]));
    let added = 0;
    let updated = 0;
    for (const game of incoming) {
      if (games.has(game.id)) updated += 1;
      else added += 1;
      games.set(game.id, game);
    }
    return { games: [...games.values()], added, updated };
  }

  const api = { serialize, parse, merge };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.LibraryBackup = api;
})(globalThis);
