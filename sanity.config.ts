import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioPath } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

/**
 * Sanity Studio configuration.
 * The Studio is mounted inside the Next.js app at /studio — see
 * src/app/studio/[[...tool]]/page.tsx.
 */
export default defineConfig({
  name: "default",
  title: "Prime Bodywork and Repair",
  basePath: studioPath,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Prevent the "Create new" action on singletons.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Strip create/duplicate/delete actions from singleton documents so the
    // owner can't accidentally end up with two Homepages or no Site Settings.
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action !== "duplicate" &&
              action !== "delete" &&
              action !== "unpublish",
          )
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
