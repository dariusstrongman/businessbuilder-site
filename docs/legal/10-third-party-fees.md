# 10. Third-party, provider and government fee disclosure

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The disclosure problem

The headline price is $1,495. A customer who forms an entity, registers a domain,
takes a business phone number, subscribes to a CRM and a scheduling tool, and buys
insurance will spend meaningfully more than that in their first year, none of it to
Business Builder.

If that lands as a surprise, the customer's experience is that the price was not
real. That is a deceptive practices exposure under the Texas DTPA and a chargeback
risk, and it is avoidable entirely by disclosing well.

## The design principle that makes this defensible

**Business Builder does not buy anything on the customer's behalf and does not mark
anything up.** Every third-party service is bought by the customer, on the
customer's own account, billed directly by the provider, registered in the
customer's name.

Consequences, all favourable:

- There is no Business Builder invoice line to dispute
- The customer can cancel any of it without involving Business Builder
- The customer owns the account, which is the ownership model working as designed
- There is no resale, which avoids a set of tax questions `[COUNSEL]` confirm

`[COUNSEL]` Confirm no exceptions exist. If Business Builder ever pays a fee and
recovers it, that is a reimbursement or a resale, and it changes the tax analysis,
the disclosure obligation, and possibly whether a sales tax permit is required. See
[19-texas-legal-review-checklist.md](19-texas-legal-review-checklist.md).

## Categories to disclose

The categories, not the prices. Publishing specific third-party prices creates an
accuracy obligation that cannot be maintained, because those prices change without
notice.

| Category | Examples | Notes |
|---|---|---|
| Government and filing | Entity formation filing fee, assumed name filing, franchise tax, permits, licences | Set by the authority. Non-refundable once paid |
| Registered agent | Annual registered agent service | Business Builder does not act as registered agent |
| Domain | Registration and annual renewal | Registered in the customer's name |
| Hosting | Website hosting, email hosting | |
| Business phone | Number, plan, per-message and per-minute charges | Volume-dependent |
| Software subscriptions | CRM, scheduling, bookkeeping, storage | Recurring |
| Payment processing | Per-transaction fees, chargeback fees | Deducted by the processor |
| Insurance | General liability, bonding, vehicle, workers compensation | Varies by trade and state |
| Advertising | Any paid advertising spend | Entirely at the customer's discretion |
| Professional services | Attorney, CPA, bookkeeper, tax preparer | Where the customer needs one |

The last row matters more than it looks. It is the honest counterpart to the
statement that Business Builder does not provide legal or tax advice. If the
customer needs advice, someone else provides it and the customer pays for it.

## Required disclosure language

> **Costs that are not ours**
>
> The price you pay Business Builder covers our work. It does not cover what you
> pay other people.
>
> Government filing fees, registered agent fees, domains, hosting, business phone
> service, software subscriptions, insurance, advertising spend, payment processing
> fees and professional fees are yours, at cost, where they apply. We do not mark
> them up, we do not resell them, and we do not bill you for them, because you buy
> them directly.
>
> Every one of them is an approval before it is bought. Nothing is purchased in your
> name without you agreeing to it first. Every account is registered to you, and you
> can cancel any of them without involving us.
>
> These costs vary by state, by trade, and by the choices you make. We will tell you
> what your build needs and what each one costs before you commit to it, and you
> decide.

`[BUILD]` The last sentence is a commitment to produce a per-customer cost estimate
before commitment. That estimate must actually be generated. This is the honest
alternative to publishing a price list that goes stale, and it is a better customer
experience, but it is work the product must do.

`[BUILD]` "Every one of them is an approval before it is bought" requires an
approval gate on every third-party purchase. If any purchase can happen without an
explicit customer approval, the sentence is false.

## Where this must appear

Disclosure has to be where the decision is made, not only in the terms.

| Location | Requirement | Status |
|---|---|---|
| Pricing page | Present, near the figures | Present |
| Each package page | Present with the price | Check |
| Checkout or intake, before commitment | Required | `[BUILD]` |
| Terms of Service | Full clause | To draft |
| Per-customer scope document | Itemised estimate for that build | `[BUILD]` |

`[COUNSEL]` Confirm the point-of-sale disclosure meets the "clear and conspicuous"
standard. The test is whether a reasonable customer would notice and understand it
before paying, which is about prominence and placement rather than presence.

## Non-refundability

Third-party costs already incurred are not refundable by Business Builder, because
Business Builder never received them. A government filing fee paid to the state is
gone whether or not the customer later cancels.

This must be stated in the refund policy and at the point where the customer
approves each purchase, not only in the terms. See
[09-refund-policy-recommendation.md](09-refund-policy-recommendation.md).

## What Business Builder must not say

- Do not quote a third-party price as fixed. They change.
- Do not say "all fees included". They are not.
- Do not imply Business Builder can get a better rate, unless it can and the
  arrangement is disclosed.
- Do not describe a government fee as a Business Builder fee, or the reverse.
- Do not accept payment for a government fee and remit it later without disclosing
  that arrangement. `[COUNSEL]` if this ever happens it may raise money
  transmission questions and needs review before it does.

## Referral and affiliate arrangements

None currently exist. If one ever does, disclosure is required, and the FTC
endorsement rules apply to how the recommendation is presented.

`[COUNSEL]` Establish the policy before the first arrangement, not after. A
recommendation that pays Business Builder a commission while being presented as
neutral advice is both an FTC problem and a trust problem, and the trust problem is
worse.
