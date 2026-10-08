# Peekoo collection tabs

## Section build plan

Role: browse new arrivals by age. Placement: existing `new_arrivals_tabs` in index, after collection thumbnails, replacing the active featured collection at this position. Context: Shopify collections own product content; no product catalogue changes in this template-only task. Four editable collection-tab blocks: 0–6 Months, 6–12 Months, 1–2 Years, 3–4 Years. Header, Tab Layout and View All remain existing static blocks. Reuse the Product Card kernel and Tab Layout keyboard/editor lifecycle. White/grey scheme 2, 4/4/2 columns, 32/20/12px product gaps, 80/64/56px vertical padding. Native product data controls imagery, prices and badges; no invented review scores. QA: tab activation, keyboard navigation, View All destination, responsive geometry and Theme Check.

Figma: desktop `49022:23987`, tablet `49234:4760`, mobile `49234:5795`.

Data dependency: existing age collections are empty; the store has no Peeko collections. New Arrivals Perky is used temporarily for layout inspection pending the user's choice of collection data. Scope stays in template JSON; no shared product or collection resources are modified.

## Verification and current limits

Uploaded only index to unpublished Peeko theme `192108396843`. Four tabs render and click/ArrowRight changes selected tab and visible panel; View All resolves to the active collection URL. Desktop grid has 4 columns, tablet has 4 columns with 20px gaps, mobile has 2 columns with 12px gaps and no page overflow. View All is below the grid. Theme Check: 0 errors; diff check passes. Proof: `/private/tmp/peeko-collection-tabs.jpg`.

This is a template-only composition using existing product cards. All four tabs temporarily use the same New Arrivals Perky collection, so they currently display the same products. Product images, prices and badges follow that collection, not the Figma sample catalogue. Ratings are not available in the current product-card kernel and were not fabricated. Existing spacing controls retain 48px header-to-grid spacing on tablet and 12px mobile grid row gap; Figma specifies 40px and 28px respectively. No shared schema, CSS or runtime files changed in this step.
