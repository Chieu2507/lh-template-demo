# Wofyn Flash Sale

Section Build Plan: content section in index.json, replacing countdown_timer in its existing position. Source composition is origin/Perky-template perky_tinker (Image with text — Tinker), using Wofyn's existing split-banner-custom kernel and responsive padding contract. No source kernel replacement or new styling controls.

Ownership: section owns page width, horizontal/stacked layout, gap20, padding96 desktop/64 mobile; Image owns crop/radius; scheme4 Group owns pattern, padding64 desktop/40 vertical and32 horizontal mobile, center alignment and gap40/36; nested header Group owns heading + description gap16; countdown-timer owns the existing recurring duration66h12m; Button owns editable sale link.

Figma: desktop47155:13207, mobile47557:6013, fileG7y5fdxzoVS9pDqslTl1Pp. Keep current Nunito fonts per user instruction. Assets uploaded to Shopify Files: wofyn-flash-sale.jpg (optimized1600px), wofyn-flash-sale-pattern.png. Image ratio7:6 desktop,6:7 mobile; radius16.

Slots: Image + Group; Group contains Header Group (Heading, Text), Countdown timer, Button. Existing @theme blocks, editor attributes and countdown lifecycle are reused. Runtime: existing countdown-timer custom element. QA: scoped JSON diff, schema values, Theme Check, desktop/mobile geometry, loaded images and changing seconds.

Known base gap: separated countdown uses fixed spacing, uppercase labels and padded cells rather than Figma's96px/56px units with title-case labels. No styling capability extension is part of this conversion.

Validation: Theme Check0errors/36existing warnings; block settings/select enums valid; diff check passes. Only countdown_timer instance changed; all other section data and order compare equal. Preview1280px loads both Files images, timer seconds decrease; mobile375px image343×400.16, countdown276px inside279px content, page scrollWidth375. Desktop proof /private/tmp/wofyn-countdown-desktop.jpg. Existing editor tab has unsaved user edits, so opened a fresh editor tab without reloading/saving/discarding the old session. No Git commit/push.
