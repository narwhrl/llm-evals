export const DEFAULT_OPTIONS = {
  seed: 20260827,
  heightScale: 1.0,      // mountain amplitude
  noiseScale: 1.0,       // terrain detail frequency
  snowLine: 44,
  waterfall: true,
  flowSpeed: 1.0,
  fallHeight: 14,        // amplified cliff drop (voxels)
  channelWidth: 2,
  cloudCoverage: 0.35,
  cloudHeight: 27,       // cloud band altitude (peaks above pierce it)
  cloudDrift: 1.0,
  cloudOpacity: 0.8,
  treeDensity: 160,
  timeOfDay: 0.16,       // 0 dawn — 0.5 noon — 1 dusk
  autoRotate: true,
};

export function randomSeed() {
  return 1 + Math.floor(Math.random() * 1e9);
}
