import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import path from "node:path";

// Content-Security-Policy. 'unsafe-inline' is required for Next.js App
// Router (inline hydration scripts) and React inline styles; the rest is
// locked to self + the specific third parties we actually load:
//   - challenges.cloudflare.com : Turnstile widget (script + iframe)
//   - cdn.sanity.io            : Sanity-hosted images
//   - www.google.com           : optional Google Maps embed on /contact
// Sentry is tunnelled through the same-origin /monitoring route, so it needs
// no external connect-src entry.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com https://www.google.com",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

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
  // next-sanity is the only Sanity package we ship in the runtime bundle
  // (the Studio itself is hosted by Sanity at primebodywork.sanity.studio).
  transpilePackages: ["next-sanity"],
  // Sanity's CDN is the canonical source of asset images.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // Baseline security headers applied to every response. These are safe,
  // resource-agnostic hardening (clickjacking, MIME sniffing, referrer
  // leakage, feature access, HTTPS enforcement). A full Content-Security-
  // Policy is intentionally left out here — it needs per-resource testing
  // (Sanity CDN images, Sentry tunnel, Next inline hydration) to avoid
  // breaking the page, and is best added as a tested follow-up.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Report-Only for now — verify in the browser console it doesn't
          // flag legitimate resources, then switch the key to
          // "Content-Security-Policy" to enforce.
          {
            key: "Content-Security-Policy-Report-Only",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
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
