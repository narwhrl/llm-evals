import * as THREE from 'three';
import { canvas, toTex } from './textures.js';
import { ERAS, E08, E12, E16, E20, E25 } from './timeline.js';
import { txt, rr, grad, inside, mines, qq, note, computer, lobby, music, group, library, aim, meet, sheet, voice, album } from './apps.js';

export const osAt = (t) => (t < E08 ? 'xp' : t < E12 ? 'xp08' : t < E16 ? 'win7' : t < E20 ? 'win10' : t < E25 ? 'wfh' : 'w11');

const H = 480, SCALE = 1.6;
const THEMES = { xp: { bar: 28, title: 24, b: 3 }, noir: { bar: 28, title: 24, b: 3 }, aero: { bar: 32, title: 24, b: 5 }, flat: { bar: 32, title: 28, b: 1 }, w11: { bar: 36, title: 30, b: 1 } };

const OS = {
  xp: { aspect: 4 / 3, theme: 'xp', wall: 'bliss', crt: true, clock: '21:47', boot: ['qq'],
    icons: [['我的电脑', 'pc'], ['扫雷', 'mines'], ['QQ', 'qq'], ['作业.txt', 'note']] },
  xp08: { aspect: 16 / 10, theme: 'noir', wall: 'night', clock: '22:15', boot: ['lobby'],
    icons: [['对战平台', 'lobby'], ['千千静听', 'music'], ['QQ 群', 'group'], ['扫雷', 'mines']] },
  win7: { aspect: 16 / 9, theme: 'aero', wall: 'aero', clock: '23:08', lib: 2012, boot: ['lib'],
    icons: [['游戏库', 'lib'], ['千千静听', 'music'], ['扫雷', 'mines']] },
  win10: { aspect: 16 / 9, theme: 'flat', wall: 'beam', clock: '00:41', lib: 2016, boot: ['aim'],
    icons: [['瞄准训练', 'aim'], ['游戏库', 'lib']] },
  wfh: { aspect: 2.37, theme: 'flat', wall: 'lake', clock: '17:59', lib: 2020, boot: ['sheet', 'meet'],
    icons: [['视频会议', 'meet'], ['Q2 排期', 'sheet'], ['语音', 'voice'], ['游戏库', 'lib']] },
  w11: { aspect: 2.37, theme: 'w11', wall: 'bloom', clock: '22:03', lib: 2025, boot: ['album'],
    icons: [['照片', 'album'], ['游戏库', 'lib'], ['语音', 'voice'], ['扫雷', 'mines']] },
};

function glyph(g, id, x, y, s = 36) {
  g.save();
  g.translate(x, y);
  g.scale(s / 36, s / 36);
  const C = (c, cx, cy, r) => { g.fillStyle = c; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill(); };
  switch (id) {
    case 'pc': rr(g, 4, 4, 28, 20, 2, '#d9d4c4', '#777'); g.fillStyle = '#3a78c9'; g.fillRect(7, 7, 22, 14); g.fillStyle = '#bbb'; g.fillRect(12, 26, 12, 6); break;
    case 'mines': rr(g, 3, 3, 30, 30, 3, '#c0c0c0', '#666'); C('#111', 18, 18, 8); g.fillStyle = '#111'; g.fillRect(17, 6, 2, 24); g.fillRect(6, 17, 24, 2); C('#fff', 15, 15, 2); break;
    case 'qq': C('#111', 18, 16, 13); C('#fff', 18, 21, 9); g.fillStyle = '#f5a623'; g.fillRect(9, 28, 18, 5); C('#d0021b', 18, 27, 0); break;
    case 'note': rr(g, 7, 3, 22, 30, 2, '#fff', '#888'); g.fillStyle = '#8ab'; for (let i = 0; i < 5; i++) g.fillRect(10, 9 + i * 5, 16, 1.5); break;
    case 'lobby': C('#1b3554', 18, 18, 15); g.strokeStyle = '#ffd27a'; g.lineWidth = 3; g.beginPath(); g.moveTo(10, 10); g.lineTo(26, 26); g.moveTo(26, 10); g.lineTo(10, 26); g.stroke(); break;
    case 'music': C('#2f7a3a', 18, 18, 15); txt(g, '♪', 18, 19, 20, '#e8ff6a', { align: 'center', bold: true }); break;
    case 'group': C('#3e86d9', 13, 14, 7); C('#5fb0ff', 23, 14, 7); rr(g, 5, 22, 26, 10, 5, '#3e86d9'); break;
    case 'lib': rr(g, 3, 3, 30, 30, 7, '#1b2838'); C('#c7d5e0', 22, 14, 5); C('#1b2838', 22, 14, 2.5); g.fillStyle = '#c7d5e0'; g.fillRect(8, 20, 14, 3); break;
    case 'aim': C('#e94560', 18, 18, 14); C('#fff', 18, 18, 9); C('#e94560', 18, 18, 4); break;
    case 'voice': rr(g, 3, 3, 30, 30, 9, '#5865f2'); C('#fff', 13, 18, 3.5); C('#fff', 23, 18, 3.5); break;
    case 'album': rr(g, 3, 6, 30, 24, 3, '#7fb8f0'); g.fillStyle = '#4a9a4a'; g.beginPath(); g.moveTo(3, 30); g.lineTo(14, 16); g.lineTo(22, 24); g.lineTo(33, 14); g.lineTo(33, 30); g.fill(); C('#ffe066', 26, 12, 3); break;
    case 'meet': rr(g, 3, 9, 22, 18, 4, '#2d8cff'); g.fillStyle = '#2d8cff'; g.beginPath(); g.moveTo(25, 18); g.lineTo(33, 11); g.lineTo(33, 25); g.fill(); break;
    case 'sheet': rr(g, 3, 3, 30, 30, 3, '#217346'); g.fillStyle = '#fff'; for (let i = 0; i < 3; i++) g.fillRect(8, 9 + i * 7, 20, 3); break;
    default: break;
  }
  g.restore();
}

function paintWall(kind, W) {
  const [c, g] = canvas(Math.round(W * SCALE), Math.round(H * SCALE));
  g.scale(SCALE, SCALE);
  const ell = (x, y, rx, ry, col, rot = 0) => { g.fillStyle = col; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, 7); g.fill(); };
  if (kind === 'bliss') {
    g.fillStyle = grad(g, 0, 0, 0, H, ['#2a6fd6', '#7db8f2', '#cfe8ff']); g.fillRect(0, 0, W, H);
    for (const [x, y, s] of [[120, 90, 1], [380, 60, 1.3], [540, 140, 0.8]]) for (let k = 0; k < 5; k++) ell(x + k * 22 * s, y + Math.sin(k) * 6, 30 * s, 14 * s, 'rgba(255,255,255,0.75)');
    g.fillStyle = grad(g, 0, 250, 0, H, ['#7cc046', '#3f8a1f']);
    g.beginPath(); g.moveTo(0, 330); g.bezierCurveTo(W * 0.3, 210, W * 0.6, 230, W, 300); g.lineTo(W, H); g.lineTo(0, H); g.fill();
  } else if (kind === 'night') {
    g.fillStyle = grad(g, 0, 0, 0, H, ['#0d1330', '#3a2350', '#120c18']); g.fillRect(0, 0, W, H);
    for (let i = 0; i < 80; i++) ell((i * 97) % W, (i * 53) % 220, 1, 1, 'rgba(255,255,255,0.7)');
    ell(W * 0.72, 120, 54, 54, '#f3e3b0');
    g.fillStyle = '#07060c'; g.beginPath(); g.moveTo(0, H);
    for (let x = 0; x <= W; x += 40) g.lineTo(x, 330 - ((x / 40) % 3) * 22 - (x > W * 0.45 && x < W * 0.55 ? 90 : 0));
    g.lineTo(W, H); g.fill();
    txt(g, '冰 封 王 座', W * 0.28, 140, 40, 'rgba(201,165,74,0.85)', { bold: true, align: 'center' });
  } else if (kind === 'aero') {
    g.fillStyle = grad(g, 0, 0, W, H, ['#0e5aa7', '#1d8fe1', '#0a3d7a']); g.fillRect(0, 0, W, H);
    g.lineWidth = 18;
    for (let i = 0; i < 6; i++) {
      g.strokeStyle = `rgba(255,255,255,${0.05 + i * 0.02})`;
      g.beginPath(); g.moveTo(-50, 380 - i * 30); g.bezierCurveTo(W * 0.3, 200 - i * 20, W * 0.6, 420 - i * 25, W + 50, 160 + i * 15); g.stroke();
    }
  } else if (kind === 'beam') {
    g.fillStyle = grad(g, 0, 0, W, H, ['#020f24', '#06306a', '#0a4f9e']); g.fillRect(0, 0, W, H);
    g.fillStyle = grad(g, W * 0.4, 0, W, H, ['rgba(120,200,255,0.0)', 'rgba(120,200,255,0.55)', 'rgba(210,240,255,0.9)']);
    g.beginPath(); g.moveTo(W * 0.52, 80); g.lineTo(W * 0.86, 40); g.lineTo(W * 0.86, 400); g.lineTo(W * 0.52, 360); g.fill();
    g.strokeStyle = 'rgba(2,15,36,0.8)'; g.lineWidth = 6;
    g.beginPath(); g.moveTo(W * 0.69, 60); g.lineTo(W * 0.69, 380); g.moveTo(W * 0.52, 220); g.lineTo(W * 0.86, 220); g.stroke();
  } else if (kind === 'lake') {
    g.fillStyle = grad(g, 0, 0, 0, H, ['#f2c9a0', '#a9c8c8', '#3f6f78']); g.fillRect(0, 0, W, H);
    ['#7c9a9a', '#55797f', '#3a5a62'].forEach((col, i) => {
      g.fillStyle = col; g.beginPath(); g.moveTo(0, H);
      for (let x = 0; x <= W; x += 30) g.lineTo(x, 230 + i * 30 - Math.abs(Math.sin(x * 0.006 + i * 2)) * (110 - i * 30));
      g.lineTo(W, H); g.fill();
    });
    g.fillStyle = 'rgba(30,60,70,0.85)'; g.fillRect(0, 340, W, H - 340);
  } else if (kind === 'bloom') {
    g.fillStyle = grad(g, 0, 0, W, H, ['#e9f1fb', '#cddff4', '#e7eef8']); g.fillRect(0, 0, W, H);
    for (let i = 0; i < 6; i++) {
      g.save(); g.translate(W / 2, 250); g.rotate(-1.4 + i * 0.5);
      g.fillStyle = grad(g, 0, -40, 0, 160, ['rgba(70,130,230,0.85)', 'rgba(140,190,250,0.25)']);
      g.beginPath(); g.ellipse(0, 70, 46, 120, 0, 0, 7); g.fill();
      g.restore();
    }
  }
  return c;
}

class Desk {
  constructor(id, cfg, onJump) {
    Object.assign(this, cfg);
    this.id = id;
    this.onJump = onJump;
    this.W = Math.round(H * cfg.aspect);
    [this.c, this.g] = canvas(Math.round(this.W * SCALE), Math.round(H * SCALE));
    this.tex = toTex(this.c);
    this.th = THEMES[cfg.theme];
    this.wallImg = paintWall(cfg.wall, this.W);
    this.wins = [];
    this.menu = false;
    this.off = false;
    this.toast = null;
    this.last = 0;
    cfg.boot.forEach((a) => this.open(a));
    this.dirty = true;
  }

  make(id) {
    switch (id) {
      case 'mines': return mines();
      case 'qq': return qq();
      case 'note': return note();
      case 'pc': return computer();
      case 'lobby': return lobby();
      case 'music': return music();
      case 'group': return group();
      case 'lib': return library(this.lib);
      case 'aim': return aim();
      case 'meet': return meet(this);
      case 'sheet': return sheet();
      case 'voice': return voice(this.lib);
      case 'album': return album(ERAS, this.onJump);
      default: throw new Error(`unknown app ${id}`);
    }
  }

  size(app) { return [app.w + this.th.b * 2, app.h + this.th.title + this.th.b]; }

  open(id) {
    const found = this.wins.find((w) => w.id === id);
    if (found) return this.front(found);
    const app = this.make(id);
    const [fw, fh] = this.size(app);
    const n = this.wins.length;
    const x = Math.max(4, Math.min(app.w < 200 && !n ? this.W - fw - 24 : 110 + n * 34, this.W - fw - 8));
    const y = Math.max(4, Math.min(20 + n * 30, H - this.th.bar - fh - 6));
    this.wins.push({ id, app, x, y });
    this.dirty = true;
  }

  front(w) { this.wins.splice(this.wins.indexOf(w), 1); this.wins.push(w); }

  clockOut() {
    this.wins = this.wins.filter((w) => w.id !== 'meet' && w.id !== 'sheet');
    this.open('voice');
    this.toast = { text: '下班啦，今天辛苦了！', at: performance.now() };
  }

  animated() {
    return this.wins.some((w) => w.app.animated?.()) || (this.toast && performance.now() - this.toast.at < 3000);
  }

  // taskbar hit areas shared by draw and click
  barLayout() {
    const { bar } = this.th, y = H - bar;
    if (this.theme === 'w11') {
      const n = this.wins.length, cx = this.W / 2, start = cx - ((n + 1) * 40) / 2;
      return { start: [start, y, 36, bar], btns: this.wins.map((w, i) => ({ w, r: [start + 40 * (i + 1), y, 36, bar] })) };
    }
    const sw = this.theme === 'xp' || this.theme === 'noir' ? 96 : 48;
    const bw = this.theme === 'xp' || this.theme === 'noir' ? 130 : 150;
    const left = this.theme === 'flat' && this.W > 900 ? sw + 250 : sw + 12;
    return { start: [0, y, sw, bar], btns: this.wins.map((w, i) => ({ w, r: [left + i * (bw + 4), y + 3, bw, bar - 6] })) };
  }

  menuItems() {
    const items = this.icons.map(([label, id]) => ({ label, id }));
    if (this.theme === 'xp') items.push({ label: '关闭计算机', id: 'off' });
    const w = 190, h = items.length * 30 + 50;
    const lay = this.barLayout();
    const x = this.theme === 'w11' ? Math.max(4, lay.start[0] - 60) : 0;
    return { items, rect: [x, H - this.th.bar - h, w, h] };
  }

  drawFrame(g, w, focused) {
    const { title: th, b } = this.th;
    const [fw, fh] = this.size(w.app);
    const { x, y } = w;
    const t = this.theme;
    if (t === 'xp' || t === 'noir') {
      const base = t === 'xp' ? '#0831d9' : '#1c1c1c';
      rr(g, x, y, fw, fh, [8, 8, 0, 0], base);
      g.fillStyle = t === 'xp' ? grad(g, 0, y, 0, y + th, focused ? ['#3d8af7', '#0a5fe8', '#0a4fd0'] : ['#9db9eb', '#7a96df']) : grad(g, 0, y, 0, y + th, ['#4a4a4a', '#121212']);
      g.beginPath(); g.roundRect(x, y, fw, th, [8, 8, 0, 0]); g.fill();
      txt(g, w.app.title, x + 8, y + th / 2 + 1, 12, '#fff', { bold: true });
      rr(g, x + fw - 22, y + 3, 18, 18, 3, '#e0532f', '#fff');
      txt(g, '×', x + fw - 13, y + 12, 15, '#fff', { align: 'center', bold: true });
    } else if (t === 'aero') {
      rr(g, x, y, fw, fh, 6, 'rgba(150,195,235,0.88)', 'rgba(30,50,80,0.7)');
      txt(g, w.app.title, x + 10, y + th / 2, 12, '#0b1d33');
      rr(g, x + fw - 46, y + 1, 40, 18, [0, 0, 4, 4], '#c8463b');
      txt(g, '×', x + fw - 26, y + 10, 14, '#fff', { align: 'center', bold: true });
    } else {
      const w11 = t === 'w11';
      g.save();
      g.shadowColor = 'rgba(0,0,0,0.35)'; g.shadowBlur = w11 ? 18 : 10;
      rr(g, x, y, fw, fh, w11 ? 8 : 0, w11 ? '#f3f3f3' : '#fff', w11 ? 'rgba(0,0,0,0.15)' : '#6a6a6a');
      g.restore();
      txt(g, w.app.title, x + 12, y + th / 2, 12, focused ? '#111' : '#777');
      txt(g, '—', x + fw - 70, y + th / 2, 12, '#333', { align: 'center' });
      txt(g, '×', x + fw - 22, y + th / 2, 16, '#333', { align: 'center' });
    }
  }

  drawBar(g) {
    const { bar } = this.th, y = H - bar, W = this.W, t = this.theme;
    const lay = this.barLayout();
    if (t === 'xp' || t === 'noir') {
      g.fillStyle = t === 'xp' ? grad(g, 0, y, 0, H, ['#3c7cf0', '#245edb', '#1941a5']) : grad(g, 0, y, 0, H, ['#3a3a3a', '#0c0c0c']);
      g.fillRect(0, y, W, bar);
      g.fillStyle = grad(g, 0, y, 0, H, ['#4cb34c', '#2f8b2f', '#1f6f1f']);
      g.beginPath(); g.roundRect(0, y, 96, bar, [0, 12, 12, 0]); g.fill();
      ['#f25022', '#7fba00', '#00a4ef', '#ffb900'].forEach((c, i) => { g.fillStyle = c; g.fillRect(10 + (i % 2) * 8, y + 7 + Math.floor(i / 2) * 8, 7, 7); });
      txt(g, '开始', 32, y + bar / 2 + 1, 15, '#fff', { bold: true });
      g.fillStyle = t === 'xp' ? '#0f8af0' : '#222'; g.fillRect(W - 86, y, 86, bar);
      lay.btns.forEach(({ w, r }, i) => {
        rr(g, ...r, 3, i === lay.btns.length - 1 ? (t === 'xp' ? '#1e4fb8' : '#111') : (t === 'xp' ? '#3c81f3' : '#3a3a3a'));
        txt(g, w.app.title.slice(0, 9), r[0] + 8, r[1] + r[3] / 2, 11, '#fff');
      });
      txt(g, this.clock, W - 43, y + bar / 2, 12, '#fff', { align: 'center' });
    } else if (t === 'aero') {
      g.fillStyle = 'rgba(14,30,52,0.82)'; g.fillRect(0, y, W, bar);
      g.fillStyle = 'rgba(255,255,255,0.15)'; g.fillRect(0, y, W, 1);
      g.fillStyle = grad(g, 0, y, 0, H, ['#8fd0ff', '#1d6fc7']); g.beginPath(); g.arc(24, y + bar / 2, 13, 0, 7); g.fill();
      lay.btns.forEach(({ w, r }) => { rr(g, ...r, 3, 'rgba(255,255,255,0.18)', 'rgba(255,255,255,0.3)'); txt(g, w.app.title.slice(0, 10), r[0] + 8, r[1] + r[3] / 2, 11, '#fff'); });
      txt(g, this.clock, W - 40, y + 10, 11, '#fff', { align: 'center' });
      txt(g, '2012/7/16', W - 40, y + 23, 10, '#cde', { align: 'center' });
    } else if (t === 'flat') {
      g.fillStyle = '#121316'; g.fillRect(0, y, W, bar);
      ['#fff', '#fff', '#fff', '#fff'].forEach((c, i) => { g.fillStyle = c; g.fillRect(16 + (i % 2) * 9, y + 8 + Math.floor(i / 2) * 9, 8, 8); });
      if (W > 900) { g.fillStyle = '#2b2c30'; g.fillRect(50, y + 4, 230, bar - 8); txt(g, '在这里输入你要搜索的内容', 62, y + bar / 2, 11, '#aaa'); }
      lay.btns.forEach(({ w, r }) => { g.fillStyle = 'rgba(255,255,255,0.1)'; g.fillRect(...r); g.fillStyle = '#78b4ff'; g.fillRect(r[0], r[1] + r[3] - 2, r[2], 2); txt(g, w.app.title.slice(0, 10), r[0] + 8, r[1] + r[3] / 2, 11, '#fff'); });
      txt(g, this.clock, W - 44, y + 10, 11, '#fff', { align: 'center' });
      txt(g, this.id === 'wfh' ? '2020/3/12' : '2016/7/16', W - 44, y + 23, 10, '#ccc', { align: 'center' });
    } else {
      g.fillStyle = 'rgba(238,241,247,0.94)'; g.fillRect(0, y, W, bar);
      const [sx] = lay.start;
      ['#3a8ee6', '#3a8ee6', '#3a8ee6', '#3a8ee6'].forEach((c, i) => { g.fillStyle = c; g.fillRect(sx + 9 + (i % 2) * 10, y + 9 + Math.floor(i / 2) * 10, 9, 9); });
      lay.btns.forEach(({ w, r }, i) => {
        glyph(g, w.id, r[0] + 6, r[1] + 6, 24);
        g.fillStyle = i === lay.btns.length - 1 ? '#3a8ee6' : '#999'; g.fillRect(r[0] + 12, r[1] + r[3] - 4, 12, 2);
      });
      txt(g, this.clock, W - 50, y + 12, 11, '#222', { align: 'center' });
      txt(g, '2025/7/18', W - 50, y + 26, 10, '#444', { align: 'center' });
    }
  }

  draw(now) {
    const g = this.g, W = this.W;
    g.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    this.dirty = false;
    this.last = now;
    if (this.off) {
      g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
      txt(g, '现在可以安全地关闭计算机了。', W / 2, H / 2 - 10, 22, '#f0a030', { align: 'center', bold: true });
      txt(g, '（点击屏幕重新开机）', W / 2, H / 2 + 24, 13, '#777', { align: 'center' });
    } else {
      g.drawImage(this.wallImg, 0, 0, W, H);
      this.icons.forEach(([label, id], i) => {
        const x = 18, y = 16 + i * 74;
        glyph(g, id, x + 14, y);
        g.save(); g.shadowColor = 'rgba(0,0,0,0.9)'; g.shadowBlur = 4; g.shadowOffsetY = 1;
        // stacked shadow keeps white labels legible on the pale wallpapers
        for (let k = 0; k < 3; k++) txt(g, label, x + 32, y + 50, 12, '#fff', { align: 'center' });
        g.restore();
      });
      this.wins.forEach((w, i) => {
        this.drawFrame(g, w, i === this.wins.length - 1);
        const cx = w.x + this.th.b, cy = w.y + this.th.title;
        g.save();
        g.beginPath(); g.rect(cx, cy, w.app.w, w.app.h); g.clip();
        g.translate(cx, cy);
        w.app.draw(g, w.app.w, w.app.h, now);
        g.restore();
      });
      if (this.menu) {
        const { items, rect } = this.menuItems();
        const [x, y, mw, mh] = rect;
        const dark = this.theme !== 'xp' && this.theme !== 'w11';
        rr(g, x, y, mw, mh, this.theme === 'w11' ? 8 : 0, dark ? 'rgba(25,28,34,0.96)' : '#fff', '#2a4f9a');
        g.fillStyle = this.theme === 'xp' ? grad(g, 0, y, 0, y + 40, ['#3d8af7', '#1d5ad8']) : dark ? '#30343c' : '#e6ecf5';
        g.fillRect(x + 1, y + 1, mw - 2, 40);
        txt(g, '屿', x + 14, y + 21, 15, dark || this.theme === 'xp' ? '#fff' : '#222', { bold: true });
        items.forEach((it, i) => {
          if (it.id !== 'off') glyph(g, it.id, x + 10, y + 50 + i * 30, 22);
          txt(g, it.label, x + 40, y + 61 + i * 30, 13, dark ? '#eee' : '#222');
        });
      }
      this.drawBar(g);
      if (this.toast && now - this.toast.at < 3000) {
        rr(g, W - 250, H - this.th.bar - 70, 236, 56, 6, 'rgba(30,32,36,0.95)');
        txt(g, this.toast.text, W - 236, H - this.th.bar - 42, 14, '#fff', { bold: true });
      }
    }
    if (this.crt) {
      g.fillStyle = 'rgba(0,0,0,0.13)';
      for (let y = 0; y < H; y += 3) g.fillRect(0, y, W, 1);
      const v = g.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.85);
      v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.45)');
      g.fillStyle = v; g.fillRect(0, 0, W, H);
    }
    this.tex.needsUpdate = true;
  }

  click(x, y, btn) {
    this.dirty = true;
    if (this.off) { this.off = false; return; }
    if (this.menu) {
      const { items, rect } = this.menuItems();
      this.menu = false;
      if (inside(x, y, ...rect)) {
        const it = items[Math.floor((y - rect[1] - 46) / 30)];
        if (it?.id === 'off') this.off = true;
        else if (it) this.open(it.id);
        return;
      }
    }
    const lay = this.barLayout();
    if (y > H - this.th.bar) {
      if (inside(x, y, ...lay.start)) this.menu = true;
      const b = lay.btns.find(({ r }) => inside(x, y, ...r));
      if (b) this.front(b.w);
      return;
    }
    for (let i = this.wins.length - 1; i >= 0; i--) {
      const w = this.wins[i];
      const [fw, fh] = this.size(w.app);
      if (!inside(x, y, w.x, w.y, fw, fh)) continue;
      this.front(w);
      if (y < w.y + this.th.title) {
        if (x > w.x + fw - 46) this.wins.splice(this.wins.indexOf(w), 1);
      } else w.app.click(x - w.x - this.th.b, y - w.y - this.th.title, btn, w.app.w, w.app.h);
      return;
    }
    const i = Math.floor((y - 16) / 74);
    if (x < 80 && i >= 0 && i < this.icons.length) this.open(this.icons[i][1]);
  }
}

// ---------- non-interactive screens ----------

function staticScreen(kind) {
  const sizes = { stream: [960, 540], chat: [360, 620], sheet: [640, 400] };
  const [w, h] = sizes[kind];
  const [c, g] = canvas(w, h);
  if (kind === 'stream') {
    g.fillStyle = '#18181b'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ff7a2a'; g.fillRect(0, 0, w, 44);
    txt(g, '直播 · 游戏区', 16, 22, 18, '#fff', { bold: true });
    g.fillStyle = grad(g, 0, 50, 0, 470, ['#7fb0d8', '#d8c9a4']); g.fillRect(10, 54, 680, 382);
    g.fillStyle = '#8a7a5a'; g.fillRect(10, 300, 680, 136);
    g.fillStyle = '#5a5248'; g.fillRect(120, 180, 90, 130); g.fillRect(470, 150, 140, 160);
    g.fillStyle = '#222'; g.beginPath(); g.moveTo(520, 436); g.lineTo(600, 330); g.lineTo(690, 360); g.lineTo(690, 436); g.fill();
    g.strokeStyle = '#7fff7f'; g.lineWidth = 2; g.beginPath(); g.moveTo(340, 245); g.lineTo(360, 245); g.moveTo(350, 235); g.lineTo(350, 255); g.stroke();
    txt(g, '老王的直播间  ·  在线 3.2 万', 16, 460, 16, '#fff', { bold: true });
    txt(g, '🔥 排位冲分，今晚不上分不下播', 16, 490, 13, '#bbb');
    g.fillStyle = '#1f1f23'; g.fillRect(700, 54, 250, 476);
    ['666', '主播这枪绝了', '前排', '这都能miss？', '老王yyds', '下班来看直播', '弹幕护体', '求带上分', '哈哈哈哈'].forEach((m, i) => {
      txt(g, `观众${(i * 37) % 97}：`, 712, 76 + i * 46, 12, '#8fa8ff');
      txt(g, m, 712, 96 + i * 46, 14, '#eee');
    });
  } else if (kind === 'chat') {
    g.fillStyle = '#313338'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#2b2d31'; g.fillRect(0, 0, w, 50);
    txt(g, '# 星际网吧', 16, 25, 18, '#f2f3f5', { bold: true });
    const msgs = [['阿伟', '十点上线？'], ['小林', '我先看会儿攻略'], ['胖子', '孩子睡了，来'], ['阿伟', '翻出一张 2005 年的截图'], ['小林', '那会儿我们都没胡子'], ['胖子', '周五老规矩'], ['阿伟', '屿你那台 CRT 还在吗'], ['屿', '在，还能开机']];
    msgs.forEach(([n, m], i) => {
      const col = { 阿伟: '#d9534f', 胖子: '#e09a3e', 小林: '#4fa35a', 屿: '#5865f2' }[n];
      g.fillStyle = col; g.beginPath(); g.arc(30, 84 + i * 58, 15, 0, 7); g.fill();
      txt(g, n, 56, 76 + i * 58, 14, '#f2f3f5', { bold: true });
      txt(g, m, 56, 98 + i * 58, 14, '#dbdee1');
    });
    rr(g, 12, h - 70, w - 24, 56, 8, '#1e1f22');
    txt(g, '♪ 正在播放：稻香', 24, h - 50, 14, '#9cff9c');
    g.fillStyle = '#5fe36f'; g.fillRect(24, h - 30, (w - 48) * 0.4, 4);
  } else {
    g.fillStyle = '#f3f3f3'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#0f6cbd'; g.fillRect(0, 0, w, 36);
    txt(g, '邮件  ·  日历  ·  待办', 14, 18, 15, '#fff', { bold: true });
    ['【周会】需求评审 10:00', 'Re: 登录改版排期', '居家办公报备表（请今天填写）', '【通知】下周继续居家', 'Re: 埋点方案 v3'].forEach((m, i) => {
      g.fillStyle = i === 0 ? '#dceaf8' : '#fff'; g.fillRect(8, 46 + i * 60, 300, 56);
      txt(g, m, 18, 66 + i * 60, 14, '#222', { bold: i < 2 });
      txt(g, `${9 + i}:${i * 7}0 · 来自 王姐`, 18, 88 + i * 60, 12, '#777');
    });
    ['09:30 站会', '10:00 需求评审', '14:00 联调', '17:30 周报'].forEach((m, i) => { rr(g, 324, 50 + i * 80, 300, 66, 4, ['#cfe3f8', '#f8e1cf', '#dcefd8', '#eadcf5'][i]); txt(g, m, 338, 84 + i * 80, 16, '#333'); });
  }
  const tex = toTex(c);
  // the chat runs on the 27" turned portrait, whose plane is rotated a quarter turn
  if (kind === 'chat') { tex.center.set(0.5, 0.5); tex.rotation = -Math.PI / 2; }
  return tex;
}

function retroScreen() {
  const [c, g] = canvas(256, 192);
  const tex = toTex(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return {
    tex,
    last: 0,
    draw(now) {
      this.last = now;
      const hz = 84, t = now / 1000;
      g.fillStyle = grad(g, 0, 0, 0, hz, ['#3b2a6b', '#f08a5d', '#f9d56e']); g.fillRect(0, 0, 256, hz);
      g.fillStyle = '#ffde7a'; g.fillRect(170, 40, 24, 24);
      g.fillStyle = '#5a3d7a';
      for (let x = 0; x < 256; x += 8) g.fillRect(x, hz - 10 - ((x * 7) % 13), 8, 10 + ((x * 7) % 13));
      const curve = Math.sin(t * 0.5) * 40;
      for (let y = hz; y < 192; y += 2) {
        const p = (y - hz) / (192 - hz), cx = 128 + curve * (1 - p) * (1 - p);
        const rw = 10 + p * 150, band = Math.floor(1 / (p + 0.05) * 4 + t * 12) % 2;
        g.fillStyle = band ? '#3fae4a' : '#349a3e'; g.fillRect(0, y, 256, 2);
        g.fillStyle = band ? '#e8e8e8' : '#d83b3b'; g.fillRect(cx - rw - 6 * p - 2, y, rw * 2 + 12 * p + 4, 2);
        g.fillStyle = band ? '#6b6b6b' : '#636363'; g.fillRect(cx - rw, y, rw * 2, 2);
        if (band) { g.fillStyle = '#fff'; g.fillRect(cx - 1 - p * 2, y, 2 + p * 4, 2); }
      }
      const bob = Math.round(Math.sin(t * 9));
      g.fillStyle = '#d32f2f'; g.fillRect(108, 156 + bob, 40, 14); g.fillRect(116, 148 + bob, 24, 10);
      g.fillStyle = '#7fd4ff'; g.fillRect(119, 150 + bob, 18, 5);
      g.fillStyle = '#111'; g.fillRect(104, 166, 10, 8); g.fillRect(142, 166, 10, 8);
      txt(g, `${150 + Math.round(Math.sin(t) * 20)} km/h`, 8, 12, 10, '#fff', { font: 'Consolas, monospace', bold: true });
      txt(g, 'LAP 2/3', 248, 12, 10, '#fff', { font: 'Consolas, monospace', bold: true, align: 'right' });
      if (Math.floor(t * 2) % 2) txt(g, '2P PRESS START', 128, 30, 11, '#fff', { font: 'Consolas, monospace', bold: true, align: 'center' });
      g.fillStyle = 'rgba(0,0,0,0.25)';
      for (let y = 0; y < 192; y += 2) g.fillRect(0, y, 256, 1);
      tex.needsUpdate = true;
    },
  };
}

export function createScreens(onJump) {
  const desks = Object.fromEntries(Object.entries(OS).map(([id, cfg]) => [id, new Desk(id, cfg, onJump)]));
  const statics = { stream: staticScreen('stream'), chat: staticScreen('chat'), sheet: staticScreen('sheet') };
  const retro = retroScreen();
  return {
    map(mode, t) {
      if (mode === 'os') return desks[osAt(t)].tex;
      if (mode === 'retro') return retro.tex;
      return statics[mode] ?? null;
    },
    tick(now, t, retroOn) {
      const d = desks[osAt(t)];
      if ((d.dirty || d.animated()) && now - d.last > 45) d.draw(now);
      if (retroOn && now - retro.last > 70) retro.draw(now);
    },
    click(t, uv, btn) {
      const d = desks[osAt(t)];
      d.click(uv.x * d.W, (1 - uv.y) * H, btn);
      d.draw(performance.now());
    },
  };
}
