(function (root) {
  function reconcile(current, discovered, { hidden = [], unavailableLibraries = [] } = {}) {
    const hiddenIds = new Set(hidden);
    const pending = new Map(discovered.filter((game) => !hiddenIds.has(game.steamAppId))
      .map((game) => [game.steamAppId, game]));
    const unavailable = new Set(unavailableLibraries.map((folder) => folder.replace(/\\/g, "/").toLowerCase()));
    const games = [];
    for (const existing of current) {
      const appId = existing.source === "steam" ? existing.steamAppId
        : /^steam:\/\/rungameid\/(\d+)$/.exec(existing.path || "")?.[1];
      const found = pending.get(appId);
      if (found) {
        games.push({ ...found, ...existing, source: "steam", steamAppId: found.steamAppId,
          steamLibrary: found.steamLibrary, installDir: found.installDir, path: found.path,
          platform: "Steam", cover: existing.cover || found.cover,
          background: existing.background || found.background });
        pending.delete(appId);
      } else if (existing.source !== "steam" || (!hiddenIds.has(appId) &&
        unavailable.has((existing.steamLibrary || "").replace(/\\/g, "/").toLowerCase()))) {
        games.push(existing);
      }
    }
    games.push(...pending.values());
    return games;
  }
  function gameKey(game) {
    return `${game.source}:${game.externalId || game.steamAppId || ""}`;
  }

  function normalizedPath(value) {
    return String(value || "").replace(/\\/g, "/").replace(/\/+$/, "").toLowerCase();
  }

  function reconcileSources(current, reports, { hidden = [], resolvedPaths = {} } = {}) {
    const hiddenKeys = new Set(hidden);
    const discovered = [];
    const directories = new Set();
    for (const report of Object.values(reports)) {
      for (const game of report.games || []) {
        const directory = normalizedPath(game.installDir);
        if (directory && directories.has(directory)) continue;
        if (directory) directories.add(directory);
        if (!hiddenKeys.has(gameKey(game))) discovered.push(game);
      }
    }
    const pending = new Map(discovered.map((game) => [gameKey(game), game]));
    const games = [];
    for (const existing of current) {
      if (existing.source && !reports[existing.source]) {
        games.push(existing);
        for (const [key, game] of pending) {
          if (existing.installDir && normalizedPath(existing.installDir) === normalizedPath(game.installDir)) pending.delete(key);
        }
        continue;
      }
      const targets = [existing.path, resolvedPaths[existing.id]].filter(Boolean).map(normalizedPath);
      const matches = discovered.filter((game) => gameKey(existing) === gameKey(game) || targets.includes(normalizedPath(game.path)) ||
        (game.installDir && targets.some((target) => target.startsWith(`${normalizedPath(game.installDir)}/`))));
      // Prefer the most specific installation directory when matching a manually chosen executable.
      matches.sort((a, b) => Number(gameKey(existing) === gameKey(b)) - Number(gameKey(existing) === gameKey(a)) ||
        (b.installDir?.length || 0) - (a.installDir?.length || 0));
      const found = matches[0];
      if (found) {
        if (!pending.has(gameKey(found))) continue;
        games.push({ ...found, ...existing, source: found.source, externalId: found.externalId,
          steamAppId: found.steamAppId, steamLibrary: found.steamLibrary, installDir: found.installDir,
          path: found.path, platform: found.platform, launchArguments: found.launchArguments,
          workingDir: found.workingDir, cover: existing.cover || found.cover || "",
          background: existing.background || found.background || "" });
        pending.delete(gameKey(found));
      } else if (!existing.source || !reports[existing.source] || (!hiddenKeys.has(gameKey(existing)) &&
        (!reports[existing.source].ok || reports[existing.source].unavailableLibraries?.some((folder) =>
          [existing.steamLibrary, existing.installDir].some((directory) => directory && normalizedPath(directory) === normalizedPath(folder)))))) {
        games.push(existing);
      }
    }
    games.push(...pending.values());
    return games;
  }

  const api = { reconcile, reconcileSources, gameKey };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SteamLibrary = api;
})(globalThis);
