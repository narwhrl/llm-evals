import * as THREE from "three";

export const P = {
  ivory: "#f0e9d6",
  ivoryDark: "#ded3b8",
  gold: "#d9ab4a",
  goldBright: "#f0c86e",
  stone: "#968a78",
  stoneDark: "#6b6055",
  cliff: "#7d6f5e",
  grass: "#7cba5f",
  grassDeep: "#57994b",
  teal: "#4e9d94",
  window: "#2f4a56",
  trunk: "#6e5642",
  leafA: "#5ea563",
  leafB: "#7fbf6e",
  leafTeal: "#4fa08c",
  cloud: "#f6f8fb",
  waterfall: "#cfeeff",
  shaft: "#ffe9b8",
} as const;

function lambert(
  color: string,
  opts: { emissive?: string; ei?: number; transparent?: boolean; opacity?: number } = {},
) {
  return new THREE.MeshLambertMaterial({
    color,
    emissive: opts.emissive ?? "#000000",
    emissiveIntensity: opts.ei ?? 0,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    flatShading: true,
  });
}

export function makeMaterials() {
  return {
    ivory: lambert(P.ivory),
    ivoryDark: lambert(P.ivoryDark),
    gold: lambert(P.gold, { emissive: P.gold, ei: 0.35 }),
    goldBright: lambert(P.goldBright, { emissive: P.goldBright, ei: 0.55 }),
    stone: lambert(P.stone),
    stoneDark: lambert(P.stoneDark),
    cliff: lambert(P.cliff),
    grass: lambert(P.grass),
    teal: lambert(P.teal),
    window: lambert(P.window, { emissive: "#9fd8e8", ei: 0.28 }),
    trunk: lambert(P.trunk),
    leafA: lambert(P.leafA),
    leafB: lambert(P.leafB),
    leafTeal: lambert(P.leafTeal),
    cloud: lambert(P.cloud),
    water: lambert(P.waterfall, { transparent: true, opacity: 0.68, emissive: "#bfe6ff", ei: 0.25 }),
    tealGlow: lambert(P.teal, { emissive: "#7fe0d0", ei: 0.9 }),
  };
}

export type Mats = ReturnType<typeof makeMaterials>;
