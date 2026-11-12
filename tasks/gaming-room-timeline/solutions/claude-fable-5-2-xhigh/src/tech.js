// Monitors and computers. Monitors expose userData.screen (a plane the timeline maps a canvas onto).
import * as THREE from 'three';
import { box, rbox, cyl, group, mat, glow, at } from './kit.js';

export const SCREEN_OFF = new THREE.MeshStandardMaterial({ color: '#0b0d10', roughness: 0.25 });

function monitor(g, w, h, x, y, z) {
  const s = new THREE.Mesh(new THREE.PlaneGeometry(w, h), SCREEN_OFF);
  s.position.set(x, y, z);
  g.add(s);
  g.userData.screen = s;
  g.userData.aspect = w / h;
  return g;
}
const black = () => mat('#27272b', { roughness: 0.45 });

// 2005: 17" CRT, the heaviest thing in the room.
export function crt() {
  const b = mat('#d8d0bb', { roughness: 0.6 });
  const g = group(
    rbox(0.42, 0.37, 0.12, b, 0, 0.04, 0.15, 0.02),
    rbox(0.38, 0.33, 0.2, b, 0, 0.06, 0, 0.03),
    rbox(0.26, 0.24, 0.16, b, 0, 0.09, -0.15, 0.03),
    cyl(0.12, 0.04, b, 0, 0, 0.02),
    box(0.335, 0.26, 0.004, '#3a3832', 0, 0.095, 0.211),
    box(0.012, 0.006, 0.004, glow('#57d36a', 2), 0.16, 0.06, 0.211),
  );
  for (let i = 0; i < 4; i++) g.add(box(0.014, 0.008, 0.004, '#bdb49c', -0.04 + i * 0.025, 0.058, 0.211));
  return monitor(g, 0.31, 0.2325, 0, 0.225, 0.2145);
}

// 2008: first 19" LCD, 5:4, thick glossy bezel with a silver chin.
export function lcd19() {
  const k = black();
  const g = group(
    rbox(0.41, 0.345, 0.04, k, 0, 0.115, 0, 0.01),
    box(0.41, 0.028, 0.042, mat('#b9bcc0', { metalness: 0.5, roughness: 0.4 }), 0, 0.117, 0),
    box(0.06, 0.13, 0.03, k, 0, 0.01, -0.03),
    cyl(0.11, 0.015, k, 0, 0, -0.02),
    box(0.008, 0.004, 0.004, glow('#4aa3ff', 2), 0.17, 0.129, 0.021),
  );
  return monitor(g, 0.375, 0.3, 0, 0.3025, 0.0215);
}

// 2012: 24" widescreen. Kept as the second screen after 2017.
export function lcd24() {
  const k = black();
  const g = group(rbox(0.56, 0.335, 0.03, k, 0, 0.1, 0, 0.008), box(0.07, 0.12, 0.025, k, 0, 0.01, -0.025), box(0.24, 0.012, 0.18, k, 0, 0, -0.02));
  return monitor(g, 0.53, 0.298, 0, 0.272, 0.0165);
}

// 2017: 27" 144 Hz panel on a V-shaped stand.
export function lcd27() {
  const k = black();
  const g = group(rbox(0.62, 0.365, 0.025, k, 0, 0.12, 0, 0.006), box(0.05, 0.2, 0.03, k, 0, 0.01, -0.03));
  for (const s of [-1, 1]) g.add(at(box(0.03, 0.015, 0.3, mat('#8f1d22', { metalness: 0.4 }), 0, 0, 0), s * 0.1, 0.008, 0.02, s * 0.7));
  return monitor(g, 0.6, 0.3375, 0, 0.3045, 0.014);
}

function arm(g, h) {
  const m = mat('#2a2a2c', { metalness: 0.6, roughness: 0.45 });
  g.add(cyl(0.018, h, m, 0, 0, -0.14), box(0.07, 0.012, 0.09, m, 0, 0, -0.13), box(0.03, 0.03, 0.14, m, 0, h - 0.06, -0.07));
  return g;
}

// 2020: the same 27" panel, turned upright on an arm for chat and documents.
export function lcd27v() {
  return monitor(arm(group(rbox(0.365, 0.62, 0.025, black(), 0, 0.1, 0, 0.006)), 0.46), 0.3375, 0.6, 0, 0.41, 0.014);
}

// 2020: 34" ultrawide on an arm.
export function uw34() {
  return monitor(arm(group(rbox(0.83, 0.365, 0.03, black(), 0, 0.16, 0, 0.008)), 0.4), 0.8, 0.343, 0, 0.3465, 0.0165);
}

function tower(w, h, d, body) {
  return group(rbox(w, h, d, body, 0, 0, 0, 0.012));
}

// 2005: beige tower with CD-ROM and floppy drive.
export function pc05() {
  const b = mat('#d6cdb6', { roughness: 0.65 }), f = 0.216, g = tower(0.19, 0.42, 0.43, b);
  g.add(
    box(0.15, 0.04, 0.006, '#e6dfcb', 0, 0.35, f),
    box(0.15, 0.04, 0.006, '#cbc2aa', 0, 0.3, f),
    box(0.1, 0.03, 0.006, '#cbc2aa', -0.02, 0.245, f),
    box(0.07, 0.004, 0.008, '#4a4538', -0.02, 0.258, f),
    cyl(0.014, 0.008, '#bdb49c', 0.05, 0.18, f),
    box(0.008, 0.008, 0.006, glow('#57d36a', 2), 0.05, 0.155, f),
    box(0.008, 0.008, 0.006, glow('#ff9a3a', 1.5), 0.065, 0.155, f),
    box(0.03, 0.02, 0.006, '#3a6fc4', -0.06, 0.16, f),
  );
  g.children[5].rotation.x = Math.PI / 2;
  for (let i = 0; i < 5; i++) g.add(box(0.13, 0.004, 0.006, '#b3aa92', 0, 0.03 + i * 0.016, f));
  return g;
}

// 2008: black tower with a blue power LED and DVD burner.
export function pc08() {
  const f = 0.226, g = tower(0.19, 0.43, 0.45, black());
  g.add(
    box(0.03, 0.4, 0.006, mat('#b9bcc0', { metalness: 0.6, roughness: 0.35 }), 0.07, 0.015, f),
    box(0.13, 0.04, 0.006, '#2c2c30', -0.02, 0.36, f),
    box(0.13, 0.04, 0.006, '#2c2c30', -0.02, 0.31, f),
    box(0.006, 0.08, 0.006, glow('#3d8bff', 2.5), 0.07, 0.2, f + 0.002),
    box(0.03, 0.012, 0.006, '#111', -0.03, 0.12, f),
    box(0.03, 0.012, 0.006, '#111', 0.01, 0.12, f),
  );
  return g;
}

function ring(color, r, x, y, z) {
  const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 8, 28), glow(color, 2).clone());
  t.position.set(x, y, z);
  return t;
}

// 2013: gaming tower with an acrylic side window and red fans.
export function pc13() {
  const g = tower(0.21, 0.47, 0.48, black());
  const win = box(0.004, 0.3, 0.32, mat('#40181a', { transparent: true, opacity: 0.55, roughness: 0.1, emissive: '#ff2a2a', emissiveIntensity: 0.35 }), -0.106, 0.1, -0.02);
  g.add(win, box(0.17, 0.4, 0.006, mat('#111', { roughness: 0.9 }), 0, 0.03, 0.241), ring('#ff3b30', 0.055, 0, 0.15, 0.246), ring('#ff3b30', 0.055, 0, 0.3, 0.246));
  g.add(box(0.12, 0.012, 0.04, '#0e0e0e', 0, 0.47, 0.15));
  return g;
}

// 2018: tempered glass and RGB fans; the hue drifts slowly.
export function pc18() {
  const glass = mat('#9fb4bd', { transparent: true, opacity: 0.22, roughness: 0.05 });
  const g = group(box(0.22, 0.02, 0.45, black(), 0, 0, 0), box(0.22, 0.02, 0.45, black(), 0, 0.44, 0), box(0.012, 0.42, 0.45, black(), 0.104, 0.02, 0), box(0.22, 0.42, 0.012, black(), 0, 0.02, -0.219));
  const rings = [0.1, 0.22, 0.34].map((y) => ring('#ff00aa', 0.045, 0, y, 0.2));
  const pump = cyl(0.03, 0.02, glow('#00d0ff', 1.5).clone(), 0.04, 0.3, -0.05);
  pump.rotation.z = Math.PI / 2;
  g.add(...rings, pump, box(0.03, 0.1, 0.26, '#2b2d31', 0.03, 0.14, -0.04), box(0.14, 0.012, 0.004, glow('#ffffff', 1), 0.01, 0.2, 0.09));
  for (const p of [box(0.004, 0.42, 0.45, glass, -0.108, 0.02, 0), box(0.2, 0.42, 0.004, glass, 0, 0.02, 0.223)]) {
    p.castShadow = false;
    g.add(p);
  }
  g.userData.tick = (t) => {
    rings.forEach((r, i) => r.material.emissive.setHSL((t * 0.05 + i * 0.12) % 1, 1, 0.5));
    rings.forEach((r) => r.material.color.copy(r.material.emissive));
  };
  return g;
}

// 2023: small quiet case with a walnut front. No more rainbow.
export function pc23() {
  const g = tower(0.17, 0.31, 0.36, mat('#ebe8e1', { roughness: 0.55 }));
  for (let i = 0; i < 9; i++) g.add(box(0.011, 0.27, 0.01, '#8d5f3c', -0.064 + i * 0.016, 0.02, 0.181));
  g.add(box(0.006, 0.006, 0.004, glow('#ffe1ad', 2), 0.07, 0.296, 0.182));
  return g;
}
