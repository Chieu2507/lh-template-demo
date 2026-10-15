# Aike header and footer

Scope: existing header/footer section groups and Theme Settings on `Aike-template`. No section, block, Liquid, schema, CSS or JS implementation files were added or changed for this request. Earlier style-guide edits to settings_schema and css-variables remain separate existing work.

## Sources and resources

Figma file `9770x6Fo149ZeyWbvWwjk2`: desktop top bar `47608:14595`, header `47608:14624`, footer `47608:14678`; mobile header `47608:16638`, footer `47608:20829`.

Target: unpublished Aike theme `192377422123`, store `layouthub-template-v2.myshopify.com`, existing preview port 9295. Live Kyvex was not changed.

Logo: exact Figma PNG (200×92, transparency retained), converted losslessly to WebP before upload. Shopify MediaImage `46646540697899`, `shopify://shop_images/aike-logo.webp`. Both header/footer render at 100×46px. Preview verifies loaded logo in both positions.

Created separate Shopify navigation menu `aike-main-menu`, ID `323725164843`. Main and search category menus use it; other templates' menus were not changed. Furniture categories currently use working product-search destinations until the Aike catalog exists. Bestsellers uses the all-products sort. Sale uses ascending price, pending a real sale collection. Careers currently links to Contact; page/content assignments need catalog/content setup.

## Composition

- Header: existing Announcement bar (single static shipping message), Header two-row kernel, search bar/category picker, location, account/cart and menu. Light scheme; bottom separator; 20px desktop main padding and 24px icons. Keep native mobile drawer and its Sign In/localization controls.
- Footer: existing Footer with Group, Logo, Heading, Email signup, Text, Social links, Menu, Divider, Localization and Payment icons. Newsletter left, About/Shop/Help right; credits/policies/payment row below. Scheme 2; 64px desktop and 56px mobile outer padding.
- Social links use global settings and native icons. User authorized platform roots: https://facebook.com/, https://x.com/, https://tiktok.com/, https://instagram.com/.
- Existing page-width contract requires max_page_width=1680 to yield 1600px usable content at 1920px (40px inner margins). Global input radius is Pill as in the design.

## Known limits under the settings-only constraint

- Top bar social icons remain unavailable under the original settings-only scope. Localization was added in the follow-up below. The current announcement text block cannot link/underline only Shop Now.
- Desktop menu aligns to the start; no menu-centering setting. Search grid proportions differ from Figma. Sale has inherited menu ink; no per-link color control.
- Native header icons are retained. Base hides the mobile account icon and exposes Sign In in the drawer.
- Footer tablet inherits horizontal Groups, unlike the stacked Figma layout. At 768px the email input is narrow and credits wrap. Correct tablet stacking requires a base layout capability beyond the current settings.
- Social links retain the base icon artwork/order rather than Figma's order. Payment icons follow the store's enabled payment types.
- No Custom CSS, forced inline overrides, or duplicated responsive markup was introduced to bypass these limits.

## QA 2026-10-15

PASS: Shopify accepted both group JSON files and settings; live preview contains Aike menu, loaded logo, newsletter, About/Shop/Help, policy links and payment icons. Mobile menu drawer opens and closes; About accordion expands/collapses and exposes its links. Social URLs match requested roots. Header/footer surface measurements do not overflow at 375/767/768/1149/1150/1920px. Viewport override reset. Footer desktop height measured 512px vs Figma 511px before mobile spacing refinement.

PASS: saved section/block settings match their actual schemas (select/range/known-ID audit); existing theme-settings tests 5/5; git diff --check. Theme Check zero errors, 96 inherited warnings.

NOT TESTED: newsletter submission (avoids creating a subscriber), complete keyboard/focus matrix, resource destination content, full Theme Editor add/remove/duplicate/reorder/save round trip. Browser's current Shopify account lacks store permissions, so editor QA could not be completed; storefront/CLI synchronization still works.

Preview watcher remains running at the user's request. No commit, Git push or theme publication.

## Category popover follow-up

User requested replacing the search category popup with an anchored popover. Updated existing `_header-search` block and `assets/header.js`; no new section/block/asset files. Uses native `popover="auto"` and declarative `popovertarget`, shared scheme/list styling, and viewport-clamped positioning. Removes modal shell, backdrop and scroll lock for category selection on both desktop/mobile. Selection keeps the existing product_type query behavior, updates visible/accessibility labels, closes the popover and restores trigger focus. Open positioning updates on resize/scroll; section unload closes its owned popover.

PASS: desktop open anchored 8px below button; Esc dismisses and restores focus, selecting Living Room updates label and closes, clicking search input outside dismisses. Mobile 375px popover is below its button, stays within viewport and body overflow remains visible; no aria-modal. Browser viewport reset. JS syntax, three existing header search submission regressions, git diff --check and Theme Check pass (0 errors/96 warnings). Theme Editor reload lifecycle remains untested because of browser account permissions.

## Top bar localization follow-up

Reused the existing static Localization block in Announcement bar, behind an opt-in section setting (default false); enabled for Aike. Country flag/currency and language appear at 768px and above, hidden below 768px. Scoped styles keep the message centered and dropdown panels below the top bar, above the header; the shared localization interactions and Shopify forms remain unchanged. No new section, block or CSS asset files.

PASS: Shopify accepted section/schema/group; desktop 1920px and tablet 768px show both controls with no message overlap; mobile 375px hides the whole localization wrapper. English dropdown visibly renders English/français below its trigger. Viewport reset.

## Menu underline clipping fix

The shared underline was present but clipped by the header-bottom horizontal scroll viewport (28px tall; underline extended 2px below it). Added 0.25em block padding with matching negative margins to that existing viewport, preserving header spacing and shared hover/focus animation. No new assets or schema changes.

PASS: keyboard focus shows the complete underline; measured label/underline now fits within the 36px scroll viewport, with no vertical scrolling. Desktop 1920/1150px verified; mobile 375px has no horizontal page overflow. Viewport reset. Theme Check: 0 errors; git diff --check passes. Editor lifecycle not retested (CSS-only change).

## Search / bottom header follow-up

User chose to collapse the bottom header row during Search, using the existing sticky collapse motion. `_header-bottom.liquid` consumes the existing `header--search-open` state: translate upward, fade out, disable pointer interaction, and hide visibility to remove menu links from keyboard navigation. Closing search clears that class and restores the menu while preserving the independent sticky `data-collapsed` state. No new CSS assets, blocks, sections, settings or JS listeners.

Applied identical narrow fix in Aike checkout, Kyvex checkout `/private/tmp/lh-kyvex-search-collapse`, and existing Torvex checkout `/Users/chieutrinh/.codex/worktrees/torvex-settings/lh-template-demo`. Kyvex/Torvex remote file baselines matched their branch before modification. Uploaded only `blocks/_header-bottom.liquid` to Aike 192377422123, Kyvex 192328302891 (existing live theme), Torvex 192249102635. Other theme files/settings not uploaded.

PASS: Aike desktop search input is hit-testable at the previously obscured location; bottom row reaches opacity 0 / visibility hidden; results load; Escape closes search and returns bottom row to opacity 1 / visibility visible. Mobile 375px search works with no page overflow. Viewport reset. Theme Check passes with 0 errors on all three checkouts; diff whitespace checks pass. NOT TESTED: direct Kyvex/Torvex browser runtime (store password gate), Theme Editor lifecycle (CSS-only change). No Git commit or push.

## Remove compact settings

Removed the redundant compact customization checkbox and three ranges from the existing Top block schema, their Liquid variables, and Aike saved group settings. Below the existing 992px drawer breakpoint, padding now consumes mobile padding (or desktop fallback when Customize for mobile is off) and row gap consumes Mobile row gap. Desktop layout is unchanged. Applied to Aike only in this follow-up.

PASS: preview measured 800px and 375px both padding 12px/16px and row gap 16px; 1920px retains desktop 20px/8px and row gap 20px. Viewport reset. Theme Check 0 errors; diff whitespace check passes; Shopify accepted schema and JSON. Theme Editor account limitation remains.

## Sticky Top separator

Added the existing Bottom separator vocabulary (None/Line/Shadow) to two-row Top, default None; Aike selects Line. Existing sticky pin calculation now publishes `header--is-pinned`; separator renders only in that state, rather than merely after a small scroll. Line overlays the full-width Top edge without changing layout height.

PASS: top-of-page has no separator; pinned visible header has a full-width 1px scheme border. JS syntax, Theme Check (0 errors), and diff whitespace pass. Uploaded only Top, header controller, and Aike group settings. Editor lifecycle not retested due account limitation.

## Separator inheritance correction

Top Bottom separator now applies in normal state. While pinned, Top ignores its own setting and inherits the rendered Bottom row's separator (Line/Shadow/None). No rendered Bottom means no sticky separator. Reuses existing Bottom modifier classes; no duplicated state/listeners. Top schema help text updated. Preview verifies normal Top Line and pinned inherited Bottom Line; absent-Bottom and Shadow paths reviewed in selectors but not editor-tested. Theme Check 0 errors; whitespace check passes.

## Top bar social links

Enabled existing Social links block as a static top-bar child behind an opt-in section checkbox. Uses the existing global Facebook/Instagram/TikTok/X platform-root URLs and icon rendering. Desktop/tablet social icons on the left, message centered, localization right; hidden on mobile. Footer existing icons verified with the same links. At 768px measured social ends at x150, message begins x240, localization begins x590; no overlap. Desktop screenshot verified. Viewport reset; Theme Check 0 errors and diff check pass.
