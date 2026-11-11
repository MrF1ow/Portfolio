# ethanflow.dev

Personal portfolio for Ethan Flow, built with [Astro](https://astro.build/) and deployed to [Cloudflare Workers](https://workers.cloudflare.com/). Contact mail goes through [Resend](https://resend.com/) behind a Turnstile-protected `/api/send` route (added in later phases).

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
| `npm run og` | Regenerate Open Graph image (script lands in a later phase) |

## Secrets

Production secrets are never committed. Set them with Wrangler:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_EMAIL
npx wrangler secret put TURNSTILE_SECRET
```

For local `wrangler dev`, copy [.dev.vars.example](.dev.vars.example) to `.dev.vars` (gitignored) and fill in values.

`TURNSTILE_HOSTNAMES` is a Worker var in [wrangler.jsonc](wrangler.jsonc), not a secret.

## Manual cutover (after merge)

1. Verify `notifications.ethanflow.dev` in Resend.
2. Create the Turnstile widget for ethanflow.dev and put its sitekey in `src/data/site.ts` (replace the test sitekey).
3. `wrangler secret put` for `RESEND_API_KEY`, `CONTACT_EMAIL`, and `TURNSTILE_SECRET`.
4. `npm run deploy`.
5. Attach the ethanflow.dev custom domain to the Worker in Cloudflare.
6. Retire the Netlify site so traffic moves to the Worker.

## Layout

- `src/pages/` — routes (index is prerendered; `/api/send` arrives in a later phase).
- `src/components/` — page sections (Hero, Machine, Trail, Camp, Register, Footer).
- `src/data/site.ts` — site metadata, links, timeline, and skill data.
- `src/styles/tokens.css` — design tokens from the approved Trail design.
- `public/` — static assets (favicons, manifest, OG image until regenerated).
