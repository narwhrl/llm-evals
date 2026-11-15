// All physical lengths are in units of the Schwarzschild radius r_s = 2M = 1.

export const STATE_VERSION = 3;
export const STORAGE_KEY = 'gargantua.state.v3';

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

export const QUALITY = {
  standard: {
    label: 'Standard',
    renderScale: 0.70,
    dprCap: 1.25,
    maxSteps: 120,
    stepScale: 1.50,
    diskSamples: 2,
    bloomLevels: 1,
    blurRadius: 1.0,
  },
  high: {
    label: 'High',
    renderScale: 0.88,
    dprCap: 1.60,
    maxSteps: 190,
    stepScale: 1.20,
    diskSamples: 3,
    bloomLevels: 2,
    blurRadius: 1.35,
  },
  cinematic: {
    label: 'Cinematic',
    renderScale: 1.0,
    dprCap: 2.0,
    maxSteps: 280,
    stepScale: 1.0,
    diskSamples: 4,
    bloomLevels: 3,
    blurRadius: 1.7,
  },
};

export const DEFAULT_QUALITY = 'high';

// Each entry drives either a shader uniform or the camera state. `key` matches
// the uniform name prefix (u + PascalCase) and the persisted state field.
export const PARAM_DEFS = [
  { key: 'fov', label: 'Field of view', unit: 'deg', min: 25, max: 100, step: 1, def: 58, group: 'Camera', hint: 'Perspective FOV fed to the shader ray basis and OrbitControls camera.' },
  { key: 'distance', label: 'Camera distance', unit: 'rs', min: 3.2, max: 60, step: 0.1, def: 14, group: 'Camera', hint: 'Observer radius in Schwarzschild units.' },
  { key: 'azimuth', label: 'Camera azimuth', unit: 'deg', min: -180, max: 180, step: 1, def: 0, group: 'Camera', hint: 'Orbital longitude of the observer around the hole.' },
  { key: 'pitch', label: 'Camera pitch', unit: 'deg', min: -85, max: 85, step: 1, def: 8, group: 'Camera', hint: 'Elevation above the accretion disk plane.' },
  { key: 'timeScale', label: 'Time multiplier', unit: 'x', min: 0, max: 4, step: 0.05, def: 1, group: 'Camera', hint: 'Rate of the animated disk turbulence and cinematic clock.' },

  { key: 'diskInner', label: 'Disk inner radius', unit: 'rs', min: 1.6, max: 8, step: 0.05, def: 3.0, group: 'Accretion disk', hint: 'Inner edge (ISCO-like) of the emitting slab.' },
  { key: 'diskOuter', label: 'Disk outer radius', unit: 'rs', min: 5, max: 30, step: 0.1, def: 12.0, group: 'Accretion disk', hint: 'Outer edge of the emitting slab.' },
  { key: 'diskThickness', label: 'Disk half thickness', unit: 'rs', min: 0.02, max: 2, step: 0.01, def: 0.40, group: 'Accretion disk', hint: 'Vertical Gaussian scale height; changes the integrated slab path length.' },
  { key: 'diskTemp', label: 'Disk temperature', unit: 'x', min: 0.3, max: 3, step: 0.01, def: 1.30, group: 'Accretion disk', hint: 'Blackbody colour temperature scale; T(r) ~ r^(-3/4).' },
  { key: 'emission', label: 'Disk emission', unit: 'x', min: 0, max: 4, step: 0.01, def: 1.75, group: 'Accretion disk', hint: 'Overall emissivity of the optically thin disk.' },
  { key: 'orbitSpeed', label: 'Orbital speed', unit: 'x', min: 0, max: 2, step: 0.01, def: 1.0, group: 'Accretion disk', hint: 'Keplerian beta = sqrt(M/r) multiplier; drives Doppler beaming.' },
  { key: 'turbAmp', label: 'Turbulence amplitude', unit: 'x', min: 0, max: 2, step: 0.01, def: 0.35, group: 'Accretion disk', hint: 'Strength of procedural fBm density filaments.' },
  { key: 'turbSpeed', label: 'Turbulence speed', unit: 'x', min: 0, max: 3, step: 0.01, def: 1.0, group: 'Accretion disk', hint: 'Advection rate of the co-rotating turbulent pattern.' },

  { key: 'starDensity', label: 'Star density', unit: 'x', min: 0, max: 2, step: 0.01, def: 1.15, group: 'Background', hint: 'Threshold for procedural multi-scale star cells.' },
  { key: 'galaxyBrightness', label: 'Galaxy brightness', unit: 'x', min: 0, max: 3, step: 0.01, def: 0.75, group: 'Background', hint: 'Brightness of the procedurally generated, gravitationally lensed galactic band.' },

  { key: 'bloomIntensity', label: 'Bloom intensity', unit: 'x', min: 0, max: 3, step: 0.01, def: 1.35, group: 'Post processing', hint: 'Weight of the multi-resolution bloom pyramid in HDR compositing.' },
  { key: 'bloomThreshold', label: 'Bloom threshold', unit: 'x', min: 0, max: 4, step: 0.01, def: 1.55, group: 'Post processing', hint: 'Soft HDR luminance knee of the bright-pass extractor.' },
  { key: 'exposure', label: 'Exposure', unit: 'x', min: 0.2, max: 4, step: 0.01, def: 1.0, group: 'Post processing', hint: 'Linear exposure applied before ACES tone mapping.' },
  { key: 'vignette', label: 'Vignette', unit: 'x', min: 0, max: 1.5, step: 0.01, def: 0.45, group: 'Post processing', hint: 'Radial lens falloff; kept clear of the photon ring.' },
  { key: 'grain', label: 'Film grain', unit: 'x', min: 0, max: 1, step: 0.01, def: 0.22, group: 'Post processing', hint: 'Deterministic per-pixel grain keyed by frozen simulation time.' },
  { key: 'chroma', label: 'Chromatic aberration', unit: 'x', min: 0, max: 2, step: 0.01, def: 0.55, group: 'Post processing', hint: 'Radial per-channel sampling offset in the composite.' },
];

export const PARAM_MAP = Object.fromEntries(PARAM_DEFS.map((p) => [p.key, p]));

export const PRESETS = [
  { name: 'EDGE-ON', fov: 58, distance: 14, azimuth: 0, pitch: 8 },
  { name: 'GARGANTUA', fov: 62, distance: 18, azimuth: 32, pitch: 16 },
  { name: 'POLAR', fov: 55, distance: 22, azimuth: 120, pitch: 68 },
  { name: 'PHOTON RING', fov: 42, distance: 7.5, azimuth: -55, pitch: 10 },
];

export const DEBUG_VIEWS = [
  { name: 'FINAL COMPOSITE', desc: 'HDR geodesic render + bloom + ACES + lens grade.' },
  { name: 'RAY STEPS / STOP', desc: 'Integration step count heatmap; red = horizon capture, amber = step budget exhausted.' },
  { name: 'HORIZON MASK', desc: 'Event-horizon capture mask; cyan band marks the critical photon sphere.' },
  { name: 'DISK CROSSINGS', desc: 'Ordered disk-plane intersections: 1st red, 2nd green, 3rd blue, 4th+ amber.' },
  { name: 'REDSHIFT / DOPPLER', desc: 'Total frequency factor g; red = net redshift, blue-white = Doppler blueshift.' },
  { name: 'LENSED SKY COORDS', desc: 'Escaped-ray sky coordinates with azimuth/elevation contours showing lensing distortion.' },
  { name: 'STARS / GALAXY', desc: 'Procedural starfield and Milky Way band only, still sampled along bent rays.' },
  { name: 'PRE-POST HDR', desc: 'Scene HDR luminance before bloom, graded with a log heatmap.' },
  { name: 'DEFLECTION', desc: 'Total bending angle between the launch direction and the asymptotic ray direction.' },
  { name: 'MIN RADIUS', desc: 'Closest approach r_min; the bright band is the unstable photon orbit at 1.5 rs.' },
];

export const SHORTCUTS = [
  ['0 - 9', 'Switch debug view'],
  ['Shift + 1 - 4', 'Camera preset 1 - 4'],
  ['Space', 'Play / pause cinematic loop'],
  ['H', 'Show / hide HUD'],
  ['R', 'Reset all state to defaults'],
  ['Q', 'Cycle quality tier'],
  ['M', 'Toggle procedural ambience (off by default)'],
];
