/**
 * Sentry client-side initialisation.
 * Runs in the browser. Catches exceptions from React components, unhandled
 * promise rejections, and uncaught errors in event handlers.
 *
 * Sample rates kept low because a small garage site won't generate enough
 * traffic to need higher sampling; we just want to know when something breaks.
 */
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    // % of transactions traced for performance monitoring
    tracesSampleRate: 0.1,
    // Don't send errors from local dev to Sentry — would just be noise
    enabled: process.env.NODE_ENV === "production",
    // Show stack traces in the browser console while developing
    debug: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
