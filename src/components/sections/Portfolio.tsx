import SwipeCards from "@/components/ui/SwipeCards";
import DivideLayout from "@/components/layouts/Divide";
import Lottie from "lottie-react";
import webCoding from "@/assets/lotties/web-coding.json";

export default function Portfolio() {
  return (
    <div className="w-full flex justify-center items-center">
        <div className="w-full md:w-[75%] lg:w-[50%]">
            <SwipeCards />
        </div>
    </div>
  );
}
