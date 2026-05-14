"use client";

import dynamic from "next/dynamic";

import config from "../../../../sanity.config";

// next-sanity's NextStudio reads window on import, so render client-side only.
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((m) => m.NextStudio),
  { ssr: false },
);

export function StudioClient() {
  return <NextStudio config={config} />;
}
