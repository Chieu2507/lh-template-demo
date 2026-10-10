# Wofyn — Your Care, Their Comfort

## Section Build Plan

- Role: content / collection merchandising.
- Placement: homepage JSON, immediately after the Wofyn Image with text story.
- Context: merchant-selected collection in Product List; blank selection uses its existing six semantic product placeholders. No invented catalog records.
- Ownership: Featured collection banner owns container, banner width, order, gap and section padding. Banner owns media, crop, content positioning and padding. Heading/Button own editable copy. Product List owns resource query and grid. Product Card and Theme Settings own commerce presentation and typography.
- Slots: reuse static Header (disabled), Banner (Heading + Button), Product List (static Product Card). Preserve unrelated instances and the Image block.
- Output/runtime: existing Liquid render path and standard editor attributes; no new markup, CSS, JavaScript or Custom CSS.
- Responsive: desktop banner 448px, ratio 5:7, products 3 × 2; mobile banner 7:6, centered content, products two columns. Tablet inherits existing component behavior.
- QA: Theme Check, diff whitespace, schema/value validation, preview image loading, rendered desktop/mobile geometry, editor visibility.

## Figma mapping

- Desktop node: `47243:13989`, mobile node: `47557:6194` in file `G7y5fdxzoVS9pDqslTl1Pp`.
- Banner: Figma image converted to WebP (`wofyn-toys-banner.webp`, 896 × 1255).
- Copy: “Your Care, Their Comfort”; “Shop Toys”. Existing Nunito retained as requested.
- Section: scheme 1, page width, gap 32px, desktop vertical padding 96px, mobile vertical padding 64px, overlap off, Header disabled.
- Banner: radius 16px, bottom center desktop / center center mobile, gap 20px, padding 32px vertical / 40px horizontal, scheme 3.
- Products: six placeholders pending a Wofyn toys collection, desktop horizontal/vertical gap 20px, mobile gap 12px. CTA temporarily points to the existing collections listing until a toys collection is selected.

## Remaining contract gaps

The existing Product List exposes only an all-device Grid/Carousel choice; it cannot select desktop grid + mobile carousel. Its desktop row gap shares the horizontal gap. Banner overlay is shared across devices. Therefore mobile swipe/progress bar, desktop row gap 32px and mobile-only dark overlay 20% require explicit reusable component extensions; no styling workaround is added.

## Validation

- PASS: JSON schema values/options/ranges; static children excluded from dynamic order; 16 homepage sections; no Custom CSS in the new instance.
- PASS: git diff --check.
- PASS: Shopify Theme Check at error level (0 errors; repository warnings remain).
- PASS: scoped index upload to Wofyn theme 192149684523.
- PASS: storefront desktop at 1440px: banner width 448px, height 627px, six cards in three columns, heading 30px, loaded WebP, empty Header height 0 and header gap set to 0.
- PASS: mobile at 375px: banner 343 × 294px (7:6), radius 16px, two product columns, gap 32px, vertical section padding 64px, no page overflow.
- PASS: Theme Editor lists and selects “Featured collection — Shop Toys”; settings panel exposes existing Overlap, Gap and Padding groups; Save is disabled after synchronized upload.
- NOT TESTED: editor add/duplicate/reorder lifecycle (existing section kernel unchanged); real Wofyn product data unavailable.
- FOLLOW-UP: mobile carousel/pagination, independent desktop row gap and mobile-only overlay need component contract approval.
- Evidence: /private/tmp/wofyn-toys-banner-desktop.png and /private/tmp/wofyn-toys-banner-mobile.png.
