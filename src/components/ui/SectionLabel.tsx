interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p className="font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
      {text}
    </p>
  );
}
