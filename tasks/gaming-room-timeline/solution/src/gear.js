// Peripherals, audio, consoles and the small electronics that date a desk.
import * as THREE from 'three';
import { box, rbox, cyl, ball, group, mat, glow, at, canvasTex, texMat, grainMat } from './kit.js';

function keysMat(body, key, accent, lit) {
  const tex = canvasTex(256, 96, (g, w, h) => {
    g.fillStyle = body;
    g.fillRect(0, 0, w, h);
    const cols = 15, rows = 5, kw = w / cols, kh = h / rows;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        if (r === 4 && c > 3 && c < 10) continue;
        g.fillStyle = (r === 0 && c === 0) || (r === 2 && c === cols - 1) ? accent : key;
        g.fillRect(c * kw + 2, r * kh + 2, kw - 4, kh - 4);
      }
    g.fillStyle = key;
    g.fillRect(4 * kw + 2, 4 * kh + 2, 6 * kw - 4, kh - 4);
  });
  // lit: the body colour shows between the keys and glows
  return texMat(tex, lit ? { roughness: 0.6, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: 0.7 } : { roughness: 0.6 });
}
function keyboard(w, h, d, body, keys) {
  const top = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.02, d - 0.02), keys);
  top.rotation.x = -Math.PI / 2;
  top.position.y = h + 0.001;
  return group(rbox(w, h, d, body, 0, 0, 0, 0.006), top);
}
function mouse(body, x, extra) {
  const g = group(rbox(0.058, 0.032, 0.1, body, 0, 0, 0, 0.014), box(0.002, 0.003, 0.04, '#555', 0, 0.031, -0.028), extra);
  g.position.x = x;
  return g;
}
const pad = (w, d, m, x) => {
  const p = box(w, 0.004, d, m, x, 0, 0);
  p.castShadow = false;
  return p;
};

// 2005: beige membrane keyboard and a ball mouse on a give-away mouse pad.
export function input05() {
  const b = mat('#d9d1bc', { roughness: 0.6 });
  return group(keyboard(0.45, 0.028, 0.17, b, keysMat('#d9d1bc', '#efe9d8', '#b9b09a')), pad(0.2, 0.17, '#2f5fa8', 0.34), mouse(b, 0.34));
}

// 2008: slim black multimedia keyboard, optical mouse with a red glow underneath.
export function input08() {
  const k = mat('#1e1e20', { roughness: 0.45 });
  const g = group(keyboard(0.46, 0.02, 0.16, k, keysMat('#1e1e20', '#333338', '#55555c')), pad(0.22, 0.18, '#18181a', 0.35), mouse(k, 0.35, box(0.05, 0.004, 0.02, glow('#ff3030', 1.5), 0, 0, 0.03)));
  g.add(box(0.46, 0.006, 0.02, mat('#b9bcc0', { metalness: 0.5, roughness: 0.4 }), 0, 0.02, -0.07));
  return g;
}

// 2013: first mechanical keyboard, red backlight.
export function mechKb() {
  return keyboard(0.44, 0.036, 0.14, mat('#18181a', { roughness: 0.5 }), keysMat('#d92a22', '#17171a', '#3a0d0d', true));
}
export function input13() {
  const k = mat('#18181a', { roughness: 0.5 });
  return group(pad(0.8, 0.3, grainMat('#1c1c1f', '#55555c', [4, 2], 0.2), 0.14), at(mechKb(), 0, 0.004, 0), at(mouse(k, 0.36, box(0.02, 0.004, 0.03, glow('#ff3b30', 2), 0, 0.03, 0.03)), 0.36, 0.004, 0));
}

// 2019: compact keyboard with retro keycaps, wireless mouse, felt desk mat.
export function input19() {
  const g = group(pad(0.9, 0.38, grainMat('#77736b', '#2f2c28', [4, 2], 0.3), 0.1));
  g.add(at(keyboard(0.33, 0.03, 0.12, mat('#ded6c4', { roughness: 0.55 }), keysMat('#ded6c4', '#f4eede', '#d9773c')), 0, 0.004, 0));
  g.add(at(mouse(mat('#f1eee8', { roughness: 0.5 }), 0), 0.34, 0.004, 0));
  return g;
}

function speaker(w, h, d, body, cone, x) {
  const g = group(rbox(w, h, d, body, x, 0, 0, 0.008));
  for (const [y, r] of [[h * 0.32, w * 0.34], [h * 0.74, w * 0.18]]) {
    const c = cyl(r, 0.006, cone, x, 0, d / 2);
    c.rotation.x = Math.PI / 2;
    c.position.y = y;
    g.add(c);
  }
  return g;
}
export const spk05 = () => group(speaker(0.09, 0.16, 0.1, '#d6cdb6', '#5a5548', -0.34), speaker(0.09, 0.16, 0.1, '#d6cdb6', '#5a5548', 0.34));
export const spk08 = () => group(speaker(0.085, 0.2, 0.09, '#1b1b1d', '#b9bcc0', -0.38), speaker(0.085, 0.2, 0.09, '#1b1b1d', '#b9bcc0', 0.38));
export const sub08 = () => speaker(0.22, 0.26, 0.28, mat('#1b1b1d', { roughness: 0.6 }), '#3a3a40', 0);

// Headphones standing upright: band arc over two cups.
function phones(band, cup, mic) {
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.01, 8, 24, Math.PI), mat(band));
  arc.castShadow = true;
  arc.position.y = 0.1;
  const g = group(arc);
  for (const s of [-1, 1]) {
    const c = cyl(0.045, 0.035, cup, s * 0.085, 0, 0);
    c.rotation.z = Math.PI / 2;
    c.position.y = 0.08;
    g.add(c);
  }
  if (mic) g.add(at(box(0.006, 0.006, 0.11, '#111', 0, 0, 0), -0.09, 0.05, 0.05, 0, 0.5), ball(0.012, '#111', -0.09, 0.025, 0.1));
  return g;
}
// 2011: gaming headset with a boom mic, lying wherever it was dropped.
export const headset = () => at(phones('#1b1b1d', '#b3262a', true), 0, 0.03, 0, 0, -Math.PI / 2 + 0.2);
// 2018: proper headphones on a wooden stand.
export function hpStand() {
  return group(cyl(0.06, 0.015, '#8d5f3c'), box(0.02, 0.24, 0.02, '#8d5f3c', 0, 0.015, 0), box(0.06, 0.02, 0.05, '#8d5f3c', 0, 0.25, 0), at(phones('#d8d2c4', '#3a3d3c'), 0, 0.17, 0));
}

// 2017: USB condenser microphone on a boom arm.
export function mic() {
  const m = mat('#2a2a2c', { metalness: 0.6, roughness: 0.45 });
  const g = group(box(0.05, 0.05, 0.05, m, 0, 0, 0), at(box(0.02, 0.42, 0.02, m, 0, 0, 0), 0.07, 0.24, 0, 0, 0, -0.35), at(box(0.02, 0.4, 0.02, m, 0, 0, 0), 0.02, 0.5, 0.14, 0, 0.9, 0.5));
  const body = cyl(0.026, 0.11, '#3a3a3e', -0.07, 0.38, 0.3);
  const pop = cyl(0.05, 0.004, mat('#111', { transparent: true, opacity: 0.6 }), -0.07, 0.43, 0.36);
  pop.rotation.x = Math.PI / 2;
  g.add(body, pop, box(0.008, 0.008, 0.004, glow('#ff3b30', 2), -0.07, 0.46, 0.327));
  return g;
}

export const webcam = () => group(rbox(0.07, 0.03, 0.03, '#1b1b1d', 0, 0, 0, 0.01), box(0.02, 0.02, 0.004, mat('#223', { roughness: 0.1 }), 0, 0.005, 0.016));

// 2005: ADSL modem, the little box that sang before every session.
export function modem() {
  const g = group(rbox(0.16, 0.035, 0.12, '#cfc8b4', 0, 0, 0, 0.008));
  for (let i = 0; i < 4; i++) g.add(box(0.008, 0.004, 0.004, glow(i === 3 ? '#ff9a3a' : '#57d36a', 2), -0.05 + i * 0.02, 0.014, 0.061));
  return g;
}
// 2013: Wi-Fi router.
export function router() {
  const g = group(rbox(0.2, 0.03, 0.13, '#f1eee8', 0, 0, 0, 0.01), box(0.05, 0.003, 0.004, glow('#57d36a', 1.5), 0, 0.012, 0.066));
  for (const x of [-0.08, 0, 0.08]) g.add(cyl(0.005, 0.14, '#f1eee8', x, 0.02, -0.06));
  return g;
}

// 0: candy-bar phone, 1: first smartphone, 2: modern phone on a wireless charger.
export function phone(kind) {
  if (kind === 0) return group(rbox(0.045, 0.016, 0.105, '#2b3f6b', 0, 0, 0, 0.007), box(0.034, 0.002, 0.03, glow('#9fc7a0', 0.5), 0, 0.016, -0.025), box(0.034, 0.002, 0.04, '#aeb4c2', 0, 0.016, 0.025));
  if (kind === 1) return group(rbox(0.06, 0.01, 0.118, '#151517', 0, 0, 0, 0.005), box(0.052, 0.002, 0.09, mat('#22262d', { roughness: 0.15 }), 0, 0.01, -0.005));
  return group(cyl(0.05, 0.008, '#e9e6df'), rbox(0.072, 0.008, 0.15, '#3a4a44', 0, 0.008, 0, 0.004), box(0.066, 0.002, 0.144, mat('#14181a', { roughness: 0.1 }), 0, 0.016, 0));
}

// 2006: clamshell handheld left open on the nightstand.
export function handheld() {
  const s = mat('#c9d3de', { metalness: 0.3, roughness: 0.4 });
  return group(rbox(0.13, 0.018, 0.07, s, 0, 0, 0, 0.006), at(rbox(0.13, 0.014, 0.07, s, 0, 0, 0, 0.006), 0, 0.045, -0.055, 0, 1.1), at(box(0.06, 0.002, 0.045, glow('#bfe8c8', 0.6), 0, 0, 0), 0, 0.048, -0.047, 0, 1.1));
}

export function tv() {
  const k = mat('#141416', { roughness: 0.35 });
  const g = group(rbox(0.98, 0.57, 0.03, k, 0, 0.06, 0, 0.006), box(0.3, 0.012, 0.2, k, 0, 0, 0), box(0.05, 0.07, 0.03, k, 0, 0, -0.02));
  const dash = canvasTex(480, 270, (c, w, h) => {
    const bg = c.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#16335e');
    bg.addColorStop(1, '#0c1830');
    c.fillStyle = bg;
    c.fillRect(0, 0, w, h);
    ['#e8b04a', '#c9463d', '#3e8f6b', '#7a5fc0', '#4a86c9'].forEach((col, i) => {
      c.fillStyle = col;
      c.fillRect(30 + i * 88, i ? 100 : 86, i ? 78 : 92, i ? 78 : 92);
    });
    c.fillStyle = '#dfe8f5';
    c.font = '16px sans-serif';
    c.fillText('继续游戏 · 双人成行', 30, 210);
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 0.535), new THREE.MeshBasicMaterial({ map: dash, color: '#cccccc' }));
  scr.position.set(0, 0.345, 0.0165);
  g.add(scr);
  return g;
}

export const ps4 = () => group(rbox(0.275, 0.05, 0.3, '#17181b', 0, 0, 0, 0.008), box(0.275, 0.004, 0.006, glow('#3d8bff', 2), 0, 0.027, 0.148));
export const ps5 = () => group(rbox(0.02, 0.39, 0.26, '#f3f1ec', -0.045, 0.01, 0, 0.01), rbox(0.02, 0.39, 0.26, '#f3f1ec', 0.045, 0.01, 0, 0.01), box(0.07, 0.36, 0.23, '#141416', 0, 0.01, 0), cyl(0.07, 0.012, '#141416'), box(0.004, 0.12, 0.004, glow('#8fb6ff', 2), -0.034, 0.25, 0.13));
export const switchDock = () => group(rbox(0.17, 0.1, 0.05, '#1b1b1d', 0, 0, 0, 0.008), box(0.17, 0.1, 0.012, '#111', 0, 0.03, 0.005), box(0.034, 0.1, 0.014, '#e8473c', 0.102, 0.03, 0.005), box(0.034, 0.1, 0.014, '#3fb0d8', -0.102, 0.03, 0.005));
export const gamepad = (c = '#1b1b1d') => group(rbox(0.15, 0.03, 0.06, c, 0, 0, 0, 0.014), rbox(0.04, 0.03, 0.08, c, -0.06, 0, 0.03, 0.014), rbox(0.04, 0.03, 0.08, c, 0.06, 0, 0.03, 0.014));

// 2017: VR headset, used a lot for three months.
export function vr() {
  const w = mat('#e9e6df', { roughness: 0.5 });
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.008, 6, 20), mat('#2a2a2c'));
  strap.rotation.x = Math.PI / 2;
  strap.position.set(0, 0.05, -0.08);
  return group(rbox(0.18, 0.095, 0.09, w, 0, 0, 0, 0.03), strap);
}

// 2022: handheld PC on a charging dock.
export function deck() {
  return group(box(0.1, 0.03, 0.07, '#222', 0, 0, 0), at(group(rbox(0.3, 0.115, 0.022, '#1b1b1d', 0, 0, 0, 0.01), box(0.17, 0.1, 0.002, glow('#5e7fa8', 0.7), 0, 0.0075, 0.0115)), 0, 0.03, 0, 0, -0.3));
}
