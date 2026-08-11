# Launch Playbook — DNS switch & Resend domain verification

Run through this in one sitting when you're ready to flip
primebodywork.co.uk from GoDaddy's placeholder site → the Cloudflare-hosted
site. Allow ~30 min of active work plus 5-60 min of DNS propagation wait.

**Prerequisites** (should be true already):
- ✅ Site live on `primebodywork.billowing-firefly-f15a.workers.dev`
- ✅ Sanity Studio live on `primebodywork.sanity.studio`
- ✅ Logo present in `public/logo.png`
- ✅ Eduard invited as Sanity editor
- 🔒 You have GoDaddy account access
- 🔒 You have Cloudflare + Resend account access (you do — set up earlier)

---

## Step 1 — Add primebodywork.co.uk as a custom domain in Cloudflare (2 min)

1. Cloudflare dashboard → **Workers & Pages** → **primebodywork** project
2. **Domains** tab (top row of tabs)
3. Click **Add** → **Custom domain**
4. Enter: `primebodywork.co.uk`
5. Also add the `www` subdomain: click **Add** again → enter `www.primebodywork.co.uk`
6. Save

Cloudflare will show "Waiting for DNS" — that's expected until Step 2 is done.

## Step 2 — Move the domain to Cloudflare (5 min setup, up to 24hr propagation)

**Recommended approach**: switch nameservers to Cloudflare so everything
lives in one place. Alternative below if you want to keep DNS at GoDaddy.

### Option A (recommended): switch nameservers to Cloudflare

1. Cloudflare dashboard → **Add a site** (top-right or left sidebar)
2. Enter: `primebodywork.co.uk`
3. Choose **Free plan** → Continue
4. Cloudflare scans existing DNS records — click Continue on whatever it
   finds (we'll add/edit records after)
5. Cloudflare shows you **two nameservers** like:
   ```
   ali.ns.cloudflare.com
   art.ns.cloudflare.com
   ```
   (Yours will be different — copy the exact ones shown)
6. Go to **GoDaddy → My Products → Domains → primebodywork.co.uk → DNS**
7. Click **Change Nameservers** → pick **"I'll use my own"**
8. Paste the two Cloudflare nameservers → Save
9. Back in Cloudflare, click **Done, check nameservers**

Cloudflare will email you once the switch is live (usually 15-60 min, can
be up to 24 hrs). While waiting, keep going with Step 3.

Once active:
- Cloudflare Worker custom domains auto-connect
- SSL cert issued automatically
- Both `primebodywork.co.uk` and `www.primebodywork.co.uk` should serve
  the Worker

### Option B (alternative): keep DNS at GoDaddy

1. Cloudflare → your Worker → **Domains** tab
2. Click on `primebodywork.co.uk` → Cloudflare shows you the CNAME target
   (something like `primebodywork.billowing-firefly-f15a.workers.dev`)
3. In GoDaddy DNS, add:
   - **CNAME** record: name `www`, value = the CNAME target from step 2
   - **A** or **CNAME flattening** for root `@`: this varies by GoDaddy
     tier — GoDaddy doesn't support CNAME on root, so use their
     "Forwarding" feature to redirect root → www, OR upgrade to a plan
     that supports CNAME flattening

Nameserver switch is simpler. Recommend Option A.

## Step 3 — Verify primebodywork.co.uk in Resend (5 min + propagation)

Only doable once the DNS is at Cloudflare (Step 2 Option A) OR you have
DNS record access at GoDaddy (Option B).

1. Resend dashboard → **Domains** → **+ Add Domain**
2. Enter: `primebodywork.co.uk`
3. Region: leave default (usually EU/US-east)
4. Resend shows you 3-4 DNS records to add:
   - MX record (return-path)
   - TXT record (SPF)
   - TXT records (DKIM — usually 2 of these with long values)
   - Optional: TXT for DMARC
5. **Add each record in Cloudflare DNS** (Websites → primebodywork.co.uk → DNS):
   - Type, Name, and Value should match exactly what Resend shows
   - Set **Proxy status** to **DNS only** (grey cloud, not orange) for
     all these records — Cloudflare's proxy would break email delivery
6. Back in Resend, click **Verify Domain**
7. Resend polls DNS — verification usually completes within a few minutes
   but can take up to an hour

Once verified, you can send from any address at `@primebodywork.co.uk`.

## Step 4 — Update Cloudflare env vars (2 min)

1. Cloudflare → primebodywork project → **Settings** → **Variables and Secrets**
2. Edit `CONTACT_FORM_TO_EMAIL` → change from `admin@opease.co.uk` to
   `eduard@primebodywork.co.uk` → Save
3. Add a new variable `CONTACT_FORM_FROM_EMAIL` = `noreply@primebodywork.co.uk`
   → Save
4. Save all
5. Trigger a redeploy: Deployments tab → ⋯ on latest → Retry deployment

## Step 5 — Update UptimeRobot monitor (1 min)

1. UptimeRobot dashboard
2. Edit the workers.dev monitor
3. Change URL from `https://primebodywork.billowing-firefly-f15a.workers.dev`
   to `https://primebodywork.co.uk`
4. Save

## Step 6 — Full end-to-end test (5 min)

Once DNS + Resend + env vars + redeploy are all done, test everything:

1. **Site loads on real domain**:
   - Open `https://primebodywork.co.uk` — should load with green padlock (HTTPS)
   - Open `https://www.primebodywork.co.uk` — should redirect or load
2. **Every page returns 200**:
   - / , /services, all four service detail pages, /gallery, /about,
     /contact, /insurance-claims
3. **Contact form works end-to-end**:
   - Fill in the form on /contact
   - Attach one small test photo
   - Submit
   - Check `eduard@primebodywork.co.uk` inbox → email should arrive within
     30 sec with all the details + attached photo
4. **Studio still works**:
   - `https://primebodywork.sanity.studio` still loads and lets you edit
5. **Non-www redirects** (optional but nice): if `www.primebodywork.co.uk`
   doesn't auto-redirect to root, add a Cloudflare Redirect Rule to force it

---

## Common problems

| Symptom | Fix |
|---|---|
| "This site can't be reached" on primebodywork.co.uk | DNS still propagating — wait, or check `dig primebodywork.co.uk NS` shows Cloudflare nameservers |
| SSL/HTTPS warning | Cloudflare issues cert automatically within ~10 min of DNS pointing at CF. If it's been longer, check Cloudflare SSL/TLS settings are on "Full" or "Full (Strict)" |
| Contact form 502 | Env vars didn't propagate — retry deployment after Step 4 |
| Contact form works but email doesn't arrive | Resend domain not fully verified yet — check Resend's Domains page for green ticks on all records |
| Site shows GoDaddy placeholder | Nameservers didn't switch — check GoDaddy shows Cloudflare's nameservers, not GoDaddy's |

---

## After launch

- ✅ Send Eduard the cheatsheet
- ✅ Record and send the Loom
- Consider: transfer Cloudflare + Sanity + Resend account ownership to
  Eduard, so he owns the whole stack going forward
