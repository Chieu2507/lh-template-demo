# Stroken Hotspot product callout

- Role: editable merchandising content on the homepage.
- Placement: existing `hotspot` section, after the preceding featured collection banner in `templates/index.json`.
- Context: three product pickers using existing demo racket, polo and skirt products. Rise Polo Women shown in Figma is absent from the current catalog; use the existing Dri-FIT Advantage Polo without falsifying its title or price.
- Ownership: global page width, margins, typography, schemes and buttons; section product card layout and spacing; Product callout image/ratio/radius; Hotspot product and responsive coordinates.
- Slots: static Header → Heading; static Product callout → three editable Hotspot blocks. Empty callout content produces no mobile content panel.
- Output: existing accessible hotspot dialog and theme-button quick view, compact card as an opt-in. Existing carousel/gallery presentation remains the default.
- Runtime: shared product-callout controller and product quick-view controller; reuse editor lifecycle, close/Escape and viewport collision handling.
- Responsive: desktop 21:9, mobile 7:6; gap 32px; bottom padding desktop 80px/mobile 64px; media radius 12px; mobile hotspot coordinates differ from desktop. Popup prefers either side on desktop and vertical on mobile.
- QA: schema/JSON, Theme Check, JS parse, scoped diff check; desktop/mobile hotspots, Escape, quick view and editor settings. Upload media through Theme Editor; do not put image files in theme assets.

## Verified result

- Theme Check: zero errors; no offenses in changed Hotspot files.
- JSON schemas parse; unique setting IDs; embedded JS parses; scoped diff whitespace check passes.
- Development theme 191891243307 confirmed. Section and all three nested hotspot blocks visible in Theme Editor.
- Desktop: media 1536×658.281px, H2 40px, bottom padding 80px. Compact popup 320×84px prefers right of the trigger.
- Mobile 375px: media 343×294px, gap 32px, bottom padding 64px, no horizontal overflow or empty content panel.
- Product quick view opens the existing modal. Escape closes hotspot and restores its collapsed state.
- Source media recovered from Figma MCP on 2026-10-02: desktop node 53088:19946 and mobile node 53267:2278. Both source files are 1800×771 and saved under output/stroken-hotspot/media/. The mobile source exceeds the required 750px Retina width.
- Image assignment remains pending: Chrome extension file upload requires “Allow access to file URLs”. Native file chooser fallback did not open. User has been asked to enable the permission; no image settings have been saved yet. After assignment, recheck crop, all three hotspots, popup collision and quick view against the actual media.
- No image was written to assets/. Screenshot proofs are in output/stroken-hotspot/.
