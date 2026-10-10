# Wofyn Images import

2026-10-10. Source: Elara template (Minhle), theme192037847339 on layouthub-template-v2.myshopify.com. Destination: Wofyn-template, preview theme192149684523. Source downloaded read-only to /private/tmp/wofyn-images-source-192037847339.

## Block contract

Images owns an overlapping canvas, two fixed Image slots(first/second), width/height, padding, relative positioning, vertical anchors and front-image order. Image owns media sources, ratios, links, alt, overlays, backgrounds and radius. Static child blocks remain out of block_order. No JS or new external assets. Allowed inside existing generic Group composition; no unrelated curated section allow-lists expanded.

Imported blocks/images.liquid. Dependencies are existing blocks/image.liquid and snippets/size-style.liquid. Preset mapped source ratio_1_1 to square and ratio_2_3 to the supported custom2:3 setting. No Image kernel replacement: Wofyn's fixed widths, overlay, background, loading/sizes fixes and radius options are preserved. Size/Padding reuse existing schema keys; source-specific geometry labels remain literal. Mobile height label normalized. Source fill-height child selectors remain compatibility hooks; Wofyn does not expose that child ratio. Canvas Fill height is available.

## Validation

- PASS:168 Theme Block files, below300; two static children, shallow nesting.
- PASS: existing locale keys resolve; presets use supported Image settings.
- PASS: git diff --check and Theme Check0 errors, no Images findings.
- PASS: explicit push only blocks/images.liquid to draft192149684523; source unchanged.
- PASS: Editor Group Add block search lists Images; adding preset creates exactly two Image child slots and exposes the Images controls. QA addition undone; Save disabled and no test block remains.
- Proof:/private/tmp/wofyn-images-import-editor.png.
- NOT TESTED: custom geometry extremes, linked-image keyboard overlap, desktop/mobile storefront matrix, fill-height parent composition. These need testing when Images is composed in the requested Image with text section.

This finishes the requested prerequisite import. Full Wofyn Image with text composition/design content is the next implementation stage; it has not been added to index in this import step.
