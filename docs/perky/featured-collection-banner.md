# Perky featured collection banner

Reference: [Figma 49141:20177](https://www.figma.com/design/6HBP12lG9fUcHhgF3Gx057/Peekoo?node-id=49141-20177&m=dev).

Built with the existing Featured collection: Banner section, directly after the age collection list. The Figma desktop section uses 80px vertical padding, a 682 × 689 banner, and a centered heading, description and Shop Now button above a two-card product carousel. The theme retains the configured 1500px page width and scales the two columns to the available width; the banner uses the Figma aspect ratio and 24px corner radius.

## Editable composition

- Existing Header with Heading, Text and Button children.
- Existing Banner image picker. `perky-playsets-banner.jpg` was exported from the Figma source and uploaded through Theme Editor, then saved as a Shopify image reference. No image was added to theme assets.
- Existing Product list carousel and Product card children, with two columns, 28px desktop gap, arrows inside the carousel and bullet pagination.
- Collection remains empty for later selection. Titles, prices and images currently use existing product placeholders; real product information comes from the selected collection.

The section offers Header position (above section or above products). Product layout is owned solely by the existing Product list block, which supports grid and carousel. The static slot retains `carousel-product-list` so its saved collection, cards and settings are preserved. The unused legacy grid slot was removed from this instance and the section preset now uses the same Product list renderer. Banner size, position, height, spacing, color scheme and mobile padding continue to use section options. No Custom CSS is configured. New layout labels are literal English strings because no corresponding shared translation keys exist.

## Validation

- Theme Editor saved the banner image and retained both new section settings.
- Desktop preview loaded the banner and initialized the existing carousel. Next moved the active slide from 1/6 to 2/6; Previous returned to 1/6.
- At a 375px viewport the banner, header and product carousel stack vertically, with two product cards and no page overflow. Mobile uses 56px section padding, 32px header spacing and 12px product gap. A separate mobile Figma frame was not inspected; this uses the theme's responsive contract.
- Theme Check: zero errors, 37 warnings across the theme. `git diff --check` passed.
- Preview evidence: `/private/tmp/perky-playsets-desktop.png` and `/private/tmp/perky-playsets-mobile.png`.

Desktop next-slide preview clips its leading edge at the product column boundary, preventing the previous slide from appearing over the adjacent banner. The shared preview behavior elsewhere is unchanged. Verified with preview enabled and active slide 2/6; the saved preview option was restored to its prior disabled value after QA.
