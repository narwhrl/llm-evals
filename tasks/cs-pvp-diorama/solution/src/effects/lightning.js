import * as THREE from 'three';

// Occasional distant lightning: brief double-flash modulating a dedicated
// light and lifting the sky colour, without adding any geometry off-base.
export function createLightning(ctx, scene) {
  const baseSky = new THREE.Color(0x0e1626);
  const flashSky = new THREE.Color(0x1c2c48);
  const flashLight = ctx.flashLight;
  let nextAt = 4 + Math.random() * 6;
  let flashStart = -10;
  let flashSeed = 0;

  function envelope(dt) {
    // dt seconds since flash start: two quick pulses then decay
    if (dt < 0 || dt > 0.9) return 0;
    const p1 = Math.exp(-Math.pow((dt - 0.06) / 0.05, 2));
    const p2 = Math.exp(-Math.pow((dt - 0.24) / 0.08, 2)) * 0.7;
    const tail = Math.exp(-Math.max(0, dt - 0.3) * 6) * (dt > 0.3 ? 0.35 : 0);
    return Math.min(1, p1 + p2 + tail) * (0.7 + flashSeed * 0.5);
  }

  return {
    update(t, dt) {
      if (t > nextAt) {
        flashStart = t;
        flashSeed = Math.random();
        nextAt = t + 7 + Math.random() * 11;
      }
      const k = envelope(t - flashStart);
      if (flashLight) flashLight.intensity = k * 1.6;
      if (scene && scene.background) {
        scene.background.copy(baseSky).lerp(flashSky, Math.min(1, k));
      }
      void dt;
    },
  };
}
