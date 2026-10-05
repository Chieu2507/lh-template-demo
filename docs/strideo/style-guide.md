# Strideo style guide

Source: Figma aYEcYZ49ACT2yTfaIKRacc, Style Guide 43001:11865. User-supplied typography/color tables take precedence over older sample values in the same Figma page.

## Typography

Instrument Sans: heading600, body400, accent500. Normal font style.

| Role | Desktop | Tablet | Mobile | Leading | Tracking |
| --- | --- | --- | --- | --- | --- |
| H1 |72|60|48|120%|0|
| H2 |44|36|32|120%|0|
| H3 |32|30|28|130%|0|
| H4 |26|26|24|140%|0|
| H5 |20|20|18|150%|0|
| H6 |18|18|16|150%|0|
| Eyebrow/p3 |14|14|14|150%|0.12em (1.68px)|
| Body |16/14/12|16/14/12|16/14/12|150%|0|

H6 follows the user's existing H5 minus2px rule. Eyebrow uses weight500.

## Schemes

| Scheme | Background | Heading/text | Border | Bar | Component |
| --- | --- | --- | --- | --- | --- |
|1|#FFFFFF|#1A1A1A|#E6E6E6|#E6E6E6|#F2F2F2|
|2|#F5F6F7|#1A1A1A|#E6E6E6|#E6E6E6|#F2F2F2|
|3|#1A1A1A|#FFFFFF|white20%|white50%|#808080|
|4|#F2FF4F|#1A1A1A|#E6E6E6|#E6E6E6|#FDFFE5|
|5|#1A1A1A|#F2FF4F|white20%|white10%|white5%|

Overlay black20% in each scheme. New semantic scheme settings map to overlay utility, component surface and progress bar primitives. Existing explicit local overlay overrides remain authoritative.

Buttons:16px/500/150%, height48px, inline padding24px, pill. Light primary dark/white, dark primary white/dark. Dark secondary #F0FF2D/dark from Figma; light secondary #F6F6F6/dark, scheme2 transparent to match the bare label. Tertiary underlined with3px offset. Existing outline hover contract retained with Strideo foreground colors because no hover table was supplied.

Badges:14px/500/150%,0.01em tracking,padding4px12px,pill; sale #DD2F2E/white, sold out #ADADAD/white, New/Bestseller white/#1A1A1A.

## Verification

Uploaded only style-guide files to Strideo-template (chieutt), theme191953273131. Storefront confirms actual Instrument Sans loaded, heading600, all heading sizes at desktop/tablet/mobile, eyebrow1.68px, button16px/500/24px line-height and48px height. No horizontal overflow at375px. Theme Check0errors/35existing warnings; git diff whitespace passed. Editor session was denied access by the currently signed-in browser account; settings save/reload UI validation remains unavailable. CLI upload and storefront verification succeeded.

Preview screenshot: output/strideo-style-guide/preview.png.
