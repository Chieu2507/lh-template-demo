# Wofyn slideshow

## Section Build Plan

- Branch/base: `Wofyn-template`, các kernel kế thừa Peeko trên nhánh hiện tại.
- Role/placement: hero nội dung đầu homepage, instance `slideshow` trong index.
- Figma: desktop `47155:13127`, tablet `47548:11661`, mobile `47557:5938`; cả ba cao750px.
- Context: ảnh chó/bát thức ăn từ Figma, heading và CTA Discover Now đến `/collections/all`.
- Ownership: Theme Settings sở hữu typography/scheme/button; section sở hữu height/container/runtime; slide sở hữu media/overlay/content-position; Group sở hữu gap/alignment.
- Slots: một slide được cung cấp thiết kế, gồm Heading + Button trong Group; bỏ eyebrow/description/slide Peeko thừa.
- Output/runtime: giữ Liquid và slideshow.js, không thêm Custom CSS; responsive image eager/high cho hero đầu trang.
- Responsive: content trái/căn giữa chiều dọc, gap40px, overlayđen10%, crop cover; mobile kế thừa ảnh gốc.
- QA: schema/JSON, desktop1920/tablet768/mobile375, asset nonempty/geometry, CTA keyboard, editor reload.

## Mapping và chênh lệch đã biết

| Figma | Cấu hình base | Giới hạn |
| --- | --- | --- |
| 750px cả ba màn hình | custom desktop/mobile750, tablet kế thừa | Không |
| Ảnh381e4.png | image picker `wofyn-slideshow-dog-food.png` | Crop cần đối chiếu preview |
| Column512px, trái, gap40 | content_max_width512, center_left, Group gap40 | Base page1400 bao gồm padding48px, Figma inner1400 không gồm padding |
| H1 trắng62/46/40 | heading/display + scheme3 | Giữ Nunito theo yêu cầu trước; line wrapping có thể khác |
| Nút vàng Discover Now | Button primary, widthfit, không icon | Giữ font/nút Theme Settings hiện tại |
| Ba thanh pagination50/24/24×4, gap16, bottom40 | bullets của base | Base chưa có settings geometry này; chỉ có thiết kế một slide nên không dựng hai slide giả để tạo pagination |

Asset upload đúng store `layouthub-template-v2.myshopify.com`: MediaImage `46494064509227`, CDN filename `wofyn-slideshow-dog-food.png`. Bản gốc đối chiếu `/private/tmp/wofyn-slideshow-dog-food.png`.

## QA

- Preview1920/768/375: height750px; heading62/46/40px, trắng; content512px desktop/tablet và343px mobile; x308/30/16. Desktop Figma x260: chênh48px do base tính padding trong container.
- CTA cao48px desktop/tablet,44px mobile; Enter mở đúng `/collections/all`.
- Asset load thành công qua image picker/CDN; object-fit cover, desktop img1920×750; mobile crop480×750 từ snippet có sẵn. Crop/responsive image không thêm CSS.
- Nunito làm heading xuống3dòng desktop/mobile thay vì2dòng trong Figma; giữ font theo lựa chọn trước của người dùng.
- Một slide: base ẩn pagination và không auto-rotate; chưa có nội dung hai slide còn lại trong thiết kế. Không dựng slide giả. Geometry thanh pagination50/24/24×4/gap16/bottom40 chưa có setting base.
- Editor Wofyn sau reload hiển thị Standard, custom750 desktop/mobile, tabletcustomoff, một Slide với Group chỉnh được; watcher upload thành công.
- Theme Check:0errors,36warnings toàn repo; diff check pass. Không sửa CSS/Liquid/JS cho slideshow.
- Proof: `/private/tmp/wofyn-slideshow-desktop.jpg`, `/private/tmp/wofyn-slideshow-tablet.jpg`, `/private/tmp/wofyn-slideshow-mobile.jpg`, `/private/tmp/wofyn-slideshow-editor.jpg`.

Chưa xác nhận khớp1:1: container desktop và pagination cần yêu cầu bổ sung base nếu muốn đạt chính xác; typography giữ theo quyết định đã có.

## Bổ sung slide theo yêu cầu

Người dùng yêu cầu thêm hai slide item với ảnh placeholder. Đã thêm `slide-placeholder-2` và `slide-placeholder-3`, giữ content/CTA/layout của slide đầu; ảnh desktop/mobile để trống để dùng `lifestyle-1` placeholder sẵn có của base. Heading hai slide mới dùng h2, slide đầu giữ h1. Slideshow có ba item, pagination và autoplay dùng runtime hiện có; geometry pagination vẫn theo base.

## Ảnh tạo cho hai slide bổ sung

- Tạo bằng built-in image_gen: slide 2 chó Golden Retriever vui chơi ngoài vườn, slide 3 mèo thư giãn trong giường thú cưng. Mỗi slide có ảnh desktop và mobile tạo riêng, chừa vùng tối cho heading trắng.
- Lưu WebP quality 90 trong `output/wofyn-slideshow/`, desktop 2007×784 và mobile 887×1774. Prompt set: `output/wofyn-slideshow/prompts.json`.
- Đã upload bốn WebP vào Files của `layouthub-template-v2.myshopify.com` và gán `image`/`mobile_image` trong `templates/index.json`. Chưa push template lên theme remote ở lượt này.
- JSON parse và `git diff --check` pass; đã kiểm tra trực quan bốn ảnh, chưa kiểm tra ảnh trong storefront.
- Nội dung slide 2: “Make Every Day a Play Day”, CTA “Shop Toys” đến `/collections/toys-wofyn`. Slide 3: “Cozy Beds for Sweet Dreams”, CTA “Shop Beds” đến `/collections/beds-wofyn`. Nội dung được đổi theo ảnh riêng của từng slide trong template local.
