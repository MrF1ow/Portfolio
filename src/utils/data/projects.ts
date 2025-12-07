import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    language: "typescript",
    title: "Foodable",
    description:
      "An AI-driven full-stack web application that delivers personalized food recommendations using vector search, REST APIs, and intelligent meal insight generation. Features scalable data models, persistent state management with TanStack Query + Zustand, and a full testing pipeline with Cypress and Jest.",
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB Atlas",
      "ClerkJS",
      "TanStack Query",
      "Zustand",
      "OpenAI",
      "Vercel",
      "Docker",
      "Cypress",
      "Jest",
    ],
    src: "https://github.com/MrF1ow/Foodable",
  },
  {
    id: 2,
    language: "typescript",
    title: "Playlist Partner",
    description:
      "A full-stack application that generates algorithmic playlist recommendations by filtering and remixing a user’s existing Spotify playlists. Uses serverless backend functions, Axios for API communication, and Redux for client-side state with persistence.",
    tags: [
      "TypeScript",
      "React",
      "Node.js",
      "Vite",
      "MongoDB",
      "Redux",
      "Axios",
      "Emotion",
      "Spotify API",
    ],
    src: "https://playlist-partner.vercel.app/",
  },
  {
    id: 3,
    language: "python",
    title: "Image Editor",
    description:
      "A lightweight desktop application built with Python and OpenCV that provides real-time image editing capabilities. Includes tools for resizing, cropping, filtering, and color adjustments, paired with optimized processing routines to handle large image files efficiently. Designed with an intuitive interface that allows users to quickly view, modify, and preview changes with immediate visual feedback.",
    tags: ["Python", "OpenCV"],
    src: "https://github.com/MrF1ow/Image_Viewer_Editor",
  },
  {
    id: 4,
    language: "c",
    title: "Small Shell",
    description:
      "A lightweight bash-like shell implemented in C with support for command execution, directory navigation, background and foreground process control, and basic I/O redirection. Includes signal handling for SIGINT and SIGTSTP, custom variable expansion for the process ID, and a minimal job-management system that mirrors core UNIX shell behavior.",
    tags: [
      "C",
      "Unix Shell",
      "Process Management",
      "Signals",
      "I/O Redirection",
      "Foreground/Background Jobs",
    ],
    src: "https://github.com/MrF1ow/smallsh",
  },
];
