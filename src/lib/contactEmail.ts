/**
 * Shape and validation for contact form submissions.
 * Kept in /lib so both the API route and any future tests can share it.
 */

export type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  vehicle?: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; error: string };

/**
 * Trims, length-caps, and validates the raw form data.
 * Rejects rather than silently truncating so the user knows their message
 * didn't go through.
 */
export function validateContactPayload(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Invalid request body." };
  }
  const obj = input as Record<string, unknown>;

  // Honeypot: must be empty. If a bot filled it, drop the request silently
  // by returning a fake success — keeps spam off, no error feedback for bots.
  if (typeof obj.website === "string" && obj.website.trim() !== "") {
    return { ok: false, error: "__honeypot__" };
  }

  const name = (obj.name ?? "").toString().trim();
  const phone = (obj.phone ?? "").toString().trim();
  const email = (obj.email ?? "").toString().trim();
  const vehicle = (obj.vehicle ?? "").toString().trim();
  const message = (obj.message ?? "").toString().trim();

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Please enter your name." };
  }
  if (phone.length < 6 || phone.length > 40) {
    return { ok: false, error: "Please enter a valid phone number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (vehicle.length > 200) {
    return { ok: false, error: "Vehicle field is too long." };
  }
  if (message.length < 5 || message.length > 4000) {
    return { ok: false, error: "Please tell us a bit about what you need." };
  }

  return {
    ok: true,
    value: {
      name,
      phone,
      email: email || undefined,
      vehicle: vehicle || undefined,
      message,
    },
  };
}

/** HTML and plain-text bodies for the notification email. */
export function buildEmailBodies(payload: ContactPayload) {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email ?? "—"],
    ["Vehicle", payload.vehicle ?? "—"],
  ];

  const text =
    `New enquiry from ${payload.name}\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${payload.message}\n`;

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; padding: 20px;">
      <h2 style="margin: 0 0 16px;">New enquiry via primebodywork.co.uk</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 8px 12px 8px 0; color: #57534e; vertical-align: top;"><strong>${k}</strong></td>
            <td style="padding: 8px 0;">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin: 24px 0 8px;">Message</h3>
      <div style="white-space: pre-wrap; line-height: 1.5; padding: 12px; background: #f5f5f4; border-radius: 8px;">
        ${escapeHtml(payload.message)}
      </div>
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
