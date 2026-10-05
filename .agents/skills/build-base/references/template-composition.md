# Editable template composition

Apply these rules when adapting sections/cards to a design in this repository. Reuse the implementation currently on the selected branch; examples below describe the approved Stroken build, not mandatory layouts for every template.

For image width presets used together with aspect ratio, asset assignment, background coverage, and nested Theme Block pitfalls, read [Figma section mapping and media sizing](figma-section-mapping.md).

## Audit before implementation

- Find the existing section, block kernels, and shared carousel before adding markup or controls.
- Compare desktop, tablet, and mobile: section padding, inner container width/margins, media ratio/height, content position, nested groups, gaps, schemes, and navigation behavior.
- Use the design for layout and the user's approved Theme Settings for typography/colors. Resolve a discrepancy using the user's latest instruction.
- Read Figma through the available connector or visible Inspect UI. Report inaccessible measurements; do not claim pixel accuracy from guesses.

## Compose with Group

- If Group already supports padding, gap, flow, width, alignment, background, border, radius, or blur, configure Group instead of adding a parallel control to the section/card.
- Build the default composition in `templates/*.json` or presets. Keep content editable with `{% content_for 'blocks' %}` and matching allow-lists/block_order.
- Permit Group in Collection card. Titles, descriptions, buttons, and nested groups must be addable/removable/reorderable where their contracts allow it. Do not reserve a fixed title slot merely to match a screenshot.
- Preserve `closest.collection` through nested groups. The list owns selected resources and columns; the card owns media/link/placement; Group owns the content box; each leaf owns its content and typography.
- The card may position its content on/below the image, but must not force a visual box around it. Do not add a card-specific `Overlay panel`, frosted-panel wrapper, or duplicate surface settings when Group can express the design.
- Set Mobile width to Fill in the Group schema/default preset and explicitly in a configured composition that needs full width. Do not rely on desktop Fill: a mobile schema default can override the Liquid fallback.
- Check every nested Group's width, not only the outer group. A full-width Content area includes its padding; an inner Wrapper fills the remaining space.
- Keep Group backdrop blur at 0 when no blur is intended. Set it only on the group that owns the translucent surface.
- Ensure 0 padding is actually 0: do not omit a zero token while a placement-specific CSS fallback adds padding. Avoid applying the same inset at both card and Group levels.

Approved examples:

```text
Slideshow slide
└─ Group Column (vertical gap)
   ├─ Group Content (eyebrow + heading)
   └─ Button

Collection card
└─ Group Content area (inset, Fill on mobile)
   └─ Group Wrapper (surface, border, blur, padding)
      └─ Collection card title (title + optional item count)
```

These are editable starting compositions. Add sibling buttons or rearrange groups when the next design calls for it; do not encode the tree into card CSS.

## Collection list responsive controls

- Mobile columns offers only 1 or 2. Tablet columns offers only 2, 3, or 4, default 2.
- Do not add Mobile card width or a pixel width override. Derive card width from the container, selected columns, and gap.
- With mobile preview off, use exactly 1 or 2 items per view. With preview on, use selected mobile columns + 0.2: 1.2 or 2.2. Never force a two-column selection back to 1.2.
- Desktop and mobile preview toggles operate independently. Place Show next slide preview on mobile immediately below Show next slide preview on desktop in the editor. Keep the desktop column count unchanged by the mobile fraction.
- Fractional items apply only to carousel mode. Grid remains integral. Keep schema values, Liquid data attributes, CSS, and the shared carousel controller consistent.
- Reuse shared navigation, pagination, autoplay, and editor lifecycle. Do not fork a controller to implement template spacing.

## Values and content ownership

- Keep Figma dimensions, padding, gaps, schemes, and text in the template instance. The Stroken values (such as 4:5 cards, gap 20px, content inset 16px) are examples, not global defaults for unrelated templates.
- Use Shopify resource pickers for collections and their actual names/counts/images. When the user asks to defer selection, retain collection placeholders; do not create catalog data or invent counts to imitate the mockup.
- Preserve the current branch, running development preview, and unrelated theme edits. An open Theme Editor can contain unsaved user changes: inspect a separate editor tab instead of restoring, saving, or reloading that session.

## Focused verification

- Run Theme Check and `git diff --check`; distinguish pre-existing warnings from new failures.
- Verify the configured instance at desktop/tablet/mobile and inspect the actual nested Group widths, padding, gap, scheme, and blur. Test mobile columns 1/2 with preview off/on as 1/2/1.2/2.2 when changing that controller.
- Inspect a fresh Theme Editor session: Group appears in the card composition, nested blocks remain selectable, and removed bespoke controls are absent. Check add/remove/reorder behavior when changing the slot contract, without overwriting the user's unsaved session.
- Check that placeholders and selected resources share carousel structure/context, navigation works, and the page does not overflow horizontally. Report any runtime cases not exercised.
