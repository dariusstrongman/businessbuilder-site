# 9. Refund policy recommendation

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> **Recommendation only. Do not publish to the site.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The recommendation in one line

A milestone-based policy tied to the work actually performed, not a money-back
guarantee, and not silence.

## Why not a money-back guarantee

The instinct for a new company is to offer one, because it removes a sales
objection. It is the wrong instrument here.

A SaaS refund costs the provider the marginal cost of an account, which is close to
zero. A refund on this product costs the research, the recommendation, the brand
work, the build hours, and any third-party fee already paid to somebody else. The
customer keeps a brand, a domain, a website and a set of configured accounts, all of
which have value and none of which can be taken back.

A broad guarantee also creates the exact incentive it should avoid: consume the
custom work, then ask for the money back. This is a known failure mode in agency
businesses and it is why almost none of them offer one.

## Why not silence

Silence is worse than a strict policy. Three reasons.

A customer who believes they are entitled to a refund and cannot find a policy goes
to their card issuer instead. In a chargeback, the merchant's published terms and
refund policy are the primary evidence. No policy means no defence, and the merchant
loses by default in a dispute they might otherwise have won.

Card network rules and payment processors expect a services merchant to disclose
cancellation and refund terms at the point of sale. Not having them is a compliance
gap before it is a commercial one.

And under the Texas Deceptive Trade Practices Act, the gap between what a customer
reasonably understood and what they got is the substance of a claim. A clear policy
narrows that gap. An absent one widens it.

## The shape of the problem

The engagement has a specific structure that the policy should follow, because the
cost to Business Builder steps up at identifiable moments.

| Stage | What exists | Cost incurred |
|---|---|---|
| Intake submitted | A description | Near zero |
| Research and recommendation delivered | Real work product the customer keeps | Material |
| Scope approved, payment taken | Commitment | The build is scheduled |
| Build underway | Partial deliverables | Substantial and rising |
| Third-party fees paid | Filings, domains, subscriptions | Unrecoverable, and not Business Builder's money |
| Delivered, Ready or Fully Set | The whole thing | Complete |

The current site promises research and a recommendation **before any payment**. That
is a deliberate and good commercial choice, and it moves the first real refund
question later than it would otherwise sit. It also means Business Builder performs
substantial unpaid work on every enquiry, which is a separate commercial exposure
noted in [23-launch-blockers.md](23-launch-blockers.md).

## Recommended policy, one-time builds

### Stage 1, before scope approval

**No payment has been taken. Nothing to refund.**

The customer can walk away at any point during intake, research and recommendation,
owing nothing. They keep the research and recommendation.

This matches what the site already promises and should not be changed.

### Stage 2, after scope approval, before work begins

**Full refund, less any third-party cost already incurred.**

A defined window after approval during which the customer can change their mind
before the build starts.

`[COUNSEL]` Set the window. Somewhere between 48 hours and 7 days is conventional.
Longer is friendlier and delays the build start. Recommendation: 3 business days,
and the build does not begin until it expires unless the customer asks to start
sooner and waives the window.

That last mechanism matters. A customer who wants to start immediately should be
able to, and the waiver should be explicit rather than implied.

### Stage 3, after material work begins, before delivery

**Pro-rata refund of the unperformed portion, less third-party costs.**

The fair position, and the one hardest to administer, because it requires knowing
what proportion of the work is done.

`[COUNSEL]` Two approaches:

The **milestone approach** divides the build into named stages with a percentage
attached to each, published in advance. Predictable, defensible, easy to explain, and
occasionally rough at the edges.

The **actual-work approach** refunds what has not been performed, measured by
recorded hours or completed modules. Fairer in principle, and it invites an argument
about the measurement.

Recommendation: the milestone approach, because it can be published before the
dispute rather than calculated during it. The Build Room already tracks modules
through defined states, which gives a natural and evidenced basis for the milestone
percentages. `[BUILD]` This requires the module states to be reliable enough to
found a refund calculation on.

### Stage 4, after delivery

**No refund. Defect correction instead.**

Once the build is delivered and accepted, the remedy is correction of anything that
does not match the agreed scope, not repayment.

`[COUNSEL]` This needs a defect-correction window with a definition of "defect" as
distinct from "change". Without one, the no-refund position looks like an
abandonment rather than a remedy. A short window, with the obligation to fix
anything that does not match the scope document, is the right pairing.

`[COUNSEL]` Consider what happens if Ready or Fully Set is never reached because of
something within Business Builder's control. The site's promise is strong enough
that a failure to deliver the agreed scope should be Business Builder's risk, and
[06-founding-customer-terms.md](06-founding-customer-terms.md) already takes that
position. The refund policy should match it: if Business Builder cannot deliver the
agreed scope, the customer's remedy is a refund of the undelivered portion.

### Third-party costs, at every stage

Never refundable by Business Builder, because Business Builder never received them.
A filing fee paid to the state is gone.

This must be stated at the moment each purchase is approved, not only in the policy.
See [10-third-party-fees.md](10-third-party-fees.md).

## Recommended policy, Build & Run

Simpler, because it is month-to-month.

| Item | Recommendation |
|---|---|
| Monthly fee, current period | No refund. Service was provided |
| Monthly fee, future periods | Not charged after cancellation |
| Activation fee | Not refundable |
| Activation, if Business Builder never activates | Fully refundable |

The activation position needs its justification stated alongside it, every time: the
fee bought durable configuration that the customer keeps. `[BUILD]` That
justification is only true if the configuration actually survives cancellation in a
form the customer retains. See
[05-service-terms-build-and-run.md](05-service-terms-build-and-run.md).

`[COUNSEL]` Consider a short activation guarantee window. If the customer cancels
within some days of activation because the service is not what they expected, a
partial activation refund is a strong trust signal at low cost, and it is far
cheaper than the chargeback it prevents. This is the one place where a
guarantee-flavoured term is worth considering.

## Discretionary refunds

The policy should reserve the right to refund outside these rules without setting a
precedent. Every services business needs this, and it should be written down.

Recommended clause:

> We may issue a refund outside this policy where we think it is the right thing to
> do. Doing so once does not oblige us to do it again.

## What must be true for the policy to work

`[BUILD]` items, all of which are prerequisites rather than nice to have.

- The scope document must exist, be written, and be approved by the customer in a
  recorded way. The whole policy hangs on "the agreed scope", which must be a
  document rather than a conversation.
- The approval moment must be timestamped and recorded.
- Milestone progress must be recorded as it happens, not reconstructed afterwards.
- Third-party costs must be itemised, approved individually, and recorded.
- The policy must be presented before payment, not only linked in a footer.

Without the first item there is no refund policy at all, only a negotiation.

## Chargeback defence

What a processor will ask for in a dispute, and which of these currently exist.

| Evidence | Status |
|---|---|
| Terms accepted by the customer, with timestamp | Does not exist |
| Refund policy disclosed before payment | Does not exist |
| Scope document approved by the customer | `[BUILD]` |
| Record of work performed | Build Room, `[BUILD]` for durability |
| Delivery confirmation | `[BUILD]` |
| Communications record | `[BUILD]` |

`[COUNSEL]` Confirm the acceptance mechanism meets the evidentiary standard. A
checkbox with a timestamp and a stored copy of the version accepted is the minimum.
Storing which version was accepted matters more than it appears, because terms
change and the question is always what the customer agreed to on that day.

## Publication

`[COUNSEL]` Decide where the policy is published and how it is presented at the
point of sale. A link in the footer is not disclosure. The policy, or an accurate
summary of it with a link, should appear where the customer commits.

Do not publish any of this until counsel has reviewed it and the `[BUILD]` items
above are closed. A published refund policy that the operation cannot actually
administer is worse than none, because it creates an expectation and then breaks it.
