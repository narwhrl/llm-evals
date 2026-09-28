import { AmbientLight, HemisphereLight, Color } from 'three';

// Periodic lightning flash: briefly brightens ambient + hemi and tints the scene background.
// Owns its own AmbientLight + HemisphereLight instances (added separately by main).
// Returns an object the main loop calls update() on with elapsed seconds.
export interface LightningSystem {
  update: (t: number) => void;
  ambient: AmbientLight;
  hemi: HemisphereLight;
}

export function buildLightning(scene: { background: Color | null }): LightningSystem {
  const ambient = new AmbientLight(0x4a5d75, 0.55);
  const hemi = new HemisphereLight(0x6a85a8, 0x141516, 0.4);
  hemi.position.set(0, 8, 0);

  let nextStrike = 4 + Math.random() * 6;
  let strikeEnds = 0;
  let peak = 0;
  const baseBg = scene.background ? scene.background.clone() : new Color(0x070a10);

  function update(t: number): void {
    if (t >= nextStrike) {
      nextStrike = t + 5 + Math.random() * 8;
      peak = 0.9 + Math.random() * 0.4;
      strikeEnds = t + 0.18 + Math.random() * 0.1;
    }
    if (t < strikeEnds) {
      const k = Math.max(0, (strikeEnds - t) / 0.25);
      const flicker = 0.6 + 0.4 * Math.sin(t * 90);
      const intensity = peak * k * flicker;
      ambient.intensity = 0.55 + intensity * 1.4;
      hemi.intensity = 0.4 + intensity * 1.0;
      if (scene.background) {
        scene.background.copy(baseBg).lerp(new Color(0x6a7a92), intensity * 0.6);
      }
    } else {
      ambient.intensity = 0.55;
      hemi.intensity = 0.4;
      if (scene.background) scene.background.copy(baseBg);
    }
  }

  return { update, ambient, hemi };
}