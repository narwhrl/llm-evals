// Shared configuration: parameter registry (drives the HUD, persistence and
// URL contract), quality levels, camera presets, and debug-view metadata.

export const QUALITY_LEVELS = {
  standard: {
    label: 'Standard',
    renderScale: 0.55,   // fraction of device pixels fed to the raymarcher
    maxSteps: 180,
    diskSamples: 3,
    bloomStrength: 0.9,
    bloomRadius: 0.45,
    bloomResolution: 0.5,
  },
  high: {
    label: 'High',
    renderScale: 0.75,
    maxSteps: 320,
    diskSamples: 4,
    bloomStrength: 1.0,
    bloomRadius: 0.55,
    bloomResolution: 0.5,
  },
  cinematic: {
    label: 'Cinematic',
    renderScale: 1.0,
    maxSteps: 560,
    diskSamples: 6,
    bloomStrength: 1.15,
    bloomRadius: 0.7,
    bloomResolution: 0.75,
  },
};
export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

// Four meaningfully different camera framings (spherical around the hole).
export const PRESETS = [
  { name: 'Gargantua Prime',  dist: 14.0, azimuth: 0.45,  elevation: 0.62, fov: 52 },
  { name: 'Disk Grazing',     dist: 9.0,  azimuth: -0.9,  elevation: 0.10, fov: 58 },
  { name: 'Polar Lensing',    dist: 16.0, azimuth: 2.1,   elevation: 1.25, fov: 48 },
  { name: 'Photon Orbit',     dist: 7.2,  azimuth: 1.35,  elevation: 0.38, fov: 60 },
];

// Parameter registry. order = HUD grouping order; each entry is a real,
// effectful control bound either to a shader uniform or to the camera rig.
export const PARAMS = [
  { key: 'fov',            label: 'Field of view',        min: 30,   max: 90,   step: 0.5,   def: 52,   group: 'camera', fmt: (v) => `${v.toFixed(0)}°` },
  { key: 'camDistance',    label: 'Camera distance',      min: 3.5,  max: 40,   step: 0.1,   def: 14,   group: 'camera', fmt: (v) => `${v.toFixed(1)} rs` },
  { key: 'camAzimuth',     label: 'Camera azimuth',       min: -3.15,max: 3.15, step: 0.01,  def: 0.45, group: 'camera', fmt: (v) => `${v.toFixed(2)} rad` },
  { key: 'camElevation',   label: 'Camera elevation',     min: -1.35,max: 1.45, step: 0.01,  def: 0.62, group: 'camera', fmt: (v) => `${v.toFixed(2)} rad` },
  { key: 'timeScale',      label: 'Time rate',            min: 0,    max: 4,    step: 0.05,  def: 1.0,  group: 'camera', fmt: (v) => `${v.toFixed(2)}×` },

  { key: 'diskInner',      label: 'Disk inner radius',    min: 1.3,  max: 8,    step: 0.05,  def: 2.2,  group: 'disk', fmt: (v) => `${v.toFixed(2)} rs` },
  { key: 'diskOuter',      label: 'Disk outer radius',    min: 6,    max: 26,   step: 0.1,   def: 15,   group: 'disk', fmt: (v) => `${v.toFixed(1)} rs` },
  { key: 'diskHalfHeight', label: 'Disk half-thickness',  min: 0.02, max: 0.6,  step: 0.005, def: 0.16, group: 'disk', fmt: (v) => `${v.toFixed(3)} rs` },
  { key: 'diskTemp',       label: 'Disk temperature',     min: 0.3,  max: 3.0,  step: 0.02,  def: 1.15, group: 'disk', fmt: (v) => `${v.toFixed(2)}×` },
  { key: 'diskEmit',       label: 'Disk emission',        min: 0,    max: 6,    step: 0.02,  def: 0.85, group: 'disk', fmt: (v) => `${v.toFixed(2)}×` },
  { key: 'orbitSpeed',     label: 'Orbital velocity',     min: 0,    max: 2.5,  step: 0.02,  def: 1.0,  group: 'disk', fmt: (v) => `${v.toFixed(2)}×` },
  { key: 'turbAmp',        label: 'Turbulence amplitude', min: 0,    max: 1.5,  step: 0.01,  def: 0.5,  group: 'disk', fmt: (v) => `${v.toFixed(2)}` },
  { key: 'turbSpeed',      label: 'Turbulence rate',      min: 0,    max: 3.0,  step: 0.02,  def: 0.55, group: 'disk', fmt: (v) => `${v.toFixed(2)}×` },

  { key: 'starDensity',    label: 'Star density',         min: 0,    max: 3.0,  step: 0.05,  def: 1.0,  group: 'sky', fmt: (v) => `${v.toFixed(2)}×` },
  { key: 'galaxyBright',   label: 'Galaxy brightness',    min: 0,    max: 3.0,  step: 0.05,  def: 1.0,  group: 'sky', fmt: (v) => `${v.toFixed(2)}×` },

  { key: 'bloomStrength',  label: 'Bloom strength',       min: 0,    max: 2.5,  step: 0.02,  def: 0.45, group: 'post', fmt: (v) => `${v.toFixed(2)}×` },
  { key: 'bloomThreshold', label: 'Bloom threshold',      min: 0,    max: 2.0,  step: 0.02,  def: 1.0,  group: 'post', fmt: (v) => `${v.toFixed(2)}` },
  { key: 'exposure',       label: 'Exposure',             min: 0.2,  max: 3.0,  step: 0.02,  def: 0.5,  group: 'post', fmt: (v) => `${v.toFixed(2)}×` },
  { key: 'vignette',       label: 'Vignette',             min: 0,    max: 1.5,  step: 0.02,  def: 0.55, group: 'post', fmt: (v) => `${v.toFixed(2)}` },
  { key: 'grain',          label: 'Film grain',           min: 0,    max: 1.5,  step: 0.02,  def: 0.35, group: 'post', fmt: (v) => `${v.toFixed(2)}` },
  { key: 'dispersion',     label: 'Chromatic dispersion', min: 0,    max: 1.5,  step: 0.02,  def: 0.35, group: 'post', fmt: (v) => `${v.toFixed(2)}` },
];

export const DEFAULTS = Object.fromEntries(PARAMS.map((p) => [p.key, p.def]));

export const DEBUG_VIEWS = [
  { id: 0, name: 'Composite',            desc: 'Final graded image' },
  { id: 1, name: 'Integration steps',    desc: 'G: march depth · R: captured' },
  { id: 2, name: 'Event-horizon mask',   desc: 'R: fell below r = rs' },
  { id: 3, name: 'Disk crossings',       desc: 'none / primary / secondary / tertiary' },
  { id: 4, name: 'Doppler + redshift',   desc: 'R: blue-shifted · B: red-shifted' },
  { id: 5, name: 'Lensed exit direction',desc: 'escaped-ray direction as RGB' },
  { id: 6, name: 'Star field',           desc: 'procedural stars through the lens' },
  { id: 7, name: 'Galaxy band',          desc: 'procedural milky way through the lens' },
  { id: 8, name: 'HDR radiance (log)',   desc: 'pre-tonemap luminance' },
  { id: 9, name: 'Closest approach',     desc: 'periapsis vs photon sphere' },
];

export const STORAGE_KEY = 'gargantua.state.v1';
export const STORAGE_VERSION = 1;
