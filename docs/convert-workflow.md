# Quy trình convert Figma bằng section có sẵn ở base

## Mục tiêu và quy tắc bắt buộc

Convert thiết kế Figma thành template Shopify bằng cách tái sử dụng section,
block và khả năng cấu hình đã có ở base.

- Ưu tiên section có sẵn ở base; không tạo section riêng hoặc sao chép section
  thành phiên bản custom để khớp thiết kế.
- Dùng settings, tokens, presets, blocks và cách compose được base hỗ trợ.
- Nếu muốn khớp Figma mà phải thêm hoặc sửa CSS, **phải báo lại cho người yêu cầu
  và không được viết custom CSS**.
- Không âm thầm bỏ qua chênh lệch hoặc báo hoàn thành khớp Figma khi còn điểm
  chưa đáp ứng.

Quy tắc không viết custom CSS áp dụng cho toàn bộ công việc convert, bao gồm
stylesheet mới, sửa CSS có sẵn, `{% stylesheet %}`, thẻ `<style>`, inline style
viết thêm, media query, selector override, `!important`, trường Custom CSS trong
Theme Editor hoặc template JSON, và CSS được chèn bằng JavaScript.
Không chuyển override sang file base/shared để né quy tắc này.

Việc chỉnh giá trị của settings đã có là hợp lệ, kể cả khi implementation hiện có
của base dùng settings đó để sinh CSS variables hoặc inline style. Không được
thêm setting, token hoặc logic sinh style mới để đạt thiết kế trong lần convert.

## 1. Xác định đầu vào

Trước khi triển khai, ghi nhận:

- Link Figma và frame/node cần convert, gồm desktop và mobile nếu có.
- Template/branch đích và vị trí section trên trang.
- Branch/ref base dùng làm nguồn tái sử dụng; không tự đoán nếu chưa rõ.
- Nội dung, hình ảnh, resource Shopify và trạng thái tương tác cần có.

Kiểm tra trạng thái worktree, giữ nguyên các thay đổi không thuộc công việc.
Nếu thiếu đầu vào ảnh hưởng đến lựa chọn section hoặc cấu hình, hỏi lại phần đó;
vẫn có thể khảo sát những phần đã đủ thông tin.

## 2. Đối chiếu Figma với base

Tìm section có sẵn phù hợp với cấu trúc và hành vi của thiết kế. Đọc schema,
blocks, presets, settings và khả năng responsive thực tế của section trước khi
chọn; không chỉ dựa vào tên hoặc hình preview.

Lập bảng mapping trước khi chỉnh template:

| Thành phần Figma | Section/block ở base | Settings/cách compose có sẵn | Chênh lệch còn lại |
| --- | --- | --- | --- |
| Frame/node cần convert | File hoặc type tái sử dụng | Giá trị/cấu hình dự kiến | Không có hoặc mô tả cụ thể |

Đối chiếu ít nhất: bố cục, chiều rộng, khoảng cách, typography, màu sắc, radius,
tỷ lệ/crop ảnh, thứ tự nội dung, responsive và tương tác. Không tự giả định
mobile có cùng bố cục desktop nếu chưa có căn cứ từ thiết kế hoặc yêu cầu.

## 3. Kiểm tra khả năng khớp trước khi triển khai

- **Đủ khả năng bằng cấu hình có sẵn:** tiếp tục convert bằng section/block đã chọn.
- **Có chênh lệch cần CSS mới:** báo lại theo mẫu bên dưới và dừng triển khai
  phần bị vướng. Không viết CSS thử rồi mới xin ý kiến.
- **Không có section phù hợp ở base:** báo thiếu section/khả năng tương ứng;
  không tự tạo section mới trong phạm vi quy trình này.

Có thể tiếp tục phần độc lập đã đủ khả năng bằng base, nhưng phải ghi rõ phần
đang chờ xử lý. Không tự chấp nhận sai lệch thay cho người yêu cầu.

### Mẫu báo chênh lệch

```text
Figma: [link frame/node + desktop/mobile]
Section/block base: [file/type + branch/ref]
Yêu cầu thiết kế: [giá trị, bố cục hoặc hành vi cần đạt]
Khả năng hiện có: [settings/blocks đã kiểm tra và giới hạn]
Chênh lệch: [điểm không thể đạt bằng cấu hình có sẵn]
Vì sao cần CSS mới: [giới hạn cụ thể của base]
Phương án dùng base hiện tại: [cấu hình gần nhất + sai lệch còn lại]
Đề xuất: [chấp nhận sai lệch / chọn section khác / mở công việc bổ sung base]
Trạng thái: Chưa viết custom CSS; phần này đang chờ hướng xử lý.
```

Nếu chọn bổ sung khả năng cho base, chỉ ghi nhận đề xuất trong lần convert này.
Việc triển khai bổ sung base cần yêu cầu riêng với phạm vi rõ ràng; đề xuất hoặc
việc báo chênh lệch không tự cấp quyền viết CSS.

## 4. Convert bằng cấu hình hiện có

- Tái sử dụng section/block theo contract của base và đặt cấu hình trong template
  JSON hoặc settings hiện có theo đúng owner.
- Thay nội dung, hình ảnh, resource, thứ tự blocks và giá trị settings trong giới
  hạn schema hỗ trợ.
- Giữ khả năng chỉnh sửa trong Theme Editor và hành vi responsive của base.
- Không hard-code style hoặc thay đổi Liquid/JavaScript để lách giới hạn CSS.
- Nếu phát hiện chênh lệch mới trong khi làm, quay lại bước 3 và báo ngay.

## 5. Kiểm tra và bàn giao

1. Kiểm tra diff: chỉ có thay đổi thuộc phạm vi convert, không thêm/sửa CSS hoặc
   đưa CSS vào Custom CSS, inline style hay runtime.
2. Kiểm tra JSON/schema và chạy các kiểm tra repo phù hợp với thay đổi, gồm
   `git diff --check`.
3. Đối chiếu preview với Figma ở các kích thước có thiết kế; kiểm tra responsive,
   overflow và tương tác liên quan.
4. Kiểm tra trong Theme Editor: nội dung/settings chỉnh được, lưu và reload giữ
   đúng cấu hình.
5. Bàn giao danh sách section/block tái sử dụng, cấu hình chính, kiểm tra đã thực
   hiện và mọi chênh lệch còn lại. Nếu chưa kiểm tra được preview/editor, ghi rõ.

Chỉ xác nhận hoàn thành khi các phần yêu cầu đã được kiểm tra và không còn
chênh lệch chưa được người yêu cầu chấp nhận. Phần cần CSS mới luôn phải được
báo lại và giữ ở trạng thái chờ, không tự triển khai trong quy trình convert.
