# Business Builder — Flagship Website Strategy

Working brand: **Business Builder** (temporary; all brand strings live in one config file so the name can be swapped).
Status: first delivery. Covers the fifteen strategy items, then the homepage direction that the implementation follows.

---

## 1. Product interpretation

Business Builder is not a tool that produces output. It is a **company assembly service with the founder in the loop**.

The unit of value is a **verified state transition**, not a file. A generator's job ends when a website exists. Business Builder's job ends when a booking placed on that website lands in the founder's calendar, the confirmation email arrives, and a test payment clears. That gap, between "exists" and "works", is the product.

The central object is **the Company**, and the Company has a state:

```
Idea → Understand → Research → Recommend → Approve → Build → Founder Actions → Verify → Ready → Fully Set → Handoff → Run
```

Four phases give that twelve-step chain a shape a human can hold:

| Phase | Stages | Who acts | Output |
|---|---|---|---|
| **Understand** | Idea, Understand, Research | Business Builder listens and researches | A picture of the founder, the market, and the weak points of the idea |
| **Decide** | Recommend, Approve | Business Builder proposes, founder decides | An approved direction: positioning, offer, brand direction, scope |
| **Build** | Build, Founder Actions, Verify | Business Builder assembles; founder does what only a founder can | Systems configured, connected, tested, verified |
| **Own** | Ready, Fully Set, Handoff, Run | Founder takes the keys, or keeps Business Builder running parts | A company the founder owns, optionally operated with AI workers |

Vocabulary the site treats as product nouns, not marketing:

- **Build Room** — where the founder watches the company being assembled. Every module has a status.
- **Founder Action** — a task only the founder can legally or practically do (identity verification with a payment processor, choosing the legal name, confirming a business address, connecting a bank account). Business Builder prepares it, explains it, and tracks it.
- **Verification** — the four-state ladder: **Proposed → Executed → Tested → Verified**. "Tested" means Business Builder exercised the system. "Verified" means the result was checked against what the founder should see.
- **Ready** — the customer-facing systems are verified: the site is live, a customer can reach you, book you, and pay you.
- **Fully Set** — Ready, plus every Founder Action complete and every connected business system verified (domain, email, CRM, scheduling, payments, setup and admin steps).
- **The Keys** — the handoff. Ownership of every asset, with the evidence.
- **AI Workers** — Build & Run's operating roles, each with permissions, budgets, approval rules, and company context.

What the product is **not**, and what the site must never accidentally resemble: an AI website builder, a business-plan PDF, an idea generator, an agency, a chatbot, a formation filing service.

The site also must not invent capability. The definitions of Ready and Fully Set above are the working definitions the site uses; they are written so the product team can tighten them without rewriting the site.

## 2. Customer thesis

**The capable operator who is not a technologist.**

They can do the work: clean a house, detail a truck, pressure-wash a driveway, mow, paint, shoot a wedding. What they lack is not skill or hustle. It is the coordination layer: ten decisions, six vendors, four subscriptions, and no way to know whether the result is actually complete.

Two entry states:

1. **Pre-company.** An idea, maybe a truck and some equipment, no name, no site, no way to take a booking.
2. **Unprofessional company.** Already working, mostly from word of mouth and texts. A Facebook page or a Wix site from 2019. Payments by Venmo. Scheduling in their head.

What they are weighing against us:

| Alternative | What it gives them | Where it fails them |
|---|---|---|
| DIY stack (Wix, Square, Calendly, Gmail, Canva, a formation site) | Control, low sticker price | Ten logins, nothing connected, no one confirms it works, weeks of evenings |
| Local agency or freelancer | A website | Slow, expensive, website-only, and they still have to do the rest |
| AI generators | Fast output | Output is not a business; nothing is verified; often not even deployed on their domain |
| Formation services | Paperwork | Legal shell with nothing inside |
| Doing nothing | Zero cost | Zero growth, and they know it |

Their buying trigger is concrete: *"I want to look real and take a booking by next month."*

Their objections, in the order they think them:

1. Is this real, or is it AI slop?
2. What will I actually have at the end?
3. What do I have to do myself?
4. Do I own it? What if I stop paying?
5. How much?
6. What happens after it's built?

The homepage answers those six questions in that order. That is the narrative spine.

## 3. Positioning

**Category:** the Business Builder. The company that builds companies.

**Positioning statement:** For people ready to start or professionalize a real service business, Business Builder is the only service that takes an idea through research, build, verification, and handoff. You get an assembled, working company you own, not AI output you have to finish yourself.

**Four pillars.** Every section of the site advances at least one:

1. **Built, not generated.** Systems are configured and connected, not exported.
2. **Verified, not assumed.** Proposed → Executed → Tested → Verified, with evidence.
3. **Yours, not rented.** Assets, data, domain, history and evidence stay with the founder.
4. **Runs, if you want it to.** AI workers can keep operating parts of the company, inside limits you set.

**Against the field**, stated once on the site (Trust page), never as a homepage table:

- Generators (Durable, Lovable, Tailor Brands, AI site builders) produce assets. We assemble and verify systems.
- Formation services (ZenBusiness) file paperwork. We build what goes inside the entity and guide the paperwork as Founder Actions.
- Cofounder-style AI tools advise. We execute and hand over.
- Agencies build one piece, slowly. We build the whole company and prove it works.

**Tone:** an experienced operator explaining exactly what will happen. Calm, specific, no adjectives doing the work of nouns.

## 4. Site information architecture

Primary navigation (five items plus two actions):

```
How it works · What we build ▾ · Businesses · Pricing · Trust        Log in · [Build my business]
                 ├ Build my website
                 ├ Build my business
                 └ Build & run my business
```

About lives in the footer and the mobile sheet. It exists for credibility, not for conversion, so it does not take a primary slot.

Routes:

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Explain the product in seconds; convert to `/start` |
| `/how-it-works` | How it works | The journey from the founder's seat, stage by stage, with what they do and what we do |
| `/product` | The Build Room | The system from the inside: Build Room, Founder Actions, Verification, Ready and Fully Set, Handoff |
| `/website` | Build my website | Entry package for people who want a premium site first; upgrade path visible |
| `/build-my-business` | Build my business | The flagship package, component by component |
| `/build-and-run` | Build & run | Ongoing operations: the AI workers and their limits |
| `/businesses` | Supported businesses | The ten archetypes, with operational specifics |
| `/businesses/[slug]` | One archetype | What we build for this business type, its Founder Actions, its verifications |
| `/pricing` | Pricing | Three packages, inclusions, upgrade paths |
| `/trust` | Trust and verification | Quality, ownership, permissions, spending limits, approvals, data, reversibility, escalation, honest claims |
| `/about` | About | Why this company exists, how it works, who is accountable |
| `/start` | Start | The intake: "Describe the company you want." Sign-up entry |
| `/login` | Log in | Product shell entry |

No page exists only to fill the nav. The archetype detail pages are the only "many" and they earn it because they are the SEO surface and the strongest proof of specificity.

## 5. Homepage narrative

The homepage answers the six objections in order. Each section has a stated composition reason so nothing is a template beat.

| # | Section | Answers | Composition reason |
|---|---|---|---|
| 1 | **Hero: the intake** | What is this? What happens? What do I do? | Headline is the promise. The primary CTA is the product itself: a real intake field, "Describe the company you want", with archetype examples cycling as placeholder. Beside it, a live Build Room preview assembling a company. Product as hero, not illustration of product. |
| 2 | **Starting a real business is ten jobs** | Why is this hard? | Editorial two-column. Left: one statement. Right: the honest ledger of what a founder normally coordinates (domain, site, brand, email, CRM, scheduling, payments, forms, reviews, legal steps) with who they'd normally hire for each. It resolves to one line. |
| 3 | **The journey** | What actually happens to me? | The Rail: twelve stages in four phases, founder touchpoints marked. Dark "inside the system" surface. Stages activate on scroll. Signature visual. |
| 4 | **The Build Room** | What will I see while it's happening? | Full product moment. Large, implemented UI: modules with four-state status, Founder Actions panel, readiness. Statuses progress in a loop. |
| 5 | **Built, not generated** | Is this AI slop? | Split ledger. Left: what a generator hands you. Right: what Business Builder hands over, each line paired with the check that proved it. Typographic, no icons. |
| 6 | **What we build** | What will I have at the end? | The bill of materials: a dense inventory grouped Brand, Website, Systems, Setup, Evidence. Variable cell sizes; reads like a manifest. |
| 7 | **Founder Actions** | What do I have to do myself? | One Founder Action card at real size, annotated: why only you can do it, what we prepared, the steps, the status. Honest about the parts that cannot be delegated. |
| 8 | **Verification, Ready, Fully Set** | How do I know it works? | The four-state ladder with real checks as examples, then Ready and Fully Set defined side by side. Dark surface again: this is the second "inside the system" moment. |
| 9 | **Take the keys, or run it for me** | What happens after? | The fork. A two-choice control that changes what is shown beneath. The strongest conversion moment after the hero. |
| 10 | **Build & Run** | What does "run" mean? | The workers roster and one permissions card. Explicit limits: permissions, budgets, approvals, context. Deliberately unglamorous. |
| 11 | **It stays yours** | What if I stop? | Ownership manifest. Short. |
| 12 | **Built for these businesses** | Is this for me? | Ten archetypes as a designed strip, each with one line of operational specificity. Clicking pre-fills the intake. |
| 13 | **Three ways to start** | How much? | Package architecture with upgrade path. Inclusions over prices; prices as "starting at" placeholders only if provided. |
| 14 | **Trust, in one paragraph each** | Can I trust this? | Approval before build. Verification with evidence. Ownership. Human escalation. No fake claims. Compact. |
| 15 | **Final CTA: the intake again** | Now what? | Same intake field as the hero, so the page ends where the product begins. |

Pacing: 1–2 light, 3 dark, 4–7 light, 8 dark, 9–15 light with 12 and 13 on a slightly deeper paper tone. Dark is used for exactly two moments and for one reason: they show the interior of the system.

## 6. Visual creative direction

**Concept: the blueprint and the finished building.**

Assembly is the metaphor. The visual register borrows from engineering and architecture documentation, not from "AI": hairline rules, plan grids, status stamps, manifests, sign-offs, keys. The founder is looking at the plans for their company and then at the company.

Palette. One brand accent, and it is the verification colour. The brand's colour *is* its moat.

| Token | Light | Purpose |
|---|---|---|
| Ink | `#111214` | Primary text, dark surfaces, primary buttons |
| Paper | `#F7F6F2` | Page ground (warm, not blue-white) |
| Paper deep | `#EFEDE7` | Secondary sections |
| Graphite 1–6 | `#1B1C1F` → `#8A8C93` | Text hierarchy and dark-surface layers |
| Rule | `#DDDBD3` | Hairlines |
| Verified | `#127A57` (light) / `#3DD68C` (on ink) | Verified state, brand accent, the one colour |
| In progress | `#B7791F` | Executing and Tested states |
| Founder | `#2F4BD7` | Founder Action marker, used sparingly |
| Danger | `#B42318` | Errors only |

Depth: 1px borders first, one soft shadow scale second, no glass, no blur, no gradient fields. Radii 4 / 8 / 12; 16 only on the largest product frames. Illustration is UI-native: every visual is a rendering of a real product surface or a diagram of a real process.

Rename-safe: the wordmark is set in the display face with a small geometric mark (a square with a notch, read as a key or a checked cell). Both are swappable in one file.

## 7. Typography recommendation

| Role | Face | Why |
|---|---|---|
| Display and body | **Instrument Sans** (variable, 400–700, optical sizes) | A grotesk with a few humane quirks. Reads as considered rather than default. Not Inter, not Geist. |
| Editorial accent | **Instrument Serif** italic | One word per section at most, e.g. *verified*, *yours*. Same designer as the sans, so the pairing is coherent. |
| Product UI | **JetBrains Mono** | Status chips, module labels, evidence lines. Signals system, not marketing. |

Scale (fluid, `clamp`):

| Step | Size | Line | Tracking |
|---|---|---|---|
| Display | 52 → 84px | 0.98 | -0.03em |
| H1 page | 40 → 64px | 1.02 | -0.025em |
| H2 section | 32 → 48px | 1.06 | -0.02em |
| H3 | 22 → 28px | 1.2 | -0.01em |
| Lead | 18 → 21px | 1.45 | 0 |
| Body | 16 → 17px | 1.6 | 0 |
| Small | 14px | 1.5 | 0 |
| Mono label | 12 → 13px | 1.4 | +0.02em, uppercase where used as an eyebrow |

Measure capped at 62ch for prose, 24ch for display. Fonts loaded through `next/font` with `display: swap` and size-adjusted fallbacks so layout does not shift.

## 8. Layout and composition philosophy

- **12-column grid, 1200px max content, 24px gutters** desktop; 4 columns, 20px margins mobile.
- **Asymmetry as default.** Editorial sections sit on 5/7 or 4/8 splits. Symmetric three-up appears only where there are exactly three real objects (packages).
- **Rules organise, cards contain.** Hairline rules and spacing carry hierarchy. A card is used only when it represents a real object in the product (a Founder Action, a Worker, a module row). Never as a decorative wrapper for a paragraph.
- **Density is a signal.** Marketing text is generous. Product UI is dense (13–14px), because real software is dense and that density is what makes it credible.
- **Spacing scale (8-based):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Section padding 112–128 desktop, 64–80 mobile. Whitespace is bounded by the grid, never inflated.
- **Every section changes shape.** Two-column, then full-bleed rail, then large UI frame, then ledger, then manifest grid. No two consecutive sections share a layout.

## 9. Motion philosophy

Motion explains state. If an animation does not show something changing state in the product, it is cut.

Three permitted kinds:

1. **State transitions.** Proposed → Executed → Tested → Verified. A chip changes colour and a check draws in. 250ms.
2. **Sequence reveals** on the two signature diagrams only (the Rail activating stage by stage as it enters view; the Build Room progressing). Nothing else animates on scroll. Paragraphs do not fade in.
3. **Micro-interactions.** 1px hover lift on real buttons, focus rings, the fork toggle sliding.

Rules: durations 150 / 250 / 400 / 700ms; one easing `cubic-bezier(0.2, 0.7, 0.2, 1)`; no parallax; transforms and opacity only; every loop pauses when off-screen; `prefers-reduced-motion` renders final states with no movement.

## 10. Signature visual concepts

1. **The Rail.** Twelve stages on one line across four phases. Founder touchpoints are hollow markers; system stages are solid. The current stage carries the Verified colour. Vertical on mobile with sticky phase labels.
2. **The Build Room.** A real interface frame: left rail of modules, each with a four-state chip; a Founder Actions column; a readiness header that moves from Building to Ready to Fully Set.
3. **The status chip.** Proposed / Executed / Tested / Verified in mono, one colour step per state. Appears everywhere systems appear, so the eye learns it.
4. **The Founder Action card.** Title, "why only you", what we prepared, exact steps, status. Marked in the Founder colour.
5. **The fork.** Take the keys / Run it for me. One control, two futures.
6. **The bill of materials.** A manifest of everything handed over, grouped and counted.
7. **The intake.** A single field that opens with "Describe the company you want." It is the hero, the footer, and the product's front door.

## 11. Conversion strategy

- **One primary action everywhere:** "Build my business" → `/start`, the intake. Header, hero, section 9, section 15, every package.
- **The intake is the CTA.** Typing an idea is lower friction than "Sign up", and it demonstrates the product before the user commits.
- **Archetype pre-fill.** Choosing a business type anywhere pre-fills the intake, so the first interaction is already specific.
- **Secondary path:** "See how it works" for the not-yet-convinced; it lands on the journey page whose only CTA is the intake.
- **Default package is the middle.** Build my business is visually the reference point; Website is the on-ramp, Build & Run is the extension. Upgrade paths are literal lines between them.
- **Trust adjacent to every CTA.** A single line under each primary button: "Nothing is built before you approve the direction. You own everything we build."
- **No dark patterns.** No countdown, no fake scarcity, no crossed-out prices.

## 12. Trust strategy

Proof by transparency, not by social proof. There are no testimonials, no logos, no invented metrics. Instead, the site shows the system's own artefacts:

| Concern | How the site answers it |
|---|---|
| AI quality | The approval gate: research and recommendation are reviewed by the founder before anything is built. Verification catches what generation misses. |
| Ownership | The ownership manifest: site and export, domain where applicable, email, customer data, documents, brand assets, company history, verification evidence. |
| Verification | The four-state ladder with example checks and what "evidence" means. |
| Permissions and spending | Every AI worker has a permissions card: what it can do, what it must ask about, what it may spend. |
| Approvals | Anything irreversible or costly is an approval, not an action. |
| Customer data | Stays with the founder; export on request; no training on customer data claims unless confirmed by the product team. |
| Reversibility | Stopping Build & Run stops the workers, not the company. |
| Human escalation | A person can be reached; workers escalate what they cannot resolve. |
| Honest claims | We prepare and guide legal and financial steps; we do not give legal or tax advice. We state what is Verified and what is not. |

Language rule: no guarantees the company cannot support. "We verify" rather than "guaranteed". "Where applicable" for domain ownership. "Inside limits you set" for autonomy.

## 13. Mobile strategy

Mobile is designed, not collapsed. The five hardest compositions get their own mobile design:

- **Hero:** headline, intake field, then the Build Room preview as a compact status list. No side-by-side.
- **The Rail:** vertical, with the four phase labels sticky as the user scrolls and the stage markers on a left gutter line.
- **Build Room:** module rows stack; the Founder Actions column becomes a horizontal scroller with snap points; the readiness header pins to the top of the frame.
- **Pricing:** a segmented control swaps the three packages; inclusions are a single list with a "what changes" marker between tiers.
- **Navigation:** a full-height sheet with the primary CTA pinned to the bottom, focus trapped, Escape closes, body scroll locked.

Rules: 44px minimum targets, no hover-only information, type scale via `clamp`, no horizontal page scroll, all diagrams either reflow or scroll within their own container. Inspected at 375, 768 and 1440 for every page.

## 14. Page list

| Page | Purpose | Conversion objective |
|---|---|---|
| Home | Explain the product in seconds | Intake start |
| How it works | Walk the journey from the founder's seat | Intake start |
| The Build Room (product) | Show the system: Build Room, Founder Actions, Verification, Ready and Fully Set, Handoff | Intake start; pricing view |
| Build my website | Entry package | Intake start with Website pre-selected; upgrade awareness |
| Build my business | Flagship package | Intake start with Business pre-selected |
| Build & run | Operations and limits | Intake start with Build & Run pre-selected; trust page |
| Businesses | The ten archetypes with operational specifics | Archetype detail; pre-filled intake |
| Businesses / archetype | What we build for this type, its Founder Actions and verifications | Pre-filled intake |
| Pricing | Package architecture and upgrade paths | Intake start with package pre-selected |
| Trust | Answer every concern honestly | Return to pricing or intake |
| About | Why the company exists, how it operates | Credibility |
| Start | The intake and account creation | Account created |
| Log in | Product shell entry | Session |

## 15. Component system plan

```
src/
  config/brand.ts            name, tagline, mark — the only place the brand name lives
  content/                   journey.ts, archetypes.ts, packages.ts, workers.ts, founderActions.ts, verification.ts
  styles/
    tokens.css               colours, type scale, space, radius, shadow, motion
    globals.css              reset, base typography, focus, reduced motion
  components/
    primitives/              Button, TextLink, Container, Section, Eyebrow, Heading, Prose, Rule, Chip, Input, VisuallyHidden
    nav/                     Header, NavMenu (desktop dropdown), MobileSheet, Footer
    product/                 StatusChip, ModuleRow, BuildRoom, FounderActionCard, VerificationLadder,
                             ReadinessBadge, WorkerCard, PermissionsCard, IntakeField
    diagrams/                JourneyRail, HandoffFork, BillOfMaterials, PackageMatrix, FragmentationLedger
    sections/home/           one file per homepage section, composed in app/page.tsx
  app/                       routes; each page composes sections; metadata per route
  lib/                       useInView, useReducedMotion, usePrefersReducedMotion, cn
```

Principles: tokens are the only source of values; components are typed and accept content from `content/`, never hard-code copy; product UI components are shared between marketing and the eventual app shell so the marketing site cannot drift from the product; motion hooks respect reduced motion centrally.

Stack: **Next.js (App Router), React, TypeScript, CSS Modules on top of CSS custom properties, `next/font`.** No UI framework, no Tailwind, no animation library unless a sequence proves impossible in CSS. Screenshots via Playwright at 375 / 768 / 1440 after every significant change.

---

# Refinement pass

The flagship direction above is unchanged and remains canonical. An independent
challenger implementation surfaced five conceptual ideas worth absorbing. This
pass took them into the existing system rather than replacing anything: the
typefaces, status colours, Build Room architecture, information architecture,
routes and the no-fabricated-proof policy are all as they were.

## What changed, and why

**A new signature section, "The Company, Assembled" (homepage 02).** The page
had a strong problem statement at 01 and then went straight to process at 03.
Nothing answered the problem in a single image. The new section is a schematic
of the whole company in three lanes, Found, Booked and Paid, with a business
email bar tying the last two together.

The argument it makes is the one the site had been making in words: *a company
is not its parts, it is the joins*. So verification is attached to the
connections, not the boxes. Two joins in the Paid lane are deliberately open,
marked in the founder colour, because payouts wait on an identity check only the
founder can complete. The diagram tells the truth about its own unfinished
state, which is the whole product argument in one view.

It is also the answer to "recognisable without the logo". Nothing else on the
web looks like a verified wiring diagram of a small service business.

**The bill of materials left the homepage.** It was a 26-item inventory sitting
two sections after the Build Room, so the page explained the same set of parts
three times in three forms. The schematic now carries the shape, the Build Room
carries the process, and the full inventory stays on Build my business, which is
where a buyer actually wants a list. Net effect on page length is close to
neutral; net effect on repetition is large.

**Verification produces a receipt.** The ladder previously ended in a small
four-step example that restated what the rungs already said. It now names the
single system it is walking, and the payoff is an evidence receipt: what was
checked, the result per line, the raw evidence, and an unresolved dependency.

The receipt deliberately shows a check that did **not** fully pass. Three lines
pass, the payout line is blocked, and the block is explained and attributed to
a Founder Action. A verification story that only ever shows green is marketing.
This one is the product.

**The handoff became an actual fork.** It was a segmented control, which reads
as a filter rather than a decision. It is now a drawn branch: a trunk descends
from the section, splits, and the chosen leg runs green into a full-size choice
block. Each choice carries its consequence and its commitment, "No ongoing fee"
against "Monthly, stop any time". The page's most important decision now looks
like a decision.

## What was considered and rejected

- **Rewriting the hero around "The Company, Assembled".** The hero's job is the
  promise and the first action. The framing works better as the name of the
  section that proves it, where it can be shown rather than asserted.
- **A third dark section for the handoff.** Ink is reserved for exactly two
  moments, both of which show the interior of the system. Spending it on a third
  would weaken all three.
- **Animating the schematic on a timer.** The reveal is pure CSS off a per-index
  delay, so no JavaScript runs, client bundle size is unchanged, and reduced
  motion collapses it to the finished state.

## A tooling bug this pass exposed

Screenshots taken through Playwright were capturing half-drawn connections.
The site was correct; the capture was not. Playwright's beyond-viewport capture
forces a style recalculation that restarts CSS animations, so the screenshot
caught a frame partway through. All three capture scripts now pass
`animations: "disabled"`, which finishes finite animations and pins them to
their end state. Without that fix the review gallery would have shipped images
of work that looked unfinished.

---

# The merge

Two projects existed. The Business Builder flagship explained a system: states,
gates, evidence, handoff. The original Website Builder site proved taste: five
original design studies, real photography, published prices.

Each was missing what the other had. The flagship could tell you the booking
would reach your calendar but could not show you a page you would be proud of.
The original could show you a page you would be proud of but only sold a page.

A founder deciding whether to spend money here asks two questions in this order:
**will it look good**, and **will it actually work**. A site that answers only
one loses to a site that answers the other.

## What came across, and why

**The design studies.** FIELD, ARC House, FORM / 01, OUT THERE and CLARITY. They
are original work by the studio and they are labelled as studies in three places:
a stamp on every image, a disclosure under every grid, and a section on `/work`
that says in plain words what they are and are not.

This is the honest answer to having no clients yet. Borrowing credibility with
invented logos and testimonials would have been the dishonest one, and the rest
of this site would not have survived the contradiction.

Each study carries a "where it transfers" line connecting it to the service
businesses we actually build for, because a pressure washing founder looking at
a skincare brand needs to be told what they are supposed to take from it. The
studies demonstrate a level of care, not an industry.

**Real prices.** The website build has three published rates: Launch at $500,
Business at $1,000, Premium at $1,500, with page counts, inclusions and an
honest list of what sits outside them. These were already the studio's public
rates, so publishing them here cost nothing and removed the weakest thing about
the flagship, which was a pricing page with no prices on it.

The company build is still not priced, on purpose. Its scope depends on what the
research finds, so a number before the research is a guess wearing a number. The
page now says that instead of going quiet.

**A reassurance line.** "Explore before you commit" came straight from the
original and does more work than the sentence it replaced.

## What did not come across

**The pinned scroll story.** Roughly a third of the original's page height went
to one message, and any visitor landing between keyframes saw overlapping
half-opacity layers. The flagship already tells that story with the journey rail
and the Build Room, both of which are legible at every scroll position.

**Manrope.** Instrument Sans stays. The type system was not the thing that
needed fixing.

**The generative first-look sketch.** Genuinely good, and out of scope for a
marketing site. The intake field plus `SiteFrame` covers the same intent without
a second product to maintain.

## The new shape of the homepage

The studies sit at section 06, immediately after "Generated is a file. Built is
a business." That section ends by listing what gets handed over, and the natural
next beat is showing what it looks like. Craft proof any later would arrive after
the reader has already decided.

## Known gap

The studies are not service businesses. Skincare, architecture, a movement studio,
an outdoor campaign and a material study show range and care, but none of them is
a cleaning company. The "where it transfers" line bridges that, and it is a
bridge rather than a solution. The real fix is the first three real builds, at
which point these studies can be retired in favour of work that is both real and
on-archetype.
