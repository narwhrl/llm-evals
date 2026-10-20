/**
 * Every knob the scene exposes.
 *
 * The list is deliberately explicit rather than generated: each entry carries
 * the range it is allowed to take, the value it resets to, and a one-line
 * description of what it is supposed to change in the picture. A control that
 * cannot be described here does not belong in the HUD.
 *
 * Ranges are in the units the shader uses. Radii are in Schwarzschild
 * radii: the event horizon sits at r = 1, the photon sphere at r = 1.5 and
 * the innermost stable circular orbit at r = 3.
 */

export type ParamGroup = "camera" | "disc" | "background" | "post" | "simulation";

export type ParamKey =
  | "fov"
  | "cameraDistance"
  | "cameraAzimuth"
  | "cameraElevation"
  | "timeScale"
  | "diskInnerRadius"
  | "diskOuterRadius"
  | "diskHalfThickness"
  | "diskTemperature"
  | "diskEmission"
  | "diskOpacity"
  | "orbitalSpeed"
  | "turbulenceAmplitude"
  | "turbulenceSpeed"
  | "turbulenceScale"
  | "starDensity"
  | "starBrightness"
  | "galaxyBrightness"
  | "bloomIntensity"
  | "bloomThreshold"
  | "exposure"
  | "vignette"
  | "filmGrain"
  | "dispersion";

export type ParamValues = Record<ParamKey, number>;

export interface ParamDef {
  key: ParamKey;
  label: string;
  group: ParamGroup;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
  /** What the control changes in the picture. Shown as the slider tooltip. */
  hint: string;
  /** Digits shown next to the slider. */
  precision?: number;
}

export const PARAM_DEFS: ParamDef[] = [
  {
    key: "fov",
    label: "Field of view",
    group: "camera",
    min: 12,
    max: 85,
    step: 0.5,
    default: 40,
    unit: "°",
    precision: 1,
    hint: "Vertical field of view of the observer ray bundle.",
  },
  {
    key: "cameraDistance",
    label: "Camera distance",
    group: "camera",
    min: 5,
    max: 70,
    step: 0.25,
    default: 26,
    unit: " rₛ",
    precision: 2,
    hint: "Observer radius. Farther away the shadow shrinks and the disc detail grows.",
  },
  {
    key: "cameraAzimuth",
    label: "Camera azimuth",
    group: "camera",
    min: -180,
    max: 180,
    step: 1,
    default: 0,
    unit: "°",
    precision: 0,
    hint: "Angle around the spin axis. Changes which side of the disc is approaching.",
  },
  {
    key: "cameraElevation",
    label: "Camera elevation",
    group: "camera",
    min: -88,
    max: 88,
    step: 0.5,
    default: 12,
    unit: "°",
    precision: 1,
    hint: "Height above the disc plane. 0° is edge-on, 90° looks straight down the axis.",
  },
  {
    key: "timeScale",
    label: "Time scale",
    group: "simulation",
    min: 0,
    max: 4,
    step: 0.05,
    default: 1,
    unit: "×",
    precision: 2,
    hint: "Rate of simulated time. 0 freezes the gas, the camera loop still runs.",
  },
  {
    key: "diskInnerRadius",
    label: "Disc inner radius",
    group: "disc",
    min: 1.6,
    max: 9,
    step: 0.05,
    default: 3,
    unit: " rₛ",
    precision: 2,
    hint: "Inner edge of the accretion disc. Below r = 3 no stable circular orbit exists.",
  },
  {
    key: "diskOuterRadius",
    label: "Disc outer radius",
    group: "disc",
    min: 6,
    max: 34,
    step: 0.25,
    default: 16,
    unit: " rₛ",
    precision: 2,
    hint: "Outer edge of the gas. Larger discs give the lensed halo more room.",
  },
  {
    key: "diskHalfThickness",
    label: "Disc half-thickness",
    group: "disc",
    min: 0.02,
    max: 1.2,
    step: 0.01,
    default: 0.12,
    unit: " rₛ",
    precision: 2,
    hint: "Vertical scale height of the gas at the inner edge; it flares outward.",
  },
  {
    key: "diskTemperature",
    label: "Disc temperature",
    group: "disc",
    min: 1800,
    max: 24000,
    step: 50,
    default: 7600,
    unit: " K",
    precision: 0,
    hint: "Peak blackbody temperature of the innermost gas.",
  },
  {
    key: "diskEmission",
    label: "Disc emission",
    group: "disc",
    min: 0,
    max: 8,
    step: 0.05,
    default: 1.1,
    precision: 2,
    hint: "Overall brightness of the gas before relativistic boosting.",
  },
  {
    key: "diskOpacity",
    label: "Disc opacity",
    group: "disc",
    min: 0.05,
    max: 2.5,
    step: 0.05,
    default: 0.9,
    precision: 2,
    hint: "Optical depth of the gas. Low values let the lensed far side show through.",
  },
  {
    key: "orbitalSpeed",
    label: "Orbital speed",
    group: "disc",
    min: 0,
    max: 3,
    step: 0.02,
    default: 1,
    unit: "×",
    precision: 2,
    hint: "Multiplies the Keplerian rate: gas rotation, pattern shear and Doppler shift.",
  },
  {
    key: "turbulenceAmplitude",
    label: "Turbulence amplitude",
    group: "disc",
    min: 0,
    max: 1.5,
    step: 0.02,
    default: 0.7,
    precision: 2,
    hint: "How strongly the procedural noise modulates the gas density.",
  },
  {
    key: "turbulenceSpeed",
    label: "Turbulence speed",
    group: "disc",
    min: 0,
    max: 4,
    step: 0.05,
    default: 1,
    unit: "×",
    precision: 2,
    hint: "Rate at which the noise field itself churns.",
  },
  {
    key: "turbulenceScale",
    label: "Turbulence scale",
    group: "disc",
    min: 0.4,
    max: 9,
    step: 0.1,
    default: 2.4,
    precision: 1,
    hint: "Size of the eddies. High values break the gas into fine filaments.",
  },
  {
    key: "starDensity",
    label: "Star density",
    group: "background",
    min: 0,
    max: 3,
    step: 0.05,
    default: 1,
    unit: "×",
    precision: 2,
    hint: "Number of background stars per unit of sky. They are lensed with everything else.",
  },
  {
    key: "starBrightness",
    label: "Star brightness",
    group: "background",
    min: 0,
    max: 4,
    step: 0.05,
    default: 1.2,
    precision: 2,
    hint: "Luminosity of the background stars.",
  },
  {
    key: "galaxyBrightness",
    label: "Galaxy brightness",
    group: "background",
    min: 0,
    max: 4,
    step: 0.05,
    default: 0.3,
    precision: 2,
    hint: "Luminosity of the procedural galactic band behind the hole.",
  },
  {
    key: "bloomIntensity",
    label: "Bloom intensity",
    group: "post",
    min: 0,
    max: 3,
    step: 0.05,
    default: 0.5,
    precision: 2,
    hint: "How much of the bright-pass energy is added back into the frame.",
  },
  {
    key: "bloomThreshold",
    label: "Bloom threshold",
    group: "post",
    min: 0,
    max: 4,
    step: 0.05,
    default: 1.6,
    precision: 2,
    hint: "Luminance above which a pixel starts to bleed light into its neighbours.",
  },
  {
    key: "exposure",
    label: "Exposure",
    group: "post",
    min: 0.05,
    max: 5,
    step: 0.05,
    default: 0.85,
    precision: 2,
    hint: "Gain applied to the HDR frame before the tone curve.",
  },
  {
    key: "vignette",
    label: "Vignette",
    group: "post",
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.28,
    precision: 2,
    hint: "Corner falloff. Kept low so it never hides the photon ring.",
  },
  {
    key: "filmGrain",
    label: "Film grain",
    group: "post",
    min: 0,
    max: 0.2,
    step: 0.002,
    default: 0.035,
    precision: 3,
    hint: "Sensor noise laid over the finished frame.",
  },
  {
    key: "dispersion",
    label: "Chromatic dispersion",
    group: "post",
    min: 0,
    max: 2.5,
    step: 0.05,
    default: 0.3,
    precision: 2,
    hint: "Radial colour fringing from the lens, strongest at the frame edge.",
  },
];

export const PARAM_BY_KEY: Record<ParamKey, ParamDef> = Object.fromEntries(
  PARAM_DEFS.map((def) => [def.key, def]),
) as Record<ParamKey, ParamDef>;

export const GROUP_LABELS: Record<ParamGroup, string> = {
  camera: "Camera",
  disc: "Accretion disc",
  background: "Background sky",
  post: "Post-processing",
  simulation: "Simulation",
};

export const GROUP_ORDER: ParamGroup[] = ["camera", "disc", "background", "post", "simulation"];

export function defaultParamValues(): ParamValues {
  const values = {} as ParamValues;
  for (const def of PARAM_DEFS) values[def.key] = def.default;
  return values;
}

export function clampParam(key: ParamKey, value: number): number {
  const def = PARAM_BY_KEY[key];
  if (!Number.isFinite(value)) return def.default;
  return Math.min(def.max, Math.max(def.min, value));
}

/** Rounds to the slider step so the stored value and the widget agree. */
export function quantiseParam(key: ParamKey, value: number): number {
  const def = PARAM_BY_KEY[key];
  const clamped = clampParam(key, value);
  const steps = Math.round((clamped - def.min) / def.step);
  const snapped = def.min + steps * def.step;
  return Math.min(def.max, Math.max(def.min, Number(snapped.toFixed(6))));
}

export function formatParam(key: ParamKey, value: number): string {
  const def = PARAM_BY_KEY[key];
  const precision = def.precision ?? 2;
  return `${value.toFixed(precision)}${def.unit ?? ""}`;
}
