export const STORAGE_KEY = 'gargantua.schwarzschild.state.v1';
export const STATE_VERSION = 1;

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

export const QUALITY_PROFILES = {
  standard: {
    id: 'standard',
    label: 'Standard',
    labelZh: '标准',
    renderScale: 0.76,
    mobileRenderScale: 0.68,
    maxDpr: 1.5,
    mobileMaxDpr: 1.35,
    maxSteps: 148,
    stepScale: 1.22,
    diskSubsamples: 1,
    starLayers: 2,
    bloomMips: 3,
    caSamples: 3,
  },
  high: {
    id: 'high',
    label: 'High',
    labelZh: '高画质',
    renderScale: 1.0,
    mobileRenderScale: 0.88,
    maxDpr: 2.0,
    mobileMaxDpr: 1.75,
    maxSteps: 232,
    stepScale: 0.88,
    diskSubsamples: 2,
    starLayers: 3,
    bloomMips: 5,
    caSamples: 5,
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinematic',
    labelZh: '电影级',
    renderScale: 1.15,
    mobileRenderScale: 1.0,
    maxDpr: 2.0,
    mobileMaxDpr: 2.0,
    maxSteps: 348,
    stepScale: 0.62,
    diskSubsamples: 3,
    starLayers: 4,
    bloomMips: 5,
    caSamples: 7,
  },
};

export const CAMERA_PRESETS = [
  {
    index: 0,
    id: 'gargantua-hero',
    code: 'Shift+1',
    name: 'Gargantua Horizon',
    nameZh: '卡冈图雅主构图',
    summary: 'Near-equatorial Dutch-tilt framing with primary disk, upper/lower lensed arches, and photon ring.',
    params: {
      fov: 43,
      cameraDistance: 19.5,
      cameraAzimuth: -24,
      cameraElevation: 10.5,
      cameraRoll: -11,
    },
  },
  {
    index: 1,
    id: 'photon-graze',
    code: 'Shift+2',
    name: 'ISCO Grazing',
    nameZh: '内缘掠射近景',
    summary: 'Close relativistic flyby skimming above the hot inner disk rim and multi-order photon ring.',
    params: {
      fov: 54,
      cameraDistance: 7.2,
      cameraAzimuth: 34,
      cameraElevation: 4.2,
      cameraRoll: 15,
    },
  },
  {
    index: 2,
    id: 'polar-vortex',
    code: 'Shift+3',
    name: 'Polar Spiral',
    nameZh: '极向漩涡俯视',
    summary: 'High-latitude polar vantage revealing full Keplerian MHD spiral arms and concentric photon rings.',
    params: {
      fov: 44,
      cameraDistance: 21.0,
      cameraAzimuth: 108,
      cameraElevation: 72,
      cameraRoll: 0,
    },
  },
  {
    index: 3,
    id: 'southern-eclipse',
    code: 'Shift+4',
    name: 'Southern Eclipse',
    nameZh: '南冕仰视透镜',
    summary: 'Telephoto southern-hemisphere angle below the disk plane highlighting inverted Einstein arcs.',
    params: {
      fov: 38,
      cameraDistance: 25.5,
      cameraAzimuth: -138,
      cameraElevation: -16.5,
      cameraRoll: 9,
    },
  },
];

export const DEBUG_MODES = [
  {
    index: 0,
    key: '0',
    name: 'Final Composite',
    nameZh: '最终合成画面',
    desc: 'Schwarzschild null-geodesic HDR render with multi-mip Bloom, ACES tone mapping, and lens optics.',
  },
  {
    index: 1,
    key: '1',
    name: 'Geodesic Steps & Termination',
    nameZh: '测地线步数与终止态',
    desc: 'RK4 integration step count heatmap; photon-sphere critical trajectories peak near b_crit ≈ 2.598 r_s.',
  },
  {
    index: 2,
    key: '2',
    name: 'Event Horizon & Photon Sphere',
    nameZh: '事件视界与光子球掩码',
    desc: 'Black = captured inside r ≤ r_s; gold contour = unstable photon orbit zone (r_min < 1.65 r_s); blue = escaped.',
  },
  {
    index: 3,
    key: '3',
    name: 'Disk Crossing Order',
    nameZh: '吸积盘穿越阶次',
    desc: 'Cyan = 1st crossing (direct), Gold = 2nd crossing (lensed arch), Magenta/White = 3rd+ crossing (photon ring).',
  },
  {
    index: 4,
    key: '4',
    name: 'Doppler & Gravitational Redshift',
    nameZh: '相对论红移与多普勒因子',
    desc: 'Frequency ratio g = ν_obs / ν_emit: Blue = approaching blueshift (g > 1), Red = gravitational/Doppler redshift (g < 1).',
  },
  {
    index: 5,
    key: '5',
    name: 'Curvature Deflection & Periapsis',
    nameZh: '引力偏折角与近心距',
    desc: 'Total ray bending angle Δθ between initial observer ray and asymptotic direction with r_min iso-contours.',
  },
  {
    index: 6,
    key: '6',
    name: 'Lensed Celestial Grid',
    nameZh: '背景天球透镜网格',
    desc: 'Deflected (θ, φ) spherical coordinate grid demonstrating Einstein ring inversion around the shadow.',
  },
  {
    index: 7,
    key: '7',
    name: 'Procedural Stars & Galaxy',
    nameZh: '程序化星空与银河背景',
    desc: 'Isolated gravitationally lensed procedural starfield, galactic nebula band, and dust rifts without disk.',
  },
  {
    index: 8,
    key: '8',
    name: 'Intrinsic Disk Temperature & MHD',
    nameZh: '盘面本征温度与湍流场',
    desc: 'Rest-frame Novikov-Thorne radial temperature profile modulated by animated Keplerian spiral turbulence.',
  },
  {
    index: 9,
    key: '9',
    name: 'Pre-Post Linear HDR Radiance',
    nameZh: '后处理前线性 HDR 辐射值',
    desc: 'Unbloomed, untonemapped linear scene radiance (log2 HDR exposure inspection; magenta tint marks > 1.0 HDR).',
  },
];

export const PARAM_GROUPS = [
  { id: 'camera', label: 'Camera & Framing', labelZh: '相机与构图' },
  { id: 'disk', label: 'Accretion Disk & GR', labelZh: '吸积盘与相对论' },
  { id: 'cosmos', label: 'Procedural Cosmos', labelZh: '星空与银河' },
  { id: 'post', label: 'HDR & Lens Optics', labelZh: 'HDR 与镜头后处理' },
];

export const PARAM_SPECS = [
  { key: 'fov', group: 'camera', label: '视场角 · FOV', unit: '°', min: 20, max: 85, step: 0.5, digits: 1, default: 43 },
  { key: 'cameraDistance', group: 'camera', label: '相机距离 · Distance', unit: 'r_s', min: 3.5, max: 34.0, step: 0.1, digits: 1, default: 19.5 },
  { key: 'cameraAzimuth', group: 'camera', label: '相机方位角 · Azimuth', unit: '°', min: -180, max: 180, step: 0.5, digits: 1, default: -24 },
  { key: 'cameraElevation', group: 'camera', label: '相机俯仰角 · Elevation', unit: '°', min: -85, max: 85, step: 0.5, digits: 1, default: 10.5 },
  { key: 'cameraRoll', group: 'camera', label: '相机滚转角 · Roll', unit: '°', min: -90, max: 90, step: 0.5, digits: 1, default: -11 },

  { key: 'timeScale', group: 'disk', label: '时间倍率 · Time Scale', unit: '×', min: 0.0, max: 4.0, step: 0.05, digits: 2, default: 1.0 },
  { key: 'diskInnerRadius', group: 'disk', label: '盘内半径 · Inner Radius', unit: 'r_s', min: 1.6, max: 5.5, step: 0.05, digits: 2, default: 2.65 },
  { key: 'diskOuterRadius', group: 'disk', label: '盘外半径 · Outer Radius', unit: 'r_s', min: 5.0, max: 22.0, step: 0.1, digits: 1, default: 10.8 },
  { key: 'diskHalfThickness', group: 'disk', label: '盘半厚度 · Half Thickness', unit: 'r_s', min: 0.01, max: 0.65, step: 0.005, digits: 3, default: 0.08 },
  { key: 'diskTemperature', group: 'disk', label: '盘温度 · Disk Temp', unit: 'K', min: 2500, max: 14000, step: 100, digits: 0, default: 4900 },
  { key: 'diskEmission', group: 'disk', label: '盘发射强度 · Emission', unit: '', min: 0.1, max: 5.0, step: 0.05, digits: 2, default: 1.32 },
  { key: 'orbitalSpeedScale', group: 'disk', label: '轨道速度倍率 · Orbital β', unit: '×', min: 0.0, max: 1.75, step: 0.02, digits: 2, default: 1.0 },
  { key: 'turbulenceAmp', group: 'disk', label: '湍流幅度 · Turbulence', unit: '', min: 0.0, max: 2.0, step: 0.02, digits: 2, default: 0.92 },
  { key: 'turbulenceSpeed', group: 'disk', label: '湍流速度 · Flow Rate', unit: '×', min: 0.0, max: 3.0, step: 0.05, digits: 2, default: 1.0 },

  { key: 'starDensity', group: 'cosmos', label: '恒星密度 · Star Density', unit: '×', min: 0.0, max: 2.5, step: 0.05, digits: 2, default: 1.15 },
  { key: 'galaxyBrightness', group: 'cosmos', label: '银河亮度 · Galaxy Glow', unit: '×', min: 0.0, max: 3.0, step: 0.05, digits: 2, default: 1.45 },

  { key: 'bloomStrength', group: 'post', label: 'Bloom 强度 · Strength', unit: '', min: 0.0, max: 2.0, step: 0.02, digits: 2, default: 0.44 },
  { key: 'bloomThreshold', group: 'post', label: 'Bloom 阈值 · Threshold', unit: '', min: 0.1, max: 3.0, step: 0.05, digits: 2, default: 0.92 },
  { key: 'exposure', group: 'post', label: '曝光度 · Exposure', unit: '×', min: 0.2, max: 3.0, step: 0.02, digits: 2, default: 1.02 },
  { key: 'vignette', group: 'post', label: '暗角强度 · Vignette', unit: '', min: 0.0, max: 1.2, step: 0.02, digits: 2, default: 0.34 },
  { key: 'filmGrain', group: 'post', label: '胶片颗粒强度 · Film Grain', unit: '', min: 0.0, max: 0.22, step: 0.005, digits: 3, default: 0.026 },
  { key: 'chromaticAberration', group: 'post', label: '色散强度 · Chromatic Ab.', unit: '', min: 0.0, max: 1.5, step: 0.02, digits: 2, default: 0.20 },
];

export const PARAM_MAP = Object.fromEntries(PARAM_SPECS.map((spec) => [spec.key, spec]));

export function createDefaultParams() {
  const params = {};
  for (const spec of PARAM_SPECS) {
    params[spec.key] = spec.default;
  }
  return params;
}

export function sanitizeParams(raw = {}, base = createDefaultParams()) {
  const next = { ...base };
  if (raw && typeof raw === 'object') {
    for (const spec of PARAM_SPECS) {
      const candidate = raw[spec.key];
      if (typeof candidate === 'number' && Number.isFinite(candidate)) {
        if (spec.key === 'cameraAzimuth') {
          let az = ((candidate + 180) % 360 + 360) % 360 - 180;
          if (Object.is(az, -0)) az = 0;
          next[spec.key] = az;
        } else {
          next[spec.key] = Math.min(spec.max, Math.max(spec.min, candidate));
        }
      }
    }
  }
  // Ensure inner disk radius stays strictly inside outer disk radius
  if (next.diskOuterRadius < next.diskInnerRadius + 0.8) {
    next.diskOuterRadius = Math.min(
      PARAM_MAP.diskOuterRadius.max,
      Math.max(PARAM_MAP.diskOuterRadius.min, next.diskInnerRadius + 0.8),
    );
    if (next.diskInnerRadius > next.diskOuterRadius - 0.8) {
      next.diskInnerRadius = Math.max(PARAM_MAP.diskInnerRadius.min, next.diskOuterRadius - 0.8);
    }
  }
  return next;
}

export function createDefaultState() {
  return {
    version: STATE_VERSION,
    quality: 'high',
    preset: 0,
    debug: 0,
    hudVisible: true,
    drawerOpen: false,
    cinematicPlaying: true,
    audioEnabled: false,
    capture: false,
    simTime: 0,
    params: createDefaultParams(),
  };
}

export function isValidQuality(val) {
  return typeof val === 'string' && Object.prototype.hasOwnProperty.call(QUALITY_PROFILES, val);
}

export function isValidPreset(val) {
  return Number.isInteger(val) && val >= 0 && val < CAMERA_PRESETS.length;
}

export function isValidDebug(val) {
  return Number.isInteger(val) && val >= 0 && val < DEBUG_MODES.length;
}

export function isValidSimTime(val) {
  return typeof val === 'number' && Number.isFinite(val) && val >= 0;
}

export function parseStrictIntInRange(raw, min, max) {
  if (typeof raw !== 'string' || !/^\d+$/.test(raw.trim())) return null;
  const parsed = Number(raw.trim());
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

export function parseNonNegativeFloat(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  const parsed = Number(raw.trim());
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

export function loadPersistedState() {
  const fallback = createDefaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== STATE_VERSION) {
      return fallback;
    }
    return {
      ...fallback,
      quality: isValidQuality(parsed.quality) ? parsed.quality : fallback.quality,
      preset:
        parsed.preset === -1 || isValidPreset(parsed.preset)
          ? parsed.preset
          : fallback.preset,
      debug: isValidDebug(parsed.debug) ? parsed.debug : fallback.debug,
      hudVisible: typeof parsed.hudVisible === 'boolean' ? parsed.hudVisible : fallback.hudVisible,
      cinematicPlaying:
        typeof parsed.cinematicPlaying === 'boolean'
          ? parsed.cinematicPlaying
          : fallback.cinematicPlaying,
      params: sanitizeParams(parsed.params, fallback.params),
    };
  } catch {
    return fallback;
  }
}

export function savePersistedState(state) {
  if (!state || state.capture) return;
  try {
    const payload = {
      version: STATE_VERSION,
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hudVisible: state.hudVisible,
      cinematicPlaying: state.cinematicPlaying,
      params: state.params,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota / private-mode restrictions safely
  }
}

export function clearPersistedState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore safely
  }
}

export function parseInitialStateWithUrl(search = window.location.search) {
  const params = new URLSearchParams(search || '');
  const isCapture = params.get('capture') === '1';

  // In capture=1 mode, start from canonical defaults so automated screenshots are 100% deterministic.
  const base = isCapture ? createDefaultState() : loadPersistedState();
  const state = {
    ...base,
    params: { ...base.params },
  };

  if (params.has('quality')) {
    const q = params.get('quality');
    state.quality = isValidQuality(q) ? q : 'high';
  }

  if (params.has('preset')) {
    const p = parseStrictIntInRange(params.get('preset'), 0, CAMERA_PRESETS.length - 1);
    const resolvedPreset = p !== null ? p : 0;
    state.preset = resolvedPreset;
    state.params = sanitizeParams(CAMERA_PRESETS[resolvedPreset].params, state.params);
    if (!isCapture) {
      state.cinematicPlaying = false;
    }
  }

  if (params.has('debug')) {
    const d = parseStrictIntInRange(params.get('debug'), 0, DEBUG_MODES.length - 1);
    state.debug = d !== null ? d : 0;
  }

  if (params.has('hud')) {
    const h = parseStrictIntInRange(params.get('hud'), 0, 1);
    state.hudVisible = h !== null ? h === 1 : true;
  }

  if (isCapture) {
    state.capture = true;
    state.cinematicPlaying = false;
    state.audioEnabled = false;
    const t = params.has('time') ? parseNonNegativeFloat(params.get('time')) : 0;
    state.simTime = t !== null ? t : 0;
  } else if (params.has('time')) {
    const t = parseNonNegativeFloat(params.get('time'));
    state.simTime = t !== null ? t : 0;
  }

  return state;
}
