import * as THREE from 'three';
import { rng } from './kit.js';

export const FONT = '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif';
export const SERIF = '"Songti SC", "SimSun", "Noto Serif SC", serif';

export function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

export function toTex(c, { repeat, srgb = true } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
  }
  return t;
}

export function paint(w, h, draw, opts) {
  const [c, g] = canvas(w, h);
  draw(g, w, h);
  return toTex(c, opts);
}

const shade = (hex, k) => {
  const c = new THREE.Color(hex);
  return `#${c.multiplyScalar(k).getHexString()}`;
};

export function wood(light, dark, { w = 512, h = 512, lines = 70, seed = 3, repeat } = {}) {
  return paint(w, h, (g) => {
    const r = rng(seed);
    g.fillStyle = light;
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < lines; i++) {
      const y0 = r() * h, amp = 2 + r() * 8, freq = 0.004 + r() * 0.01, ph = r() * 6;
      g.strokeStyle = dark;
      g.globalAlpha = 0.08 + r() * 0.22;
      g.lineWidth = 0.6 + r() * 2.2;
      g.beginPath();
      for (let x = 0; x <= w; x += 8) g.lineTo(x, y0 + Math.sin(x * freq + ph) * amp + Math.sin(x * 0.03 + ph) * 1.2);
      g.stroke();
    }
    g.globalAlpha = 1;
  }, { repeat });
}

export function floorPlanks() {
  return paint(1024, 1024, (g) => {
    const r = rng(11);
    const rows = 8, rh = 1024 / rows;
    for (let i = 0; i < rows; i++) {
      let x = -r() * 600;
      while (x < 1024) {
        const len = 380 + r() * 420;
        const k = 0.88 + r() * 0.2;
        g.fillStyle = shade('#b07a4c', k);
        g.fillRect(x, i * rh, len, rh);
        for (let l = 0; l < 14; l++) {
          const y = i * rh + r() * rh;
          g.strokeStyle = 'rgba(70,40,20,0.18)';
          g.lineWidth = 0.5 + r() * 1.5;
          g.beginPath();
          g.moveTo(x, y);
          g.bezierCurveTo(x + len * 0.3, y + (r() - 0.5) * 8, x + len * 0.7, y + (r() - 0.5) * 8, x + len, y + (r() - 0.5) * 4);
          g.stroke();
        }
        g.fillStyle = 'rgba(40,22,10,0.55)';
        g.fillRect(x, i * rh, 2, rh);
        x += len;
      }
      g.fillStyle = 'rgba(40,22,10,0.5)';
      g.fillRect(0, i * rh, 1024, 2);
    }
  }, { repeat: [4, 3.3] });
}

// Light noise, tinted by material colour so walls can be repainted per era.
export function plaster() {
  return paint(256, 256, (g) => {
    const r = rng(5);
    g.fillStyle = '#fff';
    g.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},${0.025 + r() * 0.03})`;
      g.fillRect(r() * 256, r() * 256, 1 + r() * 3, 1 + r() * 3);
    }
  }, { repeat: [5, 3] });
}

export function fabric(base, kind, seed = 2) {
  return paint(512, 512, (g, w, h) => {
    const r = rng(seed);
    g.fillStyle = base;
    g.fillRect(0, 0, w, h);
    if (kind === 'plaid') {
      for (let i = 0; i < 8; i++) {
        g.fillStyle = i % 2 ? 'rgba(255,255,255,0.10)' : 'rgba(20,30,50,0.18)';
        g.fillRect(i * 64 + 10, 0, 22, h);
        g.fillRect(0, i * 64 + 10, w, 22);
      }
      g.fillStyle = 'rgba(200,80,60,0.35)';
      for (let i = 0; i < 4; i++) { g.fillRect(i * 128 + 50, 0, 4, h); g.fillRect(0, i * 128 + 50, w, 4); }
    } else if (kind === 'stars') {
      for (let i = 0; i < 40; i++) {
        const x = r() * w, y = r() * h, s = 8 + r() * 12;
        g.fillStyle = i % 3 ? '#f4d35e' : '#ffffff';
        g.beginPath();
        for (let k = 0; k < 10; k++) {
          const a = (k * Math.PI) / 5, rr = k % 2 ? s * 0.45 : s;
          g.lineTo(x + Math.sin(a) * rr, y - Math.cos(a) * rr);
        }
        g.fill();
      }
      g.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 9; i++) {
        const x = r() * w, y = r() * h;
        for (let k = 0; k < 4; k++) { g.beginPath(); g.arc(x + k * 14, y + (k % 2) * -6, 12, 0, 7); g.fill(); }
      }
    } else if (kind === 'floral') {
      for (let i = 0; i < 70; i++) {
        const x = r() * w, y = r() * h, s = 6 + r() * 8;
        g.fillStyle = ['#c9615a', '#e2a24f', '#8a9a5b'][i % 3];
        for (let k = 0; k < 5; k++) {
          g.beginPath();
          g.arc(x + Math.cos(k * 1.256) * s, y + Math.sin(k * 1.256) * s, s * 0.7, 0, 7);
          g.fill();
        }
        g.fillStyle = '#f7e3b0';
        g.beginPath(); g.arc(x, y, s * 0.5, 0, 7); g.fill();
      }
    } else if (kind === 'stripes') {
      for (let i = 0; i < 16; i++) {
        g.fillStyle = i % 2 ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.06)';
        g.fillRect(0, i * 32, w, 16);
      }
    }
    // weave
    for (let i = 0; i < 9000; i++) {
      g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},0.05)`;
      g.fillRect(r() * w, r() * h, 2, 1);
    }
  });
}

export function rugTex(kind) {
  return paint(512, 512, (g, w, h) => {
    const r = rng(kind === 'round' ? 7 : 9);
    if (kind === 'round') {
      for (let i = 30; i > 0; i--) {
        g.fillStyle = ['#b5543c', '#d9a35a', '#6d7f62', '#e8d6b4'][i % 4];
        g.beginPath(); g.arc(256, 256, i * 8.5, 0, 7); g.fill();
      }
    } else {
      g.fillStyle = '#d8c7a6';
      g.fillRect(0, 0, w, h);
      g.strokeStyle = '#8f5b3b';
      g.lineWidth = 10;
      g.strokeRect(24, 24, w - 48, h - 48);
      g.lineWidth = 3;
      g.strokeRect(46, 46, w - 92, h - 92);
      g.fillStyle = '#7d8a6a';
      for (let y = 90; y < h - 80; y += 70) for (let x = 90; x < w - 80; x += 70) {
        g.beginPath(); g.moveTo(x, y - 18); g.lineTo(x + 18, y); g.lineTo(x, y + 18); g.lineTo(x - 18, y); g.fill();
      }
    }
    for (let i = 0; i < 14000; i++) {
      g.fillStyle = `rgba(${r() < 0.5 ? '0,0,0' : '255,255,255'},0.06)`;
      g.fillRect(r() * w, r() * h, 1, 2);
    }
  });
}

// Top face of a keyboard: rows of keys with an optional per-key colour function.
export function keyboardTex({ base, key, legend = 'rgba(0,0,0,0.5)', cols = 21, accent, rgb = false }) {
  return paint(512, 160, (g, w, h) => {
    g.fillStyle = base;
    g.fillRect(0, 0, w, h);
    const rows = 6, kw = (w - 20) / cols, kh = (h - 16) / rows;
    for (let row = 0; row < rows; row++) {
      for (let c = 0; c < cols; c++) {
        if (row === 0 && (c === 1 || c === 6 || c === 11)) continue;
        if (row === 5 && c > 3 && c < 10) {
          if (c === 4) { g.fillStyle = key; g.fillRect(10 + 4 * kw + 2, 8 + row * kh + 2, kw * 6 - 4, kh - 4); }
          continue;
        }
        const x = 10 + c * kw, y = 8 + row * kh;
        g.fillStyle = accent && accent(row, c) ? accent(row, c) : key;
        if (rgb) g.fillStyle = `hsl(${(c * 16 + row * 10) % 360},70%,62%)`;
        g.fillRect(x + 2, y + 2, kw - 4, kh - 4);
        g.fillStyle = rgb ? 'rgba(20,20,20,0.75)' : legend;
        if (rgb) g.fillRect(x + 4, y + 4, kw - 8, kh - 8);
        g.fillStyle = rgb ? `hsla(${(c * 16 + row * 10) % 360},90%,75%,0.9)` : legend;
        g.fillRect(x + kw * 0.3, y + kh * 0.3, kw * 0.22, kh * 0.18);
      }
    }
  });
}

function wrapText(g, text, x, y, maxW, lh) {
  let line = '';
  for (const ch of text) {
    if (g.measureText(line + ch).width > maxW) { g.fillText(line, x, y); y += lh; line = ch; } else line += ch;
  }
  g.fillText(line, x, y);
}

export const POSTERS = {
  timetable(g, w, h) {
    g.fillStyle = '#fbf7ec'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#c0392b'; g.font = `bold 26px ${FONT}`; g.textAlign = 'center';
    g.fillText('课  程  表', w / 2, 36);
    const days = ['', '一', '二', '三', '四', '五'];
    const subj = ['语文', '数学', '英语', '历史', '地理', '生物', '政治', '体育', '音乐', '美术'];
    const r = rng(4);
    const cw = (w - 30) / 6, ch = (h - 70) / 8;
    g.font = `16px ${FONT}`;
    for (let row = 0; row < 8; row++) for (let c = 0; c < 6; c++) {
      const x = 15 + c * cw, y = 52 + row * ch;
      g.strokeStyle = '#9b8f7a'; g.lineWidth = 1; g.strokeRect(x, y, cw, ch);
      if (row === 0) { g.fillStyle = '#f1c27d'; g.fillRect(x + 1, y + 1, cw - 2, ch - 2); }
      g.fillStyle = '#3b3227';
      const t = row === 0 ? days[c] : c === 0 ? `${row}` : subj[Math.floor(r() * subj.length)];
      g.fillText(t, x + cw / 2, y + ch * 0.68);
    }
    g.fillStyle = 'rgba(230,200,120,0.5)'; g.fillRect(w * 0.42, -4, 60, 20); // tape
  },
  award(g, w, h) {
    g.fillStyle = '#b8261f'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff6e2'; g.fillRect(16, 16, w - 32, h - 32);
    g.strokeStyle = '#d4a017'; g.lineWidth = 5; g.strokeRect(24, 24, w - 48, h - 48);
    g.fillStyle = '#c0392b'; g.font = `bold 56px ${SERIF}`; g.textAlign = 'center';
    g.fillText('奖 状', w / 2, 98);
    g.fillStyle = '#3b2b1f'; g.font = `22px ${SERIF}`; g.textAlign = 'left';
    wrapText(g, '陈屿 同学在 2004—2005 学年度被评为“三好学生”，特发此状，以资鼓励。', 60, 150, w - 120, 34);
    g.fillStyle = 'rgba(200,30,30,0.75)'; g.beginPath(); g.arc(w - 110, h - 70, 40, 0, 7); g.fill();
  },
  map(g, w, h) {
    g.fillStyle = '#9cc7d8'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(255,255,255,0.4)'; g.lineWidth = 1;
    for (let x = 0; x < w; x += w / 12) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
    for (let y = 0; y < h; y += h / 6) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
    const land = [[0.18, 0.32, 0.12, 0.14, '#d9b26f'], [0.24, 0.66, 0.06, 0.16, '#a9c47f'], [0.49, 0.3, 0.06, 0.08, '#e3c26f'],
      [0.52, 0.58, 0.08, 0.17, '#e6a861'], [0.7, 0.33, 0.17, 0.15, '#c8d989'], [0.84, 0.72, 0.07, 0.07, '#e8b36a'], [0.76, 0.45, 0.05, 0.06, '#f0d067']];
    for (const [x, y, rx, ry, c] of land) {
      g.fillStyle = c; g.beginPath(); g.ellipse(x * w, y * h, rx * w, ry * h, 0.3, 0, 7); g.fill();
    }
    g.fillStyle = '#c0392b'; g.beginPath(); g.arc(0.745 * w, 0.4 * h, 5, 0, 7); g.fill();
    g.fillStyle = '#2c3e50'; g.font = `bold 30px ${FONT}`; g.textAlign = 'center'; g.fillText('世界地图', w / 2, 38);
  },
  basketball(g, w, h) {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#f0832b'); gr.addColorStop(1, '#7a1f12');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = '#1b0d08';
    g.beginPath(); g.arc(w * 0.55, h * 0.24, 22, 0, 7); g.fill();
    g.lineCap = 'round'; g.strokeStyle = '#1b0d08';
    g.lineWidth = 34; g.beginPath(); g.moveTo(w * 0.55, h * 0.3); g.lineTo(w * 0.5, h * 0.52); g.stroke();
    g.lineWidth = 18;
    g.beginPath(); g.moveTo(w * 0.55, h * 0.33); g.lineTo(w * 0.72, h * 0.12); g.stroke();
    g.beginPath(); g.moveTo(w * 0.52, h * 0.35); g.lineTo(w * 0.32, h * 0.42); g.stroke();
    g.beginPath(); g.moveTo(w * 0.5, h * 0.52); g.lineTo(w * 0.36, h * 0.66); g.lineTo(w * 0.4, h * 0.8); g.stroke();
    g.beginPath(); g.moveTo(w * 0.5, h * 0.52); g.lineTo(w * 0.64, h * 0.68); g.stroke();
    g.fillStyle = '#e8762a'; g.beginPath(); g.arc(w * 0.76, h * 0.09, 18, 0, 7); g.fill();
    g.fillStyle = '#fff3d6'; g.font = `bold 54px ${FONT}`; g.textAlign = 'center'; g.fillText('灌 篮', w / 2, h * 0.92);
  },
  fantasy(g, w, h) {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#16233f'); gr.addColorStop(0.7, '#3d2c55'); gr.addColorStop(1, '#0c0a14');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = '#f3e3b0'; g.beginPath(); g.arc(w * 0.68, h * 0.22, 46, 0, 7); g.fill();
    g.fillStyle = '#0b0912';
    g.beginPath(); g.moveTo(0, h * 0.75);
    for (let i = 0; i <= 10; i++) g.lineTo((w * i) / 10, h * (0.7 - (i % 3) * 0.06 - (i === 6 ? 0.18 : 0)));
    g.lineTo(w, h); g.lineTo(0, h); g.fill();
    g.fillStyle = '#c9a54a';
    g.beginPath(); g.moveTo(w * 0.36, h * 0.8); g.lineTo(w * 0.4, h * 0.36); g.lineTo(w * 0.44, h * 0.8); g.fill();
    g.fillStyle = '#e9d8a6'; g.font = `bold 46px ${SERIF}`; g.textAlign = 'center'; g.fillText('魔幻纪元', w / 2, h * 0.92);
    g.font = `16px ${FONT}`; g.fillText('冰封王座 · 资料片', w / 2, h * 0.97);
  },
  olympic(g, w, h) {
    g.fillStyle = '#f7efe1'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#c8102e'; g.fillRect(w * 0.2, h * 0.12, w * 0.6, h * 0.45);
    g.strokeStyle = '#f7efe1'; g.lineWidth = 12; g.lineCap = 'round';
    g.beginPath(); g.arc(w * 0.5, h * 0.25, 16, 0, 7); g.stroke();
    g.beginPath(); g.moveTo(w * 0.36, h * 0.36); g.quadraticCurveTo(w * 0.52, h * 0.3, w * 0.62, h * 0.4);
    g.moveTo(w * 0.5, h * 0.36); g.quadraticCurveTo(w * 0.42, h * 0.5, w * 0.6, h * 0.52); g.stroke();
    g.fillStyle = '#c8102e'; g.font = `bold 48px ${SERIF}`; g.textAlign = 'center'; g.fillText('北京 2008', w / 2, h * 0.72);
    g.fillStyle = '#333'; g.font = `22px ${FONT}`; g.fillText('同一个世界  同一个梦想', w / 2, h * 0.82);
  },
  band(g, w, h) {
    g.fillStyle = '#1d1b19'; g.fillRect(0, 0, w, h);
    const r = rng(8);
    for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(240,220,190,${r() * 0.5})`; g.beginPath(); g.arc(r() * w, h * 0.15 + r() * h * 0.5, r() * 4, 0, 7); g.fill(); }
    g.fillStyle = '#f2c14e'; g.font = `bold 60px ${FONT}`; g.textAlign = 'center'; g.fillText('LIVE', w / 2, h * 0.8);
    g.fillStyle = '#e9e1d4'; g.font = `20px ${FONT}`; g.fillText('2012 夏日巡演 · 体育馆站', w / 2, h * 0.88);
  },
  lan(g, w, h) {
    g.fillStyle = '#f2ead8'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#1f4e79'; g.fillRect(0, 0, w, 70);
    g.fillStyle = '#fff'; g.font = `bold 30px ${FONT}`; g.textAlign = 'center'; g.fillText('城南网吧联赛 2011', w / 2, 46);
    g.fillStyle = '#b8862b'; g.font = `bold 64px ${SERIF}`; g.fillText('冠 军', w / 2, h * 0.45);
    g.fillStyle = '#333'; g.font = `24px ${FONT}`; g.fillText('四人行战队', w / 2, h * 0.6);
    g.font = `18px ${FONT}`; g.fillText('阿伟 · 胖子 · 小林 · 陈屿', w / 2, h * 0.7);
    g.fillStyle = 'rgba(200,30,30,0.7)'; g.beginPath(); g.arc(w * 0.75, h * 0.83, 32, 0, 7); g.fill();
  },
  landscape(g, w, h) {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#f6c88b'); gr.addColorStop(0.55, '#e98f6b'); gr.addColorStop(1, '#5b4a6b');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = '#fff1c9'; g.beginPath(); g.arc(w * 0.3, h * 0.42, 34, 0, 7); g.fill();
    ['#b9707a', '#8a5a78', '#5e4566', '#3b2e4a'].forEach((c, i) => {
      g.fillStyle = c; g.beginPath(); g.moveTo(0, h);
      for (let x = 0; x <= w; x += 20) g.lineTo(x, h * (0.5 + i * 0.12) - Math.sin(x * 0.012 + i * 2) * 26 - Math.sin(x * 0.04 + i) * 8);
      g.lineTo(w, h); g.fill();
    });
  },
  kid(g, w, h) {
    g.fillStyle = '#fffdf6'; g.fillRect(0, 0, w, h);
    g.lineCap = 'round'; g.lineJoin = 'round';
    const crayon = (c, wdt, pts) => { g.strokeStyle = c; g.lineWidth = wdt; g.beginPath(); pts.forEach(([x, y]) => g.lineTo(x * w, y * h)); g.stroke(); };
    crayon('#f2b134', 8, [[0.86, 0.1], [0.9, 0.18], [0.82, 0.2], [0.86, 0.1]]);
    crayon('#e05a47', 9, [[0.12, 0.55], [0.3, 0.3], [0.48, 0.55], [0.12, 0.55], [0.12, 0.9], [0.48, 0.9], [0.48, 0.55]]);
    crayon('#4c7bd1', 7, [[0.6, 0.45], [0.6, 0.75], [0.55, 0.92], [0.6, 0.75], [0.65, 0.92]]);
    crayon('#4c7bd1', 7, [[0.52, 0.58], [0.68, 0.58]]);
    g.strokeStyle = '#4c7bd1'; g.beginPath(); g.arc(0.6 * w, 0.38 * h, 18, 0, 7); g.stroke();
    crayon('#d55db3', 6, [[0.78, 0.66], [0.78, 0.82], [0.74, 0.92], [0.78, 0.82], [0.82, 0.92]]);
    g.strokeStyle = '#d55db3'; g.beginPath(); g.arc(0.78 * w, 0.6 * h, 12, 0, 7); g.stroke();
    crayon('#8a6d3b', 6, [[0.88, 0.92], [0.92, 0.82], [0.97, 0.86], [0.97, 0.92], [0.88, 0.92]]);
    g.fillStyle = '#4c7bd1'; g.font = `bold 30px ${FONT}`; g.fillText('我的家', w * 0.1, h * 0.18);
  },
};

export const poster = (kind, w = 512, h = 720) => paint(w, h, POSTERS[kind]);

const STEMS = '甲乙丙丁戊己庚辛壬癸', BRANCHES = '子丑寅卯辰巳午未申酉戌亥', ZODIAC = '鼠牛虎兔龙蛇马羊猴鸡狗猪';

export function drawCalendar(g, w, h, year, month) {
  g.fillStyle = '#fbf6ea'; g.fillRect(0, 0, w, h);
  const gr = g.createLinearGradient(0, 0, w, h * 0.45);
  gr.addColorStop(0, ['#6a9a7b', '#c97b5b', '#5b7fa6', '#b8925a'][year % 4]); gr.addColorStop(1, '#f3d9a4');
  g.fillStyle = gr; g.fillRect(10, 10, w - 20, h * 0.42);
  g.fillStyle = 'rgba(40,60,40,0.55)'; g.beginPath(); g.moveTo(10, h * 0.4);
  for (let x = 10; x <= w - 10; x += 12) g.lineTo(x, h * 0.32 - Math.sin(x * 0.03 + year) * 18);
  g.lineTo(w - 10, h * 0.44); g.lineTo(10, h * 0.44); g.fill();
  const i = year - 4;
  g.fillStyle = '#b8261f'; g.font = `bold 46px ${SERIF}`; g.textAlign = 'center';
  g.fillText(`${year}`, w / 2, h * 0.53);
  g.fillStyle = '#5a4632'; g.font = `18px ${FONT}`;
  g.fillText(`${STEMS[i % 10]}${BRANCHES[i % 12]}年 · ${ZODIAC[i % 12]}  ${month} 月`, w / 2, h * 0.585);
  const first = new Date(year, month - 1, 1).getDay(), days = new Date(year, month, 0).getDate();
  const cw = (w - 30) / 7, top = h * 0.63, rh = (h * 0.32) / 6;
  g.font = `bold 15px ${FONT}`;
  '日一二三四五六'.split('').forEach((d, k) => { g.fillStyle = k === 0 || k === 6 ? '#b8261f' : '#5a4632'; g.fillText(d, 15 + cw * (k + 0.5), top); });
  g.font = `16px ${FONT}`;
  for (let d = 1; d <= days; d++) {
    const k = (first + d - 1) % 7, row = Math.floor((first + d - 1) / 7);
    g.fillStyle = k === 0 || k === 6 ? '#b8261f' : '#3b3227';
    g.fillText(`${d}`, 15 + cw * (k + 0.5), top + rh * (row + 1));
  }
  g.fillStyle = '#8a7a66'; g.font = `13px ${FONT}`; g.fillText('城南储蓄所  恭贺新禧', w / 2, h - 12);
}

// Pencil marks beside the door: the owner's teenage growth, then the child's.
export const HEIGHTS = [
  [2005, 1.52, '13岁 152'], [2006, 1.59, '14岁'], [2007, 1.66, '15岁'], [2008, 1.71, '16岁'], [2009, 1.74, '17岁'], [2010, 1.76, '18岁 176'],
  [2022, 0.76, '小满 1岁'], [2023, 0.88, '小满 2岁'], [2024, 0.96, '3岁'], [2025, 1.03, '小满 4岁'],
];
export function drawHeights(g, w, h, year, y0, y1) {
  g.clearRect(0, 0, w, h);
  for (const [yr, m, label] of HEIGHTS) {
    if (yr > year) continue;
    const y = h * (1 - (m - y0) / (y1 - y0));
    const kid = yr > 2020;
    g.strokeStyle = kid ? 'rgba(200,70,60,0.85)' : 'rgba(60,60,70,0.75)';
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(w * 0.05, y); g.lineTo(w * 0.55, y); g.stroke();
    g.fillStyle = g.strokeStyle;
    g.font = `${kid ? 'bold ' : ''}22px ${FONT}`;
    g.fillText(label, w * 0.05, y - 6);
    g.font = `16px ${FONT}`;
    g.fillText(`${yr}`, w * 0.6, y + 6);
  }
}

// Skyline seen from the window. Towers appear in the year they were built.
const TOWERS = (() => {
  const r = rng(21), list = [];
  for (let i = 0; i < 26; i++) {
    const built = i < 9 ? 1990 : 2005 + Math.floor(r() * 20);
    list.push({ x: r(), w: 0.05 + r() * 0.08, h: built === 1990 ? 0.12 + r() * 0.12 : 0.2 + r() * 0.42, built, hue: r() });
  }
  return list.sort((a, b) => b.h - a.h);
})();
export function drawSkyline(g, w, h, t) {
  const gr = g.createLinearGradient(0, 0, 0, h);
  gr.addColorStop(0, '#9fb7cc'); gr.addColorStop(0.55, '#f4c58e'); gr.addColorStop(1, '#f7a46b');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.fillStyle = 'rgba(255,240,200,0.9)'; g.beginPath(); g.arc(w * 0.25, h * 0.58, 26, 0, 7); g.fill();
  const r = rng(4);
  for (const b of TOWERS) {
    const k = Math.min(1, Math.max(0, (t - b.built) / 1.5));
    if (k <= 0) continue;
    const bh = b.h * h * k, x = b.x * w, bw = b.w * w;
    g.fillStyle = `hsl(${20 + b.hue * 30},${12 + b.hue * 10}%,${48 + b.hue * 16}%)`;
    g.fillRect(x, h - bh, bw, bh);
    g.fillStyle = 'rgba(255,230,170,0.55)';
    for (let wy = h - bh + 8; wy < h - 6; wy += 12) for (let wx = x + 5; wx < x + bw - 6; wx += 10) if (r() < 0.35) g.fillRect(wx, wy, 4, 5);
    if (k < 1) { // tower crane while under construction
      g.strokeStyle = '#d9a441'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(x + bw / 2, h - bh); g.lineTo(x + bw / 2, h - bh - 50); g.lineTo(x + bw / 2 + 60, h - bh - 50); g.stroke();
    }
  }
  g.fillStyle = 'rgba(80,90,70,0.85)';
  for (let x = 0; x < w; x += 18) { g.beginPath(); g.arc(x, h + 4, 18 + Math.sin(x) * 6, 0, 7); g.fill(); }
}

export function drawPlaque(g, w, h, year, title) {
  const gr = g.createLinearGradient(0, 0, 0, h);
  gr.addColorStop(0, '#d8b46a'); gr.addColorStop(0.5, '#b38a42'); gr.addColorStop(1, '#8c6a2e');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(60,40,10,0.6)'; g.lineWidth = 3; g.strokeRect(8, 8, w - 16, h - 16);
  g.fillStyle = '#3d2a0e'; g.textAlign = 'center';
  g.font = `bold 46px Georgia, ${SERIF}`; g.fillText(`${year}`, w / 2, h * 0.52);
  g.font = `24px ${FONT}`; g.fillText(title, w / 2, h * 0.84);
}
