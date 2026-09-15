import type { Metadata } from "next";
import { JourneyWorkspace } from "../../../build-room/JourneyWorkspace";

export const metadata: Metadata = { title: "Evidence review" };

export default async function OperatorReviewPage({ params }: { params: Promise<{ companyId: string }> }) {
  const { companyId } = await params;
  return <JourneyWorkspace companyId={companyId} operatorMode />;
}
