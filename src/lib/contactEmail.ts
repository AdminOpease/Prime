/**
 * Shape and validation for the repair-estimate contact form.
 * Extracted so both the API route and tests can share the exact rules.
 */

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  registration: string;
  driveable: "Yes" | "No";
  workType: string;
  damageLocations: string[];
  timescale: string;
  message?: string;
};

export type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; error: string };

const WORK_TYPES = new Set([
  "Accident / body damage",
  "Dent or scratch repair",
  "Bumper repair",
  "Paintwork",
  "Fleet repair",
  "End-of-hire / defleet preparation",
  "Insurance claim",
  "Other",
]);

const DAMAGE_LOCATIONS = new Set([
  "Front",
  "Rear",
  "Driver side",
  "Passenger side",
  "Roof",
  "Multiple areas",
]);

const TIMESCALES = new Set([
  "Urgent",
  "Within 7 days",
  "Within 30 days",
  "Flexible",
]);

/**
 * Validate a decoded FormData payload.
 * The API route hands us plain values pulled out of the FormData object;
 * this function only checks correctness — no file handling here.
 */
export function validateContactPayload(input: {
  name: string;
  phone: string;
  email?: string;
  registration: string;
  driveable: string;
  workType: string;
  damageLocations: string[];
  timescale: string;
  message?: string;
  website?: string; // honeypot
}): ValidationResult {
  // Honeypot: any bot filling this triggers a silent drop.
  if (input.website && input.website.trim() !== "") {
    return { ok: false, error: "__honeypot__" };
  }

  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = (input.email ?? "").trim();
  const registration = input.registration.trim().toUpperCase();
  const driveable = input.driveable.trim();
  const workType = input.workType.trim();
  const damageLocations = input.damageLocations
    .map((l) => l.trim())
    .filter(Boolean);
  const timescale = input.timescale.trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Please enter your name." };
  }
  if (phone.length < 6 || phone.length > 40) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (registration.length < 2 || registration.length > 20) {
    return { ok: false, error: "Please enter the vehicle registration." };
  }
  if (driveable !== "Yes" && driveable !== "No") {
    return { ok: false, error: "Please say whether the vehicle is driveable." };
  }
  if (!WORK_TYPES.has(workType)) {
    return { ok: false, error: "Please pick a type of work." };
  }
  if (damageLocations.length === 0) {
    return { ok: false, error: "Please tick at least one damage location." };
  }
  for (const loc of damageLocations) {
    if (!DAMAGE_LOCATIONS.has(loc)) {
      return { ok: false, error: "Unknown damage location submitted." };
    }
  }
  if (!TIMESCALES.has(timescale)) {
    return { ok: false, error: "Please pick a preferred timescale." };
  }
  if (message.length > 4000) {
    return { ok: false, error: "Message is too long." };
  }

  return {
    ok: true,
    value: {
      name,
      phone,
      email: email || undefined,
      registration,
      driveable: driveable as "Yes" | "No",
      workType,
      damageLocations,
      timescale,
      message: message || undefined,
    },
  };
}

/** HTML and plain-text bodies for the notification email. */
export function buildEmailBodies(
  payload: ContactPayload,
  photoCount: number,
) {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email ?? "—"],
    ["Registration", payload.registration],
    ["Driveable", payload.driveable],
    ["Work type", payload.workType],
    ["Damage location", payload.damageLocations.join(", ")],
    ["Timescale", payload.timescale],
    ["Photos attached", String(photoCount)],
  ];

  const text =
    `New estimate request from ${payload.name}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (payload.message ? `\n\nAdditional details:\n${payload.message}\n` : "\n");

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 640px; padding: 20px;">
      <h2 style="margin: 0 0 16px;">New estimate request via primebodywork.co.uk</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #57534e; vertical-align: top; width: 180px;"><strong>${k}</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        payload.message
          ? `
        <h3 style="margin: 24px 0 8px;">Additional details</h3>
        <div style="white-space: pre-wrap; line-height: 1.5; padding: 12px; background: #f5f5f4; border-radius: 8px;">
          ${escapeHtml(payload.message)}
        </div>
      `
          : ""
      }
      <p style="margin-top: 24px; color: #57534e; font-size: 13px;">
        Reply directly to this email to respond to the customer.
      </p>
    </div>
  `;

  return { text, html };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
