function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initStoryReader() {
  const found = document.querySelector<HTMLElement>(".rd");
  if (!found) return;
  const rd: HTMLElement = found;
  if (rd.parentElement !== document.body) {
    document.body.appendChild(rd);
  }

  const cards = [...document.querySelectorAll<HTMLButtonElement>("#camp .card")];
  const panes = [...rd.querySelectorAll<HTMLElement>(".story-pane")];
  const tabs = [...rd.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const scrollEl = rd.querySelector<HTMLElement>(".scroll");
  const bar = rd.querySelector<HTMLElement>(".bar i");
  const countEl = rd.querySelector("#reader-count");
  const metaEl = rd.querySelector("#reader-meta");
  const prevBtn = rd.querySelector<HTMLButtonElement>("#reader-prev");
  const nextBtn = rd.querySelector<HTMLButtonElement>("#reader-next");
  const closeDesktop = rd.querySelector<HTMLButtonElement>("#reader-close-desktop");
  const closeMobile = rd.querySelector<HTMLButtonElement>("#reader-close-mobile");
  const scrim = rd.querySelector(".scrim");
  const panel = rd.querySelector<HTMLElement>(".panel");

  const N = panes.length;
  const seen = new Set<number>();
  let cur = -1;
  let lockedScrollY = 0;

  const labels = panes.map((p) => p.dataset.label ?? "");
  const reduce = prefersReducedMotion();
  const siteRoot = document.querySelector<HTMLElement>(".site");

  rd.inert = true;

  function focusableIn(root: HTMLElement): HTMLElement[] {
    return [
      ...root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => el.offsetParent !== null || el === document.activeElement);
  }

  function paneIndex(i: number) {
    return ((i % N) + N) % N;
  }

  function show(i: number, dir = 0) {
    cur = paneIndex(i);
    seen.add(cur);
    panes.forEach((pane, j) => {
      const on = j === cur;
      pane.hidden = !on;
      pane.toggleAttribute("hidden", !on);
    });
    tabs.forEach((tab, j) => {
      const selected = j === cur;
      tab.setAttribute("aria-selected", String(selected));
      tab.classList.toggle("seen", seen.has(j) && j !== cur);
    });
    cards.forEach((card, j) => card.classList.toggle("seen", seen.has(j)));

    const padded = (n: number) => String(n).padStart(2, "0");
    if (metaEl) {
      metaEl.textContent = `CAMP · ${padded(cur + 1)} / ${padded(N)}`;
    }
    if (countEl) {
      countEl.textContent = `${padded(cur + 1)} / ${padded(N)}`;
    }

  const activePane = panes[cur]!;
    const heading = activePane.querySelector("h3");
    if (heading) {
      panel?.setAttribute("aria-labelledby", heading.id);
    }

    if (prevBtn) {
      const prev = paneIndex(cur - 1);
      prevBtn.innerHTML = `← <span>${labels[prev]}</span>`;
    }
    if (nextBtn) {
      const next = paneIndex(cur + 1);
      nextBtn.innerHTML = `<span>${labels[next]}</span> →`;
    }

    const body = activePane.querySelector<HTMLElement>(".body");
    if (body && !reduce && dir) {
      body.classList.remove("swap");
      void body.offsetWidth;
      body.style.setProperty("--dx", `${dir * 18}px`);
      body.classList.add("swap");
    }
    activePane.querySelectorAll(".body p").forEach((p, k) => {
      p.classList.add("show");
      if (!reduce && !dir) {
        p.classList.remove("show");
        setTimeout(() => p.classList.add("show"), 160 + k * 70);
      }
    });

    if (scrollEl) scrollEl.scrollTop = 0;
    if (bar) bar.style.width = "0";
  }

  function lockScroll() {
    lockedScrollY = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    window.scrollTo(0, lockedScrollY);
  }

  function focusClose() {
    const target =
      closeDesktop && closeDesktop.offsetParent ? closeDesktop : closeMobile;
    target?.focus({ preventScroll: true });
  }

  function applyLayout() {
    rd.style.position = "fixed";
    rd.style.inset = "0";
    rd.style.zIndex = "50";
    if (!panel) return;
  const mobile = window.matchMedia("(max-width: 560px)").matches;
    if (mobile) {
      // Size and position come from StoryReader.astro's phone rules (full screen incl. under
      // Safari's bars); only make sure nothing from the desktop layout lingers.
      panel.style.position = "";
      panel.style.inset = "";
      panel.style.width = "";
      panel.style.height = "";
    } else {
      panel.style.position = "";
      panel.style.inset = "";
      panel.style.width = "";
      panel.style.height = "";
    }
  }

  function open(i: number, card: HTMLButtonElement) {
    void card;
    if (rd.parentElement !== document.body) {
      document.body.appendChild(rd);
    }
    applyLayout();
    show(i);
    rd.inert = false;
    rd.style.visibility = "visible";
    if (siteRoot) siteRoot.inert = true;
    rd.classList.add("on");
    rd.setAttribute("aria-hidden", "false");
    lockScroll();
    if (!reduce) {
      panel?.classList.add("open");
    }
    if (window.matchMedia("(max-width: 560px)").matches) {
      panel?.style.setProperty("transform", "none");
    }
    focusClose();
  }

  function sealClosed() {
    rd.inert = true;
    if (siteRoot) siteRoot.inert = false;
    if (!reduce) {
      rd.style.visibility = "hidden";
    }
  }

  function close() {
    rd.classList.remove("on");
    rd.setAttribute("aria-hidden", "true");
    rd.inert = true;
    panel?.classList.remove("open");
    panel?.style.removeProperty("transform");
    unlockScroll();
    if (siteRoot) siteRoot.inert = false;
    const returnTo = cards[cur];
    if (reduce) {
      sealClosed();
    } else {
      const done = () => {
        panel?.removeEventListener("transitionend", done);
        if (!rd.classList.contains("on")) sealClosed();
      };
      panel?.addEventListener("transitionend", done);
      window.setTimeout(() => {
        if (!rd.classList.contains("on")) sealClosed();
      }, 600);
    }
    returnTo?.focus({ preventScroll: true });
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const i = Number(card.dataset.i);
      open(i, card);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const j = Number(tab.dataset.i);
      if (j !== cur) show(j, j > cur ? 1 : -1);
    });
  });

  prevBtn?.addEventListener("click", () => show(cur - 1, -1));
  nextBtn?.addEventListener("click", () => show(cur + 1, 1));
  closeDesktop?.addEventListener("click", close);
  closeMobile?.addEventListener("click", close);
  scrim?.addEventListener("click", close);

  // On document, not the panel: clicking the story text moves focus to <body>, and the keys
  // must keep working wherever focus is while the reader is open.
  document.addEventListener("keydown", (e) => {
    if (!rd.classList.contains("on")) return;
    if (e.key === "Tab" && panel) {
      const items = focusableIn(panel);
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items.at(-1)!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(cur + 1, 1);
    if (e.key === "ArrowLeft") show(cur - 1, -1);
  });

  scrollEl?.addEventListener("scroll", () => {
    if (!bar || !scrollEl) return;
    const max = scrollEl.scrollHeight - scrollEl.clientHeight;
    bar.style.width = `${max > 0 ? (scrollEl.scrollTop / max) * 100 : 100}%`;
  });

  let sx = 0;
  let sy = 0;
  scrollEl?.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0]!.clientX;
      sy = e.touches[0]!.clientY;
    },
    { passive: true },
  );
  scrollEl?.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0]!.clientX - sx;
      const dy = e.changedTouches[0]!.clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      } else if (dy > 90 && scrollEl.scrollTop <= 0) {
        close();
      }
    },
    { passive: true },
  );

  if (reduce) {
    rd.classList.add("reduce");
  }
}

initStoryReader();
