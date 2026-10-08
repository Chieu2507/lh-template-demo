# Collection tab Promo cards

Collection tabs now allow dynamic Promo card children inside each Collection tab.
The tab owns its collection; the section still owns list geometry. Static Product
card IDs and saved collections are preserved. No default Promo is added to the
template. Each tab captures its own dynamic stream and reuses the Product list
slot snippet, with boundary clamping and stable tie ordering. Promo card owns the
shared item/mobile host CSS so it also works without a Product list instance.

The existing Promo controller now scopes independently to Product lists and
Collection tab panels. Mobile top moves the same node within its own tab, and
restores the slot at desktop. Tab layout's existing editor selection controller
activates the containing tab; the Promo controller reveals an off-screen card
without moving a visible card to the left edge.

Validation: 9 tests pass, covering grid/carousel insertion, tab isolation, slot
boundaries, mobile restoration, selection visibility and unload cleanup. JS
syntax and git diff whitespace checks pass. Theme Check: 0 errors. Scoped CSS
warnings reflect the shared Promo stylesheet and the existing tab navigation
class; no new per-tab token or duplicated CSS implementation was introduced.

Live draft 192108396843 QA: Add block lists Promo card; adding a card, changing
position to 2, grid/carousel rendering, mobile top, selecting another tab and
selecting Promo to return to its owning tab, and removing the test block pass.
Test composition was removed and original grid restored without saving it.
Only the supporting Liquid/JS files were uploaded; no template change or publish.
Proof screenshot: /private/tmp/peekoo-tabs-promo-desktop.jpg.

Picker cleanup: Product list and Collection tab allow only dynamic Promo cards.
Product card remains a literal static child and in static presets, so merchant
product appearance settings are preserved without exposing an Add block option.
Promo card preset has no category. Theme Check: 0 errors. Draft upload accepted.
Live Product list picker shows only Promo card without a category header.
Proof: /private/tmp/peekoo-add-block-picker.jpg.

Animation: Promo card is part of the shared product-card entrance scan. The
card itself animates; its Swiper layout wrapper remains untouched. Mobile-top
Promo hosts own their own stagger row. Global animation disabling and reduced
motion remain authoritative. 14 targeted tests pass. Live draft confirms
slide-bottom for Promo plus products, stagger delays 180/320/460/600ms.
Cross-branch synchronization was paused before applying or committing patches.
