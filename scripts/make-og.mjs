import { chromium } from "@playwright/test";

const base =
  process.argv.slice(2).find((a) => a.startsWith("http")) ??
  "http://localhost:8787";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  colorScheme: "dark",
  reducedMotion: "reduce",
});

await page.goto(`${base}/og-card`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all(
    [...document.images].map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve, reject) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", reject, { once: true });
          }),
    ),
  );
});

await page.locator("[data-og-card]").screenshot({ path: "public/og-image.png" });
console.log("wrote public/og-image.png");

await browser.close();
