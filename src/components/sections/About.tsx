import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import Description from "@/components/ui/Description";

export default function About({ about }: { about: string }) {
  return (
    <section id="about">
      <DivideLayout direction="vertical">
        <SectionTitle title="Who am I?" color="text-warning" />
        <Description content={about} />
      </DivideLayout>
    </section>
  );
}
