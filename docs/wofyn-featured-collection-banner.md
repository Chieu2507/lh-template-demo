# Wofyn featured collection banner

Scope: Wofyn-template. Reuses Featured collection banner and the static Header, Banner, Product list and Product card blocks. No new JavaScript or duplicated product rendering. Figma file G7y5fdxzoVS9pDqslTl1Pp: desktop 47155:13408, tablet 47548:11926, mobile 47557:6080.

## Design mapping

| Device | Banner | Overlap | Header gap | Navigation | Pagination | Bottom padding |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop ≥1150 | max 672px, 6:7, radius16 | horizontal112px |40px | top outline chevrons | hidden |112px |
| Tablet 768–1149 | max320px, 5:7, radius16 | horizontal56px |20px | hidden | thin2px progress |96px |
| Mobile <768 | viewport width, 6:7, radius0 | vertical112px |16px | hidden | thin2px progress |80px |

At1920px the full-width container follows theme margins48px:1824px wide, banner672px, panel1264px. Mobile panel max320px, padding24px vertical/20px horizontal, radius16. Header is left aligned on desktop/tablet, centered on mobile. Desktop Header block padding34px combines with overlap112px + section panel padding24px to produce170px inset; tablet uses the Header's mobile horizontal padding.

Homepage instance wofyn_kibble_banner follows Promo grid. Banner shopify://shop_images/wofyn-kibble-banner.png is sourced from Figma. Columns4/2/1, max6 items. Product collection remains blank and shared semantic placeholders render. Nunito retained as requested; text wrapping differs from Figma's Gabarito/Mulish.

## Editor contract

Enable overlap is a checkbox outside the conditional Overlap group. Desktop/mobile distances, panel padding, mobile maximum width and radius appear only when enabled. Disabling retains the original non-overlap composition; its header grid uses min-content to prevent banner height stretching the header gap. Static slots are captured/rendered once; existing block IDs/attributes remain.

Custom banner width is opt-in. Tablet customization is opt-in and exposes maximum width, ratio, overlap, header gap and bottom padding. Original instances default to no tablet customization. Mobile full-width banner defaults off and removes radius only below768px when enabled. Gap defaults remain24px desktop/20px mobile.

Product list Pagination now has Show on: All devices, Desktop, Mobile, Tablet and mobile. Default All devices preserves existing behavior. The existing Show pagination checkbox remains the master switch. Top navigation is rendered once; it previously appeared twice. Header button space is reserved only when top navigation exists. Shared Swiper controller is unchanged.

Literal labels for these scoped custom settings are an accepted exception. This is a reusable settings-driven implementation; no template Custom CSS or hard-coded section ID selectors.

## Verification 2026-10-09

- git diff --check passed. Theme Check:0 errors,103 warnings across current dirty workspace.
- Preview theme192149684523, port9294; watcher retained. CLI cached theme ID is different and must not be used for delivery.
- Checked widths375,767,768,1149,1150,1920. Panel/banner stay within viewport at each width. Other sections can still cause document overflow; no global fix is included here.
- At1920: banner672px, panel1264px, overlap112px; navigation visible, pagination hidden.
- At768: banner320×448px, overlap56px, header inset80px, navigation hidden, pagination2px with16px margin.
- At375: banner375×437.5px, panel320px, overlap112px; heading centered, navigation hidden, pagination2px.
- Desktop Next slide advances active slide1/6 to2/6 and enables Previous; only one navigation group exists.
- Editor correctly shows saved custom672px, tablet320px/5:7/56px, mobile320px panel and112/80 bottom padding. Enable overlap hides/restores the entire Overlap group. QA toggles restored without saving a new configuration.
- Proof screenshots: /private/tmp/wofyn-banner-final-desktop.png and /private/tmp/wofyn-banner-final-mobile.png.
- Not retested: add/duplicate/reorder lifecycle, After placement, mixed zero/nonzero overlaps. Shared controller retained; no lifecycle changes.

Status: layout implemented and responsive checks passed. Full content fidelity remains dependent on selecting the Wofyn collection/review data; existing fonts intentionally preserved.

## Media offset override — Section Build Plan

Section-owned Enable media offset checkbox applies to Product Cards via the existing inherited --product-card-media-inset token. Enabled (default) leaves Theme Settings in control; disabled emits 0px at the section surface. Existing Product Card markup/CSS and Image block remain unchanged. Both Wofyn banner instances save false to match the design. QA covers schema/localization, false/true rendering against the global nonzero inset, editor toggling, placeholders and responsive inheritance.

Media offset QA: PASS schema + localized label/help; Theme Check 0 errors; git diff --check. Storefront toggle false: global 16px remains, section token and media margin are 0px. Toggle true: no section override, media margin inherits 16px 16px 0px. Editor toggle reflects off/on/off and restores clean Save state. Final Wofyn instances both false. No new CSS/JS or Product Card block modifications. Preview remains on port 9294. Editor preview-frame computed-style inspection not available; runtime styles verified in local storefront instead.
