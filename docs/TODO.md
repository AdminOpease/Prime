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
- [x] Reverted the temporary "which env var is missing" diagnostic in the
      contact route back to a generic message.

## 🔒 Security follow-ups

- [x] Baseline HTTP security headers (X-Frame-Options, nosniff,
      Referrer-Policy, Permissions-Policy, HSTS) — shipped.
- [x] **Turnstile bot protection on `/api/contact`** — live and verified
      (tokenless requests blocked; real browser submissions pass). Site key
      in `.env.production`, `TURNSTILE_SECRET_KEY` a Cloudflare runtime secret.
- [x] **WAF rate-limit rule** — live: Block on `/api/contact` POST, 1 req /
      10s per IP (free-plan window). Verified triggering (429). NOTE: was
      first mis-created as a *Custom rule* w/ Managed Challenge, which broke
      the AJAX form — replaced with a proper Rate limiting rule. Consider
      relaxing to ~3-5/10s for retry / shared-IP (NAT) headroom.
- [x] **Content-Security-Policy** — live and enforcing. Verified in
      Report-Only mode first (no violations for Turnstile / Sanity / Next
      hydration), then switched on. Locks sources to self + Turnstile
      (challenges.cloudflare.com), Sanity CDN, and an optional Google Maps
      embed; object-src none, base-uri/form-action self, frame-ancestors self.
- [x] (Hygiene) Checked: `sanity` + `@sanity/vision` are already
      devDependencies. The audit vulns come *transitively* via `next-sanity`
      (core dep) pulling in Sanity's CLI — build-time only, never shipped to
      the Worker, and not removable without replacing next-sanity. No safe
      action helps; `pnpm update` for patch bumps is an optional future tidy.

## 📝 Content (owner / async)

- [ ] Upload real gallery photos (before/after) + workshop shots in Sanity.
- [ ] Any accreditations to add (About page auto-shows them when present).
- [ ] Confirm privacy-policy specifics: data retention (currently 24
      months) and the "no analytics/cookies" statement (true today).
- [x] UK Ltd company disclosure added (footer + privacy policy): Prime
      Bodywork and Repair Ltd, company no. 16355152, England & Wales,
      registered office 48 Box Crescent, Houghton Regis, Dunstable, LU5 7AH.
- [ ] VAT: not registered today — if you register later, add the VAT number
      to the footer disclosure (one-line change).
- [x] Draft **Terms & Conditions** added at /terms (footer link): estimates
      vs quotes, payment & lien, storage, abandoned-vehicle disposal (Torts
      Act 1977), parts & workmanship, liability limits — CRA 2015 preserved.
      Owner-confirmed: storage grace **1 week**, storage **£30/day**, disposal
      **3 months** (legally advised minimum — 1 week would risk a conversion
      claim), **no fixed parts warranty** (confirmed per job), **no fixed
      workmanship period** ("we stand behind our work"). STILL A DRAFT — have
      a solicitor review before relying on it.

## 📋 Post-launch

- [ ] Update the UptimeRobot monitor URL → `https://primebodywork.co.uk`
      (this is now the primary up/down alerting — do this one).
- [x] Sentry verified: **client-side capture WORKS** (browser errors reach
      Sentry — test error tagged `__sentry_captured__`, no CSP block).
      **Server-side capture does NOT work on Cloudflare Workers**
      (`@sentry/nextjs` Node SDK doesn't run on workerd) — accepted as a
      known gap. Monitoring = client-side Sentry + UptimeRobot. Optional
      future: wire `@sentry/cloudflare` for server-side capture.
- [ ] Send Eduard the [OWNER_CHEATSHEET.md](OWNER_CHEATSHEET.md).
- [ ] Record + send the Loom walkthrough ([LOOM_SCRIPT.md](LOOM_SCRIPT.md)).
- [ ] Consider transferring Cloudflare / Sanity / Resend ownership to Eduard.
