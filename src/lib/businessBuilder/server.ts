import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const CUSTOMER_SESSION_COOKIE = "bb_customer_session";
export const SUPPORT_SESSION_COOKIE = "bb_support_session";
const REQUEST_ID = /^[A-Za-z0-9._:-]{1,128}$/;

export function backendBaseUrl(): string {
  const configured = process.env.BUSINESS_BUILDER_API_URL ?? "http://127.0.0.1:8080";
  const parsed = new URL(configured);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("BUSINESS_BUILDER_API_URL must be HTTP(S)");
  return parsed.origin;
}

export function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function stableIntakeKey(body: unknown): string {
  const canonical = canonicalJson(body);
  return `flagship-intake-${createHash("sha256").update(canonical).digest("hex").slice(0, 32)}`;
}

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export async function authenticatedBackendFetch(
  path: string, init: RequestInit = {},
  options: { includeSupportImpersonation?: boolean } = {},
): Promise<Response> {
  const jar = await cookies();
  const token = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) {
    return Response.json(
      { status: "error", error: "unauthenticated", message: "Sign in to continue." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }
  const requestId = trustedRequestId(init.headers && new Headers(init.headers).get("x-request-id"));
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("X-Request-ID", requestId);
  headers.set("X-Correlation-ID", headers.get("X-Correlation-ID") || requestId);
  const support = jar.get(SUPPORT_SESSION_COOKIE)?.value;
  if (support && options.includeSupportImpersonation !== false) headers.set("X-Support-Impersonation-Session", support);

  try {
    return await fetch(new URL(path, backendBaseUrl()), {
      ...init,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
  } catch {
    return Response.json(
      { status: "error", error: "backend_unavailable", message: "The Build Room is temporarily unavailable. Retrying is safe." },
      { status: 503, headers: { "Cache-Control": "no-store", "X-Request-ID": requestId } },
    );
  }
}

export function passthrough(response: Response): Response {
  const headers = new Headers({
    "Content-Type": response.headers.get("content-type") || "application/json",
    "Cache-Control": "no-store",
  });
  for (const name of ["x-request-id", "x-correlation-id", "allow"]) {
    const value = response.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new Response(response.body, { status: response.status, headers });
}

function trustedRequestId(value: string | null | undefined): string {
  if (value && REQUEST_ID.test(value)) return value;
  return `site_${crypto.randomUUID()}`;
}
