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

/* Project Images */
import foodableImg from "@/assets/images/projects/foodable.png";
import imageEditorImg from "@/assets/images/projects/image-editor.png";
import playlistPartnerImg from "@/assets/images/projects/playlist-partner.png";

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

export const projectImages = ({ project }: { project: string }) => {
  const projectId = project.toLowerCase();
  switch (projectId) {
    case "foodable":
      return foodableImg;
    case "image editor":
      return imageEditorImg;
    case "playlist partner":
      return playlistPartnerImg;
    default:
      return null;
  }
};

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
