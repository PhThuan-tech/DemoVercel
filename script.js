const root = document.documentElement;
const canvas = document.querySelector("#ambient-canvas");
const ctx = canvas.getContext("2d");
const pointer = { x: 0.5, y: 0.5 };
let particles = [];
let currentLanguage = localStorage.getItem("pulse-language") || "vi";
let selectedMetric = "";

const translations = {
  vi: {
    "meta.description": "Demo website tương tác sẵn sàng deploy lên Vercel.",
    "nav.aria": "Điều hướng chính",
    "nav.showcase": "Showcase",
    "nav.workflow": "Workflow",
    "nav.contact": "Liên hệ",
    "theme.aria": "Đổi giao diện",
    "hero.eyebrow": "Interactive Vercel Demo",
    "hero.title": "Trải nghiệm web mượt, sáng, và có cảm giác sống.",
    "hero.text":
      "Một demo landing page gọn nhẹ với chuyển động canvas, theme toggle, bộ lọc nội dung, chỉ số động và form tương tác.",
    "hero.primary": "Xem demo",
    "hero.secondary": "Bắt đầu",
    "orbit.aria": "Bảng demo tương tác",
    "orbit.label": "Live Preview",
    "orbit.note": "Nhấn vào các điểm để xem thay đổi chỉ số.",
    "orbit.metric": "{metric} đang được ưu tiên, điểm demo chuyển theo lựa chọn của bạn.",
    "metrics.aria": "Chỉ số demo",
    "metrics.components": "components",
    "metrics.lighthouse": "lighthouse",
    "metrics.sections": "sections",
    "showcase.title": "Chọn mood cho giao diện",
    "showcase.filters": "Bộ lọc showcase",
    "tabs.all": "Tất cả",
    "cards.motion": "Canvas nền phản hồi theo con trỏ, tạo cảm giác premium mà vẫn nhẹ.",
    "cards.system": "Thẻ chỉ số rõ ràng, bố cục responsive và trạng thái dễ quét.",
    "cards.brand": "Màu sắc có tương phản, CTA nổi bật, phù hợp cho demo sản phẩm.",
    "workflow.title": "Từ ý tưởng đến deploy",
    "workflow.step1": "Thiết kế nhanh",
    "workflow.step2": "Tối ưu tương tác",
    "workflow.step3": "Deploy Vercel",
    "workflow.detail1":
      "Bắt đầu với một layout rõ ràng, có điểm nhấn thị giác ngay ở màn hình đầu.",
    "workflow.detail2":
      "Thêm các tương tác nhỏ: hover, lọc nội dung, theme toggle và chỉ số động.",
    "workflow.detail3":
      "Giữ cấu trúc tĩnh, không cần build phức tạp, sẵn sàng đẩy lên Vercel.",
    "contact.title": "Tùy biến demo này cho dự án của bạn",
    "form.project": "Tên dự án",
    "form.projectPlaceholder": "Ví dụ: Coffee App",
    "form.email": "Email nhận brief",
    "form.style": "Phong cách",
    "form.styleModern": "Hiện đại",
    "form.styleMinimal": "Tối giản",
    "form.styleDynamic": "Năng động",
    "form.goal": "Mục tiêu",
    "form.goalPlaceholder": "Ví dụ: Giới thiệu sản phẩm mới, thu lead, chạy demo",
    "form.submit": "Tạo brief demo",
    "form.loading": "Đang tạo brief...",
    "form.calling": "Đang gọi Vercel Function /api/brief.",
    "form.success": "Brief đã được tạo từ backend Vercel Function.",
    "form.local": "Đang chạy local nên dùng brief mẫu. Lên Vercel sẽ gọi API thật.",
    "brief.id": "Mã brief: {id}",
    "brief.saved": "Đã lưu vào Supabase.",
    "brief.notSaved": "Chưa lưu database: {reason}",
    "brief.localSummary":
      "{project} đã có brief demo local. Deploy lên Vercel để gọi API /api/brief.",
    "brief.localProject": "Dự án mới",
    "brief.localStep1": "Kiểm tra giao diện trên mobile",
    "brief.localStep2": "Deploy lên Vercel",
    "brief.localStep3": "Kết nối form với dịch vụ thật nếu cần",
  },
  en: {
    "meta.description": "Interactive demo website ready to deploy on Vercel.",
    "nav.aria": "Main navigation",
    "nav.showcase": "Showcase",
    "nav.workflow": "Workflow",
    "nav.contact": "Contact",
    "theme.aria": "Toggle theme",
    "hero.eyebrow": "Interactive Vercel Demo",
    "hero.title": "A smooth, bright web experience that feels alive.",
    "hero.text":
      "A lightweight landing page demo with canvas motion, theme switching, content filters, animated metrics, and an interactive form.",
    "hero.primary": "View demo",
    "hero.secondary": "Start now",
    "orbit.aria": "Interactive demo panel",
    "orbit.label": "Live Preview",
    "orbit.note": "Tap any point to update the live score.",
    "orbit.metric": "{metric} is now prioritized, and the demo score follows your choice.",
    "metrics.aria": "Demo metrics",
    "metrics.components": "components",
    "metrics.lighthouse": "lighthouse",
    "metrics.sections": "sections",
    "showcase.title": "Choose the interface mood",
    "showcase.filters": "Showcase filters",
    "tabs.all": "All",
    "cards.motion": "A pointer-aware canvas background that feels premium while staying light.",
    "cards.system": "Clear metric cards, responsive layout, and states that are easy to scan.",
    "cards.brand": "Contrasting colors, strong CTAs, and a product-demo friendly visual system.",
    "workflow.title": "From idea to deployment",
    "workflow.step1": "Fast design",
    "workflow.step2": "Interaction polish",
    "workflow.step3": "Deploy Vercel",
    "workflow.detail1":
      "Start with a clear layout and a visual moment in the first viewport.",
    "workflow.detail2":
      "Add small interactions: hover states, filters, theme switching, and animated metrics.",
    "workflow.detail3":
      "Keep the static structure simple and ready to ship on Vercel.",
    "contact.title": "Customize this demo for your project",
    "form.project": "Project name",
    "form.projectPlaceholder": "Example: Coffee App",
    "form.email": "Brief email",
    "form.style": "Style",
    "form.styleModern": "Modern",
    "form.styleMinimal": "Minimal",
    "form.styleDynamic": "Dynamic",
    "form.goal": "Goal",
    "form.goalPlaceholder": "Example: Launch a new product, collect leads, run a demo",
    "form.submit": "Generate demo brief",
    "form.loading": "Generating brief...",
    "form.calling": "Calling Vercel Function /api/brief.",
    "form.success": "Brief generated by the Vercel Function backend.",
    "form.local": "Running locally, so a sample brief is shown. Deploy to Vercel for the real API.",
    "brief.id": "Brief ID: {id}",
    "brief.saved": "Saved to Supabase.",
    "brief.notSaved": "Database not saved: {reason}",
    "brief.localSummary":
      "{project} has a local demo brief. Deploy to Vercel to call /api/brief.",
    "brief.localProject": "New project",
    "brief.localStep1": "Check the interface on mobile",
    "brief.localStep2": "Deploy to Vercel",
    "brief.localStep3": "Connect the form to a real service if needed",
  },
};

function t(key, replacements = {}) {
  const value = translations[currentLanguage][key] || translations.en[key] || key;
  return Object.entries(replacements).reduce(
    (text, [name, replacement]) => text.replace(`{${name}}`, replacement),
    value,
  );
}

function resizeCanvas() {
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * scale);
  canvas.height = Math.floor(window.innerHeight * scale);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const count = Math.max(34, Math.floor(window.innerWidth / 24));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 1.5 + Math.random() * 3.2,
  }));
}

function drawCanvas() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const dark = root.classList.contains("dark");
  particles.forEach((particle, index) => {
    const pullX = (pointer.x * window.innerWidth - particle.x) * 0.0006;
    const pullY = (pointer.y * window.innerHeight - particle.y) * 0.0006;
    particle.x += particle.vx + pullX;
    particle.y += particle.vy + pullY;

    if (particle.x < -20) particle.x = window.innerWidth + 20;
    if (particle.x > window.innerWidth + 20) particle.x = -20;
    if (particle.y < -20) particle.y = window.innerHeight + 20;
    if (particle.y > window.innerHeight + 20) particle.y = -20;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = dark ? "rgba(66,199,189,0.32)" : "rgba(15,139,141,0.24)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = dark
          ? `rgba(244,240,232,${0.12 - distance / 1200})`
          : `rgba(23,32,28,${0.1 - distance / 1400})`;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawCanvas);
}

function applyLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("pulse-language", language);
  document.documentElement.lang = language;
  document.querySelector(".language-toggle").textContent = language === "vi" ? "EN" : "VI";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(",").forEach((entry) => {
      const [attribute, key] = entry.split(":");
      element.setAttribute(attribute, t(key));
    });
  });

  const activeStep = document.querySelector(".step.active");
  document.querySelector("#step-detail").textContent = t(
    `workflow.detail${activeStep?.dataset.step || "1"}`,
  );

  if (selectedMetric) {
    document.querySelector("#metric-note").textContent = t("orbit.metric", {
      metric: selectedMetric,
    });
  }
}

document.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / window.innerWidth;
  pointer.y = event.clientY / window.innerHeight;
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.classList.toggle("dark");
});

document.querySelector(".language-toggle").addEventListener("click", () => {
  applyLanguage(currentLanguage === "vi" ? "en" : "vi");
});

document.querySelectorAll(".orbit-dot").forEach((button) => {
  button.addEventListener("click", () => {
    selectedMetric = button.dataset.metric;
    const score = {
      Design: "99%",
      Speed: "97%",
      UX: "95%",
    }[selectedMetric];
    document.querySelector("#live-score").textContent = score;
    document.querySelector("#metric-note").textContent = t("orbit.metric", {
      metric: selectedMetric,
    });
  });
});

document.querySelectorAll(".metric-value").forEach((metric) => {
  const target = Number(metric.dataset.target);
  let current = 0;
  const timer = setInterval(() => {
    current += Math.max(1, Math.ceil(target / 34));
    metric.textContent = Math.min(current, target);
    if (current >= target) clearInterval(timer);
  }, 28);
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle(
        "is-hidden",
        filter !== "all" && card.dataset.category !== filter,
      );
    });
  });
});

document.querySelectorAll(".step").forEach((step) => {
  step.addEventListener("click", () => {
    document.querySelectorAll(".step").forEach((item) => item.classList.remove("active"));
    step.classList.add("active");
    document.querySelector("#step-detail").textContent = t(`workflow.detail${step.dataset.step}`);
  });
});

function renderBriefPreview(brief) {
  const preview = document.querySelector(".brief-preview");
  const steps = document.querySelector(".brief-steps");
  const storage = document.querySelector(".brief-storage");
  document.querySelector(".brief-id").textContent = t("brief.id", { id: brief.referenceId });
  if (brief.storage) {
    storage.textContent = brief.storage.saved
      ? t("brief.saved")
      : t("brief.notSaved", { reason: brief.storage.reason || "N/A" });
  } else {
    storage.textContent = "";
  }
  document.querySelector(".brief-summary").textContent = brief.summary;
  steps.replaceChildren(
    ...brief.nextSteps.map((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      return item;
    }),
  );
  preview.hidden = false;
}

function createLocalBrief(payload) {
  const project = payload.project || t("brief.localProject");
  return {
    referenceId: `LOCAL-${Date.now().toString(36).toUpperCase()}`,
    summary: t("brief.localSummary", { project }),
    nextSteps: [t("brief.localStep1"), t("brief.localStep2"), t("brief.localStep3")],
  };
}

document.querySelector(".demo-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const submitButton = event.currentTarget.querySelector("button[type='submit']");
  const result = document.querySelector(".form-result");
  const payload = {
    project: String(data.get("project") || "").trim(),
    email: String(data.get("email") || "").trim(),
    style: String(data.get("style") || "modern"),
    goal: String(data.get("goal") || "").trim(),
    language: currentLanguage,
  };

  submitButton.disabled = true;
  submitButton.textContent = t("form.loading");
  result.textContent = t("form.calling");

  try {
    const response = await fetch("/api/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const brief = await response.json();
    if (!response.ok) throw new Error(brief.error || "API busy.");
    renderBriefPreview(brief);
    result.textContent = t("form.success");
  } catch (error) {
    const fallbackBrief = createLocalBrief(payload);
    renderBriefPreview(fallbackBrief);
    result.textContent = t("form.local");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = t("form.submit");
  }
});

window.addEventListener("resize", resizeCanvas);
applyLanguage(currentLanguage);
resizeCanvas();
drawCanvas();
