# Slideshow image correction

Figma desktop node 49326:8230 and mobile node 49390:17622 use the same runner in yellow sportswear. Downloaded original desktop source 1920x1080 and mobile preview 480x270; reuse the full resolution source for both image picker slots.

Updated slide-primary image/mobile_image only. Existing slideshow behavior, remaining slides, text and layout preserved.

Shopify MediaImage gid://shopify/MediaImage/46385926340907 is READY; file fluxstep-slideshow-figma.png. Uploaded latest merged index to draft 191986827563. Desktop and 375px mobile load the new image; mobile has no horizontal overflow. Screenshots in qa/slideshow-figma-desktop.png and qa/slideshow-figma-mobile.png. JSON parses and git diff --check passes.
