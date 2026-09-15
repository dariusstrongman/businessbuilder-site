import { cookies } from "next/headers";
import {
  PROVIDER_REFRESH_COOKIE,
  cognitoConfig,
  managedLogoutUrl,
  revokeProviderToken,
  sameOriginMutation,
} from "@/lib/businessBuilder/auth";
import { backendBaseUrl, CUSTOMER_SESSION_COOKIE, SUPPORT_SESSION_COOKIE } from "@/lib/businessBuilder/server";

export async function POST(request: Request) {
  if (!sameOriginMutation(request)) return Response.json({ status: "error", error: "forbidden" }, { status: 403 });
  const jar = await cookies();
  const session = jar.get(CUSTOMER_SESSION_COOKIE)?.value;
  const refresh = jar.get(PROVIDER_REFRESH_COOKIE)?.value;
  let logoutUrl = "/login?logged_out=1";
  try {
    const config = cognitoConfig(request.url);
    logoutUrl = managedLogoutUrl(config);
    if (refresh) await revokeProviderToken(config, refresh);
    if (session) {
      await fetch(new URL("/api/v1/auth/sessions/revoke", backendBaseUrl()), {
        method: "POST",
        headers: { Authorization: `Bearer ${session}`, "Content-Type": "application/json" },
        body: "{}",
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
    }
  } catch { /* Local cookies are always cleared. */ }
  jar.delete(CUSTOMER_SESSION_COOKIE);
  jar.delete(PROVIDER_REFRESH_COOKIE);
  jar.delete(SUPPORT_SESSION_COOKIE);
  return Response.json({ logged_out: true, logout_url: logoutUrl }, { headers: { "Cache-Control": "no-store" } });
}
