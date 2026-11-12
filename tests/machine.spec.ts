import { expect, test } from "@playwright/test";

async function scrollClimbIntoView(page: import("@playwright/test").Page) {
  const climb = page.locator("#climb");
  await climb.scrollIntoViewIfNeeded();
  await expect(climb).toBeInViewport();
}

function visibleMachineRoot(page: import("@playwright/test").Page) {
  return page.locator(
    ".machine-figure--desktop:visible .mach, .machine-figure--mobile:visible .mach",
  );
}

test.describe("machine section", () => {
  // These tests measure a real-time animation. With the whole suite running in parallel
  // against several Worker previews, CPU contention can delay frames and observer callbacks
  // past a beat; retry those rare timing misses rather than slowing the animation for tests.
  test.describe.configure({ retries: 2 });

  test("desktop animation updates status and runs counter", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");

    await page.goto("/");
    await scrollClimbIntoView(page);

    const status = page.locator('[data-testid="machine-status"]:visible');
    const stats = page.locator('[data-testid="machine-stats"]:visible');

    const initialStatus = await status.textContent();
    await expect
      .poll(async () => status.textContent(), { timeout: 5_000 })
      .not.toBe(initialStatus);

    await expect
      .poll(async () => stats.textContent(), { timeout: 45_000 })
      .toMatch(/runs [1-9]/);
  });

  test("mobile animation updates status and runs counter", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile only");

    await page.goto("/");
    await scrollClimbIntoView(page);

    const status = page.locator('[data-testid="machine-status"]:visible');
    const stats = page.locator('[data-testid="machine-stats"]:visible');

    const initialStatus = await status.textContent();
    await expect
      .poll(async () => status.textContent(), { timeout: 5_000 })
      .not.toBe(initialStatus);

    await expect
      .poll(async () => stats.textContent(), { timeout: 30_000 })
      .toMatch(/runs [1-9]/);
  });

  test("planner feed wires light up during parallel agents", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");

    await page.goto("/");
    await scrollClimbIntoView(page);

    const status = page.locator('[data-testid="machine-status"]:visible');
    await expect
      .poll(async () => status.textContent(), { timeout: 30_000 })
      .toMatch(/agents building in parallel/);

    for (const wire of ["d-w-f1", "d-w-f2", "d-w-f3"]) {
      await expect
        .poll(
          async () =>
            page
              .locator(`#${wire}`)
              .evaluate((el) => el.classList.contains("live")),
          { timeout: 30_000 },
        )
        .toBe(true);
    }
  });

  test("pauses when scrolled mostly out of view", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");

    await page.goto("/");
    await scrollClimbIntoView(page);

    const status = page.locator('[data-testid="machine-status"]:visible');
    await expect
      .poll(async () => status.textContent(), { timeout: 20_000 })
      .toMatch(/›/);

    await page.locator("#footer").scrollIntoViewIfNeeded();
    // Let the intersection observer report the section off-screen before taking the snapshot,
    // so a beat that lands during the scroll is not counted as motion while paused.
    await page.waitForTimeout(600);
    const statusBefore = await page.locator("#d-status").textContent();
    const packetsBefore = await page.locator("#d-packets .pkt").count();

    await page.waitForTimeout(5_000);

    const statusAfter = await page.locator("#d-status").textContent();
    const packetsAfter = await page.locator("#d-packets .pkt").count();

    expect(statusAfter).toBe(statusBefore);
    expect(packetsAfter).toBe(packetsBefore);
  });

  test("resize does not duplicate queue or memory DOM", async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");

    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page2 = await ctx.newPage();
    await page2.goto("/");
    await scrollClimbIntoView(page2);

    const hiddenDesktopStatus = page2.locator("#d-status");

    const widths = [1440, 390, 1440, 390, 1440] as const;
    for (const w of widths) {
      await page2.setViewportSize({ width: w, height: 900 });
      await page2.waitForTimeout(800);
    }

    await page2.setViewportSize({ width: 390, height: 900 });
    const frozenStatus = await hiddenDesktopStatus.textContent();
    await page2.waitForTimeout(2_000);
    expect(await hiddenDesktopStatus.textContent()).toBe(frozenStatus);

    await page2.setViewportSize({ width: 1440, height: 900 });
    await scrollClimbIntoView(page2);
    await page2.waitForTimeout(1_000);

    const queueRects = await page2.locator("#d-queue rect").count();
    const memRects = await page2.locator("#d-mem rect").count();
    expect(queueRects).toBeLessThanOrEqual(5);
    expect(memRects).toBeLessThanOrEqual(6);

    await ctx.close();
  });

  test("shows desktop figure at 1440 and vertical at 390", async ({ page }, testInfo) => {
    await page.goto("/");
    await scrollClimbIntoView(page);

    const desktop = page.locator(".machine-figure--desktop");
    const mobile = page.locator(".machine-figure--mobile");

    if (testInfo.project.name === "desktop-1440") {
      await expect(desktop).toBeVisible();
      await expect(mobile).toBeHidden();
    } else {
      await expect(mobile).toBeVisible();
      await expect(desktop).toBeHidden();
    }
  });

  test("reduced motion keeps static frame without packets", async ({
    browser,
  }, testInfo) => {
    const context = await browser.newContext({
      reducedMotion: "reduce",
      viewport:
        testInfo.project.name === "mobile-390"
          ? { width: 390, height: 844 }
          : { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await scrollClimbIntoView(page);

    const status = page.locator('[data-testid="machine-status"]:visible');
    const stats = page.locator('[data-testid="machine-stats"]:visible');
    const statusAtStart = await status.textContent();
    const statsAtStart = await stats.textContent();

    await page.waitForTimeout(6_000);

    await expect(status).toHaveText(statusAtStart ?? "");
    await expect(stats).toHaveText(statsAtStart ?? "");

    const root = visibleMachineRoot(page);
    await expect(root.locator(".pkt")).toHaveCount(0);
    await expect(root.locator('[id$="-packets"] .pkt')).toHaveCount(0);

    await context.close();
  });
  test.describe("loop lifecycle", () => {
    type Page = import("@playwright/test").Page;

    const snap = (page: Page, prefix: "d" | "m") =>
      page.evaluate((p) => {
        const status = document.getElementById(`${p}-status`)?.textContent ?? "";
        const packets = document.querySelectorAll(`#${p}-packets .pkt`).length;
        return { status, packets };
      }, prefix);

    async function expectVisibleRuns(page: Page, visible: "d" | "m") {
      const hidden = visible === "d" ? "m" : "d";
      await scrollClimbIntoView(page);
      const start = (await snap(page, visible)).status;
      await expect
        .poll(async () => (await snap(page, visible)).status, { timeout: 5_000 })
        .not.toBe(start);
      const frozen = await snap(page, hidden);
      await page.waitForTimeout(3_000);
      expect(await snap(page, hidden)).toEqual(frozen);
    }

    test("resize round-trips run only the visible figure", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
      test.setTimeout(90_000);
      await page.goto("/");
      for (const w of [1440, 390, 1440, 390] as const) {
        await page.setViewportSize({ width: w, height: 900 });
        await page.waitForTimeout(2_000);
        await expectVisibleRuns(page, w === 1440 ? "d" : "m");
      }
    });

    test("rapid toggles then 390 runs the mobile figure", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
      test.setTimeout(60_000);
      await page.goto("/");
      await scrollClimbIntoView(page);
      await page.waitForTimeout(1_500);
      for (let i = 0; i < 10; i++) {
        await page.setViewportSize({ width: i % 2 === 0 ? 390 : 1440, height: 900 });
        await page.waitForTimeout(200);
      }
      await page.setViewportSize({ width: 390, height: 900 });
      await scrollClimbIntoView(page);
      await expect
        .poll(async () => (await snap(page, "m")).status, { timeout: 5_000 })
        .not.toBe("machine idle");
      const frozen = await snap(page, "d");
      await page.waitForTimeout(3_000);
      expect(await snap(page, "d")).toEqual(frozen);
    });

    test("pause resumes a travel where it stopped", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
      test.setTimeout(60_000);
      await page.goto("/");
      await scrollClimbIntoView(page);

      // Catch a packet the frame it is created and scroll away at once.
      const caught = await page.evaluate(
        () =>
          new Promise<{ x: number; status: string }>((resolve) => {
            const packets = document.getElementById("d-packets")!;
            const mo = new MutationObserver((records) => {
              for (const r of records) {
                for (const n of r.addedNodes) {
                  if (!(n instanceof SVGRectElement)) continue;
                  mo.disconnect();
                  requestAnimationFrame(() => {
                    (window as unknown as { __pkt: Element }).__pkt = n;
                    window.scrollTo(0, document.body.scrollHeight);
                    resolve({
                      x: Number(n.getAttribute("x")),
                      status: document.getElementById("d-status")!.textContent ?? "",
                    });
                  });
                  return;
                }
              }
            });
            mo.observe(packets, { childList: true });
          }),
      );

      await page.waitForTimeout(3_000);
      const paused = await page.evaluate(() => {
        const n = (window as unknown as { __pkt: Element }).__pkt;
        return {
          connected: n.isConnected,
          x: Number(n.getAttribute("x")),
          status: document.getElementById("d-status")!.textContent ?? "",
        };
      });
      expect(paused.connected).toBe(true);
      expect(paused.status).toBe(caught.status);

      // Scroll back and sample the packet every frame.
      const after = await page.evaluate(
        () =>
          new Promise<{ xs: number[]; alive: boolean[]; statuses: string[] }>((resolve) => {
            const n = (window as unknown as { __pkt: Element }).__pkt;
            document.getElementById("climb")!.scrollIntoView({ block: "center" });
            const xs: number[] = [];
            const alive: boolean[] = [];
            const statuses: string[] = [];
            const t0 = performance.now();
            const tick = () => {
              alive.push(n.isConnected);
              if (n.isConnected) {
                xs.push(Number(n.getAttribute("x")));
                statuses.push(document.getElementById("d-status")!.textContent ?? "");
              }
              // Sample by frame count, not wall time: headless Chromium renders the page's
              // blur filters in software, so frames during a scroll can be slow.
              if (alive.length < 4 && performance.now() - t0 < 1_000) requestAnimationFrame(tick);
              else resolve({ xs, alive, statuses });
            };
            requestAnimationFrame(tick);
          }),
      );
      // The paused time was not counted: on the first frame after return the same packet is
      // still there at (about) the paused position, and from then on it only moves forward.
      // (The trigger wire is short, so on a slow headless frame rate it may finish within a
      // few frames; that is fine, a fast-forward would show as a jump on the first frame.)
      expect(after.alive[0]).toBe(true);
      expect(Math.abs(after.xs[0]! - paused.x)).toBeLessThan(5);
      for (let i = 1; i < after.xs.length; i++) {
        expect(after.xs[i]!).toBeGreaterThanOrEqual(after.xs[i - 1]!);
      }
      expect(new Set(after.statuses)).toEqual(new Set([caught.status]));
    });

    test("memory never holds more than six lines", async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
      test.setTimeout(120_000);
      await page.goto("/");
      await scrollClimbIntoView(page);
      let max = 0;
      for (let s = 0; s < 90; s++) {
        max = Math.max(max, await page.locator("#d-mem rect").count());
        await page.waitForTimeout(1_000);
      }
      expect(max).toBeLessThanOrEqual(6);
    });
  });
});
