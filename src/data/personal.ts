import type { SocialLink } from "@/types/contact";

export const personal = {
  firstName: "Ethan",
  lastName: "Flow",
  fullName: "Ethan Flow",
  email: "eflow1280@gmail.com",
  university: "Oregon State University",
  degree: "B.S. Computer Science",
  graduated: "Jun 2025",
  tagline:
    "I build clean, efficient code, collaborate with teams, and tackle challenges with relentless focus.",
  aboutShort:
    "Starting out in medicine might surprise some people, but once I got a job in that field, I quickly realized it wasn't the right fit for me. I decided to follow my other passion: software. Since then, I've been honing my skills in full-stack development, always looking for new challenges.",
  contactMessage:
    "Whether it's software, business ideas, or just chatting about tech and games, I'm always up for a good conversation. Drop me a message through the form or connect via any of the links below.",
  funLine: "Providing awesome hair and laughter since 2001",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/MrF1ow", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ethanflow/", icon: "linkedin" },
  { label: "Email", href: "mailto:eflow1280@gmail.com", icon: "email" },
];

export const titles = ["Software Engineer", "Full-Stack Developer", "Problem Solver"];
