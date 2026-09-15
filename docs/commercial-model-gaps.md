# Commercial model gaps carried into the checkout subsystem

Recorded during the auth and intake integration. **Nothing here was fixed in that
task, deliberately.** Each item needs the checkout and commercial subsystem, because
each one changes a contract rather than a label.

---

## 1. The existing-business Run route has no backend package value

**Status: open. Frontend and backend disagree, and the frontend is the one telling
the truth.**

### What the customer sees

A founder who arrives from the "I want parts of it run for me" starting point is an
existing business. The intake shows them the run package at **$1,995 upfront +
$299/month**, and immediately beneath it states the correction:

> You already trade, so this is priced differently. From $1,495 + $299/mo, with
> onboarding quoted after the Existing Business Audit.

That correction is accurate. An existing business is not priced like a new one,
because onboarding depends on what the audit finds.

### What the backend receives

`requested_package`, inside `working_preferences`, on the residential-cleaning pilot
intake. The contract accepts **two values**: `business` and `run`.

An existing business therefore arrives at the backend indistinguishable from a new
business that chose the same package. The only signal that they already trade is
`starting_point`, which is sent, but which is a journey field rather than a
commercial one.

### Why it was not fixed during the auth task

Adding a third `requested_package` value would have changed the payload a contracted
pilot endpoint accepts, inside a task whose purpose was authentication. A rejected or
silently-coerced intake would have broken the real flow to fix a pricing label. The
correction was made in the interface instead, where it costs nothing and misleads
nobody.

### What checkout has to decide

This is a modelling question, not a string.

1. **Is "existing business" a package, or a pricing dimension on an existing
   package?** The site currently presents it as a fourth route. The ladder presents
   three. Both cannot be true at checkout, where the customer is charged.
2. **How is a floor priced?** "From $1,495" is not a number a checkout can charge.
   The audit has to produce a figure, the customer has to approve that figure, and
   the approved figure has to be what is charged. That sequence does not exist yet.
3. **Where does the audit sit relative to payment?** The published position is that
   the customer sees the figure before committing. That makes the audit either free
   or separately priced, and it is currently stated nowhere.
4. **Does `starting_point` carry commercial weight, or does the package?** Deriving
   price from a journey field is fragile. Deriving it from an explicit commercial
   field is not.

### Do not resolve it by

- Forcing a third enum value into the pilot intake without the backend contract
  changing first
- Deriving price from `starting_point` in the frontend
- Removing the interface correction. It is the only thing currently preventing an
  existing business from being quoted a new-business price

---

## 2. Two price surfaces, independently maintained

**Status: open, low severity, high drift risk.**

The bundle figure of $1,995 upfront plus $299 a month now exists in two places:

| Location | Form |
|---|---|
| `src/content/packages.ts` | The `run` package `price` field, used by the ladder, the homepage and the pricing page |
| `src/app/start/StartForm.tsx` | A local `pilotPrice` literal, used by the authenticated intake |

They agree today. Nothing enforces that they keep agreeing, and the intake is the
surface a customer sees immediately before committing.

**For checkout:** one source of truth, read by both, or a test that fails when they
diverge.

---

## 3. "From" prices cannot be charged

**Status: open.**

Two published figures are floors rather than prices: existing-business onboarding
"from $1,495", and any Build & Run engagement where activation depends on what the
build already covered.

A checkout needs a figure. The sequence that makes a floor chargeable is: audit,
quote, customer approval of that specific quote, then charge the approved amount.
Every step of that sequence is a product surface that does not exist.

---

## 4. Tax is not represented anywhere in the commercial model

**Status: open, and it is a pricing question rather than a paperwork one.**

Research indicates the monthly subscription, the activation fee and probably the
website build are taxable services in Texas, at 80% of the charge for data processing
services and at the full rate for others. No price on the site carries a tax position,
and the intake payload has no tax field.

Checkout has to decide whether tax is added at the point of sale or absorbed, and
whichever it is has to be disclosed before the customer commits. See the readiness
package for the citations.

---

## 5. Day-one payment depends on a question that is still open

**Status: open, and it is the gating item for checkout design.**

A federal rule can reach a service that solicits someone into a new business, takes a
required payment, and represents that it will provide customers. Where it applies, a
disclosure must be delivered **seven calendar days before the buyer signs or pays**.

That is incompatible with same-day checkout. Whether it applies has not been
determined, and the determination has to come before the checkout flow is designed
rather than after, because the seven-day gap is an architectural constraint, not a
copy change.
