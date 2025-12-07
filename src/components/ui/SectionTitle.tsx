type SectionTitleProps = {
  title: string;
  variant?: "center" | "left" | "right";
};

export default function SectionTitle({
  title,
  variant = "center",
}: SectionTitleProps) {
  const base =
    "font-bold tracking-wide text-neutral text-3xl inline-block";

  const variants = {
    center: "text-center w-full justify-center flex",
    left: "text-left w-full justify-start flex",
    right: "text-right w-full justify-end flex",
  };

  return (
    <div className={`${variants[variant]}`}>
      <h2 className={base}>{title}</h2>
    </div>
  );
}
