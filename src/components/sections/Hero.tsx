import ScrambleText from "@/components/ui/ScrambleText";
import { personal, titles } from "@/data/personal";
import { getImage } from "@/data/images";

export default function Hero() {
  const photo = getImage("professional");

  return (
    <section id="home" className="min-h-svh flex items-center px-6 md:px-12 lg:px-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-12">
        <div className="flex-1 max-w-2xl">
          <p className="animate-in delay-1 font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
            Portfolio
          </p>

          <h1 className="animate-in delay-2 font-sans text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-text leading-[1.05]">
            {personal.fullName}
          </h1>

          <div className="h-10 mt-4 flex items-center">
            <ScrambleText
              texts={titles}
              interval={3000}
              scrambleDuration={800}
              className="font-mono text-lg md:text-xl text-accent"
            />
          </div>

          <p className="animate-in delay-3 font-mono text-base text-text-muted leading-relaxed mt-6 max-w-lg">
            {personal.tagline}
          </p>

          <div className="animate-in delay-4 flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-dark text-dark-text border border-dark hover:bg-dark/90 transition-colors"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="animate-in delay-2 flex-shrink-0">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-bg-alt border border-border overflow-hidden">
            {photo ? (
              <img
                src={photo}
                alt={personal.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-faint font-mono text-sm">
                Photo
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
