---
name: portfolio-test
description: How to run, test and verify portfolio safely - start it, the fast and full checks, every surface a change shows up on, and what not to touch. Use before running, testing or verifying portfolio, or a change to it.
watches:
  - package.json#scripts
  - vite.config.ts
  - tsconfig.json
updated: "8ac439347e3ca71997af342e69b5f55667fe536b"
---

# Run, test and verify portfolio

## Run it
- Install: `npm ci`
- Start: `npm run dev` (default port 5173). Pass a free port: `npm run dev -- --port <n> --host 127.0.0.1`
- Preview production build: `npm run build` then `npm run preview -- --port <n> --host 127.0.0.1`
- Env: `.env` in the repo root (tracked in git; never print its values). It holds `VITE_EMAIL_SERVICE`, `VITE_EMAIL_TEMPLATE`, and `VITE_EMAIL_KEY` for the contact form; Vite inlines these into the client bundle, so treat them as public.
- Seed data: none

## Test it
- Fast, changed files only: none
- Full suite: no test runner. Use `npm run lint` then `npm run build` (under a minute each; wrap with `timeout 300` if unsure). On commit `8ac43934`, `npm run lint` fails with 4 ESLint errors in `src/components/sections/AboutModal.tsx:40:7` (`react-hooks/refs` — cannot access refs during render); `npm run build` succeeds.
- CI runs: no CI: merge asks until it exists

## Verify on the real thing
Hit every surface a change can show up on, not only the one the change is about:
- UI: after `npm run dev -- --port <n> --host 127.0.0.1`, open `http://127.0.0.1:<n>/` (home, projects, about modal, footer contact form). After a build, use `npm run preview` on the same port pattern.
- API: none (static SPA; contact email goes through EmailJS from the browser).
- CLI: none
- Jobs and workers: none

## Ways to hurt yourself
Things that look safe and aren't:
- Submitting the footer contact form sends a real email via EmailJS. Open the form to check layout and validation only; do not send while verifying.
- Another checkout may already hold port 5173 (or the port you pick); pass `--port` explicitly.
- `.env` is required for a working send button in dev, but missing keys only break submit — the rest of the site loads.

## Clean up
- Stop dev or preview servers you started with `kill <pid>` (the PID from the shell when you backgrounded it, or from `ss -ltnp` on your port). Do not use name-based kill patterns.
