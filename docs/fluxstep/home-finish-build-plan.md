# Fluxstep homepage completion

- Role/placement: three editable storytelling sections in index only; existing Hero, Blog posts, Gallery carousel kernels.
- Context: Hero/Image blocks use Shopify image pickers; Blog list owns a Shopify blog resource. No unrelated blog substituted. Missing original gallery media remains a visible editable placeholder.
- Ownership/slots: section owns container/padding; shared Heading/Button/Group/Image blocks own content; shared Carousel owns swipe/navigation. Preserve slideshow and New arrivals tabs. Remove only excess index instances.
- Output/runtime: existing semantic headings, CTA, shared Swiper and editor lifecycle. No new JavaScript.
- Responsive: desktop padding also applies on tablet, mobile values separate; gallery four desktop items, one mobile item with peeks. Hero padded full width and editable custom desktop/mobile heights.
- Figma desktop padding top/bottom: Featured 96/96; categories 20/112; Showcase 96/96; New arrivals 96/96; Cloud tabs 40/96; Hero 40/96; Blog 0/80; Gallery 80/96. Hero media 750px high and section page margins.
- QA: schemas/settings coverage, Theme Check, exact draft upload, storefront desktop/mobile/overflow. Editor access limitation and missing blog/gallery resources recorded separately.

## Validation and remaining data

- Draft 191986827563 upload: PASS, index contains exactly 10 sections. Initial index upload rejected collection-only Divider placement; enabled Divider on index and re-uploaded successfully.
- Theme Check: 0 errors. Existing shared Carousel schema has 53 settings (advisory warning); no new settings were added to Carousel. Duplicate render argument removed.
- git diff --check: PASS.
- Storefront: Hero 750px desktop / 400px mobile, heading 72px desktop, white primary CTA. Gallery 4 desktop / 2 mobile square items; 10px gap. Shared Carousel now reserves its configured columns before deferred initialization to avoid oversized first paint.
- Overflow: document width equals viewport at 1920, 768, and 375px. Desktop gallery initializes to 376.5px cards at the store's current page width; mobile to 166.5px. No browser console errors in final preview.
- Tablet: measured Featured 96/96, Showcase 96/96, Cloud tabs 40/96, Hero 40/96, Blog 0/80, Gallery 80/96. No tablet padding controls introduced.
- Figma desktop outer padding matched. Full mobile Figma padding extraction remains NOT TESTED because the browser connection restarted repeatedly; existing section mobile values preserved and new mobile values use 24/48 Hero, 0/40 Blog, 40/48 Gallery. Full visual 1:1 cannot be claimed.
- Global page width/margins retained to preserve the user's existing slideshow. Current store page width differs from Figma: Hero media 1856px versus Figma 1824px at 1920; gallery visible cards 376.5px versus Figma 411px. This is a follow-up requiring an agreed global layout change.
- Data: Shopify has only an empty News blog and unrelated Essen articles. Blog resource intentionally blank, three editable article card placeholders. User preference question pending.
- Media: exact Hero and fifth Gallery image reused from Shopify Files. Five Gallery originals unavailable: MCP export requires edit access; browser download attempts timed out. Those image pickers remain blank with native placeholders. No substituted unrelated media.
- Theme Editor lifecycle: NOT TESTED directly; draft upload schema accepted and shared kernels retained.
- Work remains on Fluxstep-template, no Git commit/push in this continuation. Unrelated output and parallax audit template untouched.
- Overall: PASS WITH FOLLOW-UPS for reviewable layout; exact content and full Figma fidelity incomplete due missing resources/mobile reference verification/global width difference.
