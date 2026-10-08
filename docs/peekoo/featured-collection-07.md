# Featured collection 07

Figma: 49026:24533. Reuse Featured collection with existing static Header,
View all and Product list. Add merchant-managed Promo card children to Product
list, without replacing the Product card kernel or collection resource.

Promo card follows the supplied schema sample: position, mobile top, link/new
tab, image/video with optional mobile media, overlay, subheading/heading/text,
alignment and vertical position, heading/body size tokens, CTA style/icon/height/
full width, content/button gaps, scheme, paired padding and mobile overrides.
CTA uses the card link. A blank link omits interactive CTA and card-link overlay.
Blank content fields are omitted. Promo cards are not counted as products.

Product list captures dynamic blocks once, strips the Promo card slot envelope,
and inserts cards before the numbered product. Positions beyond the actual
product count clamp after the last product; ties preserve configured block order.
Hidden blocks produce no blank slides. Product images/prices/badges remain owned
by the selected Shopify collection. Promo mobile-top moves the same DOM card
above the list and restores it at its desktop slot, with Swiper refresh and
section-unload cleanup. Grid and carousel share this contract. Theme Blocks do
not support child limits; the curated allow-list and platform section budget
apply. Theme has 154 Theme Block files after this addition.

Composition: heading “Trending this Week”, description, View All; scheme 2,
80px desktop padding, 56px header gap, 4/3/2 items per view and 32/12px card gaps;
progress bar and hover navigation. Promo slot 1: “SALE UP TO 20%”, “Clearance
sale!”, “Shop Sale”, scheme 3, 32px content padding, 8px text gap, 20px button
spacing and 48px CTA. Original Figma photo imported into Shopify Files. Existing
New Arrivals Perky collection is used; product contents follow that resource.
Previous Featured collection: Banner instance is retained but hidden.

Known design limits: product-card ratings remain unavailable (accepted by user);
promo follows ordinary product slot width and participates in carousel movement.
The reference uses a wider fixed banner beside three scrolling products.
Mobile uses the requested promo-top contract; no separate Figma mobile node
was supplied. Existing global page width and product typography remain active.

Validation: 5 targeted tests pass (slot insertion/ties, boundary clamping,
hidden/empty cards, mobile restoration, section unload cleanup). Theme Check:
0 errors, 45 existing warnings; no findings in the Promo card/Product list
integration files. JavaScript syntax and git diff whitespace checks pass.

Draft theme 192108396843 was updated with only the integration files and the
merged Featured collection 07 composition. Saved configuration is visible in
Theme Editor with all settings groups; video/mobile padding conditional controls
were exercised and restored without leaving unsaved changes. Original Figma
image is saved as peekoo-clearance-promo.jpg. Live preview confirms View All,
mobile-top at 375px with no horizontal overflow, one Promo DOM card, and exact
slot restoration at 768px/desktop. Carousel next movement was observed; hover
controls are intentionally hidden outside hover. Desktop proof screenshot:
/private/tmp/peekoo-featured07-desktop.jpg. Product limit is 6 so the collection's
additional products retain a meaningful View All link. No theme publish.

Card position follow-up: selecting a Promo card no longer unconditionally
scrolls its carousel slide to the left edge. Visible cards preserve the current
viewport; off-screen cards scroll only enough to reveal the selected card.
Live Theme Editor verified positions 2 and 3 after one and two products,
respectively. Existing unsaved user edits were preserved; only JS was uploaded.
7 targeted tests pass; Theme Check remains at 0 errors.
Proof: /private/tmp/peekoo-card-position-3.jpg.
