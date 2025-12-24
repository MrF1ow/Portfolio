import { sections } from "@/utils/data/site";

export default function Navbar({ title }: { title: string }) {
  return (
    <>
      <div className="d-navbar p-0 h-24">
        <div className="flex-1">
          <a className="text-3xl">{title}</a>
        </div>

        <div className="flex-none hidden md:flex">
          <ul className="d-menu d-menu-horizontal gap-5">
            {sections.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
