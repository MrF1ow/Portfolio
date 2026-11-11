export const site = {
  name: "Ethan Flow",
  title: "Ethan Flow — Software Engineer",
  description:
    "I build systems that run themselves: they take in work, plan it, build it, check it and ship it without anyone pushing. That leaves me free to decide what's worth building. And to get outside.",
  url: "https://ethanflow.dev",
  links: {
    github: "https://github.com/MrF1ow",
    x: "https://x.com/MrF1ow",
    linkedin: "https://www.linkedin.com/in/ethanflow/",
  },
  turnstile: {
    // TODO(manual): replace with the ethanflow.dev widget sitekey
    sitekey: "1x00000000000000000000AA",
    action: "register",
  },
  timeline: [
    { year: 2022, label: "JavaScript · React · Node" },
    { year: 2023, label: "Python · C/C++ · SQL" },
    { year: 2024, label: "Next.js · first AI integrations" },
    { year: 2025, label: "B.S. CS, Oregon State · Go" },
    { year: 2026, label: "agents write it. I build the system." },
  ],
  fluent: [
    { name: "typescript", level: 20 },
    { name: "python", level: 19 },
    { name: "postgres", level: 19 },
    { name: "go", level: 17 },
    { name: "aws", level: 15 },
    { name: "docker", level: 16 },
  ],
} as const;
