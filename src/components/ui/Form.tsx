import DivideLayout from "@/components/layouts/Divide";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

export const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

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
        "service_vvmo2po",
        "template_ydxmazn",
        form.current,
        "gHbohdTGXICJZMhQU"
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
                placeholder="Enter Name"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="d-label text-warning">Email</label>
              <input
                type="email"
                name="email"
                className="d-input w-full"
                placeholder="Enter Email"
              />
            </div>
          </DivideLayout>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="d-label text-warning">Message</label>
            <textarea
              name="message"
              className="d-textarea w-full h-40 resize-none"
              placeholder="Message to send me"
            />
          </div>

          <button type="submit" className="d-btn d-btn-warning mt-4">
            Send
          </button>
        </fieldset>
      </form>
    </div>
  );
};
