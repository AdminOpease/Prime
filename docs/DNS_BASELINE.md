# DNS baseline — captured before the primebodywork.co.uk migration

**Captured:** 2026-08-14, before moving DNS to Cloudflare.
**Why:** Email for the domain is on **Microsoft 365**. If we move nameservers
to Cloudflare, every one of these records must be recreated exactly or
Eduard's email (and Teams) breaks. This file is the source of truth to
restore from.

**Current registrar / nameservers:** GoDaddy
- `ns03.domaincontrol.com`
- `ns04.domaincontrol.com`

---

## 🔴 MUST-PRESERVE — Microsoft 365 email + Teams

Recreate ALL of these in Cloudflare DNS. Set every one to **DNS only**
(grey cloud), never proxied.

| Type | Name (host) | Value | Notes |
|------|-------------|-------|-------|
| MX   | `@` (root)  | `primebodywork-co-uk.mail.protection.outlook.com` | Priority **0** — inbound email. CRITICAL. |
| TXT  | `@` (root)  | `NETORG19676959.onmicrosoft.com` | M365 tenant / domain verification |
| TXT  | `@` (root)  | `v=spf1 include:secureserver.net -all` | SPF (sending). Leave as-is during migration. |
| TXT  | `_dmarc`    | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | DMARC policy |
| CNAME| `autodiscover` | `autodiscover.outlook.com` | Outlook auto-config |
| CNAME| `lyncdiscover` | `webdir.online.lync.com` | Teams/Skype |
| CNAME| `sip`       | `sipdir.online.lync.com` | Teams/Skype |
| SRV  | `_sip._tls` | `100 1 443 sipdir.online.lync.com` | Teams |
| SRV  | `_sipfederationtls._tcp` | `100 1 5061 sipfed.online.lync.com` | Teams |

Not currently set (nothing to preserve): `selector1/2._domainkey` (M365
CNAME DKIM), `enterpriseregistration`, `enterpriseenrollment`.

## Current website records (to be REPLACED by the Cloudflare Worker)

| Type | Name | Value | Notes |
|------|------|-------|-------|
| A | `@` (root) | `76.223.105.230`, `13.248.243.5` | GoDaddy placeholder — will be replaced by the Worker custom domain |
| A | `www` | same as root | GoDaddy placeholder |

## Records to ADD for Resend (exact values come from Resend's dashboard)

Resend puts these on a `send` subdomain + a `resend._domainkey` record, so
they do **not** conflict with the root M365 MX/SPF above:
- MX on `send` → `feedback-smtp.<region>.amazonses.com`
- TXT on `send` → `v=spf1 include:amazonses.com ~all`
- TXT on `resend._domainkey` → (DKIM public key Resend gives you)

All **DNS only** (grey cloud).

---

## Verification commands (run after the switch)

```bash
D=primebodywork.co.uk
dig +short NS $D          # should show cloudflare.com nameservers
dig +short MX $D          # MUST still show ...mail.protection.outlook.com
dig +short TXT $D         # MUST still show onmicrosoft + spf
dig +short autodiscover.$D CNAME   # MUST still show autodiscover.outlook.com
```
If the MX or autodiscord records change/disappear, email is at risk —
restore them from the table above immediately.
