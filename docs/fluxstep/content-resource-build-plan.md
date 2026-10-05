# Fluxstep resource completion

Placement: existing index collection grid, blog list and gallery blocks on Fluxstep-template only.
Ownership: Shopify collections/articles/Files own content; existing template resource settings reference handles and image picker URLs. No section code or global style changes.
Data: add Trail running, Tennis and Hiking & outdoor; retain existing three categories. Reuse existing suitable products, leave categories without a matching product empty rather than fabricate catalogue items. Create a separate Fluxstep blog with three Figma titles and excerpts; write original article bodies because Figma supplies card copy only.
Media: source exact images from Figma image references observed in Properties; upload to Shopify Files. Gallery order follows the design, six real images and editable image pickers.
QA: mutation userErrors, file ready status, collection publication and membership, article order/images, latest draft index merge, schema validation, desktop/mobile preview.

Delivery 2026-10-05:
- Added and published Trail running, Tennis and Hiking & outdoor to Online Store; retained three existing collection resources. Tennis contains The Roger Pro Ace. Trail/Hiking have no suitable existing product and remain empty.
- Assigned all six category resources in Figma order, six original Gallery images, and all three Showcase images. Showcase starts at slide 2 (tennis), with category links assigned to each slide.
- Uploaded templates/index.json only to unpublished Fluxstep draft 191986827563 after pulling latest index; no Git delivery.
- All uploaded media READY. Six Gallery images verified after swipe, six category images loaded, Showcase default tennis and mobile next trail verified. Desktop 1920/mobile 375 have no horizontal overflow. Theme Check: 0 errors, 35 pre-existing warnings; git diff --check passes.
- Blog completed after content access was approved: Fluxstep journal (125737664811), three published articles with Figma titles/excerpts/images and original full article bodies. Homepage blog-list now selects fluxstep-journal.
- Blog View all composition fix: nested the existing static button inside Blog list so its resource owner supplies closest.blog. Preserve all saved button settings and desktop/mobile positions. Initial closest.collection context was invalid. pass closest.blog instead of misclassifying the blog as closest.collection; shared button consumes the blog URL. Verify desktop/mobile destination on live preview.
- Final QA: GraphQL creates returned no userErrors; all three published article images loaded; desktop View all targets /blogs/fluxstep-journal; mobile CTA is below the cards and opens that blog; 375px has no overflow. Theme Check has 0 errors; changed-file MCP validation passes; git diff --check passes. Full Theme Editor add/remove/save lifecycle NOT TESTED (store login unavailable in selected browser); server-rendered static composition has no new JS lifecycle.
- Added two original journal articles: Find your everyday rhythm and Take the scenic route, reusing existing Fluxstep images. Publication dates 2025-11-16/15 preserve the homepage Figma top three. API confirms five published posts and storefront shows both new cards.
