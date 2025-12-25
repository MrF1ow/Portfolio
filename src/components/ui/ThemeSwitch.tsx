import { useProfileMode } from "@/context/ProfileModeContext";
import { FaCode } from "react-icons/fa";
import { FaPersonHiking } from "react-icons/fa6";

export default function ThemeSwitch() {
  const { mode, toggleMode } = useProfileMode();
  return (
    <label className="d-swap d-swap-rotate">
      <input
        type="checkbox"
        checked={mode === "personal"}
        onChange={toggleMode}
      />

      <FaCode className="d-swap-off h-8 w-8 md:h-10 md:w-10" />

      <FaPersonHiking className="d-swap-on h-8 w-8 md:h-10 md:w-10" />
    </label>
  );
}
