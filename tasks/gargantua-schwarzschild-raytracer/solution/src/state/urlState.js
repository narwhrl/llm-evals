// URL 截图自动化契约：
//   ?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
// 规则：出现但非法的值 → 安全回退默认值（present 标记仍为 true，覆盖持久化状态）；
//       未出现的键 → 不覆盖（沿用持久化/默认状态）；全程不抛异常。
import { DEFAULT_QUALITY, QUALITY_ORDER } from './defaults.js';

function intOr(value, fallback, min, max) {
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? n : fallback;
}

function timeOr(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function parseUrlState(search) {
  const q = new URLSearchParams(search ?? (typeof location !== 'undefined' ? location.search : ''));
  const has = (k) => q.has(k);
  const qualityRaw = q.get('quality');
  const hudRaw = q.get('hud');
  return {
    captureMode: q.get('capture') === '1',
    time: timeOr(q.get('time'), 0),
    quality: QUALITY_ORDER.includes(qualityRaw) ? qualityRaw : DEFAULT_QUALITY,
    preset: intOr(q.get('preset'), 0, 0, 3),
    debug: intOr(q.get('debug'), 0, 0, 9),
    hud: hudRaw === '0' || hudRaw === '1' ? Number(hudRaw) : 1,
    present: {
      quality: has('quality'),
      preset: has('preset'),
      debug: has('debug'),
      hud: has('hud'),
    },
  };
}
