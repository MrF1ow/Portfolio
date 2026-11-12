import { execSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const root = fileURLToPath(new URL("..", import.meta.url));
const clientDir = join(root, "dist", "client");

const EMAIL_RE =
  /(?<![\w./])[\w.+%'-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+/g;

const TEXT_EXTS = new Set([
  ".html",
  ".txt",
  ".md",
  ".xml",
  ".json",
  ".webmanifest",
  ".js",
  ".css",
]);
const PROSE_EXTS = new Set([
  ".html",
  ".txt",
  ".md",
  ".xml",
  ".json",
  ".webmanifest",
]);

const resumeName = ["Ethan", "Resume"].join("-");
const mailLib = ["email", "js"].join("");
const signedApp = ["Simply", "Signed"].join("");
const flowRepo = ["github.com/MrF1ow", "flow"].join("/");
const benchName = ["work", "bench"].join("");
const benchRepo = ["github.com/MrF1ow", benchName].join("/");
const coreRepo = ["go", "core"].join("-");
const coreName = ["Go", "Core"].join(" ");
const foodApp = ["Food", "able"].join("");
const proxyName = ["git", "lawb"].join("");

const forbiddenProse = [
  resumeName,
  mailLib,
  benchName,
  flowRepo,
  benchRepo,
  coreRepo,
  coreName,
  signedApp,
  foodApp,
  proxyName,
];

const LOOP_RE = /\bloop\b/i;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function extOf(file: string): string {
  const dot = file.lastIndexOf(".");
  return dot === -1 ? "" : file.slice(dot);
}

function findEmails(text: string): string[] {
  return [...text.matchAll(EMAIL_RE)].map((m) => m[0]);
}

function findForbiddenProse(text: string): string[] {
  const hits: string[] = [];
  for (const token of forbiddenProse) {
    if (text.includes(token)) hits.push(token);
  }
  if (LOOP_RE.test(text)) hits.push("loop (whole word)");
  return hits;
}

function pngSize(path: string): { width: number; height: number } {
  const buf = readFileSync(path);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

test.beforeAll(() => {
  if (!existsSync(clientDir)) {
    execSync("npm run build", { cwd: root, stdio: "inherit" });
  }
});

test.describe("dist/client text scan", () => {
  test("public build has no addresses or forbidden prose", () => {
    const files = walk(clientDir).filter((f) => TEXT_EXTS.has(extOf(f)));
    const errors: string[] = [];

    for (const file of files) {
      const rel = relative(clientDir, file);
      const text = readFileSync(file, "utf8");
      const emails = findEmails(text);
      if (emails.length) {
        errors.push(`${rel}: email-like ${emails.join(", ")}`);
      }
      if (PROSE_EXTS.has(extOf(file))) {
        const bad = findForbiddenProse(text);
        if (bad.length) errors.push(`${rel}: forbidden ${bad.join(", ")}`);
      }
    }

    expect(errors, errors.join("\n")).toEqual([]);
  });
});

test.describe("sitemap and robots in dist/client", () => {
  test("sitemap index and single home URL", () => {
    const index = readFileSync(join(clientDir, "sitemap-index.xml"), "utf8");
    const sheet = readFileSync(join(clientDir, "sitemap-0.xml"), "utf8");
    expect(index).toContain("sitemap-0.xml");
    const locs = [...sheet.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(["https://ethanflow.dev/"]);
  });

  test("robots.txt points at sitemap index", () => {
    const robots = readFileSync(join(clientDir, "robots.txt"), "utf8");
    expect(robots).toContain("/sitemap-index.xml");
    // Every User-agent group must carry the disallows (a named group replaces "*").
    const groups = robots.split(/\n\s*\n/).filter((g) => /^User-agent:/im.test(g));
    expect(groups.length).toBeGreaterThan(0);
    for (const g of groups) {
      expect(g).toMatch(/^Disallow: \/og-card$/m);
      expect(g).toMatch(/^Disallow: \/api\/$/m);
    }
  });
});

test("og-image.png is 1200×630", () => {
  const { width, height } = pngSize(join(root, "public", "og-image.png"));
  expect(width).toBe(1200);
  expect(height).toBe(630);
});

test.describe("rendered page", () => {
  test("meta, JSON-LD and visible text are clean", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Ethan Flow — Software Engineer");

    const description =
      "I build systems that run themselves: they take in work, plan it, build it, check it and ship it without anyone pushing. That leaves me free to decide what's worth building. And to get outside.";
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      description,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://ethanflow.dev/",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://ethanflow.dev/og-image.png",
    );
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      "content",
      "1200",
    );
    await expect(
      page.locator('meta[property="og:image:height"]'),
    ).toHaveAttribute("content", "630");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    const jsonRaw = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(jsonRaw).toBeTruthy();
    const graph = JSON.parse(jsonRaw!);
    const blob = JSON.stringify(graph);
    expect(blob.toLowerCase()).not.toContain("email");
    expect(blob).not.toMatch(/\.pdf/i);

    const visible = await page.locator("body").innerText();
    expect(findEmails(visible)).toEqual([]);
    expect(findForbiddenProse(visible)).toEqual([]);
    expect(LOOP_RE.test(visible)).toBe(false);
  });
});
