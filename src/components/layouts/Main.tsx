export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 md:px-2 lg:px-0 flex flex-col gap-8 md:gap-12 lg:gap-16">
      {children}
    </main>
  );
}
