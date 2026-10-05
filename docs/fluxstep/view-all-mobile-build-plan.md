# View all and mobile spacing contract

Role/placement: existing resource content sections in JSON templates.
Context: existing product, collection and blog resources, unchanged.
Ownership: View all blocks own mobile visibility and button appearance; sections own order and spacing. Global button tokens stay shared.
Slots/output/runtime: keep static block IDs, one DOM tree, accessible links and existing collection-tab controllers.
Responsive: desktop layouts retain controls; mobile View all follows the list. Hidden blocks must not leave empty layout gaps. Tablet inherits desktop padding. Slideshow is unchanged.
Migration: pull current draft index, move old section hide value to its View all block, preserve all other merchant data.
QA: Theme Check, JSON/schema checks, desktop alignment, visible/hidden mobile buttons, active tab image alignment, mobile overflow and measured Figma spacing.

## Validation

Uploaded only requested files to unpublished theme 191986827563. Theme Check: zero errors, 35 existing warnings. Desktop Blog action and last card right edges both 1728px at 1920px viewport. Cloud panel and navigation align exactly (736px height each). Mobile 375px: all measured external padding matches the audit; featured View all remains hidden after migrating its saved choice; New arrivals View all is 343px wide, 48px high, below its list; switching tabs retains its correct destination. Desktop/mobile/tablet have no horizontal overflow. Removed legacy New arrivals tablet-only custom CSS so tablet inherits desktop spacing. Shared secondary button appearance continues to follow merchant Theme Settings.
