import type { Metadata } from "next";
import { BuildRoomIndex } from "./BuildRoomIndex";

export const metadata: Metadata = { title: "Your Build Room" };

export default function BuildRoomPage() {
  return <BuildRoomIndex />;
}
