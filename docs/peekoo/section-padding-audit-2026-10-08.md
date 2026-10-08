# Peeko section padding audit — 2026-10-08

The user's screenshot and correction are authoritative for this task:

- Group: Padding.
- Controls: Top, Bottom, Customize for mobile, Top (mobile), Bottom (mobile).
- Tablet inherits desktop values unchanged.
- Mobile inherits desktop when customization is off; otherwise uses the saved mobile values.
- Preserve existing setting IDs, saved values, and resource/composition behavior.

## Icon text cards correction

Restored `customize_mobile_padding`, `padding_top_mobile`, and `padding_bottom_mobile` in the section settings. Restored the homepage's previous mobile customization (56px top/bottom). Reused existing canonical locale keys for the group and labels. Removed 75% tablet and 50% mobile scaling. Retained the corrected Appearance background behavior and empty Custom CSS.

Storefront PASS: 767px = 56/56px, 768px = 80/80px, 1149px = 80/80px, 1150px = 80/80px. These are measured computed top/bottom paddings on the active homepage instance. Theme Check zero errors and git diff --check PASS. Theme Editor PASS: live controls show Padding → Top 80 / Bottom 80 / Customize for mobile enabled / Top (mobile) 56 / Bottom (mobile) 56. Editor composition lifecycle is unchanged and was not re-tested.

## Repository findings

Reviewed 82 Liquid section files; 69 expose section-level Top/Bottom padding. After the Icon text cards correction, 66 have the expected group, visible labels, mobile customization controls, and no automatic padding scaling in their section source. This is a source/schema audit, not a claim that all 66 were visually tested.

| Section | Finding | Peeko homepage |
| --- | --- | --- |
| Testimonials: Cards (`testimonials-cards.liquid`) | Group is Section padding; desktop controls are Top padding / Bottom padding; tablet scales to 75%; mobile fallback scales to 50% when customization is off. | Active (`perky_testimonials`) |
| Split banner (`split-banner-custom.liquid`) | Group and four labels differ; tablet scales to 75%; mobile fallback scales to 50%. Also exposes Pixel/Percent unit instead of a single px contract. | Active (`perky_tinker`) |
| Email signup dual image (`email-signup-dual-image.liquid`) | UI labels match, but tablet scales to 75%; mobile fallback scales to 50%. | Not an active section type in current local index |

These three sections were audited without modifying their source in this task.

## Homepage Custom CSS overrides

Five configured sections override section padding through Custom CSS, independently of the section settings:

| Section type / instance | Override |
| --- | --- |
| Collection thumbnails / `collection_list` | Tablet `.collection-thumbnails` padding-block: 64px. |
| Collection list / `perky_age_collections` | Tablet `.collection-list__spacing` padding-bottom: 64px. |
| Scrolling text / `scrolling_text` (`text-marquee-custom`) | Tablet `.text-marquee-custom` padding-block: 24px. |
| Collection tabs / `new_arrivals_tabs` | Tablet `.collection-tabs__spacing` padding: 64px 0. |
| Image cards / `peekoo_image_cards` | At widths <=1149px, `.image-cards-section` padding: 64px 0; at <=767px, padding: 56px 0. |

These overrides mean tablet does not inherit desktop unchanged on the affected instances. They remain findings; removing them changes saved merchant styling and was not included in the requested audit. Split banner's additional Custom CSS changes the inner Group padding; it is content padding, not section padding, and is tracked separately.

## Additional compatibility differences

Slider ranges are not identical: 52 sections use 0–100 / step 1; eight use 0–200 / step 2; two use 0–80 / step 4; three use 0–200 / step 4; one uses 0–120 / step 4; three use 0–160 / step 4. These should not be narrowed mechanically because existing saved values may become invalid.

Article preserves its existing `custom_mobile_padding` toggle ID, and Comparison table preserves `customize_mobile_spacing`; their merchant labels and conditional behavior match the screenshot. Horizontal padding, Boxed padding, content padding, carousel pagination spacing, and Cart drawer's desktop padding switch are distinct controls and were not conflated with section Top/Bottom padding.

Overall: Icon text cards correction PASS; repository audit has the three source findings and five homepage override findings above. Development preview remains running on 9292 as requested.


## Follow-up fixes completed

The user authorized fixing all section padding discrepancies from this audit.

- Testimonials: Cards and Split banner now use the canonical Padding / Top / Bottom / Customize for mobile / Top (mobile) / Bottom (mobile) labels.
- Removed tablet 75% scaling and mobile 50% fallback from Testimonials: Cards, Split banner, and Email signup dual image. Tablet uses desktop unchanged; mobile inherits desktop when customization is disabled.
- Split banner now uses px only. Removed its unused Pixel/Percent selector and the homepage's obsolete `padding_unit: pixel` value. No saved Percent instance was found in templates.
- The five homepage Custom CSS padding overrides had already been removed from the current working tree before this follow-up began; their empty custom_css values and settings were preserved. No replacement custom tablet padding was introduced.
- Source/schema audit PASS for all 69 sections exposing Top/Bottom padding: canonical visible labels/group and no inline automatic padding scaling. Existing IDs, defaults and slider ranges remain compatible; horizontal and content padding retain their separate role.
- Storefront PASS at 767/768/1149/1150px for Icon text cards, Testimonials: Cards, Split banner, Collection thumbnails, Collection list, Scrolling text, Collection tabs and Image cards. Computed tablet and desktop values match for every inspected section. Mobile follows saved settings, including Testimonials 80px with customization disabled.
- Email signup dual image is not active in the current homepage, so runtime QA for that section is NOT TESTED. Its Liquid/CSS and schema were validated.
- Full Theme Check zero errors; git diff --check PASS. No JavaScript changes or composition lifecycle changes. Preview watcher remains active on 9292 as requested.

These completed fixes supersede the earlier outstanding findings.
