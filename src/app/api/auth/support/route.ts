import { cookies } from "next/headers";
import { sameOriginMutation, secureCookie } from "@/lib/businessBuilder/auth";
import { backendBaseUrl, CUSTOMER_SESSION_COOKIE, SUPPORT_SESSION_COOKIE } from "@/lib/businessBuilder/server";

export async function POST(request: Request) {
  if (!sameOriginMutation(request)) return Response.json({ status: "error", error: "forbidden" }, { status: 403 });
  const raw = await request.text();
  if (raw.length > 2048) return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return Response.json({ status: "error", error: "invalid_request" }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  const values = body as Record<string, unknown>;
  if (Object.keys(values).some((key) => !["grant_id", "reason"].includes(key))) return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  const grantId = typeof values.grant_id === "string" ? values.grant_id : "";
  const reason = typeof values.reason === "string" ? values.reason : "";
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(grantId) || !reason.trim() || reason.length > 500) return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  const jar = await cookies();
  const session = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!session) return Response.json({ status: "error", error: "unauthenticated" }, { status: 401 });
  try {
    const upstream = await fetch(new URL("/api/v1/auth/support-sessions", backendBaseUrl()), {
      method: "POST",
      headers: { Authorization: `Bearer ${session}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ grant_id: grantId, reason: reason.trim() }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstream.ok) return Response.json({ status: "error", error: "not_permitted", message: "An active matching support grant is required." }, { status: upstream.status });
    const result = await upstream.json() as { support_session_id?: string; expires_at?: string; company_id?: string };
    if (!result.support_session_id || !result.expires_at) throw new Error("invalid support session");
    jar.set(SUPPORT_SESSION_COOKIE, result.support_session_id, {
      httpOnly: true,
      secure: secureCookie(request.url),
      sameSite: "strict",
      path: "/",
      expires: new Date(result.expires_at),
      priority: "high",
    });
    return Response.json({ active: true, company_id: result.company_id, expires_at: result.expires_at }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ status: "error", error: "backend_unavailable" }, { status: 503 });
  }
}
