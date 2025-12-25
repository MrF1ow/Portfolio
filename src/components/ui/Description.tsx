export default function Description({ content }: { content: string }) {
  return (
    <div className="flex items-center justify-center w-full">
      <p className="text-xl w-full md:w-3/4 lg:w-1/2 text-center">{content}</p>
    </div>
  );
}
