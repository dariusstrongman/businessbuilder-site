# 12. Data ownership, export and handoff

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## The rule

The customer owns their data. Business Builder holds it to perform the service. The
customer can get it back, in a usable form, at any time, without asking permission
and without paying extra.

Everything below is the mechanics of making that sentence true.

## What "usable form" has to mean

The most common way an export obligation fails is technical compliance without
practical use: a provider returns a dump nobody can read and calls the obligation
discharged. The contract should define the standard, not just the act.

Recommended definition: an export is delivered in a **structured, machine-readable,
commonly used format**, organised so that a competent third party could load it into
a comparable system without reverse-engineering it, accompanied by a plain
description of what each file contains.

`[COUNSEL]` Decide whether to commit to specific formats in the contract. Naming
CSV and JSON is concrete and testable but constrains future change. A standard
rather than a format list is more durable and less enforceable. Recommendation:
state the standard in the contract and publish the current format list separately.

## Export inventory

What is included, by category. This list is contractual once published, so it must
be complete and every line must be deliverable.

### Always included

| Category | Contents | Format |
|---|---|---|
| Customer records | Contacts, leads, jobs, bookings, history | Structured data |
| Financial records | Invoices, quotes, payment records held by Business Builder | Structured data |
| Communications | Correspondence sent or received on the customer's behalf | Structured data plus attachments |
| Business documents | Filings, certificates, policies, terms, templates | Original files |
| Brand assets | Logo files, colour and type specification, voice guide | Source and export formats |
| Website | The deliverable as defined in the website terms | Source files |
| Company Brain source facts | Services, price book, service area, tone, rules | Readable structured data |
| Evidence log | Every check, its result, its timestamp | Structured data |
| Founder Action record | What was completed, when, what it unlocked | Structured data |
| Audit record | Where an Existing Business Audit was performed: each area and its Keep, Improve, Replace or Missing verdict | Structured data |
| Account inventory | Every account, its provider, and who holds it | Document |

### Not included, and why

| Excluded | Reason |
|---|---|
| Platform source code | Bucket 2. Never conveyed |
| Orchestration and runtime | Bucket 2 |
| Reusable agents and generic automation | Bucket 2 |
| Internal prompts and scaffolding | Bucket 2. The encoded business rules ARE exported, in readable form |
| Derived representations (embeddings, learned routing) | `[COUNSEL]`, see IP model |
| Verification check definitions | Bucket 2. The results are exported, the check logic is not |
| Third-party product itself | Not Business Builder's to give. The account transfers instead |

The distinction on the third row down is the one to get right and to explain in
plain words: **the customer gets the rules, not the machine that ran them.** A
customer receives their price rules, their service area, their tone guidance and
their approval thresholds in a form a human can read and another system could use.
They do not receive the prompt architecture those rules were loaded into.

## Timing

| Trigger | Commitment |
|---|---|
| On request, at any time during service | `[COUNSEL]` set a business-day window |
| At handoff (Take the keys) | Part of handoff, no separate request needed |
| On cancellation of Build & Run | `[COUNSEL]` set a window from the effective date |
| After the retention period expires | Not available. See retention policy |

`[COUNSEL]` Set all three windows. They are commitments and must be achievable on
the worst day, not the best one. A window that is missed once becomes evidence.

`[BUILD]` A self-service export does not exist. Until it does, the honest published
sentence is that export is provided on request within the stated window, and the
request path must be stated. Do not publish "export any time" language that implies
a button.

## The handoff moment

Handoff is a defined product moment, not a process. It is the point at which
Business Builder hands over and steps back. The contract should tie the obligation
to that moment.

At handoff the customer receives:

- The full export inventory above
- Transfer of accounts per
  [13-credentials-and-accounts.md](13-credentials-and-accounts.md)
- A written ownership record listing what was transferred and what it is
- A written statement of remaining obligations the customer must now keep:
  renewals, filings, and dates
- Third-party licence identification for anything embedded in a deliverable
  `[BUILD]`

`[BUILD]` The ownership record and the remaining-obligations statement are
described in site copy as things the customer receives. Both must exist as actual
generated artifacts before that copy is accurate.

## Ready and Fully Set

The site uses two defined states. Because the contract and the site both reference
them, their definitions become contractual and must be stable.

`[COUNSEL]` Decide whether to define these terms inside the contract or to
incorporate the published definition by reference. Incorporating by reference means
a product change silently changes the contract, which is usually undesirable.
Recommendation: define both in the service schedule, and require notice before the
definition changes.

`[BUILD]` Whatever definition is used must be mechanically checkable, because the
product asserts these states and the customer will rely on them to decide whether
to accept delivery. A state the product asserts but cannot evidence is a warranty
without proof behind it.

## Retention after the relationship ends

Covered in full in
[16-data-retention-deletion.md](16-data-retention-deletion.md). The short version
for the contract:

- Data is retained for a defined window after termination so the customer can still
  retrieve it
- After that window it is deleted on the stated schedule
- Deletion is subject to backup cycles and legal hold
- The customer can request earlier deletion, subject to the same exceptions

`[COUNSEL]` Set the post-termination retention window. Too short and a customer
who comes back in three months has lost everything. Too long and the deletion
promise in the privacy policy is not true.

## What the contract should not promise

- Do not promise the export contains "everything". It does not, by design.
- Do not promise a format that the product does not currently produce.
- Do not promise instant export if a human has to assemble it.
- Do not promise to migrate the data into a named competitor's system. Delivering a
  usable export is the obligation. Performing a migration is a service.
- Do not promise that a third-party account will transfer, where the provider's own
  terms may prohibit transfer. Say the transfer will be attempted and what happens
  if the provider refuses.
