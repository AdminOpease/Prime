import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Studio is hosted inside the Next.js app, so we don't need autoUpdates.
  autoUpdates: true,
});
