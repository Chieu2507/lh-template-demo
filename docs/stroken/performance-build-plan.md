# Stroken mobile LCP optimization

- Goal: mobile Lighthouse Performance >= 90 on the supplied Stroken homepage preview using default simulated mobile throttling; report actual scores and variability.
- Surface/context: existing first Slideshow section in the homepage; Theme Blocks own image pickers, media type and focal points. No schema or saved template settings change.
- Ownership: shared slideshow-image snippet owns responsive sources and matching preload hints. Section position and first-block order identify the likely LCP; layout promotes those hints into head after viewport metadata.
- Media: fixed-height centered panoramas use Shopify CDN crops for narrow/wide mobile bands at up to 2x density. Non-centered merchant focal points, portrait sources and adapt-height instances retain their original artwork. Desktop keeps the responsive original.
- Runtime: reuse the existing slideshow, overlay and module controllers. Keep essential content server-rendered; move fixed hidden overlay markup after main content and load its stylesheet without blocking first paint.
- Remote safety: CLI's default store was unrelated. Explicit target: layouthub-template-v2, unpublished Stroken theme 191891145003. Read changed remote source before upload. Preserve remote index/settings (they differ from local), all other themes and the live theme.
- Validation: matching preload/picture Liquid tests, crop/focal-point fallbacks, Theme Check, whitespace; cold Lighthouse mobile comparison; desktop/mobile geometry and slide switching; menu/search/cart/quick-view overlays after stylesheet loading. Record Theme Editor and any untested lifecycle cases.

## Baseline

- Mobile Performance 69/74; LCP 5.8/5.5s; TBT 70ms; CLS 0/0.082. All runs warned that page loading exceeded the limit.
- Hero mobile source was 2401px wide, about 185KiB. Countdown image was also eager below the fold. Desktop Performance 94.
- First optimization reduced hero to about 83KiB but scored 70: preload hints preceded viewport metadata, causing an additional desktop request. Viewport metadata moved before resource hints in the next iteration.

## Verified result (2026-10-06)

- Default simulated mobile throttling, Lighthouse 13.5.0, authenticated homepage: two consecutive final runs scored **92 and 91**. LCP **2.6s** in both; FCP 2.2/2.1s; TBT 60/40ms; CLS 0.082. All preview runs, including baseline, retain the load-time-limit warning; treat scores as lab measurements rather than a guaranteed production score.
- The browser requests only the mobile hero, about **83KiB** instead of 185KiB, with identical centered cover composition. Matching mobile/desktop hints appear in head after viewport metadata. No extra desktop hero request on mobile in the verified runs.
- Storefront PASS: 390px mobile and 1440px desktop without horizontal overflow; hero frames 390x670 and 1440x810; desktop retains its original source. All three slideshow pagination actions work and load the selected mobile artwork.
- Overlay PASS: keyboard open/close for mobile menu, Search and Cart; desktop Quick view loads Speed MP Tour Racket Strung with media, price and variant controls. No purchase/cart mutation performed.
- Static checks PASS: 3 Liquid image/focal-point/fallback tests, 25 existing shared overlay tests, diff whitespace, final Theme Check **0 errors / 35 existing warnings**. Schema IDs, settings and Theme Block structure are unchanged.
- NOT TESTED: exhaustive Theme Editor add/remove/reorder/save lifecycle, no-JavaScript browser and reduced-motion browser emulation. No preview watcher started. Uploaded only layout, slide block and shared snippet to the unpublished Stroken theme; remote template/settings preserved.
- Reports: `output/stroken-lighthouse/2026-10-06/mobile-optimized-2.report.html` and `mobile-optimized-final.report.html`; screenshots and report files remain QA output. Authentication headers are redacted from saved reports.
- Desktop recheck PASS: Performance **97** (baseline 94), LCP **0.7s**, FCP 0.6s, TBT 0ms, CLS 0.05. Report: `desktop-optimized-final.report.html`. An interrupted Chrome connection in the first desktop attempt was retried successfully; no Lighthouse process left running.


## Base update integration — 2026-10-06

Integrated upstream commits c74a839c, 58edd486, 87b329a5 and 2f42a2d2 from theme-base/dev at 2f42a2d2. Scoped cherry-picks avoid importing older unrelated base page/template history. The upstream cart inventory-limit change aa4772a9 is outside this announcement/performance update.

- Critical CSS now supplies overlay and announcement geometry before deferred styles load. Quick add/view decoration styles load asynchronously on storefronts and synchronously in the Theme Editor.
- Overlay header wrapper is stable before first paint; sticky measurements use the visible header surface.
- Slideshow keeps Stroken custom pixel height alongside all five fixed presets, capped source-resolution crop densities and uncropped merchant focal points. Saved custom 800px height and preload/source parity have regression coverage.
- Preserved Stroken tablet collection grid CSS, announcement font weight, single-announcement hidden controls/full viewport, slideshow padding/schema and all templates/settings.
- Validation: full local Node suite 68/68 PASS; header.js syntax PASS; Shopify Theme Check 0 errors and 35 warnings; diff check PASS.
- Fresh Theme Editor lifecycle, storefront browser interaction and Lighthouse: NOT TESTED for this integration. Earlier 91–92 mobile scores belong to the previous optimization and do not measure this update. Upstream QA in docs/qa/performance-regressions-2026-10-06.md describes base development QA, not a fresh Stroken run. No Shopify CLI upload or preview watcher started.
