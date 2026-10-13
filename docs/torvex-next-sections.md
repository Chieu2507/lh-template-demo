# Torvex sections 4–8 build plan

Role/placement: five content sections appended after the first three in index.json.
Context: Figma static promo imagery; existing shoe collections for product demos, as authorized in this chat.
Ownership: reuse Marquee leaves, Promo card + Group copy, Collection tabs + Product card, Image card + Group, and Product list inline + shared product-card-inline.
Slots: merchant-managed marquee items and promo/image cards; existing static Header/Tab layout/Tab action; new Featured collection inline shell with Header and inline collection groups.
Runtime: existing marquee, tabs, carousel and quick-add controllers. New inline section requires no separate controller.
Responsive: use supported desktop/tablet columns and mobile stacking, canonical padding inheritance, settings-driven gaps/ratios/radius. No template Custom CSS.
QA: schema and saved values, Theme Check, Theme Editor children/settings, desktop/mobile rendering and interactive tabs. No new test files retained, per user preference.

Implemented: sections 4–8 are enabled after New Arrivals. Reused all existing content/card kernels; new featured-collection-inline is a composition shell. Added generic card placement, custom image-card heights/mobile radius, optional live inventory, and inline layout controls. Restored Tertiary hover underline while preserving the persistent-underline theme option.
Storefront QA PASS: 1920px and 375px; marquee heights 208/144px, promo card placement and mobile 343×229px, banner heights 260/200px, inline 4×2 desktop/single-column mobile, tab collection changes and View all URLs. Mobile carousel cards are 212px. Hover pseudo-element verified from scaleX(0) to scaleX(1).
Responsive QA PASS for MainContent at 767/768/1149/1150px after removing doubled outside-navigation offsets. Existing header overflow remains at 1149/1150px (document widths 1206/1226px); unchanged, separate from this section scope.
Theme Editor QA PASS: all five section names visible; inline Header/View all/Product list children selectable; layout, appearance, padding and inline card controls present. Add/remove/duplicate and padding toggle lifecycle NOT TESTED in this pass.
Validation: Theme Check 0 errors (45 warnings, including schema-count/complexity warnings); git diff --check and resource-view-all JS syntax PASS. Uploaded only to draft theme 192249102635. Preview 9293 restarted; current watcher kept for user review.
Demo products are existing shoe collections. Reviews render only with real data; availability uses actual tracked inventory. Tablet follows existing supported layout/desktop padding rather than a separate Figma-only override.
