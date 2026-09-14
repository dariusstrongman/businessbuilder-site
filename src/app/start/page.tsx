import type { Metadata } from "next";
import { StartForm } from "./StartForm";
import { packages, type PackageId } from "@/content/packages";
import { websiteTiers } from "@/content/websiteTiers";

export const metadata: Metadata = {
  title: "Start a build",
  description: "Describe the company you want. We come back with research and a recommendation before anything is built.",
};

type Search = { idea?: string; package?: string; tier?: string };

const packageIds = new Set(packages.map((p) => p.id));

export default async function StartPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { idea = "", package: pkg, tier } = await searchParams;
  const packageId: PackageId = pkg && packageIds.has(pkg as PackageId) ? (pkg as PackageId) : "business";
  const tierId = websiteTiers.some((t) => t.id === tier) ? tier : undefined;
  return <StartForm defaultIdea={idea} defaultPackage={packageId} defaultTier={tierId} />;
}
