/**
 * Design studies.
 *
 * These are original studies made by the studio, not client work and not
 * businesses we have built. They exist to show the level of craft a build
 * gets. Every description says what the study demonstrates, so the page is
 * about capability rather than a borrowed reputation.
 */

export type Study = {
  slug: string;
  name: string;
  discipline: string;
  /** The line that carried the study. */
  line: string;
  premise: string;
  /** What a founder should take from it. */
  demonstrates: string[];
  /** How it maps to the service businesses we build for. */
  transfer: string;
  image: string;
  width: number;
  height: number;
  /** Visual weight in the editorial grid. */
  scale: "wide" | "tall" | "standard";
  tone: "warm" | "cool" | "neutral";
};

export const studies: Study[] = [
  {
    slug: "field",
    name: "FIELD",
    discipline: "Botanical rituals",
    line: "A little more you time.",
    premise: "A small-batch skincare label with one idea: the product is an excuse to slow down.",
    demonstrates: [
      "Photography carrying the entire hero, with type sitting inside it rather than above it",
      "A serif italic holding the emotional half of the line while the sans holds the plain half",
      "A deep, committed colour that never appears anywhere else on the page",
    ],
    transfer:
      "The same discipline runs a mobile detailing site: one strong photograph of finished work, one clear promise, and nothing competing with either.",
    image: "/studies/botanical-product.webp",
    width: 1536,
    height: 1024,
    scale: "wide",
    tone: "warm",
  },
  {
    slug: "arc-house",
    name: "ARC House",
    discipline: "Residential architecture",
    line: "Spaces for the life within.",
    premise: "A practice that builds quiet houses, and wanted a site that behaved the same way.",
    demonstrates: [
      "Restraint as the loudest choice on the page",
      "A type scale with real distance between its steps, so hierarchy needs no colour",
      "Image as a calm ground rather than a decoration",
    ],
    transfer:
      "This is the register for a painting or carpet cleaning company that wants to read as careful rather than cheap.",
    image: "/studies/arc-house.webp",
    width: 1586,
    height: 992,
    scale: "standard",
    tone: "neutral",
  },
  {
    slug: "form-01",
    name: "FORM / 01",
    discipline: "Movement studio",
    line: "Feel more.",
    premise: "A studio for people who are tired of being shouted at by fitness brands.",
    demonstrates: [
      "High-contrast colour used once, at full strength, instead of everywhere at half",
      "Display type large enough to be the image",
      "Energy built from composition rather than from noise",
    ],
    transfer:
      "The same approach suits a junk removal or pressure washing company: one loud, confident move, and everything else kept quiet.",
    image: "/studies/form-01.webp",
    width: 1586,
    height: 992,
    scale: "tall",
    tone: "cool",
  },
  {
    slug: "out-there",
    name: "OUT THERE",
    discipline: "Seasonal campaign",
    line: "Out there.",
    premise: "A campaign built to survive being seen on a phone, outdoors, in one second.",
    demonstrates: [
      "Full-bleed landscape with the smallest possible overlay",
      "A message that still lands when the image is cropped to a square",
      "Type weight chosen for legibility over a moving background",
    ],
    transfer:
      "Directly useful for a lawn care or window cleaning company whose customers find them on a phone, one-handed, mid-errand.",
    image: "/studies/outdoor-campaign.webp",
    width: 1536,
    height: 1024,
    scale: "standard",
    tone: "cool",
  },
  {
    slug: "clarity",
    name: "CLARITY",
    discipline: "Material study",
    line: "Your next chapter.",
    premise: "A study in glass and light, made to test how far colour can carry a page on its own.",
    demonstrates: [
      "Gradation in the photograph doing the work a gradient usually does badly",
      "A light typographic hand over a busy image",
      "Colour as structure rather than as accent",
    ],
    transfer:
      "The reason a photography and videography build can hold a portfolio without the layout fighting the work.",
    image: "/studies/clarity-glass.webp",
    width: 1672,
    height: 941,
    scale: "standard",
    tone: "cool",
  },
];

export const studiesCopy = {
  eyebrow: "Design studies",
  title: "This is the level of craft, not a template.",
  lead: "Five original studies from the studio. They are not clients and not companies we have built, and we will never pretend otherwise. They are here because you are about to pay for design, and you deserve to see whether we can do it before you decide.",
  disclosure:
    "Original work by this studio. Fictional brands, made to test ideas. No client is represented here.",
};
