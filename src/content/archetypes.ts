export type Archetype = {
  slug: string;
  name: string;
  short: string;
  /** One line of operational specificity: what the system knows about this business. */
  operations: string;
  /** Example intake prompt used to pre-fill the intake field. */
  examplePrompt: string;
  /** Business-specific things the system configures. */
  specifics: string[];
  /** Why each specific matters, index-aligned with `specifics`. */
  specificsWhy?: string[];
  /** Typical founder actions for this type. */
  founderActions: string[];
  /** Verifications that matter most for this type. */
  verifications: string[];
  variants?: string[];
  /** Used by the mock site frame. */
  siteHeadline: string;
  siteServices: string[];
};

export const archetypes: Archetype[] = [
  {
    slug: "residential-cleaning",
    name: "Residential Cleaning",
    short: "Cleaning",
    operations: "Recurring schedules, room-based quotes, keyholder notes.",
    examplePrompt: "A residential cleaning company in Denver with weekly and biweekly plans",
    specifics: [
      "Quote form by bedrooms, bathrooms and square footage",
      "Recurring plan options: weekly, biweekly, monthly, one-time deep clean",
      "Keyholder and access notes on every customer record",
      "Move-in and move-out service pages",
    ],
    specificsWhy: [
      "Cleaning is priced by the home, so the quote form asks about the home.",
      "Recurring revenue is the business. Plans are first-class, not an add-on.",
      "Access details are the difference between a job done and a job missed.",
      "Move-out cleans are a distinct, high-intent search.",
    ],
    founderActions: ["Confirm your service area", "Decide your supplies policy", "Set your cancellation window"],
    verifications: ["Recurring booking lands in your calendar", "Quote request reaches your CRM", "Deposit payment clears"],
    siteHeadline: "A clean home, on a schedule you set.",
    siteServices: ["Weekly clean", "Biweekly clean", "Deep clean", "Move-out clean"],
  },
  {
    slug: "mobile-detailing",
    name: "Mobile Detailing",
    short: "Detailing",
    operations: "Service radius, vehicle-size pricing, on-site scheduling.",
    examplePrompt: "A mobile detailing business in Austin that comes to your driveway",
    specifics: [
      "Pricing by vehicle size and package tier",
      "Service radius and travel-fee rules",
      "Booking with address capture and drive-time buffers",
      "Before-and-after gallery structure",
    ],
    specificsWhy: [
      "A truck is not a coupe. Pricing has to know the difference before the customer asks.",
      "Mobile means you drive. The radius and the fee protect your day.",
      "Every booking is a location. The calendar needs the address and the drive time.",
      "Detailing sells on the result. The gallery is the proof.",
    ],
    founderActions: ["Confirm your service radius", "Choose your package names and prices", "Connect your payout account"],
    verifications: ["Booking with address reaches your calendar", "Travel-fee rule applies at checkout", "Confirmation text and email send"],
    siteHeadline: "Detailing that comes to your driveway.",
    siteServices: ["Interior refresh", "Exterior detail", "Full detail", "Ceramic coating"],
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    short: "Pressure washing",
    operations: "Quotes by surface and square footage, seasonal demand.",
    examplePrompt: "A pressure washing company for driveways, decks and siding in Charlotte",
    specifics: [
      "Quote form by surface type and approximate square footage",
      "Residential and light-commercial service pages",
      "Seasonal scheduling and reminder rules",
      "Photo upload on quote requests",
    ],
    specificsWhy: [
      "Concrete, wood and siding are different jobs. The quote asks which.",
      "Storefronts and HOAs buy differently from homeowners.",
      "Demand peaks in spring. The system remembers last year's customers.",
      "A photo turns a vague request into a quotable one.",
    ],
    founderActions: ["Confirm surfaces you will and will not treat", "Set minimum job price", "Confirm insurance details for the website"],
    verifications: ["Quote with photos reaches your CRM", "Estimate reply template sends", "Deposit payment clears"],
    siteHeadline: "Driveways, decks and siding, like new.",
    siteServices: ["Driveways", "Decks and fences", "House washing", "Commercial"],
  },
  {
    slug: "lawn-care",
    name: "Lawn Care",
    short: "Lawn care",
    operations: "Route density, weekly and biweekly plans, season starts.",
    examplePrompt: "A lawn care company in Raleigh with weekly mowing plans",
    specifics: [
      "Plan-based pricing by lot size",
      "Route-friendly scheduling by neighbourhood",
      "Season start and end reminders",
      "Add-on services: edging, mulch, cleanup",
    ],
    specificsWhy: [
      "Lawn care is sold as a plan, priced by the lot.",
      "Profit lives in route density. Scheduling groups by neighbourhood.",
      "Customers forget when the season starts. The system does not.",
      "Add-ons are where the margin is.",
    ],
    founderActions: ["Confirm your service neighbourhoods", "Set your season dates", "Decide your rain-day policy"],
    verifications: ["Recurring plan creates repeating calendar events", "Plan change updates the CRM record", "Monthly payment collects"],
    siteHeadline: "A lawn you never think about.",
    siteServices: ["Weekly mowing", "Biweekly mowing", "Edging and trim", "Seasonal cleanup"],
  },
  {
    slug: "window-cleaning",
    name: "Window Cleaning",
    short: "Window cleaning",
    operations: "Pane counts and storeys, commercial versus residential.",
    examplePrompt: "A window cleaning company in Portland for homes and storefronts",
    specifics: [
      "Quote by pane count, storeys and access difficulty",
      "Residential and storefront service pages",
      "Recurring storefront schedules",
      "Interior and exterior options",
    ],
    specificsWhy: [
      "Panes and storeys are the price. The form counts them.",
      "Storefronts are recurring; homes are seasonal. Different pages, different offers.",
      "Commercial recurring work is the steady base of the business.",
      "Inside and out is a different job from outside only.",
    ],
    founderActions: ["Confirm your maximum storey height", "Set commercial recurring terms", "Connect your payout account"],
    verifications: ["Storefront recurring booking repeats correctly", "Quote request reaches your inbox and CRM", "Invoice sends and payment clears"],
    siteHeadline: "Clear windows for homes and storefronts.",
    siteServices: ["Residential", "Storefront", "Interior and exterior", "Screens and tracks"],
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    short: "Junk removal",
    operations: "Volume-based pricing, same-day requests, disposal fees.",
    examplePrompt: "A junk removal company in Phoenix with same-day pickup",
    specifics: [
      "Pricing by truck-load fraction",
      "Same-day and next-day request handling",
      "Disposal and heavy-item fee rules",
      "Photo-based estimates",
    ],
    specificsWhy: [
      "Customers understand a quarter truck. The pricing speaks their language.",
      "Same-day is the reason people call. The system treats it as urgent.",
      "Mattresses and appliances cost more to dump. The rules are explicit.",
      "A photo of the pile is the estimate.",
    ],
    founderActions: ["Confirm items you will not take", "Set same-day availability hours", "Confirm disposal partners for pricing"],
    verifications: ["Same-day request triggers an immediate alert", "Estimate with photos reaches your CRM", "Card payment clears on completion"],
    siteHeadline: "Gone today. Same-day junk removal.",
    siteServices: ["Same-day pickup", "Furniture and appliances", "Garage cleanouts", "Construction debris"],
  },
  {
    slug: "carpet-cleaning",
    name: "Carpet Cleaning",
    short: "Carpet cleaning",
    operations: "Rooms and stairs pricing, dry-time expectations.",
    examplePrompt: "A carpet and upholstery cleaning company in Columbus",
    specifics: [
      "Pricing by rooms, stairs and upholstery pieces",
      "Dry-time and preparation guidance on booking",
      "Pet and stain treatment add-ons",
      "Commercial carpet service page",
    ],
    specificsWhy: [
      "Rooms and stairs are the unit of work.",
      "Customers who know what to expect leave better reviews.",
      "Pet treatment is the most common add-on and the easiest to forget to offer.",
      "Offices buy on a schedule; homes buy once.",
    ],
    founderActions: ["Confirm your minimum job", "Set your add-on prices", "Decide your furniture-moving policy"],
    verifications: ["Booking with add-ons totals correctly", "Preparation email sends before the job", "Payment clears"],
    siteHeadline: "Carpets and upholstery, properly clean.",
    siteServices: ["Carpet cleaning", "Upholstery", "Pet and stain treatment", "Commercial"],
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Painting",
    operations: "Estimates from photos and walkthroughs, interior versus exterior.",
    examplePrompt: "A residential painting company in Nashville for interiors and exteriors",
    specifics: [
      "Estimate requests with photos and room counts",
      "Walkthrough scheduling separate from job scheduling",
      "Interior, exterior and cabinet service pages",
      "Deposit and progress payment structure",
    ],
    specificsWhy: [
      "Painting cannot be quoted blind. Photos and room counts get you close.",
      "A walkthrough is a different appointment from the job. The calendar knows that.",
      "Cabinets are a separate market with separate pricing.",
      "Multi-day jobs need deposits and progress payments, not one checkout.",
    ],
    founderActions: ["Confirm your licence details for the website", "Set your deposit percentage", "Decide your paint-supply policy"],
    verifications: ["Walkthrough booking lands in your calendar", "Estimate request reaches your CRM", "Deposit payment clears"],
    siteHeadline: "Interiors and exteriors, done right the first time.",
    siteServices: ["Interior painting", "Exterior painting", "Cabinets", "Trim and doors"],
  },
  {
    slug: "pet-services",
    name: "Pet Services",
    short: "Pet services",
    operations: "Recurring visits, pet profiles, vaccination records.",
    examplePrompt: "A dog walking and pet sitting company in Seattle",
    specifics: [
      "Pet profiles with vaccination and behaviour notes",
      "Recurring walk and visit schedules",
      "Meet-and-greet booking before first service",
      "Holiday and overnight rate rules",
    ],
    specificsWhy: [
      "The customer is the pet. The record has to be about the pet.",
      "Walks repeat. The schedule is the product.",
      "Nobody hands over their dog without meeting you first.",
      "Holidays are when demand and rates both rise.",
    ],
    founderActions: ["Confirm your service area", "Decide your meet-and-greet policy", "Set your holiday rates"],
    verifications: ["Meet-and-greet booking lands in your calendar", "Pet profile saves to the customer record", "Recurring payment collects"],
    siteHeadline: "Walks, visits and sitting your dog looks forward to.",
    siteServices: ["Daily walks", "Drop-in visits", "Overnight sitting", "Meet and greet"],
  },
  {
    slug: "photography-videography",
    name: "Photography & Videography",
    short: "Photo & video",
    operations: "Packages, session booking, deposits, gallery delivery.",
    examplePrompt: "A wedding and portrait photography studio in Chicago",
    specifics: [
      "Package-based pricing with deposit rules",
      "Session booking with location and duration",
      "Portfolio structure by genre",
      "Gallery delivery and print options",
    ],
    specificsWhy: [
      "Creative work is sold as packages with a deposit that holds the date.",
      "A session has a place and a length. The booking captures both.",
      "Weddings and headshots are different buyers. The portfolio is organised for each.",
      "Delivery is part of the product, and the second sale.",
    ],
    founderActions: ["Choose photography, videography or both", "Set your deposit and cancellation terms", "Confirm your travel policy"],
    verifications: ["Session booking with deposit lands in your calendar", "Inquiry reaches your CRM with package selected", "Deposit payment clears"],
    variants: ["Photography", "Videography", "Both"],
    siteHeadline: "Weddings, portraits and films you will keep.",
    siteServices: ["Weddings", "Portraits", "Events", "Brand films"],
  },
];

export const archetypeBySlug = (slug: string) => archetypes.find((a) => a.slug === slug);
