# 5. Build & Run, service terms

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

A service schedule under the master Terms of Service. This is the only recurring
offer and the only one under which Business Builder acts continuously on the
customer's behalf.

## Commercial terms

| Item | Value |
|---|---|
| Activation, standalone | $795, one-time |
| Activation, bought with Build my business | $500, reflected in $1,995 upfront |
| Monthly | $299 |
| Term | Month to month |
| Minimum commitment | None |
| Third-party costs | Separate |

## The two-fee boundary

The structural question this document exists to answer: what does the activation fee
buy that the monthly fee does not?

**Activation buys durable configuration.** Work performed once, whose product
survives cancellation, and which the customer keeps.

- Systems connected: inbox, CRM, scheduling, payments
- Permissions set per worker: what it may do, must ask about, and may not do
- Company context built from services, price book, service area and tone
- Operating rules, approval thresholds and budgets agreed
- Escalation routes defined
- Recurring automations configured and tested before anything reaches a customer

**The monthly fee buys continued operation.** Work performed continuously, which
stops when payment stops.

- Inbound lead handling and first replies
- Quote drafting from price rules, held for approval
- Inbox triage, routine replies, flagging
- Follow-up and review requests
- Recurring monitoring of connected systems
- Scheduled operational tasks and escalation

This boundary is why activation is not refunded on cancellation: the customer keeps
what it produced. That justification only holds if it is actually true.

`[BUILD]` The configuration produced by activation must survive cancellation in a
form the customer retains and can use. If the permissions, rules, budgets and
company context exist only inside Business Builder's platform and are lost at
cancellation, the justification fails and the non-refundable activation fee becomes
hard to defend. The export must include the configuration in readable form. See
[12-data-export-handoff.md](12-data-export-handoff.md).

`[COUNSEL]` Confirm the activation fee is described consistently everywhere as
buying durable setup, and that the non-refundability follows from that rather than
being asserted separately.

## Why the bundled activation is lower

$500 rather than $795 when bought with Build my business, because most of the
configuration happens during the build itself.

This is a legitimate cost-based difference, not a promotion, and it should be
described that way. `[COUNSEL]` Confirm the framing avoids discount-pricing
characterisation.

## Bounded operation

The core operating commitment. Full treatment in
[14-ai-automation-disclosure.md](14-ai-automation-disclosure.md).

Business Builder operates within the Operating Limits: permissions, approval
thresholds, budgets and escalation routes configured in the customer's account. The
customer sets them, can change them at any time, and can stop any worker.

`[BUILD]` Operating Limits must be technically enforced, not merely instructed.

`[BUILD]` The customer must be able to see and change them without contacting
Business Builder, and to stop a worker immediately.

## Not unlimited

Stated expressly. Full treatment in [15-fair-use-policy.md](15-fair-use-policy.md).

The monthly fee covers the recurring operational work the customer has approved,
within configured budgets. It does not cover unlimited model usage, unlimited
communications, unlimited workflow executions, unlimited human labour, unlimited
provider charges, SMS or voice charges, advertising spend, or third-party software.

`[BUILD]` The fair-use policy must be published before the first customer is billed.

## Service level

`[COUNSEL]` Not currently defined and it must be, at least minimally. A service
operating a live business with no stated availability or response commitment is
exposed to an implied-terms argument, and the customer has no basis to know what to
expect.

Recommended minimum set:

| Commitment | Recommendation |
|---|---|
| Operating hours for automated work | State whether workers operate continuously |
| Escalation response, business hours | `[COUNSEL]` set |
| Escalation response, out of hours | `[COUNSEL]` set, or state there is none |
| Planned maintenance | Notice period |
| Availability target | Commercially reasonable efforts rather than a percentage |

Recommendation: avoid a numeric uptime percentage at this stage. A percentage with
no measurement behind it is worse than an efforts standard honestly described.
`[BUILD]` A numeric target requires monitoring that can evidence it.

`[COUNSEL]` Decide whether any service credit regime applies. Recommendation: none
at launch, with the cancellation right as the customer's remedy. A credit regime
without measurement is unadministrable.

## Suspension

Business Builder may suspend operation for non-payment after notice and a cure
period, for acceptable-use violation, where continuing would breach a provider's
terms or law, or where an instruction cannot lawfully be followed.

Never for operating volume alone. See the fair use policy.

`[COUNSEL]` Set the non-payment notice and cure period. Suspension of a service
running a live business has immediate consequences for the customer's own customers,
so the notice should be real rather than nominal.

## Cancellation

Full treatment in [08-cancellation-policy.md](08-cancellation-policy.md).

Summary for this schedule: stop at any time, no notice period, effective at the end
of the current paid month, no proration, activation not refunded, full export and
handoff, and no transfer of Business Builder platform or source code.

## Customer responsibilities

- Maintain accurate price rules, service area, availability and tone guidance
- Maintain their own accounts and pay their own providers
- Respond to escalations within the agreed time
- Review work marked for approval
- Keep Operating Limits current as the business changes
- Hold their own licences, insurance and registrations
- Determine their own tax treatment and configure it

`[COUNSEL]` The tax configuration responsibility is significant where the customer's
service is taxable. See the pilot agreement for why this matters concretely.

## Risk allocation specific to this service

Build & Run is where Business Builder acts on the customer's behalf with third
parties, which is a different risk profile from a one-time build.

`[COUNSEL]` Address directly:

- Liability where a worker sends something incorrect to the customer's own customer
- Liability where a worker acts outside configured limits due to a Business Builder
  failure
- Whether an AI-sent quote or confirmation can bind the customer to a third party,
  and the apparent-authority question raised in
  [14-ai-automation-disclosure.md](14-ai-automation-disclosure.md)
- Indemnity for claims arising from the customer's underlying business, which
  Business Builder does not perform
- Whether the liability cap should differ for this service given continuous
  operation

The second and third items have no settled market answer. They should be decided
deliberately rather than inherited from a SaaS template, because Build & Run is not
SaaS. The customer is not operating software. Business Builder is operating their
business.
