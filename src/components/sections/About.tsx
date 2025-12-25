import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";

export default function About({ about }: { about: string }) {
  return (
    <section id="about">
      <DivideLayout direction="vertical">
        <SectionTitle title="Who am I?" color="text-warning" />
        <div className="flex items-center justify-center w-full">
          <p className="text-xl w-full md:w-3/4 lg:w-1/2 text-center">
            {about}
          </p>
        </div>
      </DivideLayout>
    </section>
  );
}
