export const stages = [
  {
    label: "Idea",
    chapter: "Direction",
    title: "Start with what you have in mind.",
    description:
      "A new idea, an existing business, or just a clear ambition. Tell us what you want to do and what a good outcome looks like for you.",
    output: "Your founder brief",
    responsibility: "You bring the ambition.",
  },
  {
    label: "Understand",
    chapter: "Direction",
    title: "A business that fits your life.",
    description:
      "Your skills, available time, service area, and budget shape the build. We establish the constraints before recommending the company.",
    output: "Goals and constraints",
    responsibility: "You set the boundaries.",
  },
  {
    label: "Research",
    chapter: "Direction",
    title: "Give the idea a reality check.",
    description:
      "Explore local demand, alternatives, and competitors. Weak assumptions get challenged, and uncertainties stay visible.",
    output: "Market research and open questions",
    responsibility: "We investigate the opportunity.",
  },
  {
    label: "Recommend",
    chapter: "Direction",
    title: "A clear direction. With reasons.",
    description:
      "Review a proposed audience, offer, positioning, and build scope. If the first idea needs work, see a stronger direction and the reasoning behind it.",
    output: "A recommended business direction",
    responsibility: "We make the case.",
  },
  {
    label: "Approve",
    chapter: "Direction",
    title: "Your company. Your decision.",
    description:
      "Review the direction, scope, expected costs, and dependencies. Request changes before you approve the work that comes next.",
    output: "Your approved build scope",
    responsibility: "You approve before we build.",
  },
  {
    label: "Build",
    chapter: "Assembly",
    title: "Watch the pieces become a business.",
    description:
      "Brand, website, and business systems are assembled around the direction you approved. The Build Room shows what is done, in progress, and waiting.",
    output: "Your business, taking shape",
    responsibility: "We build. You can follow along.",
  },
  {
    label: "Founder actions",
    chapter: "Assembly",
    title: "Only you can do some things.",
    description:
      "Identity checks, account ownership, and final approvals need you. Each Founder Action explains what to do, why it matters, and what it unlocks.",
    output: "A focused list of founder actions",
    responsibility: "You handle the decisions that need you.",
  },
  {
    label: "Verify",
    chapter: "Readiness",
    title: "Done needs something to back it up.",
    description:
      "Important flows are tested against the agreed scope. Results and evidence are recorded. A blocked or failed check stays open until it is resolved.",
    output: "Checks with supporting evidence",
    responsibility: "We test the work.",
  },
  {
    label: "Ready",
    chapter: "Readiness",
    title: "Ready for the first customer.",
    description:
      "The agreed customer-facing essentials work and required launch checks pass. You can see any remaining setup work and its practical limits.",
    output: "Customer-readiness review",
    responsibility: "You see exactly what is ready.",
  },
  {
    label: "Fully Set",
    chapter: "Readiness",
    title: "The remaining details, resolved.",
    description:
      "The remaining agreed setup requirements and Founder Actions are complete. Readiness is measured against your scope, not an arbitrary progress bar.",
    output: "Completed setup record",
    responsibility: "Every agreed requirement is accounted for.",
  },
  {
    label: "Handoff",
    chapter: "Ownership",
    title: "Here are the keys.",
    description:
      "Receive your agreed assets, access inventory, business documents, and verification evidence, with clear instructions for operating what was built.",
    output: "Your business handoff",
    responsibility: "You own the business.",
  },
  {
    label: "Run",
    chapter: "Ownership",
    title: "Keep a little help on the team.",
    description:
      "Choose ongoing support for selected operational tasks. AI workers use your company context and work within the permissions and approvals you set.",
    output: "Optional managed operations",
    responsibility: "You decide what stays delegated.",
  },
] as const;

export const businessTypes = [
  {
    name: "Residential Cleaning",
    short: "Cleaning",
    headline: "A cleaner start.\nA business that works.",
    service: "Recurring home cleaning",
    brief:
      "Build a local cleaning business with recurring clients and a professional booking experience.",
    enquiry: "Home size, frequency, and preferred day",
    setup: "Recurring service requests and service-area checks",
    check:
      "A test booking reaches the right inbox with the home details intact.",
    tag: "RECURRING SERVICES",
    offer: "Weekly · Every other week · One-time",
    note: "From the first enquiry to the next clean.",
  },
  {
    name: "Mobile Detailing",
    short: "Mobile Detailing",
    headline: "Your craft.\nTheir driveway.",
    service: "Mobile interior & exterior detailing",
    brief:
      "Build a mobile detailing business that takes enquiries by vehicle type and location.",
    enquiry: "Vehicle, package, location, and access to water",
    setup: "Package enquiries and mobile service coverage",
    check: "Vehicle and location details arrive with the selected package.",
    tag: "ON-LOCATION SERVICES",
    offer: "Interior · Exterior · Full detail",
    note: "A booking flow that understands the job.",
  },
  {
    name: "Pressure Washing",
    short: "Pressure Washing",
    headline: "A fresh surface.\nA solid start.",
    service: "Residential exterior cleaning",
    brief: "Build a pressure washing business with photo-based quote requests.",
    enquiry: "Surface, approximate area, and job photos",
    setup: "Photo quote requests and estimate follow-up",
    check: "Uploaded job photos stay attached to the quote request.",
    tag: "QUOTE-LED SERVICES",
    offer: "Driveways · Patios · Siding",
    note: "See the surface before you scope the work.",
  },
  {
    name: "Lawn Care",
    short: "Lawn Care",
    headline: "Room to grow.\nBuilt right in.",
    service: "Recurring lawn maintenance",
    brief:
      "Build a lawn care business with recurring service enquiries in my local area.",
    enquiry: "Property size, address, and service frequency",
    setup: "Recurring schedules and service-area rules",
    check: "A service request includes the property and desired frequency.",
    tag: "RECURRING SERVICES",
    offer: "Mowing · Edging · Seasonal care",
    note: "Make the next visit part of the plan.",
  },
  {
    name: "Window Cleaning",
    short: "Window Cleaning",
    headline: "A clearer view.\nOf what comes next.",
    service: "Interior & exterior window cleaning",
    brief: "Build a window cleaning business with accurate quote intake.",
    enquiry: "Window count, stories, and access details",
    setup: "Property-based quotes and appointment requests",
    check: "Access requirements arrive with the property quote.",
    tag: "PROPERTY SERVICES",
    offer: "Interior · Exterior · Screens",
    note: "Get the details that make a quote useful.",
  },
  {
    name: "Junk Removal",
    short: "Junk Removal",
    headline: "Clear the space.\nBuild your business.",
    service: "Residential junk removal",
    brief:
      "Build a junk removal business that collects item photos before quoting.",
    enquiry: "Item photos, volume, access, and location",
    setup: "Photo intake and pickup-window requests",
    check: "Pickup requests preserve photos and access instructions.",
    tag: "ON-DEMAND SERVICES",
    offer: "Furniture · Cleanouts · Yard waste",
    note: "Know what you are collecting before you arrive.",
  },
  {
    name: "Carpet Cleaning",
    short: "Carpet Cleaning",
    headline: "A fresh start.\nFrom the floor up.",
    service: "Carpet & upholstery cleaning",
    brief:
      "Build a carpet cleaning business with room-based service enquiries.",
    enquiry: "Room count, surface, and stain concerns",
    setup: "Room-based requests and service add-ons",
    check: "The request records room counts and any selected add-ons.",
    tag: "HOME CARE SERVICES",
    offer: "Carpets · Rugs · Upholstery",
    note: "The right information for the right treatment.",
  },
  {
    name: "Painting",
    short: "Painting",
    headline: "Your next chapter.\nIn a new color.",
    service: "Residential painting",
    brief:
      "Build a painting business with a polished portfolio and site-visit requests.",
    enquiry: "Interior or exterior, room count, and timing",
    setup: "Project enquiries and estimate appointments",
    check: "A site-visit request reaches you with the project scope.",
    tag: "PROJECT SERVICES",
    offer: "Interiors · Exteriors · Finishing",
    note: "A better brief before the first site visit.",
  },
  {
    name: "Pet Services",
    short: "Pet Services",
    headline: "Good care.\nGood business.",
    service: "Local pet care",
    brief:
      "Build a pet services business with pet-specific intake and meet-and-greet requests.",
    enquiry: "Pet needs, service dates, and care instructions",
    setup: "Care intake and meet-and-greet scheduling",
    check: "Care instructions stay attached to the appointment request.",
    tag: "CARE SERVICES",
    offer: "Walking · Sitting · Visits",
    note: "Thoughtful intake for the ones they love.",
  },
  {
    name: "Photography & Videography",
    short: "Photo & Video",
    headline: "Make your work\nthe main event.",
    service: "Photography & videography",
    brief:
      "Build a creative business with a premium portfolio and project enquiries.",
    enquiry: "Shoot type, date, location, and deliverables",
    setup: "Portfolio, project briefs, and availability enquiries",
    check: "The enquiry captures the shoot date and requested deliverables.",
    tag: "CREATIVE SERVICES",
    offer: "Photography · Videography · Both",
    note: "A considered experience, from portfolio to enquiry.",
  },
] as const;

export const modules = [
  {
    name: "Identity",
    status: "Approved",
    title: "A direction worth building around.",
    description:
      "Your audience, service offer, visual direction, and voice, brought together in one company brief.",
    rows: [
      "Audience and positioning",
      "Brand direction and voice",
      "Service offer and boundaries",
    ],
    evidence: "Founder approval attached to the business direction.",
    action: "Name and proposed service offer approved.",
    unlock: "Website and business copy unlocked.",
  },
  {
    name: "Website",
    status: "Verified",
    title: "A proper front door for your business.",
    description:
      "Your services, service area, and enquiry flow, designed together for the customers you want to reach.",
    rows: [
      "Service pages and enquiry form",
      "Mobile layouts and contact details",
      "Form delivery and error handling",
    ],
    evidence: "Test enquiry received in the designated inbox.",
    action: "Public contact details and service area confirmed.",
    unlock: "Final website checks completed.",
  },
  {
    name: "Domain & email",
    status: "Founder action",
    title: "Your name. Your accounts.",
    description:
      "Connect your business address and email with a clear record of who owns each account.",
    rows: [
      "Domain ownership and access",
      "Business email configuration",
      "Delivery and reply checks",
    ],
    evidence: "Domain and email checks wait for account authorization.",
    action: "Authorize access to your domain account.",
    unlock: "Unlocks domain connection and email testing.",
  },
  {
    name: "CRM & enquiries",
    status: "Verified",
    title: "Every enquiry has somewhere to go.",
    description:
      "Capture the details that matter for your business and keep the next step visible.",
    rows: [
      "Business-specific enquiry fields",
      "Customer record and lead stages",
      "Inbox routing and follow-up tasks",
    ],
    evidence:
      "Test enquiry created a customer record with the correct details.",
    action: "Enquiry notification recipients confirmed.",
    unlock: "Notification routing checked.",
  },
  {
    name: "Scheduling",
    status: "In testing",
    title: "Make the next appointment easier.",
    description:
      "Set up appointment requests around the service you offer and the availability you approve.",
    rows: [
      "Service duration and availability",
      "Booking request and confirmation",
      "Reschedule and cancellation paths",
    ],
    evidence: "Confirmation and reschedule flows are awaiting checks.",
    action: "Confirm your working hours and appointment rules.",
    unlock: "Unlocks scheduling configuration.",
  },
  {
    name: "Payments",
    status: "Founder action",
    title: "Ready to take payment. Once approved.",
    description:
      "Configure the agreed payment flow in your account. Provider identity checks and activation remain yours to complete.",
    rows: [
      "Customer-owned payment account",
      "Approved payment or deposit flow",
      "Test receipt and transaction record",
    ],
    evidence:
      "Payment checks are blocked until the provider activates the account.",
    action: "Complete the provider’s identity verification.",
    unlock: "Unlocks payment setup and testing.",
  },
] as const;
