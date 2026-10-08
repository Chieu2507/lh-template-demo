# Peeko desktop/mobile spacing audit — 2026-10-08

Branch: `Peeko-template`. Scope: all 15 enabled homepage sections plus Header and Footer, with desktop 1920px and mobile 375px as primary targets. Reference: Figma file `6HBP12lG9fUcHhgF3Gx057`, desktop `49017:22784`, mobile `49234:5694`. Geometry was read directly from Figma nodes; the design-context connector could not authenticate. The raw measurements are in `spacing-figma-geometry.json`.

## Implementation contract

Role/placement: existing homepage content sections and existing header/footer section groups. Existing resource queries, static IDs, editor attributes, and content remain in their owners. Template settings own Peeko values; reusable sections own layout gaps and gallery viewport/columns; Blog list owns responsive grid/scroll; Product list owns mobile promo geometry. Optional new overrides are off by default and retain prior behavior. No Custom CSS or new template stylesheet was added. No new JavaScript or duplicated mobile DOM. Tablet section padding inherits desktop unchanged. Validation covers schema/ranges, Liquid rendering, desktop/mobile preview, and tablet padding; complete Theme Editor lifecycle remains untested.

## Section comparisons and changes

Padding pairs below are top/bottom, in px. These describe section spacing rather than fixed-height banner centering.

| Section | Desktop reference | Mobile reference | Result |
| --- | --- | --- | --- |
| Slideshow | Height 820; content gap 40 | Height 620; primary content gap 40 | Existing spacing retained. Requested bullet gap 0 and active pseudo-element width removal retained. |
| Scrolling text | 28/28; gap 16 | 20/20; gap 10 | Existing values match. |
| Shop Gifts by Age | 80/96; header gap 48 | 56/56; header gap 36 | Existing values match; preview heights 424.8/344. |
| New arrivals | 80/80; header/cards 48; cards/action 36 | 56/56; heading/tabs 24; header/cards 36; grid rows 24, columns 12 | Added optional header/action/row gap controls. Saved 24/36/24; desktop action gap reduced from 48 to 36. Tab navigation retains 28. |
| Image cards | 80/80; cards 24; content inset 32/40 | 56/56; cards 16; content inset 20/16 | Existing values match; preview heights 835/642.5. |
| Shop by category | 10/80; header/cards 48; pagination 40 | 10/56; header/cards 36; pagination 32 | Removed phantom navigation grid row. Card media/content padding already matches. Existing View all action retained. |
| Find the perfect gift | Group inset 80/128; body/button 48 | Group inset 40/20; body/button 24 | Existing section/Group spacing matches. |
| Play Comes First | 80/80; header/cards 48; cards 32; card padding 36 | 56/56; header/cards 36; cards 16; card padding 36 | Existing values match. |
| Trending this Week | 80/80; header/list 56; pagination 36 | 56/56; header/list 36; promo/products 16; pagination 32 | Mobile padding 40→56, header gap 32→36, top promo separation 24→16, minimum height 360→400, pagination 24→32. Added reusable Product list controls for promo geometry. |
| Testimonials | 80/80; header/review 24; pagination 32 | 56/56; header/review 24; pagination 32 | Removed extra 16px icon bottom padding. Enabled saved mobile 56px padding; added desktop pagination setting preserving the former 36px default and saved 32px for Peeko. |
| Popular Brands | 20/80; heading/row 48; row gap 32 | 20/56; heading/row 32; row gap 28 | Top padding 80→20; heading/row and track gaps corrected. Existing six-logo content retained. |
| Buy Now With Sale | 80/80; heading/box 48; box inset 48/40; columns 64 | 56/56; heading/box 36; media/details 48; inset 20/20/28/20 | Optional mobile header gap and box-bottom controls added. Media thumbnail gap 12→16, details flow 28→24, media/details 32→48. Desktop unchanged. |
| Countdown | Fixed height 650; root gap 32 | Reference height 489; root gap 16; title/body 12; timer/button 28 | Corrected mobile Group gaps 32→16, 16→12, 32→28. Saved supported custom height 490 (range step 10). |
| Blog | 80/80; heading/cards 40; columns gap 32 | 56/56; heading/cards 36; card width 288; gap 16; copy inset top 20 | Empty action wrapper and phantom centered grid rows removed. Added opt-in mobile horizontal scroll while keeping desktop grid. Mobile values set to Figma. |
| Gallery | 0/64; heading/row 40; cards 444; gap 16; side margins 48 | 0/56; heading/row 36; cards 256; gap 12; side margins 16 | Removed top 10px, desktop bottom 80→64. Added configurable marquee edge extension and desktop columns; Peeko uses contained viewport and four columns. Removed existing tablet 80% bottom-padding scaling. Preview heights 628.8/456. |
| Header | Padding 16/16; menu gap 32; action gap 4 | Padding 12/12; action gap 4 | Updated existing Header Top gap/padding and menu gap settings. |
| Footer | Padding 64/64; content/credits 56; link columns 40 | Padding 48/48; content/credits 40; link groups 24 | Existing outer spacing matches; mobile link-group gap 0→24. |

## Known differences retained

- This is a spacing correction, not a replacement of Shopify resource content. Product card heights differ from Figma because current titles/ratings/content differ. Do not add artificial padding to compensate for missing content.
- Popular Brands currently has six logos without the description blocks shown in Figma. Its overall height and logo distribution therefore remain different despite corrected section/track spacing.
- Shop by category contains a View all action absent from the reference; it adds one gap plus its height. Shared pagination retains a 24px accessible target around the 8px visual dots. The user's explicit bullet gap 0 takes precedence over Figma's 16px dot gap.
- Footer still uses the existing brand/contact composition rather than the reference newsletter. Desktop main Group gap remains its supported maximum 100px; Figma uses 128px. No invalid value was left saved.
- Current page-width setting gives 1404px content vs Figma 1400px. Global controls and existing values were preserved. Header button targets also retain global sizes, so its total height differs despite matching padding.
- Countdown remains in the current saved order. A spacing audit does not change section order.
- At 768px the page reported 18px horizontal overflow despite section shells fitting the viewport; the tablet audit was limited to padding inheritance. Desktop 1920px and mobile 375px have no page overflow.

## Validation

- Full Theme Check: **0 errors, 49 warnings**. Collection Tabs now has 44 settings, adding one `ExcessiveSettingsCount` recommendation compared with the previous 48-warning baseline. Other warnings remain pre-existing. No Shopify upload errors remain.
- 22 tests pass: spacing empty-action rendering and mobile zero/fallback behavior; collection-tab/product-list promo composition; Blog card metadata; Testimonials layout.
- Schema JSON, unique IDs, and saved range constraints checked across homepage, Header and Footer groups: pass. No Custom CSS fields added.
- `git diff --check`: pass.
- Storefront DOM measurements and screenshots verified on development theme `192069828907`, existing preview port 9292. Desktop/mobile card widths, grid gaps, boxed padding, promo separation, and gallery margins checked.
- Tablet 768px: inspected section padding uses desktop values, including Gallery bottom 64px after removing scaling.
- Full Theme Editor add/remove/duplicate/save/reload matrix is not tested; controls are schema-validated and optional mobile fallbacks are tested through Liquid.
- No commit, push, publish, or upload to a published theme. Existing development watcher retained.
