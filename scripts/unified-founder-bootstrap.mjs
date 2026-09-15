import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const site = process.env.COGNITO_PILOT_SITE ?? "https://d3qncwxo58gn5b.cloudfront.net";
const marker = process.env.UNIFIED_PILOT_MARKER ?? "unified0915";
const identities = JSON.parse(execFileSync("aws", [
  "secretsmanager", "get-secret-value", "--region", "us-east-1", "--secret-id",
  "businessbuilder-pilot-auth-identities-v1", "--query", "SecretString", "--output", "text",
], { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }));

async function login(page, identity) {
  await page.goto(`${site}/api/auth/start?intent=login&next=/start`, { waitUntil: "domcontentloaded" });
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
      method, cache: "no-store",
      headers: body === null ? undefined : { "Content-Type": "application/json" },
      body: body === null ? undefined : JSON.stringify(body),
    });
    return { status: response.status, body: await response.json() };
  }, { path, method, body });
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const result = { auth: "pending", companies: {} };

try {
  const operatorContext = await browser.newContext();
  const operatorPage = await operatorContext.newPage();
  try {
    await login(operatorPage, identities.operator);
    const operatorSession = await product(operatorPage, "session");
    if (operatorSession.status !== 200 || !operatorSession.body.authenticated || !operatorSession.body.user?.email_verified) {
      throw new Error("real Cognito operator identity unavailable");
    }
    result.operator_user_id = operatorSession.body.user.user_id;
  } finally {
    await operatorContext.close();
  }
  await login(page, identities.founder);
  const session = await product(page, "session");
  if (session.status !== 200 || !session.body.authenticated || session.body.user?.email_verified !== true) {
    throw new Error("real verified Cognito founder session unavailable");
  }
  const owner = session.body.memberships?.find((item) => item.role === "owner" && item.status === "active");
  if (!owner) throw new Error("server-derived OWNER membership unavailable");
  result.auth = "real_cognito_verified_owner";
  result.founder_user_id = session.body.user.user_id;

  for (const scenario of [
    { key: "business", from: "idea", package: "business", name: `Pilot Cleaning Build ${marker}` },
    { key: "business_run", from: "idea", package: "run", name: `Pilot Cleaning Run ${marker}` },
    { key: "existing_run", from: "running", package: "run", name: `Pilot Cleaning Existing ${marker}` },
  ]) {
    await page.goto(`${site}/start?from=${scenario.from}&package=${scenario.package}`, { waitUntil: "networkidle" });
    await page.getByLabel("The company, in your words").fill(`A supervised Denton residential cleaning pilot for ${scenario.name}, using test-only commercial state.`);
    await page.getByLabel("Your name").fill("Pilot Founder");
    await page.getByLabel("Working company name").fill(scenario.name);
    await page.getByRole("button", { name: "Open my build" }).click();
    await page.waitForURL(/\/build-room\/[^/]+$/, { timeout: 45_000 });
    const companyId = decodeURIComponent(new URL(page.url()).pathname.split("/").pop());
    let journey = await product(page, `companies/${companyId}/residential-cleaning-pilot`);
    if (journey.status !== 200 || journey.body.journey?.company?.company_id !== companyId) throw new Error(`${scenario.key}: persisted company unavailable`);
    if (journey.body.journey.intake.data.starting_point !== scenario.from) throw new Error(`${scenario.key}: starting point not persisted`);
    const research = journey.body.journey.research?.data;
    const recommendation = journey.body.journey.recommendation?.data;
    if (!research?.sources?.length || !research.findings?.some((finding) => finding.source_ids?.length)
      || !recommendation?.target_customer || !recommendation.service_area || !recommendation.offers?.length
      || !recommendation.starting_price_logic || !recommendation.positioning || !recommendation.risks?.length
      || !recommendation.startup_admin_requirements?.length || !recommendation.recommended_systems?.length) {
      throw new Error(`${scenario.key}: persisted research/recommendation incomplete`);
    }
    if (journey.body.journey.verification.ready !== false || journey.body.journey.verification.fully_set !== false) {
      throw new Error(`${scenario.key}: Verification was bypassed`);
    }
    if (journey.body.journey.scope_commit.approval_state !== "granted") {
      await page.getByRole("button", { name: "Approve this exact direction" }).click();
      await page.getByText("Scope approved").first().waitFor({ state: "visible", timeout: 45_000 });
    }
    journey = await product(page, `companies/${companyId}/residential-cleaning-pilot`);
    if (journey.body.journey.scope_commit.approval_state !== "granted") throw new Error(`${scenario.key}: founder digest-bound approval missing`);
    if (scenario.key !== "existing_run" && !journey.body.journey.order?.order_id) throw new Error(`${scenario.key}: approved pending build order missing`);
    if (scenario.key !== "existing_run" && (journey.body.journey.order.status !== "draft"
      || journey.body.journey.entitlements.length !== 0)) {
      throw new Error(`${scenario.key}: founder approval faked payment or entitlement`);
    }
    if (scenario.key === "existing_run") {
      const audit = await product(page, `companies/${companyId}/residential-cleaning-pilot/existing-business-audit`, "POST", {
        systems: [
          { system: "website", assessment: "improve", issue: "Current lead form needs supervised delivery testing.", provider_reference: null },
          { system: "inbox", assessment: "missing", issue: "A separate business inbox has not been authorized.", provider_reference: null },
        ],
      });
      if (audit.status !== 201 && audit.status !== 200) throw new Error(`existing audit capture failed (${audit.status})`);
      journey = await product(page, `companies/${companyId}/residential-cleaning-pilot`);
      if (!journey.body.journey.existing_business_audit || journey.body.journey.order) {
        throw new Error("existing audit was not persisted separately from pricing");
      }
    }
    const support = await product(page, `companies/${companyId}/residential-cleaning-pilot/support-grants`, "POST", {
      support_user_id: result.operator_user_id,
      reason: "I authorize scoped review of the supervised sandbox commercial pilot",
      duration_minutes: 480,
    });
    if (support.status !== 201 || support.body.company_id !== companyId || !support.body.grant_id) {
      throw new Error(`${scenario.key}: founder-approved company support grant failed (${support.status})`);
    }
    result.companies[scenario.key] = {
      company_id: companyId, order_id: journey.body.journey.order?.order_id ?? null,
      support_grant_id: support.body.grant_id, starting_point: scenario.from,
      research_sources: research.sources.length, approval: "granted",
      ready: false, fully_set: false,
    };
  }
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
