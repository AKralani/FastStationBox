const STORAGE_KEYS = {
  games: "nexus.games.v1",
  settings: "nexus.settings.v1",
};

const SORT_OPTIONS = [
  { value: "library", label: "Library order" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "recent", label: "Recently added" },
  { value: "platform", label: "Platform" },
];

const DEFAULT_THEME_ID = "fsb";
const SOUND_ASSETS_VERSION = 2;
const PS3_BACKGROUND_VIDEOS = Array.from(
  { length: 10 },
  (_, index) => `assets/themes/ps3/background-video-${index + 1}.mp4`,
);

const THEMES = {
  fsb: {
    id: "fsb",
    name: "FastStationBox",
    brandText: "FSB",
    bootWordmark: "FASTSTATIONBOX",
    systemLabel: "FSB",
    themeColor: "#07111d",
    assets: {
      logo: "assets/themes/fsb/logo.png",
      backgroundVideo: "",
      backgroundImage: "assets/wallpaper.png",
      backgroundAudio: "assets/themes/fsb/background-audio.mp3",
      startupVideo: "",
      startupAudio: "",
      navigation: "",
      select: "",
      back: "",
    },
  },
  ps5: {
    id: "ps5",
    name: "PlayStation 5",
    brandText: "PS5",
    bootWordmark: "PLAYSTATION 5",
    systemLabel: "PS5",
    themeColor: "#070a10",
    assets: {
      logo: "assets/themes/ps5/logo-white.svg",
      backgroundVideo: "assets/themes/ps5/background-video.mp4",
      backgroundImage: "assets/themes/ps5/background.png",
      backgroundAudio: "assets/themes/ps5/background-audio.mp3",
      startupVideo: "assets/themes/ps5/startup.mp4",
      startupAudio: "assets/themes/ps5/startup.mp3",
      navigation: "assets/themes/ps5/navigation.mp3",
      select: "assets/themes/ps5/select.mp3",
      back: "assets/themes/ps5/back.mp3",
    },
  },
  ps4: {
    id: "ps4",
    name: "PlayStation 4",
    brandText: "PS4",
    bootWordmark: "PLAYSTATION 4",
    systemLabel: "PS4",
    themeColor: "#0053b6",
    assets: {
      logo: "assets/themes/ps4/logo.svg",
      backgroundVideo: "assets/themes/ps4/background-video.mp4",
      backgroundImage: "",
      backgroundAudio: "assets/themes/ps4/background-audio.mp3",
      startupVideo: "assets/themes/ps4/startup.mp4",
      startupAudio: "assets/themes/ps4/startup.mp3",
      navigation: "assets/themes/ps4/navigation.mp3",
      select: "assets/themes/ps4/select.mp3",
      back: "assets/themes/ps4/back.mp3",
    },
  },
  ps3: {
    id: "ps3",
    name: "PlayStation 3",
    brandText: "User 1",
    bootWordmark: "FASTSTATION 3",
    systemLabel: "PS3",
    themeColor: "#17135a",
    assets: {
      logo: "assets/themes/ps3/logo.svg",
      backgroundVideo: "",
      backgroundVideos: PS3_BACKGROUND_VIDEOS,
      backgroundImage: "",
      backgroundAudio: "",
      startupVideo: "assets/themes/ps3/startup.mp4",
      startupAudio: "",
      navigation: "assets/themes/ps3/navigation.mp3",
      select: "assets/themes/ps3/select.mp3",
      back: "assets/themes/ps3/back.mp3",
    },
  },
  ps2: {
    id: "ps2",
    name: "PlayStation 2",
    brandText: "PS2",
    bootWordmark: "FASTSTATION 2",
    systemLabel: "PS2",
    themeColor: "#030713",
    assets: {
      logo: "assets/themes/ps2/logo.svg",
      backgroundVideo: "assets/themes/ps2/background-video-1.mp4",
      backgroundVideoGames: "assets/themes/ps2/background-video-2.mp4",
      backgroundImage: "",
      backgroundAudio: "assets/themes/ps2/background-audio.mp3",
      startupVideo: "assets/themes/ps2/startup.mp4",
      startupAudio: "",
      navigation: "assets/themes/ps2/navigation.mp3",
      select: "assets/themes/ps2/select.mp3",
      back: "assets/themes/ps2/back.mp3",
    },
  },
  ps1: {
    id: "ps1",
    name: "PlayStation",
    brandText: "PS",
    bootWordmark: "PLAYSTATION",
    systemLabel: "PS",
    themeColor: "#080735",
    assets: {
      logo: "assets/themes/ps1/logo.svg",
      backgroundVideo: "",
      backgroundImage: "assets/themes/ps1/background-1.jpg",
      backgroundAudio: "",
      startupVideo: "assets/themes/ps1/startup.mp4",
      startupAudio: "",
      navigation: "assets/themes/ps1/navigation.mp3",
      select: "assets/themes/ps1/select.mp3",
      back: "assets/themes/ps1/back.mp3",
    },
  },
  "xbox-classic": {
    id: "xbox-classic",
    name: "Classic Xbox",
    brandText: "XBOX",
    bootWordmark: "XBOX",
    systemLabel: "XBOX",
    themeColor: "#081c08",
    assets: {
      logo: "assets/themes/xbox-classic/logo.png",
      backgroundVideo: "",
      backgroundImage: "assets/themes/xbox-classic/background-image.png",
      backgroundAudio: "assets/themes/xbox-classic/ambient.wav",
      startupVideo: "assets/themes/xbox-classic/startup.mp4",
      startupAudio: "",
      navigation: "assets/themes/xbox-classic/navigation.wav",
      select: "assets/themes/xbox-classic/select.wav",
      back: "assets/themes/xbox-classic/back.wav",
    },
  },
  xbox360: {
    id: "xbox360",
    name: "Xbox 360",
    brandText: "XBOX 360",
    bootWordmark: "XBOX 360",
    systemLabel: "XBOX 360",
    themeColor: "#5f6566",
    assets: {
      logo: "",
      backgroundVideo: "",
      backgroundImage: "",
      backgroundAudio: "",
      startupVideo: "assets/themes/xbox360/startup.mp4",
      startupAudio: "",
      navigation: "assets/themes/xbox360/navigation.mp3",
      select: "assets/themes/xbox360/select.mp3",
      back: "assets/themes/xbox360/back.mp3",
    },
  },
  wii: {
    id: "wii",
    name: "Nintendo Wii",
    brandText: "Wii",
    bootWordmark: "Wii",
    systemLabel: "Wii",
    themeColor: "#f2f2f2",
    assets: {
      logo: "assets/themes/wii/logo.svg",
      backgroundVideo: "",
      backgroundImage: "",
      backgroundAudio: "assets/themes/wii/background-audio.mp3",
      startupImage: "assets/themes/wii/startup.jpg",
      startupVideo: "",
      startupAudio: "assets/themes/wii/startup.mp3",
      navigation: "",
      select: "assets/themes/wii/select.mp3",
      back: "assets/themes/wii/back.mp3",
    },
  },
  stadia: {
    id: "stadia",
    name: "Google Stadia",
    brandText: "STADIA",
    bootWordmark: "STADIA",
    systemLabel: "STADIA",
    themeColor: "#0f0f0f",
    assets: {
      logo: "assets/themes/stadia/logo.svg",
      backgroundVideo: "",
      backgroundImage: "",
      backgroundAudio: "",
      startupVideo: "assets/themes/stadia/startup.mp4",
      startupAudio: "",
      navigation: "",
      select: "",
      back: "",
    },
  },
};

const defaultGames = [
  {
    id: "nebula-protocol",
    title: "Nebula Protocol",
    platform: "Steam",
    description: "Venture beyond the frontier. Your library, your universe.",
    path: "",
    cover: "",
    background: "",
    accent: "#526fff",
    lastPlayed: "Played yesterday",
    playtime: "42 hours played",
  },
  {
    id: "ashen-circuit",
    title: "Ashen Circuit",
    platform: "Xbox",
    description: "Race through a city built from light, speed, and impossible turns.",
    path: "",
    cover: "",
    background: "",
    accent: "#f05a4f",
    lastPlayed: "Played 3 days ago",
    playtime: "18 hours played",
  },
  {
    id: "silent-atlas",
    title: "Silent Atlas",
    platform: "Epic",
    description: "Chart the forgotten places and uncover what the maps concealed.",
    path: "",
    cover: "",
    background: "",
    accent: "#29a9bc",
    lastPlayed: "Played last week",
    playtime: "11 hours played",
  },
  {
    id: "wildline",
    title: "Wildline",
    platform: "Ubisoft",
    description: "No roads. No rules. Just the long way home.",
    path: "",
    cover: "",
    background: "",
    accent: "#f19f39",
    lastPlayed: "Played 2 weeks ago",
    playtime: "65 hours played",
  },
  {
    id: "red-horizon",
    title: "Red Horizon",
    platform: "EA",
    description: "Hold the line at the edge of a changing world.",
    path: "",
    cover: "",
    background: "",
    accent: "#c64450",
    lastPlayed: "Played last month",
    playtime: "27 hours played",
  },
  {
    id: "echoes-of-vale",
    title: "Echoes of Vale",
    platform: "Standalone",
    description: "A quiet adventure through ruins that still remember your name.",
    path: "",
    cover: "",
    background: "",
    accent: "#8b6cc2",
    lastPlayed: "Not played recently",
    playtime: "8 hours played",
  },
];

const state = {
  games: normalizeGames(loadJson(STORAGE_KEYS.games, window.launcherDesktop ? [] : defaultGames)),
  settings: loadJson(STORAGE_KEYS.settings, {
    boot: true,
    gamepad: true,
    promptStyle: "auto",
    profileName: "Player",
    sound: true,
    theme: DEFAULT_THEME_ID,
    uiSize: "large",
    sort: "library",
    soundAssetsVersion: SOUND_ASSETS_VERSION,
  }),
  selectedId: null,
  gamepadIndex: null,
  previousButtons: [],
  previousAxes: [0, 0],
  axisRepeatAt: 0,
  focusedIndex: 0,
  lastFocusBeforeModal: null,
  deleteTargetId: null,
  visibleGameIds: [],
  currentView: "games",
  settingsPanelGroup: "theme",
  ps2Screen: "home",
  xboxScreen: "home",
  stadiaScreen: "home",
  stadiaRoute: "home",
  stadiaPlatformFilter: "all",
  xbox360DashboardPage: "games",
  xbox360LibraryOpen: false,
  xbox360LibraryPlatformFilter: "all",
  xbox360DashboardGameIds: [],
};

const desktop = window.launcherDesktop || null;
document.documentElement.classList.toggle("desktop-app", Boolean(desktop));
let desktopFullscreen = false;
let ambientAudioPending = false;
let bootSequenceActive = false;
let bootCompletionTimer = null;
let bootFallbackTimer = null;
let bootSkipHintTimer = null;
let startupFallbackAudio = null;
let launchAutoMuted = false;
let appWindowFocused = true;
let gamepadLoopScheduled = false;
let searchPanelOpenReason = null;
let suppressPs3AutoPanelUntil = 0;
let ps3BackgroundVideoQueue = [];
let ps3BackgroundVideoIndex = 0;
const railDrag = {
  active: false,
  moved: false,
  suppressClick: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  startScrollLeft: 0,
  startScrollTop: 0,
};

const elements = {
  body: document.body,
  metaThemeColor: document.querySelector('meta[name="theme-color"]'),
  boot: document.getElementById("boot"),
  ambientVideo: document.getElementById("ambientVideo"),
  uiRoot: document.getElementById("uiRoot"),
  libraryView: document.getElementById("libraryView"),
  ps2Home: document.getElementById("ps2Home"),
  ps2RootItems: [...document.querySelectorAll("[data-ps2-action]")],
  xboxHome: document.getElementById("xboxHome"),
  xboxRootItems: [...document.querySelectorAll("[data-xbox-action]")],
  ps2SystemDate: document.getElementById("ps2SystemDate"),
  ps2SystemClock: document.getElementById("ps2SystemClock"),
  gameRailWrap: document.querySelector(".game-rail-wrap"),
  gameRail: document.getElementById("gameRail"),
  ps4SideArt: document.getElementById("ps4SideArt"),
  ps4TitleGhost: document.getElementById("ps4TitleGhost"),
  heroArt: document.getElementById("heroArt"),
  heroContent: document.querySelector(".hero-content"),
  heroPlatform: document.getElementById("heroPlatform"),
  heroTitle: document.getElementById("heroTitle"),
  heroDescription: document.getElementById("heroDescription"),
  heroLastPlayed: document.getElementById("heroLastPlayed"),
  heroPlaytime: document.getElementById("heroPlaytime"),
  heroIndex: document.getElementById("heroIndex"),
  heroTotal: document.getElementById("heroTotal"),
  playButton: document.getElementById("playButton"),
  moreButton: document.getElementById("moreButton"),
  sortButton: document.getElementById("sortButton"),
  sortButtonValue: document.getElementById("sortButtonValue"),
  addGameButton: document.getElementById("addGameButton"),
  xbox360Gamertag: document.getElementById("xbox360Gamertag"),
  xbox360PageTabs: [...document.querySelectorAll("[data-xbox360-page]")],
  xbox360LibraryTile: document.getElementById("xbox360LibraryTile"),
  xbox360LibraryChrome: document.getElementById("xbox360LibraryChrome"),
  xbox360LibraryBack: document.getElementById("xbox360LibraryBack"),
  xbox360LibraryCount: document.getElementById("xbox360LibraryCount"),
  xbox360LibraryFilter: document.getElementById("xbox360LibraryFilter"),
  xbox360LibraryFilterValue: document.getElementById("xbox360LibraryFilterValue"),
  xbox360LibrarySort: document.getElementById("xbox360LibrarySort"),
  xbox360LibrarySortValue: document.getElementById("xbox360LibrarySortValue"),
  xbox360SearchTile: document.getElementById("xbox360SearchTile"),
  xbox360AddGameTile: document.getElementById("xbox360AddGameTile"),
  xbox360ProfileTile: document.getElementById("xbox360ProfileTile"),
  xbox360SettingsTile: document.getElementById("xbox360SettingsTile"),
  xbox360OptionsTile: document.getElementById("xbox360OptionsTile"),
  xbox360SettingsPage: document.getElementById("xbox360SettingsPage"),
  xbox360SettingsPreview: document.getElementById("xbox360SettingsPreview"),
  xbox360GamesPreview: document.getElementById("xbox360GamesPreview"),
  xbox360SettingsHubTiles: [...document.querySelectorAll(".xbox360-settings-hub-tile")],
  stadiaLibraryTitle: document.querySelector(".library-heading h1"),
  stadiaGenreFilter: document.getElementById("stadiaGenreFilter"),
  stadiaRecentFilter: document.getElementById("stadiaRecentFilter"),
  stadiaControllerButton: document.getElementById("stadiaControllerButton"),
  stadiaNavItems: [...document.querySelectorAll("[data-stadia-screen]")],
  gameModal: document.getElementById("gameModal"),
  gameModalTitle: document.getElementById("gameModalTitle"),
  deleteModal: document.getElementById("deleteModal"),
  deleteModalCopy: document.getElementById("deleteModalCopy"),
  confirmDeleteButton: document.getElementById("confirmDeleteButton"),
  modalBackdrop: document.getElementById("modalBackdrop"),
  gameForm: document.getElementById("gameForm"),
  gameId: document.getElementById("gameId"),
  gameTitle: document.getElementById("gameTitle"),
  gamePlatform: document.getElementById("gamePlatform"),
  gameAccent: document.getElementById("gameAccent"),
  gamePath: document.getElementById("gamePath"),
  gameDescription: document.getElementById("gameDescription"),
  gameCover: document.getElementById("gameCover"),
  gameBackground: document.getElementById("gameBackground"),
  browseExecutable: document.getElementById("browseExecutable"),
  browseCover: document.getElementById("browseCover"),
  browseBackground: document.getElementById("browseBackground"),
  desktopHint: document.getElementById("desktopHint"),
  settingsButton: document.getElementById("settingsButton"),
  settingsFullscreenButton: document.getElementById("settingsFullscreenButton"),
  settingsFullscreenLabel: document.getElementById("settingsFullscreenLabel"),
  backupLibraryButton: document.getElementById("backupLibraryButton"),
  loadLibraryButton: document.getElementById("loadLibraryButton"),
  refreshSteamButton: document.getElementById("refreshSteamButton"),
  importLauncher: document.getElementById("importLauncher"),
  restoreRemovedToggle: document.getElementById("restoreRemovedToggle"),
  steamDiscoveryStatus: document.getElementById("steamDiscoveryStatus"),
  libraryBackupInput: document.getElementById("libraryBackupInput"),
  profileButton: document.getElementById("profileButton"),
  closeAppButton: document.getElementById("closeAppButton"),
  closeSettings: document.getElementById("closeSettings"),
  settingsPanel: document.getElementById("settingsPanel"),
  settingsPanelBadge: document.getElementById("settingsPanelBadge"),
  profilePanel: document.getElementById("profilePanel"),
  xbox360ProfileClock: document.getElementById("xbox360ProfileClock"),
  xbox360ProfileBack: document.getElementById("xbox360ProfileBack"),
  xbox360ProfileEdit: document.getElementById("xbox360ProfileEdit"),
  xbox360ProfileName: document.getElementById("xbox360ProfileName"),
  profileSettingsButton: document.getElementById("profileSettingsButton"),
  profileShortcutButton: document.getElementById("profileShortcutButton"),
  profileSoundButton: document.getElementById("profileSoundButton"),
  profileSoundLabel: document.getElementById("profileSoundLabel"),
  profileCloseButton: document.getElementById("profileCloseButton"),
  bootSkip: document.querySelector(".boot-skip"),
  bootToggle: document.getElementById("bootToggle"),
  autoStartRow: document.getElementById("autoStartRow"),
  autoStartToggle: document.getElementById("autoStartToggle"),
  autoStartHelp: document.getElementById("autoStartHelp"),
  gamepadToggle: document.getElementById("gamepadToggle"),
  soundToggle: document.getElementById("soundToggle"),
  controllerSelectKey: document.getElementById("controllerSelectKey"),
  controllerSelectLabel: document.getElementById("controllerSelectLabel"),
  controllerBackKey: document.getElementById("controllerBackKey"),
  controllerBackLabel: document.getElementById("controllerBackLabel"),
  controllerOptionsKey: document.getElementById("controllerOptionsKey"),
  controllerOptionsLabel: document.getElementById("controllerOptionsLabel"),
  searchButton: document.getElementById("searchButton"),
  searchPanel: document.getElementById("searchPanel"),
  searchInput: document.getElementById("searchInput"),
  controllerStatus: document.getElementById("controllerStatus"),
  contextMenu: document.getElementById("contextMenu"),
  editGameButton: document.getElementById("editGameButton"),
  removeGameButton: document.getElementById("removeGameButton"),
  toast: document.getElementById("toast"),
  desktopStatusTitle: document.getElementById("desktopStatusTitle"),
  desktopStatusText: document.getElementById("desktopStatusText"),
  clock: document.getElementById("clock"),
  brand: document.querySelector(".brand"),
  brandLogo: document.getElementById("brandLogo"),
  brandText: document.getElementById("brandText"),
  greetingName: document.getElementById("greetingName"),
  profileAvatar: document.getElementById("profileAvatar"),
  profileTitle: document.getElementById("profileTitle"),
  profileNameInput: document.getElementById("profileNameInput"),
  saveProfileNameButton: document.getElementById("saveProfileNameButton"),
  navButtons: [...document.querySelectorAll(".nav-item")],
  settingsGroups: [...document.querySelectorAll("[data-settings-group]")],
  settingsGroupHeaders: [...document.querySelectorAll(".settings-group-header[data-focus]")],
  themeCards: [...document.querySelectorAll(".theme-card[data-theme]")],
  uiSizeButtons: [...document.querySelectorAll("[data-ui-size]")],
  promptStyleButtons: [...document.querySelectorAll("[data-prompt-style]")],
  bootVideo: document.getElementById("bootVideo"),
  bootFallback: document.getElementById("bootFallback"),
  bootWordmark: document.getElementById("bootWordmark"),
};

function normalizeThemeId(value) {
  if (value === "nexus") return DEFAULT_THEME_ID;
  return Object.hasOwn(THEMES, value) ? value : DEFAULT_THEME_ID;
}

function getTheme(themeId = state.settings.theme) {
  return THEMES[normalizeThemeId(themeId)] || THEMES[DEFAULT_THEME_ID];
}

function normalizePromptStyle(value) {
  return ["auto", "xbox", "playstation"].includes(value) ? value : "auto";
}

if (state.settings.soundAssetsVersion !== SOUND_ASSETS_VERSION) {
  state.settings.sound = true;
  state.settings.soundAssetsVersion = SOUND_ASSETS_VERSION;
  saveState();
}

if (!SORT_OPTIONS.some((option) => option.value === state.settings.sort)) {
  state.settings.sort = "library";
  saveState();
}

if (!state.settings.profileName || !String(state.settings.profileName).trim()) {
  state.settings.profileName = "Player";
  saveState();
}

const normalizedThemeId = normalizeThemeId(state.settings.theme);
if (state.settings.theme !== normalizedThemeId) {
  state.settings.theme = normalizedThemeId;
  saveState();
}

const normalizedPromptStyle = normalizePromptStyle(state.settings.promptStyle);
if (state.settings.promptStyle !== normalizedPromptStyle) {
  state.settings.promptStyle = normalizedPromptStyle;
  saveState();
}

const initialTheme = getTheme();

function getVersionedAudioAsset(src = "") {
  if (!src) return "";
  return `${src}${src.includes("?") ? "&" : "?"}v=${SOUND_ASSETS_VERSION}`;
}

const uiAudio = Object.fromEntries(
  ["navigation", "select", "back"].map((name) => {
    const audio = new Audio(getVersionedAudioAsset(initialTheme.assets[name] || ""));
    audio.preload = "auto";
    audio.volume = name === "navigation" ? 0.34 : 0.48;
    return [name, audio];
  }),
);

const ambientAudio = new Audio(getVersionedAudioAsset(initialTheme.assets.backgroundAudio || ""));
ambientAudio.preload = "auto";
ambientAudio.loop = true;
ambientAudio.volume = 0.16;

function loadJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function normalizeGames(games) {
  const sourceGames = Array.isArray(games) ? games : structuredClone(defaultGames);
  const fallbackStart = Date.now() - sourceGames.length * 1000;
  return sourceGames.map((game, index) => ({
    ...game,
    cover: game.cover || "",
    background: game.background || "",
    addedAt: Number.isFinite(game.addedAt) ? game.addedAt : fallbackStart + index * 1000,
  }));
}

function getSortOption(value = state.settings.sort) {
  return SORT_OPTIONS.find((option) => option.value === value) || SORT_OPTIONS[0];
}

function getThemeSystemLabel(theme = getTheme()) {
  return theme.systemLabel || theme.brandText || "SYSTEM";
}

function updateThemeCards() {
  elements.themeCards.forEach((button) => {
    const active = button.dataset.theme === state.settings.theme;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    const caption = button.querySelector("small");
    if (caption && !button.disabled) {
      caption.textContent = active ? "Current theme" : "Available now";
    }
  });
}

function setAudioSource(audio, src = "") {
  audio.pause();
  audio.currentTime = 0;
  if (src) {
    audio.src = src;
  } else {
    audio.removeAttribute("src");
  }
  audio.load();
}

function updateAmbientVideoState(isActive) {
  document.documentElement.classList.toggle("ambient-video-active", Boolean(isActive));
}

function isAppActive() {
  return appWindowFocused && !document.hidden;
}

function playAmbientVideo() {
  if (!isAppActive() || !elements.ambientVideo.getAttribute("src")) return;
  const playback = elements.ambientVideo.play();
  if (playback) playback.catch(() => {});
}

function syncAppActivity() {
  const isActive = isAppActive();
  document.documentElement.classList.toggle("app-inactive", !isActive);

  if (!isActive) {
    elements.ambientVideo.pause();
    ambientAudio.pause();
    return;
  }

  restoreLaunchMute();
  if (!document.body.classList.contains("booting")) playAmbientVideo();
  syncAmbientAudio();
  scheduleGamepadLoop();
}

function scheduleGamepadLoop() {
  if (gamepadLoopScheduled || !isAppActive()) return;
  gamepadLoopScheduled = true;
  requestAnimationFrame(gamepadLoop);
}

function shuffleList(items) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function getPs3BackgroundVideos() {
  const videos = getTheme("ps3").assets.backgroundVideos;
  return Array.isArray(videos) ? videos.filter(Boolean) : [];
}

function refillPs3BackgroundVideoQueue() {
  const videos = getPs3BackgroundVideos();
  if (!videos.length) {
    ps3BackgroundVideoQueue = [];
    ps3BackgroundVideoIndex = 0;
    return;
  }

  const currentSrc = elements.ambientVideo.getAttribute("src") || "";
  ps3BackgroundVideoQueue = shuffleList(videos);
  if (currentSrc && ps3BackgroundVideoQueue.length > 1 && ps3BackgroundVideoQueue[0] === currentSrc) {
    ps3BackgroundVideoQueue.push(ps3BackgroundVideoQueue.shift());
  }
  ps3BackgroundVideoIndex = 0;
}

function getNextPs3BackgroundVideo({ reset = false } = {}) {
  if (reset || ps3BackgroundVideoIndex >= ps3BackgroundVideoQueue.length) {
    refillPs3BackgroundVideoQueue();
  }

  if (!ps3BackgroundVideoQueue.length) return "";

  const nextSrc = ps3BackgroundVideoQueue[ps3BackgroundVideoIndex];
  ps3BackgroundVideoIndex += 1;
  return nextSrc;
}

function setAmbientVideoSource(src = "") {
  if (src) {
    if (elements.ambientVideo.getAttribute("src") !== src) {
      elements.ambientVideo.setAttribute("src", src);
      elements.ambientVideo.load();
    }
    return;
  }

  elements.ambientVideo.removeAttribute("src");
  elements.ambientVideo.load();
}

function loadAmbientVideoForTheme(theme, { resetRotation = false } = {}) {
  let nextSrc = theme.assets.backgroundVideo || "";
  elements.ambientVideo.loop = theme.id !== "ps3";

  if (theme.id === "ps2" && state.ps2Screen === "games") {
    nextSrc = theme.assets.backgroundVideoGames || theme.assets.backgroundVideo || "";
  }

  if (theme.id === "ps3") {
    const currentSrc = elements.ambientVideo.getAttribute("src") || "";
    const availableVideos = getPs3BackgroundVideos();
    const currentIsValid = availableVideos.includes(currentSrc);
    nextSrc =
      resetRotation || !currentIsValid
        ? getNextPs3BackgroundVideo({ reset: true })
        : currentSrc || getNextPs3BackgroundVideo({ reset: true });
  }

  setAmbientVideoSource(nextSrc);
}

function restartBootSequence() {
  clearBootTimers();
  stopBootMedia();
  elements.boot.classList.remove("done", "video-ready", "video-playing");
  elements.boot.classList.add("visible");
  elements.bootVideo.hidden = true;
  elements.bootVideo.classList.remove("ready");
  elements.bootVideo.currentTime = 0;
  elements.bootVideo.muted = false;
  elements.bootFallback.hidden = true;
  void elements.boot.offsetWidth;
  setupBoot();
}

let pendingThemeTransition = null;
let themeTransitionTimeout = null;
let controllerInputMode = false;

function setControllerInputMode(active) {
  const nextMode = Boolean(active);
  if (controllerInputMode === nextMode) return;
  controllerInputMode = nextMode;
  document.querySelectorAll(".controller-focus").forEach((element) => {
    element.classList.remove("controller-focus");
  });
  if (
    controllerInputMode &&
    document.activeElement instanceof HTMLElement &&
    isControllerFocusable(document.activeElement)
  ) {
    document.activeElement.classList.add("controller-focus");
  }
}

let steamDiscoveryBusy = false;
async function refreshSteamGames(notify = false) {
  if (!(desktop?.discoverLocal || desktop?.discoverSteam) || steamDiscoveryBusy) return;
  steamDiscoveryBusy = true;
  const sources = elements.importLauncher.value === "all"
    ? [...elements.importLauncher.options].filter((option) => option.value !== "all" && !option.disabled).map((option) => option.value)
    : [elements.importLauncher.value];
  const restoreRemoved = elements.restoreRemovedToggle.checked;
  elements.refreshSteamButton.disabled = true;
  elements.importLauncher.disabled = true;
  elements.restoreRemovedToggle.disabled = true;
  elements.steamDiscoveryStatus.textContent = "Scanning installed games...";
  try {
    const result = desktop.discoverLocal
      ? await desktop.discoverLocal(state.games.map(({ id, path }) => ({ id, path })), sources)
      : await desktop.discoverSteam();
    if (!result.ok) throw new Error(result.error || "Local discovery failed.");
    const reports = result.reports || { steam: { ...result, games: result.games.map((game) => ({ ...game, externalId: game.steamAppId })) } };
    const nextSettings = { ...state.settings };
    if (restoreRemoved) {
      nextSettings.hiddenImportedGames = (state.settings.hiddenImportedGames || []).filter((key) => !sources.includes(key.split(":")[0]));
      if (sources.includes("steam")) nextSettings.hiddenSteamGames = [];
    }
    const games = normalizeGames(SteamLibrary.reconcileSources(state.games, reports, {
      hidden: [...(nextSettings.hiddenImportedGames || []), ...(nextSettings.hiddenSteamGames || []).map((id) => `steam:${id}`)],
      resolvedPaths: result.resolvedPaths,
    }));
    if (JSON.stringify(games) !== JSON.stringify(state.games)) {
      localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(games));
      state.games = games;
      if (!games.some((game) => game.id === state.selectedId)) state.selectedId = getSortedGames(games)[0]?.id || null;
      renderCurrentView();
    }
    if (restoreRemoved) {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(nextSettings));
      state.settings = nextSettings;
      elements.restoreRemovedToggle.checked = false;
    }
    const detectedGames = SteamLibrary.reconcileSources([], reports);
    const counts = [...new Set(detectedGames.map((game) => game.platform))]
      .map((platform) => `${detectedGames.filter((game) => game.platform === platform).length} ${platform}`);
    const warnings = Object.entries(reports).filter(([, report]) => !report.ok || report.warnings?.length).map(([source]) => source);
    const message = `${counts.length ? counts.join(", ") : "No installed games found"}.${warnings.length ? ` Scan incomplete: ${warnings.join(", ")}.` : ""}`;
    elements.steamDiscoveryStatus.textContent = message;
    if (notify) showToast(message);
  } catch (error) {
    elements.steamDiscoveryStatus.textContent = error.message || "Local discovery failed.";
    if (notify) showToast(elements.steamDiscoveryStatus.textContent);
  } finally {
    steamDiscoveryBusy = false;
    elements.refreshSteamButton.disabled = false;
    elements.importLauncher.disabled = false;
    elements.restoreRemovedToggle.disabled = false;
  }
}

let libraryBackupBusy = false;

async function runLibraryBackupAction(action) {
  if (libraryBackupBusy) return;
  libraryBackupBusy = true;
  elements.backupLibraryButton.disabled = true;
  elements.loadLibraryButton.disabled = true;
  try {
    await action();
  } catch (error) {
    showToast(error.name === "QuotaExceededError"
      ? "Library storage is full. Your library has not changed. Free up space or use smaller artwork."
      : error.message || "Could not complete the library backup operation.");
  } finally {
    libraryBackupBusy = false;
    elements.backupLibraryButton.disabled = false;
    elements.loadLibraryButton.disabled = false;
  }
}

async function backupLibrary() {
  await runLibraryBackupAction(async () => {
    const contents = LibraryBackup.serialize(state.games);
    if (desktop?.saveLibraryBackup) {
      const result = await desktop.saveLibraryBackup(contents);
      if (result.canceled) return;
      if (!result.ok) throw new Error(result.error || "Could not save the library backup.");
      showToast("Library backup saved.");
      return;
    }
    const blob = new Blob([contents], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `FastStationBox-library-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    showToast("Library backup download started.");
  });
}

function restoreLibrary(contents) {
  const incoming = normalizeGames(LibraryBackup.parse(contents));
  const result = LibraryBackup.merge(state.games, incoming);
  if (!incoming.length) {
    showToast("This backup has no games. Your library has not changed.");
    return;
  }
  // Persist the complete validated library before changing the live UI.
  localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(result.games));
  state.games = result.games;
  renderCurrentView();
  showToast(`Library loaded: ${result.added} added, ${result.updated} updated.`);
}

async function loadLibraryBackup() {
  if (libraryBackupBusy) return;
  if (!desktop?.loadLibraryBackup) {
    elements.libraryBackupInput.value = "";
    elements.libraryBackupInput.click();
    return;
  }
  await runLibraryBackupAction(async () => {
    const result = await desktop.loadLibraryBackup();
    if (result.canceled) return;
    if (!result.ok) throw new Error(result.error || "Could not read the library backup.");
    restoreLibrary(result.contents);
  });
}

function clearPendingThemeTransition() {
  if (themeTransitionTimeout) {
    window.clearTimeout(themeTransitionTimeout);
    themeTransitionTimeout = null;
  }
  pendingThemeTransition = null;
  document.body.classList.remove("theme-transition-active");
  document.removeEventListener("pointerdown", handleThemeTransitionSkip);
  document.removeEventListener("touchstart", handleThemeTransitionSkip);
}

function handleThemeTransitionSkip() {
  if (!pendingThemeTransition) return;
  const { finishTransition } = pendingThemeTransition;
  if (finishTransition) finishTransition();
}

function showThemeTransitionVideo({ themeId = state.settings.theme, persist = false, announce = false, sourceThemeId = state.settings.theme } = {}) {
  const transitionVideoPath = sourceThemeId === "ps5"
    ? "assets/themes/ps5/shutdown.mp4"
    : "assets/themes/ps2/red-screen-of-death.mp4";
  clearPendingThemeTransition();

  elements.ambientVideo.pause();
  elements.ambientVideo.currentTime = 0;
  elements.ambientVideo.loop = false;
  elements.ambientVideo.muted = false;
  elements.ambientVideo.defaultMuted = false;
  elements.ambientVideo.volume = 0.9;
  elements.ambientVideo.setAttribute("src", transitionVideoPath);
  elements.ambientVideo.load();
  updateAmbientVideoState(true);
  document.body.classList.add("theme-transition-active");

  const finishTransition = () => {
    elements.ambientVideo.removeEventListener("loadedmetadata", handleVideoMetadata);
    elements.ambientVideo.removeEventListener("ended", finishTransition);
    document.removeEventListener("pointerdown", handleThemeTransitionSkip);
    document.removeEventListener("touchstart", handleThemeTransitionSkip);
    clearPendingThemeTransition();
    applyThemeNow(themeId, { persist, announce });
  };

  const handleVideoMetadata = () => {
    const durationMs = Number.isFinite(elements.ambientVideo.duration) && elements.ambientVideo.duration > 0
      ? Math.max(1000, Math.round(elements.ambientVideo.duration * 1000))
      : 3200;
    if (themeTransitionTimeout) window.clearTimeout(themeTransitionTimeout);
    themeTransitionTimeout = window.setTimeout(() => {
      if (pendingThemeTransition?.themeId === themeId) {
        finishTransition();
      }
    }, durationMs);
  };

  pendingThemeTransition = { themeId, persist, announce, finishTransition };
  elements.ambientVideo.addEventListener("loadedmetadata", handleVideoMetadata, { once: true });
  elements.ambientVideo.addEventListener("ended", finishTransition, { once: true });

  window.setTimeout(() => {
    document.addEventListener("pointerdown", handleThemeTransitionSkip, { once: false });
    document.addEventListener("touchstart", handleThemeTransitionSkip, { once: false });
  }, 0);

  playAmbientVideo();
}

function applyTheme(themeId = state.settings.theme, { persist = false, announce = false } = {}) {
  const previousThemeId = state.settings.theme;
  const theme = getTheme(themeId);
  const themeChanged = previousThemeId !== theme.id;

  if (themeChanged && ["ps2", "ps5"].includes(previousThemeId) && theme.id !== previousThemeId) {
    showThemeTransitionVideo({ themeId: theme.id, persist, announce, sourceThemeId: previousThemeId });
    return;
  }

  applyThemeNow(theme.id, { persist, announce });
}

function applyThemeNow(themeId = state.settings.theme, { persist = false, announce = false } = {}) {
  const previousThemeId = state.settings.theme;
  const theme = getTheme(themeId);
  const themeChanged = previousThemeId !== theme.id;
  const shouldReplayBoot =
    themeChanged &&
    state.settings.boot &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (themeChanged) stopAllAudioPlayback();

  if (shouldReplayBoot) {
    document.body.classList.add("booting");
    elements.boot.classList.remove("done", "video-ready", "video-playing");
    elements.boot.classList.add("visible");
    elements.bootSkip.classList.remove("visible");
    elements.bootVideo.hidden = true;
    elements.bootVideo.classList.remove("ready");
    elements.bootFallback.hidden = true;
  }

  if (theme.id !== "xbox360") {
    state.xbox360DashboardPage = "games";
    state.xbox360LibraryOpen = false;
    document.documentElement.classList.remove("xbox360-settings-page-open");
    document.documentElement.classList.remove("xbox360-settings-open");
    document.documentElement.classList.remove("xbox360-profile-open");
  } else if (themeChanged) {
    state.xbox360DashboardPage = "games";
    state.xbox360LibraryOpen = false;
  }
  state.settings.theme = theme.id;
  document.documentElement.dataset.theme = theme.id;
  if (theme.id === "ps2") {
    if (themeChanged) state.ps2Screen = "home";
    document.documentElement.dataset.ps2Screen = state.ps2Screen;
  } else {
    delete document.documentElement.dataset.ps2Screen;
  }
  if (theme.id === "xbox-classic") {
    if (themeChanged) state.xboxScreen = "home";
    document.documentElement.dataset.xboxScreen = state.xboxScreen;
  } else {
    delete document.documentElement.dataset.xboxScreen;
  }
  if (theme.id === "stadia") {
    if (themeChanged) {
      state.stadiaScreen = "home";
      state.stadiaRoute = "home";
    }
    document.documentElement.dataset.stadiaScreen = state.stadiaScreen;
    document.documentElement.dataset.stadiaRoute = state.stadiaRoute;
    syncStadiaSearchPanelPosition();
    syncStadiaCardOptionsButton();
  } else {
    delete document.documentElement.dataset.stadiaScreen;
    delete document.documentElement.dataset.stadiaRoute;
    syncStadiaSearchPanelPosition();
    syncStadiaCardOptionsButton();
  }
  elements.metaThemeColor?.setAttribute("content", theme.themeColor);
  elements.body.style.setProperty(
    "--theme-background-image",
    theme.assets.backgroundImage ? safeCssUrl(theme.assets.backgroundImage) : "none",
  );
  elements.bootFallback.style.backgroundImage = theme.assets.startupImage
    ? safeCssUrl(theme.assets.startupImage)
    : "";
  elements.bootFallback.style.backgroundPosition = theme.assets.startupImage ? "center" : "";
  elements.bootFallback.style.backgroundRepeat = theme.assets.startupImage ? "no-repeat" : "";
  elements.bootFallback.style.backgroundSize = theme.assets.startupImage ? "contain" : "";
  elements.bootFallback.style.backgroundColor = theme.assets.startupImage ? "#000" : "";
  elements.bootWordmark.textContent = theme.bootWordmark;
  elements.brandText.textContent = theme.brandText;
  elements.brandText.hidden = false;
  if (theme.id === "ps3") {
    elements.brandText.textContent = normalizeProfileName(state.settings.profileName);
    elements.brandLogo.hidden = true;
    if (elements.brandLogo.getAttribute("src") !== theme.assets.logo) {
      elements.brandLogo.setAttribute("src", theme.assets.logo);
    }
  } else if (theme.assets.logo) {
    elements.brandLogo.hidden = false;
    if (elements.brandLogo.getAttribute("src") !== theme.assets.logo) {
      elements.brandLogo.setAttribute("src", theme.assets.logo);
    }
    if (elements.brandLogo.complete && elements.brandLogo.naturalWidth > 0) {
      elements.brandText.hidden = true;
    }
  } else {
    elements.brandLogo.hidden = true;
    elements.brandLogo.removeAttribute("src");
  }

  elements.ambientVideo.pause();
  updateAmbientVideoState(false);
  elements.ambientVideo.muted = true;
  elements.ambientVideo.defaultMuted = true;
  elements.ambientVideo.volume = 0;
  elements.ambientVideo.setAttribute("poster", theme.assets.backgroundImage || "");
  loadAmbientVideoForTheme(theme, { resetRotation: themeChanged });

  elements.bootVideo.classList.remove("ready");
  elements.bootVideo.hidden = false;
  elements.bootFallback.hidden = true;
  if (theme.assets.startupVideo) {
    if (elements.bootVideo.getAttribute("src") !== theme.assets.startupVideo) {
      elements.bootVideo.setAttribute("src", theme.assets.startupVideo);
      elements.bootVideo.load();
    }
  } else {
    elements.bootVideo.removeAttribute("src");
    elements.bootVideo.load();
  }

  setAudioSource(ambientAudio, getVersionedAudioAsset(theme.assets.backgroundAudio || ""));
  ["navigation", "select", "back"].forEach((name) =>
    setAudioSource(uiAudio[name], getVersionedAudioAsset(theme.assets[name] || "")),
  );

  updateThemeCards();
  setSettingsPanelGroup(state.settingsPanelGroup);
  updateControllerPromptsUi();
  syncXbox360DashboardPageUi();
  syncXbox360LibraryUi();
  updateClock();
  updateHero();

  if (themeChanged && persist) {
    elements.modalBackdrop.hidden = true;
    elements.settingsPanel.classList.remove("open");
    elements.settingsPanel.classList.remove("view-active");
    document.documentElement.classList.remove("xbox360-settings-open");
    document.documentElement.classList.remove("xbox360-profile-open");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    elements.settingsPanel.style.top = "";
    elements.settingsPanel.style.left = "";
    elements.settingsPanel.style.right = "";
    elements.settingsPanel.style.bottom = "";
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.setAttribute("inert", "");
    elements.profilePanel.classList.remove("view-active");
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.style.top = "";
    elements.profilePanel.style.left = "";
    elements.profilePanel.style.right = "";
    elements.profilePanel.style.bottom = "";
    elements.brand.classList.remove("active");
    setActiveView("games");
  } else if (theme.id === "ps3") {
    if (state.currentView === "settings") {
      setActiveView("settings");
    } else if (state.currentView === "profile") {
      setActiveView("profile");
    } else if (elements.settingsPanel.classList.contains("open")) {
      elements.modalBackdrop.hidden = true;
      positionSettingsPanel();
    }
  } else {
    if (["settings", "profile"].includes(state.currentView)) {
      setActiveView("games");
    }
    elements.settingsPanel.style.top = "";
    elements.settingsPanel.style.left = "";
    elements.settingsPanel.style.right = "";
    elements.settingsPanel.style.bottom = "";
    elements.profilePanel.classList.remove("view-active");
    elements.profilePanel.classList.remove("open");
    if (elements.settingsPanel.classList.contains("open")) {
      elements.modalBackdrop.hidden = false;
    }
  }

  if (shouldReplayBoot) {
    restartBootSequence();
  } else if (!document.body.classList.contains("booting")) {
    playAmbientVideo();
  }

  if (themeChanged) syncAmbientAudio();

  if (persist && themeChanged) {
    saveState();
  }

  if (announce && themeChanged) {
    showToast(`${theme.name} theme enabled`);
  }
  syncThemeLandingVisibility();
}

function syncThemeLandingVisibility() {
  const isPs2 = state.settings.theme === "ps2";
  const isXboxClassic = state.settings.theme === "xbox-classic";
  const showHome = isPs2 && state.ps2Screen === "home";
  const showGames = isPs2 && state.ps2Screen === "games";
  elements.ps2Home.hidden = !showHome;

  const showXboxHome = isXboxClassic && state.xboxScreen === "home";
  const showXboxGames = isXboxClassic && state.xboxScreen === "games";
  if (elements.xboxHome) elements.xboxHome.hidden = !showXboxHome;

  if (isPs2) {
    elements.libraryView.hidden = !showGames;
  } else if (isXboxClassic) {
    elements.libraryView.hidden = state.currentView !== "games" || !showXboxGames;
  } else if (state.currentView === "games") {
    elements.libraryView.hidden = false;
  }
}

function setStadiaScreen(screen, { route = screen, focus = false } = {}) {
  if (state.settings.theme !== "stadia") return;
  state.stadiaScreen = screen === "library" ? "library" : "home";
  state.stadiaRoute = ["home", "library"].includes(route)
    ? route
    : state.stadiaScreen === "library"
      ? "library"
      : "home";
  document.documentElement.dataset.stadiaScreen = state.stadiaScreen;
  document.documentElement.dataset.stadiaRoute = state.stadiaRoute;
  elements.stadiaNavItems.forEach((button) => {
    button.classList.toggle("active", (button.dataset.stadiaRoute || button.textContent.trim().toLowerCase()) === state.stadiaRoute);
  });
  renderCurrentView();
  requestAnimationFrame(() => {
    elements.uiRoot.scrollTo({ top: 0, behavior: "smooth" });
  });
  if (focus) {
    const target = state.stadiaScreen === "library"
      ? document.querySelector(".game-card.selected") || document.querySelector(".game-card")
      : elements.playButton;
    setTimeout(() => focusWithoutScroll(target), 30);
  }
}

function cycleStadiaPlatformFilter() {
  const platforms = ["all", ...new Set(state.games.map((game) => game.platform).filter(Boolean))];
  const currentIndex = platforms.indexOf(state.stadiaPlatformFilter);
  state.stadiaPlatformFilter = platforms[(currentIndex + 1) % platforms.length] || "all";
  if (elements.stadiaGenreFilter?.firstChild) {
    elements.stadiaGenreFilter.firstChild.textContent =
      `${state.stadiaPlatformFilter === "all" ? "All stores" : state.stadiaPlatformFilter} `;
  }
  renderCurrentView();
  showToast(state.stadiaPlatformFilter === "all" ? "Showing all games" : `Platform: ${state.stadiaPlatformFilter}`);
}

function getXbox360LibraryPlatformFilters() {
  return ["all", ...new Set(state.games.map((game) => game.platform).filter(Boolean))];
}

function updateXbox360LibraryFilterUi() {
  const filters = getXbox360LibraryPlatformFilters();
  if (!filters.includes(state.xbox360LibraryPlatformFilter)) {
    state.xbox360LibraryPlatformFilter = "all";
  }
  const label =
    state.xbox360LibraryPlatformFilter === "all"
      ? "all games"
      : `${state.xbox360LibraryPlatformFilter.toLowerCase()} games`;
  if (elements.xbox360LibraryFilterValue) {
    elements.xbox360LibraryFilterValue.textContent = label;
  }
  elements.xbox360LibraryFilter?.setAttribute(
    "aria-label",
    `Show me ${label}. Activate to show the next platform.`,
  );
}

function cycleXbox360LibraryPlatformFilter() {
  const filters = getXbox360LibraryPlatformFilters();
  const currentIndex = filters.indexOf(state.xbox360LibraryPlatformFilter);
  state.xbox360LibraryPlatformFilter =
    filters[(currentIndex + 1) % filters.length] || "all";
  updateXbox360LibraryFilterUi();
  renderCurrentView();
  showToast(
    state.xbox360LibraryPlatformFilter === "all"
      ? "Showing all games"
      : `Showing ${state.xbox360LibraryPlatformFilter} games`,
  );
}

function setPs2Screen(screen, { focus = false, focusTarget = null } = {}) {
  if (state.settings.theme !== "ps2") return;
  state.ps2Screen = ["games", "profile", "settings"].includes(screen) ? screen : "home";
  document.documentElement.dataset.ps2Screen = state.ps2Screen;
  syncThemeLandingVisibility();

  const theme = getTheme("ps2");
  const videoSource =
    state.ps2Screen === "home"
      ? theme.assets.backgroundVideo || ""
      : theme.assets.backgroundVideoGames || theme.assets.backgroundVideo || "";
  elements.ambientVideo.muted = true;
  elements.ambientVideo.defaultMuted = true;
  elements.ambientVideo.volume = 0;
  elements.ambientVideo.loop = true;
  setAmbientVideoSource(videoSource);
  playAmbientVideo();

  if (!focus) return;
  const activeSettingsHeader =
    elements.settingsGroups.find((section) => section.classList.contains("active"))?.querySelector("[data-focus]") ||
    elements.settingsGroupHeaders[0];
  const target =
    focusTarget instanceof HTMLElement
      ? focusTarget
      : typeof focusTarget === "string" && state.ps2Screen === "home"
        ? elements.ps2RootItems.find((button) => button.dataset.ps2Action === focusTarget)
        : state.ps2Screen === "home"
          ? elements.ps2RootItems.find((button) => button.dataset.ps2Action === "games")
          : state.ps2Screen === "games"
            ? document.querySelector(".game-card.selected") || document.querySelector(".game-card")
            : state.ps2Screen === "settings"
              ? activeSettingsHeader || elements.closeSettings
              : elements.profileSettingsButton;
  setTimeout(() => focusWithoutScroll(target), 60);
}

function setXboxScreen(screen, { focus = false, focusTarget = null } = {}) {
  if (state.settings.theme !== "xbox-classic") return;
  state.xboxScreen = ["games", "profile", "settings"].includes(screen) ? screen : "home";
  document.documentElement.dataset.xboxScreen = state.xboxScreen;
  syncThemeLandingVisibility();

  if (!focus) return;
  const activeSettingsHeader =
    elements.settingsGroups.find((section) => section.classList.contains("active"))?.querySelector("[data-focus]") ||
    elements.settingsGroupHeaders[0];
  const target =
    focusTarget instanceof HTMLElement
      ? focusTarget
      : typeof focusTarget === "string" && state.xboxScreen === "home"
        ? elements.xboxRootItems.find((button) => button.dataset.xboxAction === focusTarget)
        : state.xboxScreen === "home"
          ? elements.xboxRootItems.find((button) => button.dataset.xboxAction === "games")
          : state.xboxScreen === "games"
            ? document.querySelector(".game-card.selected") || document.querySelector(".game-card")
            : state.xboxScreen === "settings"
              ? activeSettingsHeader || elements.closeSettings
              : elements.profileSettingsButton;
  setTimeout(() => focusWithoutScroll(target), 60);
}

function getSortedGames(games = state.games, sortValue = state.settings.sort) {
  const sort = getSortOption(sortValue).value;
  const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
  const sorted = [...games];

  switch (sort) {
    case "title-asc":
      sorted.sort((a, b) => collator.compare(a.title, b.title));
      break;
    case "title-desc":
      sorted.sort((a, b) => collator.compare(b.title, a.title));
      break;
    case "recent":
      sorted.sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0) || collator.compare(a.title, b.title));
      break;
    case "platform":
      sorted.sort(
        (a, b) =>
          collator.compare(a.platform, b.platform) || collator.compare(a.title, b.title),
      );
      break;
    default:
      break;
  }

  return sorted;
}

function updateXbox360DashboardCards(games = state.games) {
  if (state.settings.theme !== "xbox360") return;

  const dashboardCount = Math.min(2, games.length);
  let candidates = games.filter((game) => game.id !== state.selectedId);
  if (candidates.length < dashboardCount) candidates = [...games];

  const candidateIds = new Set(candidates.map((game) => game.id));
  const hasValidSelection =
    state.xbox360DashboardGameIds.length === dashboardCount &&
    state.xbox360DashboardGameIds.every((id) => candidateIds.has(id));

  if (!hasValidSelection) {
    const shuffled = [...candidates];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    state.xbox360DashboardGameIds = shuffled.slice(0, dashboardCount).map((game) => game.id);
  }

  const dashboardIds = new Set(state.xbox360DashboardGameIds);
  document.querySelectorAll(".game-card").forEach((card) => {
    card.classList.toggle("xbox360-home-game", dashboardIds.has(card.dataset.gameId));
  });
}

function updateSortButton() {
  const current = getSortOption();
  elements.sortButtonValue.textContent = current.label;
  if (elements.stadiaRecentFilter?.firstChild) {
    elements.stadiaRecentFilter.firstChild.textContent = `${current.label} `;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(state.games));
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

function playUiSound(name) {
  if (!state.settings.sound || launchAutoMuted) return;
  const audio = uiAudio[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function startAmbientAudio() {
  if (!isAppActive() || !state.settings.sound || launchAutoMuted || document.body.classList.contains("booting")) return;
  const playback = ambientAudio.play();
  if (playback) {
    playback
      .then(() => {
        ambientAudioPending = false;
      })
      .catch(() => {
        ambientAudioPending = true;
      });
  }
}

function syncAmbientAudio() {
  if (!isAppActive() || !state.settings.sound || launchAutoMuted) {
    ambientAudio.pause();
    ambientAudioPending = false;
    return;
  }

  startAmbientAudio();
}

function stopAllAudioPlayback() {
  ambientAudio.pause();
  ambientAudio.currentTime = 0;
  ambientAudioPending = false;
  Object.values(uiAudio).forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function muteForLaunchedGame() {
  launchAutoMuted = true;
  stopAllAudioPlayback();
}

function restoreLaunchMute() {
  if (!launchAutoMuted) return;
  launchAutoMuted = false;
  syncAmbientAudio();
}

function updateFullscreenButton(isFullscreen) {
  elements.settingsFullscreenLabel.textContent = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";
}

function getConnectedGamepad() {
  const pads = navigator.getGamepads?.() || [];
  return state.gamepadIndex !== null ? pads[state.gamepadIndex] : [...pads].find(Boolean) || null;
}

function isPlayStationTheme(themeId = state.settings.theme) {
  return ["ps5", "ps4", "ps3", "ps2", "ps1"].includes(normalizeThemeId(themeId));
}

function isFullPageMenuTheme(themeId = state.settings.theme) {
  return ["ps3", "ps1"].includes(normalizeThemeId(themeId));
}

function isPlayStationController(gamepad = getConnectedGamepad()) {
  const id = String(gamepad?.id || "").toLowerCase();
  return ["sony", "playstation", "dualsense", "dualsense", "dualshock", "wireless controller"].some((token) =>
    id.includes(token),
  );
}

function resolvePromptStyle() {
  const promptStyle = normalizePromptStyle(state.settings.promptStyle);
  if (promptStyle !== "auto") return promptStyle;
  if (isPlayStationController()) return "playstation";
  return isPlayStationTheme() ? "playstation" : "xbox";
}

function setControllerKeyContent(element, content, { isMarkup = false } = {}) {
  if (!element) return;
  if (isMarkup) {
    element.innerHTML = content;
  } else {
    element.textContent = content;
  }
}

function controllerAssetMarkup(src, label) {
  return `<img src="${src}" alt="" aria-hidden="true" data-controller-asset="${label}">`;
}

function getPlayStationThemePrompts(themeId = state.settings.theme) {
  const theme = normalizeThemeId(themeId);
  if (["ps1", "ps2", "ps3"].includes(theme)) {
    const base = `assets/themes/${theme}`;
    return {
      selectKey: controllerAssetMarkup(`${base}/PlayStation_button_X.svg`, "cross"),
      backKey: controllerAssetMarkup(`${base}/PlayStation_button_C.svg`, "circle"),
      optionsKey: controllerAssetMarkup(`${base}/PlayStation_button_Start.svg`, "start"),
      markup: true,
    };
  }

  if (theme === "ps4") {
    const base = "assets/themes/ps4";
    return {
      selectKey: controllerAssetMarkup(`${base}/PlayStation_button_X.svg`, "cross"),
      backKey: controllerAssetMarkup(`${base}/PlayStation_button_C.svg`, "circle"),
      optionsKey: controllerAssetMarkup(`${base}/PlayStation_4_Options_button.svg`, "options"),
      markup: true,
    };
  }

  return {
    selectKey: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7 17 17M17 7 7 17"/></svg>',
    backKey: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.75"/></svg>',
    optionsKey: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8.25h8M8 15.75h8"/></svg>',
    markup: true,
  };
}

function updateControllerPromptsUi() {
  const promptStyle = resolvePromptStyle();
  const prompts =
    promptStyle === "playstation"
      ? getPlayStationThemePrompts()
      : {
          selectKey: "A",
          backKey: "B",
          optionsKey: "\u2630",
          markup: false,
        };

  document.documentElement.dataset.controllerPrompts = promptStyle;
  setControllerKeyContent(elements.controllerSelectKey, prompts.selectKey, { isMarkup: prompts.markup });
  setControllerKeyContent(elements.controllerBackKey, prompts.backKey, { isMarkup: prompts.markup });
  setControllerKeyContent(elements.controllerOptionsKey, prompts.optionsKey, { isMarkup: prompts.markup });

  elements.promptStyleButtons.forEach((button) => {
    const active = button.dataset.promptStyle === normalizePromptStyle(state.settings.promptStyle);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function updateSoundUi() {
  elements.soundToggle.checked = state.settings.sound;
  elements.profileSoundLabel.textContent = `Interface sounds: ${state.settings.sound ? "On" : "Off"}`;
}

function updateAutoStartUi(status = {}) {
  const hasDesktopApi = Boolean(desktop?.getAutoStart && desktop?.setAutoStart);
  const supported = hasDesktopApi && status.supported !== false;
  const busy = Boolean(status.busy);
  const enabled = Boolean(status.enabled);

  elements.autoStartToggle.checked = enabled;
  elements.autoStartToggle.disabled = !supported || busy;
  elements.autoStartRow.classList.toggle("disabled", !supported || busy);
  elements.autoStartRow.setAttribute("aria-disabled", String(!supported || busy));

  if (!hasDesktopApi) {
    elements.autoStartHelp.textContent = "Available in the desktop app";
  } else if (busy) {
    elements.autoStartHelp.textContent = status.message || "Checking system startup setting";
  } else if (status.ok === false) {
    elements.autoStartHelp.textContent = status.error || "Could not read system startup setting";
  } else if (status.supported === false) {
    elements.autoStartHelp.textContent = "Auto start is not supported on this platform";
  } else if (status.status === "requires-approval") {
    elements.autoStartHelp.textContent = "Approval required in system login items";
  } else {
    elements.autoStartHelp.textContent = enabled
      ? "FastStationBox starts when you sign in"
      : "FastStationBox will not start on sign-in";
  }
}

async function refreshAutoStartUi() {
  if (!desktop?.getAutoStart || !desktop?.setAutoStart) {
    updateAutoStartUi({ supported: false, enabled: false });
    return;
  }

  updateAutoStartUi({
    supported: true,
    enabled: elements.autoStartToggle.checked,
    busy: true,
  });

  try {
    updateAutoStartUi(await desktop.getAutoStart());
  } catch (error) {
    updateAutoStartUi({
      ok: false,
      supported: true,
      enabled: false,
      error: error instanceof Error ? error.message : "Could not read auto start settings.",
    });
  }
}

async function updateAutoStartSetting(enabled) {
  if (!desktop?.setAutoStart) {
    updateAutoStartUi({ supported: false, enabled: false });
    showToast("Auto start requires the desktop app.");
    return;
  }

  updateAutoStartUi({
    supported: true,
    enabled,
    busy: true,
    message: enabled ? "Enabling system startup..." : "Disabling system startup...",
  });

  try {
    const result = await desktop.setAutoStart(enabled);
    updateAutoStartUi(result);
    showToast(
      result.ok
        ? `Auto start ${result.enabled ? "enabled" : "disabled"}`
        : result.error || "Could not update auto start.",
    );
  } catch (error) {
    updateAutoStartUi({
      ok: false,
      supported: true,
      enabled: !enabled,
      error: error instanceof Error ? error.message : "Could not update auto start settings.",
    });
    showToast("Could not update auto start.");
  }
}

function normalizeProfileName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 24) || "Player";
}

function getProfileInitial(name = state.settings.profileName) {
  const [first = "P"] = normalizeProfileName(name);
  return first.toUpperCase();
}

function updateProfileUi() {
  const profileName = normalizeProfileName(state.settings.profileName);
  state.settings.profileName = profileName;
  elements.greetingName.textContent = profileName;
  if (elements.xbox360Gamertag) {
    elements.xbox360Gamertag.textContent = profileName;
  }
  if (elements.xbox360ProfileName) {
    elements.xbox360ProfileName.textContent = profileName;
  }
  if (state.settings.theme === "ps3") {
    elements.brandText.textContent = profileName;
  }
  elements.profileButton.textContent = getProfileInitial(profileName);
  elements.profileTitle.textContent = profileName;
  if (elements.profileAvatar) {
    elements.profileAvatar.textContent = getProfileInitial(profileName);
  }
  elements.profileNameInput.value = profileName;
}

function saveProfileName() {
  const nextName = normalizeProfileName(elements.profileNameInput.value);
  elements.profileNameInput.value = nextName;
  if (state.settings.profileName === nextName) return;
  state.settings.profileName = nextName;
  saveState();
  updateProfileUi();
  showToast(`Profile name: ${nextName}`);
}

function setSoundEnabled(enabled) {
  state.settings.sound = Boolean(enabled);
  saveState();
  updateSoundUi();
  syncAmbientAudio();
}

function getActiveSearchQuery() {
  return elements.searchPanel.classList.contains("open") ? elements.searchInput.value || "" : "";
}

function syncStadiaSearchPanelPosition() {
  if (state.settings.theme !== "stadia") {
    elements.searchPanel.style.top = "";
    elements.searchPanel.style.left = "";
    elements.searchPanel.style.width = "";
    elements.searchPanel.style.height = "";
    return;
  }

  const rect = elements.searchButton.getBoundingClientRect();
  const isOpen = elements.searchPanel.classList.contains("open");

  if (isOpen) {
    elements.searchPanel.style.top = "";
    elements.searchPanel.style.left = "";
    elements.searchPanel.style.width = "";
    elements.searchPanel.style.height = "";
    return;
  }

  elements.searchPanel.style.top = `${Math.round(rect.top)}px`;
  elements.searchPanel.style.left = `${Math.round(rect.left)}px`;
  elements.searchPanel.style.width = `${Math.round(rect.width)}px`;
  elements.searchPanel.style.height = `${Math.round(rect.height)}px`;
}

function syncStadiaCardOptionsButton() {
  const shouldShow =
    state.settings.theme === "stadia" &&
    state.stadiaScreen === "library" &&
    state.currentView === "games";
  document.querySelectorAll(".game-card-options").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const selected = shouldShow && button.dataset.gameId === state.selectedId;
    button.hidden = !selected;
    button.tabIndex = selected ? 0 : -1;
  });
}

function isContextMenuTrigger(target) {
  return (
    !!target &&
    ((elements.moreButton instanceof HTMLElement && elements.moreButton.contains(target)) ||
      (target instanceof Element && !!target.closest(".game-card-options")))
  );
}

function openSearchPanel(reason = "manual") {
  if (elements.searchPanel.classList.contains("open")) {
    if (reason === "manual") {
      searchPanelOpenReason = "manual";
      elements.searchInput.focus();
      elements.searchInput.select();
    }
    renderCurrentView();
    return;
  }

  closeOverlays();
  state.lastFocusBeforeModal = document.activeElement;
  searchPanelOpenReason = reason;
  elements.searchPanel.classList.add("open");
  elements.searchPanel.setAttribute("aria-hidden", "false");
  syncStadiaSearchPanelPosition();
  elements.searchButton.classList.add("active");
  if (reason === "manual") {
    elements.searchInput.focus();
    elements.searchInput.select();
  }
  renderCurrentView();
}

function closeSearchPanel({ clearQuery = false } = {}) {
  const wasOpen = elements.searchPanel.classList.contains("open");
  const hadQuery = Boolean(elements.searchInput.value);
  elements.searchPanel.classList.remove("open");
  elements.searchPanel.setAttribute("aria-hidden", "true");
  elements.searchButton.classList.remove("active");
  searchPanelOpenReason = null;
  if (state.settings.theme === "stadia") syncStadiaSearchPanelPosition();

  if (clearQuery && elements.searchInput.value) {
    elements.searchInput.value = "";
  }

  if (wasOpen && (hadQuery || clearQuery)) renderCurrentView();

  return wasOpen;
}

function maybeAutoCloseSearchPanel() {
  if (state.settings.theme !== "ps3") return;
  if (!elements.searchPanel.classList.contains("open")) return;
  if (!["hover", "focus"].includes(searchPanelOpenReason)) return;

  const activeElement = document.activeElement;
  const interacting =
    elements.searchButton.matches(":hover") ||
    elements.searchPanel.matches(":hover") ||
    elements.searchButton.contains(activeElement) ||
    elements.searchPanel.contains(activeElement);

  if (interacting) return;

  closeSearchPanel({ clearQuery: false });
}

function focusWithoutScroll(target) {
  if (!(target instanceof HTMLElement)) return;

  const windowScrollX = window.scrollX;
  const windowScrollY = window.scrollY;
  const uiScrollLeft = elements.uiRoot.scrollLeft;
  const uiScrollTop = elements.uiRoot.scrollTop;
  const railScrollLeft = elements.gameRail.scrollLeft;

  target.focus({ preventScroll: true });

  requestAnimationFrame(() => {
    window.scrollTo(windowScrollX, windowScrollY);
    elements.uiRoot.scrollLeft = uiScrollLeft;
    elements.uiRoot.scrollTop = uiScrollTop;
    elements.gameRail.scrollLeft = railScrollLeft;

    const scrollContainer =
      target.closest("#settingsPanel") === elements.settingsPanel
        ? elements.settingsPanel
        : target.closest("#profilePanel") === elements.profilePanel
          ? elements.profilePanel
          : null;

    if (scrollContainer instanceof HTMLElement) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const margin = 24;

      if (targetRect.bottom > containerRect.bottom - margin) {
        scrollContainer.scrollTop += targetRect.bottom - containerRect.bottom + margin;
      } else if (targetRect.top < containerRect.top + margin) {
        scrollContainer.scrollTop -= containerRect.top + margin - targetRect.top;
      }
    }
  });
}

function setSettingsPanelGroup(group = state.settingsPanelGroup) {
  const useNestedSettingsLayout =
    isFullPageMenuTheme() || state.settings.theme === "xbox360";
  const nextGroup = elements.settingsGroups.some((section) => section.dataset.settingsGroup === group)
    ? group
    : elements.settingsGroups[0]?.dataset.settingsGroup || "theme";
  state.settingsPanelGroup = nextGroup;
  elements.settingsGroups.forEach((section) => {
    const isActive = section.dataset.settingsGroup === nextGroup;
    section.classList.toggle("active", isActive);
    [...section.children].forEach((child) => {
      if (child.classList.contains("settings-group-header")) return;
      child.hidden = useNestedSettingsLayout ? !isActive : false;
    });
  });
  if (isFullPageMenuTheme() && elements.settingsPanel.classList.contains("open")) {
    requestAnimationFrame(positionSettingsPanel);
  }
}

function getUiOverlayMetrics() {
  const scale =
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ui-scale")) || 1;
  const rootRect = elements.uiRoot.getBoundingClientRect();
  return {
    scale,
    rootRect,
    viewportWidth: elements.uiRoot.clientWidth,
    viewportHeight: elements.uiRoot.clientHeight,
    scrollTop: elements.uiRoot.scrollTop,
  };
}

function positionSettingsPanel() {
  const { scale, rootRect, viewportWidth, viewportHeight, scrollTop } = getUiOverlayMetrics();
  const buttonRect = elements.settingsButton.getBoundingClientRect();
  const panelRect = elements.settingsPanel.getBoundingClientRect();
  const panelWidth = panelRect.width / scale;
  const panelHeight = panelRect.height / scale;
  const buttonLeft = (buttonRect.left - rootRect.left) / scale;
  const buttonBottom = scrollTop + (buttonRect.bottom - rootRect.top) / scale;
  const isPs3SettingsView = state.settings.theme === "ps3";
  const gap = isPs3SettingsView ? 38 : 14;
  const sidePadding = 18;

  const preferredTop = Math.max(scrollTop + sidePadding, buttonBottom + gap);
  const top = isPs3SettingsView
    ? preferredTop
    : Math.min(
        preferredTop,
        scrollTop + Math.max(sidePadding, viewportHeight - panelHeight - sidePadding),
      );
  const preferredLeft = buttonLeft - 24;
  const left = Math.min(
    Math.max(sidePadding, preferredLeft),
    Math.max(sidePadding, viewportWidth - panelWidth - sidePadding),
  );

  elements.settingsPanel.style.top = `${Math.round(top)}px`;
  elements.settingsPanel.style.left = `${Math.round(left)}px`;
  elements.settingsPanel.style.right = "auto";
  elements.settingsPanel.style.bottom = "auto";
}

function openSettingsPanel(group = state.settingsPanelGroup, { xbox360Detail = false } = {}) {
  if (typeof group !== "string") {
    group = state.settingsPanelGroup;
  }
  if (state.settings.theme === "ps2") {
    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    closeSearchPanel({ clearQuery: false });
    setSettingsPanelGroup(group);
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.setAttribute("inert", "");
    elements.settingsPanel.removeAttribute("inert");
    elements.settingsPanel.classList.add("open");
    elements.settingsPanel.setAttribute("aria-hidden", "false");
    setPs2Screen("settings", { focus: true });
    return;
  }
  if (state.settings.theme === "xbox-classic") {
    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    closeSearchPanel({ clearQuery: false });
    setSettingsPanelGroup(group);
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.setAttribute("inert", "");
    elements.settingsPanel.removeAttribute("inert");
    elements.settingsPanel.classList.add("open");
    elements.settingsPanel.setAttribute("aria-hidden", "false");
    setXboxScreen("settings", { focus: true });
    return;
  }
  if (state.settings.theme === "xbox360") {
    if (!xbox360Detail) {
      closeOverlays();
      setXbox360DashboardPage("settings");
      return;
    }
    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    closeSearchPanel({ clearQuery: false });
    setSettingsPanelGroup(group);
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.setAttribute("inert", "");
    document.documentElement.classList.remove("xbox360-profile-open");
    elements.modalBackdrop.hidden = true;
    elements.settingsPanel.removeAttribute("inert");
    elements.settingsPanel.classList.add("open");
    elements.settingsPanel.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("xbox360-settings-open");
    const activeHeader =
      elements.settingsGroups.find((section) => section.classList.contains("active"))?.querySelector("[data-focus]") ||
      elements.settingsGroupHeaders[0];
    setTimeout(() => focusWithoutScroll(activeHeader), 100);
    return;
  }
  if (isFullPageMenuTheme()) {
    state.lastFocusBeforeModal = document.activeElement;
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.brand.classList.remove("active");
    hideContextMenu();
    closeSearchPanel({ clearQuery: false });
    setSettingsPanelGroup(group);
    setActiveView("settings");
    const activeHeader =
      elements.settingsGroups.find((section) => section.classList.contains("active"))?.querySelector("[data-focus]") ||
      elements.settingsGroupHeaders[0];
    setTimeout(() => focusWithoutScroll(activeHeader), 100);
    return;
  }
  state.lastFocusBeforeModal = !elements.profilePanel.hidden
    ? elements.profileButton
    : document.activeElement;
  elements.profilePanel.hidden = true;
  elements.profilePanel.setAttribute("aria-hidden", "true");
  elements.modalBackdrop.hidden = state.settings.theme === "ps3";
  elements.settingsPanel.removeAttribute("inert");
  elements.settingsPanel.classList.add("open");
  elements.settingsPanel.setAttribute("aria-hidden", "false");
  setTimeout(() => focusWithoutScroll(elements.closeSettings), 100);
}

function positionProfilePanel() {
  const { scale, rootRect, viewportWidth, viewportHeight, scrollTop } = getUiOverlayMetrics();
  const anchor = state.settings.theme === "ps3" ? elements.brand : elements.profileButton;
  const buttonRect = anchor.getBoundingClientRect();
  const panelRect = elements.profilePanel.getBoundingClientRect();
  const panelWidth = panelRect.width / scale;
  const panelHeight = panelRect.height / scale;
  const buttonLeft = (buttonRect.left - rootRect.left) / scale;
  const buttonRight = (buttonRect.right - rootRect.left) / scale;
  const buttonBottom = scrollTop + (buttonRect.bottom - rootRect.top) / scale;
  const gap = 14;
  const sidePadding = 18;

  const top = Math.min(
    Math.max(scrollTop + sidePadding, buttonBottom + gap),
    scrollTop + Math.max(sidePadding, viewportHeight - panelHeight - sidePadding),
  );
  const preferredLeft = state.settings.theme === "ps3" ? buttonLeft - 22 : buttonRight - panelWidth;
  const left = Math.min(
    Math.max(sidePadding, preferredLeft),
    Math.max(sidePadding, viewportWidth - panelWidth - sidePadding),
  );

  elements.profilePanel.style.top = `${Math.round(top)}px`;
  elements.profilePanel.style.left = `${Math.round(left)}px`;
  elements.profilePanel.style.right = "auto";
}

function toggleProfilePanel(forceOpen = null) {
  if (state.settings.theme === "ps2") {
    const shouldOpenPs2 = forceOpen ?? state.ps2Screen !== "profile";
    if (!shouldOpenPs2) {
      closeOverlays();
      return false;
    }

    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    elements.settingsPanel.classList.remove("open");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    elements.profilePanel.removeAttribute("inert");
    elements.profilePanel.hidden = false;
    elements.profilePanel.setAttribute("aria-hidden", "false");
    elements.profilePanel.classList.add("open");
    setPs2Screen("profile", { focus: true });
    return true;
  }
  if (state.settings.theme === "xbox-classic") {
    const shouldOpenXbox = forceOpen ?? state.xboxScreen !== "profile";
    if (!shouldOpenXbox) {
      closeOverlays();
      return false;
    }

    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    elements.settingsPanel.classList.remove("open");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    elements.profilePanel.removeAttribute("inert");
    elements.profilePanel.hidden = false;
    elements.profilePanel.setAttribute("aria-hidden", "false");
    elements.profilePanel.classList.add("open");
    setXboxScreen("profile", { focus: true });
    return true;
  }
  if (state.settings.theme === "xbox360") {
    const shouldOpenXbox360 = forceOpen ?? elements.profilePanel.hidden;
    if (!shouldOpenXbox360) {
      closeOverlays();
      return false;
    }

    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    closeSearchPanel({ clearQuery: false });
    elements.settingsPanel.classList.remove("open");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    document.documentElement.classList.remove("xbox360-settings-open");
    elements.modalBackdrop.hidden = true;
    elements.profilePanel.removeAttribute("inert");
    elements.profilePanel.hidden = false;
    elements.profilePanel.setAttribute("aria-hidden", "false");
    elements.profilePanel.classList.add("open");
    elements.profilePanel.style.top = "";
    elements.profilePanel.style.left = "";
    elements.profilePanel.style.right = "";
    elements.profilePanel.style.bottom = "";
    document.documentElement.classList.add("xbox360-profile-open");
    setTimeout(() => focusWithoutScroll(elements.xbox360ProfileEdit), 0);
    return true;
  }
  if (isFullPageMenuTheme()) {
    const shouldOpenFullPage = forceOpen ?? state.currentView !== "profile";
    if (!shouldOpenFullPage) {
      setActiveView("games");
      return false;
    }
    state.lastFocusBeforeModal = document.activeElement;
    hideContextMenu();
    elements.settingsPanel.classList.remove("open");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    elements.modalBackdrop.hidden = true;
    closeSearchPanel({ clearQuery: false });
    setActiveView("profile");
    setTimeout(() => focusWithoutScroll(elements.profileSettingsButton), 0);
    return true;
  }

  const shouldOpen = forceOpen ?? elements.profilePanel.hidden;
  if (!shouldOpen) {
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.setAttribute("inert", "");
    elements.brand.classList.remove("active");
    return false;
  }

  state.lastFocusBeforeModal = document.activeElement;
  hideContextMenu();
  elements.settingsPanel.classList.remove("open");
  elements.settingsPanel.setAttribute("aria-hidden", "true");
  elements.settingsPanel.setAttribute("inert", "");
  elements.modalBackdrop.hidden = true;
  if (state.settings.theme === "ps3" && state.currentView === "settings") {
    setActiveView("games");
  }
  elements.profilePanel.removeAttribute("inert");
  elements.profilePanel.hidden = false;
  elements.profilePanel.setAttribute("aria-hidden", "false");
  elements.profilePanel.classList.add("open");
  if (state.settings.theme === "ps3") {
    elements.brand.classList.add("active");
  }
  positionProfilePanel();
  setTimeout(() => focusWithoutScroll(elements.profileSettingsButton), 0);
  return true;
}

function applyInterfaceSize(size = "large") {
  const validSize = ["monitor", "large", "tv"].includes(size) ? size : "large";
  state.settings.uiSize = validSize;
  document.documentElement.dataset.uiSize = validSize;
  elements.uiSizeButtons.forEach((button) => {
    const active = button.dataset.uiSize === validSize;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function getSelectedGame() {
  return state.games.find((game) => game.id === state.selectedId) || state.games[0] || null;
}

function safeCssUrl(value) {
  if (!value) return "";
  const escaped = String(value).replace(/["\\\n\r]/g, "\\$&");
  return `url("${escaped}")`;
}

function readImageField(input) {
  return input.value.trim();
}

function writeImageField(input, value = "") {
  input.value = value || "";
  input.placeholder = "https://… or choose a local image";
}

function setChosenImage(input, selected) {
  writeImageField(input, selected);
}

function renderGames(filter = "") {
  const query = filter.trim().toLowerCase();
  const visibleGames = getSortedGames().filter((game) => {
    const matchesQuery = `${game.title} ${game.platform}`.toLowerCase().includes(query);
    const matchesPlatform =
      state.settings.theme !== "stadia" ||
      state.stadiaPlatformFilter === "all" ||
      game.platform === state.stadiaPlatformFilter;
    const matchesXbox360Platform =
      state.settings.theme !== "xbox360" ||
      !state.xbox360LibraryOpen ||
      state.xbox360LibraryPlatformFilter === "all" ||
      game.platform === state.xbox360LibraryPlatformFilter;
    return matchesQuery && matchesPlatform && matchesXbox360Platform;
  });
  state.visibleGameIds = visibleGames.map((game) => game.id);
  if (elements.stadiaLibraryTitle) {
    elements.stadiaLibraryTitle.dataset.count = String(visibleGames.length);
  }
  if (elements.gameRailWrap) {
    elements.gameRailWrap.dataset.countLabel = `${visibleGames.length} TITLE${visibleGames.length === 1 ? "" : "S"}`;
  }

  if (
    !state.selectedId ||
    !visibleGames.some((game) => game.id === state.selectedId)
  ) {
    state.selectedId = visibleGames[0]?.id || null;
  }

  elements.gameRail.innerHTML = "";
  visibleGames.forEach((game) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `game-card focusable${game.id === state.selectedId ? " selected" : ""}`;
    button.dataset.focus = "";
    button.dataset.gameId = game.id;
    button.setAttribute("role", "listitem");
    button.setAttribute("aria-label", `${game.title}, ${game.platform}`);
    button.setAttribute("aria-current", game.id === state.selectedId ? "true" : "false");
    button.style.setProperty("--accent", game.accent || "#526fff");
    button.style.setProperty("--generated-opacity", game.cover ? "0" : "1");
    if (game.cover) button.style.setProperty("--cover", safeCssUrl(game.cover));
    button.innerHTML = `
      <span class="xbox-node" aria-hidden="true"></span>
      <span class="game-card-copy">
        <span class="game-card-title"></span>
        <span class="game-card-platform"></span>
      </span>
      <span class="game-card-start" aria-hidden="true">Start</span>
    `;
    button.querySelector(".game-card-title").textContent = game.title;
    button.querySelector(".game-card-platform").textContent = game.platform.toUpperCase();
    button.addEventListener("click", () => {
      if (["xbox-classic", "xbox360"].includes(state.settings.theme) && state.selectedId === game.id) {
        launchSelectedGame();
        return;
      }
      selectGame(game.id, true);
    });
    button.addEventListener("dblclick", () => {
      if (!["xbox-classic", "xbox360"].includes(state.settings.theme)) launchSelectedGame();
    });
    button.addEventListener("focus", () => selectGame(game.id));
    button.addEventListener("mouseenter", () => selectGame(game.id, false, false));
    button.addEventListener("pointerenter", () => selectGame(game.id, false, false));

    if (state.settings.theme === "stadia") {
      const shell = document.createElement("div");
      shell.className = "game-card-shell";
      shell.appendChild(button);

      const optionsButton = document.createElement("button");
      optionsButton.type = "button";
      optionsButton.className = "game-card-options";
      optionsButton.dataset.gameId = game.id;
      optionsButton.setAttribute("aria-label", `${game.title} options`);
      optionsButton.textContent = "•••";
      optionsButton.hidden = true;
      optionsButton.tabIndex = -1;
      optionsButton.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      optionsButton.addEventListener("click", (event) => {
        event.stopPropagation();
        selectGame(game.id, false, false);
        showContextMenu();
      });
      shell.appendChild(optionsButton);
      elements.gameRail.appendChild(shell);
      return;
    }

    elements.gameRail.appendChild(button);
  });

  updateXbox360DashboardCards(visibleGames);
  elements.heroTotal.textContent = String(Math.max(state.games.length, 1)).padStart(2, "0");
  updateHero();
  requestAnimationFrame(syncStadiaCardOptionsButton);

  if (query && visibleGames.length === 0) {
    elements.gameRail.innerHTML = `<p style="color:#7f8692;font-size:12px">No games found.</p>`;
  }
}

function renderCurrentView() {
  const query = getActiveSearchQuery();
  renderGames(query);
}

function updateXbox360DashboardScale() {
  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  document.documentElement.style.setProperty("--x360-dashboard-scale", String(scale));
}

function syncXbox360DashboardPageUi() {
  const isXbox360 = state.settings.theme === "xbox360";
  const isSettingsPage = isXbox360 && state.xbox360DashboardPage === "settings";
  document.documentElement.classList.toggle("xbox360-settings-page-open", isSettingsPage);
  elements.libraryView?.setAttribute("aria-hidden", String(isSettingsPage));
  elements.xbox360SettingsPage?.setAttribute("aria-hidden", String(!isSettingsPage));
  if (isSettingsPage) {
    elements.libraryView?.setAttribute("inert", "");
    elements.xbox360SettingsPage?.removeAttribute("inert");
  } else {
    elements.libraryView?.removeAttribute("inert");
    elements.xbox360SettingsPage?.setAttribute("inert", "");
  }
  elements.xbox360PageTabs.forEach((button) => {
    const isActive = isXbox360 && button.dataset.xbox360Page === state.xbox360DashboardPage;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function setXbox360DashboardPage(page, { focus = true } = {}) {
  if (state.settings.theme !== "xbox360") return;
  const nextPage = page === "settings" ? "settings" : "games";
  hideContextMenu();
  closeSearchPanel({ clearQuery: false });
  state.xbox360DashboardPage = nextPage;
  if (nextPage === "settings") {
    state.xbox360LibraryOpen = false;
  }
  syncXbox360DashboardPageUi();
  syncXbox360LibraryUi();

  if (!focus) return;
  const target =
    nextPage === "settings"
      ? elements.xbox360SettingsHubTiles[0]
      : elements.xbox360LibraryTile;
  window.setTimeout(() => focusWithoutScroll(target), 180);
}

function updateXbox360LibrarySummary() {
  if (!elements.xbox360LibraryCount) return;
  const count = state.visibleGameIds.length;
  elements.xbox360LibraryCount.textContent = `${count} title${count === 1 ? "" : "s"}`;
  updateXbox360LibraryFilterUi();
  if (elements.xbox360LibrarySortValue) {
    elements.xbox360LibrarySortValue.textContent = getSortOption().label.toLowerCase();
  }
}

function syncXbox360LibraryUi() {
  const isSettingsPage =
    state.settings.theme === "xbox360" &&
    state.xbox360DashboardPage === "settings";
  const isOpen =
    state.settings.theme === "xbox360" &&
    !isSettingsPage &&
    state.xbox360LibraryOpen;
  document.documentElement.classList.toggle("xbox360-library-open", isOpen);
  elements.xbox360LibraryChrome?.setAttribute("aria-hidden", String(!isOpen));
  if (state.settings.theme === "xbox360") {
    elements.controllerSelectLabel.textContent = isSettingsPage ? "Open" : isOpen ? "Launch" : "Select";
    elements.controllerBackLabel.textContent = "Back";
    elements.controllerOptionsLabel.textContent = isSettingsPage ? "Options" : "Game options";
  } else {
    elements.controllerSelectLabel.textContent = "Select";
    elements.controllerBackLabel.textContent = "Back";
    elements.controllerOptionsLabel.textContent = "Options";
  }
  updateXbox360LibrarySummary();
}

function setXbox360LibraryOpen(isOpen, { restoreFocus = true } = {}) {
  state.xbox360LibraryOpen =
    state.settings.theme === "xbox360" &&
    state.xbox360DashboardPage === "games" &&
    Boolean(isOpen);
  renderCurrentView();
  if (!state.xbox360LibraryOpen) {
    const visibleGames = state.visibleGameIds
      .map((id) => state.games.find((game) => game.id === id))
      .filter(Boolean);
    updateXbox360DashboardCards(visibleGames.length ? visibleGames : state.games);
  }
  syncXbox360LibraryUi();
  elements.gameRail.scrollTo({ left: 0, top: 0, behavior: "auto" });

  if (!restoreFocus) return;
  if (!state.xbox360LibraryOpen) {
    window.setTimeout(() => focusWithoutScroll(elements.xbox360LibraryTile), 40);
    return;
  }

  window.setTimeout(() => {
    const target =
      document.querySelector(".game-card.selected") ||
      document.querySelector(".game-card");
    if (!(target instanceof HTMLElement)) return;
    focusWithoutScroll(target);
    scrollCardIntoView(target);
  }, 40);
}

function setActiveView(view) {
  const allowPs3SettingsView = isFullPageMenuTheme() && view === "settings";
  const allowPs3ProfileView = isFullPageMenuTheme() && view === "profile";
  state.currentView =
    allowPs3SettingsView
      ? "settings"
      : allowPs3ProfileView
        ? "profile"
        : "games";
  elements.libraryView.hidden = state.currentView !== "games";
  document.documentElement.dataset.currentView = state.currentView;
  const settingsViewActive = isFullPageMenuTheme() && state.currentView === "settings";
  const profileViewActive = isFullPageMenuTheme() && state.currentView === "profile";
  elements.settingsPanel.classList.toggle("view-active", settingsViewActive);
  if (settingsViewActive) {
    elements.settingsPanel.classList.remove("open");
    if (state.settings.theme === "ps1") {
      elements.settingsPanel.style.top = "";
      elements.settingsPanel.style.left = "";
      elements.settingsPanel.style.right = "";
      elements.settingsPanel.style.bottom = "";
    }
    elements.settingsPanel.removeAttribute("inert");
    elements.settingsPanel.setAttribute("aria-hidden", "false");
    elements.modalBackdrop.hidden = true;
    setSettingsPanelGroup(state.settingsPanelGroup);
    if (state.settings.theme === "ps3") positionSettingsPanel();
  } else if (isFullPageMenuTheme()) {
    elements.settingsPanel.classList.remove("view-active");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    elements.settingsPanel.style.top = "";
    elements.settingsPanel.style.left = "";
    elements.settingsPanel.style.right = "";
    elements.settingsPanel.style.bottom = "";
  }
  elements.profilePanel.classList.toggle("view-active", profileViewActive);
  if (profileViewActive) {
    elements.profilePanel.classList.remove("open");
    if (state.settings.theme === "ps1") {
      elements.profilePanel.style.top = "";
      elements.profilePanel.style.left = "";
      elements.profilePanel.style.right = "";
      elements.profilePanel.style.bottom = "";
    }
    elements.profilePanel.hidden = false;
    elements.profilePanel.removeAttribute("inert");
    elements.profilePanel.setAttribute("aria-hidden", "false");
    elements.brand.classList.add("active");
    if (state.settings.theme === "ps3") positionProfilePanel();
  } else if (isFullPageMenuTheme()) {
    elements.profilePanel.classList.remove("view-active");
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.setAttribute("inert", "");
    elements.brand.classList.remove("active");
    elements.profilePanel.style.top = "";
    elements.profilePanel.style.left = "";
    elements.profilePanel.style.right = "";
    elements.profilePanel.style.bottom = "";
  }
  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.currentView);
  });
  elements.settingsButton.classList.toggle("active", settingsViewActive);
  renderCurrentView();
  syncThemeLandingVisibility();
}

function handleNavHover(button, pointerType = "mouse") {
  if (!(button instanceof HTMLElement)) return;
  if (state.settings.theme !== "ps3") return;
  if (pointerType && pointerType !== "mouse") return;
  if (state.currentView === button.dataset.view) return;
  focusWithoutScroll(button);
  setActiveView(button.dataset.view);
  playUiSound("navigation");
}

function scrollCardIntoView(card) {
  if (!(card instanceof HTMLElement)) return;

  if (card.classList.contains("game-card") && elements.gameRail.contains(card)) {
    if (state.settings.theme === "stadia" && state.stadiaScreen === "library") {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      return;
    }
    const usesVerticalRail =
      ["ps2", "ps3", "xbox-classic"].includes(state.settings.theme) ||
      (state.settings.theme === "xbox360" && !state.xbox360LibraryOpen);
    if (usesVerticalRail) {
      const railRect = elements.gameRail.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const currentScroll = elements.gameRail.scrollTop;
      const cardCenter = cardRect.top - railRect.top + currentScroll + cardRect.height / 2;
      const targetScroll = cardCenter - elements.gameRail.clientHeight / 2;
      const maxScroll = Math.max(0, elements.gameRail.scrollHeight - elements.gameRail.clientHeight);
      const nextScroll = Math.min(maxScroll, Math.max(0, targetScroll));
      elements.gameRail.scrollTo({ top: nextScroll, behavior: "smooth" });
      return;
    }
    const railRect = elements.gameRail.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const currentScroll = elements.gameRail.scrollLeft;
    const cardCenter = cardRect.left - railRect.left + currentScroll + cardRect.width / 2;
    const targetScroll = cardCenter - elements.gameRail.clientWidth / 2;
    const maxScroll = Math.max(0, elements.gameRail.scrollWidth - elements.gameRail.clientWidth);
    const nextScroll = Math.min(maxScroll, Math.max(0, targetScroll));
    elements.gameRail.scrollTo({ left: nextScroll, behavior: "smooth" });
    return;
  }

  card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
}

function selectGame(id, focusCard = false, shouldScroll = true) {
  if (!state.games.some((game) => game.id === id)) return;
  if (!focusCard && state.selectedId === id) return;
  dismissTransientPanelsForGameNavigation();
  state.selectedId = id;
  document.querySelectorAll(".game-card").forEach((card) => {
    const selected = card.dataset.gameId === id;
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-current", selected ? "true" : "false");
  });
  updateHero();
  requestAnimationFrame(syncStadiaCardOptionsButton);

  const card = [...document.querySelectorAll(`[data-game-id="${CSS.escape(id)}"]`)].find(
    (element) => element.offsetParent !== null,
  );
  if (shouldScroll) {
    scrollCardIntoView(card);
  }
  if (focusCard) card?.focus({ preventScroll: true });
}

function selectHoveredGame(event, selector) {
  if (selector === ".game-card" && railDrag.active) return;
  const card = event.target instanceof Element ? event.target.closest(selector) : null;
  const id = card?.dataset.gameId;
  if (id) selectGame(id, false, false);
}

function beginRailDrag(event) {
  if (event.button !== 0) return;
  railDrag.active = true;
  railDrag.moved = false;
  railDrag.pointerId = event.pointerId;
  railDrag.startX = event.clientX;
  railDrag.startY = event.clientY;
  railDrag.startScrollLeft = elements.gameRail.scrollLeft;
  railDrag.startScrollTop = elements.gameRail.scrollTop;
  elements.gameRail.classList.add("dragging");
  elements.gameRail.setPointerCapture?.(event.pointerId);
}

function moveRailDrag(event) {
  if (!railDrag.active || railDrag.pointerId !== event.pointerId) return;
  const isVerticalRail =
    state.settings.theme === "xbox-classic" ||
    (state.settings.theme === "xbox360" && !state.xbox360LibraryOpen);
  const delta = isVerticalRail
    ? event.clientY - railDrag.startY
    : event.clientX - railDrag.startX;
  if (Math.abs(delta) > 4) {
    railDrag.moved = true;
    railDrag.suppressClick = true;
  }
  if (!railDrag.moved) return;
  if (isVerticalRail) {
    elements.gameRail.scrollTop = railDrag.startScrollTop - delta;
  } else {
    elements.gameRail.scrollLeft = railDrag.startScrollLeft - delta;
  }
}

function endRailDrag(event) {
  if (!railDrag.active || railDrag.pointerId !== event.pointerId) return;
  railDrag.active = false;
  railDrag.pointerId = null;
  elements.gameRail.classList.remove("dragging");
  elements.gameRail.releasePointerCapture?.(event.pointerId);
  if (railDrag.moved) {
    window.setTimeout(() => {
      railDrag.suppressClick = false;
    }, 0);
  } else {
    railDrag.suppressClick = false;
  }
}

function handleGameRailWheel(event) {
  if (state.settings.theme !== "wii") return;
  const dominantDelta =
    Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  if (!dominantDelta) return;
  event.preventDefault();
  elements.gameRail.scrollLeft += dominantDelta;
}

function updateHero() {
  const game = getSelectedGame();
  if (!game) {
    elements.heroTitle.textContent = "Your library is empty";
    elements.heroTitle.classList.remove("is-dense");
    elements.heroDescription.textContent = "Add an installed game to begin.";
    elements.heroPlatform.textContent = getThemeSystemLabel();
    elements.heroIndex.textContent = "00";
    elements.playButton.disabled = true;
    elements.moreButton.disabled = true;
    elements.ps4TitleGhost.textContent = "";
    elements.ps4SideArt.style.backgroundImage = "";
    updateXbox360LibrarySummary();
    return;
  }

  elements.heroContent.classList.remove("is-changing");
  void elements.heroContent.offsetWidth;
  elements.heroContent.classList.add("is-changing");

  elements.heroPlatform.textContent = game.platform.toUpperCase();
  elements.heroTitle.textContent = game.title;
  elements.heroTitle.classList.toggle("is-dense", game.title.trim().length > 18);
  elements.heroDescription.textContent = game.description || "Ready when you are.";
  const indexSource = state.visibleGameIds.length ? state.visibleGameIds : getSortedGames().map(({ id }) => id);
  const visibleIndex = indexSource.indexOf(game.id);
  elements.heroIndex.textContent = String((visibleIndex >= 0 ? visibleIndex : 0) + 1).padStart(2, "0");
  elements.playButton.disabled = false;
  elements.moreButton.disabled = false;
  const isPs4Theme = state.settings.theme === "ps4";
  let heroImage =
    state.settings.theme === "xbox-classic" && state.xboxScreen === "games"
      ? game.cover || game.background
      : game.background || game.cover;
  if (state.settings.theme === "stadia" && !heroImage) {
    heroImage = "assets/themes/stadia/hero-red-orbit.png";
  }
  const sideImage = game.cover || game.background;
  elements.heroArt.style.setProperty("--hero-accent", game.accent || "#526fff");
  elements.heroArt.classList.toggle("has-cover", Boolean(heroImage) && !isPs4Theme);
  elements.heroArt.style.backgroundImage = isPs4Theme
    ? ""
    : heroImage
      ? `${safeCssUrl(heroImage)}`
      : `radial-gradient(circle at 78% 35%, color-mix(in srgb, ${game.accent || "#526fff"} 62%, transparent), transparent 21%), linear-gradient(95deg, #070a10 0%, color-mix(in srgb, ${game.accent || "#526fff"} 22%, #111722) 63%, #06080e 100%)`;
  elements.ps4TitleGhost.textContent = isPs4Theme ? "" : game.title;
  elements.ps4SideArt.style.backgroundImage = !isPs4Theme && sideImage
    ? `${safeCssUrl(sideImage)}`
    : "";
  updateXbox360LibrarySummary();
}

function openGameModal(game = null) {
  state.lastFocusBeforeModal = document.activeElement;
  hideContextMenu();
  elements.gameForm.reset();
  elements.gameAccent.value = "#4f78ff";
  elements.gameId.value = game?.id || "";
  elements.gameModalTitle.textContent = game ? "Edit game" : "Add a game";
  elements.gameTitle.value = game?.title || "";
  elements.gamePlatform.value = game?.platform || "Steam";
  elements.gameAccent.value = game?.accent || "#4f78ff";
  elements.gamePath.value = game?.path || "";
  elements.gamePath.readOnly = Boolean(game?.source);
  elements.gamePlatform.disabled = Boolean(game?.source);
  elements.browseExecutable.disabled = Boolean(game?.source);
  elements.gameDescription.value = game?.description || "";
  writeImageField(elements.gameCover, game?.cover || "");
  writeImageField(elements.gameBackground, game?.background || "");
  elements.modalBackdrop.hidden = false;
  elements.gameModal.hidden = false;
  elements.gameTitle.focus();
}

function openDeleteModal(game = getSelectedGame()) {
  if (!game) return;
  state.lastFocusBeforeModal = document.activeElement;
  state.deleteTargetId = game.id;
  hideContextMenu();
  elements.deleteModalCopy.textContent = `Remove "${game.title}" from your library?`;
  elements.modalBackdrop.hidden = false;
  elements.deleteModal.hidden = false;
  elements.confirmDeleteButton.focus();
}

function closeOverlays() {
  const exitingPs3NestedView =
    isFullPageMenuTheme() && ["settings", "profile"].includes(state.currentView);
  const exitingPs2NestedView =
    state.settings.theme === "ps2" && ["settings", "profile"].includes(state.ps2Screen);
  const exitingXboxNestedView =
    state.settings.theme === "xbox-classic" && ["settings", "profile"].includes(state.xboxScreen);
  const hadOverlay =
    !elements.gameModal.hidden ||
    !elements.deleteModal.hidden ||
    elements.settingsPanel.classList.contains("open") ||
    (isFullPageMenuTheme() && state.currentView === "settings") ||
    (isFullPageMenuTheme() && state.currentView === "profile") ||
    elements.searchPanel.classList.contains("open") ||
    !elements.profilePanel.hidden ||
    !elements.contextMenu.hidden;

  elements.gameModal.hidden = true;
  elements.deleteModal.hidden = true;
  elements.modalBackdrop.hidden = true;
  elements.settingsPanel.classList.remove("open");
  elements.settingsPanel.classList.remove("view-active");
  document.documentElement.classList.remove("xbox360-settings-open");
  document.documentElement.classList.remove("xbox360-profile-open");
  elements.settingsPanel.setAttribute("aria-hidden", "true");
  elements.settingsPanel.setAttribute("inert", "");
  closeSearchPanel({ clearQuery: true });
  elements.profilePanel.hidden = true;
  elements.profilePanel.setAttribute("aria-hidden", "true");
  elements.profilePanel.classList.remove("open");
  elements.profilePanel.classList.remove("view-active");
  elements.profilePanel.setAttribute("inert", "");
  elements.brand.classList.remove("active");
  hideContextMenu({ preserveBackdrop: true });
  state.deleteTargetId = null;
  if (exitingPs3NestedView) {
    state.currentView = "games";
    document.documentElement.dataset.currentView = "games";
    elements.libraryView.hidden = false;
    const restoreTarget = state.lastFocusBeforeModal;
    const preservePs3CategoryFocus = state.settings.theme === "ps3";
    const restoreToSettings = preservePs3CategoryFocus && restoreTarget === elements.settingsButton;
    const restoreToProfile = preservePs3CategoryFocus && restoreTarget === elements.brand;
    elements.settingsButton.classList.toggle("active", restoreToSettings);
    elements.brand.classList.toggle("active", restoreToProfile);
    elements.navButtons.forEach((button) => {
      const shouldBeActive =
        !restoreToSettings && !restoreToProfile && button.dataset.view === state.currentView;
      button.classList.toggle("active", shouldBeActive);
    });
    renderCurrentView();
  }
  if (exitingPs2NestedView) {
    const restoreScreen = state.ps2Screen;
    setPs2Screen("home", { focus: true, focusTarget: restoreScreen });
  }
  if (exitingXboxNestedView) {
    const restoreScreen = state.xboxScreen;
    setXboxScreen("home", { focus: true, focusTarget: restoreScreen });
  }
  if (exitingPs3NestedView) suppressPs3AutoPanelOpen();
  if (hadOverlay && !exitingPs2NestedView && !exitingXboxNestedView) focusWithoutScroll(state.lastFocusBeforeModal);
  return hadOverlay;
}

async function launchSelectedGame() {
  const game = getSelectedGame();
  if (!game) return;
  if (!desktop) {
    showToast("Local game launching is available in the desktop app.");
    return;
  }
  if (!game.path) {
    showToast("Set an executable path in the game options first.");
    openGameModal(game);
    return;
  }

  elements.playButton.disabled = true;
  const originalLabel = elements.playButton.lastChild;
  if (originalLabel?.nodeType === Node.TEXT_NODE) originalLabel.textContent = " Launching";
  let result;
  try {
    result = game.source && desktop.launchDiscovered
      ? await desktop.launchDiscovered(game.source, game.externalId || game.steamAppId, game)
      : await desktop.launch(game.path);
  } catch (error) { result = { ok: false, error: error.message || "Could not launch this game." }; }
  elements.playButton.disabled = false;
  if (originalLabel?.nodeType === Node.TEXT_NODE) originalLabel.textContent = " Play";
  if (result.ok) muteForLaunchedGame();
  showToast(result.ok ? `Launching ${game.title}` : result.error || "Could not launch this game.");
}

function getPs2ContextMenuAnchor() {
  const focusedCard =
    document.activeElement instanceof HTMLElement && document.activeElement.classList.contains("game-card")
      ? document.activeElement
      : null;
  const hoveredCard = document.querySelector(".game-card:hover");
  return focusedCard?.offsetParent !== null ? focusedCard : hoveredCard instanceof HTMLElement ? hoveredCard : null;
}

function getGameContextMenuAnchor() {
  const focusedCard =
    document.activeElement instanceof HTMLElement && document.activeElement.classList.contains("game-card")
      ? document.activeElement
      : null;
  const hoveredCard = document.querySelector(".game-card:hover");
  return focusedCard?.offsetParent !== null ? focusedCard : hoveredCard instanceof HTMLElement ? hoveredCard : null;
}

function shouldKeepBackdropVisible() {
  return (
    !elements.gameModal.hidden ||
    !elements.deleteModal.hidden ||
    elements.settingsPanel.classList.contains("open") ||
    elements.searchPanel.classList.contains("open") ||
    !elements.profilePanel.hidden ||
    (isFullPageMenuTheme() && ["settings", "profile"].includes(state.currentView))
  );
}

function hideContextMenu({ preserveBackdrop = false } = {}) {
  elements.contextMenu.hidden = true;
  elements.contextMenu.style.visibility = "";
  elements.contextMenu.style.left = "";
  elements.contextMenu.style.top = "";
  if (!preserveBackdrop && !shouldKeepBackdropVisible()) {
    elements.modalBackdrop.hidden = true;
  }
}

function showContextMenu() {
  if (state.settings.theme === "ps2") {
    const anchorElement = getPs2ContextMenuAnchor();
    if (!anchorElement) {
      showToast("Focus a game to open options.");
      return;
    }
    const anchorId = anchorElement.dataset.gameId;
    if (anchorId) selectGame(anchorId, false, false);
  }

  if (!getSelectedGame()) return;

  elements.modalBackdrop.hidden = false;
  elements.contextMenu.hidden = false;
  elements.editGameButton.focus();
}

function showContextMenuFromController() {
  const anchorElement = getGameContextMenuAnchor();
  if (!anchorElement) {
    showToast("Focus a game to open options.");
    return;
  }

  const anchorId = anchorElement.dataset.gameId;
  if (anchorId) {
    selectGame(anchorId, false, false);
  }

  showContextMenu();
}

function confirmDeleteGame() {
  const game = state.games.find((item) => item.id === state.deleteTargetId);
  if (!game) return;

  state.games = state.games.filter((item) => item.id !== game.id);
  if (game.source) {
    state.settings.hiddenImportedGames = [...new Set([...(state.settings.hiddenImportedGames || []), SteamLibrary.gameKey(game)])];
  }
  state.selectedId = getSortedGames(state.games)[0]?.id || null;
  saveState();
  elements.deleteModal.hidden = true;
  hideContextMenu({ preserveBackdrop: true });
  elements.modalBackdrop.hidden = true;
  state.deleteTargetId = null;
  renderCurrentView();
  (document.querySelector(".game-card.selected") || elements.addGameButton)?.focus?.();
  showToast(`${game.title} removed from your library`);
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 2600);
}

function updateClock() {
  const now = new Date();
  const time = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  if (elements.ps2SystemDate) {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    elements.ps2SystemDate.textContent = `${year}/${month}/${day}`;
    elements.ps2SystemClock.textContent = `${time}:${seconds}`;
  }
  if (elements.xbox360ProfileClock) {
    elements.xbox360ProfileClock.textContent = time;
  }
  if (state.settings.theme === "ps3") {
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    elements.clock.textContent = `${day}/${month}  ${time}`;
    return;
  }
  if (state.settings.theme === "wii") {
    const date = new Intl.DateTimeFormat([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(now);
    elements.clock.innerHTML = `<strong>${time}</strong><small>${date}</small>`;
    return;
  }
  elements.clock.textContent = time;
}

function suppressPs3AutoPanelOpen(duration = 220) {
  suppressPs3AutoPanelUntil = performance.now() + duration;
}

function isPs3AutoPanelOpenSuppressed() {
  return performance.now() < suppressPs3AutoPanelUntil;
}

function clearBootTimers() {
  clearTimeout(bootCompletionTimer);
  clearTimeout(bootFallbackTimer);
  clearTimeout(bootSkipHintTimer);
  bootCompletionTimer = null;
  bootFallbackTimer = null;
  bootSkipHintTimer = null;
}

function stopBootMedia() {
  elements.bootVideo.pause();
  elements.bootVideo.currentTime = 0;
  if (startupFallbackAudio) {
    startupFallbackAudio.pause();
    startupFallbackAudio.currentTime = 0;
    startupFallbackAudio = null;
  }
}

function finishBoot() {
  if (!bootSequenceActive && elements.boot.classList.contains("done")) return;
  bootSequenceActive = false;
  clearBootTimers();
  elements.bootSkip.classList.remove("visible");
  elements.boot.classList.add("done");
  document.body.classList.remove("booting");
  playAmbientVideo();
  syncAmbientAudio();
  if (state.settings.theme === "ps2") {
    setPs2Screen("home", { focus: true });
  }
}

function skipBoot() {
  if (!bootSequenceActive) return false;
  stopBootMedia();
  finishBoot();
  return true;
}

function playFallbackBoot() {
  if (!bootSequenceActive) return;
  elements.bootVideo.hidden = true;
  elements.bootFallback.hidden = false;
  if (state.settings.sound) {
    startupFallbackAudio = new Audio(getVersionedAudioAsset(getTheme().assets.startupAudio || ""));
    startupFallbackAudio.volume = 0.75;
    startupFallbackAudio.play().catch(() => {});
  }
  bootFallbackTimer = setTimeout(finishBoot, 2700);
}

function setupBoot() {
  if (!state.settings.boot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishBoot();
    return;
  }

  const theme = getTheme();
  bootSequenceActive = true;
  document.body.classList.add("booting");
  elements.bootSkip.classList.remove("visible");
  bootSkipHintTimer = setTimeout(() => {
    if (bootSequenceActive) elements.bootSkip.classList.add("visible");
  }, 1000);

  if (!theme.assets.startupVideo) {
    playFallbackBoot();
    return;
  }

  const video = elements.bootVideo;
  video.muted = false;
  let completed = false;
  const completeOnce = () => {
    if (completed) return;
    completed = true;
    finishBoot();
  };

  video.addEventListener("canplay", () => {
    video.classList.add("ready");
    elements.boot.classList.add("video-ready");
  }, { once: true });
  video.addEventListener("playing", () => {
    elements.bootVideo.hidden = false;
    elements.boot.classList.add("visible", "video-ready", "video-playing");
  }, { once: true });
  video.addEventListener("ended", completeOnce, { once: true });
  video.addEventListener("error", playFallbackBoot, { once: true });
  if (video.readyState >= 2) {
    video.classList.add("ready");
    elements.boot.classList.add("video-ready");
  }

  const playback = video.play();
  if (playback) {
    playback.catch(() => {
      video.muted = true;
      video.play().catch(playFallbackBoot);
    });
  }
  bootCompletionTimer = setTimeout(completeOnce, 18_000);
}

async function toggleFullscreen() {
  if (desktop) {
    const next = !desktopFullscreen;
    desktopFullscreen = await desktop.setFullscreen(next);
    updateFullscreenButton(desktopFullscreen);
    showToast(next ? "Fullscreen enabled" : "Fullscreen disabled");
    return;
  }

  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch {
    showToast("Fullscreen is not available in this browser.");
  }
}

async function closeApplication() {
  if (desktop) {
    await desktop.closeWindow();
    return;
  }

  window.close();
  setTimeout(() => {
    if (!window.closed) showToast("Close is available in the desktop app.");
  }, 50);
}

function isControllerFocusable(element) {
  if (!(element instanceof HTMLElement)) return false;
  if (element.disabled) return false;
  if (element.matches('.toggle-row input[type="checkbox"]')) return false;

  if (
    element.closest("[hidden], [inert]") ||
    element.closest('[aria-hidden="true"]')
  ) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  // Several themes collapse inactive controls to 0x0 without clearing offsetParent.
  if (rect.width < 1 || rect.height < 1 || element.getClientRects().length === 0) {
    return false;
  }

  const style = getComputedStyle(element);
  if (
    style.display === "none" ||
    style.visibility === "hidden" ||
    style.visibility === "collapse" ||
    style.pointerEvents === "none"
  ) {
    return false;
  }

  for (let ancestor = element; ancestor instanceof HTMLElement; ancestor = ancestor.parentElement) {
    if (Number.parseFloat(getComputedStyle(ancestor).opacity) <= 0.01) return false;
  }

  return true;
}

function getControllerFocusableElements(root = document) {
  return [...root.querySelectorAll("[data-focus], input, select, textarea")].filter(isControllerFocusable);
}

function focusables() {

  const overlay = !elements.deleteModal.hidden
    ? elements.deleteModal
    : !elements.gameModal.hidden
    ? elements.gameModal
    : !elements.contextMenu.hidden
      ? elements.contextMenu
    : elements.settingsPanel.classList.contains("open")
      ? elements.settingsPanel
      : !elements.profilePanel.hidden
        ? elements.profilePanel
      : elements.searchPanel.classList.contains("open")
        ? elements.searchPanel
        : document;
  if (overlay !== document) {
    return getControllerFocusableElements(overlay);
  }

  const currentViewRoot =
    state.settings.theme === "xbox360" && state.xbox360DashboardPage === "settings"
      ? elements.xbox360SettingsPage
      : state.settings.theme === "ps2" && state.ps2Screen === "home"
      ? elements.ps2Home
      : state.settings.theme === "xbox-classic" && state.xboxScreen === "home"
      ? elements.xboxHome
      : state.currentView === "settings"
      ? elements.settingsPanel
      : state.currentView === "profile"
      ? elements.profilePanel
        : elements.libraryView;

  const topbarFocusables =
    state.currentView === "games"
      ? getControllerFocusableElements(document.querySelector(".topbar"))
      : [];

  return [...topbarFocusables, ...getControllerFocusableElements(currentViewRoot)];
}

function dismissTransientPanelsForGameNavigation() {
  if (elements.settingsPanel.classList.contains("open")) {
    elements.settingsPanel.classList.remove("open");
    elements.settingsPanel.setAttribute("aria-hidden", "true");
    elements.settingsPanel.setAttribute("inert", "");
    elements.modalBackdrop.hidden = true;
  }

  if (!elements.profilePanel.hidden) {
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.setAttribute("inert", "");
  }

  hideContextMenu();
}

function getPreferredFocusTarget(items) {
  if (elements.searchPanel.classList.contains("open")) return elements.searchInput;
  if (!elements.contextMenu.hidden) return items[0];
  if (!elements.profilePanel.hidden) return items[0];
  if (elements.settingsPanel.classList.contains("open")) return items[0];
  if (!elements.gameModal.hidden) return items[0];
  if (!elements.deleteModal.hidden) return items[0];
  if (state.settings.theme === "ps2" && state.ps2Screen === "home") {
    return elements.ps2RootItems.find((button) => button.dataset.ps2Action === "games") || items[0];
  }
  if (state.settings.theme === "xbox-classic" && state.xboxScreen === "home") {
    return elements.xboxRootItems.find((button) => button.dataset.xboxAction === "games") || items[0];
  }

  const selectedCard = document.querySelector(".game-card.selected");
  if (selectedCard && items.includes(selectedCard)) return selectedCard;

  return items[0];
}

function getDirectionalCandidates(currentRect, pool, direction) {
  const horizontal = direction === "left" || direction === "right";
  const edgeTolerance = 6;
  const currentSecondaryStart = horizontal ? currentRect.top : currentRect.left;
  const currentSecondaryEnd = horizontal ? currentRect.bottom : currentRect.right;
  const currentSecondaryCenter = (currentSecondaryStart + currentSecondaryEnd) / 2;

  const candidates = pool
    .map((element) => {
      const rect = element.getBoundingClientRect();
      let primaryGap = 0;
      let valid = false;

      // Compare edges so staggered items in one row do not become up/down neighbors.
      if (direction === "left") {
        primaryGap = currentRect.left - rect.right;
        valid = rect.right <= currentRect.left + edgeTolerance;
      } else if (direction === "right") {
        primaryGap = rect.left - currentRect.right;
        valid = rect.left >= currentRect.right - edgeTolerance;
      } else if (direction === "up") {
        primaryGap = currentRect.top - rect.bottom;
        valid = rect.bottom <= currentRect.top + edgeTolerance;
      } else if (direction === "down") {
        primaryGap = rect.top - currentRect.bottom;
        valid = rect.top >= currentRect.bottom - edgeTolerance;
      }

      if (!valid) return null;

      const secondaryStart = horizontal ? rect.top : rect.left;
      const secondaryEnd = horizontal ? rect.bottom : rect.right;
      const secondaryCenter = (secondaryStart + secondaryEnd) / 2;
      const secondaryGap = Math.max(
        0,
        currentSecondaryStart - secondaryEnd,
        secondaryStart - currentSecondaryEnd,
      );
      const secondaryDistance = Math.abs(secondaryCenter - currentSecondaryCenter);
      const normalizedPrimaryGap = Math.max(0, primaryGap);
      const inNavigationBeam = secondaryGap === 0;

      return {
        element,
        inNavigationBeam,
        primaryGap: normalizedPrimaryGap,
        secondaryGap,
        secondaryDistance,
        score:
          normalizedPrimaryGap +
          secondaryGap * (inNavigationBeam ? 0 : 0.85) +
          secondaryDistance * (inNavigationBeam ? 0.2 : 0.15),
      };
    })
    .filter(Boolean);

  const beamCandidates = candidates.filter((candidate) => candidate.inNavigationBeam);
  const eligibleCandidates = beamCandidates.length
    ? beamCandidates
    : candidates.filter(
        (candidate) =>
          candidate.secondaryGap <= Math.max(80, candidate.primaryGap * 1.5),
      );

  return eligibleCandidates.sort(
    (a, b) =>
      a.score - b.score ||
      a.primaryGap - b.primaryGap ||
      a.secondaryDistance - b.secondaryDistance,
  );
}

function movePs2SettingsFocus(current, direction) {
  const groups = elements.settingsGroups.filter((group) => group.offsetParent !== null);
  const currentGroup = current.closest(".settings-group");
  if (!(currentGroup instanceof HTMLElement)) return false;

  const groupIndex = groups.indexOf(currentGroup);
  if (groupIndex === -1) return false;

  const header = currentGroup.querySelector(".settings-group-header[data-focus]");
  const groupItems = getControllerFocusableElements(currentGroup);
  const headerIndex = header instanceof HTMLElement ? groupItems.indexOf(header) : -1;
  const currentIndex = groupItems.indexOf(current);
  if (currentIndex === -1) return false;

  const previousGroupHeader = groups[groupIndex - 1]?.querySelector(".settings-group-header[data-focus]");
  const nextGroupHeader = groups[groupIndex + 1]?.querySelector(".settings-group-header[data-focus]");
  const enterSectionTarget = groupItems[Math.max(headerIndex + 1, 1)];

  const focusTarget = (target) => {
    if (!(target instanceof HTMLElement) || target === current) return false;
    target.focus();
    playUiSound("navigation");
    return true;
  };

  if (current === header) {
    if ((direction === "right" || direction === "down") && enterSectionTarget) {
      return focusTarget(enterSectionTarget);
    }
    if (direction === "right" || direction === "down") {
      return focusTarget(nextGroupHeader);
    }
    if (direction === "up" || direction === "left") {
      return focusTarget(previousGroupHeader);
    }
    return false;
  }

  const currentContainer = current.closest(".theme-grid, .size-options, .system-action-list");
  if (currentContainer instanceof HTMLElement && (direction === "left" || direction === "right")) {
    const siblings = getControllerFocusableElements(currentContainer);
    const siblingIndex = siblings.indexOf(current);
    if (siblingIndex !== -1) {
      const siblingOffset = direction === "left" ? -1 : 1;
      const siblingTarget = siblings[siblingIndex + siblingOffset];
      if (focusTarget(siblingTarget)) return true;
    }
  }

  if (direction === "up" || direction === "left") {
    const previousInGroup = groupItems[currentIndex - 1];
    if (previousInGroup) return focusTarget(previousInGroup);
    return focusTarget(header) || focusTarget(previousGroupHeader);
  }

  if (direction === "down" || direction === "right") {
    const nextInGroup = groupItems[currentIndex + 1];
    if (nextInGroup) return focusTarget(nextInGroup);
    return focusTarget(nextGroupHeader);
  }

  return false;
}

function moveXbox360SettingsFocus(current, direction) {
  const groups = elements.settingsGroups.filter((group) => {
    const header = group.querySelector(".settings-group-header[data-focus]");
    return header instanceof HTMLElement && header.offsetParent !== null;
  });
  const currentGroup = current.closest(".settings-group");
  if (!(currentGroup instanceof HTMLElement)) return false;

  const groupIndex = groups.indexOf(currentGroup);
  const header = currentGroup.querySelector(".settings-group-header[data-focus]");
  if (groupIndex === -1 || !(header instanceof HTMLElement)) return false;

  const focusTarget = (target) => {
    if (!(target instanceof HTMLElement) || target === current) return false;
    target.focus();
    playUiSound("navigation");
    return true;
  };

  if (current === header) {
    if (direction === "up") {
      return focusTarget(groups[groupIndex - 1]?.querySelector(".settings-group-header[data-focus]"));
    }
    if (direction === "down") {
      return focusTarget(groups[groupIndex + 1]?.querySelector(".settings-group-header[data-focus]"));
    }
    if (direction === "right") {
      return focusTarget(getControllerFocusableElements(currentGroup).find((item) => item !== header));
    }
    return false;
  }

  if (direction === "left") return focusTarget(header);

  const groupItems = getControllerFocusableElements(currentGroup).filter((item) => item !== header);
  const itemIndex = groupItems.indexOf(current);
  if (itemIndex === -1) return false;
  const offset = direction === "up" ? -1 : direction === "down" || direction === "right" ? 1 : 0;
  return offset ? focusTarget(groupItems[itemIndex + offset]) : false;
}

function moveXbox360ProfileFocus(current, direction) {
  const menuItems = [
    elements.xbox360ProfileEdit,
    elements.profileSettingsButton,
    elements.profileShortcutButton,
    elements.profileSoundButton,
    elements.profileCloseButton,
  ].filter((item) => item instanceof HTMLElement && isControllerFocusable(item));
  const menuIndex = menuItems.indexOf(current);
  const focusTarget = (target) => {
    if (!(target instanceof HTMLElement) || target === current) return false;
    target.focus();
    playUiSound("navigation");
    return true;
  };

  if (menuIndex !== -1) {
    if (direction === "up") return focusTarget(menuItems[menuIndex - 1]);
    if (direction === "down") return focusTarget(menuItems[menuIndex + 1]);
    if (direction === "right") return focusTarget(elements.profileNameInput);
    return false;
  }

  if (current === elements.profileNameInput) {
    if (direction === "left") return focusTarget(elements.xbox360ProfileEdit);
    if (direction === "right" || direction === "down") {
      return focusTarget(elements.saveProfileNameButton);
    }
    return false;
  }

  if (current === elements.saveProfileNameButton) {
    if (direction === "left" || direction === "up") {
      return focusTarget(elements.profileNameInput);
    }
    return false;
  }

  return false;
}

function focusXbox360NavigationTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  target.focus();
  if (target.dataset.gameId) {
    selectGame(target.dataset.gameId, false, false);
  }
  playUiSound("navigation");
  return true;
}

function getXbox360ActivePageTab() {
  return (
    elements.xbox360PageTabs.find(
      (button) => button.dataset.xbox360Page === state.xbox360DashboardPage,
    ) || elements.xbox360PageTabs[0]
  );
}

function moveXbox360TopbarFocus(current, direction) {
  if (
    state.settings.theme !== "xbox360" ||
    !(current instanceof HTMLElement)
  ) {
    return false;
  }

  const tabs = elements.xbox360PageTabs.filter(
    (tab) => tab instanceof HTMLElement && isControllerFocusable(tab),
  );
  const index = tabs.indexOf(current);
  if (index === -1) return false;

  let target = null;
  if (direction === "left" && index > 0) target = tabs[index - 1];
  if (direction === "right" && index < tabs.length - 1) target = tabs[index + 1];
  if (direction === "down") {
    target =
      state.xbox360DashboardPage === "settings"
        ? elements.xbox360SettingsHubTiles.find((tile) => isControllerFocusable(tile))
        : elements.playButton;
  }

  focusXbox360NavigationTarget(target);
  return true;
}

function moveXbox360DashboardFocus(current, direction) {
  if (
    state.settings.theme !== "xbox360" ||
    state.xbox360DashboardPage !== "games" ||
    state.xbox360LibraryOpen ||
    !(current instanceof HTMLElement)
  ) {
    return false;
  }

  const gameCards = [...elements.gameRail.querySelectorAll(".game-card.xbox360-home-game")]
    .filter((card) => card instanceof HTMLElement && isControllerFocusable(card))
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  const [topGame, bottomGame] = gameCards;
  const dashboardItems = [
    elements.xbox360LibraryTile,
    elements.xbox360AddGameTile,
    elements.playButton,
    topGame,
    bottomGame,
    elements.xbox360ProfileTile,
    elements.xbox360SettingsTile,
    elements.xbox360SearchTile,
  ].filter((item) => item instanceof HTMLElement && isControllerFocusable(item));

  if (!dashboardItems.includes(current)) return false;

  let target = null;
  if (current === elements.xbox360LibraryTile) {
    target =
      direction === "down"
        ? elements.xbox360AddGameTile
        : direction === "right"
          ? elements.playButton
          : null;
  } else if (current === elements.xbox360AddGameTile) {
    target =
      direction === "up"
        ? elements.xbox360LibraryTile
        : direction === "right"
          ? elements.playButton
          : null;
  } else if (current === elements.playButton) {
    target =
      direction === "left"
        ? elements.xbox360LibraryTile
        : direction === "right"
          ? topGame
          : null;
  } else if (current === topGame) {
    target =
      direction === "down"
        ? bottomGame
        : direction === "left"
          ? elements.playButton
          : direction === "right"
            ? elements.xbox360ProfileTile
            : null;
  } else if (current === bottomGame) {
    target =
      direction === "up"
        ? topGame
        : direction === "left"
          ? elements.playButton
          : direction === "right"
            ? elements.xbox360SearchTile
            : null;
  } else if (current === elements.xbox360ProfileTile) {
    target =
      direction === "down"
        ? elements.xbox360SettingsTile
        : direction === "left"
          ? topGame
          : null;
  } else if (current === elements.xbox360SettingsTile) {
    target =
      direction === "up"
        ? elements.xbox360ProfileTile
        : direction === "down"
          ? elements.xbox360SearchTile
          : direction === "left"
            ? topGame
            : null;
  } else if (current === elements.xbox360SearchTile) {
    target =
      direction === "up"
        ? elements.xbox360SettingsTile
        : direction === "left"
          ? bottomGame
          : null;
  }

  if (focusXbox360NavigationTarget(target)) return true;

  if (direction === "up") {
    return focusXbox360NavigationTarget(getXbox360ActivePageTab());
  }

  // Missing neighbors are intentional dashboard edges.
  return true;
}

function moveXbox360SettingsHubFocus(current, direction) {
  if (
    state.settings.theme !== "xbox360" ||
    state.xbox360DashboardPage !== "settings" ||
    elements.settingsPanel.classList.contains("open") ||
    !(current instanceof HTMLElement)
  ) {
    return false;
  }

  const tiles = elements.xbox360SettingsHubTiles.filter(
    (tile) => tile instanceof HTMLElement && isControllerFocusable(tile),
  );
  const index = tiles.indexOf(current);
  if (index === -1) return false;

  const columnCount = 4;
  const row = Math.floor(index / columnCount);
  const column = index % columnCount;
  let targetIndex = -1;

  if (direction === "left" && column > 0) targetIndex = index - 1;
  if (direction === "right" && column < columnCount - 1) targetIndex = index + 1;
  if (direction === "up" && row > 0) targetIndex = index - columnCount;
  if (direction === "down" && row === 0) targetIndex = index + columnCount;

  if (focusXbox360NavigationTarget(tiles[targetIndex])) return true;

  if (direction === "up") {
    return focusXbox360NavigationTarget(getXbox360ActivePageTab());
  }

  // Grid edges stay put.
  return true;
}

function getClosestXbox360HorizontalTarget(reference, candidates) {
  if (!(reference instanceof HTMLElement)) return null;
  const referenceRect = reference.getBoundingClientRect();
  const referenceCenter = referenceRect.left + referenceRect.width / 2;
  return (
    candidates
      .filter((candidate) => candidate instanceof HTMLElement)
      .map((candidate) => {
        const rect = candidate.getBoundingClientRect();
        return {
          candidate,
          distance: Math.abs(rect.left + rect.width / 2 - referenceCenter),
        };
      })
      .sort((a, b) => a.distance - b.distance)[0]?.candidate || null
  );
}

function moveXbox360LibraryFocus(current, direction) {
  if (
    state.settings.theme !== "xbox360" ||
    !state.xbox360LibraryOpen ||
    !(current instanceof HTMLElement)
  ) {
    return false;
  }

  const cards = [...elements.gameRail.querySelectorAll(".game-card")]
    .filter((card) => card instanceof HTMLElement && isControllerFocusable(card))
    .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
  const cardIndex = cards.indexOf(current);
  const filterControls = [
    elements.xbox360LibraryFilter,
    elements.xbox360LibrarySort,
  ].filter((control) => control instanceof HTMLElement && isControllerFocusable(control));
  let target = null;

  if (cardIndex !== -1) {
    if (direction === "left" && cardIndex > 0) target = cards[cardIndex - 1];
    if (direction === "right" && cardIndex < cards.length - 1) target = cards[cardIndex + 1];
    if (direction === "up") {
      target = getClosestXbox360HorizontalTarget(current, filterControls);
    }
  } else if (current === elements.xbox360LibraryFilter) {
    if (direction === "right") target = elements.xbox360LibrarySort;
    if (direction === "up") target = elements.xbox360LibraryBack;
    if (direction === "down") {
      target = getClosestXbox360HorizontalTarget(current, cards);
    }
  } else if (current === elements.xbox360LibrarySort) {
    if (direction === "left") target = elements.xbox360LibraryFilter;
    if (direction === "up") target = elements.xbox360LibraryBack;
    if (direction === "down") {
      target = getClosestXbox360HorizontalTarget(current, cards);
    }
  } else if (current === elements.xbox360LibraryBack) {
    if (direction === "down") target = elements.xbox360LibraryFilter;
  } else {
    return false;
  }

  focusXbox360NavigationTarget(target);
  return true;
}

function moveFocus(direction) {
  const items = focusables();
  if (!items.length) return;
  const current = document.activeElement;
  const currentRect = current?.getBoundingClientRect?.();

  if (!currentRect || !items.includes(current)) {
    getPreferredFocusTarget(items)?.focus();
    return;
  }

  const useGroupedSettingsNavigation =
    (state.settings.theme === "ps2" &&
      state.ps2Screen === "settings" &&
      elements.settingsPanel.classList.contains("open")) ||
    (state.settings.theme === "ps3" &&
      state.currentView === "settings");

  if (useGroupedSettingsNavigation) {
    if (movePs2SettingsFocus(current, direction)) return;
    return;
  }
  if (
    state.settings.theme === "xbox360" &&
    elements.settingsPanel.classList.contains("open")
  ) {
    if (moveXbox360SettingsFocus(current, direction)) return;
    return;
  }
  if (
    state.settings.theme === "xbox360" &&
    !elements.profilePanel.hidden &&
    elements.profilePanel.classList.contains("open")
  ) {
    if (moveXbox360ProfileFocus(current, direction)) return;
    return;
  }
  if (moveXbox360TopbarFocus(current, direction)) return;
  if (moveXbox360LibraryFocus(current, direction)) return;
  if (moveXbox360DashboardFocus(current, direction)) return;
  if (moveXbox360SettingsHubFocus(current, direction)) return;

  const isPs3Theme = state.settings.theme === "ps3";
  const ps3GamesButton = isPs3Theme
    ? elements.navButtons.find((button) => button.dataset.view === "games")
    : null;
  const isPs3GameCard = isPs3Theme && current instanceof HTMLElement && current.classList.contains("game-card");

  if (isPs3GameCard && direction === "up") {
    const otherGameCards = items.filter(
      (element) => element !== current && element instanceof HTMLElement && element.classList.contains("game-card"),
    );
    const previousGame = getDirectionalCandidates(currentRect, otherGameCards, "up")[0]?.element;
    if (previousGame) {
      previousGame.focus();
      if (previousGame.dataset.gameId) {
        selectGame(previousGame.dataset.gameId, false, false);
      }
      playUiSound("navigation");
      return;
    }
    if (ps3GamesButton instanceof HTMLElement) {
      ps3GamesButton.focus();
      playUiSound("navigation");
      return;
    }
  }

  if (isPs3GameCard && direction === "left") {
    return;
  }

  let pool = items.filter((element) => element !== current);

  const restrictToGameList =
    current.classList.contains("game-card") &&
    ((state.settings.theme === "ps2" && (direction === "up" || direction === "down")) ||
      (state.settings.theme === "xbox-classic" && (direction === "up" || direction === "down")) ||
      (state.settings.theme === "xbox360" &&
        (state.xbox360LibraryOpen
          ? direction === "left" || direction === "right"
          : direction === "up" || direction === "down")) ||
      (!["ps2", "ps3", "xbox-classic", "xbox360"].includes(state.settings.theme) &&
        (direction === "left" || direction === "right")));
  if (restrictToGameList) {
    const railCards = pool.filter((element) => element.classList.contains("game-card"));
    if (railCards.length) {
      pool = railCards;
    } else {
      return;
    }
  }

  const candidates = getDirectionalCandidates(currentRect, pool, direction);

  if (candidates[0]?.element) {
    const nextElement = candidates[0].element;
    nextElement.focus();
    if (nextElement.dataset.gameId) {
      selectGame(nextElement.dataset.gameId, false, false);
    }
    playUiSound("navigation");
  }
}

function activateFocused() {
  const target = document.activeElement;
  if (!(target instanceof HTMLElement)) return;

  if (target === elements.importLauncher && !target.disabled) {
    const options = [...target.options].filter((option) => !option.disabled);
    const current = options.findIndex((option) => option.value === target.value);
    target.value = options[(current + 1) % options.length].value;
    target.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  if (target === elements.importLauncher && !target.disabled) {
    const options = [...target.options].filter((option) => !option.disabled);
    const current = options.findIndex((option) => option.value === target.value);
    target.value = options[(current + 1) % options.length].value;
    target.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }

  if (target.classList.contains("toggle-row")) {
    const checkbox = target.querySelector('input[type="checkbox"]');
    if (checkbox instanceof HTMLInputElement && !checkbox.disabled) {
      checkbox.click();
      target.focus({ preventScroll: true });
    }
    return;
  }

  if (typeof target.click === "function") target.click();
}

function handleBackAction() {
  const hasBlockingOverlay =
    !elements.gameModal.hidden ||
    !elements.deleteModal.hidden ||
    elements.searchPanel.classList.contains("open") ||
    !elements.contextMenu.hidden ||
    (!elements.profilePanel.hidden && !isFullPageMenuTheme());

  if (
    !hasBlockingOverlay &&
    state.settings.theme === "ps3" &&
    state.currentView === "games" &&
    document.activeElement instanceof HTMLElement &&
    !document.activeElement.closest(".topbar")
  ) {
    const gamesButton = elements.navButtons.find((button) => button.dataset.view === "games");
    if (gamesButton instanceof HTMLElement) {
      focusWithoutScroll(gamesButton);
      return true;
    }
  }

  if (
    !hasBlockingOverlay &&
    state.settings.theme === "ps3" &&
    state.currentView === "settings"
  ) {
    const activeGroup = elements.settingsGroups.find((section) => section.classList.contains("active"));
    const activeHeader = activeGroup?.querySelector(".settings-group-header[data-focus]");
    const activeElement = document.activeElement;
    const isInsideActiveGroup =
      activeGroup && activeElement instanceof HTMLElement && activeGroup.contains(activeElement);
    const isOnActiveHeader =
      activeHeader &&
      activeElement instanceof HTMLElement &&
      (activeElement === activeHeader || activeHeader.contains(activeElement));

    if (isInsideActiveGroup && !isOnActiveHeader) {
      focusWithoutScroll(activeHeader);
      return true;
    }
  }

  if (closeOverlays()) return true;
  if (
    state.settings.theme === "xbox360" &&
    state.xbox360DashboardPage === "settings"
  ) {
    setXbox360DashboardPage("games");
    return true;
  }
  if (state.settings.theme === "xbox360" && state.xbox360LibraryOpen) {
    setXbox360LibraryOpen(false);
    return true;
  }
  if (state.settings.theme === "ps2" && state.ps2Screen === "games") {
    setPs2Screen("home", { focus: true });
    return true;
  }
  if (state.settings.theme === "xbox-classic" && state.xboxScreen === "games") {
    setXboxScreen("home", { focus: true });
    return true;
  }
  if (state.settings.theme === "stadia" && state.stadiaScreen === "library") {
    setStadiaScreen("home", { route: "home", focus: true });
    return true;
  }
  return false;
}

function cycleSortOrder() {
  const currentIndex = SORT_OPTIONS.findIndex((option) => option.value === getSortOption().value);
  const next = SORT_OPTIONS[(currentIndex + 1) % SORT_OPTIONS.length];
  state.settings.sort = next.value;
  saveState();
  updateSortButton();
  renderCurrentView();
  showToast(`Sort: ${next.label}`);
}

function gamepadLoop() {
  gamepadLoopScheduled = false;

  if (!isAppActive()) {
    state.previousButtons = [];
    setControllerInputMode(false);
    return;
  }

  if (!state.settings.gamepad) {
    setControllerInputMode(false);
    scheduleGamepadLoop();
    return;
  }

  const gamepad = getConnectedGamepad();
  if (!gamepad) {
    scheduleGamepadLoop();
    return;
  }

  const pressed = gamepad.buttons.map((button) => button.pressed);
  const justPressed = (index) => pressed[index] && !state.previousButtons[index];
  const anyJustPressed = pressed.some((isPressed, index) => isPressed && !state.previousButtons[index]);
  const x = gamepad.axes[0] || 0;
  const y = gamepad.axes[1] || 0;
  const axisActive = Math.abs(x) > 0.65 || Math.abs(y) > 0.65;

  if (anyJustPressed || axisActive) setControllerInputMode(true);

  if (pendingThemeTransition && anyJustPressed) {
    handleThemeTransitionSkip();
    state.previousButtons = pressed;
    scheduleGamepadLoop();
    return;
  }

  if (bootSequenceActive && anyJustPressed) {
    skipBoot();
    state.previousButtons = pressed;
    scheduleGamepadLoop();
    return;
  }

  if (justPressed(0)) activateFocused();
  if (justPressed(1)) {
    if (handleBackAction()) playUiSound("back");
  }
  if (
    justPressed(9) &&
    !(state.settings.theme === "xbox360" && state.xbox360DashboardPage === "settings")
  ) {
    showContextMenuFromController(); // Standard Gamepad API Start/Menu/Options button.
  }

  const dpadDirection = [
    [12, "up"],
    [13, "down"],
    [14, "left"],
    [15, "right"],
  ].find(([index]) => justPressed(index))?.[1];
  if (dpadDirection) moveFocus(dpadDirection);

  const now = performance.now();
  if (!axisActive) {
    state.axisRepeatAt = 0;
  } else if (dpadDirection) {
    state.axisRepeatAt = now + 220;
  } else if (now > state.axisRepeatAt) {
    const axisDirection =
      Math.abs(x) > Math.abs(y)
        ? x < 0
          ? "left"
          : "right"
        : y < 0
          ? "up"
          : "down";
    moveFocus(axisDirection);
    state.axisRepeatAt = now + 220;
  }

  state.previousButtons = pressed;
  scheduleGamepadLoop();
}

elements.gameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const existing = state.games.find((game) => game.id === elements.gameId.value);
  const game = {
    ...existing,
    id: existing?.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: elements.gameTitle.value.trim(),
    platform: elements.gamePlatform.value,
    accent: elements.gameAccent.value,
    path: elements.gamePath.value.trim(),
    description: elements.gameDescription.value.trim(),
    cover: readImageField(elements.gameCover),
    background: readImageField(elements.gameBackground),
    addedAt: existing?.addedAt || Date.now(),
  };

  const nextGames = existing
    ? state.games.map((entry) => entry.id === existing.id ? game : entry)
    : [...state.games, game];
  try {
    localStorage.setItem(STORAGE_KEYS.games, JSON.stringify(nextGames));
  } catch (error) {
    showToast(error.name === "QuotaExceededError"
      ? "Library storage is full. Choose local image files instead of large data URLs, then save again."
      : "Could not save the game. Your changes are still here; please try again.");
    return;
  }
  state.games = nextGames;
  state.selectedId = game.id;
  closeOverlays();
  renderCurrentView();
  showToast(existing ? "Game updated" : "Game added to your library");
});

elements.sortButton.addEventListener("click", cycleSortOrder);
elements.addGameButton.addEventListener("click", () => openGameModal());
elements.xbox360LibraryTile?.addEventListener("click", (event) => {
  event.stopPropagation();
  if (!state.games.length) {
    showToast("Your game library is empty.");
    return;
  }
  closeOverlays();
  setXbox360LibraryOpen(true);
});
elements.xbox360LibraryBack?.addEventListener("click", () => {
  setXbox360LibraryOpen(false);
});
elements.xbox360LibraryFilter?.addEventListener("click", () => {
  cycleXbox360LibraryPlatformFilter();
  window.setTimeout(() => focusWithoutScroll(elements.xbox360LibraryFilter), 0);
});
elements.xbox360LibrarySort?.addEventListener("click", () => {
  cycleSortOrder();
  window.setTimeout(() => focusWithoutScroll(elements.xbox360LibrarySort), 0);
});
elements.xbox360SearchTile?.addEventListener("pointerdown", (event) => {
  event.preventDefault();
});
elements.xbox360SearchTile?.addEventListener("click", (event) => {
  event.stopPropagation();
  openSearchPanel("manual");
  window.setTimeout(() => {
    elements.searchInput.focus();
    elements.searchInput.select();
  }, 0);
});
elements.xbox360AddGameTile?.addEventListener("click", (event) => {
  event.stopPropagation();
  openGameModal();
});
elements.xbox360ProfileTile?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleProfilePanel(true);
});
elements.xbox360SettingsTile?.addEventListener("click", (event) => {
  event.stopPropagation();
  openSettingsPanel();
});
elements.xbox360OptionsTile?.addEventListener("click", (event) => {
  event.stopPropagation();
  showContextMenu();
});
elements.xbox360PageTabs.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    setXbox360DashboardPage(button.dataset.xbox360Page);
  });
});
elements.xbox360SettingsPreview?.addEventListener("click", (event) => {
  event.stopPropagation();
  setXbox360DashboardPage("settings");
});
elements.xbox360GamesPreview?.addEventListener("click", (event) => {
  event.stopPropagation();
  setXbox360DashboardPage("games");
});
elements.xbox360SettingsHubTiles.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (button.dataset.xbox360SettingsAction === "profile") {
      toggleProfilePanel(true);
      return;
    }
    const group = button.dataset.xbox360SettingsGroup;
    if (group) openSettingsPanel(group, { xbox360Detail: true });
  });
});
document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeOverlays);
});

elements.browseExecutable.addEventListener("click", async () => {
  if (!desktop) {
    showToast("File browsing requires the desktop app.");
    return;
  }
  const selected = await desktop.chooseExecutable();
  if (selected) elements.gamePath.value = selected;
});

elements.browseCover.addEventListener("click", async () => {
  if (!desktop) {
    showToast("Local cover images require the desktop app; paste an image URL instead.");
    return;
  }
  try {
    const selected = await desktop.chooseCover();
    if (selected) setChosenImage(elements.gameCover, selected);
  } catch {
    showToast("Could not import the cover image. Please choose another file.");
  }
});

elements.browseBackground.addEventListener("click", async () => {
  if (!desktop) {
    showToast("Local background images require the desktop app; paste an image URL instead.");
    return;
  }
  try {
    const selected = await desktop.chooseCover();
    if (selected) setChosenImage(elements.gameBackground, selected);
  } catch {
    showToast("Could not import the background image. Please choose another file.");
  }
});

elements.playButton.addEventListener("click", launchSelectedGame);
elements.stadiaGenreFilter?.addEventListener("click", cycleStadiaPlatformFilter);
elements.stadiaRecentFilter?.addEventListener("click", cycleSortOrder);
elements.stadiaControllerButton?.addEventListener("click", () => {
  const gamepad = getConnectedGamepad();
  showToast(gamepad ? `${gamepad.id.split("(")[0].trim()} connected` : "Controller not connected");
});
elements.stadiaNavItems.forEach((button) => {
  button.addEventListener("click", () => {
    const route = button.dataset.stadiaRoute || button.textContent.trim().toLowerCase();
    setStadiaScreen(button.dataset.stadiaScreen, { route, focus: false });
  });
});
elements.moreButton.addEventListener("click", (event) => {
  event.stopPropagation();
  showContextMenu();
});
elements.contextMenu.addEventListener("click", (event) => {
  event.stopPropagation();
});
elements.editGameButton.addEventListener("click", () => {
  hideContextMenu();
  openGameModal(getSelectedGame());
});
elements.removeGameButton.addEventListener("click", () => openDeleteModal(getSelectedGame()));
elements.confirmDeleteButton.addEventListener("click", confirmDeleteGame);

elements.settingsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (isFullPageMenuTheme() && state.currentView === "settings") {
    if (closeOverlays()) playUiSound("back");
    return;
  }
  if (elements.settingsPanel.classList.contains("open")) {
    if (closeOverlays()) playUiSound("back");
    return;
  }
  openSettingsPanel();
});
elements.settingsButton.addEventListener("focus", () => {
  if (state.settings.theme !== "ps3" || isPs3AutoPanelOpenSuppressed()) return;
  openSettingsPanel();
});
elements.settingsButton.addEventListener("mouseenter", () => {
  if (state.settings.theme !== "ps3" || isPs3AutoPanelOpenSuppressed()) return;
  openSettingsPanel();
});
elements.brand.addEventListener("click", (event) => {
  if (state.settings.theme === "stadia") {
    event.preventDefault();
    setStadiaScreen("home", { route: "home", focus: true });
    return;
  }
  if (!isFullPageMenuTheme()) return;
  event.preventDefault();
  event.stopPropagation();
  toggleProfilePanel();
});
elements.brand.addEventListener("focus", () => {
  if (state.settings.theme !== "ps3" || isPs3AutoPanelOpenSuppressed()) return;
  toggleProfilePanel(true);
});
elements.brand.addEventListener("mouseenter", () => {
  if (state.settings.theme !== "ps3" || isPs3AutoPanelOpenSuppressed()) return;
  toggleProfilePanel(true);
});
elements.profileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleProfilePanel();
});
elements.settingsPanel.addEventListener("click", (event) => {
  event.stopPropagation();
});
elements.profilePanel.addEventListener("click", (event) => {
  event.stopPropagation();
});
elements.xbox360ProfileEdit?.addEventListener("click", () => {
  focusWithoutScroll(elements.profileNameInput);
  elements.profileNameInput.select();
});
elements.xbox360ProfileBack?.addEventListener("click", () => {
  if (closeOverlays()) playUiSound("back");
});
elements.profileSettingsButton.addEventListener("click", (event) => {
  event.stopPropagation();
  openSettingsPanel();
});
elements.settingsGroupHeaders.forEach((header) => {
  const setGroup = () => {
    const group = header.closest("[data-settings-group]")?.dataset.settingsGroup;
    if (!group) return;
    setSettingsPanelGroup(group);
  };
  header.addEventListener("click", setGroup);
  header.addEventListener("focus", setGroup);
  header.addEventListener("mouseenter", setGroup);
  header.addEventListener("pointerenter", setGroup);
});
elements.settingsGroups.forEach((section) => {
  section.addEventListener("focusin", () => {
    const group = section.dataset.settingsGroup;
    if (!group) return;
    setSettingsPanelGroup(group);
  });
});
elements.settingsFullscreenButton.addEventListener("click", toggleFullscreen);
elements.backupLibraryButton.addEventListener("click", backupLibrary);
elements.loadLibraryButton.addEventListener("click", loadLibraryBackup);
elements.refreshSteamButton.addEventListener("click", () => refreshSteamGames(true));
elements.importLauncher.addEventListener("change", () => {
  state.settings.importLauncher = elements.importLauncher.value;
  saveState();
});
elements.libraryBackupInput.addEventListener("change", async () => {
  const file = elements.libraryBackupInput.files[0];
  if (!file) return;
  await runLibraryBackupAction(async () => {
    restoreLibrary(await file.text());
  });
  elements.libraryBackupInput.value = "";
});
elements.profileShortcutButton.addEventListener("click", async () => {
  if (!desktop) {
    showToast("Desktop shortcut creation requires the desktop app.");
    return;
  }

  const result = await desktop.createDesktopShortcut();
  showToast(result.ok ? "Desktop shortcut created" : result.error || "Could not create shortcut.");
});
elements.profileSoundButton.addEventListener("click", () => {
  setSoundEnabled(!state.settings.sound);
  showToast(`Interface sounds ${state.settings.sound ? "enabled" : "disabled"}`);
});
elements.autoStartToggle.addEventListener("change", () => {
  updateAutoStartSetting(elements.autoStartToggle.checked);
});
elements.saveProfileNameButton.addEventListener("click", saveProfileName);
elements.profileNameInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  saveProfileName();
});
elements.profileNameInput.addEventListener("blur", () => {
  elements.profileNameInput.value = normalizeProfileName(elements.profileNameInput.value);
});
elements.profileCloseButton.addEventListener("click", closeApplication);
elements.closeSettings.addEventListener("click", closeOverlays);
elements.modalBackdrop.addEventListener("click", () => {
  if (closeOverlays()) playUiSound("back");
});

elements.searchButton.addEventListener("click", (event) => {
  event.stopPropagation();
  if (state.settings.theme === "stadia" && state.stadiaScreen !== "library") {
    setStadiaScreen("library", { route: "library", focus: false });
  }
  if (elements.searchPanel.classList.contains("open")) {
    if (searchPanelOpenReason !== "manual") {
      openSearchPanel("manual");
      return;
    }
    closeSearchPanel({ clearQuery: true });
    return;
  }
  openSearchPanel("manual");
});
elements.searchButton.addEventListener("focus", () => {
  if (state.settings.theme !== "ps3" || elements.searchPanel.classList.contains("open")) return;
  openSearchPanel("focus");
});
elements.searchButton.addEventListener("mouseenter", () => {
  if (state.settings.theme !== "ps3" || elements.searchPanel.classList.contains("open")) return;
  openSearchPanel("hover");
});
elements.searchButton.addEventListener("mouseleave", () => {
  if (state.settings.theme !== "ps3") return;
  setTimeout(maybeAutoCloseSearchPanel, 40);
});
elements.searchButton.addEventListener("blur", () => {
  if (state.settings.theme !== "ps3") return;
  setTimeout(maybeAutoCloseSearchPanel, 0);
});
elements.searchPanel.addEventListener("click", (event) => event.stopPropagation());
elements.searchPanel.addEventListener("mouseenter", () => {
  if (searchPanelOpenReason && searchPanelOpenReason !== "manual") {
    searchPanelOpenReason = "focus";
  }
});
elements.searchPanel.addEventListener("mouseleave", () => {
  if (state.settings.theme !== "ps3") return;
  setTimeout(maybeAutoCloseSearchPanel, 40);
});
elements.searchPanel.addEventListener("focusout", () => {
  if (state.settings.theme !== "ps3") return;
  setTimeout(maybeAutoCloseSearchPanel, 0);
});
elements.searchInput.addEventListener("click", (event) => event.stopPropagation());
elements.searchInput.addEventListener("focus", () => {
  if (elements.searchPanel.classList.contains("open")) {
    searchPanelOpenReason = "manual";
  }
});
elements.searchInput.addEventListener("input", renderCurrentView);
elements.closeAppButton.addEventListener("click", closeApplication);
elements.gameRail.addEventListener("pointerdown", beginRailDrag);
elements.gameRail.addEventListener("pointermove", moveRailDrag);
elements.gameRail.addEventListener("pointerup", endRailDrag);
elements.gameRail.addEventListener("pointercancel", endRailDrag);
elements.gameRail.addEventListener("lostpointercapture", () => {
  railDrag.active = false;
  railDrag.pointerId = null;
  elements.gameRail.classList.remove("dragging");
});
elements.gameRail.addEventListener(
  "click",
  (event) => {
    if (!railDrag.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
  },
  true,
);
elements.gameRail.addEventListener("wheel", handleGameRailWheel, { passive: false });
elements.gameRail.addEventListener("mousemove", (event) => selectHoveredGame(event, ".game-card"));

elements.bootToggle.checked = state.settings.boot;
elements.gamepadToggle.checked = state.settings.gamepad;
applyInterfaceSize(state.settings.uiSize);
updateSortButton();
updateSoundUi();
refreshAutoStartUi();
updateProfileUi();
elements.brandLogo.addEventListener("load", () => {
  if (state.settings.theme === "ps3") {
    elements.brandLogo.hidden = true;
    elements.brandText.hidden = false;
    return;
  }
  elements.brandLogo.hidden = false;
  elements.brandText.hidden = true;
});
elements.brandLogo.addEventListener("error", () => {
  elements.brandLogo.hidden = true;
  elements.brandText.hidden = false;
});
elements.ambientVideo.addEventListener("canplay", () => {
  updateAmbientVideoState(Boolean(elements.ambientVideo.getAttribute("src")));
});
elements.ambientVideo.addEventListener("ended", () => {
  if (state.settings.theme !== "ps3") return;
  const nextSrc = getNextPs3BackgroundVideo();
  if (!nextSrc) return;
  setAmbientVideoSource(nextSrc);
  playAmbientVideo();
});
elements.ambientVideo.addEventListener("error", () => {
  updateAmbientVideoState(false);
});

elements.themeCards.forEach((button) => {
  if (button.disabled) return;
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme, { persist: true, announce: true });
  });
});

elements.ps2RootItems.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.settings.theme !== "ps2") return;
    switch (button.dataset.ps2Action) {
      case "profile":
        toggleProfilePanel(true);
        break;
      case "settings":
        openSettingsPanel();
        break;
      default:
        setPs2Screen("games", { focus: true });
        break;
    }
  });
});

elements.xboxRootItems.forEach((button) => {
  button.addEventListener("click", () => {
    if (state.settings.theme !== "xbox-classic") return;
    switch (button.dataset.xboxAction) {
      case "profile":
        toggleProfilePanel(true);
        break;
      case "settings":
        openSettingsPanel();
        break;
      default:
        setXboxScreen("games", { focus: true });
        break;
    }
  });
});

elements.uiSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyInterfaceSize(button.dataset.uiSize);
    saveState();
    showToast(`Interface size: ${button.textContent.trim()}`);
  });
});

elements.promptStyleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.settings.promptStyle = normalizePromptStyle(button.dataset.promptStyle);
    saveState();
    updateControllerPromptsUi();
    showToast(`Controller prompts: ${button.textContent.trim()}`);
  });
});

[
  [elements.bootToggle, "boot"],
  [elements.gamepadToggle, "gamepad"],
  [elements.soundToggle, "sound"],
].forEach(([input, key]) => {
  input.addEventListener("change", () => {
    if (key === "sound") {
      setSoundEnabled(input.checked);
      return;
    }
    state.settings[key] = input.checked;
    saveState();
  });
});

elements.navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.view);
  });
  button.addEventListener("focus", () => {
    if (state.settings.theme !== "ps3") return;
    handleNavHover(button, null);
  });
  button.addEventListener("mouseenter", () => {
    handleNavHover(button);
  });
  button.addEventListener("mouseover", () => {
    handleNavHover(button);
  });
  button.addEventListener("pointerenter", (event) => {
    handleNavHover(button, event.pointerType);
  });
});

document.addEventListener("focusin", (event) => {
  document.querySelectorAll(".controller-focus").forEach((element) => {
    if (element !== event.target) element.classList.remove("controller-focus");
  });
  if (
    controllerInputMode &&
    event.target instanceof HTMLElement &&
    isControllerFocusable(event.target)
  ) {
    event.target.classList.add("controller-focus");
  }
});

document.addEventListener("keydown", (event) => {
  setControllerInputMode(false);
  if (pendingThemeTransition) {
    event.preventDefault();
    event.stopPropagation();
    handleThemeTransitionSkip();
    return;
  }
  if (bootSequenceActive) {
    event.preventDefault();
    event.stopPropagation();
    skipBoot();
    return;
  }
  if (event.key === "Escape") {
    if (handleBackAction()) {
      playUiSound("back");
      event.preventDefault();
    }
    return;
  }
  if (event.target.matches("input, textarea, select")) return;

  const direction = {
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowDown: "down",
  }[event.key];
  if (direction) {
    event.preventDefault();
    moveFocus(direction);
  }
  if (event.key === "Enter" || event.key === " ") {
    if (document.activeElement?.classList.contains("toggle-row")) {
      event.preventDefault();
      activateFocused();
      playUiSound("select");
      return;
    }
    if (document.activeElement?.classList.contains("game-card")) {
      event.preventDefault();
      selectGame(document.activeElement.dataset.gameId);
      if (state.settings.theme === "xbox360" && state.xbox360LibraryOpen) {
        launchSelectedGame();
      }
      playUiSound("select");
    }
  }
});

document.addEventListener("pointerdown", (event) => {
  setControllerInputMode(false);
  if (!bootSequenceActive) return;
  event.preventDefault();
  event.stopPropagation();
  skipBoot();
}, true);

document.addEventListener("click", (event) => {
  if (ambientAudioPending) startAmbientAudio();

  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  const ps2ProfileLauncher = target?.closest('[data-ps2-action="profile"]');
  const xboxProfileLauncher = target?.closest('[data-xbox-action="profile"]');
  const control = target?.closest("button, a");
  if (control && !control.disabled) {
    playUiSound(control.dataset.uiSound || "select");
  }

  if (
    !elements.contextMenu.hidden &&
    !elements.contextMenu.contains(target) &&
    !isContextMenuTrigger(target)
  ) {
    hideContextMenu();
  }

  if (
    !elements.profilePanel.hidden &&
    !elements.profilePanel.contains(target) &&
    !elements.profileButton.contains(target) &&
    !elements.brand.contains(target) &&
    !(state.settings.theme === "xbox-classic" && state.xboxScreen === "profile") &&
    !ps2ProfileLauncher &&
    !xboxProfileLauncher
  ) {
    elements.profilePanel.classList.remove("open");
    elements.profilePanel.hidden = true;
    elements.profilePanel.setAttribute("aria-hidden", "true");
    elements.profilePanel.setAttribute("inert", "");
    elements.brand.classList.remove("active");
  }

  if (
    state.settings.theme === "ps3" &&
    elements.settingsPanel.classList.contains("open") &&
    !elements.settingsPanel.contains(target) &&
    !elements.settingsButton.contains(target)
  ) {
    closeOverlays();
  }

  if (
    elements.searchPanel.classList.contains("open") &&
    !elements.searchPanel.contains(target) &&
    !elements.searchButton.contains(target)
  ) {
    closeSearchPanel({ clearQuery: false });
  }
});

document.addEventListener("keydown", () => {
  if (ambientAudioPending) startAmbientAudio();
});

document.addEventListener("visibilitychange", () => {
  syncAppActivity();
});

window.addEventListener("focus", () => {
  appWindowFocused = true;
  syncAppActivity();
});
window.addEventListener("blur", () => {
  appWindowFocused = false;
  syncAppActivity();
});
window.addEventListener("resize", () => {
  updateXbox360DashboardScale();
  if (!elements.profilePanel.hidden) positionProfilePanel();
  if (state.settings.theme === "ps3" && elements.settingsPanel.classList.contains("open")) {
    positionSettingsPanel();
  }
  if (state.settings.theme === "stadia") {
    syncStadiaSearchPanelPosition();
    syncStadiaCardOptionsButton();
  }
});

window.addEventListener("gamepadconnected", (event) => {
  state.gamepadIndex = event.gamepad.index;
  state.previousButtons = [];
  elements.controllerStatus.classList.add("connected");
  elements.controllerStatus.lastChild.textContent = ` ${event.gamepad.id.split("(")[0].trim() || "Controller"} connected`;
  updateControllerPromptsUi();
  showToast("Controller connected");
});

window.addEventListener("gamepaddisconnected", () => {
  state.gamepadIndex = null;
  setControllerInputMode(false);
  elements.controllerStatus.classList.remove("connected");
  elements.controllerStatus.lastChild.textContent = " Controller not connected";
  updateControllerPromptsUi();
});

if (desktop) {
  elements.desktopHint.textContent = "Choose an executable, shortcut, or launcher URL file.";
  elements.desktopStatusTitle.textContent = "Desktop mode";
  elements.desktopStatusText.textContent = "Local file browsing and game launching are enabled.";
  elements.profileShortcutButton.disabled = false;
  desktop.onFullscreenChanged((isFullscreen) => {
    desktopFullscreen = isFullscreen;
    updateFullscreenButton(desktopFullscreen);
  });
  window.addEventListener("focus", refreshAutoStartUi);
} else if (elements.profileShortcutButton) {
  elements.profileShortcutButton.disabled = true;
}

updateClock();
setInterval(updateClock, 1_000);
updateXbox360DashboardScale();
applyTheme(state.settings.theme);
setSettingsPanelGroup(state.settingsPanelGroup);
updateControllerPromptsUi();
state.selectedId = getSortedGames()[0]?.id || null;
setActiveView("games");
updateFullscreenButton(false);
if (desktop) {
  desktop.getFullscreen().then((isFullscreen) => {
    desktopFullscreen = isFullscreen;
    updateFullscreenButton(desktopFullscreen);
  });
}
setupBoot();
elements.refreshSteamButton.disabled = !(desktop?.discoverLocal || desktop?.discoverSteam);
elements.importLauncher.disabled = !(desktop?.discoverLocal || desktop?.discoverSteam);
elements.restoreRemovedToggle.disabled = !(desktop?.discoverLocal || desktop?.discoverSteam);
for (const option of elements.importLauncher.options) {
  if (option.value !== "all" && option.value !== "steam" && (desktop?.platform !== "win32" || !desktop?.discoverLocal)) option.disabled = true;
}
elements.importLauncher.value = [...elements.importLauncher.options].some((option) => option.value === state.settings.importLauncher && !option.disabled)
  ? state.settings.importLauncher : "all";
if (desktop?.discoverLocal || desktop?.discoverSteam) elements.steamDiscoveryStatus.textContent = "Installed games not scanned.";
syncAppActivity();
window.addEventListener("beforeunload", stopAllAudioPlayback);
