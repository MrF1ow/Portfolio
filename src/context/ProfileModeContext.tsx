// src/context/ProfileModeContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ProfileMode = "engineer" | "personal";

type ProfileModeContextType = {
  mode: ProfileMode;
  toggleMode: () => void;
  setMode: (mode: ProfileMode) => void;
};

const ProfileModeContext = createContext<ProfileModeContextType | null>(null);

export function ProfileModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ProfileMode>(() => {
    if (typeof window === "undefined") return "engineer";
    return (localStorage.getItem("profileMode") as ProfileMode) ?? "engineer";
  });

  useEffect(() => {
    localStorage.setItem("profileMode", mode);
  }, [mode]);

  const toggleMode = () =>
    setMode((m) => (m === "engineer" ? "personal" : "engineer"));

  return (
    <ProfileModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ProfileModeContext.Provider>
  );
}

export function useProfileMode() {
  const ctx = useContext(ProfileModeContext);
  if (!ctx) {
    throw new Error("useProfileMode must be used within ProfileModeProvider");
  }
  return ctx;
}
