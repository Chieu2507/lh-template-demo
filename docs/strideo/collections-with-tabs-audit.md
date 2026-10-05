# Collection list / Collections with tabs — Strideo audit

Design source: Figma aYEcYZ49ACT2yTfaIKRacc. Desktop 49053:7007, tablet 49384:13067, mobile 49390:14169. Audit only; no theme code or Editor state changed.

## Design contract

| Device | Composition | Spacing |
| --- | --- | --- |
| Desktop | Centered Collections eyebrow; 5 collection names between two square images, max 448px each. H1 72px, 8px list gap. Cloud dark, other names #999. | Section 40px top / 144px bottom; eyebrow-to-content 40px; 112px between image/list columns. |
| Tablet | All 5 collections shown as rows. Each row has a 64px square image, H1 60px name, second 64px image. All names dark. | Section 32px top / 128px bottom; header gap 40px; image/text gap 32px; row gap 32px. |
| Mobile | Horizontal image/name cards with next card visible. Square media 252px in a 343px content area; H2 32px under image. | Section 20px top / 112px bottom; header gap 36px; cards gap 16px; image/title gap 16px. |

Global page cap remains 1600px; do not replace it with Figma's 1674px content width. Desktop exact 448 + 491 + 448 + 2×112 = 1611px exceeds this theme's available inner width, so side images must shrink fluidly while preserving square ratio and the central title column. Mobile 252px should be a responsive card-size preset, not a freeform numeric input or a new Mobile card width control. Existing 1/2 columns plus 0.2 preview do not reproduce this Figma width; resolve this explicitly before claiming exact fidelity.

## Existing section suitability

Reuse sections/collections-with-tabs.liquid, blocks/collections-with-tabs-item.liquid, assets/collections-with-tabs.js. This is the image/list section, distinct from sections/collection-tabs.liquid (product collection panels).

Reusable: collection picker/title/image fallback, editable Header, scheme/container, active-item state, arrow-key navigation, instance isolation, section load/unload and block-select events, reduced-motion handling.

Missing: second image per collection, centered three-column desktop layout, tablet row thumbnails, mobile carousel. Existing stylesheet hardcodes Bodoni/serif, italic active state and arbitrary font sizes; map to shared heading tokens. Existing row separators, arrow actions, product count and featured products are absent in this design and should be disabled in the new layout. Existing max-100px gap/padding schemas cannot represent 112px/144px.

Existing pointerdown/click handlers only prevent defaults; they do not explicitly activate on click. Fix touch/click behavior when extending. All panels start hidden in Liquid; provide a useful first-item fallback before JS. Header should sit outside role=tablist. Tablet/mobile show all collections and should use collection links rather than pretending to be a single tabpanel.

## Recommended implementation

Add one reusable Layout selection to Collections with tabs (existing default preserved; new centered image-list composition). Item contract: Collection, optional Title, Image, Secondary image. Use collection image fallback for primary, primary-image fallback for secondary, with placeholders when missing. Assets stay in Shopify image pickers, never theme assets.

Desktop: suggest hover/focus previews both active images; clicking a collection name follows its resource link. This interaction is a proposal inferred from the active/inactive visual states, not a verified Figma prototype. Disable auto-rotate by default for this composition. Tablet: all rows are links with both thumbnails. Mobile: same resources become shared-carousel cards and use primary images. If retaining button tabs on desktop instead, provide a clear collection destination and correct ARIA per layout; do not block click without an action.

Keep one source of collection data; if responsive markup repeats images/labels to express these different presentations, avoid duplicate IDs and hide/inert inactive device surfaces so focus/ARIA do not duplicate. Reuse shared image and carousel kernels; do not create a separate Strideo-only section or hard-code collection names as business logic.

Next implementation gate: confirm the interaction contract and mobile card sizing against the user's existing responsive-control conventions. Then create Section Build Plan and implement/audit all three layouts, long titles, empty resources, editor selection, keyboard/touch, multiple instances and reduced motion.
