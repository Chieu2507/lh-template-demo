# Multiple images with text — boxed layout

Section owns optional box appearance, inner padding and desktop/tablet column order. Existing Image and content blocks retain their settings and editor attributes; the controller and image stack remain unchanged.

- `desktop_content_position`: First swaps content and media columns; Last preserves the existing composition. Mobile retains images, navigation, then content.
- `enable_boxed_layout`: adds a surface inside the page/full-width container.
- `boxed_color_scheme`, `corner_radius`, `shadow`: reuse existing scheme and Group appearance tokens/options.
- Four boxed padding controls reuse Countdown setting IDs and labels. Defaults: desktop 70/70px, mobile 50/30px.
- Saved Strideo instance: boxed enabled, Scheme 2, Rounded, no shadow, Last content placement.

Verification: Theme Check has no errors and no offenses in the affected section; diff whitespace check passes. Desktop storefront box, equal image/frame heights, editor controls, First/Last changes and Small/None shadow changes were verified. Mobile editor rendering was observed during control testing; a complete mobile storefront/breakpoint sweep was not performed. No schema changes to child blocks or controller lifecycle changes.

Navigation fix: desktop content and navigator occupy separate grid rows; image spans both rows. Six isolated CSS regression cases with 892px content (First/Last × Top/Center/Bottom) passed with minimum 20px separation. Live storefront navigation change verified. Navigation group exposes Show navigation, Style (Primary/Secondary/Outline/Icon only), and Icon (Chevron/Arrow/Long arrow), reusing collection carousel controls. Theme Check reports no errors or affected-section offenses.
