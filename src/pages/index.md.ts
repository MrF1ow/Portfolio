import type { APIRoute } from "astro";
import { pageMarkdown } from "../lib/agent-content";

/** The page as Markdown, for AI agents and anyone who wants the plain text. */
export const GET: APIRoute = async () =>
  new Response(await pageMarkdown(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
