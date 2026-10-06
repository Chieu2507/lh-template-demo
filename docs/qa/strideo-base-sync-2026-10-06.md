# Strideo announcement and performance sync — 2026-10-06

Imported scoped updates from theme-base/dev: c74a839c, 58edd486, 87b329a5 and 2f42a2d2. Remote Strideo already supplied fff50097 (responsive slideshow LCP/preload and deferred overlay styles). Older unrelated base page changes are excluded.

Conflict resolution preserves Strideo tablet product-grid CSS, global image rounding/hover, swatch fixes, announcement font-weight setting and custom mobile slideshow height. No saved settings or template JSON changed. The product-media transform transition removed earlier remains absent.

- PASS: git diff --check and assets/header.js syntax check.
- PASS: 68 Node tests, including actual slideshow Liquid rendering, preload/picture parity, source-resolution limits, all height presets and saved custom mobile height.
- PASS: Shopify Theme Check: 0 errors, 36 warnings, same count as before this sync.
- PASS: local Chrome fixtures with actual shared CSS/controllers: announcement geometry unchanged when section CSS arrives at 375/767/768/1149/1150px; initialization and next navigation; inherited font weight; zero-height overlapping header surface; no fixture horizontal overflow.
- PASS: desktop drawer and phone bottom sheet usable before deferred overlay decoration; geometry stays inside viewport, close button receives focus, scroll lock applies, Escape closes and restores opener focus. Desktop drawer dimensions unchanged after decoration. Phone sheet grows by 24px for deferred header padding while remaining bottom-aligned and within viewport.
- NOT TESTED: live Shopify storefront and Theme Editor save/reload; no upload or watcher started.
