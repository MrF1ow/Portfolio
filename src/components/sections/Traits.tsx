import { TraitCard } from "@/components/ui/Card";
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import { traits } from "@/utils/data/traits";

export default function Traits() {
  return (
    <section id="traits">
      <DivideLayout direction="vertical">
        <SectionTitle title="Traits" />
        <DivideLayout direction="horizontal" width="w-full md:w-auto">
          {traits.map((trait) => (
            <TraitCard
              key={trait.title}
              title={trait.title}
              description={trait.description}
              image={trait.image}
            />
          ))}
        </DivideLayout>
      </DivideLayout>
    </section>
  );
}
