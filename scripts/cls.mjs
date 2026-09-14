/** Reports which elements cause layout shift on a route. */
import { chromium } from "playwright";

const [, , routeArg = "index", widthArg = "390"] = process.argv;
const routePath = routeArg === "index" ? "/" : routeArg;
const base = process.env.SHOOT_BASE ?? "http://localhost:3200";

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: Number(widthArg), height: 844 }, isMobile: Number(widthArg) < 768 });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});

await page.addInitScript(() => {
  window.__shifts = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__shifts.push({
        value: Number(e.value.toFixed(5)),
        at: Math.round(e.startTime),
        sources: (e.sources || []).map((s) => {
          const el = s.node;
          if (!el || !el.tagName) return "(detached)";
          return `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]}`;
        }),
      });
    }
  }).observe({ type: "layout-shift", buffered: true });
});

await page.goto(base + routePath, { waitUntil: "load" });
await page.waitForTimeout(4000);
const shifts = await page.evaluate(() => window.__shifts);
console.log(JSON.stringify(shifts, null, 1));
await browser.close();
