# 1. Terms of Service, recommended structure and draft

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## Recommended architecture

Not one long document. A master agreement with service schedules attached.

```
Terms of Service  (the master agreement, applies to everyone)
├── Schedule A — Build My Website            → doc 03
├── Schedule B — Build My Business           → doc 04
├── Schedule C — Build & Run                 → doc 05
├── Schedule D — Founding Customer Terms     → doc 06
└── Pilot Service Agreement (separate)       → doc 07

Referenced policies, published separately and incorporated:
    Privacy Policy                           → doc 02
    Cancellation Policy                      → doc 08
    Refund Policy                            → doc 09
    Fair Use Policy                          → doc 15
    Acceptable Use Policy                    → below
```

Three reasons this shape rather than a single document.

The offers are genuinely different. A one-time website build and a continuing service
that operates a business have little in common, and forcing them into one set of
terms produces clauses that are wrong for one of them.

A customer buying only a website should not have to read the terms governing AI
workers operating their company.

And a schedule can be revised without reopening the master agreement, which matters
when the product is early and the service definitions will change.

`[COUNSEL]` Confirm the incorporation-by-reference mechanism is effective, and
decide which policies are incorporated into the contract and which are merely
published. A policy that is incorporated becomes contractually binding and changes
to it become contract amendments. That is usually not what is wanted for an
operational policy like fair use.

## Master agreement contents

The clause list, with cross-references to the documents that work them out.

### Front matter

1. **Parties and definitions.** The legal entity name, which is not currently
   published anywhere. Definitions for Customer Materials, Business Builder
   Technology, Third-Party Materials, Deliverable, Order, Operating Limits, Founder
   Action, Ready, Fully Set.
2. **Structure and precedence.** Master, then schedule, then Order. `[COUNSEL]` set
   the order and decide what happens on conflict.
3. **Acceptance and formation.** See [18-dispute-governing-law.md](18-dispute-governing-law.md).
   `[BUILD]` No mechanism exists.
4. **Eligibility and authority.** The individual accepting warrants authority to
   bind the business. See [13-credentials-and-accounts.md](13-credentials-and-accounts.md).

### The service

5. **Orders and scope.** Work is performed under an Order describing the scope. The
   scope document is the spine of the refund policy and must exist. `[BUILD]`
6. **Changes to scope.** Change control and the published rate. `[COUNSEL]`
7. **Customer responsibilities and dependencies.** Business Builder cannot perform
   if the customer does not supply information, complete Founder Actions, or
   respond. State the consequence of non-response. `[COUNSEL]`
8. **Founder Actions.** Steps that cannot be delegated, and the absolute rule against
   impersonation. See doc 04.
9. **The regulated-activity boundary.** Business Builder prepares, guides,
   coordinates, prefills where permitted, tracks, connects and verifies completion.
   It is not a law firm, accountant, insurer, bank, registered agent or filing
   authority, and does not provide legal or tax advice. See doc 04 and note the
   footer currently omits registered agent.
10. **No guarantee of third-party approval.** See doc 04.
11. **AI and automation.** See [14-ai-automation-disclosure.md](14-ai-automation-disclosure.md).
12. **Third-party services and providers.** Provider terms govern. See
    [10-third-party-fees.md](10-third-party-fees.md).

### Money

13. **Fees.** By reference to the Order. No fee appears in the master agreement, so
    a price change does not require a contract amendment.
14. **Taxes.** `[COUNSEL]` and `[CPA]`, and more urgent than it looks. See
    [19-texas-legal-review-checklist.md](19-texas-legal-review-checklist.md). The
    research indicates the subscription, the activation fee and probably the website
    build are taxable in Texas. The clause needs to state who bears the tax, and the
    site needs to disclose it before the customer commits.
15. **Payment terms.** Timing, method, failed payment, late payment. `[COUNSEL]`
16. **Third-party costs.** Doc 10.
17. **Refunds.** By reference to the published policy. Doc 09.

### Rights

18. **Customer Materials.** Doc 11.
19. **Business Builder Technology.** Doc 11.
20. **Embedded components licence.** Doc 11.
21. **Third-Party Materials.** Doc 11.
22. **Feedback and operational learning.** Doc 11.
23. **Confidentiality.** Mutual. `[COUNSEL]` Note the customer's business
    information is confidential and Business Builder's platform details are too.
24. **Data protection.** By reference to the Privacy Policy, plus the processor
    terms where Business Builder handles end-customer data. Doc 02, doc 16.
25. **Export and handoff.** Doc 12. Must survive termination expressly.

### Risk

26. **Warranties.** Doc 17.
27. **Disclaimers.** Doc 17. Specific rather than blanket.
28. **Limitation of liability.** Doc 17.
29. **Indemnities.** Doc 17.
30. **Insurance.** `[COUNSEL]` Whether to state Business Builder's cover, and
    whether to require the customer to hold their own. For the cleaning pilot the
    second is important.

### Term

31. **Term and termination.** Doc 08.
32. **Suspension.** Doc 08.
33. **Effect of termination.** Doc 08 and doc 12.
34. **Survival.** Doc 18.

### General

35. **Acceptable use.** Below.
36. **Changes to terms.** `[COUNSEL]` Notice for material changes. A unilateral
    right to change terms without notice is both poor practice and frequently
    unenforceable.
37. **Force majeure.** `[COUNSEL]` Should expressly address third-party provider
    outages, which is the realistic scenario here rather than natural disaster.
38. **Assignment.** Doc 18.
39. **Notices.** Doc 18. `[BUILD]` No address is published.
40. **Governing law, venue, dispute resolution.** Doc 18.
41. **Entire agreement, severability, waiver, counterparts.**

## Acceptable use policy

Needed and not yet drafted anywhere. Two audiences that are usually conflated.

**What the customer may not ask Business Builder to do.** Anything unlawful.
Anything that breaches a provider's terms. Anything requiring impersonation of the
customer to an authority. Sending communications the customer lacks consent to send.
Anything a model provider's usage policy prohibits. Anything requiring Business
Builder to give legal, tax, accounting or insurance advice.

**What the customer may not do with the service.** Attempt to extract, reverse
engineer or copy Business Builder Technology. Resell the service. Use it for a
business Business Builder has declined to serve. Circumvent Operating Limits.

`[COUNSEL]` Decide whether to list prohibited business categories. Most providers
in adjacent markets do. It is easier to decline at intake than to terminate later,
and a published list makes the decline impersonal.

`[COUNSEL]` The model provider flow-down in doc 14 needs to land here.

## Drafting principles for this contract specifically

Four, arising from what the site already says.

**The site is unusually customer-favourable and the terms must not contradict it.**
[20-website-copy-audit.md](20-website-copy-audit.md) lists the commitments already
made publicly. A contract that quietly reverses "stop any time" or "nothing is
charged until you approve" would be worse than having no contract, because the
contradiction is itself evidence.

**Plain language, and not as a style preference.** The customers are trade business
owners. A term a customer did not understand is harder to enforce, and under the
DTPA the gap between what they understood and what they got is the substance of a
claim. Writing clearly is risk reduction.

**Specific disclaimers beat blanket ones.** Doc 17.

**Every operational promise needs a `[BUILD]` check.** The terms describe a product.
Where the product does not yet do what the terms say, the terms are wrong and not
merely optimistic.

## What must exist before publication

- The legal entity name and a registered address `[BUILD]`
- A contact email or address for notices `[BUILD]`
- An acceptance mechanism with version recording `[BUILD]`
- A scope document per Order `[BUILD]`
- The Privacy Policy, since the terms reference it
- The refund, cancellation and fair use policies
- Counsel's review of every `[COUNSEL]` item
