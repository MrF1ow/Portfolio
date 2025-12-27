/* Package Imports */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* Local Imports */
import { ProfileModeProvider } from "@/context/ProfileModeContext.tsx";
import "@/styles/global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProfileModeProvider>
      <App />
    </ProfileModeProvider>
  </StrictMode>
);
