# 2. Privacy Policy, recommended structure and draft

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The governing constraint, again

A privacy policy is a set of factual statements about what a company does. Unlike
most contract language, it cannot be aspirational. Every sentence describing a
practice must describe the practice as it actually is on the day of publication.

This is the document where `[BUILD]` markers matter most, and where the temptation
to publish a template is strongest and most dangerous.

## Two roles, kept separate

The most common structural error in this kind of business is writing one policy for
two different relationships.

**Business Builder as controller.** For its own customers. The founder's name, email,
business description, billing details. Business Builder decides why and how this is
processed.

**Business Builder as processor.** For the customer's own customers. The cleaning
company's clients, their addresses, their bookings. Business Builder processes this
only on the customer's instructions, and it is not Business Builder's to use.

`[COUNSEL]` Confirm the characterisation and whether a separate data processing
agreement is required alongside the main terms. The distinction affects the notice
obligations, the rights individuals can exercise against whom, and what a contract
with a subprocessor must contain.

The practical consequence is that the public privacy policy addresses the first role.
The second is handled in the contract, and an end customer's request is routed to the
business that holds the relationship with them.

## Texas Data Privacy and Security Act

Research has answered this. Findings and citations are in
[25-texas-consumer-privacy-upl.md](25-texas-consumer-privacy-upl.md), section 5.

**The statute almost certainly does not apply.** Applicability requires all three of
conducting business in Texas, processing or selling personal data, and **not being a
small business** under the federal size standards. There is **no consumer-count
threshold**, unlike several other state statutes. The relevant size standards run from
$19 million to $34 million in averaged receipts depending on industry classification,
with affiliate receipts added.

**One obligation survives the exemption.** A small business may not sell personal data
that is **sensitive data** without prior consent, and a violation carries the full
**$7,500 per violation** penalty. Sensitive data includes health, genetic and biometric
data processed to identify a person, data from a known child, and **precise
geolocation**. "Sale" reaches transfers for "monetary or other valuable consideration",
so barter counts.

**The cure period does not sunset.** Texas differs from Connecticut and Colorado here.
The enforcement subchapter contains no expiration clause, and the enacting bill used an
express sunset elsewhere, which shows the drafters used explicit language when they
meant it. Enforcement is Attorney General exclusive and there is **no private right of
action**.

`[COUNSEL]` The strategic question is unchanged by the exemption. **Being exempt is not
a reason to behave as if the obligations do not exist.** A customer entrusting their
whole business to a provider will not be reassured by a size exemption, and the
exemption disappears as the company grows. Build to the standard and treat the exemption
as a defence rather than a design principle.

Requirements to design to, if the standard is adopted voluntarily or when the exemption
lapses: a notice stating the categories processed including sensitive data, the purpose,
**how a consumer appeals a decision**, categories shared and with whom, and the
submission methods; **two or more secure and reliable methods** for submitting requests,
though an exclusively online controller with a direct relationship may offer only an
email address; a response within **45 days**, extendable once by 45; an appeal process
with a written response within **60 days** and a link to the Attorney General complaint
mechanism on denial. Any contract term waiving these rights is void.

## What the policy must cover

### 1. Who we are

Legal entity name, registered address, contact method. `[BUILD]` None of this is
currently published anywhere on the site.

### 2. What we collect

Honest and specific. The generic list is useless and invites the reader to assume
the worst.

| From | What | Why |
|---|---|---|
| Intake form | Name, email, business description, starting point, package | To respond and prepare a recommendation |
| During a build | Business details, brand preferences, service and pricing information | To perform the service |
| Founder Actions | Uploaded confirmations and documents | To verify a step was completed |
| Account connections | Access tokens and account identifiers | To operate connected systems |
| Operation | Communications sent and received on the customer's behalf | To perform the service |
| Billing | Payment details, held by the processor | To take payment |
| The website | Currently nothing | n/a |

The last row is presently true and unusual. No analytics, no cookies, no third-party
scripts exist on the site. `[BUILD]` The policy must be updated the day that changes,
and adding analytics without updating it is the most likely way this policy becomes
false.

### 3. The uploaded-evidence disclosure

Specific to this product and it needs its own paragraph rather than being buried in
a list. The product asks customers to upload confirmations, and Business Builder does
not control what arrives. A customer asked for an EIN confirmation may upload a
document containing a Social Security number.

Draft:

> **Documents you upload.** Some steps ask you to upload a confirmation so we can
> record that the step is done. We ask for the narrowest thing that proves it. If
> you send us a document containing more than we asked for, we will not use the
> extra information, we restrict who can see it, and we remove it once the step is
> verified where we can. Please do not send us identity documents, full bank
> statements, or tax identification numbers unless we have specifically asked.

`[BUILD]` Every sentence is a commitment. Restricted access, removal after
verification, and purpose limitation all require implementation. See
[16-data-retention-deletion.md](16-data-retention-deletion.md).

### 4. The operator-review disclosure

People see customer data. Say so. Draft language is in doc 16 and should be lifted
into the policy rather than paraphrased.

### 5. The AI disclosure

What goes to a model provider, and what happens to it there.

`[COUNSEL]` The policy must state whether customer data is used to train third-party
models. **This must be verified against the actual contract terms with each model
provider, not assumed from a marketing page.** The answer differs by tier. Getting
this wrong is a high-visibility error.

Draft, subject to that verification:

> **AI providers.** We use third-party AI services to perform some of the work. Your
> business information is sent to those providers so they can do it. We use
> commercial arrangements under which your data is not used to train their models.
> We do not sell your data and we do not use it to train models of our own on
> anything that identifies you or your customers.

`[BUILD]` The subprocessor list does not exist and the policy should name the
categories at minimum.

### 6. Who we share with

Categories, not a vague gesture. Providers the customer already holds accounts with,
model providers, hosting, payment processing, and anyone required by law.

`[COUNSEL]` Decide whether to publish a named subprocessor list with change notice.
More transparent, and more maintenance. For a business selling trust, the named list
is probably worth it.

### 7. What we do not do

Short and load-bearing, and the section customers actually read.

> We do not sell your personal data. We do not sell your customers' data. We do not
> share your data with advertisers. We do not use your customer lists for our own
> marketing.

`[COUNSEL]` Confirm each statement is true and will remain so, and check the
statutory definition of "sale", which in several state privacy statutes is broader
than an exchange for money and can capture disclosures for other valuable
consideration.

### 8. Retention

By reference to doc 16. Periods must be stated, and must be achievable.

### 9. Rights

Access, correction, deletion, portability, and appeal.

`[COUNSEL]` Confirm which apply and the statutory deadlines. `[BUILD]` A rights
request cannot be honoured unless data can be located across every store. The
mechanism must exist before the rights are published.

### 10. Security

The section most often overwritten. Describe what is actually done.

`[BUILD]` Every security statement is a `[BUILD]` item until verified. Encryption at
rest, encryption in transit, access controls, logging, credential handling. See
[13-credentials-and-accounts.md](13-credentials-and-accounts.md).

Do not write "bank-level security", "military-grade encryption", or "we take your
privacy seriously". The first two are meaningless and the third is filler that
signals a template.

### 11. Children

Not directed to children, no knowing collection from them. Standard.

### 12. Changes

How changes are notified and when they take effect.

### 13. Contact

`[BUILD]` No contact method is currently published.

## The intake problem, again

`src/app/start/actions.ts` validates and acknowledges an intake without persisting
anything, while the success screen tells the submitter their build is open and they
will be contacted.

This is primarily a deceptive-practices issue, covered in
[20-website-copy-audit.md](20-website-copy-audit.md). It is also a privacy issue in
the opposite direction from the usual one: the policy will describe collecting and
using data the system does not currently retain.

Whichever way this is resolved, the policy must describe the behaviour that actually
exists on the day it is published.

## The login page

`src/app/login/page.tsx` collects an email and a password and posts to a route with
no handler. Collecting a credential with no policy, no disclosure and no destination
should be resolved before a privacy policy is written, not documented in one.

## Publication checklist

Before publishing, every one of these must be true, not planned.

- [ ] Legal entity name and address published
- [ ] Contact method published and monitored
- [ ] Subprocessor list compiled
- [ ] Model provider training position verified against actual contract terms
- [ ] Retention periods achievable and tested
- [ ] Deletion capability verified across every store
- [ ] Security statements verified
- [ ] Access logging in place
- [ ] Confidentiality obligations documented for everyone with access
- [ ] Rights request process defined with an owner
- [ ] Breach response procedure written, with the statutory deadline confirmed
- [ ] Intake behaviour matches what the policy describes
- [ ] Login page resolved
- [ ] Counsel has reviewed every `[COUNSEL]` item

A privacy policy published before these are closed is a list of statements the
company cannot stand behind, and it is discoverable.
