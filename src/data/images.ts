const images: Record<string, string> = {
  professional: "/pfp.webp",
};

export function getImage(key: string): string | undefined {
  return images[key.toLowerCase()];
}
