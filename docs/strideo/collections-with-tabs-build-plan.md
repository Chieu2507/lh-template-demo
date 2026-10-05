# Collections with tabs — centered image list

- Role/placement/context: homepage after Featured collection, existing Collections with tabs section; collection resources remain empty, custom demo titles from Figma. No catalog writes or media uploads.
- Ownership: global typography/schemes/page width; section selects Standard or Centered image list, image size presets, header spacing, responsive section padding; collection item owns resource/title/two image pickers. No Mobile card width setting. Mobile compact carousel uses an internal responsive 252px cap, matching Figma at 375px.
- Slots: existing static Header; ordered Collections with tabs item blocks. New layout renders a single item tree with primary image, collection link/title, secondary image; no duplicated focus targets or IDs.
- Output/runtime: shared Swiper shell/factory for mobile only; existing section JS owns idempotent initialize/destroy and editor selection. Desktop hover/focus changes the visible image pair; clicking collection link navigates. Tablet shows every image/title row; mobile shows one image/title card per item. Missing collection links remain inert placeholders; default first pair visible before JS.
- Responsive: desktop 3-column image/list/image with fluid images capped at Medium 448px; gap112 and list gap8. Tablet rows use 64px thumbnails and 32px row/inline spacing. Mobile carousel cards max252px, gap16 and image/title gap16. Heading roles H1 desktop/tablet, H2 mobile. Header gap40/36. Section padding40/144 desktop,32/128 tablet,20/112 mobile.
- QA: schemas, Theme Check, syntax, whitespace; hover/focus and collection click semantics, mobile carousel, no page overflow, long labels, empty resources, editor item selection, initial non-JS state and reduced motion. Preserve Standard layout behavior; no additional user approval needed for approved extension.

## Verification — 2026-10-04

- Uploaded section, item block, helper, JS and homepage configuration to draft theme 191953273131, Strideo-template (chieutt). Branch remains Strideo-template.
- Theme Check: zero errors; existing repository warnings remain. JavaScript syntax and git diff whitespace checks passed.
- Desktop 1920: content list 463.95px high; both images 410.6px square at the bottom of the list within the global 1536px inner container. Pointer hover activated Cloudmonster during viewport inspection.
- Tablet 768: all ten 64px thumbnails visible, five rows; list height 488px.
- Mobile 375: section 495.39px, card width252px, gap16px, document width375px. A drag advances the shared Swiper wrapper by268px. Placeholder overlays confined to each figure.
- Theme Editor: Centered image list selected; five ordered Collection blocks, static Header/Eyebrow, resource picker, custom title and primary/secondary image pickers confirmed. Save remained disabled during read-only inspection.
- Keyboard activation handler and editor lifecycle reuse reviewed in code; direct keyboard UI test unavailable on disabled placeholder links. Actual resource navigation remains untested because collections are intentionally unselected.
- Images and collections remain placeholders as requested. Temporary viewport override reset.

## Responsive/editor correction — 2026-10-04

- User requires Collection image group hidden in Centered mode and editor attributes attached once to the title. Preserve image pickers on item and standard layout settings.
- Desktop: bound the title track and wrap long names; place paired media in normal grid flow spanning title rows so short lists reserve media height. Keep 448px image cap and responsive gap within saved desktop maximum.
- Tablet: three-track rows constrain long names between two 64px thumbnails. Mobile keeps compact shared Swiper presentation.
- Update block selection lookup from title to containing item. Verify breakpoint boundaries, editor controls and title selection; retain existing unsaved user Editor state.

### Correction verification

- PASS: branch Strideo-template; upload successful to draft191953273131 for section, item and controller. No template or user Editor save performed.
- PASS: Theme Check zero errors,35 existing warnings; changed files have no reported offenses. JS syntax, schema JSON and diff whitespace passed. Centered item emits attributes exactly once on its title anchor; editor selection handler now finds its containing article.
- PASS: desktop screenshot at1920 after upload shows paired square images at both sides/bottom of five-row title list; normal-flow grid no longer positions media outside content.
- NOT TESTED: final tablet/mobile boundary sweep, long-label/short-list rendered cases and fresh Editor title selection. Browser connector repeatedly failed request-header policy retrieval. Native Chrome fallback rendered desktop, but responsive inspection ended on a blank/loading preview. Closed agent-created QA tab and DevTools; user Editor session untouched. Do not claim comprehensive responsive QA.
