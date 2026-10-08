# Peeko mobile UI follow-up — 2026-10-08

Changes:

- Featured collection 07 Product list: Mobile columns = 1; Show next slide preview on mobile = true.
- Shared Buy buttons CSS: one purchase-grid column below 768 px. Quantity, Add to cart and accelerated checkout occupy separate rows. Desktop retains its existing allocation.
- Existing mobile View all hiding on Trending and Collection list remains enabled.

Audit:

- Checked layout geometry of all 15 enabled homepage sections and responsive content overflow, with visual samples covering Collection tabs, Trending, image/text, benefit cards, logos, Buy buttons, Countdown, Blog and Gallery.
- At 375 px Trending now measures 1044 px against the recorded 1049 px Figma reference; the former two-column setting reduced it to approximately 685 px. Its 343 px carousel has 283.8 px slides and a 12 px gap, showing the next slide.
- No page overflow or overflowing heading/text/button/input detected at 320, 375 or 390 px. Carousel and marquee tracks intentionally extend inside their viewports.
- Buy buttons: Quantity and action bounding boxes occupy separate rows with 16 px gaps at all three mobile widths. Add to cart / accelerated checkout widths are 248 / 303 / 318 px respectively.
- Desktop 1920 px: quantity 170 px, Add to cart 444 px, Product list columns remain 4.
- Increase/decrease interaction verified and Quantity restored to 1; no cart/checkout submission.
- 18 related tests passed. Theme Check: zero errors, 49 existing warnings. git diff --check passed.

The existing reference-content differences documented in spacing-design-audit-2026-10-08.md still apply (including logo descriptions, footer composition and resource product text). This audit confirms responsive layout behavior; it does not claim complete pixel equivalence of different content or a full Theme Editor lifecycle run.

No commit, push, or publish performed for this follow-up. Existing Peeko preview watcher retained.
