# Peekoo collection thumbnails

## Section build plan

- Role/placement: browse by age; existing `collection_list` in `templates/index.json`, after scrolling text.
- Context: five user-supplied images; no collection resource assigned until a matching destination is supplied.
- Ownership: template composes existing collection-thumbnail blocks and Header; section owns spacing and layout; global H2 supplies typography.
- Slots: five editable image items, ordered 0–6 months, 6–12 months, 1–2 years, 3–4 years, 5+ years. Existing static Header reads “Shop Gifts by Age”.
- Output: existing shell/carousel; hide redundant collection titles through section-scoped CSS, preserve meaningful image alt text.
- Runtime: existing collection-thumbnails carousel; static centered desktop, swipe on tablet/mobile; no JS edits.
- Responsive: 160px images, square corners to preserve painted rings; gap 48/20/16px; padding 80px top and 96px bottom desktop, 64px tablet, 56px mobile. Header gap 48/48/36px.
- QA: confirm all uploaded images, geometry, hidden titles, responsive overflow, carousel reachability, Theme Check and diff check.

Figma nodes: desktop `49017:22796`, tablet `49234:4694`, mobile `49234:5729`.
Image files are uploaded unchanged from the user's attachments to Shopify Files with `peekoo-age-*` filenames. Desktop range accepts 159px; scoped CSS supplies the exact 160px design width. Tablet adds 4px trailing padding to all but the last card, supplementing the existing 16px carousel gap without changing Swiper's item measurements.

## Verified result

Scoped index upload to unpublished Peeko theme `192108396843` succeeded. All five Shopify images load and all collection titles have `display: none`. Desktop: centered 160px images with 48px gaps, section height 424.8px. Tablet: 160px images with 20px gaps, height 374.4px; Next collection reaches the last image exactly at the container edge. Mobile: 160px images with 16px gaps, height 344px; no horizontal page overflow. Theme Check reports 0 errors; `git diff --check` passes. No changes to shared Liquid or JavaScript were required. Collection destinations remain unassigned because this request specifies images only.

User update: image_corner_radius uses Full instead of Custom0. Existing square images now clip to circles through --collection-thumbnail-radius:50%; image and layout data unchanged.
