/**
 * Centralised access to Sanity connection settings.
 *
 * These are all PUBLIC, non-secret values (the project id and dataset are
 * visible in the browser bundle either way). We read them from env vars for
 * the Next.js app, but fall back to literals so the standalone Sanity Studio
 * build — which does NOT inline `process.env.NEXT_PUBLIC_*` the way Next.js
 * does — still gets a valid project id and loads correctly.
 */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "8z0je8p3";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
