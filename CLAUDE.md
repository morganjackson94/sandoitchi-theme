# CLAUDE.md — sandoitchi-theme

Context file for Claude Code. Read this at the start of every session.

---

## Project Overview

Custom Shopify theme for **Sandoitchi** — a Japanese sando and matcha café with locations in Dallas and Denver. Built entirely in Liquid and vanilla JavaScript. No frameworks. No build tools.

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

- **Toast order URL:** `https://order.toasttab.com/online/sandoitchi`
- This is used in the header `order_url` setting, the nav "order now" button, and any order CTAs
- Do not change or hardcode a different URL — always reference the theme setting

---

## Locations

- **Dallas** — Sandoitchi @ The Joule
- **Denver** — separate location, same menu concept

---

## Pages

| Page | Handle |
|---|---|
| Shop | `/pages/shop` |
| Order | `/pages/order` (used as ordering intent proxy — Toast orders are not tracked in Shopify) |
| Catering | `/pages/catering` |

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

---

## Dev Workflow

**Starting a session:**
```bash
# Terminal tab 1 — dev server
cd ~/Desktop/sandoitchi-theme
shopify theme dev --store sando-itchi.myshopify.com
# Open http://127.0.0.1:9292 in browser

# Terminal tab 2 — Claude Code
cd ~/Desktop/sandoitchi-theme
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
