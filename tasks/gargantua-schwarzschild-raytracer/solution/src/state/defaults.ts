// Parameter schema and factory defaults for every tunable control.
// Exactly the 21 controls required by the task, grouped for the HUD.

export type ParamKey =
  | "fov"
  | "camDist"
  | "camAzimuth"
  | "camPitch"
  | "timeScale"
  | "diskInner"
  | "diskOuter"
  | "diskThickness"
  | "diskTemp"
  | "diskIntensity"
  | "orbitSpeed"
  | "turbAmp"
  | "turbSpeed"
  | "starDensity"
  | "galaxyBrightness"
  | "bloomIntensity"
  | "bloomThreshold"
  | "exposure"
  | "vignette"
  | "grain"
  | "dispersion";

export interface ParamDef {
  key: ParamKey;
  label: string;
  min: number;
  max: number;
  step: number;
  def: number;
  group: "camera" | "disk" | "background" | "post";
  fmt?: (v: number) => string;
}

const deg = (v: number) => `${v.toFixed(0)}°`;
const fixed = (digits: number) => (v: number) => v.toFixed(digits);

export const PARAM_DEFS: ParamDef[] = [
  { key: "fov", label: "视场角 FOV", min: 20, max: 100, step: 1, def: 55, group: "camera", fmt: deg },
  { key: "camDist", label: "相机距离 (r_s)", min: 3, max: 40, step: 0.1, def: 14, group: "camera", fmt: fixed(1) },
  { key: "camAzimuth", label: "相机方位角", min: -180, max: 180, step: 1, def: 35, group: "camera", fmt: deg },
  { key: "camPitch", label: "相机俯仰角", min: -85, max: 85, step: 1, def: 7, group: "camera", fmt: deg },
  { key: "timeScale", label: "时间倍率", min: 0, max: 8, step: 0.1, def: 1, group: "camera", fmt: fixed(1) },
  { key: "diskInner", label: "盘内半径 (r_s)", min: 1.6, max: 8, step: 0.05, def: 2.9, group: "disk", fmt: fixed(2) },
  { key: "diskOuter", label: "盘外半径 (r_s)", min: 6, max: 24, step: 0.25, def: 11.5, group: "disk", fmt: fixed(2) },
  { key: "diskThickness", label: "盘半厚度 (r_s)", min: 0.01, max: 0.6, step: 0.01, def: 0.16, group: "disk", fmt: fixed(2) },
  { key: "diskTemp", label: "盘温度 (K)", min: 2000, max: 12000, step: 100, def: 6200, group: "disk", fmt: (v) => v.toFixed(0) },
  { key: "diskIntensity", label: "盘发射强度", min: 0, max: 4, step: 0.05, def: 1.35, group: "disk", fmt: fixed(2) },
  { key: "orbitSpeed", label: "轨道速度倍率", min: 0, max: 4, step: 0.05, def: 1, group: "disk", fmt: fixed(2) },
  { key: "turbAmp", label: "湍流幅度", min: 0, max: 1, step: 0.01, def: 0.65, group: "disk", fmt: fixed(2) },
  { key: "turbSpeed", label: "湍流速度", min: 0, max: 4, step: 0.05, def: 1, group: "disk", fmt: fixed(2) },
  { key: "starDensity", label: "恒星密度", min: 0, max: 1, step: 0.01, def: 0.5, group: "background", fmt: fixed(2) },
  { key: "galaxyBrightness", label: "银河亮度", min: 0, max: 2.5, step: 0.05, def: 0.9, group: "background", fmt: fixed(2) },
  { key: "bloomIntensity", label: "Bloom 强度", min: 0, max: 2.5, step: 0.05, def: 0.8, group: "post", fmt: fixed(2) },
  { key: "bloomThreshold", label: "Bloom 阈值", min: 0, max: 4, step: 0.05, def: 1, group: "post", fmt: fixed(2) },
  { key: "exposure", label: "曝光度", min: 0.1, max: 3, step: 0.05, def: 1.15, group: "post", fmt: fixed(2) },
  { key: "vignette", label: "暗角强度", min: 0, max: 1, step: 0.01, def: 0.45, group: "post", fmt: fixed(2) },
  { key: "grain", label: "胶片颗粒强度", min: 0, max: 1, step: 0.01, def: 0.35, group: "post", fmt: fixed(2) },
  { key: "dispersion", label: "色散强度", min: 0, max: 1, step: 0.01, def: 0.5, group: "post", fmt: fixed(2) },
];

export type Params = Record<ParamKey, number>;

export function defaultParams(): Params {
  const out = {} as Params;
  for (const d of PARAM_DEFS) out[d.key] = d.def;
  return out;
}

export function clampParam(key: ParamKey, value: unknown): number {
  const def = PARAM_DEFS.find((d) => d.key === key)!;
  const v = typeof value === "number" && Number.isFinite(value) ? value : def.def;
  return Math.min(def.max, Math.max(def.min, v));
}

// ---------------------------------------------------------------------------
// Quality tiers — each tier changes the real per-frame rendering budget:
// internal render scale (× devicePixelRatio cap), maximum geodesic integration
// steps per pixel, and the number of bloom pyramid levels.
export type Quality = "standard" | "high" | "cinematic";
export const QUALITIES: Quality[] = ["standard", "high", "cinematic"];

export interface QualityBudget {
  renderScale: number;
  dprCap: number;
  maxSteps: number;
  bloomLevels: number;
}

export const QUALITY_BUDGETS: Record<Quality, QualityBudget> = {
  standard: { renderScale: 0.66, dprCap: 1, maxSteps: 176, bloomLevels: 3 },
  high: { renderScale: 0.85, dprCap: 1.5, maxSteps: 300, bloomLevels: 4 },
  cinematic: { renderScale: 1.0, dprCap: 2, maxSteps: 448, bloomLevels: 6 },
};

// ---------------------------------------------------------------------------
// Camera presets — four visually distinct framings (Shift+1 … Shift+4).
export interface PresetDef {
  name: string;
  distance: number;
  azimuth: number;
  pitch: number;
  fov: number;
}

export const PRESETS: PresetDef[] = [
  { name: "远景全景 Overlook", distance: 17, azimuth: 55, pitch: 8, fov: 52 },
  { name: "电影位 Cinematic", distance: 10.5, azimuth: 15, pitch: 5, fov: 62 },
  { name: "光子环 Photon Ring", distance: 5.2, azimuth: 0, pitch: 2, fov: 70 },
  { name: "俯瞰极轨 Polar", distance: 13, azimuth: 100, pitch: 52, fov: 58 },
];

// ---------------------------------------------------------------------------
// Debug views (keys 0–9). Index 0 is the final composite.
export const DEBUG_VIEWS: string[] = [
  "最终合成 Final composite",
  "射线步进/终止 Ray steps & termination",
  "事件视界掩码 Event horizon mask",
  "盘面交点及阶次 Disk crossings & order",
  "红移/Doppler Redshift / Doppler",
  "背景透镜坐标 Lens mapping coords",
  "星空/银河 Starfield & galaxy",
  "后处理前 HDR Pre-post HDR",
  "最近邻近距离 Closest approach r_min",
  "偏折角 Deflection angle",
];
