import { site as siteConfig } from "@/config/site";
import { personal as personalConfig } from "@/config/site";

import MainLayout from "@/components/layouts/Main";
import Navbar from "@/components/ui/Navbar";
import Experience from "@/components/sections/Experience";

function App() {
  const fullName = `${personalConfig.firstName} ${personalConfig.lastName}`;

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src="/assets/images/background2.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-3xl -z-10"
      />
      <MainLayout>
        <Navbar title={fullName} sections={siteConfig.sections} />
        <Experience />
      </MainLayout>
    </div>
  );
}

export default App;
