/** 全局可调参数定义与默认值。 */

export interface SceneParams {
  // —— 地形（改动触发整体重建）——
  seed: string; // 地形随机种子
  mountainHeight: number; // 山体高度缩放 0.4–1.6
  terrainDetail: number; // 噪声细节强度 0–1
  snowline: number; // 雪线高度（体素）16–58
  waterfallWidth: number; // 主瀑宽度（体素）1–3
  vegetation: number; // 植被密度 0–1.6
  // —— 实时参数（不重建）——
  waterfallSpeed: number; // 瀑布流速 0.2–3
  waterOpacity: number; // 水体透明度 0.35–1
  cloudDensity: number; // 云量 0–1
  cloudHeight: number; // 云层高度 14–46
  cloudSpeed: number; // 云漂移速度 0–3
  fogAmount: number; // 雾浓度 0–1
  timeOfDay: number; // 时间 0=清晨 0.5=正午 1=黄昏
  shadows: boolean; // 阴影开关
  autoRotate: boolean; // 自动环绕
  rotateSpeed: number; // 环绕速度
}

export const DEFAULT_PARAMS: SceneParams = {
  seed: 'shanshui-01',
  mountainHeight: 1,
  terrainDetail: 0.6,
  snowline: 40,
  waterfallWidth: 2,
  vegetation: 1.05,

  waterfallSpeed: 1,
  waterOpacity: 0.72,
  cloudDensity: 0.58,
  cloudHeight: 26,
  cloudSpeed: 1,
  fogAmount: 0.35,
  timeOfDay: 0.18,
  shadows: true,
  autoRotate: true,
  rotateSpeed: 0.7,
};

/** 影响地形重建的参数键。 */
export const REBUILD_KEYS: (keyof SceneParams)[] = [
  'seed',
  'mountainHeight',
  'terrainDetail',
  'snowline',
  'waterfallWidth',
  'vegetation',
];

export function rebuildKeyOf(p: SceneParams): string {
  return REBUILD_KEYS.map((k) => `${k}=${p[k]}`).join('|');
}
