export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  repo: string;
  live?: string;
  featured?: boolean;
}
