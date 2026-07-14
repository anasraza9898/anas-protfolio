import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const port = Number(process.env.PORT || 4173);
const root = path.resolve("dist");
const base = "/anas-protfolio";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

function resolveRequest(url) {
  const parsed = new URL(url, `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(parsed.pathname);

  if (pathname === "/") pathname = `${base}/`;
  if (!pathname.startsWith(base)) return null;

  pathname = pathname.slice(base.length) || "/";
  const requested = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  const filePath = path.resolve(root, `.${requested}`);

  if (!filePath.startsWith(root)) return null;
  if (existsSync(filePath)) return filePath;
  return path.join(root, "index.html");
}

createServer(async (request, response) => {
  const filePath = resolveRequest(request.url || "/");
  if (!filePath) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  try {
    const fileStat = await stat(filePath);
    response.writeHead(200, {
      "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "content-length": fileStat.size,
      "cache-control": "no-store",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving production build at http://127.0.0.1:${port}${base}/`);
});
