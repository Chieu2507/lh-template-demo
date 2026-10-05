# Featured collection — Strideo

Figma desktop 49117:13896, tablet 49384:13049, mobile 49390:14151.

- Role/placement/context: homepage content after Collection list; existing Featured collection and Product list supply selected collection/products. Keep placeholders until catalog selection, no tennis products or invented shoe catalog.
- Ownership: global page width, schemes, typography, product-card image/title/swatches tokens remain Theme Settings. Section owns 20/10/10px top and 96/80/64px bottom spacing, 40px heading gap, Header/View all alignment. Product list owns 3 desktop, tablet 1 with one-third next preview, mobile 1, 10px gaps, bottom controls and thin progress bar. Card stays shared, square image and image swatches configured globally for Strideo.
- Slots/output: existing static Header, View all, Product list → Product card; semantic H2, resource-aware View all, labeled controls. Replace legacy collection-tabs instance at the first featured slot with Featured collection. No custom template section.
- Runtime: shared product-collection-carousel handles columns and existing editor lifecycle; add tablet preview opt-in without changing other instances. Bottom controls are a reusable navigation position; progress bar remains inside shared Swiper root.
- Responsive: tablet one full card plus one-third next, mobile one full card; bottom arrows on desktop/tablet only; View all hidden mobile. Preserve global 1600px cap rather than Figma 1674px.
- Media: catalog imagery is resource supplied. Placeholder images remain; no uploads into assets.
- QA: schemas, Theme Check, syntax, whitespace; rendered geometry at 1920/768/375, Next/Previous, no page overflow. Selected products/real swatches require eventual catalog selection.

QA completed: Theme Check 0 errors / 35 existing warnings, JS syntax and diff whitespace passed. Published files to unpublished theme 191953273131 only. Storefront 1920px shows 3 square cards with 10px gaps; tablet card 528.5px (Figma 529px), mobile card/media 343px. Tablet/mobile padding 10/80 and 10/64, 2px pagination, mobile actions/navigation hidden, no horizontal overflow. Desktop Next advanced active slide 1 → 2. Fresh Editor confirmed Featured collection → Header / View all / Product list → Product card, tablet picker, preview checkbox and Bottom navigation. Save was disabled; restore notification untouched.

Catalog images, real swatches, badges and prices remain pending collection selection. Placeholder does not fabricate swatches/badges. Shared price typography and image-radius tokens are retained (rather than local hard-coded overrides); actual catalog styling should be re-audited once products are selected. Global 1600px width is intentionally preserved. Screenshot output/strideo-featured-collection/desktop.png.
