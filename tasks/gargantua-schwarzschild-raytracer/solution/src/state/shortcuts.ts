// Global keyboard shortcuts:
//   0-9 debug views, Shift+1..4 presets, Space cinematic pause/play,
//   H HUD, R reset, Q quality cycle, M ambient audio.
// Registered once from App; input fields/sliders are ignored.
import { store } from './store';

export function attachShortcuts(): () => void {
  const onKey = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
      return;
    }

    if (e.shiftKey && e.code.startsWith('Digit')) {
      const n = Number(e.code.slice(5));
      if (n >= 1 && n <= 4) {
        store.applyPresetCamera(n - 1);
        e.preventDefault();
        return;
      }
    }

    if (e.code.startsWith('Digit')) {
      const n = Number(e.code.slice(5));
      if (n >= 0 && n <= 9) {
        store.setDebug(n);
        e.preventDefault();
        return;
      }
    }

    switch (e.code) {
      case 'Space':
        store.toggleCinematic();
        e.preventDefault();
        break;
      case 'KeyH':
        store.toggleHud();
        break;
      case 'KeyR':
        store.reset();
        break;
      case 'KeyQ':
        store.cycleQuality();
        break;
      case 'KeyM':
        store.toggleAudio();
        break;
    }
  };

  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}
