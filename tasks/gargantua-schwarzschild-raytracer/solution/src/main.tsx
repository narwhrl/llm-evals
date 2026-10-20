import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
if (!container) throw new Error("missing #root");

// No StrictMode: the double mount it performs in development would create a
// second WebGL context for the same canvas and hand the dead one back.
createRoot(container).render(<App />);
