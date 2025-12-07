export default function Navbar({
  title,
  sections,
}: {
  title: string;
  sections: string[];
}) {
  return (
    <>
      <div className="d-navbar bg-transparent p-0">
        <div className="flex-1">
          <a className="text-3xl">{title}</a>
        </div>

        <div className="flex-none hidden md:flex">
          <ul className="d-menu d-menu-horizontal gap-5">
            {sections.map((section) => (
              <li key={section}>
                <a>{section.charAt(0).toUpperCase() + section.slice(1)}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
