import { expect, test } from "@playwright/test";

const sectionOrder = ["hero", "climb", "trail", "camp", "register", "footer"];

test("home page smoke", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Ethan Flow — Software Engineer");

  const bg = await page.evaluate(() =>
    getComputedStyle(document.documentElement).backgroundColor,
  );
  expect(bg).toBe("rgb(11, 19, 24)");

  const sections = page.locator("[data-section]");
  await expect(sections).toHaveCount(6);

  for (let i = 0; i < sectionOrder.length; i++) {
    await expect(sections.nth(i)).toHaveAttribute("data-section", sectionOrder[i]!);
  }
});
