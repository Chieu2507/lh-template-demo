# Testimonials: Cards — Grid and Carousel

Build contract: JSON index content section; static editable Header and up to four dynamic review cards. The section owns responsive columns, card height, spacing, appearance and pagination. Review content remains owned by the existing private card and shared Heading/Text/Image/Rating/Group blocks.

`layout_type` supports Grid and Carousel, defaulting to Carousel for existing saved instances. Both modes use the shared `swiper-carousel` snippet and one card DOM. Grid reads shared grid CSS variables at 767.98/768/1149.98/1150px boundaries and does not mount the carousel controller. Carousel retains the existing controller and Theme Editor lifecycle. No template data migration is required.

Schema groups: Layout, Cards, Gap, Carousel, Appearance, Section padding. Existing setting IDs and values remain compatible. Desktop/Tablet/Mobile columns use canonical locale keys, matching Product list. Pagination controls are visible only for Carousel; pagination spacing additionally requires Show pagination.

Validation:
- PASS: five Liquid render tests covering Grid, Carousel, legacy missing layout, invalid layout fallback, pagination disabled, responsive columns and gap overrides.
- PASS: Theme Check, zero errors (`/private/tmp/testimonials-cards-check.json`).
- PASS: schema IDs, locale references, `git diff --check`.
- NOT TESTED: draft upload, Theme Editor add/duplicate/reorder/save/reload and live desktop/mobile layout. Automatic approval review rejected the upload attempt because workspace credits were exhausted; the command was not executed.

Changed section: `sections/testimonials-cards.liquid`. Tests: `tests/testimonials-cards-layout.test.cjs`.
