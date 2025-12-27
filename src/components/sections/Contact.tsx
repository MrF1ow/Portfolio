/* Type Imports */
import type { JSX } from "react";

/* Component Imports */
import SectionTitle from "@/components/ui/SectionTitle";
import DivideLayout from "@/components/layouts/Divide";
import Description from "@/components/ui/Description";
import { ContactForm } from "@/components/ui/Form";

/*
 * Contact
 *
 * This component renders the Contact section of the page.
 * It displays a section title, descriptive text, and a contact form
 * arranged in a vertically stacked layout.
 *
 * @param {string} description - The text content displayed in the Contact section.
 *
 * @returns {JSX.Element} - The Contact section component.
 *
 * */
export default function Contact({
  description,
}: {
  description: string;
}): JSX.Element {
  return (
    <section id="contact">
      <DivideLayout direction="vertical" width="w-full lg:w-auto">
        <SectionTitle title="Let's Connect" />
        <Description content={description} />
        <ContactForm />
      </DivideLayout>
    </section>
  );
}
