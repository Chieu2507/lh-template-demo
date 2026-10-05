# Global image hover

Owner: existing Theme Settings motion_image_zoom -> css-variables global zoom token. No new setting or merchant-data change.
Reuse: media-hover-zoom and product-card zoom remain the primary kernels. Remove Showcase's zoom suppression, keeping outer active-state scale separate from inner image zoom.
Extension: add a shared CSS fallback for image elements that lack an existing hover owner. Animate individual image scale and inset clip-path together, retaining the original visual bounds without adding wrappers or transforming carousel/parallax containers. Exclude images already owned by media-hover-zoom, zoom-enabled Image cards, product card media, and dedicated interactive product zoom/lightbox.
Fixes: Gallery image uses the global token instead of fixed 1.03. Collection promotions use individual scale so they share the same fallback without double zoom.
Responsive/accessibility: hover/fine-pointer only; reduced-motion disables decorative zoom through the existing token and media queries. Shared focus-within support retained. No JavaScript or editor lifecycle/schema changes.
QA: syntax/Theme Check, computed active/inactive Showcase scales, next/loop, image hover enabled/disabled token states, gallery and category/product media, raw image fallback, mobile overflow. Live Theme Editor access is unavailable under the current Admin account; setting-off validated through an isolated rendered QA page using the same token contract.

QA completed 2026-10-05:
- PASS: global token enabled 1.04/disabled 1 across raw image, Image kernel, Product card, Gallery image and Showcase inner image in isolated rendered fixtures. Disabled images returned to identity; enabled Product card retains its existing 1.06 token. No double scale on media owned by existing components.
- PASS: live draft Showcase active media 1, immediate neighbors 0.85. Inner hover 1.04 while outer active media stays 1. Full three-slide next cycle including clone reset retains correct active/neighbor scales.
- PASS: desktop 1920 and mobile 375; no horizontal overflow, mobile active/neighbor scale retained. CSS inset calculation supported in current Chrome.
- PASS: Shopify Theme Check 0 errors/35 existing warnings; MCP theme validator passes all four changed files. Local skill validation script unavailable due missing @shopify/theme-check-common dependency; equivalent MCP validator and installed CLI used successfully.
- NOT TESTED: live Theme Editor toggle/save/reload because current Admin account lacks access. Setting-off token contract tested locally without changing merchant settings.
- Delivery: CSS/gallery block updates uploaded to draft 191986827563 only; temporary localhost QA server stopped. No Git commit/push.
