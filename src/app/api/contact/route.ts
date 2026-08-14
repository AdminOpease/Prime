/**
 * POST /api/contact
 *
 * Accepts multipart/form-data submissions from the ContactForm on /contact,
 * validates them, and forwards the enquiry via Resend with any uploaded
 * photos included as email attachments.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  buildEmailBodies,
  validateContactPayload,
} from "@/lib/contactEmail";

// OpenNext bundles all routes as one Node-compatible Worker.
// Node runtime keeps FormData + Buffer APIs available.
export const runtime = "nodejs";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB per file
const MAX_TOTAL_BYTES = 30 * 1024 * 1024; // 30 MB total attachment size

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v : undefined;
}

export async function POST(req: Request) {
  const apiKey = getEnv("RESEND_API_KEY");
  const to = getEnv("CONTACT_FORM_TO_EMAIL");
  const from = getEnv("CONTACT_FORM_FROM_EMAIL") ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    const missing = [
      !apiKey ? "RESEND_API_KEY" : null,
      !to ? "CONTACT_FORM_TO_EMAIL" : null,
    ]
      .filter(Boolean)
      .join(" and ");
    return NextResponse.json(
      {
        error: `Contact form is not configured. Missing: ${missing}.`,
      },
      { status: 500 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form submission." },
      { status: 400 },
    );
  }

  // Extract fields
  const getField = (k: string) => (form.get(k) ?? "").toString();
  const validation = validateContactPayload({
    name: getField("name"),
    phone: getField("phone"),
    email: getField("email"),
    registration: getField("registration"),
    driveable: getField("driveable"),
    workType: getField("workType"),
    damageLocations: form.getAll("damageLocation").map((v) => v.toString()),
    timescale: getField("timescale"),
    message: getField("message"),
    website: getField("website"),
  });

  if (!validation.ok) {
    if (validation.error === "__honeypot__") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Extract and validate photos
  const rawPhotos = form.getAll("photos").filter((p): p is File => p instanceof File);
  if (rawPhotos.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Please attach no more than ${MAX_FILES} photos.` },
      { status: 400 },
    );
  }
  let totalBytes = 0;
  for (const file of rawPhotos) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" is over 10 MB.` },
        { status: 400 },
      );
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: `"${file.name}" isn't an image.` },
        { status: 400 },
      );
    }
    totalBytes += file.size;
  }
  if (totalBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Total photo size is too large — please pick fewer or smaller images." },
      { status: 400 },
    );
  }

  // Convert Files → Resend attachments
  const attachments = await Promise.all(
    rawPhotos.map(async (file) => ({
      filename: sanitiseFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const { text, html } = buildEmailBodies(validation.value, rawPhotos.length);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Prime Bodywork website <${from}>`,
      to,
      subject: `Estimate request — ${validation.value.registration} — ${validation.value.name}`,
      text,
      html,
      replyTo: validation.value.email || undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
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

/** Strip anything unsafe from a browser-supplied filename. */
function sanitiseFilename(name: string): string {
  const safe = name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 120);
  return safe.length > 0 ? safe : "photo.jpg";
}
