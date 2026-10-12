# Leaving Wix → Cloudflare Pages (karsenmartin.com)

Zero-cost cutover for Kay Martin’s one-page site. Host on **Cloudflare Pages** (same approach as Developing Pensacola). Do **not** use GitHub Pages.

The canonical Project Context copy also lives at:

`/cursor/stores/self/docs/wix-migration-plan.md`

## What’s changing

| Today (Wix) | After |
| --- | --- |
| Site built & hosted on Wix | Static HTML/CSS/JS in GitHub, hosted on **Cloudflare Pages** |
| Domain pointed at Wix DNS (`ns8` / `ns9.wixdns.net`) | Domain pointed at Cloudflare (Pages custom domain + DNS) |
| Wix contact form | Mailto-based contact on the new site (free; opens visitor’s email app) |
| Monthly / annual Wix **site** plan | Cancel Wix **site hosting** after DNS is stable on Cloudflare — keep the **domain** |

You already own **karsenmartin.com**. Registration is at **Domain.com / Network Solutions, LLC** (typical for a domain bought through Wix). Only hosting moves for cutover; domain renewals stay separate from the Wix site plan.

## Stack (locked)

- **Site:** plain HTML / CSS / JS (edit in code; no build step)
- **Host:** Cloudflare Pages (free tier)
- **Domain:** existing `karsenmartin.com` + `www`
- **Not used:** GitHub Pages, Wix, paid CDNs

## Current DNS & registration (known — Oct 12, 2026)

Public records (authoritative for this plan):

| Fact | Value |
| --- | --- |
| **Nameservers** | `ns8.wixdns.net`, `ns9.wixdns.net` |
| **DNS manager** | **Wix DNS** (not Cloudflare yet) |
| **Registrar of record** | Domain.com / Network Solutions, LLC |
| **Registered** | 2021-08-20 |
| **Expires** | 2027-08-20 |

**Cutover path:** Path B below (Wix DNS + external registrar). Prefer moving nameservers to **Cloudflare DNS** — same pattern as Developing Pensacola.

## Before you touch DNS

1. **Cloudflare account** — same team/account as Developing Pensacola if you want one place for both sites.
2. **GitHub repo** connected to Pages (this site’s repo) with the new one-pager on `main` (or the branch you deploy).
3. **Preview first** — deploy to Cloudflare Pages and confirm the `*.pages.dev` URL looks right on phone + desktop.
4. **DNS is already known** — Wix nameservers (`ns8` / `ns9.wixdns.net`); registrar Domain.com / Network Solutions. Follow Path B (prefer nameserver move to Cloudflare).

## Deploy the site on Cloudflare Pages

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the site repo → configure:
   - Framework preset: **None**
   - Build command: *(empty)*
   - Build output directory: **`/`** (repo root)
3. Save and deploy. Note the preview URL: `https://<project>.pages.dev`.
4. Optional: set the production branch to `main` and enable preview deployments for PRs.

## Attach the custom domain

In the Pages project → **Custom domains**:

1. Add `karsenmartin.com`
2. Add `www.karsenmartin.com` (recommended; redirect www ↔ apex as Cloudflare suggests)

Cloudflare will show the DNS records to create. Prefer managing the zone **in Cloudflare DNS** (same as Developing Pensacola) so Pages can auto-provision HTTPS.

### Path A — Domain already on Cloudflare DNS

*Not the current state.* Use this only after Path B’s nameserver move completes (or if the zone is already in Cloudflare).

1. Add the domain in Pages; Cloudflare usually creates/updates:
   - Apex: **CNAME** flattened to `your-project.pages.dev` (or the CNAME target Pages shows), **or** the A/AAAA records Pages lists
   - `www`: **CNAME** → `your-project.pages.dev`
2. Remove any leftover **Wix** A / CNAME / forwarding records that still point at Wix.
3. Wait for SSL status **Active** on both hostnames (often minutes; sometimes up to a few hours).

### Path B — Current state: Wix DNS + Domain.com / Network Solutions registrar

**This is where karsenmartin.com is today.** DNS is managed by Wix (`ns8.wixdns.net` / `ns9.wixdns.net`). The domain registration sits at Domain.com / Network Solutions (via Wix), separate from Wix site hosting.

Cutover requires **either**:

1. **Preferred — move nameservers to Cloudflare DNS** (same pattern as Developing Pensacola), then use Path A; or
2. **Fallback — keep Wix DNS** and create the Pages records there *if* Wix still lets you edit custom DNS for this domain.

#### Preferred steps: nameserver move → Cloudflare DNS

1. In Cloudflare: **Add a site** → enter `karsenmartin.com` → choose the Free plan.
2. Cloudflare scans existing DNS. Review the import — keep any **MX** / mail **TXT** you need; expect Wix web records (A / CNAME to Wix) that you will replace after Pages is attached.
3. Cloudflare shows two nameservers (e.g. `*.ns.cloudflare.com`). Copy them.
4. At the **registrar** (Domain.com / Network Solutions — often reachable via Wix Domains UI, or directly at Domain.com):
   - Open nameserver settings for `karsenmartin.com`
   - Replace `ns8.wixdns.net` and `ns9.wixdns.net` with Cloudflare’s two nameservers
   - Save
5. In Cloudflare, wait until the zone status is **Active** (can take minutes to ~24–48 hours).
6. In the Pages project → **Custom domains**: add apex + `www`. Let Cloudflare create/update the Pages records (Path A).
7. Delete leftover Wix-pointing A / CNAME records in the Cloudflare zone so they don’t conflict.
8. Confirm SSL **Active** on both hostnames, then walk the cutover checklist.

#### Fallback: stay on Wix DNS (only if nameserver move is blocked)

1. In Wix Domains / DNS settings for `karsenmartin.com`, create only the records Pages shows (CNAME for `www`, and apex CNAME/ALIAS/ANAME or A records as instructed).
2. Delete Wix-pointing web records so they don’t conflict.
3. Do **not** leave both Wix and Cloudflare apex records active.
4. If Wix no longer allows custom records for this domain, you **must** use the preferred nameserver move instead.

### Typical records to remove (Wix-era)

Exact values vary; look for anything pointing to Wix / `wixdns` / `wixsite` / Wix IP addresses:

- Apex **A** records used by Wix
- `www` **CNAME** to Wix
- Wix email/verification TXT only if you no longer need them (keep Google Workspace / other mail TXT/MX untouched)

## Cutover checklist

1. Preview on `*.pages.dev` approved.
2. Custom domains added in Pages; DNS updated (prefer Cloudflare nameservers); SSL green.
3. Visit `https://karsenmartin.com` and `https://www.karsenmartin.com` — confirm the **new** site (not Wix).
4. Send a test inquiry via the contact section (mailto opens with the right body).
5. Wait **24–48 hours** of stable DNS before canceling Wix **site hosting** (covers TTL / cached DNS).
6. Cancel Wix **site / Premium hosting only** — see “What to cancel on Wix” below. Domain stays at Domain.com / Network Solutions.
7. Optional: set up a Cloudflare redirect rule so one of apex/`www` is canonical.

## What to cancel on Wix

- **Wix Premium / site hosting** for karsenmartin.com — after the new site is live on Cloudflare.
- **Wix domain connection** / parking pointing at the old site (after DNS no longer needs Wix nameservers — or after Wix DNS records are updated if you used the fallback).
- **Do not** treat canceling the Wix site plan as canceling the domain. The domain is registered at **Domain.com / Network Solutions, LLC** (through Wix). Renewals and domain management are **separate** from site hosting.
- **Before canceling Wix site hosting:** Kay should confirm in Wix Domains / Domain.com that `karsenmartin.com` remains **active**, that renewal is set (expires **2027-08-20**), and that she can still manage nameservers / DNS (or has already moved nameservers to Cloudflare). If anything looks tied to the site subscription, transfer or take over management at the registrar **before** canceling Wix hosting.
- **Optional later (not required for Pages cutover):** transfer the domain out of Wix/Domain.com to **Cloudflare Registrar** so DNS + registration live in one place. Nice-to-have only; nameserver move to Cloudflare DNS is enough for cutover.

## Gotchas

- **DNS TTL:** Old visitors may see Wix until caches expire. Lower TTL to 300s a day before cutover if your DNS host allows it (harder while still on Wix DNS; Cloudflare makes this easy after the zone is Active).
- **Email:** Changing nameservers does not have to break email — preserve existing **MX** and mail-related **TXT** (SPF/DKIM) records. Pages only needs web records.
- **www vs apex:** Add both in Pages; pick one canonical host and redirect the other.
- **Forms:** The new site uses `mailto:` (free). Visitors need a mail app. If Kay later wants inbox-only capture without mail clients, use a free form endpoint later — not required for launch.
- **Wix SEO leftovers:** Update Google Search Console / any analytics to the new host after cutover.
- **GitHub Pages:** Not used for this project. Ignore any old README mentions of `byter-chomp.github.io` hosting for the live domain.
- **Same Cloudflare account as Developing Pensacola:** Keeps billing (free), DNS muscle memory, and SSL habits in one dashboard.
- **Site ≠ domain:** Canceling Wix hosting must not drop Domain.com registration. Confirm domain status before you cancel.

## Decisions still needed from Kay

1. **Cloudflare access** — confirm login to the same account used for Developing Pensacola (or create one).
2. ~~**Where DNS lives today**~~ — **Resolved (Oct 12, 2026):** Wix DNS (`ns8` / `ns9.wixdns.net`); registrar Domain.com / Network Solutions. Prefer nameserver move to Cloudflare.
3. **GitHub access** — who connects the repo to Pages (Kay vs collaborator).
4. **Contact email** — site uses `contactkarsen@gmail.com`; change if outdated.
5. **When to cut DNS** — after preview sign-off on the Pages URL.

## Local preview (quick)

```bash
npx --yes serve .
# or: python3 -m http.server 8080
```

See the repo `README.md` for edit/deploy details.
