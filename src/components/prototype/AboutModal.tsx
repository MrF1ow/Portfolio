import { useEffect, useState, useRef } from "react";

interface Tab {
  id: string;
  label: string;
  heading: string;
  content: string[];
}

const tabs: Tab[] = [
  {
    id: "story",
    label: "My Story",
    heading: "My Story",
    content: [
      "Starting out in medicine might surprise some people, but once I got a job in that field, I quickly realized it wasn't the right fit for me. I decided to follow my other passion: software.",
      "I immediately fell in love with the endless ways I could help people; with just a laptop and a cup of coffee. Since then, I've been honing my skills in full-stack development, always looking for new challenges and opportunities to create meaningful solutions.",
    ],
  },
  {
    id: "faith",
    label: "Faith Journey",
    heading: "Faith Journey",
    content: [
      "At the core of everything I do, my main mission in life is to walk by faith and strive to live as my Lord and Savior, Jesus Christ, did: leading with integrity, love, and grace.",
      "My faith shapes how I approach work, relationships, and every decision I make. It grounds me and gives me purpose beyond the code I write.",
    ],
  },
  {
    id: "education",
    label: "Education",
    heading: "Education",
    content: [
      "I studied Computer Science at Oregon State University, earning my B.S. in June 2025.",
      "The program gave me a strong foundation in algorithms, systems design, and software engineering principles. But the real education came from building projects, collaborating with teams, and learning to solve problems I'd never seen before.",
    ],
  },
  {
    id: "family",
    label: "Family",
    heading: "Family",
    content: [
      "My wife and family are my greatest priorities, and I cherish every moment spent with them.",
      "When I'm not building software, I'm living life. Hiking and being outside is second nature, being from Oregon and all. Family keeps me grounded and reminds me what all the hard work is for.",
    ],
  },
  {
    id: "history",
    label: "History",
    heading: "History",
    content: [
      "Before software, I explored a career in medicine. That detour taught me empathy, attention to detail, and how to stay calm under pressure — skills that translate directly into engineering.",
      "Every chapter of my life has shaped who I am as a developer. The winding path wasn't a mistake — it was preparation.",
    ],
  },
];

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState("story");
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

  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0]!;

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in" style={{ animationDuration: "0.2s" }} />

      {/* Modal — fixed size, centered */}
      <div
        className="relative z-10 bg-dark text-dark-text w-full max-w-4xl h-[520px] flex animate-in overflow-hidden"
        style={{ animationDuration: "0.3s" }}
      >
        {/* Close button */}
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

        {/* Desktop sidebar — always visible on sm+ */}
        <nav className="hidden sm:flex flex-col w-52 shrink-0 border-r border-border-dark py-8">
          {tabs.map((tab) => (
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
          {tabs.map((tab) => (
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

        {/* Mobile sidebar backdrop */}
        {mobileNav && (
          <div
            className="sm:hidden absolute inset-0 z-10 bg-black/40"
            onClick={() => setMobileNav(false)}
          />
        )}

        {/* Content — fixed height, scrolls internally */}
        <div className="flex-1 p-8 sm:p-10 overflow-y-auto">
          <div
            className={`transition-all duration-150 pt-8 sm:pt-0 ${
              contentFade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
          >
            <h3 className="font-sans text-2xl font-medium tracking-tight mb-6">
              {active.heading}
            </h3>
            {active.content.map((paragraph, i) => (
              <p
                key={i}
                className="font-mono text-sm text-dark-muted leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
