const root = document.documentElement;
const canvas = document.querySelector("#ambient-canvas");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const pointer = { x: 0.5, y: 0.5 };
let particles = [];
let animationFrame = null;
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
    "hero.title": "Giao diện học-vui, nảy nhẹ, mượt như một trò chơi nhỏ.",
    "hero.text":
      "Một demo landing page gọn nhẹ với chuyển động canvas, mascot vui, theme toggle, bộ lọc nội dung, chỉ số động và form tương tác.",
    "hero.badge1": "Spring motion",
    "hero.badge2": "Scroll reveal",
    "hero.badge3": "Playful states",
    "hero.primary": "Xem demo",
    "hero.secondary": "Tạo brief",
    "orbit.aria": "Bảng demo tương tác",
    "orbit.label": "Live Preview",
    "orbit.note": "Nhấn vào các điểm để xem chỉ số đổi trạng thái.",
    "orbit.metric": "{metric} đang được ưu tiên, điểm demo chuyển theo lựa chọn của bạn.",
    "metrics.aria": "Chỉ số demo",
    "metrics.components": "components",
    "metrics.lighthouse": "lighthouse",
    "metrics.sections": "sections",
    "showcase.title": "Chọn mood hoạt ảnh cho giao diện",
    "showcase.filters": "Bộ lọc showcase",
    "tabs.all": "Tất cả",
    "cards.motion": "Canvas nền phản hồi theo con trỏ, thêm motion nảy nhẹ và chuyển cảnh êm.",
    "cards.system": "Thẻ chỉ số rõ ràng, bố cục responsive và trạng thái dễ quét.",
    "cards.brand": "Màu sắc tươi, CTA nổi bật, phù hợp cho demo sản phẩm giàu cảm xúc.",
    "workflow.title": "Từ ý tưởng đến deploy",
    "workflow.step1": "Thiết kế nhanh",
    "workflow.step2": "Tối ưu tương tác",
    "workflow.step3": "Deploy Vercel",
    "workflow.detail1":
      "Bắt đầu với layout rõ ràng, có điểm nhấn thị giác ngay ở màn hình đầu.",
    "workflow.detail2":
      "Thêm tương tác nhỏ nhưng có nhịp: hover, lọc nội dung, theme toggle và chỉ số động.",
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
    "brief.storageError": "Chi tiết: {error}",
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
    "hero.title": "A playful, bouncy interface that feels like a tiny game.",
    "hero.text":
      "A lightweight landing page demo with canvas motion, a cheerful mascot, theme switching, content filters, animated metrics, and an interactive form.",
    "hero.badge1": "Spring motion",
    "hero.badge2": "Scroll reveal",
    "hero.badge3": "Playful states",
    "hero.primary": "View demo",
    "hero.secondary": "Create brief",
    "orbit.aria": "Interactive demo panel",
    "orbit.label": "Live Preview",
    "orbit.note": "Tap any point to update the live score.",
    "orbit.metric": "{metric} is now prioritized, and the demo score follows your choice.",
    "metrics.aria": "Demo metrics",
    "metrics.components": "components",
    "metrics.lighthouse": "lighthouse",
    "metrics.sections": "sections",
    "showcase.title": "Choose the motion mood",
    "showcase.filters": "Showcase filters",
    "tabs.all": "All",
    "cards.motion": "A pointer-aware canvas background with soft bounce and smooth transitions.",
    "cards.system": "Clear metric cards, responsive layout, and states that are easy to scan.",
    "cards.brand": "Bright colors, strong CTAs, and a product-demo friendly visual system.",
    "workflow.title": "From idea to deployment",
    "workflow.step1": "Fast design",
    "workflow.step2": "Interaction polish",
    "workflow.step3": "Deploy Vercel",
    "workflow.detail1":
      "Start with a clear layout and a visual moment in the first viewport.",
    "workflow.detail2":
      "Add small interactions with rhythm: hover states, filters, theme switching, and animated metrics.",
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
    "brief.storageError": "Details: {error}",
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

  const baseCount = window.innerWidth < 640 ? 24 : 44;
  const count = reduceMotion.matches ? 0 : Math.min(70, Math.max(baseCount, Math.floor(window.innerWidth / 26)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: 1.6 + Math.random() * 3.4,
    hue: Math.random() > 0.5 ? "green" : "blue",
  }));
}

function drawCanvas() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  const dark = root.classList.contains("dark");

  particles.forEach((particle, index) => {
    const pullX = (pointer.x * window.innerWidth - particle.x) * 0.00055;
    const pullY = (pointer.y * window.innerHeight - particle.y) * 0.00055;
    particle.x += particle.vx + pullX;
    particle.y += particle.vy + pullY;

    if (particle.x < -20) particle.x = window.innerWidth + 20;
    if (particle.x > window.innerWidth + 20) particle.x = -20;
    if (particle.y < -20) particle.y = window.innerHeight + 20;
    if (particle.y > window.innerHeight + 20) particle.y = -20;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fillStyle = dark
      ? particle.hue === "green"
        ? "rgba(87,215,126,0.26)"
        : "rgba(84,200,240,0.22)"
      : particle.hue === "green"
        ? "rgba(29,185,84,0.22)"
        : "rgba(37,169,224,0.18)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 112) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = dark
          ? `rgba(247,243,233,${0.1 - distance / 1300})`
          : `rgba(20,32,27,${0.08 - distance / 1500})`;
        ctx.stroke();
      }
    }
  });

  animationFrame = requestAnimationFrame(drawCanvas);
}

function startCanvas() {
  if (reduceMotion.matches || animationFrame) return;
  animationFrame = requestAnimationFrame(drawCanvas);
}

function stopCanvas() {
  if (!animationFrame) return;
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
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

function animateMetric(metric) {
  if (metric.dataset.animated === "true") return;
  metric.dataset.animated = "true";

  const target = Number(metric.dataset.target);
  const duration = 980;
  const start = performance.now();

  function update(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    metric.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    document.querySelectorAll(".metric-value").forEach(animateMetric);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll?.(".metric-value").forEach(animateMetric);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / window.innerWidth;
  pointer.y = event.clientY / window.innerHeight;
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopCanvas();
  } else {
    startCanvas();
  }
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
    if (!brief.storage.saved && brief.storage.error) {
      storage.textContent += ` ${t("brief.storageError", { error: brief.storage.error })}`;
    }
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
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitButton = form.querySelector("button[type='submit']");
  const result = document.querySelector(".form-result");
  const payload = {
    project: String(data.get("project") || "").trim(),
    email: String(data.get("email") || "").trim(),
    style: String(data.get("style") || "modern"),
    goal: String(data.get("goal") || "").trim(),
    language: currentLanguage,
  };

  form.classList.add("is-loading");
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
    form.classList.remove("is-loading");
    submitButton.disabled = false;
    submitButton.textContent = t("form.submit");
  }
});

window.addEventListener("resize", resizeCanvas);
reduceMotion.addEventListener?.("change", () => {
  resizeCanvas();
  if (reduceMotion.matches) {
    stopCanvas();
  } else {
    startCanvas();
  }
});

applyLanguage(currentLanguage);
resizeCanvas();
setupReveal();
startCanvas();
