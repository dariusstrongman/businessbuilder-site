import type { ApiFailureBody } from "./types";

export class ProductApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly requestId: string | null,
  ) {
    super(message);
  }
}

export async function productRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/api/product/${path.replace(/^\/+/, "")}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });
  const value = (await response.json().catch(() => ({
    status: "error",
    error: "invalid_backend_response",
  }))) as T | ApiFailureBody;
  if (!response.ok) {
    const failure = value as ApiFailureBody;
    throw new ProductApiError(
      response.status,
      failure.error || "request_failed",
      failure.message || "Business Builder could not complete the request.",
      response.headers.get("x-request-id"),
    );
  }
  return value as T;
}

export function newCommandKey(scope: string): string {
  const nonce = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `flagship-${scope}-${nonce}`.replace(/[^A-Za-z0-9._:-]/g, "-").slice(0, 160);
}

export async function sha256Hex(value: ArrayBuffer | string): Promise<string> {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((part) => part.toString(16).padStart(2, "0")).join("");
}
