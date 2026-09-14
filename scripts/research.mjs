import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const dir = "artifacts/research";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const references = [
  ["linear", "https://linear.app/"],
  ["stripe", "https://stripe.com/payments"],
  ["ramp", "https://ramp.com/"],
  ["audos", "https://audos.com/"],
  ["pulsia", "https://pulsia.ai/"],
];
const results = await Promise.allSettled(
  references.map(async ([name, url]) => {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 40000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${dir}/${name}-desktop.png` });
    const content = await page.locator("body").innerText();
    await writeFile(`${dir}/${name}.txt`, content);
    if (name === "linear" || name === "stripe") {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.screenshot({ path: `${dir}/${name}-mobile.png` });
    }
    await page.close();
    return { name, url, text: content.slice(0, 2400) };
  }),
);
console.log(JSON.stringify(results, null, 2));
await browser.close();
