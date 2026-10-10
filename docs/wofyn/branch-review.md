# Wofyn branch review — 2026-10-10

Branch: `Wofyn-template`. Result: PASS WITH FOLLOW-UPS.

## Reviewed scope

Reviewed tracked theme changes and new Wofyn sections, blocks, shared snippets, CSS/JS, schemas, settings, templates and content receipts. Retained existing slideshow artwork already tracked. New raw media, copied reference themes and QA output in `output/` remain local and are excluded from this commit.

Fetched and merged the Shopify synchronization history from `origin/Wofyn-template`. The sole conflict was the auto-generated comment header in `index.parallax-audit.json`; retained the remote header and identical template content. Kept that audit template because it is already part of the remote branch.

## Validation

- Theme Check on a clean copy of theme directories: 0 errors, 39 advisory offenses. The original workspace scan included copied themes under `output/` and reported 104 offenses; those copies are not shipping theme code.
- All 21 theme JSON files and 252 Liquid schemas parse; no duplicate top-level setting IDs. Saved select/range values and ordered IDs checked. Legacy local collection-card blocks are declared in their parent section schema.
- JavaScript syntax: `icon-text-cards.js` and `promo-grid.js` passed.
- Full repository test run outside the sandbox: 173 tests, 160 passed, 13 failed. All 13 failures also occur at the preceding local commit. An additional remote image-height test referenced removed Fill settings; updated it to check the current ratio-controlled behavior and obsolete saved-setting compatibility. It now passes. The preview TCP test passes outside the sandbox.
- `git diff --check` passes, including newly added files after removal of two extra EOF blank lines. No credential patterns found in new theme/doc files.
- Draft storefront preview at 1920px and 390px: no horizontal overflow, no broken loaded images, no captured console errors. Wofyn products, prices, collection links and articles render. All five category cards retain 16px outer radius; media/image radius is 0px.

## Follow-ups and limits

- Existing failing tests concern Liquid test harness support for Shopify `content_for`, color-scheme source assertions and an old footer instance assumption. They are not newly introduced by this change; the full suite is not green.
- Theme Check still flags existing scoped CSS/complexity and schemas with more than its recommended 40 settings. New overlay/composition controls add advisory setting-count warnings; schema JSON is valid and Theme Check reports no errors.
- This review samples saved desktop/mobile storefront behavior and uses prior Wofyn Theme Editor checks documented in section receipts. It does not claim exhaustive testing of every setting, editor event, reduced-motion mode or viewport.
- Catalog content and uploaded images are Shopify data. Their receipts and bindings are committed; Git does not itself export the store database. The theme remains a draft.
