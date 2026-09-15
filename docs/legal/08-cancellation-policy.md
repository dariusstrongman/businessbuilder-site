# 8. Cancellation policy

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## Scope

This policy governs stopping **Build & Run**, the recurring service. It does not
govern refunds, which are in
[09-refund-policy-recommendation.md](09-refund-policy-recommendation.md), and it
does not govern stopping a one-time build in progress, which is a scope-abandonment
question handled in the refund policy.

Build my website and Build my business are one-time engagements. There is nothing
to cancel once delivered. Build & Run is the only continuing obligation.

## The product principle

The customer may stop Build & Run. Stopping is not a negotiation, does not require
a reason, and does not put any customer-owned asset at risk.

This is a deliberate commercial position, not a legal minimum. The offer is
credible only if leaving is easy, because the customer is being asked to let an
outside party operate their company. A hard exit makes the whole proposition
frightening at exactly the moment the customer is deciding.

## What happens on cancellation

Six things, in order.

1. **Operation stops.** AI workers stop acting. Scheduled automations stop firing.
   No further action is taken on the customer's behalf.
2. **Billing stops** according to the billing terms below.
3. **The customer keeps everything they own.** Every item in bucket 1 of
   [11-ip-ownership-model.md](11-ip-ownership-model.md). The company, brand,
   domain, website, customer data, accounts, documents.
4. **Platform operation and access end.** Business Builder's proprietary platform
   stops running the business. This is not a penalty. It is the thing that was
   being paid for.
5. **Export and handoff occur** per
   [12-data-export-handoff.md](12-data-export-handoff.md), within the stated
   window, at no additional charge.
6. **Outstanding obligations remain.** Unpaid fees for service already delivered,
   and any third-party obligation in the customer's own name, remain the customer's
   responsibility. Business Builder cannot cancel the customer's CRM subscription,
   phone number or hosting, because those accounts belong to the customer.

## What cancellation does not do

State this as plainly as the list above, because the absence of the statement is
what creates the dispute.

Cancellation does not transfer the Business Builder platform, source code,
orchestration, reusable agents, prompts, or verification infrastructure. The
customer was never buying those and does not acquire them by leaving. A customer who
cancels is in exactly the position of a customer who never subscribed: they own
their business, and they do not own the machine that was running it.

`[COUNSEL]` Confirm this sentence sits in both the Build & Run terms and the
cancellation policy, and that its placement is conspicuous enough to be enforceable.

## Billing mechanics

The recommendation, for counsel to confirm.

| Item | Recommendation | Rationale |
|---|---|---|
| Notice required | None | A self-service control is the commitment |
| Effect | End of current paid month | Customer keeps what they paid for |
| Proration of the final month | None | Month-to-month, no partial refunds |
| Activation fee | Never refunded on cancellation | It bought durable setup that the customer keeps |
| Minimum term | None | |
| Reactivation | New activation fee may apply | `[COUNSEL]` |

`[COUNSEL]` Decide the proration question. Not prorating is standard for
month-to-month and is defensible, but it interacts with auto-renewal disclosure
rules and with card-network chargeback expectations. The published policy must state
it at the point of sale, not only in the terms.

`[COUNSEL]` Decide whether reactivation after cancellation triggers a new
activation fee, and at what figure. Charging the full $795 again to a returning
customer whose configuration is still intact is hard to defend. Charging nothing
invites cycling. A reduced reactivation fee, or a free window of some months, is the
middle position. This number is not currently set anywhere and must be before the
terms are published.

`[BUILD]` The policy says billing stops at the end of the current paid month. That
requires a billing system that actually does this, and a cancellation control the
customer can operate without contacting anyone. Neither exists yet. Until both do,
the honest published sentence is that cancellation is by written request and takes
effect at the end of the current paid month, and the request must be acknowledged.

`[BUILD]` The policy says operation stops. That requires a verified kill path that
halts every scheduled automation and revokes every worker's ability to act, and a
way to confirm it happened. A worker that sends one more customer email after
cancellation is a serious incident, not a bug.

## Auto-renewal disclosure

A $299/month recurring charge is an automatically renewing subscription. Regardless
of the current federal rulemaking position, the following are both good practice and
the baseline several state auto-renewal statutes require. Treat them as
requirements.

- Clear and conspicuous disclosure of the recurring charge, the amount, and the
  renewal interval, presented before the customer commits
- Affirmative consent to the recurring charge, captured separately from the rest of
  the order
- A cancellation mechanism at least as easy as the sign-up mechanism
- A record of what was disclosed and when the customer agreed `[BUILD]`

**The federal position is now confirmed and it is not what most templates assume.**
The Federal Trade Commission's click-to-cancel rule was vacated in its entirety in
July 2025 and no replacement is in force. The underlying statute and the general
prohibition on deceptive practices still apply, enforcement has increased rather than
decreased, and **the state patchwork is now stricter than the vacated federal rule
was.** The findings, the state-by-state table and the recommended design are in
[24-market-practice-benchmarks.md](24-market-practice-benchmarks.md), section 6.

The item with the most immediate consequence: California requires **separate
affirmative consent to the auto-renewal term**, not bundled into general terms
acceptance and not pre-checked, with consent records retained. Bundling is
non-compliant in the largest US market, and it simultaneously weakens the chargeback
evidence, because the issuer sees consent to "terms" rather than to recurring billing.

**Texas has no auto-renewal statute**, confirmed two independent ways. The
"six months or more" language circulating in secondary sources is failed bill text from
2009 and 2011. What applies instead is the deceptive practices statute, which reaches
business customers with mandatory one-way attorney's fees.

**The binding design constraints are the federal statute and the California
auto-renewal law, not Texas law.** See
[25-texas-consumer-privacy-upl.md](25-texas-consumer-privacy-upl.md), section 9.

`[COUNSEL]` Confirm which state auto-renewal statutes reach this business. The answer
depends on where customers are, not only where Business Builder is.

## Suspension and termination by Business Builder

The mirror side, which the customer-facing policy should also state.

Business Builder may suspend or terminate Build & Run for non-payment, for use that
violates the acceptable use terms, where continuing would breach a provider's terms
or applicable law, or where the customer's instructions would require Business
Builder to do something it is not permitted to do.

Recommended structure:

- Non-payment: notice and a cure period before suspension `[COUNSEL]` set the period
- Acceptable-use or legal violation: immediate suspension permitted
- Convenience termination by Business Builder: notice period, and the customer gets
  the export and handoff on the same terms as a customer-initiated cancellation
  `[COUNSEL]` set the period

The important commitment: **the export and handoff obligation is identical however
the relationship ends.** A customer terminated for non-payment still gets their
data. Withholding customer data as leverage for an unpaid invoice is a bad position
commercially and a worse one legally, particularly with personal data subject to
deletion and access rights.

`[COUNSEL]` Confirm there is no circumstance in which customer data is withheld,
and whether any lien or retention right should be expressly waived.

## Drafting notes

The site currently says "Stop any time. The company stays yours." and "Stop the
monthly plan any time. The company stays yours." Both are good and both are now
commitments. The terms must not contradict them with a notice period, a minimum
term, or an exit fee. If counsel wants any of those, the site copy has to change
first. See [20-website-copy-audit.md](20-website-copy-audit.md).
