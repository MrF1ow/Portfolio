import type { Project } from "@/types/project";

/*
 * projects
 *
 * Array of project entries for portfolio or showcase purposes.
 * Each project includes a title, description, technology tags, and source link.
 *
 * @type {Project[]}
 * @property {number} id - Unique identifier for the project.
 * @property {string} title - The name of the project.
 * @property {string} description - A detailed description of the project.
 * @property {string[]} tags - Technologies and tools used in the project.
 * @property {string} src - URL or repository link for the project.
 *
 * */
export const projects: Project[] = [
  {
    id: 1,
    title: "Foodable",
    description:
      "An AI-driven full-stack web application that delivers personalized food recommendations using vector search, REST APIs, and intelligent meal insight generation. Features scalable data models, persistent state management with TanStack Query + Zustand, and a full testing pipeline with Cypress and Jest.",
    tags: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "ClerkJS",
      "TanStack Query",
      "Zustand",
      "OpenAI",
      "Docker",
      "Cypress",
      "Jest",
    ],
    src: "https://github.com/MrF1ow/foodable-legacy",
  },
  {
    id: 2,
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
      "Emotion",
    ],
    src: "https://playlist-partner.vercel.app/",
  },
  {
    id: 3,
    title: "Image Editor",
    description:
      "A lightweight desktop application built with Python and OpenCV that provides real-time image editing capabilities. Includes tools for resizing, cropping, filtering, and color adjustments, paired with optimized processing routines to handle large image files efficiently. Designed with an intuitive interface that allows users to quickly view, modify, and preview changes with immediate visual feedback.",
    tags: ["Python", "OpenCV"],
    src: "https://github.com/MrF1ow/Image_Viewer_Editor",
  },
];
