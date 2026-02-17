const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

const counters = document.querySelectorAll("[data-count]");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      const goal = Number(target.getAttribute("data-count"));
      let current = 0;
      const step = Math.max(1, Math.floor(goal / 20));

      const tick = () => {
        current += step;
        if (current >= goal) {
          target.textContent = `${goal}%`;
          return;
        }
        target.textContent = `${current}%`;
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach(counter => observer.observe(counter));
