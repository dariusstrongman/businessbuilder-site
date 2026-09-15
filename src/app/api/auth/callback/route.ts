import { cookies } from "next/headers";
import {
  AUTH_TRANSACTION_COOKIE,
  PROVIDER_REFRESH_COOKIE,
  cognitoConfig,
  establishBusinessBuilderSession,
  exchangeAuthorizationCode,
  providerCookieOptions,
  readAuthTransaction,
  sessionCookieOptions,
} from "@/lib/businessBuilder/auth";
import { CUSTOMER_SESSION_COOKIE, SUPPORT_SESSION_COOKIE } from "@/lib/businessBuilder/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const jar = await cookies();
  const transactionCookie = jar.get(AUTH_TRANSACTION_COOKIE)?.value;
  jar.delete(AUTH_TRANSACTION_COOKIE);
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code") ?? "";
    const state = url.searchParams.get("state") ?? "";
    if (!transactionCookie || !code || code.length > 2048 || state.length > 200) throw new Error("invalid callback");
    const config = cognitoConfig(request.url);
    const transaction = readAuthTransaction(transactionCookie, config.cookieKey);
    if (transaction.state !== state || transaction.redirectUri !== config.redirectUri) throw new Error("state mismatch");
    const provider = await exchangeAuthorizationCode(config, transaction, code);
    if (!provider.refreshToken) throw new Error("provider refresh token missing");
    const session = await establishBusinessBuilderSession(provider.accessToken);
    jar.set(CUSTOMER_SESSION_COOKIE, session.token, sessionCookieOptions(request.url, session.expiresAt));
    jar.set(PROVIDER_REFRESH_COOKIE, provider.refreshToken, providerCookieOptions(request.url));
    jar.delete(SUPPORT_SESSION_COOKIE);
    return Response.redirect(new URL(transaction.next, request.url));
  } catch {
    jar.delete(CUSTOMER_SESSION_COOKIE);
    jar.delete(PROVIDER_REFRESH_COOKIE);
    jar.delete(SUPPORT_SESSION_COOKIE);
    return Response.redirect(new URL("/login?auth_error=callback", request.url));
  }
}
