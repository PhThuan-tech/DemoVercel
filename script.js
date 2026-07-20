const root = document.documentElement;
const canvas = document.querySelector("#ambient-canvas");
const ctx = canvas.getContext("2d");
const pointer = { x: 0.5, y: 0.5 };
let particles = [];

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

document.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / window.innerWidth;
  pointer.y = event.clientY / window.innerHeight;
});

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.classList.toggle("dark");
});

document.querySelectorAll(".orbit-dot").forEach((button) => {
  button.addEventListener("click", () => {
    const metric = button.dataset.metric;
    const score = {
      Design: "99%",
      Speed: "97%",
      UX: "95%",
    }[metric];
    document.querySelector("#live-score").textContent = score;
    document.querySelector("#metric-note").textContent =
      `${metric} đang được ưu tiên, điểm demo chuyển theo lựa chọn của bạn.`;
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

const stepDetails = {
  1: "Bắt đầu với một layout rõ ràng, có điểm nhấn thị giác ngay ở màn hình đầu.",
  2: "Thêm các tương tác nhỏ: hover, lọc nội dung, theme toggle và chỉ số động.",
  3: "Giữ cấu trúc tĩnh, không cần build phức tạp, sẵn sàng đẩy lên Vercel.",
};

document.querySelectorAll(".step").forEach((step) => {
  step.addEventListener("click", () => {
    document.querySelectorAll(".step").forEach((item) => item.classList.remove("active"));
    step.classList.add("active");
    document.querySelector("#step-detail").textContent = stepDetails[step.dataset.step];
  });
});

document.querySelector(".demo-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const project = data.get("project") || "dự án mới";
  const style = data.get("style");
  document.querySelector(".form-result").textContent =
    `Brief đã sẵn sàng: ${project} với phong cách ${style.toLowerCase()}.`;
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawCanvas();
