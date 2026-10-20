/**
 * Three quality tiers that really cost different amounts of work.
 *
 * The geodesic pass is the whole cost of this project, so the tiers move the
 * three numbers that matter: how many integration steps a ray may take, what
 * fraction of the canvas the pass is rendered at, and how many octaves the
 * gas noise is summed over. Bloom depth and the device pixel ratio cap come
 * with them.
 */
export type QualityLevel = "standard" | "high" | "cinematic";

export interface QualityProfile {
  id: QualityLevel;
  label: string;
  description: string;
  /** Fraction of the CSS canvas used by the geodesic + bloom passes. */
  resolutionScale: number;
  /** Hard cap on integration steps per ray. */
  maxSteps: number;
  /** Cap on devicePixelRatio for the final composite. */
  dprCap: number;
  /** Number of mip levels in the bloom pyramid. */
  bloomLevels: number;
  /** Octaves of value noise summed for the gas turbulence. */
  noiseOctaves: number;
}

export const QUALITY_PROFILES: QualityProfile[] = [
  {
    id: "standard",
    label: "Standard",
    description: "Half resolution, 220 steps per ray. Runs on a laptop and on a phone.",
    resolutionScale: 0.5,
    maxSteps: 220,
    dprCap: 1,
    bloomLevels: 3,
    noiseOctaves: 3,
  },
  {
    id: "high",
    label: "High",
    description: "72% resolution, 380 steps. The default: sharp photon ring, no banding.",
    resolutionScale: 0.72,
    maxSteps: 380,
    dprCap: 1.5,
    bloomLevels: 4,
    noiseOctaves: 4,
  },
  {
    id: "cinematic",
    label: "Cinematic",
    description: "Full resolution, 600 steps, five bloom levels. Slow on purpose.",
    resolutionScale: 1,
    maxSteps: 600,
    dprCap: 2,
    bloomLevels: 5,
    noiseOctaves: 5,
  },
];

export const DEFAULT_QUALITY: QualityLevel = "high";

export function qualityProfile(level: QualityLevel): QualityProfile {
  return (
    QUALITY_PROFILES.find((profile) => profile.id === level) ??
    QUALITY_PROFILES.find((profile) => profile.id === DEFAULT_QUALITY)!
  );
}

export function isQualityLevel(value: unknown): value is QualityLevel {
  return value === "standard" || value === "high" || value === "cinematic";
}

export function nextQuality(level: QualityLevel): QualityLevel {
  const index = QUALITY_PROFILES.findIndex((profile) => profile.id === level);
  return QUALITY_PROFILES[(index + 1) % QUALITY_PROFILES.length].id;
}
