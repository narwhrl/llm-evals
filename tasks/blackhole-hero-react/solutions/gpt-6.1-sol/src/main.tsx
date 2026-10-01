import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BlackHoleHeroSectionDemo from "./demo";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <BlackHoleHeroSectionDemo />
    </main>
  </StrictMode>,
);
