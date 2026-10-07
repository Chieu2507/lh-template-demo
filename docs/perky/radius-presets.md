# Radius presets

Source: Figma file 6HBP12lG9fUcHhgF3Gx057, Perky section 49257:15161. The read-only Variables UI confirms Radius tokens none=0, xs=2, sm=4, md=6, lg=8, xl=12, 2xl=16, 3xl=24, 4xl=32 and full=9999. Media&Card radius aliases these tokens in Rounded mode and uses zero in Square mode. Figma MCP access was unavailable; the authenticated browser Variables UI supplied the values.

Eight explicit pixel choices extend existing implemented radius selectors in Theme Settings, media/card/group kernels, and matching sections. Existing IDs, defaults, symbolic values, Square, Full/Pill and Custom remain compatible. Global --radius-2 through --radius-32 tokens map into existing local properties and class contracts. No new per-section custom CSS. Previous/next article navigation and announcement countdown have existing radius selectors without a rendered radius surface; they were not extended with ineffective new options.

Fourteen explicit Custom values in the current Perky homepage are switched to equivalent presets (24px cards/banner/testimonials, 4px gallery). The saved custom range values are retained. The existing Testimonial Add-block preset now selects 24px directly. Other pre-existing workspace edits remain intact.

QA PASS: Theme Editor Banner menu displays all eight numeric options and selected 24px with Custom control hidden. Storefront computed radius: banner24, testimonials24, gallery4. Unit rendering verifies all eight values in Image, Collection card, shared Media card, thumbnails and global radius mappings. Fourteen related tests pass; Theme Check zero errors; diff check passes. Add/remove/reorder lifecycle and every individual radius control save round-trip NOT TESTED; no JS or editor listener changes. Development watcher remains running for continued user editing.

## Homepage radius audit

Figma node 49005:7458: Blog lead image, supporting cards and supporting media are 24px. Node 49038:25932: Tinker image and content panel are 24px. Node 49005:7201: Gallery media is 12px. Node 49005:7651: age collection shells 24px, inner images 16px. Node 49141:20177: Playsets banner 24px, product media 16px. Node 49005:14608: testimonial cards 24px. Read-only Figma browser inspection of Countdown node 49036:25883, Wrapper layer, confirms 32px.

Updated saved presets for Blog, Tinker, Gallery and Countdown; global Media and card radius now uses 16px for shared product/collection media. Horizontal Blog card media now consumes its card radius instead of resetting to zero. No custom CSS or new setting. Existing explicit 24px Playsets/age-card/testimonial choices retained.

QA PASS: computed desktop Blog shell/media24, Tinker image/panel24, Gallery media12, product media16, age collection media16; Countdown panel32 and hotspot image0. Mobile Blog shell/media24 and no page overflow at390px. Radius rendering tests3 pass, Theme Check zero errors and diff check passes. Blog still displays resource placeholders; real article images and Theme Editor lifecycle round-trip NOT TESTED in this audit. Desktop proof: /private/tmp/perky-blog-radius-fixed.png.
