# Torvex sections 9–13

Placement: homepage JSON, content sections after Complete Your Setup; existing shoe collections supply product demos.
9: Collection promo mix shell owns columns (desktop/tablet/mobile), gap, scheme/background and padding. Side Promo grid blocks compose shared Heading, Group, Image and Button static slots; middle Group contains shared Image card. Groups retain editable content and mobile order.
10: Reuse Image cards with desktop/mobile media, editable Group copy and shared CTA.
11: Reuse Featured collection banner, shared Banner and Product list/Product card. Add independent mobile banner order if existing desktop-after option would put banner below mobile products. Header and cards retain shared responsive kernels.
12: Reuse text marquee and marquee Group/image leaves from Brands — Pawvera; Header/action use shared Group composition. Width presets and backgrounds belong to existing marquee kernels.
13: Reuse Icon text cards grid with Group, shared Icon and Header/Text leaves.
Responsive: desktop padding inherited on tablet. Use supported columns/tablet settings; mobile stack, ratio/radius and saved order. No template Custom CSS.
QA: Theme Check, diff, schema saved-value coverage, preview at desktop/mobile/tablet and Theme Editor children/settings. No new test files.
Capacity: preserve old sections except two disabled unused examples removed from index; content remains recoverable in Git. Homepage totals 25 sections.

Implementation completed 2026-10-13: sections 9–13 saved and uploaded to draft theme 192249102635. All 20 raster images converted to WebP before upload; Figma service icons use editable shared custom SVG icons. Product demos reuse cloud-strideo. No new test files or template Custom CSS.

QA results: Theme Check has zero errors (existing warnings remain); git diff --check passes. Preview verified at 1920 and 375px, plus 767/768/1149/1150px: MainContent fits viewport at all boundaries. Desktop promo tall images fill 335px frames; mobile tall images fill 234px frames. Center promo content aligns bottom, reward content center. Mobile trend banner radius is 16px. Logo cards are 120x76px on mobile; benefits stack and retain horizontal icon/copy rows. Mobile section heights: mix ~1300px, rewards 272px, brands 275px, benefits 488px.

Small supported-setting deviations: trend banner desktop width 452px versus Figma 449px, reward copy width 630px versus 628px (existing slider steps). Product content, ratings and card height reflect live demo products.

Theme Editor runtime/settings selection: NOT TESTED for final five sections. Current browser Shopify account lacks permission for this store. CLI upload and schema validation succeeded, but these do not substitute for Theme Editor interaction validation. Known header overflow near 1149/1150px predates these sections; new MainContent has no overflow.

Preview restarted after token expiry and available at http://127.0.0.1:9293/. Proof screenshot: /private/tmp/torvex-final-sections-desktop.png. Git commit/push not performed in this implementation request.
