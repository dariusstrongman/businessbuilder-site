# 24. Market practice benchmarks

> **Research findings, not legal advice.** What comparable businesses actually do,
> with sources. Used to check the recommendations elsewhere in this package against
> practice rather than against instinct. No competitor contract language is
> reproduced here.
>
> Where a number is a genuine convention it says so. Where sources disagree the
> range is given rather than a fabricated consensus.

## Why this document exists

Several recommendations in this package were drafted from first principles and then
checked against market practice. In four places practice contradicted the instinct
and the recommendation changed. Those four are flagged **CHANGED** below.

---

## 1. Custom build work

### The form a counterparty's lawyer will recognise

The **AIGA Standard Form of Agreement for Design Services** is the de facto skeleton
for custom design and build work: a client-facing proposal, basic terms, a modular
intellectual property schedule with alternates you select, and supplements. For a
website build the relevant combination is the basic terms, the IP schedule, and the
interactive supplement.

Its genuinely useful innovation is that the IP schedule **forces an explicit choice**
between licence and assignment and instructs the drafter to delete the alternates. A
contract that silently omits that choice is the one that produces the ownership
fight later.

### Numbers that are actually conventions

| Item | Convention | Note |
|---|---|---|
| Acceptance window | 5 business days (design forms) to 15–20 (enterprise tech) | Spread is wide. Pick for the counterparty |
| Revision rounds | **2** is most cited, 2–3 the range | "Unlimited revisions" is read as inexperience |
| Substantive change threshold | ~10% of schedule or budget, or $1,000, whichever is greater | Below that, bill time and materials on top |
| Late fee | 1.5% per month | Subject to state usury caps. Always add "or the maximum permitted by law" |
| Deposit | 25–50%; 50% on small projects | |
| Milestone split | 50/50 under ~$5k; **40/30/30** for a three-stage web build | Attach to deliverables, never to dates |
| Warranty period | 30–90 days, **30 most cited** | |

### Three things worth copying

**Cap the cure cycles, not just the acceptance window.** The standard design form has
no limit on how many times a client can reject and require a re-test. Enterprise
technology contracts close this with a defined re-test count and an escalation path.
This is the highest-value amendment available to a fixed-price builder.

**Cap the warranty in hours, not only in months.** The interactive supplement
provides a warranty period of N months during which up to N **hours** of support are
free, expressly excluding enhancements. Most web contracts state the months and omit
the hours, which is the part that actually bounds the cost.

**Define a revision round as one consolidated batch of feedback**, not a rolling
stream, and define a revision as distinct from a new requirement. Without both
definitions the round limit does not hold.

### The payment-conditioned assignment works, and the law is better than expected

A commissioned web design by an independent contractor is almost never work made for
hire. The statutory categories do not cover it and the contractor is not an employee.
In *Smith v. Mikki More, LLC* the court so held and further found that the **implied
licence was revoked when the designer was not paid in full**.

Two objections a sophisticated counterparty will raise, both fair:

- A good-faith dispute over one invoice can cloud title to the whole live site. Fix:
  condition on payment of **undisputed** amounts, or add a cure window.
- Automatic vesting followed by reversion is messy. Cleaner: the assignment does not
  occur until payment, coupled with an express interim licence during the build that
  terminates on non-payment.

Carve out trademark-bearing material and client content so branding is never held
hostage.

### Fonts, and why the licence inventory is not optional

This is the most commonly missed item in web contracts and it directly affects the
`[BUILD]` marker in [03-service-terms-website.md](03-service-terms-website.md).

- **The end user must hold the webfont licence, in the client's company name.** The
  agency's licence cannot be transferred.
- Webfont licences are typically **single-domain**. An agency may not share one
  licence across client sites.
- **A desktop font licence does not cover web embedding.** They are different
  products.
- Stock images, marketplace themes and plugin licence keys are tied to the
  purchaser's account, not to the copyright.

A site built on the agency's font licence is non-compliant from launch day. The
contract position that follows: the provider must **inform** the client of all
third-party materials and of any licence needed at the client's expense, the client
obtains the licences, and the provider's sole obligation where a deficiency is caused
by materials it specified is to **substitute alternatives**.

**Recommendation: a third-party materials schedule per build.** Every asset, the
licensee of record, the tier and scope, the renewal date, and who pays.

### Client delay

Agency practice has converged on a graduated ladder, though the thresholds are not
standardised: delayed after about five business days without response, suspended at
roughly 45 days with the remaining balance invoiced, abandoned at roughly 90 days,
and reactivation at a stated fee or percentage. Published reactivation fees around
$500 appear in real contracts.

This answers the open question in
[04-service-terms-business.md](04-service-terms-business.md) about what happens when
a customer never completes their Founder Actions. The shape is standard even though
the numbers are not.

---

## 2. Recurring operational services

### Structure

A master agreement that is deliberately service-agnostic and carries **no pricing**,
with orders and service schedules beneath it carrying price, term, scope and service
levels. This is the architecture already recommended in
[01-terms-of-service.md](01-terms-of-service.md).

Two refinements worth adopting. Make the master **evergreen** with each schedule
carrying its own term, so terminating the master does not kill live schedules. And
write a **category-based order of precedence** clause naming which document controls
which subject matter, because precedence is not automatic and a detailed schedule
does not override a general master provision merely by being more specific.

### Service levels

**Response is committable. Resolution is not.** That distinction is the most repeated
drafting point in the material. Response means a qualified human engages with an
initial diagnosis, not an autoresponder. Resolution means root cause addressed or a
documented workaround with a committed fix date.

Four priority tiers is near-universal. The numbers behind them vary by two to four
times across sources, so the shape is standard and the figures are not.

### **CHANGED** — service credits at this price point

The widely repeated credit model is 10%, 25% or 50% of the monthly fee by severity,
capped monthly, claimed in writing within 30 days of the end of the affected month.

**At $299 a month a 10% credit is about $30.** That is visibly not a remedy, and a
"sole and exclusive remedy" clause paired with credits that small invites an
argument that the remedy fails of its essential purpose.

**Recommendation, replacing the open question in
[05-service-terms-build-and-run.md](05-service-terms-build-and-run.md):** no service
credit regime. Pair a commercially reasonable efforts standard with an honest
**chronic-failure termination right** and the standing cancellation right. Common
chronic-failure triggers are two or more breaches in a rolling twelve months, a
single outage over 24 to 48 continuous hours, or three credit events in 90 days.
A termination right costs little and defends far better than a $30 credit.

### The customer dependency clause

For genuinely interdependent managed services, the broad form is justified:
performance is excused where caused by any customer failure to provide data,
materials, assistance or cooperation. Four conditions standardly attach and a
customer's counsel will insist on the first three: causation, prompt written notice,
a duty to mitigate, and proportionate relief.

One practical caution. Relief clauses generate a record-keeping burden, and at $299 a
month nobody will maintain a formal delay ledger. A de minimis allowance of two or
three days that accrues without consequence to either side keeps the clause
administrable. An unadministrable relief clause is nearly as bad as none.

### Credentials, with an authority to cite

**CISA advisory AA22-131A**, issued jointly with NSA, FBI and international partners,
is the document to align to, and alignment is both defensible and marketable. What it
says should be contractual:

- **Multi-factor authentication enforced on all provider accounts** accessing customer
  environments, and customers should contractually mandate it
- **No reuse of administrative credentials across customers.** CISA says customers
  should ensure contracts specify this prohibition
- Least privilege in both directions, no default administrative privileges, no
  provider accounts in the customer's internal admin groups
- **Obsolete account disablement on contract termination, contractually provided for**
- Logging and visibility into provider presence and connections, with important logs
  retained **at least six months**
- Express allocation of who owns hardening, detection and incident response
- Supply chain transparency: services purchased, services excluded, incident-response
  contingencies

Every one of these is already a `[BUILD]` item in
[13-credentials-and-accounts.md](13-credentials-and-accounts.md). CISA gives them an
authority.

### **CHANGED** — the liability cap

Benchmark data across 880 vendor forms, 117 customer forms and 289 negotiated
agreements in low-risk US information technology:

| Metric | Finding |
|---|---|
| Vendor forms containing a cap | ~97% |
| Vendor forms setting it at 12 months' fees | 51% |
| Negotiated agreements landing at 12 months' fees | 39% |
| **Vendors achieving a cap below 12 months' fees** | **3.5%** |
| Negotiated agreements with a secondary "super" cap | over 32% |
| Negotiated agreements with carve-outs from the cap | over 75% |
| Negotiated agreements excluding indirect damages | ~99% |
| Agreements limiting direct damages | under 5% |

**Twelve months of trailing fees is the anchor**, and the 3.5% figure is the
important one: attempting less almost never survives negotiation. The realistic goal
on carve-outs is *narrow* ones, not none.

**The alternative worth serious consideration**, and it directly answers the open
question about the pilot in
[07-pilot-service-agreement.md](07-pilot-service-agreement.md): cap at **the greater
of six months of revenue for the service giving rise to the claim, or the available
proceeds of the provider's professional liability insurance.**

That shape is elegant. Insurance responds to covered claims, uncovered claims fall to
the six-month floor, and it addresses the enforceability problem directly, because
**a cap that points at real insurance proceeds looks far less illusory than a flat
$3,600.** For a pilot with a nominal fee it is materially better than a fee multiple.

It also makes the insurance question in
[17-liability-warranty-framework.md](17-liability-warranty-framework.md) load-bearing
rather than advisory: carriers *expect to see* a limitation of liability clause in a
provider's customer contracts, so weakening the cap can affect insurability and
pricing.

### Three drafting traps in the cap

**Define the super cap by the harm, not the obligation.** Where a service failure
*causes* a data breach, the claim can be characterised as breach of the general
service obligations rather than the data-security obligations, falling under the low
general cap. Trigger the super cap on a security incident affecting customer data,
not on which clause was breached.

**Name breach-response costs expressly.** Customers will recharacterise credit
monitoring, notification, forensics, reputation management and legal fees as *direct*
damages, escaping the consequential-damages exclusion. Do not rely on the
direct/indirect line to do that work.

**Gross negligence pierces the cap**, and plaintiffs plead it specifically for that
reason. The operational mitigation matters as much as the drafting: **signed
risk-acceptance forms when a customer declines a recommended control**, plus
disciplined evidence habits. This maps directly onto the approval and escalation
records already required in the `[BUILD]` list.

### Subcontractors, resolved

Practice splits, and the split is resolvable by a distinction the sources conflate.

A **subcontractor** you select and direct to perform your obligations: you remain
fully responsible. A **third-party vendor** the service runs on, including the model
provider: pass through, with a schedule listing each vendor, its purpose, and links
to its terms. Subcontracting without notice is a recognised red flag, so a disclosure
obligation is the reasonable middle ground.

---

## 3. AI agent services, where practice is genuinely unsettled

There is an emerging consensus on *what clauses to write* and much less on *who bears
the loss when the agent acts wrongly*. Keep the two separate.

### The emerging clause set

1. **Agent classification.** Agents function as tools assisting humans, not as
   autonomous decision-makers, to clarify accountability when they produce unexpected
   results.
2. **Defined authority, with numeric ceilings.** Practitioners identify this as *the
   single highest-value clause*, because it is the only control that bounds potential
   loss. An enumerated list of permitted actions plus ceilings **per transaction, per
   counterparty, and per 24-hour period**, plus a revocation procedure with effective
   dates.
3. **Human-in-the-loop gates that name the action types and the approvers.** Vague
   oversight promises carry no weight.
4. **Output accuracy disclaimer paired with an affirmative customer verification
   duty.**
5. **Training-data prohibition**, expressed to apply regardless of anonymisation.

Point 2 is a direct addition to
[14-ai-automation-disclosure.md](14-ai-automation-disclosure.md), which describes
permissions and budgets but does not currently specify numeric ceilings per
counterparty or per rolling day. A per-transaction cap alone does not stop a worker
making the same mistake forty times.

### The gap nobody has closed

Contracts written for software as a service do not fit agentic AI. Suppliers disclaim
accuracy and fitness while retaining operational control. Standard intellectual
property indemnities do not reach harms from an agent's *actions*. The excluded loss
categories are exactly what agent failures cause. **Caps pegged to subscription fees
are inadequate when an agent acts repeatedly.** And legacy agreements lack oversight,
explainability, log-access and real-time suspension rights.

This supports the recommendation in doc 17 to allocate liability by control rather
than by inheriting a software template, and it is why the numeric ceilings above
matter more here than in a conventional service.

### What IS settled: attribution

Loss allocation is unsettled. **Attribution is not.**

A tribunal has already held an airline responsible for what its customer-service
chatbot told a passenger, rejecting the argument that the bot was a separate entity
the company was not answerable for. A California statute effective January 2026
addresses the same question directly.

**"The AI did it" is not available as a defence.** A business is answerable for what
its automated systems say to the public, in the same way it is answerable for what an
employee says.

Two consequences for Business Builder, pointing in opposite directions.

The customer cannot escape responsibility for what a worker told their own customer by
pointing at the automation. That is useful in allocating to the customer the risk of
correct operation within limits they set.

And Business Builder cannot escape responsibility for what its own platform did by
pointing at the model provider. That is why enforcement of Operating Limits, rather
than their description, is the load-bearing control.

---

## 4. Flat-rate services with variable cost

### The word

Enforcement against "unlimited" claims that are subject to undisclosed throttling has
produced a $60 million settlement and a $100 million proposed forfeiture. The
standard is settled: **fine print cannot cure a headline claim, and a hyperlink does
not satisfy proximity.**

The site already avoids the word and states the negative directly. Keep it that way.

### The precedent that matters most

A well-known flat-rate creative service **retreated in 2025 from unlimited requests
to purchased daily hours**. That is the clearest available evidence that an unbounded
*human* component under a flat fee does not survive at scale.

Build & Run has exactly that structure: a flat $299 covering work that includes human
operator time. The recommendation in
[15-fair-use-policy.md](15-fair-use-policy.md) to bound by work type and published
expected range is sound, and this precedent argues for adding one more control.

### **CHANGED** — the concurrency cap

**A concurrency cap is a better primary control than a volume cap.** One active work
item at a time, with an unlimited queue, self-absorbs both model cost and human
labour variance without ever requiring the provider to call a paying customer
abusive.

It is also honest in marketing: *unlimited requests you may submit* is true under a
queue model, *unlimited throughput* never is. Keeping those two claims separate is
what the enforcement actions turn on.

**Recommendation:** adopt concurrency as the primary bound and the published expected
range as the secondary, rather than relying on volume alone.

### Overage, and what avoids disputes

Notify then negotiate, and charge only on opt-in. Alerts at 75%, 90% and 100% of the
expected range. **No automatic charge.** At 100%, written notice offering an upgrade,
a bounded add-on block, or a pause on new intake, requiring affirmative consent
before any charge above the base fee.

This is simultaneously the lowest-dispute design available and the best chargeback
evidence, and it matches the enforcement sequence already recommended in doc 15.

Three documented repricing backlashes in fifteen months all produced reputational
cost exceeding any legal cost, with one vendor issuing full refunds for unexpected
charges over a two-week window. **Make failed or escalated work free.** It is cheap,
it is becoming the norm, and it removes the most sympathetic dispute narrative a
customer can tell.

---

## 5. Refunds, disputes and the payment processor

This section changed the refund recommendation more than any other research.

### The deposit problem

Three legally distinct instruments get called the same thing.

| Instrument | Character | Refundable |
|---|---|---|
| Refundable advance | Client money held against future work | Unearned portion refundable |
| True retainer, earned on receipt | Payment for availability | Only if genuinely for availability |
| Non-refundable deposit | Functionally liquidated damages | Only if it survives the penalty test |

**Labelling a fee non-refundable does not make it so.** It holds only where the
payment genuinely buys availability rather than services not yet performed, it is
explained and agreed in writing in advance, and the amount is not disproportionate.

The liquidated damages test: actual damages were difficult to estimate at formation,
and the stipulated sum is a reasonable forecast of the harm. A sum bearing no
relation to actual damages is struck as a penalty.

**A consumer-contract trap worth knowing.** California Civil Code § 1671(c) makes a
liquidated damages provision **void** in a contract for retail purchase of goods or
services primarily for personal, family or household purposes, except where fixing
actual damage was impracticable. That reverses the ordinary presumption. A business
build sold to a founder is arguably commercial, but the buyer is frequently a
**pre-formation individual**, and plaintiff-side counsel will argue consumer status.

`[COUNSEL]` Consider drafting as if the consumer provision applies.

### Why the milestone schedule survives

The stage-gated schedule recommended in
[09-refund-policy-recommendation.md](09-refund-policy-recommendation.md) is the
defensible structure precisely because it **is** a reasonable forecast: it tracks
value actually delivered, which is what a court would award anyway on a quantum
meruit measure, with the contract price as a cap.

Three drafting rules that make it hold:

- State dollar amounts or fixed percentages per stage, **published before purchase**,
  not a discretionary later valuation
- Tie each stage to an **objectively verifiable artifact**: a delivered brief, a
  staging URL, a commit, an email with the deliverable attached. That artifact later
  becomes the processor evidence
- Keep retention at or below plausible cost plus margin for the stage. Retaining 50%
  where 10% of the work was done is the fact pattern that produces a penalty ruling

A percentage-of-remaining-balance kill fee is the **weakest** version doctrinally,
because it compensates for work not done. The "greatest of advance paid, prorated
fees, or hourly fees for work actually performed" formulation achieves similar
economics without ever using the words non-refundable, and is the safer construction.

### Third-party costs, and the one design choice that removes most exposure

Segregate them as a separate line at checkout, never bundled. State that once
remitted they are non-refundable **because the provider cannot recover them either**.
Provide receipts. And state what happens to the **asset**: on cancellation the domain
and the formed entity transfer to the client.

That last point converts "we kept your money" into "you kept the thing your money
bought", which is the strongest single fact in a cancelled-services dispute.

**The design choice that matters most: a cancellation window before costs are
incurred.** Telling the customer they may cancel at no cost until the filing is made,
and not filing for 24 hours after purchase, removes most of the dispute exposure in
this category by itself. It pairs with authorising the card and capturing later,
because **cardholders cannot dispute an uncaptured authorisation.**

### **CHANGED** — the acceptance mechanism

This is the finding with the largest engineering consequence.

A checkout checkbox that only *links* to the terms may be **rejected by the card
issuer as insufficient evidence** that the customer was aware of the policy. There
must be reasonable evidence that a **full copy** was presented before purchase.

For a business whose refund policy is restrictive and stage-gated, a link-only
checkbox means, in practice, **no enforceable policy against a chargeback.**

What to build instead:

- Present the full policy text on the checkout page or in a modal requiring agreement
  before the order is submitted, not only a link
- Capture the consent object and timestamp from the checkout session
- **Persist a hash or version id of the policy text as it read at that moment**

That last item is the single highest-leverage engineering investment in the whole
package. It is simultaneously the disclosure evidence, the processor evidence, the
fix for the illusory-contract problem below, and the consent-retention record several
state statutes require. One build, four legal purposes.

`[BUILD]` Added to [22-security-and-build-gaps.md](22-security-and-build-gaps.md).

### The monitoring threshold that should worry a low-volume business

The card network monitoring programme was consolidated in 2025. The current
non-compliant threshold is **5 disputes and a 0.5% ratio**, and the ratio now counts
all disputes, fraudulent and non-fraud, plus early fraud warnings.

**A business doing fewer than about a hundred payments a month can be pushed over by
one or two disputes.** That is precisely the profile of the one-time build lines.

Three counting rules that surprise merchants:

- **Monitoring ignores dispute outcomes.** Winning does not help the rate. Only
  receiving fewer disputes helps
- **Monitoring ignores refunds.** A dispute filed after a refund still counts
- Accepting a dispute is not cheaper reputationally than fighting it

And a timing point specific to this business: for services paid in advance the
dispute window generally starts on the **service date**, not the payment date. A
build paid for in January and delivered in April can be disputed into August.
**Assemble the evidence package per engagement at delivery, not after the fact.**

### What the processor requires a merchant to publish

Business name, address and country **before card details are requested**. Accurate
communication of amount and currency before processing. A **fair and neutral refund
policy** with a clear explanation of how a customer obtains a refund. For recurring
charges, notice that charges recur **and the method for cancelling**.

A restrictive refund policy does **not** defeat a "not as described" claim. Only
accurate description does, which makes the scope document a dispute-defence artifact
as much as a contract one.

---

## 6. **CHANGED** — subscription cancellation, confirmed position

This corrects the uncertainty flagged in
[08-cancellation-policy.md](08-cancellation-policy.md).

### The federal rule is not in effect

The Federal Trade Commission's negative option rule, widely known as click-to-cancel,
was **vacated in its entirety by the Eighth Circuit on 8 July 2025** in *Custom
Communications, Inc. v. FTC*, six days before its compliance date. The grounds were
procedural: a required preliminary regulatory analysis was not issued for a rule whose
economic effect exceeded the statutory threshold.

A re-proposal is in progress. An advance notice of proposed rulemaking opened for
comment in March 2026 and closed in April 2026. **As of September 2026 there is no
new final rule**, and no proposed rule text could be confirmed.

### What is enforceable anyway

- **ROSCA**, which requires clear and conspicuous disclosure of all material terms
  **before billing information is obtained**, express informed consent before
  charging, and **simple mechanisms to stop recurring charges**
- The FTC Act's general prohibition on deceptive practices, used independently against
  enrolment, consent and cancellation design
- State unfair practices statutes and state auto-renewal laws

**Post-vacatur enforcement has increased, not decreased**, including a $2.5 billion
resolution, a $60 million settlement over renewal disclosures, and a $7.5 million
settlement over concealed cancellation options. The vacatur removed the rule, not the
risk.

### The state patchwork is now stricter than the vacated federal rule

| Jurisdiction | In force | The obligation that bites |
|---|---|---|
| **California** | **1 July 2025** | **Separate affirmative consent to the auto-renewal term**, not bundled into general terms acceptance, not pre-checked. Cancel in the same medium used to subscribe. **Retain consent records at least 3 years** |
| **New York** | 5 November 2025 | No pre-checked boxes. Material terms in visual proximity to the consent request. Retainable post-transaction acknowledgment. Online sign-up means online cancellation. **Price increase requires advance consent, or cancellation with pro-rata refund within 14 days** |
| **Colorado** | Sources conflict, treat as February 2026 and verify | **One-step online cancellation link.** Scope arguably extends beyond personal and household purposes |
| Minnesota, Utah | January 2025 | Annual reminders, trial notices |
| Massachusetts | September 2025 | Pre-renewal notice; trial disclosures must state the **calendar date** to cancel by |
| Maine | January 2026 | Separate consent to the auto-renewal provision |
| Maryland, Connecticut, Virginia | Mid 2026 | Cancellation at least as easy as sign-up |
| **New York City** | **1 October 2026** | Cancellation **as easy to use as the consent method**, online cancellation required even where consent was in person. Penalties from $525 rising to $3,500 |

The California separate-consent rule is the one with the most immediate consequence:
**bundling auto-renewal consent into general terms acceptance is now non-compliant in
the largest US market**, and it simultaneously weakens the chargeback evidence,
because the issuer sees consent to "terms" rather than to recurring billing.

### The recommended design, replacing the open questions in doc 08

**Confirmed: no notice period.** Imposing one on a monthly subscription is read as an
obstacle to a "simple mechanism" and it manufactures cancelled-recurring disputes.

**Confirmed: end of current paid period**, access continuing through it.

**Confirmed: no proration on voluntary cancellation**, if clearly disclosed before
purchase, **with two carve-outs to build for anyway**:

- Offer a full or prorated refund where a customer cancels the day after being
  billed. The refund costs far less than a dispute, which counts against the
  monitoring ratio whether won or lost
- New York requires cancellation with a **pro-rata refund within 14 days** of a first
  increased charge absent advance affirmative consent. Build the capability even if it
  is not otherwise used

**Reminder schedule.** Adopt the strictest overlapping standard as one global policy
rather than a per-state matrix: two to three days before each monthly charge with
amount, date and a direct cancellation link; seven days before any annual renewal or
trial conversion; annually a reminder of terms and cancellation instructions;
fifteen to forty-five days before any annual cancellation deadline; and advance notice
of any price increase.

**Cancellation mechanism.** In-account, one step, self-serve. No phone-only. No
retention gauntlet: a retention offer may only sit alongside a prominent, continuously
visible link that completes the cancellation. Confirmation email with timestamp and
effective date.

**The activation fee must be a separate, clearly labelled line item** with its own
refundability treatment. Presenting the first charge as $299 when it is $299 plus
activation is simultaneously a processing dispute and a deception fact pattern.

### The combination regulators find interesting

An activation fee, plus a long minimum term, plus a long non-renewal notice window.
**Pick at most one of the three to be aggressive on.** Business Builder currently has
the activation fee and neither of the others, which is the right side of that line.

---

## 7. **NEW RISK** — the Business Opportunity Rule

Not previously considered anywhere in this package, and it deserves its own entry.

A federal rule governs the sale of a "business opportunity". It can reach a service
that takes a required payment **as a condition of commencing a business** where the
seller also makes any representation about providing outlets, accounts or customers,
or makes any earnings claim. Where it applies, it requires a **one-page disclosure
document delivered in advance** of the sale.

A rulemaking to expand its scope was proposed in January 2025.

**Why this matters here.** Business Builder sells a service whose entire proposition
is assembling a business in exchange for an upfront payment. That is the first
element. Whether the rule applies turns substantially on the second: whether any
representation is made about providing customers, accounts or outlets, or any earnings
claim at all.

**The safe posture, which the site already largely holds:** no representation that
the business will get customers, accounts or revenue, and no earnings claims anywhere.
The site audit found two places that drift toward this, both already flagged in
[20-website-copy-audit.md](20-website-copy-audit.md): the search ranking claim, and
the statement that founders start taking customers while work finishes.

`[COUNSEL]` Confirm whether the rule reaches this model, and whether the disclosure
obligation attaches. This should be resolved before the first business build is sold.

### And a second, narrower one

A federal cooling-off rule gives a three-business-day cancellation right for sales of
goods **and services** above a low threshold made at the buyer's residence, or above a
higher threshold at temporary locations such as trade shows and hotel rooms, with
required notices and forms at the time of sale.

Online and telephone sales from a fixed place of business are generally outside it.
**A founders' event or a home visit pulls the sale in.** Worth knowing before the
first in-person sale rather than after.

---

## 8. Unauthorised practice of law, with specifics

Findings that sharpen the analysis in
[04-service-terms-business.md](04-service-terms-business.md).

**Liability has been located in the human review step.** In litigation against an
online legal document provider, the exposure was located precisely in **human
employees reviewing customer answers** — which is the core activity of a coordination
business with an operator-review model. This is the finding most directly on point
for Business Builder's architecture.

**The enumerated advice prohibition used by the major formation providers is copied
from a state statute.** Track the statutory language rather than improvising a list.

**One targeted mitigation used in practice:** a clause stating that review is for
**completeness, not legal sufficiency.** That is a precise, honest and narrow
statement of what an operator actually does.

**A state-specific trap.** At least one state's safe harbour for non-lawyer document
services is **disqualified** by the presence of warranty disclaimers, liability caps,
damages limitations, or out-of-state forum clauses. A single national terms document
carrying a standard limitation of liability and an out-of-state forum clause cannot
claim that safe harbour.

`[COUNSEL]` If sales are ever made outside Texas, this needs a state-specific rider.
It is a further argument for the recommendation in
[18-dispute-governing-law.md](18-dispute-governing-law.md) to consider restricting
sales to Texas initially.

---

## 9. The illusory contract problem

A unilateral right to change terms, exercised by posting rather than notice, can
render the whole agreement illusory and unenforceable. The provisions a provider most
needs are the ones most exposed.

The fix:

- Changes are **prospective only** and never apply to accrued claims
- **Email notice with a stated effective date**, never notice by posting
- Continued use is acceptance **only where notice was actually sent**
- **Carve the dispute resolution provisions out of the unilateral amendment power**

That last carve-out is precisely what the losing party lacked in the leading case.
Added as a recommendation to doc 18.

---

## 10. Export and offboarding, benchmarked

What large published terms actually commit to, which is less than customer wish lists
demand.

| Element | Market | Note |
|---|---|---|
| Format | CSV, JSON; attachments native | Proprietary formats and static PDFs treated as non-compliant |
| Export window | 30 days from termination, on request | One major vendor. Another gives 90 days of limited-function self-extraction |
| Retention before deletion | 30–90 days | 30 the vendor default, 90 the common customer ask |
| Cost | Self-service free, assisted extraction billable | A real negotiation point |
| Destruction certificate | On request, naming categories and date | Referenced to the recognised media sanitisation standard |
| Transition assistance | 30/60/90 days at standard rates | |

**The gap between customer wish lists and vendor commitments is wide, and that gap is
positioning room.** A 30-day self-service export in open formats at no charge, 60-day
retention before deletion, a destruction certificate on request, and assisted
extraction at standard rates would sit **at or above market for a $299 product** and
is safely advertisable.

**Do not promise instant backup deletion.** Word the certificate around deletion from
production within a stated period and from backups within the rotation period.

**Two additions specific to this business.** The contractual account-disablement
provision from the CISA advisory belongs in the offboarding clause. And on exit,
deliver the **agent configurations, prompts and system instructions, orchestration
logic, evaluation sets, documentation and runbooks** that are the customer's — the AI
analogue of source files, and exactly as likely to produce an expectation mismatch if
left unstated. See the boundary drawn in
[11-ip-ownership-model.md](11-ip-ownership-model.md).

---

## Where practice genuinely varies

Decide these deliberately rather than assuming a standard exists. Acceptance period.
Milestone splits. Kill fee percentages. Dormancy thresholds. Warranty duration, though
the exclusions are far more standardised than the duration. Initial term. Non-renewal
notice. Service level numbers, though the four-tier shape is standard. Service credit
percentages. Liability cap shape, between a fee multiple and the insurance-linked
formulation. Super cap multiples. Subcontractor responsibility. Whether data return is
free. Out-of-scope approval thresholds. Insurance limits, which sources explicitly
declined to benchmark. Portfolio credit. Source file and agent configuration delivery,
where there is no default in either the design or the AI world and it must be stated
either way.

## The cross-cutting theme

Across every category, the contract-enforceability instinct is to be restrictive while
the chargeback and regulatory instinct is to be generous and provable.

**The reconciliation is disclosure and proof, not restriction.** A moderate policy
that is provably disclosed beats a harsh policy that is not.

That happens to align with how this codebase is already built. Copy lives in
`src/content/` as typed, versioned data rather than prose scattered through
components. One source of truth, versioned, rendered into marketing copy, checkout
text and the terms document alike. **Every inconsistency between those three surfaces
is simultaneously a deception exposure, a misrepresentation in a dispute, and a
weakened defence.** The site audit found several. The architecture that lets them be
found is the same architecture that can keep them fixed.
