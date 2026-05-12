"use client";

import { useState } from "react";
import { skillCategories } from "@/data/skills";
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
      className={`text-left w-full p-6 bg-dark border border-l-2 transition-all duration-300 cursor-pointer ${
        expanded
          ? "border-accent/40 border-l-accent"
          : "border-border-dark border-l-dark hover:border-border-dark/80"
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
          className={`shrink-0 text-dark-muted transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
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
        className={`grid transition-all duration-300 ${expanded ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"}`}
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
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
          Skills
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text mb-12">
          What I bring to the table
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {skillCategories.map((cat) => (
            <SkillCard
              key={cat.id}
              category={cat}
              expanded={expanded.has(cat.id)}
              onToggle={() =>
                setExpanded((prev) => {
                  const next = new Set(prev);
                  if (next.has(cat.id)) next.delete(cat.id);
                  else next.add(cat.id);
                  return next;
                })
              }
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
