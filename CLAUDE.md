# CLAUDE.md — sandoitchi-theme

Context file for Claude Code. Read this at the start of every session.

---

## Project Overview

Custom Shopify theme for **Sandoitchi** — a Japanese sando and matcha café with locations in Dallas and Denver, plus a Houston location in pre-launch. Built entirely in Liquid and vanilla JavaScript. No frameworks. No build tools.

**Developer:** AFRA Visibility (Jack / Morgan)
**Live site:** https://www.sandoitchi.com

---

## Tech Stack

- **Shopify Liquid** — all templates and sections
- **Vanilla JS** — no jQuery, no React, no Alpine
- **CSS** — all styles live in `assets/base.css`, appended in clearly labeled blocks
- **No preprocessors** — plain CSS only, no SCSS/SASS

---

## Typography

- **Primary font:** Booton Regular
- **Loading method:** `@font-face` declaration in `assets/base.css`
- **Font file:** lives in `assets/` directory
- Do not substitute or swap this font. It is core to the brand.

---

## CSS Conventions

- All custom CSS is appended to `assets/base.css`
- Each block is labeled with a comment header, e.g.:
  ```css
  /* ── SECTION: copyright-bar ── */
  ```
- Do not create separate CSS files unless explicitly asked
- Mobile breakpoint: `max-width: 749px` (standard Shopify Dawn convention)
- Desktop breakpoint: `min-width: 750px`

---

## Custom Sections

These are the key custom sections built for this theme:

| Section file | Purpose |
|---|---|
| `sections/copyright-bar.liquid` | Mobile sticky bottom nav (contact, home, shop, order icons) |
| `sections/featured-media-grid.liquid` | Hero/feature image grid |
| `sections/shop-grid.liquid` | Shop product grid |
| `sections/locations-grid.liquid` | Dallas / Denver location cards |
| `sections/three-column-info.liquid` | Three-up info/feature row |
| `sections/header-minimal.liquid` | Minimal top header with logo + order CTA |
| `sections/announcement-bar.liquid` | Top announcement strip |
| `sections/houston-launch.liquid` | Houston pre-launch page content + waitlist form |
| `sections/menu-grid.liquid` | Menu page grid with category filters + carousel |
| `sections/hero-title.liquid` | Hero title block |
| `sections/split-image-hero.liquid` | Two-up image hero |
| `sections/footer-content.liquid` | Footer content |
| `sections/page-redirect.liquid` | Client-side page redirect helper |

---

## Shopify Store

- **Store URL:** `sando-itchi.myshopify.com`
- **Shopify CLI commands:**
  ```bash
  # Local dev preview
  shopify theme dev --store=sando-itchi.myshopify.com

  # Push changes live
  shopify theme push --store=sando-itchi.myshopify.com

  # Pull latest from Shopify
  shopify theme pull --store=sando-itchi.myshopify.com
  ```

---

## Ordering / External URLs

- **Toast order URL (Dallas):** `https://order.toasttab.com/online/sandoitchi`
- This is used in the header `order_url` setting, the nav "order now" button, and any order CTAs
- Do not change or hardcode a different URL — always reference the theme setting

**Denver — metafield-driven weekly toggle.** The Denver order link is NOT hardcoded. It reads
from a shop metafield so a Shopify Flow can swap it between Toast and TapTap Eat on a weekly
cadence without a theme deploy. See `templates/page.order-select.liquid`:

```liquid
{%- assign denver_url = shop.metafields.custom.denver_order_url.value
    | default: "https://order.toasttab.com/online/sandoitchi-denver" -%}
```

- Metafield: `custom.denver_order_url` (shop-level)
- Fallback if unset: the Denver Toast URL above
- To change where Denver orders go, edit the metafield or the Flow — **not** the theme

---

## Locations

- **Dallas** — Sandoitchi @ The Joule
- **Denver** — separate location, same menu concept
- **Houston** — pre-launch. Has its own standalone page (`/pages/houston`) with a dedicated
  layout (`layout/houston.liquid`), section (`sections/houston-launch.liquid`) and
  `assets/houston.js`. Waitlist signups use a tagged customer form, not the old modal.
  Linked from the homepage find-us grid.

---

## Action Button Styles (grid tiles)

`sections/featured-media-grid.liquid` and `sections/shop-grid.liquid` both expose an
`action_btn_style` select on their blocks. The option list must stay **identical across every
block type in both sections** (8 block types in featured-media-grid, 4 in shop-grid).

- Buttons render as **inline SVG** in the Liquid, wrapped in `.media-action-svg-btn`
- Sizing comes from `.media-action-svg-btn svg { height: 30px }` (28px under 600px)
- `order-now-*` / `shop-now-*` are links: they use `action_btn_url` + `action_btn_new_tab`
- `notify-me-black` is a `<button data-notify="true">` that opens the notify modal instead
- Brand red for red variants: `#df2522`. Blacks vary: `#010000` (order-now-black),
  `#252023` (shop-now-black, notify-me-black)

Positioning is driven by `btn_position` (`bottom-left` / `bottom-right`) on the
`.media-cell__actions` wrapper — keep wrapper markup and classes intact when adding variants.

---

## Deploying to Shopify (read before any push)

**Git and Shopify are separate pipelines.** Committing or pushing to GitHub changes
nothing on the store, and the theme editor will not show new section settings until
a `shopify theme push` actually uploads the `.liquid` files. Conversely, anyone
editing in the Shopify customizer puts **live ahead of this repo**, and the next
push from git silently reverts their work.

This has already bitten us once: in Oct 2026 the repo was ~4 months behind live and
still had the old banana-milk homepage tile where live was running the Complex Con
campaign, plus it was missing the 4 Keiko Sootome collab tiles. A straight push would
have deleted a live campaign.

### Always check for drift before pushing

Pull live into a **separate folder** — a plain `shopify theme pull` overwrites your
working tree and will wipe uncommitted work:

```bash
mkdir -p ~/sando-live-snapshot          # --path requires the dir to exist
shopify theme pull --live --path ~/sando-live-snapshot --store sando-itchi.myshopify.com

diff -rq ~/sandoitchi-theme ~/sando-live-snapshot \
  -x '.git' -x '.claude' -x '.shopify' -x 'node_modules' -x '.DS_Store' \
  -x 'docs' -x 'CLAUDE.md' -x '.gitignore' -x '.shopifyignore' -x 'start.sh'
```

### Reading the diff — most of it is noise

- Live's JSON files carry an auto-generated `/* ... */` header the repo versions lack
  (exactly 411 bytes), and live is pretty-printed where the repo is minified. Files can
  differ by thousands of bytes and be **semantically identical**.
- `hover_swap_image: null -> false`, `action_btn_url: null -> ""` and similar are just
  Shopify writing out unset values explicitly. Ignore them.
- To compare properly, strip the comment header and compare parsed JSON, not bytes:

```python
import json, re
d = json.loads(re.sub(r"/\*.*?\*/", "", open(path).read(), flags=re.S))
```

Then compare `sections` block-by-block and watch `block_order` length for added or
removed tiles. **Blocks that exist only on live are the thing to protect.**

### Resolving drift

Adopt live's file where live is ahead (campaign/product content added in the editor),
keep the repo's where the repo is ahead (deliberate code work not yet shipped), and
commit the result as a sync commit before pushing. Decide per file, not wholesale.

### Pushing

```bash
# Preferred: new unpublished theme, verify, then Publish from the admin
shopify theme push --unpublished --theme "<name>" --store sando-itchi.myshopify.com

# Straight to live - overwrites every file on the published theme
shopify theme push --live --store sando-itchi.myshopify.com
```

A push uploads **all** local files, not just the ones you changed. Anything sitting in
`assets/` gets uploaded too.

> The Shopify CLI needs an interactive browser login, so these commands must be run in
> a real terminal window. They cannot be run from a non-interactive shell (including
> Claude Code's bash tool, which is why pushes get handed back to Jack).

---

## Pages

| Page | Handle |
|---|---|
| Shop | `/pages/shop` |
| Order | `/pages/order` (used as ordering intent proxy — Toast orders are not tracked in Shopify) |
| Catering | `/pages/catering` |
| Houston (pre-launch) | `/pages/houston` |
| Order select (Dallas/Denver chooser) | `/pages/order-select` |
| Employee shop (unlisted, staff logo tees) | see `templates/page.employee-shop.json` |
| Menu | `/pages/menu` |

> **Note:** Toast / TapTap Eat orders do not appear in Shopify analytics. `/pages/order` session data is used as the ordering intent proxy in reporting.

---

## Reporting

A recurring web performance report called **Sando Web Pulse** is generated from Shopify session exports. The build script lives at `/home/claude/build_report.py` (on the Claude.ai compute instance, not in this repo). Report sections: metric cards + traffic sources, funnel, geographic, SF1 drop analysis, action items, data notes.

---

## SEO

A full SEO audit has been completed. A 12-item action plan exists. Check with Jack before making any changes to meta fields, canonical tags, or URL structure.

---

## Working Rules

1. **Read the relevant section file before editing it** — never assume structure
2. **All CSS goes in `base.css`** in a labeled block — not inline, not in a new file
3. **No frameworks** — vanilla JS only, keep it lean
4. **Mobile-first awareness** — the copyright-bar is mobile-only UI; test changes at `max-width: 749px`
5. **Do not rename sections** — section names are referenced in `config/` JSON templates
6. **Preserve Booton font** — never fall back to a system serif as the primary display font
7. **Ask before touching Toast URLs** — they are confirmed correct and live

---

## Project Docs

Detailed status files live in `/docs/`. Reference these before making decisions about SEO, analytics, or data strategy:

| File | Contents |
|---|---|
| `docs/seo-status.md` | All 12 SEO actions + analytics stack status, pending items, future work, key IDs (GTM, GA4) |
| `docs/ai-readiness.md` | AI readiness scores, data source gaps, 5-step foundation roadmap, 6–12 month intelligence layer |
| `docs/dashboard.html` | Standalone reporting dashboard page |

---

## Dev Workflow

**Starting a session:**
```bash
# Terminal tab 1 — dev server
cd ~/sandoitchi-theme
shopify theme dev --store sando-itchi.myshopify.com
# Open http://127.0.0.1:9292 in browser

# Terminal tab 2 — Claude Code
cd ~/sandoitchi-theme
claude
```

**Ending a session:**
```bash
# In Claude Code tab
/exit

# In dev server tab
Ctrl+C

# Commit and push
git add .
git commit -m "your message"
git push
```

**Quick reference:**

| Action | Command |
|---|---|
| Start dev server | `shopify theme dev --store sando-itchi.myshopify.com` |
| Start Claude Code | `claude` |
| Preview URL | `http://127.0.0.1:9292` |
| Exit Claude Code | `/exit` |
| Stop dev server | `Ctrl+C` |
| Push to GitHub | `git push` |
| Push to Shopify live | `shopify theme push --store sando-itchi.myshopify.com` |

---

## Session Startup Checklist

- [ ] Confirm which section or file is in scope
- [ ] Read the relevant `.liquid` file and its CSS block in `base.css` before writing any code
- [ ] Check for mobile vs desktop implications before adding CSS
- [ ] Note any changes made for handoff back to Jack
