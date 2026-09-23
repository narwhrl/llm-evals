import { useEffect, useRef, useState } from "react";
import { Engine, type EngineStatus } from "./engine/Engine";
import { Ambience } from "./engine/audio";
import { applyCaptureToEngine, bindEngine, getBootCapture, notifyReady } from "./engine/api";
import { installShortcuts } from "./engine/shortcuts";
import { store } from "./state/store";
import { Hud } from "./ui/Hud";
import "./ui/hud.css";

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<EngineStatus>("ok");
  const [fps, setFps] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new Engine(canvas, {
      onStatus: (s, f) => {
        setStatus(s);
        setFps(f);
      },
      onFirstFrame: () => {
        setReady(true);
        notifyReady();
      },
    });
    bindEngine(engine);
    applyCaptureToEngine(engine, getBootCapture());
    engine.start();

    const detachShortcuts = installShortcuts();
    const ambience = new Ambience();

    let prevQuality = store.getSnapshot().quality;
    let prevAudio = store.getSnapshot().audio;
    const unsub = store.subscribe(() => {
      const s = store.getSnapshot();
      if (s.quality !== prevQuality) {
        prevQuality = s.quality;
        engine.forceRebuild(); // rebuild the render-target pyramid
      }
      if (s.audio !== prevAudio) {
        prevAudio = s.audio;
        ambience.setEnabled(s.audio);
      }
    });

    // If audio was persisted as "on", start it from the first user gesture
    // (AudioContext construction without a gesture is either muted or warns).
    let gestureStarter: (() => void) | null = null;
    if (store.getSnapshot().audio) {
      gestureStarter = () => ambience.setEnabled(true);
      window.addEventListener("pointerdown", gestureStarter, { once: true });
      window.addEventListener("keydown", gestureStarter, { once: true });
    }

    return () => {
      unsub();
      detachShortcuts();
      if (gestureStarter) {
        window.removeEventListener("pointerdown", gestureStarter);
        window.removeEventListener("keydown", gestureStarter);
      }
      ambience.setEnabled(false);
      engine.dispose();
    };
  }, []);

  return (
    <div className="stage">
      <canvas ref={canvasRef} aria-label="Gargantua black hole viewport" />
      {status === "context-lost" ? (
        <div className="overlay">
          <div className="overlay-card">
            <strong>WebGL 上下文丢失</strong>
            <br />
            已暂停渲染，等待设备恢复上下文后自动重建并继续……
          </div>
        </div>
      ) : status === "webgl-unsupported" ? (
        <div className="overlay">
          <div className="overlay-card">
            <strong>当前浏览器不支持 WebGL2</strong>
            <br />
            请使用支持 WebGL2 的现代浏览器打开本页面。
          </div>
        </div>
      ) : !ready ? (
        <div className="overlay">
          <div className="overlay-card">正在编译测地线着色器……</div>
        </div>
      ) : null}
      <Hud status={status} fps={fps} />
    </div>
  );
}
