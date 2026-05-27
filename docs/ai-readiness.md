# AI Readiness Assessment — sandoitchi.com

Last updated: May 7, 2026
Prepared by: Jack / Claude

---

## Scores

| Area | Score | Notes |
|---|---|---|
| **Overall AI Readiness** | 38/100 | Baseline established |
| Data Unification | 15/100 | Critical gap |
| Signal Capture | 45/100 | Web layer solid |
| Customer Identity | 10/100 | No unified profile |
| Operational Data | 20/100 | Siloed at POS |
| Content & Brand | 60/100 | Schema + SEO in place |

> Target: 5-step foundation build moves score from 38 → ~70 within 30 days

---

## Data Sources — Current State

| Source | Status | Notes |
|---|---|---|
| GA4 | ✅ Live | Sessions, pageviews, traffic sources, order_click events live |
| Google Search Console | ✅ Live | Linked to GA4. Query-level data flowing |
| Shopify | ✅ Live | Merch orders, cart behavior, customer emails for merch buyers |
| Toast POS | ⚠️ Partial | Dallas food orders live in Toast — no connection to web or email data |
| TapTap Eat | ⚠️ Partial | Denver orders live in TapTap Eat — same silo problem |
| Email platform | ❌ Gap | Newsletter signups in Shopify Customers but no email platform installed |
| Delivery platforms | ❌ Gap | UberEats, DoorDash, Grubhub, Postmates — zero data visibility |
| Social | ❌ Gap | Instagram + TikTok (@sando.itchi) active but engagement data not captured |

---

## Customer Identity — Critical Gaps

- No unified customer identity layer — a single customer is 4 separate data points (Google visit, site visit, Toast order, newsletter signup) with no connection
- No loyalty or repeat customer tracking at POS
- No CLV calculation possible without POS-to-email bridge
- **Fix:** Klaviyo as email CDP, synced to Shopify, integrated with Toast (30–90 day build)

---

## Operational Data — Gaps

- No cross-location performance dashboard — Dallas (Toast) and Denver (TapTap Eat) are completely separate
- No demand forecasting inputs — weather, events, day-of-week patterns not being logged
- No menu performance data — item-level sales exist in Toast but not extracted or analyzed
- No review aggregation — reviews scattered across Google, Yelp, UberEats, DoorDash, third-party scrapers

---

## Content & AI Discoverability

| Item | Status |
|---|---|
| LocalBusiness schema (Dallas + Denver) | ✅ Live |
| Product schema | ✅ Live |
| Homepage H1, meta title, meta descriptions, alt tags | ✅ Live |
| Menu schema (MenuItem JSON-LD) | ❌ Missing — food is invisible to AI assistants |
| FAQ / structured Q&A content | ❌ Missing — no structured answers to common queries |
| Square legacy site (sandoitchi-105869.square.site) | ⚠️ Still indexed — duplicate content risk |

> AI assistants (ChatGPT, Perplexity, Google AI Overviews) cannot currently answer "what sandos does Sandoitchi have?" or "does Sandoitchi have vegetarian options?"

---

## 5-Step Foundation Roadmap (38 → 70+)

- [ ] **01 — Install Klaviyo** (this week) — install via Shopify App Store, sync existing customer list, set up welcome flow for new newsletter subscribers
- [ ] **02 — Enable Toast Loyalty + email capture at POS** (this week) — enables bridge between in-store behavior and digital identity
- [ ] **03 — Add Menu + MenuItem schema** (next 2 weeks) — build /pages/menu with full MenuItem JSON-LD (name, description, price, image) for every sando, drink, and side
- [ ] **04 — Start daily operational data log** (this week) — Google Sheet: location, covers, top 3 items, weather, notable events. 5 min/day/location. 90-day dataset enables demand forecasting
- [ ] **05 — Aggregate reviews** (this month) — Google Alerts for "Sandoitchi" + Birdeye or Grade.us for Google and Yelp review feed

---

## 6–12 Month Intelligence Layer (requires foundation first)

| Item | Dependency |
|---|---|
| Unified data warehouse | Shopify + Toast + TapTap Eat + Klaviyo + GA4 connected. Start with BigQuery free tier or Airtable |
| Customer lifetime value model | Unified customer identity |
| Demand forecasting model | 90+ days of daily operational logs + historical POS data |
| Menu optimization engine | Item-level sales + margin data + review sentiment cross-referenced |
| Personalized customer communication | Klaviyo CDP + unified customer profiles |
| Full AI search discoverability | Menu schema + FAQ schema + regularly updated site |

---

## Key Recommendations Summary

| Priority | Action |
|---|---|
| Immediate | Mark order_click as GA4 Key Event |
| Immediate | Connect GA4 to BigQuery free tier |
| Immediate | Export GSC data monthly to spreadsheet |
| Immediate | Enable Shopify data export |
| This week | Install Klaviyo |
| This week | Enable Toast Loyalty + POS email capture |
| This week | Start daily ops log (Google Sheet) |
| Next 2 weeks | Build /pages/menu with MenuItem JSON-LD |
| This month | Set up review aggregation (Birdeye or Grade.us) |
| This month | Redirect or take down Square legacy site |
| Ongoing | Weekly Toast item-level sales export |
| Ongoing | Weekly delivery platform data exports |
