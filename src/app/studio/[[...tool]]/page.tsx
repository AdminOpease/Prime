/**
 * Embedded Sanity Studio route.
 *
 * Mounts the Studio defined in /sanity.config.ts at the /studio path.
 * Uses a catch-all segment ([[...tool]]) so all Studio sub-routes
 * (e.g. /studio/desk, /studio/vision) render through this single page.
 *
 * This page is a Server Component (so it can export metadata); the actual
 * <NextStudio> renderer is in StudioClient.tsx as a Client Component.
 */
import { metadata, viewport } from "next-sanity/studio";

import { StudioClient } from "./StudioClient";

export { metadata, viewport };

// Studio assets are huge — render statically so we don't ship them on every
// request to other pages.
export const dynamic = "force-static";

export default function StudioPage() {
  return <StudioClient />;
}
