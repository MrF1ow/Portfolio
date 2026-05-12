import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Go Core",
    description:
      "Multi-tenant authentication and authorization module for Go — JWT auth, OAuth2 social login, WebAuthn/passkeys, magic links, 2FA, RBAC, and an embedded HTMX admin GUI.",
    tags: ["Go", "Gin", "PostgreSQL", "Redis", "JWT", "WebAuthn", "OAuth2", "HTMX"],
    repo: "https://github.com/MrF1ow/go-core",
    featured: true,
  },
  {
    id: 2,
    title: "SimplySigned",
    description:
      "Legal e-signature SaaS platform — upload PDFs, send signing links, and collect legally-binding electronic signatures with full audit trails and tamper detection.",
    tags: ["TypeScript", "Next.js", "React", "Supabase", "Stripe", "Tailwind"],
    repo: "https://github.com/MrF1ow/SimplySigned",
    featured: true,
  },
  {
    id: 3,
    title: "Foodable",
    description:
      "AI-driven full-stack web app delivering personalized food recommendations using vector search, REST APIs, and intelligent meal insight generation.",
    tags: ["TypeScript", "React", "Next.js", "Node.js", "MongoDB", "OpenAI", "Docker"],
    repo: "https://github.com/MrF1ow/foodable-legacy",
  },
  {
    id: 4,
    title: "Image Editor",
    description:
      "Lightweight desktop app with real-time image editing — resizing, cropping, filtering, and color adjustments.",
    tags: ["Python", "OpenCV"],
    repo: "https://github.com/MrF1ow/Image_Viewer_Editor",
  },
  {
    id: 5,
    title: "Portfolio Site",
    description:
      "This site. Single-page portfolio built with React, Tailwind v4, and custom design system inspired by my agency work.",
    tags: ["TypeScript", "React", "Vite", "Tailwind"],
    repo: "#",
    featured: true,
  },
];
