# Multiple images with text — Strideo

- Role / placement: editorial homepage section immediately before Scrolling text; Strideo-template draft 191953273131.
- Reference: Balance draft 191961071915, section-9, read-only audit. Each repeatable Item pairs an image and content; stacked images and Previous/Next switch in sync. Do not copy trial theme source or its schema.
- Figma: desktop 49053:7050, tablet 49384:13083, mobile 49390:14197. Scheme 1, padding 112/96/80, columns gap 64/40; image frame 6:7 with small clockwise offsets; desktop content centered and controls at its bottom; tablet controls below image, content top; mobile image → controls → centered content.
- Ownership: global width/fonts/buttons/schemes remain global; section owns placement, responsive column flow and controls. Each Item owns a static canonical Image role and freely editable Group/Heading/Text/Button content. Image owns its picker, ratio, width and radius.
- Slots: up to 8 dynamic Items, default 3. No app slot. First copy from Figma, later items use editable running demo copy; images stay placeholder per prior user deferral.
- Runtime: custom element owns stacked transitions, synchronized content, wrapping navigation, keyboard, reduced motion, editor selection and cleanup. Images are moved into the shared visual stack without recreating blocks or attributes. Static Image IDs remain stable within each Item.
- QA: schema and static block/order integrity, Theme Check, JS syntax, named draft upload, responsive geometry/overflow, controls/keyboard and nested editor selection; editor selection checked in a fresh session without saving over user work.

## QA receipt — 2026-10-04

- Uploaded to explicit draft 191953273131; no publishing or Git commit.
- Theme Check: 0 errors, 35 existing warnings. JavaScript syntax and git diff whitespace checks pass.
- Runtime: desktop 1920, tablet 768, mobile 375 have no horizontal overflow. Padding 112/96/80; desktop two columns, tablet controls below image, mobile image → navigation → centered content. Final mobile heading 32px and body 16px.
- Navigation: Next and ArrowRight change matching image/content; Home returns to first item; inactive content is inert. Three editable items are present.
- Editor: selecting item 2 shows “Comfort that keeps pace.”; its nested Group opens the canonical editable Group settings and child Group/Button tree. Save remains disabled after selection-only QA.
- Lifecycle add/remove/reorder and reduced-motion device emulation were not runtime-tested in this pass. Disconnect cleanup and reduced-motion CSS were inspected.
- Images intentionally remain canonical placeholders following the earlier image deferral. No image files added to assets.
- Evidence: output/strideo/multiple-images-text-editor.png and multiple-images-text-mobile.png.

## Item settings and responsive padding follow-up

- Item owns desktop content vertical position (Top / Center / Bottom); canonical Group still owns child alignment, spacing and typography. Tablet/mobile preserve the image → controls → content flow.
- Section now reuses Featured collection's Customize tablet padding / Customize for mobile schema with conditional top/bottom controls. Strideo values remain tablet 96px and mobile 80px. Removed the instance Custom CSS padding rules.
- Pulled draft index before mutation; no remote differences. Theme Check 0 errors / 35 existing warnings; JS syntax and whitespace checks pass. Uploaded only section, Item block and index to draft 191953273131.

- User correction: removed tablet padding customization. Tablet uses normal responsive scaling; only Customize for mobile remains, with 80px top/bottom.
