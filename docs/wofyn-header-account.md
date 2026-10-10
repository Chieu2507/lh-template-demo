# Header Account width

## Scoped build plan
Utility block in Header section group; Shopify owns authentication and the Account modal. Existing _header-account owns trigger presentation. Reuse deferred hydration and native Shopify dialog; no schema or JavaScript changes. Reset the exposed signed-out-avatar part minimum width and inherit typography so hydration preserves trigger size for icon/text modes. Scope Wofyn-template only. QA: compare trigger before/after hydration and reopen, modal close/Escape, Theme Check and diff.

## Evidence
Before hydration: link width20px / height48px. After click: shopify-account width43.953px, internal button min-width43.96px. Slotted avatar remains20px. Native modal itself renders normally.

## QA
PASS: targeted upload to theme192149684523. Restarted existing port9294 watcher with _header-account included (session76228); old watcher stopped.
PASS: after hydration trigger width20px / height48px, internal min-width0px, font16px. Native modal width360px. Close/reopen retains width20px and modal opens successfully.
PASS: Theme Check477 files,0 errors,104 existing warnings; git diff --check.
NOT TESTED: signed-in avatar, text/icon-with-text variants, mobile menu Account (separate owning block), Theme Editor lifecycle. No schema or JS changed.
Proof: /tmp/wofyn-account-fixed.png. Wofyn branch only; no Git commit/push.
