import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = Number(process.env.PORT || 4173);
const base = "/anas-protfolio";
const url = process.env.QA_URL || `http://127.0.0.1:${port}${base}/`;
const widths = [320, 360, 393, 414, 768, 1024, 1366, 1440, 1920];
const screenshotDir = path.resolve(".tmp/qa");
const root = path.resolve("dist");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

function resolveRequest(requestUrl) {
  const parsed = new URL(requestUrl, `http://127.0.0.1:${port}`);
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

const server = createServer(async (request, response) => {
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
});

await mkdir(screenshotDir, { recursive: true });
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--disable-gpu", "--no-sandbox"],
});

const failures = [];

try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width < 700 ? 900 : 1000 } });
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.evaluate(async () => {
      const visibleOrEagerImages = [...document.images].filter((image) => {
        const rect = image.getBoundingClientRect();
        return image.loading !== "lazy" || rect.top < window.innerHeight * 1.4;
      });
      await Promise.race([
        Promise.all(
          visibleOrEagerImages.map((image) => {
          if (image.complete && image.naturalWidth > 0) return Promise.resolve();
          if (typeof image.decode === "function") return image.decode().catch(() => undefined);
          return new Promise((resolve) => image.addEventListener("load", resolve, { once: true }));
          })
        ),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(screenshotDir, `${width}.png`), fullPage: false });

    const result = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const brokenImages = [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src || image.alt);
      const wideElements = [...document.body.querySelectorAll("*")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > window.innerWidth + 1 || rect.right > window.innerWidth + 1;
        })
        .slice(0, 8)
        .map((element) => `${element.tagName.toLowerCase()}.${[...element.classList].join(".")}`);

      return {
        scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
        clientWidth: doc.clientWidth,
        brokenImages,
        wideElements,
      };
    });

    if (result.scrollWidth > result.clientWidth + 1) {
      failures.push(`${width}px horizontal overflow: ${result.scrollWidth} > ${result.clientWidth}; ${result.wideElements.join(", ")}`);
    }
    if (result.brokenImages.length) {
      failures.push(`${width}px broken images: ${result.brokenImages.join(", ")}`);
    }
    if (consoleErrors.length) failures.push(`${width}px console errors: ${consoleErrors.join(" | ")}`);
    if (pageErrors.length) failures.push(`${width}px page errors: ${pageErrors.join(" | ")}`);

    await page.close();
    console.log(`${width}px checked`);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("QA passed");
