// 参数模型：默认值、范围、分组、URL 解析与 localStorage 版本化持久化。

export const STORAGE_KEY = 'gargantua.schwarzschild.state.v1';
export const STATE_VERSION = 1;

export const DEFAULT_PARAMS = {
  fov: 42,
  cameraDistance: 24,
  azimuth: 0,
  elevation: 14,
  timeScale: 1,
  diskInner: 3.0,
  diskOuter: 18.0,
  diskThickness: 0.35,
  diskTemp: 9200,
  diskEmission: 2.6,
  orbitalSpeed: 1.0,
  turbAmplitude: 0.55,
  turbSpeed: 0.35,
  turbScale: 1.6,
  starDensity: 0.55,
  galaxyBrightness: 0.55,
  bloomStrength: 0.85,
  bloomThreshold: 1.1,
  exposure: 1.0,
  vignette: 0.35,
  grain: 0.025,
  chromatic: 0.6,
};

export const PARAM_GROUPS = [
  {
    id: 'camera',
    label: '相机',
    items: [
      { key: 'fov', label: '视场角 FOV', min: 18, max: 90, step: 1, unit: '°' },
      { key: 'cameraDistance', label: '相机距离', min: 6, max: 60, step: 0.5, unit: 'r_s' },
      { key: 'azimuth', label: '方位角', min: -180, max: 180, step: 1, unit: '°' },
      { key: 'elevation', label: '俯仰角', min: -75, max: 75, step: 1, unit: '°' },
    ],
  },
  {
    id: 'disk',
    label: '吸积盘',
    items: [
      { key: 'timeScale', label: '时间倍率', min: 0, max: 4, step: 0.05 },
      { key: 'diskInner', label: '盘内半径', min: 1.6, max: 8, step: 0.05, unit: 'r_s' },
      { key: 'diskOuter', label: '盘外半径', min: 6, max: 40, step: 0.5, unit: 'r_s' },
      { key: 'diskThickness', label: '盘半厚度', min: 0.02, max: 1.5, step: 0.01 },
      { key: 'diskTemp', label: '盘温度', min: 2000, max: 24000, step: 100, unit: 'K' },
      { key: 'diskEmission', label: '盘发射强度', min: 0, max: 8, step: 0.05 },
      { key: 'orbitalSpeed', label: '轨道速度倍率', min: 0, max: 3, step: 0.05 },
    ],
  },
  {
    id: 'turbulence',
    label: '湍流',
    items: [
      { key: 'turbAmplitude', label: '湍流幅度', min: 0, max: 1, step: 0.01 },
      { key: 'turbSpeed', label: '湍流速度', min: 0, max: 2, step: 0.01 },
      { key: 'turbScale', label: '湍流尺度', min: 0.3, max: 6, step: 0.05 },
    ],
  },
  {
    id: 'sky',
    label: '星空',
    items: [
      { key: 'starDensity', label: '恒星密度', min: 0, max: 1, step: 0.01 },
      { key: 'galaxyBrightness', label: '银河亮度', min: 0, max: 2, step: 0.01 },
    ],
  },
  {
    id: 'post',
    label: '后处理',
    items: [
      { key: 'bloomStrength', label: 'Bloom 强度', min: 0, max: 3, step: 0.01 },
      { key: 'bloomThreshold', label: 'Bloom 阈值', min: 0, max: 4, step: 0.01 },
      { key: 'exposure', label: '曝光度', min: 0.1, max: 4, step: 0.01 },
      { key: 'vignette', label: '暗角强度', min: 0, max: 1, step: 0.01 },
      { key: 'grain', label: '胶片颗粒', min: 0, max: 0.15, step: 0.001 },
      { key: 'chromatic', label: '色散强度', min: 0, max: 2, step: 0.01 },
    ],
  },
];

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

export const PRESETS = [
  { id: 0, name: '赤道全貌', azimuth: 0, elevation: 14, distance: 24, fov: 42 },
  { id: 1, name: '高纬俯视', azimuth: 0, elevation: 46, distance: 24, fov: 46 },
  { id: 2, name: '侧掠边缘', azimuth: 74, elevation: 4, distance: 19, fov: 54 },
  { id: 3, name: '近界特写', azimuth: 32, elevation: 16, distance: 12, fov: 60 },
];

export const DEBUG_VIEWS = [
  { id: 0, name: '最终合成', hint: 'ACES + Bloom + 暗角/颗粒/色散' },
  { id: 1, name: '步数与终止', hint: '红=落入视界 绿=逃逸 蓝=步数耗尽，亮度=步数占比' },
  { id: 2, name: '事件视界掩码', hint: '视界内纯黑，其余按最近接近半径着色' },
  { id: 3, name: '盘面交点阶次', hint: '橙=首像 绿=次像 蓝=三阶及以上' },
  { id: 4, name: '临界瞄准参数', hint: 'b/b_c 与临界值的关系，红<临界，蓝>临界' },
  { id: 5, name: '背景透镜坐标', hint: '逃逸方向直接映射为 RGB' },
  { id: 6, name: '星空与银河', hint: '未叠加盘面的程序化背景' },
  { id: 7, name: '盘面 HDR 发射', hint: '后处理前的线性 HDR（压缩显示）' },
  { id: 8, name: '穿越次数热图', hint: '同一条射线收集到的盘面穿越次数' },
  { id: 9, name: '逃逸半径', hint: '对数尺度显示射线终点半径' },
];

export function clampParam(key, value) {
  for (const group of PARAM_GROUPS) {
    for (const item of group.items) {
      if (item.key === key) {
        const num = Number(value);
        if (!Number.isFinite(num)) return DEFAULT_PARAMS[key];
        return Math.min(item.max, Math.max(item.min, num));
      }
    }
  }
  return DEFAULT_PARAMS[key];
}

export function defaultState() {
  return {
    version: STATE_VERSION,
    params: { ...DEFAULT_PARAMS },
    quality: 'high',
    preset: 0,
    debug: 0,
    hudOpen: true,
    cinematic: true,
  };
}

// 读取并校验持久化状态：任何字段缺失或非法都回退到默认值，而不是抛错。
export function loadState() {
  const base = defaultState();
  let raw = null;
  try {
    raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null');
  } catch {
    return base;
  }
  if (!raw || typeof raw !== 'object' || raw.version !== STATE_VERSION) return base;

  if (raw.params && typeof raw.params === 'object') {
    for (const key of Object.keys(DEFAULT_PARAMS)) {
      if (key in raw.params) base.params[key] = clampParam(key, raw.params[key]);
    }
  }
  if (QUALITY_ORDER.includes(raw.quality)) base.quality = raw.quality;
  if (Number.isInteger(raw.preset) && raw.preset >= 0 && raw.preset < PRESETS.length) base.preset = raw.preset;
  if (Number.isInteger(raw.debug) && raw.debug >= 0 && raw.debug < DEBUG_VIEWS.length) base.debug = raw.debug;
  if (typeof raw.hudOpen === 'boolean') base.hudOpen = raw.hudOpen;
  if (typeof raw.cinematic === 'boolean') base.cinematic = raw.cinematic;
  return base;
}

export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, version: STATE_VERSION }));
  } catch {
    // 隐私模式下 localStorage 可能不可写；持久化失败不影响渲染。
  }
}

// URL 契约：?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
export function parseUrlState(search) {
  const query = new URLSearchParams(search);
  const result = {
    capture: query.get('capture') === '1',
    quality: null,
    preset: null,
    debug: null,
    hud: null,
    time: 0,
    hasTime: false,
    rejected: [],
  };

  const quality = query.get('quality');
  if (quality !== null) {
    if (QUALITY_ORDER.includes(quality)) result.quality = quality;
    else result.rejected.push('quality');
  }

  for (const key of ['preset', 'debug']) {
    const value = query.get(key);
    if (value === null) continue;
    const num = Number(value);
    const max = key === 'preset' ? PRESETS.length - 1 : DEBUG_VIEWS.length - 1;
    if (Number.isInteger(num) && num >= 0 && num <= max) result[key] = num;
    else result.rejected.push(key);
  }

  const hud = query.get('hud');
  if (hud !== null) {
    if (hud === '0' || hud === '1') result.hud = hud === '1';
    else result.rejected.push('hud');
  }

  const time = query.get('time');
  if (time !== null) {
    const num = Number(time);
    if (Number.isFinite(num) && num >= 0) {
      result.time = num;
      result.hasTime = true;
    } else {
      result.rejected.push('time');
    }
  }

  return result;
}

export function presetToParams(preset, current) {
  const p = PRESETS[preset] ?? PRESETS[0];
  return {
    ...current,
    azimuth: p.azimuth,
    elevation: p.elevation,
    cameraDistance: p.distance,
    fov: p.fov,
  };
}
