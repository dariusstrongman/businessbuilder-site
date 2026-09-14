/**
 * Visual inspection helper. Renders a route at 375 / 768 / 1440 and writes:
 *  - a full-page screenshot per viewport
 *  - one screenshot per top-level <section> (so each composition can be inspected at real size)
 *  - console errors and layout overflow warnings
 *
 * Usage: node scripts/shots.mjs [path=/] [outDir=./.shots] [widths=375,768,1440] [--menu]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [, , routeArg = "index", outDir = ".shots", widthsArg = "375,768,1440", ...flags] = process.argv;
// "index" stands for the home route so shells do not rewrite a bare "/".
const routePath = routeArg === "index" ? "/" : routeArg;
const widths = widthsArg.split(",").map(Number);
const base = process.env.SHOOT_BASE ?? "http://localhost:3100";
const heights = { 375: 812, 768: 1024, 1440: 900 };
const withMenu = flags.includes("--menu");

const browser = await chromium.launch();
try {
  for (const width of widths) {
    const dir = path.join(outDir, routePath.replace(/\//g, "_") || "_", String(width));
    await mkdir(dir, { recursive: true });
    const context = await browser.newContext({
      viewport: { width, height: heights[width] ?? 900 },
      deviceScaleFactor: 1,
      reducedMotion: "no-preference",
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`);
    });
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

    await page.goto(base + routePath, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Scroll through the page so in-view sequences fire, then return to top.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);

    const metrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    await page.screenshot({ path: path.join(dir, "full.png"), fullPage: true });

    const sections = await page.$$("body > header, main > section, main section[aria-labelledby], body > footer");
    let i = 0;
    for (const s of sections) {
      // Hide the sticky header while capturing sections so it does not overlay them.
      if (i === 1) await page.addStyleTag({ content: "body > header { visibility: hidden !important; }" });
      const id = (await s.getAttribute("aria-labelledby")) || (await s.evaluate((el) => el.tagName.toLowerCase()));
      const box = await s.boundingBox();
      if (!box || box.height < 4) continue;
      const name = `${String(i).padStart(2, "0")}-${id}.png`;
      await s.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await s.screenshot({ path: path.join(dir, name) });
      i += 1;
    }

    if (withMenu && width < 1024) {
      await page.evaluate(() => window.scrollTo(0, 0));
      const toggle = page.getByRole("button", { name: /open menu/i });
      if (await toggle.count()) {
        await toggle.click();
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(dir, "menu.png") });
      }
    }

    console.log(`[${width}] ${routePath} height=${metrics.scrollHeight} overflowX=${metrics.overflowX} (${metrics.scrollWidth}/${metrics.clientWidth}) sections=${i}`);
    for (const e of errors) console.log(`  ${e}`);
    await context.close();
  }
} finally {
  await browser.close();
}
