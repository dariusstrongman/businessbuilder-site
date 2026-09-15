import { createHmac } from "node:crypto";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const providerHost = "businessbuilder-pilot-199949321335.auth.us-east-1.amazoncognito.com";
const identities = JSON.parse(execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id", "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text"], { encoding: "utf8" }));
const runtime = JSON.parse(execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id", "businessbuilder-pilot-auth-runtime-v1", "--query", "SecretString", "--output", "text"], { encoding: "utf8" }));

async function submitCredentials(page) {
  const username = page.locator('input[name="username"], input[type="email"]').first();
  await username.fill(identities.founder.email);
  await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
  const password = page.locator('input[name="password"], input[type="password"]').first();
  await password.waitFor({ state: "visible" });
  await password.fill(identities.founder.password);
  await page.getByRole("button", { name: /continue|sign in/i }).first().click();
}

async function deniedAtCallback(page) {
  await page.waitForURL((url) => url.origin === site && url.pathname === "/login", { timeout: 45_000 });
  if (new URL(page.url()).searchParams.get("auth_error") !== "callback") throw new Error("callback did not fail closed");
}

const browser = await chromium.launch({ headless: true });
const results = {};
try {
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route(`${site}/api/auth/callback**`, async route => {
      const target = new URL(route.request().url());
      target.searchParams.set("state", "forged-state-value");
      await route.continue({ url: target.href });
    });
    await page.goto(`${site}/api/auth/start?intent=login&next=%2Fstart`);
    await submitCredentials(page);
    await deniedAtCallback(page);
    results.forgedState = "denied";
    await context.close();
  }
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`${site}/api/auth/start?intent=login&next=%2Fstart`);
    const altered = new URL(page.url());
    if (altered.host !== providerHost) throw new Error("provider authorization page was not reached");
    altered.searchParams.set("nonce", "forged-provider-nonce");
    await page.goto(altered.href);
    await submitCredentials(page);
    await deniedAtCallback(page);
    results.wrongNonce = "denied";
    await context.close();
  }
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route(`https://${providerHost}/**`, route => route.abort());
    await page.goto(`${site}/api/auth/start?intent=login&next=%2Fstart`).catch(() => {});
    const original = (await context.cookies(`${site}/api/auth/callback`)).find(item => item.name === "bb_auth_transaction");
    if (!original) throw new Error("authentication transaction cookie missing");
    const parsed = JSON.parse(Buffer.from(original.value.split(".", 1)[0], "base64url").toString("utf8"));
    parsed.expiresAt = Date.now() - 1;
    const encoded = Buffer.from(JSON.stringify(parsed)).toString("base64url");
    const signature = createHmac("sha256", runtime.bff_cookie_signing_key).update(encoded).digest("base64url");
    await context.addCookies([{ name: "bb_auth_transaction", value: `${encoded}.${signature}`, url: `${site}/api/auth/callback`, httpOnly: true, secure: true, sameSite: "Lax" }]);
    await page.unrouteAll();
    await page.goto(`${site}/api/auth/callback?code=unused-code&state=${encodeURIComponent(parsed.state)}`);
    await deniedAtCallback(page);
    results.expiredState = "denied";
    await context.close();
  }
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
