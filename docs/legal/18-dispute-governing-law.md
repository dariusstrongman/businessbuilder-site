# 18. Dispute resolution and governing law

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> **A framework for counsel, not drafted language.** Every position needs a lawyer.

## Governing law

Texas, on the assumption that Business Builder is a Texas entity serving Texas
customers initially.

`[COUNSEL]` Straightforward while customers are in Texas. It stops being
straightforward the moment a customer is elsewhere, because a consumer protection
statute in the customer's home state may apply regardless of the choice-of-law
clause. Several states' consumer statutes resist contractual displacement.

`[COUNSEL]` Decide whether to restrict sales to Texas initially. It is a real
option, it simplifies this entire document, and it can be relaxed later. Given that
the tax analysis, the privacy analysis and the unauthorised-practice analysis are
all Texas-specific, selling outside Texas multiplies the work required before
launch rather than adding to it incrementally.

## Venue

`[COUNSEL]` Exclusive venue in the Texas county where Business Builder is located
is the conventional position. Note it may be unenforceable against a consumer in
some circumstances, and that the DTPA has its own rules.

## The DTPA overlay

The Texas Deceptive Trade Practices Act shapes this section more than the drafting
choices do.

`[COUNSEL]` Items requiring analysis:

- **The pre-suit notice requirement.** The DTPA requires written notice before suit,
  with a period for the defendant to respond and make a settlement offer. A dispute
  clause must not be drafted in a way that conflicts with or appears to waive it.
- **The settlement offer mechanism.** It can limit damages where used properly. That
  is a procedural advantage worth preserving, and worth building an internal process
  around rather than discovering during a dispute.
- **Waiver validity.** DTPA waivers are available only in narrow, formal
  circumstances with specific required language. Attempting an invalid waiver is
  worse than not attempting one.
- **Whether the customer is a consumer.** Small businesses buying services can be.
- **Treble damages** on a knowing violation, which raises the stakes on every
  representation in the marketing copy audited in
  [20-website-copy-audit.md](20-website-copy-audit.md).

That last point connects the two ends of this package. The overpromises found in the
site audit are not merely contract-drafting risk. Under the DTPA, a misrepresentation
made knowingly can carry multiplied damages, so fixing the copy is risk reduction
rather than tidiness.

## Arbitration

`[COUNSEL]` A genuine decision with arguments both ways at this stage.

**For.** Confidential. Usually faster. Avoids a jury. Permits a class waiver, which
matters if the customer base ever grows large and a systemic defect appears.

**Against.** Filing and arbitrator fees can exceed the value of a small claim, and a
provider that drafts arbitration into a consumer contract commonly ends up paying
those fees. Limited appeal rights, which cuts both ways. Growing judicial and
regulatory scepticism of consumer arbitration clauses. And for a company whose entire
proposition is transparency, a mandatory arbitration clause with a class waiver sits
awkwardly next to the rest of the site.

**Recommendation for counsel's consideration.** At this scale, with a handful of
customers, arbitration solves a problem Business Builder does not yet have and
introduces a tone problem it does not need. A small-claims carve-out plus Texas
courts is simpler and reads better. Revisit when the customer count makes class
exposure real.

`[COUNSEL]` If arbitration is adopted, decide on: the administering body, who pays
fees, whether a class waiver is included, whether an opt-out window is offered, and
how it interacts with the DTPA notice requirement.

## Small claims carve-out

Recommended regardless of the arbitration decision. Either party may bring a claim in
small claims court where it qualifies.

Cheap to give, it reads as fair, and it keeps genuinely small disputes out of a
process that costs more than the dispute.

## Informal resolution first

Recommended: a short good-faith period before either party commences proceedings,
with a named contact and a stated response time.

This is worth more than it looks. Most disputes at this scale are misunderstandings
about scope, and a required conversation resolves a high proportion of them. It also
generates a documented record of the attempt, which is useful whatever follows.

`[COUNSEL]` Ensure it does not conflict with the DTPA notice provision or with any
limitation period.

## Limitation period

`[COUNSEL]` Whether to contractually shorten the period for bringing a claim.
Common in commercial contracts, constrained for consumers, and in Texas the DTPA has
its own period. Confirm what is permissible before shortening anything.

## Jury waiver

`[COUNSEL]` Enforceable in Texas in some circumstances, with requirements as to
conspicuousness and knowing waiver. Confirm whether it is available here and whether
it is worth the space.

## Class action waiver

`[COUNSEL]` Typically paired with arbitration. If arbitration is not adopted, a
standalone class waiver is a harder position. Decide alongside the arbitration
question rather than separately.

## Notices

Practical and frequently neglected.

- How notice is given: email to a stated address, with a physical address as backup
- When it is deemed received
- The customer's obligation to keep their contact details current
- A Business Builder address that actually exists and is monitored

`[BUILD]` The site currently publishes no contact address, no email and no phone
number. There is no way to reach the company except by submitting the intake form.
A contract cannot specify a notice address that is not published anywhere.

## Contract formation and record-keeping

The mechanism matters as much as the terms.

`[COUNSEL]` Confirm the acceptance mechanism creates an enforceable agreement. A
clickwrap with affirmative assent, a stored timestamp, and a retained copy of the
exact version accepted is the standard. Browsewrap, where terms are merely linked in
a footer, is frequently held unenforceable.

`[BUILD]` None of this exists. There are no terms, no acceptance step, and no
record. The intake form currently takes a submission with no agreement of any kind.

Required before the first customer:

- Terms presented before commitment, not after
- Affirmative acceptance, separate from the submit action `[COUNSEL]` confirm
- Timestamp and version recorded
- A retained copy of the accepted version
- A change mechanism with notice for material changes

The version-recording point is the one most often skipped and most often needed. The
question in any dispute is what the customer agreed to on the day they agreed, and
without version records that question has no answer.

## Assignment and change of control

`[COUNSEL]` Whether Business Builder may assign the contract, whether the customer
may, and what happens on a sale of the business. Customers entrusting their whole
operation to a provider have a legitimate interest in who that provider becomes.
Consider a notice right, and whether it should come with a termination right.

## Survival

Which clauses survive termination. At minimum: IP ownership, confidentiality,
limitation of liability, indemnities, dispute resolution, governing law, and the
data return and deletion obligations.

`[COUNSEL]` Confirm the export obligation survives termination expressly. It is the
one the customer will need after the contract ends, which is precisely when an
un-drafted survival clause becomes a problem.
