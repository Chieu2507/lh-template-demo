# View all mobile parity — Peeko / Perky

Compared with the Flux Step worktree on 2026-10-08.

- Both standard View all and Collection tabs View all now expose **Hide View all on mobile** in the block's Mobile settings. The default is false.
- Featured collection previously had the checkbox on its section and only moved Grid actions below products. Both Grid and Carousel now move the action below products on mobile.
- Saved Featured collection section visibility values were migrated to their View all blocks in each branch's JSON templates. The legacy section value is still read for compatibility with previously saved editor data.
- Blog posts, Featured blog posts, Collection tabs (including horizontal layout), and Featured collection with background now put actions below their lists on mobile.
- Collection list already supports bottom placement. Saved templates using its optional header placement now use after-list placement; the existing section choice remains available.
- Hidden actions remove their containing layout item so there is no empty action gap. Desktop layout and visibility remain unchanged.

Validation:

- Peeko preview at 375 px: Collection tabs and Collection list actions below lists; Featured collection Carousel action 36 px below products after carousel initialization.
- Temporary preview template with all three block toggles enabled: mobile wrappers hidden with zero height; all three buttons remain visible at 1440 px. Temporary template removed afterward.
- 17 related Liquid/rendering and collection promo tests passed.
- Theme Check: Peeko zero errors / 49 warnings; Perky zero errors / 45 warnings. Perky validation used its local worktree; no separate Perky storefront preview was started.
- All 239 Peeko and 235 Perky section/block schemas parse; both worktrees pass git diff --check.

No commit, push, or publish performed.
