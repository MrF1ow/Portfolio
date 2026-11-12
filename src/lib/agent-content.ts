// Plain-text versions of the page for AI agents and crawlers: /index.md (the page as Markdown),
// /llms.txt (a short summary with links) and /llms-full.txt (everything, stories included).
// Built from the same data the page renders (src/data/site.ts and the stories collection), so they
// cannot drift from it. tests/content.spec.ts checks that every section heading on the page is here.
import { getCollection } from "astro:content";
import { site } from "../data/site";

type Story = { label: string; heading: string; blurb: string; paragraphs: string[] };

/** The four Camp stories in page order, with their paragraphs as plain text. */
export async function getStories(): Promise<Story[]> {
  const entries = (await getCollection("stories")).sort((a, b) => a.data.order - b.data.order);
  return entries.map((e) => ({
    label: e.data.label,
    heading: e.data.heading,
    blurb: e.data.blurb,
    paragraphs: (e.body ?? "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  }));
}

const md = (lines: string[]) => lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
const url = (path = "/") => new URL(path, site.url).href;

// Section copy as it appears on the page (headings are checked against the page by the tests).
const SECTIONS = {
  hero: { eyebrow: "Trailhead · Software engineer", headline: "I don't write code. I build what writes it." },
  climb: {
    heading: "01 · The climb — The machine does the hiking.",
    intro:
      "This is the kind of thing I build: work comes in, a planner splits it across agents, tests and review send back anything that isn't right, and what ships teaches it for next time. Nobody has to push it along.",
    steps: [
      "Triggers: a cron schedule, a webhook or an issue starts a job.",
      "Intake: the work is queued, and you set the goal.",
      "Planner: breaks the work into tasks.",
      "Agents: three agents build in parallel.",
      "Tests and review: anything that isn't right is sent back and retried.",
      "Ship: what passes is shipped.",
      "Observe and memory: what shipped is watched, and what it teaches is remembered for next time.",
    ],
  },
  trail: { heading: "02 · The trail so far — Every year a little higher." },
  camp: { heading: "03 · Camp — Outside the machine.", intro: "Pull up a chair. Pick a story." },
  register: {
    heading: "04 · The register — Sign the register.",
    intro:
      "Hikers sign in at the trailhead so someone knows they passed through. Building something, hiring, or just want to say hi? Leave a note and I'll write back.",
  },
};

const links = () => [
  `- GitHub: ${site.links.github}`,
  `- X: ${site.links.x}`,
  `- LinkedIn: ${site.links.linkedin}`,
];

/** /index.md: the whole page, section by section, as Markdown. */
export async function pageMarkdown(): Promise<string> {
  const stories = await getStories();
  return md([
    `# ${site.title}`,
    "",
    `> ${site.description}`,
    "",
    `${SECTIONS.hero.eyebrow}. ${SECTIONS.hero.headline}`,
    "",
    `Web version: ${url()}`,
    "",
    `## ${SECTIONS.climb.heading}`,
    "",
    SECTIONS.climb.intro,
    "",
    ...SECTIONS.climb.steps.map((s) => `- ${s}`),
    "",
    `## ${SECTIONS.trail.heading}`,
    "",
    ...site.timeline.map((t) => `- **${t.year}**: ${t.label}`),
    "",
    "Still fluent in: " + site.fluent.map((f) => f.name).join(", ") + ".",
    "",
    `## ${SECTIONS.camp.heading}`,
    "",
    SECTIONS.camp.intro,
    "",
    ...stories.flatMap((s) => [`### ${s.label}: ${s.heading}`, "", ...s.paragraphs.flatMap((p) => [p, ""])]),
    `## ${SECTIONS.register.heading}`,
    "",
    SECTIONS.register.intro,
    "",
    `Use the form at ${url("/#register")}, or find me on:`,
    "",
    ...links(),
    "",
    "---",
    "",
    "see you on the trail.",
  ]);
}

/** /llms.txt: a short summary with links to the full versions. */
export async function llmsSummary(): Promise<string> {
  const stories = await getStories();
  return md([
    `# ${site.title}`,
    "",
    `> ${site.description}`,
    "",
    `- The page as Markdown: ${url("/index.md")}`,
    `- Everything, with the full stories: ${url("/llms-full.txt")}`,
    "",
    "## About",
    "",
    `${site.name} is a software engineer based in Oregon, with a B.S. in Computer Science from Oregon State University (2025). He is the founder of Jedidiah Digital (https://jedidiahdigital.com). He builds systems that run themselves: work comes in, gets planned, is built by agents, checked, shipped and learned from, without someone pushing every step.`,
    "",
    "## The trail so far",
    "",
    ...site.timeline.map((t) => `- ${t.year}: ${t.label}`),
    "",
    "## Still fluent in",
    "",
    site.fluent.map((f) => f.name).join(", "),
    "",
    "## Camp (stories)",
    "",
    ...stories.map((s) => `- ${s.label}: ${s.blurb}`),
    "",
    "## Contact",
    "",
    `- The register (contact form): ${url("/#register")}`,
    ...links(),
  ]);
}

/** /llms-full.txt: the page as Markdown, which already holds every story in full. */
export async function llmsFull(): Promise<string> {
  return pageMarkdown();
}
