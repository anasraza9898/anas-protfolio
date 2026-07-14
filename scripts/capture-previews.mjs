import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outputDir = path.resolve("assets/images/previews");

const projects = [
  ["summit-house-academy", "https://anasraza9898.github.io/summit-house-academy/"],
  ["velora-grand", "https://anasraza9898.github.io/velora-grand/"],
  ["mehrab-co-voyages", "https://anasraza9898.github.io/mehrab-co-voyages/"],
  ["al-makkah-catering", "https://anasraza9898.github.io/demo-catering/"],
  ["prime-nest-realty", "https://anasraza9898.github.io/prime-nest-reality-website/"],
];

async function optimizeScreenshot(buffer) {
  for (const quality of [76, 68, 60, 52]) {
    const output = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toBuffer();

    if (output.length <= 180 * 1024 || quality === 52) return output;
  }

  return buffer;
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: chromePath,
    headless: true,
    args: ["--disable-gpu", "--hide-scrollbars", "--no-sandbox"],
  });

  try {
    const page = await browser.newPage({
      viewport: { width: 1366, height: 860 },
      deviceScaleFactor: 1,
    });

    for (const [slug, url] of projects) {
      console.log(`Capturing ${slug}...`);
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(900);
      const png = await page.screenshot({ fullPage: false, type: "png" });
      const webp = await optimizeScreenshot(png);
      await writeFile(path.join(outputDir, `${slug}.webp`), webp);
      console.log(`${slug}.webp ${(webp.length / 1024).toFixed(1)} KB`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
