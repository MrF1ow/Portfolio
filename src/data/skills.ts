import type { SkillCategory } from "@/types/skill";

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    description: "Server-side systems and data layers",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "Docker", "AWS", "Go"],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces and client-side architecture",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind"],
  },
  {
    id: "systems",
    label: "Systems & Networking",
    description: "Infrastructure and tooling",
    skills: ["Linux", "Git", "Docker", "CI/CD", "Networking", "Shell Scripting"],
  },
  {
    id: "personal",
    label: "Personal",
    description: "How I work with people",
    skills: ["Problem Solving", "Team Collaboration", "Communication", "Adaptability", "Leadership"],
  },
  {
    id: "life",
    label: "Life",
    description: "What drives me outside of code",
    skills: ["Faith", "Family", "Hiking", "Continuous Learning", "Community"],
  },
];
