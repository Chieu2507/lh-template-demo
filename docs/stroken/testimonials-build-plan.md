# Stroken testimonials with compact products

- Role/placement: social proof on the homepage after New arrivals — Banner. Figma desktop 53017:17940, tablet 53266:1425, mobile 53267:2326.
- Context: three existing products selected per compact card; actual Shopify image/title/market price, no duplicated product copy.
- Ownership: section owns columns, carousel gap, header gap, scheme and section padding; private review card owns local surface/padding; Group, Text, Icon and Divider own editable review content; private Product card: Compact owns the product picker and horizontal media/title/price layout.
- Slots: static shared Header; merchant-managed private review cards, each accepting Group/Text/Icon/Divider and private Compact. Both private blocks use underscore names, excluded from generic @theme menus per Shopify targeting contract.
- Runtime: reuse swiper-carousel, swiper-navigation and carousel-block.js. Add optional tablet columns to shared controller without changing existing callers' 768px desktop breakpoint.
- Responsive: desktop 3 / tablet 2 / mobile 1; card gap20; header gap40 desktop/36 mobile; section padding80 desktop/64 mobile; card padding24 and radius8; compact image64 square/radius4/gap16.
- Content: Figma quotes and authors are demo copy. Real product media and pricing supplied by selected products already in the store. Stars/chevrons/divider reuse equivalent theme primitives. Navigation hidden when no overflow, including the three-card desktop instance.
- Reference: theme 191896977707 is no longer returned by Shopify CLI; implementation follows Figma and current kernels.
- QA: Theme Check, JSON/schema validation, JS syntax, diff whitespace; editor selection/add blocks; desktop/tablet/mobile geometry, navigation/swipe, no horizontal overflow and product links.

## Verified result

- Uploaded section, private card blocks, shared controller extension and homepage configuration to development theme 191891243307.
- Theme Check: 0 errors, 35 existing warnings. JavaScript syntax and git diff whitespace checks passed.
- Storefront geometry: desktop cards 498.66px at 1920 viewport; tablet cards 344px at 768; mobile cards 343px at 375. Compact images 64px. All selected product images loaded and prices matched $55/$168/$100.
- Tablet Next button moved wrapper by 364px. Mobile navigation hidden; progress width343px; no document horizontal overflow. Carousel retains tallest card height to avoid layout shifts between reviews.
- Theme Editor displays nested Group/Divider/Compact blocks and selected Product picker with Show price. No editor configuration was saved over the uploaded configuration.
- Mobile proof: output/stroken-testimonials/mobile.png.
