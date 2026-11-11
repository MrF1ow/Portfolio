// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ethanflow.dev",
  session: false,
  trailingSlash: "never",
  build: { format: "file" },
  adapter: cloudflare({
    imageService: { build: "compile", runtime: "passthrough" },
  }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/api/") && !page.includes("/og-card"),
    }),
  ],
});
