# Portfolio

Personal portfolio site built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- [**Vite**](https://vite.dev/)
- [**React 19**](https://react.dev/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS v4**](https://tailwindcss.com/)
- [**EmailJS**](https://www.emailjs.com/)

## Customization

Fork and adapt as needed. Key locations:

1. **Data** — all content lives in `/src/data/`. No hard-coded strings elsewhere.
2. **Types** — data shape definitions in `/src/types/`. Review before editing data files.
3. **Images** — image paths managed via `/src/data/images.ts` using `getImage(key)`.
4. **Components** — page sections in `/src/components/sections/`, shared UI in `/src/components/ui/`.
5. **EmailJS** — contact form uses EmailJS. Set `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` in your `.env`.
