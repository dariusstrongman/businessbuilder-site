# 19. Texas-specific review checklist

> **DRAFT — NOT LEGAL ADVICE, NOT TAX ADVICE, NOT ATTORNEY REVIEWED.**
> This document reports what statute, rule and Comptroller guidance say, with
> citations. It does not tell you what to do about it. Every item needs a licensed
> Texas attorney, and the tax items need a Texas CPA as well.

## Read this section first

Research turned up one finding that changes the commercial model rather than merely
the paperwork, and it should be resolved before anything else in this package.

**The $299 monthly subscription is very likely a taxable service in Texas, and so is
the activation fee, and probably so is the website build.** Business Builder is a
Texas business with no minimum threshold to reach before the obligation attaches.
The published prices say nothing about tax.

That is not a drafting problem. It is a pricing problem, a registration problem and
a disclosure problem, and it arrives before the first invoice.

---

## 1. Sales tax on the subscription

### What the research found

Texas taxes software-as-a-service and cloud subscriptions as **data processing
services**. Data processing services receive a **20% exemption**, so 80% of the
charge is taxable.

- Tex. Tax Code § 151.351 exempts "20 percent of the value of information services
  and data processing services". The provision was added in 1999 and has not been
  amended since. It was checked against a current Chapter 151 file carrying ten
  2025 legislative amendments, and it survives unamended.
- 34 TAC § 3.330(a)(1) defines data processing as "the computerized entry,
  retrieval, search, compilation, manipulation, or storage of data or information".
- A Comptroller private letter ruling states that SaaS is taxable as a data
  processing service with the 20% exemption applied.
- The Comptroller was still applying the exemption in decisions dated February and
  March 2026.

**Effective rate:** 6.25% state plus up to 2% local, applied to 80% of the charge.
That is 5.00% state effective, up to 6.60% combined.

On $299 a month that is up to roughly $19.73 a month per customer.

### The rule changed, the exemption did not

34 TAC § 3.330 was overhauled effective **2 April 2025**, with a new ancillary and
separate-value test and renumbered provisions. Any analysis or template written
before that date is working from a superseded rule.

`[COUNSEL]` and `[CPA]` Confirm the current treatment and the correct rate for the
customer's location.

---

## 2. Human labour does not make it nontaxable, and bundling makes it worse

This is the finding most likely to be assumed wrong.

The Comptroller's test under 34 TAC § 3.330(a)(1)(C)(iv) turns on whether the data
manipulation is routine and repetitive rather than dependent on discretionary
judgment, and the rule says expressly that **the provider's skill, experience or
expertise in processing data is not a factor**, and that the evaluation is based on
what the provider is doing rather than what the customer wants.

Lead handling, quote drafting from a price book, inbox triage, follow-ups and
monitoring read as routine and repetitive.

### The bundling trap

34 TAC § 3.330(e)(2): where taxable and nontaxable services are sold for a **single
charge** and the taxable portion is more than **5%** of the total, **the whole
charge is presumed taxable.** The presumption is rebuttable only by separately
stating a reasonable charge **at the time of the transaction**.

And under § 3.330(e)(1), a nontaxable service only qualifies as unrelated if it is
**of a type commonly provided on a stand-alone basis**.

### Two rulings close to this business

**PLR 202407027L (2024).** A $249 monthly membership combining a human client
success manager, software, a website and a document library. The consulting would
have been nontaxable, but the taxpayer did not offer consulting on a stand-alone
basis, so the entire fee was presumed taxable with the 20% exemption.

**PLR 202503024L (2025).** A subscription bundling custom website creation, business
management software, social posts and email blasts. The entire bundle was taxable as
data processing.

The first of those is a $249 monthly bundle of software and human service sold to
small businesses. It is close enough to Build & Run that it should be read in full
before pricing decisions are made.

`[CPA]` The practical consequence: separating out a nontaxable component after the
fact does not work. If any part of the offer is to be treated as nontaxable, it has
to be genuinely available stand-alone and separately stated on the invoice at the
point of sale.

---

## 3. The website build, and a direct collision with the IP model

Four different treatments apply to parts of what is sold as one $795 product.

| Component | Treatment |
|---|---|
| Website creation, repair, maintenance | Taxable data processing, 80% taxable |
| Developing a blueprint or plan only | Not data processing |
| Hosting | Taxable data processing, 80% taxable |
| Delivered or licensed software | Fully taxable as tangible personal property, **no 20% exemption** |
| Source code with **all rights** transferred | Nontaxable contract programming |

### The collision

34 TAC § 3.308(a)(2)(B) and (c)(4) treat a source-code transfer as nontaxable
contract programming **only if** the provider "transfers all rights, including
intellectual property rights… and **retains no rights in the computer program**."

[11-ip-ownership-model.md](11-ip-ownership-model.md) recommends exactly the
opposite. The customer receives the output and a licence to the embedded reusable
components, and Business Builder **retains** the website generation engine and the
component library.

Under the retention model the export is very unlikely to qualify as nontaxable
contract programming. And because the site sells the whole thing for one price,
§ 3.330(e)(2) presumes the entire $795 taxable.

`[COUNSEL]` and `[CPA]` This is a genuine three-way tension between the IP strategy,
the tax treatment and the pricing. There is no obviously correct answer. Retaining
the engine is commercially essential. Assigning all rights in the delivered program
would change the tax treatment and gut the platform. Resolving it may require a
private letter ruling, and it should be resolved before the $795 offer is sold at
volume rather than after.

---

## 4. Residential cleaning is taxable, which the pilot depends on

Directly relevant to the first pilot customer, and the opposite of what most people
assume.

- Tex. Tax Code § 151.0048(a)(4) defines "real property service" to include
  "building or grounds cleaning, janitorial, or custodial services". The section
  has three exclusions and **none of them is residential**.
- The trap: § 151.0047, covering repair and remodelling, **does** exclude
  residences. § 151.0048, covering cleaning, does not. Remodelling a home is
  nontaxable. Cleaning it is taxable.
- 34 TAC § 3.356(a)(7) is titled "**Residential or** nonresidential building or
  grounds cleaning".
- Comptroller Publication 94-111: "Tax is due on the charge to clean a home".
- Cleaning gets **no 20% exemption**. Full rate on 100% of the charge.
- Local tax is sourced to the **provider's place of business**, not where the
  cleaning happens.

### Why this matters to Business Builder specifically

The product drafts quotes from the customer's price rules. If the tax treatment is
wrong, the pilot customer under-collects and remains liable to the state, and
Business Builder caused it while not being their tax advisor.

`[BUILD]` The quote drafting system must support a configured tax rule, must apply
it, and must not silently omit tax. See
[07-pilot-service-agreement.md](07-pilot-service-agreement.md).

`[COUNSEL]` The pilot agreement must place the taxability determination on the pilot
customer, on their own or their CPA's determination, with Business Builder applying
the configured rule and expressly disclaiming tax advice in this specific context.

---

## 5. Permit and registration, with no threshold

- A Texas-located business is "engaged in business in this state" from the first
  dollar. The **$500,000 safe harbor applies only to remote sellers**, and the
  Comptroller states that a business with physical presence in Texas is not a
  remote seller.
- 34 TAC § 3.330(c)(2) says it directly: a seller of data processing services must
  obtain a Texas sales and use tax permit and collect and remit tax.
- The permit is free.
- Filing is monthly at $1,500 or more of state tax per quarter, otherwise quarterly
  or annually. **Zero returns are still due.**
- Timely filing discount 0.5%, prepayment discount a further 1.25%.

`[CPA]` Obtain the permit before the first taxable sale, not after.

---

## 6. Activation fees and pass-through charges

**Activation fees follow the service.** STAR 9707570L, still marked current:
"Charges for setting up accounts related to taxable services are taxable in the same
manner as the service itself." So the $795 and $500 activation fees are likely
taxable on the same basis as the subscription.

The same letter notes that separately stated charges for establishing domain names
are not subject to sales tax, though it dates from 1997 and predates the modern rule.

**Pass-through expenses default into the taxable base.** 34 TAC § 3.330(e)(3):
charges for expenses directly related to and incurred while providing a taxable
service "are taxable and may not be separated" out. Tex. Tax Code § 151.007(a)(2)
allows no deduction for materials, labour, interest or other expenses. A Comptroller
memo states reimbursed expenses are taxable "even when separately stated".

### This validates the third-party fee design

[10-third-party-fees.md](10-third-party-fees.md) specifies that the customer buys
every third-party service directly, on their own account, with no Business Builder
markup and no pass-through. The research shows that design is not merely tidy. It
keeps those amounts out of Business Builder's taxable base entirely.

`[CPA]` Confirm, and treat any future deviation from the direct-purchase model as
requiring tax review first. The moment Business Builder pays a provider and recovers
the cost, that amount may become taxable revenue.

**Not confirmed by the research:** the treatment of government filing fees passed
through to a customer. No rule, ruling or publication was found on point. On their
face the statute and rule would pull them into the taxable base, and a
disclosed-agent argument exists but no Texas authority was found establishing it.
`[CPA]` This is a clean candidate for a private letter ruling if Business Builder
ever handles a filing fee rather than having the customer pay it directly.

---

## 7. Franchise tax

| Item | Report Year 2026 and 2027 |
|---|---|
| No-tax-due threshold | $2,650,000 |
| Rate, retail and wholesale | 0.375% |
| Rate, all other | 0.75% |
| Compensation deduction limit | $480,000 |

Indexed to CPI on 1 January of each even-numbered year. Next adjustment 1 January
2028.

**Below the threshold an entity still must file.** The No Tax Due Report was
discontinued for report year 2024 onward, but the obligation to file survives: a
Texas LLC files the Public Information Report, Form 05-102. A $50 late penalty
applies even with no tax due, and non-filing can lead to forfeiture of corporate
privileges.

A new entity files its first annual report on 15 May of the year after it became
subject to the tax. An entity formed in 2026 files for report year 2027.

`[CPA]` Calendar this. It is the single most commonly missed Texas obligation for a
new company and the consequence is disproportionate to the effort.

---

## 8. Local sourcing is partly unsettled

Data processing local tax is sourced by where the sale is consummated, subject to
the 2% local cap.

A caveat worth knowing: Rule 3.334's treatment of orders **not received by sales
personnel**, which is to say web orders, is subject to a permanent injunction from a
December 2024 judgment in litigation brought by several Texas cities, with an appeal
filed in 2025. The Comptroller's own page still carries a notice that it has agreed
not to enforce that provision while its validity is challenged. The research could
not confirm the appeal's status as of September 2026.

`[CPA]` Check the current position before configuring local rates for online sales.

---

## 9. Non-tax items still to be confirmed

Research on Texas consumer protection, privacy and communications law was
commissioned alongside the tax work and had not returned at the time of writing.
The following are flagged as requiring review and are addressed in the documents
named.

| Item | Where it matters |
|---|---|
| DTPA waiver validity and the professional services exemption | [17-liability-warranty-framework.md](17-liability-warranty-framework.md) |
| Whether a small business customer is a "consumer" under the DTPA | Document 17 |
| DTPA pre-suit notice and its interaction with a dispute clause | [18-dispute-governing-law.md](18-dispute-governing-law.md) |
| Texas Data Privacy and Security Act applicability and the small business exemption | [02-privacy-policy.md](02-privacy-policy.md) |
| Sensitive data consent and any required notice wording | [16-data-retention-deletion.md](16-data-retention-deletion.md) |
| Processor contract requirements | Document 16 |
| Unauthorised practice of law, and the statutory software and forms exemption | [04-service-terms-business.md](04-service-terms-business.md) |
| Where coordination ends and legal advice begins for entity selection | Document 04 |
| Texas telephone solicitation registration and the private right of action | [14-ai-automation-disclosure.md](14-ai-automation-disclosure.md) |
| Federal position on AI voice and SMS consent | Document 14 |
| Breach notification deadline and any Attorney General notification threshold | [13-credentials-and-accounts.md](13-credentials-and-accounts.md) |
| Whether a Texas AI statute is in force and reaches this model | Document 14 |
| Auto-renewal disclosure requirements | [08-cancellation-policy.md](08-cancellation-policy.md) |

---

## Immediate consequences for pricing and the site

Not legal advice, but the practical shape of the problem.

1. **The published prices do not mention tax.** $795, $1,495, $1,995, $299 a month.
   If these are taxable, either tax is added at checkout and disclosed before
   commitment, or it is absorbed and the real margin is lower than it appears.
   `[COUNSEL]` The disclosure question is a deceptive-pricing question as well as a
   tax one.

2. **A sales tax permit is needed before the first sale**, not before some
   threshold.

3. **The bundling rule constrains how the offer is invoiced.** Anything intended to
   be nontaxable must be genuinely available stand-alone and separately stated at
   the point of sale.

4. **The IP retention model and the nontaxable-source-code treatment are in
   tension** and cannot both be had without analysis.

5. **The pilot customer has their own collection obligation** on every residential
   job, and the product will be drafting their quotes.

`[CPA]` All five need a Texas CPA before the first paid customer. This is now the
top item in [23-launch-blockers.md](23-launch-blockers.md).
