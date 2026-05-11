import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Foodable",
    description:
      "AI-driven full-stack web app delivering personalized food recommendations using vector search, REST APIs, and intelligent meal insight generation.",
    tags: ["TypeScript", "React", "Next.js", "Node.js", "MongoDB", "OpenAI", "Docker"],
    repo: "https://github.com/MrF1ow/foodable-legacy",
    featured: true,
  },
  {
    id: 2,
    title: "Playlist Partner",
    description:
      "Generates algorithmic playlist recommendations by filtering and remixing a user's existing Spotify playlists.",
    tags: ["TypeScript", "React", "Node.js", "MongoDB", "Redux"],
    repo: "https://playlist-partner.vercel.app/",
  },
  {
    id: 3,
    title: "Image Editor",
    description:
      "Lightweight desktop app with real-time image editing — resizing, cropping, filtering, and color adjustments.",
    tags: ["Python", "OpenCV"],
    repo: "https://github.com/MrF1ow/Image_Viewer_Editor",
  },
  {
    id: 4,
    title: "Portfolio Site",
    description:
      "This site. Single-page portfolio built with React, Tailwind v4, and custom design system inspired by my agency work.",
    tags: ["TypeScript", "React", "Vite", "Tailwind"],
    repo: "#",
    featured: true,
  },
];
