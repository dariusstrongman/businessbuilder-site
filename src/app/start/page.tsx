import type { Metadata } from "next";
import { StartForm } from "./StartForm";
import { packages, type PackageId } from "@/content/packages";
import { startingPoints, type StartingPointId } from "@/content/startingPoints";
import { authConfigured } from "@/lib/businessBuilder/auth";

export const metadata: Metadata = {
  title: "Start a build",
  description: "Describe the company you want. We come back with research and a recommendation before anything is built.",
};

type Search = { idea?: string; package?: string; from?: string; resume?: string };

const packageIds = new Set(packages.map((p) => p.id));

export default async function StartPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { idea = "", package: pkg, from, resume } = await searchParams;
  const selected: PackageId = pkg && packageIds.has(pkg as PackageId) ? (pkg as PackageId) : "business";
  const packageId: PackageId = selected === "run" ? "run" : "business";
  const fromId = startingPoints.some((p) => p.id === from) ? (from as StartingPointId) : undefined;
  return <StartForm defaultIdea={idea} defaultPackage={packageId} defaultFrom={fromId} productionAuth={authConfigured()} resume={resume === "1"} />;
}
