// Four camera presets (Shift+1 … Shift+4). Poses are spherical coordinates
// around the hole: distance in M, azimuth/elevation/FOV in degrees.
export const PRESETS = Object.freeze([
  Object.freeze({
    name: 'Gargantua',
    label: '经典近侧视',
    description: '近乎侧视：前侧盘面横穿阴影，后侧盘面被透镜抬升成“光环帽”。',
    pose: Object.freeze({ distance: 28, azimuth: 0, elevation: 7, fov: 42 }),
  }),
  Object.freeze({
    name: 'Polar',
    label: '极轴俯视',
    description: '高倾角俯视：盘面近似圆环，光子环与次级像环绕阴影一周。',
    pose: Object.freeze({ distance: 30, azimuth: 25, elevation: 72, fov: 40 }),
  }),
  Object.freeze({
    name: 'Doppler',
    label: '多普勒斜视',
    description: '中等倾角斜视：接近侧增亮偏蓝、远离侧变暗偏红的强烈不对称。',
    pose: Object.freeze({ distance: 21, azimuth: -60, elevation: 24, fov: 52 }),
  }),
  Object.freeze({
    name: 'Plunge',
    label: '近域掠射',
    description: '贴近吸积盘的广角：巨大的阴影与极端弯曲的星空背景。',
    pose: Object.freeze({ distance: 11.5, azimuth: 145, elevation: 11, fov: 80 }),
  }),
]);

export function isPresetIndex(value) {
  return Number.isInteger(value) && value >= 0 && value < PRESETS.length;
}
