import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
await mkdir("artifacts/performance", { recursive: true });
await mkdir("artifacts/browser/lighthouse", { recursive: true });
const chrome = await launch({
  chromePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  chromeFlags: ["--headless=new", "--no-first-run"],
  userDataDir: path.resolve("artifacts/browser/lighthouse"),
});
const summaries = [];
try {
  for (const formFactor of ["mobile", "desktop"]) {
    const result = await lighthouse(
      "http://127.0.0.1:3100",
      {
        port: chrome.port,
        output: ["html", "json"],
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
        formFactor,
        screenEmulation:
          formFactor === "desktop"
            ? {
                mobile: false,
                width: 1440,
                height: 1000,
                deviceScaleFactor: 1,
                disabled: false,
              }
            : {
                mobile: true,
                width: 375,
                height: 812,
                deviceScaleFactor: 1,
                disabled: false,
              },
        throttlingMethod: "simulate",
      },
      formFactor === "desktop" ? desktopConfig : undefined,
    );
    await writeFile(
      `artifacts/performance/${formFactor}.html`,
      result.report[0],
    );
    await writeFile(
      `artifacts/performance/${formFactor}.json`,
      result.report[1],
    );
    const lhr = result.lhr;
    summaries.push({
      formFactor,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([k, v]) => [k, v.score * 100]),
      ),
      metrics: Object.fromEntries(
        [
          "first-contentful-paint",
          "largest-contentful-paint",
          "total-blocking-time",
          "cumulative-layout-shift",
          "speed-index",
          "total-byte-weight",
        ].map((k) => [
          k,
          {
            value: lhr.audits[k].numericValue,
            display: lhr.audits[k].displayValue,
          },
        ]),
      ),
      issues: Object.values(lhr.audits)
        .filter(
          (a) =>
            a.score !== null &&
            a.score < 1 &&
            a.details?.type !== "opportunity",
        )
        .map((a) => ({ id: a.id, title: a.title, display: a.displayValue })),
    });
  }
} finally {
  await chrome.kill();
}
await writeFile(
  "artifacts/performance/summary.json",
  JSON.stringify(summaries, null, 2),
);
console.log(JSON.stringify(summaries, null, 2));
