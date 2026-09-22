// Keys 0–9. Views 1–7 are display-referred diagnostics from the geodesic pass,
// 8 is the lensed sky through the full post chain, 9 is pre-post HDR luminance.
export const DEBUG_VIEWS = Object.freeze([
  { name: '最终合成', description: 'HDR → Bloom → 色散/曝光/暗角 → ACES → sRGB → 颗粒的最终画面。' },
  { name: '测地线步数 / 终止', description: '亮度 = 积分步数 / 预算。蓝 = 逃逸，橙 = 越过视界，绿 = 被盘面吸收，品红 = 步数耗尽（临界轨道）。' },
  { name: '事件视界掩码', description: '白 = 数值积分被捕获 (r ≤ 2M)；红线 = 解析临界冲击参数 b = 3√3 M，应与白色边界重合。' },
  { name: '盘面交点阶次', description: '沿测地线穿过赤道面盘区的次数：琥珀 1（主像）、青 2（次级像）、品红 3、白 ≥ 4；明暗条纹 = 首交点半径每 2M。' },
  { name: '红移因子 g', description: 'g = ν_obs/ν_emit（引力红移 + Doppler）：红 < 1 < 蓝，白 ≈ 1，黑色等值线每 0.1。' },
  { name: '盘面温度 / 湍流', description: '首个有效盘面采样的观测温度 g·T 的黑体色，亮度 = 程序化湍流密度。' },
  { name: '背景透镜坐标', description: '逃逸方向的天球经纬网（每 15°）与八分区着色，直观显示透镜映射与爱因斯坦环。' },
  { name: '偏折角', description: '逃逸方向相对初始方向的总偏折 δ（Turbo 伪彩，0 → 2.5π），黑色等值线每 π/4。' },
  { name: '星空 / 银河', description: '只保留程序化星空与银河（经透镜映射、无吸积盘），走完整后处理。' },
  { name: 'HDR 亮度', description: '后处理前场景线性 HDR 亮度的对数伪彩：10⁻³（蓝）→ 10²（红），深色细线为每个数量级。' },
]);

export function isDebugIndex(value) {
  return Number.isInteger(value) && value >= 0 && value < DEBUG_VIEWS.length;
}
