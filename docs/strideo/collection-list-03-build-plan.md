# Collection list 03 — Strideo

- Placement: final homepage section after Featured product; remove previous sections below Featured product from index only, preserve reusable source files.
- Figma: 49200:14810 desktop, 49384:13233 tablet, 49390:14335 mobile. Heading Every stride has a story, H2; four image-led editorial cards, H4 white titles, ratio 6:7, radius4, content padding24. Gaps20 desktop/tablet and16 mobile; heading gap40. Top padding0, bottom96/80/64.
- Reuse Image cards with canonical Image card → editable Group → Heading; images and links independently editable. No catalog dependency. Keep placeholders following prior user image deferral, never store photos in assets.
- Extend missing section carousel mode using shared swiper-carousel, swiper-pagination and product-collection-carousel controller. 4/2/1 columns, desktop locked pagination hidden; tablet/mobile progress bar with40px gap. Existing flow instances remain unchanged. Optional canonical Header slot. Add6:7 ratio and solid overlay mode to Image card; preserve gradient default.
- QA: schema/slot integrity, Theme Check, shared controller syntax, editor nested selection, responsive geometry and carousel movement; named draft upload only, no publish/commit.

## QA receipt

- Removed six index instances below Featured product: parallax, collection background, hotspot, new arrivals banner, testimonials and FAQ. Source files retained. New final instance collection_list_03 uses Image cards.
- Draft191953273131 successfully updated; no publishing or Git commit. Schema uploaded before index to retain newly introduced settings.
- Desktop1920:4 cards369×430.5px; locked progress bar hidden. Mobile375:1 card343×400.156px,16px gap,40px progress spacing; dragging moves to second title and progress50%. Tablet768:2 cards344×401.328px,20px gap,bottom padding80px. No horizontal page overflow at all three sizes. Global page width remains1600px.
- Theme Check0 errors/35 existing warnings; controller syntax and whitespace checks pass. Photos remain placeholders; no images written to assets. Images/pickable links and nested content are editable, no catalog resources fabricated.
- Image card6:7 mobile selector has sufficient specificity against a duplicate older rule in the remote compiled stylesheet. Existing height/flow/gradient defaults unchanged.
