import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/scenes.css";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("缺少 #root 挂载点");

// 这是一条连续时间线：每次打开都从纸的开头读起，
// 否则浏览器会在读到最后一行的人身上把终章直接放掉。
if ("scrollRestoration" in history) history.scrollRestoration = "manual";

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
