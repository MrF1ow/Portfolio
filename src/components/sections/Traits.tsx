/* Type Imports */
import type { JSX } from "react";

/* Component Imports */
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import { TraitCard } from "@/components/ui/Card";

/* Data Imports */
import { traits } from "@/utils/data/traits";

export default function Traits(): JSX.Element {
  const traitCards = traits.map((trait) => (
    <TraitCard
      key={trait.title}
      title={trait.title}
      description={trait.description}
      image={trait.image}
    />
  ));

  return (
    <section id="traits">
      <DivideLayout direction="vertical">
        <SectionTitle title="Traits" />
        <DivideLayout
          direction="horizontal"
          width="w-full lg:w-auto"
          animated={true}
          animateFrom="bottom"
        >
          {traitCards}
        </DivideLayout>
      </DivideLayout>
    </section>
  );
}
