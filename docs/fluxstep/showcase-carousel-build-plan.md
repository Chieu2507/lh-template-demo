# Showcase carousel — Fluxstep

- Role/placement: editorial content, addable index section, fourth after Collection list.
- Context: merchant-selected images; no product/resource inference. Preserve all existing sections.
- Ownership: section owns centered carousel, width, navigation, background and external spacing. Static Header and static Image/Group within each repeatable Showcase item reuse shared Theme Blocks. Group owns Heading/Text/Button composition and gaps.
- Runtime: shared Swiper factory; three cycles for seamless small-count looping, original-only pagination, active item scheme/background, optional reference cursor navigation, scoped editor selection and teardown. Reuse hero background parallax runtime.
- Responsive: Figma overlay mode uses 820px central card at 1920px, 80px desktop gap, shorter side media, centered content; mobile one card with page margins and bullets. Below-image mode retains reference scaling. Motion respects reduced-motion.
- QA: Theme Check, JS syntax, schema/preset/JSON mapping, carousel wrapping, one/zero/many items, two instances, nested block selection, cleanup, mobile/tablet/desktop, keyboard.
- Reference: Elvara Trial theme 191896977707, showcase_carousel_KJRygm. Read editor controls and public rendered DOM/CSS/runtime. CLI cannot pull Trial theme. Reference files stay in /private/tmp.
- Figma: desktop 49657:22524; Run your own pace, dark scheme, overlay title/CTA, static circular arrows, mobile dots.

## Validation — 2026-10-05

- Branch: `Fluxstep-template`; no Git commit or push performed for this change.
- Uploaded only changed theme files to existing unpublished Fluxstep theme `191986827563`. Shopify accepted section, block, preset and template schemas. No live theme update.
- Theme Check: 0 errors, 36 pre-existing warnings, no offenses in new Showcase files. `node --check` and `git diff --check` passed.
- Existing sections: only prior Collection list work differs from HEAD; slideshow, Featured collection and all remaining sections retain their original data. New Showcase is fourth.
- Desktop 1920px: active card 820 × 656; side images 820 × 583.11, 80px gap. Dark scheme and overlay CTA render.
- Runtime: arrows advance 1 → 2 → 3 → 1; after wrap active slide resets to original, clones stay inert, no duplicate IDs. Original slide labels use 1/3 rather than clone count.
- Responsive: 768px tablet and 375px mobile have no document horizontal overflow. Mobile pagination selects the requested original; white dots contrast with the scheme. Screenshot: `qa/showcase-mobile.jpg`. No console errors observed in preview.
- Editor: section settings and static Header/Image/Group hierarchy rendered. Further nested-selection/add/remove/reload/two-instance/empty/single-item runtime QA remains unverified because the reopened Shopify editor reported account permission denied.
- Fidelity still incomplete: two side images could not be exported from Figma and are intentionally unassigned. Exact mobile Figma comparison remains pending because the frame would not reload. The preview is reviewable but is not a 100% fidelity sign-off.
- Static block architecture follows https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/static-blocks. Static Image/Group slots do not expose dynamic children; section accepts only repeatable Showcase items.

## Hover/navigation correction

- Removed media zoom, inactive-image scaling and height morph during slide navigation per user request. Horizontal Swiper movement remains.
- Arrow position now uses CSS `translate`; a scoped `transform: none` prevents the global button hover transform from replacing its horizontal offset.
- Uploaded only `assets/showcase-carousel.css` to unpublished Fluxstep 191986827563.
- Preview verification: Next at x=1346 before/after hover and click, transform none, translate 50%. All nine rendered media wrappers stay 656px tall at 1920px and image transforms are none. Diff whitespace check passed.

## Showcase item controls correction

- Removed item Appearance controls and item-specific color/background inheritance. Section Appearance still owns the section background.
- Empty section Background media image uses the shared `lifestyle-1` placeholder.
- Below-image navigation measures the active media center independently of content height; ResizeObserver updates alignment on layout changes and disconnects on section unload.
- Added four content padding controls for desktop and optional separate mobile values, defaulting to 32px desktop and 16px mobile.
- Uploaded only the section, item block, CSS and JS to draft 191986827563; saved index configuration was preserved remotely.
- Theme Check: zero errors and no Showcase findings. JS syntax and diff whitespace checks passed. Public overlay preview measured navigation center error 0px with 656px media height and 32px content padding.
- Direct editor validation of below-image mode and new controls remains unverified: Shopify reports account permission denied. Screenshot: `qa/showcase-item-padding.jpg`.

## Navigation controls consistency

- Removed standalone Show pagination. Show navigation owns desktop arrows/cursor and mobile dots. Existing navigation_mode ID is preserved and labelled Mode.
- Added Style (Primary/Secondary) and Icon (Chevron/Arrow/Long arrow), matching Slideshow IDs, options, defaults and visibility. Both arrows use shared button variants and the shared icon snippet. Cursor CSS no longer overrides selected button colors.
- Uploaded only section Liquid and CSS to draft 191986827563, preserving saved remote template settings.
- Theme Check: zero errors, no Showcase findings. JS syntax and whitespace checks pass. Desktop Next advances to 2/3. At 375px dots select slide 1 correctly, with no document horizontal overflow.
- Editor variant switching: NOT TESTED due to previously confirmed account permission denial.
