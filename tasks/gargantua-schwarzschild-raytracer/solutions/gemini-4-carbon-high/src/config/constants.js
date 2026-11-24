export const STORAGE_KEY = 'gargantua.state.v1';
export const SCHEMA_VERSION = 1;

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

export const QUALITY_PROFILES = {
  standard: {
    id: 'standard',
    label: 'Standard',
    zhLabel: '标准',
    renderScale: 0.72,
    maxDpr: 1.25,
    maxSteps: 150,
    stepScale: 1.22,
    diskSubSamples: 2,
    bloomLevels: 3,
    starOctaves: 2,
  },
  high: {
    id: 'high',
    label: 'High',
    zhLabel: '高画质',
    renderScale: 0.92,
    maxDpr: 1.75,
    maxSteps: 240,
    stepScale: 0.88,
    diskSubSamples: 3,
    bloomLevels: 4,
    starOctaves: 3,
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinematic',
    zhLabel: '电影级',
    renderScale: 1.0,
    maxDpr: 2.0,
    maxSteps: 360,
    stepScale: 0.62,
    diskSubSamples: 4,
    bloomLevels: 5,
    starOctaves: 4,
  },
};

export const CAMERA_PRESETS = [
  {
    index: 0,
    shortcut: 'Shift+1',
    name: '卡冈图雅视界',
    enName: 'Gargantua Horizon',
    summary: '低倾角全景构图：前景吸积盘横贯视界阴影，上下次级透镜拱弧与光子环完整对称',
    fov: 46,
    cameraDistance: 22.5,
    cameraAzimuth: -28,
    cameraElevation: 9.5,
  },
  {
    index: 1,
    shortcut: 'Shift+2',
    name: '光子球掠影',
    enName: 'Photon Ring Graze',
    summary: '抵近内稳定圆轨道与临界捕获边界，呈现强烈相对论多普勒蓝移与高阶光子子环',
    fov: 56,
    cameraDistance: 7.4,
    cameraAzimuth: 36,
    cameraElevation: 5.2,
  },
  {
    index: 2,
    shortcut: 'Shift+3',
    name: '高纬天顶漩涡',
    enName: 'Zenith Accretion Vortex',
    summary: '高俯仰角俯视开普勒差速剪切湍流螺旋臂与视界边缘内侧的次级底面像',
    fov: 45,
    cameraDistance: 21.0,
    cameraAzimuth: 118,
    cameraElevation: 56.0,
  },
  {
    index: 3,
    shortcut: 'Shift+4',
    name: '赤道下仰视环',
    enName: 'Sub-Disk Einstein Arc',
    summary: '自盘面南半球仰望银心星云，观测反转的上下透镜拱与背景爱因斯坦星环',
    fov: 50,
    cameraDistance: 25.5,
    cameraAzimuth: -144,
    cameraElevation: -15.5,
  },
];

export const DEBUG_VIEWS = [
  {
    index: 0,
    key: '0',
    name: '最终合成画面',
    enName: 'Final Relativistic Composite',
    description: '完整零测地线光线追踪 + 多尺度 HDR Bloom + ACES RRT/ODT 色调映射与镜头后处理',
  },
  {
    index: 1,
    key: '1',
    name: '测地线步进与终止诊断',
    enName: 'Geodesic Steps & Termination',
    description: 'RK4 积分步数热力分布（青蓝=逃逸无穷远，高亮金=临界光子轨道缠绕，深红核=落入事件视界）',
  },
  {
    index: 2,
    key: '2',
    name: '事件视界掩码与碰撞参数',
    enName: 'Horizon Mask & Impact Parameter',
    description: '纯黑区域为事件视界捕获掩码（r ≤ rs），外围等值线展示碰撞参数比 b / b_crit 与最近点 r_min',
  },
  {
    index: 3,
    key: '3',
    name: '盘面穿越阶次（首像/高阶像）',
    enName: 'Disk Crossings & Image Order',
    description: '弯曲测地线按路径顺序命中吸积盘次数：青色=首级像(n=1)，琥珀金=次级透镜拱(n=2)，洋红白=高阶光子环(n≥3)',
  },
  {
    index: 4,
    key: '4',
    name: '多普勒增亮与引力红移因子 g',
    enName: 'Doppler & Gravitational Redshift g',
    description: '观测频率比 g = ν_obs / ν_emit：亮蓝白表示朝向观测者蓝移增亮(g>1)，橙红至暗红表示背离与强引力红移(g<1)',
  },
  {
    index: 5,
    key: '5',
    name: '盘面本征温度与螺旋湍流',
    enName: 'Intrinsic Disk Temp & MRI Turbulence',
    description: '剥离多普勒与后处理，直接检视 Page–Thorne 径向温度梯度与开普勒差速剪切螺旋湍流密度场',
  },
  {
    index: 6,
    key: '6',
    name: '背景透镜天球坐标与偏折角',
    enName: 'Lensed Celestial UV & Deflection',
    description: '无穷远出射方向天球经纬网格与总引力偏折角，直观呈现爱因斯坦环反转映射与空间弯曲',
  },
  {
    index: 7,
    key: '7',
    name: '程序化星空与银河透镜层',
    enName: 'Procedural Lensed Stars & Galaxy',
    description: '隐藏吸积盘辐射，单独审视程序化多星等恒星场、银河尘埃带在视界外围的引力透镜畸变与星环',
  },
  {
    index: 8,
    key: '8',
    name: '后处理前线性 HDR 辐射值',
    enName: 'Pre-Postprocess Linear HDR Radiance',
    description: '未经 Bloom、ACES 色调映射与暗角处理的原始线性 HDR 辐射度（以对数档位与 >1.0 超亮等高线标示动态范围）',
  },
  {
    index: 9,
    key: '9',
    name: '吸积盘光学厚度与透射率',
    enName: 'Disk Optical Depth & Opacity (1 - T)',
    description: '沿弯曲路径累积的辐射传输不透明度 1 - exp(-τ) 与盘半厚度垂向分层结构响应',
  },
];

export const PARAM_GROUPS = [
  { id: 'camera', label: '相机与时间', enLabel: 'Camera & Time' },
  { id: 'disk', label: '吸积盘物理', enLabel: 'Accretion Disk' },
  { id: 'sky', label: '深空背景', enLabel: 'Procedural Sky' },
  { id: 'post', label: '光学与后处理', enLabel: 'Optics & Post' },
];

export const PARAM_DEFS = [
  {
    key: 'fov',
    group: 'camera',
    label: '视场角 (FOV)',
    unit: '°',
    min: 24,
    max: 85,
    step: 1,
    defaultValue: CAMERA_PRESETS[0].fov,
    decimals: 0,
  },
  {
    key: 'cameraDistance',
    group: 'camera',
    label: '相机距离',
    unit: ' rs',
    min: 2.8,
    max: 42.0,
    step: 0.1,
    defaultValue: CAMERA_PRESETS[0].cameraDistance,
    decimals: 1,
  },
  {
    key: 'cameraAzimuth',
    group: 'camera',
    label: '相机方位角',
    unit: '°',
    min: -180,
    max: 180,
    step: 0.5,
    defaultValue: CAMERA_PRESETS[0].cameraAzimuth,
    decimals: 1,
  },
  {
    key: 'cameraElevation',
    group: 'camera',
    label: '相机俯仰角',
    unit: '°',
    min: -85,
    max: 85,
    step: 0.5,
    defaultValue: CAMERA_PRESETS[0].cameraElevation,
    decimals: 1,
  },
  {
    key: 'timeScale',
    group: 'camera',
    label: '时间倍率',
    unit: '×',
    min: 0.0,
    max: 4.0,
    step: 0.05,
    defaultValue: 1.0,
    decimals: 2,
  },
  {
    key: 'diskInnerRadius',
    group: 'disk',
    label: '盘内半径',
    unit: ' rs',
    min: 1.6,
    max: 6.0,
    step: 0.05,
    defaultValue: 3.0,
    decimals: 2,
  },
  {
    key: 'diskOuterRadius',
    group: 'disk',
    label: '盘外半径',
    unit: ' rs',
    min: 6.5,
    max: 28.0,
    step: 0.25,
    defaultValue: 12.5,
    decimals: 2,
  },
  {
    key: 'diskHalfThickness',
    group: 'disk',
    label: '盘半厚度',
    unit: ' rs',
    min: 0.02,
    max: 0.8,
    step: 0.01,
    defaultValue: 0.16,
    decimals: 2,
  },
  {
    key: 'diskTemperature',
    group: 'disk',
    label: '盘温度',
    unit: ' K',
    min: 2500,
    max: 14000,
    step: 100,
    defaultValue: 6400,
    decimals: 0,
  },
  {
    key: 'diskIntensity',
    group: 'disk',
    label: '盘发射强度',
    unit: '',
    min: 0.1,
    max: 4.0,
    step: 0.05,
    defaultValue: 1.38,
    decimals: 2,
  },
  {
    key: 'orbitalSpeedScale',
    group: 'disk',
    label: '轨道速度倍率',
    unit: '×',
    min: 0.0,
    max: 1.8,
    step: 0.05,
    defaultValue: 1.0,
    decimals: 2,
  },
  {
    key: 'turbulenceAmplitude',
    group: 'disk',
    label: '湍流幅度',
    unit: '',
    min: 0.0,
    max: 1.5,
    step: 0.02,
    defaultValue: 0.82,
    decimals: 2,
  },
  {
    key: 'turbulenceSpeed',
    group: 'disk',
    label: '湍流速度',
    unit: '×',
    min: 0.0,
    max: 3.0,
    step: 0.05,
    defaultValue: 1.0,
    decimals: 2,
  },
  {
    key: 'starDensity',
    group: 'sky',
    label: '恒星密度',
    unit: '×',
    min: 0.0,
    max: 2.5,
    step: 0.05,
    defaultValue: 1.0,
    decimals: 2,
  },
  {
    key: 'galaxyBrightness',
    group: 'sky',
    label: '银河亮度',
    unit: '×',
    min: 0.0,
    max: 2.5,
    step: 0.05,
    defaultValue: 1.05,
    decimals: 2,
  },
  {
    key: 'bloomStrength',
    group: 'post',
    label: 'Bloom 强度',
    unit: '',
    min: 0.0,
    max: 2.0,
    step: 0.02,
    defaultValue: 0.52,
    decimals: 2,
  },
  {
    key: 'bloomThreshold',
    group: 'post',
    label: 'Bloom 阈值',
    unit: '',
    min: 0.1,
    max: 3.0,
    step: 0.05,
    defaultValue: 0.85,
    decimals: 2,
  },
  {
    key: 'exposure',
    group: 'post',
    label: '曝光度',
    unit: '',
    min: 0.2,
    max: 2.8,
    step: 0.02,
    defaultValue: 1.06,
    decimals: 2,
  },
  {
    key: 'vignetteStrength',
    group: 'post',
    label: '暗角强度',
    unit: '',
    min: 0.0,
    max: 1.0,
    step: 0.02,
    defaultValue: 0.32,
    decimals: 2,
  },
  {
    key: 'filmGrainStrength',
    group: 'post',
    label: '胶片颗粒强度',
    unit: '',
    min: 0.0,
    max: 0.25,
    step: 0.005,
    defaultValue: 0.03,
    decimals: 3,
  },
  {
    key: 'chromaticAberration',
    group: 'post',
    label: '色散强度',
    unit: '',
    min: 0.0,
    max: 1.0,
    step: 0.02,
    defaultValue: 0.22,
    decimals: 2,
  },
];

export const PARAM_MAP = Object.fromEntries(PARAM_DEFS.map((d) => [d.key, d]));

export const SHORTCUT_LIST = [
  { keys: '0 – 9', action: '切换调试与合成视图' },
  { keys: 'Shift + 1 – 4', action: '切换四个相机预设' },
  { keys: 'Space', action: '播放 / 暂停电影镜头循环' },
  { keys: 'H', action: '显示 / 隐藏 HUD 面板' },
  { keys: 'Q', action: '循环切换渲染质量档位' },
  { keys: 'R', action: '重置全部参数与视角' },
  { keys: 'M', action: '开关程序化深空环境音效' },
];

export function createDefaultParams() {
  const params = {};
  for (const def of PARAM_DEFS) {
    params[def.key] = def.defaultValue;
  }
  return params;
}

export function sanitizeParamValue(key, rawValue) {
  const def = PARAM_MAP[key];
  if (!def) return undefined;
  const num = Number(rawValue);
  if (!Number.isFinite(num)) return def.defaultValue;
  return Math.min(def.max, Math.max(def.min, num));
}

export function sanitizeParams(rawParams) {
  const clean = createDefaultParams();
  if (rawParams && typeof rawParams === 'object') {
    for (const def of PARAM_DEFS) {
      if (Object.prototype.hasOwnProperty.call(rawParams, def.key)) {
        clean[def.key] = sanitizeParamValue(def.key, rawParams[def.key]);
      }
    }
  }
  if (clean.diskOuterRadius < clean.diskInnerRadius + 0.5) {
    clean.diskOuterRadius = Math.min(
      PARAM_MAP.diskOuterRadius.max,
      Math.max(PARAM_MAP.diskOuterRadius.min, clean.diskInnerRadius + 0.5),
    );
  }
  return clean;
}

export function createDefaultAppState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    quality: 'high',
    preset: 0,
    debug: 0,
    hudVisible: true,
    cinematicPlaying: true,
    audioEnabled: false,
    captureMode: false,
    time: 0,
    params: createDefaultParams(),
  };
}

export function isValidQuality(val) {
  return typeof val === 'string' && Object.prototype.hasOwnProperty.call(QUALITY_PROFILES, val);
}

export function isValidPresetIndex(val) {
  return Number.isInteger(val) && val >= 0 && val < CAMERA_PRESETS.length;
}

export function isValidDebugIndex(val) {
  return Number.isInteger(val) && val >= 0 && val < DEBUG_VIEWS.length;
}

export function isValidTimeSeconds(val) {
  return typeof val === 'number' && Number.isFinite(val) && val >= 0;
}

function parseStrictIntInRange(raw, min, max) {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const parsed = Number(trimmed);
  if (!Number.isSafeInteger(parsed) || parsed < min || parsed > max) return null;
  return parsed;
}

export function parseUrlQueryOverrides(search = window.location.search) {
  const sp = new URLSearchParams(search || '');
  const captureMode = sp.get('capture') === '1';

  const rawQuality = sp.get('quality');
  const quality = rawQuality !== null && isValidQuality(rawQuality) ? rawQuality : null;

  const preset = sp.has('preset')
    ? parseStrictIntInRange(sp.get('preset'), 0, CAMERA_PRESETS.length - 1)
    : null;

  const debug = sp.has('debug')
    ? parseStrictIntInRange(sp.get('debug'), 0, DEBUG_VIEWS.length - 1)
    : null;

  let hud = null;
  if (sp.has('hud')) {
    const rawHud = sp.get('hud');
    if (rawHud === '0') hud = false;
    else if (rawHud === '1') hud = true;
  }

  let time = null;
  if (sp.has('time')) {
    const rawTime = sp.get('time');
    if (typeof rawTime === 'string' && rawTime.trim() !== '') {
      const num = Number(rawTime);
      if (Number.isFinite(num) && num >= 0) {
        time = num;
      }
    }
  }

  return {
    captureMode,
    quality,
    preset,
    debug,
    hud,
    time,
    hasAnyUrlParam: sp.size > 0,
  };
}

export function loadInitialAppState(search = window.location.search) {
  const base = createDefaultAppState();
  const url = parseUrlQueryOverrides(search);

  // In non-capture interactive sessions, restore versioned state from localStorage first.
  if (!url.captureMode) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.schemaVersion === SCHEMA_VERSION) {
          if (isValidQuality(parsed.quality)) base.quality = parsed.quality;
          if (isValidPresetIndex(parsed.preset)) base.preset = parsed.preset;
          if (isValidDebugIndex(parsed.debug)) base.debug = parsed.debug;
          if (typeof parsed.hudVisible === 'boolean') base.hudVisible = parsed.hudVisible;
          if (typeof parsed.cinematicPlaying === 'boolean') {
            base.cinematicPlaying = parsed.cinematicPlaying;
          }
          base.params = sanitizeParams(parsed.params);
        }
      }
    } catch {
      // Ignore storage access errors (private browsing or corrupted JSON) and fall back safely.
    }
  }

  // Apply validated URL query overrides; invalid values fall back cleanly to defaults/base.
  if (url.quality !== null) {
    base.quality = url.quality;
  } else if (url.captureMode) {
    base.quality = 'high';
  }

  if (url.preset !== null) {
    base.preset = url.preset;
    const p = CAMERA_PRESETS[url.preset];
    base.params.fov = p.fov;
    base.params.cameraDistance = p.cameraDistance;
    base.params.cameraAzimuth = p.cameraAzimuth;
    base.params.cameraElevation = p.cameraElevation;
    base.cinematicPlaying = false;
  } else if (url.captureMode) {
    base.preset = 0;
    const p = CAMERA_PRESETS[0];
    base.params.fov = p.fov;
    base.params.cameraDistance = p.cameraDistance;
    base.params.cameraAzimuth = p.cameraAzimuth;
    base.params.cameraElevation = p.cameraElevation;
  }

  if (url.debug !== null) {
    base.debug = url.debug;
  } else if (url.captureMode) {
    base.debug = 0;
  }

  if (url.hud !== null) {
    base.hudVisible = url.hud;
  } else if (url.captureMode) {
    base.hudVisible = true;
  }

  if (url.captureMode) {
    base.captureMode = true;
    base.cinematicPlaying = false;
    base.audioEnabled = false;
    base.time = url.time !== null ? url.time : 0;
  } else if (url.time !== null) {
    base.time = url.time;
  }

  return base;
}

export function savePersistedAppState(state) {
  if (!state || state.captureMode) return;
  try {
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      quality: state.quality,
      preset: state.preset,
      debug: state.debug,
      hudVisible: state.hudVisible,
      cinematicPlaying: state.cinematicPlaying,
      params: sanitizeParams(state.params),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota or sandbox restrictions safely.
  }
}

export function clearPersistedAppState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors safely.
  }
}
