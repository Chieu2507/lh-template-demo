# Aike home sections — 2026-10-15

Target: branch `Aike-template`, unpublished theme `192377422123`, preview port 9295. Only home template and existing global product-card settings changed in this follow-up; no new section, block, CSS or JavaScript files. Existing header/footer work remains separate.

## Composition

13 visible logical sections: slideshow, category collection list, brand marquee, New Products, Best Sellers, hotspot carousel, Outdoor Furniture, About, testimonial, Favorites, FAQ, newsletter, benefits. An editable Outdoor Collection video section is saved disabled pending the actual video source.

New Products reuses Custom section → Row → Column → Image card → Group/Image/Text/Button. Desktop measured cards: first 1056×594, others 512×597; Figma first is 1056×597. Mobile uses 6:7 cards. About and Newsletter use existing Grid with desktop two columns and tablet/mobile one column. Newsletter surface stays within page width. Benefits use existing Image blocks for the Figma icon assets, Group and Grid; mobile measured height 416px, matching Figma.

## Assets and catalog

Fetched detailed Figma contexts for each section and mobile hero/categories/product grid. 42 raster sources and 7 decorative SVG icon sources were converted to WebP before Shopify upload. 49 non-empty WebP sources retained in `output/aike/assets`; permanent Shopify references recorded in `assets.json` and `icon-assets.json`. No temporary Figma runtime URLs in template.

Created 14 Aike-tagged demo furniture products with Figma names/prices/images, two manual featured collections and six Aike category collections. Product handles/IDs are recorded in `catalog.json`. Existing products were not modified. The new products are ACTIVE and render in the storefront. Sale compare-at prices set for Indivi sofa ($1295) and Parasol bowl ($60). No inventory quantities or invented color variants were added.

## Remaining fidelity/content limits

- Source videos absent from Figma export: the large sofa tile in New Products and Outdoor Collection banner. Asked user for both. User confirmed both video sources will follow later. Sofa tile is configured as video with no media source; its product information remains. Outdoor Collection stays disabled until the video is supplied.
- One hero artwork and one testimonial are specified. At user request the slideshow now has three independently editable slide items using the provided hero artwork/copy; slides 2 and 3 use h2. Navigation and bullets are enabled. Testimonial retains one item with inactive controls hidden.
- Hotspot carousel uses base page-width preview/height/control behavior. Its active image is wider than Figma's 1024px centered slide and controls remain inside the image. Hotspot product assignments are editable and use available Aike products corresponding to the pictured furniture category, not unprovided scene-specific SKUs.
- New Products retains base Row behavior on tablet; its tablet arrangement differs from the Figma mosaic. Mobile Shop buttons remain visible because the existing Button block has no device visibility control. Product strips use editable text for the supplied demo name/price and must be edited if demo product prices change.
- Product cards retain category labels and no color swatches because the source does not provide actual color variant data. Related hero/collection/title radius/layout settings follow current base contracts. Category mobile slide widths and testimonial controls differ from Figma.
- FAQ answers after the first are short editable demo copy; only the first answer is expanded/specified in Figma. Existing Contact/About/FAQ destination content and old header/footer catalog placeholder destinations are outside this home-section pass.

## QA

PASS: Shopify accepted final template and settings. Zero Theme Check errors (97 warnings already present before the section build), `git diff --check` passes. Saved section/block setting audit found no unknown IDs, invalid select values or invalid ranges; max nesting 7 and 189 blocks in initial composition. No new CSS/JS assets or custom_css.

PASS: desktop 1920px, tablet 768px and mobile 375px have no horizontal page overflow; observed image error count zero. Hero desktop/mobile heights 670/470 plus section spacing; categories and products render the Aike assets. Product carousel Next advances its track. FAQ opens the selected answer. Active-slide hotspot opens its product popover with correct price/link. Mobile benefits render horizontally within each card. Viewport reset and preview retained.

NOT TESTED: newsletter submission (would create subscriber), exhaustive keyboard matrix, full Theme Editor save/duplicate/reorder lifecycle (browser account limitation), absent video playback. No Git commit, Git push or theme publication in this follow-up.

## Icon correction

Corrected six About/Benefits blocks from Icon to existing Image blocks. Icon custom_icon expects inline SVG, so assigning Shopify image references there did not render. All six now use the uploaded Figma WebP assets at 28×28px; storefront verification confirmed all six loaded at that size. Synced the corrected template to Aike theme 192377422123. No new block, section or CSS files.

Slideshow follow-up QA: three slides render; pagination selects slide 2 and Next activates slide 3 (aria-label 3 / 3). Shopify push accepted. Theme Editor add/reorder lifecycle remains NOT TESTED due to account access.

Category background correction: all six source image corners measure RGB 241/241/241 (#F1F1F1). Added scheme-5 cloned from scheme-2 with only background changed and assigned it to the existing collection card. Runtime computed background confirms #F1F1F1 on all six cards; no component/CSS changes.

## Navigation and pagination audit

Corrected Best Sellers and Outdoor controls to outline chevrons, 50px buttons, 12px gap, 2px progress bars. Fixed existing Product List bottom navigation overriding the button size setting; automatic sizes/gaps retain legacy defaults. Shared outline border now uses the scheme border token. Enabled existing slideshow autoplay (6s) for the active progress bullet (runtime base width 32px; Figma 36px).

Hotspot now supports opt-in Controls layout = Arrows with pagination below image, default remains Overlay. Aike uses below layout: section scheme, chevrons/dots in a centered row, 32px top spacing. Reuses shared pagination/navigation/runtime; no new section/block/CSS files. Carousel initialization can discover sibling pagination and avoids slide color-scheme syncing on below-image controls. Numbers retains the existing fraction overlay.

PASS: desktop product buttons 50×50, border #E6E6E6; Next advances product track by 406px. Hotspot Next changes the selected pagination item; active dot is #1A1A1A. At 375px controls remain visible and page scroll width is 375px. Testimonial has one quote, so controls intentionally remain hidden. Categories have six fitting cards on desktop, so controls remain hidden there. Theme Editor lifecycle NOT TESTED (account access). Hotspot active image width remains the previously documented base difference from Figma.

## Testimonial items follow-up

Added three editable sample quotes labelled Demo customer 01–03, retaining the original Figma quote/avatar. Four items total; loop enabled. Existing Group constrains carousel to 1020px and quote content to 760px (nearest supported 10px slider steps to Figma 1024/768). Original block IDs retained inside the new Group. No new components or CSS.

PASS: desktop outline chevron controls render 48×48px, border rgba(255,255,255,0.2); Next and Previous select different quotes. Previous on original first quote wraps to Demo customer 03. Mobile 375px supports drag/swipe and has no horizontal page overflow; native base hides arrow buttons there. Theme Check 0 errors/97 baseline warnings and diff check pass. Shopify accepted saved template. Editor lifecycle NOT TESTED due to existing account limitation. Base vertical centering is on the complete testimonial slide rather than the quote text alone.

About feature alignment: set existing horizontal Group position_horizontal=top instead of default center. Runtime confirms both icon top coordinates match and both heading top coordinates match. Template-only change; diff check passed and Aike upload accepted.

FAQ chevron correction: inherited flex-basis:1rem compressed the 20px icon wrapper. Existing chevron rule now sets flex:0 0 20px. Storefront confirms all five wrappers/SVGs at 20px and opening Personal Design Consultation succeeds. Diff check passes; stylesheet synced to Aike only.

## Promo grid and content follow-up

New Products migrated from Custom section/Rows to existing Promo grid (custom): first card spans two columns, four other cards span one. Existing Group now explicitly allows private _product-card-compact; five card strips retain nested Group and Shop button, with product picker owning title/price/image/link. Optional static header and custom row height added to existing Promo grid, both preserving prior defaults. Rebuilt deferred-template-components.css from the component source. Desktop cards measure 1056×600 and 512×600; mobile 343×400; 375/768 widths have no page overflow. Theme Check 0 errors/97 baseline warnings. Seoul product image attachment is still not persisted by the connector: compact renders the product placeholder, despite update tool reporting success.

Named Custom section instances About Aike, Our Favorites, Newsletter, Customer Benefits; named migrated section New Products. Slide 2 now Bedroom Retreat / Your Restful Retreat; slide 3 Dining Moments / Room for Every Moment. Both use separate desktop and mobile existing Aike WebP image assets. Runtime confirms all mobile currentSrc selections match the separate image pickers and load successfully. Three demo quotes rewritten with distinct living-room/dining-room/craft content, explicitly labelled demo. Original first quote retained. Template accepted by Shopify; editor sidebar naming QA remains NOT TESTED due to account access.

Outdoor video supplied by user: uploaded via staged VIDEO upload (file gid://shopify/Video/46649135137067, READY), filename aike-outdoor-collection.mp4, 1920×1080, 11.018s. Banner enabled and migrated at user request to existing Hero with parallax_effect=fixed, desktop520/mobile470 (supported 10px steps). Runtime confirms section-hero, fixed media position, autoplay playing/readyState4/muted/loop. New Products sofa video remains empty pending separate source. Shopify accepted template; diff check passes.

Promo sofa video supplied: uploaded staged VIDEO gid://shopify/Video/46649209684267, filename aike-new-products-sofa.mp4, Full HD/15.028s. Assigned to New Products card_1 video setting. Storefront confirms playing, readyState4, muted/loop, 1920×1080; product strip remains. Shopify template push accepted and diff check passes. Both previously pending video sources are now supplied.

Promo card editor hit-target correction: linked image-card content disables pointer events for storefront stretched-link behavior. Added request.design_mode class and enabled direct content child hit targets only under that class, so nested Group surfaces can be selected by the editor inspector. Rebuilt existing deferred CSS bundle; no new assets. Theme Editor direct-click verification NOT TESTED because no editor tab available. Storefront selectors are unchanged.

## Promo collection context

Promo card now has a collection picker; its destination resolves from that collection. Legacy URL settings are retained as fallback and collection URLs from old cards can resolve a collection. The card passes closest.collection through nested Groups. Reused collection-card-button (no destination setting) in all five product strips; allowed it in Promo card and Group. Compact product picker wins when set; otherwise closest.collection.products.first is used, with existing placeholder when neither resource exists.

Runtime PASS: all five card and Shop links match the parent collection. Selected products retained. Temporarily clearing card_2 product returned Seoul dining chair from chairs-aike, while Shop remained /collections/chairs-aike; restored the original explicit Wishbone picker after validation. No new block or stylesheet files. Theme Editor picker/add/reorder lifecycle NOT TESTED.

Hero Page+Fixed clipping correction: moved fixed-media clip-path from the outer padded Hero to its inner hero__surface, preserving --hero-media-radius. Video remains viewport-fixed but is painted only inside the page surface. Runtime desktop inner bounds160..1760 (40px container padding), tablet30..738, mobile16..359; 12px corner clipping applies. Desktop screenshot confirms white page gutters; video still playing and position:fixed. Existing Hero shared stylesheet changed, synced to Aike only.

## Navigation position simplification

Removed the new Hotspot Controls layout setting and migrated Aike to Navigation position=bottom (inside remains default). Bottom+bullets centers previous/dots/next; bottom+progress_bar uses a flexible 2px bar plus right-hand navigation. Added shared outline style choice to Hotspot. Product List now uses the same bottom row contract, including bullets between chevrons; progress bars and navigation are siblings with no absolute overlap. Its carousel initializer resolves the bottom pagination within the owning list. Existing inside/outside/top render paths retained.

QA PASS: tested Hotspot bullets and progress, Product List bullets and progress. Product dots select slide2, Hotspot progress advances to 2/3, Product progress advances. Desktop progress occupies1448px plus40pxgap plus112px controls in1600px; centered dots/chevrons fit128px. Mobile375 no horizontal overflow. Restored Aike Hotspot bullets and both product progress bars after temporary combination tests. Editor save/add/reorder remains NOT TESTED.

Compact empty-picker follow-up: verified remote saved template and preserved merchant changes in Categories/Best Sellers/Outdoor Products. Empty-string product picker resolves first Chairs product (Seoul); it previously had no media, so image placeholder falsely suggested fallback failed. Re-uploaded original local WebP as aike-seoul-chair-repaired.webp, attached READY file gid://shopify/MediaImage/46649545916715 to Seoul through fileUpdate referencesToAdd. Runtime empty-picker test confirms Seoul title/link and repaired image, no placeholder. Hardened compact selection check to product.id and fallback via one-item collection loop. Restored explicit Wishbone picker after testing. Earlier product image URL/file ID was unavailable; failed image import is unused.

Bottom progress fill regression fixed: pagination position:static made its absolute fill use the carousel as containing block, painting ~half the entire carousel gray. Bottom progress pagination now position:relative in Product List and Hotspot. Runtime confirms Best Sellers/Outdoor fill and track both2px high, including after Next. Aike code push accepted and diff check passes.

## Animation and storefront audit

Configured96 canonical content blocks using existing animation_type/animation_delay settings. Text/headings/buttons slide-bottom; images fade; small feature/favorite/benefit Groups reveal as units. Layout Groups remain none so child content can reveal independently. Existing shared controller provides spatial top-to-bottom/left-to-right ordering and card entrances, suppresses nested duplicate motion, releases transforms after playback and respects reduced motion. Hero/slideshow background media retains its own lifecycle; marquee retains its scrolling behavior. Added canonical animation settings/attributes to existing faq_item so each row is editable and animatable without new assets. No change to shared animation JavaScript.

PASS: storefront desktop1920/tablet768/mobile375 with no horizontal page overflow;109 loaded images,0 broken images; no JavaScript error logs observed. Product Next, hotspot Next, FAQ open and progress fill2px work after animations. No visible pending reveal remained after scrolling to footer. Theme Check0errors/97baseline warnings;201 blocks,maxdepth6,0invalid animation settings; diff check passes. Synced index/settings/faq_item to Aike.

NOT TESTED: Theme Editor select/add/duplicate/reorder/save lifecycle. Opened Aike editor directly; current Chrome account was denied store access. Asked user to switch to authorized account while independent work continued. Browser later became unavailable, preventing final editor recheck. Reduced-motion handling inspected in existing controller but OS preference was not toggled in QA. No Git commit/push or publication.

Editor access correction: found the existing Aike editor tab in Chrome profile beae.com, entered it successfully via native Chrome UI, and confirmed the section tree and disabled Save button (no unsaved editor changes at that point). Earlier denied access was from the lumise.com profile, not a lack of store permission overall. Direct browser tab control currently reports unavailable; native window follows concurrent user tab changes. Full editor lifecycle audit still pending stable access to that tab.
