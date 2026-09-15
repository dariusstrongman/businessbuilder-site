// Real Cognito-backed pilot render/accessibility review at three viewports.

import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const companyId = process.env.UNIFIED_COMPANY_ID ?? "company_cleaning_f2b040b336361468f78b";
const identities = JSON.parse(execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1",
  "--secret-id", "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text"],
{ encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));
const output = mkdtempSync(join(tmpdir(), "bb-unified-render-"));
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

try {
  await page.goto(`${site}/api/auth/start?intent=login&next=${encodeURIComponent(`/build-room/${companyId}`)}`);
  await page.waitForURL(/\.auth\.us-east-1\.amazoncognito\.com\//);
  await page.locator('input[name="username"], input[type="email"]').first().fill(identities.founder.email);
  const password = page.locator('input[name="password"], input[type="password"]').first();
  if (!await password.count()) {
    await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
    await password.waitFor({ state: "visible" });
  }
  await password.fill(identities.founder.password);
  await page.getByRole("button", { name: /continue|sign in|submit/i }).first().click();
  await page.waitForURL((url) => url.origin === site && !url.pathname.startsWith("/api/auth/"));
  const results = [];
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
    for (const [name, path] of [["intake", "/start"], ["build-room", `/build-room/${companyId}`], ["pricing", "/pricing"]]) {
      await page.goto(`${site}${path}`, { waitUntil: "networkidle" });
      await page.getByRole("main").first().waitFor();
      await page.screenshot({ path: join(output, `${name}-${width}.png`), fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      const navGeometry = name === "build-room" ? await page.evaluate(() => {
        const nav = document.querySelector('nav[class*="sectionNav"]');
        return { document_scroll: document.documentElement.scrollWidth, body_scroll: document.body.scrollWidth,
          main_scroll: document.querySelector("main")?.scrollWidth ?? 0,
          document_client: document.documentElement.clientWidth,
          nav_right: Math.round(nav?.getBoundingClientRect().right ?? 0),
          nav_client: nav?.clientWidth ?? 0, nav_scroll: nav?.scrollWidth ?? 0 };
      }) : null;
      const overflowElements = overflow ? await page.evaluate(() => [...document.querySelectorAll("body *")]
        .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1
          || (element.scrollWidth > element.clientWidth + 2 && getComputedStyle(element).overflowX === "visible"))
        .slice(0, 15).map((element) => ({ tag: element.tagName.toLowerCase(), class_name: String(element.className).slice(0, 80),
          parent_class: String(element.parentElement?.className ?? "").slice(0, 80),
          right: Math.round(element.getBoundingClientRect().right), width: Math.round(element.getBoundingClientRect().width),
          scroll: element.scrollWidth, client: element.clientWidth }))) : [];
      const violations = (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze()).violations;
      results.push({ name, width, overflow, nav_geometry: navGeometry, overflow_elements: overflowElements, accessibility_violations: violations.map((item) => item.id) });
    }
  }
  console.log(JSON.stringify({ screenshots: output, results }, null, 2));
  if (results.some((item) => item.overflow || item.accessibility_violations.length)) throw new Error("pilot render overflow/accessibility failure");
} finally {
  await browser.close();
}
