# Torvex footer composition

Source: Figma 47251:2696 desktop and 47251:4289 mobile.

Footer is global, composed in footer-group.json. Main and copyright surfaces are separate instances of the existing Footer section. Groups own layout, alignment, gaps and mobile order; leaf blocks own content and controls. All content remains editable in Theme Editor.

Reuse Menu, Logo, Text, Email signup, Payment icons, Localization and Social links. Shared schema additions support mobile ordering, compact menu spacing, horizontal policy links, initial accordion state, mobile newsletter icon submit, input background and footer surface color. No brand-specific selectors or custom CSS.

Desktop: page width 1680 with 40px margin, three menu columns plus 32% newsletter. Mobile: newsletter, accordion menus, localization, payment icons, social links, copyright and policies. Email input follows Forms radius; submit follows Button radius.

Dependencies: real social URLs and final page/collection/policy mappings. Payment methods and localization use actual shop data. Cookies Settings is currently the privacy-policy cookies anchor; a consent settings dialog is not implemented.

Validation: live draft preview at 9293, accordion interaction, no overflow at 375/767/768/1149/1150/1920, 8 theme/radius tests PASS, Theme Check 0 errors and 40 warnings. Theme Editor lifecycle not tested.
