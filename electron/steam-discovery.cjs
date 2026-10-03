const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const { pathToFileURL } = require("node:url");
const vdf = require("@node-steam/vdf");

async function findSteamRoots() {
  const roots = [];
  if (process.platform === "win32") {
    const reg = path.join(process.env.SystemRoot || "C:\\Windows", "System32", "reg.exe");
    for (const [key, value] of [
      ["HKCU\\Software\\Valve\\Steam", "SteamPath"],
      ["HKLM\\SOFTWARE\\WOW6432Node\\Valve\\Steam", "InstallPath"],
      ["HKLM\\SOFTWARE\\Valve\\Steam", "InstallPath"],
    ]) {
      try {
        const { stdout } = await promisify(execFile)(reg, ["query", key, "/v", value], {
          windowsHide: true, timeout: 3000,
        });
        const match = stdout.match(/REG_SZ\s+(.+)/);
        if (match) roots.push(match[1].trim());
      } catch { /* Try the remaining registry keys and standard locations. */ }
    }
    roots.push(path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", "Steam"));
    roots.push(path.join(process.env.ProgramFiles || "C:\\Program Files", "Steam"));
  } else if (process.platform === "darwin") {
    roots.push(path.join(os.homedir(), "Library", "Application Support", "Steam"));
  } else {
    roots.push(...[".steam/steam", ".local/share/Steam", ".var/app/com.valvesoftware.Steam/.local/share/Steam"]
      .map((folder) => path.join(os.homedir(), folder)));
  }
  return roots;
}

async function isDirectory(folder) {
  try { return (await fs.stat(folder)).isDirectory(); }
  catch (error) {
    if (["ENOENT", "ENOTDIR"].includes(error.code)) return false;
    throw error;
  }
}

async function localArtwork(root, appId, type) {
  const cache = path.join(root, "appcache", "librarycache");
  for (const file of [path.join(cache, `${appId}_${type}.jpg`), path.join(cache, appId, `${type}.jpg`)]) {
    try { if ((await fs.stat(file)).isFile()) return pathToFileURL(file).href; }
    catch { /* Cached artwork is optional. */ }
  }
  return "";
}

async function discoverSteamGames({ roots } = {}) {
  const candidates = roots || await findSteamRoots();
  const libraries = new Map();
  const warnings = [];
  const unavailableLibraries = new Set();
  const key = (folder) => process.platform === "win32" ? folder.toLowerCase() : folder;
  for (const candidate of candidates) {
    const root = path.resolve(candidate);
    try {
      if (!await isDirectory(path.join(root, "steamapps"))) continue;
      libraries.set(key(root), { folder: root, root });
      const config = vdf.parse(await fs.readFile(path.join(root, "steamapps", "libraryfolders.vdf"), "utf8"));
      const entries = config.libraryfolders || config.LibraryFolders;
      if (!entries || typeof entries !== "object") throw new Error("Invalid library folder list.");
      for (const [index, entry] of Object.entries(entries)) {
        if (!/^\d+$/.test(index)) continue;
        const folder = typeof entry === "string" ? entry : entry?.path;
        if (typeof folder === "string" && path.isAbsolute(folder)) {
          libraries.set(key(path.resolve(folder)), { folder: path.resolve(folder), root });
        }
      }
    } catch (error) {
      // An incomplete library list cannot safely establish that any game was uninstalled.
      return { ok: false, games: [], error: `Could not read Steam libraries: ${error.message}` };
    }
  }
  if (!libraries.size) return { ok: false, games: [], error: "Steam installation not found." };

  const games = new Map();
  for (const { folder, root } of libraries.values()) {
    try {
      const steamapps = path.join(folder, "steamapps");
      const files = await fs.readdir(steamapps);
      for (const file of files.filter((name) => /^appmanifest_\d+\.acf$/i.test(name))) {
        try {
          const manifest = vdf.parse(await fs.readFile(path.join(steamapps, file), "utf8")).AppState;
          if (!manifest || !/^\d+$/.test(manifest.appid) || !manifest.name || !manifest.installdir) {
            throw new Error("Invalid app manifest.");
          }
          manifest.appid = String(manifest.appid);
          manifest.name = String(manifest.name);
          manifest.installdir = String(manifest.installdir);
          const flags = Number(manifest.StateFlags);
          // FullyInstalled is bit 4; UpdateRequired may also be set for a playable installation.
          if (!Number.isInteger(flags) || !(flags & 4) || (flags & (32 | 128 | 256 | 512 | 1024 | 2048))) continue;
          const common = path.resolve(steamapps, "common");
          const installDir = path.resolve(common, manifest.installdir);
          const relative = path.relative(common, installDir);
          if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) continue;
          if (!await isDirectory(installDir)) continue;
          // Steam's shared runtime is installed like an app but is not a launchable game.
          if (manifest.appid === "228980") continue;
          games.set(manifest.appid, {
            id: `steam-${manifest.appid}`, title: manifest.name, platform: "Steam",
            source: "steam", steamAppId: manifest.appid, steamLibrary: folder, installDir,
            path: `steam://rungameid/${manifest.appid}`, accent: "#4f78ff", description: "",
            cover: await localArtwork(root, manifest.appid, "library_600x900"),
            background: await localArtwork(root, manifest.appid, "library_hero"),
          });
        } catch (error) {
          unavailableLibraries.add(folder);
          warnings.push(`Could not read ${file}: ${error.message}`);
        }
      }
    } catch (error) {
      unavailableLibraries.add(folder);
      warnings.push(`Steam library unavailable: ${folder}`);
    }
  }
  return { ok: true, games: [...games.values()], warnings, unavailableLibraries: [...unavailableLibraries] };
}

module.exports = { discoverSteamGames };
