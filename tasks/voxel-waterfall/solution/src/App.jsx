import { useEffect, useMemo, useRef, useState } from "react";
import { VoxelWaterfallScene } from "./scene/sceneManager.js";
import { ControlPanel } from "./ui/ControlPanel.jsx";
import { DEFAULTS } from "./options.js";

// Visitors who ask the OS for reduced motion still get the full scene; only the
// continuous camera orbit and cloud drift start disabled, and both stay toggleable.
const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const INITIAL_OPTS = prefersReducedMotion
  ? { ...DEFAULTS, autoRotate: false, cloudSpeed: 0 }
  : DEFAULTS;

export default function App() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [opts, setOpts] = useState(INITIAL_OPTS);

  useEffect(() => {
    const scene = new VoxelWaterfallScene(mountRef.current);
    sceneRef.current = scene;
    scene.setOptions(opts);
    scene.start();
    if (import.meta.env.DEV) window.__scene = scene;
    return () => scene.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sceneRef.current?.setOptions(opts);
  }, [opts]);

  const set = useMemo(
    () => (key, value) => setOpts((prev) => ({ ...prev, [key]: value })),
    []
  );
  const patch = (partial) => setOpts((prev) => ({ ...prev, ...partial }));
  const randomizeSeed = () => set("seed", Math.floor(Math.random() * 100000));

  return (
    <div className="app-root">
      <div ref={mountRef} className="canvas-mount" />
      <ControlPanel opts={opts} set={set} patch={patch} onRandomize={randomizeSeed} />
      <div className="hint">拖动旋转 · 滚轮缩放 · 右键平移</div>
    </div>
  );
}
