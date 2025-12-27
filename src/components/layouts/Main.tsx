/*
 * MainLayout
 *
 * This component serves as the primary page layout wrapper.
 * It constrains content width, applies responsive horizontal padding,
 * and spaces child elements vertically using adaptive gaps.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the layout.
 *
 * @returns {JSX.Element} - The MainLayout component.
 *
 * */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 flex flex-col gap-8 md:gap-12 lg:gap-16">
      {children}
    </main>
  );
}
