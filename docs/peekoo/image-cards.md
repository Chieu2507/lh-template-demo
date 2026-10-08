# Peekoo Image cards

Source Figma 49022:24168 (desktop), 49234:4778 (tablet), 49234:5813 (mobile).

## Section build plan
- Role: two promotional content cards after Collection tabs in index.
- Context: manual editable image pickers and existing collection CTA destinations.
- Owners: section owns width, order, gap, padding; Image card owns 4:3 media, content position, radius, scheme; Header owns eyebrow/heading gap and width; leaf blocks own copy and CTA.
- Slots: 2 Image cards → Header (Eyebrow + Heading) + Button; 10 dynamic blocks, 3 nesting levels, no app blocks required. Existing Image cards section and block kernels, no new runtime or schema.
- Responsive: desktop horizontal, 24px gap, padding80; tablet stacked gap16 padding64; mobile stacked gap16 padding56; 4:3 images; content center left on desktop/tablet, bottom left on mobile.
- Accessibility: h2 heading semantics, meaningful image alt from Shopify Files, named collection links and shared focus styling.
- QA: JSON/schema/Theme Check, existing index scope retained; live responsive and editor checks pending image upload approval.

## Assets and approval
- Holiday photo already exists as shopify://shop_images/561ad.jpg; verified visually against the Figma asset. Reuse existing Files image without an asset upload.
- Imagination photo is a different image from slideshow f9b22.jpg. Prepared picker peekoo-imagination.png, original asset downloaded to /private/tmp/peekoo-imagination.png.
- Automatic approval review rejected new asset upload because exporting Figma assets to Shopify was not explicitly confirmed. Do not upload or push this section until that approval is obtained.
- Preserve the existing disabled collection_list_03 composition; new peekoo_image_cards replaces the enabled hotspot at this position, preserving hotspot data disabled.
- Tablet heading follows existing 46px theme token (Figma screenshot equivalent46), mobile40px; desktop54px. Minor first-image zoom differences are not reproduced.

Validation: Theme Check has zero errors; git diff --check passes. All previous sections compare equal to the pre-task index except hotspot disabled. No theme preview upload, Git commit, or Git push performed for this section.

User decision: use default placeholders for both Image cards. Clear both image pickers and mobile pickers, remove photo mirroring/crop CSS. No asset upload required. Enable section in preview after collection tabs.

Completed: Shopify accepted index upload to unpublished Peeko192108396843. Live section has2 default SVG placeholders and0 image elements; both CTA links resolve to intended collection URLs. Desktop900x675 per card; tablet708x531 stacked; mobile343x257.25 stacked; no horizontal overflow on tablet/mobile. Proof /private/tmp/peekoo-image-cards-placeholder.jpg.
