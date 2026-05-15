/**
 * POST /api/contact
 *
 * Receives contact-form submissions, validates them, and forwards via Resend.
 * Replies on success with { ok: true }, on failure with { error: string }.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildEmailBodies,
  validateContactPayload,
} from "@/lib/contactEmail";

// We deploy via OpenNext + Cloudflare Workers (not the older Pages edge
// adapter), so Node runtime is correct — the Worker has nodejs_compat
// enabled in wrangler.jsonc.
export const runtime = "nodejs";

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v : undefined;
}

export async function POST(req: Request) {
  const apiKey = getEnv("RESEND_API_KEY");
  const to = getEnv("CONTACT_FORM_TO_EMAIL");
  // Resend's sandbox sender — works on free tier without a verified domain.
  // Once primebodywork.co.uk's DNS is at Cloudflare we'll verify the domain
  // in Resend and switch this to noreply@primebodywork.co.uk.
  const from = getEnv("CONTACT_FORM_FROM_EMAIL") ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured. (RESEND_API_KEY or CONTACT_FORM_TO_EMAIL missing.)",
      },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validateContactPayload(body);
  if (!result.ok) {
    // Honeypot triggered → pretend success so bots don't learn anything.
    if (result.error === "__honeypot__") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { text, html } = buildEmailBodies(result.value);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Prime Bodywork website <${from}>`,
      to,
      subject: `New enquiry from ${result.value.name}`,
      text,
      html,
      replyTo: result.value.email || undefined,
    });

    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json(
        { error: "Could not send the message. Please call us instead." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route threw:", err);
    return NextResponse.json(
      { error: "Could not send the message. Please call us instead." },
      { status: 500 },
    );
  }
}
