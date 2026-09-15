import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const offer = process.env.UNIFIED_OFFER;
const companyId = process.env.UNIFIED_COMPANY_ID;
const grantId = process.env.UNIFIED_COMMERCIAL_GRANT_ID;
const supportGrantId = process.env.UNIFIED_SUPPORT_GRANT_ID;
const configuredOrderId = process.env.UNIFIED_ORDER_ID;
if (!["business", "business_run", "existing_run"].includes(offer) || !companyId || !grantId) {
  throw new Error("explicit persisted pilot offer/company/appointment locators required");
}
const identities = JSON.parse(execFileSync("aws", [
  "secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id",
  "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text",
], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));

async function login(page, identity, next) {
  await page.goto(`${site}/api/auth/start?intent=login&next=${encodeURIComponent(next)}`, { waitUntil: "domcontentloaded" });
  await page.waitForURL(/\.auth\.us-east-1\.amazoncognito\.com\//, { timeout: 30_000 });
  await page.locator('input[name="username"], input[type="email"]').first().fill(identity.email);
  const password = page.locator('input[name="password"], input[type="password"]').first();
  if (await password.count() === 0) {
    await page.getByRole("button", { name: /continue|next|sign in/i }).first().click();
    await password.waitFor({ state: "visible", timeout: 30_000 });
  }
  await password.fill(identity.password);
  await page.getByRole("button", { name: /continue|sign in|submit/i }).first().click();
  await page.waitForURL((url) => url.origin === site && !url.pathname.startsWith("/api/auth/"), { timeout: 45_000 });
}

async function product(page, path, method = "GET", body = null) {
  return page.evaluate(async ({ path, method, body }) => {
    const response = await fetch(`/api/product/${path}`, {
      method, cache: "no-store", headers: body === null ? undefined : { "Content-Type": "application/json" },
      body: body === null ? undefined : JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() };
  }, { path, method, body });
}

function requireStatus(response, statuses, stage) {
  if (!statuses.includes(response.status)) throw new Error(`${stage} failed (${response.status}:${response.body?.error ?? "unexpected_response"})`);
  return response.body;
}

async function hostedPayment(page, checkoutUrl) {
  if (!checkoutUrl?.startsWith("https://checkout.stripe.com/")) throw new Error("exact sandbox hosted Checkout URL missing");
  await page.goto(checkoutUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  let paymentFrame = page.mainFrame();
  for (const frame of page.frames()) {
    if (frame.url().startsWith("https://checkout.stripe.com/") && await frame.locator('input[name="cardNumber"]').count()) {
      paymentFrame = frame;
      break;
    }
  }
  await paymentFrame.locator('input[name="cardNumber"]').fill("4242424242424242");
  await paymentFrame.locator('input[name="cardExpiry"]').fill("1234");
  await paymentFrame.locator('input[name="cardCvc"]').fill("123");
  await paymentFrame.locator('input[name="billingName"]').fill("Sandbox Pilot");
  await paymentFrame.locator('input[name="billingPostalCode"]').fill("10001");
  const link = paymentFrame.locator('input[name="enableStripePass"]');
  if (await link.count() && await link.isChecked()) await link.uncheck();
  await paymentFrame.getByTestId("hosted-payment-submit-button").click();
  await page.waitForURL((url) => url.host !== "checkout.stripe.com", { timeout: 18_000 }).catch(() => null);
  return new URL(page.url()).host !== "checkout.stripe.com";
}

const browser = await chromium.launch({ headless: true });
const founderContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
const operatorContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const founder = await founderContext.newPage();
const operator = await operatorContext.newPage();
const result = { offer, company_id: companyId, authority: "pending", checkout: "pending", webhook: "pending" };

try {
  await login(founder, identities.founder, `/build-room/${companyId}`);
  await login(operator, identities.operator, `/operator/reviews/${companyId}`);
  const founderSession = requireStatus(await product(founder, "session"), [200], "founder session");
  const operatorSession = requireStatus(await product(operator, "session"), [200], "operator session");
  if (!founderSession.authenticated || founderSession.user?.email_verified !== true
    || !founderSession.memberships?.some((item) => item.role === "owner" && item.status === "active")
    || !operatorSession.authenticated || operatorSession.user?.email_verified !== true
    || founderSession.user.user_id === operatorSession.user.user_id) {
    throw new Error("real distinct verified founder/operator authority unavailable");
  }
  result.authority = "distinct_real_cognito_sessions";
  const journeyPath = `companies/${companyId}/residential-cleaning-pilot`;
  let journey = requireStatus(await product(founder, journeyPath), [200], "persisted cleaning journey").journey;
  if (journey.scope_commit.approval_state !== "granted" || journey.verification.ready || journey.verification.fully_set) {
    throw new Error("founder scope or Verification authority inconsistent");
  }
  if (supportGrantId) {
    const scoped = await operator.evaluate(async (grantId) => {
      const response = await fetch("/api/auth/support", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grant_id: grantId, reason: "Supervised sandbox scope review" }) });
      return { status: response.status, body: await response.json() };
    }, supportGrantId);
    if (scoped.status !== 200 || scoped.body.company_id !== companyId) throw new Error("founder-approved operator support scope unavailable");
    result.support_scope = "founder_approved_company_scoped";
  }

  let orderId = configuredOrderId;
  if (offer === "existing_run") {
    if (!journey.existing_business_audit || journey.order) throw new Error("existing audit/quote sequence inconsistent");
    if (!journey.existing_business_scope) {
      const citation = journey.research.data.sources[0]?.source_id;
      const scoped = await product(operator, `operator/companies/${companyId}/residential-cleaning/existing-scope`, "POST", {
        grant_id: grantId, citation_ids: [citation], findings: [
          { system: "website", decision: "improve", reason: "Verify the existing lead form delivers to the founder before retaining it." },
          { system: "inbox", decision: "add", reason: "Prepare a separate business inbox and require founder provider authorization." },
        ],
      });
      requireStatus(scoped, [201], "appointed operator cited scope");
    }
    journey = requireStatus(await product(founder, journeyPath), [200], "scoped journey").journey;
    if (!journey.existing_business_scope?.data?.citation_ids?.length) throw new Error("cited operator scope not persisted");
    if (!journey.order) {
      const created = await product(founder, `companies/${companyId}/residential-cleaning-pilot/existing-order`, "POST", {});
      orderId = requireStatus(created, [201], "unpriced existing order").order.order_id;
    } else {
      orderId = journey.order.order_id;
    }
    let order = requireStatus(await product(founder, `orders/${orderId}?company_id=${companyId}`), [200], "unpriced order").order;
    if (!order.quote_id) {
      if (order.total !== null) throw new Error("marketing floor generated a charge before quote");
      const quote = await product(operator, `operator/companies/${companyId}/orders/${orderId}/quote`, "POST", {
        grant_id: grantId, upfront_minor: 169500, expires_at: new Date(Date.now() + 3 * 86_400_000).toISOString(),
      });
      requireStatus(quote, [201], "exact operator quote");
    }
    const quote = requireStatus(await product(founder, `orders/${orderId}/quote?company_id=${companyId}`), [200], "founder quote").quote;
    if (quote.upfront.minor_units !== 169500 || quote.monthly.minor_units !== 29900) throw new Error("exact quote differs from scoped test decision");
    if (quote.status === "proposed") {
      const approved = await product(founder, `orders/${orderId}/quote/approve?company_id=${companyId}`, "POST", {
        quote_id: quote.quote_id, recommendation_digest: quote.recommendation_digest,
      });
      requireStatus(approved, [200], "founder exact quote approval");
    }
    order = requireStatus(await product(founder, `orders/${orderId}?company_id=${companyId}`), [200], "approved quote order").order;
    if (order.total?.minor_units !== 199400 || order.offer_code !== "existing_business_run_v1") {
      throw new Error("existing quote/order mapping incorrect");
    }
    result.quote = "audit_cited_scope_exact_quote_founder_approval";
  } else {
    if (!orderId || journey.order?.order_id !== orderId) throw new Error("approved pending build order mismatch");
    if (offer === "business_run") {
      const current = requireStatus(await product(founder, `orders/${orderId}?company_id=${companyId}`), [200], "build run order").order;
      if (current.offer_code !== "new_business_build_run_v1") {
        requireStatus(await product(founder, `orders/${orderId}/offer?company_id=${companyId}`, "POST", {
          offer_code: "new_business_build_run_v1",
        }), [200], "founder build run offer selection");
      }
    }
  }
  const orderPath = `orders/${orderId}?company_id=${companyId}`;
  let order = requireStatus(await product(founder, orderPath), [200], "current order").order;
  const expectedTotal = offer === "business" ? 149500 : offer === "business_run" ? 229400 : 199400;
  if (order.total?.currency !== "USD" || order.total.minor_units !== expectedTotal) throw new Error("canonical fixed/quote bundle amount incorrect");
  result.order_id = orderId;
  result.canonical_total_minor = expectedTotal;
  if (order.status === "draft") {
    const beforeRelease = await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`, "POST", {
      idempotency_key: `unified-before-release-${offer}`,
    });
    if (beforeRelease.status < 400) throw new Error("founder opened Checkout without operator release");
    if (order.payment_eligibility !== "PAY_NOW_ELIGIBLE") {
      const forged = await product(operator, `operator/companies/${companyId}/orders/${orderId}/release`, "POST", {
        grant_id: "pilot_commercial_forged_grant", eligibility: "PAY_NOW_ELIGIBLE",
        tax_disposition: "test_mode_undetermined", tax_review_state: "TEST_MODE_UNDETERMINED",
        decision_ref: `forged_${offer}_grant`, expires_at: new Date(Date.now() + 45 * 60_000).toISOString(),
      });
      if (forged.status < 400) throw new Error("forged commercial appointment was accepted");
      const released = await product(operator, `operator/companies/${companyId}/orders/${orderId}/release`, "POST", {
        grant_id: grantId, eligibility: "PAY_NOW_ELIGIBLE", eligible_at: null,
        tax_disposition: "test_mode_undetermined", tax_review_state: "TEST_MODE_UNDETERMINED",
        decision_ref: `unified_${offer}_test_release`, expires_at: new Date(Date.now() + 45 * 60_000).toISOString(),
      });
      requireStatus(released, [200], "real appointed operator test release");
    }
    order = requireStatus(await product(founder, orderPath), [200], "released order").order;
    if (order.payment_eligibility !== "PAY_NOW_ELIGIBLE" || order.tax_disposition !== "test_mode_undetermined") {
      throw new Error("test admission/tax boundary not persisted");
    }
    const grantsBefore = requireStatus(await product(founder, `entitlements?company_id=${companyId}`), [200], "pre-webhook entitlements").entitlements;
    if (grantsBefore.some((item) => item.status === "active")) throw new Error("payment authority faked before webhook");
    const opened = await product(founder, `orders/${orderId}/checkout?company_id=${companyId}`, "POST", {
      idempotency_key: `unified-checkout-${offer}-${companyId.slice(-8)}`,
    });
    const checkout = requireStatus(opened, [201], "authorized Stripe sandbox Checkout").checkout;
    result.checkout = "provider_hosted_open";
    result.provider_redirect_completed = await hostedPayment(founder, checkout.redirect_url);
  }
  await founder.goto(`${site}/build-room/${companyId}`, { waitUntil: "domcontentloaded" });
  const deadline = Date.now() + 75_000;
  let grants = [];
  while (Date.now() < deadline) {
    order = requireStatus(await product(founder, orderPath), [200], "post-webhook order").order;
    grants = requireStatus(await product(founder, `entitlements?company_id=${companyId}`), [200], "post-webhook entitlements").entitlements;
    if (["paid", "fulfillment_pending", "active", "completed"].includes(order.status)
      && grants.some((item) => item.status === "active")) break;
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  if (!["paid", "fulfillment_pending", "active", "completed"].includes(order.status)
    || !grants.some((item) => item.status === "active")) {
    throw new Error(`signed webhook/entitlement acceptance did not complete (${order.status})`);
  }
  result.webhook = "signed_reconciled_exact_order";
  if (result.checkout === "pending") result.checkout = "already_reconciled_on_restart";
  result.order_status = order.status;
  result.active_entitlements = grants.filter((item) => item.status === "active").length;
  const room = requireStatus(await product(founder, `companies/${companyId}/build-room`), [200], "Build Room projection").build_room;
  if (!room.commercial?.orders.some((item) => item.order_id === orderId && item.status === order.status)
    || room.commercial.active_entitlements !== result.active_entitlements
    || room.readiness.ready || room.readiness.fully_set) {
    throw new Error("Build Room payment/entitlement/Verification projection inconsistent");
  }
  result.build_room = "persisted_commercial_authority_no_fabricated_ready";
  if (offer !== "business") {
    if (!room.commercial.subscriptions?.some((item) => item.order_id === orderId && item.status === "active")) {
      throw new Error("Build Room omitted authoritative recurring subscription state");
    }
    const subscriptions = requireStatus(await product(founder, `subscriptions?company_id=${companyId}`), [200], "Build & Run subscription").subscriptions;
    if (!subscriptions.some((item) => item.order_id === orderId && item.status === "active")) {
      throw new Error("Build & Run subscription not active after signed event");
    }
    result.subscription = "active_first_299_cycle";
    result.managed_operations = grants.some((item) => item.class === "stromation_managed" && item.status === "active");
    if (!result.managed_operations) throw new Error("subscription active without managed-operations entitlement");
  }
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
