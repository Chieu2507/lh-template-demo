# Scroll reading text — Strideo audit and build contract

- Purpose/placement: editorial brand statement, homepage after Collection list: 2 images. Existing base section is extended; reference theme Elvara is read-only research.
- Figma: desktop Hero banner 49053:7037, text 49053:7042; tablet text 49384:13082; mobile Hero banner 49390:14193, text 49390:14196. Heights 900/800/640px, centered content capped at672px (mobile343px), global H1 Instrument Sans60072/60/48px with120% line height. Scheme3, black10% overlay, original1920×1080 image shared across devices, cover center. Figma inspect padding variable resolves to80px; section height makes content position independent of padding.
- Reference Editor: editable Subheading, Editorial text and Button; section width/alignment/gap40 desktop30 mobile; Editorial text speed Slow/Medium/Fast and start opacity30%.
- Audit findings: base has no height, overlay, mobile image, alignment or independent gap; legacy word controller queries heading-block but static Editorial text already owns accessible letter reveal. Avoid two animation owners. Base padding and background shell do not follow shared section surface.
- Ownership: global page width/margins, scheme and H1; section owns height presets (no arbitrary height field), capped content width presets, parent alignment/gap, background image/mobile fallback, overlay and spacing. Existing Editorial text owns rich copy, typography and reveal (reuse assets/editorial-text.js). No new Theme Block or runtime.
- Compatibility: preserve existing static IDs text/editorial-text/button and dynamic block allow-list; preserve old settings and media references. Legacy horizontal padding remains supported. New homepage instance hides unused static Text and Button, sets Editorial text to Fill/H1. Existing other template sections remain intact.
- Responsive: canonical1150/768 breakpoints; Large height900 desktop800 tablet640 mobile; content can grow beyond minimum for long text; responsive background picture, no image pixels in assets. Keep JS-off/reduced-motion text visible.
- QA: Theme Check, diff, schema setting coverage, Editor selection/save/reload, responsive heights/overflow/media crop and progressive scroll opacity. Add/duplicate/reorder scenarios recorded only when exercised.

## Validation and remaining limits

- PASS: Theme Check zero errors /35 pre-existing warnings; reused Editorial JS syntax and Git whitespace checks.
- PASS: draft theme191953273131 upload accepted; new schema uploaded before final homepage settings (first combined upload dropped new setting IDs, corrected with subsequent template-only upload). Editor reload confirms Large desktop height and enabled reveal; text/block selection highlights correct root and makes letters fully visible.
- PASS: storefront widths320/375/767/768/1149/1150; no horizontal overflow. Desktop900px, tablet800px, mobile640px; H1 sizes72/60/48px. Content672px desktop/tablet,343px at375. Previous viewport-entry reveal was superseded by the sticky correction below.
- PASS: no extra Theme Block, no content-image pixels in assets, all previous homepage sections/settings/order retained.
- NOT TESTED: add/duplicate/reorder/remove, settings save round-trip, JS-disabled and OS reduced-motion runtime. Native custom-element lifecycle and reduced-motion CSS are reused from existing Editorial text.
- Image remains unassigned: specific original Figma image download repeatedly timed out; exact filename search in Shopify Files returned no results. No unrelated asset substituted. The correction now renders the shared image placeholder on desktop/mobile while media is unassigned; actual-image cover/crop QA remains pending.
- Approved compatibility exceptions: retain shipped four-sided padding/mobile override and dynamic block allow-list. New cap controls use presets; horizontal global page margins remain theme-owned. Existing per-section literal label convention retained for new height/content/gap/overlay groups; canonical padding label wording normalized without changing IDs.

## Sticky correction contract

- User correction: reveal starts only once the section is pinned; prior viewport-entry reveal QA does not satisfy this contract.
- Section owns a scroll track and sticky media/content panel. Existing Editorial custom element owns progress and enhances only its containing track. Speed controls the pinned scroll distance. Panel remains centered in the viewport when its preset height differs from the viewport.
- Missing media always renders the shared Shopify image placeholder. No image files added to assets.
- Without JS, disabled reveal, or reduced motion: normal section flow, readable text, no extra scroll track. Multiple Editorial blocks share track ownership; disconnect/re-render clears enhancement when the last owner leaves.
- Validate before pin / during pin / after release, reverse scrolling, mobile, and block selection.

### Correction validation

- PASS: uploaded section and Editorial runtime to draft Strideo191953273131; no template/config changes in this correction.
- PASS desktop1920×1088: before pin track/panel top327px, all letters30%; during pin track top−489px/panel top94px, letters30–100%; after release panel top−162px, all100%; reverse scroll returns to pinned mixed opacity.
- PASS mobile375×812: panel640px; before pin top200px/all30%; during pin track top−328px/panel top86px, letters30–100%; visible shared SVG placeholder; no horizontal overflow. Temporary viewport reset.
- PASS Editor: Editorial block selectable/highlighted and all copy visible on selection, shared placeholder visible. Evidence output/strideo/scroll-reading-sticky-editor.png. Nested iframe DOM measurement unavailable, selection verified visually.
- Reference191896977707 is no longer returned by CLI theme lookup; behavior is implemented from the user's explicit sticky contract, not claimed byte-equivalent to that theme.
- Reduced-motion and JS-off fallbacks audited in source; OS-motion/JS-disabled runtime and add/remove/re-render not exercised in this correction.

## Viewport fill correction

- Sticky panel must fill the viewport; centering a shorter preset-height panel exposed track background above and below it.
- While reveal is active, section min-height is100dvh and sticky top is0 (negative centered offset only if long content exceeds viewport). Preset heights remain the non-sticky/reduced-motion fallback. Background and overlay cover this entire panel. No new merchant setting.
- Validate desktop and mobile panel/media top/bottom coverage during pin and retained progress/release.

- PASS fill QA: desktop1920×1088 panel and background top0/bottom1088; mobile375×812 panel and background top0/bottom812, no horizontal overflow. Both retain mixed opacity while pinned. Uploaded to draft191953273131; Theme Check0 errors/35 existing warnings, JS syntax and whitespace checks pass.

## Editable block correction

- User authorizes removing locked Text/Button slots and absent design blocks. Use one dynamic Theme Block list; Editorial is also reorderable/removable. Existing block allow-list remains available in Add block.
- Homepage keeps only existing Editorial copy/settings. Migrate other stored section instances from static IDs to dynamic block_order without removing their populated Text/Button. Preserve remote unrelated template edits. Preset supplies Editorial only.
- Validate Editor add/remove/reorder affordances, homepage no hidden unused blocks, stored migration and Theme Check.

- PASS editable-block QA: remote homepage has only dynamic Editorial, enabled reorder and Remove block; Add block dialog lists Text and Button. Existing sync template content migrated without discarding populated blocks or unrelated remote edits. New section preset has only dynamic Editorial. Upload accepted; Theme Check0 errors/35 existing warnings. No test blocks added or settings saved in Editor.
