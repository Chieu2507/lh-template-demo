# Optimized card thumbnails

Peeko can use an optional merchant-owned `custom.card_thumbnail` metafield on
products and collections. Both definitions use `file_reference`, restricted to
images. The value is a Shopify Files MediaImage reference; Liquid reads its
`preview_image`. Assign the image under the resource's Metafields in Shopify Admin.

Collection cards use the thumbnail when present and otherwise keep the collection
image. Product cards use it only when the selected card image matches the product's
featured image. Variant-specific photos and hover selection keep their original
behavior. Resource banners, product galleries and Quick view retain full-size
images. Clearing the metafield restores the original card source.

The definitions/values live in Shopify; Git contains the rendering support. Stores
without these optional definitions/values continue using their original images.

Dedicated mobile images are configured through existing Mobile image pickers in
index. Their `srcset` never declares a candidate wider than the uploaded source.
Desktop sources and intrinsic layout geometry remain unchanged. Mobile artwork
prioritizes transfer size and may be less sharp at high pixel densities.
