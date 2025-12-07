export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 flex flex-col gap-16">
      {children}
    </main>
  );
}
