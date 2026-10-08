# Buy buttons mobile UI — 2026-10-08

Peeko-template. The user's latest layout requirement supersedes the earlier two-column mobile fix.

Mobile (below 768 px) now uses one purchase-grid column: Quantity, Add to cart, then Buy it now on separate rows. Quantity retains its merchant width and viewport cap; both action buttons fill the available content width. The form's configured 16 px mobile gaps remain unchanged.

Desktop retains the quantity/action row and the max-content minimum for a single-line Add to cart label. The existing narrow-container fallback remains available on desktop.

Runtime checks: 320 px content width 248 px, 375 px width 303 px, 390 px width 318 px; all mobile purchase grids have one column and no page overflow. Desktop at 1920 px retains quantity 170 px and Add to cart 444 px. Increase/decrease tested; Quantity restored to 1. No purchase submitted.

See mobile-ui-followup-2026-10-08.md for the page audit and validation results.
