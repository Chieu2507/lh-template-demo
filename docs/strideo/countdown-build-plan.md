# Countdown timer — Strideo

- Role/placement: homepage campaign hero after New arrivals — Tabs. Reuse current countdown_timer Hero instance; move only this section. Named Strideo draft191953273131, branch Strideo-template.
- Figma: desktop49192:7726 is full-width background, height750px, vertical padding80px, scheme3. Tablet49384:13137 is640px/padding80px; mobile49390:14246 is570px/padding64px. Desktop Container49192:7727 fills available590px and uses space-between. Content49192:13394 max576px, gap40px; nested Heading has H1 Instrument Sans72/60/48 and description16px separated16px. Copy Run into savings; Your next stride just got lighter. Grab up to 40% off select styles built to move with you on the track, in the city, and everywhere in between.
- Composition: dynamic Group(height fill, position space-between) > Group(content, max576px) > Group(heading + text), Button; sibling Group(scheme4 yellow) > Countdown timer. All editable, reorderable/removable; no new block type or static content.
- Ownership: global page width/margins/type/color tokens retained; Hero owns full-bleed media/position; Groups own content size/gaps and timer surface. Scoped template Custom CSS supplies fixed Figma heights/inner padding without changing global Hero presets. Existing timer supplies recurring runtime/accessibility and editor lifecycle.
- Media: clear inherited Stroken tennis image; existing Hero lifestyle placeholder until user uploads Strideo image, following user's deferred-image preference. No image writes to assets.
- QA: preserve unrelated remote template values, validate schema/settings/order, Theme Check, targeted upload, live height/width/padding and timer progress on all three device bands, Theme Editor nested selection and screenshot.

## Final responsive verification — 2026-10-04

PASS: named Strideo draft uploaded. Hero height 750px at >=1150, 640px at 768–1149, 570px at <=767. Each `custom_css` array item contains one rule, ensuring Shopify prefixes every selector with the owning section ID; no unscoped heading/group rules. Existing timer ticks and remains editable. Media is the requested placeholder pending later image update. The earlier desktop/mobile screenshots predate the final CSS scope correction and are not final evidence.
