# Peekoo scrolling text

Figma: `6HBP12lG9fUcHhgF3Gx057`; desktop `49068:15698`, tablet `49234:4680`, mobile `49234:5715`.

## Composition contract

- Role: editable content; placement: `templates/index.json`, immediately after slideshow.
- Context: merchant-authored text, no resource dependency.
- Ownership: section owns scheme and outer padding; marquee owns motion and track gap; marquee-item owns side padding; Heading reads global H3 typography.
- Slots: existing `text-marquee-custom` → `marquee` → six `marquee-item` blocks → Heading. Emoji are literal text; no icon assets.
- Output: existing section shell and marquee region; Heading uses `div` semantics.
- Runtime: existing marquee kernel handles seamless clones, font loading, resize, editor load/unload, hover/focus pause and reduced motion. No runtime changes.
- Responsive: full bleed; padding 28/24/20px, track gap 16/12/10px, item side padding 16px; H3 26/26/22px. Tablet spacing uses section-scoped Custom CSS.

## Content and appearance

Cream scheme 4 (`#FFFAED`), dark heading (`#181818`), Nunito 700. Right-to-left, speed 1 (28 seconds per sequence).

Sequence: Enjoy saving 20% ☀️ → Imagination begins with play 🧩 → Enjoy saving 20% ☀️ → Imagination begins with play 🧩 → Enjoy saving up to 15% ⭐️ → Imagination begins with play 🧩.

## Verification

Scoped upload to unpublished Peeko theme `192108396843` succeeded. Live widths 1920/768/375px render section heights 89.8/81.8/68.6px; gaps and font sizes match the contract. Read transform at two separate times to confirm motion. No `img` or `svg` in this section; mobile has no horizontal page overflow. Theme Check: 0 errors. `git diff --check` passes. Existing blocks and schemas are reused; no new editor/runtime implementation.
