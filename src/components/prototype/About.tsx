import { useState } from "react";
import AboutModal from "./AboutModal";

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
            About
          </p>
          <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text">
            Building software with purpose
          </h2>
          <p className="font-mono text-base text-text-muted leading-relaxed mt-6">
            Starting out in medicine might surprise some people, but once I got a
            job in that field, I quickly realized it wasn't the right fit for me.
            I decided to follow my other passion: software. Since then, I've been
            honing my skills in full-stack development, always looking for new
            challenges.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center px-7 py-3 mt-8 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors cursor-pointer"
          >
            Pop the Hood
          </button>
        </div>
      </section>

      <AboutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
