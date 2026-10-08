# Gallery Marquee cleanup — 2026-10-08

Peeko-template. Shared Marquee owns looping and scroll response; Gallery owns viewport/card sizing; Gallery image owns media and social overlay. No new runtime, controls or separate parallax implementation.

The existing Marquee scroll handler was gated by `.text-marquee-custom`, excluding Gallery placements. Removed the section gate: every non-static shared Marquee now gets the same scroll-phase adjustment. Existing reduced-motion handling, viewport checks, RAF throttling and section load/unload cleanup are retained. Other active Marquee placements also receive this shared behavior.

Removed Gallery image's four custom crop sliders (`image_zoom`, `image_scale_y`, `image_position_x`, `image_position_y`), their CSS variables, anisotropic scale and object-position overrides. Removed the one saved custom crop (143% zoom, 96.5% vertical scale, position 52/65) from Peeko index. Image picker, mobile source, alt text, square cover layout, corner radius, theme hover zoom, link and social overlay remain. The affected image now uses its ordinary source crop without distortion; no replacement image or CSS workaround was added.

Validation: three executable tests pass for Gallery scroll/reverse phase change, static/reduced-motion behavior, repeated section load and unload cleanup. JavaScript syntax and git diff --check pass. Full Theme Check: 0 errors, 49 existing warnings. Development preview192069828907 confirms Gallery ready/moving, contained width1824 at1920 viewport, and image transform none. Full Theme Editor interaction matrix is NOT TESTED; schema removal and saved-data migration are verified. Existing watcher remains on9292. No commit, push or publish.
