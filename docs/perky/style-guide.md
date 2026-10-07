# Perky style guide mapping

Source: Figma file `6HBP12lG9fUcHhgF3Gx057`, page `43001:11865`, inspected 2026-10-07 through Figma design context and the Variables table.

## Typography

Nunito 700 headings; Nunito 400 body; Instrument Sans 600 badges. Heading and button text use capitalize, with zero letter spacing. Body line height is 150%.

| Role | Desktop | Tablet | Mobile | Line height |
| --- | --- | --- | --- | --- |
| H1 | 54px | 46px | 40px | 120% |
| H2 | 34px | 32px | 30px | 120% |
| H3 | 26px | 26px | 22px | 130% |
| H4 | 20px | 18px | 18px | 140% |
| H5 | 16px | 16px | 16px | 150% |

Body uses existing 12/14/16/18px scales. H6 is absent from the guide, so its existing values remain. Accent uses Nunito 500 through the existing accent role. The reference table's Body/p3 lists 14px, weight 500 and 1px tracking, whereas the body samples use regular 18px; body samples are authoritative for body roles. Existing eyebrow tracking remains unchanged.

## Colors

Saved scheme IDs remain stable for inherited section references.

| Token | Scheme 1 | Scheme 2 | Scheme 3 | Scheme 4 | Scheme 5 |
| --- | --- | --- | --- | --- | --- |
| Background | #FFFFFF | #F8FAFA | #AE5830 | #FFFAED | #9DC1A7 |
| Heading | #181818 | #181818 | #FFFFFF | #181818 | #181818 |
| Text | #626262 | #626262 | #FFFFFF | #626262 | #626262 |
| Border | #E6E6E6 | #CCCCCC | #CCCCCC | #CCCCCC | #CCCCCC |
| Primary background | #5F8265 | #5F8265 | #FFFFFF | #1F1F1F | #1F1F1F |
| Primary label | #FFFFFF | #FFFFFF | #1C1C1C | #FFFFFF | #FFFFFF |
| Primary outline | #1E1E1E | #1E1E1E | #FFFFFF | #1E1E1E | #1E1E1E |
| Secondary background | #ECECEC | #E6E6E6 | #343434 | #FD8285 | #FD8285 |
| Secondary label | #1E1E1E | #1E1E1E | #FFFFFF | #FFFFFF | #FFFFFF |
| Secondary outline | #ECECEC | #E6E6E6 | #181818 | #D8D8D8 | #D8D8D8 |
| Tertiary label | #1E1E1E | #1E1E1E | #FFFFFF | #1E1E1E | #1E1E1E |
| Background bar | #E6E6E6 | #CCCCCC | #666666 | #CCCCCC | #CCCCCC |
| Component background | #F2F2F2 | #E6E6E6 | #808080 | #E6E6E6 | #E6E6E6 |

Variant overlay: scheme 1 #5A5A5A at 50%; scheme 3 white at 50%; others #212121 at 50%. Heading highlight and accent reuse heading color because no separate tokens exist in this guide. Hover is unspecified in Figma. Per the user's follow-up, filled buttons retain a solid surface on hover; colors are designed locally as recorded below. Shadow values remain unchanged; the Shadows frame is hidden.

## Button hover

Applied to current settings and the Perky preset using the existing scheme controls and shared button CSS. Primary retains its borderless shape; secondary hover borders match the hover fill. Existing motion, underline, focus and reduced-motion behavior remain intact.

| Token | Scheme 1 | Scheme 2 | Scheme 3 | Scheme 4 | Scheme 5 |
| --- | --- | --- | --- | --- | --- |
| Primary hover background | #48674D | #48674D | #ECECEC | #3D3D3D | #3D3D3D |
| Primary hover label | #FFFFFF | #FFFFFF | #1C1C1C | #FFFFFF | #FFFFFF |
| Secondary hover background | #DCDCDC | #D2D2D2 | #1F1F1F | #AC3F47 | #AC3F47 |
| Secondary hover label | #1E1E1E | #1E1E1E | #FFFFFF | #FFFFFF | #FFFFFF |
| Tertiary hover label | #2F4D35 | #2F4D35 | #FFFFFF | #2F4D35 | #2F4D35 |

## Layout and controls

- Page width 1400px; full-width margins 48/30/16px from 1920−1824, 768−708, and 375−343.
- Button height 48px desktop/tablet, 44px mobile; horizontal padding 32/28/24px; Nunito 700, 16px, pill radius.
- Primary buttons have no border in the rendered guide; secondary buttons have a 1px border. Keep tertiary underline enabled.
- Form height follows the same 48/44px existing contract. Form radius has several modes without a selected form example; preserve the existing radius choice.
- Badges use 12px Instrument Sans 600, zero tracking, 4px vertical and 12px horizontal padding, and pill radius as rendered (the ancestor's Square mode is overridden).
- Sale price/background #D82727; sold-out background #ADADAD; labels white.
- Map Custom badge 1/2 colors #4EACA3/#6F6F6F to the existing collection badge color slots, without adding new badge rules or changing resource assignments.

## Implementation coverage

`config/settings_data.json` current values and renamed Perky preset → existing schema → `snippets/css-variables.liquid` → shared typography, button, form, scheme and badge CSS in `assets/critical.css`.

Heading ranges now accept 54/34/26/16px desktop values while preserving previously supported values. Button text-case controls reuse the existing capitalize translation and now map capitalize in Liquid. Two additional controls extend the shared schema: `button_padding_inline_tablet` maps into the existing button padding token inside the tablet media query, with desktop fallback when unset; `badge_font` loads the selected Shopify font with display swap and supplies badge family/weight. Existing IDs and section composition remain intact.


## Initial style-guide validation (before local preview setup)

- PASS: settings/preset values satisfy schema range/step and select constraints; new translation references resolve.
- PASS: Liquid rendering verifies 54/46/40px H1, tablet button padding, mobile button height, all button text cases, badge family/weight/font-face output and legacy fallback. Font objects are mocked for local rendering; Shopify font delivery is not verified.
- PASS: existing `tests/theme-settings.test.cjs` (5 tests).
- PASS: `git diff --check`.
- PASS: Shopify Theme Check, 0 errors and 36 warnings. The warnings concern inherited theme files and the existing complexity warning in css-variables.liquid; no warning-free claim is made.
- NOT TESTED: remote theme upload, Shopify Theme Editor save/reload, actual font delivery, live storefront desktop/mobile visual comparison, and contrast verification. CLI reports no development theme configured for this checkout. The selected Perky remote theme has not been edited or uploaded in this task.
- No preview watcher was started; no commit or push was performed.

## Hover validation

- PASS: current and Perky preset constraints and Liquid token rendering.
- PASS: hover label contrast for primary, secondary and tertiary in all five schemes; minimum 4.75:1 against configured solid fills/section backgrounds. Custom section backgrounds require their own visual check.
- PASS: existing local development watcher synced settings to theme 192069828907; storefront computed hover tokens resolve to #ECECEC / #1C1C1C on scheme 3 primary buttons.
- PASS: Theme Check, 0 errors and 36 existing warnings; git diff --check.
- NOT TESTED: direct pointer hover interaction across every scheme, Theme Editor save round-trip and custom background combinations. No layout, schema, focus or motion rules were changed.
- The user-requested local preview watcher remains running.
