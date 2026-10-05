# Strideo slideshow

Figma: `aYEcYZ49ACT2yTfaIKRacc`, desktop `49051:6802`, tablet `49384:13008`, mobile `49390:14108`.

- Role / placement: homepage content hero, existing Slideshow in `templates/index.json`; no resource context.
- Ownership: Theme Settings own page width, margins, typography and Scheme 3. Slideshow owns responsive height and carousel. Slide owns media, overlay and content position. Group owns content flow and gaps; Heading, Text and Buttons stay editable.
- Slots: one slide matching Figma. Column → Content (Heading + Text), Actions (Shop Men + Shop Women). Preserve the existing dynamic block allow-list and editor attributes.
- Output / runtime: reuse Slideshow, slideshow-slide, Group and `assets/slideshow.js`; no new markup, controller or template-specific CSS.
- Responsive: height 950 / 800 / 640px; bottom-left; content max 576px and mobile Fill. Bottom inset 80px desktop/tablet, 64px mobile. Content gap 16px, actions gap 20px, column gap 40px. Actions remain horizontal on mobile.
- Presentation: Heading Display (72 / 60 / 48px), description Large (18px), Scheme 3, primary white pill buttons, 20% black image overlay; no eyebrow, pagination or arrows in the single-slide design.
- Container: retain approved global 1600px page width and 32 / 30 / 16px margins. Figma desktop uses a wider 1674px inner container; do not encode a separate width override into this section.
- Media: actual 1920×1080 Figma source downloaded under `output/strideo-slideshow/`, never theme `assets/`. Same centered cover crop on all sizes. Upload through Theme Editor and bind the actual saved image reference. Browser currently lacks store access. A separate image-only mobile 2× export is blocked by Figma's Full-seat restriction; do not upload a screenshot containing text.
- Links: retain the existing All products resource as a temporary destination until Men/Women collections are selected.
- QA: validate JSON against existing schemas and block order; Theme Check and diff whitespace; inspect heights, content widths, gaps, typography, buttons, crop and horizontal overflow at desktop/tablet/mobile. Editor image assignment/save requires an authorized browser session. Keep other homepage sections and unrelated working-tree changes intact.

## Verification — 2026-10-04

Uploaded only `templates/index.json` to unpublished theme `191953273131` successfully. All other homepage sections retained. No image uploaded to `assets/`; existing slide image references retained pending Editor access.

| Viewport | Slide height | Content width | Bottom inset | Heading | Description | Group gaps |
| --- | --- | --- | --- | --- | --- | --- |
| 1920 | 950px | 576px | 80px | 72px | 18px | 40 / 16 / 20px |
| 768 | 800px | 576px | 80px | 60px | 18px | 40 / 16 / 20px |
| 375 | 640px | 343px | 64px | 48px | 18px | 40 / 16 / 20px |

Measured on the actual Strideo preview. Buttons stay horizontal and 48px high at Figma breakpoints. No page horizontal overflow at 1920, 768, 375 or 320px. Heading is the semantic H1. Single slide has no pagination/arrows. Block settings and nested order validated against current schemas. Theme Check: zero errors, 35 existing warnings. `git diff --check` passes.

Still pending: replace the inherited tennis image with the downloaded Strideo running image through Editor; inspect final crop after assignment; image-only mobile retina export; Editor selection/save/reload QA; choose Men/Women collection destinations. Shopify browser reports the current account has no permission to view this theme. Figma temporary export-node creation is denied because the account lacks a Full seat. No Figma nodes were changed.

Preview: https://layouthub-template-v2.myshopify.com/?preview_theme_id=191953273131
Screenshot of mobile layout with the **old image still assigned**: `output/strideo-slideshow/mobile-layout-pending-image.png`.

## Additional demo slides — user requested

Restore a three-slide composition using the same editable Group tree and responsive settings. Enable always-visible navigation and bullet pagination so all three items are accessible without autoplay. New slide image pickers remain empty until images have actually been uploaded in Editor; do not fabricate Shopify file references.

- Slide 2: **Find your own rhythm**. Description: “Lightweight layers and effortless comfort, made for every run and every pace.” Female runner in charcoal apparel on a gray track.
- Slide 3: **Ready for every move**. Description: “Performance essentials that move with you, from the first warm-up to the final mile.” Male athlete warming up beside concrete stadium architecture.
- Both retain Shop Men / Shop Women buttons and the primary slide's layout.
- Generated with built-in imagegen; desktop prompts specify premium photoreal sports campaign photography, realistic anatomy, gray concrete/asphalt setting, athlete center-right, quiet left space for theme copy, no text/logos/overlays. Mobile edit prompts preserve the same athlete and outfit, portrait framing, upper-half subject and quiet bottom space for theme copy.
- Assets: `output/strideo-slideshow/slide-2-desktop.png`, `slide-2-mobile.png`, `slide-3-desktop.png`, `slide-3-mobile.png`. Mobile widths exceed the requested 750px minimum. Generated pixels inspected; final in-theme crop/contrast awaits upload.
