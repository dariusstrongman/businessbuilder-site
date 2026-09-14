# Business Builder — flagship website

The customer-facing website for Business Builder: the service that takes a founder from an idea to
a company that is researched, assembled, verified and handed over.

This project merges two earlier ones. The system, architecture and product storytelling come from
the Business Builder flagship. The design studies, the real website project prices and the warmth
that comes from showing actual work come from the original Website Builder site, which is where
this company started. The flagship could explain the system but could not prove taste. The original
could prove taste but only sold a website. Together they answer both questions a founder asks:
will this actually work, and will it look good.

`Business Builder` is a working name. Every occurrence comes from `src/config/brand.ts`, so the
company can be renamed without touching a component.

The full product interpretation, positioning, information architecture, homepage narrative and
design system rationale are in [`docs/strategy.md`](docs/strategy.md).

To review it without running anything, [`docs/screens`](docs/screens/README.md) holds every page
rendered at desktop and mobile, plus the signature surfaces at 2x.

## Design studies

Five original studies, shown on `/work` and in a strip on the homepage.

**Each one is a rendered website, not a photograph.** `StudySite` builds the page in markup:
navigation, a headline split between the sans and the serif italic, supporting lines, a call to
action, small print and a band beneath the hero. `public/studies/` holds only the photography that
sits inside those designs. The layout, type and palette are the work.

Three layouts carry the five studies: `overlay` puts type over a full-bleed photograph, `split`
sets a type panel beside it, and `display` lets the headline become the image. Each study's palette
lives in `studies.ts` as content, not as tokens, and is passed in as custom properties so it never
leaks into the rest of the site. Container queries drive the whole mock, so the same component
reads as a desktop site in a wide cell and collapses to a phone layout in a narrow one.

They are not clients, not case studies and not companies we have built, and the site says so in
three separate places: a stamp on every mock, a disclosure under every grid, and a section on
`/work`. They exist because a founder about to spend money on design should be able to judge the
work before the sales conversation, not after it.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16, App Router, React 19, TypeScript | Static generation for every marketing route; server components by default |
| Styling | CSS Modules over CSS custom properties | No utility-class template aesthetic, no runtime cost, tokens enforce the system |
| Type | `next/font` with Instrument Sans, Instrument Serif, JetBrains Mono | Self-hosted, size-adjusted fallbacks, no external requests |
| Motion | CSS transitions and small scripted sequences | No animation library; everything respects `prefers-reduced-motion` |
| Testing the output | Playwright + axe-core scripts in `scripts/` | Visual and accessibility regressions are caught by looking, not by guessing |

No UI framework and no component library: the product surfaces (Build Room, status chips, Founder
Action cards, permissions cards) are the design, so they are written directly.

## Commands

```bash
npm run dev            # development server on :3000
npm run build          # production build
npm run start          # serve the production build
npm run lint           # eslint
npm run typecheck      # tsc --noEmit

npm run shots          # screenshot a route at 375 / 768 / 1440 into .shots/
npm run a11y           # axe-core, heading order, tap targets and overflow, every route, 2 viewports
npm run keyboard       # drives every interactive component with the keyboard only
npm run perf           # LCP / CLS / bytes on a throttled mobile profile against a production build
npm run verify         # typecheck + lint + a11y + keyboard
```

The inspection scripts expect a server already running. `shots` and `a11y` default to
`http://localhost:3100`, `perf` to `http://localhost:3200`; override with `SHOOT_BASE`.

```bash
npx next dev --port 3100
node scripts/shots.mjs index .shots 375,768,1440   # "index" means "/"
node scripts/zoom.mjs index "[aria-labelledby='hero-title']" .shots/hero.png 1440
node scripts/overflow.mjs /pricing 375             # what is widening the page
node scripts/cls.mjs index 390                     # which elements shift
```

## Structure

```
src/
  config/brand.ts        the working name, routes and CTA copy — the only place the brand lives
  config/site.ts         deployment URL (NEXT_PUBLIC_SITE_URL)
  content/               all copy and product data, typed, no strings hard-coded in components
    journey.ts             the twelve stages and four phases
    journeyDetail.ts       per-stage: what happens, what you do, what you get
    archetypes.ts          the ten supported business types
    buildRoom.ts           modules, statuses, Founder Actions, readiness, ownership
    evidence.ts            the example evidence log
    packages.ts            the three packages
    pricing.ts             the comparison matrix and pricing questions
    websiteTiers.ts        the real, published website project prices
    studies.ts             the five design studies, including each rendered page's own content
    workers.ts             AI workers and their limits
    trust.ts trustDetail.ts deliverables.ts
  styles/
    tokens.css           colour, type scale, space, radius, shadow, motion — the whole system
    globals.css          reset, base typography, focus, reduced motion
  components/
    primitives/          Button, Container, Section, Heading, Eyebrow, Split, Ledger, Faq, PageHero, Icons
    nav/                 Header (dropdown + mobile sheet), Footer
    product/             StatusChip, BuildRoom, FounderActionCard, PermissionsCard, IntakeField,
                         SiteFrame, EvidenceLog — shared with the eventual product shell
    diagrams/            JourneyRail, HandoffFork, PackageMatrix, StageLedger, ArchetypeExplorer
    sections/            CtaBand and the homepage sections, one file each
  app/                   routes; each page composes sections and owns its metadata
```

### Design system

Tokens in `src/styles/tokens.css` are the only source of values. Three surface tones are selected
with a `data-tone` attribute on a `<Section>`, and each remaps the same semantic variables:

- `paper` (default) — the page ground.
- `paper-2` — secondary sections.
- `ink` — the interior of the system. Used exactly twice on the homepage, both times to show what
  the product looks like from the inside.

One accent colour, and it is the verification colour: green means verified, everywhere. Amber means
tested but not yet checked. Blue marks a Founder Action, the things only the founder can do.

### Motion

Motion only ever shows state changing. Three kinds are allowed: status transitions, the two
signature diagram sequences (the journey rail activating, the Build Room progressing), and hover or
focus micro-interactions. Loops pause when off-screen via `useInView`, and `useReducedMotion`
renders final states with no movement.

## Renaming the company

1. Change `brand.name`, `brand.tagline` and `brand.description` in `src/config/brand.ts`.
2. Replace the mark in `BrandMark` in `src/components/primitives/Icons.tsx`.
3. Adjust the accent hue in `src/styles/tokens.css` if the new identity calls for it. Keep the
   contrast ratios: every text tier is at or above 4.5:1 on both paper tones and on ink.

Nothing else references the name.

## Product seams

Two places are deliberately left unconnected, and both are marked in the code:

- `src/app/start/actions.ts` validates an intake and acknowledges it. Wire it to account creation
  when the product backend exists.
- `src/app/login/page.tsx` posts to itself. Wire it to the product's authentication.

## Standards this repo holds itself to

- **Accessibility**: `npm run a11y` reports zero issues across every route at 375 and 1440 —
  axe-core (WCAG 2.0/2.1/2.2 A and AA plus best practices), single `h1` per page, no heading-level
  jumps, no horizontal overflow, no undersized tap targets.
- **Performance**: on a 4× CPU throttle and a slow connection against the production build, LCP is
  around one second on every page and CLS stays under 0.05.
- **No invented proof**: no testimonials, customer logos, revenue figures, case studies or
  screenshots of customers that do not exist. The design studies are real work by this studio, and
  they are labelled as studies everywhere they appear. Everything else visual is a rendering of a
  real product surface or a diagram of a real process.
- **Prices are real or absent**: the website build has three published prices because its scope is
  knowable. The company build is quoted with the recommendation, because pricing it beforehand
  would be a guess wearing a number.
