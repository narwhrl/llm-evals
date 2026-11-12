// The objects that stay for all twenty years, plus the poster art they share.
import * as THREE from 'three';
import { box, rbox, cyl, ball, plane, group, mat, glow, at, canvasTex, texMat, plaidMat, woodMat } from './kit.js';

// "剑与远方" – an invented 2005 RPG; its cover is reused on the box, the poster and the old CRT.
export function drawCover(g, w, h, withTitle = true) {
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#1b2350');
  sky.addColorStop(0.6, '#b0528a');
  sky.addColorStop(1, '#f2a65a');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  g.fillStyle = '#ffe9b0';
  g.beginPath();
  g.arc(w * 0.68, h * 0.4, w * 0.13, 0, 7);
  g.fill();
  g.fillStyle = '#3a2a55';
  g.beginPath();
  g.moveTo(0, h * 0.75);
  for (const [x, y] of [[0.2, 0.5], [0.35, 0.66], [0.55, 0.45], [0.8, 0.7], [1, 0.55], [1, 1], [0, 1]]) g.lineTo(x * w, y * h);
  g.fill();
  // lone swordsman on the ridge
  g.fillStyle = '#16122a';
  g.fillRect(w * 0.27, h * 0.5, w * 0.05, h * 0.16);
  g.beginPath();
  g.arc(w * 0.295, h * 0.48, w * 0.028, 0, 7);
  g.fill();
  g.fillRect(w * 0.33, h * 0.4, w * 0.012, h * 0.22);
  g.fillRect(0, h * 0.82, w, h * 0.18);
  if (withTitle) {
    g.fillStyle = '#ffe9b0';
    g.font = `bold ${h * 0.11}px "Songti SC", "SimSun", serif`;
    g.textAlign = 'center';
    g.fillText('剑与远方', w / 2, h * 0.94);
  }
}
const cover = () => canvasTex(256, 360, (g, w, h) => drawCover(g, w, h));

// Dad's enamel desk lamp. Still the warmest light in the room.
export function lamp() {
  const y = mat('#d9a441', { roughness: 0.45, metalness: 0.2 }), s = mat('#8a8a88', { metalness: 0.7, roughness: 0.4 });
  const shade = at(cyl(0.075, 0.09, y, 0, 0, 0, 0.03), 0.2, 0.4, 0, 0, 0, -0.5);
  const light = new THREE.SpotLight('#ffc27a', 5, 2.4, 0.85, 0.7, 1.6);
  light.position.set(0.2, 0.38, 0);
  light.target.position.set(0.34, 0, 0.12);
  return group(cyl(0.07, 0.02, y), cyl(0.008, 0.32, s, 0, 0.02, 0), at(cyl(0.008, 0.24, s), 0.1, 0.39, 0, 0, 0, -1.1), shade, ball(0.025, glow('#ffe2b0', 3), 0.215, 0.375, 0), light, light.target);
}

// Green dinosaur plush won at a school fair in 2005.
export function dino() {
  const gr = mat('#6f9e5a', { roughness: 1 }), be = mat('#e3d6a6', { roughness: 1 }), or = mat('#d9773c', { roughness: 1 });
  const body = ball(0.07, gr, 0, 0.075, 0);
  body.scale.set(1, 1.1, 0.95);
  const belly = ball(0.05, be, 0, 0.065, 0.035);
  const g = group(body, belly, ball(0.05, gr, 0, 0.175, 0.02), ball(0.03, gr, 0, 0.165, 0.065), ball(0.008, '#111', -0.022, 0.19, 0.06), ball(0.008, '#111', 0.022, 0.19, 0.06));
  for (const x of [-0.045, 0.045]) g.add(ball(0.028, gr, x, 0.02, 0.03), ball(0.02, gr, x * 1.5, 0.1, 0.03));
  for (let i = 0; i < 3; i++) g.add(at(cyl(0.016, 0.035, or, 0, 0, 0, 0.001, 8), 0, 0.2 - i * 0.055, -0.045 - i * 0.012, 0, -0.9));
  g.add(at(cyl(0.03, 0.09, gr, 0, 0, 0, 0.004, 10), 0, 0.03, -0.09, 0, -1.4));
  const patch = box(0.035, 0.035, 0.004, '#c9a24a', 0.03, 0.05, 0.066);
  g.add(patch);
  g.userData.update = (year) => (patch.visible = year >= 2012);
  return g;
}

// Enamel mug: tea in school days, pens ever since.
export function mug() {
  const w = mat('#f4f1ea', { roughness: 0.35 }), handle = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.006, 8, 16), w);
  handle.position.set(0.045, 0.045, 0);
  const tea = cyl(0.036, 0.004, '#7a4a22', 0, 0.075, 0);
  const pens = group(...['#c9463d', '#2f5fa8', '#222', '#e8b04a'].map((c, i) => at(cyl(0.004, 0.13, c), -0.015 + i * 0.01, 0.1, (i % 2) * 0.012 - 0.006, 0, 0.12 * (i - 1.5), 0.1 * (i - 1.5))));
  const g = group(cyl(0.04, 0.085, w), cyl(0.041, 0.006, '#2f5fa8', 0, 0.082, 0), box(0.03, 0.03, 0.002, '#c9463d', 0, 0.03, 0.04), handle, tea, pens);
  g.userData.update = (year) => {
    tea.visible = year < 2013;
    pens.visible = !tea.visible;
  };
  return g;
}

// The cactus that was supposed to absorb CRT radiation. It just kept growing.
export function cactus() {
  const gr = mat('#5d8a55', { roughness: 0.9 }), plant = group(ball(0.035, gr, 0, 0.035, 0));
  plant.children[0].scale.set(1, 1.25, 1);
  const arm = ball(0.018, gr, 0.035, 0.05, 0), flower = ball(0.012, '#e86a92', 0, 0.082, 0);
  plant.add(arm, flower);
  plant.position.y = 0.06;
  const g = group(cyl(0.035, 0.06, '#b5613c', 0, 0, 0, 0.045), plant);
  g.userData.update = (year) => {
    plant.scale.setScalar(1 + (year - 2005) * 0.055);
    arm.visible = year >= 2011;
    flower.visible = year >= 2022;
  };
  return g;
}

// Grandma's plaid quilt: on the bed, later folded over the sofa arm.
export function quilt() {
  const m = plaidMat('#b5483c', '#f1e2c0', '#2f4a6b', [3, 4]);
  const spread = rbox(1.0, 0.07, 1.3, m, 0, 0, 0.3, 0.03), folded = rbox(0.5, 0.13, 0.4, plaidMat('#b5483c', '#f1e2c0', '#2f4a6b', [2, 2]), 0, 0, 0, 0.05);
  const g = group(spread, folded);
  g.userData.update = (year) => {
    spread.visible = year < 2016.5;
    folded.visible = !spread.visible;
  };
  return g;
}

// The first boxed game.
export function gameBox() {
  const g = group(box(0.19, 0.25, 0.045, '#2a2140', 0, 0, 0));
  g.add(plane(0.19, 0.25, texMat(cover()), 0, 0.125, 0.0235));
  return g;
}

// Poster from the game magazine: taped up in 2005, sun-faded, framed in 2016.
export function posterTaped() {
  const m = texMat(cover(), { roughness: 0.9 }), g = group(plane(0.5, 0.7, m, 0, 0, 0.004));
  for (const [x, y] of [[-0.24, 0.34], [0.24, 0.34], [-0.24, -0.34], [0.24, -0.34]]) g.add(at(plane(0.07, 0.03, mat('#efe3b8', { transparent: true, opacity: 0.8 })), x, y, 0.006, 0, 0, x * y > 0 ? -0.7 : 0.7));
  const fresh = new THREE.Color('#ffffff'), faded = new THREE.Color('#d9c9a8');
  g.userData.update = (year) => m.color.lerpColors(fresh, faded, Math.min(1, (year - 2005) / 11));
  return g;
}
export function posterFramed() {
  return group(box(0.62, 0.82, 0.025, woodMat('#8d5f3c', '#5e3b22'), 0, -0.41, 0.0125), plane(0.56, 0.76, '#f3eee2', 0, 0, 0.026), plane(0.46, 0.644, texMat(cover(), { color: '#d9c9a8', roughness: 0.9 }), 0, 0, 0.027));
}

// Flowered dust cloth over the retired CRT and tower, with things piling up on top.
export function dustCover() {
  const cloth = texMat(canvasTex(128, 128, (g, w) => {
    g.fillStyle = '#e9dcc0';
    g.fillRect(0, 0, w, w);
    for (let i = 0; i < 16; i++) {
      g.fillStyle = ['#c9705f', '#7f9a6b', '#d9a441'][i % 3];
      g.beginPath();
      g.arc((i % 4) * 32 + 16 + (i % 2) * 6, ((i / 4) | 0) * 32 + 16, 7, 0, 7);
      g.fill();
    }
  }, [2, 2]), { roughness: 1 });
  return group(rbox(0.72, 0.47, 0.52, cloth, 0, 0, 0, 0.05), box(0.3, 0.1, 0.22, '#b08a5a', -0.12, 0.47, 0), box(0.21, 0.015, 0.29, '#c9463d', 0.2, 0.47, 0.02), box(0.21, 0.015, 0.29, '#2f5fa8', 0.19, 0.485, 0.03));
}

// What the old CRT shows once it is plugged in again.
export function retroTex() {
  return canvasTex(320, 240, (g, w, h) => {
    drawCover(g, w, h, false);
    g.fillStyle = 'rgba(0,0,0,0.25)';
    for (let y = 0; y < h; y += 3) g.fillRect(0, y, w, 1);
    g.fillStyle = '#fff3c4';
    g.textAlign = 'center';
    g.font = 'bold 34px "Songti SC", "SimSun", serif';
    g.fillText('剑与远方', w / 2, 60);
    g.font = '15px monospace';
    g.fillText('读取存档  2005-08-17  Lv.37', w / 2, h - 22);
  });
}
