import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a URL for a Sanity asset reference.
 * Always serve through this — Sanity auto-resizes / optimises so we don't
 * waste bandwidth on the owner's raw 12 MB phone photos.
 *
 * Example: `urlFor(service.heroImage).width(1200).auto('format').url()`
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
