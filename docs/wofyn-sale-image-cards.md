# Wofyn sale Image cards

## Section Build Plan

- Role / placement: two promotional banners in homepage JSON; update existing `peekoo_image_cards` immediately after Shop Toys, preserving section/card IDs.
- Context: static Figma promotional media/copy, CTA uses collections listing pending merchant selection of Wofyn sale collection.
- Ownership: Image cards owns responsive direction, container, external gap/padding. Image card owns media/crop/radius/hover and content placement. Group owns text composition/width; Eyebrow, Heading, Button own editable content. Theme Settings owns fonts and buttons.
- Slots: two existing Image cards, each with Group (Eyebrow + Heading), followed by Button. No Image block changes.
- Runtime/output: existing media-card renderer, standard Shopify editor attributes and reveal/hover lifecycle. No new CSS, JS or schema.
- Responsive: desktop two equal cards 3:2, gap 20px; mobile stacked squares with 20px gap. Center-left content, padding 48px desktop / 24px mobile, content gap 40px / 32px. Radius 16px, hover zoom enabled.
- QA: validate saved schema options/ranges and JSON capacity, Theme Check, diff whitespace, loaded desktop/mobile images, geometry/overflow, editor selection.

## References

- Desktop Figma `47155:13568`; mobile `47557:6210` in `G7y5fdxzoVS9pDqslTl1Pp`.
- Static assets converted to WebP: wofyn-clearance, wofyn-clearance-mobile, wofyn-price-drop.
- Existing Nunito typography retained per user instruction. Text group uses current fit-width contract on desktop and 240px maximum for the first card and 200px for the second on mobile (Nunito keeps the first heading on two lines); no unsupported 256px desktop max-width added.
- Section top padding 0, bottom 96px desktop / 64px mobile; white scheme 1. Overlay off.

## Validation

- PASS: saved schema options/ranges, JSON capacity, git diff --check.
- PASS: Shopify Theme Check, 0 errors (existing repository warnings remain).
- PASS: upload of three WebP files and scoped template push to Wofyn theme 192149684523.
- PASS: desktop 1280px, two 582 × 388px cards (3:2), gap 20px, radius 16px; correct desktop media loaded.
- PASS: mobile 375px, stacked 343 × 343px cards, gap 20px, no horizontal overflow, two-line headings; correct dedicated first mobile image loaded.
- PASS: Theme Editor lists/selects Image cards — Shop Deals, Vertical on mobile enabled, Gap/Padding groups present, Save disabled after sync. Add/duplicate/reorder lifecycle not retested; section/block kernels unchanged.
- CTA destination remains collections listing until a Wofyn sale collection is chosen.
- Proof: /private/tmp/wofyn-sale-desktop.png and /private/tmp/wofyn-sale-mobile.png.
