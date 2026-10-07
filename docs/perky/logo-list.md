# Perky logo list

Reference: Figma file `6HBP12lG9fUcHhgF3Gx057`, node `49011:19965` (Logo list 01).

The existing Scrolling Text Images section is composed from a Heading and a Marquee with six editable Item → Image children. It follows the playsets collection banner. The design uses Popular Brands, a white scheme, 80px vertical padding, a 40px heading gap, 160 × 80 image frames and 48px logo gaps. The theme keeps its existing page-width setting.

Today, Funko, Jellycat, Chicco, Barbie and Weina source files were downloaded through Figma's Images menu and uploaded together through Theme Editor. Shopify image references are stored in the template; no logo files were added to theme assets. Images retain alt text and editable image pickers. The existing Marquee speed and direction controls own scrolling; speed zero can stop it.

Image now offers Cover (unchanged default) and Contain. Contain preserves complete logos in custom-ratio frames. A contained frame with Fit width and an enabled width limit uses that configured pixel width and inline size containment, so the source image's intrinsic width cannot inflate a marquee item. This is opt-in and leaves existing Cover images unchanged. Image fit labels use literal English because corresponding canonical schema locale keys are absent.

Scrolling Text Images now propagates its direction, alignment and gap through the inner container, fixing its vertical composition. Center alignment also supplies the shared heading text-alignment token. No Custom CSS is used.

Validation: all six desktop item widths measured 160px; images loaded and used Contain. At 375px, all item widths measured 128px (64px image height), with no page overflow. Mobile uses 56px vertical padding, 28px heading gap and 32px logo gap. A separate mobile Figma frame was not inspected. Theme Editor upload and Save completed. Existing nested allow-lists remain unchanged; the composition adds no new block type or runtime controller. Proof: `/private/tmp/perky-logos-desktop.png` and `/private/tmp/perky-logos-mobile.png`.
