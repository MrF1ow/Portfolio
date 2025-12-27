import type { ContactInfo, GeneralInfo, ProfileInfo } from "@/types/personal";

/*
 * general
 *
 * Object containing basic personal information for the profile or resume.
 *
 * @type {GeneralInfo}
 * @property {string} firstName - The first name of the person.
 * @property {string} lastName - The last name of the person.
 * @property {string} university - The university attended.
 * @property {string} degree - The degree obtained.
 * @property {string} graduated - Graduation date.
 *
 * */
export const general: GeneralInfo = {
  firstName: "Ethan",
  lastName: "Flow",
  university: "Oregon State University",
  degree: "B.S. Computer Science",
  graduated: "Jun 2025",
};

/*
 * contact
 *
 * Object containing contact information for the profile or website.
 *
 * @type {ContactInfo}
 * @property {string} email - The email address for contacting.
 * @property {object} links - Social media or professional links.
 * @property {string} links.github - GitHub profile URL.
 * @property {string} links.linkedin - LinkedIn profile URL.
 * @property {string} resumePath - Path to the resume PDF.
 *
 * */
export const contact: ContactInfo = {
  email: "eflow1280@gmail.com",
  links: {
    github: "https://github.com/MrF1ow",
    linkedin: "https://www.linkedin.com/in/ethanflow/",
  },
};

/*
 * engineer
 *
 * Object containing profile information for the "engineer" persona.
 * Includes titles, personal slogan, about section, contact message, and profile image.
 *
 * @type {ProfileInfo}
 * @property {string[]} titles - Array of titles describing the persona.
 * @property {string} slogan - A brief personal motto or slogan.
 * @property {string} about - Detailed background and professional story.
 * @property {string} contact - Contact message or invitation to connect.
 * @property {string} image - Key representing the profile image.
 *
 * */
export const engineer: ProfileInfo = {
  titles: ["Software Engineer", "Team Player", "Hard Worker", "Machine"],
  slogan:
    "I build clean, efficient code, collaborate with teams, and tackle challenges with relentless focus",
  about:
    "Starting out in medicine might surprise some people, but once I got a job in that field, I quickly realized it wasn’t the right fit for me. I decided to follow my other passion: software. I immediately fell in love with the endless ways I could help people; with just a laptop and a cup of coffee. Since then, I’ve been honing my skills in Full-Stack development, always looking for new challenges and opportunities to create meaningful solutions.",
  contact:
    "Whether it’s software, business ideas, or just chatting about tech and games, I’m always up for a good conversation. Drop me a message through the form or connect via any of the links below. I’d love to hear from you.",
  image: "professional",
};

/*
 * personal
 *
 * Object containing profile information for the "personal" persona.
 * Includes titles, personal slogan, about section, contact message, and profile image.
 *
 * @type {ProfileInfo}
 * @property {string[]} titles - Array of titles describing the persona.
 * @property {string} slogan - A brief personal motto or slogan.
 * @property {string} about - Detailed background and personal story.
 * @property {string} contact - Contact message or invitation to connect.
 * @property {string} image - Key representing the profile image.
 *
 * */
export const personal: ProfileInfo = {
  titles: ["Husband", "Family Man", "Christ Follower", "Anime Lover"],
  slogan:
    "I cherish family, live by faith, and embrace life with curiosity, laughter, and a love for adventure",
  about:
    "When I am not building software, I am living life. Hiking and being outside is second nature, being from Oregon and all. My wife and family are my greatest priorities, and I cherish every moment spent with them. At the core of everything I do, my main mission in life is to walk by faith and strive to live as my Lord and Savior, Jesus Christ, did: leading with integrity, love, and grace.",
  contact:
    "Whether it’s diving into the word together, discussing travel ideas, or just talking about life, I’m always up for a great conversation. Reach out through the form or any of my links below. I’d love to connect and hear your story.",
  image: "personal",
};
