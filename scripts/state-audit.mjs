import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("artifacts/screenshots/states", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const results = [];
for (const width of [375, 768, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  async function capture(id, name) {
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    const clip = await page.locator(id).boundingBox();
    await page.screenshot({
      path: `artifacts/screenshots/states/${name}-${width}.png`,
      fullPage: true,
      animations: "disabled",
      clip,
    });
  }
  await page.locator(".module-list button").last().click();
  await capture("#build-room", "founder-action");
  if (width < 640) await page.locator("#mobile-business").selectOption("9");
  else await page.locator(".business-buttons button").last().click();
  await page
    .locator(".media-options")
    .getByLabel("Videography", { exact: true })
    .check();
  await capture("#businesses", "creative-business");
  await page
    .locator(".business-operating")
    .getByRole("button", { name: "Build a creative business" })
    .click();
  await expect(page.locator("#category")).toHaveValue(
    "Photography & Videography",
  );
  await expect(page.locator("#media")).toHaveValue("Videography");
  await page.screenshot({
    path: `artifacts/screenshots/states/intake-form-${width}.png`,
  });
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Run it for me", exact: true })
    .click();
  await capture("#ownership", "managed-operations");
  await page.locator(".verification-states button").nth(1).click();
  await capture("#verification", "executed-not-verified");
  const statesAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  results.push({
    width,
    violations: statesAxe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
  if (width < 960) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `artifacts/screenshots/states/navigation-${width}.png`,
    });
    await page.getByRole("button", { name: "Close navigation" }).click();
  }
  await context.close();
}
const context = await browser.newContext({
  viewport: { width: 320, height: 900 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
const reflow = await page.evaluate(() => ({
  width: innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  overflow: [...document.querySelectorAll("body *")]
    .filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
    })
    .map((e) => e.className)
    .slice(0, 20),
}));
await page.screenshot({
  path: "artifacts/screenshots/states/reflow-320.png",
  fullPage: true,
});
await page.keyboard.press("Tab");
await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
await page.keyboard.press("Enter");
await expect(page).toHaveURL(/#main$/);
results.push({ reflow, skipLink: "passed" });
await browser.close();
await writeFile("artifacts/qa/states.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (
  results.some((r) => r.violations?.length) ||
  reflow.width !== reflow.scrollWidth
)
  process.exitCode = 1;
