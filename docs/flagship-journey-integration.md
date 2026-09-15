# Flagship Journey Integration v1

This is the customer-facing integration for the Denton, Texas
residential-cleaning pilot. It uses the existing visual system and consumes the
authoritative API in `dariusstrongman/buisnessbuilder-future`. It does not own
Identity, Company Brain, Runtime, Commercial, Founder Actions, evidence review,
or Verification state.

## Session boundary

The browser calls same-origin `/api/product/*` handlers. The backend bearer
session and optional scoped support-impersonation session are HttpOnly cookies;
client code cannot read or submit them. The server facade accepts no actor,
role, tenant, or company authority headers. Company IDs in paths are selectors
only and the backend re-derives all scope from current Identity records.

No permanent authentication provider is selected. The POST session adapter is
available only when an explicit non-production test mode is enabled. A live or
supervised production pilot still requires an approved authentication adapter
that establishes the same HttpOnly session boundary.

Environment variable names (never values):

- `BUSINESS_BUILDER_API_URL`
- `BUSINESS_BUILDER_TEST_AUTH_MODE`
- `BUSINESS_BUILDER_TEST_FOUNDER_EMAIL`
- `BUSINESS_BUILDER_TEST_FOUNDER_PROOF`
- `BUSINESS_BUILDER_TEST_FOUNDER_SESSION`
- `BUSINESS_BUILDER_TEST_OPERATOR_EMAIL`
- `BUSINESS_BUILDER_TEST_OPERATOR_PROOF`
- `BUSINESS_BUILDER_TEST_OPERATOR_SESSION`
- `BUSINESS_BUILDER_TEST_SUPPORT_SESSION`

## API mapping

| Product surface | Backend customer API |
| --- | --- |
| Session status | `GET /api/v1/me` + `GET /api/v1/memberships` |
| Company chooser | `GET /api/v1/companies` |
| Start pilot | `POST /api/v1/pilots/residential-cleaning/intakes` |
| Journey/recommendation/order | `GET /api/v1/companies/{company_id}/residential-cleaning-pilot` |
| Digest-bound approval | `POST .../residential-cleaning-pilot/approve` |
| Build Room | `GET /api/v1/companies/{company_id}/build-room` |
| Founder Action transition | `POST .../founder-actions/{action_id}/{explain|launch|complete}` |
| Evidence | `GET|POST .../evidence-submissions` |
| Operator review | `GET|POST .../evidence-reviews` |

The site facade derives a stable intake idempotency key from the canonical
intake body. Reloading or retrying the same intake uses the same key. Founder
Action commands bind their retry key to action identity and persisted version.
Evidence is content-addressed; review commands carry fresh bounded keys. After
every mutation the UI discards its prior view and reloads canonical state.

## State handling

| Condition | UI behavior |
| --- | --- |
| Loading | names every authority being loaded; does not show invented progress |
| Unauthenticated | preserves intake in component state and asks for a session proof |
| Unauthorized/cross-tenant | generic unavailable response without company details |
| Research pending/backend unavailable | explicit retry-safe state |
| Recommendation ready | renders the persisted record and its cited sources |
| Approval required | one explicit digest-bound approval command |
| Stale recommendation | reports conflict, reloads, and requires another review |
| Order pending | renders the real draft order and zero entitlements |
| Build Room active | renders `build-room.projection.v1` work, actions, and readiness |
| Founder Action pending | exposes only the next valid Runtime command |
| Scan pending | shows the persisted quarantine/scan state |
| Review pending/rejected/more evidence | shows current decision and immutable history |
| Verified | shows the Verification result; never computed in React |
| Backend error | sanitized message plus retry |

## Commercial boundary

The site displays the approved founding-price copy: Build My Business is
`$1,495`; Build My Business plus Build & Run is `$1,995` upfront and
`$299/month`. The backend order remains the authority for existence and status.
This branch contains no checkout, payment-success simulation, or entitlement
activation. A draft order is shown as pending, never paid.

## Evidence and operator boundary

The founder can upload a small PDF/PNG/JPEG, submit an opaque prevalidated
authority/provider reference, or submit the weaker supported structured
reference. The UI sends exactly the existing evidence contract and renders
quarantine, scan, review, supersession, and Verification state returned by the
backend. A rejected/more-evidence submission is superseded by a new immutable
submission.

Review controls render only for a SUPPORT membership. The backend additionally
requires the current founder-granted company-scoped artifact grant and an
unexpired impersonation session. A founder using a forged route or body still
cannot review their own evidence.

## Intentionally absent

No route performs a filing, purchase, bank or provider action, real email/CRM
write, merchant activation, money movement, or deployment. Real malware
scanning, private object storage, production authentication, operator
provisioning, and authoritative checkout remain launch blockers.
