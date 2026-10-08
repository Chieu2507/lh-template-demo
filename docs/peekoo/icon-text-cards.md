# Icon text cards

Build plan: homepage content section after perky_tinker on Peeko only. Reuse Icon text cards section, Group, Heading, Text and Image kernels. Section owns optional grid composition (4 desktop, 2 tablet, 1 mobile), gaps, background and spacing; editable card Groups own radius24, padding36, nested icon/content gaps24/12; Heading H3 custom visual size20, body16. Editable Heading block owns H2 Play Comes First. Exact Figma: 49022:24324 / 49234:4860 / 49234:5895. User chose existing icons: cube, tag and shopping-bag from the shared library, plus existing perky-lightbulb.svg. No new Files uploads.

Audit: Carousel specialized image-text-card settings leak into unrelated slide compositions; gate editor controls without changing saved values or runtime. Normalize device labels and pagination visibility; preserve IDs. Icon text cards hardcoded Group56/icon24 styles override editable Group sizing, radius, and nested content: remove these imposed values. Existing carousel mode remains supported. QA: schema/range/preset validation, Theme Check, editor controls/grid and storefront desktop/tablet/mobile; no new JavaScript.

## Findings and validation

- P1 fixed: hello-world stylesheet leaked `.icon { width:300px }` into shared library icons. Scoped to `.welcome .icon`; live icon64px now matches saved size.
- P1 fixed: section CSS forced any direct slide Group into56px circle and any icon into24px, ignoring Group settings/content roles. Removed those overrides; existing preset owns icon circle via Group settings.
- P2 fixed: section alignment did not supply inherited text alignment/context. Desktop live H2 text-align:center.
- P2 fixed: image-text-card controls appeared in ordinary Slide Carousel compositions. Added optional editor settings group; values/runtime remain preserved. Labels use HTML Tag and Desktop/Mobile heading/text font size. Heading tag remains handled by existing image-text-card-grid.js, not a dead setting.
- P2 fixed: pagination options visible while Number / total renders separate fraction controls. Standard-mode visibility now matches markup, with Pagination type and Limit pagination width labels.
- Added editable Card grid mode and Heading slot; existing Stacked content + Carousel mode/preset retained. Grid4/2/1 controls and gap32/20/16.
- Platform upload PASS: five scoped files uploaded to unpublished Peeko192108396843. Existing invalid countdown content max_width644 normalized to640 (schema min320 step10), necessary for index upload; no countdown design changes.
- Theme Editor PASS: section/block tree visible; grid4/2/1 settings and editable Group/Heading/Icon/Image children recognized; Desktop columns selection changed3 then restored4; Save disabled when restored. No editor changes saved. Full add/remove/duplicate/reorder/save lifecycle and specialized Carousel toggle interactions NOT TESTED.
- Storefront PASS: desktop1920 section520.8px (design521), cards327x272, padding36, radius24, icons64, headings20/body16. Tablet768 grid344/344, section771.2; mobile375 width343, section1320. Shared heading tokens32tablet/30mobile retained; design metadata fallback heading34 and height764/1308 are not exact matches. Existing temporary icons are user-approved exceptions.
- Responsive PASS:767/768/1149/1150 switch1/2/2/4 columns, no horizontal overflow. Tablet/mobile custom section spacing64/56; no carousel JS in homepage grid.
- git diff --check PASS. Earlier full Theme Check0 errors. Final changed-scope Theme Check0 errors; full repository now reports4 out-of-scope errors from concurrent promo-card/product-list work (3 missing button_style locale keys; missing assets/product-list-promos.js). Left those files untouched.
- Screenshot: /private/tmp/peekoo-icon-cards-desktop.jpg.
- Overall PASS WITH FOLLOW-UPS: full editor lifecycle not exercised; temporary library icons and global responsive typography accepted as above. No Git commit/push or other branch changes.

Follow-up plan: reorder Section / Layout / Gap controls, preserving IDs. Add section Carousel mode using existing Group cards; retain Heading outside slides. Small DOM adapter wraps Group cards inside shared Swiper viewport, shared factory owns navigation/overflow and pagination modules. JS loader handles section initialization; scoped unload restores nodes/destroys instance; block selection activates containing slide. Grid remains current homepage layout. QA temporary Carousel3/2/1 with4 cards to ensure controls work, then restore Grid4/2/1.


## Section Carousel follow-up validation

- Section / Layout / Gap settings reordered with existing IDs preserved. Desktop columns only2–6. Navigation and Pagination controls conditional on Carousel; device visibility independent.
- Shared Swiper factory / Pagination module used; Group cards wrapped as slides, Heading remains outside. Section unload restores source nodes; block selection reveals containing slide.
- Preview192108396843 scoped code/locale upload PASS. Temporary remote index Carousel3/2/1 test PASS; exact original remote index restored, Grid class confirmed. Local index was not changed for QA.
- Desktop navigation Next moves wrapper -478.667px, marks second bullet, disables Next at end. First bullet restores0px. Buttons have localized Go to slide labels. Console errors none during initialization.
- Mobile375: viewport343px, slide343px,4bullets. Tablet768: viewport708px, slide344px, gap20px,3bullets. Desktop3column preview screenshot /private/tmp/peekoo-icon-cards-carousel.jpg.
- Full Theme Check0errors; no Icon text cards offenses. JavaScript syntax and git diff --check pass. Full editor add/remove/duplicate/reorder lifecycle remains untested.
- Initial temporary upload from local index rejected by Shopify due out-of-scope max_width value; recovered using current remote index snapshot. No unrelated configuration changes.

- Theme Editor verified Section→Layout→Gap ordering; desktop choices2/3/4/5/6. Switching to Carousel reveals Navigation and Pagination groups, all visibility toggles default enabled, Bullets/Progress bar present. Trial controls not saved. Nested storefront iframe DOM was unavailable for inspecting Progress bar runtime.


## Featured collection navigation/pagination parity

- Reused product-list schema Navigation and Pagination groups (same labels, options, defaults and visibility); retained show_navigation_on_desktop/show_pagination_on_desktop IDs. Removed separate mobile visibility controls to match Featured collection: navigation desktop only, pagination master switch for both devices.
- Shared swiper-navigation renderer supports Inside/Outside/Top/Bottom, Primary/Secondary/Outline/Icon only, Chevron/Arrow/Long arrow, Hover/Always. Shared control binding and hover rules unchanged. Top controls placed before viewport; Bottom footer shares row with pagination. Reserved space for Bottom without pagination.
- Pagination Progress bar/Bullets, Standard/Thin, desktop/mobile top padding, Limit width/Max width bound to shared CSS tokens.
- Live temporary Bottom/Icon only/Arrow/Always + Thin progressbar60/40 PASS: desktop progress2px and spacing60px; Next changes wrapper -478.667px and fill scale1; mobile375 navigation hidden, pagination spacing40px, slide343px.
- Original remote Grid homepage restored and confirmed. Scoped section/JS uploaded only to unpublished Peeko192108396843. Theme Check0errors, JS syntax and diff check pass. Other position/style permutations and complete editor lifecycle NOT TESTED.

## Collection list control parity — 2026-10-08

- P2 fixed: Icon text cards pagination now uses the shared `swiper-pagination` snippet. Progress track uses body color at 20%, bullet inactive color uses body color at 30% and full opacity, and active pagination uses body color, matching Collection list instead of Swiper's default blue or the separate Background bar token.
- Active bullets remain circular at 8px, matching the existing Peeko Collection list custom CSS rather than the shared 32px active pill.
- Top navigation uses Collection list's 48px size and respects the saved Hover/Always behavior; the behavior setting remains available at Top. Inside/Outside use the same shared button renderer, scheme variant tokens, disabled states and control factory. Existing Bottom layout is preserved.
- Scope: section Liquid/CSS only; settings IDs, block composition, saved homepage Grid layout, section appearance/padding, and carousel lifecycle remain intact.
- Validation PASS: full Theme Check 0 errors, schema JSON and unique IDs, JavaScript syntax, git diff --check.
- Storefront and Theme Editor runtime QA NOT TESTED: existing local preview on 9292 refused connections. Existing editor has unsaved changes, which were preserved. No upload, commit, push, or preview watcher started. Temporary QA template removed.

## Appearance / section padding normalization — 2026-10-08

- Appearance retains Color scheme → Background color → Background image, followed by the final Section padding group with only Top padding and Bottom padding.
- Removed section-level mobile padding controls and migrated only the active Icon text cards instance's obsolete values. Desktop 80px now scales to tablet 60px and mobile 40px through stylesheet rules. No merchant Custom CSS.
- Effective background is painted once on the Shopify wrapper: blank override follows the selected scheme; an explicit color changes only background. Inner spacing stays transparent to avoid double-compositing alpha colors.
- Runtime PASS: padding 40/60/60/80px at 767/768/1149/1150; Icon text cards and its content have no horizontal overflow. Full homepage showed transient overflow at tablet during viewport changes outside this section; no unrelated sections changed.
- Background PASS on isolated QA instance: scheme 2 blank background resolves #F8FAFA on the wrapper; rgba(120,80,40,.5) override stays alpha .5, inner background transparent, and scheme body token #626262 remains active.
- Theme Editor PASS: fresh editor shows Appearance controls and only Top/Bottom padding 80px, without mobile padding controls. Full editor composition lifecycle NOT TESTED; no block or lifecycle changes.
- Temporary local QA template removed. Development watcher remains active on 9292 at the user's request.

## Authoritative padding correction — 2026-10-08

The user's subsequent screenshot supersedes the prior automatic-scaling normalization. Padding uses Top / Bottom / Customize for mobile / Top (mobile) / Bottom (mobile); tablet inherits desktop unchanged. Original mobile customization 56px restored. Runtime at 767/768/1149/1150 is 56/80/80/80px. See section-padding-audit-2026-10-08.md for the full repository audit and remaining discrepancies.
