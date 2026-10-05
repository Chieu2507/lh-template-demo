# Scrolling text — Strideo

- Role/placement: homepage brand marquee; reuse existing scrolling_text instance and text-marquee-custom section. Preserve all other sections and their order. Figma puts the strip after Image with text; that neighboring section is outside this task.
- Figma desktop49053:7070, container49053:7071, Power49053:7073, Performance49285:16856; tablet49384:13097/13100; mobile49390:14206/container14207/wrapper14208. Inspect confirms full-bleed scheme5, background#1A1A1A, Power#F2FF4F, Performance#FDFFE5, no outline or icon separator. H3 Instrument Sans600/130%, desktop32/tablet30/mobile28. Parent padding24px desktop/tablet,20px mobile; item inline padding24px and marquee gap12px on all devices.
- Ownership: global heading H3/Instrument Sans responsive tokens; section scheme and outer spacing; Marquee owns motion/direction/speed/gap; Item owns horizontal wrapper/padding; Heading owns editable copy and optional Performance color override.
- Slots: dynamic Marquee > Item > Heading, no static blocks, no new custom controls. Two real items repeat via existing accessible clone controller rather than duplicated merchant content.
- Runtime: existing blocks/marquee.liquid owns seamless-loop width measurement, resize/editor load/unload, hover/focus pause, reduced-motion fallback. No new JS or assets required.
- QA: Theme Check and whitespace; scoped template migration preserves current remote settings elsewhere; live desktop/tablet/mobile measurements, coverage during animation, right-to-left movement, Editor block selection/add/remove affordances. Do not claim OS-reduced-motion runtime unless exercised.

## Validation

- PASS: uploaded only homepage index.json to Strideo draft191953273131. Pulled latest remote template before editing; other sections/order matched local and remain unchanged.
- PASS: live desktop1920 height89.59px/H3 32px line41.6, tablet768 height87px/H3 30px, mobile375 height76.39px/H3 28px. Measured section padding24/24/20, item inline padding24, gap12, exact background and both text colors; no page horizontal overflow. Viewport override reset.
- PASS: existing marquee ready state,10 accessible hidden clones on desktop, running marquee-scroll-left, negative transform and repeated track covering the viewport.
- PASS: Editor has dynamic Marquee with two dynamic Items, Add/Remove/Reorder affordances, Backward direction/speed1/gap12; selected Marquee highlights the actual strip. Screenshot output/strideo/scrolling-text-editor.png. No Editor settings changed or saved.
- PASS: Theme Check0 errors/35 pre-existing warnings and git diff whitespace check. No new runtime, block schema, images or global token changes.
- NOT EXERCISED: OS reduced-motion runtime, hover/focus pause, block add/remove/save/reload cycle. Existing controller retains these contracts.
