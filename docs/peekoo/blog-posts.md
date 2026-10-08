# Peekoo Blog posts

Source: Figma 6HBP12lG9fUcHhgF3Gx057, node 49026:24664 (desktop).

Contract: homepage content section after Countdown and before Gallery. Reuse blog-posts → static Header, hidden View all, static Blog list → static Blog card → Meta, Group (Title + Description), Read more. Blog list supplies article data from the existing perky blog; no article/resource edits or Figma image uploads. Header/leaf blocks consume global typography, card owns square media/radius and content padding, list owns columns/gaps, section owns alignment/spacing. Existing runtime handles links and editor lifecycle; no new CSS, schema, Liquid or JavaScript.

Mapping:
- Heading: centered Header, max-width 570px, Heading XL/H2 (global desktop 34px).
- Content: Grid, max 3 posts, desktop 3 columns, 32px gap.
- Card: square images, radius16, 24px top content padding, left alignment; Title MD/H3 (20px desktop), Description MD (16px), copy gap6, Read more tertiary with 12px content gap.
- Date: existing Meta date only, long format, no icon/author/comments, 14px. User accepted placement below image instead of the Figma white pill on the image.
- View all: hidden through saved static block disabled state.
- Responsive: no mobile/tablet frame supplied; use existing mobile one-column grid and native responsive typography. Gap32 and section padding80 inherit configured desktop values. No tablet overrides.

Known limits: content area follows current Theme Settings (1500px max width with 48px page margins = 1404px at a wide viewport; Figma specifies 1400px). Header follows its existing max-width control. Images, dates, titles and descriptions are live article data and may differ from Figma samples. Global tokens/settings remain unchanged.

Validation:
- PASS: template JSON/schema validation for the new section and 10 blocks, including ranges, select values, static IDs, nesting, block order and saved disabled states.
- PASS: Liquid render checks with article fixtures: exactly three cards, 3-column grid/32px gap, no carousel controls, article title/link/description, long date format, no author/comments/date icon.
- PASS: Shopify Theme Check — 0 errors, 48 warnings; git diff --check.
- PASS: no CSS, Liquid, JavaScript or Theme Settings changed for this build; no custom_css added.
- NOT TESTED: live article data, storefront visual comparison and Theme Editor add/remove/duplicate/save/reload. No Shopify upload or publication performed.

The date placement deviation is user-accepted. Responsive behavior follows existing base settings; no supplied mobile/tablet reference was inferred.


## Authorized Blog Meta extension

The later user request supersedes the earlier date-placement choice and radius16 configuration. Blog Meta now exposes Display (In content / Badge on image), defaulting to In content for saved instances, with a badge-only Color scheme control. Peekoo selects Badge on image and scheme1; Blog card Corner radius is Square per the latest instruction.

The component renders each enabled detail once, preserves date/author/comment order and editor attributes, and omits separators in badge mode. Direct Meta children in stacked Blog cards overlay at the image's top start corner; nested Meta and horizontal cards keep pill presentation in flow, as explained in editor help. CSS belongs to the reusable Blog Meta/Blog Card implementation, with no template Custom CSS, JavaScript relocation or duplicate content. Date formatting, size and visibility remain controlled by existing settings.

Validation: 4 Meta Liquid render tests PASS (saved content, badge scheme/order/live data, invalid-value fallback, hidden/placeholder states). Existing three-card blog render and JSON/schema checks PASS. Theme Check: 0 errors, 48 warnings. git diff --check PASS. Live overlay geometry and Theme Editor lifecycle NOT TESTED; no Shopify upload or publication.
