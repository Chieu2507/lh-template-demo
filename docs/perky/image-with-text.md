# Perky image with text — reference audit and implementation

Reference inspected directly in Shopify Theme Editor on 2026-10-07: Elvara trial 191896977707, section template--28407446208811__custom_section_QDVicm, Countdown banner: Split (custom). Figma target remains 49038:25932.

## Observed reference contract

The section uses generic dynamic composition, not a fixed two-column grid or a Hero-owned image. Its root block tree is Image + Group; Group contains Heading, Text, Countdown timer and Button. Root Add block offers Basic, Cards, Custom, Footer, Forms, Layout, Links and Product categories. The Image and Group can be removed/reordered; the section does not own their content.

| Surface | Directly observed controls and current values | Implementation mapping |
| --- | --- | --- |
| Section | Width: Page / Full / Full (no padding); Height: Auto / Full screen / Custom; custom height in percent; top/bottom dividers | Width, viewport-relative height and native divider controls in section |
| Section layout | Boxed off; Direction Horizontal; Position Center; Alignment Left; Vertical on mobile on; mobile alignment; sticky off; gap 16/8px | Shared layout-flow-group-style + responsive flex, dynamic blocks; no fixed two-block limit |
| Boxed | Border thickness, shadow, separate scheme; padding 70px block/inline, 40/16px mobile | Existing boxed foundation, border/shadow and scheme controls |
| Background | None / Image / Video; section scheme | Existing media-background snippet, mobile sources, overlay and scheme |
| Section padding | Pixel / Percent; 50px top/bottom; custom mobile toggle | Unit and optional mobile override; canonical .75/.5 scaling when no explicit override |
| Image | Desktop Fill; square ratio; mobile Same as desktop; source pickers, link, first on mobile, radius Inherit, animation None, padding 0 | Reuse existing Image kernel; Figma-specific 7:6 ratio and Rounded chosen in template |
| Group | Vertical, Center alignment/position, Fill width/height, scheme appearance; radius Inherit; gap 12/12; padding 50/50/100/100; mobile 40/40/16/16 | Reuse existing Group; Figma-specific scheme 3, Rounded and 64px desktop / 40px block + 24px inline mobile padding |
| Heading | Heading 2, H2, animation None, padding 0 | Existing Heading kernel with same semantic/visual separation |
| Text | Body Medium, bottom padding 28px / 20px mobile | Existing Text kernel; target content and Figma spacing remain template-owned |
| Timer | Labels + background, recurring weekly, H2 numbers, custom number #B31C19 / white background, bottom padding 28px / 20px mobile | Existing Countdown timer can be added in Group; absent from Figma Tinker composition |
| Button | Primary, optional icon/link/new tab, width control, inherited height, animation None | Existing Button kernel and global button tokens |

All six experimental changes used to reveal conditional settings were undone; reference editor Save disabled afterwards. No reference settings were saved. Native AX/screenshot confirmed the reference content. A separate storefront tab redirected to the store password page, so no direct storefront DOM measurements are claimed.

## Final composition

Split banner (custom) retains its existing section type for saved-data compatibility but now uses the shared flexible composition kernel. It supports 50 dynamic root blocks and the same explicit 23-block allow-list as this repository’s generic Custom section. Supported project kernels are reused; unsupported Helix block types, app slots and unrelated leaf options are not recreated.

Perky Tinker: Image + Group at root; Group directly contains decorative Image, Heading, Text, Button. Image owns source/ratio/radius, Group owns background/padding/alignment/flow, section owns parent layout/gap/width/height/spacing. Target remains Nunito, scheme 3, photo first, center content, 28px desktop and 16px mobile gap. Exact Figma source assets remain Files references perky-tinker.jpg and perky-lightbulb.svg. The photo uses the existing 7:6 ratio preset on desktop and mobile with the Image kernel’s default cover fit. There is no section Custom CSS for Figma crop offsets or image stretching; approximate framing follows the shared ratio contract.

The Image kernel now emits a semantic width-mode class from its existing width setting. The parent uses Fill semantics to distribute horizontal space, while Fit and Custom retain kernel width ownership. A separate inherited distribution-gap variable prevents nested Group gaps from changing parent column widths.

## Schema grouping synchronization

Section controls now follow Layout → Gap → Divider → Boxed padding → Appearance → Section padding. Layout owns boxed mode, direction, alignment and sticky behavior; Divider contains only divider toggles. Appearance owns the scheme, background color, image/video sources, overlay and conditional boxed appearance. The redundant Background header was removed so Appearance has controls directly beneath it. Conditional boxed padding belongs before Appearance, leaving Section padding as the final group.

Existing shared translation keys are reused for equivalent labels. Section/boxed padding labels use scoped literal English because existing padding locale keys resolve to abbreviated or device-suffix copy; changing those shared keys would affect unrelated sections. All 36 setting IDs, types, defaults, options, ranges and visibility conditions are preserved.

## Validation and limits

- PASS: all range schemas <=101 selectable values; padding 0–200 step 2; defaults/saved values fit steps; setting IDs unique; explicit allow-list and dynamic block orders valid.
- PASS: local CSS fixture, using actual section/kernel styles, tested 375/767/768/1149/1150/1440px. No horizontal overflow; mobile stacks; 1440px has two 658px panels with 28px gap and matching 564px height. At narrow desktop/tablet widths long content may be taller than the ratio-based image, retaining natural content height. Both source assets loaded. The fixture is a layout check, not Shopify Liquid/editor integration proof.
- PASS: reference controls and conditional schema audit; no new script or animation.
- PASS: final Theme Check 0 errors / 36 warnings across the current workspace; git diff --check.
- NOT TESTED: upload acceptance and target Theme Editor add/remove/duplicate/reorder/save/reload, exact live typography/geometry, keyboard/reduced-motion behavior and app integration. No Git commit/push or theme publish performed.

Reference-only labels without existing locale equivalents are literal English. Existing canonical translation keys and global typography/button/radius contracts are retained. Concurrent countdown/testimonial changes were preserved.
