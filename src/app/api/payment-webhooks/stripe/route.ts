import { backendBaseUrl, passthrough } from "@/lib/businessBuilder/server";

export const dynamic = "force-dynamic";

const MAX_WEBHOOK_BYTES = 1024 * 1024;

async function boundedBody(request: Request): Promise<ArrayBuffer | null> {
  if (!request.body) return new ArrayBuffer(0);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_WEBHOOK_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body.buffer as ArrayBuffer;
}

export async function POST(request: Request): Promise<Response> {
  const signature = request.headers.get("stripe-signature");
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") return Response.json({ status: "error", error: "unsupported_media_type" }, { status: 415 });
  if (!signature || signature.length > 1024 || /[\r\n]/.test(signature)) {
    return Response.json({ status: "error", error: "invalid_webhook" }, { status: 400 });
  }
  const length = Number(request.headers.get("content-length"));
  if (Number.isFinite(length) && length > MAX_WEBHOOK_BYTES) {
    return Response.json({ status: "error", error: "request_too_large" }, { status: 413 });
  }
  const body = await boundedBody(request);
  if (body === null) return Response.json({ status: "error", error: "request_too_large" }, { status: 413 });
  try {
    const response = await fetch(new URL("/api/v1/payment-webhooks/stripe", backendBaseUrl()), {
      method: "POST",
      headers: { "Content-Type": "application/json", "Stripe-Signature": signature },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    return passthrough(response);
  } catch {
    return Response.json({ status: "error", error: "backend_unavailable" }, { status: 503 });
  }
}
