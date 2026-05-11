# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Ethan Flow's portfolio as a single-page site with warm-inverse visual identity complementing the Jedidiah Digital agency site.

**Architecture:** Vite + React 19 SPA. All content in data files consumed by section components. Custom Tailwind v4 theme (no DaisyUI). Prototype components in `src/components/prototype/` serve as reference — production code replaces them in `src/components/sections/` and `src/components/ui/`.

**Tech Stack:** Vite 7, React 19, TypeScript (strict), Tailwind CSS v4, EmailJS

---

## File Structure

### Delete (old design)

```
src/App.tsx
src/Prototype.tsx
src/context/ProfileModeContext.tsx
src/components/layouts/Divide.tsx
src/components/layouts/Main.tsx
src/components/sections/About.tsx        (old)
src/components/sections/Contact.tsx      (old)
src/components/sections/Experience.tsx   (old)
src/components/sections/Footer.tsx       (old)
src/components/sections/Home.tsx         (old)
src/components/sections/Portfolio.tsx    (old)
src/components/sections/Skills.tsx       (old)
src/components/sections/Traits.tsx       (old)
src/components/ui/Animated.tsx
src/components/ui/Card.tsx
src/components/ui/Description.tsx
src/components/ui/Form.tsx
src/components/ui/Navbar.tsx
src/components/ui/SectionTitle.tsx
src/components/ui/ThemeSwitch.tsx
src/components/prototype/               (entire directory — was reference only)
src/hooks/useInView.ts
src/types/animated.d.ts
src/types/experience.d.ts
src/types/layouts.d.ts
src/types/personal.d.ts
src/types/profile.d.ts
src/types/traits.d.ts
src/assets/lotties/                     (entire directory)
src/assets/images/site/                 (old backgrounds)
```

### Keep (reuse data/assets)

```
src/assets/images/personal/             (profile photos, trait images — used in about modal)
src/utils/data/personal.ts              (modify: simplify for new structure)
src/utils/data/projects.ts              (modify: add featured flag)
src/utils/data/skills.ts                (rewrite: new category structure)
src/utils/data/site.ts                  (rewrite: single nav sections list)
src/utils/images.ts                     (modify: remove site images, keep personal)
src/types/section.d.ts                  (keep as-is)
src/types/project.d.ts                  (modify: add featured)
src/types/skill.d.ts                    (rewrite: new shape)
src/styles/global.css                   (already rewritten in prototype)
src/main.tsx                            (already rewritten in prototype)
index.html                              (already rewritten in prototype)
```

### Create

```
src/App.tsx                             (new: single-page shell with grain wrapper)
src/types/about.d.ts                    (about tab types)
src/types/contact.d.ts                  (contact form types)
src/utils/data/about-tabs.ts            (modal tab content)
src/components/ui/ScrambleText.tsx       (already exists from prototype)
src/components/ui/SectionLabel.tsx       (shared "PORTFOLIO" / "SKILLS" label)
src/components/ui/OutlineButton.tsx      (shared outline button)
src/components/sections/Hero.tsx
src/components/sections/About.tsx
src/components/sections/AboutModal.tsx
src/components/sections/Portfolio.tsx
src/components/sections/Skills.tsx
src/components/sections/Footer.tsx
```

---

## Task 1: Clean up old code and dependencies

**Files:**
- Delete: all files listed in "Delete" section above
- Modify: `package.json` (remove unused deps)

- [ ] **Step 1: Remove unused dependencies**

```bash
cd ~/Projects/personal/other/Portfolio
npm uninstall daisyui lottie-react react-fast-marquee react-icons
```

- [ ] **Step 2: Delete old component files**

```bash
cd ~/Projects/personal/other/Portfolio

# Old layouts and context
rm src/App.tsx
rm src/Prototype.tsx
rm -rf src/context/
rm -rf src/components/layouts/

# Old sections
rm src/components/sections/About.tsx
rm src/components/sections/Contact.tsx
rm src/components/sections/Experience.tsx
rm src/components/sections/Footer.tsx
rm src/components/sections/Home.tsx
rm src/components/sections/Portfolio.tsx
rm src/components/sections/Skills.tsx
rm src/components/sections/Traits.tsx

# Old UI components (keep ScrambleText.tsx)
rm src/components/ui/Animated.tsx
rm src/components/ui/Card.tsx
rm src/components/ui/Description.tsx
rm src/components/ui/Form.tsx
rm src/components/ui/Navbar.tsx
rm src/components/ui/SectionTitle.tsx
rm src/components/ui/ThemeSwitch.tsx

# Old prototype directory
rm -rf src/components/prototype/

# Old hooks
rm src/hooks/useInView.ts

# Old types (keep section.d.ts, project.d.ts, skill.d.ts)
rm src/types/animated.d.ts
rm src/types/experience.d.ts
rm src/types/layouts.d.ts
rm src/types/personal.d.ts
rm src/types/profile.d.ts
rm src/types/traits.d.ts

# Old assets
rm -rf src/assets/lotties/
rm -rf src/assets/images/site/
```

- [ ] **Step 3: Verify clean state**

```bash
cd ~/Projects/personal/other/Portfolio
ls src/components/sections/  # should be empty
ls src/components/ui/        # should only have ScrambleText.tsx
ls src/types/                # should have section.d.ts, project.d.ts, skill.d.ts
```

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add -A
git commit -m "chore: remove old design code and unused dependencies"
```

---

## Task 2: Types and data layer

**Files:**
- Create: `src/types/about.d.ts`, `src/types/contact.d.ts`
- Modify: `src/types/project.d.ts`, `src/types/skill.d.ts`
- Rewrite: `src/utils/data/skills.ts`, `src/utils/data/site.ts`, `src/utils/data/personal.ts`
- Create: `src/utils/data/about-tabs.ts`
- Modify: `src/utils/data/projects.ts`
- Modify: `src/utils/images.ts`

- [ ] **Step 1: Create about tab types**

Create `src/types/about.d.ts`:

```typescript
export interface AboutTabContent {
  id: string;
  label: string;
  heading: string;
  content: AboutBlock[];
}

export type AboutBlock =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };
```

- [ ] **Step 2: Create contact types**

Create `src/types/contact.d.ts`:

```typescript
export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
}
```

- [ ] **Step 3: Update project type**

Rewrite `src/types/project.d.ts`:

```typescript
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  live?: string;
  featured?: boolean;
}
```

- [ ] **Step 4: Rewrite skill type**

Rewrite `src/types/skill.d.ts`:

```typescript
export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: string[];
}
```

- [ ] **Step 5: Rewrite site data**

Rewrite `src/utils/data/site.ts`:

```typescript
import type { Section } from "@/types/section";

export const sections: Section[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
```

- [ ] **Step 6: Simplify personal data**

Rewrite `src/utils/data/personal.ts`:

```typescript
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
```

- [ ] **Step 7: Update projects data**

Rewrite `src/utils/data/projects.ts`:

```typescript
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
```

- [ ] **Step 8: Rewrite skills data**

Rewrite `src/utils/data/skills.ts`:

```typescript
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
```

- [ ] **Step 9: Create about tabs data**

Create `src/utils/data/about-tabs.ts`:

```typescript
import type { AboutTabContent } from "@/types/about";

export const aboutTabs: AboutTabContent[] = [
  {
    id: "story",
    label: "My Story",
    heading: "My Story",
    content: [
      {
        type: "text",
        value:
          "Starting out in medicine might surprise some people, but once I got a job in that field, I quickly realized it wasn't the right fit for me. I decided to follow my other passion: software.",
      },
      {
        type: "text",
        value:
          "I immediately fell in love with the endless ways I could help people; with just a laptop and a cup of coffee. Since then, I've been honing my skills in full-stack development, always looking for new challenges and opportunities to create meaningful solutions.",
      },
    ],
  },
  {
    id: "faith",
    label: "Faith Journey",
    heading: "Faith Journey",
    content: [
      {
        type: "text",
        value:
          "At the core of everything I do, my main mission in life is to walk by faith and strive to live as my Lord and Savior, Jesus Christ, did: leading with integrity, love, and grace.",
      },
      {
        type: "text",
        value:
          "My faith shapes how I approach work, relationships, and every decision I make. It grounds me and gives me purpose beyond the code I write.",
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    heading: "Education",
    content: [
      {
        type: "text",
        value:
          "I studied Computer Science at Oregon State University, earning my B.S. in June 2025.",
      },
      {
        type: "text",
        value:
          "The program gave me a strong foundation in algorithms, systems design, and software engineering principles. But the real education came from building projects, collaborating with teams, and learning to solve problems I'd never seen before.",
      },
    ],
  },
  {
    id: "family",
    label: "Family",
    heading: "Family",
    content: [
      {
        type: "text",
        value:
          "My wife and family are my greatest priorities, and I cherish every moment spent with them.",
      },
      {
        type: "text",
        value:
          "When I'm not building software, I'm living life. Hiking and being outside is second nature, being from Oregon and all. Family keeps me grounded and reminds me what all the hard work is for.",
      },
    ],
  },
  {
    id: "history",
    label: "History",
    heading: "History",
    content: [
      {
        type: "text",
        value:
          "Before software, I explored a career in medicine. That detour taught me empathy, attention to detail, and how to stay calm under pressure — skills that translate directly into engineering.",
      },
      {
        type: "text",
        value:
          "Every chapter of my life has shaped who I am as a developer. The winding path wasn't a mistake — it was preparation.",
      },
    ],
  },
];
```

- [ ] **Step 10: Simplify images utility**

Rewrite `src/utils/images.ts`:

```typescript
import personalAdv from "@/assets/images/personal/personal-adventure.jpg";
import personalChr from "@/assets/images/personal/personal-christ.jpg";
import personalFri from "@/assets/images/personal/personal-friend.jpg";
import personalHus from "@/assets/images/personal/personal-husband.jpg";
import profilePer from "@/assets/images/personal/profile-per.jpg";
import profileEng from "@/assets/images/personal/profile-eng.jpg";

const images: Record<string, string> = {
  husband: personalHus,
  adventure: personalAdv,
  christ: personalChr,
  friend: personalFri,
  professional: profileEng,
  personal: profilePer,
};

export function getImage(key: string): string | undefined {
  return images[key.toLowerCase()];
}
```

- [ ] **Step 11: Verify TypeScript compiles**

```bash
cd ~/Projects/personal/other/Portfolio
npx tsc --noEmit 2>&1 | head -20
```

Expect errors only for missing components (App.tsx not yet created). Types and data should compile clean.

- [ ] **Step 12: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/types/ src/utils/ 
git commit -m "refactor: rewrite types and data layer for redesign"
```

---

## Task 3: Shared UI components

**Files:**
- Modify: `src/components/ui/ScrambleText.tsx` (already exists, no changes needed)
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/ui/OutlineButton.tsx`
- Create: `src/components/ui/SocialIcon.tsx`

- [ ] **Step 1: Create SectionLabel component**

Create `src/components/ui/SectionLabel.tsx`:

```tsx
interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p className="font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
      {text}
    </p>
  );
}
```

- [ ] **Step 2: Create OutlineButton component**

Create `src/components/ui/OutlineButton.tsx`:

```tsx
interface OutlineButtonProps {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  external?: boolean;
}

export default function OutlineButton({
  href,
  children,
  dark = false,
  external = false,
}: OutlineButtonProps) {
  const base = "inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide transition-colors";
  const light = "bg-transparent text-text border border-text hover:bg-text/5";
  const darkStyle = "bg-transparent text-dark-text border border-dark-text hover:bg-dark-text/5";

  return (
    <a
      href={href}
      className={`${base} ${dark ? darkStyle : light}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 3: Create SocialIcon component**

Create `src/components/ui/SocialIcon.tsx`:

```tsx
interface SocialIconProps {
  icon: "github" | "linkedin" | "email";
  href: string;
  label: string;
}

export default function SocialIcon({ icon, href, label }: SocialIconProps) {
  return (
    <a
      href={href}
      target={icon === "email" ? undefined : "_blank"}
      rel={icon === "email" ? undefined : "noopener noreferrer"}
      className="text-dark-muted hover:text-dark-text transition-colors"
      aria-label={label}
    >
      {icon === "github" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )}
      {icon === "linkedin" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )}
      {icon === "email" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13 2 4" />
        </svg>
      )}
    </a>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
cd ~/Projects/personal/other/Portfolio
npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/components/ui/
git commit -m "feat: add shared UI components (SectionLabel, OutlineButton, SocialIcon)"
```

---

## Task 4: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/sections/Hero.tsx`:

```tsx
import ScrambleText from "@/components/ui/ScrambleText";
import { personal, titles } from "@/utils/data/personal";
import { getImage } from "@/utils/images";

export default function Hero() {
  const photo = getImage("professional");

  return (
    <section id="home" className="min-h-svh flex items-center px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="flex-1 max-w-2xl">
          <p className="animate-in delay-1 font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
            Portfolio
          </p>

          <h1 className="animate-in delay-2 font-sans text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-text leading-[1.05]">
            {personal.fullName}
          </h1>

          <div className="h-10 mt-4 flex items-center">
            <ScrambleText
              texts={titles}
              interval={3000}
              scrambleDuration={800}
              className="font-mono text-lg md:text-xl text-accent"
            />
          </div>

          <p className="animate-in delay-3 font-mono text-base text-text-muted leading-relaxed mt-6 max-w-lg">
            {personal.tagline}
          </p>

          <div className="animate-in delay-4 flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-dark text-dark-text border border-dark hover:bg-dark/90 transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="animate-in delay-2 flex-shrink-0">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-bg-alt border border-border overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt={personal.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-faint font-mono text-sm">
                Photo
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/components/sections/Hero.tsx
git commit -m "feat: add Hero section with scramble text and profile photo"
```

---

## Task 5: About section + modal

**Files:**
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/AboutModal.tsx`

- [ ] **Step 1: Create AboutModal component**

Create `src/components/sections/AboutModal.tsx`:

```tsx
import { useEffect, useState, useRef } from "react";
import type { AboutTabContent, AboutBlock } from "@/types/about";
import { aboutTabs } from "@/utils/data/about-tabs";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

function BlockRenderer({ block }: { block: AboutBlock }) {
  if (block.type === "image") {
    return (
      <img
        src={block.src}
        alt={block.alt}
        className="w-full max-h-64 object-cover border border-border-dark mb-4"
      />
    );
  }
  return (
    <p className="font-mono text-sm text-dark-muted leading-relaxed mb-4 last:mb-0">
      {block.value}
    </p>
  );
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState(aboutTabs[0]!.id);
  const [contentFade, setContentFade] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setMobileNav(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileNav) {
          setMobileNav(false);
        } else {
          onClose();
        }
      }
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, mobileNav]);

  const switchTab = (id: string) => {
    if (id === activeTab) return;
    setContentFade(false);
    setTimeout(() => {
      setActiveTab(id);
      setContentFade(true);
    }, 150);
    setMobileNav(false);
  };

  const active: AboutTabContent = aboutTabs.find((t) => t.id === activeTab) ?? aboutTabs[0]!;

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in" style={{ animationDuration: "0.2s" }} />

      <div
        className="relative z-10 bg-dark text-dark-text w-full max-w-4xl h-[520px] flex animate-in overflow-hidden"
        style={{ animationDuration: "0.3s" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center text-dark-muted hover:text-dark-text transition-colors cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Mobile nav toggle */}
        <button
          onClick={() => setMobileNav(!mobileNav)}
          className="absolute top-4 left-4 z-30 w-8 h-8 flex sm:hidden items-center justify-center text-dark-muted hover:text-dark-text transition-colors cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Desktop sidebar */}
        <nav className="hidden sm:flex flex-col w-52 shrink-0 border-r border-border-dark py-8">
          {aboutTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`text-left px-5 py-2.5 font-mono text-sm tracking-wide transition-colors cursor-pointer border-l-2 ${
                activeTab === tab.id
                  ? "text-dark-text border-accent"
                  : "text-dark-muted hover:text-dark-text border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Mobile slide-in sidebar */}
        <div
          className={`sm:hidden absolute inset-y-0 left-0 z-20 w-52 bg-dark border-r border-border-dark flex flex-col py-16 transition-transform duration-300 ease-out ${
            mobileNav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {aboutTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`text-left px-5 py-2.5 font-mono text-sm tracking-wide transition-colors cursor-pointer border-l-2 ${
                activeTab === tab.id
                  ? "text-dark-text border-accent"
                  : "text-dark-muted hover:text-dark-text border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {mobileNav && (
          <div
            className="sm:hidden absolute inset-0 z-10 bg-black/40"
            onClick={() => setMobileNav(false)}
          />
        )}

        {/* Content */}
        <div className="flex-1 p-8 sm:p-10 overflow-y-auto">
          <div
            className={`transition-all duration-150 pt-8 sm:pt-0 ${
              contentFade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
          >
            <h3 className="font-sans text-2xl font-medium tracking-tight mb-6">
              {active.heading}
            </h3>
            {active.content.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create About section component**

Create `src/components/sections/About.tsx`:

```tsx
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import AboutModal from "./AboutModal";
import { personal } from "@/utils/data/personal";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel text="About" />
          <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text">
            Building software with purpose
          </h2>
          <p className="font-mono text-base text-text-muted leading-relaxed mt-6">
            {personal.aboutShort}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center px-7 py-3 mt-8 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors cursor-pointer"
          >
            Pop the Hood
          </button>
        </div>
      </section>

      <AboutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/components/sections/About.tsx src/components/sections/AboutModal.tsx
git commit -m "feat: add About section with tabbed dark modal"
```

---

## Task 6: Portfolio section

**Files:**
- Create: `src/components/sections/Portfolio.tsx`

- [ ] **Step 1: Create Portfolio component**

Create `src/components/sections/Portfolio.tsx`:

```tsx
import SectionLabel from "@/components/ui/SectionLabel";
import OutlineButton from "@/components/ui/OutlineButton";
import { projects } from "@/utils/data/projects";
import type { Project } from "@/types/project";

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col justify-between p-6 sm:p-8 bg-bg-alt border border-border transition-colors duration-300 hover:bg-dark hover:border-border-dark ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`font-sans font-medium tracking-tight text-text group-hover:text-dark-text transition-colors duration-300 ${
              project.featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0 text-text-faint group-hover:text-dark-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M5 15L15 5M15 5H8M15 5v7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p
          className={`font-mono text-text-muted group-hover:text-dark-muted leading-relaxed transition-colors duration-300 ${
            project.featured ? "text-sm sm:text-base max-w-lg" : "text-sm"
          }`}
        >
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2.5 py-1 bg-text/5 text-text-faint group-hover:bg-dark-text/10 group-hover:text-dark-muted transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Portfolio() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="Portfolio" />
        <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text mb-12">
          Things I've built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <OutlineButton href="https://github.com/MrF1ow" external>
            See More
          </OutlineButton>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/components/sections/Portfolio.tsx
git commit -m "feat: add Portfolio section with bento grid and hover inversion"
```

---

## Task 7: Skills section

**Files:**
- Create: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills component**

Create `src/components/sections/Skills.tsx`:

```tsx
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import OutlineButton from "@/components/ui/OutlineButton";
import { skillCategories } from "@/utils/data/skills";
import type { SkillCategory } from "@/types/skill";

function SkillCard({
  category,
  expanded,
  onToggle,
}: {
  category: SkillCategory;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`text-left w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] p-6 bg-dark border transition-all duration-300 cursor-pointer ${
        expanded
          ? "border-accent/40 border-l-accent border-l-2"
          : "border-border-dark hover:border-border-dark/80"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sans text-lg font-medium tracking-tight text-dark-text">
            {category.label}
          </h3>
          <p className="font-mono text-xs text-dark-muted mt-1">
            {category.description}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 text-dark-muted transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          expanded ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <span
                key={skill}
                className="font-mono text-xs px-2.5 py-1 bg-dark-text/10 text-dark-muted transition-opacity duration-300"
                style={{
                  transitionDelay: expanded ? `${i * 50}ms` : "0ms",
                  opacity: expanded ? 1 : 0,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Skills() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionLabel text="Skills" />
        <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text mb-12">
          What I bring to the table
        </h2>

        <div className="flex flex-wrap justify-center gap-4 items-start">
          {skillCategories.map((cat) => (
            <SkillCard
              key={cat.id}
              category={cat}
              expanded={expanded === cat.id}
              onToggle={() =>
                setExpanded(expanded === cat.id ? null : cat.id)
              }
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <OutlineButton href="#contact">Learn More</OutlineButton>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/components/sections/Skills.tsx
git commit -m "feat: add Skills section with expandable dark accordion cards"
```

---

## Task 8: Footer / Contact section

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/sections/Footer.tsx`:

```tsx
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import SectionLabel from "@/components/ui/SectionLabel";
import SocialIcon from "@/components/ui/SocialIcon";
import { personal, socialLinks } from "@/utils/data/personal";

export default function Footer() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = import.meta.env.VITE_EMAIL_SERVICE;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE;
    const publicKey = import.meta.env.VITE_EMAIL_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      () => {
        form.current?.reset();
      },
      (error) => {
        console.error("EmailJS error:", error.text);
      }
    );
  };

  return (
    <footer id="contact" className="bg-dark text-dark-text">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Bio + links */}
          <div className="flex-1 order-1 lg:order-2">
            <SectionLabel text="Get In Touch" />
            <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-dark-text mb-6">
              Let's connect
            </h2>
            <p className="font-mono text-sm text-dark-muted leading-relaxed max-w-md">
              {personal.contactMessage}
            </p>

            <div className="flex items-center gap-5 mt-8">
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.icon}
                  icon={link.icon}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="flex-1 order-2 lg:order-1">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="self-start inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-dark-text text-dark border border-dark-text hover:bg-dark-text/90 transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-border-dark text-center">
          <p className="font-mono text-xs text-dark-muted/60 mb-1">
            {personal.funLine}
          </p>
          <p className="font-mono text-xs text-dark-muted">
            &copy; {new Date().getFullYear()} {personal.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/components/sections/Footer.tsx
git commit -m "feat: add Footer with contact form, social links, and EmailJS"
```

---

## Task 9: App shell and final wiring

**Files:**
- Create: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create App component**

Create `src/App.tsx`:

```tsx
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";

export default function App() {
  return (
    <div className="grain">
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Update main.tsx**

Rewrite `src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 3: Verify TypeScript compiles cleanly**

```bash
cd ~/Projects/personal/other/Portfolio
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Verify dev server runs**

```bash
cd ~/Projects/personal/other/Portfolio
npm run dev
```

Open http://localhost:5173/ — all 5 sections should render. Check:
- Hero: scramble text cycles, photo loads, buttons anchor-link correctly
- About: "Pop the Hood" opens dark modal, tabs switch, mobile sidebar slides
- Portfolio: bento grid, hover inverts cards, "See More" links to GitHub
- Skills: accordion expand/collapse, last row centers, cards size independently
- Footer: form fields focus with accent border, social icons hover, fun line shows

- [ ] **Step 5: Verify production build**

```bash
cd ~/Projects/personal/other/Portfolio
npm run build
```

Expected: clean build, no errors.

- [ ] **Step 6: Commit**

```bash
cd ~/Projects/personal/other/Portfolio
git add src/App.tsx src/main.tsx
git commit -m "feat: wire up App shell with all sections"
```

---

## Task 10: Final cleanup

**Files:**
- Delete: any remaining unused old files
- Modify: `package.json` if needed

- [ ] **Step 1: Check for orphaned files**

```bash
cd ~/Projects/personal/other/Portfolio
# Check for any files not imported anywhere
find src -name "*.ts" -o -name "*.tsx" | while read f; do
  base=$(basename "$f" | sed 's/\.\(ts\|tsx\)$//')
  if [ "$base" != "main" ] && ! grep -rq "$base" src/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
    echo "ORPHANED: $f"
  fi
done
```

- [ ] **Step 2: Delete any orphaned files found**

Remove files identified in step 1 (if any).

- [ ] **Step 3: Run lint**

```bash
cd ~/Projects/personal/other/Portfolio
npm run lint
```

Fix any lint errors.

- [ ] **Step 4: Final production build check**

```bash
cd ~/Projects/personal/other/Portfolio
npm run build
```

- [ ] **Step 5: Commit cleanup**

```bash
cd ~/Projects/personal/other/Portfolio
git add -A
git commit -m "chore: final cleanup — remove orphaned files, fix lint"
```
