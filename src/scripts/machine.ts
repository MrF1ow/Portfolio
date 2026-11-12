const SVG_NS = "http://www.w3.org/2000/svg";

type FigurePrefix = "d" | "m";

type MachineFigure = {
  root: Element;
  prefix: FigurePrefix;
};

function figureId(prefix: FigurePrefix, id: string): string {
  return `${prefix}-${id}`;
}

function el<T extends Element = Element>(
  root: Element,
  prefix: FigurePrefix,
  id: string,
): T | null {
  return root.querySelector(`#${CSS.escape(figureId(prefix, id))}`) as T | null;
}

function mk(
  tag: string,
  attrs: Record<string, string>,
  parent?: Element,
): SVGElement {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, value);
  }
  parent?.appendChild(node);
  return node;
}

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** The figure the container query currently shows (the other is display: none). */
function pickFigure(section: HTMLElement): MachineFigure | null {
  for (const prefix of ["d", "m"] as const) {
    const root = section.querySelector<HTMLElement>(`[data-machine-figure="${prefix}"]`);
    if (root?.checkVisibility()) return { root, prefix };
  }
  return null;
}

function paintStaticFrame(fig: MachineFigure): void {
  const { root, prefix } = fig;
  const status = el<SVGTextElement>(root, prefix, "status");
  const stats = el<SVGTextElement>(root, prefix, "stats");
  const shipped = el<SVGTextElement>(root, prefix, "shipped");

  if (status) {
    status.textContent = "› reviewing the diff";
    status.classList.remove("fail", "ok");
    status.style.fill = "";
  }
  if (stats) stats.textContent = "runs 2 · retries 1 · shipped 2";
  if (shipped) shipped.textContent = "002";

  const queue = el<SVGGElement>(root, prefix, "queue");
  if (queue) {
    const qd = queue.dataset;
    const qx = +(qd.x ?? 0);
    const qy = +(qd.y ?? 0);
    const qs = +(qd.step ?? 11);
    const qmin = +(qd.min ?? 40);
    const qmax = +(qd.max ?? 80);
    const qh = +(qd.h ?? 6);
    queue.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const w = qmin + (qmax - qmin) * (0.35 + i * 0.12);
      mk(
        "rect",
        {
          class: i === 0 ? "ink" : "soft",
          x: String(qx),
          y: String(qy + i * qs),
          width: String(w),
          height: String(qh),
        },
        queue,
      );
    }
  }

  const bars = el<SVGGElement>(root, prefix, "bars");
  if (bars) {
    const bd = bars.dataset;
    bars.innerHTML = "";
    for (let i = 0; i < 7; i++) {
      const h = 18 + i * 4;
      mk(
        "rect",
        {
          class: i === 6 ? "ink" : "soft",
          x: String(+(bd.x ?? 0) + i * +(bd.step ?? 15)),
          y: String(+(bd.base ?? 0) - h),
          width: String(+(bd.w ?? 9)),
          height: String(h),
          style: `--i:${i}`,
        },
        bars,
      );
    }
  }

  const mem = el<SVGGElement>(root, prefix, "mem");
  if (mem) {
    const md = mem.dataset;
    mem.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const w = +(md.min ?? 30) + (+(md.max ?? 100) - +(md.min ?? 30)) * 0.5;
      mk(
        "rect",
        {
          class: i === 0 ? "ink" : "soft",
          x: String(+(md.x ?? 0)),
          y: String(+(md.y ?? 0) + i * +(md.step ?? 11)),
          width: String(w),
          height: "4",
        },
        mem,
      );
    }
  }

  const packets = el<SVGGElement>(root, prefix, "packets");
  if (packets) packets.innerHTML = "";
}

/** Thrown out of every await point once a run is aborted; caught once at the loop top. */
class Cancelled extends Error {
  constructor() {
    super("machine run cancelled");
  }
}

/**
 * Running time for the page: frozen while paused, so a sleep of N ms means
 * N ms of running time and a travel resumes from where it stopped.
 */
class Clock {
  private pausedAt: number | null = null;
  private pausedTotal = 0;
  private gate: Promise<void> = Promise.resolve();
  private open: () => void = () => {};

  now(): number {
    const t = this.pausedAt ?? performance.now();
    return t - this.pausedTotal;
  }

  get paused(): boolean {
    return this.pausedAt !== null;
  }

  pause(): void {
    if (this.pausedAt !== null) return;
    this.pausedAt = performance.now();
    this.gate = new Promise((resolve) => {
      this.open = resolve;
    });
  }

  resume(): void {
    if (this.pausedAt === null) return;
    this.pausedTotal += performance.now() - this.pausedAt;
    this.pausedAt = null;
    this.open();
  }

  /** Resolves when not paused; rejects with Cancelled on abort. */
  ready(signal: AbortSignal): Promise<void> {
    if (signal.aborted) return Promise.reject(new Cancelled());
    if (!this.paused) return Promise.resolve();
    return untilAbort(this.gate, signal);
  }
}

function untilAbort<T>(p: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(new Cancelled());
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new Cancelled());
    signal.addEventListener("abort", onAbort, { once: true });
    p.then(
      (v) => {
        signal.removeEventListener("abort", onAbort);
        resolve(v);
      },
      (e: unknown) => {
        signal.removeEventListener("abort", onAbort);
        reject(e);
      },
    );
  });
}

/** Sleep `ms` of running time. */
async function sleep(clock: Clock, ms: number, signal: AbortSignal): Promise<void> {
  await clock.ready(signal);
  const end = clock.now() + ms;
  for (;;) {
    await clock.ready(signal);
    const remaining = end - clock.now();
    if (remaining <= 0) return;
    await untilAbort(
      new Promise<void>((r) => setTimeout(r, Math.min(remaining, 50))),
      signal,
    );
  }
}

/** Calls `frame(t)` each animation frame for `ms` of running time, t in [0, 1]. */
async function animate(
  clock: Clock,
  ms: number,
  signal: AbortSignal,
  frame: (t: number) => void,
): Promise<void> {
  await clock.ready(signal);
  const t0 = clock.now();
  for (;;) {
    await clock.ready(signal);
    const t = Math.min(1, (clock.now() - t0) / ms);
    frame(t);
    if (t >= 1) return;
    await untilAbort(
      new Promise<void>((r) => requestAnimationFrame(() => r())),
      signal,
    );
  }
}

const STATE_CLASSES = ["hot", "done", "live", "pass", "fail", "ok"];

/** Clears what any earlier run left in this figure and paints its starting state. */
function resetFigureDom(fig: MachineFigure): SVGRectElement[] {
  const { root, prefix } = fig;
  const mach = el(root, prefix, "mach") ?? root;
  for (const cls of STATE_CLASSES) {
    // Labels carry a static `fail` tone; only run state is cleared.
    mach.querySelectorAll(`.${cls}:not(.lbl)`).forEach((n) => n.classList.remove(cls));
  }
  const verdict = el(root, prefix, "verdict");
  if (verdict) verdict.textContent = "";
  mach.querySelectorAll(".prog").forEach((n) => n.setAttribute("width", "0"));
  el(root, prefix, "queue")?.replaceChildren();
  el(root, prefix, "packets")?.replaceChildren();
  drawBars(fig);

  const memLines: SVGRectElement[] = [];
  const memG = el<SVGGElement>(root, prefix, "mem");
  if (memG) {
    memG.replaceChildren();
    const md = memG.dataset;
    for (let i = 0; i < 3; i++) {
      const w =
        +(md.min ?? 30) + (+(md.max ?? 100) - +(md.min ?? 30)) * (0.4 + i * 0.15);
      memLines.push(
        mk(
          "rect",
          {
            class: "soft",
            x: String(+(md.x ?? 0)),
            y: String(+(md.y ?? 0) + i * +(md.step ?? 11)),
            width: String(w),
            height: "4",
          },
          memG,
        ) as SVGRectElement,
      );
    }
  }
  return memLines;
}

function drawBars(fig: MachineFigure): void {
  const barsG = el<SVGGElement>(fig.root, fig.prefix, "bars");
  if (!barsG) return;
  const bd = barsG.dataset;
  barsG.replaceChildren();
  for (let i = 0; i < 7; i++) {
    const h = 12 + Math.random() * (+(bd.maxh ?? 56) - 12);
    mk(
      "rect",
      {
        class: i === 6 ? "ink" : "soft",
        x: String(+(bd.x ?? 0) + i * +(bd.step ?? 15)),
        y: String(+(bd.base ?? 0) - h),
        width: String(+(bd.w ?? 9)),
        height: String(h),
        style: `--i:${i}`,
      },
      barsG,
    );
  }
}

/** Runs jobs on `fig` until `signal` aborts. Every await point throws Cancelled on abort. */
async function runJobs(fig: MachineFigure, clock: Clock, signal: AbortSignal): Promise<void> {
  const { root, prefix } = fig;
  const wait = (ms: number) => sleep(clock, ms, signal);
  /** Fire-and-forget step on the running clock; dropped silently on abort. */
  const later = (ms: number, fn: () => void) => {
    wait(ms).then(fn, () => {});
  };

  const hot = (id: string, on = true) =>
    el(root, prefix, id)?.classList.toggle("hot", on);
  const status = (s: string, tone?: "fail" | "ok") => {
    const node = el<SVGTextElement>(root, prefix, "status");
    if (!node) return;
    node.textContent = s;
    node.classList.remove("fail", "ok");
    if (tone) node.classList.add(tone);
  };

  const stat = { runs: 0, retries: 0, shipped: 0 };
  const stats = () => {
    const line = `runs ${stat.runs} · retries ${stat.retries} · shipped ${stat.shipped}`;
    const statsEl = el(root, prefix, "stats");
    const shippedEl = el(root, prefix, "shipped");
    if (statsEl) statsEl.textContent = line;
    if (shippedEl) shippedEl.textContent = String(stat.shipped).padStart(3, "0");
  };

  const travel = async (wire: string, ms = 700, red = false): Promise<void> => {
    const path = el<SVGPathElement>(root, prefix, `w-${wire}`);
    const packets = el<SVGGElement>(root, prefix, "packets");
    if (!path || !packets) return;
    const len = path.getTotalLength();
    const pk = mk("rect", { class: red ? "pkt r" : "pkt", width: "6", height: "6" }, packets);
    path.classList.add("live");
    // An aborted run drops its in-flight packet at once and changes nothing after.
    const drop = () => {
      pk.remove();
      path.classList.remove("live");
    };
    signal.addEventListener("abort", drop, { once: true });
    try {
      await animate(clock, ms, signal, (t) => {
        const pt = path.getPointAtLength(ease(t) * len);
        pk.setAttribute("x", String(pt.x - 3));
        pk.setAttribute("y", String(pt.y - 3));
      });
    } finally {
      signal.removeEventListener("abort", drop);
    }
    pk.remove();
    later(250, () => path.classList.remove("live"));
  };

  const queue = el<SVGGElement>(root, prefix, "queue");
  if (!queue) return;
  const qd = queue.dataset;
  const qx = +(qd.x ?? 0);
  const qy = +(qd.y ?? 0);
  const qs = +(qd.step ?? 16);
  const qmin = +(qd.min ?? 40);
  const qmax = +(qd.max ?? 80);
  const qh = +(qd.h ?? 6);
  const qItems: SVGRectElement[] = [];
  const memLines = resetFigureDom(fig);

  const queueFill = () => {
    while (qItems.length < 5) {
      const i = qItems.length;
      const r = mk(
        "rect",
        {
          class: i === 0 ? "ink" : "soft",
          x: String(qx),
          y: String(qy + i * qs),
          width: String(qmin + Math.random() * (qmax - qmin)),
          height: String(qh),
        },
        queue,
      ) as SVGRectElement;
      r.style.opacity = "0";
      requestAnimationFrame(() => {
        if (!signal.aborted) r.style.opacity = "1";
      });
      qItems.push(r);
    }
  };

  const queueTake = () => {
    const r = qItems.shift();
    if (!r) return;
    r.style.transform = "translateX(30px)";
    r.style.opacity = "0";
    later(500, () => r.remove());
    qItems.forEach((q) => {
      q.style.transform = `translateY(${-qs}px)`;
    });
    later(520, () => {
      qItems.forEach((q, i) => {
        q.style.transition = "none";
        q.style.transform = "";
        q.setAttribute("y", String(qy + i * qs));
        q.setAttribute("class", i === 0 ? "ink" : "soft");
        void q.getBBox();
        q.style.transition = "";
      });
      queueFill();
    });
  };

  const remember = () => {
    const memG = el<SVGGElement>(root, prefix, "mem");
    if (!memG) return;
    const md = memG.dataset;
    const w = +(md.min ?? 30) + Math.random() * (+(md.max ?? 100) - +(md.min ?? 30));
    const r = mk(
      "rect",
      { class: "ink new", x: String(+(md.x ?? 0)), y: String(+(md.y ?? 0)), width: String(w), height: "4" },
      memG,
    ) as SVGRectElement;
    memLines.unshift(r);
    while (memLines.length > 6) memLines.pop()?.remove();
    memLines.forEach((m, i) => {
      m.setAttribute("y", String(+(md.y ?? 0) + i * +(md.step ?? 11)));
      if (i > 0) m.setAttribute("class", "soft");
    });
  };

  const agent = async (i: number) => {
    const g = el<SVGGElement>(root, prefix, `a${i}`);
    const bar = g?.querySelector<SVGRectElement>(".prog");
    if (!g || !bar) return;
    g.classList.remove("done");
    g.classList.add("hot");
    const full = +(bar.dataset.w ?? 100) || 100;
    await animate(clock, 1300 + Math.random() * 1600, signal, (t) => {
      bar.setAttribute("width", String(full * ease(t)));
    });
    g.classList.remove("hot");
    g.classList.add("done");
    await travel(`j${i}`, 600);
  };

  let lastFail = false;
  await wait(600);

  for (;;) {
    const trig = (["cron", "webhook", "issue"] as const)[(Math.random() * 3) | 0]!;
    status(`› ${trig} fired · job #${stat.runs + 1}`);
    hot(`t-${trig}`);
    await travel(trig, 650);
    hot(`t-${trig}`, false);

    hot("intake");
    queueFill();
    queueTake();
    await wait(350);
    await travel("ip", 450);
    hot("intake", false);

    if (stat.runs % 2 === 0) {
      status("› you set the goal");
      hot("you");
      await travel("you", 500);
      hot("you", false);
    }

    for (;;) {
      status("› planner breaks it into three tasks");
      hot("planner");
      await wait(1300);
      [1, 2, 3].forEach((i) => {
        const g = el(root, prefix, `a${i}`);
        g?.classList.remove("done");
        g?.querySelector(".prog")?.setAttribute("width", "0");
      });
      status("› agents building in parallel");
      await Promise.all(
        [1, 2, 3].map(async (i) => {
          await travel(`f${i}`, 550);
          await agent(i);
        }),
      );
      hot("planner", false);

      status("› running the tests");
      const tests = el(root, prefix, "tests");
      tests?.classList.remove("pass", "fail");
      tests?.classList.add("hot");
      await wait(1250);
      tests?.classList.remove("hot");

      const verdict = el(root, prefix, "verdict");
      if (!lastFail && Math.random() < 0.35) {
        tests?.classList.add("fail");
        if (verdict) verdict.textContent = "✗";
        status("✗ 2 tests failing · kicked back to the planner", "fail");
        stat.retries++;
        stats();
        lastFail = true;
        await travel("rt", 1100, true);
        tests?.classList.remove("fail");
        continue;
      }

      tests?.classList.add("pass");
      if (verdict) verdict.textContent = "✓";
      await travel("dr", 450);
      status("› reviewing the diff");
      hot("review");
      await wait(1250);
      hot("review", false);

      const review = el(root, prefix, "review");
      if (!lastFail && Math.random() < 0.2) {
        review?.classList.add("fail");
        status("✗ review found a missing edge case", "fail");
        stat.retries++;
        stats();
        lastFail = true;
        await travel("rr", 700, true);
        review?.classList.remove("fail");
        tests?.classList.remove("pass");
        await travel("rt", 900, true);
        continue;
      }
      lastFail = false;
      break;
    }

    await travel("rs", 450);
    hot("ship");
    stat.shipped++;
    stats();
    status("✓ shipped", "ok");
    await wait(900);
    hot("ship", false);
    el(root, prefix, "tests")?.classList.remove("pass");

    await travel("down", 900);
    hot("observe");
    drawBars(fig);
    status("› watching it in production");
    await wait(1100);
    hot("observe", false);

    await travel("om", 700);
    hot("memory");
    remember();
    status("› saving what it learned");
    await wait(900);
    hot("memory", false);

    [1, 2, 3].forEach((i) => el(root, prefix, `a${i}`)?.classList.remove("done"));

    await travel("learn", 1300);
    stat.runs++;
    stats();
    status(`✓ job ${stat.runs} done · the system learned from it`, "ok");
    await wait(1100);
  }
}

/**
 * One controller per page: at most one run, always on the visible figure.
 * Switching figures aborts the old run synchronously; scrolling away or hiding
 * the tab only pauses the shared clock.
 */
export function initMachine(section: HTMLElement): void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clock = new Clock();
  let current: { prefix: FigurePrefix; abort: AbortController } | null = null;
  let intersecting = false;

  const update = () => {
    const fig = pickFigure(section);
    if (reduced) {
      if (fig) paintStaticFrame(fig);
      return;
    }
    if (current && current.prefix !== fig?.prefix) {
      current.abort.abort();
      current = null;
    }
    if (!intersecting || document.hidden || !fig) {
      clock.pause();
      return;
    }
    if (!current) {
      const abort = new AbortController();
      current = { prefix: fig.prefix, abort };
      runJobs(fig, clock, abort.signal).catch((e: unknown) => {
        if (!(e instanceof Cancelled)) throw e;
      });
    }
    clock.resume();
  };

  const io = new IntersectionObserver(
    (entries) => {
      const last = entries[entries.length - 1];
      if (last) intersecting = last.isIntersecting;
      update();
    },
    { threshold: 0.2 },
  );
  io.observe(section);

  document.addEventListener("visibilitychange", update);

  let raf = 0;
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(update);
  });
  ro.observe(section);

  if (reduced) update();
}
