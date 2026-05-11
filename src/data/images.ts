import personalAdv from "@/assets/images/personal/personal-adventure.jpg";
import personalChr from "@/assets/images/personal/personal-christ.jpg";
import personalFri from "@/assets/images/personal/personal-friend.jpg";
import personalHus from "@/assets/images/personal/personal-husband.jpg";
import profilePer from "@/assets/images/personal/profile-per.jpg";
import profileEng from "@/assets/images/personal/profile-eng.jpg";

const images: Record<string, string> = {
  husband: personalHus,
  adventure: personalAdv,
  christ: personalChr,
  friend: personalFri,
  professional: profileEng,
  personal: profilePer,
};

export function getImage(key: string): string | undefined {
  return images[key.toLowerCase()];
}
