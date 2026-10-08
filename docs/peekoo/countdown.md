# Peekoo Countdown timer

Reference: Figma file 6HBP12lG9fUcHhgF3Gx057, node 49017:23054 (Countdown timer 04).

## Contract and implementation

The existing homepage `countdown_timer` entry remains type `hero`, named “Countdown timer”. It is a dynamic content section in `templates/index.json`, retaining its media controls, nested editable Groups, heading, text, live Countdown timer and button. Existing block IDs and child order are preserved. Theme typography, schemes, button and radius tokens remain the presentation owners; section owns media/overlay/height, Groups own content flow, timer block owns its unit layout.

The desktop design uses the original 1920 × 650 Figma photo, imported into layouthub-template-v2 Files as `22ada.png` (MediaImage 46466397765931). The section points to `shopify://shop_images/22ada.png`. It uses a centered radial blue overlay, transparent content surface, white display typography, the full Holiday Jellycat copy, a 516px timer, and the white pill Shop now button. The existing sale-perky collection destination and recurring 66h12m runtime behavior are preserved. Figma digits are an illustration rather than a fixed deadline.

Reusable extensions to the existing hero: optional overlay gradient and custom desktop/mobile height. Reusable timer extensions: desktop/mobile unit gaps, separator width and typography-token size. Defaults retain previous layouts. No replacement section type or brand-specific preset was introduced.

Desktop height is 650px; content width is 640px (Figma 644px, constrained to the existing editor range step). Heading and numbers consume Display (54px desktop, 46px tablet, 40px mobile). Desktop timer unit gap is 44px with 24px separators. Mobile uses existing Small height (480px); no mobile Figma frame was supplied.

## Validation

- Shopify development theme verified: 192069828907. Existing local theme-dev watcher retained.
- Theme Check: 0 errors, 48 warnings across the current shared worktree; countdown retains a LiquidComplexity warning. `git diff --check` passes.
- Live desktop: section 1920 × 650, heading 54px, correct `22ada.png` image loaded.
- Live tablet: section 768 × 650, heading 46px, section scrollWidth 768.
- Live mobile: section 375 × 480, heading/numbers 40px, section scrollWidth 375.
- Editor inspected: merchant name Countdown timer, Media image, overlay, custom height and editable blocks present. Existing unsaved-session Restore/Save state was left untouched.
- Live timer counts down using the existing runtime. No runtime JavaScript changed.

Save/reload and add/remove/duplicate lifecycle tests were not performed because the editor contained an existing unsaved session. Final screenshot capture and viewport reset were blocked when the Chrome extension requested an update; no screenshot is delivered as final proof. The last temporary test viewport was 1920 × 912.

Other tasks have changes in this shared worktree; this document describes only Countdown work. No commit or push performed for this rebuild.

## Block animation update

Enabled existing `slide-bottom` animation on the four leaf blocks: Heading 150ms, Text 300ms, Countdown timer 450ms, Button 600ms. Parent Groups remain unanimated so the shared controller does not suppress child entrances or double-transform them. Only template settings changed; canonical block schemas, shared reduced-motion handling and editor lifecycle are reused.

Validation: Theme Check 0 errors / 48 warnings; diff whitespace check passes. Live local preview renders all four animation attributes and ordered delays, and all four leaf blocks finish visible (`opacity: 1`, no `reveal-pending`). Reduced-motion and editor save/reload were not separately exercised in this update. Browser viewport override reset successfully. Screenshot API returned a different visible surface from the inspected tab, so that image is not used as proof.
