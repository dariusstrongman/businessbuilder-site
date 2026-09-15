# Cognito pilot website integration

The flagship website remains the browser-facing BFF. Cognito tokens never enter ordinary client-side JavaScript: the BFF owns authorization-code exchange, refresh, provider revocation, and Secure/HttpOnly cookies, then exchanges a Cognito access token for the backend's short-lived opaque session.

The deployed pilot sits behind CloudFront and an ALB. `NEXT_PUBLIC_SITE_URL` is the authoritative public HTTPS origin for redirects and CSRF comparison; origin-hop URLs must never be used as browser redirect targets. Production cookies are always Secure even when the private origin hop is HTTP.

Required environment variable names are:

- `NEXT_PUBLIC_SITE_URL`
- `BUSINESS_BUILDER_API_URL`
- `BUSINESS_BUILDER_AUTH_PROVIDER`
- `BUSINESS_BUILDER_AUTH_COOKIE_SIGNING_KEY`
- `COGNITO_DOMAIN`
- `COGNITO_APP_CLIENT_ID`
- `COGNITO_REDIRECT_URI`
- `COGNITO_LOGOUT_URI`

No values belong in the repository. The non-production test-login adapter remains disabled whenever `NODE_ENV=production`.

The committed acceptance harnesses read only synthetic pilot credentials from AWS Secrets Manager at execution time and print pass/fail state plus non-secret internal IDs. They never print passwords, email addresses, provider tokens, session cookies, signing keys, or verification/recovery codes.

For this residential-cleaning pilot only, a logged-in OWNER can use the narrow `POST /api/product/companies/{company_id}/residential-cleaning-pilot/support-grants` path. The backend derives the founder's company and tenant authority, verifies an existing SUPPORT membership, and fixes the grant to company-view and artifact-review permissions; browser-supplied permissions or roles are never forwarded.
