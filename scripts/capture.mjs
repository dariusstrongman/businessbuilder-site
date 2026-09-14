import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const revision = process.argv[2] || "initial";
const dir = `artifacts/screenshots/${revision}`;
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const reports = [];
for (const width of [375, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width === 1440 ? 1000 : 900 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${dir}/home-${width}-full.png`,
    fullPage: true,
  });
  await page.screenshot({ path: `${dir}/home-${width}-hero.png` });
  for (const id of [
    "how-it-works",
    "build-room",
    "businesses",
    "verification",
    "ownership",
    "pricing",
    "trust",
  ]) {
    const clip = await page.locator(`#${id}`).boundingBox();
    await page.screenshot({
      path: `${dir}/${id}-${width}.png`,
      clip,
      fullPage: true,
    });
  }
  const overflow = await page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll("main *")]
      .filter(
        (e) =>
          e.getBoundingClientRect().right > innerWidth + 1 ||
          e.getBoundingClientRect().left < -1,
      )
      .map((e) => ({ tag: e.tagName, class: e.className }))
      .slice(0, 20),
  }));
  reports.push({ width, errors, overflow });
  await page.close();
}
await writeFile(`${dir}/render-report.json`, JSON.stringify(reports, null, 2));
console.log(JSON.stringify(reports, null, 2));
await browser.close();
