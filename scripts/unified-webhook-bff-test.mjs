import http from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";

const sitePort = 4410;
const apiPort = 4411;
const rawEvent = Buffer.from('{"id":"evt_isolated_sandbox_test"}');
const signature = "t=1234567890,v1=fixture_signature_not_a_secret";
let forwarded = 0;
const api = http.createServer(async (request, response) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const body = Buffer.concat(chunks);
  if (request.url !== "/api/v1/payment-webhooks/stripe" || request.method !== "POST") throw new Error("wrong upstream route");
  if (request.headers.authorization || request.headers["x-tenant-id"] || request.headers["x-company-id"]) throw new Error("browser authority leaked into webhook");
  if (request.headers["stripe-signature"] !== signature || !body.equals(rawEvent)) throw new Error("signed raw body changed in BFF");
  forwarded++;
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end('{"received":true,"applied":true}');
});

await new Promise((resolve) => api.listen(apiPort, "127.0.0.1", resolve));
const site = spawn("npm", ["run", "dev", "--", "--port", String(sitePort)], {
  shell: process.platform === "win32",
  env: { ...process.env, BUSINESS_BUILDER_API_URL: `http://127.0.0.1:${apiPort}` },
  stdio: ["ignore", "ignore", "pipe"],
});
let siteErrors = "";
site.stderr.on("data", (chunk) => { siteErrors += chunk.toString().slice(0, 800); });

try {
  const deadline = Date.now() + 30_000;
  let ready = false;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${sitePort}/login`);
      if (response.ok) { ready = true; break; }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error(`test site unavailable: ${siteErrors.slice(0, 200)}`);
  const url = `http://127.0.0.1:${sitePort}/api/payment-webhooks/stripe`;
  const accepted = await fetch(url, {
    method: "POST", headers: { "Content-Type": "application/json", "Stripe-Signature": signature }, body: rawEvent,
  });
  if (accepted.status !== 200 || forwarded !== 1) throw new Error("raw webhook was not forwarded exactly once");
  const missing = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: rawEvent });
  const malformed = await fetch(url, { method: "POST", headers: { "Content-Type": "text/plain", "Stripe-Signature": signature }, body: rawEvent });
  const oversized = await fetch(url, {
    method: "POST", headers: { "Content-Type": "application/json", "Stripe-Signature": signature },
    body: Buffer.alloc(1024 * 1024 + 1),
  });
  const wrongMethod = await fetch(url);
  if (missing.status !== 400 || malformed.status !== 415 || oversized.status !== 413 || wrongMethod.status !== 405 || forwarded !== 1) {
    throw new Error("webhook strict-method/body/signature controls failed");
  }
  console.log(JSON.stringify({ status: "passed", raw_body_preserved: true, browser_authority_forwarded: false,
    missing_signature_denied: true, malformed_media_denied: true, oversized_body_denied: true, strict_method: true }));
} finally {
  if (process.platform === "win32") {
    spawn("taskkill", ["/PID", String(site.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    site.kill("SIGTERM");
  }
  api.close();
  await once(api, "close");
}
