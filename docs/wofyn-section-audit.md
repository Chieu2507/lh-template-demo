# Audit section Wofyn

Figma: [Wofyn](https://www.figma.com/design/G7y5fdxzoVS9pDqslTl1Pp/?node-id=47614-18265).
Branch: `Wofyn-template`. Base: các kernel hiện có trên nhánh này, kế thừa Peeko.

Đã đọc metadata toàn trang, design context của 18 section desktop và các frame mobile có bố cục đáng chú ý; đối chiếu schema, block và markup của base. Desktop `47155:13037` rộng 1920px, tablet `47548:11658` rộng 768px, mobile `47557:5935` rộng 375px. Ba frame có cùng thứ tự: 18 section nội dung, cộng top bar, header và footer.

## Mapping theo thứ tự Figma

Giữ nghĩa là giữ kernel và dữ liệu section để convert tiếp, không phải đã khớp thiết kế. Các ảnh, nội dung, resource và settings Peeko còn lại sẽ được thay ở bước convert từng section.

| # | Section Figma / desktop node | Kernel base / instance hiện tại | Quyết định và cấu hình cần làm |
| --- | --- | --- | --- |
| 1 | Slideshow — Where Happy Pets Begin Every Day (`47155:13127`) | `slideshow` / `slideshow` | Giữ. Một hero ảnh, heading và CTA; base có chiều cao custom, crop desktop/mobile, vị trí nội dung và pagination. Bỏ các slide thừa khi convert. |
| 2 | Icon with text — 4 lợi ích (`47155:13138`) | `icon-text-cards` / `peekoo_icon_text` | Giữ. 4 Group gồm icon + heading + text; desktop 4 cột, tablet/mobile strip tràn ngang/carousel. Cần đối chiếu độ rộng card và overflow khi convert. |
| 3 | Rich text — Pets are part of our lives (`47155:13171`) | `rich-text` chưa có trong index | Thêm sau bằng kernel sẵn có. Text căn giữa, giới hạn chiều rộng, padding responsive. |
| 4 | Collection list — Walks, Bowls, Beds, Toys, Foods (`47155:13174`) | `collection-list` / `perky_age_collections` | Giữ. `collection-list-items` + `collection-card`: 5 cột, ảnh vuông, nội dung dưới ảnh, radius16, carousel mobile. Resource collections cần thay sang dữ liệu Wofyn; nền riêng vùng nhãn cần kiểm tra khi cấu hình. |
| 5 | Featured collection — Top Picks (`47155:13196`) | `featured-collection` / `peekoo_featured_07` | Giữ. Header + View all + Product list, 4 sản phẩm desktop và carousel mobile. Product-card cần đổi layout/alignment/padding/shadow/review/radius qua setting hiện có; review phụ thuộc dữ liệu thật. |
| 6 | Image with text — Flash Sale countdown (`47155:13207`) | `hero` / `countdown_timer` | Giữ kernel Hero + Countdown. Đổi sang classic split, ảnh trái và Group nội dung phải; mobile ảnh trên, nội dung dưới. Hạn giờ dùng setting thật, không hard-code số trong screenshot. |
| 7 | Scrolling text — Pawvera repeat (`47155:13346`) | `text-marquee-custom` / `scrolling_text` | Giữ. Marquee chữ + separator trên scheme3; thay nội dung, icon, tốc độ, gap và padding. |
| 8 | Collection list — grid 5 banner (`47155:13366`) | `image-text-card-grid` hoặc `custom-section` + Group/Row/Grid/Image card | Compose sau từ base. Desktop hàng đầu 2/3 + 1/3, hàng dưới 3 card; mobile xếp 5 card. `image-cards` đơn thuần chỉ có lưới đều nên không chọn nó cho phần này. Cần thử khả năng width/gap của Row/Group trước khi xác nhận khớp. |
| 9 | Featured collection — Premium Dog Kibble (`47155:13408`) | Candidate `featured-collection-banner` | Dựng sau, có gap cần xử lý. Figma ảnh trái rộng672 và khối sản phẩm chồng112px, container1824; mobile khối sản phẩm vẫn chồng112px. Base banner là hai cột không overlap; background-custom overlap theo chiều dọc của background, không phải cùng layout này. Không thêm section vào index trước khi giải quyết. |
| 10 | Featured product — Fable Modern Dog Crate (`47155:13417`) | `featured-product` / `peekoo_featured_product` | Giữ. Gallery thumbnails + product details; các block badges, rating, variants, inventory, quantity, buy buttons và payment đã có. Cần chọn đúng product/resource. |
| 11 | Image with text — Unleashing Happiness for Pets (`47155:13469`) | Candidate `multiple-images-with-text` / `image-text-split-layout` | Dựng sau. Figma là 2 ảnh nghiêng chồng nhau, desktop nội dung trái và ảnh phải, mobile ảnh trước. Multiple-images kernel có hiệu ứng stack/rotate riêng nhưng chưa đảm bảo đúng collage tĩnh; split-banner một ảnh hiện tại không đủ. |
| 12 | Featured collection — Your Care, Their Comfort (`47243:13989`) | `featured-collection-banner` + Banner + Product list | Thêm sau bằng base. Banner trái giới hạn khoảng448px + sản phẩm 3 cột × 2 hàng; mobile banner trên, sản phẩm carousel. Base banner size Small=450px, Figma448px: cần kiểm tra/tuyên bố chênh lệch 2px, không ép CSS. |
| 13 | Collection list — 2 banner clearance (`47155:13568`) | `image-cards` / `peekoo_image_cards` | Giữ. 2 card ngang desktop, xếp dọc mobile, text và CTA overlay. Thay ảnh/content, ratio, crop và scheme. |
| 14 | Logo list — Our Favorite Pet Brands (`47155:13587`) | `text-marquee-custom` / `perky_logos` | Giữ. Heading + marquee logo; desktop trải ngang, mobile overflow. Thay asset logo đúng thiết kế. |
| 15 | Content box — Loved by Customers (`47155:13597`) | `testimonials-cards` / `perky_testimonials` | Giữ. `_testimonial-review-card` cho phép Group/Image/Rating/Heading/Text, horizontal desktop, vertical mobile; Image hỗ trợ đưa ảnh lên đầu trên mobile. Figma 2 card desktop và 1 card mobile. Base này có bullets nhưng không có setting điều hướng mũi tên ở header như Figma; phần control còn là gap, chưa xác nhận khớp toàn bộ. |
| 16 | Gallery — dải ảnh nghiêng (`47155:13607`) | Candidate `gallery-carousel` + Marquee | Dựng sau. Chuyển động marquee có sẵn nhưng từng ảnh xoay xen kẽ ±10° chưa có setting; desktop ảnh lớn hơn mobile120px. Không giữ gallery cũ trong index vì cấu hình hiện tại không đáp ứng rotation. |
| 17 | Blog post — Latest Tips and Stories (`47155:13622`) | `blog-posts` / `peekoo_blog_posts` | Giữ. 3 card desktop, mobile một cột; image/date/title/excerpt. Chọn blog dữ liệu Wofyn, loại View all nếu không xuất hiện. |
| 18 | Icon with text — Shipping, Support, Payment (`47302:8210`) | `icon-text-cards` hoặc `icon-text-inline` | Thêm instance sau từ base. 3 mục desktop, mobile xếp dọc; dùng scheme4. Không trộn với strip 4 lợi ích ở đầu trang. |

## Header/footer

- Top bar `47548:10622`, header `47536:11756`: giữ trong `sections/header-group.json`, không đưa vào index. Top bar đã dùng scheme3. Logo, menu, badge và kích thước sẽ được convert riêng.
- Footer `47548:11528`: giữ trong `sections/footer-group.json`. Convert các cột menu/newsletter/payment theo Figma, scheme3. Các overlay commerce giữ nguyên.

## Dọn index đã thực hiện

Giữ 11 instance, sắp theo vị trí Figma tương ứng:

`slideshow` → `peekoo_icon_text` → `perky_age_collections` → `peekoo_featured_07` → `countdown_timer` → `scrolling_text` → `peekoo_featured_product` → `peekoo_image_cards` → `perky_logos` → `perky_testimonials` → `peekoo_blog_posts`.

Loại hoàn toàn khỏi `sections` và `order` của `templates/index.json`:

| Instance cũ | Lý do |
| --- | --- |
| `collection_list` / Collection thumbnails | Trùng vai trò với categories; `collection-list` hỗ trợ nội dung dưới ảnh tốt hơn. |
| `new_arrivals_tabs` / Collection tabs | Figma không có tabs chọn độ tuổi. |
| `perky_tinker` / Split banner Tinker | Một ảnh không đáp ứng collage hai ảnh chồng/nghiêng; chọn lại composition sau. |
| `perky_blog_posts` / Featured Blog Posts (disabled) | Dự phòng trùng với `peekoo_blog_posts`; bỏ để index gọn. |
| `perky_gallery` / Gallery | Cần xử lý dải ảnh xoay xen kẽ trước khi thêm lại. |

Không xóa file section/block base. Không thay dữ liệu của 11 instance được giữ, không thêm CSS/Liquid/JS. Backup index trước audit: `/private/tmp/wofyn-index-before-section-audit.json`.

## Đề xuất thứ tự convert

1. Hero → lợi ích → rich text → categories → Top Picks, vì xác lập nhịp trang và card system.
2. Flash Sale → scrolling text → grid banner, dùng composition hiện có trước.
3. Featured product → banner/product grid → deals → logos → testimonial → blog → trust bar.
4. Resolve Premium Dog Kibble overlap, collage, gallery rotation và testimonial arrows trong phạm vi bổ sung base riêng nếu settings hiện có không đáp ứng; không viết custom CSS trong lần convert.

Audit này chốt cấu trúc và dọn index, chưa thay nội dung/ảnh/resource và chưa xác nhận pixel fidelity. Mọi điểm chưa chắc chắn ở trên là kiểm tra cần thực hiện khi convert, không phải sai lệch đã được người dùng chấp nhận.

## Kiểm tra sau audit

- JSON hợp lệ, 11 section có đủ entry trong order, không có ID trùng.
- Dữ liệu 11 section giữ lại giống bản backup trước audit.
- Theme Check: 0 lỗi, 20 file có warning hiện có. `git diff --check` đạt.
- Watcher đồng bộ index vào theme Wofyn `192149684523`; Theme Editor reload hiển thị đúng 11 section và thứ tự mới.
