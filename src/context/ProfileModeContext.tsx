/* Type Imports */
import type { ProfileMode, ProfileModeContextType } from "@/types/profile";
import type { JSX, ReactNode } from "react";

/* Package Imports */
import { createContext, useContext, useEffect, useState } from "react";

const ProfileModeContext = createContext<ProfileModeContextType | null>(null);

/*
 * ProfileModeProvider
 *
 * This component provides a React context for managing the user's profile mode,
 * which can be either "engineer" or "personal". The current mode is persisted
 * in localStorage, and the context exposes functions to toggle or set the mode.
 *
 * @param {ReactNode} children - The child components that will have access to the profile mode context.
 *
 * @returns {JSX.Element} - The ProfileModeProvider component wrapping its children with context.
 *
 * */
export function ProfileModeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
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

/*
 * useProfileMode
 *
 * Custom hook to access the ProfileModeContext.
 * Provides the current profile mode and functions to toggle or set it.
 * Must be used within a ProfileModeProvider.
 *
 * @returns {object} - An object containing:
 *   - mode: The current profile mode ("engineer" | "personal")
 *   - toggleMode: Function to toggle between modes
 *   - setMode: Function to explicitly set the mode
 *
 * */
export function useProfileMode() {
  const ctx = useContext(ProfileModeContext);
  if (!ctx) {
    throw new Error("useProfileMode must be used within ProfileModeProvider");
  }
  return ctx;
}
