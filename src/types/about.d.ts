export interface AboutTabContent {
  id: string;
  label: string;
  heading: string;
  content: AboutBlock[];
}

export type AboutBlock =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };
