# Announcement links bar

Role: global promotional/utility surface. Placement: header section group only; add/remove/reorder supported. No product/resource context.
Section owns container, scheme/background, row gap, mobile utility visibility and desktop/mobile padding. Static promotion owns badge/text; static Menu reuses the existing horizontal navigation/link contract. No app slot, duplication of commerce runtime or new JS.
One DOM: promotion left and utility links right at >=768px; mobile centered promotion with configurable utility visibility. Tablet inherits desktop padding. Empty text/badge/links safely collapse; long text wraps without overflow.
Theme values: #333333, 8px desktop/6px mobile vertical padding, badge radius4 Outfit600, 12px message/menu, utility gap24. Legacy Announcement bar remains available.
QA: Theme Check/schema upload, preview 375/767/768/1149/1150/1920; editing and lifecycle recorded separately. Existing footer modifications remain untouched.

Validation: schema upload PASS after uploading the Theme Block before its owning section. Theme Check 0 errors / 40 existing warnings, git diff --check PASS. Preview checked at 375/767/768/1149/1150/1920: heights 34px mobile and 38px desktop/tablet, background #333, badge Outfit600/radius4, mobile support menu hidden, no horizontal overflow. Theme Editor section/block selection, settings visibility, static slot restriction and reload PASS; add/remove/reorder/save interactions NOT TESTED. Static promotion/menu cannot reorder, nested menu links can. No JS added; preview watcher retained by user request.

Literal schema labels for the new section/promotion match the existing header components' English-label convention. Support URLs are editable: /pages/faq, /pages/contact and /policies/refund-policy; final merchant destinations must be verified separately.
