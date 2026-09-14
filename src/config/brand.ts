/**
 * The only place the working brand name lives.
 * Swap these values to rename the company without touching components.
 */
export const brand = {
  name: "Business Builder",
  shortName: "Business Builder",
  tagline: "Describe the company you want. We build it, verify it, and hand you the keys.",
  description:
    "Business Builder researches your idea, assembles your brand, website and business systems, verifies that everything works, and hands over a company you own.",
  foundedYear: 2026,
} as const;

export const routes = {
  home: "/",
  howItWorks: "/how-it-works",
  product: "/product",
  website: "/website",
  buildMyBusiness: "/build-my-business",
  buildAndRun: "/build-and-run",
  work: "/work",
  businesses: "/businesses",
  pricing: "/pricing",
  trust: "/trust",
  about: "/about",
  start: "/start",
  login: "/login",
} as const;

export const cta = {
  primary: "Build my business",
  secondary: "See how it works",
  reassurance: "Explore before you commit. Nothing is built before you approve the direction, and you own everything we build.",
} as const;
