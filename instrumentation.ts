/**
 * Next.js instrumentation hook.
 * Boots Sentry for the right runtime (Node.js or Edge) when the server
 * starts. Also exports onRequestError so Sentry catches errors thrown
 * inside Server Components and Route Handlers.
 */
import * as Sentry from "@sentry/nextjs";

export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return;

  const commonOptions = {
    dsn,
    tracesSampleRate: 0.1,
    enabled: process.env.NODE_ENV === "production",
    debug: false,
  };

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init(commonOptions);
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init(commonOptions);
  }
}

export const onRequestError = Sentry.captureRequestError;
