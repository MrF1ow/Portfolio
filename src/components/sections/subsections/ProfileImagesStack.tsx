import { StackCards } from "@/components/ui/Stack";
import { personalImages } from "@/utils/images";
import type { PersonalInfo } from "@/types/personal";

export function ProfileImagesStack({ user }: { user: PersonalInfo }) {
  return (
    <StackCards
      items={user.images}
      extractId={(img) => img}
      direction="right"
      offset={30}
      renderItem={(img) => {
        const src = personalImages({ image: img });

        if (!src) return null;

        return (
          <img
            src={src}
            alt={img}
            className="rounded-xl shadow-lg w-75 h-75 object-cover"
          />
        );
      }}
    />
  );
}
