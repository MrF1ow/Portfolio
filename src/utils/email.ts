import emailjs from "@emailjs/browser";

/*
 * This function sends an email to the owner of the website.
 * It uses the emailjs library to send the email.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form event.
 * @param {HTMLFormElement} form - The form itself
 * @returns {void}
 */
export const sendEmail = (
  e: React.FormEvent<HTMLFormElement>,
  form: HTMLFormElement
) => {
  e.preventDefault();

  console.log("Email Called")

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
