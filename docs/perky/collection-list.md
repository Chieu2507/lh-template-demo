# Perky Collection list

Reference: Figma `49005:7651` (Collection list 26), container `49005:7652`, sample card `49006:19750`. Inspected through Figma Dev Mode UI because the Figma MCP plugin is not connected.

Placed `perky_age_collections` immediately after `perky_hotspot`. Reuses Collection list, static Header (Heading + Text), static View all, static Collection list items and its static Collection card with Collection title. The resource picker remains blank as explicitly requested. Four outline collection placeholders render; collection names and images come from selected Shopify collections when configured. No image uploads, new assets or Custom CSS.

Desktop reference: 1400px container, four columns, 28px gap, 40px header-to-grid gap, 80px vertical padding. Theme page width remains the user-requested 1500px. Copy: Fun For All Ages / Toys for kids of every age, stage, and ability! / Explore All. Card background scheme 2, custom radius 24px, square media with 20px inset, 16px media-to-title gap, 20px bottom padding, no product count. Heading/title use global xl/sm typography roles.

Extended the shared card with Media padding (default 0px) and Custom corner radius (existing presets unchanged). Added an explicit fallback destination argument to View all; Collection list supplies routes.collections_url. Empty grid shows one configured desktop row; empty carousel shows desktop columns + 2.

Mobile uses the existing responsive grid with 2 columns, 12px gap, 32px content gap and 56px vertical padding; tablet uses 4 columns and 20px gap. These are responsive configuration choices; the mobile Figma frame was not separately inspected.

QA PASS: native editor exposes Media padding 20px and Custom radius 24px and saved section configuration; desktop has 4 cards; Explore All points to /collections with no disabled attribute; 375px viewport renders 2 columns without page overflow and 56px padding. git diff --check PASS. Theme Check 0 errors. Real collection selection/link behavior and add/duplicate/remove lifecycle NOT TESTED because picker is intentionally empty. Existing development preview watcher remains active for continued editing.

Media padding has a documented literal schema label because the current schema locale has no canonical key for this new card-specific control.

Explore All alignment: desktop left-aligned composition uses two columns when top navigation is absent, removing the unused navigation column and its trailing gap. QA: action right edge and card grid right edge both 1232px (0px difference). Theme Check: 0 errors.
