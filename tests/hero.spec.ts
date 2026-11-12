import { expect, test, type Page } from "@playwright/test";
import { site } from "../src/data/site";

const headline =
  "I don't write code. I build what writes it." as const;

const HERO_SETTLE_MS = 3000;

function normalizeWs(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function parseSrcset(srcset: string) {
  return srcset.split(",").map((part) => {
    const trimmed = part.trim();
    const lastSpace = trimmed.lastIndexOf(" ");
    if (lastSpace <= 0) return { url: trimmed, width: 0 };
    const url = trimmed.slice(0, lastSpace);
    const descriptor = trimmed.slice(lastSpace + 1);
    const width = descriptor.endsWith("w")
      ? Number(descriptor.slice(0, -1))
      : 0;
    return { url, width };
  });
}

function urlMatchesCandidate(candidateUrl: string, src: string) {
  if (!candidateUrl || !src) return false;
  if (src.includes(candidateUrl)) return true;
  const tail = candidateUrl.split("/").pop();
  return tail ? src.includes(tail) : false;
}

function widthForSrc(srcset: string, src: string) {
  const candidates = parseSrcset(srcset);
  const hit = candidates.find((c) => urlMatchesCandidate(c.url, src));
  return hit?.width ?? 0;
}

function boxesIntersect(
  a: { top: number; right: number; bottom: number; left: number },
  b: { top: number; right: number; bottom: number; left: number },
) {
  return !(
    a.right <= b.left ||
    a.left >= b.right ||
    a.bottom <= b.top ||
    a.top >= b.bottom
  );
}

async function waitForHeroEntrance(page: Page) {
  await page.waitForTimeout(HERO_SETTLE_MS);
}

async function heroH1Text(page: Page) {
  const h1 = page.locator("#hero h1");
  return normalizeWs(await h1.innerText());
}

async function headerNavLinks(page: Page) {
  return page.locator("#hero nav.links a, #hero nav .links a").all();
}

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth).toBe(overflow.clientWidth);
}

test.describe("hero", () => {
  test("headline and header links", async ({ page }) => {
    await page.goto("/");
    expect(await heroH1Text(page)).toBe(headline);

    const links = await headerNavLinks(page);
    expect(links).toHaveLength(2);

    const labels = await Promise.all(links.map((l) => l.innerText()));
    const hrefs = await Promise.all(links.map((l) => l.getAttribute("href")));
    expect(labels.map((t) => normalizeWs(t))).toEqual(["GitHub ↗", "X ↗"]);
    expect(hrefs).toEqual([site.links.github, site.links.x]);

    for (const link of links) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener");
    }
  });

  test("desktop hero geometry after entrance", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop layout only");
    await page.goto("/");
    await waitForHeroEntrance(page);

    const metrics = await page.evaluate(() => {
      const hero = document.querySelector("#hero");
      const glass = document.querySelector("#hero .glass");
      const marker = document.querySelector("#hero .marker");
      const h1 = document.querySelector("#hero h1");
      const photo =
        document.querySelector("#hero #photo") ??
        document.querySelector("#hero .photo img") ??
        document.querySelector("#hero .photo");
      if (!hero || !glass || !marker || !h1 || !photo) return null;

      const spans = [...h1.querySelectorAll(":scope > span")];
      let lineCount = 0;
      let wrapped = false;
      for (const span of spans) {
        const range = document.createRange();
        range.selectNodeContents(span);
        const tops = [
          ...new Set(
            [...range.getClientRects()]
              .filter((r) => r.height > 0)
              .map((r) => Math.round(r.top)),
          ),
        ];
        lineCount += tops.length;
        if (tops.length > 1) wrapped = true;
      }

      const g = glass.getBoundingClientRect();
      const m = marker.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      const p = photo.getBoundingClientRect();

      return {
        heroHeight: h.height,
        glassWidth: g.width,
        glassRight: g.right,
        photoCenterX: p.left + p.width / 2,
        lineCount,
        wrapped,
        spanCount: spans.length,
        glassBox: {
          top: g.top,
          right: g.right,
          bottom: g.bottom,
          left: g.left,
        },
        markerBox: {
          top: m.top,
          right: m.right,
          bottom: m.bottom,
          left: m.left,
        },
      };
    });

    expect(metrics).not.toBeNull();
    expect(metrics!.glassWidth).toBeGreaterThanOrEqual(540);
    expect(metrics!.glassWidth).toBeLessThanOrEqual(620);
    expect(metrics!.heroHeight).toBeGreaterThanOrEqual(740);
    expect(metrics!.spanCount).toBe(3);
    expect(metrics!.wrapped).toBe(false);
    expect(metrics!.lineCount).toBe(3);
    expect(metrics!.glassRight).toBeLessThan(metrics!.photoCenterX);
    expect(boxesIntersect(metrics!.glassBox, metrics!.markerBox)).toBe(false);

    await assertNoHorizontalOverflow(page);
  });

  test("mobile hero layout after entrance", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile layout only");
    await page.goto("/");
    await waitForHeroEntrance(page);

    const layout = await page.evaluate(() => {
      const glass = document.querySelector("#hero .glass");
      const marker = document.querySelector("#hero .marker");
      const photo = document.querySelector(
        "#hero img.photo, #hero #photo",
      ) as HTMLImageElement | null;
      const photoWrap = document.querySelector("#hero .photo-wrap");
      if (!glass || !marker || !photo || !photoWrap) return null;

      const g = glass.getBoundingClientRect();
      const m = marker.getBoundingClientRect();
      const p = photoWrap.getBoundingClientRect();
      const opacity = Number(getComputedStyle(glass).opacity);
      const filter = getComputedStyle(photo).filter;

      return {
        glassTop: g.top,
        glassBottom: g.bottom,
        photoTop: p.top,
        photoMidY: p.top + p.height / 2,
        photoBottom: p.bottom,
        opacity,
        filter,
        glassBox: {
          top: g.top,
          right: g.right,
          bottom: g.bottom,
          left: g.left,
        },
        markerBox: {
          top: m.top,
          right: m.right,
          bottom: m.bottom,
          left: m.left,
        },
      };
    });

    expect(layout).not.toBeNull();
    expect(layout!.opacity).toBe(1);
    expect(layout!.glassTop).toBeGreaterThan(layout!.photoTop);
    expect(layout!.glassTop).toBeGreaterThanOrEqual(layout!.photoMidY);
    expect(layout!.glassTop).toBeLessThan(layout!.photoBottom);
    expect(layout!.filter).not.toMatch(/blur\([^0]/);
    expect(boxesIntersect(layout!.glassBox, layout!.markerBox)).toBe(false);

    await assertNoHorizontalOverflow(page);
  });

  test("responsive hero image candidates", async ({ page, request }, testInfo) => {
    await page.goto("/");

    const imgInfo = await page.evaluate(() => {
      const img = document.querySelector(
        "#hero img.photo, #hero #photo img, #hero picture img",
      ) as HTMLImageElement | null;
      return img
        ? { srcset: img.srcset, currentSrc: img.currentSrc, src: img.src }
        : null;
    });
    expect(imgInfo).not.toBeNull();

    const candidates = parseSrcset(imgInfo!.srcset);
    expect(candidates.length).toBeGreaterThan(0);
    const widths = candidates.map((c) => c.width).filter((w) => w > 0);
    const maxW = Math.max(...widths);
    expect(maxW).toBeLessThanOrEqual(1200);

    const fallbackW = widthForSrc(imgInfo!.srcset, imgInfo!.src);
    if (fallbackW > 0) {
      expect(fallbackW).toBeLessThanOrEqual(1200);
    }

  const fetchUrl =
      imgInfo!.currentSrc ||
      candidates
        .slice()
        .sort((a, b) => b.width - a.width)
        .find((c) => c.url)?.url ||
      imgInfo!.src;
    expect(fetchUrl).toBeTruthy();

    const response = await request.get(fetchUrl);
    expect(response.ok()).toBeTruthy();
    const body = await response.body();
    const contentLength = response.headers()["content-length"];
    const bytes = contentLength ? Number(contentLength) : body.length;
    expect(bytes).toBeLessThanOrEqual(300 * 1024);

    const fallbackResponse = await request.get(imgInfo!.src);
    expect(fallbackResponse.ok()).toBeTruthy();
    const fallbackBody = await fallbackResponse.body();
    const fallbackLen = fallbackResponse.headers()["content-length"]
      ? Number(fallbackResponse.headers()["content-length"])
      : fallbackBody.length;
    expect(fallbackLen).toBeLessThanOrEqual(300 * 1024);

    if (testInfo.project.name === "desktop-1440") {
      expect(fallbackW || maxW).toBeLessThanOrEqual(1200);
    }
  });

  test("uses a ≤600px candidate at 390", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile layout only");
    await page.goto("/");

    const imgData = await page.evaluate(() => {
      const img = document.querySelector(
        "#hero img.photo, #hero #photo img, #hero picture img",
      ) as HTMLImageElement | null;
      return img
        ? { srcset: img.srcset, currentSrc: img.currentSrc, src: img.src }
        : null;
    });
    expect(imgData).not.toBeNull();
    expect(imgData!.currentSrc).toBeTruthy();

    const chosenW = await page.evaluate(
      ({ srcset, currentSrc }) => {
        const match = (ss: string, src: string) => {
          const parts = ss.split(",").map((p) => p.trim());
          for (const part of parts) {
            const lastSpace = part.lastIndexOf(" ");
            if (lastSpace <= 0) continue;
            const url = part.slice(0, lastSpace);
            const descriptor = part.slice(lastSpace + 1);
            if (!descriptor.endsWith("w")) continue;
            const width = Number(descriptor.slice(0, -1));
            if (src.includes(url) || src.includes(url.split("/").pop() ?? "")) {
              return width;
            }
          }
          return 0;
        };

        const picture = document.querySelector("#hero picture");
        const sets = [srcset];
        picture?.querySelectorAll("source").forEach((source) => {
          const ss = source.getAttribute("srcset");
          if (ss) sets.push(ss);
        });
        for (const ss of sets) {
          const w = match(ss, currentSrc);
          if (w > 0) return w;
        }
        return 0;
      },
      { srcset: imgData!.srcset, currentSrc: imgData!.currentSrc },
    );
    expect(chosenW).toBeGreaterThan(0);
    expect(chosenW).toBeLessThanOrEqual(600);
  });
});

test.describe("hero reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("photo transform does not respond to pointer or scroll", async ({
    page,
  }) => {
    await page.goto("/");

    const photo = page.locator("#hero #photo, #hero img.photo").first();
    await expect(photo).toBeVisible();
    await page.waitForTimeout(300);

    const before = await photo.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        transform: style.transform,
        translate: style.translate,
      };
    });

    const box = await photo.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(200);

    const after = await photo.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        transform: style.transform,
        translate: style.translate,
      };
    });

    expect(after.transform).toBe(before.transform);
    expect(after.translate).toBe(before.translate);
  });
});

test.describe("footer", () => {
  test("sign-off and social links", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#footer")).toContainText("see you on the trail.");

    const links = page.locator("#footer a");
    await expect(links).toHaveCount(3);
    const texts = await links.allInnerTexts();
    const hrefs = await Promise.all(
      (await links.all()).map((l) => l.getAttribute("href")),
    );
    expect(texts.map((t) => t.trim().toLowerCase())).toEqual([
      "github",
      "linkedin",
      "x",
    ]);
    expect(hrefs).toEqual([
      site.links.github,
      site.links.linkedin,
      site.links.x,
    ]);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("footer link gap at 390", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile layout only");
    await page.goto("/");

    const gap = await page.evaluate(() => {
      const meta = document.querySelector("#footer .meta");
      const copy = meta?.childNodes[0];
      const github = document.querySelector('#footer a[href*="github"]');
      if (!copy || !github) return null;
      let copyRight = 0;
      if (copy.nodeType === Node.TEXT_NODE) {
        const range = document.createRange();
        range.selectNodeContents(copy);
        copyRight = range.getBoundingClientRect().right;
      }
      const linkLeft = github.getBoundingClientRect().left;
      return linkLeft - copyRight;
    });

    expect(gap).not.toBeNull();
    expect(gap!).toBeGreaterThan(4);
  });
});

test.describe("hero robustness", () => {
  test("headline stays three lines at 1280 and 1920", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
    for (const vp of [{ width: 1280, height: 800 }, { width: 1920, height: 1080 }]) {
      await page.setViewportSize(vp);
      await page.goto("/");
      await page.waitForTimeout(3300);
      const lines = await page.evaluate(() =>
        [...document.querySelectorAll("#hero h1 > span")].map((s) => {
          const r = document.createRange();
          r.selectNodeContents(s);
          return new Set([...r.getClientRects()].map((x) => Math.round(x.bottom))).size;
        }),
      );
      expect(lines).toEqual([1, 1, 1]);
    }
  });

  test("the ambient glow adds no scroll past the footer", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(3300);
    const gap = await page.evaluate(() => {
      const foot = document.querySelector("#footer")!.getBoundingClientRect();
      return document.documentElement.scrollHeight - (foot.bottom + window.scrollY);
    });
    expect(gap).toBeLessThan(2);
  });
});

test.describe("hero performance", () => {
  test("the hero runs no heavy animation: big layers are static and the photo never blurs", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
      const filterOf = (sel: string) => getComputedStyle(document.querySelector(sel)!).filter;
      const hero = document.querySelector("#hero")!;
      const ambient = document.querySelector(".ambient")!;
      const running = document
        .getAnimations()
        .filter((a) => a.playState === "running")
        .filter((a) => {
          const el = (a.effect as KeyframeEffect).target as Element | null;
          return !!el && (hero.contains(el) || el === ambient);
        })
        .map((a) => (a as CSSAnimation).animationName);
      return {
        ambient: filterOf(".ambient"),
        bgblur: filterOf(".bgblur"),
        photo: filterOf("#hero #photo, #hero img.photo"),
        running,
      };
    });
    // A live blur on these large layers re-ran every frame and made the page lag on load.
    expect(r.ambient).not.toContain("blur");
    expect(r.bgblur).not.toContain("blur");
    expect(r.photo).not.toContain("blur");
    // Only the tiny status dot and scroll marker loop once the headline has faded in.
    for (const name of r.running) expect(["gfoot-pulse", "marker-drop"]).toContain(name);
  });

  test("the photo stays put under the pointer", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "pointer hover is desktop only");
    await page.goto("/");
    const photo = page.locator("#hero #photo, #hero img.photo").first();
    const before = await photo.boundingBox();
    await page.mouse.move(200, 200);
    await page.mouse.move(1300, 700, { steps: 5 });
    await page.waitForTimeout(900);
    expect(await photo.boundingBox()).toEqual(before);
  });

  test("hero loops pause once the hero is off screen", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1500);
    await page.locator("#camp").scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(() =>
          document
            .getAnimations()
            .filter((a) => ["gfoot-pulse", "marker-drop"].includes((a as CSSAnimation).animationName))
            .filter((a) => a.playState === "running").length,
        ),
      )
      .toBe(0);
  });
});

test.describe("desktop content width", () => {
  test("sections stop growing past the content cap while the hero spans the screen", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
    await page.setViewportSize({ width: 2560, height: 1300 });
    await page.goto("/");
    const r = await page.evaluate(() => {
      const inner = (sel: string) => {
        const el = document.querySelector(sel)!;
        const cs = getComputedStyle(el);
        return el.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      };
      return {
        hero: document.querySelector("#hero")!.getBoundingClientRect().width,
        sections: ["#climb", "#trail", "#camp", "#register", "#footer"].map(inner),
      };
    });
    expect(r.hero).toBe(2560);
    for (const w of r.sections) expect(w).toBeLessThanOrEqual(1200);
  });
});
