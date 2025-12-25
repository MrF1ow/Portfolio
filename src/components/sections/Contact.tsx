import { ContactForm } from "@/components/ui/Form";
import SectionTitle from "@/components/ui/SectionTitle";
import DivideLayout from "@/components/layouts/Divide";
import Description from "@/components/ui/Description";

export default function Contact({ description }: { description: string }) {
  return (
    <section id="contact">
      <DivideLayout direction="vertical" width="w-full md:w-auto">
        <SectionTitle title="Let's Connect" />
        <Description content={description} />
        <ContactForm />
      </DivideLayout>
    </section>
  );
}
