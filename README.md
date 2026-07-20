# Pulse Studio Demo

Interactive static website demo with a Vercel Function backend. The UI includes a `VI/EN` language toggle, theme switching, animated canvas motion, filters, and a brief-generation form.

## English

### Features

- Responsive landing page built with plain HTML, CSS, and JavaScript.
- `VI/EN` language toggle with `localStorage` persistence.
- Light/dark theme toggle.
- Pointer-aware canvas background.
- Showcase filters and interactive workflow steps.
- Brief form that calls `POST /api/brief`.
- Vercel-ready configuration with basic security headers.

### Project Structure

```text
DemoVercel/
|-- api/
|   `-- brief.js        # Vercel Function for the form
|-- index.html          # Main page
|-- styles.css          # Styling
|-- script.js           # Frontend interactions and translations
|-- vercel.json         # Vercel configuration
`-- README.md           # Documentation
```

### Run Locally

You can open `index.html` directly in a browser to preview the interface. In that mode, the form shows a local sample brief because `/api/brief` only runs on Vercel or through Vercel CLI.

If you have Vercel CLI installed:

```bash
vercel dev
```

Open the URL shown by the CLI. The form will then call `/api/brief`.

### Deploy to Vercel

1. Push this folder to GitHub.
2. Go to `https://vercel.com`.
3. Choose `Add New...` -> `Project`.
4. Import the repository.
5. Set Framework Preset to `Other`.
6. Leave Build Command empty.
7. Leave Output Directory empty or set it to `.`.
8. Click `Deploy`.

### Test the API

```bash
curl -X POST https://your-project.vercel.app/api/brief \
  -H "Content-Type: application/json" \
  -d "{\"project\":\"Coffee App\",\"email\":\"you@example.com\",\"style\":\"modern\",\"goal\":\"Collect leads for a launch\",\"language\":\"en\"}"
```

The response includes `referenceId`, `summary`, `nextSteps`, `designDirection`, and contact metadata.

## Tiếng Việt

### Tính năng

- Landing page responsive bằng HTML, CSS và JavaScript thuần.
- Nút đổi ngôn ngữ `VI/EN`, có lưu lựa chọn bằng `localStorage`.
- Nút đổi giao diện sáng/tối.
- Canvas background phản hồi theo con trỏ.
- Bộ lọc showcase và workflow tương tác.
- Form tạo brief gọi `POST /api/brief`.
- Cấu hình sẵn cho Vercel kèm security headers cơ bản.

### Cấu trúc dự án

```text
DemoVercel/
|-- api/
|   `-- brief.js        # Vercel Function xử lý form
|-- index.html          # Trang chính
|-- styles.css          # Giao diện
|-- script.js           # Tương tác frontend và bản dịch
|-- vercel.json         # Cấu hình Vercel
`-- README.md           # Tài liệu
```

### Chạy local

Bạn có thể mở trực tiếp `index.html` trong trình duyệt để xem giao diện. Khi mở theo cách này, form sẽ hiển thị brief mẫu vì `/api/brief` chỉ chạy trên Vercel hoặc qua Vercel CLI.

Nếu đã cài Vercel CLI:

```bash
vercel dev
```

Sau đó mở URL mà CLI hiển thị. Form sẽ gọi được `/api/brief`.

### Deploy lên Vercel

1. Push thư mục này lên GitHub.
2. Vào `https://vercel.com`.
3. Chọn `Add New...` -> `Project`.
4. Import repository.
5. Framework Preset chọn `Other`.
6. Build Command để trống.
7. Output Directory để trống hoặc đặt là `.`.
8. Bấm `Deploy`.

### Test API

```bash
curl -X POST https://your-project.vercel.app/api/brief \
  -H "Content-Type: application/json" \
  -d "{\"project\":\"Coffee App\",\"email\":\"you@example.com\",\"style\":\"modern\",\"goal\":\"Thu lead cho san pham moi\",\"language\":\"vi\"}"
```

Kết quả trả về gồm `referenceId`, `summary`, `nextSteps`, `designDirection` và thông tin liên hệ.

## Next Up / Nâng cấp tiếp

- Send the brief to your email with Resend, SendGrid, or Gmail API.
- Save leads to Google Sheets, Notion, Airtable, or a database.
- Enable Vercel Web Analytics and Speed Insights.
- Migrate to Next.js if you need routing, SEO, and a larger component system.
