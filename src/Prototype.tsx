import Hero from "@/components/prototype/Hero";
import About from "@/components/prototype/About";
import Portfolio from "@/components/prototype/Portfolio";
import Skills from "@/components/prototype/Skills";
import Footer from "@/components/prototype/Footer";

export default function Prototype() {
  return (
    <div className="grain">
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Footer />
    </div>
  );
}
