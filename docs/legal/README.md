# Legal + Commercial Readiness v1

Prepared 2026-09-14 against `main` at `5022446`.

## What this is

A commercial and legal operating package drafted so that Business Builder can be
reviewed by a licensed attorney and then take its first real paid customer. It is
the input to legal review, not the output of it.

## What this is not

**Nothing in this directory is legal advice, and nothing here has been reviewed or
approved by an attorney.** No document here may be published on the site, sent to a
customer, incorporated by reference into a payment flow, or relied on in a dispute
until a licensed Texas attorney has reviewed it. Several documents contain
deliberate open questions that only counsel can close.

Do not treat the presence of a draft as evidence that the position in it is
defensible. Several positions taken here are commercially reasonable and legally
untested, particularly around liability for AI-performed work.

## The two markers

Every document uses two inline markers. They are the whole point of the package.

**`[COUNSEL]`** marks a decision that requires a lawyer. Usually this is a choice
between defensible positions, a number that has to be picked, or a clause whose
enforceability depends on Texas law. These are collected in
[21-attorney-review-queue.md](21-attorney-review-queue.md).

**`[BUILD]`** marks a sentence that is not yet true. The policy says the product
does something the product does not currently do. Publishing the sentence before
building the capability converts a drafting choice into a misrepresentation. These
are collected in [22-security-and-build-gaps.md](22-security-and-build-gaps.md).

A document with unresolved `[BUILD]` markers cannot be published even after counsel
signs off on the language, because the language would be false.

## Authoritative commercial model

Every document in this directory is drafted against these figures. They are not
changed anywhere in this package. If a document appears to contradict this table,
the table wins and the document is wrong.

| Offer | Upfront | Recurring |
|---|---|---|
| Build my website | $795 one-time | none |
| Build my business | $1,495 one-time | none |
| Build my business + Build & Run | $1,995 upfront | $299/month |
| Build & Run standalone | $795 activation | $299/month |
| Existing business + Build & Run | from $1,495 onboarding | $299/month |

No revenue share. No equity. No percentage of customer revenue. No transaction fee.
Government, provider and third-party costs are separate where they apply.

## The review page

A navigable summary of this package, suitable for handing to an attorney, is
published at:

https://claude.ai/code/artifact/2b8eeafa-a38c-42dd-9df6-cf97b23fda42

It carries the risk summary, the tax findings, the site audit with exact
replacements, the attorney queue and the launch blockers. The full drafts live in
this directory.

## Reading order

Start with the risk summary. It is the only document that assumes no prior context.

| # | Document | Purpose |
|---|---|---|
| 00 | [Risk summary](00-risk-summary.md) | What can go wrong, ranked, with the mitigation for each |
| 01 | [Terms of Service](01-terms-of-service.md) | Master agreement structure and draft |
| 02 | [Privacy Policy](02-privacy-policy.md) | Draft plus the TDPSA obligations behind it |
| 03 | [Build My Website terms](03-service-terms-website.md) | Service schedule |
| 04 | [Build My Business terms](04-service-terms-business.md) | Service schedule |
| 05 | [Build & Run terms](05-service-terms-build-and-run.md) | Service schedule |
| 06 | [Founding customer terms](06-founding-customer-terms.md) | What "early" does and does not mean |
| 07 | [Pilot service agreement](07-pilot-service-agreement.md) | First supervised residential-cleaning pilot |
| 08 | [Cancellation policy](08-cancellation-policy.md) | Stopping Build & Run |
| 09 | [Refund policy recommendation](09-refund-policy-recommendation.md) | Milestone model, with rationale |
| 10 | [Third-party fee disclosure](10-third-party-fees.md) | What the customer pays someone else |
| 11 | [IP and ownership model](11-ip-ownership-model.md) | The customer/platform boundary |
| 12 | [Data ownership, export, handoff](12-data-export-handoff.md) | What leaves, in what form, when |
| 13 | [Credentials and accounts](13-credentials-and-accounts.md) | Who holds what, and access hygiene |
| 14 | [AI and automation disclosure](14-ai-automation-disclosure.md) | Bounded autonomy, stated honestly |
| 15 | [Fair use policy](15-fair-use-policy.md) | Bounding a flat fee against variable cost |
| 16 | [Data retention and deletion](16-data-retention-deletion.md) | Periods, deletion behaviour, legal hold |
| 17 | [Liability and warranty framework](17-liability-warranty-framework.md) | For counsel |
| 18 | [Dispute and governing law](18-dispute-governing-law.md) | For counsel |
| 19 | [Texas legal review checklist](19-texas-legal-review-checklist.md) | Jurisdiction-specific items |
| 20 | [Website copy audit](20-website-copy-audit.md) | Risks found, with exact replacements |
| 21 | [Attorney review queue](21-attorney-review-queue.md) | Every `[COUNSEL]` marker, collected |
| 22 | [Security and build gaps](22-security-and-build-gaps.md) | Every `[BUILD]` marker, collected |
| 23 | [Launch blockers](23-launch-blockers.md) | What must close before the first paid customer |

## Relationship to the product

This package deliberately does not change product architecture. Where a legal
position depends on a product behaviour, the behaviour is described as a
requirement in the `[BUILD]` markers rather than implemented here.

The vocabulary is taken from the product and must stay aligned with it. Two state
systems already exist in the codebase and must not be blurred in contract language
either. `Keep / Improve / Replace / Missing` describes what to do with something
that already exists. `Proposed / Executed / Tested / Verified` describes how far
through implementation something is. `Ready` and `Fully Set` are defined product
states with specific check lists behind them, and because the contract references
them, their definitions become contractual.

## Research basis

Texas tax, consumer protection, privacy and communications research supporting this
package is cited inline in the documents that rely on it, with statute numbers and
links. Where research could not confirm a point from an authoritative source, the
document says so rather than asserting it.
