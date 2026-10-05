# Strideo product import — 2026-10-05

Store: layouthub-template-v2.myshopify.com
Theme: Strideo-template (chieutt), 191953273131 (draft)
Branch: Strideo-template

## Catalog

8 Figma products, 39 colorways, 99 variants, 78 uploaded images.
Each color has one Figma catalog image and one AI-generated lifestyle image.
Catalog photos and media are uploaded to Shopify Files/product media, never theme assets.
Products are active and available on the Online Store, with collection membership matching catalog.json.
Cloudrunner 2 is selected in Featured product. Existing New arrivals Men/Women tabs retain their collection configuration.

Prices and compare-at prices follow Figma. Cloudrunner 2 uses sizes 7–14 shown in the design, 15 units for available sizes; 9, 11.5 and 12 are sold out. Other products use demo inventory of 100 per color.
Pearl | Desert is the explicit Figma color label; other color names describe the visible Figma colorways. Descriptions outside Cloudrunner 2 are demo copy.
Category: Athletic Shoes (aa-8-1). All Color options link to shopify.color-pattern.

## Variant images

Shopify permits one directly attached image per variant. Catalog media is the directly attached primary image.
custom.secondary_image is a file_reference variant metafield containing the matching lifestyle image. Its definition is pinned in the Admin for merchant editing.
Product card and swatch templates read this optional field first, then retain their previous fallback behavior.
Media order alternates catalog/lifestyle for each color.

## Verification

PASS: 8 products, 99 variants, 78 READY media, exact price/compare-at/inventory/category, descriptions, collection membership, publication, Color links and primary/secondary image mapping.
PASS: media order verified against catalog manifest.
PASS: desktop product-card image loading and badge rendering.
PASS: desktop/mobile color changes select the correct catalog/lifestyle pair.
PASS: mobile 390px and default desktop 1920px have no document horizontal overflow.
PASS: Featured product color selection moves gallery to matching primary media.
PASS: size 9 shows Sold out and disables purchase; size 7 restored afterwards.
PASS: Theme Check, zero errors; no offenses in changed product-card snippets.
PASS: git diff --check.
NOT TESTED: exhaustive Theme Editor add/remove/reorder lifecycle (no schema or lifecycle code changed).
No checkout/order created. No theme publish, Git commit or push performed.
