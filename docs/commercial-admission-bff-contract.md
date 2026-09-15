# Flagship commercial-admission mapping (test mode only)

`businessbuilder-site` is the customer surface; `buisnessbuilder-future` owns Company Brain, Identity, Runtime, Commercial, Verification, and the quote-required running-business scope. This branch changes no flagship visual system and enables no live payment.

The BFF forwards only allowlisted `/api/product/*` routes to `/api/v1/*`. It uses the existing HttpOnly founder/operator session cookie and same-origin mutation check. It never forwards browser-provided tenant, role, actor, or company authority headers. `company_id` query/path values are object locators; the backend derives/rechecks tenant and role. The scoped operator routes intentionally **omit** the SUPPORT impersonation header: a separate commercial appointment, not founder impersonation, is required. Other evidence-review requests retain their scoped support session.

| Flagship request | Backend authority | UI state |
|---|---|---|
| `companies/{id}/residential-cleaning-pilot/existing-business-audit` | Founder inventory in Company Brain | Assertion captured; no quote or order. |
| `operator/companies/{id}/residential-cleaning/existing-scope` | Signed commercial operator + Company Brain | Cited, inventory-backed proposed scope. |
| `companies/{id}/residential-cleaning-pilot/existing-order` | Founder OWNER + Commercial | Deterministic unpriced draft. Duplicate request returns same order. |
| `operator/companies/{id}/orders/{order}/quote` | Signed commercial operator + Commercial | Exact quote; “from $1,495” remains a floor, not a charge. |
| `orders/{order}/quote?company_id={id}` | Founder OWNER + Commercial | Amount, monthly charge, expiry, displayed scope digest; reading does not approve. |
| `orders/{order}/quote/approve?company_id={id}` | Founder OWNER + current Company Brain digest + Commercial | Founder-approved exact quote; still not payment eligible. |
| `operator/companies/{id}/orders/{order}/release` | Signed commercial operator + tax/admission boundary | Expiring `PAY_NOW_ELIGIBLE` or `PAYMENT_DELAY_REQUIRED`; default UI is delayed. Test-mode uncertainty cannot clear production tax. |
| `orders/{order}/checkout?company_id={id}` | Commercial current admission + Stripe test Checkout | Pending provider redirect; no entitlement. Stable retry key is reused. |
| `companies/{id}/build-room` | Company Brain/Runtime/Commercial/Founder Actions/Verification projection | No scripted progress; Ready/Fully Set stay with Verification. |

The founder view distinguishes: unpriced scope, waiting for operator quote, quote proposed, founder approval, payment delayed, tax review, permitted test Checkout, Checkout pending/expired/failed, and independently active entitlement. Provider-hosted success alone has no effect. The operator view distinguishes appointment scope, cited scope proposal, exact quote issue, and expiring commercial release. Backend errors and stale digests reload persisted state; idempotency keys are retained for Checkout retries.

Environment-variable **names only**: `BUSINESS_BUILDER_API_URL`, `BUSINESS_BUILDER_TEST_AUTH_MODE` (local integration harness only), `NEXT_PUBLIC_SITE_URL`, `BUSINESS_BUILDER_COGNITO_USER_POOL_ID`, `BUSINESS_BUILDER_COGNITO_CLIENT_ID`, `BUSINESS_BUILDER_STRIPE_TEST_SECRET_REF`, `BUSINESS_BUILDER_STRIPE_TEST_WEBHOOK_SECRET_REF`. No secret values belong in this repository or normal frontend JavaScript.

`npm run integration` uses deterministic backend responses to inspect rendered fixed-price, quote-required, delayed admission, evidence-review, and Verification states at 375/768/1440 with overflow and WCAG checks. This is not a unified Cognito-founder-to-Stripe E2E run. Separately, the backend acceptance scripts used the isolated Business Builder Stripe sandbox, and `stripe-sandbox-checkout-inspect.mjs`/`stripe-sandbox-checkout-complete.mjs` inspected and submitted real Stripe-hosted test Checkout with documented fake cards only. The backend's local CLI listener verified and reconciled actual signed Stripe events to PostgreSQL. Browser completion did not set an entitlement; the server projection changed only after the signed event. No live-charge flag or provider adapter is enabled here.
