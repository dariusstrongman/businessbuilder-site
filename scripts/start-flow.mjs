/** Exercises the intake submission path end to end and captures both states. */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.SHOOT_BASE ?? "http://localhost:3100";
await mkdir(".shots/_start-flow", { recursive: true });

const browser = await chromium.launch();
for (const width of [375, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 812 : 900 } });
  await page.goto(`${base}/start?idea=${encodeURIComponent("A pressure washing company in Charlotte")}&package=business`);
  await page.evaluate(() => document.fonts.ready);

  // Validation path first.
  await page.locator('textarea[name="idea"]').fill("too short");
  await page.locator('input[name="email"]').fill("someone@example.com");
  await page.getByRole("button", { name: /open my build/i }).click();
  await page.waitForSelector('p[role="alert"]');
  console.log(`[${width}] validation: ${(await page.locator('p[role="alert"]').textContent())?.trim()}`);
  console.log(`[${width}] email kept: "${await page.locator('input[name="email"]').inputValue()}"`);
  await page.screenshot({ path: `.shots/_start-flow/${width}-error.png`, fullPage: true });

  // Success path.
  await page.locator('textarea[name="idea"]').fill("A pressure washing company in Charlotte for driveways and decks");
  await page.getByRole("button", { name: /open my build/i }).click();
  await page.waitForSelector("#received-title");
  console.log(`[${width}] received: ${(await page.locator("#received-title").textContent())?.trim()}`);
  await page.screenshot({ path: `.shots/_start-flow/${width}-received.png`, fullPage: true });
  await page.close();
}
await browser.close();
