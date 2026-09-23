// stateDefaults.js - Single source of truth for all parameters, presets, and debug definitions

export const STORAGE_KEY = 'gargantua_settings_v1';

export const QUALITY_TIERS = {
  standard: {
    label: 'Standard',
    maxSteps: 120,
    resScale: 0.85,
    maxDpr: 1.2,
    bloomPasses: 2
  },
  high: {
    label: 'High',
    maxSteps: 200,
    resScale: 1.0,
    maxDpr: 1.5,
    bloomPasses: 3
  },
  cinematic: {
    label: 'Cinematic',
    maxSteps: 320,
    resScale: 1.0,
    maxDpr: 2.0,
    bloomPasses: 4
  }
};

export const CAMERA_PRESETS = [
  {
    id: 0,
    name: 'Iconic Inclined View',
    description: 'Classic Interstellar viewing angle: prominent upper/lower lensed arcs and Doppler brightness asymmetry.',
    distance: 17.5,
    azimuth: 0.0,
    elevation: 18.0,
    fov: 45.0
  },
  {
    id: 1,
    name: 'Edge-On Thin Disk',
    description: 'Extreme equatorial slice: severe gravitational deflection folding the disk above and below the horizon.',
    distance: 15.0,
    azimuth: 0.0,
    elevation: 2.0,
    fov: 42.0
  },
  {
    id: 2,
    name: 'Polar Vortex Overhead',
    description: 'Top-down polar perspective: concentric circular photon ring and swirling Keplerian accretion flow.',
    distance: 19.0,
    azimuth: 0.0,
    elevation: 82.0,
    fov: 50.0
  },
  {
    id: 3,
    name: 'Deep-Field Distant Lensing',
    description: 'Distant cosmic view: macro-scale Einstein rings bending the background Milky Way and starfield.',
    distance: 36.0,
    azimuth: -30.0,
    elevation: 24.0,
    fov: 30.0
  }
];

export const DEBUG_MODES = [
  { id: 0, name: 'Final Composite', desc: 'Full physical raytracing, relativistic disk, bloom & ACES post-processing.' },
  { id: 1, name: 'Geodesic Step Cost Heatmap', desc: 'Normalized RK4 integration steps visualized with Turbo gradient near the photon sphere.' },
  { id: 2, name: 'Event Horizon & Shadow Mask', desc: 'Pure binary capture mask (1.0 = horizon hit, 0.0 = escape).' },
  { id: 3, name: 'Disk Crossing Count & Order', desc: 'Discrete color encoding: 0 = none, 1 = primary direct, 2 = secondary arc, 3+ = higher-order rings.' },
  { id: 4, name: 'Doppler & Redshift Factor', desc: 'Relativistic shift g: red for redshift (g < 0.8), white for neutral, cyan-blue for Doppler boosted approaching side (g > 1.2).' },
  { id: 5, name: 'Celestial Deflection Map', desc: 'Deflection angle theta = acos(d0 . d_inf) mapped across the field of view.' },
  { id: 6, name: 'Isolated Celestial Background', desc: 'Procedural starfield and Milky Way core without black hole deflection or disk absorption.' },
  { id: 7, name: 'Raw Linear HDR Radiance', desc: 'Logarithmic dynamic range log10(1 + L_hdr) before bloom and tonemapping.' },
  { id: 8, name: 'Disk Temp & Turbulence Field', desc: 'Normalized disk surface temperature T(r) and sheared simplex noise without Doppler shift.' },
  { id: 9, name: 'Disk Velocity Vector Field', desc: 'Normalized Keplerian velocity vector v_orbit mapped to RGB.' }
];

// Exact 21 reactive parameters with metadata
export const PARAMETER_DEFINITIONS = [
  // 1. Optics & Camera
  { id: 'uFov', label: 'Field of View (FOV)', min: 20.0, max: 90.0, step: 1.0, default: 45.0, unit: '°', group: 'Optics & Camera' },
  { id: 'cameraDist', label: 'Camera Distance', min: 8.0, max: 50.0, step: 0.5, default: 17.5, unit: ' rs', group: 'Optics & Camera' },
  { id: 'cameraAzimuth', label: 'Camera Azimuth', min: -180.0, max: 180.0, step: 1.0, default: 0.0, unit: '°', group: 'Optics & Camera' },
  { id: 'cameraElevation', label: 'Camera Elevation', min: -85.0, max: 85.0, step: 1.0, default: 18.0, unit: '°', group: 'Optics & Camera' },
  { id: 'uTimeScale', label: 'Time Scale', min: 0.0, max: 3.0, step: 0.05, default: 1.0, unit: 'x', group: 'Optics & Camera' },

  // 2. Accretion Disk Geometry & Physics
  { id: 'uDiskInner', label: 'Disk Inner Radius', min: 2.0, max: 4.0, step: 0.05, default: 2.6, unit: ' rs', group: 'Accretion Disk' },
  { id: 'uDiskOuter', label: 'Disk Outer Radius', min: 6.0, max: 22.0, step: 0.5, default: 12.5, unit: ' rs', group: 'Accretion Disk' },
  { id: 'uDiskThickness', label: 'Disk Half-Thickness', min: 0.01, max: 0.4, step: 0.01, default: 0.08, unit: ' rs', group: 'Accretion Disk' },
  { id: 'uDiskTemp', label: 'Disk Temperature', min: 2000.0, max: 12000.0, step: 100.0, default: 6500.0, unit: ' K', group: 'Accretion Disk' },
  { id: 'uDiskEmission', label: 'Disk Emission Intensity', min: 0.1, max: 5.0, step: 0.1, default: 1.5, unit: '', group: 'Accretion Disk' },
  { id: 'uVelocityFactor', label: 'Orbital Velocity Factor', min: 0.0, max: 2.0, step: 0.05, default: 1.0, unit: 'x', group: 'Accretion Disk' },
  { id: 'uTurbAmp', label: 'Turbulence Amplitude', min: 0.0, max: 2.0, step: 0.05, default: 0.85, unit: '', group: 'Accretion Disk' },
  { id: 'uTurbSpeed', label: 'Turbulence Speed', min: 0.0, max: 3.0, step: 0.05, default: 1.0, unit: 'x', group: 'Accretion Disk' },

  // 3. Celestial Environment
  { id: 'uStarDensity', label: 'Star Density', min: 0.1, max: 3.0, step: 0.1, default: 1.0, unit: '', group: 'Environment' },
  { id: 'uGalaxyBrightness', label: 'Milky Way Brightness', min: 0.0, max: 3.0, step: 0.1, default: 1.3, unit: '', group: 'Environment' },

  // 4. HDR Post-Processing
  { id: 'uBloomStrength', label: 'Bloom Strength', min: 0.0, max: 3.0, step: 0.05, default: 0.85, unit: '', group: 'Post-Processing' },
  { id: 'uBloomThreshold', label: 'Bloom Threshold', min: 0.2, max: 2.0, step: 0.05, default: 0.8, unit: '', group: 'Post-Processing' },
  { id: 'uExposure', label: 'Exposure Multiplier', min: 0.2, max: 3.0, step: 0.05, default: 1.0, unit: 'x', group: 'Post-Processing' },
  { id: 'uVignetteStrength', label: 'Vignette Strength', min: 0.0, max: 1.5, step: 0.05, default: 0.35, unit: '', group: 'Post-Processing' },
  { id: 'uGrainStrength', label: 'Film Grain Strength', min: 0.0, max: 0.15, step: 0.005, default: 0.035, unit: '', group: 'Post-Processing' },
  { id: 'uChromaticAberration', label: 'Chromatic Aberration', min: 0.0, max: 0.02, step: 0.001, default: 0.003, unit: '', group: 'Post-Processing' }
];

export function getDefaultState() {
  const params = {};
  for (const def of PARAMETER_DEFINITIONS) {
    params[def.id] = def.default;
  }
  return {
    version: 1,
    quality: 'high',
    preset: 0,
    debug: 0,
    hudVisible: true,
    cinematicOrbit: false,
    audioEnabled: false,
    params
  };
}

export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) {
      return getDefaultState();
    }
    const def = getDefaultState();
    return {
      version: 1,
      quality: ['standard', 'high', 'cinematic'].includes(parsed.quality) ? parsed.quality : def.quality,
      preset: (typeof parsed.preset === 'number' && parsed.preset >= 0 && parsed.preset <= 3) ? parsed.preset : def.preset,
      debug: (typeof parsed.debug === 'number' && parsed.debug >= 0 && parsed.debug <= 9) ? parsed.debug : def.debug,
      hudVisible: typeof parsed.hudVisible === 'boolean' ? parsed.hudVisible : def.hudVisible,
      cinematicOrbit: typeof parsed.cinematicOrbit === 'boolean' ? parsed.cinematicOrbit : def.cinematicOrbit,
      audioEnabled: typeof parsed.audioEnabled === 'boolean' ? parsed.audioEnabled : def.audioEnabled,
      params: {
        ...def.params,
        ...(parsed.params || {})
      }
    };
  } catch (e) {
    console.warn('Failed to load persisted state, falling back to defaults:', e);
    return getDefaultState();
  }
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist state:', e);
  }
}
