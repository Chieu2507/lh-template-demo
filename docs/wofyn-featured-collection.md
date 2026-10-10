# Wofyn Featured collection — Top Picks

## SectionBuildPlan
- Branch: Wofyn-template; existing instance `peekoo_featured_07`, section `featured-collection`.
- Figma: desktop 47155:13196; mobile 47557:6002 in G7y5fdxzoVS9pDqslTl1Pp.
- Reuse static Header → Heading, View all button, Product list → Product card. Remove old description and sale promo from this instance.
- Layout: scheme 2, desktop padding 96/96, mobile 64/64; header/list gap 40 desktop, 36 mobile; four products, four desktop columns, one mobile column; gap 20, no next-card preview, no arrows; mobile progress 2px with 36px spacing.
- Resources: keep new-arrivals-perky until Wofyn product data exists. Search found no Fable / Magic Link / Ancient Grains / Wofyn products. Images, titles, prices, badges remain actual Shopify data.
- Shared Theme Settings own product card appearance across this Wofyn theme: card style, white scheme, centered 16px bold title, square image, soft shadow, one-line title. Hide quick add/view and swatches to match the visible design.
- No Custom CSS or base capability changes.

## Fidelity limits
- Existing card contract has no outer 16px media inset, independent 12px media radius or complete 20px information padding. Preserve base behavior and record the gap.
- Soft shadow is a base preset and differs from Figma's precise two-layer shadow.
- Existing Nunito retained per user decision. Heading font is used for the bold product title.
- Reviews require real data and a supported renderer; no synthetic stars/counts.
- Page width uses accepted 1400px foundation including margins; desktop cards are narrower than Figma's 1400px inner content.
- Mobile View all inherits section alignment (left); the base does not independently center only that action.

## Validation
- Theme Check: 0 errors, 36 existing warnings; git diff --check passed.
- Preview checked at 1920px, 1280px and 375px: four desktop cards; mobile 343px card; no horizontal page overflow.
- Mobile drag advances to second product and updates progress; progress height 2px, full content width, 36px top gap.
- Theme Editor received Top Picks and confirmed section gap 40/36, padding 96/96 and 64/64; Save disabled (synced). Kept current editor session.
- View all links to the current collection and appears after the carousel on mobile.
- Proof: /private/tmp/wofyn-featured-desktop.jpg and /private/tmp/wofyn-featured-mobile.jpg.
- Product-card content spacing controls currently affect standard style only, so card style retains base compact information area. Soft shadow is very faint with the current shadow color token.
