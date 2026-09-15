import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const secretName = process.env.COGNITO_PILOT_IDENTITY_SECRET ?? "businessbuilder-pilot-auth-identities-v1";
const secret = JSON.parse(execFileSync("aws", [
  "secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id", secretName,
  "--query", "SecretString", "--output", "text",
], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));

async function cognitoLogin(page, identity, next = "/start") {
  const navigationFailures = [];
  const recordFailure = (request) => {
    if (request.isNavigationRequest()) navigationFailures.push(request.url().split("?", 1)[0]);
  };
  page.on("requestfailed", recordFailure);
  const recordNavigation = (frame) => {
    if (process.env.COGNITO_PILOT_DEBUG !== "1" || frame !== page.mainFrame()) return;
    try { const value = new URL(frame.url()); console.error(JSON.stringify({ navigation: `${value.origin}${value.pathname}` })); } catch {}
  };
  page.on("framenavigated", recordNavigation);
  const recordResponse = async (response) => {
    if (process.env.COGNITO_PILOT_DEBUG !== "1" || response.request().resourceType() !== "document") return;
    const value = new URL(response.url());
    const location = response.headers().location;
    let safeLocation = "";
    if (location) {
      try { const target = new URL(location, value); safeLocation = `${target.origin}${target.pathname}?${[...target.searchParams.keys()].join(",")}`; } catch { safeLocation = "[invalid-location]"; }
    }
    console.error(JSON.stringify({ response: `${value.origin}${value.pathname}`, status: response.status(), location: safeLocation }));
  };
  page.on("response", recordResponse);
  await page.goto(`${site}/api/auth/start?intent=login&next=${encodeURIComponent(next)}`, { waitUntil: "domcontentloaded" });
  await page.waitForURL(/\.auth\.us-east-1\.amazoncognito\.com\//, { timeout: 30_000, waitUntil: "domcontentloaded" });
  const username = page.locator('input[name="username"], input[type="email"]').first();
  await username.fill(identity.email);
  const password = page.locator('input[name="password"], input[type="password"]').first();
  if (await password.count() === 0) {
    await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
    await password.waitFor({ state: "visible", timeout: 30_000 });
  }
  await password.fill(identity.password);
  if (process.env.COGNITO_PILOT_DEBUG === "1") console.error(JSON.stringify({ path: new URL(page.url()).pathname, buttons: await page.getByRole("button").allInnerTexts(), inputs: await page.locator("input").evaluateAll(items => items.map(item => ({ name: item.name, type: item.type }))) }));
  await page.getByRole("button", { name: /continue|sign in|submit/i }).first().click();
  if (process.env.COGNITO_PILOT_INSPECT_AFTER_PASSWORD === "1") {
    await page.waitForTimeout(3_000);
    const current = new URL(page.url());
    const pageState = (await page.locator("body").innerText()).replaceAll(identity.email, "[synthetic-email]").slice(0, 800).replace(/\s+/g, " ");
    throw new Error(`inspection after password at ${current.origin}${current.pathname}; state=${pageState}`);
  }
  try {
    await page.waitForURL((url) => url.origin === site && !url.pathname.startsWith("/api/auth/"), { timeout: 45_000 });
  } catch (error) {
    const current = new URL(page.url());
    const pageState = (await page.locator("body").innerText()).replaceAll(identity.email, "[synthetic-email]").slice(0, 500).replace(/\s+/g, " ");
    throw new Error(`login navigation failed at ${current.origin}${current.pathname}; failed=${navigationFailures.join(",")}; state=${pageState}`, { cause: error });
  } finally {
    page.off("requestfailed", recordFailure);
    page.off("framenavigated", recordNavigation);
    page.off("response", recordResponse);
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const result = {};

try {
  await cognitoLogin(page, secret.founder);
  const session = await page.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(async response => ({ status: response.status, body: await response.json() })));
  if (session.status !== 200 || !session.body.authenticated) throw new Error("real founder session was not established");
  result.login = "passed";
  result.verifiedEmail = session.body.user?.email_verified === true;
  result.founderUserId = session.body.user?.user_id;
  result.tenantId = session.body.memberships?.[0]?.tenant_id;

  await page.goto(`${site}/start`, { waitUntil: "networkidle" });
  await page.getByLabel("The company, in your words").fill("A reliable residential cleaning company for busy Denton households.");
  await page.getByLabel("Your name").fill("Pilot Founder");
  await page.getByLabel("Working company name").fill("Denton Pilot Cleaning");
  await page.getByLabel("Denton service radius · miles").fill("12");
  await page.getByLabel("Founder hours per week").fill("30");
  await page.getByLabel("Available startup budget · USD").fill("2500");
  await page.getByRole("button", { name: "Open my build" }).click();
  await page.waitForURL(/\/build-room\/[^/]+$/, { timeout: 45_000 });
  const companyId = decodeURIComponent(new URL(page.url()).pathname.split("/").pop());
  result.companyId = companyId;
  result.journeyEntry = "passed";

  const journey = await page.evaluate((id) => fetch(`/api/product/companies/${encodeURIComponent(id)}/residential-cleaning-pilot`, { cache: "no-store" }).then(async response => ({ status: response.status, body: await response.json() })), companyId);
  if (journey.status !== 200 || journey.body.journey?.company?.company_id !== companyId) throw new Error("persisted residential-cleaning journey was not returned");
  if (journey.body.journey?.verification?.ready !== false || journey.body.journey?.verification?.fully_set !== false) throw new Error("Verification authority was bypassed");
  result.persistedJourney = "passed";
  result.verificationRemainsAuthoritative = true;

  const forged = await page.evaluate(() => fetch("/api/product/companies/company_forged_tenant/residential-cleaning-pilot", { headers: { "X-Tenant-ID": "tenant_forged", "X-Company-ID": "company_forged_tenant", "X-Role": "owner" }, cache: "no-store" }).then(response => response.status));
  if (forged !== 404) throw new Error("forged tenant/company authority was not denied safely");
  result.forgedAuthority = "denied";

  const before = (await context.cookies()).find(item => item.name === "bb_customer_session");
  if (!before?.secure || !before.httpOnly) throw new Error("founder session cookie was not Secure and HttpOnly");
  const refresh = await page.evaluate(() => fetch("/api/auth/refresh", { method: "POST", cache: "no-store" }).then(response => response.status));
  const after = (await context.cookies()).find(item => item.name === "bb_customer_session");
  if (refresh !== 200 || !after || before.value === after.value) throw new Error("session refresh did not rotate the internal session");
  result.rotation = "passed";

  const postRefreshCookies = await context.cookies();
  const oldCookie = { ...after };
  const oldRefreshCookie = postRefreshCookies.find(item => item.name === "bb_provider_refresh");
  if (!oldRefreshCookie?.secure || !oldRefreshCookie.httpOnly) throw new Error("provider refresh cookie was not Secure and HttpOnly");
  const logout = await page.evaluate(() => fetch("/api/auth/logout", { method: "POST", cache: "no-store" }).then(async response => ({ status: response.status, body: await response.json() })));
  if (logout.status !== 200 || !logout.body.logged_out) throw new Error("logout failed");
  const anonymous = await page.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(response => response.status));
  if (anonymous !== 401) throw new Error("logout did not clear the local session");
  await context.addCookies([
    { name: oldCookie.name, value: oldCookie.value, domain: oldCookie.domain, path: oldCookie.path, httpOnly: true, secure: true, sameSite: "Lax" },
    { name: oldRefreshCookie.name, value: oldRefreshCookie.value, domain: oldRefreshCookie.domain, path: oldRefreshCookie.path, httpOnly: true, secure: true, sameSite: "Strict" },
  ]);
  const revokedRefresh = await page.evaluate(() => fetch("/api/auth/refresh", { method: "POST", cache: "no-store" }).then(response => response.status));
  if (revokedRefresh !== 401) throw new Error("revoked provider refresh family was reusable");
  result.revokedRefreshFamily = "denied";
  await context.addCookies([{ name: oldCookie.name, value: oldCookie.value, domain: oldCookie.domain, path: oldCookie.path, httpOnly: true, secure: true, sameSite: "Lax" }]);
  const revoked = await page.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(response => response.status));
  if (revoked !== 401) throw new Error("revoked internal session was reusable");
  result.logout = "passed";
  result.revokedSession = "denied";

  await context.clearCookies();
  await cognitoLogin(page, secret.founder, `/build-room/${encodeURIComponent(companyId)}`);
  const returning = await page.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(response => response.status));
  if (returning !== 200) throw new Error("returning founder could not establish a new session");
  result.loginAgain = "passed";

  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
