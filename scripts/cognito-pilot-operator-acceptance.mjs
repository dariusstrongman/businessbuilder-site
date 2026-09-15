import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const companyId = process.env.COGNITO_PILOT_COMPANY_ID ?? "company_cleaning_90cd0dad2534c3ece3f2";
const grantId = process.env.COGNITO_PILOT_SUPPORT_GRANT_ID;
const expectSupportDenied = process.env.COGNITO_PILOT_EXPECT_SUPPORT_DENIED === "1";
const identities = JSON.parse(execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id", "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text"], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));

async function login(page) {
  await page.goto(`${site}/api/auth/start?intent=login&next=${encodeURIComponent("/operator/access")}`);
  const username = page.locator('input[name="username"], input[type="email"]').first();
  await username.fill(identities.operator.email);
  await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
  const password = page.locator('input[name="password"], input[type="password"]').first();
  await password.waitFor({ state: "visible" });
  await password.fill(identities.operator.password);
  await page.getByRole("button", { name: /continue|sign in/i }).first().click();
  await page.waitForURL((url) => url.origin === site && !url.pathname.startsWith("/api/auth/"), { timeout: 45_000 });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
try {
  await login(page);
  const session = await page.evaluate(() => fetch("/api/product/session", { cache: "no-store" }).then(async response => ({ status: response.status, body: await response.json() })));
  if (session.status !== 200 || !session.body.authenticated) throw new Error("operator identity session was not established");
  const result = {
    login: "passed",
    operatorUserId: session.body.user?.user_id,
    providerGroupsGrantAuthority: false,
    internalMembershipCount: session.body.memberships?.length ?? 0,
  };
  const forged = await page.evaluate(() => fetch("/api/auth/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grant_id: "support_grant_forged", reason: "forged operator elevation" }) }).then(response => response.status));
  if (forged < 400) throw new Error("forged support grant was accepted");
  result.forgedSupportGrant = "denied";

  if (grantId) {
    const support = await page.evaluate((id) => fetch("/api/auth/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ grant_id: id, reason: "Supervised pilot evidence review" }) }).then(async response => ({ status: response.status, body: await response.json() })), grantId);
    if (expectSupportDenied) {
      if (support.status < 400) throw new Error("expired/revoked support grant was accepted");
      result.expiredOrRevokedSupportGrant = "denied";
    } else {
      if (support.status !== 200 || !support.body.active || support.body.company_id !== companyId) throw new Error(`scoped support session was not established (${support.status}:${support.body.error ?? "invalid_response"})`);
      result.supportSession = "passed";
      const review = await page.goto(`${site}/operator/reviews/${encodeURIComponent(companyId)}`, { waitUntil: "networkidle" });
      if (!review?.ok()) throw new Error("operator evidence-review view was unavailable");
      result.evidenceReviewAccess = "passed";
      const billing = await page.evaluate(() => fetch("/api/product/orders", { cache: "no-store" }).then(response => response.status));
      if (billing < 400) throw new Error("support accessed protected commercial data");
      result.billingAuthority = "denied";
    }
  }
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
