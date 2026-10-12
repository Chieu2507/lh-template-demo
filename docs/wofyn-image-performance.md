# Wofyn responsive image delivery — 2026-10-12

Scope: gallery marquee and mobile slideshow sources on `Wofyn-template`, working changes based on `86689f24`. Store `layouthub-template-v2.myshopify.com`, unpublished theme `192149684523`, homepage preview.

## Findings and changes

- Before: gallery lazy images used `sizes="auto, ..."`; repeated marquee items selected 600px sources for 120px mobile boxes at DPR 1. User Lighthouse evidence also showed 800px transfers.
- Gallery now uses the saved fixed mobile/desktop width rather than automatic intrinsic sizing. Added exact 120/160px and 2x candidates; the fallback request is capped to 3x the larger configured width and original width. Retained originals, layout, rotation, radius and lazy loading.
- Slideshow adds 412/480px mobile candidates and clamps candidates at native width, including that native candidate once. Removed the one-size-only exception for small WebP uploads. Preload and picture still share the same candidates/sizes; panoramic crops and focal-point behavior remain intact.

## Runtime checks

- Chrome storefront preview, 412×824, DPR 1: all six unique gallery images selected width=120; cloned images also use width=120. Mobile boxes remain 120px. No loaded broken images or page overflow.
- Responsive checks at 767/768/1149/1150px: gallery boxes/sources are 120px below 768 and 160px above it.
- Slide 2/3 mobile sources now select width=412 at viewport 412/DPR 1. Source descriptors stop at native width 887px, rather than falsely declaring 1100–2400px variants. Desktop artwork remains separate.
- No schema, settings, CSS or JS lifecycle changes. Theme Editor interaction/lifecycle is NOT RETESTED in this narrow request; prior editor QA remains in gallery/slideshow receipts. High-DPR selection is covered by candidates/tests, not a physical device run.

## Sample CDN response sizes

Measured direct image responses with Accept `image/avif,image/webp,image/*,*/*;q=0.8`; bytes include body only. These are CDN samples, not a cold-browser HAR. Shopify may negotiate a format different from the filename suffix.

| Image | 800px WebP | 600px WebP | 120px AVIF | 240px AVIF |
| --- | ---: | ---: | ---: | ---: |
| gallery-6 | 128,574 B | 82,524 B | 6,293 B | 19,256 B |
| gallery-1 | 80,906 B | 51,694 B | 4,819 B | 12,182 B |

Reduction at 120px versus the screenshot's 800px request: about 94–95%. DPR 2 can choose 240px to preserve sharpness; originals are not recompressed or replaced.

## Validation and delivery

Theme Check: zero errors on a clean copy of shipping theme directories. Focused rendering tests: 24 passed; full tests: 174 passed, zero failures/skips (outside sandbox for localhost TCP test). `git diff --check` passed.

Only `blocks/_marquee-image.liquid` and `snippets/slideshow-image.liquid` uploaded to the verified unpublished theme, with `--nodelete`. No watcher created, no publication, Git commit/push follows the user’s explicit request. Existing uncommitted test fixes are retained. A full Lighthouse score/LCP comparison was not run; this scoped result establishes responsive selection and transfer reductions only. Source compression remains a separate potential improvement.
