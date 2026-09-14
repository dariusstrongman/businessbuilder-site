# Homepage quality assessment

Final review: September 13, 2026. Scope: the independent Business Builder homepage direction, including its illustrative interactions and local brief preview. No other customer pages or backend engine were implemented.

## Verdict

**9.5 / 10 overall (9.51 arithmetic mean).** This is my design and implementation assessment of the requested homepage direction. It is not an independent rating, a conversion experiment, or a claim that the underlying business-building service is launch-ready.

## Full scorecard

| Dimension | Score | Evidence and practical limit |
| --- | ---: | --- |
| First impression | 9.5 | The outcome is immediate, with a strong editorial headline, explicit build action, and a company assembly showing both deliverables and unfinished systems. The working brand remains provisional. |
| Hierarchy | 9.6 | A clear headline/body/action hierarchy repeats consistently, with numbered signposts and restrained operational labels. Long-page navigation gives visitors direct access to scope and trust. |
| Typography | 9.5 | Self-hosted Manrope and IBM Plex Mono distinguish human-facing copy from operational records. Rendered review corrected font scoping and raised small text. Compact product labels still reward a closer look. |
| Composition | 9.4 | The homepage alternates editorial statements, a continuous journey, a working-room view, a category explorer, an evidence receipt, and horizontal package rows. Some two-column structures remain intentionally familiar. |
| Originality | 9.3 | The assembly, evidence, and ownership narrative is independently composed around this product. The execution avoids competitor assets and generic feature-card walls; it does not claim to invent product UI conventions. |
| Clarity | 9.7 | Research, approval, execution, verification, and founder responsibilities are explicit. The website-only offer is separated from building the company and ongoing operations. |
| Trust | 9.6 | Illustrative states are labeled, pending work cannot masquerade as verified, founder dependencies are visible, and ownership and limitations are spelled out. Real service terms and evidence remain launch requirements. |
| Conversion | 9.4 | Concrete calls to action preserve package, category, and creative-service focus. The brief is useful and downloadable without collecting personal data. Conversion effectiveness has not been tested with customers. |
| Product storytelling | 9.8 | Twelve stages, six system modules, ten business types, four verification states, two readiness definitions, and the handoff choice form one understandable story. Each interaction changes meaningful content. |
| Mobile | 9.5 | Reviewed at 375 and 768, with a separate vertical journey, compact module controls, a native business selector, responsive pricing, and a usable modal. Additional 320px reflow passed without overflow. |
| Motion | 9.2 | Short transitions explain selection and state changes, and reduced motion removes movement. Deliberately restrained; there is no cinematic autoplay or scroll-driven spectacle. |
| Accessibility | 9.6 | No automated WCAG A/AA violations in the tested default, alternate, or modal states. Keyboard navigation, focus containment/restoration, skip link, disclosures, and reduced motion were tested. No claim of complete screen-reader or cross-browser certification. |
| Performance | 9.7 | Final local Lighthouse: desktop 100, mobile 93. Both recorded zero layout shift; transferred page weight was approximately 208 KiB. Mobile LCP was close to the 2.5-second threshold, so field monitoring remains important. |
| Brand distinctiveness | 9.3 | Warm paper, cobalt action color, structured assembly details, and restrained green evidence surfaces form a consistent identity. The name and final trademark/logo work are not settled. |
| Premium feel | 9.6 | Precise type, restrained surfaces, visible evidence, honest scope, and coherent interaction details support a serious service purchase. There is no fabricated social proof to manufacture credibility. |

## Rendered iterations

1. **Initial render:** discovered a font-variable scoping error and a mispositioned Build Room eyebrow. These were corrected before assessing visual quality.
2. **Typography and content pass:** increased product labels and body text; added CRM, scheduling, and payment states to the hero so the product was not perceived as only a website builder.
3. **Accessibility pass:** darkened secondary text and stage numerals to meet contrast checks. Added explicit dialog focus wrapping and verified focus restoration.
4. **Product-consistency pass:** separated pending and completed Founder Actions, removed checkmarks from blocked requirements, preserved creative-service focus through intake, and simplified the brief's selected-service heading.
5. **Final review:** captured full pages and section views at 375, 768, and 1440; inspected mobile/tablet/desktop compositions and alternate states. Fixed the screenshot harness to avoid sticky-header artifacts and captures mid-transition.

The earlier screenshots remain in their named iteration folders so the corrections are reviewable. Only `artifacts/screenshots/final/` and `artifacts/screenshots/states/` represent the delivered direction.

## Technical verification

- Production build and TypeScript check passed.
- All 20 grouped browser scenarios passed. They exercise every journey stage, every Build Room module, all ten business categories, photography/video choices, verification states, ownership/operations, responsive navigation, the brief form and download, modal keyboard behavior, FAQs, and anchor destinations.
- Additional alternate-state audit passed at 375 / 768 / 1440.
- No horizontal overflow at 375 / 768 / 1440; additional 320px reflow also passed.
- No page runtime errors were recorded.
- Default pages, alternate states, and the brief dialog returned no automated WCAG 2 A/AA, 2.1 AA, or 2.2 AA violations in the executed axe checks.
- Brief download content was inspected. No form POST or other non-GET request occurred during the interaction suite.
- Fonts are local. No image downloads, third-party analytics, tracking scripts, or external account connections are needed by the homepage.

## Performance measurement

Production server, installed Microsoft Edge, Lighthouse simulated mobile Slow 4G and official desktop Dense 4G configuration. Viewports were set to 375 × 812 and 1440 × 1000 respectively. Reports were run sequentially.

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 93 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| First contentful paint | 0.97 s | 0.25 s |
| Largest contentful paint | 2.48 s | 0.53 s |
| Total blocking time | 255 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |
| Transfer size | 208 KiB | 208 KiB |

An earlier desktop run incorrectly retained mobile throttling. The final script uses Lighthouse's official desktop configuration; only the corrected final reports are used above. The mobile score varied from 93 to 95 during development. These are local lab results, not real-user Core Web Vitals. INP was not measured in the field.

SEO audit score is 60 because the homepage preview deliberately declares `noindex`. Metadata, title, language, and description are present. Public indexing must be revisited with the chosen domain and validated launch offer; the preview has not been published.

## Remaining limitations

- There is no login/signup service, payment processing, live submission, or business-building backend in this homepage delivery.
- “Sunday” is an illustrative company identity, not a customer or case study. The Build Room and evidence receipt show explanatory states, not results of actual integrations.
- The brief remains in the current tab until reload. Downloading creates a file on the user's device; it does not submit it.
- Pricing, availability, readiness criteria, support coverage, legal/data terms, and the real ownership/export contract must be validated before launch.
- Automated checks and manual visual review do not replace testing with target founders, assistive-technology users, or a wider browser/device matrix.
- Mobile LCP is near the good/needs-improvement boundary in the measured lab profile. A deployed version needs field observation before making performance guarantees.

These are scope and validation limits, not hidden claims that the preview is a functioning end-to-end business service.

## Review artifacts

- [375px full page](../artifacts/screenshots/final/home-375-full.png)
- [768px full page](../artifacts/screenshots/final/home-768-full.png)
- [1440px full page](../artifacts/screenshots/final/home-1440-full.png)
- [1440px first screen](../artifacts/screenshots/final/home-1440-hero.png)
- [Founder Action at 768px](../artifacts/screenshots/states/founder-action-768.png)
- [Managed operations at 1440px](../artifacts/screenshots/states/managed-operations-1440.png)
- [Creative business at 375px](../artifacts/screenshots/states/creative-business-375.png)
- [Intake at 375px](../artifacts/screenshots/states/intake-form-375.png)
- [Browser test report](../artifacts/qa/report.json)
- [Alternate-state audit](../artifacts/qa/states.json)
- [Mobile Lighthouse report](../artifacts/performance/mobile.html)
- [Desktop Lighthouse report](../artifacts/performance/desktop.html)
- [Research and references](research.md)
