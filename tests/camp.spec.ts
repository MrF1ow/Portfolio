import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

type ExpectedStory = {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
};

// The story text of the React site this rebuild replaced (src/data/about-tabs.ts at 8ac4393),
// captured once so the check does not depend on git history being present.
function loadExpectedStories(): ExpectedStory[] {
  const file = new URL("./fixtures/stories.json", import.meta.url);
  return (JSON.parse(readFileSync(file, "utf8")) as { stories: ExpectedStory[] }).stories;
}

const expected = loadExpectedStories();
const ids = expected.map((s) => s.id);

async function scrollToCamp(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.locator("#camp").scrollIntoViewIfNeeded();
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(0);
  return scrollY;
}

async function openStory(
  page: import("@playwright/test").Page,
  id: string,
) {
  await page.locator(`#camp button.card[data-story="${id}"]`).click();
  await expect(page.locator(".rd")).toHaveAttribute("aria-hidden", "false");
}

async function assertStoryVisible(
  page: import("@playwright/test").Page,
  story: ExpectedStory,
) {
  const panel = page.locator(".rd .panel");
  await expect(panel).toBeVisible();
  const headingWords = story.heading.split(" ");
  const last = headingWords.at(-1)!;
  const rest = headingWords.slice(0, -1).join(" ");
  await expect(panel.locator(".story-pane:not([hidden]) h3")).toContainText(rest);
  await expect(panel.locator(".story-pane:not([hidden]) h3 .serif")).toHaveText(
    last,
  );
  const paras = panel.locator(".story-pane:not([hidden]) .body p");
  await expect(paras).toHaveCount(story.paragraphs.length);
  for (let i = 0; i < story.paragraphs.length; i++) {
    await expect(paras.nth(i)).toHaveText(story.paragraphs[i]!);
  }
}

test.describe("camp stories", () => {
  for (const story of expected) {
    test(`opens ${story.id} with full text`, async ({ page }) => {
      await scrollToCamp(page);
      await openStory(page, story.id);
      await assertStoryVisible(page, story);
    });
  }

  test("desktop: tabs, prev/next, keys, escape, scroll preserved", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
    const beforeScroll = await scrollToCamp(page);
    const first = expected[0]!;
    await openStory(page, first.id);

    await page.locator('.rd [role="tab"]').nth(1).click();
    await assertStoryVisible(page, expected[1]!);

    await page.locator("#reader-next").click();
    await assertStoryVisible(page, expected[2]!);

    await page.locator("#reader-prev").click();
    await assertStoryVisible(page, expected[1]!);

    await page.keyboard.press("ArrowRight");
    await assertStoryVisible(page, expected[2]!);
    await page.keyboard.press("ArrowLeft");
    await assertStoryVisible(page, expected[1]!);

    await page.keyboard.press("Escape");
    await expect(page.locator(".rd")).toHaveAttribute("aria-hidden", "true");
    await expect(
      page.locator(`#camp button.card[data-story="${expected[1]!.id}"]`),
    ).toBeFocused();

    const afterScroll = await page.evaluate(() => window.scrollY);
    expect(afterScroll).toBe(beforeScroll);
  });

  test("mobile: full-screen reader, no top bar, bottom controls", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile only");
    await scrollToCamp(page);
    await openStory(page, ids[1]!);

    const box = await page.locator(".rd .panel").boundingBox();
    expect(box?.x).toBeCloseTo(0, 0);
    expect(box?.y).toBeCloseTo(0, 0);
    expect(box?.width).toBeCloseTo(390, 0);
    expect(box?.height).toBeCloseTo(844, 0);

    await expect(page.locator(".rd .top")).toBeHidden();
    await expect(page.locator(".rd .tabs")).toBeHidden();

    await expect(page.locator("#reader-prev")).toBeVisible();
    await expect(page.locator("#reader-next")).toBeVisible();
    await expect(page.locator("#reader-close-mobile")).toBeVisible();
    await expect(page.locator("#reader-count")).toHaveText("02 / 04");
  });

  test("closed: tab through camp never focuses the reader", async ({ page }) => {
    await scrollToCamp(page);
    const lifeCard = page.locator('#camp button.card[data-story="life"]');
    await lifeCard.focus();
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inReader = await page.evaluate(() => {
        const rd = document.querySelector(".rd");
        return (
          rd !== null &&
          document.activeElement !== null &&
          rd.contains(document.activeElement)
        );
      });
      expect(inReader).toBe(false);
    }
  });

  test("open: tab cycle stays inside the dialog", async ({ page }) => {
    await scrollToCamp(page);
    await openStory(page, ids[0]!);
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() => {
        const dialog = document.querySelector('.rd .panel[role="dialog"]');
        return (
          dialog !== null &&
          document.activeElement !== null &&
          dialog.contains(document.activeElement)
        );
      });
      expect(inside).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(page.locator(".rd")).toHaveAttribute("aria-hidden", "true");
  });
});

test.describe("camp stories · keys and name", () => {
  test("keys work after clicking the story text, and the dialog is named by the shown story", async ({ page }) => {
    await page.goto("/");
    await page.locator("#camp").scrollIntoViewIfNeeded();
    await page.locator(`#camp button.card[data-story="${expected[0]!.id}"]`).click();
    await expect(page.locator(".rd")).toHaveAttribute("aria-hidden", "false");
    const dialog = page.getByRole("dialog");

    // Clicking non-focusable text moves focus to <body>; the keys must still work.
    await page.locator(".rd .story-pane:not([hidden]) .body p").first().click();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toHaveAccessibleName(expected[2]!.heading);

    await page.locator(".rd .story-pane:not([hidden]) .body p").first().click();
    await page.keyboard.press("Escape");
    await expect(page.locator(".rd")).toHaveAttribute("aria-hidden", "true");
  });
});

test.describe("camp stories · motion", () => {
  test.use({ reducedMotion: "no-preference" });

  async function assertSelectedTab(
    page: import("@playwright/test").Page,
    index: number,
  ) {
    const tabs = page.locator('.rd [role="tab"]');
    const n = await tabs.count();
    for (let i = 0; i < n; i++) {
      await expect(tabs.nth(i)).toHaveAttribute(
        "aria-selected",
        i === index ? "true" : "false",
      );
    }
  }

  async function waitForOpen(page: import("@playwright/test").Page) {
    await expect(page.locator(".rd.on .panel")).toBeVisible();
    await expect(page.locator(".rd.on .panel")).toHaveCSS("transform", "none");
  }

  async function waitForClosed(page: import("@playwright/test").Page) {
    await expect(page.locator(".rd")).not.toHaveClass(/on/);
    await expect(page.locator(".rd")).toHaveAttribute("aria-hidden", "true");
    const hidden = await page.evaluate(() => {
      const rd = document.querySelector<HTMLElement>(".rd");
      if (!rd) return false;
      return (
        rd.inert === true ||
        getComputedStyle(rd).visibility === "hidden"
      );
    });
    expect(hidden).toBe(true);
  }

  test("desktop: motion, aria-selected, close preserves scroll", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-1440", "desktop only");
    const beforeScroll = await scrollToCamp(page);
    await page.locator(`#camp button.card[data-story="${ids[0]}"]`).click();
    await waitForOpen(page);
    await assertSelectedTab(page, 0);

    await page.locator('.rd [role="tab"]').nth(2).click();
    await assertStoryVisible(page, expected[2]!);
    await assertSelectedTab(page, 2);

    await page.locator("#reader-next").click();
    await assertSelectedTab(page, 3);

    await page.locator("#reader-prev").click();
    await assertSelectedTab(page, 2);

    await page.keyboard.press("ArrowRight");
    await assertSelectedTab(page, 3);
    await page.keyboard.press("ArrowLeft");
    await assertSelectedTab(page, 2);

    await page.locator("#reader-close-desktop").click();
    await waitForClosed(page);
    const afterScroll = await page.evaluate(() => window.scrollY);
    expect(afterScroll).toBe(beforeScroll);
  });

  test("mobile: motion, aria-selected, close preserves scroll", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "mobile only");
    const beforeScroll = await scrollToCamp(page);
    await page.locator(`#camp button.card[data-story="${ids[1]}"]`).click();
    await waitForOpen(page);
    await assertSelectedTab(page, 1);

    await page.locator("#reader-next").click();
    await assertStoryVisible(page, expected[2]!);
    await assertSelectedTab(page, 2);

    await page.locator("#reader-prev").click();
    await assertSelectedTab(page, 1);

    await page.keyboard.press("ArrowRight");
    await assertSelectedTab(page, 2);

    await page.locator("#reader-close-mobile").click();
    await waitForClosed(page);
    const afterScroll = await page.evaluate(() => window.scrollY);
    expect(afterScroll).toBe(beforeScroll);
  });
});
