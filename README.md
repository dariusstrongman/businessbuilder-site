# Business Builder — independent homepage challenger

The Company, Assembled. A handcrafted homepage direction built with Next.js, TypeScript, React, and locally hosted Manrope / IBM Plex Mono fonts.

All project code, notes, assets, browser captures, and QA artifacts live in this repository. No code or assets from another Desktop implementation are used.

## Run locally

```powershell
npm ci --cache .npm-cache
npm run dev
```

Open **http://127.0.0.1:3100**. Use the explicit IPv4 address; other projects may use `localhost` or another interface. Do not stop another project's server to run this one. Change the port in the package scripts if needed.

For the production build:

```powershell
npm run build
npm run start
```

## Scope

Only the homepage is implemented. The additional marketing pages, authentication, checkout, live Build Room, external integrations, and backend business-building engine are outside this delivery.

The homepage includes interactive journey stages, six Build Room modules, ten supported business categories, photography/video focus choices, four verification states, ownership/operations choices, scope comparison, trust disclosures, and a local founder brief preview/download. The preview makes no network submission and stores no personal information in browser storage. Reloading discards the in-tab brief; downloaded briefs remain on the user's device.

Illustrative company names, UI, status records, and evidence are labeled as examples. Prices, testimonials, customer logos, launch dates, or guaranteed business outcomes are not fabricated. The page is intentionally `noindex` until launch scope and claims are confirmed.

## Structure

- `src/app/page.tsx`: homepage composition, with one public page.
- `src/components/`: bounded semantic components and interactive product explanations.
- `src/lib/brand.ts`: working brand name, site description; shared wordmarks and metadata derive from this.
- `src/lib/content.ts`: journey, business types, and illustrative module content.
- `src/app/globals.css`: design tokens, base rules, components, and responsive layers.
- `notes/research.md`: reference research and decisions.
- `notes/quality-assessment.md`: complete visual and technical assessment.
- `artifacts/screenshots/final/`: final 375 / 768 / 1440 captures, including full pages and section details.
- `artifacts/screenshots/states/`: alternate interactive states, intake, navigation, and 320px reflow.
- `artifacts/qa/`: executable-check results and brief-download evidence.
- `artifacts/performance/`: Lighthouse HTML/JSON reports.

## Reproduce checks

With the production server running:

```powershell
npm run typecheck
npm run qa
node scripts/state-audit.mjs
node scripts/capture.mjs final
node scripts/performance.mjs
```

Browser scripts use installed Microsoft Edge in headless mode. Lighthouse uses its standard mobile profile and official desktop configuration, with the viewport dimensions adjusted to the requested review sizes. Those are local lab measurements, not field Core Web Vitals.

## Rebranding and launch

Change the brand data, typography/color tokens, shared mark, and favicon together. The working name is not tied to a domain. Before public launch, confirm service scope and readiness definitions; provide real intake/account services, ownership and data terms, pricing, availability, and human support arrangements. Then update metadata/indexing for the chosen domain.
