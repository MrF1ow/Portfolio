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
    title: "Foodable",
    description:
      "AI-driven full-stack web app delivering personalized food recommendations using vector search, REST APIs, and intelligent meal insight generation.",
    tags: ["TypeScript", "React", "Next.js", "Node.js", "MongoDB", "OpenAI", "Docker"],
    repo: "https://github.com/MrF1ow/foodable-legacy",
  },
  {
    id: 3,
    title: "Gitlawb Go Proxy",
    description:
      "Go module proxy bridging the standard Go toolchain with Gitlawb — a decentralized git network built on DIDs and IPFS/libp2p. Enables `go get` for decentralized modules with disk caching and zero external dependencies.",
    tags: ["Go", "GOPROXY", "IPFS", "libp2p", "DID", "Git"],
    repo: "https://github.com/MrF1ow/gitlawb-goproxy",
  },
  {
    id: 4,
    title: "SimplySigned",
    description:
      "Legal e-signature SaaS platform — upload PDFs, send signing links, and collect legally-binding electronic signatures with full audit trails and tamper detection.",
    tags: ["TypeScript", "Next.js", "React", "Supabase", "Stripe", "Tailwind"],
    repo: "https://github.com/MrF1ow/SimplySigned",
    featured: true,
  },
];
