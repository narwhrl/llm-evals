import * as THREE from 'three';
import { T } from './kit.js';

export function createFX(scene, root, anim) {
  // ---- dense falling rain (one LineSegments buffer, updated in place) ----
  const RAIN = 1500;
  const rainPos = new Float32Array(RAIN * 6);
  const EXTENT = 27;
  function seed(i, top) {
    const x = (Math.random() * 2 - 1) * EXTENT;
    const z = (Math.random() * 2 - 1) * EXTENT;
    const y = top === undefined ? 1 + Math.random() * 30 : top;
    const len = 0.4 + Math.random() * 0.7;
    const k = i * 6;
    rainPos[k] = x; rainPos[k + 1] = y; rainPos[k + 2] = z;
    rainPos[k + 3] = x + 0.14; rainPos[k + 4] = y - len; rainPos[k + 5] = z + 0.05;
  }
  for (let i = 0; i < RAIN; i++) seed(i);
  const rainGeo = new THREE.BufferGeometry();
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
  const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({
    color: 0xa6c8e0, transparent: true, opacity: 0.2, depthWrite: false,
  }));
  rain.frustumCulled = false;
  scene.add(rain);

  // ---- drips falling from eaves / containers / shutters ----
  const drops = [];
  anim.drips.forEach((d) => { for (let j = 0; j < 3; j++) drops.push({ ...d, phase: Math.random() }); });
  const dripPos = new Float32Array(drops.length * 3);
  const dripGeo = new THREE.BufferGeometry();
  dripGeo.setAttribute('position', new THREE.BufferAttribute(dripPos, 3));
  const dripPts = new THREE.Points(dripGeo, new THREE.PointsMaterial({
    color: 0xc6e0f0, size: 0.13, transparent: true, opacity: 0.7, depthWrite: false,
  }));
  dripPts.frustumCulled = false;
  scene.add(dripPts);

  // ---- expanding puddle ripples ----
  const ripples = [];
  const ringGeo = new THREE.RingGeometry(0.35, 0.45, 32);
  anim.ripples.forEach((c) => {
    for (let j = 0; j < 2; j++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x9dc4dd, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide });
      const m = new THREE.Mesh(ringGeo, mat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(c.x, 0.055, c.z);
      m.renderOrder = 2;
      scene.add(m);
      ripples.push({ m, mat, phase: Math.random() });
    }
  });

  // ---- faint steam from vents ----
  const steam = [];
  anim.vents.forEach((v) => {
    for (let j = 0; j < 3; j++) {
      const mat = new THREE.SpriteMaterial({ map: T.steam, color: 0xdcecf6, transparent: true, opacity: 0.18, depthWrite: false });
      const s = new THREE.Sprite(mat);
      s.position.set(v.x, v.y, v.z);
      scene.add(s);
      steam.push({ s, mat, base: { ...v }, phase: Math.random() });
    }
  });

  const shutterBaseZ = anim.shutter ? anim.shutter.position.z : 0;

  return {
    update(t, dt) {
      // rain
      for (let i = 0; i < RAIN; i++) {
        const k = i * 6;
        rainPos[k + 1] -= 17 * dt; rainPos[k + 4] -= 17 * dt;
        if (rainPos[k + 4] < 0.05) seed(i, 18 + Math.random() * 14);
      }
      rainGeo.attributes.position.needsUpdate = true;

      // drips
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const u = (t * 0.55 + d.phase) % 1;
        dripPos[i * 3] = d.x; dripPos[i * 3 + 1] = d.y * (1 - u) + 0.05; dripPos[i * 3 + 2] = d.z;
      }
      dripGeo.attributes.position.needsUpdate = true;

      // ripples
      for (const r of ripples) {
        const u = (t * 0.5 + r.phase) % 1;
        const s = 0.35 + u * 1.5;
        r.m.scale.set(s, s, s);
        r.mat.opacity = 0.4 * (1 - u);
      }

      // steam
      for (const st of steam) {
        const u = (t * 0.22 + st.phase) % 1;
        st.s.position.y = st.base.y + u * 3.0;
        st.s.position.x = st.base.x + Math.sin(t * 0.6 + st.phase * 6) * 0.3 * u;
        const sc = 0.8 + u * 2.4;
        st.s.scale.set(sc, sc, 1);
        st.mat.opacity = 0.22 * Math.sin(Math.PI * u);
      }

      // tactical light flicker
      for (const f of anim.flicker) {
        f.light.intensity = f.base * (1 - f.amp + f.amp * (0.5 + 0.5 * Math.sin(t * f.speed + f.phase)) + 0.02 * Math.sin(t * 19 + f.phase * 3));
      }

      // police lightbar: slow red/blue alternation
      if (anim.police.red && anim.police.blue) {
        const v = 0.5 + 0.5 * Math.sin(t * 2.1);
        anim.police.red.intensity = 5 + 48 * v;
        anim.police.blue.intensity = 5 + 48 * (1 - v);
        if (anim.police.redMat) anim.police.redMat.emissiveIntensity = 0.5 + 1.6 * v;
        if (anim.police.blueMat) anim.police.blueMat.emissiveIntensity = 0.5 + 1.6 * (1 - v);
      }

      // searchlight sway
      if (anim.search.housing) anim.search.housing.rotation.y = 0.08 * Math.sin(t * 0.55);

      // occasional shutter vibration
      if (anim.shutter) {
        const active = Math.sin(t * 0.31) > 0.94;
        anim.shutter.position.z = shutterBaseZ + (active ? 0.035 * Math.sin(t * 38) : 0);
      }

      // water running down walls / glass
      for (const tx of anim.water) tx.offset.y = (tx.offset.y - dt * 0.05) % 1;

      // wet-ground shader time
      if (anim.reflectorUniform) anim.reflectorUniform.value = t;

      // distant lightning: two quick flashes on a slow cycle
      const cyc = t % 11.5;
      const flash = (cyc > 6 && cyc < 6.10) || (cyc > 6.20 && cyc < 6.27);
      anim.lightning.intensity = flash ? 1.6 : 0;
    },
  };
}
