# 11. Intellectual property and ownership model

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> Prepared for review by a licensed Texas attorney. `[COUNSEL]` marks a decision a
> lawyer must make. `[BUILD]` marks a sentence that is not yet true in the product.

## Why this document is first

Every other document in the package depends on this boundary. The refund policy
depends on knowing what the customer has already received. The cancellation policy
depends on knowing what survives cancellation. The export obligation depends on
knowing what is exportable. If the boundary is wrong, all of it is wrong.

The commercial promise is unusual and worth stating plainly, because it is the
thing that makes the boundary hard: Business Builder sells a company that the
customer owns outright, assembled using a platform that Business Builder keeps
entirely. Both halves have to be true at once, and a customer must be able to walk
away with the first half without acquiring any part of the second.

## The three-bucket model

Most agency contracts use two buckets, client deliverables and agency background
IP. Two is not enough here, because a large amount of what the customer receives is
neither bespoke nor proprietary. It is a configuration of somebody else's product.

### Bucket 1, customer property

Things the customer owns outright, that Business Builder never had a claim to, or
assigns in full.

- The legal entity itself and everything filed in its name
- The business name and the brand created specifically for this customer under the
  engagement: wordmark, logo files, colour system, type selection, voice guide
- The domain, registered in the customer's name
- Business-specific written content: page copy, service descriptions, price book,
  quote terms, policies, templates written for this business
- Customer data in every form: contacts, leads, bookings, job history, invoices,
  payment records, correspondence
- Business documents: filings, certificates, insurance documents, tax documents
- The exported website deliverable as defined in
  [03-service-terms-website.md](03-service-terms-website.md)
- Accounts expressly transferred at handoff, per
  [13-credentials-and-accounts.md](13-credentials-and-accounts.md)
- The evidence log and Founder Action record for this customer's build

`[COUNSEL]` The brand assignment needs a decision on form. A present assignment
effective on final payment is the market standard for agencies and is the
recommendation. A licence-until-paid, assignment-on-payment structure is the
alternative. Note that a work-made-for-hire recital alone is insufficient for most
of these categories under U.S. copyright law outside the nine statutory categories,
so an express assignment is needed regardless.

`[COUNSEL]` Decide whether the assignment is conditioned on payment in full, and
whether it survives a chargeback. Agencies commonly make delivery of source files
contingent on cleared payment for exactly this reason.

### Bucket 2, Business Builder property

Things the customer never receives, may not copy, and does not acquire by paying,
by cancelling, or by requesting an export.

- The Business Builder platform in its entirety
- Sol
- The Company Brain platform implementation, as distinct from the customer's own
  business data held inside it
- Orchestration systems and the runtime
- Reusable agents and generic automation
- The website generation engine and its reusable components
- Internal prompts, prompt libraries, and system instructions
- Scoring and judging systems
- The verification platform and its check definitions
- Proprietary workflows, reusable templates and frameworks
- Internal infrastructure and tooling
- Aggregate and de-identified operational learning derived across customers

The last item is the one that most often gets missed and most often causes a later
dispute. State it expressly.

`[COUNSEL]` The aggregate-learning clause needs careful drafting against the
privacy policy. It must be limited to de-identified and aggregated data, must not
permit reconstruction of an identifiable customer or their end customers, and must
not conflict with the processor obligations in
[02-privacy-policy.md](02-privacy-policy.md). Consider whether to make it opt-out.

### Bucket 3, third-party property configured for the customer

The category that two-bucket contracts get wrong. Neither party owns it. The
customer holds a licence or an account directly with a provider, and Business
Builder configured it.

Examples: the CRM, the scheduling tool, the payment processor, the email provider,
the phone number, the hosting, the listing profiles, fonts, stock imagery, and any
plugin or library shipped inside the website.

Three consequences that must appear in the contract.

1. What the customer receives is the account and the configuration, not the
   underlying product. Business Builder cannot grant rights it does not hold.
2. The provider's own terms govern and can change without Business Builder's
   involvement or consent. Business Builder is not responsible for a provider's
   pricing change, feature removal, outage, or account action.
3. Any font, image, icon or code library embedded in a deliverable carries its own
   licence, which passes to the customer on its own terms and may be
   non-transferable or may require the customer to hold their own licence.

`[BUILD]` Item 3 requires an actual licence inventory per website build. The
contract cannot promise the customer a clean licence position unless the build
process records what was used and under what licence. Until that inventory exists,
the website terms must say the customer receives the deliverable subject to
third-party licences identified at handoff, and the handoff must actually identify
them.

## The line the customer will actually ask about

The question a founder asks at cancellation is not phrased in IP terms. It is "do I
lose my business if I stop paying?" The answer has to be short and it has to be
true.

> You keep the company, the brand, the domain, the website, your customer data,
> your accounts and your documents. You stop having Business Builder operate them.

Everything in bucket 1 survives. Everything in bucket 2 stops. Everything in
bucket 3 continues on the customer's own account with the provider, at the
customer's own cost, if they keep paying that provider.

## Where the boundary is genuinely blurry

Four areas where a two-line clause will not hold up. Each needs a decision.

**Website output.** The generated site is produced by Business Builder's engine
from reusable components. The customer must own their site. Business Builder must
keep the engine. The workable structure is that the customer owns the specific
output and its content outright, and receives a perpetual, irrevocable,
non-exclusive licence to the reusable components as embedded in that output, with
no right to extract the components for reuse elsewhere or to build competing sites.
`[COUNSEL]` Confirm this is the right structure and that it survives the customer
later hiring another developer to modify the site, which they must be free to do.

**Company Brain contents.** The platform is Business Builder's. The business facts
loaded into it are the customer's. The derived structures sitting between the two,
embeddings, extracted entities, learned routing, are ambiguous. Recommendation: the
customer owns the source facts and any export of them, Business Builder owns the
derived representations, and the export obligation is satisfied by returning the
source facts in a usable form rather than the derived structures. `[COUNSEL]`
Confirm. This is the single most likely point of dispute in the model.

**Prompts and configuration tuned for one customer.** A prompt written to encode
one customer's price rules, service area and tone is customer-specific in content
and Business Builder's in structure. Recommendation: treat the encoded business
rules as customer content, exportable in readable form, and the prompt scaffolding
as platform. `[COUNSEL]`

**Work produced by AI for the customer.** Copy, quotes, replies and documents
generated by an AI worker. U.S. copyright registration requires human authorship,
so purely machine-generated output may not be protectable by anyone. The contract
should assign whatever rights exist rather than warranting that rights exist.
`[COUNSEL]` Confirm the assignment language does not imply a warranty of
copyrightability, and decide whether to disclaim it expressly.

## What must not be said

These are the failure modes. Each has appeared in a real dispute somewhere in the
industry.

- Do not say the customer owns "everything we build". The platform is built too.
- Do not say the customer gets "the source code" without saying which source code.
  The website export is source code. The platform is also source code.
- Do not say "full ownership" without a defined object. The site currently says
  this. See [20-website-copy-audit.md](20-website-copy-audit.md).
- Do not promise transferability of anything held under a third-party licence
  without confirming the licence permits transfer.
- Do not imply the customer acquires rights to reusable agents because those agents
  performed work for them.

## Draft clause skeleton

For counsel to work from, not to publish.

> **Customer Materials.** Customer owns all right, title and interest in the
> Customer Materials, defined as [bucket 1 list]. To the extent any Customer
> Material is created by Business Builder under an Order, Business Builder assigns
> to Customer all right, title and interest in that Customer Material, effective on
> receipt of payment in full for the applicable Order. `[COUNSEL]`
>
> **Business Builder Technology.** Business Builder owns and retains all right,
> title and interest in the Business Builder Technology, defined as [bucket 2
> list], including all modifications, improvements and derivative works, whether or
> not developed in connection with performing Services for Customer. No Order, fee,
> termination, export or handoff conveys any right in the Business Builder
> Technology.
>
> **Embedded Components.** Where a Deliverable incorporates Business Builder
> Technology, Business Builder grants Customer a perpetual, irrevocable, worldwide,
> non-exclusive, royalty-free licence to use, modify and host that Business Builder
> Technology solely as embedded in and as part of that Deliverable. Customer may not
> extract, separate or reuse the embedded Business Builder Technology outside the
> Deliverable. `[COUNSEL]`
>
> **Third-Party Materials.** Deliverables may incorporate Third-Party Materials
> licensed from others. Third-Party Materials are licensed, not assigned, and are
> governed by their own terms, which Business Builder will identify at handoff.
> `[BUILD]`
>
> **Feedback and Operational Learning.** Business Builder may use de-identified and
> aggregated data derived from providing the Services to operate, secure, analyse
> and improve the Business Builder Technology. Business Builder will not use this
> right to disclose Customer Materials or to permit identification of Customer or
> Customer's own customers. `[COUNSEL]`

## Cross-references

- Export mechanics: [12-data-export-handoff.md](12-data-export-handoff.md)
- Account transfer: [13-credentials-and-accounts.md](13-credentials-and-accounts.md)
- What survives cancellation: [08-cancellation-policy.md](08-cancellation-policy.md)
- Site copy that conflicts: [20-website-copy-audit.md](20-website-copy-audit.md)
