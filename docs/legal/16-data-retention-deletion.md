# 16. Data retention, deletion, evidence handling and sensitive documents

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The governing constraint

A retention policy is only publishable if the systems can execute it. A published
promise to delete data in 30 days, made by a company that cannot actually find and
delete that data in 30 days, is a misrepresentation that compounds daily.

Every period below is therefore a recommendation paired with a `[BUILD]`
requirement. **The policy cannot be published before the capability exists.** This
is the single most important sentence in this document.

## What the product actually holds

Taken from the product direction rather than from a template, because a generic data
inventory is useless.

| Category | Contains | Sensitivity |
|---|---|---|
| Founder intake | Business description, name, email | Low, but identifies a person |
| Company Brain | Services, price book, service area, tone, rules | Commercially sensitive |
| Uploaded evidence | Screenshots, confirmations, documents uploaded to complete a Founder Action | **High, varies wildly** |
| Business documents | Filings, certificates, policies, insurance | Moderate to high |
| Provider references | Account identifiers, connection metadata | High |
| Credentials and tokens | Access to customer systems | **Highest** |
| Operator review records | What a person reviewed, when, what they decided | Moderate |
| Audit history | Existing Business Audit findings | Commercially sensitive |
| Customer communications | Correspondence sent or received on the customer's behalf | High |
| End-customer data | The customer's own customers: names, addresses, bookings | **High, and not the customer's to waive** |
| Evidence log | Checks, results, timestamps | Low |
| Founder Action record | What was completed, when | Moderate |

Two rows deserve separate treatment and get it below: uploaded evidence, and
end-customer data.

## Recommended retention periods

`[COUNSEL]` Every period is a proposal. Each must be checked against limitation
periods for contract claims, tax record-keeping requirements, and any
industry-specific obligation the customer is subject to.

| Category | Active | After termination | Rationale |
|---|---|---|---|
| Intake that never converts | 12 months | n/a | Follow-up, then gone |
| Company Brain | Life of service | 90 days `[COUNSEL]` | Retrieval window |
| Uploaded evidence | Until the action is verified, then per class below | See below | Varies by content |
| Business documents | Life of service | 90 days `[COUNSEL]` | Customer may need them |
| Credentials and tokens | Life of service | **Immediate destruction** | No retention justification exists |
| Operator review records | Life of service | 24 months `[COUNSEL]` | Defence of a later claim |
| Communications | Life of service | 24 months `[COUNSEL]` | Defence of a later claim |
| End-customer data | Life of service | **Return or delete promptly** | Not Business Builder's to keep |
| Evidence log | Life of service | 24 months `[COUNSEL]` | Evidences what was delivered |
| Billing records | Life of service | 7 years `[COUNSEL]` | Tax and accounting |
| Backups | Rolling | Per backup cycle | Must be disclosed |

Two entries are firm rather than proposed. **Credentials are destroyed immediately
on termination.** There is no business justification for holding access to a former
customer's systems, and holding it is pure downside. **End-customer data is returned
or deleted promptly**, because the customer's own customers never contracted with
Business Builder and their data is held only to perform the service.

`[COUNSEL]` The gap between the 90-day retrieval window and the 24-month defence
retention needs resolving. Telling a customer their data is deleted after 90 days
while retaining communications for 24 months is contradictory unless the categories
are clearly separated in the policy. Recommendation: state both plainly, with the
reason for each.

## Backups, the clause everyone gets wrong

Deletion from a live system is not deletion from backups. A policy that promises
deletion without addressing backups is inaccurate.

Recommended language:

> When we delete your data, we remove it from our active systems immediately. Copies
> may remain in encrypted backups until those backups expire on their normal cycle,
> which is [period]. Backups are not used to restore deleted data, and data in a
> backup is not accessible for any other purpose.

`[COUNSEL]` Set the backup cycle and confirm the statement is accurate.
`[BUILD]` The commitment that backups are not used to restore deleted data requires
a procedure that ensures it, not an intention.

## Deletion on request

Research indicates the Texas statute **almost certainly does not apply**, because of
the federal small-business size standards and the absence of any consumer-count
threshold. See [25-texas-consumer-privacy-upl.md](25-texas-consumer-privacy-upl.md),
section 5. One obligation survives regardless: **no sale of sensitive personal data
without prior consent**, at $7,500 per violation.

Regardless of statutory applicability, a customer who asks for their data to be
deleted should be able to have it deleted. The recommended position is to honour
requests as a matter of policy rather than only where legally compelled, with these
stated exceptions.

**Exceptions to deletion**, which must be disclosed rather than applied silently:

- Billing and tax records required to be kept
- Data subject to a legal hold
- Data necessary to defend a live or threatened claim `[COUNSEL]` narrow this, it is
  the exception most capable of swallowing the rule
- De-identified and aggregated data, which is no longer personal data
- Backups, until they expire

`[BUILD]` A deletion request cannot be honoured unless the data can be located
across every store it reaches. Deletion capability must be verified before the
policy is published.

## Legal hold

When litigation is reasonably anticipated, the duty to preserve overrides the
retention schedule and overrides a customer's deletion request.

Required, and none of it currently exists:

- A written legal hold procedure
- A named person who can issue a hold
- A technical means of suspending automated deletion for specific data `[BUILD]`
- A record of holds issued and released

`[COUNSEL]` Confirm the trigger and who decides. Automated deletion continuing to
run through a preservation obligation is a spoliation problem, and it is the kind
that is discovered at the worst moment.

## Uploaded evidence, specifically

The hardest category, because the product asks customers to upload confirmations to
complete Founder Actions, and Business Builder does not control what arrives.

A customer asked to upload an EIN confirmation may upload a document containing a
Social Security number. A customer asked to confirm a bank connection may upload a
statement. The product cannot assume the upload contains only what was requested.

Required handling:

1. **Ask narrowly.** Request the specific field or the specific confirmation, not
   "the document". The narrower the ask, the less arrives.
2. **Classify on receipt.** Treat every upload as potentially containing sensitive
   personal data until determined otherwise. `[BUILD]`
3. **Restrict access** to the people and systems that need it, with access logged.
   `[BUILD]`
4. **Never place an upload in a model prompt** without a determination that it is
   safe to do so. `[BUILD]` and `[COUNSEL]`
5. **Redact or discard** once the action is verified, retaining the verification
   result rather than the underlying document where possible.
6. **Shorter retention** than the general schedule.
7. **Never in general logs, analytics, or error reports.** `[BUILD]`

Point 5 is the important one and it is a product design principle as much as a
policy: **the evidence log should record that a thing was verified, not store the
document that proved it.** A system that retains the proof indefinitely accumulates
a liability that grows with every customer and produces no operational benefit.

`[COUNSEL]` Confirm which verification results can stand alone without the
underlying document, and whether any must be retained for a period by law.

## Sensitive document requirements

Categories that need handling above the baseline, and where possible should never be
collected at all.

| Category | Position |
|---|---|
| Government identity documents | Do not collect. Direct the customer to the provider's own verification |
| Social Security or taxpayer numbers | Do not collect. If unavoidable, `[COUNSEL]` before any collection |
| Bank account and routing numbers | Do not collect. The processor holds these |
| Payment card data | Never. Out of scope entirely |
| Insurance documents | Collect only the policy reference and dates, not the full policy |
| Signed contracts | Collect, restrict access, retain per schedule |
| End-customer home addresses | Restrict, exclude from general logs, treat as sensitive |

The last row is the one specific to the residential-cleaning pilot and it is not
theoretical. A home address combined with a scheduled absence is materially more
sensitive than either alone, and the pilot generates exactly that combination.
`[BUILD]` and see [07-pilot-service-agreement.md](07-pilot-service-agreement.md).

`[COUNSEL]` Determine whether any category collected constitutes "sensitive data"
under the Texas statute, which carries a consent requirement and, for some
categories, a specific notice obligation. Biometric and precise geolocation data are
in scope there and should be avoided entirely.

## Access control and logging

Minimum requirements before any policy describing them can be published.

- Least privilege by role, reviewed rather than assumed
- No shared accounts among operators
- Access to customer data logged, with the log retained and reviewable
- Operator review actions attributable to a named individual
- Production access separated from development access
- No customer data in development or test environments `[BUILD]`

The last item is the one most commonly violated and the most damaging when it is.

`[COUNSEL]` Determine whether the logging retention conflicts with the deletion
promise. Access logs that record which customer record was viewed contain personal
data themselves.

## Operator review disclosure

Customers must be told that people see their data. Burying it is a mistake, because
the discovery is worse than the disclosure.

Recommended language:

> **People see some of this.** Business Builder staff review work before it goes out,
> investigate problems, and handle anything a worker escalates. That means a person
> here may read your business information and your customer communications.
>
> Access is limited to people who need it, every access is logged, and everyone here
> is under a confidentiality obligation. We do not read your data for any purpose
> other than operating and supporting your service.

`[BUILD]` Every sentence in that block is a technical or organisational commitment:
access limits, logging, confidentiality obligations in employment and contractor
agreements, and purpose limitation.

`[COUNSEL]` Confirm the confidentiality obligation exists in writing for every
person and contractor with access. This is frequently assumed and rarely documented
at this stage.

## Subprocessors

Business Builder uses third parties that process customer data: model providers,
hosting, email, and any tool in the operational stack.

Required:

- A maintained list of subprocessors and what each processes
- A written agreement with each, containing the terms the statute requires
- Disclosure to customers, and `[COUNSEL]` decide whether notice of changes is given
- Confirmation of whether customer data is excluded from model training

**The required processor contract terms are specific.** Six items: clear processing
instructions, the nature and purpose, the type of data, the duration, the rights and
obligations of both parties, and a requirement that the processor ensure
confidentiality duties, delete or return data at the controller's direction, make
compliance information available, allow reasonable assessments, and **engage any
subcontractor under a written contract imposing the same requirements**.

That last item is a flow-down obligation, not merely a list, and it reaches every model
provider and tool in the operational stack. See
[25-texas-consumer-privacy-upl.md](25-texas-consumer-privacy-upl.md), section 5.

`[COUNSEL]` The last item must be verified against actual contract terms with each
model provider, not assumed from marketing pages. The answer differs by tier and the
privacy policy will state a position on it.

`[BUILD]` The subprocessor list does not exist and must before the privacy policy
can be accurate.
