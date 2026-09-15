import type { Metadata } from "next";
import { StartForm } from "./StartForm";
import { existingStart, packages, type StartPackageId } from "@/content/packages";
import { startingPoints, type StartingPointId } from "@/content/startingPoints";

export const metadata: Metadata = {
  title: "Start a build",
  description: "Describe the company you want. We come back with research and a recommendation before anything is built.",
};

type Search = { idea?: string; package?: string; from?: string };

const packageIds = new Set<string>([...packages.map((p) => p.id), existingStart.id]);

export default async function StartPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { idea = "", package: pkg, from } = await searchParams;
  const packageId: StartPackageId = pkg && packageIds.has(pkg) ? (pkg as StartPackageId) : "business";
  const fromId = startingPoints.some((p) => p.id === from) ? (from as StartingPointId) : undefined;
  return <StartForm defaultIdea={idea} defaultPackage={packageId} defaultFrom={fromId} />;
}
