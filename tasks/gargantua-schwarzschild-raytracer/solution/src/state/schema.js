/**
 * Single source of truth for every configurable value: parameter ranges, quality budgets, camera
 * presets, debug views and the persistence schema version.
 *
 * Sliders, clamping, persistence validation, reset and the URL query contract all read from here,
 * so a value can never be accepted through one path and rejected through another.
 */

export const SCHEMA_VERSION = 1
export const STORAGE_KEY = 'gargantua.state.v1'

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic']

/**
 * Quality tiers change real rendering work, not labels:
 *   renderScale   internal buffer size relative to the device-pixel viewport
 *   maxSteps      per-ray RK4 step budget (shader loop bound)
 *   stepScale     RK4 step length multiplier (smaller = finer trajectory)
 *   maxCrossings  how many ordered disk crossings a single ray may collect
 *   bloomMips     length of the bloom mip chain (each mip is a full extra pass pair)
 *   dprCap        devicePixelRatio ceiling
 *   octaves       fbm octave counts for disk turbulence and the sky
 *   bloomRadius   tent upsample width
 */
export const QUALITY_TIERS = {
  standard: {
    id: 'standard',
    label: 'Standard',
    renderScale: 0.75,
    maxSteps: 200,
    stepScale: 1.7,
    maxCrossings: 3,
    bloomMips: 3,
    bloomRadius: 1.0,
    dprCap: 1.25,
    turbulenceOctaves: 3,
    skyOctaves: 3,
  },
  high: {
    id: 'high',
    label: 'High',
    renderScale: 1.0,
    maxSteps: 360,
    stepScale: 1.0,
    maxCrossings: 5,
    bloomMips: 5,
    bloomRadius: 1.2,
    dprCap: 1.75,
    turbulenceOctaves: 4,
    skyOctaves: 4,
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinematic',
    renderScale: 1.4,
    maxSteps: 620,
    stepScale: 0.62,
    maxCrossings: 6,
    bloomMips: 6,
    bloomRadius: 2.0,
    dprCap: 2.0,
    turbulenceOctaves: 5,
    skyOctaves: 5,
  },
}

export const MAX_RENDER_PIXELS = 1920 * 1200 * 2.6

export const DEFAULT_QUALITY = 'standard'

/**
 * The twenty-one required parameters plus `diskOpacity`, which the emission-absorption compositing
 * needs in order to be controllable at all. Each entry drives exactly one uniform or camera value.
 */
export const PARAMETERS = [
  // --- camera -------------------------------------------------------------------------------
  { id: 'fov', group: 'camera', label: 'Field of view', min: 12, max: 110, step: 0.5, value: 40, unit: '°' },
  { id: 'camDistance', group: 'camera', label: 'Camera distance', min: 2.2, max: 90, step: 0.1, value: 20, unit: 'r\u209B' },
  { id: 'camAzimuth', group: 'camera', label: 'Camera azimuth', min: -180, max: 180, step: 0.5, value: 24, unit: '°' },
  { id: 'camElevation', group: 'camera', label: 'Camera elevation', min: -89, max: 89, step: 0.5, value: 8, unit: '°' },
  { id: 'timeScale', group: 'camera', label: 'Time scale', min: 0, max: 8, step: 0.01, value: 1, unit: '×' },

  // --- accretion disk -----------------------------------------------------------------------
  { id: 'diskInner', group: 'disk', label: 'Disk inner radius', min: 1.6, max: 20, step: 0.05, value: 3, unit: 'r\u209B' },
  { id: 'diskOuter', group: 'disk', label: 'Disk outer radius', min: 4, max: 42, step: 0.1, value: 15, unit: 'r\u209B' },
  { id: 'diskThickness', group: 'disk', label: 'Disk half-thickness', min: 0.01, max: 1.5, step: 0.005, value: 0.16, unit: 'r\u209B' },
  { id: 'diskTemperature', group: 'disk', label: 'Disk temperature', min: 1200, max: 30000, step: 50, value: 8000, unit: 'K' },
  { id: 'diskEmission', group: 'disk', label: 'Disk emission', min: 0, max: 4, step: 0.02, value: 1, unit: '×' },
  { id: 'diskOpacity', group: 'disk', label: 'Disk opacity', min: 0, max: 1, step: 0.01, value: 0.85, unit: '' },
  { id: 'orbitalSpeed', group: 'disk', label: 'Orbital speed scale', min: 0, max: 1.6, step: 0.01, value: 1, unit: '×' },
  { id: 'turbulenceAmplitude', group: 'disk', label: 'Turbulence amplitude', min: 0, max: 1.5, step: 0.01, value: 0.6, unit: '' },
  { id: 'turbulenceSpeed', group: 'disk', label: 'Turbulence speed', min: 0, max: 4, step: 0.01, value: 1, unit: '×' },

  // --- sky ----------------------------------------------------------------------------------
  { id: 'starDensity', group: 'sky', label: 'Star density', min: 0, max: 2, step: 0.01, value: 0.9, unit: '×' },
  { id: 'galaxyBrightness', group: 'sky', label: 'Galaxy brightness', min: 0, max: 2.5, step: 0.01, value: 0.6, unit: '×' },

  // --- post-processing ----------------------------------------------------------------------
  { id: 'bloomStrength', group: 'post', label: 'Bloom strength', min: 0, max: 2, step: 0.01, value: 0.5, unit: '' },
  { id: 'bloomThreshold', group: 'post', label: 'Bloom threshold', min: 0, max: 4, step: 0.01, value: 1.15, unit: '' },
  { id: 'exposure', group: 'post', label: 'Exposure', min: 0.05, max: 4, step: 0.01, value: 1, unit: '×' },
  { id: 'vignette', group: 'post', label: 'Vignette strength', min: 0, max: 1, step: 0.01, value: 0.42, unit: '' },
  { id: 'filmGrain', group: 'post', label: 'Film grain', min: 0, max: 1, step: 0.01, value: 0.22, unit: '' },
  { id: 'chromaticAberration', group: 'post', label: 'Chromatic aberration', min: 0, max: 1, step: 0.01, value: 0.22, unit: '' },
]

export const PARAMETER_GROUPS = [
  { id: 'camera', label: 'Camera & time' },
  { id: 'disk', label: 'Accretion disk' },
  { id: 'sky', label: 'Sky' },
  { id: 'post', label: 'Post-processing' },
]

export const PARAMETERS_BY_ID = Object.fromEntries(PARAMETERS.map((p) => [p.id, p]))

export const DEFAULT_PARAMETERS = Object.fromEntries(PARAMETERS.map((p) => [p.id, p.value]))

/**
 * Four visually distinct framings. Each preset sets absolute camera and FOV values so the presets
 * remain distinguishable even after the user has moved the camera.
 */
export const PRESETS = [
  {
    id: 0,
    name: 'Interstellar',
    description: 'Near edge-on, wide disk sweep',
    params: { fov: 40, camDistance: 20, camAzimuth: 24, camElevation: 8 },
  },
  {
    id: 1,
    name: 'Polar Overlook',
    description: 'High inclination, full annulus',
    params: { fov: 38, camDistance: 26, camAzimuth: 62, camElevation: 56 },
  },
  {
    id: 2,
    name: 'Photon Ring',
    // The shadow subtends asin(b_crit / r), so the framing has to keep the aperture wide enough to
    // reach past b_crit = 2.598 r_s; a narrower field at this distance would be shadow edge to edge.
    description: 'Close, critical structure dominant',
    params: { fov: 34, camDistance: 11, camAzimuth: -12, camElevation: 5 },
  },
  {
    id: 3,
    name: 'Wide Field',
    description: 'Distant, wide lensed starfield',
    params: { fov: 62, camDistance: 46, camAzimuth: 108, camElevation: -14 },
  },
]

/**
 * Debug views 0-9. `0` is the graded composite; the rest must be mutually distinguishable and
 * diagnostically useful, and the HUD reports the active number with its description.
 */
export const DEBUG_VIEWS = [
  { id: 0, name: 'Final composite', description: 'Graded HDR image with bloom and lens effects' },
  { id: 1, name: 'Integration cost', description: 'RK4 steps taken; hue = horizon / escape / step budget' },
  { id: 2, name: 'Event horizon mask', description: 'Captured rays in white, critical curve marked' },
  { id: 3, name: 'Disk crossings', description: 'Image order as hue, number of crossings as brightness' },
  { id: 4, name: 'Redshift & Doppler', description: 'Signed frequency shift and beaming strength' },
  { id: 5, name: 'Background lensing', description: 'Escaped-ray direction, graticule in spherical angles' },
  { id: 6, name: 'Stars & galaxy', description: 'Procedural sky alone, still gravitationally lensed' },
  { id: 7, name: 'Pre-post HDR', description: 'Raw linear radiance; magenta marks overexposure' },
  { id: 8, name: 'Deflection angle', description: 'Total swept phi, i.e. how far the ray wound around' },
  { id: 9, name: 'Impact parameter', description: 'b / b_crit, with the critical curve marked' },
]

export const SHORTCUTS = [
  { keys: '0 – 9', action: 'Debug view' },
  { keys: 'Shift + 1 – 4', action: 'Camera preset' },
  { keys: 'Space', action: 'Play / pause cinematic loop' },
  { keys: 'H', action: 'Show / hide HUD' },
  { keys: 'R', action: 'Reset all parameters' },
  { keys: 'Q', action: 'Cycle quality tier' },
  { keys: 'M', action: 'Ambient audio' },
]

/** Clamp + coerce one raw value against the schema. Returns the default when unusable. */
export function coerceParameter(id, raw) {
  const definition = PARAMETERS_BY_ID[id]
  if (!definition) return undefined
  const numeric = typeof raw === 'number' ? raw : Number.parseFloat(raw)
  if (!Number.isFinite(numeric)) return definition.value
  const clamped = Math.min(definition.max, Math.max(definition.min, numeric))
  // Snap to the declared step so persisted and queried values round-trip exactly.
  const snapped = Math.round(clamped / definition.step) * definition.step
  const decimals = (String(definition.step).split('.')[1] || '').length
  return Number(Math.min(definition.max, Math.max(definition.min, snapped)).toFixed(decimals))
}
