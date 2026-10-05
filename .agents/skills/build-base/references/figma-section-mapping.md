# Figma section mapping and media sizing

Use this reference when translating Figma sections into this repository's Shopify base. These are project conventions approved during the Stroken build. Existing contracts on the selected branch and the user's latest instruction take precedence; Stroken measurements are examples, not defaults for every design.

## Image width and ratio are independent

- Keep both controls usable together. A section or parent column owns available width; the media block owns aspect ratio, crop, and focal position. Choosing Small/Medium/Large must not silently change the ratio, and choosing a ratio must not change the column width.
- For a banner column like `sections/featured-collection-banner.liquid`, use the existing maximum-width select: Small, Medium, Large. Its current mapping is 450px, 612px, 800px. Treat these as caps, not forced widths. Do not replace the select with an arbitrary pixel slider merely to reproduce one Figma frame.
- On desktop the current banner column is capped by both the selected maximum and its allocated half of the container after the gap. Product columns use the remaining space. On mobile the stacked banner fills the inner container; the desktop cap must not leave a narrow centered image unless the user explicitly asks for that layout.
- Use the existing ratio options and `snippets/image-ratio-value.liquid`: Adapt to image, Square, Portrait (4:5), Landscape (4:3), 7:6, Wide (16:9), Custom. Inspect the actual caller's schema: not every media kernel exposes every option.
- Custom ratio width/height are proportional inputs, not rendered pixel dimensions. A 612:928 ratio expresses shape; it does not force a 612px-wide image. Preserve independent desktop/mobile ratios and hide custom fields when another ratio is selected.
- In ratio mode, height follows actual rendered width divided by ratio. Do not add fixed height or `min-height` to force a screenshot measurement. The existing `banner_height: products` mode deliberately matches the product grid and overrides ratio on desktop; retain it as an explicit alternative.
- Record the chosen width cap, ratio, image position, and height mode in the template instance. Never assume that saved custom ratio values apply while `image_ratio_desktop` is set to Portrait or another preset.

## Measure and map before adding controls

- Inspect the relevant desktop, tablet, and mobile Figma nodes. Record outer section width, inner container, margins, padding, column allocation, gap, image shape, content order, and scheme. Distinguish Fill/Hug/maximum width from fixed dimensions.
- Find the current section/block/snippet that already provides those controls. Configure it first; extend only a missing capability with a clear owner. Prefer `banner`, `product-callout`, `media-card`, `media-background`, `image`, Group, Header, Heading, Text, Button, and shared carousel kernels where their contracts fit.
- Use the theme's configured page width and responsive margins rather than copying artboard width into each section. Typography roles, button variants, input behavior, scheme colors, and radius presets remain base-owned.
- Keep layout and sample copy in `templates/*.json` or presets. Section/block defaults must remain reusable. Do not encode a template name, literal block ID, or Figma node ID as runtime behavior.

## Editable content and nested Theme Blocks

- Compose content surfaces with Group for flow, width, padding, gap, alignment, border, background, and blur. Keep heading, text, and button content independently editable. Read `template-composition.md` for the approved ownership and responsive rules.
- Check every nested Group's mobile width. An outer Fill setting does not guarantee that its child fills the remaining space. Avoid applying the same inset on both the card and Group.
- Render nested Theme Blocks through `{% content_for 'blocks' %}`. Do not assume `block.blocks` can be enumerated or used to detect child content. For a legacy fallback, capture the rendered children, strip the result, and use the fallback only when that rendered output is empty.
- Keep static block calls, their IDs/types, schema allow-lists, and JSON `static` entries consistent. A dynamic composition also needs matching `block_order` and editor attributes on each child root.
- Reuse Shopify product/collection pickers and actual resource data. If design answers or copy are missing, ask only when it matters; use clearly documented editable sample copy when the user has chosen that option. Do not treat a past approval for samples as authorization for every future task.

## Media assets and image coverage

- Get actual image assets from Figma design context. A screenshot is visual QA, not a source image to upload. Keep original image pixels separate from text/buttons and CSS overlays unless the provided asset itself already contains the effect.
- Upload requested content images to Shopify Files and bind the image pickers with `shopify://shop_images/...`. Use the actual hosted basename: an upload named `.png` may be stored as `.jpg`. Do not infer the saved image reference solely from the requested filename.
- Verify the destination store before uploading and the current development theme before sending template changes. Store domains/theme IDs from old build receipts are evidence to recheck, not permanent defaults. Upload only the intended files and preserve unsaved user editor sessions.
- Assign a distinct mobile source when the design supplies one. Otherwise use the desktop fallback or the same source intentionally, with the mobile ratio/crop setting. Check the rendered result rather than assuming a source asset already has the frame's ratio.
- In a constrained background frame, the wrapper, `picture`, and `picture > img` must all cover the frame; the image uses `object-fit: cover` and the appropriate desktop/mobile position. Ordinary inline images can retain `height: auto`. Missing `height: 100%` on a responsive background image can leave blank space under a panorama and detach hotspots from the visible image.
- Scope any coverage fix to the relevant background/media contract, not all images. Check desktop and mobile sources after lazy loading completes, including `currentSrc`, natural dimensions, and rendered frame dimensions.
- Keep hotspots positioned against the same full media frame used for cropping. Verify the points against visible products at each breakpoint and exercise a popup after assigning real images.

## Appearance and CSS isolation

- A color scheme supplies foreground/input/button tokens; it does not require an opaque background. Configure scheme and background independently when the user requests, for example, Scheme 3 with transparent email-signup background. Check both the block surface and input surface.
- Put section-wide appearance and spacing on `section-spacing`; keep the container responsible for width. Put a local content surface on Group when Group owns it. Do not add a second scheme or panel layer just to imitate Figma.
- Check whether a source image already includes an overlay before adding another one. Respect explicitly configured transparent overlays; do not bake text or color-scheme behavior into content images.
- Scope section CSS under its schema class when a generic class is shared by multiple sections. The FAQ build exposed a collision with another accordion section: verify final computed width, padding, and alignment after all theme styles load.

## Completion checks for the configured instance

- Validate template/schema JSON, Theme Check, and diff whitespace. Check JavaScript syntax when changing a shared controller; distinguish new failures from existing warnings.
- Inspect desktop/tablet/mobile with actual selected media and resources. For width/ratio work, change each width option and at least two ratios: width should respond to the cap and container, while height responds to the selected ratio. Check explicit height-match mode separately when used.
- Verify mobile source/crop, full-frame coverage, content order, Group Fill behavior, gaps, transparent surfaces, and no horizontal overflow. Do not mark an image as loaded before lazy loading finishes.
- In a fresh Theme Editor session, confirm controls remain selectable, width and ratio persist after save/reload, nested content remains editable, and interactions still work. Exercise add/remove/reorder when changing a slot contract. Never save over an existing user's unsaved session for QA.
- Record only what was actually checked and identify untested editor/runtime cases. Keep screenshots and temporary audit templates separate from production theme files; committing a theme does not imply committing QA output or pushing Git.
