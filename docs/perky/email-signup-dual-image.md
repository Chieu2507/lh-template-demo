# Perky email signup dual image

Design: https://www.figma.com/design/6HBP12lG9fUcHhgF3Gx057/Peekoo---Nhung?node-id=49063-1242&m=dev

## Section build contract

- Role/context: homepage newsletter, using Shopify's native customer form; no product context or new JavaScript.
- Placement: existing `email-signup-dual-image` section, homepage instance `email_signup_dual_image_LphGLH`, after the gallery. Existing section template eligibility is preserved.
- Ownership: section owns the three-column shell, crop positions, outer radius and responsive spacing. Image, Group, Header, Heading, Text and Email signup kernels own their editable content. Theme Settings supply Nunito, buttons and form tokens.
- Slots: static `image_left`, `content`, `image_right`, excluded from `block_order`. Content contains an editable image icon and Group with Header and Email signup. No new Theme Block files or section app slot; Group retains its existing generic composition contract.
- Desktop: three equal columns, 5:4 media, 60px icon, H2 role, 24px icon/content gap, 16px header gap, 20px header/form gap and 8px field/button gap. Content uses scheme 4 and its cream background. Form uses new scheme 7 for the pink shared primary button.
- Responsive: tablet reserves half the grid for content and caps horizontal padding; smaller desktop reduces content padding while respecting the saved maximum. Mobile stacks the same DOM tree and retains the selected image ratio. External padding scales to 75% on tablet and 50% on mobile unless a saved mobile override is enabled.
- Appearance: optional section radius and crop controls preserve square/center defaults for existing instances. Email signup adds Input style (default Inherit) and Corner radius (default Inherit), reusing the existing form classes and radius tokens. Specialized input/crop labels are literal English; shared radius labels use existing schema locale keys.
- Assets: exact Figma image and SVG exports imported into Shopify Files as `81daf.jpg`, `c55ed.png`, `9df02.svg`. Original downloads are retained in `output/perky-newsletter/`. Shopify optimized the left PNG to JPEG during URL import. No temporary Figma URLs are used by the implementation.

## Validation

- PASS: scoped upload to development theme `192069828907` on `layouthub-template-v2.myshopify.com`; no publishing or Git delivery.
- PASS: Theme Check exits 0 with no errors; `git diff --check`.
- PASS: desktop screenshot at 1920px matches the requested layout, asset slots, crop, cream surface and pink button. Heading is 34px; input has a 1px outline and pill radius. Input text follows the current global form typography.
- PASS: section geometry has no horizontal overflow at 390, 767, 768, 1149 and 1150px. At 1150px the input remains 178px wide; mobile image height follows 5:4 rather than leaving empty space below the source image.
- PASS: required email input rejects invalid email syntax; keyboard focus is visible. The form was not submitted to create a customer.
- PASS: fresh Theme Editor load recognizes all nested blocks and the new form appearance controls, with Save disabled for the persisted configuration.
- NOT TESTED: successful subscription/error response from Shopify, full add/duplicate/remove/reorder/save lifecycle, missing-image and long-content editor cases.
- Follow-up: Email signup now has 42 controls; Theme Check's advisory recommends staying at 40. Existing saved controls are preserved; broader form decomposition is outside this section build.
- Screenshots: `output/perky-newsletter/desktop.png`, `output/perky-newsletter/mobile.png`. No preview watcher was started or stopped by this task.

## Global form settings follow-up

- Theme Settings → Forms now exposes an optional alpha-enabled Background color. When unset, Solid retains its existing tinted background and Outline remains transparent. Perky saves white, Outline, 1px border, Pill radius and Small (14px) input typography. Desktop/mobile heights remain 48px/44px.
- Newsletter input style and corner radius now inherit Theme Settings; its local white background override was removed. Explicit saved corner choices on other instances are retained.
- Shared input/textarea font reset now uses zero specificity so the existing form typography token actually wins. Buttons retain their existing font reset.
- PASS: Contact input and textarea render white, 1px outline, pill radius and 14px text. Inputs measure 48px desktop and 44px at 390px; textarea retains the Contact block's 100px minimum height. Newsletter computes the same shared appearance at 48px desktop.
- PASS: fresh Theme Editor recognizes Background color, #FFFFFF, Pill, 1px outline and Small input typography, with Save disabled. Scoped development-theme upload succeeds and Theme Check reports zero errors (38 existing warnings).
- Proof: `output/perky-newsletter/global-inputs.png`. No form submissions were made.

## Input padding and textarea radius correction

- Forms now exposes Input horizontal padding (12–32px, default/saved 20px) and a separate Textarea corner radius (8/12/16/24/32px, default/saved 24px). Textareas no longer consume the single-line input pill radius.
- Shared inputs/selects and newsletter button-in-input wrappers use the horizontal padding token. Contact input padding follows the same token; textarea uses 20px on all sides. Removed duplicate Contact section overrides that forced 16px padding and zero bottom padding.
- PASS: Contact desktop and 390px mobile computed styles show 20px horizontal input padding, pill input radius, 20px textarea padding and 24px textarea radius. Theme Check reports zero errors; scoped uploads to development theme succeed.
- Screenshot: `output/perky-newsletter/form-rounded-textarea.png`. No form submissions or editor save lifecycle tests were performed for this correction.
