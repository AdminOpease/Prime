# Prime Bodywork and Repair — Project Handover

Everything about the Prime Bodywork and Repair website — in one document.
Read this first if you're picking this project up (either yourself six
months from now, or a new developer).

**Last updated:** 2026-08-14
**Author:** Ozan (initial build)
**Owner (business):** Eduard, Prime Bodywork and Repair, Luton

---

## 1. What this is

A brochure website for **Prime Bodywork and Repair** — a specialist body
repair centre in Luton focused on:

- Van and fleet bodywork
- Accident damage, panel repairs, paintwork, bumper repairs
- End-of-hire and defleet preparation
- Insurance claims and private customer work

Target customers: delivery service partners (DSPs), fleet operators,
leasing companies, insurers, and private customers.

**Not** on offer (removed from earlier iterations): MOT, servicing,
mechanical repair, classic car restoration, prestige-specific service.

---

## 2. Live URLs

| Purpose | URL | Notes |
|---|---|---|
| Public website (temporary) | https://primebodywork.billowing-firefly-f15a.workers.dev | Cloudflare Workers preview URL. Works forever, publicly accessible. |
| Public website (final) | https://primebodywork.co.uk | Will point here after DNS switch (Phase 5 in `docs/LAUNCH_PLAYBOOK.md`) |
| Content editor (Sanity Studio) | https://primebodywork.sanity.studio | Owner-editable admin — bookmark this |
| Repo | https://github.com/AdminOpease/Prime | main branch auto-deploys |
| Owner cheatsheet | `docs/OWNER_CHEATSHEET.md` | Send to Eduard |
| Loom recording script | `docs/LOOM_SCRIPT.md` | For the walkthrough video |
| Launch playbook | `docs/LAUNCH_PLAYBOOK.md` | DNS + Resend cutover |

---

## 3. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, TypeScript, Tailwind CSS 4) | Modern SSR/SSG, great DX, easy hosting |
| Content management | **Sanity** (hosted Studio) | Free tier, owner-friendly UI, easy editable schemas |
| Rich text | @portabletext/react | Standard Sanity rendering |
| Email delivery | **Resend** | Simple API, generous free tier (3k/month), edge-friendly |
| Error tracking | **Sentry** | Standard, free tier covers a small site |
| Uptime monitoring | **UptimeRobot** | To be set up (Phase 3) |
| Hosting | **Cloudflare Workers** (via OpenNext adapter) | Free tier, no commercial-use restrictions |
| DNS | **GoDaddy** (will move to Cloudflare in Phase 5) | Owner already had domain here |
| Package manager | **pnpm** (pinned to 11.1.2 via `packageManager`) | Faster installs, saves disk |
| Node | 22+ | Required by dependencies |
| CI/CD | Cloudflare git integration on `main` branch | Auto-deploy on push |

---

## 4. Accounts — who owns what

**Important:** currently everything is registered under the developer's
(Ozan's) email accounts. Long-term these should transfer to Eduard.

| Service | Registered under | Ownership goal |
|---|---|---|
| GitHub repo | AdminOpease | Stay with dev |
| Cloudflare | Ozan's Cloudflare | Ideally transfer to Eduard, or invite him as member |
| Sanity | Ozan's Sanity (via GitHub) | Eduard invited as **Editor**; can promote to Owner later |
| Resend | admin@opease.co.uk | Transfer or add Eduard as team member; verify primebodywork.co.uk as sending domain |
| Sentry | Ozan's Sentry | Not critical for Eduard — just needs someone to receive alerts |
| UptimeRobot | Ozan's (once set up) | Same as Sentry |
| GoDaddy domain | Eduard | Already owned by him — good |

### Access notes

- **Sanity**: Eduard invited via email → he creates a Sanity account with
  `eduard@primebodywork.co.uk` → logs into `https://primebodywork.sanity.studio`
- **Resend**: currently only sends to `admin@opease.co.uk` because sandbox
  mode restricts sending to the account owner's email. To change: verify
  `primebodywork.co.uk` as a domain in Resend (needs DNS records at
  Cloudflare — see `docs/LAUNCH_PLAYBOOK.md`).

---

## 5. Local development

### Prerequisites
- macOS or Linux (Windows should work but not tested)
- Node 22+
- pnpm 11+
- Git

### One-time setup (fresh clone)

```bash
# Clone
git clone https://github.com/AdminOpease/Prime.git primebodywork
cd primebodywork

# Install deps
pnpm install

# Set up local env vars
# `.env.production` is committed (public NEXT_PUBLIC_* vars only).
# For the runtime secrets, create `.env.local`:
cat > .env.local <<EOF
NEXT_PUBLIC_SANITY_PROJECT_ID=8z0je8p3
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SENTRY_DSN=<paste from a working env>
RESEND_API_KEY=<create a new one in Resend, or copy>
CONTACT_FORM_TO_EMAIL=admin@opease.co.uk
EOF

# Start the dev server
pnpm dev
```

Open http://localhost:3000

**Note:** Sanity Studio is no longer embedded — it lives at
https://primebodywork.sanity.studio. Local dev does NOT run the Studio.

### Typecheck / lint

```bash
pnpm typecheck    # runs tsc --noEmit
pnpm lint         # runs ESLint
```

### Contact form testing locally

The form POSTs to `/api/contact` which sends via Resend. In sandbox mode
the email will only be delivered to the Resend account owner's email
(`admin@opease.co.uk`). Fill the form on `/contact`, submit, check that
inbox.

---

## 6. Deploy pipeline

- Push to `main` on GitHub → Cloudflare rebuilds automatically
- Build takes ~5–7 min
- Live at the workers.dev URL (and primebodywork.co.uk after DNS switch)

### Build command in Cloudflare
```bash
pnpm run build:cf
```
Which expands to:
```bash
rm -rf .next .open-next && next build --webpack && opennextjs-cloudflare build --skipNextBuild
```

**Why the `rm -rf`**: Cloudflare's build cache sometimes restores a stale
`.next/` directory. Wiping it every build guarantees a clean state.

**Why `--webpack` and `--skipNextBuild`**: Next.js 16 defaults to
Turbopack, which OpenNext doesn't yet fully understand. Forcing webpack
gives OpenNext the file layout it expects, and `--skipNextBuild` avoids
running `next build` twice.

### Deploy command in Cloudflare
```bash
pnpm run deploy:cf
```
Which expands to:
```bash
opennextjs-cloudflare deploy
```

### If the auto-deploy stops working

1. Check the **Deployments** tab in Cloudflare — is a build queued or
   failing?
2. If nothing appears when you push, the GitHub webhook may have
   disconnected:
   - Cloudflare → primebodywork project → Settings → Build → Git repository
   - Click **Connect / Reconnect**
   - You may need to grant Cloudflare's GitHub App access to
     `AdminOpease/Prime` at https://github.com/settings/installations
3. **Triggering a manual deploy**: Deployments tab → top-right
   **Create deployment** → pick `main` → Deploy
4. **Env vars missing after reconnect** — Cloudflare wipes env vars on
   reconnect. Restore them per §7.

---

## 7. Environment variables

Two categories:

### Public (safe to commit) — in `.env.production`

These are prefixed `NEXT_PUBLIC_*` which means Next.js bakes them into
the browser JS bundle at build time. Any user can see them by inspecting
the page. Safe to commit — checked into git.

- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `8z0je8p3`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2025-01-01`
- `NEXT_PUBLIC_SENTRY_DSN` = *(see .env.production or Sentry dashboard)*

### Secrets (never committed) — in Cloudflare + local `.env.local`

- `RESEND_API_KEY` — created in Resend dashboard, rotate before final launch
- `CONTACT_FORM_TO_EMAIL` — currently `admin@opease.co.uk` (sandbox),
  change to `eduard@primebodywork.co.uk` after Resend domain verification
- `CONTACT_FORM_FROM_EMAIL` — not set yet; add
  `noreply@primebodywork.co.uk` after domain is verified

**In Cloudflare Workers**, env vars must be added in the **Build**
section under Settings (there's ALSO a runtime "Variables and Secrets"
section at the top — that's separate and only used at request time). For
build-time NEXT_PUBLIC_* vars, use the Build section.

We currently rely on the committed `.env.production` because Cloudflare's
env-var-to-build injection was flaky.

---

## 8. Content model

All content is editable in Sanity Studio at
`https://primebodywork.sanity.studio`. Schemas defined in
`src/sanity/schemas/`.

| Schema | Type | Purpose |
|---|---|---|
| `siteSettings` | singleton | Business name, tagline, logo, phone, email, address, opening hours, social links, map embed URL |
| `homepage` | singleton | Hero headline/subhead, hero image, CTAs, USPs, featured services, SEO |
| `service` | multiple | The 4 services (Bodywork, Van & Fleet, Defleet, Insurance & Private). Each has title, slug, category, short description, body, hero image, price from, featured flag, display order |
| `galleryItem` | multiple | Before/after image pairs, optional service reference, caption |
| `testimonial` | multiple | Customer name, quote, rating, photo, date, "show on homepage" flag |
| `accreditation` | multiple | Logo, name, optional link (BS10125, Good Garage Scheme, etc.) — empty until Eduard supplies them |
| `page` | multiple | Generic content pages (About, Insurance Claims etc.). About page uses this via slug lookup |

Singletons (Site Settings, Homepage) are pinned at top of Studio and
cannot be duplicated or deleted (enforced in `sanity.config.ts`).

---

## 9. Common tasks

### Update copy on any static page
Edit the relevant file in `src/app/<page>/page.tsx`, push to `main`.

### Update a service
Edit `src/lib/servicePlaceholders.ts` (fallback when Sanity is empty), OR
have Eduard edit in Sanity Studio (production-recommended).

### Change colours / typography
`src/app/globals.css` — all design tokens as CSS custom properties.
Brand colours derived from the logo:
- `--color-primary` = `#1e3a8a` (royal blue from car silhouette)
- `--color-accent` = `#dc2626` (red from PRIME wordmark)
- `--color-warm` = `#f59e0b` (gold/amber from strapline)

### Add a new page (e.g. an FAQ)
1. Create `src/app/faq/page.tsx` following the pattern of an existing
   page like `src/app/about/page.tsx`
2. If content should be editable, use `getPageBySlug('faq')` — Eduard can
   create the page in Sanity → Pages → +Create with slug `faq`
3. Add to Header nav in `src/components/Header.tsx` `navItems` array
4. Add to Footer quick links if appropriate

### Rotate the Resend API key
1. Resend dashboard → API Keys → Delete the old key
2. Create new key → name `primebodywork-<date>` → Sending access
3. Update Cloudflare env var `RESEND_API_KEY` (in BOTH Build and Runtime
   variables sections)
4. Update your local `.env.local`
5. Trigger a new deployment

### Change the logo
- **Option A (owner-controlled, recommended long-term)**: Eduard uploads
  a new logo in Sanity Studio → Site Settings → Branding → Logo. Live
  site picks it up automatically (no code change).
- **Option B (repo-controlled)**: Replace `public/logo.png` with the new
  file (same filename, all-lowercase). Commit and push.

---

## 10. Project structure

```
primebodywork/
├── .env.production           ← Committed public NEXT_PUBLIC_* vars
├── .env.local                ← Gitignored, has secrets (local only)
├── .env.example              ← Committed template
├── wrangler.jsonc            ← Cloudflare Worker config for OpenNext
├── open-next.config.ts       ← OpenNext adapter config
├── next.config.ts            ← Next.js config (output: standalone, images, Sentry)
├── sanity.config.ts          ← Studio config (used by `sanity deploy`)
├── sanity.cli.ts             ← Sanity CLI config
├── package.json              ← All scripts and dependencies
├── pnpm-workspace.yaml       ← pnpm v10/v11 compat + build script approvals
├── instrumentation.ts        ← Sentry server-side init
├── instrumentation-client.ts ← Sentry client-side init
├── public/
│   └── logo.png              ← Real logo image
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← Root layout with metadata, header, footer
│   │   ├── page.tsx          ← Homepage (composes HomeHero, TrustStrip, etc.)
│   │   ├── globals.css       ← Design tokens
│   │   ├── global-error.tsx  ← Top-level error boundary
│   │   ├── not-found.tsx     ← 404 page
│   │   ├── services/
│   │   │   ├── page.tsx      ← Services index
│   │   │   └── [slug]/page.tsx   ← Service detail (uses generateStaticParams)
│   │   ├── gallery/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── api/contact/route.ts  ← POST handler for contact form
│   ├── components/
│   │   ├── Header.tsx, Footer.tsx, Logo.tsx
│   │   ├── HomeHero.tsx, TrustStrip.tsx, ServicesGrid.tsx
│   │   ├── InsuranceCta.tsx, ProcessSteps.tsx, TestimonialsSection.tsx
│   │   ├── ServiceCard.tsx, ServicePlaceholderImage.tsx
│   │   ├── PageHero.tsx, Container.tsx, Button.tsx
│   │   ├── SanityImage.tsx, PortableText.tsx
│   │   └── ContactForm.tsx   ← The big estimate form
│   ├── sanity/
│   │   ├── env.ts            ← Env var validation (throws at build if missing)
│   │   ├── client.ts         ← Read client for frontend
│   │   ├── image.ts          ← urlFor helper for Sanity image URLs
│   │   ├── data.ts           ← Cached data fetchers + fallback data
│   │   ├── queries.ts        ← GROQ queries
│   │   ├── types.ts          ← Hand-written TypeScript types
│   │   ├── structure.ts      ← Studio sidebar layout
│   │   └── schemas/          ← All 7 content schemas
│   └── lib/
│       ├── servicePlaceholders.ts   ← Fallback service content
│       └── contactEmail.ts   ← Form validation + email template
└── docs/
    ├── PRIME_HANDOVER.md     ← This file
    ├── OWNER_CHEATSHEET.md   ← For Eduard
    ├── LOOM_SCRIPT.md        ← For recording the walkthrough
    └── LAUNCH_PLAYBOOK.md    ← DNS switch runbook
```

---

## 11. Current status

### ✅ Done
- All 4 services with placeholder content and branded placeholder images
- About page with owner-supplied "commercial vans specialist" copy
- Contact form: name, phone, email, registration, work type, damage
  location, up to 5 photos, driveable, timescale
- Contact form → Resend → email delivery working (in sandbox mode)
- Sanity Studio deployed at `primebodywork.sanity.studio`, Eduard invited
- Real logo (1672x941 PNG) in header and footer
- Live on Cloudflare Workers at
  `primebodywork.billowing-firefly-f15a.workers.dev`
- All stale references to MOT/servicing/classic/prestige/Insurance Claims
  page purged

### 🟡 Pending (see LAUNCH_PLAYBOOK.md)
- **UptimeRobot monitor** — 2 min setup. Add HTTPS monitor for
  primebodywork.co.uk (after DNS switch) or workers.dev URL (immediately)
- **Sentry test error** — 3 min. Verify capture works by triggering a
  test error on production and confirming Sentry logs it
- **DNS switch** — point primebodywork.co.uk at Cloudflare Workers
- **Resend domain verification** — verify primebodywork.co.uk so emails
  can go to `eduard@primebodywork.co.uk` from `noreply@primebodywork.co.uk`
- **Env var swap** — update `CONTACT_FORM_TO_EMAIL` to Eduard's email
  after Resend verification
- **Loom walkthrough** — record using `docs/LOOM_SCRIPT.md`, share URL
  with Eduard
- **Rotate Resend API key one more time** before going live (see §9)

### ⏳ Owner tasks
- Upload real workshop photos into Sanity → Site Settings → Homepage
  hero image, Services → each service hero image
- Upload before/after gallery photos as jobs come through the workshop
- Add any accreditations (BS10125, Good Garage Scheme, IMI, ATA, etc.)
- Add real customer testimonials pulled from Google Reviews
- Optional: replace hardcoded About page copy with a Sanity `page` doc
  with slug `about` — code already checks for this

---

## 12. Costs (as of handover)

At current traffic all providers are **free**:

| Service | Free tier | Where paid starts |
|---|---|---|
| Cloudflare Workers | 100k requests/day | If site gets big — realistically not for a local garage |
| Sanity | 3 users, 10GB storage, unlimited docs | Only if content or team grows past thresholds |
| Resend | 3,000 emails/month, 1 verified domain | Owner won't hit this |
| Sentry | 5,000 errors/month (Developer plan) | Only if the site is buggy — shouldn't happen |
| UptimeRobot | 50 monitors free | We only need 1 |
| GitHub | Free for private repos | N/A |
| GoDaddy | ~£15/year domain renewal | Ongoing |

**Total ongoing cost:** ~£15/year (the domain).

---

## 13. Known quirks and gotchas

1. **Cloudflare has two "Variables and Secrets" sections** in Settings.
   The top one is runtime-only. The one nested under "Build" is used at
   build time. NEXT_PUBLIC_* vars need the Build one. We work around this
   by committing `.env.production` with public vars.

2. **Cloudflare build cache can serve stale output**. Our `build:cf`
   script prepends `rm -rf .next .open-next` to guarantee a clean build.
   Don't remove that — it prevents 20MB worker size issues from stale
   Sanity Studio code that used to be embedded.

3. **`sanity deploy` leaves `.sanity/` and `dist/` folders** in the repo
   after running. Both are gitignored. Don't commit them.

4. **Turbopack vs Webpack**: Next.js 16 defaults to Turbopack but
   OpenNext (Cloudflare adapter) needs webpack output. Our `build:cf`
   forces `--webpack`. Don't switch back to Turbopack for production
   builds until OpenNext supports it fully.

5. **Sentry disabled in dev**: `instrumentation.ts` and
   `instrumentation-client.ts` set `enabled: process.env.NODE_ENV === "production"`
   so local dev doesn't pollute Sentry. Errors only reach Sentry from
   production.

6. **Resend sandbox mode**: until `primebodywork.co.uk` is verified in
   Resend, emails only deliver to `admin@opease.co.uk`. Any other value
   in `CONTACT_FORM_TO_EMAIL` will silently 403.

7. **The `HAS_LOGO_FILE` flag in `Logo.tsx`**: this is a compile-time
   boolean. If you remove `public/logo.png`, flip this to `false` or
   the site shows a broken image.

---

## 14. If something breaks

1. **Site returns 500 / broken page**: check Sentry for the error, then
   check the Cloudflare Deployments tab for a failed rebuild
2. **Site is completely down**: check Cloudflare Workers status page,
   then check the Deployments tab. Rolling back is possible — click any
   previous successful deployment and choose "Rollback to this deployment"
3. **Contact form isn't sending**: check Cloudflare env vars, check
   Resend dashboard for delivery attempts, check the RESEND_API_KEY is
   still valid
4. **Owner can't log into Sanity**: check the Sanity project members
   page, confirm his email invite was accepted
5. **DNS problems**: `dig primebodywork.co.uk NS` shows nameservers,
   `dig primebodywork.co.uk` shows the IP resolution

---

## 15. Contacts

- **Developer**: Ozan (`ozan.ulasan98@gmail.com` / `admin@opease.co.uk`)
- **Business owner**: Eduard (`eduard@primebodywork.co.uk`)
- **Sanity support**: help.sanity.io
- **Cloudflare support**: dash.cloudflare.com/support
- **Resend support**: resend.com/help

---

*End of handover.*
