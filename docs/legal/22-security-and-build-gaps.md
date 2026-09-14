# 22. Build and security gaps that block publication

> Every `[BUILD]` marker in the package, collected. Each is a sentence some document
> needs to say that is **not currently true**. Publishing the sentence before
> building the capability turns a drafting choice into a misrepresentation.

## How to use this

A document can clear legal review and still be unpublishable. Counsel approving the
language does not make the language true. These are the items that make it true.

Ordered by consequence, not by document.

---

## Tier 1, the site currently states something false

### 1.1 The intake says a build is open. Nothing is saved.

`src/app/start/actions.ts:18-22` validates and acknowledges without persisting.
`src/app/start/StartForm.tsx:54-59` tells the submitter their build is open and they
will be contacted by email.

Blocks: the Privacy Policy, the Terms, and any customer acquisition at all.
Fix: persist and send, or change the copy, or take the form down.

### 1.2 The login page collects a password with no backend.

`src/app/login/page.tsx:23-41` posts to a route with no handler.

Blocks: the Privacy Policy. Fix: remove the route and its links until authentication
exists.

### 1.3 The flagship page describes the wrong deliverables.

`src/app/build-my-business/page.tsx:150-161` pairs 11 notes against 16 inclusions by
index. From the second row onward every description belongs to a different item.

Blocks: nothing legally, but it is a misstatement of scope on the $1,495 page.
Fix: pair by key.

---

## Tier 2, contract mechanics that do not exist

### 2.1 No acceptance mechanism, and a link is not enough

No terms, no acceptance step, no timestamp, no version record. Without this there is
no contract and no chargeback defence.

Research sharpened this requirement. **A checkbox that only links to the terms may be
rejected by the card issuer as insufficient evidence.** The full text must be presented
before purchase, not merely linked.

Required:

- Full policy text presented on the checkout page or in a modal requiring agreement
- Separate affirmative consent to the recurring charge, not bundled into general terms
- Consent object and timestamp captured
- **A hash or version id of the policy as it read at that moment, persisted and keyed
  to the transaction**

The last item is the single highest-leverage engineering investment in the package. It
serves four purposes at once: the disclosure evidence, the payment-dispute evidence, the
fix for the illusory-contract problem in doc 18, and the consent-retention record several
state statutes require.

Blocks: every document in the package.

### 2.2 No scope document

The refund policy, the acceptance mechanism, the warranty of conformity and the
change-control clause all hang on "the agreed scope". It must be a written artifact
the customer approves in a recorded way.

Blocks: doc 09, doc 03, doc 04.

### 2.3 No published entity identity

No legal entity name, no registered address, no contact email, no phone number.
There is no way to reach the company except the intake form.

Blocks: the Terms, the Privacy Policy, and the notices clause.

### 2.4 No record of third-party purchase approvals

Doc 10 commits that every third-party purchase is an approval before it is bought.
That requires an approval gate and a record of it.

Blocks: doc 10, and the non-refundability position in doc 09.

---

## Tier 3, the operating limits are described but not enforced

This tier is the most consequential and the least visible. The site makes eighteen
distinct assertions about what AI workers can, must ask about, and cannot do.

### 3.1 Permission boundaries must be enforced, not instructed

An instruction to a model not to do something is not a control. Every boundary the
site asserts must be enforced outside the model.

Blocks: doc 14, doc 05. Under the liability allocation recommended in doc 17,
Business Builder bears failures of the mechanism, which makes an unenforced boundary
an uninsured liability rather than a product weakness.

### 3.2 The customer cannot see or change their limits

Doc 05 and doc 14 commit that the customer sets limits, changes them at any time,
and can stop a worker immediately.

### 3.3 No verified halt path

Doc 08 commits that operation stops on cancellation. A worker that sends one more
customer email after cancellation is a serious incident.

### 3.4 No action log visible to the customer

Doc 13 requires every action in a customer's account to be attributable to a specific
worker or operator, with a timestamp, visible to the customer.

### 3.5 The approval boundary is contradicted on the page

`src/app/build-and-run/page.tsx:93` says customer-facing actions wait for approval.
`WorkerDay` renders four unapproved customer contacts twenty lines below.

Product decision required before either statement can stand.

### 3.6 Budget caps must actually stop spending

Four separate statements commit that workers stop at a cap the customer sets.

---

## Tier 4, credentials and access

None of the following can be asserted in a published policy until implemented and
verified.

- Delegated access per provider rather than collected passwords
- Least privilege enforced technically per worker
- Credentials encrypted at rest with a managed key service
- Credentials never written to logs, error reports or analytics
- Credentials never placed in a model prompt
- Access to the credential store logged
- Rotation supported, with a documented procedure
- Immediate revocation, tested rather than assumed
- Written incident procedure with a notification deadline
- Removal of Business Builder access at handoff, evidenced

Blocks: doc 02, doc 13.

---

## Tier 5, data handling

### 5.1 Retention periods are not achievable

Every period in doc 16 requires the ability to find and delete data on a schedule
across every store.

### 5.2 Deletion capability unverified

A deletion request cannot be honoured unless data can be located everywhere it
reaches, backups included.

### 5.3 No legal hold mechanism

No written procedure, no named owner, no technical means of suspending automated
deletion. Automated deletion running through a preservation obligation is a
spoliation problem.

### 5.4 Uploaded evidence is not classified or restricted

Doc 02 and doc 16 commit to restricted access, purpose limitation, removal after
verification, and exclusion from logs.

### 5.5 No subprocessor list

Blocks the Privacy Policy.

### 5.6 Model provider training position unverified

The Privacy Policy will state whether customer data trains third-party models. This
must be checked against actual contract terms, not marketing pages.

### 5.7 No customer data in development environments

Commonly violated, and damaging when it is.

---

## Tier 6, export and handoff

### 6.1 No self-service export

Doc 12 must not promise export "any time" in a way implying a button until one
exists.

### 6.2 The exported website must run standalone

Doc 03 promises the customer or a third party can host and maintain the site
independently of Business Builder. Testable, and must be tested before the first
sale.

### 6.3 No third-party licence inventory

Doc 03 and doc 11 promise licence identification at handoff.

### 6.4 The ownership record and remaining-obligations statement do not exist

Both are described in site copy as artifacts the customer receives.

### 6.5 Activation configuration must survive cancellation

Doc 05 and doc 09 justify the non-refundable activation fee on the grounds that it
bought durable setup the customer keeps. If the configuration exists only inside the
platform and is lost at cancellation, the justification fails.

---

## Tier 7, Build & Run operations

### 7.1 No fair use policy published

`src/content/founding.ts:170` commits to publishing one "before it could ever
matter". Doc 15 requires it before the first customer is billed.

### 7.2 No operating volume measurement

Without measurement there is no way to identify an outlier and the fair use policy
is decorative.

### 7.3 Ready and Fully Set must be mechanically evidenced

The product asserts these states and the customer relies on them to accept delivery.

### 7.4 Quote drafting must support a configured tax rule

Residential cleaning is taxable in Texas. A quote that silently omits tax creates a
liability for the customer. See doc 19 and doc 07.

### 7.5 No review queue for the pilot

Doc 07 commits that a person reviews every outbound communication during the pilot,
with a record of who reviewed what and when.

### 7.6 No wind-down handling for open threads

Doc 07 requires that a pilot ending does not leave end customers waiting for a reply.

---

## Tier 8, billing

### 8.1 No self-service cancellation

Doc 08 commits that cancellation requires no notice and no conversation.

### 8.2 Billing must stop at the end of the paid period

### 8.3 No record of what was disclosed at sign-up

Auto-renewal disclosure requires a record of what the customer was shown and when
they agreed.

### 8.4 Sales tax collection is not configured

Doc 19. A permit is required before the first taxable sale, and the checkout must
calculate, disclose and collect.

---

## Summary count

| Tier | Items | Blocks |
|---|---|---|
| 1, false statements on the site | 3 | Everything |
| 2, contract mechanics | 4 | All terms |
| 3, operating limits | 6 | Doc 05, 14, 17 |
| 4, credentials | 10 | Doc 02, 13 |
| 5, data handling | 7 | Doc 02, 16 |
| 6, export and handoff | 5 | Doc 03, 11, 12 |
| 7, Build & Run | 6 | Doc 05, 07, 15 |
| 8, billing | 4 | Doc 08, 09 |

Tiers 1 and 2 block the first paid customer outright. Tier 3 blocks Build & Run
specifically. Tiers 4 and 5 block the Privacy Policy, which blocks everything else,
because the Terms reference it.
