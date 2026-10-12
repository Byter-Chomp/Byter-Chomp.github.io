# karsenmartin.com

One-page site for **Karsen Martin Digital Design** — small-business website design, rebuilt as a free static site on **Cloudflare Pages** (same hosting approach as Developing Pensacola). No Wix, no paid CDN required.

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Site | Plain HTML / CSS / JS | Easy for Kay to edit in code; no build step |
| Hosting | **Cloudflare Pages** (free) | Matches Developing Pensacola; custom domain + HTTPS included |
| Domain | `karsenmartin.com` (already owned) | Point DNS at Cloudflare Pages after deploy |
| Forms | `mailto:` compose | Zero-cost contact; no third-party form SaaS |

Cutover steps (DNS, what to cancel on Wix, gotchas): **[docs/wix-migration-plan.md](./docs/wix-migration-plan.md)** — Cloudflare Pages only (not GitHub Pages).

## Local preview

From the repo root:

```bash
# any static server works; examples:
npx --yes serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:3000` (serve) or `http://localhost:8080` and check desktop + mobile widths.

Edit directly:

- `index.html` — copy, sections, meta
- `styles.css` — brand colors (`--orange`, etc.), layout, motion
- `main.js` — contact mailto behavior
- `assets/` — images

## Deploy to Cloudflare Pages

1. Push this branch (or `main`) to GitHub.
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select this repo.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or `.` if the UI requires a path — use the repo root)
5. Deploy. You’ll get a `*.pages.dev` URL for preview.
6. **Custom domains** → add `karsenmartin.com` and `www.karsenmartin.com`, then follow Cloudflare’s DNS instructions (or update records at your registrar if the domain is not yet on Cloudflare DNS).

Full domain cutover from Wix: **[docs/wix-migration-plan.md](./docs/wix-migration-plan.md)**.

## Project layout

```
index.html                 # one-page site
styles.css
main.js
assets/                    # hero + supporting photos
docs/wix-migration-plan.md # DNS cutover + what to cancel on Wix
archive/                   # previous static portfolio (reference only)
_headers                   # Cloudflare Pages header hints
README.md
```

## Brand notes (from live Wix + meta)

- Headline energy: “Need digital media?”
- Purpose: custom websites for small businesses (Wix / Squarespace / Shopify / custom)
- Accent: coral-orange `#E5743F`
- Contact fallback email used in footer/mailto: `contactkarsen@gmail.com` (update if Kay prefers another address)
