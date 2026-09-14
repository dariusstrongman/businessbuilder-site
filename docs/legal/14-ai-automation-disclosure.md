# 14. AI and automation disclosure, human escalation, bounded autonomy

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The drafting problem

Two bad disclosures are common and both should be avoided.

The first is the frightened kind: a wall of capitalised disclaimer saying the AI may
produce wrong output, the customer assumes all risk, and the provider owes nothing.
It reads as a provider who does not believe in their own product, it undermines the
sale, and under the Texas DTPA a sweeping disclaimer of this sort is of limited
protective value anyway.

The second is the silent kind: no disclosure at all, on the theory that customers
know AI is involved. This is worse. The FTC has an active enforcement posture on AI
claims, and the gap between what a customer thinks they bought and what they got is
the substance of a deceptive practices claim.

The right disclosure is specific rather than defensive. It describes what the system
actually does, what bounds it, and who is accountable. A specific true statement is
both better protection and better marketing than a vague scary one.

## What is actually true, stated plainly

The disclosure should be built from these facts and no others.

1. AI workers perform approved tasks inside limits the customer sets
2. The limits are permissions, approval thresholds and budgets, set at activation
   and changeable by the customer
3. Some outputs are held for human review before they take effect, and the customer
   chooses which
4. Some tasks escalate rather than complete, first to the customer, then to a person
   at Business Builder
5. AI output can be wrong, and the review and escalation structure exists because of
   that
6. The customer remains the decision-maker for their business
7. Regulated decisions are not delegated to AI

## Draft disclosure text

Customer-facing. This is the tone to aim for.

> **How automation works here**
>
> Business Builder uses AI workers to perform recurring work in your business:
> handling inbound leads, drafting quotes from your price rules, triaging your
> inbox, and sending follow-ups. They are not employees and they are not
> autonomous. They operate inside limits you set.
>
> **What you control.** At activation you set what each worker may do on its own,
> what it must ask you about first, and what it may never do. You set approval
> thresholds and budgets. You can change any of it at any time, and you can stop a
> worker entirely.
>
> **What gets reviewed.** Work you have marked for approval is held until you
> approve it. Work outside a worker's limits is not performed. When something is
> unclear, the worker escalates rather than guesses.
>
> **Where escalation goes.** Exceptions come to you first. If a matter needs
> someone here, it goes to a person at Business Builder, not to another automated
> system.
>
> **What AI gets wrong.** AI output can be inaccurate, incomplete, or wrong in ways
> that are not obvious. That is why approval thresholds, escalation and the
> evidence log exist. Review work that matters before it goes to your customer.
>
> **What stays yours to decide.** You run your business. Pricing, hiring, who you
> take as a customer, what you agree to, and anything with legal, tax, financial or
> regulatory consequence remain your decisions. Business Builder does not make them
> for you and AI workers are not permitted to make them.
>
> **What we will not delegate to automation.** Legal, tax, accounting, insurance
> and regulated decisions are not made by AI workers. Where those matters arise we
> will tell you that you need a qualified professional, and we will not substitute
> for one.

`[COUNSEL]` Review the whole block. In particular the sentence "Review work that
matters before it goes to your customer" creates a customer responsibility that is
useful in allocating liability but must not be so broad that it swallows the
service. If the customer must review everything, they have not been relieved of any
work and the product does not deliver its promise.

`[BUILD]` "Work outside a worker's limits is not performed" must be an enforced
control, not an instruction in a prompt. An AI told not to do something is not
prevented from doing it. Until permission boundaries are enforced outside the model,
this sentence is aspirational and must not be published as fact.

`[BUILD]` "You can stop a worker entirely" requires a customer-operable control and
a verified halt path.

`[BUILD]` The evidence log must be visible to the customer for the sentence
referencing it to be meaningful.

## Bounded autonomy, for the contract

Contract language, more precise than the customer-facing version.

> **Bounded operation.** Business Builder will operate the Services within the
> Operating Limits, meaning the permissions, approval thresholds, budgets and
> escalation routes configured in the Customer's account and as amended by Customer
> from time to time. Business Builder will not knowingly cause an AI worker to act
> outside the Operating Limits.
>
> **Human review.** Certain outputs are subject to Customer review before taking
> effect, as configured. Business Builder does not warrant that outputs not
> submitted for review are free of error.
>
> **Escalation.** Where a matter falls outside the Operating Limits, is ambiguous,
> or requires a decision reserved to Customer, Business Builder will escalate to
> Customer rather than proceed. Where escalation requires Business Builder
> judgement, a qualified individual at Business Builder, not an automated system,
> will handle it. `[BUILD]`
>
> **Reserved decisions.** Customer retains sole responsibility for business
> decisions, including pricing, contracting, hiring, and any matter with legal, tax,
> financial, insurance or regulatory consequence. Business Builder does not provide
> legal, tax, accounting, insurance or investment advice, and no output of the
> Services constitutes such advice.
>
> **No autonomous authority.** AI workers have no authority to bind Customer, to
> enter contracts on Customer's behalf, to make payments outside configured budgets,
> or to take any action reserved to Customer under this Agreement or by law.

## Numeric ceilings, not only categories

Market research identifies the **numeric authority limit as the single highest-value
clause** in an AI agent contract, because it is the only control that actually bounds
the potential loss. A cap expressed as a fee multiple does not, since an agent can
repeat the same mistake many times inside one billing period.

The Operating Limits above are categorical: what a worker may do, must ask about, and
may not do. That is necessary and not sufficient. A per-transaction threshold alone
does not stop a worker making the same error forty times in a day.

Recommended additions, all `[BUILD]`:

- A ceiling **per transaction**
- A ceiling **per counterparty**, so one customer of the customer cannot be contacted
  or committed to repeatedly
- A ceiling **per rolling 24 hours**, across all activity
- A stated revocation procedure with an effective time

`[COUNSEL]` Confirm these belong in the contract as defined terms rather than only in
the product, since they are the substance of the bounded-operation promise.

## "The AI did it" is not a defence

Worth stating plainly, because it is counter-intuitive and because it is settled,
unlike most of this area.

A tribunal has already held a company responsible for what its customer-service
chatbot told a member of the public, rejecting the argument that the bot was a
separate entity. A California statute effective January 2026 addresses the same point.

Two consequences, pointing in opposite directions.

**For the customer:** they remain answerable for what a worker said to their own
customer, and cannot point at the automation. This supports allocating to the customer
the risk of correct operation within limits they set.

**For Business Builder:** it remains answerable for what its platform did, and cannot
point at the model provider. This is why enforcing Operating Limits matters more than
describing them, and it is the practical reason the `[BUILD]` markers in this document
are liability items rather than product polish.

`[COUNSEL]` The "no authority to bind" clause protects Business Builder as between
the parties, but it does not necessarily protect the customer against a third party
who reasonably believed the AI-sent communication bound the customer. Apparent
authority is a live issue when an AI worker sends a quote from the customer's own
email address. Consider whether quotes and similar communications should carry an
express statement that they are not binding until confirmed, and whether that
undermines the product.

This is, in my assessment, the most under-appreciated legal exposure in the entire
model, and it is a product question as much as a drafting one.

## Model provider flow-down

Business Builder's AI workers run on third-party model providers whose usage
policies restrict certain uses. Those restrictions reach the end customer.

Required positions:

- The customer's use of the Services is subject to applicable model provider
  acceptable use policies
- Business Builder will not perform tasks that those policies prohibit
- Prohibited-use categories must be reflected in the acceptable use terms

`[COUNSEL]` Review the current acceptable use policies of each model provider in
use and confirm which restrictions must flow down. Note particularly any
restrictions on automated decision-making about individuals, on generating content
for regulated industries, and on high-risk uses.

`[COUNSEL]` Confirm whether the customer's data is excluded from provider training
under the commercial terms in place, because the privacy policy will need to state
the position and it must be accurate. This is an enterprise-tier question with most
providers and the answer differs by tier.

## Disclosure to the customer's own customers

An unresolved question that should not be left unresolved.

When an AI worker replies to a lead, that lead is a member of the public who
believes they are corresponding with the cleaning company. Whether they must be told
they are corresponding with an automated system is a genuinely open question that
varies by jurisdiction, by channel, and by what is being said.

Known constraints:

- Automated voice calls are subject to federal restrictions regardless of disclosure
- Several states have or are developing bot-disclosure requirements in commercial
  contexts
- The FTC treats materially misleading impersonation as deceptive irrespective of
  any specific bot statute

`[COUNSEL]` Decide the disclosure position and whether it differs by channel. The
conservative position, disclosing automated assistance in outbound communications,
costs some conversion and removes a category of risk. The permissive position needs
a jurisdiction-by-jurisdiction analysis that is not worth doing at this scale.
Recommendation: adopt the conservative position for outbound voice and SMS, and
decide separately for email.

`[COUNSEL]` Voice and SMS raise federal telephone-consumer issues independent of
disclosure. Confirm before any worker is permitted to place a call or send a text,
including whether consent held by the customer for their own outreach extends to
outreach performed by Business Builder on their behalf.

## What must never be claimed

- That the AI is an employee, a team member, or a person
- That output is verified when it has been generated but not checked
- That the system cannot make mistakes, or that errors are caught
- That AI review substitutes for professional advice
- Any capability the system does not currently have, stated in the present tense
