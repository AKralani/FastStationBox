const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const packageJson = require(path.join(rootDir, "package.json"));
const target = process.argv[2] || "nsis";
const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
const outputDir = path.join(rootDir, "dist", `${target}-${stamp}`);
const builderBin = path.join(
  rootDir,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "electron-builder.cmd" : "electron-builder"
);

fs.mkdirSync(outputDir, { recursive: true });

const args = [
  "--win",
  target,
  `--config.directories.output=${outputDir}`,
];

let logs = "";

const build = process.platform === "win32"
  ? spawn([builderBin, ...args].map(quoteShellArg).join(" "), [], {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    })
  : spawn(builderBin, args, {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
    });

const writeChunk = (stream, chunk) => {
  const text = chunk.toString();
  logs += text;
  stream.write(text);
};

build.stdout.on("data", (chunk) => writeChunk(process.stdout, chunk));
build.stderr.on("data", (chunk) => writeChunk(process.stderr, chunk));

build.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});

build.on("close", (code) => {
  const artifact = findArtifact(outputDir);
  if (artifact) {
    console.log(`\nBuild output: ${artifact}`);
  }

  if (code === 0) {
    process.exit(0);
  }

  const windowsFileLock = /EBUSY|EPERM|Can't open output file/i.test(logs);
  const installerCreated = artifact && isExpectedArtifact(artifact, target, packageJson);

  if (windowsFileLock && installerCreated) {
    console.warn(
      "\nA Windows file lock interrupted electron-builder cleanup after the artifact was created. Treating the build as successful."
    );
    process.exit(0);
  }

  process.exit(code || 1);
});

function findArtifact(dir) {
  if (!fs.existsSync(dir)) {
    return null;
  }

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".exe") && !name.includes(".__uninstaller"))
    .map((name) => path.join(dir, name))
    .sort((left, right) => fs.statSync(right).mtimeMs - fs.statSync(left).mtimeMs)[0] || null;
}

function isExpectedArtifact(artifactPath, buildTarget, pkg) {
  const fileName = path.basename(artifactPath);
  if (buildTarget === "nsis") {
    return fileName === `${pkg.productName}-Setup-${pkg.version}.exe`;
  }

  return fileName.endsWith(".exe");
}

function quoteShellArg(value) {
  return `"${value.replace(/"/g, '\\"')}"`;
}
