import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
if (!container) throw new Error("#root is missing");

// StrictMode is intentionally omitted: its development double-mount would
// create and tear down a second WebGL context on every hot reload.
createRoot(container).render(<App />);
