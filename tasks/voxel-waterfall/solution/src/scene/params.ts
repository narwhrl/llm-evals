export interface SceneParams {
  /** Grid resolution; the scene is `size x size` voxels. */
  size: number;
  /** Height of the main summit in voxels. */
  peakHeight: number;
  seed: number;
  ridgeSharpness: number;
  snowLine: number;
  treeLine: number;
  waterStreams: number;
  cloudCoverage: number;
  /** Cloud deck altitude as a fraction of the summit height. */
  cloudAltitude: number;
  vegetation: number;
  fogScale: number;
  skyIndex: number;
  shadows: boolean;
  autoRotate: boolean;
}

export const DEFAULT_PARAMS: SceneParams = {
  size: 224,
  peakHeight: 68,
  seed: 20260928,
  ridgeSharpness: 1.0,
  snowLine: 0.66,
  treeLine: 0.62,
  waterStreams: 3,
  cloudCoverage: 0.48,
  cloudAltitude: 0.44,
  vegetation: 1.0,
  fogScale: 1.0,
  skyIndex: 1,
  shadows: true,
  autoRotate: false,
};

export const WORLD_PRESETS = [
  { id: "panorama", label: "全景" },
  { id: "front", label: "正面" },
  { id: "waterfall", label: "瀑布" },
  { id: "aerial", label: "俯瞰" },
];
