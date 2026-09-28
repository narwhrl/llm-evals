import { useCallback, useEffect, useState } from "react";
import type { EngineMode } from "../ink/engine";

export type MotionChoice = "auto" | "live" | "still";

const QUERY = "(prefers-reduced-motion: reduce)";
const STORAGE_KEY = "ink.motion";

function readStored(): MotionChoice {
  const param = new URLSearchParams(window.location.search).get("motion");
  if (param === "off" || param === "still") return "still";
  if (param === "on" || param === "live") return "live";
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "live" || value === "still") return value;
  } catch {
    // 私密模式下拿不到 localStorage：按系统偏好走
  }
  return "auto";
}

export function useMotionPreference(): {
  mode: EngineMode;
  choice: MotionChoice;
  systemReduced: boolean;
  setChoice: (choice: MotionChoice) => void;
  toggle: () => void;
} {
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia(QUERY).matches);
  const [choice, setChoiceState] = useState<MotionChoice>(readStored);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (): void => setSystemReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setChoice = useCallback((next: MotionChoice) => {
    setChoiceState(next);
    try {
      if (next === "auto") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 记忆失败不影响这次呈现
    }
  }, []);

  const mode: EngineMode = choice === "auto" ? (systemReduced ? "still" : "live") : choice;
  const toggle = useCallback(() => setChoice(mode === "live" ? "still" : "live"), [mode, setChoice]);

  return { mode, choice, systemReduced, setChoice, toggle };
}
