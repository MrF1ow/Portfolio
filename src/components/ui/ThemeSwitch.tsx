/* Type Imports */
import type { JSX } from "react";

import { engineer, personal } from "@/utils/data/personal";

/* Local Imports */
import { useProfileMode } from "@/context/ProfileModeContext";

/*
 * ThemeSwitch
 *
 * This component provides a toggle between two profile modes: "personal" and "engineer".
 * It swaps icons to visually indicate the active mode and updates state via useProfileMode.
 *
 * @returns {JSX.Element} - The ThemeSwitch component.
 *
 * */
export default function ThemeSwitch(): JSX.Element {
  const { mode, toggleMode } = useProfileMode();
  return (
    <label className="d-swap d-swap-rotate">
      <input
        type="checkbox"
        checked={mode === "personal"}
        onChange={toggleMode}
      />

      <engineer.icon className="d-swap-off h-8 w-8 md:h-10 md:w-10" />

      <personal.icon className="d-swap-on h-8 w-8 md:h-10 md:w-10" />
    </label>
  );
}
