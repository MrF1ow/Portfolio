import type { PersonalInfo } from "@/types/personal";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function HomeInfo({ user }: { user: PersonalInfo }) {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-3xl font-bold leading-10 text-d-base-content md:font-extrabold lg:text-[2.6rem] lg:leading-14">
        Hello, <br />
        I’m <span className="text-primary">{user.firstName}</span>
        {`, a `}
        <span className="d-text-rotate">
          <span>
            {user.titles.map((title, i) => (
              <span key={i} className="text-warning">
                {title}
              </span>
            ))}
          </span>
        </span>
      </h1>
      <div className="my-12 flex items-center gap-5">
        <a
          href={user.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all text-primary hover:scale-125 duration-300"
        >
          <BsGithub size={32} />
        </a>
        <a
          href={user.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all text-primary hover:scale-125 duration-300"
        >
          <BsLinkedin size={32}/>
        </a>
      </div>
    </div>
  );
}
