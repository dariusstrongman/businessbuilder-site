"use server";

import { existingStart, packages, type StartPackageId } from "@/content/packages";

export type StartState = {
  status: "idle" | "error" | "received";
  message?: string;
  idea?: string;
  packageId?: StartPackageId;
  from?: string;
};

const packageIds = new Set<string>([...packages.map((p) => p.id), existingStart.id]);

/**
 * Validates an intake. This is the seam between the marketing site and the product.
 *
 * IT PERSISTS NOTHING AND SENDS NOTHING, so it deliberately does not accept a name
 * or an email address. There is nowhere durable to put them, and collecting contact
 * details only to discard them is worse than not collecting them.
 *
 * The durable path already exists on the production founder auth branch, which posts
 * the intake to the backend behind an authenticated session. It needs a live API URL
 * and Cognito configuration, so it lands with that branch rather than here.
 *
 * When it lands: restore the contact fields, restore the confirmation copy, and
 * delete this note. Not before.
 */
export async function startBuild(_prev: StartState, form: FormData): Promise<StartState> {
  const idea = String(form.get("idea") ?? "").trim();
  const pkg = String(form.get("package") ?? "");
  const from = String(form.get("from") ?? "") || undefined;
  const echo = { idea, from, packageId: packageIds.has(pkg) ? (pkg as StartPackageId) : undefined };

  if (idea.length < 12) {
    return {
      ...echo,
      status: "error",
      message: "Tell us a little more about the company. A sentence is enough: what you do and roughly where.",
    };
  }
  if (!echo.packageId) {
    return { ...echo, status: "error", message: "Choose a package to start from. You can change it later." };
  }

  return { status: "received", idea, packageId: echo.packageId, from };
}
