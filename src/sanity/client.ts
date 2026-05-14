import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

/**
 * Read-only client for fetching published content from the Next.js app.
 * Uses Sanity's CDN for speed; pass { useCdn: false } in route handlers
 * that need always-fresh data (e.g. previewing drafts).
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
