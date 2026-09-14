/**
 * Website build tiers. These are the studio's real, published project prices,
 * carried over from the website service this company grew out of.
 *
 * The larger packages are not priced here on purpose: a company build depends
 * on what the research says the company needs, so the figure arrives with the
 * recommendation rather than before it.
 */

export type Tier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  pages: string;
  bestFor: string;
  includesLabel: string;
  includes: string[];
  emphasis?: boolean;
};

export const websiteTiers: Tier[] = [
  {
    id: "launch",
    name: "Launch",
    price: "$500",
    cadence: "One-time project price",
    pages: "One responsive landing page",
    bestFor: "A campaign, a new offer, or a focused introduction to the business.",
    includesLabel: "Includes",
    includes: [
      "Three creative directions",
      "Buyer and conversion brief",
      "Copy refinement",
      "Search foundations",
      "One revision round",
      "Source files and handoff notes",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "$1,000",
    cadence: "One-time project price",
    pages: "Up to five unique pages",
    bestFor: "Services and companies whose buyers need more than a homepage.",
    includesLabel: "Everything in Launch, plus",
    includes: [
      "Buyer and competitor research",
      "Conversion-focused page structure",
      "Contact form integration",
      "Two revision rounds",
    ],
    emphasis: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$1,500",
    cadence: "One-time project price",
    pages: "Up to eight unique pages",
    bestFor: "A broader offer, regular publishing, or a more expressive experience.",
    includesLabel: "Everything in Business, plus",
    includes: [
      "CMS for work or articles",
      "One signature motion sequence",
      "Publishing and editing guidance",
      "Three revision rounds",
    ],
  },
];

export const tierNotes = [
  "Domain registration, hosting, paid fonts, stock licences and third-party subscriptions are separate where required.",
  "Platform choice and any ongoing costs are agreed before production begins.",
  "Custom applications, complex ecommerce and account systems sit outside these packages.",
];

export const priceSummary = {
  website: "From $500",
  business: "Quoted with your recommendation",
  run: "Build price, then monthly",
};
