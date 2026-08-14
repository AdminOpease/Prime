# Prime Bodywork — outstanding to-do list

**Updated:** 2026-08-14. Consolidated list of everything left. Check items
off as they're done. Deep detail lives in the linked docs.

---

## 🔴 Critical / do first

- [ ] **Contact form is broken in production** — the Cloudflare Worker is
      missing its runtime secrets, so every submission 500s.
      Fix: Cloudflare → Worker → **Settings → Variables and Secrets** (the
      **runtime** section, NOT Build) → add:
  - `RESEND_API_KEY` = *(value from `.env.local` — paste in Cloudflare, never in chat)*
  - `CONTACT_FORM_TO_EMAIL` = `admin@opease.co.uk` *(sandbox, until domain verified)*
      Then redeploy.
      *Note: superseded once the launch (below) is done — at that point the
      key is replaced with the new one and the TO address becomes
      `eduard@primebodywork.co.uk`. If launching straight away, skip the
      interim sandbox value.*

## 🚀 Launch — DNS switch + Resend verification

Full runbook: [LAUNCH_PLAYBOOK.md](LAUNCH_PLAYBOOK.md).
Email is on **Microsoft 365** — preserve every record in
[DNS_BASELINE.md](DNS_BASELINE.md) or Eduard's email/Teams breaks.

- [ ] **Phase 1** — Cloudflare → Add a site → `primebodywork.co.uk` (Free).
      Verify all 9 M365 records imported (scan often misses the 2 SRV +
      `lyncdiscover`/`sip` CNAMEs). Set every record to **DNS only**.
      **Do NOT switch nameservers yet.**
- [ ] **Phase 2** — Attach Worker: Workers & Pages → primebodywork →
      Domains → add `primebodywork.co.uk` and `www.primebodywork.co.uk`.
- [ ] **Phase 3** — Resend → Domains → add `primebodywork.co.uk` → add its
      `send` MX + 2 TXT records in Cloudflare (DNS only). Create the **new
      Resend API key**.
- [ ] **Phase 4** — GoDaddy → Change Nameservers → the 2 Cloudflare
      nameservers. *(Only after Phase 1 records are confirmed.)*
- [ ] **Phase 5** — Cloudflare runtime env vars:
      `RESEND_API_KEY` = new key · `CONTACT_FORM_TO_EMAIL` =
      `eduard@primebodywork.co.uk` · `CONTACT_FORM_FROM_EMAIL` =
      `noreply@primebodywork.co.uk` → redeploy.
- [ ] **Phase 6** — Verify (Claude can help): `dig` confirms M365 email
      records survived + Cloudflare authoritative; site loads on real
      domain with HTTPS; Resend shows green ticks; test form submission
      lands in Eduard's inbox with photo attached.

## 🔒 Security follow-ups

- [x] Baseline HTTP security headers (X-Frame-Options, nosniff,
      Referrer-Policy, Permissions-Policy, HSTS) — shipped.
- [ ] **Rate limiting on `/api/contact`** — only a honeypot today; spam can
      burn the Resend quota + flood the inbox. Options: **Cloudflare
      Turnstile** (free CAPTCHA — needs a site key + secret key from the
      Cloudflare Turnstile dashboard; Claude can wire it into the form once
      keys exist) OR a Cloudflare WAF rate-limit rule on that path.
- [ ] **Content-Security-Policy** — deferred; needs testing against Sanity
      images / Sentry tunnel / Next hydration so it doesn't break the page.
- [ ] (Hygiene) Dependency vulns are all in Sanity CLI **build-time**
      tooling, not shipped to the Worker. Consider moving `sanity` to
      devDependencies and periodic `pnpm update`.

## 📝 Content (owner / async)

- [ ] Upload real gallery photos (before/after) + workshop shots in Sanity.
- [ ] Any accreditations to add (About page auto-shows them when present).
- [ ] Confirm privacy-policy specifics: data retention (currently 24
      months) and the "no analytics/cookies" statement (true today).

## 📋 Post-launch

- [ ] Update the UptimeRobot monitor URL → `https://primebodywork.co.uk`.
- [ ] Sentry test error to confirm alerting works.
- [ ] Send Eduard the [OWNER_CHEATSHEET.md](OWNER_CHEATSHEET.md).
- [ ] Record + send the Loom walkthrough ([LOOM_SCRIPT.md](LOOM_SCRIPT.md)).
- [ ] Consider transferring Cloudflare / Sanity / Resend ownership to Eduard.
