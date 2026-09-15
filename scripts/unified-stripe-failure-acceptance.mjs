// Real Cognito sessions with real Stripe TEST decline and Checkout expiration.

import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const companyId = process.env.UNIFIED_COMPANY_ID;
const orderId = process.env.UNIFIED_ORDER_ID;
const grantId = process.env.UNIFIED_COMMERCIAL_GRANT_ID;
const action = process.env.UNIFIED_FAILURE_ACTION;
if (!companyId || !orderId || !grantId || !["cancel", "decline"].includes(action)) {
  throw new Error("exact persisted founder scope and Stripe TEST failure action required");
}
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

function assertOk(response, stage, status = 200) {
  if (response.status !== status) throw new Error(`${stage} failed (${response.status})`);
  return response.body;
}

const browser = await chromium.launch({ headless: true });
const founderContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
const operatorContext = await browser.newContext();
const founder = await founderContext.newPage();
const operator = await operatorContext.newPage();
const result = { action, company_id: companyId, authority: "distinct_real_cognito_sessions" };
try {
  await login(founder, identities.founder);
  await login(operator, identities.operator);
  const owner = assertOk(await product(founder, "session"), "founder session");
  const supervisor = assertOk(await product(operator, "session"), "operator session");
  if (owner.user.user_id === supervisor.user.user_id || !owner.memberships.some((item) => item.role === "owner")) {
    throw new Error("real separate founder/operator scope unavailable");
  }
  const orderPath = `orders/${orderId}?company_id=${companyId}`;
  const current = assertOk(await product(founder, orderPath), "unpaid order").order;
  if (!["draft", "pending_payment"].includes(current.status) || current.total?.minor_units !== 149500 || current.offer_code !== "new_business_build_v1") {
    throw new Error("canonical unpaid $1495 order missing");
  }
  if (current.status === "draft") assertOk(await product(operator, `operator/companies/${companyId}/orders/${orderId}/release`, "POST", {
    grant_id: grantId, eligibility: "PAY_NOW_ELIGIBLE", eligible_at: null,
    tax_disposition: "test_mode_undetermined", tax_review_state: "TEST_MODE_UNDETERMINED",
    decision_ref: `unified_${action}_test_release`, expires_at: new Date(Date.now() + 90 * 60_000).toISOString(),
  }), "appointed sandbox release");
  const checkout = current.status === "draft"
    ? assertOk(await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`, "POST", {
      idempotency_key: `unified_${action}_checkout_${companyId.slice(-8)}`,
    }), "real Stripe TEST Checkout", 201).checkout
    : assertOk(await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`), "existing unpaid Checkout").checkout;
  if (!checkout.redirect_url?.startsWith("https://checkout.stripe.com/")) throw new Error("hosted Stripe sandbox URL missing");
  await founder.goto(checkout.redirect_url, { waitUntil: "domcontentloaded" });
  if (action === "decline") {
    let paymentFrame = founder.mainFrame();
    for (const frame of founder.frames()) {
      if (frame.url().startsWith("https://checkout.stripe.com/") && await frame.locator('input[name="cardNumber"]').count()) {
        paymentFrame = frame;
        break;
      }
    }
    await paymentFrame.locator('input[name="cardNumber"]').fill("4000000000000002");
    await paymentFrame.locator('input[name="cardExpiry"]').fill("1234");
    await paymentFrame.locator('input[name="cardCvc"]').fill("123");
    await paymentFrame.locator('input[name="billingName"]').fill("Sandbox Decline");
    await paymentFrame.locator('input[name="billingPostalCode"]').fill("10001");
    const link = paymentFrame.locator('input[name="enableStripePass"]');
    if (await link.count() && await link.isChecked()) await link.uncheck();
    await paymentFrame.getByTestId("hosted-payment-submit-button").click();
    await founder.waitForTimeout(5_000);
    await founder.screenshot({ path: join(tmpdir(), "bb-unified-stripe-test-decline.png"), fullPage: false });
    const declinedText = await paymentFrame.getByText(/declined|couldn.t be processed|wasn.t accepted|try another card|payment failed/i).first().isVisible().catch(() => false);
    const invalidCard = await paymentFrame.locator('input[name="cardNumber"][aria-invalid="true"]').count() > 0;
    if (!declinedText && !invalidCard) throw new Error("Stripe sandbox rejection UI not confirmed; inspect temporary test screenshot");
    result.stripe_sandbox = "real_test_card_declined";
  } else {
    await founder.goto(`${site}/build-room/${companyId}?checkout=canceled`, { waitUntil: "networkidle" });
    const accountSecret = execFileSync("aws", ["secretsmanager", "get-secret-value", "--region", "us-east-1",
      "--secret-id", "stripetest", "--query", "SecretString", "--output", "text"],
    { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });
    const parsed = JSON.parse(accountSecret);
    const key = parsed.STRIPE_TEST_SECRET_KEY;
    if (!key?.startsWith("sk_test_")) throw new Error("approved Stripe TEST secret unavailable");
    const sessionsResponse = await fetch("https://api.stripe.com/v1/checkout/sessions?limit=100", {
      headers: { Authorization: `Bearer ${key}` }, cache: "no-store",
    });
    if (!sessionsResponse.ok) throw new Error("Stripe TEST Checkout reconciliation lookup failed");
    const sessions = (await sessionsResponse.json()).data;
    const exact = sessions.find((item) => item.client_reference_id === orderId && item.status === "open");
    if (!exact || exact.livemode !== false) throw new Error("exact open sandbox Checkout session missing");
    const expired = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(exact.id)}/expire`, {
      method: "POST", headers: { Authorization: `Bearer ${key}` }, cache: "no-store",
    });
    if (!expired.ok) throw new Error("Stripe TEST cancellation/expiration failed");
    result.stripe_sandbox = "real_test_checkout_expired";
  }
  await founder.goto(`${site}/build-room/${companyId}`, { waitUntil: "domcontentloaded" });
  let order = null;
  const deadline = Date.now() + (action === "cancel" ? 60_000 : 15_000);
  while (Date.now() < deadline) {
    order = assertOk(await product(founder, orderPath), "post-failure canonical order").order;
    if (action === "decline" || order.status !== "pending_payment") break;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  const entitlements = assertOk(await product(founder, `entitlements?company_id=${companyId}`), "post-failure entitlements").entitlements;
  if (["paid", "active", "completed", "fulfillment_pending"].includes(order.status)
    || entitlements.some((item) => item.status === "active")) throw new Error("failed/expired Checkout activated Commercial");
  if (action === "cancel" && order.status !== "canceled") {
    throw new Error("real Stripe expiration webhook did not reconcile into the canonical order");
  }
  result.commercial_order = order.status;
  result.active_entitlements = 0;
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
