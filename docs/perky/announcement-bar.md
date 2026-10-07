# Perky announcement bar

Figma: file `6HBP12lG9fUcHhgF3Gx057`, node `49080:1518`.

Reuses `sections/announcement-bar.liquid`, the announcement-text block, the existing slider controller and header-group section instance. Eligibility remains header-only, maximum four announcements, with the original three allowed block types. No new blocks, listeners or theme schemes.

The saved header instance uses scheme 5 (#9DC1A7), heading text #181818, Nunito 700 H5 tokens (16px/24px), capitalization, 10px top/bottom padding and 64px desktop control spacing. Content is `🌟 Limited Time Offer: Enjoy 20% Off Orders!`. Two original Figma chevron SVGs are saved locally with their 16×16 root dimensions preserved. Rounded chevrons remain selectable separately from the existing icon options.

Heading text style follows global H5 size/line-height/case and the editable section weight; the body-size picker is hidden in heading mode. Navigation is hidden with fewer than two announcements. With two or more, both controls are enabled and previous wraps from the first announcement to the last; next retains the existing forward loop. Tablet/mobile spacing contracts to 24px and text may wrap.

## Scoped validation

- PASS: Theme Check, 0 errors and 36 inherited warnings; git diff --check.

- PASS: header instance values match the section schema, block references and translation keys.
- PASS: actual desktop rendering at 1920px: 44px bar, 1400px inner container, 64px gap, Nunito 700 16px/24px, #181818 text and #9DC1A7 surface.
- PASS: both original SVG assets load and render at 16×16 in their correct left/right slots.
- PASS: 375px mobile screenshot wraps into two centered lines without announcement overflow. Viewport override reset after QA.
- PASS: single-announcement arrows remain hidden and disabled; storefront reload retains saved settings.
- PASS: temporary two-item storefront fixture displays enabled controls; Previous moves from first to last and Next returns to first. The fixture was removed and original content restored.
- NOT TESTED: Theme Editor add/remove/duplicate/reorder and save round-trip, other content block types and custom image backgrounds. The existing JavaScript lifecycle is unchanged; the previous-index calculation now wraps.
- The local development theme remains 192069828907 and the user-requested preview watcher remains running. This implementation is uncommitted.
