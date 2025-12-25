import { useProfileMode } from "@/context/ProfileModeContext";
import { general as personalConfig } from "@/utils/data/personal";
import { engineer, personal } from "@/utils/data/personal";
import { engineerSections, personalSections } from "@/utils/data/site";
import { siteImages } from "@/utils/images";

import MainLayout from "@/components/layouts/Main";
import Navbar from "@/components/ui/Navbar";
import Home from "@/components/sections/Home";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import ThemeSwitch from "./components/ui/ThemeSwitch";

function App() {
  const { mode } = useProfileMode();

  const font = mode === "engineer" ? 'font-league' : 'font-jua';
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
          <Experience />
        ) : mode === "engineer" ? (
          <Portfolio />
        ) : null}
        <Skills />
        <div className="fixed bottom-0 right-0 flex mr-5 mb-5 p-2 md:hidden bg-black/70 backdrop-blur-md rounded-full">
          <ThemeSwitch />
        </div>
      </MainLayout>
    </div>
  );
}

export default App;
