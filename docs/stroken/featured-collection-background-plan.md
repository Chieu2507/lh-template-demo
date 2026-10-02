# Featured collection: background (custom)

- Role/placement: content section in JSON templates; new Featured collection variant after Parallax on Stroken home.
- Context: existing Product list owns collection, cards and carousel. Keep shared Header/View all/Product list/Product card kernels.
- Ownership: Theme Settings retain page width/margins, schemes and typography. Section owns content layout, gap and section padding. A singleton static Background block owns images, height, Below/Stack and overlap; can be hidden in editor.
- Slots: Background, Header, View all and Product list are fixed editable slots. Header keeps editable child composition; Product list retains Product card.
- Output: isolated section surface, full-bleed background slot, global page-width content container. Background is decorative and never intercepts card links.
- Responsive: Below puts absolute image behind collection, Stack reserves a separate image row. Desktop/tablet and mobile have independent block settings via Device. Percent means percentage of collection content height, excluding background and section padding (confirmed by user); scoped ResizeObserver measures this content only, without a feedback cycle.
- Figma: desktop node 53017:17575, 1920 x 772.75; background 1920 x 256, overlay black 20%; container1536 x516.75 with horizontal flow gap10. Mobile node53267:2258,375 x935.88; background375 x256, independent row; bottom padding16, gap10. Use approved global1600 page width with32/30/16 margins instead of copying Figma page width.
- QA: schemas, Theme Check, setting coverage, desktop/mobile/percent/hidden-background, carousel/navigation, fresh editor selection and save/reload. No images in assets; upload in editor.

## Verified result

- Shopify Editor save/reload retains desktop and mobile image fields; images uploaded through its Files picker, not assets.
- Desktop export 1920×256, mobile Figma export at 2× = 750×512. Both exports include the Figma 20% black overlay, so this instance uses transparent additional overlay.
- Desktop Below: background256px, reserved row176px, overlap80px. Mobile Stack: background/row256px; actual mobile currentSrc uses the750px image.
- Custom40% runtime: content358px, background143.188px (358×0.4, browser subpixel rounding).
- Hide Background runtime: background count0, reserved row0. Restored visible, Medium256px, desktop Below/mobile Stack and saved.
- Section has only static slots; no dynamic block allow-list or misleading Add block menu at section root. Header children remain editable.
- Theme Check:0 errors,35 theme warnings. JavaScript syntax and git diff whitespace checks pass.
