import type { Skill } from "@/types/skill";

import {
  BiLogoTypescript,
  BiLogoJavascript,
  BiLogoCss3,
  BiLogoGoLang,
  BiLogoMongodb,
  BiLogoPostgresql,
  BiLogoAws,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoGit,
  BiLogoDocker,
} from "react-icons/bi";

import { GrMysql } from "react-icons/gr";
import { VscVscode } from "react-icons/vsc";
import { RiNextjsFill } from "react-icons/ri";
import { SiExpress } from "react-icons/si";
import { FcLinux } from "react-icons/fc";

const languages: Skill[] = [
  {
    title: "TypeScript",
    value: 90,
    icon: BiLogoTypescript,
    iconColor: "#3178C6",
  },
  {
    title: "JavaScript",
    value: 85,
    icon: BiLogoJavascript,
    iconColor: "#F7DF1E",
  },
  {
    title: "HTML/CSS",
    value: 80,
    icon: BiLogoCss3,
    iconColor: "#E44D26",
  },
  {
    title: "Go",
    value: 75,
    icon: BiLogoGoLang,
    iconColor: "#00ADD8",
  },
];

const databases: Skill[] = [
  {
    title: "MongoDB",
    value: 90,
    icon: BiLogoMongodb,
    iconColor: "#47A248",
  },
  {
    title: "PostgreSQL",
    value: 85,
    icon: BiLogoPostgresql,
    iconColor: "#4169E1",
  },
  {
    title: "MySQL",
    value: 80,
    icon: GrMysql,
    iconColor: "#4479A1",
  },
  {
    title: "AWS",
    value: 75,
    icon: BiLogoAws,
    iconColor: "#FF9900",
  },
];

const frameworks: Skill[] = [
  {
    title: "React",
    value: 90,
    icon: BiLogoReact,
    iconColor: "#61DAFB",
  },
  {
    title: "Node.js",
    value: 85,
    icon: BiLogoNodejs,
    iconColor: "#339933",
  },
  {
    title: "Next.js",
    value: 80,
    icon: RiNextjsFill,
    iconColor: "#000000",
  },
  {
    title: "Express",
    value: 75,
    icon: SiExpress,
    iconColor: "#000000",
  },
];

const tools: Skill[] = [
  {
    title: "Git",
    value: 90,
    icon: BiLogoGit,
    iconColor: "#F05032",
  },
  {
    title: "Docker",
    value: 85,
    icon: BiLogoDocker,
    iconColor: "#2496ED",
  },
  {
    title: "VS Code",
    value: 80,
    icon: VscVscode,
    iconColor: "#007ACC",
  },
  {
    title: "Linux",
    value: 75,
    icon: FcLinux, // intentionally no iconColor
  },
];

export const skills = {
  languages,
  databases,
  frameworks,
  tools,
};
