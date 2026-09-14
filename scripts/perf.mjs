/**
 * Field-proxy performance check against a production build.
 * Reports LCP, CLS, transferred bytes by type, and long tasks, on a throttled mobile profile.
 * Usage: SHOOT_BASE=http://localhost:3200 node scripts/perf.mjs
 */
import { chromium } from "playwright";

const routes = ["/", "/work", "/how-it-works", "/product", "/businesses", "/pricing", "/website"];
const base = process.env.SHOOT_BASE ?? "http://localhost:3200";

const browser = await chromium.launch();
const rows = [];

for (const route of routes) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();

  const bytes = { document: 0, script: 0, stylesheet: 0, font: 0, image: 0, other: 0 };
  page.on("response", async (res) => {
    try {
      const type = res.request().resourceType();
      const len = Number(res.headers()["content-length"] ?? 0) || (await res.body().then((b) => b.length).catch(() => 0));
      const key = type in bytes ? type : "other";
      bytes[key] += len;
    } catch {
      /* response body unavailable */
    }
  });

  // Throttle to a slow 4G / 4x CPU profile.
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await page.goto(base + route, { waitUntil: "load" });
  await page.waitForTimeout(3500);

  const metrics = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const out = { lcp: 0, cls: 0, longTasks: 0, longTaskMs: 0, fcp: 0, ttfb: 0 };
        const nav = performance.getEntriesByType("navigation")[0];
        if (nav) out.ttfb = Math.round(nav.responseStart);
        for (const e of performance.getEntriesByType("paint")) {
          if (e.name === "first-contentful-paint") out.fcp = Math.round(e.startTime);
        }
        try {
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) out.lcp = Math.round(e.startTime);
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) if (!e.hadRecentInput) out.cls += e.value;
          }).observe({ type: "layout-shift", buffered: true });
          new PerformanceObserver((l) => {
            for (const e of l.getEntries()) {
              out.longTasks += 1;
              out.longTaskMs += Math.round(e.duration);
            }
          }).observe({ type: "longtask", buffered: true });
        } catch {
          /* observer type unsupported */
        }
        setTimeout(() => resolve({ ...out, cls: Number(out.cls.toFixed(4)) }), 600);
      }),
  );

  const kb = (n) => Math.round(n / 1024);
  rows.push({
    route,
    ttfb: metrics.ttfb,
    fcp: metrics.fcp,
    lcp: metrics.lcp,
    cls: metrics.cls,
    longTasks: metrics.longTasks,
    blockingMs: metrics.longTaskMs,
    jsKB: kb(bytes.script),
    cssKB: kb(bytes.stylesheet),
    fontKB: kb(bytes.font),
    totalKB: kb(Object.values(bytes).reduce((a, b) => a + b, 0)),
  });

  await context.close();
}

await browser.close();
console.table(rows);
