import { useEffect, useState, useRef } from "react";
import type { AboutTabContent, AboutBlock } from "@/types/about";
import { aboutTabs } from "@/data/about-tabs";

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
  const contentRef = useRef<HTMLDivElement>(null);

  const [prevOpen, setPrevOpen] = useState(false);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setMobileNav(false);
      setActiveTab(aboutTabs[0]!.id);
      contentRef.current?.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileNav) setMobileNav(false);
        else onClose();
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
      contentRef.current?.scrollTo(0, 0);
    }, 150);
    setMobileNav(false);
  };

  const active: AboutTabContent = aboutTabs.find((t) => t.id === activeTab) ?? aboutTabs[0]!;

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in" style={{ animationDuration: "0.2s" }} />

      <div className="relative z-10 bg-dark text-dark-text w-full max-w-4xl h-[520px] flex flex-col sm:flex-row animate-in overflow-hidden" style={{ animationDuration: "0.3s" }}>
        {/* Mobile top bar */}
        <div className="sm:hidden flex items-center justify-between shrink-0 px-4 h-14 border-b border-border-dark">
          <button onClick={() => setMobileNav(!mobileNav)} className="w-8 h-8 flex items-center justify-center text-dark-muted hover:text-dark-text transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-dark-muted hover:text-dark-text transition-colors cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Desktop close */}
        <button onClick={onClose} className="hidden sm:flex absolute top-4 right-4 z-30 w-8 h-8 items-center justify-center text-dark-muted hover:text-dark-text transition-colors cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Desktop sidebar */}
        <nav className="hidden sm:flex flex-col w-52 shrink-0 border-r border-border-dark py-8">
          {aboutTabs.map((tab) => (
            <button key={tab.id} onClick={() => switchTab(tab.id)} className={`text-left px-5 py-2.5 font-mono text-sm tracking-wide transition-colors cursor-pointer border-l-2 ${activeTab === tab.id ? "text-dark-text border-accent" : "text-dark-muted hover:text-dark-text border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Mobile slide-in sidebar */}
        <div className={`sm:hidden absolute inset-y-0 left-0 z-20 w-52 bg-dark border-r border-border-dark flex flex-col py-16 transition-transform duration-300 ease-out ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
          {aboutTabs.map((tab) => (
            <button key={tab.id} onClick={() => switchTab(tab.id)} className={`text-left px-5 py-2.5 font-mono text-sm tracking-wide transition-colors cursor-pointer border-l-2 ${activeTab === tab.id ? "text-dark-text border-accent" : "text-dark-muted hover:text-dark-text border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {mobileNav && <div className="sm:hidden absolute inset-0 z-10 bg-black/40" onClick={() => setMobileNav(false)} />}

        {/* Content */}
        <div ref={contentRef} className="flex-1 min-h-0 p-8 sm:p-10 overflow-y-auto scrollbar-hide">
          <div className={`transition-all duration-150 ${contentFade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
            <h3 className="font-sans text-2xl font-medium tracking-tight mb-6">{active.heading}</h3>
            {active.content.map((block, i) => <BlockRenderer key={i} block={block} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
