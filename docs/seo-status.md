# SEO & Analytics Status — sandoitchi.com

Last updated: April 22, 2026 (Audit v3)
Prepared by: Jack / Claude

---

## Scores

| Area | Score | Change |
|---|---|---|
| Technical SEO | 82/100 | +40 |
| On-Page SEO | 78/100 | +50 |
| Local SEO | 75/100 | +40 |
| Content | 55/100 | +15 |
| Structured Data | 80/100 | +65 |
| Attribution | 85/100 | +85 |

---

## Completed — SEO (all 12 original actions done)

| # | Item |
|---|---|
| 01 | Sitemap submitted to GSC. URL inspection requests filed for homepage, /pages/shop, /pages/order, /pages/dallas, /pages/denver |
| 02 | Shop nav links fixed — header, footer, and two grid tile action_btn_url entries corrected to /pages/shop |
| 03 | Visually hidden H1 added to homepage via layout/theme.liquid — "Japanese sando and matcha cafe - Dallas and Denver" |
| 04 | Meta title set — "Sandoitchi - Japanese Sando and Matcha Cafe \| Dallas and Denver" (58 chars) |
| 05 | Image alt tags added — all 13 editorial grid image blocks in index.json updated |
| 06 | Denver announcement bar copy fixed — removed "pop-up" |
| 07 | /pages/dallas and /pages/denver created — hours grid, about section, order CTA. Handle-based routing in templates/page.liquid |
| 08 | LocalBusiness schema added — Restaurant JSON-LD for both location handles, includes address, geo, hours, servesCuisine, sameAs |
| 09 | Product schema added — JSON-LD scoped to template == 'product', pulls dynamically from Shopify product object |
| 10 | Meta descriptions added — homepage via Shopify Admin > Preferences; location pages via Edit website SEO |
| 11 | sandoitchi.menu 301 redirect confirmed — recovers link equity from CultureMap, Community Impact, regional press |
| 12 | Blog noindexed — meta tag in layout/theme.liquid scoped to templates containing 'blog' |

---

## Completed — Analytics & Attribution

| # | Item |
|---|---|
| A1 | GTM installed — container GTM-N7VTTCPJ in head and noscript in layout/theme.liquid |
| A2 | GA4 property created — G-D432D1BC7T, Central Time, installed via GTM (not Shopify Channel App) |
| A3 | GA4 Configuration tag published — fires on All Pages, verified in GTM Preview and GA4 Realtime |
| A4 | GSC linked to GA4 — organic search query data flows into GA4 reports |
| A5 | Order click conversion tracking live — GA4 event 'order_click' fires on outbound clicks to toasttab.com, /pages/order, and denver-order. link_url parameter captures destination |

---

## In Progress

- **GSC indexing** — monitor in 3–5 days for crawl/index confirmation on all submitted URLs. Flag any crawl errors.
- **GA4 order_click volume** — check Reports > Engagement > Events within 24–48 hours

---

## Pending

- [ ] **Mark order_click as GA4 Key Event** — Admin > Events > Mark as key event. Surfaces conversion data in Acquisition reports
- [ ] **Update location page hours** — confirm Tue–Sun for Dallas and Denver, update templates/page.liquid and Google Business Profiles. Keep NAP consistent
- [ ] **Claim Google Business Profiles** — Dallas and Denver. Add photos, menu link, ordering URL, hours. Respond to all existing reviews. Highest-impact local SEO lever remaining
- [ ] **UTM parameters** — add to Instagram bio link and delivery platform links. Example: ?utm_source=instagram&utm_medium=social&utm_campaign=bio_link
- [ ] **PageSpeed Insights** — run homepage and /pages/shop on mobile. Target LCP under 2.5s. Install TinyIMG for bulk image compression. Editorial image grid is likely bottleneck

---

## Future

- **Shop click tracking** — GTM trigger + GA4 event for /pages/shop clicks. Event name: shop_click. Same pattern as order_click
- **Keyword-targeted copy** — no content currently targets "Japanese sando Dallas", "katsu sando Denver", "matcha cafe Dallas". Location pages are the foundation — next step is weaving phrases into homepage about copy
- **Activate the blog** — currently noindexed. 3–5 posts would make it an SEO asset. Suggested topics: Dallas opening, Denver at The Source, what is a katsu sando, the milk bread difference, pop-up history

---

## Key IDs & References

| Item | Value |
|---|---|
| GTM Container | GTM-N7VTTCPJ |
| GA4 Property | G-D432D1BC7T |
| GSC Property | sandoitchi.com |
| Order click event name | order_click |
| Toast URL | https://order.toasttab.com/online/sandoitchi |
