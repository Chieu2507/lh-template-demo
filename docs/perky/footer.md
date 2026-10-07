# Perky footer composition

Role: global navigation/contact. Placement: existing footer group.
Context: Figma 49065:1316; existing Perky logo, Shopify markets/payments.
Ownership: Theme Settings own palette/page width; footer owns padding/gap; Group owns layout; existing blocks own content.
Slots: Group, Logo, Text, Icon (Heroicons and Social libraries), Menu/Menu link, Divider, Localization, Payment icons. No new block or schema.
Runtime: existing menu/localization controllers; no new JavaScript.
Responsive: stack groups and collapse menus on mobile, retain keyboard controls.
QA: schema constraints, Theme Check, editor, desktop/mobile preview.

Design: scheme-2, 64px outer padding, 56px credits gap, 520px brand limit (nearest supported setting step), three menu columns. Global page width remains 1500px. Perky logo/name replace the reference Peekoo brand. Contact uses Heroicons; brand icons use the shared Social library. Social links are unset until actual destinations are supplied. Cookies Settings is omitted because no cookie-preferences action exists in the current blocks; no dummy control is added. Localization and payment methods reflect the store configuration.

Footer icons no longer use Custom SVG. Icon has a Library selector for Heroicons/Social with separate registries; existing Custom settings elsewhere stay compatible. Icon geometry lives in critical.css. Menu and accordion CSS load synchronously to prevent unstyled disclosure flash on slow connections. Enabled language setting renders the existing localization dropdown/form even with a single published language. Header account/cart use the existing Icon display option.

QA: preview renders English, four 12px social icons and account/cart SVGs; menu/accordion stylesheet links use media=all with no deferred onload. Two Liquid tests cover all social brands, Heroicons, single/multiple language states; Theme Check: 0 errors and 36 existing warnings.
