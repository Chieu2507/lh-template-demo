# Wofyn Collection list

## Section Build Plan
- Branch Wofyn-template; instance perky_age_collections, after Rich text. Reuse collection-list + collection-list-items + collection-card + Group + collection-card-title.
- Context: five Shopify collections Walks/Bowls/Beds/Toys/Foods; live lookup found none. Resource creation/mapping waiting for user choice because collections are shared across themes.
- Ownership: section scheme/spacing; list selected collections, columns/gaps/pagination; card image/resource link and radius; content Group owns FAFAFA background and20/24 padding; title inherits H4.
- Figma desktop47155:13174/mobile47557:5985: desktop5cards, gap20; mobile1card, gap12, progress2px with40px top gap. Square images, radius16, hover zoom. No header/CTA/count.
- Runtime: existing carousel; no JS/CSS/schema additions. Blank list uses base placeholders until resource decision.
- Gaps: bottom112px desktop exceeds section100px max; use100 temporarily. Base1400 container includes padding, so cards smaller than Figma264. Keep fonts/token line heights; typography/wrapping may differ.
- QA: scope JSON, allowed settings, resources/assets, editor, desktop/mobile/tablet, swipe and progress, Theme Check.

## QA phần độc lập
- PASS layout: desktop5cards per view, card244.8px; mobile343px, radius16, Group backgroundFAFAFA/padding20px24px, progress2px; no page overflow.
- PASS Theme Check0errors/36warnings and diff check. Blank collection picker generates7 carousel placeholders by base contract (desktop capacity5+2), pending real5resources.
- Watcher index upload succeeded. A concurrent editor save briefly restored old Peeko data; reapplied only collection instance to newest JSON, preserving other changes.
- Pending user resource choice; assets not uploaded, collections not created, final resource/editor/link/swipe QA not complete.
- Proof /private/tmp/wofyn-collections-layout.jpg.

## Independent media radius
User-requested base extension: Collection card exposes Media corner radius using Image kernel presets and Custom (0–40px). Default Inherit preserves existing saved cards through the global media token. Wofyn instance sets media_corner_radius=square; outer card remains radius_16. Placeholder and real image share the same wrapper and control. No JavaScript, placement or block eligibility changes.
QA: Theme Check 0 errors / 36 existing warnings, diff check passed. Preview desktop and mobile confirmed media radius 0px, outer card 16px, no mobile overflow. Fresh Theme Editor verified Media corner radius = Square and saved/synced state. Existing editor has pending user edits and was left untouched. Non-Square presets and custom-value live toggles: NOT TESTED; token mapping reused from Image kernel. Proof: /private/tmp/wofyn-collection-media-square.jpg.
