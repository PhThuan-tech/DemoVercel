# Pulse Studio Demo

Interactive static website demo with a Vercel Function backend, optional Supabase persistence, and a `VI/EN` language toggle.

## English

### Features

- Responsive landing page built with plain HTML, CSS, and JavaScript.
- `VI/EN` language toggle with `localStorage` persistence.
- Light/dark theme toggle.
- Pointer-aware canvas background.
- Showcase filters and interactive workflow steps.
- Brief form that calls `POST /api/brief`.
- Optional Supabase database insert when environment variables are configured.
- Vercel-ready configuration with basic security headers.

### Project Structure

```text
DemoVercel/
|-- api/
|   `-- brief.js          # Vercel Function for the form
|-- .env.example          # Supabase environment variable template
|-- index.html            # Main page
|-- styles.css            # Styling
|-- script.js             # Frontend interactions and translations
|-- supabase-schema.sql   # Database table setup
|-- vercel.json           # Vercel configuration
`-- README.md             # Documentation
```

### Run Locally

You can open `index.html` directly in a browser to preview the interface. In that mode, the form shows a local sample brief because `/api/brief` only runs on Vercel or through Vercel CLI.

If you have Vercel CLI installed:

```bash
vercel dev
```

Open the URL shown by the CLI. The form will then call `/api/brief`.

### Supabase Setup

Supabase is optional. Without environment variables, the API still returns a brief with `storage.saved: false`.

To enable database saving:

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run the SQL from `supabase-schema.sql`.
4. Copy `.env.example` to `.env.local` for local Vercel CLI usage.
5. Set these variables locally and in Vercel Project Settings:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Use the service role key only on the server side. Do not expose it in frontend JavaScript.

### Deploy to Vercel

1. Push this folder to GitHub.
2. Go to `https://vercel.com`.
3. Choose `Add New...` -> `Project`.
4. Import the repository.
5. Set Framework Preset to `Other`.
6. Leave Build Command empty.
7. Leave Output Directory empty or set it to `.`.
8. Add Supabase environment variables if you want database saving.
9. Click `Deploy`.

### Test with Postman or Curl

Request:

```http
POST https://your-project.vercel.app/api/brief
Content-Type: application/json
```

Body:

```json
{
  "project": "Coffee App",
  "email": "you@example.com",
  "style": "modern",
  "goal": "Collect leads for a launch",
  "language": "en"
}
```

Curl:

```bash
curl -X POST https://your-project.vercel.app/api/brief \
  -H "Content-Type: application/json" \
  -d "{\"project\":\"Coffee App\",\"email\":\"you@example.com\",\"style\":\"modern\",\"goal\":\"Collect leads for a launch\",\"language\":\"en\"}"
```

The response includes `referenceId`, `summary`, `nextSteps`, `designDirection`, `storage`, and contact metadata.

## Tiếng Việt

### Tính năng

- Landing page responsive bằng HTML, CSS và JavaScript thuần.
- Nút đổi ngôn ngữ `VI/EN`, có lưu lựa chọn bằng `localStorage`.
- Nút đổi giao diện sáng/tối.
- Canvas background phản hồi theo con trỏ.
- Bộ lọc showcase và workflow tương tác.
- Form tạo brief gọi `POST /api/brief`.
- Có thể lưu dữ liệu vào Supabase khi đã cấu hình biến môi trường.
- Cấu hình sẵn cho Vercel kèm security headers cơ bản.

### Cấu trúc dự án

```text
DemoVercel/
|-- api/
|   `-- brief.js          # Vercel Function xử lý form
|-- .env.example          # Mẫu biến môi trường Supabase
|-- index.html            # Trang chính
|-- styles.css            # Giao diện
|-- script.js             # Tương tác frontend và bản dịch
|-- supabase-schema.sql   # SQL tạo bảng database
|-- vercel.json           # Cấu hình Vercel
`-- README.md             # Tài liệu
```

### Chạy local

Bạn có thể mở trực tiếp `index.html` trong trình duyệt để xem giao diện. Khi mở theo cách này, form sẽ hiển thị brief mẫu vì `/api/brief` chỉ chạy trên Vercel hoặc qua Vercel CLI.

Nếu đã cài Vercel CLI:

```bash
vercel dev
```

Sau đó mở URL mà CLI hiển thị. Form sẽ gọi được `/api/brief`.

### Cấu hình Supabase

Supabase là tùy chọn. Nếu chưa cấu hình biến môi trường, API vẫn trả brief và có `storage.saved: false`.

Để bật lưu database:

1. Tạo Supabase project.
2. Mở Supabase SQL Editor.
3. Chạy SQL trong `supabase-schema.sql`.
4. Copy `.env.example` thành `.env.local` nếu chạy local bằng Vercel CLI.
5. Thêm các biến môi trường này vào local và Vercel Project Settings:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Chỉ dùng service role key ở server side. Không đưa key này vào JavaScript frontend.

### Deploy lên Vercel

1. Push thư mục này lên GitHub.
2. Vào `https://vercel.com`.
3. Chọn `Add New...` -> `Project`.
4. Import repository.
5. Framework Preset chọn `Other`.
6. Build Command để trống.
7. Output Directory để trống hoặc đặt là `.`.
8. Thêm biến môi trường Supabase nếu muốn lưu database.
9. Bấm `Deploy`.

### Test bằng Postman hoặc Curl

Request:

```http
POST https://your-project.vercel.app/api/brief
Content-Type: application/json
```

Body:

```json
{
  "project": "Coffee App",
  "email": "you@example.com",
  "style": "modern",
  "goal": "Thu lead cho sản phẩm mới",
  "language": "vi"
}
```

Curl:

```bash
curl -X POST https://your-project.vercel.app/api/brief \
  -H "Content-Type: application/json" \
  -d "{\"project\":\"Coffee App\",\"email\":\"you@example.com\",\"style\":\"modern\",\"goal\":\"Thu lead cho sản phẩm mới\",\"language\":\"vi\"}"
```

Kết quả trả về gồm `referenceId`, `summary`, `nextSteps`, `designDirection`, `storage` và thông tin liên hệ.

## Next Up / Nâng cấp tiếp

- Send the brief to your email with Resend, SendGrid, or Gmail API.
- Add an admin page to list submitted briefs from Supabase.
- Enable Vercel Web Analytics and Speed Insights.
- Migrate to Next.js if you need routing, SEO, and a larger component system.
