import * as THREE from "three";

// 远处天际偶发的微弱雷光
export function createLightning({ hemi, dir, scene, renderer }) {
  const bgDay = scene.background.clone();
  const fogColor = scene.fog.color.clone();
  let nextAt = 4 + Math.random() * 6;
  let seq = null;

  function flash(strength) {
    hemi.intensity = hemi.userData.base + strength * 1.5;
    dir.intensity = dir.userData.base + strength * 0.9;
    renderer.toneMappingExposure = 1.5 + strength * 0.55;
    scene.background.copy(bgDay).lerp(new THREE.Color(0xbfd0e8), strength * 0.55);
    scene.fog.color.copy(fogColor).lerp(new THREE.Color(0xbfd0e8), strength * 0.5);
  }

  function update(t, dt) {
    if (!seq && t > nextAt) {
      const offset = 0.35 + Math.random() * 0.8;
      const offset2 = offset + 0.14 + Math.random() * 0.1;
      seq = { t0: t, offset, offset2, dur: offset2 + 0.16 + Math.random() * 0.12 };
      nextAt = t + 9 + Math.random() * 9;
    }
    let strength = 0;
    if (seq) {
      const e = t - seq.t0;
      if (e > seq.dur) {
        seq = null;
      } else if (e > seq.offset2) {
        strength = Math.max(strength, Math.sin(((e - seq.offset2) / (seq.dur - seq.offset2)) * Math.PI));
      } else if (e > seq.offset) {
        strength = Math.max(strength, Math.sin(((e - seq.offset) / (seq.offset2 - seq.offset)) * Math.PI) * 0.7);
      } else if (e < 0.08) {
        strength = Math.max(strength, (0.08 - e) / 0.08 * 0.4);
      }
    }
    if (strength > 0.001) flash(strength);
    else {
      hemi.intensity = hemi.userData.base;
      dir.intensity = dir.userData.base;
      renderer.toneMappingExposure = 1.5;
      scene.background.copy(bgDay);
      scene.fog.color.copy(fogColor);
    }
  }
  return { update };
}
