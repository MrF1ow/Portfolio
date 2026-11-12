import type { APIRoute } from "astro";
import { site } from "../data/site";

export const GET: APIRoute = () =>
  Response.json({
    name: site.title,
    short_name: site.name,
    description: site.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b1318",
    theme_color: "#0b1318",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  });
