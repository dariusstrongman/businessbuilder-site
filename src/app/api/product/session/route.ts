import { cookies } from "next/headers";
import {
  backendBaseUrl,
  CUSTOMER_SESSION_COOKIE,
  passthrough,
  safeEqual,
  SUPPORT_SESSION_COOKIE,
} from "@/lib/businessBuilder/server";

export const dynamic = "force-dynamic";

function unavailable() {
  return Response.json(
    {
      status: "error",
      error: "authentication_not_configured",
      message: "Founder authentication is not configured for this environment.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}

export async function GET() {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) {
    return Response.json(
      { status: "error", error: "unauthenticated", message: "Sign in to continue." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }
  const headers: Record<string, string> = { Authorization: `Bearer ${token}`, Accept: "application/json" };
  const support = jar.get(SUPPORT_SESSION_COOKIE)?.value;
  if (support) headers["X-Support-Impersonation-Session"] = support;
  try {
    const [me, memberships] = await Promise.all([
      fetch(new URL("/api/v1/me", backendBaseUrl()), { headers, cache: "no-store", signal: AbortSignal.timeout(10_000) }),
      fetch(new URL("/api/v1/memberships", backendBaseUrl()), { headers, cache: "no-store", signal: AbortSignal.timeout(10_000) }),
    ]);
    if (!me.ok || !memberships.ok) {
      jar.delete(CUSTOMER_SESSION_COOKIE);
      jar.delete(SUPPORT_SESSION_COOKIE);
      return passthrough(!me.ok ? me : memberships);
    }
    const [identity, scopes] = await Promise.all([me.json(), memberships.json()]);
    return Response.json(
      { authenticated: true, user: identity.user, memberships: scopes.memberships },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { status: "error", error: "backend_unavailable", message: "Authentication could not be checked. Retrying is safe." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production" || process.env.BUSINESS_BUILDER_TEST_AUTH_MODE !== "enabled") {
    return unavailable();
  }
  const raw = await request.text();
  if (raw.length > 4096) return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  }
  const values = body as Record<string, unknown>;
  if (Object.keys(values).some((key) => !["email", "proof"].includes(key))) {
    return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  }
  const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
  const proof = typeof values.proof === "string" ? values.proof : "";
  const candidates = [
    {
      email: process.env.BUSINESS_BUILDER_TEST_FOUNDER_EMAIL ?? "",
      proof: process.env.BUSINESS_BUILDER_TEST_FOUNDER_PROOF ?? "",
      token: process.env.BUSINESS_BUILDER_TEST_FOUNDER_SESSION ?? "",
      support: "",
    },
    {
      email: process.env.BUSINESS_BUILDER_TEST_OPERATOR_EMAIL ?? "",
      proof: process.env.BUSINESS_BUILDER_TEST_OPERATOR_PROOF ?? "",
      token: process.env.BUSINESS_BUILDER_TEST_OPERATOR_SESSION ?? "",
      support: process.env.BUSINESS_BUILDER_TEST_SUPPORT_SESSION ?? "",
    },
  ];
  const selected = candidates.find(
    (candidate) =>
      candidate.email &&
      candidate.proof &&
      candidate.token &&
      safeEqual(email, candidate.email.toLowerCase()) &&
      safeEqual(proof, candidate.proof),
  );
  if (!selected) {
    return Response.json(
      { status: "error", error: "unauthorized", message: "The session proof was not accepted." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }
  const upstreamHeaders: Record<string, string> = {
    Authorization: `Bearer ${selected.token}`,
    Accept: "application/json",
  };
  if (selected.support) upstreamHeaders["X-Support-Impersonation-Session"] = selected.support;
  try {
    const checked = await fetch(new URL("/api/v1/me", backendBaseUrl()), {
      headers: upstreamHeaders,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!checked.ok) return passthrough(checked);
    const jar = await cookies();
    const options = {
      httpOnly: true,
      secure: new URL(request.url).protocol === "https:",
      sameSite: "strict" as const,
      path: "/",
      maxAge: 60 * 60 * 12,
    };
    jar.set(CUSTOMER_SESSION_COOKIE, selected.token, options);
    if (selected.support) jar.set(SUPPORT_SESSION_COOKIE, selected.support, options);
    else jar.delete(SUPPORT_SESSION_COOKIE);
    return Response.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json(
      { status: "error", error: "backend_unavailable", message: "Authentication could not be checked. Retrying is safe." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(CUSTOMER_SESSION_COOKIE);
  jar.delete(SUPPORT_SESSION_COOKIE);
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
