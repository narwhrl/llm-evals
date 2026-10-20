/**
 * The ten debug views.
 *
 * View 0 is the finished picture. Views 1-9 replace the final composite with a
 * diagnostic that is computed from the same integration the picture uses, so
 * what the view shows is what the shader actually did for that pixel.
 */
export interface DebugView {
  id: number;
  name: string;
  description: string;
  /** True when the view must bypass the tone curve and the bloom. */
  raw: boolean;
}

export const DEBUG_VIEWS: DebugView[] = [
  {
    id: 0,
    name: "Final composite",
    description: "HDR frame with bloom, ACES tone mapping, dispersion, vignette and grain.",
    raw: false,
  },
  {
    id: 1,
    name: "Ray termination",
    description:
      "Why the ray stopped: blue escaped to the sky, red fell through the horizon, amber ran out of steps.",
    raw: true,
  },
  {
    id: 2,
    name: "Horizon & capture boundary",
    description:
      "Event horizon mask. Black is inside r = 1, the magenta ring is the critical capture boundary b = 3√3 M.",
    raw: true,
  },
  {
    id: 3,
    name: "Disc crossing order",
    description:
      "How many times the bent ray cut the disc plane and in what order. One crossing is green, two yellow, three orange, four or more red.",
    raw: true,
  },
  {
    id: 4,
    name: "First crossing radius",
    description:
      "Radius of the first disc crossing, mapped from 0 (red) to the outer edge (blue).",
    raw: true,
  },
  {
    id: 5,
    name: "Gravitational redshift",
    description:
      "Redshift factor √(1 − 2M/r) at the first disc crossing. White is unshifted, red is deeply redshifted.",
    raw: true,
  },
  {
    id: 6,
    name: "Doppler factor",
    description:
      "Relativistic beaming factor at the first crossing. Blue approaches the observer, red recedes.",
    raw: true,
  },
  {
    id: 7,
    name: "Lensed sky coordinates",
    description:
      "Where the escaped ray points at infinity, as a red/green spherical chart. The pinch around the shadow is the lensing.",
    raw: true,
  },
  {
    id: 8,
    name: "Stars & galaxy only",
    description: "The procedural sky with the disc removed, lensed by the same geodesics.",
    raw: true,
  },
  {
    id: 9,
    name: "HDR before tone mapping",
    description:
      "Logarithmic false colour of the linear radiance before the tone curve. White means clipped.",
    raw: true,
  },
];

export const DEFAULT_DEBUG = 0;

export function debugViewById(id: number): DebugView | null {
  return DEBUG_VIEWS.find((view) => view.id === id) ?? null;
}

export function isValidDebugId(id: number): boolean {
  return Number.isInteger(id) && id >= 0 && id <= 9;
}
