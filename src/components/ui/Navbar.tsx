/* Type Imports */
import type { JSX } from "react";
import type { Section } from "@/types/section";

/* Package Imports */
import { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";

/* Component Imports */
import ThemeSwitch from "@/components/ui/ThemeSwitch";

/*
 * Navbar
 *
 * This component renders the site navigation bar. It includes a title,
 * responsive menu sections, a dropdown menu for smaller screens, and
 * a theme switcher. The navbar changes background when the page is scrolled.
 *
 * @param {string} title - The site or page title displayed in the navbar.
 * @param {Section[]} sections - An array of sections with labels and hrefs for navigation links.
 *
 * @returns {JSX.Element} - The Navbar component.
 *
 * */
export default function Navbar({
  title,
  sections,
}: {
  title: string;
  sections: Section[];
}): JSX.Element {
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
        scrolled ? "bg-base-100/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container left-0 right-0 mx-auto px-4">
        <div className="d-navbar p-0 h-24">
          <div className="d-navbar-start">
            <div className="d-dropdown d-dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle cursor-pointer"
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
            <a className="text-4xl font-bold tracking-wide uppercase">
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
