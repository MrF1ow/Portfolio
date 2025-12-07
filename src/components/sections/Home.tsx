import DivideLayout from "@/components/layouts/Divide";
import { personal as personalInfo } from "@/utils/data/personal";
import { UserCode } from "@/components/ui/CodeMock";
import HomeInfo from "@/components/sections/subsections/HomeInfo";

export default function Home() {
  {
    return (
      <DivideLayout direction="horizontal">
        <HomeInfo user={personalInfo} />
        <UserCode user={personalInfo} />
      </DivideLayout>
    );
  }
}
