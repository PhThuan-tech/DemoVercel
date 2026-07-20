# 🎨 Pulse Studio Demo

Một trang web tĩnh (static) với tương tác mượt mà, tối ưu hóa cho Vercel deployment.

---

## 📋 Mô tả dự án

Đây là một website demo của **Pulse Studio** với giao diện hiện đại, được xây dựng bằng:
- **HTML** (30.2%)
- **CSS** (46.6%)
- **JavaScript** (23.2%)

---

## 🚀 Chạy trên máy cục bộ (Local)

### Cách 1: Mở trực tiếp
```bash
Nhấp đúp vào file `index.html` để mở trong trình duyệt
```

### Cách 2: Dùng Static Server
Chạy một static server bất kỳ từ thư mục dự án:

**Node.js (http-server):**
```bash
npx http-server
```

**Python 3:**
```bash
python -m http.server 8000
```

**Live Server (VS Code):**
- Cài extension "Live Server"
- Chuột phải vào `index.html` → "Open with Live Server"

---

## 🌐 Deploy lên Vercel

### Bước 1: Push lên GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Bước 2: Import trên Vercel
1. Đăng nhập tài khoản Vercel: [vercel.com](https://vercel.com)
2. Nhấn **"Add New..."** → **"Project"**
3. Chọn repository từ GitHub

### Bước 3: Cấu hình Deploy
- **Framework Preset:** Chọn `Other` (hoặc `No Framework`)
- **Build Command:** Để trống (không cần)
- **Output Directory:** Để trống (không cần)

### Bước 4: Deploy
- Nhấn **"Deploy"**
- Chờ quá trình hoàn tất (~1-2 phút)

✅ Xong! Trang web sẽ được deploy tự động sau mỗi `push` lên GitHub.

---

## 📁 Cấu trúc tệp

```
DemoVercel/
├── index.html       # Trang chính
├── style.css        # Styling
├── script.js        # Interactivity
└── README.md        # Tài liệu này
```

---

## 💡 Mẹo hữu ích

- **Auto-deploy:** Mỗi lần push code lên GitHub, Vercel tự động rebuild và deploy
- **Custom Domain:** Sau deploy, bạn có thể gắn domain riêng trong cài đặt Vercel
- **Environment Variables:** Nếu cần, thêm trong **Project Settings** → **Environment Variables**

---

## 📧 Liên hệ & Hỗ trợ

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue trên repository này.

---

**Happy coding! 🎉**
