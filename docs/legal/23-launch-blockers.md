# 23. Blockers before the first real paid customer

> The short list. What must be closed before money changes hands, in order.

## The test

Before accepting a paid customer a company should be able to answer four questions
without hesitating.

1. What did the customer agree to, and can we prove it?
2. What do we owe them if it goes wrong?
3. What are we allowed to do with their data, and can we do what we promised?
4. What does this actually cost us, including tax?

Business Builder can currently answer none of them.

---

## Blocker 1, there is no contract

**Severity: absolute.**

No Terms of Service. No Privacy Policy. No refund policy. No cancellation policy. No
acceptance mechanism. No record of what a customer agreed to.

The site is unusually honest and contains many customer-favourable promises. With no
terms, **those promises are the contract**, and there is nothing on the other side of
the ledger. A customer could reasonably assert every commitment listed in tier 7 of
[20-website-copy-audit.md](20-website-copy-audit.md) and Business Builder would have
no counterweight.

**To close:** counsel drafts from documents 01 through 09, `[BUILD]` items in tiers 1
and 2 of [22-security-and-build-gaps.md](22-security-and-build-gaps.md) are
implemented, and an acceptance mechanism with version recording exists.

One refinement from the market research that changes what "acceptance mechanism"
means. **A checkout checkbox that only links to the terms may be rejected by the card
issuer as insufficient evidence.** The full text has to be presented before purchase,
with the consent object, the timestamp, and **a version id of the policy as it read at
that moment** persisted against the transaction. That last artifact is the single
highest-leverage engineering investment in the package, because it serves as the
disclosure evidence, the payment-dispute evidence, the fix for the illusory-contract
problem, and the consent record several state statutes require. See
[24-market-practice-benchmarks.md](24-market-practice-benchmarks.md), section 5.

---

## Blocker 2, the site states things that are not true

**Severity: absolute. This one is live right now.**

Three items, each independently disqualifying.

**The intake tells every submitter their build is open.** Nothing is persisted and
nothing is sent. Every person who has used that form has been told something false.

**The login page collects a password** with no backend, no policy and no
destination.

**The bundle price is understated by $1,200** on the homepage, on the pricing page
and on the intake form. The `run` package presents the full Business inclusion list
at $795 plus $299 a month when the correct figure is $1,995 plus $299 a month.

**To close:** fix or remove each. The pricing correction is proposed in document 20
and needs sign-off before it is applied.

---

## Blocker 3, the tax position is unresolved

**Severity: absolute, and it changes the pricing.**

Research indicates the $299 subscription is a taxable data processing service in
Texas, that the activation fee follows it, and that the website build is probably
taxable too. A Texas business has no threshold to reach before the obligation
attaches. The published prices say nothing about tax.

There is also a direct collision between the IP retention model and the treatment of
a source-code export, set out in
[19-texas-legal-review-checklist.md](19-texas-legal-review-checklist.md).

**To close:** a Texas CPA confirms the treatment, a sales and use tax permit is
obtained, the pricing decision is made, and the disclosure appears before the
customer commits.

---

## Blocker 4, nobody knows what the customer bought

**Severity: high.**

There is no scope document. The refund policy, the acceptance mechanism, the
warranty of conformity and change control all depend on "the agreed scope" being a
written artifact the customer approved.

Without it there is no refund policy, only a negotiation, and no chargeback defence.

**To close:** a scope document is generated per Order, approved in a recorded way,
and retained.

---

## Blocker 5, the operating limits are described but not enforced

**Severity: high for Build & Run. Not a blocker for the one-time builds.**

The site makes eighteen distinct assertions about what AI workers can, must ask
about, and cannot do. An instruction to a model is not a control.

Under the liability allocation recommended in
[17-liability-warranty-framework.md](17-liability-warranty-framework.md), Business
Builder bears failures of the mechanism. That makes an unenforced boundary an
uninsured liability rather than a product gap.

The approval boundary is also contradicted on `/build-and-run` by the worker day
rendered on the same page, which needs a product decision before either statement
can stand.

**To close:** enforce boundaries outside the model, give the customer visible and
changeable limits, build a verified halt path, and resolve the contradiction.

---

## Blocker 6, there is no insurance position

**Severity: high, and it may be existential.**

Confirm whether technology errors and omissions cover and cyber liability exist, and
whether either responds to AI-performed work. An emerging exclusion for AI-related
claims is worth checking specifically.

A liability framework with no insurance behind it transfers risk on paper only. If
cover is unavailable for the AI-performed work, that is a material fact about the
business model and should be known before launch.

**To close:** a broker conversation, before the pilot.

---

## Blocker 7, security claims cannot yet be made

**Severity: high. Blocks the Privacy Policy, which blocks the Terms.**

Ten credential-handling requirements and seven data-handling requirements in
[22-security-and-build-gaps.md](22-security-and-build-gaps.md), none currently
verifiable.

The Privacy Policy will contain statements about encryption, access control, logging
and retention. Each is a factual claim. A privacy policy published before these are
true is a list of statements the company cannot stand behind, and it is
discoverable.

**To close:** implement and verify, then write the policy to what exists.

---

## Blocker 8, the fair use policy is promised and does not exist

**Severity: medium, and it has a deadline attached.**

`src/content/founding.ts:170` commits to publishing a fair use policy "before it
could ever matter". Document 15 recommends it be published before the first Build &
Run customer is billed, not before the first one exceeds it.

There is also no measurement of operating volume, without which the policy is
decorative.

**To close:** adopt the published-range approach in document 15 and publish it.

---

## Blocker 8a, the Business Opportunity Rule is unexamined

**Severity: unknown, and that is the problem.**

A federal rule can reach a service that takes a required payment as a condition of
commencing a business, where the seller also represents that it will provide outlets,
accounts or customers, or makes any earnings claim. Where it applies, a one-page
disclosure must be **delivered in advance of the sale**.

An obligation that attaches before the sale cannot be repaired after it. This needs a
determination rather than an assumption, and the site copy that drifts toward earnings
and customer-acquisition claims should be corrected either way.

**To close:** counsel determines applicability. See
[04-service-terms-business.md](04-service-terms-business.md) and
[25-texas-consumer-privacy-upl.md](25-texas-consumer-privacy-upl.md).

Research has since sharpened this considerably. **The federal rule requires no earnings
claim at all** — the customer-provision prong stands alone, and extends to "otherwise
assisting the purchaser in obtaining his or her own customers". The disclosure must be
delivered **seven calendar days before the buyer signs or pays**, which is incompatible
with same-day checkout. A Texas statute adds a separate test needing both a profit
representation and a marketing program, with a filing before advertising and a $25,000
bond. And an enforcement action settled in March 2026 against an AI company selling to
small businesses ended in a permanent ban on marketing business opportunities.

## Blocker 8b, where the pilot agreement gets signed

**Severity: high, and trivially avoidable.**

A Texas statute gives a three-business-day cancellation right for consumer transactions
over $25 solicited and signed **away from the merchant's own place of business**. It
requires a boldface notice adjacent to the signature line and a detachable duplicate
form. **A non-compliant contract is void**, and non-compliance is a per se deceptive
practices violation.

The pilot customer will most naturally be signed at their own premises. That triggers it.

**To close:** sign at a fixed business location, which is exempt, or comply.


## Blocker 9, the company has no published identity

**Severity: medium, and trivially fixable.**

No legal entity name. No registered address. No contact email. No phone number. No
way to reach the company except by submitting the intake form.

A contract cannot specify a notice address that is not published. A privacy policy
cannot name a contact that does not exist.

**To close:** publish them.

---

## Pilot-specific blockers

These are in addition to the above, and the pilot should not start until the general
blockers are closed.

| Blocker | Why |
|---|---|
| The pilot agreement is unsigned and undrafted | Document 07 is a specification, not a contract |
| Joint employment not analysed | Scheduling may constitute direction of workers |
| No review queue | The supervision commitment cannot be evidenced without one |
| Quote drafting cannot apply a tax rule | Residential cleaning is taxable in Texas |
| End-customer data handling unbuilt | Home addresses need restricted handling |
| No wind-down path | A pilot ending must not leave end customers waiting |
| Liability cap meaningless at a nominal fee | Needs a stated floor, or insurance, or both |

---

## What is genuinely in good shape

Worth stating, because the list above is long and the underlying position is better
than it reads.

The site contains no fabricated proof. No testimonials, no borrowed logos, no
invented metrics, no countdowns, no crossed-out prices. That is rarer than it should
be and it is the hardest thing to retrofit.

The regulated-activity boundary is already articulated correctly in the product's own
content, in the right vocabulary. The failures found are places the copy drifts from
a policy that already exists, not the absence of a policy.

The third-party fee model, where the customer buys directly on their own account
with no markup, turns out to be the right design for tax reasons as well as
ownership reasons.

The ownership and retention boundary is already written down in
`src/content/founding.ts` and is substantially correct. It needs to appear in more
places and to be worked out at the edges, not invented.

The honesty scaffolding throughout the content, the explicit statements about what is
not promised, the refusal to manufacture scarcity, the disclosure that the product is
early, is a genuine asset. Most of this package is about making the contract match
that posture rather than about walking it back.

---

## Suggested order

| Step | Work | Who |
|---|---|---|
| 1 | Fix the three untrue statements on the site | Engineering |
| 2 | Tax determination and permit | CPA |
| 3 | Pricing and disclosure decision | Founder, with CPA |
| 4 | Publish entity identity and contact | Founder |
| 5 | Regulated-activity review | Counsel |
| 6 | Commercial decisions, group 7 of document 21 | Founder, with counsel |
| 7 | Draft Terms, Privacy, refund, cancellation | Counsel |
| 8 | Build the contract mechanics | Engineering |
| 9 | Close the security gaps | Engineering |
| 10 | Insurance | Broker |
| 11 | Publish the fair use policy | Founder |
| 12 | Enforce operating limits | Engineering |
| 13 | Pilot agreement | Counsel |
| 14 | First paid customer | |

Steps 1 through 4 can start immediately and do not need a lawyer.
