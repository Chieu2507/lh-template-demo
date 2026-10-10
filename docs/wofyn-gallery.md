# Wofyn Gallery — Section Build Plan and QA

- Role/placement: decorative pet photo gallery in homepage JSON, after Testimonials and before Blog posts.
- Figma: desktop 47155:13607; mobile 47557:6259. Six exact Figma photos uploaded as WebP to Shopify Files; eight slots repeat the first two.
- Authorization: user explicitly approved Rotate and requested Gallery (custom).
- Ownership: Gallery (custom) owns full-width layout, Appearance and final Padding group. Shared Marquee owns continuous rightward loop and gap. Marquee Image owns the image picker, square ratio, responsive width, corner radius and Rotate.
- Reuse: existing Gallery layout CSS, shared Marquee controller and image renderer. No new JS, global tokens or template Custom CSS. Shared blocks/image.liquid preserved during this task.
- Slots: Gallery (custom) → Marquee → eight Marquee Images; image and block order remain editable. Section capacity 50; preset contains nine nested blocks.
- Rotation: Rotate -25..25°, default 0 retains the old image markup. Nonzero Rotate wraps media, clips radius on the inner image, and reserves its rotated bounding rectangle. Original/non-square ratios resolve to their actual image aspect ratio.
- Wofyn instance: ±10° alternating; desktop photos 160px, gap 64px and padding 112px; mobile photos 120px, gap 48px and padding 80px; radius 12px. Numeric values belong to the saved instance and custom preset.
- Responsiveness: tablet inherits desktop; mobile uses standard 767.98px breakpoint, padding toggle preserves zero and inherits desktop when off.
- Motion: existing marquee lifecycle, pause-on-hover/focus and reduced-motion CSS retained.

## QA

- PASS: exact new section/block schema accepted by Shopify target Wofyn theme 192149684523; saved index migration accepted.
- PASS: saved settings/select values/range boundaries and steps validated; git diff --check clean.
- PASS: Theme Check exit 0; 104 pre-existing warnings, no errors, no offenses in the new section or changed Marquee Image.
- PASS: desktop preview at 1280px renders 409.344px section height and 185.344px rotated frame (Figma 409.353/185.353; browser rounding). Photos load, 64px gap, correct +10° transform, rightward animation and loop.
- PASS: Theme Editor reload shows Gallery (custom), eight photo slots, saved 160/120px width, square ratio, custom radius 12px and Rotate 10° control.
- Capacity fix: initial max_blocks=1 blocked adding/duplicating nested photos; corrected to 50.
- Local preview watcher restarted with the custom section and Marquee Image included; explicit Wofyn target, port 9294. Prior watcher stopped.
- PASS: mobile 375px and 767px: 120px square media, 139px rotated frame, 299px section, 80px padding, 48px gap, 12px radius, rightward loop with 16 track children (eight originals/eight clones), no page overflow. Screenshot: /private/tmp/wofyn-gallery-custom-mobile.jpg.
- PASS: desktop/tablet 768/1149/1150px retain 160px media, 112px padding and 64px gap. Page-wide horizontal overflow was observed at 768px; its origin was not isolated in this scoped gallery change. No overflow at 1149/1150px.
- PASS: capacity fix reflected in Editor: Add block and Duplicate enabled; Rotate control accepts 0 on blur. Save test encountered Shopify's concurrent-customization conflict; selected Refresh theme editor, did not override recent customizations. Reload restored saved Rotate 10°. No test-only changes were saved.
- PASS: viewport reset and Gallery editor marked as deliverable; local watcher remains active on 9294.
- NOT TESTED: physical touch, reduced-motion preference, section/block add/duplicate/reorder/remove/save after mutation, non-square rotation runtime and padding toggle/zero runtime. Shared controller retained; no new listeners.

## Corner radius synchronization

- Marquee Image now uses the canonical Image Corner radius and Custom corner radius settings: identical translated labels, options/order, defaults, range and visibility. Existing saved values preserved.
- Liquid resolves presets 2/4/6/8/12/16/24/32px and Inherit/Square/Rounded/Full/Custom through the same theme tokens and validation as Image. Radius clips the inner rotated media; its reserved frame remains square. Shared Image unchanged.
- PASS: canonical schema equality, git diff --check, Theme Check exit 0 (104 existing warnings), watcher synchronized only the changed block. Editor reload exposes all 13 standard options and Custom corner radius; saved eight images retain 12px. Screenshot: /private/tmp/wofyn-gallery-radius-editor.jpg.
