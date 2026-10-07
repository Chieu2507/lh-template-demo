# Perky Gallery

Branch: `Perky-template`. Homepage instance: `perky_gallery`, immediately after `perky_blog_posts`.
Figma: file `6HBP12lG9fUcHhgF3Gx057`, desktop node `49005:7201`, tablet `49247:5417`, mobile `49247:6219`.

## Composition and ownership

The imported `gallery-carousel` section retains its existing Carousel/Marquee compositions and adds shared Header and Gallery grid slots. The Perky instance uses Header (Heading + Text) and the shared Marquee, containing five Marquee Item blocks with Gallery image children. Images, alt text, crop, social link, overlay, and radius remain editable. Theme Settings supply typography, page margins, colors, and radius tokens. Section owns width, spacing, alignment, and background; section owns marquee card sizing and the shared marquee owns looping; image owns media and overlay. No new JavaScript or runtime listeners.

## Design mapping

- Title: Join the Fun on Instagram; body: @play_game88.
- Desktop 1920: section height 562.8px, margins 48px, header width 768px, heading 34px, header gap 16px, content gap 40px, five 352px square cards with 16px gaps, top/bottom padding 10/80px.
- Tablet 768: section height 448.4px, margins 30px, header width 576px, heading 32px, 256px cards and 16px gaps, top/bottom padding 10/64px. Tablet bottom spacing is 80% of desktop for compositions containing Gallery media.
- Mobile 375: section height 466px, margins 16px, heading 30px on two lines, header gap 12px, content gap 36px, 256px cards and 12px gaps, top/bottom padding 10/56px.
- Cards loop continuously to the left using the existing marquee controller, speed 1 (28 seconds per cycle), with gaps 16px desktop/tablet and 12px mobile. Hover and keyboard focus pause the loop; focus reveals the overlay. Reduced motion uses the shared static fallback.
- Cards use radius 12px; hover/focus overlay is black at 20%, with the exact white Instagram SVG and tag. Fifth image uses saved zoom/position/vertical scale to reproduce the Figma crop.

## Assets

Exact Figma assets were downloaded and uploaded to Shopify Files: `74231.jpg`, `7c8f9.jpg`, `39c2a.jpg`, `4a2cb.jpg`, `9056b.jpg`. Original downloads are in `output/perky-gallery/media`. Instagram SVG is `assets/perky-gallery-instagram.svg`.

## Validation (2026-10-07)

- Figma design context and screenshot obtained after account connection was corrected.
- PASS: saved schema settings/options/ranges, nested block eligibility, homepage order, and `git diff --check`.
- PASS: Shopify Theme Check, 0 errors; workspace warnings remain, none in the Gallery files changed by this task.
- PASS: development storefront at 1920, 768, and 375px; all five images load, geometry checked against Figma, native overflow and keyboard focus checked.
- PASS: Theme Editor opens Gallery and displays Header, Heading, Text, five editable Gallery image blocks, and saved section settings.
- Editor add/remove/duplicate/reorder/save lifecycle was not exercised: editor has a restore notice for an unrelated unsaved session. This task did not restore or save that draft.
- Scoped uploads to verified development theme `192069828907` on `layouthub-template-v2.myshopify.com`. No publication, Git commit, or new watcher.

Preview proof: `output/perky-gallery/marquee-final.png`.

Marquee revision: switched back at the user’s request. Verified live movement, inert loop clones, pause on focus and resume on blur; desktop card width 352px and mobile card width 256px / section height 466px. Theme Check remains at 0 errors.
