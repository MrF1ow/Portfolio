import Lottie from "lottie-react";
import AnimationLayout from "@/components/layouts/Animation";

export default function AnimationLottie({
  animationData,
}: {
  animationData: any;
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    style: {
      width: "100%",
    },
  };

  return (
    <AnimationLayout>
      <Lottie {...defaultOptions} />
    </AnimationLayout>
  );
}
