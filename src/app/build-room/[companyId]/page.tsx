import type { Metadata } from "next";
import { JourneyWorkspace } from "../JourneyWorkspace";

export const metadata: Metadata = { title: "Build Room" };

export default async function CompanyBuildRoomPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  return <JourneyWorkspace companyId={companyId} />;
}
