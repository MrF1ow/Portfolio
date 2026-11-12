import type { APIRoute } from "astro";
import { site } from "../data/site";

// Everyone, AI crawlers included, may read the page and its Markdown; nobody needs the hidden
// link-preview card or the contact endpoint. One group, so every listed agent gets the disallows
// (a named group replaces "*" for that agent).
const AGENTS = [
  "*",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "GoogleOther",
  "cohere-ai",
];

export const GET: APIRoute = () =>
  new Response(
    [
      ...AGENTS.map((a) => `User-agent: ${a}`),
      "Allow: /",
      "Disallow: /og-card",
      "Disallow: /api/",
      "",
      `Sitemap: ${new URL("/sitemap-index.xml", site.url).href}`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
