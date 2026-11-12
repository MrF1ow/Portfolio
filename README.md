# ethanflow.dev

Personal portfolio for Ethan Flow, built with [Astro](https://astro.build/) and deployed to [Cloudflare Workers](https://workers.cloudflare.com/). Contact mail goes through [Resend](https://resend.com/) behind a Turnstile-protected `/api/send` route.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Astro dev server (optional local iteration) |
| `npm run build` | Production static + Worker build into `dist/` |
| `npm run preview` | Build, then serve with `wrangler dev` (default port 8787; set `PORT`) |
| `npm run types` | Regenerate `worker-configuration.d.ts` from `.dev.vars.example` |
| `npm run lint` | `npm run types` then `astro check` |
| `npm run test` | Playwright tests against `preview` |
| `npm run deploy` | Build and `wrangler deploy` |
| `npm run og` | Regenerate `public/og-image.png` from `/og-card` (pass the URL of a running preview) |

## Secrets

Production secrets are never committed. Set them with Wrangler:

```bash
bunx wrangler secret put RESEND_API_KEY
bunx wrangler secret put CONTACT_EMAIL
bunx wrangler secret put TURNSTILE_SECRET
```

For local `wrangler dev`, copy [.dev.vars.example](.dev.vars.example) to `.dev.vars` (gitignored) and fill in values.

`TURNSTILE_HOSTNAMES` is a Worker var in [wrangler.jsonc](wrangler.jsonc), not a secret.

## Manual cutover (after merge)

The Netlify site is retired and its DNS records are gone; `notifications.ethanflow.dev` exists in Resend with its DNS records in Cloudflare.

1. Confirm `notifications.ethanflow.dev` shows Verified in Resend.
2. Create the Turnstile widget for ethanflow.dev and put its sitekey in `src/data/site.ts` (replace the test sitekey). If your workers.dev subdomain is not `ethan-flow-a33`, fix `TURNSTILE_HOSTNAMES` in `wrangler.jsonc`.
3. `bunx wrangler secret put` for `RESEND_API_KEY` (a sending-only key for that domain), `CONTACT_EMAIL`, and `TURNSTILE_SECRET`.
4. `bun run deploy` (or `bunx wrangler deploy` after a build).
5. Attach the ethanflow.dev custom domain to the Worker in Cloudflare (add `www` too if you want it).
6. Send yourself a note through the register to confirm a real delivery.

## Layout

- `src/pages/` — routes: `index.astro` and `og-card.astro` are prerendered; `api/send.ts` is the one on-demand Worker route.
- `src/components/` — page sections (Hero, Machine, Trail, Camp, Register, Footer).
- `src/data/site.ts` — site metadata, links, timeline, and skill data.
- `src/styles/tokens.css` — design tokens from the approved Trail design.
- `public/` — static assets: favicons, manifest, `og-image.png`, `robots.txt`, and the crawler files `llms.txt`, `llms-full.txt`, `index.md`.
- `src/content/stories/` — the four Camp stories (content collection).
- `tests/` — Playwright specs, run against the built Worker at 1440 and 390.
