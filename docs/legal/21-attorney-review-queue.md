# 21. Attorney review queue

> Every `[COUNSEL]` marker in the package, collected and grouped so a lawyer can
> work through them in a sensible order rather than reading twenty-three documents
> to find the questions.

## How to use this

Grouped by the kind of decision, then by urgency. Items marked **BLOCKING** must be
resolved before the first paid customer. Items marked **PILOT** must be resolved
before the residential-cleaning pilot specifically.

Several items are commercial decisions with a legal input rather than pure legal
questions. Those are marked **COMMERCIAL** and need the founder in the room.

---

## Group 1, tax. Engage a Texas CPA alongside counsel

**BLOCKING.** Research findings and citations are in
[19-texas-legal-review-checklist.md](19-texas-legal-review-checklist.md). These are
first because they affect pricing, which affects everything downstream.

1. Confirm the $299 monthly subscription is a taxable data processing service, and
   the correct rate after the 20% exemption.
2. Confirm the $795 and $500 activation fees follow the subscription's treatment.
3. Determine the treatment of the $795 website build, which splits across four
   categories depending on hosting and rights transfer.
4. **Resolve the IP and tax collision.** Nontaxable contract programming requires
   transferring all rights and retaining none. The IP model retains the website
   generation engine. Both cannot be had without analysis. Consider a private letter
   ruling.
5. Confirm the bundling rule's effect on how the offer is invoiced, and whether any
   component can be treated as nontaxable given it must be available stand-alone and
   separately stated at the point of sale.
6. **COMMERCIAL.** Decide whether tax is added to the published prices or absorbed,
   and how it is disclosed before the customer commits.
7. Obtain a sales and use tax permit. No threshold applies to a Texas business.
8. Confirm the franchise tax filing obligation and calendar the Public Information
   Report.
9. Confirm the treatment of government filing fees if Business Builder ever pays one
   and recovers it. No Texas authority was found on point.
10. Check the current position on local sourcing for online orders, which is subject
    to an injunction under appeal.

---

## Group 2, regulated activity

**BLOCKING.** From [04-service-terms-business.md](04-service-terms-business.md).

11. Review the Texas unauthorised practice of law position, including the statutory
    software and forms exemption, and determine the required disclosure and where it
    must appear.
12. Determine whether selecting an entity type for a customer, as distinct from
    explaining options, can be done without a licensed professional. **This is a
    product design question, not only a wording one.**
13. Conduct the same analysis for tax elections, which is a separate regulated
    activity.
14. **Drafting service and quote terms for a customer.** The site currently has
    Business Builder drafting customer-facing contract terms. This is the highest
    regulated-activity exposure found in the site audit.
15. Confirm the Founder Action list is complete and whether any item carries a
    statutory prohibition rather than a provider requirement.
16. Confirm the boundary for "name direction" and whether a trademark clearance
    disclaimer is required.
17. Confirm the Existing Business Audit framing, so that a Missing or Replace verdict
    is not a determination of legal compliance.
18. Confirm the insurance and licensing language, which currently states what a trade
    "typically requires".

---

## Group 3, consumer protection and the DTPA

**BLOCKING.** From [17-liability-warranty-framework.md](17-liability-warranty-framework.md)
and [18-dispute-governing-law.md](18-dispute-governing-law.md). Research on these
items was commissioned and its findings should be read alongside.

19. Is a small business customer a "consumer" under the DTPA?
20. Is a waiver available, and what are the exact requirements for validity?
21. Does the professional services exemption apply to any part of the service?
22. What is the effect of the treble damages provision on the marketing
    representations found in [20-website-copy-audit.md](20-website-copy-audit.md)?
23. How does the pre-suit notice requirement interact with the dispute clause?
24. Can implied warranties be disclaimed for a services contract, and with what
    conspicuousness?
25. Is a limitation of liability that would be enforceable elsewhere unenforceable
    here, such that attempting it is worse than not?

---

## Group 4, privacy

**BLOCKING.** From [02-privacy-policy.md](02-privacy-policy.md) and
[16-data-retention-deletion.md](16-data-retention-deletion.md).

26. Texas Data Privacy and Security Act applicability and the small business
    exemption.
27. Which obligations attach even to an exempt small business, particularly the
    sensitive data consent rule.
28. Required privacy notice contents, consumer rights, deadlines and appeals.
29. Whether any data collected constitutes sensitive data.
30. When a Data Protection Assessment is triggered.
31. What a processor or subprocessor contract must contain.
32. Confirm the controller and processor characterisation for end-customer data.
33. Confirm the statutory definition of "sale", which is broader than money in
    several statutes.
34. Confirm the breach notification deadline and any Attorney General threshold.
35. Set the post-termination retention window, and resolve the tension between the
    90-day retrieval window and the 24-month defence retention.
36. Narrow the "necessary to defend a claim" deletion exception, which can otherwise
    swallow the rule.
37. Confirm the legal hold trigger and who can issue one.
38. Confirm confidentiality obligations exist in writing for every person and
    contractor with access.

---

## Group 5, intellectual property

**BLOCKING.** From [11-ip-ownership-model.md](11-ip-ownership-model.md).

39. Form of the brand assignment, and whether it is conditioned on payment and
    survives a chargeback.
40. The embedded-components licence structure, and whether it survives the customer
    hiring another developer.
41. **Company Brain contents.** Who owns the derived representations as distinct from
    the source facts. Identified as the single most likely point of dispute.
42. Customer-specific prompts: encoded business rules as customer content, prompt
    scaffolding as platform.
43. AI-generated work product, and whether the assignment language implies a warranty
    of copyrightability that should be disclaimed.
44. The aggregate and de-identified learning clause, and whether it should be
    opt-out.
45. Confirm whether company history and verification evidence are intended to
    transfer.

---

## Group 6, the pilot

**PILOT.** From [07-pilot-service-agreement.md](07-pilot-service-agreement.md). This
group is the highest-risk in the package.

46. **Joint employment.** Whether scheduling constitutes direction of workers, and
    whether the agreement should recite no right of control.
47. Whether any auto-accept of a job is permitted at all. Recommendation is none.
48. The tax configuration responsibility, given residential cleaning is taxable in
    Texas and the product drafts the quotes.
49. The supervision commitment: whether every outbound communication is
    human-reviewed, and whether that relaxes on a schedule.
50. Controller and processor characterisation for end-customer data.
51. Whether any end-customer communication requires consent the pilot customer holds.
    Recommendation is no SMS or voice in the pilot, which removes the question.
52. **COMMERCIAL.** Free, reduced fee, or full price. Recommendation is reduced.
53. **The liability clause.** A fee-based cap is meaningless at a nominal pilot fee
    while the harm involves real homes and real people.
54. **Insurance.** Whether cover exists and responds to AI-performed work. This is a
    blocker rather than a drafting question.

---

## Group 7, commercial terms

Mostly **COMMERCIAL** with legal input.

55. Refund window after scope approval, and the mechanism for waiving it to start
    early. From doc 09.
56. Milestone percentages for the pro-rata refund.
57. Defect-correction window and the definition of defect as distinct from change.
58. Whether to offer a short activation guarantee window.
59. Revision round limits for the website build. Currently unbounded, identified as
    the most likely margin failure.
60. Post-delivery support position for the website build.
61. Reactivation fee after cancellation. Not currently set anywhere.
62. Proration of the final month.
63. **Whether founding customers keep their rate.** Every founding customer will ask,
    and there is no defensible answer once money has changed hands. From doc 06.
64. Notice period for a price change to a recurring plan.
65. The upgrade credit, since the site says each package contains the one before it.
66. Non-payment notice and cure period.
67. Out-of-scope work: published rate or quoted each time.
68. Fair use approach: published expected range, or defined units. From doc 15.
69. Whether to commit never to suspend for volume alone.
70. Service level commitments for Build & Run, currently undefined.

---

## Group 8, contract mechanics and dispute

71. Acceptance mechanism, and whether it meets the evidentiary standard. From doc 18.
72. Governing law, and **COMMERCIAL** whether to restrict sales to Texas initially.
73. Venue.
74. Arbitration. Recommendation is against at this scale.
75. Limitation period, and whether it can be shortened.
76. Jury waiver availability.
77. Class action waiver.
78. Assignment and change of control, and whether a notice right carries a
    termination right.
79. Survival, confirming the export obligation survives expressly.
80. Incorporation by reference, and which policies are contractual.
81. Changes to terms, and the notice mechanism.
82. Force majeure, addressing provider outages rather than natural disaster.
83. Prohibited business categories for the acceptable use policy.

---

## Group 9, AI and communications

84. Model provider acceptable use policies and which restrictions flow down. From
    doc 14.
85. Whether customer data is excluded from provider training, verified against actual
    contract terms.
86. **Apparent authority.** Whether an AI-sent quote from the customer's own address
    can bind them to a third party. Identified as the most under-appreciated exposure
    in the model.
87. Disclosure to the customer's own customers that they are corresponding with an
    automated system, and whether it differs by channel.
88. Federal and Texas telephone and SMS rules before any worker places a call or
    sends a text.
89. Whether a Texas AI statute is in force and reaches this model.
90. Auto-renewal disclosure requirements, and which states' rules apply given where
    customers are.
91. The customer-review responsibility in the AI disclosure, which must not be so
    broad that it swallows the service.

---

## Group 10, site copy

From [20-website-copy-audit.md](20-website-copy-audit.md). Wording changes proposed
there need sign-off before any is applied.

92. **The `run` package price**, which understates the bundle by $1,200 on three
    pages. Confirm the correction before publication.
93. Hosting: customer's own account, or a Business Builder service with a term. A
    product decision underlying "No ongoing fee, ever".
94. The tagline "We build it", against the disclaimer that Business Builder does not
    perform regulated steps itself.
95. The approval boundary contradicted by the worker day on the same page.
96. Whether the retention clause should appear wherever the ownership claim appears.

---

## Suggested sequence

| Order | Group | Why |
|---|---|---|
| 1 | Tax (1) | Affects pricing, which affects everything |
| 2 | Regulated activity (2) | May require product change, not just wording |
| 3 | Site copy corrections (10) | The pricing error is live now |
| 4 | Consumer protection (3) | Shapes how everything else can be drafted |
| 5 | IP (5) | Spine of the whole package |
| 6 | Privacy (4) | Blocks the Terms, which reference it |
| 7 | Commercial (7) | Founder decisions, gathered in one session |
| 8 | Mechanics and dispute (8) | Drafting, once positions are set |
| 9 | AI and communications (9) | Some items unsettled, decide deliberately |
| 10 | Pilot (6) | Last, and only once the rest is settled |

The pilot is last deliberately. It is the highest-risk engagement and it should not
be signed until the general positions behind it are decided.
