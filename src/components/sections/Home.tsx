import type { ProfileInfo } from "@/types/personal";
import { personalImages } from "@/utils/images";

export default function Home({ profile }: { profile: ProfileInfo }) {
  return (
    <section id="home">
      <div className="d-hero bg-none min-h-screen select-none">
        <div className="d-hero-content flex-col lg:flex-row-reverse">
          <div className="w-75 h-100 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={personalImages({ image: profile.image })!}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
              <span className="block">
                Hey <span className="inline-block animate-wave">👋</span>
              </span>
              <span className="block">
                I'm <span className="text-primary">Ethan</span>
              </span>
              <span>a {""}</span>
              <span className="d-text-rotate">
                <span>
                  {profile.titles.map((title, i) => (
                    <span key={i} className="text-warning">
                      {title}
                    </span>
                  ))}
                </span>
              </span>
            </h1>

            <p className="py-6">{profile.slogan}</p>
            <div className="flex flex-row gap-2">
              <a href="#contact" className="d-btn d-btn-primary">
                Contact Me
              </a>
              <button className="d-btn d-btn-outline d-btn-warning">
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
