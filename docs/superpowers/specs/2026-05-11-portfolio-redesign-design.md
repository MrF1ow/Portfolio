# Portfolio Redesign — Design Spec

## Overview

Complete redesign of Ethan Flow's personal portfolio as a single-page site. Visual identity complements the Jedidiah Digital agency site through shared typography, accent color, and component patterns — but inverts the palette (light base vs agency's dark base) to differentiate.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 (no DaisyUI)

**Approach:** "Warm Inverse" — light cream base, agency dark (`#05090c`) as accent surfaces, shared blue accent (`#4a9eff`), same font pairing (Inter + Geist Mono).

---

## Visual Identity

### Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#f5f2ee` | Page background (warm cream) |
| `--color-bg-alt` | `#eae6e0` | Card surfaces, subtle alternation |
| `--color-text` | `#1a1a1a` | Primary text |
| `--color-text-muted` | `#555555` | Secondary text, descriptions |
| `--color-text-faint` | `#888888` | Labels, metadata |
| `--color-dark` | `#05090c` | Dark surfaces (modal, skill cards, footer) |
| `--color-dark-text` | `#f5f2ee` | Text on dark surfaces |
| `--color-dark-muted` | `#aaaaaa` | Muted text on dark surfaces |
| `--color-accent` | `#4a9eff` | Links, highlights, interactive — shared with agency |
| `--color-border` | `#d4d0ca` | Borders on light surfaces |
| `--color-border-dark` | `#2a2a2a` | Borders on dark surfaces |

### Typography

- **Body:** Geist Mono (monospace) — same as agency
- **Headings:** Inter (sans-serif) — same as agency
- **Differentiation:** Headings use medium weight (not extrabold like agency), slightly more letter-spacing

### Texture

- Subtle film grain overlay (`opacity: 0.045`, SVG fractalNoise, fixed position, `z-index: 9999`)
- No dot matrix, no grid overlay — clean surfaces with paper-like feel

### Edges

- All sharp edges throughout. No rounded corners on any element (cards, photo, buttons, inputs, modal).

---

## Sections

### 1. Hero

Full viewport height (`min-h-svh`), vertically centered content.

**Layout (desktop):** Left-aligned content + photo on right
**Layout (mobile):** Photo above, content below

**Content:**
- "Portfolio" label — mono, uppercase, faint, tracking-widest
- Name "Ethan Flow" — Inter, `text-5xl` / `lg:text-7xl`, medium weight
- Scramble text effect cycling titles: "Software Engineer", "Full-Stack Developer", "Problem Solver" — mono, accent color. Characters scramble/decode to reveal each title, cycles every 3 seconds
- Tagline paragraph — mono, muted
- Two buttons: "View Projects" (solid dark) + "Get In Touch" (outline dark)

**Photo:** Sharp-edged container, no rounded corners. Placeholder for now.

**Animation:** Staggered CSS fadeInUp on load — name, subtitle, tagline, buttons each delayed 0.2s apart. Pure CSS keyframes.

### 2. About

**On-page section:**
- Centered text block, `max-w-2xl`
- "About" label — mono, uppercase, faint
- Heading in Inter
- Short intro paragraph — mono, muted
- "Pop the Hood" button — outline style

**Modal (triggered by "Pop the Hood"):**
- Full dark background (`#05090c`) — stepping into agency aesthetic
- Fixed size: `max-w-4xl` × `520px` height — does NOT resize when switching tabs
- Centered on page with `p-4` breathing room on all sides

**Modal sidebar (desktop):** Left sidebar (`w-52`), always visible, vertical tab list with accent left-border on active tab

**Modal sidebar (mobile):** Hidden by default. Hamburger icon top-left triggers slide-in drawer from left side. Backdrop overlay behind drawer to dismiss.

**Tabs:** My Story, Faith Journey, Education, Family, History
- Each tab: heading (Inter) + 2-3 paragraphs (mono, dark-muted)
- Content crossfades on tab switch (150ms opacity + translateY transition)
- Tab content structure supports mixed content (text + images) for future use

**Close:** X button top-right + Escape key + backdrop click

### 3. Portfolio (Bento Grid)

**Layout:** 3-column grid on desktop, stacks on mobile. Zigzag bento pattern:
```
Row 1: [Featured 2-col] [Single]
Row 2: [Single] [Featured 2-col]
```

**Projects (4 total):**
1. Foodable (featured) — AI food recommendations, full-stack
2. Playlist Partner — Spotify playlist remixer
3. Image Editor — Python/OpenCV desktop app
4. Portfolio Site (featured) — this site

**Card design:**
- Light card (`bg-alt`) with border, sharp edges
- Title in Inter + arrow icon top-right
- Description in mono, muted
- Tech tags as small inline badges (`bg-text/5`)
- **Hover:** Card bg transitions to dark (`#05090c`), all text/tags invert to cream/dark-muted. Arrow nudges up-right. Smooth 300ms transition.

**"See More" button:** Centered below grid, outline style, links to GitHub profile. No arrow icon.

### 4. Skills

5 categories displayed as expandable dark cards.

**Layout:** Flex wrap with `justify-center` and `items-start`. Cards sized at `w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]`. Last row (2 cards) centers instead of hugging left. Cards size independently — expanding one does NOT affect siblings.

**Categories:**
- Backend: Node.js, Express, MongoDB, PostgreSQL, MySQL, Docker, AWS, Go
- Frontend: React, Next.js, TypeScript, JavaScript, HTML/CSS, Tailwind
- Systems & Networking: Linux, Git, Docker, CI/CD, Networking, Shell Scripting
- Personal: Problem Solving, Team Collaboration, Communication, Adaptability, Leadership
- Life: Faith, Family, Hiking, Continuous Learning, Community

**Card behavior:**
- Default: Dark bg, category name (Inter) + one-liner description (mono, muted) + chevron
- Click: Expands inline to reveal skill chips. Staggered fade-in (50ms per chip). Chevron rotates 180°.
- Expanded card gets accent left-border
- Accordion: only one card open at a time

**Skill chips:** Mono, `text-xs`, `bg-dark-text/10`, `text-dark-muted`

**"Learn More" button:** Centered below cards, outline style, scrolls to contact section.

### 5. Footer / Contact

Dark bg (`#05090c`). Full-width section.

**Layout:** Split — form on left, bio + links on right. On mobile: bio/links first (order-1), form second (order-2).

**Right side (bio):**
- "Get In Touch" label + "Let's connect" heading
- Short closing paragraph — mono, dark-muted
- Social icons: GitHub, LinkedIn, Email — hover transitions to cream

**Left side (form):**
- Name, Email, Message fields
- Mono font inputs, dark surface styling (`bg-dark-text/5`, `border-border-dark`)
- Focus state: `border-accent`
- Submit button: solid cream on dark
- EmailJS integration (dependency already present)

**Bottom:**
- "Providing awesome hair and laughter since 2001" — mono, extra faint
- Copyright line below

---

## Animation Philosophy

Subtle and refined. No heavy animation libraries.

- **Page load:** Staggered CSS fadeInUp on hero elements
- **Scramble text:** Custom React component, character-by-character decode effect
- **Modal:** fadeInUp entrance (300ms), backdrop fade (200ms)
- **Tab content:** Crossfade (150ms opacity + translateY)
- **Skill cards:** CSS grid-rows transition for expand/collapse, staggered chip opacity
- **Hover states:** 200-300ms transitions on cards, buttons, links
- **Mobile sidebar:** CSS translateX slide (300ms cubic-bezier)

---

## Data Architecture

All content lives in data files (existing `src/utils/data/` pattern). Components consume data, never hardcode strings.

- `personal.ts` — name, bio, contact info, social links
- `projects.ts` — project entries with title, description, tags, links, featured flag
- `skills.ts` — skill categories with labels, descriptions, skill lists
- `about-tabs.ts` — modal tab content (supports text paragraphs + image paths)
- `site.ts` — navigation sections, meta info

---

## What's NOT Changing

- Vite + React 19 + TypeScript stack
- Tailwind CSS v4
- `@/*` path alias
- EmailJS for contact form
- Project hosted at `~/Projects/personal/other/Portfolio`

## What's Being Removed

- DaisyUI (replaced by custom Tailwind theme)
- ProfileModeContext / dual-mode system
- Old fonts (League Spartan, Science Gothic, Jua)
- Lottie animations
- react-fast-marquee
- All existing components (full rewrite)
