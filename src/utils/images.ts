/* Site Images */
import darkBg from "@/assets/images/site/dark-bg.jpg";
import lightBg from "@/assets/images/site/light-bg.jpg";

/* Personal Images */
import personal1 from "@/assets/images/personal/personal-1.jpg";
import personal2 from "@/assets/images/personal/personal-2.jpg";
import personal3 from "@/assets/images/personal/personal-3.jpg";
import personal4 from "@/assets/images/personal/personal-4.jpg";
import profile from "@/assets/images/personal/profile.jpg"

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
    case "personal-1":
      return personal1;
    case "personal-2":
      return personal2;
    case "personal-3":
      return personal3;
    case "personal-4":
      return personal4;
    case "profile":
      return profile;
    default:
      return null;
  }
};
