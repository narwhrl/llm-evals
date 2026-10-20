import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { GargantuaEngine, EngineStats } from "./scene/engine";
import { Hud } from "./ui/Hud";
import { ParamKey, clampParam, quantiseParam } from "./config/params";
import { applyPreset } from "./config/presets";
import { isQualityLevel, nextQuality, QualityLevel } from "./config/quality";
import {
  defaultSettings,
  hasStoredSettings,
  loadSettings,
  saveSettings,
  Settings,
} from "./config/settings";
import { parseUrlState, UrlState } from "./config/urlState";

/**
 * The URL wins over the stored settings, and it wins before the first frame
 * is drawn, which is the whole point of the capture contract: the picture a
 * screenshot tool takes is the picture the parameters describe.
 */
function readInitialState(): { settings: Settings; url: UrlState } {
  const url = parseUrlState(window.location.search);
  let settings = loadSettings();
  if (url.quality) settings = { ...settings, quality: url.quality };
  if (url.debug !== null) settings = { ...settings, debug: url.debug };
  if (url.hud !== null) {
    settings = { ...settings, hudOpen: url.hud };
  } else if (!hasStoredSettings() && isNarrowScreen()) {
    // A phone has no room for the parameter column and the picture at the
    // same time, so the panel starts folded away and the user opens it.
    settings = { ...settings, hudOpen: false };
  }
  if (url.preset !== null) {
    settings = {
      ...settings,
      preset: url.preset,
      params: applyPreset(settings.params, url.preset),
    };
  }
  return { settings, url };
}

function isNarrowScreen(): boolean {
  return typeof window.matchMedia === "function"
    ? window.matchMedia("(max-width: 900px)").matches
    : false;
}

export default function App() {
  const initial = useMemo(readInitialState, []);
  const [settings, setSettings] = useState<Settings>(initial.settings);
  const [stats, setStats] = useState<EngineStats | null>(null);
  const [contextLost, setContextLost] = useState(false);

  const settingsRef = useRef(settings);
  const engineRef = useRef<GargantuaEngine | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const readyRef = useRef(false);

  const update = useCallback((updater: (current: Settings) => Settings): Settings => {
    const next = updater(settingsRef.current);
    settingsRef.current = next;
    setSettings(next);
    return next;
  }, []);

  /* --- the engine ---------------------------------------------------------- */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new GargantuaEngine(canvas, {
      onStats: (value) => setStats(value),
      onContextLost: () => setContextLost(true),
      onContextRestored: () => setContextLost(false),
      onCameraChange: (camera) => {
        // The user dragged, scrolled or pinched: the sliders follow the
        // camera so the two never disagree about where the observer is.
        update((current) => ({
          ...current,
          params: {
            ...current.params,
            fov: clampParam("fov", camera.fov),
            cameraDistance: clampParam("cameraDistance", camera.distance),
            cameraAzimuth: clampParam("cameraAzimuth", camera.azimuth),
            cameraElevation: clampParam("cameraElevation", camera.elevation),
          },
        }));
      },
      onFirstFrame: () => {
        readyRef.current = true;
        document.documentElement.dataset.gargantuaReady = "true";
      },
    });
    engineRef.current = engine;
    engine.applySettings(settingsRef.current);

    if (initial.url.capture) {
      engine.setCaptureMode(true);
      engine.setTime(initial.url.time ?? 0);
    } else if (initial.url.time !== null) {
      engine.setTime(initial.url.time);
    }

    const parent = canvas.parentElement;
    const observer = parent
      ? new ResizeObserver(() => engine.resize())
      : null;
    observer?.observe(parent as HTMLElement);

    return () => {
      observer?.disconnect();
      engine.dispose();
      engineRef.current = null;
    };
  }, [initial, update]);

  /* --- push the settings into the renderer --------------------------------- */

  useEffect(() => {
    engineRef.current?.applySettings(settings);
  }, [settings]);

  /* --- persistence --------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setTimeout(() => saveSettings(settings), 350);
    return () => window.clearTimeout(timer);
  }, [settings]);

  /* --- actions ------------------------------------------------------------- */

  const setParam = useCallback(
    (key: ParamKey, value: number) => {
      update((current) => ({
        ...current,
        params: { ...current.params, [key]: quantiseParam(key, value) },
      }));
    },
    [update],
  );

  const resetParam = useCallback(
    (key: ParamKey) => {
      update((current) => ({
        ...current,
        params: { ...current.params, [key]: defaultSettings().params[key] },
      }));
    },
    [update],
  );

  const resetAll = useCallback(() => {
    update(() => defaultSettings());
  }, [update]);

  const setPreset = useCallback(
    (index: number) => {
      update((current) => ({
        ...current,
        preset: index,
        params: applyPreset(current.params, index),
      }));
    },
    [update],
  );

  const setQuality = useCallback(
    (level: QualityLevel) => {
      update((current) => ({ ...current, quality: level }));
    },
    [update],
  );

  const setDebug = useCallback(
    (index: number) => {
      update((current) => ({ ...current, debug: index }));
    },
    [update],
  );

  const toggleHud = useCallback(() => {
    update((current) => ({ ...current, hudOpen: !current.hudOpen }));
  }, [update]);

  const toggleCinematic = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.setCinematic(!engine.isCinematic());
    update((current) => ({ ...current }));
  }, [update]);

  /* --- keyboard ------------------------------------------------------------ */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (event.shiftKey && /^Digit[1-4]$/.test(event.code)) {
        setPreset(Number(event.code.slice(5)) - 1);
        event.preventDefault();
        return;
      }
      if (!event.shiftKey && /^Digit[0-9]$/.test(event.code)) {
        setDebug(Number(event.code.slice(5)));
        event.preventDefault();
        return;
      }

      switch (event.code) {
        case "Space":
          toggleCinematic();
          event.preventDefault();
          break;
        case "KeyH":
          toggleHud();
          break;
        case "KeyR":
          resetAll();
          break;
        case "KeyQ":
          setQuality(nextQuality(settingsRef.current.quality));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetAll, setDebug, setPreset, setQuality, toggleCinematic, toggleHud]);

  /* --- the scripting surface ---------------------------------------------- */

  useEffect(() => {
    const api = {
      get ready(): boolean {
        return readyRef.current;
      },
      getState() {
        const current = settingsRef.current;
        return {
          ready: readyRef.current,
          quality: current.quality,
          preset: current.preset,
          debug: current.debug,
          hudOpen: current.hudOpen,
          params: { ...current.params },
          time: engineRef.current?.getTime() ?? 0,
        };
      },
      setQuality(level: unknown) {
        if (!isQualityLevel(level)) return null;
        return update((current) => ({ ...current, quality: level }));
      },
      setPreset(index: unknown) {
        if (typeof index !== "number" || !Number.isInteger(index) || index < 0 || index > 3) {
          return null;
        }
        return update((current) => ({
          ...current,
          preset: index,
          params: applyPreset(current.params, index),
        }));
      },
      setDebug(index: unknown) {
        if (typeof index !== "number" || !Number.isInteger(index) || index < 0 || index > 9) {
          return null;
        }
        return update((current) => ({ ...current, debug: index }));
      },
      setTime(seconds: unknown) {
        if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) {
          return null;
        }
        engineRef.current?.setTime(seconds);
        return {
          ...settingsRef.current,
          time: seconds,
        };
      },
    };

    Object.defineProperty(window, "__GARGANTUA__", {
      value: api,
      writable: false,
      configurable: true,
    });

    return () => {
      delete (window as unknown as Record<string, unknown>).__GARGANTUA__;
    };
  }, [update]);

  const cinematic = stats?.cinematic ?? true;

  return (
    <div className="app">
      <div className="app__stage">
        <canvas ref={canvasRef} className="app__canvas" />
      </div>
      <Hud
        open={settings.hudOpen}
        values={settings.params}
        debug={settings.debug}
        quality={settings.quality}
        preset={settings.preset}
        stats={stats}
        cinematic={cinematic}
        captureMode={initial.url.capture}
        contextLost={contextLost}
        onToggle={toggleHud}
        onParamChange={setParam}
        onResetParam={resetParam}
        onResetAll={resetAll}
        onPreset={setPreset}
        onQuality={setQuality}
        onDebug={setDebug}
        onCinematic={toggleCinematic}
      />
    </div>
  );
}
