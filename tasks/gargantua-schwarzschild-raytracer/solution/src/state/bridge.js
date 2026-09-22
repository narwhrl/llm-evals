// window.__GARGANTUA__ 截图自动化状态接口：
//   只读 ready；getState() 返回状态快照；
//   setQuality/setPreset/setDebug/setTime 验证输入 —— 合法 → 应用并返回更新后的状态快照，
//   非法 → 返回 false（拒绝）；任何输入都不抛未处理异常。
import { QUALITY_ORDER, PRESETS } from './defaults.js';

export function installBridge(store, extra) {
  const snapshot = () => {
    const s = store.get();
    return {
      quality: s.quality,
      preset: s.preset,
      debug: s.debug,
      time: extra.getTime(),
      hud: s.hudOpen ? 1 : 0,
      capture: s.capture,
      params: { ...s.params },
    };
  };

  const api = {
    getState: () => snapshot(),
    setQuality: (level) =>
      typeof level === 'string' && QUALITY_ORDER.includes(level) && store.setQuality(level)
        ? snapshot()
        : false,
    setPreset: (index) =>
      Number.isInteger(index) && index >= 0 && index < PRESETS.length && store.applyPreset(index)
        ? snapshot()
        : false,
    setDebug: (index) =>
      Number.isInteger(index) && index >= 0 && index <= 9 && store.setDebug(index)
        ? snapshot()
        : false,
    setTime: (seconds) =>
      typeof seconds === 'number' && Number.isFinite(seconds) && seconds >= 0 && extra.setTime(seconds)
        ? snapshot()
        : false,
  };
  Object.defineProperty(api, 'ready', { get: () => true, enumerable: true });
  window.__GARGANTUA__ = api;
  return api;
}
