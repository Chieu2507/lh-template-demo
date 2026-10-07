# Perky — Hotspot: Callout

## Section Build Plan
- Role/placement: promotional content, existing `hotspot` section in index immediately after featured collection.
- Context: three merchant-selected product resources; blank selections retain the existing product placeholders, never invented prices/products.
- Ownership: template JSON owns Perky composition; section owns width/spacing/card mode; Product callout owns media/content; Hotspot owns position/product. Global typography/buttons/schemes remain shared.
- Slots: existing static Header (hidden) and Product callout, with three editable Hotspot children.
- Runtime: existing product-callout-runtime, click/Escape/quick view and section lifecycle retained.
- Responsive: desktop 720px full bleed, bottom-left content; mobile 16:9 media and content below. Existing scheme extended with an optional mobile content scheme; empty selection preserves current behavior.
- Reusable gaps: add 16:9 mobile ratio and gradient overlay option to Product callout. Template-scoped CSS owns exact layout geometry; no new section or block type.
- QA: Theme Check, template/schema settings coverage, image upload/save/reload, desktop/mobile preview, three popovers and Escape.

Figma: desktop 49005:7250 / image 49248:8166; mobile 49339:12691.

## Delivery / QA
- Uploaded optimized JPEG through Theme Editor: `shopify://shop_images/perky-hotspot-room.jpg`. No theme asset image added. Editor Save completed and sync downloaded the selected image to local index JSON.
- PASS: desktop media height 720px; mobile 375px media height 210.9375px, content below with white scheme and green CTA. Shared XL heading gives 34px desktop / 30px mobile.
- PASS: all three hotspot buttons open existing product popovers; Escape closes them. Empty products use existing placeholders, with quick view disabled. Product-dependent price/quick-view: NOT TESTED because products remain unselected.
- PASS: gradient overlay and mobile scheme render through Liquid; content, images, hotspots and section settings remain editor-controlled. Added optional Product card position (Side by default, Below selected here) preserves existing compact callout behavior.
- PASS: Theme Check 0 errors / 36 existing warnings, git diff --check.
- New schema labels use documented literal English as in neighboring image-ratio/card-layout controls. No JS controller fork.
- Editor add/duplicate/reorder/remove and translated long content: NOT TESTED; existing section lifecycle retained. Preview watcher intentionally kept running for the ongoing local editor task.
- Screenshots: /private/tmp/perky-hotspot-desktop.png, /private/tmp/perky-hotspot-mobile.png.

## Fixed hotspot media
- Global hover zoom excludes Callout, Gallery and Full width carousel section images, plus reusable Product callout images. Hotspot marker/popover interactions remain unchanged.
- PASS: storefront image under actual :hover has scale=none, transform=none and clip-path=none; Theme Check 0 errors and git diff --check passes.

## Placeholder price
- Unselected product hotspots show the shared Product Card placeholder price (19 shop currency units), respecting Show price. Real products keep their actual prices. Storefront verified $19.00; Theme Check 0 errors.

## Native settings instead of Custom CSS
- Removed all perky_hotspot.custom_css. Content maximum width (445), desktop spacing (60 horizontal / 63 vertical), mobile padding (20 top / 16 sides / 10 bottom), and compact product image size (112) are native settings mapped through Liquid CSS properties. Optional spacing overrides preserve existing defaults when disabled.
- Shared dot-style CSS owns 36px idle / 48px expanded markers, 16px center, transparent dark background, and expanded scheme-colored border. All compatible callout/gallery/carousel dots share this style.
- Product images request 2x their configured displayed size, using an accurate sizes attribute.

Validation: Theme Editor exposes and preserves the native settings. Desktop computed content width/inset/padding is 445px/60px/63px; compact card image is 112px. At 375px mobile, content padding is 20px 16px 10px. Theme Check: 0 errors (36 existing warnings).

Square corner fix: scene background scopes `--media-radius` to `--product-callout-media-radius`, so the image and its frame use the same local setting. Storefront QA PASS: global media radius 8px, Square frame/image radius 0px. Theme Check: 0 errors.
