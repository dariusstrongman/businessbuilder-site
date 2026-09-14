/** Exercises the interactive components with the keyboard only. */
import { chromium } from "playwright";

const base = process.env.SHOOT_BASE ?? "http://localhost:3100";
const browser = await chromium.launch();
const fails = [];
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "pass" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fails.push(name);
};

// 1. Skip link is the first stop and moves focus to main.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/");
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => document.activeElement?.className ?? "");
  check("skip link is first tab stop", first.includes("skip-link"), first);
  await page.close();
}

// 2. Desktop dropdown opens with Enter and closes with Escape.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/");
  const trigger = page.getByRole("button", { name: /what we build/i });
  await trigger.focus();
  await page.keyboard.press("Enter");
  check("dropdown opens on Enter", (await trigger.getAttribute("aria-expanded")) === "true");
  await page.keyboard.press("Escape");
  check("dropdown closes on Escape", (await trigger.getAttribute("aria-expanded")) === "false");
  await page.close();
}

// 3. Mobile sheet traps focus, closes on Escape, and returns focus to the toggle.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  await page.goto(base + "/");
  const toggle = page.getByRole("button", { name: /open menu/i });
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  check("sheet opens as a dialog", await dialog.isVisible());
  const scrollLocked = await page.evaluate(() => getComputedStyle(document.body).overflow === "hidden");
  check("body scroll is locked", scrollLocked);
  for (let i = 0; i < 30; i++) await page.keyboard.press("Tab");
  const stillInside = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"]');
    return !!d && d.contains(document.activeElement);
  });
  check("focus stays inside the sheet after 30 tabs", stillInside);
  await page.keyboard.press("Escape");
  check("sheet closes on Escape", !(await dialog.isVisible()));
  const returned = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? "");
  check("focus returns to the menu button", /menu/i.test(returned), returned);
  await page.close();
}

// 4. Handoff fork is a tablist driven by arrow keys.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/");
  const keys = page.getByRole("tab", { name: /take the keys/i });
  await keys.focus();
  await page.keyboard.press("ArrowRight");
  const run = page.getByRole("tab", { name: /run it for me/i });
  check("fork switches with ArrowRight", (await run.getAttribute("aria-selected")) === "true");
  await page.close();
}

// 5. Archetype explorer is a tablist with a roving tabindex.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/businesses");
  const first = page.getByRole("tab", { name: /residential cleaning/i });
  await first.focus();
  await page.keyboard.press("ArrowDown");
  const second = page.getByRole("tab", { name: /mobile detailing/i });
  check("explorer moves with ArrowDown", (await second.getAttribute("aria-selected")) === "true");
  await page.keyboard.press("End");
  const last = page.getByRole("tab", { name: /photography/i });
  check("explorer jumps to the end with End", (await last.getAttribute("aria-selected")) === "true");
  await page.close();
}

// 6. Journey rail nodes are reachable and selectable.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/how-it-works");
  const node = page.getByRole("button", { name: /05 Approve/i });
  await node.focus();
  check("rail node takes focus", (await node.getAttribute("aria-pressed")) === "true");
  await page.close();
}

// 7. Intake submits to /start carrying the description.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/");
  await page.locator('input[name="idea"]').first().fill("A lawn care company in Raleigh");
  await page.keyboard.press("Enter");
  await page.waitForURL(/\/start\?/);
  check("intake carries the idea to /start", page.url().includes("idea=A+lawn+care"), page.url());
  const value = await page.locator('textarea[name="idea"]').inputValue();
  check("start form is pre-filled", value === "A lawn care company in Raleigh", value);
  await page.close();
}

await browser.close();
console.log(fails.length === 0 ? "\nAll keyboard checks passed." : `\n${fails.length} failed: ${fails.join(", ")}`);
process.exit(fails.length === 0 ? 0 : 1);
