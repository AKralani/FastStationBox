const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".wav": "audio/wav",
  ".json": "application/json; charset=utf-8",
};
const streamableExtensions = new Set([".mp3", ".mp4", ".wav", ".webm"]);

http
  .createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
    const filePath = path.resolve(root, relativePath);

    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const extension = path.extname(filePath);
    const contentType = contentTypes[extension] || "application/octet-stream";
    const fileSize = fs.statSync(filePath).size;
    const range = req.headers.range;

    if (range && streamableExtensions.has(extension)) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      const suffixLength = !match?.[1] && match?.[2] ? Number(match[2]) : null;
      const start = suffixLength === null
        ? Number(match?.[1] || 0)
        : Math.max(fileSize - suffixLength, 0);
      const requestedEnd = suffixLength === null
        ? Number(match?.[2] || fileSize - 1)
        : fileSize - 1;
      const end = Math.min(requestedEnd, fileSize - 1);

      if (
        !match ||
        !Number.isFinite(start) ||
        !Number.isFinite(end) ||
        suffixLength === 0 ||
        start < 0 ||
        start > end ||
        start >= fileSize
      ) {
        res.writeHead(416, { "Content-Range": `bytes */${fileSize}` });
        res.end();
        return;
      }

      res.writeHead(206, {
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Content-Length": end - start + 1,
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      "Accept-Ranges": streamableExtensions.has(extension) ? "bytes" : "none",
      "Content-Length": fileSize,
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`FastStationBox: http://127.0.0.1:${port}`);
  });
