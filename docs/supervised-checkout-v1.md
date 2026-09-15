# Supervised checkout frontend contract (test mode)

The flagship remains a same-origin BFF surface. The backend owns identity, tenant/company scope, orders, eligibility, Checkout Session creation, payment/subscription events and entitlements. The browser receives no Stripe secret or payment-webhook authority.

| UI use | BFF route forwarded to backend | State |
| --- | --- | --- |
| Founding prices | `GET /api/v1/pricing` | Canonical fixed prices; Existing Business + Run is `quote_required` |
| Approved order | `GET /api/v1/orders/{order_id}?company_id=...` | Draft/pending/paid/failed/refunded |
| Choose fixed offer | `POST /api/v1/orders/{order_id}/offer?company_id=...` | Founder-owned, approved, uncharged order only |
| Checkout/retry | `GET/POST /api/v1/orders/{order_id}/checkout?company_id=...` | Persisted eligibility, tax state and open hosted test URL |
| Build Room | Existing scoped Build Room endpoint | Persisted Commercial summary and Verification projection |
| Existing systems inventory | `GET/POST /api/v1/companies/{company_id}/residential-cleaning-pilot/existing-business-audit` | Founder assertion pending operator scope; **not** a chargeable fixed quote |

The backend derives tenant and company authority from the authenticated session/repository; the company ID in a route/query is an object locator, not an authorization claim. The frontend does not infer entitlement from a success URL. Returning from hosted Checkout re-reads the backend order/Build Room. Duplicate click/restart uses the persisted open Checkout URL and a stable retry key; failed requests retain a retry-safe state without declaring payment.

Customer-visible states include delayed payment eligibility, tax manual review, order draft/pending, Checkout disabled, hosted test redirect available, and Commercial/Build Room persistence. Existing-business pricing remains `from`/quote-required even after a founder inventory; an operator-authored audit, scoped recommendation and quote are still needed.

Marketing copy on pricing/packages/Build & Run/handoff was aligned to this four-offer contract. The earlier standalone `$795 activation` claim was removed because there is no chargeable Commercial package for it. This is a pricing-truth copy change, not a website redesign or a new offer.

Environment variable **names only**: the existing BFF API base URL, Cognito/session configuration names, `BUSINESS_BUILDER_CHECKOUT_SUCCESS_URL`, `BUSINESS_BUILDER_CHECKOUT_CANCEL_URL`. Stripe test API/webhook secrets are backend-only. No live Stripe credentials or production sending are enabled here.
