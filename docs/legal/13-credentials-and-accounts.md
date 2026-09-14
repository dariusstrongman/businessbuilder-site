# 13. Customer credentials and account ownership

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> `[COUNSEL]` marks a decision a lawyer must make. `[BUILD]` marks a sentence that
> is not yet true in the product.

## Why this is its own document

This is the highest-risk operational area in the business and the one most likely to
produce an incident that is simultaneously a security event, a contract breach and a
provider terms violation.

Business Builder holds access to a customer's email, CRM, payment processor, phone
number, hosting and listing profiles. Access of that breadth is normally held by an
employee under an employment relationship, not by a vendor under a services
contract. The contract has to do work that an employment relationship would
otherwise do.

## The ownership rule

**Every account is registered in the customer's name, to the customer's identity,
under the customer's ultimate control.** Business Builder is granted access to
accounts the customer owns. Business Builder does not own accounts on the
customer's behalf.

This rule has one commercially important consequence that must be disclosed: it
means Business Builder cannot shield the customer from a provider's decision.
If a payment processor closes the customer's account, it is the customer's account
that closed.

`[COUNSEL]` Confirm there is no category where Business Builder should hold the
account in its own name. Candidates that sometimes get held by the vendor in this
industry are hosting, and API access to model providers. Holding hosting in Business
Builder's name creates a lock-in that contradicts the whole exit story and is not
recommended. Holding model-provider access in Business Builder's name is correct and
is platform, not a customer account.

## Access model

Four requirements, each of which is also a `[BUILD]` item.

**Delegated access over shared credentials.** Where a provider supports delegated
access, granular roles, or OAuth-scoped authorisation, use it. Do not collect a
customer's password when a delegation mechanism exists. Sharing a password is
frequently a breach of the provider's own terms, defeats the customer's multi-factor
authentication, and makes it impossible to attribute an action.
`[BUILD]` This requires implementing per-provider delegated access rather than
credential collection.

**Least privilege.** Each worker receives the narrowest scope that lets it do its
defined job. A worker that drafts quotes does not need the ability to issue refunds.
`[BUILD]` Requires per-worker scoping, which the product describes but which must be
enforced technically rather than by prompt instruction. An instruction not to do
something is not an access control.

**Attribution.** Every action taken in a customer's account must be attributable to
a specific worker or operator, with a timestamp, and that record must be available
to the customer.
`[BUILD]` Requires an action log the customer can actually see.

**Revocability.** The customer can revoke any access, at any time, without
contacting Business Builder, and revocation takes effect immediately.
`[BUILD]` Requires the delegated-access model above. A shared password cannot be
revoked without a password change that breaks everything else.

## Credential handling requirements

There is an authority to align to, and alignment is both defensible and marketable.
**CISA advisory AA22-131A**, issued jointly with NSA, FBI and international partners,
addresses exactly this relationship: a service provider holding access to many customers'
environments. It states that customers should **contractually mandate** multi-factor
authentication on provider accounts, should ensure contracts **prohibit reuse of
administrative credentials across customers**, and should require **contractual
provisions disabling obsolete accounts at termination**. It also calls for logging
visibility into provider presence, retention of important logs for at least six months,
and express allocation of who owns hardening, detection and incident response.

Each requirement below maps to that advisory. Each is a `[BUILD]` item until verified,
and none can be described in a published policy before it is true.

- Credentials and tokens encrypted at rest with a managed key service, not
  application-level constants
- Encrypted in transit, no exceptions
- Never written to application logs, error reports, analytics, or crash traces
- Never pasted into a model prompt or included in model context
- Access to the credential store limited to the systems that need it, with access
  itself logged
- Rotation supported and a documented rotation procedure
- Immediate revocation path that is tested, not assumed
- A written incident procedure for suspected credential compromise, including
  customer notification timing

`[COUNSEL]` The incident notification timing interacts with breach notification law.
Texas has a breach notification statute with a specific deadline, and the deadline
in the contract should not be longer than the deadline in the statute. Confirm the
current Texas requirement and any obligation to notify the Attorney General at a
threshold number of affected residents.

`[BUILD]` None of the above can be asserted in a published policy until it is
implemented and verified. Writing "we encrypt credentials at rest" before it is true
is a misrepresentation, and it is the kind that surfaces precisely when it is most
damaging.

## Provider terms flow-down

Business Builder operating a customer's account is subject to the provider's terms,
not only to the Business Builder contract. Several providers restrict automated
access, prohibit credential sharing, or require the account holder to be the
operator.

Required contract positions:

1. The customer acknowledges that provider terms govern their accounts
2. The customer authorises Business Builder to act on their behalf within the
   defined scope, and confirms they have the authority to grant that
3. Business Builder will not take an action that would breach a provider's terms,
   and will escalate rather than proceed if instructed to
4. Business Builder is not liable for a provider's action against the customer's
   account, except where caused by Business Builder's own breach `[COUNSEL]`

`[BUILD]` Requirement 3 needs a real mechanism. A worker must have a defined "must
ask" boundary that includes anything that would breach a provider's terms, and that
boundary must be enforced.

`[COUNSEL]` Item 2 is an agency authorisation. Confirm whether a separate written
authorisation is needed for specific providers, particularly the payment processor
and anything touching financial accounts. Some providers require a specific form.

## Authority and identity

A recurring practical problem: the person signing up may not be the person with
authority over the accounts, or may not be the entity's authorised representative.

Required positions:

- The individual accepting the terms warrants they are authorised to bind the
  business and to grant access to its accounts
- Where a Founder Action requires personal identity, signature, or regulated
  acceptance, only the founder can perform it, and Business Builder will not
  perform it on their behalf under any circumstances
- Business Builder will not accept an instruction to impersonate the customer to a
  provider or an authority

The second point is a product principle already and must be stated in the contract
in the same absolute terms. There is no convenience case that justifies relaxing it.
The categories are: personal signature, identity verification, regulated acceptance,
and any action a provider or authority requires the principal to perform
personally.

`[COUNSEL]` Confirm the list of actions that must never be delegated, and whether
any of them carry a specific statutory prohibition rather than merely a provider
requirement. Bank account opening and identity verification are the likely
candidates.

## At handoff

- Business Builder access is removed from every account, not merely disabled
- The customer confirms they hold working access to each account, in writing
- The account inventory is delivered, listing every account, its provider, its
  purpose and who holds it
- Any credential held by Business Builder is destroyed on the retention schedule
- Removal is evidenced, not asserted `[BUILD]`

The order matters. Confirm the customer has access **before** removing Business
Builder's. A customer locked out of their own payment processor at handoff is a
catastrophic outcome and an entirely foreseeable one.

## Deliberately excluded

Business Builder should not:

- Hold a customer's banking credentials
- Move money on the customer's behalf beyond the defined payment-processor
  configuration `[COUNSEL]` confirm the boundary
- Hold or process a customer's government identity documents beyond what a specific
  Founder Action requires, and then only per
  the sensitive-document rules in [16-data-retention-deletion.md](16-data-retention-deletion.md)
- Act as the customer's registered agent
- Receive legal service of process on the customer's behalf
