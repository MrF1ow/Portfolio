import type { Job } from "@/types/experience";

export const experiences: Job[] = [
  {
    id: 1,
    company: "FAST Enterprises",
    position: "Implementation Consultant",
    location: "Des Moines, IA",
    startDate: "Aug 2025",
    endDate: "Dec 2025",
    description:
      "Developed software supporting Driver and Vehicle Services for the state of Iowa, including systems used by DMVs to issue credentials and registrations. Collaborated closely with stakeholders to ensure compliance with Iowa Code, federal law, and daily operational needs. Left the role due to a required relocation after my wife began a graduate program in another state.",
    tags: [
      "C#",
      ".NET",
      "PostgreSQL",
      "Software Implementation",
      "Troubleshooting",
      "Government Software",
    ],
  },
  {
    id: 2,
    company: "Beaver Town Movers",
    position: "Job Site Supervisor",
    location: "Corvallis, OR",
    startDate: "Aug 2023",
    endDate: "Jul 2025",
    description:
      "I started as a general worker and was promoted to Job Site Supervisor within three months. I led teams on-site, coordinated with clients and staff to keep operations running smoothly, and maintained a safe, collaborative work environment. I consistently prioritized respect, professionalism, and clear communication for both clients and team members.",
    tags: [
      "Team Leadership",
      "Customer Communication",
      "Logistics",
      "Safety Management",
      "Operations",
    ],
  },
];
