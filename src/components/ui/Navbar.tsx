import type { Section } from "@/types/section";
import { BiMenuAltLeft } from "react-icons/bi";
import ThemeSwitch from "./ThemeSwitch";
import { useEffect, useState } from "react";

export default function Navbar({
  title,
  sections,
}: {
  title: string;
  sections: Section[];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`hidden md:block w-full z-100 fixed transition-colors duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container left-0 right-0 mx-auto px-4 md:px-2 lg:px-0">
        <div className="d-navbar p-0 h-24">
          <div className="d-navbar-start">
            <div className="d-dropdown d-dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <BiMenuAltLeft className="h-8 w-8 md:h-10 md:w-10" />
              </div>
              <ul
                tabIndex={-1}
                className="d-menu d-menu-xl d-dropdown-content bg-black/50 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {sections.map((s) => (
                  <li key={s.href}>
                    <a href={s.href}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="d-navbar-center">
            <a className="text-5xl font-bold tracking-wide uppercase">
              {title}
            </a>
          </div>
          <div className="d-navbar-end">
            <ThemeSwitch />
          </div>
        </div>
      </nav>
    </div>
  );
}
