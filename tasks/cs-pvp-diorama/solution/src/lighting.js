// Rain-night lighting rig: cold blue ambience, moonlight, and the tactical
// sources (warm street lamp, cold warehouse lamps, red back-door glow, police
// beacon, searchlight) each with its own live flicker behaviour.
import * as THREE from 'three';
import { noOutline } from './utils.js';
import { glowTexture } from './textures.js';

function halo(color, size, pos, parent) {
  const m = new THREE.SpriteMaterial({
    map: glowTexture(),
    color, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const s = new THREE.Sprite(m);
  s.scale.set(size, size, 1);
  s.position.copy(pos);
  if (parent) parent.add(s);
  return s;
}

export function buildLighting(scene) {
  const g = new THREE.Group();
  g.name = 'lighting';

  const hemi = new THREE.HemisphereLight(0x44557a, 0x161a23, 0.85);
  g.add(hemi);
  const ambient = new THREE.AmbientLight(0x2d3a55, 0.6);
  g.add(ambient);

  const moon = new THREE.DirectionalLight(0x93a8d8, 1.15);
  moon.position.set(26, 40, 16);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -40; moon.shadow.camera.right = 40;
  moon.shadow.camera.top = 40; moon.shadow.camera.bottom = -40;
  moon.shadow.camera.near = 8; moon.shadow.camera.far = 110;
  moon.shadow.bias = -0.0006;
  moon.shadow.normalBias = 0.04;
  g.add(moon);
  g.add(moon.target);

  const mkPoint = (color, intensity, dist, x, y, z, decay = 2) => {
    const l = new THREE.PointLight(color, intensity, dist, decay);
    l.position.set(x, y, z);
    g.add(l);
    return l;
  };

  // B-corner street lamp — the warm centre of the diorama.
  const street = mkPoint(0xffb45e, 480, 24, 8.2, 3.9, -3.2);
  const streetHalo = halo(0xffb45e, 3.4, street.position, g);

  // A warehouse cold-white emergency lamps.
  const wh1 = mkPoint(0xcfe4ff, 300, 20, -14.5, 4.3, -12.5);
  const wh2 = mkPoint(0xcfe4ff, 240, 18, -21.5, 4.3, -18);
  halo(0xcfe4ff, 1.6, wh1.position, g);
  halo(0xcfe4ff, 1.4, wh2.position, g);

  // A deep back door — faint red seam glow.
  const redDoor = mkPoint(0xff4433, 45, 10, -12.6, 1.3, -21.6);
  redDoor.decay = 2;

  // CT police-van beacon: red/blue slow alternation.
  const beacon = mkPoint(0xff4030, 110, 20, -19.5, 2.7, 24);

  // West alley wall lamp — cold, buzzy.
  const alley = mkPoint(0xbcd2f0, 170, 14, -28.2, 3.3, 6);

  // B tin-house broken fluorescent — warm, stuttering.
  const fluoro = mkPoint(0xffd9a0, 230, 16, 23, 2.5, -17);

  // CT searchlight sweeping the mid exit.
  const search = new THREE.SpotLight(0xdfeaff, 1200, 60, 0.26, 0.45, 1.4);
  search.position.set(14.5, 4.7, 20.2);
  search.target.position.set(0, 0.8, 11);
  search.castShadow = false;
  g.add(search, search.target);

  scene.add(g);

  // -------------------------------------------------- flicker behaviours ----
  let streetState = { next: 2, until: 0 };
  const flickers = [];
  flickers.push((t) => { // street lamp: random dropouts + fine shimmer
    if (t > streetState.next) {
      streetState.until = t + 0.08 + Math.random() * 0.22;
      streetState.next = t + 2.5 + Math.random() * 7;
    }
    const out = t < streetState.until;
    street.intensity = 480 * (out ? 0.18 : 0.92 + Math.sin(t * 37) * 0.05 + Math.sin(t * 13.7) * 0.03);
    streetHalo.material.opacity = out ? 0.12 : 0.42 + Math.sin(t * 37) * 0.06;
  });
  flickers.push((t) => { // warehouse lamps: subtle mains hum variation
    wh1.intensity = 300 * (0.94 + Math.sin(t * 31) * 0.03 + Math.sin(t * 7.3) * 0.03);
    wh2.intensity = 240 * (0.93 + Math.sin(t * 27 + 2) * 0.04 + Math.sin(t * 5.1) * 0.03);
  });
  flickers.push((t) => { // red seam: slow breathing
    redDoor.intensity = 45 * (0.65 + 0.35 * (0.5 + 0.5 * Math.sin(t * 0.9)));
  });
  flickers.push((t) => { // beacon alternation
    const p = (t * 0.9) % (Math.PI * 2);
    const r = Math.pow(Math.max(0, Math.sin(p)), 3);
    const b = Math.pow(Math.max(0, Math.sin(p + Math.PI)), 3);
    beacon.color.setRGB(1 * r + 0.25 * b, 0.28 * b, 0.22 * r + 1 * b);
    beacon.intensity = 110 * (0.35 + 0.65 * (r + b));
  });
  flickers.push((t) => { // alley lamp: bad wiring stutters
    const stutter = Math.sin(t * 61) > 0.82 ? 0.35 : 1;
    alley.intensity = 170 * stutter * (0.9 + Math.sin(t * 17) * 0.06);
  });
  flickers.push((t) => { // fluorescent tube gasping
    const s = Math.sin(t * 43) > 0.88 ? 0.25 : (Math.sin(t * 5.3) > -0.85 ? 1 : 0.6);
    fluoro.intensity = 230 * s;
  });
  flickers.push((t) => { // searchlight slow sweep
    search.target.position.set(Math.sin(t * 0.28) * 4.5, 0.8, 11 + Math.cos(t * 0.21) * 2.2);
    search.intensity = 1200 * (0.94 + Math.sin(t * 11) * 0.04);
  });

  function update(t) {
    for (const f of flickers) f(t);
  }

  return { update, hemi, ambient, moon, search, scene };
}
