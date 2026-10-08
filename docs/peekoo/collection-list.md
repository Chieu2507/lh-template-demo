# Peekoo Shop by category

Build plan: content section in index after Image cards (pending upload approval). Reuse collection-list shell → static Header, View-all disabled through empty label, Collection-list-items → shared static Collection card → Collection card title. Context owns four existing Shopify collections (Baby Toys, Art & Crafts, Puzzles, Handmade); photos, titles, links and counts remain live collection data. No catalog changes or new assets. Section owns centered header, gap48/40/36, padding10 top and80/64/56 bottom. Items owns carousel3desktop and fixed256px tablet/mobile, gaps28/20/16, bullet pagination; Card owns grey scheme2, radius24, square media radius16 and content padding. Existing carousel JS owns lifecycle. QA: schema/Theme Check, viewport geometry and overflow, links, pagination.

Figma nodes: 49017:22864, 49234:4795, 49234:5830. Existing collection images and titles differ from design and counts reflect actual catalog (4/0/1/2). Do not invent counts or mutate shared collections.

Shopify accepted scoped index upload to unpublished Peeko theme192108396843; hotspot disabled. Pending Image cards excluded from preview upload because its new photo remains unapproved. Theme Check zero errors; visual storefront verification currently blocked by password.

Responsive limitation: tablet uses the existing two-column Swiper contract; only mobile supports fixed256px card sizing. Avoid forcing slide widths through CSS because that would break carousel travel distances.

Verified live: all4 photos loaded; no Hotspot DOM; no page overflow at1920/768/375; mobile card256px, tablet344px; clicking bullet2 changes active slide; active visible dot8px; View all hidden. Proof /private/tmp/peekoo-category-final.jpg. Editor composition remains existing static blocks; no new runtime.


User-selected image collections follow-up: Peeko index collection-list picker changed to0-6-months-perky,6-12-months-perky,1-2-years-perky,2-3-years-perky in Figma photo order. Four existing collection images match design; original Files reused indirectly through resources. No schema, shared collection data, or new asset changes. Scoped remote index upload accepted; live all4images loaded and links point to selected age collections. Current titles/counts are actual resource data. Screenshot /private/tmp/peeko-category-correct-collections.jpg.


Collection carousel controls parity: shared Product list Navigation/Pagination/Autoplay schema copied with existing IDs preserved and layout owner adapted. Added Bottom placement runtime and footer row; Top always visible. Removed local bullet geometry/hover overrides to consume shared Swiper UI. Existing pagination_visibility extension retained for saved instances. Theme Check0errors; scoped block uploaded Peeko192108396843. Live bullets have accessible slide labels; click2 changes wrapper -477.333px, click1 restores. Bottom and full editor lifecycle not exercised. Screenshot /private/tmp/peeko-collection-controls.jpg.
