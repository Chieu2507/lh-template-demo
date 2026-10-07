# Perky blog posts

Figma: https://www.figma.com/design/6HBP12lG9fUcHhgF3Gx057/Peekoo---Nhung?node-id=49005-7458&m=dev

## Composition

- Role: homepage editorial discovery, after Countdown timer.
- Placement: `templates/index.json`, section `perky_blog_posts`, existing `featured-blog-posts`.
- Context: Blog grid's native blog picker (`news`); Shopify owns article title, image, excerpt, publication date and URL.
- Slots: static Header, View all button and Blog grid; static Featured post and supporting Blog card. Overlay uses a nested static Image card. Meta, Title and Button remain editable child blocks.
- Presentation: page width, scheme 1, 80px desktop / 40px mobile padding, 48px header gap, 50/50 horizontal split, 28px card gap, two supporting cards. Shared native 4:3 media ratio approximates the Figma lead image; no new CSS or custom CSS settings.
- Runtime: existing server-rendered Liquid and theme media/layout/button primitives. No new JavaScript.
- Responsive: existing Blog grid stacks below 768px; supporting cards use their existing stacked mobile layout.

## Shared extensions

Featured post adds Overlay mode and delegates to Image card. Image card's opt-in Parent article media source resolves image, alt and link from `closest.article`; Selected media remains the unchanged default for existing instances. The card accepts shared blog Title, Meta and Button blocks. Overlay spacing and appearance are configured inside Image card; unused Featured post controls are hidden.

Blog grid only switches to its single-card layout for exactly one article. An empty blog retains its two-column placeholders. Empty blogs render the same lead and supporting placeholders in the Theme Editor, development preview and published storefront. Placeholder actions have no article destination.

## Validation

- PASS: Shopify accepted the scoped upload to development theme 192069828907 on layouthub-template-v2.myshopify.com.
- PASS: Theme Check, 0 errors; existing theme warnings remain. `git diff --check`.
- PASS: Theme Editor recognizes the section, static nested blocks, saved settings and Overlay choice after reload.
- PASS: desktop editor placeholder layout displays one lead card and two horizontal supporting cards.
- PASS: mobile editor stacks the lead and supporting cards within the preview width; lead content stays inside its card.
- PASS: non-editor development storefront renders all three placeholder images and titles when News has no articles. Screenshot: `output/perky-blog-posts/storefront-placeholder.jpg`.
- Publishing was not performed; published storefront uses the same Liquid fallback without a `request.design_mode` gate.
- Storefront has no visible News articles, so populated article data, real-image fidelity and article link navigation remain NOT TESTED. The connected Shopify app points to a different store and was not used as evidence for Perky content.
- Full add/duplicate/remove/save lifecycle was NOT TESTED; only existing instance selection and remote saved-config reload were checked.
