# FastStationBox

FastStationBox is a controller-first game library with a console-inspired interface. Run it as a Windows-friendly Electron desktop launcher or as a browser-based library manager.

## Highlights

- Build and manage a local game library with custom titles, cover art, backgrounds, descriptions, platforms, and accent colours.
- Launch games and store shortcuts from the desktop app, including `.exe`, `.lnk`, `.bat`, `.cmd`, and `.url` files.
- Navigate with mouse, keyboard, or a connected Xbox-compatible controller through the Gamepad API.
- Switch among ten console-inspired themes: FastStationBox, PlayStation 5, PlayStation 4, PlayStation 3, PlayStation 2, PlayStation, Classic Xbox, Xbox 360, Nintendo Wii, and Google Stadia.
- Adjust interface scale, sound, controller prompts, sort order, fullscreen mode, startup animation, profile name, and desktop autostart from Settings.
- Keep games and preferences in the browser's local storage—no account or cloud service required.
- Back up and load your game library from System Settings in every theme.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- Windows to build the included installer or launch local games from the desktop app

## Get started

```powershell
npm install
npm start
```

`npm start` opens the Electron desktop app in fullscreen. Use the in-app **Add game** action to choose an executable or shortcut and add its artwork.

## Run in a browser

```powershell
npm run web
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173).

The browser version has the complete interface, theme selection, library editing, fullscreen support, and controller navigation. Web browsers cannot open arbitrary local executables, so use the Electron version to launch games or browse for local files.

## Build a Windows release

```powershell
npm run dist
```

This creates an NSIS installer in a new timestamped folder under `dist/`, such as `dist/nsis-20260704201000/FastStationBox-Setup-1.0.0.exe`.

To create a single-file portable build instead:

```powershell
npm run dist:portable
```

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run the Electron desktop app. |
| `npm run web` | Start the local browser server on port 4173. |
| `npm run check` | Syntax-check the application and Electron files. |
| `npm run pack` | Create an unpacked Electron build. |
| `npm run dist` | Build the Windows NSIS installer. |
| `npm run dist:portable` | Build a portable Windows executable. |

## Controls

| Input | Navigate | Select | Back / options |
| --- | --- | --- | --- |
| Keyboard | Arrow keys | Enter | Escape goes back |
| Xbox controller | Left stick or D-pad | A | B goes back; Menu opens game options |
| Mouse | Point and click | Click | Use the visible controls |

Use the expand button in the upper-right corner to toggle fullscreen. Settings also offers **Monitor**, **Large** (default), and **TV** interface sizes, plus automatic, Xbox, and PlayStation controller prompt styles.

## Desktop features

The Electron app can browse for games and shortcuts, choose local cover/background images, create a Windows desktop shortcut, and optionally start with Windows. These operating-system integrations are unavailable in the browser version.

## Themes and assets

Choose a theme from **Settings → Theme**. Theme-specific media is stored in `assets/themes/<theme>/`.

- **FastStationBox** uses `assets/wallpaper.png` and assets in `assets/themes/fsb/`.
- **PS5** and **PS4** support logos, background video/audio, startup media, and navigation, select, and back sounds.
- **PS3** cycles through its bundled XMB-style background videos and uses its local startup media, sounds, and icons.
- **PS2** uses separate root-menu and game-library background videos; its video backgrounds are muted while `background-audio.mp3` provides ambient audio.
- **PlayStation, Classic Xbox, Xbox 360, Wii,** and **Stadia** use the media packaged in their respective theme folders.

Missing optional theme assets fall back to the theme's built-in styling where possible. Browser autoplay rules can defer background or ambient audio until the first interaction; the Electron app permits startup-video audio playback.

## Data and privacy

In any theme, open **Settings → System Settings → Back up library** to save a JSON backup of every game, including titles, platforms, launch paths, descriptions, artwork references, colours, and stored dates/play information. The desktop app lets you choose where to save it; the browser downloads it.

Choose **Load backup** in the same section to restore that file. Loading adds missing games and updates entries with matching IDs, keeping other games already in your library. Loading the same backup again does not create duplicates. Invalid or unsupported backups and storage failures leave your existing library unchanged. There is no fixed backup file-size cap; available memory, disk space, and library storage still apply.

Backups contain library entries, not installed game files or launcher preferences. Embedded artwork is included; local artwork paths and online image URLs are saved as references. Keep referenced artwork files available, and update game and image paths if you move to another computer.

FastStationBox stores the library and settings only in the active browser profile's local storage. Initial sample entries can be edited or removed. Clearing the site's local data resets the library and preferences.
