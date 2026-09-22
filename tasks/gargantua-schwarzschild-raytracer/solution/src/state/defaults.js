// 全部可配置状态的唯一定义表：参数（21 项）、视角预设、质量档预算、调试视图。
// 世界单位 = 史瓦西半径 RS = 1。

export const PARAM_DEFS = [
  // 相机镜头
  { key: 'fov', label: '视场角 FOV', group: '相机镜头', min: 20, max: 100, step: 1, default: 60, unit: '°' },
  { key: 'camDist', label: '相机距离', group: '相机镜头', min: 5.5, max: 60, step: 0.1, default: 16, unit: 'rs' },
  { key: 'camAzimuth', label: '相机方位角', group: '相机镜头', min: 0, max: 360, step: 1, default: 0, unit: '°' },
  { key: 'camElevation', label: '相机俯仰角', group: '相机镜头', min: -85, max: 85, step: 1, default: 10, unit: '°' },
  { key: 'timeScale', label: '时间倍率', group: '相机镜头', min: 0, max: 5, step: 0.05, default: 1.0, unit: '×' },
  // 吸积盘
  { key: 'diskInner', label: '盘内半径', group: '吸积盘', min: 2.5, max: 10, step: 0.1, default: 3.0, unit: 'rs' },
  { key: 'diskOuter', label: '盘外半径', group: '吸积盘', min: 6, max: 30, step: 0.1, default: 12.0, unit: 'rs' },
  { key: 'diskThickness', label: '盘半厚度', group: '吸积盘', min: 0.02, max: 1.5, step: 0.01, default: 0.25, unit: 'rs' },
  { key: 'diskTemp', label: '盘温度', group: '吸积盘', min: 0.3, max: 2.5, step: 0.05, default: 1.0, unit: '×' },
  { key: 'diskEmission', label: '盘发射强度', group: '吸积盘', min: 0, max: 5, step: 0.05, default: 1.5, unit: '' },
  { key: 'orbitSpeed', label: '轨道速度倍率', group: '吸积盘', min: 0, max: 2, step: 0.05, default: 1.0, unit: '×' },
  { key: 'turbAmp', label: '湍流幅度', group: '吸积盘', min: 0, max: 1, step: 0.01, default: 0.55, unit: '' },
  { key: 'turbSpeed', label: '湍流速度', group: '吸积盘', min: 0, max: 3, step: 0.05, default: 1.0, unit: '×' },
  // 背景
  { key: 'starDensity', label: '恒星密度', group: '背景', min: 0, max: 3, step: 0.05, default: 1.0, unit: '×' },
  { key: 'galaxyBright', label: '银河亮度', group: '背景', min: 0, max: 3, step: 0.05, default: 0.6, unit: '×' },
  // 后处理
  { key: 'bloomStrength', label: 'Bloom 强度', group: '后处理', min: 0, max: 2.5, step: 0.05, default: 0.7, unit: '' },
  { key: 'bloomThreshold', label: 'Bloom 阈值', group: '后处理', min: 0, max: 2, step: 0.05, default: 0.85, unit: '' },
  { key: 'exposure', label: '曝光度', group: '后处理', min: 0.1, max: 3, step: 0.05, default: 1.1, unit: '×' },
  { key: 'vignette', label: '暗角强度', group: '后处理', min: 0, max: 1, step: 0.01, default: 0.35, unit: '' },
  { key: 'grain', label: '胶片颗粒强度', group: '后处理', min: 0, max: 0.6, step: 0.01, default: 0.12, unit: '' },
  { key: 'chroma', label: '色散强度', group: '后处理', min: 0, max: 1, step: 0.01, default: 0.25, unit: '' },
];

export const PARAM_KEYS = PARAM_DEFS.map((d) => d.key);

export const DEFAULT_PARAMS = Object.fromEntries(PARAM_DEFS.map((d) => [d.key, d.default]));

export const PARAM_GROUPS = ['相机镜头', '吸积盘', '背景', '后处理'];

// 视角预设：仅相机四元组（距离 rs、方位角°、俯仰角°、FOV°）
export const PRESETS = [
  { name: '视界边缘 Horizon Edge', camDist: 16, camAzimuth: 0, camElevation: 10, fov: 60 },
  { name: '极区俯瞰 Polar Descent', camDist: 20, camAzimuth: 30, camElevation: 68, fov: 55 },
  { name: '光子环特写 Photon Ring Macro', camDist: 8.5, camAzimuth: 140, camElevation: 25, fov: 28 },
  { name: '广角透镜场 Wide Lensing Field', camDist: 32, camAzimuth: 250, camElevation: 42, fov: 88 },
];

// 质量档：真实渲染预算（内部渲染比例、测地线步数、盘穿越合成数、湍流倍频、Bloom 分辨率、色散采样）
export const QUALITY_LEVELS = {
  standard: { renderScale: 0.75, dprCap: 1.25, maxSteps: 180, maxCrossings: 3, octaves: 3, bloomScale: 0.5, caTaps: 3 },
  high: { renderScale: 1.0, dprCap: 1.5, maxSteps: 340, maxCrossings: 5, octaves: 4, bloomScale: 0.75, caTaps: 3 },
  cinematic: { renderScale: 1.0, dprCap: 2.0, maxSteps: 512, maxCrossings: 8, octaves: 5, bloomScale: 1.0, caTaps: 5 },
};

export const QUALITY_ORDER = ['standard', 'high', 'cinematic'];

export const DEFAULT_QUALITY = 'high';

// 调试视图 0–9（uniform uDebugView；≠0 绕过后处理链直接输出）
export const DEBUG_VIEWS = [
  { name: '最终合成 FINAL', desc: '完整后处理链输出（Bloom + ACES + 暗角/颗粒/色散）' },
  { name: '积分步数 STEPS', desc: '每像素测地线积分步数热力图（临界环附近更热）' },
  { name: '终止原因 TERMINATION', desc: '红=入视界 / 蓝=逃逸 / 黄=步数耗尽 / 灰=近轴退化' },
  { name: '视界掩码 HORIZON', desc: '捕获=白、逃逸=黑（阴影剪影，含光子环边界）' },
  { name: '盘交点阶次 DISK ORDER', desc: '该光线收集的盘面穿越次数：1=绿 2=品红 3=橙 4=青 ≥5=白' },
  { name: '红移/DOPPLER G-MAP', desc: '首个穿越点 g 因子：>1 蓝移偏蓝白、<1 红移偏红，亮度∝g' },
  { name: '背景透镜坐标 LENSED DIR', desc: '逃逸方向 n̂ 假彩色（透镜映射后的背景坐标）' },
  { name: '星空/银河 STARFIELD', desc: '仅透镜后的程序化星空 + 银河层' },
  { name: '处理前 HDR PRE-POST HDR', desc: 'Bloom/tonemap 之前的 HDR 辐亮度对数热图' },
  { name: '碰撞参数 IMPACT B', desc: 'b 相对 b_crit≈2.598 的接近度梯度（临界捕获结构）' },
];
