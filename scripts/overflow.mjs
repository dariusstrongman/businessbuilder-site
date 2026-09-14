/** Finds elements whose right edge exceeds the viewport, ignoring those inside a scroll container. */
import { chromium } from "playwright";

const [, , routeArg = "index", widthArg = "375"] = process.argv;
const routePath = routeArg === "index" ? "/" : routeArg;
const base = process.env.SHOOT_BASE ?? "http://localhost:3100";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(widthArg), height: 812 } });
await page.goto(base + routePath, { waitUntil: "networkidle" });
const out = await page.evaluate(() => {
  const de = document.documentElement;
  const rows = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.right > de.clientWidth + 1) {
      let scrolls = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const o = getComputedStyle(p).overflowX;
        if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") scrolls = true;
      }
      rows.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || "").toString().slice(0, 60),
        right: Math.round(r.right),
        width: Math.round(r.width),
        scrolls,
      });
    }
  }
  return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, rows: rows.slice(0, 25) };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
