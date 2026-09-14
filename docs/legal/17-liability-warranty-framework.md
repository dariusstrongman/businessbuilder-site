# 17. Limitation of liability and warranty framework

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> **This document is a framework for counsel. It is not drafted language and must
> not be used as such.** Every position below needs a lawyer's decision.

## Why the standard template does not fit

The default technology contract caps liability at fees paid over the trailing twelve
months, disclaims all implied warranties, excludes consequential damages, and moves
on. That template assumes the provider supplies a tool and the customer operates it.

Here the provider operates the customer's business. The failure modes are different
in kind, and three of them have no good template answer.

**The fee-based cap is too small relative to the harm.** A Build & Run customer pays
$3,588 a year. A worker that sends the wrong thing to a hundred of that customer's
own customers causes harm that is not bounded by $3,588. The cap is defensible as an
allocation between the parties, but it should be adopted knowingly rather than
inherited.

**Harm lands on third parties who never agreed to anything.** The customer's
customers are not party to the contract. A limitation between Business Builder and
the customer does nothing about a claim brought by a member of the public.

**The AI failure mode has no settled allocation.** When an AI worker acts within its
permissions but produces a wrong result, no market consensus exists on who bears it.
This is genuinely unsettled, and a contract that pretends otherwise is hiding the
question rather than answering it.

## The Texas constraint

`[COUNSEL]` The Texas Deceptive Trade Practices Act materially constrains what can
be disclaimed and waived in a consumer transaction, and the definition of "consumer"
is broader than intuition suggests. A small business purchasing services can be a
consumer under the Act.

Specific items requiring analysis before any disclaimer is drafted:

- Whether the customer is a consumer under the Act
- Whether a waiver is available at all, and if so the precise statutory
  requirements for validity, which are narrow and formal
- Whether the professional services exemption applies to any part of the service
- The effect of the treble damages provision on the knowing standard
- The pre-suit notice requirement and how it interacts with any dispute clause
- Whether a limitation of liability that would be enforceable elsewhere is
  unenforceable here, in which case attempting it may be worse than not

That last point is the one that most affects drafting strategy. An overreaching
disclaimer that a court strikes leaves the provider with nothing, and may support an
argument that the provider was acting in bad faith. A narrower clause that holds is
worth more than a broad one that does not.

## Warranty framework

Three layers, ordered from what should be warranted to what should not.

### Layer 1, warrant this

Affirmative commitments that are true, achievable, and worth making. These are
assets, not concessions.

- Services performed in a professional and workmanlike manner. `[COUNSEL]` this is
  a recognised standard in Texas and may be implied regardless, so consider whether
  stating it changes anything
- Deliverables will conform to the agreed scope document
- Business Builder has the right to grant the rights it grants
- Business Builder will operate within the Operating Limits the customer sets
- Business Builder will not knowingly take an action that breaches a provider's
  terms or applicable law
- Customer data will be handled per the published privacy policy

The second item is the one the site's copy already effectively promises and the one
most worth stating clearly, because it pairs with the refund policy.

### Layer 2, expressly do not warrant this

Specific disclaimers, each tied to a real limitation rather than a blanket.

- No business outcome: revenue, customers, leads, growth, profitability
- No search ranking, traffic, or visibility outcome
- No approval by any government agency, bank, insurer, payment processor or listing
  platform
- No warranty that AI output is accurate, complete, or fit for a particular use
  without review
- No warranty of uninterrupted or error-free operation
- No warranty regarding third-party products, providers, or their continued
  availability, pricing, or terms
- No legal, tax, accounting, insurance or investment advice, and no warranty that
  any arrangement is compliant

`[COUNSEL]` Specific disclaimers tied to real limitations are both more defensible
and less objectionable than a blanket "as is" recital. Recommendation is to draft
them specifically and to avoid an all-caps blanket disclaimer entirely, subject to
the Texas analysis above.

### Layer 3, the implied warranties

`[COUNSEL]` Merchantability and fitness for a particular purpose. Whether these can
be disclaimed for a services contract in Texas, what conspicuousness is required,
and whether the DTPA affects it. This is a pure legal question.

## Liability framework

### The cap

`[COUNSEL]` Decide the measure. Options and their consequences:

| Measure | Effect |
|---|---|
| Fees paid, trailing 12 months | Market standard. Small here relative to harm |
| Fees paid, total | Larger for one-time builds, still small for Build & Run |
| Fees paid, with a stated floor | Addresses the nominal-fee problem, particularly for the pilot |
| Separate caps per service | Build & Run has a different risk profile from a website build |

Recommendation for discussion: a trailing-12-month measure with a stated minimum
floor, and a separate, higher cap for Build & Run reflecting that it involves acting
on the customer's behalf continuously.

### Carve-outs from the cap

These should sit outside any cap. Standard, and each needed here for a specific
reason.

- Breach of confidentiality
- Data breach caused by Business Builder's failure to meet its stated security
  obligations `[COUNSEL]` the qualifier matters
- Indemnity obligations
- Gross negligence and wilful misconduct
- Infringement of third-party intellectual property by a deliverable
- Anything that cannot be limited by law

`[COUNSEL]` The data-breach carve-out is the most consequential decision in this
document. An uncapped data-breach liability without insurance behind it is an
existential exposure for a company at this stage. A capped one may be commercially
unacceptable to a customer entrusting their whole business. The answer likely
depends on the insurance position.

### Consequential damages

`[COUNSEL]` The standard exclusion of indirect, incidental, special, consequential
and punitive damages, and of lost profits.

Note the tension. The customer's realistic loss from a Build & Run failure **is**
lost profits: leads not handled, jobs not booked, customers lost. Excluding exactly
the category of loss the service is designed to prevent is defensible drafting and
is a harder conversation than usual with a customer who reads it. Whether to soften
it, cap it rather than exclude it, or leave it excluded is a commercial decision
with a legal input.

## Indemnities

### Business Builder indemnifies the customer for

- Third-party IP infringement claims arising from Business Builder's deliverables,
  excluding customer-supplied material
- `[COUNSEL]` Consider whether to indemnify for a breach of Business Builder's own
  security obligations

### The customer indemnifies Business Builder for

- Claims arising from the customer's underlying business, which Business Builder
  does not perform. For the cleaning pilot this is the whole cleaning operation
- Claims arising from customer-supplied content, including infringement
- Claims arising from the customer's instructions, where Business Builder followed
  them and flagged the concern
- The customer's own breach of law or of a provider's terms
- Claims by the customer's own customers, except to the extent caused by Business
  Builder `[COUNSEL]` the carve-out is the negotiation

The first item is essential for the pilot and should be firm. Business Builder does
not clean houses, does not employ cleaners, and must not carry the risk of that work.

## The AI-specific allocation

The genuinely open question. Setting out the positions so counsel can choose rather
than inherit.

**Position A, output is the customer's responsibility to review.** Business Builder
provides the mechanism, the customer reviews what matters, and the customer bears
the consequence of output they approved or chose not to review. Clean, defensible,
and it undercuts the product's value proposition if drafted too broadly, because the
customer bought relief from exactly this work.

**Position B, Business Builder bears failures of the mechanism.** Business Builder
is responsible where a worker acted outside its configured limits, where the
escalation failed, or where a committed review did not happen. The customer bears
the consequence of correct operation within limits they set. More closely matched to
what the product actually promises.

**Recommendation for counsel's consideration: Position B**, because it aligns
liability with control. Business Builder controls whether the limits are enforced
and whether escalation works. The customer controls what the limits are.

This has a direct product consequence and it is the reason the `[BUILD]` items in
[14-ai-automation-disclosure.md](14-ai-automation-disclosure.md) matter so much.
Under Position B, a permission boundary that is instructed rather than enforced is
not just a product weakness. It is an uninsured liability.

`[COUNSEL]` Also decide the apparent-authority question raised in document 14:
whether a quote or confirmation sent by an AI worker from the customer's own address
can bind the customer to a third party, and how the contract allocates that.

## Insurance

`[COUNSEL]` and a launch blocker rather than a drafting question.

Confirm before the first paid customer:

- Technology errors and omissions cover, and whether it responds to AI-performed work
- Cyber liability, and its coverage for data held on behalf of customers
- General liability
- Whether any policy excludes AI-related claims, which is an emerging exclusion
- Whether the limits are meaningful relative to the carve-outs above

A liability framework with no insurance behind it transfers risk on paper only. If
cover is unavailable or excluded for the AI-performed work, that is a material fact
about the business model and should be known before launch rather than after a
claim.
