interface SectionLabelProps {
  text: string;
  dark?: boolean;
}

export default function SectionLabel({ text, dark }: SectionLabelProps) {
  return (
    <p className={`font-mono text-sm tracking-widest uppercase mb-4 ${dark ? "text-dark-muted" : "text-text-faint"}`}>
      {text}
    </p>
  );
}
