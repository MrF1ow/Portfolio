import { expect, test, type TestInfo } from "@playwright/test";
import { site } from "../src/data/site";

async function holdTrailIntersection(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    (
      window as unknown as {
        __TRAIL_HOLD_IO?: boolean;
      }
    ).__TRAIL_HOLD_IO = true;

  const Original = window.IntersectionObserver;
  window.IntersectionObserver = class extends Original {
    constructor(
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit,
    ) {
      super((entries, observer) => {
        if (
          (window as unknown as { __TRAIL_HOLD_IO?: boolean }).__TRAIL_HOLD_IO
        ) {
          return;
        }
        callback(entries, observer);
      }, options);
    }
  };
  });
}

async function releaseTrailIntersection(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    (window as unknown as { __TRAIL_HOLD_IO?: boolean }).__TRAIL_HOLD_IO =
      false;
  });
}

async function scrollProfileOutOfView(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const svg = document.getElementById("profile");
    if (!svg) return;
    let y = window.scrollY;
    for (let i = 0; i < 40; i++) {
      const r = svg.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) break;
      y += Math.round(window.innerHeight * 0.45);
      window.scrollTo(0, y);
    }
  });
}

test.describe("trail", () => {
  test("profile path draws fully when scrolled into view", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();

    const path = page.locator("#trailpath");
    await expect
      .poll(
        async () =>
          path.evaluate((el) => getComputedStyle(el).strokeDashoffset),
        // Observer fires on intersection, then a 2.4s ease-out reaches exactly 0 at its end.
        { timeout: 6_000 },
      )
      .toBe("0px");
  });

  test("path starts hidden before scroll into view", async ({ page }) => {
    await holdTrailIntersection(page);
    await page.goto("/");
    await page.waitForFunction(() => {
      const svg = document.getElementById("profile");
      return Boolean(svg?.style.getPropertyValue("--len"));
    });
    await scrollProfileOutOfView(page);

    const path = page.locator("#trailpath");
    const dash = await path.evaluate((el) => {
      const pathEl = el as SVGPathElement;
      const style = getComputedStyle(pathEl);
      const offset = parseFloat(style.strokeDashoffset);
      const array = parseFloat(style.strokeDasharray);
      return { offset, array, hasOn: pathEl.ownerSVGElement?.classList.contains("on") };
    });

    expect(dash.hasOn).toBe(false);
    expect(dash.offset).toBeGreaterThan(0);
    expect(dash.array).toBeGreaterThan(0);
    expect(dash.offset).toBeCloseTo(dash.array, -1);
    await releaseTrailIntersection(page);
  });

  test("shows all timeline years", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("#trail").innerText();
    for (const year of [2022, 2023, 2024, 2025, 2026]) {
      expect(text).toContain(String(year));
    }
  });

  test("mobile shows year list and hides SVG descriptions", async ({
    page,
  }, testInfo: TestInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile layout only");

    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();

    await expect(page.locator("#trail .tlist")).toBeVisible();
    await expect(page.locator("#trail #profile .desc").first()).toBeHidden();
  });

  test("mobile year list is one line per entry with compact height", async ({
    page,
  }, testInfo: TestInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile layout only");

    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();

    const rows = page.locator("#trail .tlist-row");
    await expect(rows).toHaveCount(5);

    const listBox = await page.locator("#trail .tlist").boundingBox();
    expect(listBox).not.toBeNull();
    expect(listBox!.height).toBeLessThan(200);

    for (let i = 0; i < 5; i++) {
      const row = rows.nth(i);
      const box = await row.boundingBox();
      const lineHeight = await row.evaluate((el) =>
        parseFloat(getComputedStyle(el).lineHeight),
      );
      expect(box).not.toBeNull();
      expect(box!.height).toBeLessThanOrEqual(lineHeight * 1.25);
    }
  });

  test("desktop chart notes avoid trail path and year labels stay small", async ({
    page,
  }, testInfo: TestInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop layout only");

    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();

    const path = page.locator("#trailpath");
    const overlaps = await path.evaluate((trailEl) => {
      const path = trailEl as SVGPathElement;
      const len = path.getTotalLength();
      const points: { x: number; y: number }[] = [];
      for (let d = 0; d <= len; d += 4) {
        const p = path.getPointAtLength(d);
        points.push({ x: p.x, y: p.y });
      }

      const svg = path.ownerSVGElement!;
      const notes = [...svg.querySelectorAll<SVGTextElement>("text.desc")];
      return notes.some((note) => {
        const bb = note.getBBox();
        const margin = 2;
        const left = bb.x - margin;
        const right = bb.x + bb.width + margin;
        const top = bb.y - margin;
        const bottom = bb.y + bb.height + margin;
        return points.some(
          (p) => p.x >= left && p.x <= right && p.y >= top && p.y <= bottom,
        );
      });
    });
    expect(overlaps).toBe(false);

    const yearHeights = await page
      .locator('#trail #profile text:not(.desc)')
      .evaluateAll((els) =>
        els.map((el) => (el as SVGTextElement).getBBox().height),
      );
    for (const h of yearHeights) {
      expect(h).toBeLessThan(22);
    }
  });

  test("desktop timeline list is in the accessibility tree", async ({
    page,
  }, testInfo: TestInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop layout only");

    await page.goto("/");

    const snapshot = await page.locator("#trail").ariaSnapshot();
    expect(snapshot).toContain("2022");
    expect(snapshot).toContain("agents write it");
  });

  test("meters do not decrease when section is in view", async ({ page }) => {
    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();

    const tsRow = page.locator('#trail .meter-row[data-name="typescript"]');
    const initialBar = await tsRow.locator(".bar").innerText();

    await page.waitForTimeout(8_000);

    const laterBar = await tsRow.locator(".bar").innerText();
    expect(laterBar.length).toBeGreaterThanOrEqual(initialBar.length);
  });

  test("profile does not activate without scrolling into view", async ({
    page,
  }) => {
    await holdTrailIntersection(page);
    await page.goto("/");
    await page.waitForFunction(() => {
      const svg = document.getElementById("profile");
      return Boolean(svg?.style.getPropertyValue("--len"));
    });
    await scrollProfileOutOfView(page);

    await page.waitForTimeout(7_000);

    const hasOn = await page.locator("#profile").evaluate((el) =>
      el.classList.contains("on"),
    );
    expect(hasOn).toBe(false);
    await releaseTrailIntersection(page);
  });

  test("shows six fluent skills", async ({ page }) => {
    await page.goto("/");
    const names = page.locator("#trail .meter .nm");
    await expect(names).toHaveCount(6);
    const labels = (await names.allInnerTexts()).map((t) => t.trim().toLowerCase());
    expect(labels).toEqual(site.fluent.map((f) => f.name));
  });
});

test.describe("trail reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("profile path is fully drawn immediately on scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();

    const path = page.locator("#trailpath");
    await expect
      .poll(
        async () =>
          path.evaluate((el) => getComputedStyle(el).strokeDashoffset),
        { timeout: 1_000 },
      )
      .toBe("0px");

    const transition = await path.evaluate(
      (el) => getComputedStyle(el).transitionDuration,
    );
    const durations = transition.split(",").map((d) => parseFloat(d));
    expect(durations.every((d) => d === 0)).toBe(true);
  });

  test("points and area are fully visible shortly after scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#trail").scrollIntoViewIfNeeded();
    await page.waitForTimeout(50);

    const opacities = await page.locator("#profile .pt, #profile .area").evaluateAll(
      (els) => els.map((el) => getComputedStyle(el).opacity),
    );
    expect(opacities.every((o) => parseFloat(o) === 1)).toBe(true);
  });
});
