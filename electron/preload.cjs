const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("launcherDesktop", {
  isDesktop: true,
  chooseExecutable: () => ipcRenderer.invoke("launcher:choose-executable"),
  chooseCover: () => ipcRenderer.invoke("launcher:choose-cover"),
  saveLibraryBackup: (contents) => ipcRenderer.invoke("launcher:save-library-backup", contents),
  loadLibraryBackup: () => ipcRenderer.invoke("launcher:load-library-backup"),
  launch: (executablePath) => ipcRenderer.invoke("launcher:launch", executablePath),
  closeWindow: () => ipcRenderer.invoke("launcher:close-window"),
  createDesktopShortcut: () => ipcRenderer.invoke("launcher:create-desktop-shortcut"),
  getFullscreen: () => ipcRenderer.invoke("launcher:get-fullscreen"),
  setFullscreen: (fullscreen) => ipcRenderer.invoke("launcher:set-fullscreen", fullscreen),
  getAutoStart: () => ipcRenderer.invoke("launcher:get-auto-start"),
  setAutoStart: (enabled) => ipcRenderer.invoke("launcher:set-auto-start", enabled),
  onFullscreenChanged: (callback) => {
    const listener = (_event, fullscreen) => callback(Boolean(fullscreen));
    ipcRenderer.on("launcher:fullscreen-changed", listener);
    return () => ipcRenderer.removeListener("launcher:fullscreen-changed", listener);
  },
});
