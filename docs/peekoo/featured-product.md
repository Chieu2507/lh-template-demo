# Featured product — Peekoo

Section Build Plan
- Role/placement: product merchandising in index; existing Featured product immediately after perky_logos.
- Context: section product picker selects perky-stacking-tree-with-bird; Shopify owns media, title, price, variant inventory and checkout. Existing catalog differs from Figma ($35/$45 and four product images in prior audit).
- Ownership: section owns optional Header, header spacing and optional boxed surface settings; static _product-media and _product-details keep their contracts. Theme Settings own typography, buttons and forms.
- Slots: static Header, Product media, Product details; details compose Groups, product rating/title/price/description/inventory/buy buttons, enabled shop payment methods and product share. Missing reviews are omitted, never fabricated.
- Output/runtime: existing section shell and product custom elements; share uses existing share-button/share.js. Inventory progress is included in each variant template for existing product-inventory lifecycle.
- Responsive: two equal desktop columns (gap accounted for), existing tablet/mobile product flow; editable mobile boxed padding; section tablet padding inherits desktop unchanged.
- QA: schema/settings/static block order/range contracts; Theme Check, diff check; live Shopify editor and viewport verification pending scoped upload.
- Figma: 49026:24409. Product imagery is resource-owned; existing real product media stays dynamic. Downloaded exact Figma rating/social SVGs used at native 18px/16px sizes. Payment methods are shop-owned.

Verified result
- PASS: existing Shopify development watcher (theme 192069828907, localhost:9292) automatically uploaded the changes; no new watcher or publishing command was started.
- PASS: template placement directly after perky_logos confirmed in the live DOM and Theme Editor sidebar.
- PASS: desktop 1920px: H2 34px, product title 26px, equal 630px columns, 64px gap, white boxed surface with 48px/40px padding and 24px radius; section height 878.8px.
- PASS: section has no horizontal overflow at 375, 767, 768, 1149, 1150 and 1920px. Existing whole-page tablet overflow remains outside this section (at 768px page 786px, section scroll/client widths both 768px).
- PASS: desktop/tablet external padding 80px; mobile 56px. Header width uses closest supported 760px setting (Figma 768px; existing Header step is 10px).
- PASS: responsive product gallery and native product images; thumbnails and visible product images load. Native social assets render 16px inside 32px buttons; inventory bar fills from actual stock; quantity increases from 1 to 2.
- PASS: Theme Editor section selection exposes Header gap, Equal columns, boxed container, color scheme, radius and padding controls with the saved values. Static Header and media remain selectable.
- PASS: Theme Check 0 errors, git diff --check, syntax checks for the existing inventory/share JavaScript. The shared form__control--input CSS scope warning already exists.
- NOT TESTED: editor duplicate/remove/reorder/save cycle, alternate variant state (selected product has one variant), cart submission/checkout, posting to share destinations, and a populated product rating.
- Visual differences are resource-owned: product price $35/$45, stock 20, four catalog images, real product description, no reviews yet, and the shop's six enabled payment methods. No product records were changed to imitate Figma's price/inventory/review examples.
- No Custom CSS or Peekoo-specific stylesheet added. Existing out-of-scope assets (including peekoo-slideshow.css) and page mismatches were retained.
- Screenshot: output/peekoo-featured-product/desktop.jpg.
