export type Project = {
  id: number;
  language: "typescript" | "python" | "c";
  title: string;
  description: string;
  tags: string[];
  src: string;
};
