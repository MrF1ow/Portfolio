export default function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
      {title}
    </h2>
  );
}
