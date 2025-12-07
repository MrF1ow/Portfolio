import type { PersonalInfo } from "@/types/personal";

export default function AboutInfo({ user }: { user: PersonalInfo }) {
  return (
    <div className="flex w-full flex-col">
      <h2 className="text-warning text-3xl font-bold mb-4">Who am I?</h2>
      <p className="mb-4 text-xl">{user.aboutMe}</p>
    </div>
  );
}
