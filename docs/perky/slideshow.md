# Perky slideshow

Source: Figma `6HBP12lG9fUcHhgF3Gx057`, node `49004:7124` (Slideshow 02).

## Section build plan

- Role/placement/context: visual home-page content in `templates/index.json`; one image slide from the supplied design.
- Ownership: section owns height and container mode; slide owns media, padding, position and content width; nested Groups own gaps/alignment; Heading/Text/Button use shared typography and scheme tokens.
- Slots/output: reuse slideshow-slide → Group → content Group (Heading, Text) + actions Group (Button), preserving editor attributes, link semantics and existing single-slide controls.
- Runtime: existing slideshow Liquid, responsive image/LCP helper and slideshow.js; no new runtime.
- Responsive: desktop reference is 1920 × 820; tablet/mobile retain saved 800/640px heights, center placement and shared page margins. Mobile content padding is 40px. No mobile Figma reference was supplied.
- QA: schema validity, desktop/tablet/mobile geometry, image loading, editable composition and existing responsive image tests.

## Figma mapping

- Background: original Figma photo, cover; no additional color overlay.
- Desktop height: 820px; outer section padding: 0.
- Content container: full width with shared 48px desktop margins (1824px usable width at 1920px).
- Slide content: centered horizontally and vertically, max-width 512px, top/bottom padding 80px.
- Column gap: 40px; heading/description gap: 16px; actions gap: 24px.
- Heading: “Find everything for your baby”, H1 role, Nunito 700, 54px/1.2, white, capitalize.
- Description: “We offer everything you need to care for your baby with love.”, body md, Nunito 400, 16px/26px, white.
- Button: “Shop now”, primary in scheme-3, white background, #1C1C1C label, pill radius, 48px high, 32px side padding; collection link retained.

The content container mode defaults to Page for existing instances. Text line-height override is opt-in and defaults to the shared body token. These controls are editor configurable; brand values remain in template JSON.

## Asset and validation

- Uploaded original Figma image to `layouthub-template-v2.myshopify.com` Files: `perky-slideshow-baby.jpg`, MediaImage `46435018146091`, source resolution 1848 × 760. Image picker reference remains editable.
- Desktop 1920px: rendered height 820px, content 512px centered, container padding 80px 48px, heading 54px/64.8px, description 16px/26px, button 48px with 32px side padding.
- Tablet 1024px: height 800px, content 512px, padding 80px 30px, no slideshow overflow.
- Mobile 375px: height 640px, content 343px, padding 40px 16px, heading 40px/48px, description 16px/26px, no slideshow overflow. The shared mobile button token applies.
- Theme Editor confirms one editable Slide with nested Groups, desktop height 820, Full content container, and Text Medium with Customize line height enabled at 26px.
- Existing slideshow responsive-image tests: 11 passed. Theme Check: zero errors, 36 inherited warnings. Other home-page sections and section order are preserved.
- Preview captures: `/private/tmp/perky-slideshow-desktop.png`, `/private/tmp/perky-slideshow-mobile.png`.

## Additional slides

The slideshow now contains three slides with navigation and bullet pagination enabled. The first keeps its Figma image and content. Two merchant-editable slides reuse the same layout, dimensions and scheme:

- Everyday essentials for little ones — “Discover soft, practical favorites for every moment with your baby.” — Explore essentials.
- Made for your precious moments — “Find thoughtful picks for playtime, bedtime, and everything in between.” — Discover more.

Both additional slides have empty desktop/mobile image pickers, ready for later upload. Their headings use h2; the first slide remains h1. Existing placeholder rendering supplies the empty media state.

Slideshow scene media now scopes --media-radius to 0px and resets image border-radius to 0 for both primary and split images, including responsive picture sources. Storefront QA: theme radius 8px, slideshow image radius 0px and clip-path inset(0px). Theme Check: 0 errors.
