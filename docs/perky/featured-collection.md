# Perky Featured collection

Figma: desktop `49005:7530`, tablet `49247:5176`, mobile `49247:5978`.

Enabled `featured_collection` after Collection thumbnails on Perky-template.
Collection intentionally remains blank by user instruction; four existing product placeholders render. Product images, prices, badges and reviews remain resource data rather than fabricated Figma demo commerce data.

Composition reuses Header → Heading + Text, static Product list → Product card, and View all button. No new settings or assets. Global page width remains 1500px. Scheme 2 supplies #F8FAFA.

Desktop: 4 columns, 32px gap, 48px header-to-products gap, 80px vertical padding. Tablet: 4 columns, 20px gap, 40px section gap, 64px padding. Mobile: 2×2, 12px column / 24px row gaps, 36px header-to-products gap, 32px products-to-action gap, 56px padding. Mobile header is centered and View all follows the grid. Typography uses shared heading/body roles; media has 16px corners. Existing outline placeholders retain their own empty-state treatment.

No section custom_css; native settings govern the layout. Product card title font uses Theme settings → Product cards → Heading font. Independent tablet gaps/padding, mobile vertical product gap and action-only spacing are not exposed in the current schema, so their CSS overrides have been removed. Previously measured Figma targets above describe the reference, not extra settings. grid mobile ordering is handled by the existing Featured collection composition. Header max_width is 760px to satisfy its existing 10px schema step; fill mode governs the rendered layout.

Validation: git diff --check PASS; schema range/select values PASS; Shopify Theme Check exit 0, no errors. Development Theme Editor confirms enabled section, saved configuration, four-card tablet row and mobile 2×2 with View all below. Real collection interactions, full desktop viewport, and editor add/remove/duplicate lifecycle NOT TESTED for this configuration-only change. Local preview was blocked by an unrelated footer-group width_desktop upload error; direct development Theme Editor renders the requested section.
