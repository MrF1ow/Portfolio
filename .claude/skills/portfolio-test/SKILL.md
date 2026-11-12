---
name: portfolio-test
description: How to run, test and verify portfolio safely - start it, the fast and full checks, every surface a change shows up on, and what not to touch. Use before running, testing or verifying portfolio, or a change to it.
watches:
  - package.json#scripts
  - astro.config.mjs
  - wrangler.jsonc
  - playwright.config.ts
  - .dev.vars.example
updated: "8ac439347e3ca71997af342e69b5f55667fe536b"
---

# Run, test and verify portfolio

The site is Astro 7 built to static HTML plus one on-demand route (`POST /api/send`), served by a Cloudflare Worker (`@astrojs/cloudflare`, `wrangler.jsonc`). npm is the package manager.

## Run it
- Install: `npm ci`
- Dev (fast, no Worker): `npm run dev -- --port <n>` (Astro dev server; `/api/send` needs the Worker, so use preview for it).
- Built Worker: `PORT=<n> npm run preview` (runs `astro build`, then `wrangler dev --port <n>`; default 8787). Never pass `--config wrangler.jsonc`: wrangler follows the adapter's redirect to `dist/server/wrangler.json`.
- Env: copy `.dev.vars.example` to `.dev.vars` (gitignored). For local checks use Cloudflare's Turnstile test keys: secret `2x0000000000000000000000000000000AA` (always fails → `/api/send` answers 403), a dummy `RESEND_API_KEY`, and any placeholder `CONTACT_EMAIL`. Real secrets live only in `wrangler secret`.
- Seed data: none.

## Test it
- Fast, changed files only: none; run one spec with `PORT=<n> npx playwright test tests/<name>.spec.ts`.
- Profile checks: `npm run lint` (regenerates `worker-configuration.d.ts` from `.dev.vars.example`, then `astro check`; must be 0 errors and leave git clean) and `npm run build`.
- Full suite: `PORT=<n> npm test` (Playwright against the built Worker, projects `desktop-1440` and `mobile-390`; about 2 min). `tests/register.unit.spec.ts` tests `handleSend` directly with fakes; `tests/content.spec.ts` scans `dist/client` and the page for addresses and retired names. The machine tests measure a real-time animation and retry twice under load.
- CI runs: no CI: merge asks until it exists.

## Verify on the real thing
Hit every surface a change can show up on, not only the one the change is about:
- UI: `PORT=<n> npm run preview`, open `http://127.0.0.1:<n>/` at 1440×900 and 390×844 (sections: hero, 01 climb, 02 trail, 03 camp + story reader, 04 register, footer). Compare with `~/Projects/designs/Portfolio/previews/system-*.png` and `register-mockup.html`. Wait ~3.5s for the hero entrance before judging layout.
- API: `curl -s -w ' %{http_code}\n' -X POST localhost:<n>/api/send -H 'content-type: application/json' -d ''` → 400; a complete body with token `XXXX.DUMMY.TOKEN.XXXX` → 403 with the always-fail secret; `PUT` → 405.
- Link preview: `/og-card` (noindex); regenerate the image with `npm run og -- http://127.0.0.1:<n>`.
- Public files: `dist/client/llms.txt`, `llms-full.txt`, `index.md`, `robots.txt`, `sitemap-index.xml` / `sitemap-0.xml`.
- CLI / jobs: none.

## Ways to hurt yourself
Things that look safe and aren't:
- A real 200 from `/api/send` sends Ethan an email through Resend. Locally, keep the always-fail Turnstile secret; never put real keys in `.dev.vars` for testing.
- Nothing public may contain an email address, the resume, the old mail library's name, the dropped projects, or the private `flow`/`workbench` tools: `tests/content.spec.ts` fails on them. Build its tokens from parts so grep gates never match the spec.
- Playwright's webServer can leave the `wrangler dev` child running after a run, and the next run silently reuses that stale server (`reuseExistingServer`). After each run, stop whatever still listens on your port by PID (`ss -ltnp | grep :<n>`), and use a port nobody else holds. `CI=1` disables reuse and fails if the port is taken.
- `dist/server/.dev.vars` is a build copy of your local secrets: never publish `dist/server`.
- Several checkouts on one machine: give each its own `PORT`; wrangler's inspector falls back from 9229 on its own.

## Clean up
- Stop servers you started by PID (the `wrangler`/`workerd` listening on your port), never by name pattern.
- `rm -rf test-results dist .wrangler` if you need a clean tree; all are gitignored.
