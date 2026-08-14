# Prime Bodywork — outstanding to-do list

**Updated:** 2026-08-14. Consolidated list of everything left. Check items
off as they're done. Deep detail lives in the linked docs.

---

## ✅ DONE — Launched 2026-08-14

- [x] **Site live on `primebodywork.co.uk`** with valid HTTPS (Cloudflare
      Worker; nameservers moved GoDaddy → Cloudflare).
- [x] **Microsoft 365 email preserved** through the DNS migration (all
      MX/TXT/SRV/CNAME records carried over — see [DNS_BASELINE.md](DNS_BASELINE.md)).
- [x] **Resend domain verified**; sending from `noreply@primebodywork.co.uk`.
- [x] **Contact form works end-to-end** — verified with a live test
      submission (incl. photo) delivering to `eduard@primebodywork.co.uk`.
      Env wiring: the two `CONTACT_FORM_*` emails live in `wrangler.jsonc`
      `vars`; `RESEND_API_KEY` is a Cloudflare runtime **secret**;
      `keep_vars: true` preserves it across deploys.

## 🚀 Launch — DNS switch + Resend verification

Full runbook: [LAUNCH_PLAYBOOK.md](LAUNCH_PLAYBOOK.md).
Email is on **Microsoft 365** — preserve every record in
[DNS_BASELINE.md](DNS_BASELINE.md) or Eduard's email/Teams breaks.

- [x] **Phase 1** — domain added to Cloudflare, all M365 records imported/DNS-only.
- [x] **Phase 2** — Worker custom domains attached (apex + www).
- [x] **Phase 3** — Resend records added + domain verified; new API key created.
- [x] **Phase 4** — nameservers switched GoDaddy → Cloudflare.
- [x] **Phase 5** — env wired (vars in `wrangler.jsonc`, `RESEND_API_KEY` secret).
- [x] **Phase 6** — verified: HTTPS live, email intact, form test delivered.

### Post-launch cleanup worth doing
- [ ] Confirm the two **LAUNCH TEST** enquiries arrived in Eduard's inbox
      (one with a photo), then he can delete them.
- [ ] Remove the leftover `RESEND_API_KEY` / `CONTACT_FORM_*` entries from
      the Cloudflare **Build** variables card (they belong in runtime/config
      now — harmless but confusing).
- [ ] Revert the temporary diagnostic in `src/app/api/contact/route.ts`
      (commit `6c02526`) if you want the generic error back — it currently
      names which env var is missing (harmless, arguably useful).

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
