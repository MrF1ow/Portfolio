export type ProfileMode = "engineer" | "personal";

export type ProfileModeContextType = {
  mode: ProfileMode;
  toggleMode: () => void;
  setMode: (mode: ProfileMode) => void;
};
