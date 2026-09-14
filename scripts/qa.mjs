import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
await mkdir("artifacts/qa", { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const report = { viewports: [], interactions: [], errors: [], requests: [] };
async function test(name, action) {
  try {
    await action();
    report.interactions.push({ name, passed: true });
  } catch (e) {
    report.interactions.push({ name, passed: false, error: e.message });
  }
}
for (const width of [375, 768, 1440]) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) =>
    report.errors.push({ width, message: e.message }),
  );
  page.on("request", (r) => {
    if (r.method() !== "GET")
      report.requests.push({ url: r.url(), method: r.method() });
  });
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const layout = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    font: getComputedStyle(document.body).fontFamily,
    fonts: document.fonts.status,
    motion: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  report.viewports.push({
    width,
    layout,
    violations: axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
  await test(`${width}: every journey stage changes the explanation`, async () => {
    const buttons = page.locator(".journey-stage");
    for (let i = 0; i < 12; i++) {
      await buttons.nth(i).click();
      await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".journey-big-number")).toHaveText(
        String(i + 1).padStart(2, "0"),
      );
    }
  });
  await test(`${width}: all build modules, payment dependency visible`, async () => {
    for (let i = 0; i < 6; i++) {
      await page.locator(".module-list button").nth(i).click();
      await expect(page.locator(".module-list button").nth(i)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    }
    await expect(page.locator(".room-evidence")).toContainText("blocked");
    await expect(page.locator(".founder-action")).toContainText(
      "identity verification",
    );
  });
  await test(`${width}: all ten business categories`, async () => {
    for (let i = 0; i < 10; i++) {
      if (width < 640)
        await page.locator("#mobile-business").selectOption(String(i));
      else await page.locator(".business-buttons button").nth(i).click();
      await expect(page.locator(".specimen-top")).toContainText(
        `BB / ${String(i + 1).padStart(2, "0")}`,
      );
    }
    await page
      .locator(".media-options")
      .getByLabel("Videography", { exact: true })
      .check();
    await expect(page.locator(".business-operating dd").first()).toContainText(
      "Videography brief",
    );
  });
  await test(`${width}: verification states and bounded operations`, async () => {
    for (let i = 0; i < 4; i++) {
      await page.locator(".verification-states button").nth(i).click();
      await expect(
        page.locator(".verification-states button").nth(i),
      ).toHaveAttribute("aria-pressed", "true");
    }
    await page
      .getByRole("button", { name: "Run it for me", exact: true })
      .click();
    await expect(page.locator(".operations-list li")).toHaveCount(4);
    await expect(page.locator(".handoff-boundary")).toContainText("approval");
    await page
      .getByRole("button", { name: "Take the keys", exact: true })
      .click();
    await expect(page.locator(".asset-list li")).toHaveCount(5);
  });
  if (width < 960)
    await test(`${width}: mobile menu opens, follows anchor, closes`, async () => {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.locator("#mobile-nav")).toBeVisible();
      await page
        .locator("#mobile-nav")
        .getByRole("link", { name: "Pricing" })
        .click();
      await expect(page.locator("#mobile-nav")).toBeHidden();
      await expect(page).toHaveURL(/#pricing$/);
    });
  await test(`${width}: keyboard and brief preview`, async () => {
    await page.locator(".package-row").first().getByRole("button").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("#scope")).toHaveValue("website");
    await page.locator("#category").selectOption("Photography & Videography");
    await page.locator("#media").selectOption("Photography");
    await page
      .locator("#description")
      .fill(
        "A portrait photography studio for local families, with a beautiful portfolio and clear project enquiries.",
      );
    const modalAxe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    await writeFile(
      `artifacts/qa/dialog-axe-${width}.json`,
      JSON.stringify(modalAxe.violations, null, 2),
    );
    await expect(modalAxe.violations).toHaveLength(0);
    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
      await expect
        .poll(() =>
          page.evaluate(() => !!document.activeElement?.closest("dialog")),
        )
        .toBe(true);
    }
    await page.getByRole("button", { name: "Review my brief" }).click();
    await expect(page.locator(".review-summary")).toContainText("Photography");
    await expect(page.locator("#intake-title")).toBeFocused();
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download my brief" }).click();
    const download = await downloadPromise;
    await download.saveAs(`artifacts/qa/brief-${width}.txt`);
    expect(await readFile(`artifacts/qa/brief-${width}.txt`, "utf8")).toContain(
      "This brief has not been submitted",
    );
    await page.screenshot({ path: `artifacts/qa/brief-${width}.png` });
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(
      page.locator(".package-row").first().getByRole("button"),
    ).toBeFocused();
  });
  if (await page.getByRole("dialog").isVisible())
    await page.keyboard.press("Escape");
  await test(`${width}: FAQ disclosure and all anchor targets`, async () => {
    for (const summary of await page.locator(".faq-list summary").all()) {
      await summary.click();
      await expect(summary.locator("..")).toHaveAttribute("open", "");
      await summary.click();
    }
    const missing = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href").slice(1))
        .filter((id) => !document.getElementById(id)),
    );
    expect(missing).toEqual([]);
  });
  await page.close();
}
await browser.close();
await writeFile("artifacts/qa/report.json", JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      viewports: report.viewports,
      interactions: report.interactions,
      errors: report.errors,
      externalWrites: report.requests,
    },
    null,
    2,
  ),
);
if (
  report.errors.length ||
  report.viewports.some(
    (v) => v.violations.length || v.layout.width !== v.layout.scrollWidth,
  ) ||
  report.interactions.some((t) => !t.passed)
)
  process.exitCode = 1;
