// Traces of daily life: bags, snacks, lights, plants, the cat.
import * as THREE from 'three';
import { box, rbox, cyl, ball, plane, group, mat, glow, at, canvasTex, texMat, grainMat, woodMat, label } from './kit.js';

export function bag(body, trim) {
  return group(rbox(0.3, 0.4, 0.16, body, 0, 0, 0, 0.05), rbox(0.22, 0.16, 0.05, trim, 0, 0.04, 0.09, 0.02), box(0.03, 0.34, 0.02, trim, -0.08, 0.04, -0.09), box(0.03, 0.34, 0.02, trim, 0.08, 0.04, -0.09), box(0.06, 0.03, 0.02, trim, 0, 0.4, 0));
}
export function basketball() {
  const g = group(ball(0.12, mat('#c96a2a', { roughness: 0.9 }), 0, 0.12, 0));
  for (const r of [0, Math.PI / 2]) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.121, 0.003, 6, 32), mat('#2a1a10'));
    t.position.y = 0.12;
    t.rotation.y = r;
    g.add(t);
  }
  return g;
}
// A leaning pile of game magazines.
export function magazines() {
  const g = group(), cols = ['#c9463d', '#e8b04a', '#2f5fa8', '#3e8f6b', '#c9463d', '#7a5fc0', '#e8b04a', '#d9773c'];
  cols.forEach((c, i) => g.add(at(box(0.21, 0.012, 0.285, c, 0, 0, 0), Math.sin(i * 2.1) * 0.012, 0.006 + i * 0.012, Math.cos(i * 1.7) * 0.01, Math.sin(i) * 0.12)));
  return g;
}
export function cdSpindle() {
  const g = group(cyl(0.065, 0.01, '#222'), cyl(0.06, 0.09, mat('#cfd3d8', { metalness: 0.8, roughness: 0.25 }), 0, 0.01, 0));
  const cover = cyl(0.066, 0.12, mat('#dfe8ee', { transparent: true, opacity: 0.3, roughness: 0.1 }), 0, 0.01, 0);
  cover.castShadow = false;
  g.add(cover);
  return g;
}
// 2005: instant noodles and a cola, the after-school ritual.
export const noodles = () => group(cyl(0.04, 0.1, '#c9463d', 0, 0, 0, 0.055), cyl(0.056, 0.006, '#f4f1ea', 0, 0.1, 0), at(box(0.006, 0.12, 0.006, '#f4f1ea'), 0.02, 0.13, 0, 0, 0, -0.4), cyl(0.03, 0.2, mat('#3a1d12', { roughness: 0.2 }), 0.13, 0, 0.03), cyl(0.014, 0.03, '#c9463d', 0.13, 0.2, 0.03));
// 2009: energy drinks for raid nights.
export function cans() {
  const g = group();
  [[0, 0, 0], [0.07, 0, 0.02], [0.035, 0, 0.065], [0.03, 0.12, 0.02]].forEach(([x, y, z], i) => g.add(cyl(0.03, 0.12, mat(i % 2 ? '#2f5fa8' : '#c9a23a', { metalness: 0.6, roughness: 0.35 }), x, y, z)));
  return g;
}
// 2013: takeaway box and milk tea.
export const takeaway = () => group(rbox(0.18, 0.05, 0.13, '#f4f1ea', 0, 0, 0, 0.01), box(0.2, 0.004, 0.004, '#b08a5a', 0, 0.052, 0.03), cyl(0.035, 0.13, mat('#e6cfa8', { roughness: 0.3 }), 0.17, 0, 0, 0.042), cyl(0.004, 0.2, '#222', 0.17, 0, 0));
// 2019: pour-over coffee and a big water bottle. The body keeps score now.
export const coffee = () => group(cyl(0.04, 0.24, mat('#9fc3c9', { transparent: true, opacity: 0.6, roughness: 0.15 }), 0, 0, 0), cyl(0.03, 0.03, '#f4f1ea', 0, 0.24, 0), cyl(0.045, 0.1, mat('#e9e3d6', { roughness: 0.4 }), 0.14, 0, 0.02), cyl(0.06, 0.05, '#d8d2c4', 0.14, 0.1, 0.02, 0.02));
export const bin = () => group(cyl(0.11, 0.26, mat('#5f6a72', { roughness: 0.6 }), 0, 0, 0, 0.14), ball(0.04, '#f4f1ea', 0.03, 0.26, 0), ball(0.035, '#efe9d8', -0.04, 0.25, 0.03));
export function carton(w, h, d, text) {
  const m = mat('#b89366', { roughness: 0.95 });
  const g = group(box(w, h, d, m), box(w + 0.002, 0.03, 0.05, '#d9c9a0', 0, h - 0.03, d / 2 - 0.02));
  if (text) g.add(plane(w * 0.8, h * 0.5, label(w * 0.8, h * 0.5, (c, cw, ch) => {
    c.fillStyle = '#b89366';
    c.fillRect(0, 0, cw, ch);
    c.fillStyle = '#5a3d22';
    c.font = `bold ${ch * 0.42}px sans-serif`;
    c.textAlign = 'center';
    c.fillText(text, cw / 2, ch * 0.65);
  }), 0, h * 0.5, d / 2 + 0.002));
  return g;
}
// 2016: the boxes nobody dares to throw away while the warranty lasts.
export const boxPile = () => group(carton(0.62, 0.42, 0.34, '27" 显示器'), at(carton(0.42, 0.22, 0.3, '显卡'), 0.05, 0.42, 0, 0.2), at(carton(0.3, 0.14, 0.2, ''), -0.02, 0.64, 0.02, -0.3));
export const suitcase = () => group(rbox(0.42, 0.6, 0.22, mat('#4a6a8a', { roughness: 0.5 }), 0, 0.03, 0, 0.04), box(0.2, 0.03, 0.02, '#222', 0, 0.63, 0), cyl(0.02, 0.03, '#222', -0.15, 0, 0), cyl(0.02, 0.03, '#222', 0.15, 0, 0));
export function fitness() {
  const roll = cyl(0.07, 0.6, grainMat('#7a8fb0', '#42506b', [3, 1], 0.3), 0, 0, 0);
  roll.rotation.x = Math.PI / 2;
  roll.position.y = 0.07;
  const g = group(roll);
  for (const z of [-0.1, 0.1]) {
    const bar = cyl(0.012, 0.2, '#888', 0.25, 0, z);
    bar.rotation.z = Math.PI / 2;
    bar.position.y = 0.045;
    g.add(bar);
    for (const x of [0.17, 0.33]) g.add(at(cyl(0.045, 0.04, '#2a2a2c'), x, 0.045, z, 0, 0, Math.PI / 2));
  }
  return g;
}

function leaf(r, color, x, y, z, ry, tilt) {
  const l = ball(r, mat(color, { roughness: 0.8 }), 0, 0, 0);
  l.scale.set(1, 0.08, 0.7);
  return at(l, x, y, z, ry, 0, tilt);
}
export function pothos() {
  const leaves = group();
  for (let i = 0; i < 14; i++) leaves.add(leaf(0.035, i % 3 ? '#5f9458' : '#86b06a', Math.sin(i * 2.4) * 0.06, 0.02 - i * 0.012, Math.cos(i * 2.4) * 0.06, i, 0.5));
  leaves.position.y = 0.1;
  const g = group(cyl(0.05, 0.09, '#e9e3d6', 0, 0, 0, 0.06), leaves);
  g.userData.update = (year) => leaves.scale.set(1, 1 + Math.max(0, year - 2019.5) * 0.35, 1);
  return g;
}
export function monstera() {
  const g = group(cyl(0.14, 0.26, mat('#b5613c', { roughness: 0.9 }), 0, 0, 0, 0.17));
  for (let i = 0; i < 9; i++) {
    const a = i * 2.3, h = 0.5 + (i % 4) * 0.2, r = 0.1 + (i % 3) * 0.08;
    g.add(at(cyl(0.006, h, '#5d7a45'), Math.sin(a) * r * 0.5, 0.26 + h / 2, Math.cos(a) * r * 0.5, 0, Math.cos(a) * 0.25, -Math.sin(a) * 0.25));
    g.add(leaf(0.13, i % 2 ? '#3f7a4a' : '#4f8c55', Math.sin(a) * (r + 0.1), 0.28 + h, Math.cos(a) * (r + 0.1), a, 0.45));
  }
  return g;
}

// 2019: the cat that chose the sofa.
export function cat() {
  const f = mat('#d9a05a', { roughness: 1 }), body = ball(0.13, f, 0, 0.07, 0);
  body.scale.set(1.25, 0.55, 0.95);
  const g = group(body, ball(0.065, f, 0.13, 0.085, 0.07), ball(0.012, '#e8a0a0', 0.165, 0.075, 0.115));
  for (const s of [-1, 1]) g.add(at(cyl(0.022, 0.04, f, 0, 0, 0, 0.002, 6), 0.13 + s * 0.035, 0.145, 0.06, 0, 0, -s * 0.3));
  const tail = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.018, 8, 20, Math.PI * 1.1), f);
  tail.rotation.x = Math.PI / 2;
  tail.position.set(0.02, 0.03, 0.04);
  tail.castShadow = true;
  g.add(tail);
  g.userData.tick = (t) => (body.scale.y = 0.55 + Math.sin(t * 1.6) * 0.012);
  return g;
}
export const catBowl = () => group(cyl(0.07, 0.035, '#e9e3d6', 0, 0, 0, 0.055), cyl(0.05, 0.004, '#8a5a34', 0, 0.033, 0));

// 2005: the fluorescent tube every bedroom had, a little green.
export function tube() {
  const l = new THREE.PointLight('#e8f3e6', 2.2, 7, 1.6);
  l.position.set(0, -0.1, 0.25);
  const t = cyl(0.016, 1.0, glow('#f4fff2', 2.5));
  t.rotation.z = Math.PI / 2;
  t.position.set(0, 0, 0.05);
  t.castShadow = false;
  return group(box(1.1, 0.045, 0.05, '#e6e2d6', 0, -0.0225, 0.025), t, l);
}
// 2016: paper floor lamp.
export function floorLamp() {
  const l = new THREE.PointLight('#ffc98a', 3.2, 6, 1.6);
  l.position.y = 1.35;
  const shade = cyl(0.14, 0.42, mat('#f6e7c8', { emissive: '#ffcf96', emissiveIntensity: 0.9, roughness: 0.9 }), 0, 1.15, 0, 0.1);
  shade.castShadow = false;
  return group(cyl(0.13, 0.02, '#2a2a2c'), cyl(0.012, 1.15, '#2a2a2c', 0, 0.02, 0), shade, l);
}
// 2018: LED strip behind the desk: rainbow at first, plain warm white after 2023.
export function ledStrip() {
  const m = glow('#ff00aa', 2.2).clone(), warm = new THREE.Color('#ffc98a');
  const s = box(1.6, 0.012, 0.01, m);
  s.castShadow = false;
  const l = new THREE.PointLight('#ff00aa', 0.9, 2.2, 1.8);
  l.position.set(0, 0.12, 0.12);
  const g = group(s, l);
  let rainbow = true;
  g.userData.update = (year) => (rainbow = year < 2023.5);
  g.userData.tick = (t) => {
    if (rainbow) m.emissive.setHSL((t * 0.04) % 1, 0.9, 0.55);
    else m.emissive.copy(warm);
    m.color.copy(m.emissive);
    l.color.copy(m.emissive);
  };
  return g;
}

export function curtains() {
  const f = texMat(canvasTex(64, 64, (g) => {
    g.fillStyle = '#e8d2a0';
    g.fillRect(0, 0, 64, 64);
    g.fillStyle = '#c98a5a';
    for (let i = 0; i < 4; i++) g.fillRect(i * 16 + 6, 0, 3, 64);
    g.fillStyle = '#9a5a4a';
    for (let i = 0; i < 8; i++) g.fillRect((i % 4) * 16, (i * 23) % 64, 5, 5);
  }, [3, 4]), { roughness: 1, side: THREE.DoubleSide });
  const g = group(cyl(0.012, 1.7, '#8a6238'));
  g.children[0].rotation.x = Math.PI / 2;
  g.children[0].position.set(0.06, 1.28, 0);
  for (const z of [-0.68, 0.68]) for (let i = 0; i < 4; i++) g.add(cyl(0.035, 1.3, f, 0.06, -0.04, z + (i - 1.5) * 0.06 * Math.sign(z)));
  return g;
}
export function blind() {
  const m = grainMat('#e6dcc6', '#9a8a6a', [3, 2], 0.2), g = group(box(0.05, 0.05, 1.42, '#f3efe6', 0.03, 1.22, 0), box(0.012, 0.5, 1.36, m, 0.03, 0.72, 0));
  for (let i = 0; i < 4; i++) g.add(box(0.03, 0.03, 1.36, m, 0.035, 0.72 - i * 0.012, 0));
  return g;
}

// Wall calendar that always shows the current year.
export function calendar() {
  const tex = canvasTex(128, 180, () => {}), g = group(plane(0.24, 0.34, texMat(tex), 0, 0, 0.004));
  let shown = 0;
  g.userData.update = (year) => {
    const y = Math.floor(year);
    if (y === shown) return;
    shown = y;
    const c = tex.image.getContext('2d'), old = y < 2013;
    c.fillStyle = old ? '#c9302c' : '#f4f1ea';
    c.fillRect(0, 0, 128, 180);
    c.fillStyle = old ? '#ffe9a8' : '#3b2f25';
    c.textAlign = 'center';
    c.font = 'bold 40px "Songti SC", "SimSun", serif';
    c.fillText(String(y), 64, 52);
    c.font = '16px sans-serif';
    c.fillText(old ? '恭贺新禧' : '日 一 二 三 四 五 六', 64, 78);
    c.fillStyle = old ? '#fff6dc' : '#e9e3d6';
    c.fillRect(12, 90, 104, 78);
    c.fillStyle = '#5a4a3a';
    for (let i = 0; i < 28; i++) c.fillRect(18 + (i % 7) * 14, 98 + ((i / 7) | 0) * 17, 6, 6);
    tex.needsUpdate = true;
  };
  return g;
}

// 2005: merit certificates mum pinned above the desk.
export function certificate() {
  return group(plane(0.36, 0.26, label(0.36, 0.26, (c, w, h) => {
    c.fillStyle = '#f6e9b8';
    c.fillRect(0, 0, w, h);
    c.strokeStyle = '#c9302c';
    c.lineWidth = 10;
    c.strokeRect(8, 8, w - 16, h - 16);
    c.fillStyle = '#c9302c';
    c.textAlign = 'center';
    c.font = `bold ${h * 0.26}px "Songti SC", "SimSun", serif`;
    c.fillText('奖 状', w / 2, h * 0.42);
    c.fillStyle = '#5a4a3a';
    c.font = `${h * 0.1}px sans-serif`;
    c.fillText('三好学生 · 2005', w / 2, h * 0.68);
  }), 0, 0, 0.003));
}
export const photo = () => group(box(0.16, 0.12, 0.012, woodMat('#8d5f3c', '#5e3b22'), 0, 0, 0), plane(0.13, 0.09, label(0.13, 0.09, (c, w, h) => {
  c.fillStyle = '#6b8fb0';
  c.fillRect(0, 0, w, h);
  c.fillStyle = '#3a4a3a';
  c.fillRect(0, h * 0.7, w, h * 0.3);
  ['#e8b04a', '#c9463d', '#f4f1ea', '#3e8f6b'].forEach((col, i) => {
    c.fillStyle = '#e6c4a0';
    c.beginPath();
    c.arc(w * (0.2 + i * 0.2), h * 0.45, h * 0.1, 0, 7);
    c.fill();
    c.fillStyle = col;
    c.fillRect(w * (0.13 + i * 0.2), h * 0.55, w * 0.14, h * 0.4);
  });
}), 0, 0.06, 0.007));
