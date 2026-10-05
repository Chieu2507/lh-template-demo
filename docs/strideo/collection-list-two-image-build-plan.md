# Collection list: Two image — section contract

- Role/placement: collection navigation story on homepage; replace the existing collections_image_list instance in place, retaining configured items, image references and Header. Collections with tabs is restored byte-for-byte to HEAD.
- Ownership: global page width/margins, heading roles and scheme; dedicated section owns paired desktop grid, tablet rows, mobile carousel, gaps and padding. Dedicated Collection item owns collection, title, primary/secondary images. Header composes editable eyebrow. No Layout selector or Collection image settings group inherited from tabs.
- Slots: static Header (existing look-header ID for migration), up to eight dynamic two-image items. Attributes occur exactly once on each title. Images are decorative siblings. One item DOM tree across devices.
- Runtime: dedicated module/state/listeners, shared Swiper mobile factory; hover/focus switches desktop image pair, editor title selection activates corresponding item. Section load/unload, block selection and breakpoint cleanup remain isolated from tabs.
- Responsive: bounded title track and absolute paired media anchored to explicit outer grid columns, with a minimum-height media reserve; tablet64px thumbnails and wrapping title; mobile compact252px cap with16px image/title gap. Keep approved Figma values in template and compatible defaults in new preset.
- QA: migrated data intact, original tabs have no Git diff, Theme Check, syntax/whitespace, schema/preset/editor selection, desktop/tablet/mobile boundaries and no overflow. Preserve unsaved Editor session; no content images in assets.

## Validation

- Uploaded to draft Strideo theme 191953273131; restored all three original tabs files remotely.
- Theme Check: zero errors; 35 existing warnings. JS syntax and Git whitespace checks pass.
- Live responsive checks: 320/375px mobile carousel, 768/1149px tablet rows, 1150/1920px desktop pair; no horizontal page overflow. Height is 495.39px mobile and approximately 709px tablet/desktop.
- Fixed desktop grid-track expansion caused by normal-flow images spanning all rows. Explicit outer-column positioning and reserved minimum height keep images from stretching the first title row.
- Live Editor: independent section/schema loaded; Primary and Secondary image pickers visible; selecting Cloudmonster outlines only its title and activates its desktop pair. Selecting Cloudtilt in mobile preview brings its card into view. Save remained disabled (no Editor content changes).
- Lifecycle hooks implemented; add/remove/reorder and repeated section reload scenarios were not manually exercised in Editor. Images remain placeholders as requested.
