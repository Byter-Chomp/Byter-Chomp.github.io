# Leaving Wix → Cloudflare Pages (karsenmartin.com)

Zero-cost cutover for Kay Martin’s one-page site. Host on **Cloudflare Pages** (same approach as Developing Pensacola). Do **not** use GitHub Pages.

The canonical Project Context copy also lives at:

`/cursor/stores/self/docs/wix-migration-plan.md`

## What’s changing

| Today (Wix) | After |
| --- | --- |
| Site built & hosted on Wix | Static HTML/CSS/JS in GitHub, hosted on **Cloudflare Pages** |
| Domain pointed at Wix | Domain pointed at Cloudflare (Pages custom domain + DNS) |
| Wix contact form | Mailto-based contact on the new site (free; opens visitor’s email app) |
| Monthly / annual Wix plan | Cancel Wix site hosting after DNS is stable on Cloudflare |

You already own **karsenmartin.com**. Keep that registration wherever it lives (registrar or Cloudflare Registrar). Only hosting moves.

## Stack (locked)

- **Site:** plain HTML / CSS / JS (edit in code; no build step)
- **Host:** Cloudflare Pages (free tier)
- **Domain:** existing `karsenmartin.com` + `www`
- **Not used:** GitHub Pages, Wix, paid CDNs

## Before you touch DNS

1. **Cloudflare account** — same team/account as Developing Pensacola if you want one place for both sites.
2. **GitHub repo** connected to Pages (this site’s repo) with the new one-pager on `main` (or the branch you deploy).
3. **Preview first** — deploy to Cloudflare Pages and confirm the `*.pages.dev` URL looks right on phone + desktop.
4. **Know where DNS lives today** — Wix nameservers, Cloudflare, or another registrar (GoDaddy, Namecheap, Google Domains/Squarespace, etc.). Cutover steps differ slightly; both paths below.

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

### Path A — Domain already on Cloudflare DNS (preferred)

If `karsenmartin.com` is already a zone in Cloudflare (or you move nameservers to Cloudflare):

1. Add the domain in Pages; Cloudflare usually creates/updates:
   - Apex: **CNAME** flattened to `your-project.pages.dev` (or the CNAME target Pages shows), **or** the A/AAAA records Pages lists
   - `www`: **CNAME** → `your-project.pages.dev`
2. Remove any leftover **Wix** A / CNAME / forwarding records that still point at Wix.
3. Wait for SSL status **Active** on both hostnames (often minutes; sometimes up to a few hours).

### Path B — Domain still at another registrar / Wix DNS

1. Either:
   - **Move DNS to Cloudflare:** add the site as a Cloudflare zone, set the registrar’s nameservers to Cloudflare’s, then use Path A; or
   - **Keep DNS at the registrar:** create only the records Pages shows (CNAME for `www`, and apex CNAME/ALIAS/ANAME or A records as instructed).
2. Delete Wix-pointing records so they don’t conflict.
3. Do **not** leave both Wix and Cloudflare apex records active.

### Typical records to remove (Wix-era)

Exact values vary; look for anything pointing to Wix / `wixdns` / `wixsite` / Wix IP addresses:

- Apex **A** records used by Wix
- `www` **CNAME** to Wix
- Wix email/verification TXT only if you no longer need them (keep Google Workspace / other mail TXT/MX untouched)

## Cutover checklist

1. Preview on `*.pages.dev` approved.
2. Custom domains added in Pages; DNS updated; SSL green.
3. Visit `https://karsenmartin.com` and `https://www.karsenmartin.com` — confirm the **new** site (not Wix).
4. Send a test inquiry via the contact section (mailto opens with the right body).
5. Wait **24–48 hours** of stable DNS before canceling Wix (covers TTL / cached DNS).
6. Cancel Wix site / Premium plan — keep the **domain** registration if it was bundled; transfer domain out of Wix first if Wix is the registrar.
7. Optional: set up a Cloudflare redirect rule so one of apex/`www` is canonical.

## What to cancel on Wix

- **Wix Premium / site hosting** for karsenmartin.com — after the new site is live on Cloudflare.
- **Wix domain connection** / parking pointing at the old site.
- Do **not** cancel domain registration until you know where the domain is registered and that renewal is set elsewhere.
- If the domain was purchased through Wix: transfer it to Cloudflare Registrar or another registrar **before** letting a Wix subscription lapse in a way that risks the domain.

## Gotchas

- **DNS TTL:** Old visitors may see Wix until caches expire. Lower TTL to 300s a day before cutover if your DNS host allows it.
- **Email:** Changing nameservers does not have to break email — preserve existing **MX** and mail-related **TXT** (SPF/DKIM) records. Pages only needs web records.
- **www vs apex:** Add both in Pages; pick one canonical host and redirect the other.
- **Forms:** The new site uses `mailto:` (free). Visitors need a mail app. If Kay later wants inbox-only capture without mail clients, use a free form endpoint later — not required for launch.
- **Wix SEO leftovers:** Update Google Search Console / any analytics to the new host after cutover.
- **GitHub Pages:** Not used for this project. Ignore any old README mentions of `byter-chomp.github.io` hosting for the live domain.
- **Same Cloudflare account as Developing Pensacola:** Keeps billing (free), DNS muscle memory, and SSL habits in one dashboard.

## Decisions still needed from Kay

1. **Cloudflare access** — confirm login to the same account used for Developing Pensacola (or create one).
2. **Where DNS lives today** — Cloudflare already, Wix, or another registrar?
3. **GitHub access** — who connects the repo to Pages (Kay vs collaborator).
4. **Contact email** — site uses `contactkarsen@gmail.com`; change if outdated.
5. **When to cut DNS** — after preview sign-off on the Pages URL.

## Local preview (quick)

```bash
npx --yes serve .
# or: python3 -m http.server 8080
```

See the repo `README.md` for edit/deploy details.
