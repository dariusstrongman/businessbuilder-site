import http from "node:http";
import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const sitePort = 4320, providerPort = 4321, apiPort = 4322;
const siteBase = `http://localhost:${sitePort}`;
const providerBase = `http://127.0.0.1:${providerPort}`;
const apiBase = `http://127.0.0.1:${apiPort}`;
const clientId = "production-auth-approved-harness";
const codes = new Map();
const state = { sessions: new Map(), sequence: 0, refreshes: 0, revocations: 0, supportStarts: 0 };

function json(res, status, body) { const value = JSON.stringify(body); res.writeHead(status, { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(value) }); res.end(value); }
function jwt(payload) { return `header.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.signature`; }
function providerTokens(nonce, refresh = true) {
  const marker = `provider-access-token-${++state.sequence}-${"x".repeat(40)}`;
  return { access_token: marker, id_token: jwt({ aud: clientId, token_use: "id", exp: Math.floor(Date.now() / 1000) + 600, ...(nonce ? { nonce } : {}) }), ...(refresh ? { refresh_token: `provider-refresh-${state.sequence}-${"r".repeat(40)}` } : {}) };
}

const provider = http.createServer(async (req, res) => {
  const url = new URL(req.url, providerBase);
  if (["/oauth2/authorize", "/signup"].includes(url.pathname)) {
    const code = `code-${codes.size + 1}`;
    codes.set(code, { challenge: url.searchParams.get("code_challenge"), nonce: url.searchParams.get("nonce"), redirect: url.searchParams.get("redirect_uri"), state: url.searchParams.get("state"), used: false });
    const action = `${url.searchParams.get("redirect_uri")}?code=${code}&state=${url.searchParams.get("state")}`;
    const label = url.pathname === "/signup" ? "Verify email and create account" : "Verify identity and log in";
    res.writeHead(200, { "Content-Type": "text/html" }); res.end(`<main><h1>${url.pathname === "/signup" ? "Create founder account" : "Secure login"}</h1><p>Email verification required.</p><a href="${action}">${label}</a></main>`); return;
  }
  if (url.pathname === "/forgotPassword") { res.writeHead(200, { "Content-Type": "text/html" }); res.end("<main><h1>Recover account</h1><p>If an account can be recovered, instructions will be sent through the verified provider channel.</p></main>"); return; }
  if (url.pathname === "/logout") { res.writeHead(302, { Location: url.searchParams.get("logout_uri") }); res.end(); return; }
  const chunks = []; for await (const chunk of req) chunks.push(chunk); const form = new URLSearchParams(Buffer.concat(chunks).toString());
  if (url.pathname === "/oauth2/token" && form.get("grant_type") === "authorization_code") {
    const item = codes.get(form.get("code"));
    const challenge = createHash("sha256").update(form.get("code_verifier") || "").digest("base64url");
    if (!item || item.used || item.challenge !== challenge || item.redirect !== form.get("redirect_uri")) return json(res, 400, { error: "invalid_grant" });
    item.used = true; return json(res, 200, providerTokens(item.nonce));
  }
  if (url.pathname === "/oauth2/token" && form.get("grant_type") === "refresh_token") { state.refreshes += 1; return json(res, 200, providerTokens(null)); }
  if (url.pathname === "/oauth2/revoke") { state.revocations += 1; res.writeHead(200); res.end(); return; }
  res.writeHead(404); res.end();
});

const api = http.createServer(async (req, res) => {
  const url = new URL(req.url, apiBase); const chunks = []; for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString(); const body = raw ? JSON.parse(raw) : {}; const bearer = String(req.headers.authorization || "").replace(/^Bearer /, "");
  if (url.pathname === "/api/v1/auth/sessions" && req.method === "POST") { const token = `business-session-${++state.sequence}`; state.sessions.set(token, true); return json(res, 201, { session_token: token, session: { expires_at: new Date(Date.now() + 15 * 60_000).toISOString() }, user: { email_verified: true } }); }
  if (url.pathname === "/api/v1/auth/sessions/rotate" && req.method === "POST") { if (!state.sessions.get(bearer)) return json(res, 401, { error: "unauthorized" }); state.sessions.set(bearer, false); const token = `business-session-${++state.sequence}`; state.sessions.set(token, true); return json(res, 200, { session_token: token, session: { expires_at: new Date(Date.now() + 15 * 60_000).toISOString() }, user: { email_verified: true } }); }
  if (url.pathname === "/api/v1/auth/sessions/revoke" && req.method === "POST") { state.sessions.set(bearer, false); return json(res, 200, { revoked: true }); }
  if (!state.sessions.get(bearer)) return json(res, 401, { status: "error", error: "unauthorized" });
  if (url.pathname === "/api/v1/me") return json(res, 200, { user: { user_id: "user_provider_founder", email: "founder@example.test", email_verified: true, status: "active" } });
  if (url.pathname === "/api/v1/memberships") return json(res, 200, { memberships: [{ membership_id: "membership_owner", organization_id: "organization_founder", role: "owner", status: "active" }] });
  if (url.pathname === "/api/v1/companies") return json(res, 200, { companies: [] });
  if (url.pathname === "/api/v1/auth/support-sessions" && body.grant_id === "grant_scoped_company") { state.supportStarts += 1; return json(res, 201, { support_session_id: "support_session_scoped", company_id: "company_cleaning", expires_at: new Date(Date.now() + 300_000).toISOString() }); }
  return json(res, 404, { status: "error", error: "not_found" });
});

await Promise.all([new Promise(r => provider.listen(providerPort, "127.0.0.1", r)), new Promise(r => api.listen(apiPort, "127.0.0.1", r))]);
const site = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "-p", String(sitePort), "-H", "127.0.0.1"], { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, BUSINESS_BUILDER_API_URL: apiBase, BUSINESS_BUILDER_AUTH_PROVIDER: "cognito", BUSINESS_BUILDER_AUTH_EMULATOR: "enabled", COGNITO_DOMAIN: providerBase, COGNITO_APP_CLIENT_ID: clientId, COGNITO_REDIRECT_URI: `${siteBase}/api/auth/callback`, COGNITO_LOGOUT_URI: `${siteBase}/login?logged_out=1`, BUSINESS_BUILDER_AUTH_COOKIE_SIGNING_KEY: "approved-test-cookie-signing-key-32-bytes-minimum" } });
let logs = ""; site.stdout.on("data", c => logs += c); site.stderr.on("data", c => logs += c);
for (let i = 0; i < 100; i++) { try { if ((await fetch(`${siteBase}/login`)).ok) break; } catch {} await new Promise(r => setTimeout(r, 200)); if (i === 99) throw new Error(logs); }

const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } }); const page = await context.newPage();
  await context.addCookies([{ name: "bb_customer_session", value: "attacker-fixed-session", domain: "localhost", path: "/", httpOnly: true, sameSite: "Strict" }]);
  await page.goto(`${siteBase}/login?next=/build-room`); await page.getByRole("button", { name: "Create founder account" }).click();
  await page.getByRole("heading", { name: "Create founder account" }).waitFor(); await page.getByRole("link", { name: "Verify email and create account" }).click();
  await page.waitForURL("**/build-room"); await page.waitForTimeout(1000); const roomText = await page.locator("body").innerText(); if (!roomText.includes("No residential-cleaning build exists")) throw new Error(`authenticated Build Room entry failed: ${page.url()} :: ${roomText}`);
  const authCookie = (await context.cookies()).find(c => c.name === "bb_customer_session"); if (!authCookie?.httpOnly || authCookie.value === "attacker-fixed-session") throw new Error("session fixation/cookie hardening failed");
  const disabledTestAdapter = await page.evaluate(() => fetch("/api/product/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "forged@example.test", proof: "forged" }) }).then(r => r.status)); if (disabledTestAdapter !== 503) throw new Error("test login adapter was enabled beside production auth");
  const crossTenant = await page.evaluate(() => fetch("/api/product/companies/company_other_tenant").then(r => r.status)); if (crossTenant !== 404) throw new Error("cross-tenant session replay leaked company state");
  const csrfCookies = (await context.cookies()).map(item => `${item.name}=${item.value}`).join("; "); const csrf = await fetch(`${siteBase}/api/auth/refresh`, { method: "POST", headers: { Origin: "https://forged.invalid", Cookie: csrfCookies, "Sec-Fetch-Site": "cross-site" } }).then(r => r.status); if (csrf !== 403) throw new Error("CSRF boundary failed");
  const old = authCookie.value; const refresh = await page.evaluate(() => fetch("/api/auth/refresh", { method: "POST" }).then(r => r.status)); if (refresh !== 200 || state.sessions.get(old) !== false || state.refreshes !== 1) throw new Error("rotation failed");
  await page.goto(`${siteBase}/operator/access`); await page.getByLabel("Scoped support grant").fill("grant_scoped_company"); await page.getByLabel("Review reason").fill("Supervised evidence review"); await page.getByRole("button", { name: "Start scoped review session" }).click(); await page.waitForURL("**/operator/reviews/company_cleaning"); if (state.supportStarts !== 1) throw new Error("support grant path failed");
  await page.goto(`${siteBase}/recover`); await page.getByRole("link", { name: "Continue to secure recovery" }).click(); await page.getByText("If an account can be recovered", { exact: false }).waitFor();
  await page.goto(`${siteBase}/build-room`); const current = (await context.cookies()).find(c => c.name === "bb_customer_session")?.value; const loggedOut = await page.evaluate(() => fetch("/api/auth/logout", { method: "POST" }).then(r => r.json())); if (!loggedOut.logged_out) throw new Error("logout failed");
  if (current) { await context.addCookies([{ name: "bb_customer_session", value: current, domain: "localhost", path: "/", httpOnly: true, sameSite: "Strict" }]); const replay = await page.goto(`${siteBase}/api/product/session`); if (replay.status() !== 401) throw new Error("revoked session reuse accepted"); }
  await page.goto(`${siteBase}/login`); const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze(); if (axe.violations.some(v => ["serious", "critical"].includes(v.impact))) throw new Error("auth accessibility failure");
  if (process.env.AUTH_HARNESS_SHOTS_DIR) {
    await mkdir(process.env.AUTH_HARNESS_SHOTS_DIR, { recursive: true });
    for (const [name, url, width, height] of [["login-375", "/login", 375, 812], ["recovery-768", "/recover", 768, 1024], ["operator-1440", "/operator/access", 1440, 900]]) {
      await page.setViewportSize({ width, height }); await page.goto(siteBase + url, { waitUntil: "networkidle" }); await page.screenshot({ path: `${process.env.AUTH_HARNESS_SHOTS_DIR}/${name}.png`, fullPage: true });
      if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) throw new Error(`horizontal overflow at ${name}`);
    }
  }
  console.log("Production auth harness passed: signup/verified identity, PKCE, fixation resistance, rotation, CSRF, scoped support, recovery, logout/revocation, and accessibility.");
  if (process.env.AUTH_HARNESS_KEEP_OPEN === "enabled") await new Promise(() => {});
} finally { await browser.close(); site.kill(); provider.close(); api.close(); await Promise.race([once(site, "exit"), new Promise(r => setTimeout(r, 2000))]); }
