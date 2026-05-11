import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import Prototype from "./Prototype.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>
);
