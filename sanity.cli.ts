import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Deploy target: primebodywork.sanity.studio (set so `sanity deploy` is
  // non-interactive and always targets the same hostname).
  studioHost: "primebodywork",
  deployment: { appId: "jzpn0402xnh0daq2y0yazf7t", autoUpdates: true },
});
