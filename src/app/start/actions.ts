"use server";

import { packages, type PackageId } from "@/content/packages";

export type StartState = {
  status: "idle" | "error" | "received";
  message?: string;
  idea?: string;
  packageId?: PackageId;
  /** Echoed back so a validation error does not wipe what was typed. */
  name?: string;
  email?: string;
  tier?: string;
};

const packageIds = new Set(packages.map((p) => p.id));

/**
 * Receives an intake. This is the seam between the marketing site and the product:
 * wire it to the account-creation flow when the product backend is available.
 * Until then it validates and acknowledges without persisting anything.
 */
export async function startBuild(_prev: StartState, form: FormData): Promise<StartState> {
  const idea = String(form.get("idea") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const pkg = String(form.get("package") ?? "");
  const tier = String(form.get("tier") ?? "") || undefined;
  const echo = { idea, name, email, tier, packageId: packageIds.has(pkg as PackageId) ? (pkg as PackageId) : undefined };

  if (idea.length < 12) {
    return {
      ...echo,
      status: "error",
      message: "Tell us a little more about the company. A sentence is enough: what you do and roughly where.",
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ...echo,
      status: "error",
      message: "We need a working email address to send the research and recommendation to.",
    };
  }
  if (!echo.packageId) {
    return { ...echo, status: "error", message: "Choose a package to start from. You can change it later." };
  }

  return { status: "received", idea, packageId: echo.packageId, name, email, tier };
}
