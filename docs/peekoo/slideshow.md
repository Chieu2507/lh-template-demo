# Peekoo homepage slideshow

Source: Figma file `6HBP12lG9fUcHhgF3Gx057`, section `49257:15159`.

## Section build contract

- Role: introduce the baby/toy collection, with a primary Shop now action.
- Placement/context: existing slideshow in `templates/index.json`; merchant images and existing collection links.
- Ownership: section controls dimensions, transitions and pagination; Slide controls images, placement and scheme; nested Groups control flow/gaps; shared Heading, Eyebrow, Text and Button kernels render editable content.
- Slots: three repeatable Slides, each with Group → content Group (title Group containing Eyebrow + Heading, then Text) + actions Group (Button). 27 dynamic blocks, four nesting levels; existing section cap remains five Slides.
- Runtime: existing slideshow controller and Theme Editor lifecycle; no new JavaScript. Existing first-image eager/high-priority loading is preserved.
- Responsive: 1920px desktop / 768px tablet / 375px mobile, heights 820/820/620px. Desktop content is right aligned within the 1400px content area; tablet/mobile content is centered. Column width is 560px for the first slide and 550px for the others, capped by available width.

Height uses the existing Large options: desktop CSS is 820px (tablet inherits it), mobile CSS is 620px. Tablet customization is disabled and inactive custom pixel values are removed from this index entry. The Slide image helper's Large mobile crop mapping also follows 620px.

## Implementation and scope

Only the slideshow entry in index changes; every other index section and section order compares equal to HEAD. Other templates, header/footer groups and Theme Settings remain untouched.

Shopify rejects section Custom CSS over 500 characters. The opt-in `layout_preset: peekoo` therefore loads `assets/peekoo-slideshow.css` through the existing section. Standard instances retain their existing behavior. The preset supplies original-artwork crop positions, overlays, responsive content placement and ring pagination. Artwork selectors follow the image source instead of slide order, so Swiper looping and merchant reordering preserve art direction.

The preset skips centered mobile CDN cropping; the image helper accepts an optional mobile sizes hint. Both preload and picture use matching candidates. The original SVG source dimensions remain untouched.

Peekoo Bullets reuse the Numbers pagination controller and its SVG progress ring, with a 10px dot replacing each number. The ring is 20px inside a 24px button; labels and aria-current remain accessible. Auto-rotate is enabled at the existing six-second interval, sharing the progress clock, reset and pause behavior with Numbers. Other layout presets retain their existing Bullets behavior.

Each slide's Eyebrow, Heading, Text and Button uses Slide from bottom with 150/250/350/450ms delays. Groups remain unanimated to avoid nested transforms. The shared reveal controller reveals all active slideshow contents when the slideshow is visible, rather than waiting for each leaf to enter a short editor viewport. Animation type/delay attribute changes cancel and reinitialize the existing block's animation.

The eager slideshow module also registers a theme-module marker and exports initializeThemeModule, so cached imports initialize replacement editor HTML. Section load disposes an existing instance before rebuilding, and block selection uses the logical loop index with zero transition duration.

Figma references:

| Slide | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Caring for Your Baby Starts Here. | 49022:23969 | 49234:4662 | 49234:5697 |
| Fun and Educational Toys for Kids | 49226:18564 | 49248:8174 | 49248:8200 |
| Discover The Best Toys For Kids | 49029:25135 | 49248:8226 | 49248:8251 |

Original Figma assets downloaded into `/private/tmp/peekoo-slideshow/` and uploaded to Files on `layouthub-template-v2.myshopify.com`:

- `5282e.png`: 3840 × 1640; MediaImage 46463963103531.
- `f9b22.jpg`: 2001 × 801; MediaImage 46463965135147.
- `561ad.jpg`: 2000 × 800; MediaImage 46463969820971.
- `786e6.svg`: original flame, 14.7682 × 19.9856; MediaImage 46463970214187.
- `d93da.svg`: original active pagination ring; MediaImage 46463973818667.

Images remain editable Shopify image-picker references. SVG decoration uses permanent Shopify Files URLs. No temporary Figma URL or screenshot is used in the implementation. Copy remains merchant-authored data; the new preset label follows the existing section's literal schema-label convention.

## Validation

- PASS: verified unpublished theme `192108396843`, `Peeko template (Chieutt)`, before scoped Shopify uploads; no publication and no new preview watcher.
- PASS: Shopify accepted the updated template, section, Slide, helper and stylesheet.
- PASS: Theme Check, zero errors; inherited warnings remain.
- PASS: 19 tests covering image sources/crops, cached editor module initialization, section reload cleanup, loop-aware block selection, animation setting changes and inactive/active replay.
- PASS: `git diff --check`; only slideshow changes in index.
- PASS: live desktop/tablet/mobile geometry and original image loading; first-slide content widths 560/560/343px, heading sizes 54/46/40px and image geometry match the reference. No horizontal page overflow at the checked reference sizes.
- PASS: desktop/mobile pagination changes slides; all three photos load. Flame SVG resolves to its original Files asset. Shared focus styling and slide motion are retained.
- PASS: live dot pagination has no number text, 10px dots and 20px SVG rings. The active ring follows the autoplay clock; slides advance automatically and clicking a dot changes the active slide. Mobile height remains 620px without horizontal overflow.
- PASS: Theme Editor animation changed from Slide from bottom to Fade, then selecting slide three displayed its photo/content immediately without hiding or reopening the section. The temporary Fade change was undone; Save returned to disabled. Storefront active slides reveal all four content blocks, including those below the short viewport.
- PASS: Theme Editor displays three Slides and the new preset; saved desktop/tablet/mobile heights are 820/820/620. Selection and reload rendering work.
- NOT TESTED: editor add/remove/duplicate/reorder/save lifecycle, because an existing Restore last session notice indicates an unsaved editing session. That session was neither restored nor saved.
- NOT TESTED: keyboard activation (browser automation's key-press method failed), reduced-motion emulation, empty/long-content mutation fixtures and non-reference breakpoint widths.

Existing header/announcement differences are outside this slideshow scope. Changes have not been committed or pushed to Git.
