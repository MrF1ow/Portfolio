import { useRef } from "react";
import emailjs from "@emailjs/browser";
import SectionLabel from "@/components/ui/SectionLabel";
import SocialIcon from "@/components/ui/SocialIcon";
import { personal, socialLinks } from "@/data/personal";

export default function Footer() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = import.meta.env.VITE_EMAIL_SERVICE;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE;
    const publicKey = import.meta.env.VITE_EMAIL_KEY;

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      () => {
        form.current?.reset();
      },
      (error) => {
        console.error("EmailJS error:", error.text);
      }
    );
  };

  return (
    <footer id="contact" className="bg-dark text-dark-text">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Bio + links */}
          <div className="flex-1 order-1 lg:order-2">
            <SectionLabel text="Get In Touch" dark />
            <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-dark-text mb-6">
              Let's connect
            </h2>
            <p className="font-mono text-sm text-dark-muted leading-relaxed max-w-md">
              {personal.contactMessage}
            </p>

            <div className="flex items-center gap-5 mt-8">
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.icon}
                  icon={link.icon}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="flex-1 order-2 lg:order-1">
            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="self-start inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-dark-text text-dark border border-dark-text hover:bg-dark-text/90 transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-border-dark text-center">
          <p className="font-mono text-xs text-dark-muted mb-1">
            {personal.funLine}
          </p>
          <p className="font-mono text-xs text-dark-muted">
            &copy; {new Date().getFullYear()} {personal.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
