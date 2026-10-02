# Stroken Questions & Answers

- Role: answer purchase/support questions after testimonials on index.
- Context: merchant-authored copy; no resource picker or app slot.
- Reuse: FAQ accordion section → Group/Heading and FAQ Accordion → Accordion row → Answer Text. No new block or controller.
- Layout: centered 768px content, 40px heading gap, 80px vertical padding; tablet padding 0.75x and mobile 0.5x. Theme typography H2/H5/body16.
- Slots: existing section allow-list Group/FAQ Accordion; nested accordion rows and answer text remain editable, removable, duplicable and reorderable. Empty rows omitted on storefront; editor offers its existing text placeholder.
- Runtime: shared native details accordion controller handles keyboard, reduced motion, section load/unload and nested block selection.
- Assets: original Figma plus/minus downloaded locally; masks inherit scheme foreground. No temporary asset URLs.
- Copy: first answer is exact Figma text. Questions 2–4 have editable sample support copy because their answers are absent from the supplied design.
- QA: JSON/schema, Theme Check delta, whitespace, development upload; desktop/mobile geometry, icons, open/close and editor block selection.

## Verification

- Development theme 191891243307: selective upload succeeded; live storefront renders four rows, first open. Theme Check: 0 errors / 35 unchanged pre-existing warnings; schemas parse and diff whitespace passes.
- Desktop: content width768, heading40 and question18. Mobile375: content343, padding40, question16, left-aligned rows; no horizontal page overflow. Tablet768: content708, padding60, no overflow.
- Native keyboard Enter and click toggle details and aria-expanded. Original plus/minus assets render at14px from local theme CDN; color inherits the scheme.
- Fresh Theme Editor: section width768 and padding80 controls present; selected second row exposes editable question and nested sample Answer Text. No editor changes saved over the uploaded config.
- Fixed existing nested answer rendering: capture content_for blocks before evaluating whether a row has content; Theme Block children cannot be tested via block.blocks. Scoped FAQ CSS prevents the image-FAQ section stylesheet from overriding responsive padding/alignment.
- NOT TESTED: exhaustive add/remove/duplicate/reorder/save lifecycle, reduced-motion and no-JS browser emulation, all long/translated/empty combinations. Existing shared controller retained without JavaScript edits.
- Screenshots: output/stroken-faq/desktop.png and mobile.png. No watcher started; existing preview untouched.
