# Fluxstep footer

Design: Figma aYEcYZ49ACT2yTfaIKRacc, desktop 49326:8479 and mobile 49390:17783.

Contract: global navigation surface in footer section group; existing footer shell owns page width, scheme and spacing. Row/Column/Group own composition. Logo/Text/Menu/Social links/Email signup/Localization/Payment icons/Policy links retain their shared implementations. Menu accepts optional editable child links when no menu resource is selected. Choosing a menu resource takes precedence. Newsletter icon-only control preserves the accessible label and falls back to text when Show icon is disabled. Existing defaults remain unchanged.

Desktop: brand, Shop, About, newsletter columns; utility columns underneath. Mobile: brand, collapsed Shop/About, newsletter, localization/copyright, payment/policies. One responsive DOM; existing accordion runtime. Section padding desktop 96/64px, mobile 64/56px; section gap desktop 80px/mobile 48px. No tablet-specific controls.

Validation: local Shopify Theme Check reports no findings for the five changed theme files; JSON settings/options/ranges checked for all 30 blocks; git diff --check passed. External MCP validation was rejected by automatic approval review because it would disclose local theme source. No external validator workaround was used. Storefront and Theme Editor runtime validation have not been run and this footer has not been uploaded.

Pending content: Figma artwork export is unavailable via the connected API; editable FLUXSTEP text is temporary until the actual logo is selected in Theme settings. Social links, policies, localization choices and supported payment types depend on store configuration; global store configuration was not modified. Unverified Women/Men/Kids/Our story/FAQs/Careers destinations are intentionally blank; menu labels remain editable. Contact, Blog and collection index links are configured. The connected Admin reader returned a different catalog from the target theme store, so it was not used to populate destinations.

Scope: footer group, optional logo text, optional email submit icon-only mode, optional menu child links. Concurrent gallery and other parent-task changes were preserved. Footer changes are packaged in a separate local commit. No push or theme upload was performed in this side conversation.
