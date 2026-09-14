# 20. Website copy audit and recommended wording changes

> **DRAFT — NOT LEGAL ADVICE. NOT ATTORNEY REVIEWED.**
> Audited against `main` at `5022446`. **No site change has been made.** Every
> recommendation below is a proposal for separate review and a separate commit.

## How to read this

Findings are ordered by severity, not by page. Each carries the file and line, the
exact current text, and an exact proposed replacement where one is possible.

Three findings are not wording problems at all. They are defects that make the site
state something untrue about itself. They are listed first because no amount of
legal drafting fixes them.

A general note that recurs throughout: because no Terms of Service exists, every
customer-favourable sentence on this site is currently an unqualified commitment
with nothing counterbalancing it. The site is unusually honest, which is an asset,
but honesty without terms means the site **is** the contract. That is the single
biggest finding in this audit.

---

## Tier 0, defects that make the site untrue

### 0.1 The intake tells the customer their build is open. Nothing is saved.

`src/app/start/actions.ts:18-22` acknowledges and validates the intake without
persisting anything and without sending anything. `src/app/start/StartForm.tsx:54`
tells the submitter "Your build is opened." and lines 57-59 promise a follow-up by
email.

Every person who has used that form has been told something false. This is the
clearest deceptive-practices exposure on the site, it is worse than any wording
problem in this document, and it cannot be fixed by changing the copy while the
form still goes nowhere.

**Options, in order of preference.** Persist the intake and actually send the
email. Failing that, change the success copy to describe what really happens. Failing
that, take the form down.

`[BUILD]` This is a launch blocker regardless of which option is chosen.

### 0.2 The login page collects a password with no backend and no privacy policy.

`src/app/login/page.tsx:23-41` collects an email address and a password and posts to
a route with no handler. Collecting a credential with no disclosure, no policy and
no destination is the kind of finding that is hard to explain afterwards.

**Recommendation.** Remove the login route and its navigation links until
authentication exists. `src/components/nav/Footer.tsx:30` and
`src/components/nav/Header.tsx:176` and `:239` link to it.

### 0.3 The flagship page describes the wrong deliverables.

`src/app/build-my-business/page.tsx:150-161` supplies 11 notes. The package has 16
inclusions. The ledger pairs them by index, so from the second row onward every
description belongs to a different deliverable, and the last five render empty.

Live consequences on the $1,495 page include the Existing Business Audit being
described as "The strongest version of your idea, and the honest weak points", and
"Payments configured, checkout verified" being described as entity and tax-ID
preparation.

**Recommendation.** Pair notes to inclusions by key rather than by index, so a
mismatch is impossible rather than merely unlikely.

---

## Tier 1, pricing

### 1.1 The bundle is understated by $1,200 on three pages.

`src/content/packages.ts:80-103`. The `run` package carries:

```
price: "$795 + $299/mo",
includesLabel: "Everything in Business, plus",
```

The card presents the full Business inclusion list and prices it at $795 plus $299 a
month. The authoritative model prices Business plus Build & Run at **$1,995 upfront
plus $299 a month**. The correct figure appears only in the small `priceNote`
beneath, where it reads as an alternative rather than as the price.

This renders on the homepage, on `/pricing` in both the matrix and the comparison
table, and on `/start` next to the radio button the customer selects.

This is a display error, not a change to the pricing model. The model is correct.
The card is showing the wrong number for what it is offering.

**Recommended replacement:**

```
price: "$1,995 + $299/mo",
priceNote: "Build and activation together, then monthly while it runs. Build & Run on its own is $795 activation plus $299 a month.",
```

`[COUNSEL]` Confirm before publication. A published price that understates the
actual charge by $1,200 is the kind of discrepancy that produces both chargebacks
and a deceptive-pricing argument, and it is worse if a customer has already seen it.

### 1.2 An existing business is routed to the wrong offer.

`src/components/diagrams/StartingPointPicker.tsx:115` sends the "I want parts of it
run for me" path to `/start` with `package=run`.
`src/content/packages.ts:3` defines only `website`, `business` and `run`, and
`src/app/start/page.tsx:17` coerces anything unrecognised to `business`.

So an existing-business owner is quoted the `run` figure when the authoritative
model prices them at **from $1,495 onboarding plus $299 a month**, after an audit.

**Recommendation.** Add the existing-business route as a selectable option in the
intake, or route that starting point to a path that states "quoted after the audit"
rather than showing a fixed figure.

### 1.3 Prices stated without the third-party qualifier.

Nine locations state a figure with no indication that provider costs are separate.
The qualifier currently lives in the footer and on `/pricing` only. `/website` is
the sharpest case: it states "$795, one time." while the package includes a
connected domain, which has a real annual cost.

**Recommendation.** Add a single consistent qualifier adjacent to every headline
figure. See [10-third-party-fees.md](10-third-party-fees.md) for the disclosure
standard. Suggested short form: `Third-party and provider costs are separate.`

---

## Tier 2, regulated activity

The site's stated policy is correct and well written. These are the places the copy
breaks it.

### 2.1 "we file it"

`src/content/buildRoom.ts:201`

> Upload or forward the confirmation and we file it against your company.

Sits directly beneath the EIN Founder Action. Whatever was meant, it reads as filing
with the tax authority.

**Replace with:** `Upload or forward the confirmation and we record it against your company.`

### 2.2 Drafting service and quote terms

`src/content/turnkey.ts:90`, owner `builder`

> Drafted for your trade and attached where customers actually see them.

Drafting customer-facing contract terms for another person is the practice of law in
Texas. Repeated at `src/content/buildRoom.ts:110`, `src/content/packages.ts:68`,
`src/content/founding.ts:77`, `src/content/turnkey.ts:89`.

**Replace with:** `Prepared from your instructions and attached where customers see them. Have your attorney review them before you rely on them.`

`[COUNSEL]` This is the highest-exposure item in the regulated-activity category and
may be a product question rather than a wording one. Review the Texas unauthorised
practice of law position before the first business build.

### 2.3 "We created the account"

`src/content/receipt.ts:34` and `src/content/buildRoom.ts:213`

> We created the account, configured it for your services and filled in your business details.

Opening a payment-processor account on a customer's behalf, stated plainly.

**Replace with:** `We prepared the account setup and configured it for your services. You opened it and accepted the provider's terms.`

### 2.4 Insurance and licensing determinations

`src/content/turnkey.ts:51`

> We set out what your trade and contracts typically require, and track the policy once it exists.

Compounded by `src/content/audit.ts:44`, which renders "General liability only.
Commercial work needs more." as a verdict.

**Replace `turnkey.ts:51` with:** `We list the cover types businesses in your trade are commonly asked for, and track the policy once it exists. What you actually need comes from your broker.`

**Replace `audit.ts:44` note with:** `General liability on file. Confirm with your broker whether your contracts require more.`

Same pattern at `src/content/turnkey.ts:52` for licences and permits.
**Replace with:** `We list what commonly applies to your trade and location, prepare what we can, and record each one. Confirm the list with your authority or attorney.`

### 2.5 Domain registered in the customer's name

`src/content/turnkey.ts:64` says "Registered or connected in your name", which
conflicts with `src/content/trustDetail.ts:55` saying domain purchases are approvals
rather than actions.

**Replace with:** `Registered by you or connected to you, DNS configured, certificate verified.`

### 2.6 The footer disclaimer omits registered agent

`src/components/nav/Footer.tsx:64-66` lists law firm, accountant, insurer, bank and
filing authority. Three other places in the content also say "registered agent".
The footer is the only disclaimer most visitors will ever see.

**Add `registered agent`** to the footer list so it matches
`src/content/turnkey.ts:129` and `src/content/trust.ts:41`.

### 2.7 The tagline

`src/config/brand.ts:8`, which renders in every page title, every Open Graph tag and
the footer:

> Describe the company you want. We build it, verify it, and hand you the keys.

`src/content/founding.ts:71` already carries the softened version, "We help assemble
it". The hard version is the site-wide default.

`[COUNSEL]` Decide whether the tagline needs softening. "We build it" is a strong
claim next to a disclaimer saying the company does not perform the regulated steps
itself. The softened phrasing already exists and is a one-word change to adopt.

---

## Tier 3, absolute promises

### 3.1 "No ongoing fee, ever" plus perpetual hosting

`src/components/diagrams/HandoffFork.tsx:19` says `No ongoing fee, ever`.
`src/content/buildRoom.ts:319` says `Hosted for you, exportable any time`.
`src/app/website/page.tsx:194` repeats it.

Together these promise free hosting in perpetuity, with no term and no sunset. They
also contradict `src/content/turnkey.ts:117`, which says every account is in the
customer's name, and `src/content/journeyDetail.ts:90`, which says the company is
"hosted for you, and not dependent on us" in the same sentence.

`[COUNSEL]` This is a product decision before it is a wording one. Either hosting is
the customer's own account, which is consistent with the ownership model, or it is a
Business Builder service with a term and a cost.

**If hosting moves to the customer's account, replace `buildRoom.ts:319` with:**
`Hosting set up in your name, exportable any time.`

**If hosting stays included, replace `HandoffFork.tsx:19` with:**
`No ongoing Business Builder fee` and state the hosting term separately.

Either way, `No ongoing fee, ever` should not survive in its current form.

### 3.2 "There is no version of this where the company depends on us"

`src/components/sections/home/Ownership.tsx:17-18`, duplicated at
`src/components/sections/home/Handoff.tsx:26-29`.

Absolute, and currently untrue while Business Builder hosts the site.

**Replace with:** `Nothing about the company is locked to us. If we stop, it keeps working.`

### 3.3 "you own everything we build"

`src/config/brand.ts:33`, rendered by `IntakeField.tsx:93` under the primary call to
action on every page of the site.

The platform is also built. This is the exact phrase the IP model warns against.

**Replace with:** `you own the company we build for you.`

### 3.4 Search ranking claims

`src/content/turnkey.ts:102` says listings are set "so you appear for the right
searches", which contradicts `src/content/trust.ts:42`, "We do not promise revenue,
rankings or customers."

**Replace with:** `Service area, hours and categories set correctly for the searches you want to appear in.`

`src/content/startingPoints.ts:61` and `src/content/trustDetail.ts:106` promise that
search ranking is "carried across, never reset".

**Replace with:** `Customer data and reviews are carried across rather than reset, and the migration is done the way that best preserves your search position.`

### 3.5 Compliance reminders

`src/content/turnkey.ts:53`

> Renewal dates recorded in your company record and surfaced before they lapse.

A missed reminder on a lapsing licence is a direct damages theory.

**Replace with:** `Renewal dates recorded in your company record so you can track them. Keeping them current stays yours.`

### 3.6 Absolute language, shorter items

| Location | Current | Proposed |
|---|---|---|
| `buildRoom.ts:154` | `so it is never asked for twice` | `so we do not ask you for it twice` |
| `buildRoom.ts:235` | `We publish the prepared profile the moment verification lands.` | `We publish the prepared profile once verification lands.` |
| `how-it-works/page.tsx:106` | `nothing waits on us for long, and that you can always see what is waiting on whom` | `you can see what is waiting on whom, and what we owe you` |
| `startingPoints.ts:62` | `Work is staged so you keep trading throughout` | `Work is staged around your trading, so changeovers happen when they cost you least` |
| `audit.ts:22` | `rebuilding costs less than patching` | `rebuilding is likely to cost less than patching` |

---

## Tier 4, ownership and export

### 4.1 "source files"

`src/content/founding.ts:59`, in the $795 website offer:

> Full ownership, source files and export

The strongest promise on the site, and the one most in tension with retaining the
website generation engine.

**Replace with:** `Your site's source files and a full export, yours to take anywhere`

and define the deliverable per
[03-service-terms-website.md](03-service-terms-website.md). The word "full" applied
to "ownership" with no object is the part that has to go.

### 4.2 The retention clause appears on one page

`src/content/founding.ts:186-188` states plainly what stays with Business Builder.
It renders only on `/pricing`.

It is absent from `/trust`, `/about`, the homepage ownership section, the handoff
section, and `/build-my-business`, which is to say it is absent from every place
that makes the ownership claim.

**Recommendation.** Surface the retention sentence wherever the ownership claim
appears. It costs one line and it removes the entire category of later argument.

### 4.3 Company history and verification evidence

`src/content/buildRoom.ts:318-326` promises the customer receives "Research, audit,
recommendation, decisions" and "The full log of every check".

`[COUNSEL]` Confirm these are intended to transfer. They are outputs of the platform
the retention clause keeps. The recommendation in
[11-ip-ownership-model.md](11-ip-ownership-model.md) is that the results transfer
and the check definitions do not, which is consistent with this copy, but it should
be a decision rather than an inference.

---

## Tier 5, the approval boundary

### 5.1 The boundary is asserted and contradicted on the same page

`src/app/build-and-run/page.tsx:93` states that anything customer-facing,
irreversible or costly waits for approval. Roughly twenty lines below,
`WorkerDay` renders four events in which a worker contacts a customer with no
approval gate: `src/content/workerDay.ts:22`, `:60`, `:66`, and the booking behaviour
at `src/content/workers.ts:14-15`.

A reader who notices will conclude one of the two is untrue.

`[COUNSEL]` and `[BUILD]` This is a product decision. Either first replies and
booking confirmations are inside the approved envelope, in which case the boundary
statement needs qualifying, or they are not, in which case the worker day needs
gates.

**If first replies are pre-approved at activation, replace `page.tsx:93` with:**
`You set where it sits for each worker, and you can turn it down at any time. Anything outside what you approved at activation waits for you, and anything irreversible or costly always does.`

### 5.2 Every stated boundary is now a technical commitment

Eighteen separate assertions about what workers can, must ask about, and cannot do.
They are good copy and they are the right way to sell this. They are also a
specification.

`[BUILD]` Each must be enforced outside the model rather than instructed inside it.
An instruction not to do something is not a control. The full list is in the audit
source and should be turned into a test suite.

The one with the sharpest external consequence is
`src/content/workers.ts:41`, `Contact a customer who opted out`, which touches
federal communications rules rather than only contract.

---

## Tier 6, implied customers

The site is deliberately free of testimonials, logos, ratings, countdowns and
crossed-out prices, and says so in five places. That posture is an asset. Four
statements break it.

| Location | Current | Proposed |
|---|---|---|
| `journeyDetail.ts:71` | `Many founders do, while the remaining work finishes.` | `You can, while the remaining work finishes.` |
| `build-and-run/page.tsx:80` | `as they are proven in real companies` | `only after they are proven` |
| `BuildAndRun.tsx:34` | `Added as they are proven in real companies, not announced ahead.` | `Added only after they are proven, not announced ahead.` |
| `pricing.ts:63` | `does not yet have a wall of case studies` | `has no case studies yet` |

### 6.1 Examples that are not visibly labelled as examples

Four product surfaces render fictional data with the word "example" present only in
an aria-label or a source comment.

- The evidence log on `/product` (`EvidenceLog.tsx:9`)
- The audit on `/product`, which renders 22 specific findings about a plausible
  pressure-washing company (`audit.ts:37-39`, and the reassurance line that would
  have labelled it renders only inside the starting-point picker)
- The Build Room in the homepage hero (`BuildRoom.tsx:70`)
- The mock website, which carries a green "Verified live" stamp (`SiteFrame.tsx:34`)

**Recommendation.** Add a visible label to each. The design studies show how to do
this well: a visible stamp on the artefact plus a disclosure line beneath. The same
treatment applied to these four closes the gap.

The `/product` page describing a scripted animation as "a live preview of the Build
Room running a mobile detailing build" is the one to fix first. Replace "live
preview" with "preview", and "running" with "of".

### 6.2 Design studies

The labelling is adequate and is the best-handled part of the site: a per-card
stamp, a disclosure line on every instance of the grid, a dedicated section on
`/work`, and an accessible label. One improvement worth making.

**Change the per-card stamp** at `StudyGrid.tsx:21` from `Study` to
`Design study` so the homepage strip, where the disclosure sits below both cards,
carries the meaning on the card itself.

---

## Tier 7, commitments to keep or qualify

These are not errors. They are promises the terms must now match rather than
contradict. Listing them so the drafting does not accidentally undercut the site.

- `founding.ts:210` The intake promises research, a scope and a confirmed price
  before any charge. This is a real obligation with no cap on the work involved and
  no recovery if the customer walks. `[COUNSEL]` See the refund policy.
- `trustDetail.ts:75` Before approval the customer "owes nothing further" and keeps
  the research and recommendation.
- Seven separate unqualified "stop any time" statements. The cancellation policy must
  not introduce a notice period or a minimum term.
- `build-and-run/page.tsx:24` "Nothing is rebuilt" on return, which implies no second
  activation fee. `[COUNSEL]` Decide and state it.
- `pricing/page.tsx:70` "none of them changes after you have paid", a post-payment
  term freeze.
- `founding.ts:170` A fair-use policy "will be published before it could ever
  matter". A commitment with a deadline attached.
- `founding.ts:39` No countdown, no seat count, no expiry, and a promise to say
  plainly when founding pricing ends. Silent on whether existing founding customers
  keep their rate, which is the question they will all ask.

---

## Tier 8, stale figures

| Location | Says | Actual |
|---|---|---|
| `product/page.tsx:44` | Eight modules | 10, and the same screen renders "/10" |
| `how-it-works/page.tsx:15` metadata | Twelve stages | 15, and the page hero says fifteen |

The second is the page description search engines display.

---

## What is missing entirely

No Terms of Service. No Privacy Policy. No refund or cancellation policy. No legal
entity name, no registered address, no contact email, no phone number, and no way to
reach the company except by submitting the intake form.

There is currently no analytics, no cookie, and no third-party script anywhere on the
site, so nothing requires a cookie disclosure today. Worth noting that the site sells
analytics configuration to its customers while running none itself, and will need a
privacy page in place on the day that changes.
