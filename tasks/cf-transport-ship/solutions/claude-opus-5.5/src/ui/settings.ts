// 玩家设置：本地保存与恢复。存储不可用或写入失败时，当前会话继续使用内存中的设置并给出提示。
import type { Quality } from "../render/env";

export interface Settings {
  sens: number; // 普通灵敏度（1.0 = 每像素 0.07°）
  scopeSens: number; // 开镜灵敏度倍率（相对普通灵敏度）
  invertY: boolean;
  fov: number; // 水平视野（度），按当前窗口比例换算垂直视野
  master: number;
  sfx: number;
  quality: Quality;
  bob: boolean; // 行走摆动与受击镜头晃动
  showFps: boolean;
}

export const DEFAULTS: Settings = {
  sens: 1.0, scopeSens: 0.85, invertY: false, fov: 95, master: 0.8, sfx: 0.9, quality: "medium", bob: true, showFps: false,
};

export const LIMITS = {
  sens: [0.1, 5], scopeSens: [0.2, 2], fov: [75, 110], master: [0, 1], sfx: [0, 1],
} as const;

const KEY = "cf-transport-ship.settings.v1";

export function loadSettings(): { s: Settings; error: string | null } {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { s: { ...DEFAULTS }, error: null };
    return { s: sanitize(JSON.parse(raw)), error: null };
  } catch (e) {
    return { s: { ...DEFAULTS }, error: `无法读取本地设置，已使用默认值（${(e as Error).message}）` };
  }
}

export function saveSettings(s: Settings): string | null {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
    return null;
  } catch (e) {
    return `设置未能保存到本地，本次会话内仍然生效（${(e as Error).message}）`;
  }
}

/** 只接受已知字段与合法范围，防止被篡改的存储值破坏运行 */
export function sanitize(v: unknown): Settings {
  const s = { ...DEFAULTS };
  if (!v || typeof v !== "object") return s;
  const o = v as Record<string, unknown>;
  for (const k of ["sens", "scopeSens", "fov", "master", "sfx"] as const) {
    const n = o[k];
    if (typeof n === "number" && Number.isFinite(n)) s[k] = Math.min(LIMITS[k][1], Math.max(LIMITS[k][0], n));
  }
  for (const k of ["invertY", "bob", "showFps"] as const) if (typeof o[k] === "boolean") s[k] = o[k] as boolean;
  if (o.quality === "low" || o.quality === "medium" || o.quality === "high") s.quality = o.quality;
  return s;
}

/** 水平视野 → 垂直视野（度） */
export function vfovFromH(hDeg: number, aspect: number): number {
  return (2 * Math.atan(Math.tan((hDeg * Math.PI) / 360) / aspect) * 180) / Math.PI;
}
