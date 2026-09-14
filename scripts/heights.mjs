/** Lists the tallest sections on a route so long pages can be trimmed where it matters. */
import { chromium } from "playwright";
const [, , routeArg = "index", widthArg = "375"] = process.argv;
const routePath = routeArg === "index" ? "/" : routeArg;
const base = process.env.SHOOT_BASE ?? "http://localhost:3100";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(widthArg), height: 812 } });
await page.goto(base + routePath, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const rows = await page.evaluate(() =>
  [...document.querySelectorAll("main > section")].map((s) => ({
    id: s.getAttribute("aria-labelledby") || s.tagName.toLowerCase(),
    px: Math.round(s.getBoundingClientRect().height),
    screens: +(s.getBoundingClientRect().height / window.innerHeight).toFixed(1),
  })),
);
console.table(rows.sort((a, b) => b.px - a.px));
console.log("total", rows.reduce((n, r) => n + r.px, 0));
await browser.close();
