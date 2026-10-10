# Wofyn design system

Source: [Figma style guide](https://www.figma.com/design/G7y5fdxzoVS9pDqslTl1Pp/?node-id=43001-11865).
Target branch: `Wofyn-template`. Target draft theme: `192149684523` on `layouthub-template-v2.myshopify.com`.

## Ownership and implementation

Global typography, layout, buttons, badges and color schemes are owned by Theme Settings. Saved values live in `config/settings_data.json` and use the existing `config/settings_schema.json` → `snippets/css-variables.liquid` → shared CSS mapping. This phase changes saved values only; it adds no CSS, schema, component or runtime logic. Existing section compositions and resource bindings are retained for the subsequent homepage conversion.

## Typography

| Role | Desktop | Tablet | Mobile | Line height |
| --- | ---: | ---: | ---: | ---: |
| H1 | 62 | 46 | 40 | 1.2 |
| H2 | 38 | 32 | 30 | 1.2 |
| H3 | 30 | 26 | 26 | 1.3 |
| H4 | 24 | 22 | 22 | 1.4 |
| H5 | 18 | 18 | 18 | 1.5 |

Body remains 16px with the existing 12/14/18px utility roles and 1.5 leading. Headings retain authored capitalization and zero tracking. Accent is 14px, weight 500, 1.5 leading and 0.02em tracking.

Figma specifies Gabarito 600 for headings and Mulish for body/buttons/badges. Shopify's font picker returned no results for Gabarito or Mulish. The user explicitly chose to retain existing fonts rather than add font capability. All existing font-picker settings therefore remain unchanged; font fidelity and weights inherited from those font objects are an accepted difference.

## Colors and controls

- Scheme 1: white background, navy `#201D47` text.
- Scheme 2: `#F5F6FA` background, navy text.
- Scheme 3: navy background, white text.
- Scheme 4: `#FAF1EC` background, navy text.
- Light scheme border/bar: navy at 10%; component surface: navy at 5%. Dark border/bar: white at 50%. Overlay: black at 20%.
- Primary buttons: yellow `#FCC93D`, navy text, 1px matching border, pill radius, 14px label, weight 700.
- Secondary buttons: transparent, scheme text and border. Tertiary buttons: scheme text and existing underline behavior.
- Button desktop height/padding remain 48/32px; existing tablet/mobile dimensions are retained pending layout mapping.
- Sale: `#D82727`/white; sold out: `#ADADAD`/white; best seller: `#B1C8F9`/navy. Existing 12px badge size, 4/12px padding and pill radius are retained.
- Content max width: 1400px, using the existing responsive page-margin controls.

No hover states were supplied in the style-guide samples; hover colors use the same specified scheme colors rather than retaining Peeko's green/pink palette. Dark component surface (`Generated/500`) has no resolved value in the image-only color table, so its existing value is retained. The generic custom badge tone cannot independently express Custom 2's gray with the current settings contract; it remains unchanged. Only Wofyn schemes 1–4 remain in current settings and the saved preset. Legacy schemes 5–7 have been removed; the announcement bar now uses Wofyn scheme 3 (navy/white), matching the Figma top bar.

## Validation

Edited range/select values fit their existing schema. Theme Check returned zero errors (20 files with existing warnings); `git diff --check` passed. The targeted Wofyn preview at `http://127.0.0.1:9294` rendered heading sizes 62/38/30/24/18px at 1440px, 46/32/26/22/18px at 1024px and 40/30/26/22/18px at 425px. Rendered page width is 1400px, primary button background is `#FCC93D`, button label size is 14px and primary border is 1px. Theme Editor reload confirmed Scheme 1 navy text, yellow primary buttons and transparent secondary buttons with Save disabled (values already persisted). Font family remains Nunito. No new interaction or section lifecycle is introduced in this phase.
