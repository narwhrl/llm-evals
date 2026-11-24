export const STORAGE_KEY = 'gargantua.raytracer.state';
export const STORAGE_VERSION = 1;

export const QUALITY_LEVELS = ['standard', 'high', 'cinematic'];

export const QUALITY_PROFILES = {
  standard: {
    id: 'standard',
    label: 'Standard',
    zhLabel: '标准',
    description: '高帧率均衡预算（适合移动端与轻量 GPU）',
    renderScale: 0.65,
    maxDpr: 1.5,
    maxSteps: 140,
    stepScale: 0.088,
    diskSubSamples: 3,
    fbmOctaves: 3,
    starLayers: 2,
    bloomMips: 3,
  },
  high: {
    id: 'high',
    label: 'High',
    zhLabel: '高清',
    description: '高精测地线与清晰光子环（桌面默认）',
    renderScale: 0.85,
    maxDpr: 2.0,
    maxSteps: 220,
    stepScale: 0.058,
    diskSubSamples: 5,
    fbmOctaves: 4,
    starLayers: 3,
    bloomMips: 4,
  },
  cinematic: {
    id: 'cinematic',
    label: 'Cinematic',
    zhLabel: '电影级',
    description: '全分辨 RK4 精步进、高阶盘像与 5 级 HDR Bloom',
    renderScale: 1.0,
    maxDpr: 2.0,
    maxSteps: 320,
    stepScale: 0.042,
    diskSubSamples: 7,
    fbmOctaves: 5,
    starLayers: 4,
    bloomMips: 5,
  },
};

export const PRESETS = [
  {
    index: 0,
    id: 'hero',
    name: 'Gargantua Hero',
    zhName: '经典全貌',
    description: '近赤道经典星际构图，同时呈现前后盘面、上下透镜拱与光子环',
    camera: {
      fov: 45,
      cameraDistance: 22.5,
      cameraAzimuth: 18,
      cameraElevation: 9.5,
    },
  },
  {
    index: 1,
    id: 'photon-grazing',
    name: 'Photon Ring Grazing',
    zhName: '光子环掠影',
    description: '近距离低仰角切入，聚焦临界捕获边界、多阶光子环与强 Doppler 不对称',
    camera: {
      fov: 52,
      cameraDistance: 12.8,
      cameraAzimuth: -30,
      cameraElevation: 3.5,
    },
  },
  {
    index: 2,
    id: 'polar-vortex',
    name: 'Polar Vortex',
    zhName: '极轴俯瞰',
    description: '高倾角俯视开普勒差动旋转湍流、ISCO 内缘与环形光子圈',
    camera: {
      fov: 45,
      cameraDistance: 23.0,
      cameraAzimuth: 52,
      cameraElevation: 68,
    },
  },
  {
    index: 3,
    id: 'einstein-wide',
    name: 'Einstein Wide Field',
    zhName: '广域爱因斯坦透镜',
    description: '大视场南半球仰角，突出弯曲银河带与爱因斯坦环星空弧',
    camera: {
      fov: 56,
      cameraDistance: 28.5,
      cameraAzimuth: -118,
      cameraElevation: -22,
    },
  },
];

export const DEBUG_MODES = [
  {
    index: 0,
    shortName: 'Final',
    name: '最终合成画面',
    description: '完整 Schwarzschild 零测地线 HDR 渲染 + Bloom + ACES + 镜头后处理',
  },
  {
    index: 1,
    shortName: 'Steps',
    name: '射线步进与终止状态',
    description: 'RK4 积分步数热力图（蓝→青→黄）与终止类型（深红=事件视界捕获，白=临界高阶轨道）',
  },
  {
    index: 2,
    shortName: 'Horizon',
    name: '事件视界与临界捕获掩码',
    description: '事件视界捕获区、临界光子球等值线（b/b_crit）与最小近心距 r_min 诊断',
  },
  {
    index: 3,
    shortName: 'Crossings',
    name: '盘面交点与成像阶次',
    description: '弯曲路径穿越赤道盘次数：青=1次主像，金=2次次级像，品红/白=3+次高阶光子环像',
  },
  {
    index: 4,
    shortName: 'Redshift',
    name: '红移与 Doppler 频移 g',
    description: '综合频移因子 g = g_grav · D（蓝=趋近蓝移增亮，白=中性，红橙=退行与引力红移）',
  },
  {
    index: 5,
    shortName: 'Deflect',
    name: '引力偏折角与绕转角',
    description: '光线总偏折角与绕黑洞累计方位角，直观呈现爱因斯坦环与光子球发散',
  },
  {
    index: 6,
    shortName: 'SkyCoord',
    name: '背景透镜天球坐标',
    description: '逃逸射线最终天球经纬网格与方位编码，验证引力透镜畸变与反像翻转',
  },
  {
    index: 7,
    shortName: 'Cosmos',
    name: '程序化星空与银河孤立层',
    description: '隐藏吸积盘，单独显示经零测地线弯曲映射的程序化星空、爱因斯坦弧与银河带',
  },
  {
    index: 8,
    shortName: 'DiskRest',
    name: '盘面静止系温度与湍流',
    description: '关闭 Doppler 增亮/引力红移与背景，检验盘面本征黑体温度梯度与差动湍流',
  },
  {
    index: 9,
    shortName: 'HDR Raw',
    name: '后处理前线性 HDR 辐射度',
    description: '后处理前线性亮度 EV 分级伪彩（灰=<1 LDR，绿=>1，黄=>2，橙=>4，品红=>8 HDR）',
  },
];

export const PARAM_GROUPS = [
  { id: 'camera', title: '相机与时钟', enTitle: 'Camera & Time' },
  { id: 'disk', title: '吸积盘物理', enTitle: 'Accretion Disk' },
  { id: 'sky', title: '程序化天球', enTitle: 'Lensed Cosmos' },
  { id: 'post', title: 'HDR 与镜头后处理', enTitle: 'HDR & Optics' },
];

export const PARAMETER_SPECS = [
  // Camera & Time (1-5)
  {
    key: 'fov',
    group: 'camera',
    label: '视场角 (FOV)',
    unit: '°',
    min: 25,
    max: 85,
    step: 0.5,
    defaultValue: 45,
    decimals: 1,
  },
  {
    key: 'cameraDistance',
    group: 'camera',
    label: '相机距离',
    unit: 'rₛ',
    min: 6.5,
    max: 40.0,
    step: 0.1,
    defaultValue: 22.5,
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
    defaultValue: 18,
    decimals: 1,
  },
  {
    key: 'cameraElevation',
    group: 'camera',
    label: '相机俯仰角',
    unit: '°',
    min: -82,
    max: 82,
    step: 0.5,
    defaultValue: 9.5,
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

  // Accretion Disk (6-13)
  {
    key: 'diskInnerRadius',
    group: 'disk',
    label: '盘内半径',
    unit: 'rₛ',
    min: 1.6,
    max: 6.0,
    step: 0.05,
    defaultValue: 2.6,
    decimals: 2,
  },
  {
    key: 'diskOuterRadius',
    group: 'disk',
    label: '盘外半径',
    unit: 'rₛ',
    min: 6.5,
    max: 24.0,
    step: 0.1,
    defaultValue: 12.2,
    decimals: 1,
  },
  {
    key: 'diskHalfThickness',
    group: 'disk',
    label: '盘半厚度',
    unit: 'rₛ',
    min: 0.03,
    max: 1.2,
    step: 0.01,
    defaultValue: 0.17,
    decimals: 2,
  },
  {
    key: 'diskTemperature',
    group: 'disk',
    label: '盘温度',
    unit: 'K',
    min: 2200,
    max: 14000,
    step: 50,
    defaultValue: 5800,
    decimals: 0,
  },
  {
    key: 'diskEmission',
    group: 'disk',
    label: '盘发射强度',
    unit: '',
    min: 0.2,
    max: 4.5,
    step: 0.05,
    defaultValue: 1.35,
    decimals: 2,
  },
  {
    key: 'orbitalSpeedScale',
    group: 'disk',
    label: '轨道速度倍率',
    unit: '×',
    min: 0.0,
    max: 2.0,
    step: 0.05,
    defaultValue: 1.0,
    decimals: 2,
  },
  {
    key: 'turbulenceAmp',
    group: 'disk',
    label: '湍流幅度',
    unit: '',
    min: 0.0,
    max: 1.5,
    step: 0.02,
    defaultValue: 0.85,
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

  // Procedural Cosmos (14-15)
  {
    key: 'starDensity',
    group: 'sky',
    label: '恒星密度',
    unit: '',
    min: 0.0,
    max: 2.5,
    step: 0.05,
    defaultValue: 1.15,
    decimals: 2,
  },
  {
    key: 'galaxyBrightness',
    group: 'sky',
    label: '银河亮度',
    unit: '',
    min: 0.0,
    max: 3.0,
    step: 0.05,
    defaultValue: 1.15,
    decimals: 2,
  },

  // HDR & Optics (16-21)
  {
    key: 'bloomIntensity',
    group: 'post',
    label: 'Bloom 强度',
    unit: '',
    min: 0.0,
    max: 2.0,
    step: 0.02,
    defaultValue: 0.44,
    decimals: 2,
  },
  {
    key: 'bloomThreshold',
    group: 'post',
    label: 'Bloom 阈值',
    unit: '',
    min: 0.1,
    max: 3.5,
    step: 0.05,
    defaultValue: 1.15,
    decimals: 2,
  },
  {
    key: 'exposure',
    group: 'post',
    label: '曝光度',
    unit: '',
    min: 0.25,
    max: 3.0,
    step: 0.02,
    defaultValue: 1.04,
    decimals: 2,
  },
  {
    key: 'vignetteIntensity',
    group: 'post',
    label: '暗角强度',
    unit: '',
    min: 0.0,
    max: 1.2,
    step: 0.02,
    defaultValue: 0.34,
    decimals: 2,
  },
  {
    key: 'grainIntensity',
    group: 'post',
    label: '胶片颗粒强度',
    unit: '',
    min: 0.0,
    max: 0.15,
    step: 0.002,
    defaultValue: 0.018,
    decimals: 3,
  },
  {
    key: 'chromaticAberration',
    group: 'post',
    label: '色散强度',
    unit: '',
    min: 0.0,
    max: 1.5,
    step: 0.02,
    defaultValue: 0.22,
    decimals: 2,
  },
];

export const PARAM_SPEC_MAP = Object.fromEntries(
  PARAMETER_SPECS.map((spec) => [spec.key, spec])
);

export function createDefaultParams() {
  const params = {};
  for (const spec of PARAMETER_SPECS) {
    params[spec.key] = spec.defaultValue;
  }
  return params;
}

export function clampParam(key, value) {
  const spec = PARAM_SPEC_MAP[key];
  if (!spec) return value;
  const num = Number(value);
  if (!Number.isFinite(num)) return spec.defaultValue;
  return Math.min(spec.max, Math.max(spec.min, num));
}

export function sanitizeParams(input = {}) {
  const result = createDefaultParams();
  if (input && typeof input === 'object') {
    for (const spec of PARAMETER_SPECS) {
      if (Object.prototype.hasOwnProperty.call(input, spec.key)) {
        result[spec.key] = clampParam(spec.key, input[spec.key]);
      }
    }
  }
  // Ensure outer radius stays physically outside inner radius
  if (result.diskOuterRadius < result.diskInnerRadius + 1.0) {
    result.diskOuterRadius = Math.min(
      PARAM_SPEC_MAP.diskOuterRadius.max,
      result.diskInnerRadius + 1.0
    );
  }
  return result;
}

export function createDefaultState(isMobileViewport = false) {
  return {
    quality: isMobileViewport ? 'standard' : 'high',
    preset: 0,
    debugMode: 0,
    hudVisible: true,
    hudExpanded: !isMobileViewport,
    cinematicMode: true,
    audioEnabled: false,
    params: createDefaultParams(),
  };
}

export const KEYBOARD_SHORTCUTS = [
  { keys: '0 – 9', label: '切换调试视图' },
  { keys: 'Shift + 1–4', label: '切换视角预设' },
  { keys: 'Space', label: '播放 / 暂停电影镜头' },
  { keys: 'H', label: '显示 / 隐藏 HUD' },
  { keys: 'Q', label: '循环切换质量档' },
  { keys: 'R', label: '重置全部参数' },
  { keys: 'M', label: '切换程序化氛围音频' },
];
