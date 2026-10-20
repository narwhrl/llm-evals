import { useEffect, useRef } from "react";
import { Habitat } from "./scene/habitat";

/**
 * The page is only the picture. There is no interface on it: the module is
 * turned by dragging it, clicked to look at something, and the porthole is
 * dragged to move the orbit.
 */
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const habitatRef = useRef<Habitat | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const habitat = new Habitat({
      canvas,
      onReady: () => {
        document.documentElement.dataset.habitatReady = "true";
      },
    });
    habitatRef.current = habitat;
    document.documentElement.dataset.habitatReady = "true";

    const api = {
      get state() {
        return habitat.getState();
      },
      setPhase(phase: number) {
        habitat.setPhase(phase);
        return habitat.getState();
      },
      setFocus(name: string | null) {
        habitat.setFocus(name);
        return habitat.getState();
      },
      setFastForward(on: boolean) {
        habitat.setFastForward(on);
        return habitat.getState();
      },
      setNightCruise(on: boolean) {
        habitat.setNightCruise(on);
        return habitat.getState();
      },
      debugInfo() {
        return habitat.debugInfo();
      },
      project(point: [number, number, number]) {
        return habitat.project(point);
      },
      landmarks() {
        return habitat.landmarks();
      },
      setPlantLight(on: boolean) {
        habitat.setPlantLight(on);
        return habitat.getState();
      },
    };
    Object.defineProperty(window, "__HABITAT__", { value: api, configurable: true });

    return () => {
      delete (window as unknown as Record<string, unknown>).__HABITAT__;
      habitat.dispose();
      habitatRef.current = null;
    };
  }, []);

  return (
    <div className="stage">
      <canvas ref={canvasRef} className="stage__canvas" />
    </div>
  );
}
