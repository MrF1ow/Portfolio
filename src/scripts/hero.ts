/** Pause the hero's two small loops (status dot, scroll marker) while the hero is off screen. */
function pauseHeroLoopsOffscreen() {
  const hero = document.getElementById("hero");
  if (!hero || !("IntersectionObserver" in window)) return;
  const root = document.documentElement;
  new IntersectionObserver(([entry]) => {
    root.toggleAttribute("data-hero-offscreen", !entry?.isIntersecting);
  }).observe(hero);
}

pauseHeroLoopsOffscreen();
