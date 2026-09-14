import { authenticatedBackendFetch, passthrough, stableIntakeKey } from "@/lib/businessBuilder/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 32_000) {
    return Response.json({ status: "error", error: "request_too_large" }, { status: 413 });
  }
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  }
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).some((key) => key !== "intake")) {
    return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  }
  const intake = (value as { intake?: unknown }).intake;
  if (!intake || typeof intake !== "object" || Array.isArray(intake)) {
    return Response.json({ status: "error", error: "invalid_request" }, { status: 400 });
  }
  const body = JSON.stringify({ idempotency_key: stableIntakeKey(intake), intake });
  const upstream = await authenticatedBackendFetch("/api/v1/pilots/residential-cleaning/intakes", {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });
  return passthrough(upstream);
}
