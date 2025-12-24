import DivideLayout from "@/components/layouts/Divide";
import AboutInfo from "@/components/sections/subsections/AboutInfo";
import { personal } from "@/utils/data/personal";
import { ProfileImagesStack } from "@/components/sections/subsections/ProfileImagesStack";

export default function About() {
  return (
    <section id="home">
      <DivideLayout direction="horizontal">
        <AboutInfo user={personal} />
        <div className="pr-0 md:pr-5 lg:pr-10">
          <ProfileImagesStack user={personal} />
        </div>
      </DivideLayout>
    </section>
  );
}
