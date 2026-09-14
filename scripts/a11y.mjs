/**
 * Accessibility pass with axe-core across every route, at mobile and desktop.
 * Also checks heading order, tap-target size and horizontal overflow.
 * Usage: node scripts/a11y.mjs
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/how-it-works",
  "/product",
  "/website",
  "/build-my-business",
  "/build-and-run",
  "/work",
  "/businesses",
  "/businesses/photography-videography",
  "/pricing",
  "/trust",
  "/about",
  "/start",
  "/login",
];

const base = process.env.SHOOT_BASE ?? "http://localhost:3100";
const viewports = [
  { width: 375, height: 812, name: "mobile" },
  { width: 1440, height: 900, name: "desktop" },
];

let problems = 0;
const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();

    const violations = results.violations.filter((v) => v.impact !== "minor" || v.id === "heading-order");

    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      const inScroller = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const o = getComputedStyle(p).overflowX;
          if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") return true;
        }
        return false;
      };
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if ((r.right > de.clientWidth + 1 || r.left < -1) && !inScroller(el)) {
          offenders.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} ${Math.round(r.left)}→${Math.round(r.right)}`);
          if (offenders.length > 4) break;
        }
      }
      return { over: offenders.length > 0, offenders };
    });

    const small = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll("a[href], button:not([disabled]), input, select, textarea")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.height < 24 || r.width < 24) {
          out.push(`${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 24)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      }
      return out.slice(0, 6);
    });

    const headings = await page.evaluate(() => {
      const list = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
      const h1 = list.filter((l) => l === 1).length;
      let jump = null;
      for (let i = 1; i < list.length; i++) if (list[i] - list[i - 1] > 1) jump = `${list[i - 1]}→${list[i]}`;
      return { h1, jump };
    });

    const issues = [];
    for (const v of violations) {
      // For contrast, list the distinct failing colour pairs rather than every node.
      if (v.id === "color-contrast") {
        const pairs = new Set(
          v.nodes.map((n) => (n.any?.[0]?.message ?? "").replace(/^Element has insufficient color contrast of /, "").slice(0, 96)),
        );
        for (const p of pairs) issues.push(`axe color-contrast: ${p}`);
        continue;
      }
      issues.push(`axe ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0].target.join(" ")}`);
    }
    if (overflow.over) issues.push(`overflow-x: ${overflow.offenders.join(" | ")}`);
    if (small.length) issues.push(`small targets: ${small.join(" | ")}`);
    if (headings.h1 !== 1) issues.push(`h1 count = ${headings.h1}`);
    if (headings.jump) issues.push(`heading jump ${headings.jump}`);

    if (issues.length) {
      problems += issues.length;
      console.log(`\n[${vp.name}] ${route}`);
      for (const i of issues) console.log(`  - ${i}`);
    }
  }
  await context.close();
}

await browser.close();
console.log(problems === 0 ? "\nNo issues found." : `\n${problems} issue(s).`);
