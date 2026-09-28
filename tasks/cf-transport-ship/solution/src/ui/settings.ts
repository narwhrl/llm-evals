/**
 * 设置模型 + localStorage 持久化（保存失败保持会话可用）。
 */
export type Quality = 'low' | 'med' | 'high';

export interface Settings {
  sensitivity: number;      // 0.2 .. 3
  adsSensitivity: number;   // 0.2 .. 2
  fov: number;              // 垂直视野 60 .. 110
  invertY: boolean;
  masterVolume: number;     // 0 .. 1
  sfxVolume: number;        // 0 .. 1
  quality: Quality;
  headBob: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  sensitivity: 1.0,
  adsSensitivity: 0.85,
  fov: 80,
  invertY: false,
  masterVolume: 0.8,
  sfxVolume: 0.9,
  quality: 'med',
  headBob: true,
};

const KEY = 'cf-transport-ship-settings-v1';

export function loadSettings(): { settings: Settings; persisted: boolean; error?: string } {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { settings: { ...DEFAULT_SETTINGS }, persisted: false };
    const obj = JSON.parse(raw) as Partial<Settings>;
    const s = { ...DEFAULT_SETTINGS };
    for (const k of Object.keys(DEFAULT_SETTINGS) as Array<keyof Settings>) {
      if (typeof obj[k] === typeof DEFAULT_SETTINGS[k]) s[k] = obj[k] as never;
    }
    return { settings: s, persisted: true };
  } catch (e) {
    return { settings: { ...DEFAULT_SETTINGS }, persisted: false, error: String(e) };
  }
}

export function saveSettings(s: Settings): { ok: boolean; error?: string } {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
