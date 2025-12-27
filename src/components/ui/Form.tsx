/* Type Imports */
import type { JSX } from "react";

/* Package Imports */
import emailjs from "@emailjs/browser";
import { useRef } from "react";

/* Component Imports */
import DivideLayout from "@/components/layouts/Divide";

/*
 * ContactForm
 *
 * This component renders a contact form with fields for name, email,
 * and message. It uses EmailJS to send the form data to the website owner.
 *
 * @returns {JSX.Element} - The ContactForm component.
 *
 * */
export const ContactForm = (): JSX.Element => {
  const form = useRef<HTMLFormElement>(null);

  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE;
  const serviceId = import.meta.env.VITE_EMAIL_SERVICE;
  const publicKey = import.meta.env.VITE_EMAIL_KEY;

  /*
   * This function sends an email to the owner of the website.
   * It uses the emailjs library to send the email.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   *
   * @returns {void}
   */
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      return;
    }
    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      )
      .then(
        (result) => {
          console.log(result.text);
          if (form.current) {
            form.current.reset();
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="d-card bg-base-100/25 w-full">
      <form ref={form} className="d-card-body" onSubmit={sendEmail}>
        <fieldset className="d-fieldset space-y-4">
          <DivideLayout direction="horizontal" width="w-full">
            <div className="flex flex-col gap-1 w-full">
              <label className="d-label text-warning">Name</label>
              <input
                type="text"
                name="name"
                className="d-input w-full"
                required
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="d-label text-warning">Email</label>
              <input
                type="email"
                name="email"
                className="d-input w-full"
                required
                placeholder="Your Email"
              />
            </div>
          </DivideLayout>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="d-label text-warning">Message</label>
            <textarea
              name="message"
              className="d-textarea w-full h-40 resize-none"
              required
              placeholder="A long time ago in a galaxy far, far away..."
            />
          </div>

          <button type="submit" className="d-btn d-btn-warning mt-4 text-lg">
            Send
          </button>
        </fieldset>
      </form>
    </div>
  );
};
