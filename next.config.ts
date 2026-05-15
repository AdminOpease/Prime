import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Required by OpenNext for Cloudflare — emits .next/standalone/ with a
  // minimal Node server that the OpenNext bundler wraps into a Worker.
  // No effect on local `next dev`.
  output: "standalone",
  // Pin Turbopack's workspace root to this project so Next.js doesn't
  // accidentally pick up an unrelated lockfile sitting in $HOME.
  turbopack: {
    root: path.join(__dirname),
  },
  // Sanity ships its Studio as ESM that Next needs to transpile.
  transpilePackages: ["sanity", "next-sanity", "@sanity/vision"],
  // Sanity's CDN is the canonical source of asset images.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

/**
 * Wrap with Sentry's webpack plugin so source maps get uploaded at build
 * time (only when SENTRY_AUTH_TOKEN is set in CI), and so client-side
 * requests are tunnelled through a same-origin path to bypass ad blockers.
 */
export default withSentryConfig(nextConfig, {
  // Org + project — read from env so we don't bake credentials into git.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Quieter build output for local dev
  silent: !process.env.CI,

  // Tunnel Sentry requests through /monitoring so ad-blockers don't drop them
  tunnelRoute: "/monitoring",

  // Don't fail the build if source map upload errors (e.g. no token)
  errorHandler: () => {},

  // Strip Sentry SDK logging from production bundles
  disableLogger: true,
});
