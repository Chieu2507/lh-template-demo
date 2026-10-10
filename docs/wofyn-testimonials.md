# Wofyn Testimonials — Section Build Plan

- Role / placement: customer reviews; rebuild existing `perky_testimonials` homepage instance, preserving section and first two card IDs.
- Context: two supplied Figma review texts, author portraits and pet photos; no catalog or third-party review data invented.
- Ownership: Testimonials Cards owns carousel, columns, outer gaps, scheme and padding. Review Card owns horizontal/vertical layout, white surface, radius, shadow and inner padding. Groups own content/author arrangement. Shared Image, Heading, Text and Star rating own media/typography/rating.
- Slots: static Header with heading; two review cards, each with content Group (rating/title/review, author Group) and pet Image. Image block source remains unchanged; use existing mobile-first setting.
- Runtime/output: existing carousel-block.js / Swiper, responsive reveal and Theme Editor attributes; no Custom CSS.
- Responsive: desktop two cards, gap 28px, horizontal content/image, 16px card padding and radius; square photo radius 12px. Mobile one card per view, photo before text, 24px gaps; section padding 96px desktop / 64px mobile, header gap 40px / 36px.
- QA: schema/ranges/capacity, Theme Check, diff whitespace, exact four media assets, desktop/mobile geometry, swipe and editor selection.

Desktop Figma `47155:13597`; mobile `47557:6234`. Nunito retained as requested. Existing card shadow preset used. Controls/rating styling that cannot be represented by existing contracts must be reported, without template-specific CSS.

Reusable contract extensions: section owns optional header navigation and pagination type/device visibility/thickness; defaults retain existing bullets. Star rating owns optional color and gap; blank color retains the previous gold asset. Wofyn uses the exact Figma star asset as a CSS mask. Shared Image source remains unchanged.

## Validation

- PASS: Wofyn-template only; remote target 192149684523. Shared Image implementation unchanged by this task.
- PASS: four Figma images converted to WebP and uploaded; both review texts/authors mapped without invented reviews.
- PASS: desktop two cards, 28px gap; mobile 375px card 343px, square photo 311px, card height 616px, section height 854px. Mobile order, 64px avatar, blue 18px stars with zero gap, 2px progress bar and 36px pagination gap verified.
- PASS: device bands 767/768/1149/1150 resolve columns 1/1/1/2, section padding 64/96/96/96 and navigation hidden on mobile. Testimonials container stays within the viewport. A pre-existing whole-page scroll width of 778px at 768px was observed outside this section's bounds; not changed here.
- PASS: tablet Next activates Jerome's review and disables Next at the final slide; Previous becomes enabled. Desktop controls disabled when both real cards fit. Mobile progress fill is 50% for two real reviews; Figma's 25% would require four reviews.
- PASS: Theme Editor section selection, new Navigation/Pagination controls and saved mobile/thin/progress settings verified; editor reload and watcher reload do not create duplicated controls.
- PASS: Theme Check exits 0 with 104 existing repository warnings and no errors; git diff --check clean. No JavaScript changed.
- NOT TESTED: physical touch swipe, keyboard navigation, add/remove/reorder lifecycle. Existing shared Swiper/controller retained.
- Compatibility: blank star color preserves the previous gold asset; default gap remains 4px. Existing section presets retain bullets/all devices and navigation off. Schema literal exceptions follow the existing Product list pagination controls and the existing Star rating block's literal labels; no duplicate translation keys added.
- Deferred component bundle rebuilt using the repository build script and synchronized, so storefront and editor consume the same section CSS. Preview watcher remains requested and active on localhost:9294.
- Visual differences retained from shared theme settings: Nunito fonts, theme button size and small shadow preset.

## Icon rating update — 2026-10-10

- Testimonials review-card allow-list and card/section presets now use the shared Icon block with `five-stars`. Both homepage rating blocks retain their IDs and order, with a 90px icon width. Presets use 100px.
- Color and SVG proportions follow the shared Icon library; the previous custom star color/gap settings no longer apply to these instances. The legacy Star rating block remains available for compatibility.
- Local schema/template JSON and whitespace validation: PASS. Theme Check: PASS (0 errors; 104 repository warnings). Theme Editor and storefront visual QA for this update: NOT TESTED.
