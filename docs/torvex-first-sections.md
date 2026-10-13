# Torvex: first three homepage sections

- Role/placement: three content sections at the start of the index JSON template.
- Context: Figma promo/category imagery; existing Road running Strideo collection for product demos (user choice).
- Ownership: section owns spacing/grid; Promo card owns media/spans; Group owns content flow; kernel blocks own editable copy/actions. Product list supplies Shopify products; Theme Settings supplies product-card styling.
- Slots: Promo grid with three editable cards; Collection thumbnails with static Header/View all and eight collection blocks; Featured collection with existing static Header/View all/Product list/Product card.
- Runtime/output: existing Liquid renderers, semantic links, image/media primitives and Swiper controllers. Mobile fixed product width reuses existing controller support. No template Custom CSS.
- Responsive: existing tablet column controls and desktop padding inheritance; mobile stacks promo cards with chosen aspect ratios, moves resource actions below lists, and uses swipe carousels.
- Preserved data: old Pawvera homepage sections remain saved and disabled while Torvex is built.
- QA: schema/settings validity, Theme Check, diff whitespace, desktop/tablet/mobile storefront and Theme Editor selection.

## Verified outcome

- Draft theme: 192249102635; preview port 9293.
- Theme Check: zero errors; carousel/promo and CSS-loader regressions: 14 passing tests.
- Desktop 1920px: promo grid approximately 1061×604 + two 523×294 cards; 8 category thumbnails at 164px (the supported 4px step), 5 product cards at 310px.
- Mobile 375px: promo cards 343×400 and 343×229, 16px radius; thumbnail width 112px; product width 212px. Category and product swipe verified.
- Theme Editor: the three sections, nested Promo card settings, View all and Product list controls inspected successfully.
- Accepted differences: tablet inherits desktop padding and adaptive row sizing rather than separate Figma-only tablet overrides. A 240px minimum row height preserves small-card copy/actions at narrow desktop/tablet widths. Shoes use existing live demo data; absent ratings are omitted. Promo/category links currently use the general catalog until electronics collections are supplied.
- Existing header-bottom collapse edits appeared from the remote theme during dev synchronization; preserved without modifying them.

- Additional observation outside this section change: at 1150px, MainContent and all three sections remain 1150px wide, while the page has a 1226px scroll width from the header area. The concurrent header work was preserved; no header fix was included here.
