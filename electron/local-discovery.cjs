const fs = require("node:fs/promises");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const { pathToFileURL } = require("node:url");
const { discoverSteamGames } = require("./steam-discovery.cjs");

const platforms = { steam: "Steam", epic: "Epic", gog: "GOG", ubisoft: "Ubisoft", ea: "EA", battlenet: "Battle.net", xbox: "Xbox" };
const report = () => ({ ok: true, games: [], warnings: [], unavailableLibraries: [] });

function game(source, externalId, title, installDir, target, extra = {}) {
  return { id: `${source}-${externalId}`, source, externalId: String(externalId), title: String(title),
    platform: platforms[source], installDir, path: target, cover: "", background: "",
    description: "", accent: "#4f78ff", ...extra };
}

function inside(directory, relative) {
  if (!directory || typeof relative !== "string" || !relative) return null;
  const target = path.resolve(directory, relative);
  const difference = path.relative(path.resolve(directory), target);
  return difference && difference !== ".." && !difference.startsWith(`..${path.sep}`) && !path.isAbsolute(difference) ? target : null;
}

async function exists(target, directory = false) {
  try { const stat = await fs.stat(target); return directory ? stat.isDirectory() : stat.isFile(); }
  catch (error) { if (["ENOENT", "ENOTDIR"].includes(error.code)) return false; throw error; }
}

async function installed(directory, result) {
  if (typeof directory !== "string" || !path.isAbsolute(directory)) return false;
  if (await exists(directory, true)) return true;
  if (!await exists(path.parse(directory).root, true)) {
    result.unavailableLibraries.push(directory);
    result.warnings.push(`Drive unavailable: ${directory}`);
  }
  return false;
}

async function readWindowsInstallations(sources) {
  const powershell = path.join(process.env.SystemRoot || "C:\\Windows", "System32/WindowsPowerShell/v1.0/powershell.exe");
  const script = `$scanSources = @(${sources.map((source) => `'${source}'`).join(",")})\n` + await fs.readFile(path.join(__dirname, "windows-installations.ps1"), "utf8");
  // Electron can read scripts inside app.asar; PowerShell cannot open that virtual path directly.
  const encodedCommand = Buffer.from(script, "utf16le").toString("base64");
  const { stdout } = await promisify(execFile)(powershell, ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encodedCommand], {
    windowsHide: true, timeout: 30000, maxBuffer: 8 * 1024 * 1024, encoding: "utf8",
  });
  return JSON.parse(stdout.replace(/^\uFEFF/, ""));
}

async function discoverEpic(folder) {
  const result = report();
  try {
    if (!await exists(folder, true)) return result;
    for (const file of (await fs.readdir(folder)).filter((name) => name.endsWith(".item"))) {
      try {
        const entry = JSON.parse(await fs.readFile(path.join(folder, file), "utf8"));
        if (!entry.AppName || !entry.DisplayName || !entry.InstallLocation) throw new Error("Incomplete manifest");
        if (entry.bIsIncompleteInstall || (entry.MainGameAppName && entry.MainGameAppName !== entry.AppName)) continue;
        if (!await installed(entry.InstallLocation, result)) continue;
        const executable = inside(entry.InstallLocation, entry.LaunchExecutable);
        if (!executable || !await exists(executable)) continue;
        const identity = [entry.CatalogNamespace, entry.CatalogItemId, entry.AppName];
        if (identity.some((part) => typeof part !== "string" || !part)) throw new Error("Missing launch identity");
        const target = `com.epicgames.launcher://apps/${identity.map(encodeURIComponent).join("%3A")}?action=launch&silent=true`;
        result.games.push(game("epic", entry.AppName, entry.DisplayName, entry.InstallLocation, target));
      } catch (error) { result.ok = false; result.warnings.push(`Epic manifest unavailable: ${file}`); }
    }
  } catch (error) { result.ok = false; result.warnings.push("Epic installation records unavailable."); }
  return result;
}

function iconExecutable(icon) {
  if (typeof icon !== "string") return "";
  const value = icon.replace(/,\s*-?\d+$/, "").replace(/^"|"$/g, "");
  return /\.exe$/i.test(value) ? value : "";
}

async function discoverRegistry(snapshot, sources = Object.keys(platforms)) {
  const selected = new Set(sources);
  const results = Object.fromEntries(["gog", "ubisoft", "ea", "battlenet", "xbox"].map((source) => [source, report()]));
  for (const source of ["gog", "ubisoft", "ea", "battlenet"]) {
    if (snapshot.errors?.includes("registry")) { results[source].ok = false; results[source].warnings.push("Windows installation records unavailable."); }
  }
  const programs = snapshot.programs || [];
  const ubisoft = new Map((snapshot.ubisoft || []).map((entry) => [String(entry.id), entry]));
  for (const entry of programs) {
    const match = /^Uplay Install (\d+)$/i.exec(entry.id || "");
    if (match) ubisoft.set(match[1], { id: match[1], directory: entry.directory, name: entry.name });
  }
  for (const entry of ubisoft.values()) {
    if (!selected.has("ubisoft")) break;
    try {
      if (!/^\d+$/.test(entry.id) || !await installed(entry.directory, results.ubisoft)) continue;
      results.ubisoft.games.push(game("ubisoft", entry.id, entry.name || path.basename(entry.directory.replace(/[\\/]+$/, "")), entry.directory, `uplay://launch/${entry.id}`));
    } catch { results.ubisoft.ok = false; results.ubisoft.warnings.push("A Ubisoft installation could not be read."); }
  }
  for (const entry of programs) {
    let source;
    if (/GOG/i.test(entry.publisher || "") && /^\d+_is1$/.test(entry.id)) source = "gog";
    else if (/Electronic Arts/i.test(entry.publisher || "") && /EAInstaller/i.test(entry.uninstall || "")) source = "ea";
    else if (/Battle\.net.*--uid=/i.test(entry.uninstall || "")) source = "battlenet";
    if (!source || !selected.has(source) || !entry.name) continue;
    const result = results[source];
    try {
      if (!await installed(entry.directory, result)) continue;
      let externalId = entry.id;
      let executable = iconExecutable(entry.icon);
      let args = [];
      let workingDir = entry.directory;
      if (source === "gog") {
        externalId = entry.id.replace(/_is1$/, "");
        const info = JSON.parse(await fs.readFile(path.join(entry.directory, `goggame-${externalId}.info`), "utf8"));
        if (info.rootGameId && String(info.rootGameId) !== externalId) continue;
        const task = info.playTasks?.find((task) => task.isPrimary && task.type === "FileTask");
        if (!task) continue;
        executable = inside(entry.directory, task.path);
        const { parseArgsStringToArgv } = await import("string-argv");
        args = parseArgsStringToArgv(task.arguments || "");
        workingDir = !task.workingDir || task.workingDir === "." ? entry.directory : inside(entry.directory, task.workingDir);
        if (!workingDir || !await exists(workingDir, true)) continue;
      }
      if (source === "battlenet") {
        externalId = /--uid=([^\s"]+)/i.exec(entry.uninstall)?.[1];
        const launcher = /^"([^"]+\.exe)"|^(.+?\.exe)(?:\s|$)/i.exec(entry.uninstall);
        const target = launcher?.[1] || launcher?.[2];
        const codes = { wow: "WoW", diablo3: "D3", s2: "S2", s1: "S1", hs_beta: "WTCG", heroes: "Hero", prometheus: "Pro", w3: "W3", fenris: "Fen", osi: "OSI", cod: "COD" };
        if (!codes[externalId?.toLowerCase()] || !target || !/Battle\.net\.exe$/i.test(target)) continue;
        executable = target;
        args = [`--exec=launch ${codes[externalId.toLowerCase()]}`];
      }
      if (!executable || !await exists(executable)) continue;
      result.games.push(game(source, externalId, entry.name, entry.directory, executable, { launchArguments: JSON.stringify(args), workingDir }));
    } catch { result.ok = false; result.warnings.push(`Installation unavailable: ${entry.name}`); }
  }
  if (snapshot.errors?.includes("xbox")) { results.xbox.ok = false; results.xbox.warnings.push("Some Xbox packages could not be read."); }
  for (const entry of snapshot.xbox || []) {
    if (!selected.has("xbox")) break;
    try {
      if (!/^[\w.-]+![\w.-]+$/.test(entry.id) || !await installed(entry.directory, results.xbox)) continue;
      const logo = inside(entry.directory, entry.logo);
      results.xbox.games.push(game("xbox", entry.id, entry.name, entry.directory, `shell:AppsFolder\\${entry.id}`, {
        cover: logo && await exists(logo) ? pathToFileURL(logo).href : "",
      }));
    } catch { results.xbox.ok = false; results.xbox.warnings.push("An Xbox installation could not be read."); }
  }
  for (const result of Object.values(results)) result.games = [...new Map(result.games.map((entry) => [entry.id, entry])).values()];
  return results;
}

async function discoverLocalGames({ steam, epicFolder, snapshot, platform = process.platform, sources = Object.keys(platforms) } = {}) {
  const selected = new Set(sources.filter((source) => Object.hasOwn(platforms, source)));
  const results = {};
  if (selected.has("steam")) {
    results.steam = steam || await discoverSteamGames();
    results.steam.games = (results.steam.games || []).map((entry) => ({ ...entry, externalId: entry.steamAppId }));
  }
  if (platform === "win32") {
    if (selected.has("epic")) results.epic = await discoverEpic(epicFolder || path.join(process.env.ProgramData || "C:\\ProgramData", "Epic/EpicGamesLauncher/Data/Manifests"));
    const registrySources = ["gog", "ubisoft", "ea", "battlenet", "xbox"].filter((source) => selected.has(source));
    if (registrySources.length) {
      try {
        const registry = await discoverRegistry(snapshot || await readWindowsInstallations(registrySources), registrySources);
        for (const source of registrySources) results[source] = registry[source];
      } catch { for (const source of registrySources) results[source] = { ...report(), ok: false, warnings: ["Windows installation scan failed."] }; }
    }
  }
  return results;
}

module.exports = { discoverLocalGames, discoverEpic, discoverRegistry, inside, platforms };
