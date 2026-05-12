import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";

export default function App() {
  return (
    <div className="grain">
      <main>
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      </main>
      <Footer />
    </div>
  );
}
