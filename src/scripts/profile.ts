const METER_MAX = 20;
const METER_BLOCK = "▮";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function drawMeters(meters: HTMLElement, fill: number) {
  for (const row of meters.querySelectorAll<HTMLElement>(".meter-row")) {
    const level = Number(row.dataset.level ?? 0);
    const k = Math.round(Math.min(level, fill));
    const bar = row.querySelector(".bar");
    const rest = row.querySelector(".rest");
    if (bar) bar.textContent = METER_BLOCK.repeat(k);
    if (rest) rest.textContent = METER_BLOCK.repeat(METER_MAX - k);
  }
}

function animateMeters(meters: HTMLElement) {
  if (prefersReducedMotion()) return;

  drawMeters(meters, 0);
  let fill = 0;
  const step = () => {
    fill += 0.3;
    drawMeters(meters, fill);
    if (fill < METER_MAX) window.setTimeout(step, 30);
  };
  step();
}

function activateProfile(svg: SVGSVGElement, path: SVGPathElement, meters: HTMLElement | null) {
  if (prefersReducedMotion()) {
    path.style.strokeDashoffset = "0";
    path.style.setProperty("transition", "none", "important");
    svg.classList.add("on");
    return;
  }

  svg.classList.add("on");
  if (meters) animateMeters(meters);
}

export function initTrailProfile() {
  const svg = document.getElementById("profile");
  const path = document.getElementById("trailpath");
  if (!(svg instanceof SVGSVGElement) || !(path instanceof SVGPathElement)) return;

  const len = path.getTotalLength();
  svg.style.setProperty("--len", String(len));

  const meters = document.getElementById("meters");
  let activated = false;

  const go = () => {
    if (activated) return;
    activated = true;
    activateProfile(svg, path, meters);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          go();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(svg);
  } else {
    go();
  }
}
