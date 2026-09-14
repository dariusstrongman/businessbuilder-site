/**
 * Renders the review gallery committed to docs/screens.
 *
 * Reduced motion is forced on so every animated component settles into a
 * deterministic final state. Two reviewers running this get identical images.
 *
 * Usage: node scripts/gallery.mjs   (expects a server on SHOOT_BASE, default :3100)
 */
import { chromium } from "playwright";
import { mkdir, writeFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const base = process.env.SHOOT_BASE ?? "http://localhost:3100";
const OUT = "docs/screens";

const routes = [
  { path: "/", slug: "01-home", name: "Home" },
  { path: "/how-it-works", slug: "02-how-it-works", name: "How it works" },
  { path: "/product", slug: "03-build-room", name: "The Build Room" },
  { path: "/website", slug: "04-website", name: "Build my website" },
  { path: "/build-my-business", slug: "05-build-my-business", name: "Build my business" },
  { path: "/build-and-run", slug: "06-build-and-run", name: "Build & run" },
  { path: "/businesses", slug: "07-businesses", name: "Supported businesses" },
  { path: "/businesses/photography-videography", slug: "08-archetype", name: "One archetype" },
  { path: "/pricing", slug: "09-pricing", name: "Pricing" },
  { path: "/trust", slug: "10-trust", name: "Trust and verification" },
  { path: "/about", slug: "11-about", name: "About" },
  { path: "/start", slug: "12-start", name: "Start a build" },
  { path: "/login", slug: "13-login", name: "Log in" },
];

/** The signature surfaces, captured at 2x for close inspection. */
const details = [
  { route: "/", sel: "[aria-labelledby='hero-title']", slug: "hero", name: "Hero with the live Build Room", w: 1440 },
  { route: "/", sel: "[aria-labelledby='hero-title'] [role='img']", slug: "build-room-compact", name: "Build Room, compact", w: 1440 },
  { route: "/", sel: "[aria-labelledby='fragmentation-title']", slug: "fragmentation", name: "The ten jobs ledger", w: 1440 },
  { route: "/", sel: "[aria-labelledby='assembly-title']", slug: "company-assembly", name: "The Company, Assembled: the signature view", w: 1440 },
  { route: "/", sel: "[aria-labelledby='journey-title']", slug: "journey-rail", name: "The journey rail", w: 1440 },
  { route: "/", sel: "[aria-labelledby='buildroom-title'] [role='img']", slug: "build-room-full", name: "Build Room, full", w: 1440 },
  { route: "/", sel: "[aria-labelledby='built-title']", slug: "built-not-generated", name: "Generated versus built", w: 1440 },
  { route: "/", sel: "[aria-labelledby='founder-title']", slug: "founder-action", name: "A Founder Action at real size", w: 1440 },
  { route: "/", sel: "[aria-labelledby='verification-title']", slug: "verification", name: "The verification ladder, settled", w: 1440 },
  { route: "/", sel: "[aria-labelledby='receipt-title']", slug: "evidence-receipt", name: "An evidence receipt, including what is still unresolved", w: 1440 },
  { route: "/", sel: "[aria-labelledby='handoff-title']", slug: "handoff-fork", name: "The handoff fork: take the keys, or run it for me", w: 1440 },
  { route: "/", sel: "[aria-labelledby='run-title']", slug: "permissions-card", name: "An AI worker permissions card", w: 1440 },
  { route: "/", sel: "[aria-labelledby='businesses-title']", slug: "archetype-strip", name: "The ten business types", w: 1440 },
  { route: "/", sel: "[aria-labelledby='packages-title']", slug: "packages", name: "The three packages", w: 1440 },
  { route: "/", sel: "[aria-labelledby='trust-title']", slug: "trust-band", name: "Trust, no borrowed proof", w: 1440 },
  { route: "/product", sel: "[aria-labelledby='evidence-title']", slug: "evidence-log", name: "The evidence log", w: 1440 },
  { route: "/build-and-run", sel: "[aria-labelledby='day-title']", slug: "working-day", name: "A working day with AI workers", w: 1440 },
  { route: "/businesses", sel: "[aria-labelledby='explorer-title']", slug: "archetype-explorer", name: "The archetype explorer", w: 1440 },
  { route: "/website", sel: "[aria-labelledby='page-title']", slug: "site-frame", name: "What a built website looks like", w: 1440 },
  { route: "/how-it-works", sel: "[aria-labelledby='stages-title']", slug: "stage-ledger", name: "Every stage, what you do, what you get", w: 1440 },
  { route: "/pricing", sel: "[aria-labelledby='compare-title']", slug: "package-comparison", name: "What changes between packages", w: 1440 },
  { route: "/build-my-business", sel: "[aria-labelledby='bom-title']", slug: "bill-of-materials", name: "The bill of materials", w: 1440 },
];

// Full pages at 1x: some are tens of thousands of pixels tall, and 2x makes them
// unviewable on GitHub as well as enormous. The detail captures below are the 2x ones.
const sizes = [
  { label: "desktop", width: 1440, height: 900, scale: 1 },
  { label: "mobile", width: 390, height: 844, scale: 1 },
];

const settle = async (page) => {
  await page.evaluate(() => document.fonts.ready);
  // Walk the page so every in-view sequence has fired, then return to the top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
};

const browser = await chromium.launch();

for (const size of sizes) {
  await mkdir(path.join(OUT, size.label), { recursive: true });
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: size.scale,
    isMobile: size.width < 768,
    hasTouch: size.width < 768,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const r of routes) {
    await page.goto(base + r.path, { waitUntil: "networkidle" });
    await settle(page);
    const file = path.join(OUT, size.label, `${r.slug}.png`);
    await page.screenshot({ path: file, fullPage: true, animations: "disabled" });
    console.log(`${size.label.padEnd(7)} ${r.slug}`);
  }
  await context.close();
}

await mkdir(path.join(OUT, "details"), { recursive: true });
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  let current = "";
  for (const d of details) {
    if (current !== d.route) {
      await page.goto(base + d.route, { waitUntil: "networkidle" });
      await settle(page);
      await page.addStyleTag({ content: "body > header { visibility: hidden !important; }" });
      current = d.route;
    }
    const el = page.locator(d.sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await el.screenshot({ path: path.join(OUT, "details", `${d.slug}.png`), animations: "disabled" });
    console.log(`detail  ${d.slug}`);
  }
  await context.close();
}

await browser.close();

// Index, so the gallery can be read in order on GitHub.
const sizeOf = async (p) => {
  try {
    return Math.round((await stat(p)).size / 1024);
  } catch {
    return 0;
  }
};

const lines = [
  "# Rendered review gallery",
  "",
  "Every page and every signature surface, rendered from the built site.",
  "Regenerate with `node scripts/gallery.mjs` while a server is running.",
  "",
  "Reduced motion is forced on during capture, so animated components settle into",
  "their final states and two people running this get identical images.",
  "",
  "## Pages",
  "",
  "| Page | Desktop, 1440 | Mobile, 390 |",
  "| --- | --- | --- |",
];
for (const r of routes) {
  lines.push(`| ${r.name} | [view](desktop/${r.slug}.png) | [view](mobile/${r.slug}.png) |`);
}
lines.push("", "## Signature surfaces", "", "Captured at 2x.", "");
for (const d of details) {
  lines.push(`### ${d.name}`, "", `![${d.name}](details/${d.slug}.png)`, "");
}
await writeFile(path.join(OUT, "README.md"), lines.join("\n"));

const totals = [];
for (const dir of ["desktop", "mobile", "details"]) {
  const files = await readdir(path.join(OUT, dir));
  let kb = 0;
  for (const f of files) kb += await sizeOf(path.join(OUT, dir, f));
  totals.push(`${dir}: ${files.length} files, ${(kb / 1024).toFixed(1)} MB`);
}
console.log("\n" + totals.join("\n"));
