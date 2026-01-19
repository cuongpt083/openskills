# OpenSkills: Siêu năng lực cho AI Agent

**OpenSkills** là một trình nạp kỹ năng (Skills Loader) vạn năng, được thiết kế để mang hệ thống kỹ năng chuẩn của Anthropic (Claude Code) đến với mọi AI Agent, đặc biệt là **Antigravity**.

Tài liệu này tổng hợp nguyên lý hoạt động và hướng dẫn sử dụng sau khi bạn đã tích hợp bộ kỹ năng đồ sộ từ **ClaudeKit**.

---

## 🧠 1. Nguyên lý hoạt động

Hệ thống hoạt động dựa trên triết lý **"Progressive Disclosure"** (Tiết lộ dần dần). Thay vì nạp hàng ngàn dòng chỉ dẫn ngay từ đầu làm loãng ngữ cảnh (context), Agent chỉ nạp những gì thực sự cần thiết khi nhận được tác vụ cụ thể.

### Luồng xử lý kỹ năng:
1. **Lưu trữ (Storage):** Các kỹ năng (`SKILL.md`) được lưu tại kho lưu trữ toàn cục (`~/.agent/skills/`) hoặc dự án (`.agent/skills/`).
2. **Khai báo (Declaration):** Tệp `AGENTS.md` liệt kê danh sách các kỹ năng sẵn có dưới dạng XML.
3. **Triệu hồi (Invocation):** Khi Agent phát hiện tác vụ phù hợp, nó sẽ sử dụng lệnh `openskills read <name>` để đọc nội dung chi tiết.
4. **Thực thi (Execution):** Agent làm theo các chỉ dẫn và sử dụng các script/tài liệu đi kèm trong kỹ năng đó.

---

## 🚀 2. Antigravity Integration (Tối ưu hóa riêng)

Chúng ta đã nâng cấp OpenSkills để "hiểu" sâu về Antigravity thông qua 3 thành phần:

- **Tự động hóa Workflow:** Mỗi khi `sync`, hệ thống tự sinh tệp `.agent/workflows/skills.md` hướng dẫn Agent cách chủ động tìm và nạp kỹ năng.
- **Mẫu khởi tạo (Templates):** Lệnh `init --antigravity` tạo ra các kỹ năng sử dụng đúng bộ công cụ của Antigravity (`run_command`, `view_file`, `replace_file_content`).
- **Hệ thống Kiểm định (Validation):** Lệnh `validate` giúp rà soát các kỹ năng cũ và gợi ý nâng cấp chúng để hoạt động hoàn hảo trên Antigravity.

---

## 🛠️ 3. Hướng dẫn sử dụng (Quick Start)

### Cài đặt toàn bộ kho Skills ClaudeKit
Để "trang bị tận răng" 29+ kỹ năng chuyên sâu cho Agent của bạn:
```bash
openskills install /path/to/claudekit-skills/.claude/skills --global --universal -y
```

### Kích hoạt cho một Project mới
Khi bạn bắt đầu ở một thư mục mới:
```bash
openskills sync -y
```
*Lệnh này sẽ tạo `AGENTS.md` và Workflow chỉ dẫn cho Agent trong dự án đó.*

### Các lệnh quản lý quan trọng
- **`openskills list`**: Xem danh sách các "phép thuật" hiện có.
- **`openskills read <name>`**: Xem nội dung chi tiết một kỹ năng.
- **`openskills validate <name>`**: Kiểm tra tính tương thích với Antigravity.
- **`openskills init <new-name> --antigravity`**: Tự tạo kỹ năng mới cho riêng bạn.

---

## 💎 4. Danh mục Kỹ năng ClaudeKit điển hình
Với ClaudeKit đã nạp, Agent của bạn hiện có các khả năng:
- **Backend/Frontend Development:** Chặn các lỗi logic, thiết kế UI/UX theo chuẩn hiện đại.
- **Sequential Thinking:** Giải quyết vấn đề phức tạp theo từng bước logic.
- **Code Review:** Đánh giá mã nguồn chuyên sâu.
- **Media Processing & AI-ML Tools:** Xử lý hình ảnh, video và các mô hình học máy.

---

## 📜 5. Quy ước cho Agent
Khi đã nạp OpenSkills, Agent sẽ tuân thủ quy tắc:
> *"Nếu có kỹ năng sẵn có trong AGENTS.md hỗ trợ được tác vụ này, tôi sẽ ưu tiên `read` kỹ năng đó trước khi thực hiện."*

---
*Tài liệu được biên soạn bởi Master of Antigravity-Skills.*
