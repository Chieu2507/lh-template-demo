# Fluxstep collection list with tabs

- Role/placement: existing homepage collection navigation, same `collections_image_list` position after Showcase carousel.
- Context: preserve Cloud, The Roger, Cloudmonster, Cloudtilt, Cloudsurfer resource handles, titles and primary images.
- Composition: use existing `collections-with-tabs` section and `collections-with-tabs-item` blocks, static `look-header`. Standard tabs switch one collection image; secondary images belong to the previous two-image layout.
- Ownership: global typography and schemes; existing section owns tab layout, appearance and spacing; each item owns its collection/title/image. Disable product counts, featured-product thumbnails and autoplay for this navigation.
- Runtime: existing scoped controller, with explicit click activation for touch and keyboard. Existing editor lifecycle/selection remains intact.
- Responsive: existing desktop two-column tab/image presentation; mobile image above tab list.
- QA: template/schema validation, Theme Check, JS syntax, diff checks; storefront tab switching and resource links at desktop/mobile. Verify New arrivals data and all other sections are unchanged by this migration.
- Delivery: upload changed files only to existing unpublished Fluxstep theme 191986827563, never the live theme.

## Validation

- Theme Check: 0 errors, 36 existing warnings; no findings in changed Collections with tabs files. JS syntax and diff whitespace checks passed.
- Shopify accepted all four changed files on unpublished Fluxstep theme 191986827563; final mobile typography update uploaded successfully.
- Desktop 1920px: title font uses Instrument Sans theme tokens; clicking The Roger/Cloudmonster updates the matching image. ArrowDown moves selection to Cloudtilt, one active panel remains.
- Mobile 375px: clicking The Roger and Cloudmonster activates their matching images; title uses the shared 32px XL token, no horizontal page overflow.
- All five collection destinations retained. Homepage order and all sections except `collections_image_list`, including `new_arrivals_tabs`, compare equal to the pre-migration local snapshot.
- Editor lifecycle and empty/single/two-instance runtime cases were reviewed but not exercised in the editor in this turn.
- Screenshots: `qa/collections-tabs-desktop.jpg`, `qa/collections-tabs-mobile.jpg`. No Git commit/push performed.

## Collection title controls correction

- Size uses Heading options/values/translations: display, xl, lg, md, sm, xs, custom. Added the same Custom size range (10–100px), scoped to this section. Existing title_size/title_tag IDs remain stable.
- HTML Tag uses Heading option values, translation labels and help text; semantic tag is independent of size. Legacy saved size values are normalized safely in Liquid.
- Removed the special mobile Display override; standard sizes consume shared responsive typography tokens.
- Migrated the draft's latest index title_size only from heading_1 to xl. All other saved remote section data was preserved; upload used a temporary staging directory rather than stale local index data.
- Theme Check: zero errors, no changed-file findings. Diff whitespace check passed. Uploaded section, item block and migrated index to draft 191986827563.
- Preview: all five titles render as H2 at 44px desktop and 32px mobile; Cloudmonster tab selection works and 375px has no horizontal overflow. Editor option switching remains NOT TESTED due to account permission denial.
- Screenshot: qa/collection-title-size-desktop.jpg.

## Active/inactive UI correction

Figma 49335:10631 has no header. Content columns gap 64px, square media, list vertically centered, each item 40px top/bottom, first top border and all bottom borders. Inactive title #999999, active inherits heading scheme. Only the active item's primary circular CTA is visible (48px with shared diagonal arrow icon). Preserve existing static header contract but hide its index instance; render no empty header shell. Grid uses actual item count, absolute overlaid panels and content-container relative sizing to center the list without adding empty grid tracks. Existing scoped tab controller synchronizes the active image aspect ratio. QA upload and desktop/mobile click/keyboard switching.
