/**
 * Design studies.
 *
 * Each study is a rendered website, not a photograph. The layout, type, palette
 * and copy below are the design; the image is the photography inside it. They
 * are original studies made by this studio, not client work and not businesses
 * we have built.
 *
 * The palettes live here rather than in tokens.css on purpose: a study's colour
 * is content, not a system value. Each one is passed into the mock as custom
 * properties and never leaks into the rest of the site.
 */

export type StudyLayout = "overlay" | "split" | "display";

export type StudyPalette = {
  /** Behind the hero type. */
  ink: string;
  /** Type on the hero. */
  paper: string;
  /** The one accent, used on the hero. */
  accent: string;
  /** The band under the hero. */
  band: string;
  bandInk: string;
  /** The accent again, retuned to clear AA against the band. */
  bandAccent: string;
};

export type Study = {
  slug: string;
  name: string;
  discipline: string;
  layout: StudyLayout;
  palette: StudyPalette;

  /** The rendered page's own content. */
  site: {
    wordmark: string;
    tagline: string;
    nav: string[];
    eyebrow: string;
    /** Headline in two halves: the plain one and the serif italic one. */
    headPlain: string;
    headItalic: string;
    sub: string[];
    cta: string;
    /** Small print along the bottom of the hero. */
    footLeft: string;
    footRight: string;
    /** The band beneath the hero. */
    bandHead: string;
    bandBody: string;
    bandCta: string;
  };

  /** What a founder should take from it. */
  demonstrates: string[];
  /** How it maps to the service businesses we build for. */
  transfer: string;

  image: string;
  width: number;
  height: number;
  /** Visual weight in the editorial grid. */
  scale: "wide" | "standard";
};

export const studies: Study[] = [
  {
    slug: "field",
    name: "FIELD",
    discipline: "Botanical rituals",
    layout: "overlay",
    palette: {
      ink: "#4a0f16",
      paper: "#f6e7dd",
      accent: "#e8a883",
      band: "#efe2d4",
      bandInk: "#4a0f16",
      bandAccent: "#8a3d22",
    },
    site: {
      wordmark: "FIELD",
      tagline: "Botanical rituals",
      nav: ["The collection", "Our approach", "Explore"],
      eyebrow: "Less hurry. More you.",
      headPlain: "A little more",
      headItalic: "you time.",
      sub: ["Everyday rituals.", "A moment to make your own."],
      cta: "Explore the collection",
      footLeft: "The art of taking a moment",
      footRight: "FIELD / 01",
      bandHead: "Make room for a ritual.",
      bandBody: "Thoughtful objects. Simple rituals. A little space in the day that belongs entirely to you.",
      bandCta: "Discover FIELD",
    },
    demonstrates: [
      "Type set inside the photograph rather than stacked above it",
      "A serif italic carrying the emotional half of the line while the sans carries the plain half",
      "One deep colour, committed to, and never repeated elsewhere on the page",
    ],
    transfer:
      "The same discipline runs a mobile detailing site: one strong photograph of finished work, one clear promise, nothing competing with either.",
    image: "/studies/botanical-product.webp",
    width: 1536,
    height: 1024,
    scale: "wide",
  },
  {
    slug: "arc-house",
    name: "ARC House",
    discipline: "Residential architecture",
    layout: "split",
    palette: {
      ink: "#e9e6df",
      paper: "#23231f",
      accent: "#5f5138",
      band: "#23231f",
      bandInk: "#e9e6df",
      bandAccent: "#c7b08a",
    },
    site: {
      wordmark: "ARC",
      tagline: "House",
      nav: ["Projects", "Practice", "Contact"],
      eyebrow: "Residential architecture",
      headPlain: "Spaces for",
      headItalic: "the life within.",
      sub: ["Houses built quietly,", "for the way you actually live."],
      cta: "See the projects",
      footLeft: "Established practice",
      footRight: "ARC / 04",
      bandHead: "Every house begins with a walk around the site.",
      bandBody: "We start with light, wind and the view you did not know you had. Drawings come later.",
      bandCta: "How we work",
    },
    demonstrates: [
      "Restraint used as the loudest choice on the page",
      "A type scale with real distance between its steps, so hierarchy needs no colour",
      "A held-back split where the image is given room instead of being cropped to fit",
    ],
    transfer:
      "This is the register for a painting or carpet cleaning company that wants to read as careful rather than cheap.",
    image: "/studies/arc-house.webp",
    width: 1586,
    height: 992,
    scale: "standard",
  },
  {
    slug: "form-01",
    name: "FORM / 01",
    discipline: "Movement studio",
    layout: "display",
    palette: {
      ink: "#0f1f3d",
      paper: "#f2f4f8",
      accent: "#f2c14b",
      band: "#f2f4f8",
      bandInk: "#0f1f3d",
      bandAccent: "#7d5a0d",
    },
    site: {
      wordmark: "FORM",
      tagline: "01",
      nav: ["Classes", "Timetable", "Membership"],
      eyebrow: "Reformer. Strength. Breath.",
      headPlain: "Feel",
      headItalic: "more.",
      sub: ["Small classes.", "Nobody shouting."],
      cta: "Book a first class",
      footLeft: "Studio hours 06:00 to 20:00",
      footRight: "FORM / 01",
      bandHead: "Twelve people. One instructor. No mirrors.",
      bandBody: "Classes are capped so the person at the front can actually see you, and correct you.",
      bandCta: "See the timetable",
    },
    demonstrates: [
      "Display type large enough to become the image itself",
      "High-contrast colour used once at full strength instead of everywhere at half",
      "Energy built from composition rather than from noise",
    ],
    transfer:
      "The same approach suits a junk removal or pressure washing company: one loud, confident move, everything else kept quiet.",
    image: "/studies/form-01.webp",
    width: 1586,
    height: 992,
    scale: "standard",
  },
  {
    slug: "out-there",
    name: "OUT THERE",
    discipline: "Seasonal campaign",
    layout: "overlay",
    palette: {
      ink: "#12242c",
      paper: "#f4f6f5",
      accent: "#d8e04a",
      band: "#12242c",
      bandInk: "#f4f6f5",
      bandAccent: "#d8e04a",
    },
    site: {
      wordmark: "OUT THERE",
      tagline: "Season 03",
      nav: ["The kit", "Trails", "Stories"],
      eyebrow: "Made for weather you did not plan for",
      headPlain: "Out",
      headItalic: "there.",
      sub: ["Three layers.", "Everything else stays home."],
      cta: "See the season",
      footLeft: "Tested on the coast path",
      footRight: "S/03",
      bandHead: "It should work before you have thought about it.",
      bandBody: "Pockets where your hands already are. Hoods that stay up. Nothing you have to learn.",
      bandCta: "Read the field notes",
    },
    demonstrates: [
      "A full-bleed landscape carrying the page with the smallest possible overlay",
      "A message that still lands when the image is cropped to a square",
      "Type weight chosen for legibility over a moving, uneven background",
    ],
    transfer:
      "Directly useful for a lawn care or window cleaning company whose customers find them on a phone, one-handed, mid-errand.",
    image: "/studies/outdoor-campaign.webp",
    width: 1536,
    height: 1024,
    scale: "standard",
  },
  {
    slug: "clarity",
    name: "CLARITY",
    discipline: "Material study",
    layout: "split",
    palette: {
      ink: "#e6e9f4",
      paper: "#1b1d28",
      accent: "#4655c4",
      band: "#1b1d28",
      bandInk: "#e6e9f4",
      bandAccent: "#9aa6ef",
    },
    site: {
      wordmark: "CLARITY",
      tagline: "Material study",
      nav: ["Work", "Process", "Enquire"],
      eyebrow: "Glass, light, and what happens between",
      headPlain: "Your next",
      headItalic: "chapter.",
      sub: ["A starting point for something", "unmistakably yours."],
      cta: "Let's make it happen",
      footLeft: "Studio no. 14",
      footRight: "CL / 02",
      bandHead: "Colour is structure, not decoration.",
      bandBody: "Everything on this page is one photograph and four type sizes. No gradients were needed.",
      bandCta: "See the process",
    },
    demonstrates: [
      "Gradation in the photograph doing the work a CSS gradient usually does badly",
      "A light typographic hand holding its own over a busy image",
      "Colour used as structure rather than as an accent sprinkled on top",
    ],
    transfer:
      "The reason a photography and videography build can hold a portfolio without the layout fighting the work.",
    image: "/studies/clarity-glass.webp",
    width: 1672,
    height: 941,
    scale: "standard",
  },
];

export const studiesCopy = {
  eyebrow: "Design studies",
  title: "Five sites, five different worlds.",
  lead: "Every one of these is a designed page, not a photograph with a caption. They are original studies from the studio, not clients and not companies we have built. They are here because you are about to pay for design, and you should be able to judge it before you decide rather than after.",
  disclosure: "Original work by this studio. Fictional brands, made to test ideas. No client is represented here.",
};
