# Aike style guide

Branch: `Aike-template`. Figma: `9770x6Fo149ZeyWbvWwjk2`, style guide `43001:11865`, typography table `47636:30988`, page design `47608:22543`. Inspected 2026-10-15.

Preview: unpublished theme `192377422123` (Aike template (Chieutt)) on `layouthub-template-v2.myshopify.com`, local port 9295. Kyvex is live and was not edited. Preview watcher uploads local changes; two-way Theme Editor sync is disabled after it restored stale settings during initial setup. Keep this watcher running for continued Aike work.

## Typography

Instrument Sans 700 headings, 400 body, 600 accent/buttons, 500 badges. Headings preserve original case, zero tracking. Body uses existing 12/14/16/18px roles with 150% line height. The table's Body/p3 says 16px/600 while the rendered Body/18 sample is 18px/400; retain the existing regular body roles and semibold accent role rather than redefining Body/18.

| Role | Desktop | Tablet | Mobile | Line height |
| --- | --- | --- | --- | --- |
| H1 | 64 | 46 | 40 | 120% |
| H2 | 40 | 32 | 30 | 120% |
| H3 | 32 | 26 | 22 | 130% |
| H4 | 24 | 20 | 20 | 140% |
| H5 | 18 | 16 | 16 | 150% |

H6 is not specified; inherited sizes remain.

## Schemes and controls

Stable scheme IDs 1–4 use backgrounds #FFFFFF, #F5F5F5, #638D77, #28313D. Light heading/text: #1A1A1A/#4D4D4D; dark heading/text: white. Generated/100 = #E6E6E6 and Generated/500 = #808080 were confirmed by variables on the page design; component light surface #F2F2F2. Table defines dark borders as white/20%, bars white/50%, and overlay #1A1A1A/20%.

Primary buttons are #1A1A1A/white on light schemes, white/#1A1A1A on dark schemes. Secondary uses #EDEDED/#1A1A1A on light schemes, transparent/white with white outline on dark schemes. Tertiary follows heading ink and uses the shared underline. Buttons use the existing pill shape, 16px/600, 48px desktop/tablet height, 44px mobile, horizontal padding 32/32/24px. Mobile dimensions retain the existing responsive contract where the guide provides no dedicated mobile button example. Hover colors equal base colors because no hover state is supplied.

Badges: pill, 12px/500, 2px vertical/10px horizontal padding, 0.6px tracking (0.05em). Added one supported spacing option through settings_schema → css-variables → shared badge CSS. Sale #C62E1A, sold out #ADADAD, new #149621, custom #6F6F6F, labels white. Existing badge rules/resource assignments remain.

Current settings and renamed Aike preset share the style values. Shared typography, button and badge components are reused. No Custom CSS or page layout/assets were added. Logo, content, sections and local overrides still inherit Kyvex and need the later Aike page implementation.

## Validation

- PASS: upload accepted by the isolated unpublished theme; editor reload shows Instrument Sans Bold/Regular/Semi Bold and 64/46/40px display controls, Save disabled.
- PASS: storefront computed heading family/weight Instrument Sans/700, button Instrument Sans/600 and pill radius; badge tracking 0.05em.
- PASS: typography tokens at 1920/1150, 1149/768 and 767/375px match all five rows above. Browser viewport override reset afterward.
- PASS: existing theme-settings tests, 5/5; saved select/range validation; git diff --check. Theme Check: zero errors, 96 repository warnings.
- FOLLOW-UP: inherited homepage has horizontal overflow at 768/1149/1150px during responsive checks. No overflow at 375/767/1920px. Full layout conversion is outside this style-guide step.
- NOT TESTED: complete Theme Editor setting-change/save round trip, every scheme's pointer hover, complete page visual parity, full lifecycle matrix. No JS, section structure, or block contracts changed.
- Toolkit validation helper unavailable: bundled @shopify/theme-check-common missing. Shopify CLI Theme Check and Shopify upload were used for validation.
