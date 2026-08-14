# Session handover — for the next Claude session

Read this in full before doing anything. It gets you from cold to
productive in ~2 minutes.

**Last updated:** 2026-08-14, mid-launch
**Repo:** `/Users/ozanulasan/Projects/primebodywork` on `main`
**Latest commit:** `8c3369d` (docs: master project handover doc)

---

## Where things are RIGHT NOW

- **Site is live** on the Cloudflare workers.dev preview URL —
  `https://primebodywork.billowing-firefly-f15a.workers.dev/`
- **Sanity Studio is deployed** at `https://primebodywork.sanity.studio`
- **Latest content changes are already pushed** — Cloudflare is either
  currently rebuilding or has just finished (check Deployments tab)
- **The real domain `primebodywork.co.uk` is NOT yet pointed** at
  Cloudflare — still on GoDaddy's default
- **Contact form email currently lands at `admin@opease.co.uk`** in
  Cloudflare env (Resend sandbox limits this until domain verified)

### Verify state before doing anything

```bash
# 1. Is site up and serving latest content?
curl -s -o /dev/null -w "HTTP %{http_code}\n" \
  https://primebodywork.billowing-firefly-f15a.workers.dev/

curl -s https://primebodywork.billowing-firefly-f15a.workers.dev/ | \
  grep -oE "Van & fleet bodywork|done properly" | head -3
# Should show both strings if latest build is live

# 2. Git in sync?
cd ~/Projects/primebodywork && git status && git log --oneline -3
```

---

## What we just did this session

The user gave a 9-item redesign brief. We executed:

1. Replaced 6 old services with 4 new ones: **Bodywork & Accident
   Repair**, **Van & Fleet Repairs**, **End-of-Hire & Defleet**,
   **Insurance & Private Work** (in that order)
2. Rewrote About page copy verbatim from owner's supplied text
3. Renamed all CTAs from "Get a quote" to "Get a repair estimate"
4. Rebuilt ContactForm with the owner's exact field spec: reg, work
   type, damage location, up to 5 photos, driveable, timescale
5. Added new landscape logo (`public/logo.png`, 1672×941)
6. Deployed Sanity Studio at `primebodywork.sanity.studio`
7. Did a big cleanup pass to purge stale references (Insurance Claims
   page, "Classic & prestige" trust badge, MOT/servicing/mechanical
   mentions in copy — user found these on second look and asked us to
   hunt them all)
8. Wrote 4 documentation files in `docs/`:
   - `PRIME_HANDOVER.md` (comprehensive project doc)
   - `OWNER_CHEATSHEET.md` (for Eduard)
   - `LOOM_SCRIPT.md` (recording script)
   - `LAUNCH_PLAYBOOK.md` (DNS switch runbook)
   - `SESSION_HANDOVER.md` (this file)

---

## What's pending

In priority order (aim for smallest → biggest):

1. **UptimeRobot monitor** (~2 min) — add HTTPS monitor for the
   workers.dev URL. Owner already has an UptimeRobot account.
2. **Sentry test error** (~3 min) — trigger a deliberate error on
   production to verify Sentry captures it and sends the alert email.
3. **DNS switch to `primebodywork.co.uk`** (~30 min active + up to 24hr
   propagation) — full runbook in `docs/LAUNCH_PLAYBOOK.md`. Involves:
   - Add primebodywork.co.uk + www as custom domains in Cloudflare Worker
   - Switch nameservers at GoDaddy → Cloudflare (recommended)
   - Verify domain in Resend via DNS records
   - Update `CONTACT_FORM_TO_EMAIL` env var to `eduard@primebodywork.co.uk`
   - Add `CONTACT_FORM_FROM_EMAIL=noreply@primebodywork.co.uk`
   - Trigger redeploy
   - Update UptimeRobot to point at real domain
4. **Rotate Resend API key** one final time (see §9 of PRIME_HANDOVER)
5. **Record Loom walkthrough** using `docs/LOOM_SCRIPT.md`
6. **Send `docs/OWNER_CHEATSHEET.md`** to Eduard

Owner is doing async:
- Uploading real photos into Sanity (workshop, before/after)
- Digging up any accreditations to add

---

## Critical context to know

### The user's mood
User says "I need this out as soon as possible" repeatedly. Be
efficient. Skip long explanations unless asked. Batch changes into
single commits.

### Cloudflare gotchas (learned the hard way this session)
- There are **TWO "Variables and Secrets" sections** in Cloudflare
  Settings — runtime (top) and Build (nested under Build heading).
  NEXT_PUBLIC_* vars need Build. We worked around this by committing
  `.env.production` with public vars.
- Cloudflare's **build cache serves stale `.next/`** sometimes. Our
  `build:cf` script starts with `rm -rf .next .open-next` to prevent
  this. Do NOT remove that.
- Cloudflare's **GitHub integration disconnected** once mid-session.
  If deploys stop triggering on push: Settings → Build → Git repository
  → Reconnect. Then re-add ALL env vars — they get wiped on reconnect.
- **Build command MUST be `pnpm run build:cf`**, deploy must be
  `pnpm run deploy:cf`. Defaults will fail.

### Resend sandbox limitation
- Only sends to `admin@opease.co.uk` (Resend account owner's verified
  email). Any other value in `CONTACT_FORM_TO_EMAIL` will 403 silently.
- User at one point set `CONTACT_FORM_TO_EMAIL=ulozltd@gmail.com`
  which broke the form. Check the current value before assuming form
  works.
- Fixes when domain is verified in Resend post-DNS switch.

### The logo
- Currently `public/logo.png` = the landscape 1672×941 PNG (replaced
  earlier square 1024x1024 version)
- Has transparent background — works on light and dark
- Header renders it at `h-11` (44px tall). If user says it looks
  small, bump to `h-14` or `h-16` in `src/components/Logo.tsx`

### Content strategy shift
The site went through TWO positioning changes this session:
1. First: garage doing bodywork + MOT + servicing + classic + prestige + fleet
2. Then: SPECIALIST body repair centre focused on **commercial vans,
   fleet, DSPs, defleet + insurance**. No MOT, no servicing, no
   mechanical, no classic, no prestige.

If user asks for anything mentioning MOT/servicing/mechanical/classic/
prestige — that's the OLD positioning. Push back or clarify.

---

## The stack (30-second version)

- **Next.js 16** (App Router, TS, Tailwind 4)
- **Sanity** for content (Studio hosted at sanity.studio)
- **Resend** for contact form emails
- **Sentry** for errors (production only)
- **Cloudflare Workers** via **OpenNext** adapter for hosting
- **pnpm 11** pinned via packageManager
- Deploy via `git push` to `main`

---

## Quick task recipes

### Trigger a manual redeploy (webhook may be flaky)
```bash
cd ~/Projects/primebodywork
git commit --allow-empty -m "chore: trigger rebuild"
git push
# Or via Cloudflare UI: Deployments tab → Create deployment → main
```

### Check what's currently on the live URL
```bash
URL="https://primebodywork.billowing-firefly-f15a.workers.dev"
for p in / /services /services/bodywork-accident-repair \
         /services/van-fleet-repairs /services/end-of-hire-defleet \
         /services/insurance-private-work /gallery /about /contact; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' $URL$p)  $p"
done
```

### Send a test contact form submission
```bash
curl -X POST https://primebodywork.billowing-firefly-f15a.workers.dev/api/contact \
  -F "name=Test" -F "phone=01582000000" -F "email=test@example.com" \
  -F "registration=AB12CDE" -F "driveable=Yes" \
  -F "workType=Bumper repair" -F "damageLocation=Rear" \
  -F "timescale=Flexible" -F "message=Test"
# Response: {"ok":true} = worked (email goes to admin@opease.co.uk in sandbox)
```

### Read `.env.local` (has secrets — don't paste in chat)
```bash
cat ~/Projects/primebodywork/.env.local
```

---

## Where the deep docs are

- **`docs/PRIME_HANDOVER.md`** — 469-line master doc, everything about
  the project. Read if this session's context isn't enough.
- **`docs/LAUNCH_PLAYBOOK.md`** — step-by-step for the DNS switch to
  primebodywork.co.uk. Use when the user is ready to launch.
- **`docs/OWNER_CHEATSHEET.md`** — for Eduard, not for us. Ready to
  send once launch is confirmed.
- **`docs/LOOM_SCRIPT.md`** — script for Ozan to record the owner
  walkthrough video.

---

## First message template for a fresh session

If starting fresh, say to the user something like:

> "Read the session handover doc — caught up on state. Site's live on
> the workers.dev URL, Studio's deployed, latest cleanup pass is
> pushed. Where do you want to pick up — verify the latest build,
> tackle Phase 3 (UptimeRobot + Sentry), or start Phase 5 (DNS switch)?"

Don't spend a message rehashing what's done — just get to the next
useful action.
