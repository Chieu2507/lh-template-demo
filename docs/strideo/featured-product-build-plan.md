# Featured product — Strideo

- Role / placement: homepage content, immediately after Countdown timer, branch Strideo-template, draft 191953273131.
- Context: section Product picker; blank product remains a placeholder until the merchant selects a running product. No inherited tennis product, uploaded assets, or fake purchasable variants.
- Ownership: global page width, typography, colors and commerce primitives; section owns media/detail split, gap and padding. Product blocks own title, price, description, variants, inventory and purchase controls.
- Slots: existing static `_product-media` and `_product-details`; editable Group title + price (8px), divider, description, variant picker, inventory, buy buttons. No extra view-details/badges absent from Figma.
- Figma: desktop 49056:7375, tablet 49384:13161, mobile 49390:14270. Scheme 1; padding 96 / 80 / 64; column gap 48 / 40 / 36. H3 title 32 / 30 / 28; price 18; detail spacing 24 / 24 / 20. Desktop gallery previews next image and overlays 64px thumbnails; tablet thumbnails below, mobile thumbnails below.
- Runtime: reuse product-media, variant-picker, inventory and buy-buttons controllers. Extend gallery with opt-in overlay-thumbnail carousel layout, using existing bottom-thumbnail mode and responsive controller lifecycle. Real media remains Shopify resource data; empty state uses outline placeholders.
- QA: schema values and platform nesting, Theme Check, JS syntax, upload to named draft, responsive geometry, tab arrows/pagination and editor selectability. Images/catalog deferred by user; real purchase/variant data tests require selected product.

# Collection tabs controls correction

- Scope: bottom navigator and progress bar in `collection-tab`; preserve scoped selectors and shared controller. Match product-list footer: 24px icons, 28px between arrows, 76px control width, 40px gap from progress bar; mobile arrows hidden. Add the same thickness setting as Product list, default Standard to preserve existing instances; Strideo uses Thin.

## Validation receipt — 2026-10-04

- PASS: uploaded named draft Strideo-template (chieutt), 191953273131; no publish or Git commit.
- PASS: Theme Check 0 errors / 35 pre-existing warnings, `node --check assets/product-media.js`, `git diff --check`.
- PASS: widths 375, 767, 768, 1149, 1150 and 1600 without horizontal document overflow. Featured product padding 96/80/64, tablet equal columns with 40px gap, mobile single column.
- PASS: desktop gallery shows 1.45 images; overlay thumbnails 412x72 (64px each, 4px gap); tablet gap 8px and thumbnails below; mobile thumbnails below. Clicking thumbnail 2 activates media `placeholder-2`.
- PASS: price 18px, divider local margins 0, H3 title. Editable title/price Group and product roles appear in Theme Editor; new gallery option selected and translated. Editor Save disabled confirms no unsaved edits from QA. Existing restore-session notification was not acted on.
- PASS: Collection tabs Men/Women switching and Next slide after switching Women, active slide 1/8 -> 2/8, progress fill advances. Desktop footer geometry matches Featured collection: 76px navigation, 24px icons, 1420x2px progress at 1600px viewport, 40px control gap. Mobile navigation hidden under existing contract.
- NOT TESTED: real variant/color media, inventory changes, cart and accelerated checkout without a selected running product. Product selection and media remain deferred; canonical placeholder copy/disabled purchase action is intentional.
- NOT TESTED: destructive/reordering editor interactions; existing slots unchanged, only a gallery enum was added. No user session was saved over.
- Screenshots: output/strideo/featured-product-desktop.png, featured-product-mobile.png, collection-tabs-controls-desktop.png.
