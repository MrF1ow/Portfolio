/* Type Imports */
import type { JSX } from "react";

/* Component Imports */
import MainLayout from "@/components/layouts/Main";
import Navbar from "@/components/ui/Navbar";
import Home from "@/components/sections/Home";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import Skills from "@/components/sections/Skills";
import Traits from "@/components/sections/Traits";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ThemeSwitch from "@/components/ui/ThemeSwitch";

/* Data Imports */
import { general as personalConfig } from "@/utils/data/personal";
import { engineer, personal } from "@/utils/data/personal";
import { engineerSections, personalSections } from "@/utils/data/site";

/* Utility Imports */
import { siteImages } from "@/utils/images";

/* Local Imports */
import { useProfileMode } from "@/context/ProfileModeContext";

/*
 * EngineerComponents
 *
 * This component aggregates the main sections for the "engineer" profile mode.
 * It includes the Portfolio and Skills sections.
 *
 * @returns {JSX.Element} - The EngineerComponents wrapper component.
 *
 * */

function EngineerComponents(): JSX.Element {
  return (
    <>
      <Portfolio />
      <Skills />
    </>
  );
}

/*
 * PersonalComponents
 *
 * This component aggregates the main sections for the "personal" profile mode.
 * It includes the Experience and Traits sections.
 *
 * @returns {JSX.Element} - The PersonalComponents wrapper component.
 *
 * */
function PersonalComponents(): JSX.Element {
  return (
    <>
      <Experience />
      <Traits />
    </>
  );
}

/*
 * App
 *
 * The main application component. It sets up the page layout and dynamically
 * renders sections based on the current profile mode ("engineer" or "personal").
 * Applies appropriate fonts, background images, and navigation sections.
 *
 * @returns {JSX.Element} - The root App component containing the full page structure.
 *
 * */
export default function App(): JSX.Element {
  const { mode } = useProfileMode();

  const font = mode === "engineer" ? "font-league" : "font-jua";
  const profile = mode === "engineer" ? engineer : personal;
  const backgroundImg = mode === "engineer" ? "dark-bg" : "light-bg";
  const sections = mode == "engineer" ? engineerSections : personalSections;

  const fullName = `${personalConfig.firstName} ${personalConfig.lastName}`;

  return (
    <div className={`relative w-full h-auto overflow-x-hidden ${font}`}>
      <img
        src={siteImages({ image: backgroundImg })!}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-3xl -z-10"
      />
      <Navbar title={fullName} sections={sections} />
      <MainLayout>
        <Home profile={profile} />
        <About about={profile.about} />
        {mode === "personal" ? (
          <PersonalComponents />
        ) : mode === "engineer" ? (
          <EngineerComponents />
        ) : null}
        <Contact description={profile.contact} />
        <Footer />
        <div className="fixed bottom-0 right-0 flex mr-5 mb-5 p-2 md:hidden bg-black/70 backdrop-blur-md rounded-full">
          <ThemeSwitch />
        </div>
      </MainLayout>
    </div>
  );
}
