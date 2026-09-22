// 版本化 localStorage 持久化：gargantua.state.v1（非法字段逐项回退默认，未知 version 整体忽略）
import { DEFAULT_PARAMS, DEFAULT_QUALITY, QUALITY_ORDER, PARAM_DEFS } from './defaults.js';

export const STORAGE_KEY = 'gargantua.state.v1';

const DEF_BY_KEY = new Map(PARAM_DEFS.map((d) => [d.key, d]));

function validParam(key, value) {
  const def = DEF_BY_KEY.get(key);
  if (!def) return null;
  if (typeof value !== 'number' || !Number.isFinite(value)) return def.default;
  return Math.min(def.max, Math.max(def.min, value));
}

export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || data.version !== 1) return null;
    const params = { ...DEFAULT_PARAMS };
    if (data.params && typeof data.params === 'object') {
      for (const def of PARAM_DEFS) {
        if (def.key in data.params) params[def.key] = validParam(def.key, data.params[def.key]);
      }
    }
    params.diskOuter = Math.max(params.diskOuter, params.diskInner + 1);
    return {
      params,
      quality: QUALITY_ORDER.includes(data.quality) ? data.quality : DEFAULT_QUALITY,
      preset: Number.isInteger(data.preset) && data.preset >= 0 && data.preset <= 3 ? data.preset : 0,
      debug: Number.isInteger(data.debug) && data.debug >= 0 && data.debug <= 9 ? data.debug : 0,
      hudOpen: typeof data.hudOpen === 'boolean' ? data.hudOpen : true,
    };
  } catch {
    return null;
  }
}

let saveTimer = 0;

export function savePersistedState(state) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 1,
          params: state.params,
          quality: state.quality,
          preset: state.preset,
          debug: state.debug,
          hudOpen: state.hudOpen,
        }),
      );
    } catch {
      // 存储不可用（隐私模式/配额）时静默降级为不持久
    }
  }, 200);
}

export function resetPersistedState() {
  clearTimeout(saveTimer);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 同上
  }
}
