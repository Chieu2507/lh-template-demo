# Perky testimonials

## Section Build Plan
- Role/placement: homepage social proof after Popular Brands; new curated Testimonials: Cards section, index only.
- Context: merchant-authored reviews; no product/customer data inferred. Figma 49005:14608.
- Ownership: section owns width, 3/2/1 desktop/tablet/mobile capacity, gaps, scheme/background and scaled padding. Shared Heading/Group/Text/Image own editable content; Testimonial item owns card surface/radius. Rating owns score and accessible star output.
- Slots: static shared Header with a nested Heading; up to four reorderable private Testimonial cards (maximum41 nested dynamic blocks including the Header heading with the default composition). Each existing item accepts Image/Group; generic Group composes rating, title, quote and author Image/Text. No app slot added.
- Runtime: shared carousel-block / swiper-carousel, scoped lifecycle and block selection; hide inert pagination when all reviews fit.
- Output: section-spacing → container → header/carousel; accessible rating and decorative star images. No duplicate typography system or Custom CSS.
- Responsive: desktop 3, tablet 2, mobile 1; page width1400; gap28/16; header gap56/32. Padding80 scales to60/40. Cards36px vertical/28px horizontal; avatar70 square/pill; custom card radius24.
- Asset plan: exact Figma avatar PNGs uploaded to Shopify Files and selected through Image blocks; exact18px Figma star SVG stored in theme assets. The reference screenshot is never used as an asset.
- Reuse/extension: add backward-compatible Custom radius option to Testimonial item. Existing radius choices/defaults retained. New Star rating block is required for score semantics and exact Figma star geometry.
- Schema English literal exceptions: new section-specific capacity/header-gap labels, Star rating labels and preset name follow adjacent testimonial section conventions. Existing canonical keys reused for shared concepts.
- Figma pagination has three decorative dots despite three visible cards. Hide desktop dots while locked; real mobile/tablet dots follow available pages. No artificial duplicated reviews.
- QA: Theme Check, setting/schema coverage, platform budgets, git diff, development render; desktop/tablet/mobile geometry and media; mobile pagination; Theme Editor selection and native image controls.

## Validation
- PASS: development watcher uploaded valid schemas to theme192069828907; Shopify rendered the section and three nested review compositions. No new watcher started; existing user-requested development watcher remains in use.
- PASS: Theme Check0 errors/36 inherited warnings; git diff --check. No JS/controller edits.
- PASS: all saved block settings satisfy range/step/select contracts;30 dynamic blocks, nesting depth5,152 theme block files,17 index sections. Direct item cap4 permits40 default nested dynamic blocks. Static heading excluded from block_order.
- PASS: desktop all three cards350px high, radius24, effective width449.33 under current global page width1404; heading34px; stars18px with4px gaps; avatars70px with exact Figma PNGs and matching backgrounds. Shared page-width value retained (Figma card448px).
- PASS: mobile375 card343px; desktop/tablet/mobile padding80/60/40;767/768/1149/1150 viewport checks show no document horizontal overflow. Tablet uses2 columns and mobile1.
- PASS: clicking mobile Go to slide2 activates Sarah, updates aria-current and translates wrapper−359px. Shared Swiper keyboard/focus and editor lifecycle retained.
- PASS: all three avatars and all15 star images loaded. Avatar images use contain/bottom alignment to preserve transparent portrait proportions; hover zoom disabled only in this section.
- PASS: Theme Editor displays section layout, scheme/background, padding and static Heading; selecting second Testimonial item opens its block controls. Development upload validates default preset and live instance.
- NOT TESTED: editor add/duplicate/reorder/remove/save round-trip, long translated content and zero-review runtime. Native preset/allow-list inspected. Existing editor session had unrelated unsaved changes, so validation used a separate tab without saving.
- Backward-compatible extensions: Image adds optional fixed20–200px width and background; Text adds opt-in letter-spacing override. Existing testimonial first-text tracking now honors that override with its previous0.05em fallback. All previous defaults preserved. New schema labels use documented English literal exceptions as existing peer controls.
- Preview temporarily failed because concurrently created split-banner-custom padding range0–200 used step1 (more than101 steps). Changed only its top/bottom padding steps to2 to restore a valid upload; saved10/80 values remain valid.
- Screenshots: /private/tmp/perky-testimonials/desktop.jpg, /private/tmp/perky-testimonials/mobile.jpg, /private/tmp/perky-testimonials/editor.jpg.

## Header hierarchy correction
- The fixed top slot is now the shared Header with the existing Heading nested inside it. Preset and active index JSON preserve heading content/settings and review IDs/order.
- Moved dynamic block capture below the Header call: Theme Editor registers Header first, then the review stream/Add block controls. Heading no longer appears as a standalone trailing section child.
- PASS: editor tree shows Header → Heading before Add block/Testimonial items; selecting the nested Heading opens its native controls. Storefront renders one compound Header, unchanged title and three reviews. Theme Check0 errors and git diff --check.
- Screenshot: /private/tmp/perky-testimonials/header-editor.jpg.

## Add-card preset correction
- Added private `_testimonial-review-card` block, scoped to Testimonials: Cards. Its Add-block preset recreates the existing card's nested Groups, Rating, Heading, Text, 70px round Image and author Text; root defaults are vertical/centered with a white surface and custom24px radius. Merchant placeholder copy/avatar remain editable.
- Migrated the three active review roots and section presets to this type without changing IDs, content, child settings or order. Extracted the shared testimonial renderer and CSS so both block types retain the same runtime behavior.
- PASS: Theme Check0 errors/36 inherited warnings and git diff --check.
- PASS: actual Theme Editor Add block → Testimonial card creates a fourth review with the expected stars/title/quote/avatar/name layout. Undo restores three cards, disables Save and leaves no test content persisted. Existing user editor draft was untouched.
- Screenshot: /private/tmp/perky-testimonials/new-card-editor.jpg.

## Card height control
- Card-owned Height select: 100% (`fill`, default) stretches to the tallest card in the Swiper row; Auto (`fit`) follows its own content and retains vertical centering. Shared renderer accepts the normalized optional mode; generic testimonial items retain their existing sizing.
- Section owns the stretch row; card owns its align-self mode. No fixed height, duplicate DOM or JavaScript sizing added. One setting applies across desktop/tablet/mobile. Height label reuses `t:labels.height`; literal 100%/Auto options match the requested control.
- PASS: live editor exposes Height → 100% / Auto and changing Auto re-renders. Storefront long-copy fixture yields494px for both Fill cards and350px for Auto at449.33px card width. Test content/settings restored afterward. Theme Check0 errors/36 existing warnings; git diff --check.

## Section-owned Card item correction
- Supersedes the per-card height contract above: section schema now has a separate Card item group with Height → Auto / Fill. Default and active homepage use Fill; all cards inherit one section mode.
- Removed Height from Testimonial card schema/preset and its renderer parameter. Normalized `section.settings.card_height` maps to the section root modifier and card cross-axis sizing. No individual card overrides remain. Labels reuse canonical Height, Auto and Fill translations; Card item is the user-requested group name.
- PASS: schema has Card item → Height with translated Auto / Fill options and Fill default; private card schema and shared renderer no longer expose individual height. Theme Check0 errors/36 existing warnings; git diff --check.
- NOT TESTED: updated section control in live editor. Automatic browser approval review blocked admin reload because workspace credits were exhausted; a retry after the user asked to continue was also rejected. No alternate browser/API route attempted. Previous sizing runtime evidence remains applicable to the same CSS stretch/center behavior.
