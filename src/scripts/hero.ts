/** Pause the hero's endless loops (glow, blur drift, tint, sheen) while the hero is off screen. */
function pauseHeroLoopsOffscreen() {
  const hero = document.getElementById("hero");
  if (!hero || !("IntersectionObserver" in window)) return;
  const root = document.documentElement;
  new IntersectionObserver(([entry]) => {
    root.toggleAttribute("data-hero-offscreen", !entry?.isIntersecting);
  }).observe(hero);
}

function initHeroMotion() {
  pauseHeroLoopsOffscreen();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const hero = document.getElementById("hero");
  const photo = document.getElementById("photo");
  if (!photo || !hero) return;

  photo.style.transition = "translate 0.8s cubic-bezier(0.2, 0.7, 0.2, 1)";

  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    photo.style.translate = `${-x * 18}px ${-y * 12}px`;
  });

  hero.addEventListener("pointerleave", () => {
    photo.style.translate = "0 0";
  });
}

initHeroMotion();
