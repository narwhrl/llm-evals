import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyCaptureToStore, installGlobalApi, parseCaptureQuery, setBootCapture } from "./engine/api";

// URL capture state must be applied before the first rendered frame.
const capture = parseCaptureQuery(window.location.search);
setBootCapture(capture);
applyCaptureToStore(capture);
installGlobalApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
