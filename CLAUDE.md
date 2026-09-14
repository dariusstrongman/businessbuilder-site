@AGENTS.md

# Business Builder site

Marketing site and product shell for Business Builder. Read `README.md` for the stack and
`docs/strategy.md` for positioning, information architecture and the design rationale.

## Rules this repo enforces

- **Brand name lives in one file.** `src/config/brand.ts`. Never hard-code "Business Builder" in a
  component, a heading or a metadata string.
- **Copy lives in `src/content/`.** Components take typed data; they do not contain marketing prose.
  A new section means a new content module, not a wall of JSX strings.
- **Values come from tokens.** `src/styles/tokens.css` holds every colour, size, space, radius and
  duration. No arbitrary hex, px or ms inside a component stylesheet.
- **Surface tone is an attribute.** Use `<Section tone="ink">` or `tone="paper-2"`; never restyle
  colours per section. `ink` is reserved for showing the inside of the product.
- **Cards are objects.** A bordered card represents a real thing in the product (a module, a Founder
  Action, a worker, a package). Do not wrap a paragraph in a card for decoration.
- **Motion shows state.** If an animation does not depict something changing state, cut it. Every
  loop pauses off-screen (`useInView`) and respects `useReducedMotion`.

## Never put on this site

Testimonials, customer logos, revenue or growth figures, case studies, star ratings, countdowns,
crossed-out prices, or screenshots of customers that do not exist. Where a visual is needed, render
a real product surface (`SiteFrame`, `BuildRoom`, `EvidenceLog`) or a diagram of a real process.

**The design studies are the one exception, and only on these terms.** They are original work by
this studio. They carry a "Study" stamp on the image, a disclosure line under the grid, and a
section on `/work` saying plainly what they are and are not. Never describe one as a client, a case
study, or a company we built. If that framing ever slips, the studies have to come down.

**Never invent a price.** The website tiers in `websiteTiers.ts` are real published rates. The
company build is quoted with the recommendation. Do not fill that gap with a made-up number or a
fake range.

Do not claim what cannot be verified. We prepare and guide legal, tax and financial steps; we do not
advise on them. We verify systems we connect; we do not promise revenue, rankings or customers. AI
workers act inside limits the founder sets; they are not autonomous employees.

## Before calling a change done

Run the dev server on 3100, then:

```bash
npm run verify                                             # typecheck, lint, a11y, keyboard — all must pass
node scripts/shots.mjs <route|index> .shots 375,768,1440   # then look at the images
```

For anything touching layout, also check `scripts/overflow.mjs` at 375 and `scripts/cls.mjs`.
Judge visual work from the rendered screenshots, not from the source.
