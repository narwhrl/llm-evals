import type { ParamKey, ParamValues } from "./params";

/**
 * Four framings that look nothing like each other.
 *
 * Every preset only moves the observer. The disc and the sky stay as they
 * are, so switching a preset changes the geometry of the image — the angle of
 * the disc, the size of the shadow, how much of the halo is in frame — and
 * not the subject.
 */
export interface Preset {
  id: number;
  name: string;
  subtitle: string;
  camera: Partial<Record<ParamKey, number>>;
}

export const PRESETS: Preset[] = [
  {
    id: 0,
    name: "Iconic",
    subtitle: "Just above the plane — the far side arches over the shadow.",
    camera: { fov: 40, cameraDistance: 26, cameraAzimuth: 0, cameraElevation: 12 },
  },
  {
    id: 1,
    name: "Polar",
    subtitle: "Down the spin axis — the disc reads as a lensed ring.",
    camera: { fov: 46, cameraDistance: 26, cameraAzimuth: 34, cameraElevation: 76 },
  },
  {
    id: 2,
    name: "Edge-on",
    subtitle: "Inside the disc plane — halo above and halo below.",
    camera: { fov: 44, cameraDistance: 24, cameraAzimuth: -58, cameraElevation: 1.5 },
  },
  {
    id: 3,
    name: "Skimming",
    subtitle: "Close and wide, from below the plane — the horizon fills the frame.",
    camera: { fov: 68, cameraDistance: 11, cameraAzimuth: 128, cameraElevation: -24 },
  },
];

export const DEFAULT_PRESET = 0;

export function presetById(id: number): Preset | null {
  return PRESETS.find((preset) => preset.id === id) ?? null;
}

export function applyPreset(values: ParamValues, id: number): ParamValues {
  const preset = presetById(id);
  if (!preset) return values;
  const next = { ...values };
  for (const [key, value] of Object.entries(preset.camera)) {
    if (value !== undefined) next[key as ParamKey] = value;
  }
  return next;
}
