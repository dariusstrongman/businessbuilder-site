import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const identities = JSON.parse(execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id", "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text"], { encoding: "utf8" }));

async function login(context) {
  const page = await context.newPage();
  await page.goto(`${site}/api/auth/start?intent=login&next=%2Fbuild-room`);
  await page.locator('input[name="username"], input[type="email"]').first().fill(identities.founder.email);
  await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
  const password = page.locator('input[name="password"], input[type="password"]').first();
  await password.waitFor({ state: "visible" });
  await password.fill(identities.founder.password);
  await page.getByRole("button", { name: /continue|sign in/i }).first().click();
  await page.waitForURL((url) => url.origin === site && url.pathname.startsWith("/build-room"), { timeout: 45_000 });
  return page;
}

const browser = await chromium.launch({ headless: true });
try {
  const first = await browser.newContext();
  const second = await browser.newContext();
  const [firstPage, secondPage] = await Promise.all([login(first), login(second)]);
  const active = await Promise.all([firstPage, secondPage].map(page => page.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(response => response.status))));
  if (active.some(status => status !== 200)) throw new Error("independent concurrent sessions were not established");
  const logout = await firstPage.evaluate(() => fetch("/api/auth/logout", { method: "POST", cache: "no-store" }).then(response => response.status));
  const firstAfter = await firstPage.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(response => response.status));
  const secondAfter = await secondPage.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(response => response.status));
  if (logout !== 200 || firstAfter !== 401 || secondAfter !== 200) throw new Error("logout did not remain scoped to one refresh/session family");
  console.log(JSON.stringify({ concurrentSessions: "passed", firstFamilyLogout: "revoked", secondFamilyAfterFirstLogout: "active" }, null, 2));
  await first.close();
  await second.close();
} finally {
  await browser.close();
}
