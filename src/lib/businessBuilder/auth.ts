import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { backendBaseUrl } from "./server";

export const AUTH_TRANSACTION_COOKIE = "bb_auth_transaction";
export const PROVIDER_REFRESH_COOKIE = "bb_provider_refresh";

type AuthIntent = "login" | "signup" | "recovery";
type AuthTransaction = {
  state: string;
  verifier: string;
  nonce: string;
  intent: AuthIntent;
  next: string;
  redirectUri: string;
  expiresAt: number;
};

export type CognitoConfig = {
  domain: URL;
  clientId: string;
  redirectUri: string;
  logoutUri: string;
  cookieKey: string;
  emulator: boolean;
};

export function authConfigured(): boolean {
  return process.env.BUSINESS_BUILDER_AUTH_PROVIDER === "cognito";
}

export function cognitoConfig(requestUrl: string): CognitoConfig {
  if (!authConfigured()) throw new Error("production authentication is not configured");
  const emulator = process.env.BUSINESS_BUILDER_AUTH_EMULATOR === "enabled" && process.env.NODE_ENV !== "production";
  const rawDomain = process.env.COGNITO_DOMAIN ?? "";
  const clientId = process.env.COGNITO_APP_CLIENT_ID ?? "";
  const cookieKey = process.env.BUSINESS_BUILDER_AUTH_COOKIE_SIGNING_KEY ?? "";
  if (!rawDomain || !clientId || cookieKey.length < 32) throw new Error("production authentication is incomplete");
  const domain = new URL(rawDomain);
  if (domain.protocol !== "https:" && !(emulator && domain.protocol === "http:")) {
    throw new Error("Cognito domain must use HTTPS");
  }
  const origin = new URL(requestUrl).origin;
  const redirectUri = process.env.COGNITO_REDIRECT_URI || `${origin}/api/auth/callback`;
  const logoutUri = process.env.COGNITO_LOGOUT_URI || `${origin}/login?logged_out=1`;
  for (const value of [redirectUri, logoutUri]) {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && !(emulator && parsed.protocol === "http:")) {
      throw new Error("authentication callback URLs must use HTTPS");
    }
  }
  return { domain, clientId, redirectUri, logoutUri, cookieKey, emulator };
}

export function beginAuth(config: CognitoConfig, intent: AuthIntent, next: string) {
  const transaction: AuthTransaction = {
    state: randomBytes(32).toString("base64url"),
    verifier: randomBytes(48).toString("base64url"),
    nonce: randomBytes(32).toString("base64url"),
    intent,
    next: safeNext(next),
    redirectUri: config.redirectUri,
    expiresAt: Date.now() + 10 * 60_000,
  };
  const challenge = createHash("sha256").update(transaction.verifier).digest("base64url");
  const path = intent === "signup" ? "/signup" : intent === "recovery" ? "/forgotPassword" : "/oauth2/authorize";
  const authorization = new URL(path, config.domain);
  authorization.search = new URLSearchParams({
    client_id: config.clientId,
    response_type: "code",
    scope: "openid email profile",
    redirect_uri: config.redirectUri,
    state: transaction.state,
    nonce: transaction.nonce,
    code_challenge_method: "S256",
    code_challenge: challenge,
  }).toString();
  return { authorization, cookie: seal(transaction, config.cookieKey) };
}

export function readAuthTransaction(value: string, key: string): AuthTransaction {
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) throw new Error("invalid authentication transaction");
  const expected = createHmac("sha256", key).update(encoded).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) throw new Error("invalid authentication transaction");
  const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AuthTransaction;
  if (
    !parsed || typeof parsed.state !== "string" || typeof parsed.verifier !== "string"
    || typeof parsed.nonce !== "string" || !["login", "signup", "recovery"].includes(parsed.intent)
    || parsed.expiresAt <= Date.now() || parsed.redirectUri.length > 500
  ) throw new Error("expired authentication transaction");
  return parsed;
}

export async function exchangeAuthorizationCode(config: CognitoConfig, transaction: AuthTransaction, code: string) {
  const tokenUrl = new URL("/oauth2/token", config.domain);
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      grant_type: "authorization_code", client_id: config.clientId, code,
      redirect_uri: transaction.redirectUri, code_verifier: transaction.verifier,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  return checkedTokenResponse(response, config, transaction.nonce);
}

export async function refreshProviderTokens(config: CognitoConfig, refreshToken: string) {
  const response = await fetch(new URL("/oauth2/token", config.domain), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({ grant_type: "refresh_token", client_id: config.clientId, refresh_token: refreshToken }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  return checkedTokenResponse(response, config);
}

export async function establishBusinessBuilderSession(accessToken: string, currentSession?: string) {
  const path = currentSession ? "/api/v1/auth/sessions/rotate" : "/api/v1/auth/sessions";
  const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
  if (currentSession) headers.Authorization = `Bearer ${currentSession}`;
  const response = await fetch(new URL(path, backendBaseUrl()), {
    method: "POST", headers, body: JSON.stringify({ access_token: accessToken }),
    cache: "no-store", signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("Business Builder rejected the provider identity");
  const body = await response.json() as { session_token?: string; session?: { expires_at?: string }; user?: { email_verified?: boolean } };
  if (!body.session_token || !body.session?.expires_at || body.user?.email_verified !== true) {
    throw new Error("Business Builder returned an invalid session");
  }
  return { token: body.session_token, expiresAt: new Date(body.session.expires_at) };
}

export async function revokeProviderToken(config: CognitoConfig, refreshToken: string) {
  try {
    await fetch(new URL("/oauth2/revoke", config.domain), {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token: refreshToken, client_id: config.clientId }),
      cache: "no-store", signal: AbortSignal.timeout(10_000),
    });
  } catch { /* Local logout still fails closed if the provider is unavailable. */ }
}

export function managedLogoutUrl(config: CognitoConfig): string {
  const value = new URL("/logout", config.domain);
  value.search = new URLSearchParams({ client_id: config.clientId, logout_uri: config.logoutUri }).toString();
  return value.toString();
}

export function sameOriginMutation(request: Request): boolean {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (!origin || fetchSite === "cross-site") return false;
  try {
    const supplied = new URL(origin);
    const host = request.headers.get("host") || new URL(request.url).host;
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",", 1)[0]?.trim();
    const protocol = forwardedProtocol ? `${forwardedProtocol}:` : new URL(request.url).protocol;
    return supplied.host === host && supplied.protocol === protocol;
  } catch { return false; }
}

export function sessionCookieOptions(requestUrl: string, expires: Date) {
  return { httpOnly: true, secure: new URL(requestUrl).protocol === "https:", sameSite: "lax" as const, path: "/", expires, priority: "high" as const };
}

export function providerCookieOptions(requestUrl: string) {
  return { httpOnly: true, secure: new URL(requestUrl).protocol === "https:", sameSite: "strict" as const, path: "/api/auth", maxAge: 30 * 24 * 60 * 60, priority: "high" as const };
}

function seal(value: AuthTransaction, key: string): string {
  const encoded = Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encoded}.${createHmac("sha256", key).update(encoded).digest("base64url")}`;
}

function safeNext(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") && value.length <= 500 ? value : "/build-room";
}

async function checkedTokenResponse(response: Response, config: CognitoConfig, expectedNonce?: string) {
  if (!response.ok) throw new Error("provider token exchange failed");
  const body = await response.json() as Record<string, unknown>;
  const accessToken = typeof body.access_token === "string" ? body.access_token : "";
  const idToken = typeof body.id_token === "string" ? body.id_token : "";
  const refreshToken = typeof body.refresh_token === "string" ? body.refresh_token : undefined;
  if (!accessToken || accessToken.length > 16_384 || !idToken || idToken.length > 16_384) throw new Error("provider token response invalid");
  const claims = jwtPayload(idToken);
  const now = Math.floor(Date.now() / 1000);
  if (claims.aud !== config.clientId || claims.token_use !== "id" || typeof claims.exp !== "number" || claims.exp <= now) {
    throw new Error("provider identity token scope invalid");
  }
  if (expectedNonce && claims.nonce !== expectedNonce) throw new Error("provider nonce mismatch");
  return { accessToken, refreshToken };
}

function jwtPayload(value: string): Record<string, unknown> {
  const parts = value.split(".");
  if (parts.length !== 3) throw new Error("provider identity token malformed");
  const parsed = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("provider identity token malformed");
  return parsed as Record<string, unknown>;
}
