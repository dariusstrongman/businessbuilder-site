// Real Cognito founder/operator and unpaid Stripe pilot commercial denial proof.

import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const companyId = process.env.UNIFIED_COMPANY_ID;
const orderId = process.env.UNIFIED_ORDER_ID;
const grantId = process.env.UNIFIED_COMMERCIAL_GRANT_ID;
if (!companyId || !orderId || !grantId) throw new Error("persisted unpaid company/order and appointed operator required");
const identities = JSON.parse(execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1",
  "--secret-id", "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text"],
{ encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));

async function login(page, identity) {
  await page.goto(`${site}/api/auth/start?intent=login&next=/start`);
  await page.waitForURL(/\.auth\.us-east-1\.amazoncognito\.com\//);
  await page.locator('input[name="username"], input[type="email"]').first().fill(identity.email);
  const password = page.locator('input[name="password"], input[type="password"]').first();
  if (!await password.count()) {
    await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
    await password.waitFor({ state: "visible" });
  }
  await password.fill(identity.password);
  await page.getByRole("button", { name: /continue|sign in|submit/i }).first().click();
  await page.waitForURL((url) => url.origin === site && !url.pathname.startsWith("/api/auth/"));
}

async function product(page, path, method = "GET", body = null) {
  return page.evaluate(async ({ path, method, body }) => {
    const response = await fetch(`/api/product/${path}`, { method, cache: "no-store",
      headers: body === null ? undefined : { "Content-Type": "application/json" },
      body: body === null ? undefined : JSON.stringify(body) });
    return { status: response.status, body: await response.json() };
  }, { path, method, body });
}

const browser = await chromium.launch({ headless: true });
const anonymousContext = await browser.newContext();
const founderContext = await browser.newContext();
const operatorContext = await browser.newContext();
const anonymous = await anonymousContext.newPage();
const founder = await founderContext.newPage();
const operator = await operatorContext.newPage();
const result = { authority: "real_cognito_distinct_founder_operator", unpaid_company: companyId };
try {
  await anonymous.goto(site);
  const unauthenticated = await product(anonymous, `orders/${orderId}?company_id=${companyId}`);
  if (unauthenticated.status !== 401) throw new Error("anonymous customer received order authority");
  result.unauthenticated = "denied";
  await login(founder, identities.founder);
  await login(operator, identities.operator);
  const founderSession = await product(founder, "session");
  const operatorSession = await product(operator, "session");
  if (founderSession.status !== 200 || operatorSession.status !== 200
    || founderSession.body.user.user_id === operatorSession.body.user.user_id
    || founderSession.body.user.email_verified !== true
    || !founderSession.body.memberships.some((item) => item.role === "owner" && item.status === "active")) {
    throw new Error("provider-backed founder/operator session or OWNER authority unavailable");
  }
  const orderPath = `orders/${orderId}?company_id=${companyId}`;
  const order = await product(founder, orderPath);
  if (order.status !== 200 || order.body.order.status !== "draft") throw new Error("unpaid canonical order unavailable");
  const before = await product(founder, `entitlements?company_id=${companyId}`);
  if (before.status !== 200 || before.body.entitlements.length !== 0) throw new Error("unpaid founder received entitlement");
  await founder.goto(`${site}/build-room/${companyId}?checkout=returned`, { waitUntil: "networkidle" });
  const afterRedirect = await product(founder, `entitlements?company_id=${companyId}`);
  if (afterRedirect.status !== 200 || afterRedirect.body.entitlements.length !== 0) throw new Error("forged success redirect activated Commercial");
  result.success_redirect = "no_entitlement";
  const operatorAttack = await product(operator, `companies/${companyId}/build-room`);
  if (operatorAttack.status < 400) throw new Error("operator without support scope accessed founder Build Room");
  const forgedCompany = await product(founder, `orders/${orderId}?company_id=company_cleaning_f0b58241ef091e037f00`);
  if (forgedCompany.status < 400) throw new Error("company query overrode server-derived scope");
  const forgedAuthority = await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`, "POST", {
    idempotency_key: "unified_forged_authority_negative", tenant_id: "tenant_forged", role: "support",
  });
  if (forgedAuthority.status < 400) throw new Error("browser-supplied tenant/role authority was accepted");
  result.company_role_forgery = "denied";
  const beforeRelease = await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`, "POST", {
    idempotency_key: "unified_unreleased_checkout_negative",
  });
  if (beforeRelease.status < 400) throw new Error("unreleased order opened Checkout");
  if (order.body.order.payment_eligibility !== "PAYMENT_DELAY_REQUIRED") {
    const taxReviewAttempt = await product(operator, `operator/companies/${companyId}/orders/${orderId}/release`, "POST", {
      grant_id: grantId, eligibility: "PAY_NOW_ELIGIBLE", eligible_at: null,
      tax_disposition: "manual_review", tax_review_state: "TAX_REVIEW_REQUIRED",
      decision_ref: "unified_tax_review_negative", expires_at: new Date(Date.now() + 90 * 60_000).toISOString(),
    });
    if (taxReviewAttempt.status < 400) throw new Error("tax review required was released as PAY_NOW");
    const delayed = await product(operator, `operator/companies/${companyId}/orders/${orderId}/release`, "POST", {
      grant_id: grantId, eligibility: "PAYMENT_DELAY_REQUIRED",
      eligible_at: new Date(Date.now() + 60 * 60_000).toISOString(),
      tax_disposition: "manual_review", tax_review_state: "TAX_REVIEW_REQUIRED",
      decision_ref: "unified_payment_delay_negative", expires_at: new Date(Date.now() + 120 * 60_000).toISOString(),
    });
    if (delayed.status !== 200 || delayed.body.order.payment_eligibility !== "PAYMENT_DELAY_REQUIRED") {
      throw new Error(`appointed operator delayed admission unavailable (${delayed.status})`);
    }
  }
  result.tax_review_required = "pay_now_denied_and_state_retained";
  const delayedCheckout = await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`, "POST", {
    idempotency_key: "unified_delayed_checkout_negative",
  });
  if (delayedCheckout.status < 400) throw new Error("PAYMENT_DELAY_REQUIRED opened Stripe Checkout");
  const after = await product(founder, `entitlements?company_id=${companyId}`);
  if (after.status !== 200 || after.body.entitlements.length !== 0) throw new Error("denied admission granted entitlement");
  result.payment_delay = "persisted_checkout_blocked_no_entitlement";
  const existingCompany = "company_cleaning_fd9005cbb91cbffe34d1";
  const existingOrder = "order_cleaning_existing_fd9005cbb91cbffe34d1";
  const exactQuote = await product(founder, `orders/${existingOrder}/quote?company_id=${existingCompany}`);
  if (exactQuote.status !== 200 || exactQuote.body.quote.status !== "approved") {
    throw new Error("real founder-approved existing-business quote unavailable");
  }
  const staleQuote = await product(founder, `orders/${existingOrder}/quote/approve?company_id=${existingCompany}`, "POST", {
    quote_id: exactQuote.body.quote.quote_id, recommendation_digest: "0".repeat(64),
  });
  if (staleQuote.status < 400) throw new Error("changed quote digest was accepted after founder approval");
  result.stale_quote_digest = "denied";
  const oldCookie = (await founderContext.cookies(site)).find((item) => item.name === "bb_customer_session");
  if (!oldCookie) throw new Error("HttpOnly customer session missing");
  const loggedOut = await founder.evaluate(async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    return response.status;
  });
  if (loggedOut !== 200) throw new Error("founder logout failed");
  const replayContext = await browser.newContext();
  await replayContext.addCookies([oldCookie]);
  const replay = await replayContext.newPage();
  await replay.goto(site);
  const stale = await product(replay, "session");
  if (stale.status !== 401) throw new Error("revoked session cookie replay succeeded");
  result.revoked_session_replay = "denied";
  await replayContext.close();
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
