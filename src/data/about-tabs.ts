import type { AboutTabContent } from "@/types/about";

export const aboutTabs: AboutTabContent[] = [
  {
    id: "story",
    label: "My Story",
    heading: "My Story",
    content: [
      { type: "text", value: "Starting out in medicine might surprise some people, but once I got a job in that field, I quickly realized it wasn't the right fit for me. I decided to follow my other passion: software." },
      { type: "text", value: "I immediately fell in love with the endless ways I could help people; with just a laptop and a cup of coffee. Since then, I've been honing my skills in full-stack development, always looking for new challenges and opportunities to create meaningful solutions." },
    ],
  },
  {
    id: "faith",
    label: "Faith Journey",
    heading: "Faith Journey",
    content: [
      { type: "text", value: "At the core of everything I do, my main mission in life is to walk by faith and strive to live as my Lord and Savior, Jesus Christ, did: leading with integrity, love, and grace." },
      { type: "text", value: "My faith shapes how I approach work, relationships, and every decision I make. It grounds me and gives me purpose beyond the code I write." },
    ],
  },
  {
    id: "education",
    label: "Education",
    heading: "Education",
    content: [
      { type: "text", value: "I studied Computer Science at Oregon State University, earning my B.S. in June 2025." },
      { type: "text", value: "The program gave me a strong foundation in algorithms, systems design, and software engineering principles. But the real education came from building projects, collaborating with teams, and learning to solve problems I'd never seen before." },
    ],
  },
  {
    id: "family",
    label: "Family",
    heading: "Family",
    content: [
      { type: "text", value: "My wife and family are my greatest priorities, and I cherish every moment spent with them." },
      { type: "text", value: "When I'm not building software, I'm living life. Hiking and being outside is second nature, being from Oregon and all. Family keeps me grounded and reminds me what all the hard work is for." },
    ],
  },
  {
    id: "history",
    label: "History",
    heading: "History",
    content: [
      { type: "text", value: "Before software, I explored a career in medicine. That detour taught me empathy, attention to detail, and how to stay calm under pressure — skills that translate directly into engineering." },
      { type: "text", value: "Every chapter of my life has shaped who I am as a developer. The winding path wasn't a mistake — it was preparation." },
    ],
  },
];
