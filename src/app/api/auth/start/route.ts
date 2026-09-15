import { cookies } from "next/headers";
import { AUTH_TRANSACTION_COOKIE, beginAuth, cognitoConfig } from "@/lib/businessBuilder/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const rawIntent = url.searchParams.get("intent") ?? "login";
    const intent = rawIntent === "signup" || rawIntent === "recovery" ? rawIntent : "login";
    const config = cognitoConfig(request.url);
    const started = beginAuth(config, intent, url.searchParams.get("next") ?? "/build-room");
    const response = Response.redirect(started.authorization);
    (await cookies()).set(AUTH_TRANSACTION_COOKIE, started.cookie, {
      httpOnly: true,
      secure: new URL(request.url).protocol === "https:",
      sameSite: "lax",
      path: "/api/auth/callback",
      maxAge: 10 * 60,
      priority: "high",
    });
    return response;
  } catch {
    return Response.redirect(new URL("/login?auth_error=unavailable", request.url));
  }
}
