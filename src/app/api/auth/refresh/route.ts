import { cookies } from "next/headers";
import {
  PROVIDER_REFRESH_COOKIE,
  cognitoConfig,
  establishBusinessBuilderSession,
  providerCookieOptions,
  refreshProviderTokens,
  sameOriginMutation,
  sessionCookieOptions,
} from "@/lib/businessBuilder/auth";
import { CUSTOMER_SESSION_COOKIE, SUPPORT_SESSION_COOKIE } from "@/lib/businessBuilder/server";

export async function POST(request: Request) {
  if (!sameOriginMutation(request)) return Response.json({ status: "error", error: "forbidden" }, { status: 403 });
  const jar = await cookies();
  const current = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  const refresh = jar.get(PROVIDER_REFRESH_COOKIE)?.value;
  if (!current || !refresh) return Response.json({ status: "error", error: "unauthenticated" }, { status: 401 });
  try {
    const config = cognitoConfig(request.url);
    const provider = await refreshProviderTokens(config, refresh);
    const session = await establishBusinessBuilderSession(provider.accessToken, current);
    jar.set(CUSTOMER_SESSION_COOKIE, session.token, sessionCookieOptions(request.url, session.expiresAt));
    if (provider.refreshToken) jar.set(PROVIDER_REFRESH_COOKIE, provider.refreshToken, providerCookieOptions(request.url));
    jar.delete(SUPPORT_SESSION_COOKIE);
    return Response.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    jar.delete(CUSTOMER_SESSION_COOKIE);
    jar.delete(PROVIDER_REFRESH_COOKIE);
    jar.delete(SUPPORT_SESSION_COOKIE);
    return Response.json({ status: "error", error: "unauthenticated" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
}
