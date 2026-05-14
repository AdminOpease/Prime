import type { SchemaTypeDefinition } from "sanity";

import { accreditation } from "./accreditation";
import { galleryItem } from "./galleryItem";
import { homepage } from "./homepage";
import { page } from "./page";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons (one of each — pinned in Studio structure)
  siteSettings,
  homepage,
  // Multi-entry types
  service,
  galleryItem,
  testimonial,
  accreditation,
  page,
];

/** Document names that should be treated as singletons in the Studio. */
export const singletonTypes = new Set(["siteSettings", "homepage"]);
