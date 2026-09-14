/**
 * Deployment URL. Set NEXT_PUBLIC_SITE_URL in the environment for previews and production;
 * the fallback keeps local development and builds working.
 */
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
