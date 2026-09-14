# 15. Build & Run fair use and usage policy recommendation

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The commercial problem

$299 a month is a fixed price against four variable costs: model usage, third-party
communication charges, human operator time, and provider fees. A single customer
with unusual volume can cost more than they pay, and nothing in a flat fee stops
them.

The instinct is to write "subject to fair use" and move on. That instinct is wrong
for two reasons. A vague fair-use clause is difficult to enforce, because it gives
the customer no way to know they have exceeded it. And when it is enforced, the
customer experiences it as an arbitrary bill or an arbitrary cut-off, which produces
disputes and card chargebacks that are hard to defend precisely because the policy
was vague.

The goal is a boundary the customer can see before they cross it.

## Recommended structure

Three layers. Each does a different job.

### Layer 1, what the fee covers, defined by work type

The monthly fee covers **the recurring operational work you have approved**, within
your configured limits. It is scoped by the kind of work, not by an unlimited
promise.

Included:

- Inbound lead handling and first replies
- Quote drafting from the customer's price rules, held for approval where configured
- Inbox triage, routine replies, and flagging what needs the customer
- Follow-up and review requests
- Recurring monitoring of connected systems
- Scheduled operational tasks and escalation

Not included, and chargeable or out of scope:

- New build work, redesigns, or adding systems not in the original scope
- Migration from another provider beyond what onboarding covered
- Bespoke development or custom integration
- Work outside the customer's configured limits
- Third-party charges of any kind

`[COUNSEL]` Decide whether out-of-scope work is quoted separately in every case, or
whether an hourly rate is published. A published rate is simpler and reduces
friction. Quoting each time gives more control. Recommendation: publish a rate, and
require written approval before any chargeable work begins.

### Layer 2, the variable costs that are never included

State these separately and unambiguously, because they are the ones that generate
surprise.

| Cost | Who pays | Mechanism |
|---|---|---|
| SMS and voice charges | Customer | Customer's own provider account |
| Advertising spend | Customer | Customer's own ad account |
| Third-party software subscriptions | Customer | Customer's own account |
| Payment processing fees | Customer | Deducted by the processor |
| Domain and hosting renewal | Customer | Customer's own account |
| Government and filing fees | Customer | Paid to the authority |

The design principle that makes this defensible: **these are the customer's own
accounts, billed to them directly by the provider.** Business Builder is not
marking up, reselling, or passing through. There is nothing to dispute because
Business Builder never charges it.

`[COUNSEL]` Confirm there is no category where Business Builder pays a provider and
recovers the cost. If any exists, it needs separate disclosure, and it may have
sales tax consequences. See
[19-texas-legal-review-checklist.md](19-texas-legal-review-checklist.md).

### Layer 3, the operating-volume boundary

The actual fair-use limit. Recommended approach, in order of preference.

**Preferred: a published expected-use range with a conversation trigger.** State a
normal operating range for a business of the target size. When a customer
persistently exceeds it, Business Builder starts a conversation about a plan change
rather than cutting service or issuing a surprise charge.

Draft language:

> Build & Run is priced for the operating volume of a typical small service
> business. We publish the expected range for each plan. If your volume runs
> materially above that range for a sustained period, we will contact you to agree
> a plan that fits, with at least 30 days notice before any price change takes
> effect. We will not cut off your service without notice and we will not bill you
> for overage you were not told about in advance.
> `[COUNSEL]` confirm the notice period

This is enforceable because it is procedural rather than substantive: the commitment
is to a process, and the process is verifiable.

**Alternative: defined units.** Count something concrete, such as conversations
handled or tasks completed, publish an included allowance, and charge for overage.
More precise and more defensible, but it requires metering that does not exist and
it changes the product's character from a service into a metered utility.
`[BUILD]` Requires usage metering visible to the customer.

**Not recommended: a bare reasonableness standard.** "Subject to reasonable use" with
no number. Unenforceable in practice and it produces exactly the disputes it was
meant to prevent.

`[COUNSEL]` Choose between the first two. Recommendation is the first for launch,
moving to the second when metering exists.

`[BUILD]` Even the preferred approach requires Business Builder to know each
customer's operating volume. Without measurement there is no way to identify an
outlier, and the policy is decorative.

## What must never be said

The site has been kept clean of this so far and must stay that way.

- Unlimited AI
- Unlimited messages, calls, texts, or emails
- Unlimited tasks, workflows, or automations
- Unlimited human support or operator time
- Unlimited anything

The current site copy states the negative directly: Build & Run is not an unlimited
AI subscription, workers operate inside configured limits, and a fair-use policy
will be published before it could matter. That is the right posture. Note the last
clause is a commitment with a deadline attached to it: the policy must actually be
published before volume makes it relevant.

## Enforcement sequence

If a customer exceeds the boundary, the sequence should be published, because a
published sequence is what makes enforcement defensible.

1. Notice, with the actual figures
2. A conversation about the right plan
3. A written plan change with the agreed notice period
4. Suspension only for non-payment or acceptable-use violation, never for volume
   alone

Never: a surprise charge, a silent throttle, or a service cut for volume.

`[COUNSEL]` Confirm step 4. Committing never to suspend for volume alone is a real
constraint and means an outlier customer must be managed commercially rather than
technically. It is the right position for a business whose entire proposition is
trust, but it should be a conscious choice.

## Interaction with the activation fee

The activation fee buys durable configuration. It is not a usage credit, does not
carry forward, and is not consumed. State this, because customers will ask whether a
higher activation buys more monthly usage. It does not.

## Publication requirement

The fair-use policy must be published before the first Build & Run customer is
billed, not before the first one exceeds it. A policy produced after a dispute
begins is worth very little.

`[BUILD]` This is a launch blocker. See
[23-launch-blockers.md](23-launch-blockers.md).
