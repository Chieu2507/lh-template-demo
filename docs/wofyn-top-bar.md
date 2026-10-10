# Wofyn top bar

Branch: `Wofyn-template`, kế thừa Peeko. Figma desktop `47548:10622`, tablet `47548:11659`, mobile `47557:5936` trong file `G7y5fdxzoVS9pDqslTl1Pp`.

## Section Build Plan

- Role/placement: global utility trong `sections/header-group.json`, trước header.
- Context: thông báo vận chuyển, link đến `/collections/all`.
- Ownership: scheme/font family thuộc Theme Settings; cỡ chữ, weight, padding và navigation thuộc Announcement bar; nội dung/link thuộc block.
- Slots: một `discount-code` block; bỏ code và button riêng, dùng rich text có link để kế thừa typography của thông báo.
- Output/runtime: giữ nguyên markup, accessibility và lifecycle `announcement-bar.js` của base; không tạo section hay CSS mới.
- Responsive: Figma cao 41px ở cả ba viewport; desktop/tablet có chevron ở hai mép, mobile không có chevron.
- QA: JSON/schema, diff, preview 1920/768/375px, link và editor reload.

## Mapping

| Figma | Base/config | Chênh lệch |
| --- | --- | --- |
| Navy #201D47 / white | scheme-3 | Không |
| 14px, regular, line-height 1.5 | body/sm, weight400 | Nunito được giữ theo yêu cầu trước đó |
| Padding dọc10px | padding_top/bottom10 | Chiều cao thực tế còn phụ thuộc control của base |
| Free shipping on orders over $100. Shop Now | discount-code/message rich text + anchor | Nội dung/link chỉnh được trong editor |
| Chevron hai mép desktop/tablet; bỏ trên mobile | navigation always/rounded_chevron | Base ẩn control khi chỉ có một thông báo, vẫn chừa48px; không có setting placement/visibility responsive |

Phần navigation/geometry cần bổ sung contract của section; chưa sửa CSS/Liquid/JS. Quy trình `docs/convert-workflow.md` yêu cầu báo chênh lệch và chờ yêu cầu riêng trước khi thêm khả năng styling.

## QA cấu hình hiện tại

- Preview 1920/768/375px: nền rgb(32,29,71), chữ trắng14px/400, line-height21px; link underline. Nội dung rộng288.42px, không overflow ở375px với Nunito.
- Chiều cao thực tế44px ở cả ba viewport (control24px + padding20px), Figma41px. Hai control bị base ẩn khi chỉ có một slide.
- `Shop Now` được kích hoạt bằng Enter và mở đúng trang Products tại `/collections/all`.
- Theme Editor Wofyn sau reload hiển thị đúng block/message/link và settings Small/400/Body; nội dung chỉnh được qua rich text. Không ghi đè phiên editor cũ có thông báo restore unsaved changes.
- Watcher xác nhận upload header-group; Theme Check không có errors (36 warnings toàn repo); `git diff --check` pass.
- Proof: `/private/tmp/wofyn-top-bar-desktop.jpg`, `/private/tmp/wofyn-top-bar-mobile.jpg`, `/private/tmp/wofyn-top-bar-editor.jpg`.

Đề xuất bổ sung settings trong Announcement bar: control size để đạt21px, layout edge trong page width, visibility desktop/tablet/mobile và chế độ hiện disabled controls với một slide. Chờ yêu cầu riêng; chưa coi top bar đã khớp hoàn toàn.
