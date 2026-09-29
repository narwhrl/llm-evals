import { useRef } from "react";

import Plate from "./components/Plate.jsx";
import Closure from "./chapters/Closure.jsx";
import Incoherence from "./chapters/Incoherence.jsx";
import Interference from "./chapters/Interference.jsx";
import Opening from "./chapters/Opening.jsx";
import { EngineContext } from "./core/engineContext.js";
import { createEngine } from "./core/engine.js";
import { useAppState } from "./core/store.js";

export default function App() {
  const state = useAppState();
  const engineRef = useRef(null);
  if (!engineRef.current) engineRef.current = createEngine();
  // 底片的高度跟着叙事走：熄灭时它占满下半屏，做选择时把屏幕让回给文字。
  const rig =
    state.phase === "dark"
      ? "dark"
      : state.phase === "third" || state.phase === "closing"
        ? "choose"
        : "rest";

  return (
    <EngineContext.Provider value={engineRef.current}>
      <a className="skip" href="#opening-title">
        跳到正文
      </a>

      <div className="shell" data-rig={rig}>
        <p className="sr-only" role="status" aria-live="polite">
          {state.announce}
        </p>

        <main className="deck">
          <Opening />
          <Interference />
          <Incoherence />
          <Closure />
        </main>
      </div>

      <Plate />
    </EngineContext.Provider>
  );
}
