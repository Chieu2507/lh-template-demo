# Wofyn Rich text

## Section Build Plan
- Branch Wofyn-template; role content; placement index after peekoo_icon_text, before categories.
- Reuse rich-text + editorial-text. Static Eyebrow/Heading/Text are disabled and absent from block_order; only Editorial text remains visible/editable.
- Theme Settings owns H2/Nunito/scheme1. Section owns centered flow, page width and responsive padding. Editorial text owns copy and max width.
- Figma desktop47155:13171, mobile47557:5982. Copy is static, no assets/resources. Scroll reveal off: screenshot has uniformly opaque text.
- Layout: center; H2 (xl); text custom900px, mobile fill; padding100/56 desktop,80/56 mobile.
- Gaps: Figma top112px exceeds section slider100px; max width896px unavailable with20px step (use900). Keep existing fonts per user; wrapping may differ. No Custom CSS/schema changes.
- QA: JSON/schema, preview desktop/tablet/mobile, Theme Editor selection/reload, Theme Check and diff check.

## QA
- PASS preview1920/768/375: font38/32/30px, lineheight1.2, centered, width900/708/343px. Section desktop292.78px/mobile388px; mobile7lines with Nunito instead of Figma6.
- PASS mobile no horizontal page overflow; reveal off.
- PASS Theme Editor block selection: Editorial text, Extra large, max width900, scroll reveal off; static siblings hidden. Did not reload user's editor with existing unsaved changes.
- PASS Theme Check0errors/36existing warnings; diff check. Watcher targeted Wofyn uploaded index.
- NOT TESTED destructive/editor mutation paths (duplicate/reorder/remove) for this JSON-only instance addition; no kernel/schema/runtime edits.
- Proof /private/tmp/wofyn-rich-text-desktop.jpg and /private/tmp/wofyn-rich-text-mobile.jpg.

## Scroll reveal update
Enabled enable_scroll_reveal with medium speed and 30% initial opacity after user reported missing animation. Preview confirmed first letters at opacity 1 and trailing letters at 0.3, then all letters at 1 after scrolling. Selected blocks in Theme Editor intentionally show full text. Proof: /private/tmp/wofyn-editorial-reveal.jpg.
