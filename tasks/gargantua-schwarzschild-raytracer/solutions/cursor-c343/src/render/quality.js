// Rendering budgets per quality tier. Every field feeds the renderer: internal
// raytrace resolution, geodesic step budget and step size, disk samples per
// slab chord, noise octaves, Bloom mip levels and chromatic-aberration taps.
export const QUALITY_LEVELS = Object.freeze({
  standard: Object.freeze({
    id: 'standard',
    label: 'Standard',
    renderScale: 0.5,
    maxPixels: 520_000,
    maxSteps: 200,
    maxDphi: 0.1,
    relStep: 0.16,
    diskSamples: 3,
    noiseOctaves: 3,
    bloomLevels: 4,
    chromaticTaps: 3,
  }),
  high: Object.freeze({
    id: 'high',
    label: 'High',
    renderScale: 0.75,
    maxPixels: 1_350_000,
    maxSteps: 340,
    maxDphi: 0.07,
    relStep: 0.11,
    diskSamples: 5,
    noiseOctaves: 4,
    bloomLevels: 6,
    chromaticTaps: 3,
  }),
  cinematic: Object.freeze({
    id: 'cinematic',
    label: 'Cinematic',
    renderScale: 1,
    maxPixels: 3_700_000,
    maxSteps: 520,
    maxDphi: 0.045,
    relStep: 0.075,
    diskSamples: 8,
    noiseOctaves: 6,
    bloomLevels: 7,
    chromaticTaps: 7,
  }),
});

export const QUALITY_IDS = Object.freeze(Object.keys(QUALITY_LEVELS));

export const MAX_DEVICE_PIXEL_RATIO = 2;

export function isQualityId(value) {
  return typeof value === 'string' && Object.hasOwn(QUALITY_LEVELS, value);
}

export function nextQuality(id) {
  const index = QUALITY_IDS.indexOf(id);
  return QUALITY_IDS[(index + 1) % QUALITY_IDS.length];
}

// Internal (raytrace) resolution for a drawing buffer of width × height.
export function internalResolution(quality, width, height) {
  let scale = quality.renderScale;
  const pixels = width * height * scale * scale;
  if (pixels > quality.maxPixels) scale *= Math.sqrt(quality.maxPixels / pixels);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    scale,
  };
}
