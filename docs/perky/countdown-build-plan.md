# Perky countdown timer

- Design: Figma 6HBP12lG9fUcHhgF3Gx057, node 49036:25883.
- Homepage sale conversion beat using existing countdown_timer Hero and 8 editable Group/Heading/Text/Timer/Button blocks. Existing IDs and order preserved.
- User correction: use native Theme Editor options instead of template Custom CSS. Desktop height Medium (720px); mobile Extra small (400px, allowed to grow with content). No per-section CSS overrides.
- Content area Group: Fill + Limit width 570px; Rounded preset; scheme 4; padding 48/64px desktop and 32/24px mobile. Width, radius, scheme and spacing remain controlled by their settings.
- Button: Secondary uses existing scheme 4 pink background and hover/border tokens. No primary-button color override.
- Timer: Colon separators, max width 352px, existing recurring runtime. Existing theme Nunito typography.
- Background: original Figma image uploaded as shopify://shop_images/perky-countdown.jpg; Hero overlay/position/height options retained. Hero picture images now fill their media wrapper, fixing intrinsic-height rendering across layouts without overriding any setting.
- Earlier 568px/32px-radius/630px screenshots describe the superseded CSS override version. Native option values intentionally take precedence over exact Figma measurements per user instruction.
- QA: desktop 1440px and mobile 390px verified with native heights 720/400px, full image coverage, Group width/radius and Secondary button tokens; no horizontal overflow or section Custom CSS. Theme Check: 0 errors, 36 warnings. git diff --check passed. Updated screenshots: output/perky-countdown/native-desktop.jpg and native-mobile.jpg.
