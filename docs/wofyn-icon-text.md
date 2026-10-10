# Wofyn icon with text

## Section Build Plan

- Branch/base: `Wofyn-template`; kernel `icon-text-cards` hiện có, instance `peekoo_icon_text` dưới slideshow.
- Role/placement: dải bốn lợi ích trên homepage trong index.
- Figma: desktop47155:13138, tablet47548:11672, mobile47557:5949; nềnFAF1EC, padding48px, cao152px.
- Context: bốn SVG Figma, heading/body tĩnh chỉnh được trong editor; không cần resource thương mại.
- Ownership: Theme Settings sở hữu scheme4/fonts; section sở hữu carousel/columns/gaps/padding; Group sở hữu card ngang và ô icon màu; Heading/Text/Icon sở hữu nội dung.
- Slots: bỏ heading section Peeko; bốn Group card gồm Group icon và Group text(Heading+Text).
- Output/runtime: giữ Liquid/CSS/icon-text-cards.js của base; carousel cho swipe tablet/mobile, desktop4cột; không thêm CSS.
- Responsive: card320px Figma, gap40desktop/48tablet/mobile; ô56px, icon24px; contentgap6px. Không có navigation/pagination trong Figma.
- QA: schemas/settings, SVG load/geometry, desktop/tablet/mobile, swipe, editor reload.

## Mapping và giới hạn

| Thiết kế | Cấu hình hiện có | Chênh lệch |
| --- | --- | --- |
| NềnFAF1EC, navy201D47, padding48 | scheme4, section padding48 | Không |
| Ô màu56px/radius8, icon24 | Group padding16/radius8/background + Icon24/Custom SVG | Digestion asset18.288×24 nằm giữa khung24 |
| H5 18px/body14, gap6 | Heading/sm, Text/sm, Groupgap6 | Giữ Nunito theo yêu cầu trước |
| Card ngang gap16 | Group horizontal, center/left | Không |
| Card320px và container1400 | carousel4/2/1cột theo viewport | Base container1400 gồm padding; card co giãn theo cột, không có fixed320 setting |
| Auto slide left to right tablet/mobile | Carousel swipe hiện có | Không có autoplay/direction setting; cần yêu cầu riêng bổ sung base, chưa sửa JS/CSS |

Assets Shopify: wofyn-human-grade.svg, wofyn-easy-feed.svg, wofyn-digestion.svg, wofyn-transition.svg; upload trực tiếp SVG Figma vào đúng store LayoutHub, giữ artwork gốc.

## QA

- SVG local nonempty2680/1513/1688/3242bytes; root24×24,24×24,18.2898×24,24×24. Icon Custom SVG có viewport24×24 giữ tỷ lệ artwork; Digestion mở rộng viewBox đối xứng, không sửa paths; ô56×56/radius8 với đúng bốn màuFigma.
- Preview1920/768/375: section152px, padding48; card296/330/343px (Figma320), heading18px/body14px với Nunito. Nềnrgb(250,241,236), không overflow trang mobile.
- Vuốt mobile đã chuyển từ Human-Grade sang Easy to Feed; các card còn lại tiếp tục trong carousel. Không tự chạy do base chưa có contract.
- Theme Editor Wofyn sau reload hiển thị Carousel/Scheme4/padding48 và các Group editable; watcher upload thành công.
- Theme Check0errors/36warnings toàn repo; git diff--check pass. Chỉ cấu hình instance trong index, không sửa CSS/Liquid/JS.
- Proof đúng section: `/private/tmp/wofyn-icon-text-proof.jpg`, `/private/tmp/wofyn-icon-text-desktop-proof.jpg`.

Phần auto-slide theo Figma và fixed card320px còn chờ yêu cầu bổ sung base theo build-base/convert-workflow; chưa coi là khớp hoàn toàn.

- Theo yêu cầu: cả bốn leaf block chuyển từ Image sang Icon, Source Custom SVG; markup SVG lưu trực tiếp trong setting custom_icon. Ô nền Group và padding giữ nguyên.
- QA sau chuyển Icon: desktop/mobile render đủ4 SVG24×24, ô56×56, section152px. Editor chọn được Icon, Source Custom, markup SVG và width24. Theme Check0errors/36warnings; watcher upload index thành công. Proof: /private/tmp/wofyn-icon-custom-desktop.jpg.

- Sửa lỗi renderer ép stroke currentColor lên Custom SVG: class icon-renderer--custom loại custom khỏi rule stroke dùng chung. Artwork giữ nguyên fill/stroke, icon library vẫn currentColor. Preview xác nhận4 SVG stroke none và đúng fill Figma; Theme Check0errors/36warnings. Proof /private/tmp/wofyn-icon-stroke-fixed.jpg.

## Padding audit — 2026-10-09

- Đọc lại Figma desktop `47155:13138`, tablet `47548:11672`, mobile `47557:5949`: Top/Bottom đều 48px, section cao 152px. Container nội dung desktop 1400px tại x260 trên viewport1920; tablet x30 trên768; mobile x16 trên375.
- Preview trước sửa: Top/Bottom48px đúng; desktop card đầu x308 và card296px do `.page-width` tính cả padding-inline48px vào max-width1400px. Tablet x30/mobile x16 đúng. Ghi chú QA cũ về desktop không phản ánh độ lệch này.
- Sửa trong CSS sở hữu Icon text cards: container Page width dùng max-width hiện có cho nội dung, trừ hai page margins khỏi chiều rộng viewport và bỏ padding-inline bên trong. Giá trị vẫn theo Theme settings; không dùng Custom CSS hay số đo hard-code. Full width và Full width (No padding) giữ hợp đồng hiện có.
- Bản sửa local; chưa upload/kiểm tra sau sửa trên Shopify. Padding section và thiết lập mobile giữ nguyên.

## Editor background fix
Resolve the outer Shopify section background directly from Background color, then the selected color scheme background, with the existing CSS token fallback. This avoids depending on the global :has selector when the editor refreshes a section. Existing content, scheme settings and custom background/image behavior preserved. Reopened editor with hr=9294 (previously hr=9292); scheme 4 now visibly renders its beige background. Editor remains saved with the prior-session restore prompt untouched. Theme Check 0 errors / 36 warnings; diff check passed. Proof: /private/tmp/wofyn-icon-background-editor.jpg.

Auto rotate extension: section owns checkbox + delay2–10s; Wofyn enabled4s. Existing Swiper/shared autoplay reused; mobile-only interval, rewind last→first, pause on focus/hover/hidden page, reduced motion, selected editor block. Cleanup interval and media listeners on unload; desktop/tablet remain static.

QA auto rotate: Theme Check0errors; JS syntax/diff check pass. Live mobile375px dataset true/4s, active card advances from0 to2 and wraps to1 over elapsed time. Screenshot /private/tmp/wofyn-icon-auto-rotate.jpg. Editor selection/unload behavior implemented, interactive editor QA unavailable with Chrome disconnected.
