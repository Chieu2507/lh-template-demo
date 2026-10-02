# New arrivals — Banner width presets

- Scope: existing Featured collection: Banner on the homepage, existing static Header / Banner / Product list composition.
- Owner: section owns banner column maximum width; global container and page margins remain inherited. No new runtime.
- Editor contract: `banner_max_width` is a select with Small / Medium / Large. Default and active Stroken instance: Medium.
- CSS mapping: Small 450px, Medium 612px, Large 800px. Tablet remains limited to half the available row minus half the gap; mobile retains the stacked full-width layout. Before/after use the same maximum.
- Migration: active template 612 becomes medium. Liquid accepts legacy 450, 612, 800 and 1000 while existing saved configurations are updated.
- Validation: schema and template JSON parse; diff whitespace passes; changed section has no Theme Check offenses. Full Theme Check is blocked by an unrelated ValidSchemaName error in featured-collection-background-custom.liquid (name exceeds 25 characters).
- Editor: Small / Medium / Large control visible, Medium saved, Save disabled after completion. Section uploaded successfully to development theme 191891243307.
- Responsive preview: desktop Medium banner 612px; tablet 768px banner 344px in a 708px row; mobile 375px banner fills the 343px content width. No horizontal overflow at tablet/mobile. Temporary viewport reset. Screenshot: output/stroken-banner-width/editor.png.
