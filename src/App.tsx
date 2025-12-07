import { site as siteConfig } from "@/utils/data/site";
import { personal as personalConfig } from "@/utils/data/personal";
import { siteImages } from "@/utils/images";

import MainLayout from "@/components/layouts/Main";
import Navbar from "@/components/ui/Navbar";
import Home from "@/components/sections/Home";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";

function App() {
  const fullName = `${personalConfig.firstName} ${personalConfig.lastName}`;

  return (
    <div className="relative w-full h-auto overflow-x-hidden">
      <img
        src={siteImages({ image: "dark-bg" })!}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-3xl -z-10"
      />
      <MainLayout>
        <Navbar title={fullName} sections={siteConfig.sections} />
        <Home />
        <About />
        <Experience />
        <Skills />
        <Portfolio />
      </MainLayout>
    </div>
  );
}

export default App;
