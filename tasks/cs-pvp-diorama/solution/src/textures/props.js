import * as THREE from 'three';
import { fbm } from '../core/noise.js';
import { rand, range } from '../core/rng.js';
import { makeCanvas, toTexture, paintPixels, stains, speckle, scratches, streaksDown } from '../core/canvas.js';

// Textures that keep their geometry's own UVs (one image per face / wrap).

export function crate() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const plank = Math.floor(v * 5);
    const g = fbm(u * 0.3, v * 3, 8, 4, 101 + plank);
    const l = 0.78 + (g - 0.5) * 0.45;
    o[0] = 150 * l;
    o[1] = 108 * l;
    o[2] = 64 * l;
  });
  x.fillStyle = 'rgba(40,26,14,0.7)';
  for (let i = 1; i < 5; i++) x.fillRect(0, (i * s) / 5, s, 2);
  // frame + diagonal brace
  x.strokeStyle = '#6e4a28';
  x.lineWidth = 26;
  x.strokeRect(13, 13, s - 26, s - 26);
  x.lineWidth = 22;
  x.beginPath();
  x.moveTo(24, s - 24);
  x.lineTo(s - 24, 24);
  x.stroke();
  x.strokeStyle = 'rgba(25,16,8,0.85)';
  x.lineWidth = 2;
  x.strokeRect(26, 26, s - 52, s - 52);
  x.strokeRect(1, 1, s - 2, s - 2);
  x.fillStyle = '#2a2a2a';
  for (const [px, py] of [[13, 13], [s - 13, 13], [13, s - 13], [s - 13, s - 13]]) {
    x.fillRect(px - 3, py - 3, 6, 6);
  }
  x.font = 'bold 20px Arial, sans-serif';
  x.fillStyle = 'rgba(30,20,10,0.55)';
  x.fillText('FRAGILE', 150, 222);
  scratches(x, s, 40, '230,200,160', 0.35);
  stains(x, s, 6, '40,30,20', 0.35, 10, 40);
  return toTexture(c, { repeat: false });
}

export function barrel() {
  const w = 256;
  const h = 256;
  const c = makeCanvas(w, h);
  const x = c.getContext('2d');
  paintPixels(x, w, h, (u, v, o) => {
    const n = fbm(u, v, 6, 4, 111);
    const rib = Math.abs(v - 0.33) < 0.02 || Math.abs(v - 0.66) < 0.02 ? -40 : 0;
    const shade = 1 + 0.15 * Math.cos(u * Math.PI * 2 * 3);
    o[0] = (28 + rib * 0.2 + n * 20) * shade;
    o[1] = (78 + rib + n * 30) * shade;
    o[2] = (150 + rib + n * 40) * shade;
  });
  x.fillStyle = 'rgba(10,20,40,0.8)';
  x.fillRect(0, 0, w, 7);
  x.fillRect(0, h - 7, w, 7);
  stains(x, w, 16, '120,60,30', 0.55, 4, 16);
  scratches(x, w, 50, '200,210,230', 0.45);
  x.fillStyle = 'rgba(235,235,230,0.85)';
  x.fillRect(90, 100, 70, 52);
  x.fillStyle = '#c42a1a';
  x.beginPath();
  x.moveTo(125, 106);
  x.lineTo(150, 146);
  x.lineTo(100, 146);
  x.closePath();
  x.fill();
  streaksDown(x, w, 12, '90,50,30', 0.35, 90);
  return toTexture(c);
}

export function cardboard() {
  const s = 128;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const n = fbm(u, v, 4, 4, 121);
    const wet = fbm(u, v, 3, 3, 125) > 0.58 ? 0.72 : 1;
    const l = (0.85 + (n - 0.5) * 0.3) * wet;
    o[0] = 176 * l;
    o[1] = 136 * l;
    o[2] = 88 * l;
  });
  x.fillStyle = 'rgba(210,190,140,0.8)';
  x.fillRect(0, 56, s, 14);
  x.strokeStyle = 'rgba(60,40,20,0.7)';
  x.lineWidth = 2;
  x.strokeRect(1, 1, s - 2, s - 2);
  x.font = 'bold 14px Arial, sans-serif';
  x.fillStyle = 'rgba(40,30,20,0.7)';
  x.fillText('THIS SIDE UP', 14, 100);
  return toTexture(c, { repeat: false });
}

export function shutter() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const slat = 0.5 + 0.5 * Math.cos(v * Math.PI * 2 * 20);
    const n = fbm(u, v, 4, 4, 131);
    const rust = Math.min(1, Math.max(0, (fbm(u, v, 5, 4, 133) - 0.5) * 3));
    const l = 90 + slat * 60 + (n - 0.5) * 40;
    o[0] = l * (1 - rust) + 140 * rust;
    o[1] = l * 1.02 * (1 - rust) + 70 * rust;
    o[2] = l * 1.06 * (1 - rust) + 38 * rust;
  });
  streaksDown(x, s, 30, '110,50,24', 0.5, 160, true);
  return toTexture(c);
}

export function tire() {
  const s = 128;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  x.fillStyle = '#1b1c1f';
  x.fillRect(0, 0, s, s);
  x.fillStyle = '#0c0c0e';
  for (let i = 0; i < 16; i++) x.fillRect((i * s) / 16, 0, 3, s);
  speckle(x, s, 300, '90,90,96', 0.4);
  return toTexture(c);
}

export function hazardPlastic() {
  const s = 128;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  x.fillStyle = '#d8d2c4';
  x.fillRect(0, 0, s, s);
  x.fillStyle = '#c2361e';
  for (let i = -4; i < 8; i++) {
    x.beginPath();
    x.moveTo(i * 32, s);
    x.lineTo(i * 32 + 16, s);
    x.lineTo(i * 32 + 16 + s, 0);
    x.lineTo(i * 32 + s, 0);
    x.fill();
  }
  scratches(x, s, 30, '60,50,40', 0.4);
  stains(x, s, 6, '50,45,40', 0.3, 6, 20);
  return toTexture(c);
}

// Alpha-only textures (luminance -> alpha via alphaMap is awkward with toon; use RGBA maps).
export function grate() {
  const s = 128;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  x.clearRect(0, 0, s, s);
  x.fillStyle = '#5a3a26';
  for (let i = 0; i < 8; i++) x.fillRect(0, i * 16, s, 5);
  x.fillStyle = '#3e2c22';
  for (let i = 0; i < 2; i++) x.fillRect(i * 64, 0, 7, s);
  return toTexture(c);
}

export function chainLink() {
  const s = 64;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  x.clearRect(0, 0, s, s);
  x.strokeStyle = '#8b9096';
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(0, 0);
  x.lineTo(s, s);
  x.moveTo(s, 0);
  x.lineTo(0, s);
  x.stroke();
  return toTexture(c);
}

// Water trails: bright drops with a tail; scrolled vertically at runtime.
export function waterTrails(size = 256, count = 70) {
  const c = makeCanvas(size);
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(0,0,0,0)';
  x.fillRect(0, 0, size, size);
  for (let i = 0; i < count; i++) {
    const px = rand() * size;
    const py = rand() * size;
    const len = range(18, 70);
    const g = x.createLinearGradient(0, py - len, 0, py);
    g.addColorStop(0, 'rgba(210,225,240,0)');
    g.addColorStop(1, 'rgba(210,225,240,0.55)');
    x.fillStyle = g;
    x.fillRect(px - 0.8, py - len, 1.6, len);
    x.fillStyle = 'rgba(235,245,255,0.8)';
    x.beginPath();
    x.arc(px, py, range(1.4, 2.6), 0, 7);
    x.fill();
  }
  speckle(x, size, 300, '220,235,250', 0.5, 1.8);
  return toTexture(c);
}

export function glowSprite() {
  const s = 128;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function toonGradient() {
  const data = new Uint8Array([60, 120, 190, 255]);
  const t = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
}
