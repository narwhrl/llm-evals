// 键盘快捷键：0–9 调试视图、Shift+1–4 预设、Space 播放/暂停、H HUD、R 重置、Q 质量档。
// 基于 event.code，跨键盘布局稳定；表单控件聚焦时不触发（滑杆方向键不受干扰）。
export function installShortcuts(handlers) {
  const handler = (e) => {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
      return;
    }
    if (e.code === 'Space') {
      e.preventDefault();
      handlers.onTogglePlayback();
      return;
    }
    let m = /^Digit([0-9])$/.exec(e.code) || /^Numpad([0-9])$/.exec(e.code);
    if (m) {
      e.preventDefault();
      if (e.shiftKey && m[1] >= '1' && m[1] <= '4') handlers.onPreset(Number(m[1]) - 1);
      else if (!e.shiftKey) handlers.onDebug(Number(m[1]));
      return;
    }
    switch (e.code) {
      case 'KeyH':
        handlers.onToggleHud();
        break;
      case 'KeyR':
        handlers.onReset();
        break;
      case 'KeyQ':
        handlers.onCycleQuality();
        break;
      default:
        break;
    }
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}
