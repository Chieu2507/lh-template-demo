# Wofyn — Image with text (custom)

Figma: G7y5fdxzoVS9pDqslTl1Pp, desktop 47155:13469 / mobile 47557:6184.

## Section Build Plan

- Role: editable content section, homepage after featured product.
- Placement: index JSON, `wofyn_image_with_text`; no commerce resource context required.
- Ownership: theme typography, colors and button tokens remain global. Section owns two-column layout, position, gaps and outer padding. Group owns text spacing/alignment. Images owns overlapping canvas/slot geometry, frame and rotation. Image owns media, crop and inner padding.
- Slots: static Content Group and Images; Content Group contains removable Header/Heading/Text and Button. Images contains two static Image children, semantic placeholders in the add-section preset.
- Output: accessible heading, linked CTA, descriptive image alt text; no additional script.
- Responsive: desktop content then images; mobile images then content. Tablet inherits desktop. Canvas aspect ratio 668/640 scales to available width. Rotation uses individual CSS rotate so reveal/hover transforms remain independent.
- QA: validate schemas/preset and all configured setting IDs, upload only affected files to theme 192149684523, inspect editor and responsive storefront.

## Design settings

Container maximum 1400px, desktop gap 64px, mobile gap 48px. Section padding 64px desktop, 56px mobile. Content group gap 36px, header gap 16px. Current Nunito font retained per user instruction. Image frame white with 16px padding, global radius tokens and soft shadow; first image rotates -14.5deg, second is in front. Slot percentages rounded to existing whole-percent controls. Both source assets uploaded as WebP.

Rotate and optional mobile rotation live in each image position group on Images; default zero preserves existing placements. Show image frame lives on Images and defaults off. Image has no new settings or behavior. Canvas reference width defaults 780 to preserve imported Images behavior; Wofyn uses 668.

## Validation

Shopify accepted the new section/preset on Wofyn theme 192149684523. Theme Check reports zero errors (repository warnings remain). All configured child setting IDs and select values checked against their schemas. Storefront verified at 1920 and 1366px; canvas is 668×640 at 1920. Mobile 375px canvas is 343×328.6, images precede centered content, both WebP images loaded, rotation is -14.5deg/0deg. At 767/768/1149/1150px there is no section horizontal overflow; tablet retains desktop 64px padding. Editor shows both Images children; Images owns Desktop rotate -14.5deg and Show image frame enabled. No additional JS or template Custom CSS. Nunito introduces the accepted heading line-wrap difference from Figma.

Proof: `/private/tmp/wofyn-iwt-desktop.png`, `/private/tmp/wofyn-iwt-mobile.png`. Local dev restarted at port 9294, scoped to the four affected theme files.

User correction: removed all newly added rotation/frame code and schema from Image. Migrated values to Images first/second position controls. Theme Check zero errors; remote preset accepted and preview slot rotation verified -14.5deg/0deg. Proof: `/private/tmp/wofyn-images-rotate-editor.png`.
