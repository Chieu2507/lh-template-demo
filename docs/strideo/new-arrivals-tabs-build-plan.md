# New arrivals — Collection tabs

- Role/placement: homepage merchandise section immediately after scrolling_text; reuse collection-tabs. Strideo-template branch, Shopify draft 191953273131.
- Figma: desktop 49152:33898 has scheme1, 96px top/bottom padding, page-width container, 40px group spacing, four product cards with 10px gaps. Tablet 49384:13119 has 80px padding. Mobile 49390:14228 has 64px padding and 36px group spacing.
- User adaptation: render tabs using existing Tab layout instead of single collection. Men/Women are editable demo labels, collection pickers remain empty. Four desktop, two tablet, one mobile items; tablet uses the existing integral column options for this tab layout rather than fixed 529px Figma cards.
- Ownership: global page width, margins, H2 typography, buttons and product card settings stay global. Section owns layout, scheme, card count/gaps and padding. Existing static Header/Tab layout/View all slots; two dynamic Collection tab blocks, each with static Product card kernel.
- Responsive: inline heading/tabs/optional View all desktop/tablet; heading and tabs above carousel on mobile. Retain existing carousel/pagination controller, accessible tab state, keyboard navigation and editor block selection. Tablet padding is a scoped template Custom CSS adjustment; no additional merchant numeric controls or shared schema changes.
- Output/runtime: existing collection-tabs shell and tab-layout lifecycle; role-appropriate product placeholders, eight per tab so carousel overflows. No image files or catalog changes.
- QA: validate settings and nested static/dynamic orders, Theme Check, remote upload to explicit draft only, live tab clicks and keyboard changes, desktop/tablet/mobile card dimensions/overflow, Editor block tree. Screenshot proof.

## Validation

- Uploaded only templates/index.json to named Strideo draft191953273131; remote template matched local before patch. All previous section data unchanged; new instance immediately after scrolling_text.
- Desktop1920: four cards376.5px with10px gaps, padding96px, layout gap40px. Tablet768: two cards349px, padding80px. Mobile375: one card343px, H2 font32px, padding64px, gap36px. No horizontal page overflow at any tested width; viewport reset.
- Click Women switches selected tab and panel visibility; ArrowLeft selects Men. Eight placeholder products per tab. Theme Editor exposes two editable/removable/reorderable Collection tab blocks; second block displays Women and empty Collection selector. Header Heading stays dynamic; standard fixed layout/card slots retained.
- Theme Check0 errors/35 existing warnings; git diff --check passed. Screenshot output/strideo/new-arrivals-tabs-desktop.png and mobile/editor equivalents. No shared code/schema or image asset changes. No Git commit requested.
- Not exercised: add/remove/save lifecycle, OS reduced motion; reused existing runtime without modification.
