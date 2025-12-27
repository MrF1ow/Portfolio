/* Type Imports */
import type { JSX } from "react";

/* Package Imports */
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* Data Imports */
import { contact } from "@/utils/data/personal";

/*
 * Footer
 *
 * This component renders the site footer.
 * It displays branding text and social media links with
 * hover interactions for visual feedback.
 *
 * @returns {JSX.Element} - The Footer component.
 *
 * */
export default function Footer(): JSX.Element {
  return (
    <footer className="d-footer sm:d-footer-horizontal items-center p-4">
      <aside className="grid-flow-col items-center">
        <p>
          &copy; 2025 Ethan Flow. All rights reserved.
          <br />
          Providing awesome hair and laughter since 2001
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <div className="grid grid-flow-col gap-4">
          <a
            href={contact.links.github}
            className="transition-transform duration-200 hover:scale-110 hover:text-primary"
          >
            <FaGithub className="h-8 w-8" />
          </a>
          <a
            href={contact.links.linkedin}
            className="transition-transform duration-200 hover:scale-110 hover:text-primary"
          >
            <FaLinkedin className="h-8 w-8" />
          </a>
        </div>
      </nav>
    </footer>
  );
}
