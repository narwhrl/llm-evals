export type WeaponId = 'vandal' | 'sentinel' | 'vector' | 'longshot' | 'revolver' | 'knife';
export type WeaponConfig = {
  id: WeaponId; name: string; className: string; damage: number; range: number; rate: number;
  mag: number; reserve: number; reload: number; spread: number; movingSpread: number;
  recoil: number; penetration: number; automatic: boolean; bolt?: number;
};
export const WEAPONS: Record<WeaponId, WeaponConfig> = {
  vandal: { id: 'vandal', name: 'AR-47 突击步枪', className: '突击步枪', damage: 36, range: 44, rate: 9.1, mag: 30, reserve: 90, reload: 2.35, spread: .0045, movingSpread: .012, recoil: .018, penetration: 3.0, automatic: true },
  sentinel: { id: 'sentinel', name: 'M4 守卫者', className: '卡宾枪', damage: 31, range: 48, rate: 10.1, mag: 30, reserve: 90, reload: 2.12, spread: .0037, movingSpread: .009, recoil: .011, penetration: 2.7, automatic: true },
  vector: { id: 'vector', name: 'K9 冲锋枪', className: '冲锋枪', damage: 25, range: 25, rate: 13.1, mag: 30, reserve: 120, reload: 1.84, spread: .0068, movingSpread: .015, recoil: .009, penetration: .22, automatic: true },
  longshot: { id: 'longshot', name: 'M90 栓动狙击', className: '狙击枪', damage: 116, range: 100, rate: 1.05, mag: 5, reserve: 20, reload: 2.8, spread: .12, movingSpread: .06, recoil: .052, penetration: 3.8, automatic: false, bolt: 1.05 },
  revolver: { id: 'revolver', name: 'D7 大口径手枪', className: '手枪', damage: 42, range: 36, rate: 3.4, mag: 7, reserve: 35, reload: 1.7, spread: .007, movingSpread: .015, recoil: .025, penetration: .12, automatic: false },
  knife: { id: 'knife', name: '战术刀', className: '近战', damage: 58, range: 2.0, rate: 1.5, mag: 0, reserve: 0, reload: 0, spread: 0, movingSpread: 0, recoil: 0, penetration: 0, automatic: false }
};
export type Team = 'red' | 'blue';
export type Difficulty = 'easy' | 'normal' | 'hard';
export const DIFFICULTY = {
  easy: { reaction: .72, aim: .058, range: 23, burst: .58 },
  normal: { reaction: .43, aim: .035, range: 31, burst: .78 },
  hard: { reaction: .27, aim: .022, range: 38, burst: .9 }
} as const;
export const DEFAULT_SETTINGS = { sensitivity: .0021, scopeSensitivity: .46, fov: 78, volume: .72, effectsVolume: .86, quality: 'medium' as 'low' | 'medium' | 'high', bob: true, invertY: false, debug: false };
export type Settings = typeof DEFAULT_SETTINGS;
export const SCORE_LIMIT = 100;
export const MATCH_SECONDS = 600;
export const RESPAWN_SECONDS = 3;
export const SPAWN_PROTECTION = 2.5;
