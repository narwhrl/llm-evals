// Canvas-backed computer screens. The main screen is a tiny immediate-mode UI: apps draw every refresh
// and register hit boxes; a click on the 3D screen is mapped through UV to those boxes.
import * as THREE from 'three';
import { APPS, drawSide } from './apps.js';
import { Mines } from './mines.js';

const CW = 1280, CH = 640, LH = 600; // canvas pixels, logical height
const FONT = '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif';
const STARTS = [2005, 2008.9, 2012.6, 2016.9, 2020.3, 2023.5];
export const GLOW = ['#8fb4ff', '#7fc0d0', '#6f93c0', '#e6a868', '#a8bde0', '#f2cfa6'];

function surface() {
  const canvas = document.createElement('canvas');
  canvas.width = CW;
  canvas.height = CH;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return { g: canvas.getContext('2d'), tex, mat: new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }) };
}

export class Screens {
  constructor() {
    this.main = surface();
    this.side = surface();
    this.hits = [];
    this.app = -1;
    this.state = {};
    this.mines = new Mines();
    this.W = 800;
    this.H = LH;
    this.sideKey = '';
    this.last = -1;
  }
  get glow() {
    return GLOW[Math.max(0, this.app)];
  }

  // --- drawing helpers used by the apps (logical coordinates) ---
  rect(x, y, w, h, fill, r = 0) {
    const g = this.g;
    g.fillStyle = fill;
    if (!r) return g.fillRect(x, y, w, h);
    g.beginPath();
    g.roundRect(x, y, w, h, r);
    g.fill();
  }
  text(str, x, y, size, color, align = 'left', weight = '') {
    const g = this.g;
    g.font = `${weight} ${size}px ${FONT}`;
    g.fillStyle = color;
    g.textAlign = align;
    g.textBaseline = 'middle';
    g.fillText(str, x, y);
  }
  hit(x, y, w, h, fn) {
    this.hits.push([x, y, w, h, fn]);
  }
  btn(x, y, w, h, label, fn, bg = '#e9e3d6', fg = '#222', size = 16, r = 4) {
    this.rect(x, y, w, h, bg, r);
    this.text(label, x + w / 2, y + h / 2 + 1, size, fg, 'center');
    this.hit(x, y, w, h, fn);
  }
  win(x, y, w, h, title, bar = '#2a5bd7', bg = '#ece9d8', fg = '#fff') {
    this.rect(x - 2, y - 2, w + 4, h + 4, 'rgba(0,0,0,0.25)', 6);
    this.rect(x, y, w, h, bg, 5);
    this.rect(x, y, w, 26, bar, 5);
    this.text(title, x + 10, y + 14, 14, fg, 'left', 'bold');
    this.hit(x, y, w, h, () => {}); // windows swallow clicks meant for what is underneath
  }

  // Redraw at most ~8 times a second; `year` picks the era app, `aspect` the monitor in use.
  update(year, aspect, sideAspect, t) {
    let app = 0;
    STARTS.forEach((s, i) => year >= s && (app = i));
    const W = Math.round(LH * aspect);
    const changed = app !== this.app || W !== this.W;
    if (app !== this.app) this.state = {};
    this.app = app;
    this.W = W;
    if (!changed && !this.dirty && t - this.last < 0.12) return;
    this.last = t;
    this.dirty = false;
    this.t = t;
    this.hits = [];
    this.g = this.main.g;
    this.g.setTransform(CW / W, 0, 0, CH / LH, 0, 0);
    APPS[app](this, this.state, t);
    this.main.tex.needsUpdate = true;

    const key = app + ':' + sideAspect + ':' + Math.floor(t / 1.5);
    if (sideAspect && key !== this.sideKey) {
      this.sideKey = key;
      this.g = this.side.g;
      const SW = Math.round(LH * sideAspect);
      this.g.setTransform(CW / SW, 0, 0, CH / LH, 0, 0);
      drawSide(this, app, SW, LH, Math.floor(t / 1.5));
      this.side.tex.needsUpdate = true;
      this.g = this.main.g;
    }
  }
  click(u, v) {
    const x = u * this.W, y = (1 - v) * this.H;
    for (let i = this.hits.length - 1; i >= 0; i--) {
      const [hx, hy, hw, hh, fn] = this.hits[i];
      if (x >= hx && x <= hx + hw && y >= hy && y <= hy + hh) {
        fn(x, y);
        break;
      }
    }
    this.dirty = true;
  }
}
