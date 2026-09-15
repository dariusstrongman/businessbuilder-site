"use server";

import { existingStart, packages, type StartPackageId } from "@/content/packages";

export type StartState = {
  status: "idle" | "error" | "received";
  message?: string;
  idea?: string;
  packageId?: StartPackageId;
  /** Echoed back so a validation error does not wipe what was typed. */
  name?: string;
  email?: string;
  from?: string;
};

const packageIds = new Set<string>([...packages.map((p) => p.id), existingStart.id]);

/**
 * Validates an intake. This is the seam between the marketing site and the product.
 *
 * IT PERSISTS NOTHING AND SENDS NOTHING. There is no database, no mail service and
 * no deploy target configured, so there is nowhere durable to put a submission. The
 * confirmation screen in StartForm says so plainly, and must keep saying so until
 * this function actually writes somewhere that survives the request. Do not restore
 * "your build is opened" copy before that is true.
 */
export async function startBuild(_prev: StartState, form: FormData): Promise<StartState> {
  const idea = String(form.get("idea") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const pkg = String(form.get("package") ?? "");
  const from = String(form.get("from") ?? "") || undefined;
  const echo = { idea, name, email, from, packageId: packageIds.has(pkg) ? (pkg as StartPackageId) : undefined };

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
      message: "That does not look like a working email address.",
    };
  }
  if (!echo.packageId) {
    return { ...echo, status: "error", message: "Choose a package to start from. You can change it later." };
  }

  return { status: "received", idea, packageId: echo.packageId, name, email, from };
}
