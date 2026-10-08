# Custom CSS cleanup — 2026-10-08

This update supersedes the earlier Custom CSS descriptions in the section build notes.

- All `custom_css` fields are removed from the 14 sections in `templates/index.json`.
- Scrolling text, collection thumbnails, category cards, Image cards, and Tinker now use existing responsive implementation without template tablet overrides. Dedicated tablet settings already supported by a component remain effective.
- Collection thumbnails desktop image width uses a 4px schema step, a 112px default/fallback, and the Peekoo instance selects 160px. Each thumbnail has a static Title child; Peekoo titles are disabled in saved block data and can be shown through the sidebar. Images and their alt text remain present.
- Group padding accepts 0–200px in 2px increments (101 range values). Liquid bounds match the schema. Tinker selects left/right padding 128px; existing mobile settings select 20px.
- Tab Layout navigation consumes its own desktop/mobile gap settings, supports a single scrollable row, and preserves vertical navigation. Collection Tabs inline header composition places its action after products. A section-level Product card alignment setting defaults to Inherit; Peekoo selects Center. Tablet inherits desktop layout/gaps, without template-specific tablet rules.
- Slideshow tablet-only rules are removed from the existing Peekoo asset. Its desktop image rules now cover tablet too; the remaining desktop/mobile Peekoo preset has not been removed.

Validation: schema JSON and range constraints PASS; JSON has no custom_css fields PASS; Liquid render checks for Group 128/200px, invalid bounds, mobile padding, title escaping/editor attributes, and tabs alignment/inheritance PASS; 8 existing collection tests PASS; git diff --check PASS. Theme Check: 0 errors, 48 warnings (including existing Group complexity). No JavaScript changes.

Theme Editor sidebar hide/show/save/reload and storefront viewport QA: NOT TESTED in this update. No upload, commit or publication performed.
