import { Hero } from "@/components/sections/home/Hero";
import { Fragmentation } from "@/components/sections/home/Fragmentation";
import { Assembly } from "@/components/sections/home/Assembly";
import { Journey } from "@/components/sections/home/Journey";
import { BuildRoomSection } from "@/components/sections/home/BuildRoomSection";
import { BuiltNotGenerated } from "@/components/sections/home/BuiltNotGenerated";
import { FounderActions } from "@/components/sections/home/FounderActions";
import { Verification } from "@/components/sections/home/Verification";
import { Handoff } from "@/components/sections/home/Handoff";
import { BuildAndRun } from "@/components/sections/home/BuildAndRun";
import { Ownership } from "@/components/sections/home/Ownership";
import { Businesses } from "@/components/sections/home/Businesses";
import { Packages } from "@/components/sections/home/Packages";
import { Trust } from "@/components/sections/home/Trust";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Fragmentation />
      <Assembly />
      <Journey />
      <BuildRoomSection />
      <BuiltNotGenerated />
      <FounderActions />
      <Verification />
      <Handoff />
      <BuildAndRun />
      <Ownership />
      <Businesses />
      <Packages />
      <Trust />
      <CtaBand />
    </>
  );
}
