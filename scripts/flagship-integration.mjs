import http from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const sitePort = 4310;
const apiPort = 4311;
const siteBase = `http://127.0.0.1:${sitePort}`;
const apiBase = `http://127.0.0.1:${apiPort}`;
const companyId = "company_cleaning_frontend_proof";
const founderToken = "frontend-founder-session";
const operatorToken = "frontend-operator-session";
const supportSession = "frontend-support-scope";

const state = {
  started: false,
  approved: false,
  staleOnce: true,
  orderCreates: 0,
  intakeKey: null,
  intakeBody: null,
  actionState: "prepared",
  submission: null,
  scanReads: 0,
  verified: false,
  leakedAuthorityHeader: false,
  offerCode: "new_business_build_v1",
  checkoutAttempts: 0,
  eligible: false,
  taxReady: false,
  checkoutKey: null,
  orderStatus: "draft",
  running: { enabled: false, order: false, quoteReady: false, quoteApproved: false, admitted: false },
};

function action() {
  return {
    founder_action_id: "founder_action_cleaning_entity_admin",
    action_key: "entity_admin",
    title: "Complete the entity and administrative path",
    reason: "Only the founder can attest and file with the relevant authority.",
    instructions: ["Review the prepared checklist", "Use the official authority destination"],
    state: state.actionState,
    responsibility: "FOUNDER_ACTION",
    partner_authority: "EXTERNAL_PROVIDER/AUTHORITY",
    required_evidence_kinds: ["founder_attestation", "authority_confirmation", "test_result"],
    prepared_data: { checklist: ["Confirm legal name", "Confirm filing jurisdiction"] },
    destination: { label: "Texas Secretary of State business services", url: "https://www.sos.state.tx.us/corp/sosda/index.shtml", mode: "prepared_handoff_only" },
    verification: { authority: "verification", state: state.verified ? "verified" : "not_requested", result: state.verified ? "accepted" : null },
    evidence_review: {
      submissions: state.submission ? [{ ...state.submission, scan_state: state.scanReads > 1 ? "clean" : "pending_scan", review_state: state.verified ? "accepted" : "pending_review", review_reason: state.verified ? "evidence_matches_requirement" : null }] : [],
      reviews: state.verified ? [{ review_id: "review_frontend_1", submission_ids: [state.submission.submission_id], decision: "accepted", reason_code: "evidence_matches_requirement", requested_additional_evidence: [], reviewed_at: new Date().toISOString(), review_version: 1, supersedes_review_id: null, active: true }] : [],
      review_state: state.verified ? "accepted" : "pending_review",
    },
    version: ({ prepared: 1, explained: 2, linked: 3, founder_completed: 4, verified: 6 })[state.actionState] ?? 1,
  };
}

function journey() {
  if (state.running.enabled) {
    return {
      pilot: "residential_cleaning_denton_v1",
      company: { company_id: companyId, display_name: "Clear Day Cleaning", archetype: "residential_cleaning", jurisdiction: { country: "US", region: "TX", locality: "Denton" }, lifecycle: "assembly", readiness: "building" },
      founder: { user_id: "user_founder", organization_id: "org_founder", membership_id: "membership_owner", role: "OWNER" },
      intake: { record_id: "intake_residential_cleaning_v1", kind: "goal", knowledge_class: "fact", data: { ...state.intakeBody, starting_point: "running" }, version: 1 },
      research: { record_id: "research_residential_cleaning_denton_v1", kind: "market", knowledge_class: "fact", data: { status: "bounded_prelaunch_research", limitations: [], findings: [], open_research: [], sources: [{ source_id: "sba_launch", publisher: "SBA", title: "Launch your business", url: "https://www.sba.gov/counseling/launch-your-business/", observed_at: new Date().toISOString() }] }, version: 1 },
      recommendation: { record_id: "recommendation_residential_cleaning_v1", kind: "strategy", knowledge_class: "inference", data: { state: "approved", target_customer: { description: "Busy Denton households" }, service_area: { center: "Denton", radius_miles: 12, outside_area_behavior: "Founder review required outside service area." }, offers: [], starting_price_logic: { formula: "founder-approved labor estimate", rules: [] }, positioning: { statement: "bounded cleaning" }, risks: [], startup_admin_requirements: [], recommended_systems: [], approval_effect: "Founder approved bounded scope" }, version: 1 },
      existing_business_audit: { record_id: "existing_business_audit_residential_cleaning_v1", kind: "workflow", knowledge_class: "fact", data: { state: "founder_inventory_pending_operator_scope", systems: [{ system: "website", assessment: "keep", issue: "Current form needs testing.", provider_reference: null }] }, version: 1 },
      existing_business_scope: { record_id: "existing_business_scope_residential_cleaning_v1", kind: "strategy", knowledge_class: "inference", data: { state: "operator_scoped_pending_founder_quote_approval", citation_ids: ["sba_launch"], findings: [{ system: "website", decision: "keep", reason: "Verify lead delivery before changing the existing website." }], responsibility: "BUSINESS_BUILDER" }, version: 1 },
      scope_commit: { state: "existing_business_audit_required", job_id: "job_scope", job_status: "succeeded", approval_id: "approval_scope", approval_state: "granted" },
      order: state.running.order ? { order_id: "order_existing_1", product_code: "EXISTING_BUSINESS_ONBOARDING", status: "draft", mode: "audit_quote_founder_approval_required", quote_id: state.running.quoteReady ? "quote_existing_1" : null, quote_status: state.running.quoteApproved ? "approved" : state.running.quoteReady ? "proposed" : null, payment_eligibility: "PAYMENT_DELAY_REQUIRED", admission_present: state.running.admitted } : null,
      entitlements: [], founder_actions: [],
      verification: { authority: "verification", ready: false, fully_set: false, unmet_ready: ["customer journey not verified"], unmet_fully_set: ["founder actions not verified"], blocking_ids: ["pilot.not_ready"], evaluated_at: new Date().toISOString() },
    };
  }
  return {
    pilot: "residential_cleaning_denton_v1",
    company: { company_id: companyId, display_name: "Clear Day Cleaning", archetype: "residential_cleaning", jurisdiction: { country: "US", region: "TX", locality: "Denton" }, lifecycle: state.approved ? "assembly" : "challenged", readiness: "building" },
    founder: { user_id: "user_founder", organization_id: "org_founder", membership_id: "membership_owner", role: "OWNER" },
    intake: { record_id: "intake_residential_cleaning_v1", kind: "goal", knowledge_class: "fact", confidence: null, data: { ...(state.intakeBody ?? {}), starting_point: state.intakeBody?.starting_point ?? "idea" }, version: 1 },
    research: { record_id: "research_residential_cleaning_denton_v1", kind: "market", knowledge_class: "fact", confidence: null, version: 1, data: { status: "bounded_prelaunch_research", limitations: ["Official requirements must be confirmed before launch."], findings: [{ finding_id: "market_context", statement: "Denton has a material residential base; this supports a bounded test but does not prove demand.", source_ids: ["census_denton_quickfacts"] }], open_research: [], sources: [{ source_id: "census_denton_quickfacts", publisher: "United States Census Bureau", title: "QuickFacts: Denton city, Texas", url: "https://www.census.gov/quickfacts/fact/table/dentoncitytexas/LFE046224", observed_at: new Date().toISOString() }] } },
    recommendation: { record_id: "recommendation_residential_cleaning_v1", kind: "strategy", knowledge_class: "inference", confidence: 0.55, version: 1, data: { state: "awaiting_founder_approval", target_customer: { description: "Busy Denton households seeking checklist-based recurring residential cleaning.", responsibility: "BUSINESS_BUILDER" }, service_area: { center: "Denton, Texas", radius_miles: 12, outside_area_behavior: "Route outside-area quotes to founder review.", responsibility: "FOUNDER_ACTION" }, offers: [{ offer_id: "recurring", name: "Recurring maintenance clean", responsibility: "BUSINESS_BUILDER" }, { offer_id: "deep", name: "Initial or deep clean", responsibility: "FOUNDER_ACTION" }], starting_price_logic: { formula: "estimated labor hours × founder-approved target hourly revenue + supplies + adjustments", rules: ["Do not publish prices before founder approval."], responsibility: "FOUNDER_ACTION" }, positioning: { statement: "Reliable checklist-based residential cleaning inside a bounded Denton service area.", prohibited_unverified_claims: ["insured"] }, risks: ["Home condition can exceed intake assumptions.", "Insurance and local requirements require confirmation."], startup_admin_requirements: [{ requirement: "entity/admin path", responsibility: "FOUNDER_ACTION", authority: "EXTERNAL_PROVIDER/AUTHORITY" }], recommended_systems: [{ system: "customer website and lead form", responsibility: "BUSINESS_BUILDER" }, { system: "founder-owned business email", responsibility: "FOUNDER_ACTION", authority: "EXTERNAL_PROVIDER/AUTHORITY" }], approval_effect: "Approval commits this exact bounded scope and permits creation of the pending Build My Business order. It does not make the company Ready." } },
    scope_commit: { state: state.approved ? "scope_committed" : "awaiting_founder_approval", job_id: "job_scope", job_status: state.approved ? "succeeded" : "waiting_approval", approval_id: "approval_scope", approval_state: state.approved ? "granted" : "requested" },
    order: state.approved ? { order_id: "order_build_1", product_code: "BUILD_BUSINESS", status: state.orderStatus, mode: "awaiting_authoritative_billing_event" } : null,
    entitlements: [],
    founder_actions: state.approved ? [action()] : [],
    verification: { authority: "verification", ready: false, fully_set: false, unmet_ready: ["customer journey not verified"], unmet_fully_set: ["Founder Actions remain"], blocking_ids: ["pilot.not_ready"], evaluated_at: new Date().toISOString() },
  };
}

function room() {
  if (state.running.enabled) {
    return { schema_version: "build-room.projection.v1", generated_at: new Date().toISOString(), company: journey().company, summary: { total: 1, complete: 0, active: 0, blocked: 1, progress_percent: 0 }, readiness: { ready: false, fully_set: false, unmet_ready: ["customer journey not verified"], unmet_fully_set: ["founder actions not verified"], explanation: "Verification remains authoritative." }, commercial: { authority: "commercial", orders: state.running.order ? [{ order_id: "order_existing_1", status: "draft", offer_code: "existing_business_run_v1", payment_eligibility: "PAYMENT_DELAY_REQUIRED" }] : [], active_entitlements: 0 }, work_items: [], approvals: [], founder_actions: [], handoff: { state: "incomplete", authority: "verification", verification_id: null } };
  }
  return { schema_version: "build-room.projection.v1", generated_at: new Date().toISOString(), company: journey().company, summary: { total: state.approved ? 2 : 1, complete: state.approved ? 1 : 0, active: 0, blocked: 1, progress_percent: state.approved ? 50 : 0 }, readiness: { ready: false, fully_set: false, unmet_ready: ["customer journey not verified"], unmet_fully_set: ["Founder Actions remain"], explanation: "Verification is authoritative." }, commercial: { authority: "commercial", orders: state.approved ? [{ order_id: "order_build_1", status: state.orderStatus, offer_code: state.offerCode, payment_eligibility: state.eligible ? "PAY_NOW_ELIGIBLE" : "PAYMENT_DELAY_REQUIRED" }] : [], active_entitlements: 0 }, work_items: [{ id: "job_scope", kind: "job", title: "Residential Cleaning Scope Commit", description: "Commit the founder-approved scope", owner: "Runtime", status: state.approved ? "succeeded" : "waiting_approval", status_group: state.approved ? "done" : "blocked" }], approvals: [{ approval_id: "approval_scope", title: "Approval required", summary: "Review exact Runtime subject", state: state.approved ? "granted" : "requested", required_approver_role: "founder" }], founder_actions: state.approved ? [action()] : [], handoff: { state: "incomplete", authority: "verification", verification_id: null } };
}

function json(res, status, body, extra = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload), "X-Request-ID": "req_frontend_fixture", ...extra });
  res.end(payload);
}

const api = http.createServer(async (req, res) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  const body = raw ? JSON.parse(raw) : {};
  const url = new URL(req.url, apiBase);
  const token = (req.headers.authorization ?? "").replace(/^Bearer /, "");
  state.leakedAuthorityHeader ||= Boolean(req.headers["x-tenant-id"] || req.headers["x-company-id"] || req.headers["x-actor-role"]);
  const user = token === founderToken ? "founder" : token === operatorToken ? "operator" : null;
  if (!user) return json(res, 401, { status: "error", error: "unauthorized", message: "active authentication required" });
  if (url.pathname === "/api/v1/me") return json(res, 200, { user: { user_id: `user_${user}`, email: `${user}@example.test`, status: "active", email_verified: true } });
  if (url.pathname === "/api/v1/memberships") return json(res, 200, { memberships: [{ membership_id: `membership_${user}`, organization_id: "org_founder", role: user === "founder" ? "owner" : "support", status: "active" }] });
  if (url.pathname === "/api/v1/companies" && req.method === "GET") return json(res, 200, { companies: state.started ? [journey().company] : [] });
  if (url.pathname === "/api/v1/pricing" && req.method === "GET") return json(res, 200, { offers: [
    { offer_code: "website_build_v1", name: "Build My Website", price_kind: "fixed", currency: "USD", upfront_minor: 79500, monthly_minor: null, starting_at_minor: null, third_party_costs_separate: true },
    { offer_code: "new_business_build_v1", name: "Build My Business", price_kind: "fixed", currency: "USD", upfront_minor: 149500, monthly_minor: null, starting_at_minor: null, third_party_costs_separate: true },
    { offer_code: "new_business_build_run_v1", name: "Build My Business + Run", price_kind: "fixed", currency: "USD", upfront_minor: 199500, monthly_minor: 29900, starting_at_minor: null, third_party_costs_separate: true },
    { offer_code: "existing_business_run_v1", name: "Existing Business + Run", price_kind: "quote_required", currency: "USD", upfront_minor: null, monthly_minor: 29900, starting_at_minor: 149500, third_party_costs_separate: true },
  ] });
  if (state.running.enabled && url.pathname === `/api/v1/companies/${companyId}/residential-cleaning-pilot/existing-order` && req.method === "POST") {
    if (user !== "founder") return json(res, 403, { status: "error", error: "forbidden" });
    state.running.order = true;
    return json(res, 201, { order: { order_id: "order_existing_1", status: "draft", quote_id: null, priced: false } });
  }
  if (state.running.enabled && url.pathname === `/api/v1/operator/companies/${companyId}/orders/order_existing_1/release` && req.method === "POST") {
    if (user !== "operator" || req.headers["x-support-impersonation-session"] || body.grant_id !== "grant_existing_cleaning_test" || !state.running.quoteApproved) return json(res, 403, { status: "error", error: "forbidden" });
    if (body.eligibility !== "PAYMENT_DELAY_REQUIRED" || body.tax_review_state !== "TAX_REVIEW_REQUIRED") return json(res, 409, { status: "error", error: "commercial_conflict" });
    state.running.admitted = true;
    return json(res, 200, { order: { order_id: "order_existing_1", payment_eligibility: "PAYMENT_DELAY_REQUIRED" } });
  }
  if (state.running.enabled && url.pathname === "/api/v1/orders/order_existing_1" && req.method === "GET") {
    if (!state.running.order || user !== "founder" || url.searchParams.get("company_id") !== companyId) return json(res, 404, { status: "error", error: "not_found" });
    return json(res, 200, { order: { order_id: "order_existing_1", company_id: companyId, status: "draft", offer_code: "existing_business_run_v1", quote_id: state.running.quoteReady ? "quote_existing_1" : null, payment_eligibility: "PAYMENT_DELAY_REQUIRED", eligible_at: null, tax_disposition: "manual_review", total: state.running.quoteApproved ? { currency: "USD", minor_units: 199400 } : null, items: [{ product_code: "EXISTING_BUSINESS_ONBOARDING", package_name: "Scoped onboarding", billing_mode: "one_time", quantity: 1 }], updated_at: new Date().toISOString(), version: state.running.quoteApproved ? 3 : 1 } });
  }
  if (state.running.enabled && url.pathname === "/api/v1/orders/order_existing_1/quote") {
    if (!state.running.quoteReady || user !== "founder" || url.searchParams.get("company_id") !== companyId) return json(res, 404, { status: "error", error: "not_found" });
    if (req.method === "POST" && url.pathname.endsWith("/approve")) return json(res, 405, { status: "error", error: "method_not_allowed" });
    return json(res, 200, { quote: { quote_id: "quote_existing_1", order_id: "order_existing_1", status: state.running.quoteApproved ? "approved" : "proposed", upfront: { currency: "USD", minor_units: 169500 }, monthly: { currency: "USD", minor_units: 29900 }, recommendation_digest: "a".repeat(64), expires_at: new Date(Date.now() + 86_400_000).toISOString(), approved_at: state.running.quoteApproved ? new Date().toISOString() : null } });
  }
  if (state.running.enabled && url.pathname === "/api/v1/orders/order_existing_1/quote/approve" && req.method === "POST") {
    if (user !== "founder" || url.searchParams.get("company_id") !== companyId || body.quote_id !== "quote_existing_1" || body.recommendation_digest !== "a".repeat(64)) return json(res, 403, { status: "error", error: "forbidden" });
    state.running.quoteApproved = true;
    return json(res, 200, { quote: { quote_id: "quote_existing_1", status: "approved" }, order: { order_id: "order_existing_1", status: "draft" } });
  }
  if (state.running.enabled && url.pathname === "/api/v1/orders/order_existing_1/checkout" && req.method === "GET") {
    if (user !== "founder" || url.searchParams.get("company_id") !== companyId) return json(res, 404, { status: "error", error: "not_found" });
    return json(res, 200, { checkout: null });
  }
  if (url.pathname === "/api/v1/orders/order_build_1" && req.method === "GET") {
    if (!state.approved || user !== "founder" || url.searchParams.get("company_id") !== companyId) return json(res, 404, { status: "error", error: "not_found" });
    return json(res, 200, { order: { order_id: "order_build_1", company_id: companyId, status: state.orderStatus, offer_code: state.offerCode, quote_id: null, payment_eligibility: state.eligible ? "PAY_NOW_ELIGIBLE" : "PAYMENT_DELAY_REQUIRED", eligible_at: null, tax_disposition: state.taxReady ? "non_taxable" : "manual_review", total: { currency: "USD", minor_units: state.offerCode === "new_business_build_run_v1" ? 229400 : 149500 }, items: [{ product_code: "BUILD_BUSINESS", package_name: "Build My Business", billing_mode: "one_time", quantity: 1 }], updated_at: new Date().toISOString(), version: 1 } });
  }
  if (url.pathname === "/api/v1/orders/order_build_1/checkout") {
    if (!state.approved || user !== "founder" || url.searchParams.get("company_id") !== companyId) return json(res, 404, { status: "error", error: "not_found" });
    if (req.method === "GET") return json(res, 200, { checkout: state.checkoutKey ? { checkout_intent_id: "checkout_test_1", status: "open", retry_key: state.checkoutKey, redirect_url: "https://checkout.stripe.com/c/pay/fixture", created_at: new Date().toISOString() } : null });
    state.checkoutAttempts += 1;
    if (!state.eligible || !state.taxReady) return json(res, 409, { status: "error", error: "commercial_conflict", message: "payment eligibility delay is active" });
    if (state.checkoutKey && state.checkoutKey !== body.idempotency_key) return json(res, 409, { status: "error", error: "commercial_conflict", message: "idempotency collision" });
    state.checkoutKey = body.idempotency_key;
    state.orderStatus = "pending_payment";
    return json(res, 201, { checkout: { checkout_intent_id: "checkout_test_1", status: "open", retry_key: state.checkoutKey, redirect_url: "https://checkout.stripe.com/c/pay/fixture", created_at: new Date().toISOString() } });
  }
  if (url.pathname === "/api/v1/orders/order_build_1/offer" && req.method === "POST") {
    if (!state.approved || user !== "founder" || url.searchParams.get("company_id") !== companyId) return json(res, 403, { status: "error", error: "forbidden" });
    if (!["new_business_build_v1", "new_business_build_run_v1"].includes(body.offer_code)) return json(res, 400, { status: "error", error: "invalid_request" });
    state.offerCode = body.offer_code;
    return json(res, 200, { order: { order_id: "order_build_1", offer_code: state.offerCode, status: "draft" } });
  }
  if (url.pathname === "/api/v1/pilots/residential-cleaning/intakes" && req.method === "POST") {
    if (user !== "founder") return json(res, 403, { status: "error", error: "forbidden" });
    if (state.intakeKey && (body.idempotency_key !== state.intakeKey || JSON.stringify(body.intake) !== JSON.stringify(state.intakeBody))) return json(res, 409, { status: "error", error: "journey_conflict" });
    state.intakeKey = body.idempotency_key; state.intakeBody = body.intake; state.started = true;
    return json(res, 201, { journey: journey() });
  }
  if (!url.pathname.includes(companyId)) return json(res, 404, { status: "error", error: "not_found", message: "resource not found" });
  if (url.pathname.endsWith("/residential-cleaning-pilot") && req.method === "GET") { if (state.submission) state.scanReads += 1; return json(res, 200, { journey: journey() }); }
  if (url.pathname.endsWith("/build-room") && req.method === "GET") return json(res, 200, { build_room: room() });
  if (url.pathname.endsWith("/approve") && req.method === "POST") {
    if (user !== "founder") return json(res, 403, { status: "error", error: "forbidden" });
    if (state.staleOnce) { state.staleOnce = false; return json(res, 409, { status: "error", error: "journey_conflict", message: "journey state conflicts with this request" }); }
    if (!state.approved) { state.approved = true; state.orderCreates += 1; }
    return json(res, 200, { journey: journey() });
  }
  const transitionMatch = url.pathname.match(/founder-actions\/[^/]+\/(explain|launch|complete)$/);
  if (transitionMatch && req.method === "POST") {
    if (user !== "founder") return json(res, 403, { status: "error", error: "forbidden" });
    const next = { explain: "explained", launch: "linked", complete: "founder_completed" }[transitionMatch[1]];
    state.actionState = next;
    return json(res, 200, { founder_action: action() });
  }
  if (url.pathname.endsWith("/evidence-submissions") && req.method === "POST") {
    if (user !== "founder") return json(res, 403, { status: "error", error: "forbidden" });
    state.submission = { submission_id: "cleaning_submission_frontend_1", action_id: "founder_action_cleaning_entity_admin", evidence_type: body.evidence_type, source: body.source, safe_filename: body.filename ?? null, content_type: body.content_type ?? null, size_bytes: body.content_base64?.length ?? null, content_sha256: "a".repeat(64), submitted_at: new Date().toISOString(), expires_at: null, revoked: false, supersedes_submission_id: body.supersedes_submission_id ?? null };
    state.scanReads = 0;
    return json(res, 201, { evidence_submission: state.submission });
  }
  if (url.pathname.endsWith("/evidence-reviews") && req.method === "POST") {
    if (user !== "operator" || req.headers["x-support-impersonation-session"] !== supportSession) return json(res, 403, { status: "error", error: "forbidden", message: "operation is not permitted" });
    if (body.decision === "accepted") { state.verified = true; state.actionState = "verified"; }
    return json(res, 200, { evidence_review: { decision: body.decision }, founder_action: action() });
  }
  return json(res, 404, { status: "error", error: "not_found" });
});

await new Promise((resolve) => api.listen(apiPort, "127.0.0.1", resolve));
const site = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", String(sitePort), "-H", "127.0.0.1"], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
  env: {
    ...process.env,
    BUSINESS_BUILDER_API_URL: apiBase,
    BUSINESS_BUILDER_TEST_AUTH_MODE: "enabled",
    BUSINESS_BUILDER_TEST_FOUNDER_EMAIL: "founder@example.test",
    BUSINESS_BUILDER_TEST_FOUNDER_PROOF: "founder-proof",
    BUSINESS_BUILDER_TEST_FOUNDER_SESSION: founderToken,
    BUSINESS_BUILDER_TEST_OPERATOR_EMAIL: "operator@example.test",
    BUSINESS_BUILDER_TEST_OPERATOR_PROOF: "operator-proof",
    BUSINESS_BUILDER_TEST_OPERATOR_SESSION: operatorToken,
    BUSINESS_BUILDER_TEST_SUPPORT_SESSION: supportSession,
  },
});
let logs = "";
site.stdout.on("data", (chunk) => { logs += chunk; });
site.stderr.on("data", (chunk) => { logs += chunk; });

async function waitForSite() {
  for (let i = 0; i < 80; i += 1) {
    try { if ((await fetch(`${siteBase}/start`)).ok) return; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next did not start\n${logs}`);
}

const browser = await chromium.launch();
try {
  await waitForSite();
  const founder = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await founder.newPage();
  const consoleErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  await page.goto(`${siteBase}/start`, { waitUntil: "networkidle" });
  await page.getByLabel("Your name").fill("Pilot Founder");
  await page.getByLabel("Founder account email").fill("founder@example.test");
  await page.getByLabel("Working company name").fill("Clear Day Cleaning");
  await page.getByLabel("The company, in your words").fill("A reliable residential cleaning company for busy Denton households.");
  await page.getByLabel("I've started setting things up").check();
  await page.getByRole("button", { name: "Open my build" }).click();
  await page.waitForTimeout(1000); const startText = await page.locator("body").innerText(); if (!startText.includes("Authenticate before we persist the build")) throw new Error(`test auth prompt missing: ${startText}`);
  await page.getByLabel("Pilot access code").fill("founder-proof");
  await page.getByRole("button", { name: "Authenticate and open build" }).click();
  await page.waitForURL(`**/build-room/${companyId}`);
  await page.getByText("Busy Denton households", { exact: false }).waitFor();
  if (state.intakeBody.starting_point !== "started") throw new Error("starting point was not mapped");

  const duplicateBody = { intake: state.intakeBody };
  const duplicateA = await page.evaluate((body) => fetch("/api/product/journey/start", { method: "POST", headers: { "Content-Type": "application/json", "X-Tenant-ID": "forged" }, body: JSON.stringify(body) }).then((response) => response.status), duplicateBody);
  const duplicateB = await page.evaluate((body) => fetch("/api/product/journey/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((response) => response.status), duplicateBody);
  if (duplicateA !== 201 || duplicateB !== 201 || state.leakedAuthorityHeader) throw new Error("intake idempotency or forged-header boundary failed");
  const cross = await page.evaluate(() => fetch("/api/product/companies/company_other_tenant/residential-cleaning-pilot").then((response) => response.status));
  if (cross !== 404) throw new Error("cross-tenant selector did not fail closed");

  await page.getByRole("button", { name: "Approve this exact direction" }).click();
  await page.getByText("changed before this decision", { exact: false }).waitFor();
  await page.getByRole("button", { name: "Approve this exact direction" }).click();
  await page.getByText("Order order_build_1 is").waitFor();
  if (state.orderCreates !== 1) throw new Error("duplicate order created");
  await page.getByText("Active entitlements: 0").first().waitFor();
  await page.getByText("Payment delayed pending supervised", { exact: false }).waitFor();
  if (await page.getByRole("button", { name: "Open supervised test-mode checkout" }).count()) throw new Error("delayed payment was exposed as pay-now");
  await page.getByRole("button", { name: "Select Build My Business + Run" }).click();
  await page.getByText("First payment due: $2,294", { exact: false }).waitFor();
  if (state.checkoutAttempts !== 0) throw new Error("package click attempted payment");

  const card = page.locator("article").filter({ has: page.getByRole("heading", { name: "Complete the entity and administrative path" }) });
  for (const button of ["I understand this action", "Open the prepared handoff", "I completed the external step"]) {
    await card.getByRole("button", { name: button }).click();
    await page.waitForLoadState("networkidle");
  }
  await card.getByLabel("Upload supporting evidence").setInputFiles({ name: "authority.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4\nfrontend proof") });
  await card.getByRole("button", { name: "Submit immutable file" }).click();
  await card.getByText("Pending Scan", { exact: true }).waitFor();
  const selfReview = await page.evaluate((id) => fetch(`/api/product/companies/${id}/residential-cleaning-pilot/founder-actions/founder_action_cleaning_entity_admin/evidence-reviews`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idempotency_key: "founder-self-review-frontend", submission_ids: ["cleaning_submission_frontend_1"], decision: "accepted", reason_code: "forged" }) }).then((response) => response.status), companyId);
  if (selfReview !== 403) throw new Error("founder self-review was not denied");

  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Clean", { exact: true }).waitFor();
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) throw new Error(`horizontal overflow at ${width}`);
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = axe.violations.filter((item) => item.impact === "serious" || item.impact === "critical");
    if (serious.length) throw new Error(`accessibility violations at ${width}: ${serious.map((item) => item.id).join(",")}`);
    if (process.env.CHECKOUT_SHOTS_DIR) {
      await mkdir(process.env.CHECKOUT_SHOTS_DIR, { recursive: true });
      await page.locator("#order").screenshot({ path: `${process.env.CHECKOUT_SHOTS_DIR}/order-${width}.png` });
    }
  }
  // The harness changes only its authoritative backend state, never browser authority.
  state.eligible = true;
  state.taxReady = true;
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open supervised test-mode checkout" }).waitFor();
  await page.route("https://checkout.stripe.com/**", (route) => route.fulfill({
    status: 200, contentType: "text/html", body: "<html><body>Sandbox provider destination; no payment event.</body></html>",
  }));
  await page.getByRole("button", { name: "Open supervised test-mode checkout" }).click();
  await page.waitForURL("https://checkout.stripe.com/**");
  if (state.checkoutAttempts !== 1 || state.orderStatus !== "pending_payment" || journey().entitlements.length) throw new Error("checkout redirect fabricated entitlement");
  await page.goto(`${siteBase}/build-room/${companyId}`, { waitUntil: "networkidle" });
  await page.getByText("Commercial projection: order_build_1 Pending Payment", { exact: false }).waitFor();
  await page.getByText("Active entitlements: 0").first().waitFor();
  const retried = await page.evaluate(({ key, id }) => fetch(`/api/product/orders/order_build_1/checkout?company_id=${id}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idempotency_key: key }),
  }).then((response) => response.status), { key: state.checkoutKey, id: companyId });
  if (retried !== 201 || state.orderStatus !== "pending_payment") throw new Error("checkout retry was not stable");
  if (process.env.CHECKOUT_SHOTS_DIR) {
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 });
      await page.locator("#order").screenshot({ path: `${process.env.CHECKOUT_SHOTS_DIR}/order-pending-${width}.png` });
    }
  }
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Clear Day Cleaning").waitFor();
  // A second fixture covers the quote-required existing-business branch. The
  // backend repository tests, not this renderer fixture, prove authority.
  state.running.enabled = true;
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Operator-scoped recommendation", { exact: false }).waitFor({ timeout: 5000 }).catch(async () => {
    throw new Error(`running fixture did not render: ${await page.locator("body").innerText()} | ${consoleErrors.join(" | ")} | ${logs.slice(-2000)}`);
  });
  if (await page.getByRole("button", { name: "Open supervised test-mode checkout" }).count()) throw new Error("unpriced existing-business order exposed checkout");
  await page.getByRole("button", { name: "Start an unpriced scoped order" }).click();
  await page.getByText("The scoped order is unpriced", { exact: false }).waitFor();
  if (!state.running.order) throw new Error("existing-business order API mapping failed");
  state.running.quoteReady = true;
  await page.reload({ waitUntil: "networkidle" });
  await page.getByText("Exact existing-business quote", { exact: false }).waitFor();
  if (state.running.quoteApproved) throw new Error("viewing quote committed scope");
  await page.getByRole("button", { name: "Approve this exact scoped quote" }).click();
  await page.getByText("First payment due: $1,994", { exact: false }).waitFor();
  if (!state.running.quoteApproved) throw new Error("founder digest-bound quote approval API mapping failed");
  if (await page.getByRole("button", { name: "Open supervised test-mode checkout" }).count()) throw new Error("payment delay was bypassed by founder quote approval");
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 });
    if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) throw new Error(`running-business order overflow at ${width}`);
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    if (axe.violations.some((item) => ["serious", "critical"].includes(item.impact))) throw new Error(`running-business accessibility failure at ${width}`);
    if (process.env.CHECKOUT_SHOTS_DIR) await page.locator("#order").screenshot({ path: `${process.env.CHECKOUT_SHOTS_DIR}/existing-quote-${width}.png` });
  }
  state.running.enabled = false;
  await founder.close();

  const operator = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const operatorPage = await operator.newPage();
  await operatorPage.goto(`${siteBase}/login?next=/operator/reviews/${companyId}`);
  await operatorPage.getByLabel("Email").fill("operator@example.test");
  await operatorPage.getByLabel("Test session proof").fill("operator-proof");
  await operatorPage.getByRole("button", { name: "Open test session" }).click();
  await operatorPage.waitForURL(`**/operator/reviews/${companyId}`);
  await operatorPage.getByText("Operator evidence review").waitFor();
  await operatorPage.getByRole("group", { name: "Evidence in this decision" }).getByRole("checkbox").check();
  await operatorPage.getByRole("button", { name: "Record immutable review" }).click();
  await operatorPage.getByText("Verification: Verified").waitFor();
  await operatorPage.getByRole("heading", { name: "Ready" }).locator("..").getByText("Not yet").waitFor();
  state.running.enabled = true;
  await operatorPage.reload({ waitUntil: "networkidle" });
  await operatorPage.getByRole("heading", { name: "Appointed operator: commercial admission" }).waitFor();
  for (const width of [375, 768, 1440]) {
    await operatorPage.setViewportSize({ width, height: width === 375 ? 812 : width === 768 ? 1024 : 900 });
    if (await operatorPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) throw new Error(`operator admission overflow at ${width}`);
    const axe = await new AxeBuilder({ page: operatorPage }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    if (axe.violations.some((item) => ["serious", "critical"].includes(item.impact))) throw new Error(`operator admission accessibility failure at ${width}`);
    if (process.env.CHECKOUT_SHOTS_DIR) await operatorPage.locator("#order").screenshot({ path: `${process.env.CHECKOUT_SHOTS_DIR}/operator-admission-${width}.png` });
  }
  await operatorPage.setViewportSize({ width: 768, height: 1024 });
  await operatorPage.getByLabel("Commercial appointment ID").fill("grant_existing_cleaning_test");
  await operatorPage.getByLabel("Opaque review/decision reference").fill("supervised_render_fixture_decision");
  await operatorPage.getByRole("button", { name: "Record expiring operator decision" }).click();
  await operatorPage.getByText("PAYMENT_DELAY_REQUIRED", { exact: false }).waitFor();
  if (!state.running.admitted) throw new Error("operator BFF commercial route sent support impersonation or failed to map release");
  state.running.enabled = false;
  await operator.close();

  const unexpectedConsoleErrors = consoleErrors.filter((message) => !message.startsWith("Failed to load resource:"));
  if (unexpectedConsoleErrors.length) throw new Error(`browser console errors: ${unexpectedConsoleErrors.join(" | ")}`);
  console.log("Flagship integration proof passed: intake, auth, idempotency, stale approval, draft order, evidence, operator review, Verification, and rendered fixed/quote-required order states at 375/768/1440. Backend authority is proved separately.");
} finally {
  await browser.close();
  site.kill();
  api.close();
  await Promise.race([once(site, "exit"), new Promise((resolve) => setTimeout(resolve, 2000))]);
}
