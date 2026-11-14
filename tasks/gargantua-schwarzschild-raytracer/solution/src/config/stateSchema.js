export const STORAGE_KEY = 'gargantua.schwarzschild.state.v1';
export const SCHEMA_VERSION = 1;

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

export const QUALITY_PROFILES = {
  standard: {
    id: 'standard',
    label: 'Standard',
    zhLabel: '标准',
    renderScale: 0.68,
    mobileRenderScale: 0.58,
    maxDpr: 1.5,
    maxSteps: 132,
    stepScale: 1.12,
    diskSamples: 2,
    starLayers: 2,
    bloomMips: 2,
    bloomRadius: 1.0,
    blurTaps: 5,
  },
  high: {
    id: 'high',
    label: 'High',
    zhLabel: '高画质',
    renderScale: 0.88,
    mobileRenderScale: 0.74,
    maxDpr: 2.0,
    maxSteps: 216,
    stepScale: 0.82,
    diskSamples: 3,
    starLayers: 3,
    bloomMips: 3,
    bloomRadius: 1.18,
    blurTaps: 9,
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinematic',
    zhLabel: '电影级',
    renderScale: 1.0,
    mobileRenderScale: 0.9,
    maxDpr: 2.25,
    maxSteps: 320,
    stepScale: 0.58,
    diskSamples: 4,
    starLayers: 3,
    bloomMips: 4,
    bloomRadius: 1.35,
    blurTaps: 13,
  },
};

export const CAMERA_PRESETS = [
  {
    index: 0,
    id: 'iconic-horizon',
    name: 'Gargantua Iconic',
    zhName: '经典倾角全景',
    shortcut: 'Shift+1',
    description: '近赤道倾角构图，清晰呈现前后吸积盘、次级引力透镜拱弧与光子环',
    fov: 46,
    camDistance: 17.8,
    camAzimuth: -24,
    camElevation: 9.2,
  },
  {
    index: 1,
    id: 'photon-graze',
    name: 'Photon Sphere Graze',
    zhName: '临界光子环掠射',
    shortcut: 'Shift+2',
    description: '长焦抵近内盘边缘，突显多普勒不对称增亮、极端红移与多阶光子子环',
    fov: 38,
    camDistance: 9.2,
    camAzimuth: 42,
    camElevation: 4.8,
  },
  {
    index: 2,
    id: 'polar-einstein',
    name: 'Polar Einstein Halo',
    zhName: '极轴爱因斯坦环',
    shortcut: 'Shift+3',
    description: '高纬度俯视黑洞极轴，完整展现螺旋磁流体湍流、ISCO 边界与对称透镜光环',
    fov: 48,
    camDistance: 17.2,
    camAzimuth: 112,
    camElevation: 67,
  },
  {
    index: 3,
    id: 'galactic-underview',
    name: 'Galactic Abyss Wide',
    zhName: '银心深空仰视',
    shortcut: 'Shift+4',
    description: '赤道面下方广角仰视，强化银河尘埃带扭曲、爱因斯坦星弧与盘面底侧次级像',
    fov: 62,
    camDistance: 20.5,
    camAzimuth: -138,
    camElevation: -16.5,
  },
];

export const DEBUG_MODES = [
  {
    index: 0,
    short: 'FINAL',
    name: 'Final Composite (最终合成画面)',
    description: '完整 Schwarzschild 零测地线积分 + 多级吸积盘辐射传输 + HDR Bloom + ACES 色调映射',
  },
  {
    index: 1,
    short: 'STEPS',
    name: 'Geodesic Step Heatmap (测地线积分步数与终止)',
    description: '显示每像素 RK4 自适应步数占比（蓝=弱场快速逃逸，金/白=临界光子球密集积分，深红=视界捕获）',
  },
  {
    index: 2,
    short: 'HORIZON',
    name: 'Event Horizon & Critical Mask (事件视界与光子球掩码)',
    description: '纯黑视界捕获阴影 (r ≤ rs)、青金临界冲击参数 b_crit 光子环边界与等冲击参数环线',
  },
  {
    index: 3,
    short: 'ORDER',
    name: 'Disk Crossings & Image Order (盘面交点与多级像阶次)',
    description: '按弯曲路径穿越阶次着色：青蓝=首级直接像 (n=0)，琥珀金=次级透镜拱像 (n=1)，洋红/白=高阶光子环像 (n≥2) 及多重叠加',
  },
  {
    index: 4,
    short: 'DOPPLER',
    name: 'Doppler & Gravitational Redshift (多普勒与引力红移 g 因子)',
    description: '频移因子 g = ν_obs / ν_em 双极色图：亮蓝 (g > 1 迎面蓝移增亮)、纯白 (g ≈ 1)、深红紫 (g < 1 背离红移与近视界引力红移)',
  },
  {
    index: 5,
    short: 'TEMP',
    name: 'Rest-Frame Disk Temp & Turbulence (本征盘温梯度与湍流场)',
    description: '剥离相对论频移与后处理，单独检视 Novikov–Thorne 径向温度分布与螺旋 MRI 磁流体湍流密度',
  },
  {
    index: 6,
    short: 'LENS UV',
    name: 'Lensed Sky Grid & Deflection (背景透镜天球坐标与偏折角)',
    description: '逃逸光线无穷远天球经纬网格与总引力偏折角 Δφ，直观展示爱因斯坦环畸变与反演像',
  },
  {
    index: 7,
    short: 'SKY ONLY',
    name: 'Lensed Stars & Milky Way Only (纯引力透镜星空与银河)',
    description: '关闭吸积盘辐射，单独检验程序化恒星场、银河尘埃带经过 Schwarzschild 度规弯曲后的透镜星弧与视界阴影',
  },
  {
    index: 8,
    short: 'PERIAPSIS',
    name: 'Closest Approach r_min & Opacity (最近逼近半径与盘光学厚度)',
    description: 'R/B 通道映射光线近点 r_min / rs，G 通道映射沿弯曲路径累积的吸积盘不透明度 (1 - T)',
  },
  {
    index: 9,
    short: 'RAW HDR',
    name: 'Pre-Post Raw HDR Radiance (后处理前原始 HDR 辐射度)',
    description: '跳过 Bloom、ACES、暗角、颗粒与色散，输出 Pass 1 原始高动态线性辐射值与超阈值高亮分布',
  },
];

export const PARAMETER_GROUPS = [
  { id: 'camera', label: '相机与时间 · Camera & Time' },
  { id: 'disk', label: '吸积盘与相对论 · Relativistic Disk' },
  { id: 'sky', label: '程序化透镜背景 · Lensed Sky' },
  { id: 'post', label: 'HDR 与镜头后处理 · Post & Optics' },
];

export const PARAMETER_DEFS = [
  {
    key: 'fov',
    group: 'camera',
    label: '视场角 (FOV)',
    unit: '°',
    min: 22,
    max: 95,
    step: 0.5,
    defaultValue: 46,
  },
  {
    key: 'camDistance',
    group: 'camera',
    label: '相机距离 (Distance)',
    unit: ' rₛ',
    min: 3.8,
    max: 40.0,
    step: 0.1,
    defaultValue: 17.8,
  },
  {
    key: 'camAzimuth',
    group: 'camera',
    label: '相机方位角 (Azimuth)',
    unit: '°',
    min: -180,
    max: 180,
    step: 0.5,
    defaultValue: -24,
  },
  {
    key: 'camElevation',
    group: 'camera',
    label: '相机俯仰角 (Elevation)',
    unit: '°',
    min: -85,
    max: 85,
    step: 0.5,
    defaultValue: 9.2,
  },
  {
    key: 'timeScale',
    group: 'camera',
    label: '时间倍率 (Time Scale)',
    unit: '×',
    min: 0.0,
    max: 4.0,
    step: 0.05,
    defaultValue: 1.0,
  },
  {
    key: 'diskInner',
    group: 'disk',
    label: '盘内半径 (Inner Radius)',
    unit: ' rₛ',
    min: 1.6,
    max: 5.0,
    step: 0.05,
    defaultValue: 2.65,
  },
  {
    key: 'diskOuter',
    group: 'disk',
    label: '盘外半径 (Outer Radius)',
    unit: ' rₛ',
    min: 6.0,
    max: 24.0,
    step: 0.25,
    defaultValue: 14.5,
  },
  {
    key: 'diskThickness',
    group: 'disk',
    label: '盘半厚度 (Half Thickness)',
    unit: ' rₛ',
    min: 0.02,
    max: 0.6,
    step: 0.01,
    defaultValue: 0.11,
  },
  {
    key: 'diskTemp',
    group: 'disk',
    label: '盘温度 (Peak Temp)',
    unit: ' K',
    min: 2500,
    max: 14000,
    step: 100,
    defaultValue: 6400,
  },
  {
    key: 'diskIntensity',
    group: 'disk',
    label: '盘发射强度 (Emission)',
    unit: '',
    min: 0.1,
    max: 4.0,
    step: 0.05,
    defaultValue: 1.38,
  },
  {
    key: 'orbitalSpeed',
    group: 'disk',
    label: '轨道速度倍率 (Orbital β)',
    unit: '×',
    min: 0.0,
    max: 1.8,
    step: 0.05,
    defaultValue: 1.0,
  },
  {
    key: 'turbulenceAmp',
    group: 'disk',
    label: '湍流幅度 (Turbulence Amp)',
    unit: '',
    min: 0.0,
    max: 1.5,
    step: 0.02,
    defaultValue: 0.82,
  },
  {
    key: 'turbulenceSpeed',
    group: 'disk',
    label: '湍流速度 (Turbulence Rate)',
    unit: '×',
    min: 0.0,
    max: 3.0,
    step: 0.05,
    defaultValue: 1.0,
  },
  {
    key: 'diskOpacity',
    group: 'disk',
    label: '盘光学密度 (Optical Depth)',
    unit: '',
    min: 0.25,
    max: 2.5,
    step: 0.05,
    defaultValue: 1.18,
  },
  {
    key: 'starDensity',
    group: 'sky',
    label: '恒星密度 (Star Density)',
    unit: '×',
    min: 0.0,
    max: 2.5,
    step: 0.05,
    defaultValue: 1.15,
  },
  {
    key: 'galaxyBrightness',
    group: 'sky',
    label: '银河亮度 (Galaxy Radiance)',
    unit: '×',
    min: 0.0,
    max: 2.5,
    step: 0.05,
    defaultValue: 1.1,
  },
  {
    key: 'bloomStrength',
    group: 'post',
    label: 'Bloom 强度 (Bloom Gain)',
    unit: '',
    min: 0.0,
    max: 2.0,
    step: 0.02,
    defaultValue: 0.56,
  },
  {
    key: 'bloomThreshold',
    group: 'post',
    label: 'Bloom 阈值 (Threshold)',
    unit: '',
    min: 0.1,
    max: 3.5,
    step: 0.05,
    defaultValue: 0.92,
  },
  {
    key: 'exposure',
    group: 'post',
    label: '曝光度 (Exposure)',
    unit: ' EV',
    min: 0.2,
    max: 3.0,
    step: 0.02,
    defaultValue: 1.14,
  },
  {
    key: 'vignette',
    group: 'post',
    label: '暗角强度 (Vignette)',
    unit: '',
    min: 0.0,
    max: 1.0,
    step: 0.02,
    defaultValue: 0.3,
  },
  {
    key: 'filmGrain',
    group: 'post',
    label: '胶片颗粒强度 (Film Grain)',
    unit: '',
    min: 0.0,
    max: 0.25,
    step: 0.005,
    defaultValue: 0.032,
  },
  {
    key: 'chromaticAberration',
    group: 'post',
    label: '色散强度 (Dispersion)',
    unit: '',
    min: 0.0,
    max: 1.0,
    step: 0.02,
    defaultValue: 0.22,
  },
];

export const PARAM_MAP = Object.fromEntries(PARAMETER_DEFS.map((def) => [def.key, def]));

export function getDefaultParams() {
  const params = {};
  for (const def of PARAMETER_DEFS) {
    params[def.key] = def.defaultValue;
  }
  return params;
}

export function clampParam(key, rawValue) {
  const def = PARAM_MAP[key];
  if (!def) return undefined;
  const num = typeof rawValue === 'number' ? rawValue : Number(rawValue);
  if (!Number.isFinite(num)) return def.defaultValue;
  if (key === 'camAzimuth') {
    let wrapped = ((num + 180) % 360 + 360) % 360 - 180;
    if (Object.is(wrapped, -0)) wrapped = 0;
    return Math.max(def.min, Math.min(def.max, wrapped));
  }
  return Math.max(def.min, Math.min(def.max, num));
}

export function sanitizeParams(candidate = {}) {
  const defaults = getDefaultParams();
  if (!candidate || typeof candidate !== 'object') return defaults;
  const result = { ...defaults };
  for (const def of PARAMETER_DEFS) {
    if (Object.prototype.hasOwnProperty.call(candidate, def.key)) {
      result[def.key] = clampParam(def.key, candidate[def.key]);
    }
  }
  if (result.diskOuter < result.diskInner + 1.0) {
    result.diskOuter = Math.min(PARAM_MAP.diskOuter.max, result.diskInner + 1.0);
  }
  return result;
}

export function isMobileViewport() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || window.matchMedia?.('(pointer: coarse)')?.matches === true;
}

export function getDefaultQuality() {
  return isMobileViewport() ? 'standard' : 'high';
}

export function isValidQuality(value) {
  return value === 'standard' || value === 'high' || value === 'cinematic';
}

export function isValidPresetIndex(value) {
  return Number.isInteger(value) && value >= 0 && value <= 3;
}

export function isValidDebugIndex(value) {
  return Number.isInteger(value) && value >= 0 && value <= 9;
}

export function isValidSimTime(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export function parseStrictIntInRange(raw, min, max) {
  if (raw === null || raw === undefined || raw === '') return null;
  const trimmed = String(raw).trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const parsed = Number(trimmed);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

export function parseCaptureAndQueryConfig(search = typeof window !== 'undefined' ? window.location.search : '') {
  const sp = new URLSearchParams(search || '');
  const capture = sp.get('capture') === '1';

  const rawQuality = sp.get('quality');
  const hasValidQuality = rawQuality !== null && isValidQuality(rawQuality);
  const quality = hasValidQuality ? rawQuality : null;

  const parsedPreset = parseStrictIntInRange(sp.get('preset'), 0, 3);
  const parsedDebug = parseStrictIntInRange(sp.get('debug'), 0, 9);

  const rawHud = sp.get('hud');
  let hud = null;
  if (rawHud === '0') hud = false;
  else if (rawHud === '1') hud = true;

  const rawTime = sp.get('time');
  let time = null;
  if (rawTime !== null && rawTime.trim() !== '') {
    const numTime = Number(rawTime);
    if (Number.isFinite(numTime) && numTime >= 0) {
      time = numTime;
    }
  }

  return {
    capture,
    quality,
    preset: parsedPreset,
    debug: parsedDebug,
    hud,
    time,
    hasQueryOverrides:
      capture ||
      rawQuality !== null ||
      sp.has('preset') ||
      sp.has('debug') ||
      sp.has('hud') ||
      sp.has('time'),
  };
}

export function createDefaultAppState() {
  const mobile = isMobileViewport();
  return {
    schemaVersion: SCHEMA_VERSION,
    quality: getDefaultQuality(),
    preset: 0,
    debug: 0,
    hudVisible: true,
    drawerCollapsed: mobile,
    cinematicPlaying: true,
    audioEnabled: false,
    params: getDefaultParams(),
  };
}

export function loadPersistedState() {
  const base = createDefaultAppState();
  if (typeof window === 'undefined') return base;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.schemaVersion !== SCHEMA_VERSION) {
      return base;
    }
    return {
      schemaVersion: SCHEMA_VERSION,
      quality: isValidQuality(parsed.quality) ? parsed.quality : base.quality,
      preset: isValidPresetIndex(parsed.preset) ? parsed.preset : base.preset,
      debug: isValidDebugIndex(parsed.debug) ? parsed.debug : base.debug,
      hudVisible: typeof parsed.hudVisible === 'boolean' ? parsed.hudVisible : base.hudVisible,
      drawerCollapsed:
        typeof parsed.drawerCollapsed === 'boolean' ? parsed.drawerCollapsed : base.drawerCollapsed,
      cinematicPlaying:
        typeof parsed.cinematicPlaying === 'boolean'
          ? parsed.cinematicPlaying
          : base.cinematicPlaying,
      audioEnabled: false, // Never auto-start audio on reload to satisfy browser autoplay rules
      params: sanitizeParams(parsed.params),
    };
  } catch {
    return base;
  }
}

export function savePersistedState(state) {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hudVisible: state.hudVisible,
      drawerCollapsed: state.drawerCollapsed,
      cinematicPlaying: state.cinematicPlaying,
      params: sanitizeParams(state.params),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota or private-mode restrictions safely
  }
}

export function buildInitialRuntimeState() {
  const query = parseCaptureAndQueryConfig();
  // In deterministic capture=1 mode, start from clean baseline defaults before applying URL overrides
  const base = query.capture ? createDefaultAppState() : loadPersistedState();

  const quality = query.quality ?? (query.capture ? 'high' : base.quality);
  const preset = query.preset ?? (query.capture ? 0 : base.preset);
  const debug = query.debug ?? (query.capture ? 0 : base.debug);
  const hudVisible = query.hud !== null ? query.hud : base.hudVisible;

  let params = { ...base.params };
  if (query.preset !== null || query.capture) {
    const presetDef = CAMERA_PRESETS[preset] || CAMERA_PRESETS[0];
    params = {
      ...params,
      fov: presetDef.fov,
      camDistance: presetDef.camDistance,
      camAzimuth: presetDef.camAzimuth,
      camElevation: presetDef.camElevation,
    };
  }

  const initialTime = query.time !== null ? query.time : 0;
  const cinematicPlaying = query.capture ? false : base.cinematicPlaying;

  return {
    ...base,
    quality,
    preset,
    debug,
    hudVisible,
    cinematicPlaying,
    audioEnabled: false,
    capture: query.capture,
    simTime: initialTime,
    params,
  };
}

export function sphericalToCartesian(distance, azimuthDeg, elevationDeg, target = { x: 0, y: 0, z: 0 }) {
  const az = (azimuthDeg * Math.PI) / 180;
  const el = (Math.max(-89.2, Math.min(89.2, elevationDeg)) * Math.PI) / 180;
  const cosEl = Math.cos(el);
  return {
    x: target.x + distance * cosEl * Math.sin(az),
    y: target.y + distance * Math.sin(el),
    z: target.z + distance * cosEl * Math.cos(az),
  };
}

export function cartesianToSpherical(pos, target = { x: 0, y: 0, z: 0 }) {
  const dx = pos.x - target.x;
  const dy = pos.y - target.y;
  const dz = pos.z - target.z;
  const distance = Math.max(2.2, Math.hypot(dx, dy, dz));
  const elevationDeg = (Math.asin(Math.max(-1, Math.min(1, dy / distance))) * 180) / Math.PI;
  const azimuthDeg = (Math.atan2(dx, dz) * 180) / Math.PI;
  return {
    camDistance: Number(clampParam('camDistance', distance).toFixed(2)),
    camAzimuth: Number(clampParam('camAzimuth', azimuthDeg).toFixed(1)),
    camElevation: Number(clampParam('camElevation', elevationDeg).toFixed(1)),
  };
}
