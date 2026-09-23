// Global keyboard shortcuts:
//   0-9      debug views (0 = final composite)
//   Shift+1..4  camera presets
//   Space    play/pause the cinematic camera loop
//   H        show/hide the HUD
//   R        reset everything to defaults
//   Q        cycle quality tier
//   M        toggle procedural ambience
import { store } from "../state/store";

export function installShortcuts(): () => void {
  const onKey = (e: KeyboardEvent): void => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;

    const code = e.code;
    const digitMatch = /^Digit([0-9])$/.exec(code);
    if (digitMatch) {
      const n = Number.parseInt(digitMatch[1], 10);
      if (e.shiftKey) {
        if (n >= 1 && n <= 4) {
          e.preventDefault();
          store.applyPreset(n - 1);
        }
        return;
      }
      e.preventDefault();
      store.setDebug(n);
      return;
    }

    switch (code) {
      case "Space":
        e.preventDefault();
        store.setCinematic(!store.getSnapshot().cinematic);
        break;
      case "KeyH":
        store.toggleHud();
        break;
      case "KeyR":
        store.reset();
        break;
      case "KeyQ":
        store.cycleQuality();
        break;
      case "KeyM":
        store.setAudio(!store.getSnapshot().audio);
        break;
      default:
        break;
    }
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}
