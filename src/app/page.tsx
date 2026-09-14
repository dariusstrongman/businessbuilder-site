import { Hero } from "@/components/sections/home/Hero";
import { StartingPoints } from "@/components/sections/home/StartingPoints";
import { Fragmentation } from "@/components/sections/home/Fragmentation";
import { Assembly } from "@/components/sections/home/Assembly";
import { Journey } from "@/components/sections/home/Journey";
import { BuildRoomSection } from "@/components/sections/home/BuildRoomSection";
import { BuiltNotGenerated } from "@/components/sections/home/BuiltNotGenerated";
import { Studies } from "@/components/sections/home/Studies";
import { FounderActions } from "@/components/sections/home/FounderActions";
import { Verification } from "@/components/sections/home/Verification";
import { Handoff } from "@/components/sections/home/Handoff";
import { BuildAndRun } from "@/components/sections/home/BuildAndRun";
import { Businesses } from "@/components/sections/home/Businesses";
import { Packages } from "@/components/sections/home/Packages";
import { Trust } from "@/components/sections/home/Trust";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StartingPoints />
      <Fragmentation />
      <Assembly />
      <Journey />
      <BuildRoomSection />
      <BuiltNotGenerated />
      <Studies />
      <FounderActions />
      <Verification />
      <Handoff />
      <BuildAndRun />
      <Businesses />
      <Packages />
      <Trust />
      <CtaBand />
    </>
  );
}
