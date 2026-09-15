# Production Founder Authentication integration

The flagship uses a server-side BFF session model. Normal frontend JavaScript never receives Cognito access, ID, refresh, or Business Builder session tokens.

## Routes

- `GET /api/auth/start?intent=login|signup|recovery&next=/...` starts a short-lived, signed, one-time state/nonce/PKCE transaction.
- `GET /api/auth/callback` validates the transaction and callback binding, exchanges the code, establishes the backend session, and rotates away any prior local session.
- `POST /api/auth/refresh` refreshes provider tokens and rotates the internal session. Same-origin checks are required.
- `POST /api/auth/logout` revokes provider/internal sessions and always clears local cookies.
- `POST /api/auth/support` exchanges a separately provisioned opaque grant for a scoped, expiring support session. Logging in alone never creates SUPPORT authority.
- `/api/product/*` forwards only the HttpOnly internal session and optional scoped support session to the backend.

Cookies are HttpOnly, Secure under HTTPS, path-scoped where possible, SameSite protected, and cleared on validation failure. Mutating BFF endpoints reject cross-origin requests. Auth state expires after ten minutes and is one-time because the callback deletes it before validation.

The intake draft may be retained temporarily in browser session storage across the provider redirect. It contains only fields the founder already entered, contains no authentication token or backend authority, and is removed after successful persisted intake.

## Environment variable names

- `BUSINESS_BUILDER_API_URL`
- `BUSINESS_BUILDER_AUTH_PROVIDER`
- `BUSINESS_BUILDER_AUTH_COOKIE_SIGNING_KEY`
- `COGNITO_DOMAIN`
- `COGNITO_APP_CLIENT_ID`
- `COGNITO_REDIRECT_URI`
- `COGNITO_LOGOUT_URI`

`BUSINESS_BUILDER_AUTH_EMULATOR` and `BUSINESS_BUILDER_TEST_AUTH_MODE` are non-production-only. The Cognito adapter requires HTTPS unless the explicit emulator flag is set outside production. The legacy proof route returns unavailable in production even if test variables exist.
