# Mobile carousel preview

Mobile preview applies only to product lists, collection/content lists and blog lists that already expose desktop preview. The mobile checkbox is placed immediately below desktop preview in product-list, collection-list-items, blog-list, carousel and collection-tabs schemas. Slideshow and hotspot galleries retain their existing preview settings.

Mobile preview defaults off. Enabled preview adds 0.2 to the selected mobile column count; disabled preview retains whole columns. Tablet continues using desktop preview. Product, collection and blog lists share the product carousel controller; content lists use the generic carousel controller. Existing timeline and product-media overflow behavior is preserved.

Navigator defaults, presets and saved template settings use Show on hover. Explicit Always show remains selectable.

Local 375px preview measured 1.2 and 2.2 product cards and 2.0 with preview disabled, without page overflow. Temporary QA settings restored.
