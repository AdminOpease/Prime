/**
 * TEMPORARY — Sentry verification endpoint.
 *
 * Hitting `/api/sentry-test?run=1` throws a deliberate error so we can
 * confirm Sentry captures server-side errors and fires an alert email.
 * Gated behind ?run=1 so crawlers hitting the bare path don't spam Sentry.
 *
 * DELETE THIS FILE once alerting is verified.
 */
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("run") !== "1") {
    return NextResponse.json({
      ok: true,
      note: "Add ?run=1 to trigger a deliberate test error (Sentry check).",
    });
  }
  throw new Error(
    "Sentry test error — deliberate, triggered during launch verification.",
  );
}
