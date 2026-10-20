import { isQualityLevel, QualityLevel } from "./quality";

/**
 * The URL capture contract.
 *
 *   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
 *
 * Every value is validated here. An illegal value is dropped rather than
 * thrown at the engine, so a bad link still renders a scene instead of a
 * black page.
 */
export interface UrlState {
  /** Freeze the simulation and the camera loop for a reproducible frame. */
  capture: boolean;
  quality: QualityLevel | null;
  preset: number | null;
  debug: number | null;
  /** Simulation time in seconds. */
  time: number | null;
  hud: boolean | null;
}

export function parseUrlState(search: string): UrlState {
  const params = new URLSearchParams(search);
  const state: UrlState = {
    capture: params.get("capture") === "1",
    quality: null,
    preset: null,
    debug: null,
    time: null,
    hud: null,
  };

  const quality = params.get("quality");
  if (quality !== null && isQualityLevel(quality)) state.quality = quality;

  const preset = params.get("preset");
  if (preset !== null && /^-?\d+$/.test(preset.trim())) {
    const value = Number.parseInt(preset, 10);
    if (Number.isInteger(value) && value >= 0 && value <= 3) state.preset = value;
  }

  const debug = params.get("debug");
  if (debug !== null && /^-?\d+$/.test(debug.trim())) {
    const value = Number.parseInt(debug, 10);
    if (Number.isInteger(value) && value >= 0 && value <= 9) state.debug = value;
  }

  const time = params.get("time");
  if (time !== null && time.trim() !== "") {
    const value = Number(time);
    if (Number.isFinite(value) && value >= 0) state.time = value;
  }

  const hud = params.get("hud");
  if (hud === "0") state.hud = false;
  else if (hud === "1") state.hud = true;

  return state;
}
