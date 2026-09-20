const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");
const { pathToFileURL } = require("url");
const { spawnSync } = require("child_process");
const libraryBackup = require("../library-backup.js");

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
// Keep using the original profile folder so renaming the app does not reset the library.
app.setPath("userData", path.join(app.getPath("appData"), "nexus-game-launcher"));
app.setName("FastStationBox");
const appUserModelId = "com.faststationbox.launcher";
app.setAppUserModelId(appUserModelId);
const appIconPath = path.join(__dirname, "..", "assets", "icon.ico");
const loginItemName = "FastStationBox";

function isAutoStartSupported() {
  return process.platform === "win32" || process.platform === "darwin";
}

function getWindowsLoginItemOptions() {
  return {
    path: process.execPath,
    args: app.isPackaged ? [] : [app.getAppPath()],
  };
}

function getWindowsShortcutArgs() {
  return app.isPackaged ? "" : `"${app.getAppPath()}"`;
}

function getWindowsShortcutDetails() {
  return {
    target: process.execPath,
    args: getWindowsShortcutArgs(),
    cwd: app.isPackaged ? path.dirname(process.execPath) : app.getAppPath(),
    description: "FastStationBox game launcher",
    icon: appIconPath,
    iconIndex: 0,
    appUserModelId,
  };
}

function getPowerShellPath() {
  return path.join(
    process.env.SystemRoot || "C:\\Windows",
    "System32",
    "WindowsPowerShell",
    "v1.0",
    "powershell.exe",
  );
}

function getWindowsStartupShortcutPath() {
  return path.join(
    app.getPath("appData"),
    "Microsoft",
    "Windows",
    "Start Menu",
    "Programs",
    "Startup",
    `${loginItemName}.lnk`,
  );
}

function getWindowsStartupCommandPath() {
  return path.join(
    app.getPath("appData"),
    "Microsoft",
    "Windows",
    "Start Menu",
    "Programs",
    "Startup",
    `${loginItemName}.cmd`,
  );
}

function getWindowsStartupDirectory() {
  return path.dirname(getWindowsStartupShortcutPath());
}

function quoteWindowsCommandArgument(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function writeWindowsStartupCommand(commandPath) {
  const shortcut = getWindowsShortcutDetails();
  const command = [
    "@echo off",
    [
      "start",
      '""',
      "/D",
      quoteWindowsCommandArgument(shortcut.cwd),
      quoteWindowsCommandArgument(shortcut.target),
      shortcut.args || "",
    ]
      .filter(Boolean)
      .join(" "),
    "",
  ].join("\r\n");

  fs.writeFileSync(commandPath, command, "utf8");
  return fs.existsSync(commandPath);
}

function writeWindowsShortcutWithPowerShell(shortcutPath, shortcut) {
  const command = [
    "$shortcutPath = $args[0]",
    "$targetPath = $args[1]",
    "$shortcutArgs = $args[2]",
    "$workingDirectory = $args[3]",
    "$iconLocation = $args[4]",
    "$description = $args[5]",
    "$wsh = New-Object -ComObject WScript.Shell",
    "$link = $wsh.CreateShortcut($shortcutPath)",
    "$link.TargetPath = $targetPath",
    "$link.Arguments = $shortcutArgs",
    "$link.WorkingDirectory = $workingDirectory",
    "$link.IconLocation = $iconLocation",
    "$link.Description = $description",
    "$link.Save()",
  ].join("; ");

  const result = spawnSync(
    getPowerShellPath(),
    [
      "-NoProfile",
      "-NonInteractive",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      command,
      shortcutPath,
      shortcut.target,
      shortcut.args || "",
      shortcut.cwd || "",
      shortcut.icon ? `${shortcut.icon},${shortcut.iconIndex || 0}` : "",
      shortcut.description || "",
    ],
    {
      encoding: "utf8",
      windowsHide: true,
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = String(result.stderr || "").trim();
    const stdout = String(result.stdout || "").trim();
    throw new Error(stderr || stdout || `PowerShell exited with code ${result.status}.`);
  }

  return fs.existsSync(shortcutPath);
}

function writeWindowsShortcut(shortcutPath, shortcut) {
  if (shell.writeShortcutLink(shortcutPath, "replace", shortcut)) {
    return true;
  }

  return writeWindowsShortcutWithPowerShell(shortcutPath, shortcut);
}

function getWindowsStartupEntryState() {
  const shortcutPath = getWindowsStartupShortcutPath();
  const commandPath = getWindowsStartupCommandPath();

  if (fs.existsSync(shortcutPath)) {
    try {
      const shortcut = shell.readShortcutLink(shortcutPath);
      return {
        enabled: shortcut.target === process.execPath,
        startupPath: shortcutPath,
        startupType: "shortcut",
      };
    } catch {
      return {
        enabled: true,
        startupPath: shortcutPath,
        startupType: "shortcut",
      };
    }
  }

  if (fs.existsSync(commandPath)) {
    return {
      enabled: true,
      startupPath: commandPath,
      startupType: "command",
    };
  }

  return {
    enabled: false,
    startupPath: shortcutPath,
    startupType: "",
  };
}

function clearWindowsLoginItem() {
  try {
    app.setLoginItemSettings({
      openAtLogin: false,
      enabled: false,
      name: loginItemName,
      ...getWindowsLoginItemOptions(),
    });
  } catch {
    // The Startup-folder shortcut below is the source of truth on Windows.
  }
}

function setWindowsAutoStartEnabled(enabled) {
  const shortcutPath = getWindowsStartupShortcutPath();
  const commandPath = getWindowsStartupCommandPath();
  clearWindowsLoginItem();

  if (!enabled) {
    if (fs.existsSync(shortcutPath)) {
      fs.unlinkSync(shortcutPath);
    }
    if (fs.existsSync(commandPath)) {
      fs.unlinkSync(commandPath);
    }
    return getAutoStartState();
  }

  fs.mkdirSync(getWindowsStartupDirectory(), { recursive: true });

  let shortcutError = null;
  try {
    if (writeWindowsShortcut(shortcutPath, getWindowsShortcutDetails())) {
      if (fs.existsSync(commandPath)) {
        fs.unlinkSync(commandPath);
      }
      return getAutoStartState();
    }
  } catch (error) {
    shortcutError = error;
  }

  if (fs.existsSync(shortcutPath)) {
    try {
      fs.unlinkSync(shortcutPath);
    } catch {
      // Keep going; the command file fallback can still start the app.
    }
  }

  try {
    if (writeWindowsStartupCommand(commandPath)) {
      return getAutoStartState();
    }
  } catch (error) {
    const shortcutMessage = shortcutError instanceof Error ? shortcutError.message : String(shortcutError || "");
    const commandMessage = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Could not create Windows startup files at ${shortcutPath} or ${commandPath}. ${shortcutMessage || commandMessage}`,
    );
  }

  const shortcutMessage = shortcutError instanceof Error ? shortcutError.message : "";
  throw new Error(`Could not create Windows startup files at ${shortcutPath} or ${commandPath}. ${shortcutMessage}`);
}

function getAutoStartState() {
  if (!isAutoStartSupported()) {
    return {
      ok: true,
      supported: false,
      enabled: false,
      platform: process.platform,
      status: "unsupported",
    };
  }

  try {
    if (process.platform === "win32") {
      const settings = app.getLoginItemSettings(getWindowsLoginItemOptions());
      const startupEntry = getWindowsStartupEntryState();

      return {
        ok: true,
        supported: true,
        enabled:
          startupEntry.enabled || Boolean(settings.openAtLogin && settings.executableWillLaunchAtLogin !== false),
        platform: process.platform,
        status: startupEntry.enabled ? `startup-${startupEntry.startupType}` : settings.status || "",
        startupPath: startupEntry.startupPath,
      };
    }

    const settings = app.getLoginItemSettings();

    return {
      ok: true,
      supported: true,
      enabled: Boolean(settings.openAtLogin),
      platform: process.platform,
      status: settings.status || "",
    };
  } catch (error) {
    return {
      ok: false,
      supported: true,
      enabled: false,
      platform: process.platform,
      status: "error",
      error: error instanceof Error ? error.message : "Could not read auto start settings.",
    };
  }
}

function setAutoStartEnabled(enabled) {
  if (!isAutoStartSupported()) {
    return {
      ok: false,
      supported: false,
      enabled: false,
      platform: process.platform,
      status: "unsupported",
      error: "Auto start is only supported in the Windows or macOS desktop app.",
    };
  }

  try {
    const openAtLogin = Boolean(enabled);
    if (process.platform === "win32") {
      return setWindowsAutoStartEnabled(openAtLogin);
    }

    app.setLoginItemSettings({ openAtLogin });
    return getAutoStartState();
  } catch (error) {
    return {
      ...getAutoStartState(),
      ok: false,
      error: error instanceof Error ? error.message : "Could not update auto start settings.",
    };
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 960,
    minHeight: 620,
    fullscreen: true,
    backgroundColor: "#05070c",
    icon: appIconPath,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#06080d",
      symbolColor: "#f5f7ff",
      height: 40,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  win.setTitle("FastStationBox");

  win.on("enter-full-screen", () => {
    win.webContents.send("launcher:fullscreen-changed", true);
  });

  win.on("leave-full-screen", () => {
    win.webContents.send("launcher:fullscreen-changed", false);
  });

  win.loadFile(path.join(__dirname, "..", "index.html"));
}

app.whenReady().then(() => {
  ipcMain.handle("launcher:save-library-backup", async (event, contents) => {
    try {
      if (typeof contents !== "string") {
        throw new Error("The library backup must contain JSON text.");
      }
      libraryBackup.parse(contents);
      const result = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
        title: "Back up game library",
        defaultPath: `FastStationBox-library-${new Date().toISOString().slice(0, 10)}.json`,
        filters: [{ name: "Library backup", extensions: ["json"] }],
      });
      if (result.canceled || !result.filePath) return { canceled: true };
      await fs.promises.writeFile(result.filePath, contents, "utf8");
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message || "Could not save the library backup." };
    }
  });

  ipcMain.handle("launcher:load-library-backup", async (event) => {
    try {
      const result = await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender), {
        title: "Load game library backup",
        properties: ["openFile"],
        filters: [{ name: "Library backup", extensions: ["json"] }],
      });
      if (result.canceled || !result.filePaths.length) return { canceled: true };
      const filePath = result.filePaths[0];
      const contents = await fs.promises.readFile(filePath, "utf8");
      libraryBackup.parse(contents);
      return { ok: true, contents };
    } catch (error) {
      return { ok: false, error: error.message || "Could not read the library backup." };
    }
  });

  ipcMain.handle("launcher:choose-executable", async () => {
    const result = await dialog.showOpenDialog({
      title: "Choose a game or shortcut",
      properties: ["openFile"],
      filters: [
        { name: "Games and shortcuts", extensions: ["exe", "lnk", "bat", "cmd", "url"] },
        { name: "All files", extensions: ["*"] },
      ],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle("launcher:choose-cover", async () => {
    const result = await dialog.showOpenDialog({
      title: "Choose cover art",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg", "webp", "gif"] }],
    });
    if (result.canceled) return null;
    const selected = result.filePaths[0];
    const imageDirectory = path.join(app.getPath("userData"), "images");
    await fs.promises.mkdir(imageDirectory, { recursive: true });
    const storedImage = path.join(imageDirectory, `${randomUUID()}${path.extname(selected).toLowerCase()}`);
    await fs.promises.copyFile(selected, storedImage);
    return pathToFileURL(storedImage).href;
  });

  ipcMain.handle("launcher:launch", async (_event, executablePath) => {
    if (typeof executablePath !== "string" || !executablePath.trim()) {
      return { ok: false, error: "No executable path was set." };
    }

    const error = await shell.openPath(executablePath);
    return error ? { ok: false, error } : { ok: true };
  });

  ipcMain.handle("launcher:set-fullscreen", (event, fullscreen) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.setFullScreen(Boolean(fullscreen));
    return win?.isFullScreen() ?? false;
  });

  ipcMain.handle("launcher:get-fullscreen", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return win?.isFullScreen() ?? false;
  });

  ipcMain.handle("launcher:get-auto-start", () => getAutoStartState());

  ipcMain.handle("launcher:set-auto-start", (_event, enabled) => setAutoStartEnabled(enabled));

  ipcMain.handle("launcher:close-window", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
    return true;
  });

  ipcMain.handle("launcher:create-desktop-shortcut", () => {
    if (process.platform !== "win32") {
      return { ok: false, error: "Desktop shortcuts are only supported on Windows." };
    }

    const shortcutPath = path.join(app.getPath("desktop"), "FastStationBox.lnk");
    const ok = writeWindowsShortcut(shortcutPath, getWindowsShortcutDetails());
    return ok ? { ok: true, shortcutPath } : { ok: false, error: "Could not create shortcut." };
  });

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
