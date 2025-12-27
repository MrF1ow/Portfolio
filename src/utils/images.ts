/* Site Images */
import darkBg from "@/assets/images/site/dark-bg.jpg";
import lightBg from "@/assets/images/site/light-bg.jpg";

/* Personal Images */
import personalAdv from "@/assets/images/personal/personal-adventure.jpg";
import personalChr from "@/assets/images/personal/personal-christ.jpg";
import personalFri from "@/assets/images/personal/personal-friend.jpg";
import personalHus from "@/assets/images/personal/personal-husband.jpg";
import profilePer from "@/assets/images/personal/profile-per.jpg";
import profileEng from "@/assets/images/personal/profile-eng.jpg";

/*
 * siteImages
 *
 * Utility function to retrieve site images by name.
 *
 * @param {string} image - The name of the image to retrieve (case-insensitive).
 *
 * @returns {string | null} - The corresponding image import or null if not found.
 *
 * */
export const siteImages = ({ image }: { image: string }) => {
  const imageId = image.toLowerCase();
  switch (imageId) {
    case "dark-bg":
      return darkBg;
    case "light-bg":
      return lightBg;
    default:
      return null;
  }
};

/*
 * personalImages
 *
 * Utility function to retrieve personal profile images by name.
 *
 * @param {string} image - The name of the personal image to retrieve (case-insensitive).
 *
 * @returns {string | null} - The corresponding personal image import or null if not found.
 *
 * */
export const personalImages = ({ image }: { image: string }) => {
  const imageId = image.toLowerCase();
  switch (imageId) {
    case "husband":
      return personalHus;
    case "adventure":
      return personalAdv;
    case "christ":
      return personalChr;
    case "friend":
      return personalFri;
    case "professional":
      return profileEng;
    case "personal":
      return profilePer;
    default:
      return null;
  }
};
