import { authenticatedBackendFetch, passthrough } from "@/lib/businessBuilder/server";
import { sameOriginMutation } from "@/lib/businessBuilder/auth";

export const dynamic = "force-dynamic";

const ID = "[A-Za-z0-9_-]{1,128}";
const ACTION = "founder_action_cleaning_[A-Za-z0-9_-]{1,100}";
const SUBMISSION = "cleaning_submission_[A-Za-z0-9_-]{1,100}";
const ALLOWED = [
  /^(me|organizations|memberships|companies|orders|subscriptions|entitlements|pricing)$/,
  new RegExp(`^orders/${ID}(?:/(?:offer|checkout|quote(?:/approve)?))?$`),
  new RegExp(`^companies/${ID}$`),
  new RegExp(`^companies/${ID}/(build-room|founder-actions|readiness)$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot(?:/approve)?$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot/existing-business-audit$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot/existing-order$`),
  new RegExp(`^operator/companies/${ID}/residential-cleaning/existing-scope$`),
  new RegExp(`^operator/companies/${ID}/orders/${ID}/(?:quote|release)$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot/support-grants$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot/founder-actions/${ACTION}(?:/(?:explain|launch|complete))?$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot/founder-actions/${ACTION}/evidence-submissions(?:/${SUBMISSION}(?:/access)?)?$`),
  new RegExp(`^companies/${ID}/residential-cleaning-pilot/founder-actions/${ACTION}/evidence-reviews$`),
];

function permitted(path: string): boolean {
  return ALLOWED.some((pattern) => pattern.test(path));
}

async function forward(request: Request, context: { params: Promise<{ path: string[] }> }, method: "GET" | "POST") {
  if (method === "POST" && !sameOriginMutation(request)) return Response.json({ status: "error", error: "forbidden" }, { status: 403 });
  const { path: parts } = await context.params;
  const path = parts.join("/");
  if (!permitted(path)) return Response.json({ status: "error", error: "not_found" }, { status: 404 });
  const incoming = new URL(request.url);
  const query = new URLSearchParams();
  if (["orders", "subscriptions", "entitlements"].includes(path) || path.startsWith("orders/")) {
    const company = incoming.searchParams.getAll("company_id");
    if (company.length === 1 && new RegExp(`^${ID}$`).test(company[0])) query.set("company_id", company[0]);
  }
  const target = `/api/v1/${path}${query.size ? `?${query}` : ""}`;
  let body: string | undefined;
  if (method === "POST") {
    body = await request.text();
    if (body.length > 780_000) return Response.json({ status: "error", error: "request_too_large" }, { status: 413 });
  }
  const upstream = await authenticatedBackendFetch(target, {
    method,
    body,
    headers: body ? { "Content-Type": "application/json" } : undefined,
  }, { includeSupportImpersonation: !path.startsWith("operator/") });
  return passthrough(upstream);
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, context, "GET");
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, context, "POST");
}
