# Fluxstep mobile padding audit

Source: Figma aYEcYZ49ACT2yTfaIKRacc, Mobile 49390:17620. Inspected outer section Properties panel. Spacing variables are four-pixel units, verified against section and inner-container heights (Featured outer 738px, content 610px, top/bottom 16 units = 64px each).

| Section | Node | Top px | Bottom px |
| --- | --- | ---: | ---: |
| Featured collection | 49390:17630 | 64 | 64 |
| Categories | 49390:17640 | 0 | 80 |
| Showcase | 49390:17682 | 64 | 64 |
| New arrivals tabs | 49390:17710 | 64 | 64 |
| Cloud collections tabs | 49390:17720 | 10 | 64 |
| Hero | 49390:17735 | 20 | 64 |
| Blog posts | 49390:17740 | 0 | 56 |
| Divider | 49390:17771 | 10 | 10 |
| Gallery | 49390:17773 | 56 | 64 |

Desktop values retained. No tablet-specific controls. Slideshow retained. This audit concerns section external padding, not card/image dimensions or global page margins.
