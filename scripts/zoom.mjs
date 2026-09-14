/**
 * Element-level zoomed capture for close inspection.
 * Usage: node scripts/zoom.mjs <route|index> <css selector> <out.png> [width=1440] [waitMs=1500]
 */
import { chromium } from "playwright";

const [, , routeArg = "index", selector = "body", out = ".shots/zoom.png", widthArg = "1440", waitArg = "1500"] = process.argv;
const routePath = routeArg === "index" ? "/" : routeArg;
const width = Number(widthArg);
const base = process.env.SHOOT_BASE ?? "http://localhost:3100";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height: width < 768 ? 812 : 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});
const page = await context.newPage();
await page.goto(base + routePath, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const el = page.locator(selector).first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(Number(waitArg));
// Hide the sticky header so it does not overlay the target, unless the target is the header.
const isHeader = await el.evaluate((n) => n.tagName === "HEADER");
if (!isHeader) await page.addStyleTag({ content: "body > header { visibility: hidden !important; }" });
// animations: "disabled" finishes finite animations and pins them to their end
// state. Without it, Playwright's beyond-viewport capture restarts them and the
// screenshot catches a half-drawn frame.
await el.screenshot({ path: out, animations: "disabled" });
console.log(`saved ${out}`);
await browser.close();
