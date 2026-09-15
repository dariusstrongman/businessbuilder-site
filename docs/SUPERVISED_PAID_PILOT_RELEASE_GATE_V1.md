# First paid-pilot status in the flagship Build Room

The backend Commercial ledger is authoritative. The website uses only the
authenticated, read-only `GET /api/v1/orders/{order_id}/paid-pilot-release`
mapping through the existing BFF. The BFF carries the HttpOnly founder
session, forwards only a validated `company_id` selector, and the backend
derives tenant, founder, membership, company and order ownership. The reply
contains only status, names of missing blocking gates, and a live-charge
boolean. It does not expose approval evidence, approver identities, secret
references, production configurations, or internal audit records.

The Build Room renders `NOT_READY`, `HOLD`,
`READY_FOR_SUPERVISED_PILOT`, and `APPROVED_FOR_LIVE_CHARGE` as **status**.
An unavailable backend status is displayed as unavailable/blocked, never as
approval. No website route can record a gate approval or create the
first-customer packet. A forged browser mutation is denied. This branch
continues to show only supervised Stripe **test-mode** Checkout actions;
even a future approved packet would not activate an entitlement from a click
or success redirect. Signed, exact-order Stripe webhook reconciliation stays
authoritative in Commercial.

Promotion order: compatible backend release-gate code first, then this
read-only frontend BFF/status view. Do not pair it with the old pilot ECS
revision 7; that revision cannot parse newer commercial product codes.
The full operator ceremony and rollback requirements are in the backend
`docs/SUPERVISED_PAID_PILOT_RELEASE_GATE_V1.md`. No production merge,
deployment, live provider or live charge is performed here.
