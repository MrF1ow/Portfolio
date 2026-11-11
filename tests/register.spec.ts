import { expect, test } from "@playwright/test";

const at = String.fromCharCode(64);
const dot = ".";
const visitor = ["hiker", ["trail", "notes", "example", "com"].join(dot)].join(at);

async function fillRegister(page: import("@playwright/test").Page) {
  await page.locator("#register-name").fill("River");
  await page.locator("#register-reply").fill(visitor);
  await page.locator("#register-note").fill("Building a tiny cabin.");
}

test.describe("register section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#register");
  });

  test("placeholder for reply field", async ({ page }) => {
    await expect(page.locator("#register-reply")).toHaveAttribute("placeholder", "Where I can write back");
  });

  test("200 shows signed state", async ({ page }) => {
    await page.route("**/api/send", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await fillRegister(page);
    await page.locator(".register-submit").click();
    await expect(page.locator(".register-card")).toHaveClass(/sent/);
    await expect(page.locator(".done")).toBeVisible();
    await expect(page.locator(".done .tick")).toHaveText("✓ SIGNED");
  });

  test("403 shows inline alert and keeps form", async ({ page }) => {
    const msg = "We couldn't verify you're human. Please try again.";
    await page.route("**/api/send", async (route) => {
      await route.fulfill({
        status: 403,
        contentType: "application/json",
        body: JSON.stringify({ error: msg }),
      });
    });
    await fillRegister(page);
    await page.locator(".register-submit").click();
    await expect(page.locator('[role="alert"]')).toHaveText(msg);
    await expect(page.locator("#register-name")).toHaveValue("River");
    await expect(page.locator(".register-card")).not.toHaveClass(/sent/);
  });

  test("no horizontal overflow from section glow", async ({ page }) => {
    const sizes = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(sizes.scrollWidth).toBe(sizes.clientWidth);
  });

  test("no-JS submit does not put reply in URL", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/#register");
    const reply = ["trail", "hiker", ["notes", "example", "com"].join(".")].join(at);
    await page.locator("#register-name").fill("No JS");
    await page.locator("#register-reply").fill(reply);
    await page.locator("#register-note").fill("Hello");
    await page.locator(".register-submit").click();
    await page.waitForLoadState("load");
    expect(page.url()).not.toContain(reply);
    await context.close();
  });

  test("200 moves focus to signed state", async ({ page }) => {
    await page.route("**/api/send", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await fillRegister(page);
    await page.locator(".register-submit").click();
    await expect(page.locator(".done")).toBeFocused();
  });

  test("502 shows inline alert and keeps form", async ({ page }) => {
    const msg = "Something went wrong. Please try again.";
    await page.route("**/api/send", async (route) => {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ error: msg }),
      });
    });
    await fillRegister(page);
    await page.locator(".register-submit").click();
    await expect(page.locator('[role="alert"]')).toHaveText(msg);
    await expect(page.locator("#register-note")).toHaveValue("Building a tiny cabin.");
  });
});

test.describe("register reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("keyboard focus row styling", async ({ page }) => {
    await page.goto("/#register");
    await page.locator("#register-name").focus();
    const row = page.locator(".register-row").filter({ has: page.locator("#register-name") });
    await expect(row).toHaveCSS("border-bottom-color", "rgb(226, 182, 106)");
    await expect(row.locator("label")).toHaveCSS("color", "rgb(226, 182, 106)");
  });
});
