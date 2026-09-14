# 7. Pilot service agreement, first supervised residential-cleaning pilot

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> This document is a specification and a draft skeleton. It is the single highest-risk
> document in the package and must not be used without counsel.
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## What makes this different from every other customer

Every other engagement is Business Builder doing work for a customer. This one is
Business Builder operating a live business that serves members of the public in
their homes.

The consequences of an error change character accordingly. A badly drafted website
paragraph is embarrassing. A cleaning appointment booked at the wrong address, a
quote that omits sales tax, a cleaner sent to a home where the booking was
cancelled, or a customer's home address disclosed to the wrong recipient are
different in kind.

The pilot agreement exists to bound that.

## Structure

A pilot agreement, not a standard order. It sits on top of the master terms and
adds to them.

| Component | Purpose |
|---|---|
| Recitals | What the pilot is, why it exists, what both parties want from it |
| Scope of operation | Exactly which functions Business Builder operates, by name |
| Explicit exclusions | What Business Builder does not touch |
| Supervision model | The human review commitment, stated as an obligation |
| Operating limits | Permissions, thresholds, budgets, in writing, signed |
| Escalation | Who, how fast, and what happens out of hours |
| Pilot customer responsibilities | What the cleaning company must do |
| End-customer handling | Rules for dealing with the public |
| Data and privacy | Including end-customer personal data |
| Term, exit and wind-down | Short term, easy exit, defined wind-down |
| Fees | What is charged, what is waived |
| Liability | The clause that needs the most attention |
| Feedback and publicity | Separate, opt-in |

## Scope of operation

Name the functions. Do not use a category.

Recommended starting scope, deliberately narrow:

- Receiving inbound enquiries through defined channels
- Drafting a first reply for review
- Drafting a quote from the customer's published price rules, for review
- Proposing a booking slot against the customer's calendar, for confirmation
- Sending confirmed booking confirmations and reminders
- Sending post-job follow-up and review requests
- Flagging anything that does not fit a rule

`[COUNSEL]` Confirm the scope is drafted as a closed list, so anything not listed is
out of scope by default. An open-ended scope with exclusions is the wrong shape for
a first pilot.

## Explicit exclusions

State these even though they follow from the scope, because the pilot customer will
assume otherwise.

Business Builder does not, during the pilot:

- Dispatch, direct, schedule or supervise any worker or cleaner
- Make any decision about who is hired, engaged, or assigned
- Hold or move the pilot customer's funds
- Set prices. It applies the pilot customer's published price rules
- Accept or decline a job on the pilot customer's behalf without confirmation
  `[COUNSEL]` confirm whether any auto-accept is permitted at all in the pilot,
  recommendation is none
- Enter the pilot customer's premises or any end customer's home
- Advise on employment classification, insurance, tax or licensing
- Communicate a commitment that binds the pilot customer, without confirmation

The first two are the most important and the least obvious. Any direction of workers
by Business Builder risks creating an argument about joint employment, which is a
category of exposure entirely disproportionate to a pilot. Business Builder must stay
on the customer-facing side of the business and away from the labour side.

`[COUNSEL]` Review the joint-employment question directly. Even scheduling, if it
determines when a worker works, can be argued to be direction. Consider whether the
pilot should propose slots only against the pilot customer's own availability rules,
with the pilot customer assigning workers, and whether the agreement should recite
that Business Builder has no right of control over any worker.

## The sales tax issue, specifically

Residential cleaning in Texas is likely a taxable real property service.
`[COUNSEL]` confirm against the research in
[19-texas-legal-review-checklist.md](19-texas-legal-review-checklist.md).

If Business Builder's automation drafts a quote and the tax treatment is wrong, the
pilot customer under-collects and remains liable to the state. Business Builder
caused a tax exposure for a customer while not being their tax advisor.

Required positions:

1. Tax rates and taxability rules are configured by the pilot customer, on their
   own determination, ideally on advice from their own tax professional
2. Business Builder applies the configured rule. It does not determine taxability
3. The pilot customer is responsible for the correctness of the tax treatment
4. Any quote generated states that it is subject to confirmation `[COUNSEL]`
5. Business Builder disclaims tax advice expressly and in this specific context, not
   only generically

`[BUILD]` The quote drafting system must support a configured tax rule and must not
silently omit tax. A quote that omits a required tax line is worse than a quote that
declines to compute it.

This is the clearest instance of a general pattern: automating a task inside a
regulated activity transfers the mechanics without transferring the responsibility,
and the contract must make that explicit where the customer might assume otherwise.

## Supervision model

The pilot is "manually supervised". That phrase has to mean something specific and
auditable, or it is decoration.

Recommended definition:

> During the Pilot, a qualified individual at Business Builder reviews every
> outbound communication to an end customer before it is sent, and reviews every
> booking action before it takes effect. No automated output reaches an end
> customer without human review during the Pilot Period.

`[COUNSEL]` Confirm this is the commitment. It is strong, it is expensive, and it is
the right shape for a first pilot with real members of the public. Confirm also
whether it should relax during the pilot on a defined schedule, and if so against
what criteria.

`[BUILD]` Requires a review queue that actually holds outbound communications, with
a record of who reviewed what and when. Without the record, the commitment cannot be
evidenced, and an unevidenced commitment is the worst of both worlds: the cost of
doing it and no proof it was done.

## End-customer handling

The pilot customer's customers are members of the public who never agreed to
anything with Business Builder. Their personal data includes home addresses and
access arrangements, which is a sensitive combination.

Required rules:

- Business Builder acts as a processor for end-customer personal data, on the pilot
  customer's documented instructions `[COUNSEL]` confirm the characterisation
- A written processing agreement is in place before any end-customer data is touched
- End-customer data is used only to perform the pilot functions, never for Business
  Builder's own purposes, never for training `[COUNSEL]` confirm against model
  provider terms
- Home addresses and access information are treated as sensitive, with restricted
  access and no inclusion in general logs `[BUILD]`
- End-customer data is returned or deleted at the end of the pilot
- An end customer's privacy request is routed to the pilot customer, who is the
  controller, and Business Builder assists

`[COUNSEL]` Confirm whether the pilot customer, as a small business, is exempt from
the Texas Data Privacy and Security Act and what obligations survive the exemption.
Note that the exemption, if it applies, does not relieve Business Builder of its own
obligations, and does not make careless handling of home addresses acceptable.

`[COUNSEL]` Determine whether any end-customer communications require consent that
the pilot customer holds. Consent the pilot customer obtained for its own outreach
may not extend to outreach performed by Business Builder. This is particularly acute
for SMS. Recommendation: no SMS or voice in the pilot at all, which removes the
question entirely.

## Term and exit

- Short defined term `[COUNSEL]` recommend 60 or 90 days
- Either party may end it on short notice, for any reason, without penalty
- Wind-down: Business Builder stops operating, hands back, and confirms access
- The pilot customer must not be left mid-conversation with their own customers.
  Any open thread is handed over with its context `[BUILD]`
- Full export and handoff on the standard terms

The wind-down obligation is the one usually forgotten. A pilot that ends abruptly
leaves real end customers waiting for a reply that no longer has anyone behind it.

## Fees

`[COUNSEL]` Decide. Three options with different consequences.

| Option | Consequence |
|---|---|
| Free pilot | Cleanest. Weakest evidence that anyone will pay. May weaken contract formation arguments over consideration |
| Reduced fee | Proves willingness to pay. Creates a real commercial relationship |
| Full founding price | Strongest signal. Highest expectation to meet |

Recommendation: a reduced fee rather than free. A free pilot produces polite feedback
and no real evidence, and a paying customer complains accurately.

Whatever is chosen, the pilot agreement must state what is charged, what is waived,
and what happens to pricing when the pilot converts to a standard engagement.

## Liability

The clause needing the most attention, and the reason this document says repeatedly
that it must not be used without counsel.

The generic position, liability capped at fees paid, is inadequate here. If the pilot
fee is small or zero, the cap is small or zero, while the potential harm involves
real end customers, their homes, and their personal data.

`[COUNSEL]` This requires a specific decision. Considerations:

- A cap measured by fees paid is not meaningful when fees are nominal. Consider a
  stated minimum cap independent of fees
- Carve-outs from any cap for breach of confidentiality, data breach, gross
  negligence, wilful misconduct, and indemnity obligations
- Whether Business Builder carries insurance that responds, particularly technology
  errors and omissions and cyber. If it does not, that is a launch blocker rather
  than a drafting question
- Who bears the loss if a Business Builder error causes the pilot customer to lose
  an end customer, or to face an end customer's claim
- Whether the pilot customer indemnifies Business Builder for claims arising from
  the cleaning work itself, which Business Builder does not perform or control. This
  should be a firm yes

`[COUNSEL]` Confirm Business Builder's insurance position before the pilot starts,
not after. Operating a live business for someone else without errors and omissions
cover is a decision that should be made deliberately if it is made at all.

`[COUNSEL]` Under the Texas DTPA, limitation and waiver provisions face specific
constraints and a waiver is only valid in narrow circumstances. Whether the pilot
customer is a "consumer" for DTPA purposes, and whether the professional services
exemption applies, both need analysis. Do not assume a business-to-business contract
is outside the DTPA.

## Pilot customer responsibilities

The agreement must state what the pilot customer owes, because the service cannot
work without it.

- Provide accurate price rules, service area, availability and tone guidance
- Maintain their own licences, insurance and registrations
- Determine their own tax treatment
- Respond to escalations within an agreed time `[COUNSEL]` set it
- Keep their own workers and labour arrangements entirely under their own direction
- Tell Business Builder promptly if an end customer complains about something
  Business Builder sent
- Maintain their own accounts and pay their own providers

## What this agreement must not do

- Must not describe Business Builder as operating the cleaning business generally.
  It operates named functions
- Must not create any impression of control over workers
- Must not permit an AI worker to bind the pilot customer
- Must not allow end-customer data to be used for Business Builder's purposes
- Must not waive the pilot customer's rights in a way that is unenforceable and
  therefore worse than not trying `[COUNSEL]`
- Must not be signed before the supervision mechanism and the escalation path
  actually exist
