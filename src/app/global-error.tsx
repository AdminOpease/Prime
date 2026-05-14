"use client";

/**
 * Top-level error boundary for the App Router.
 * Catches errors that bubble up past every route's error boundary, reports
 * them to Sentry, and shows a graceful fallback page (still wrapped in
 * <html>/<body> since this replaces the root layout when triggered).
 */
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "4rem 1.5rem",
          fontFamily:
            "-apple-system, system-ui, BlinkMacSystemFont, Segoe UI, sans-serif",
          background: "#f5f5f4",
          color: "#1c1917",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.15em",
              color: "#f59e0b",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Something broke
          </p>
          <h1
            style={{
              fontSize: 32,
              margin: "8px 0 16px",
              letterSpacing: "-0.025em",
            }}
          >
            We&apos;re fixing it
          </h1>
          <p style={{ color: "#57534e", lineHeight: 1.5 }}>
            Sorry — an unexpected error has been logged and we&apos;ve been
            notified. Please try again in a minute, or call us if you need
            help right away.
          </p>
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "12px 24px",
              borderRadius: 6,
              background: "#f59e0b",
              color: "#1c1917",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to homepage
          </a>
        </div>
      </body>
    </html>
  );
}
