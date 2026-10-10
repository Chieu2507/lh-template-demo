# Wofyn Scrolling text

Section Build Plan: existing scrolling_text/text-marquee-custom content section after Flash Sale. Reuse Marquee → Marquee item → Text/Icon kernels. No new markup/schema or Custom CSS. Section owns full width, scheme3/navy201D47, padding16/16 desktop/mobile. Marquee owns gap40 both sizes, existing speed1 and direction forward (rightward keyframes = left to right). Text item owns16px horizontal padding; Text owns14px sm body typography, uppercase saved content “PAWVERA REPEAT EVERYTHING YOUR PET NEEDS”, inherits white. Icon item owns custom Figma heart SVG20×20, no extra padding. Five editable text/icon pairs repeat through existing marquee runtime.

Design source read in browser Dev Mode: section47155:13346, Container13347 gap40, wrapper13348 padding0 16, text13349 Mulish14/500 line-height150%, SVG13350 copied from visible Inspect source. Mobile root audit section47557:6034 height53/padding16; same flow. Nunito retained per user; Text base weight400 differs from Figma500. Existing speed retained because Figma only annotates left-to-right, no exact velocity. Runtime uses existing duplicated tracks/editor lifecycle/reduced-motion support.

QA: scoped JSON equality, schema coverage, Theme Check, desktop/mobile height53px, heart20px, text14px, gap40, moving transform in correct direction, no page overflow. No Git commit/push.

Verified local preview at 1280px and 375px: section height53, mobile document width375 (no overflow), text14, icon20, background rgb(32,29,71), marquee-scroll-right transform advances rightward. Theme Check: 0 errors, 36 existing warnings. git diff --check passed. Proof: /private/tmp/wofyn-scrolling-text.jpg.
