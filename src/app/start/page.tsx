import type { Metadata } from "next";
import { StartForm } from "./StartForm";
import { packages, type PackageId } from "@/content/packages";

export const metadata: Metadata = {
  title: "Start a build",
  description: "Describe the company you want. We come back with research and a recommendation before anything is built.",
};

type Search = { idea?: string; package?: string };

const packageIds = new Set(packages.map((p) => p.id));

export default async function StartPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { idea = "", package: pkg } = await searchParams;
  const packageId: PackageId = pkg && packageIds.has(pkg as PackageId) ? (pkg as PackageId) : "business";
  return <StartForm defaultIdea={idea} defaultPackage={packageId} />;
}
