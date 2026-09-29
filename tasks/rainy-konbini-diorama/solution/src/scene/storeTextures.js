import { canvasTexture, text, roundRect, rng, moonLogo } from '../core/canvas.js';

const TEAL = '#19a39a';
const ORANGE = '#f08a3c';
const BLUE = '#2c5fb8';

function brandStripes(g, w, y) {
  g.fillStyle = TEAL;
  g.fillRect(0, y, w, 16);
  g.fillStyle = ORANGE;
  g.fillRect(0, y + 16, w, 10);
  g.fillStyle = BLUE;
  g.fillRect(0, y + 26, w, 10);
}

export function fasciaTexture() {
  return canvasTexture(2048, 200, (g, w, h) => {
    g.fillStyle = '#fbfaf5';
    g.fillRect(0, 0, w, h);
    brandStripes(g, w, h - 44);
    moonLogo(g, 420, 76, 52, '#f4b93a', '#fbfaf5');
    text(g, 'つきみマート', 1000, 72, 104, TEAL, { weight: 900 });
    text(g, 'TSUKIMI MART', 1000, 138, 34, BLUE, { weight: 800, font: 'Arial, sans-serif' });
    text(g, '24H', 1700, 80, 76, ORANGE, { weight: 900, font: 'Arial, sans-serif' });
  });
}

export function sideFasciaTexture() {
  return canvasTexture(1024, 200, (g, w, h) => {
    g.fillStyle = '#fbfaf5';
    g.fillRect(0, 0, w, h);
    brandStripes(g, w, h - 44);
    moonLogo(g, 200, 76, 48, '#f4b93a', '#fbfaf5');
    text(g, 'つきみマート', 560, 80, 84, TEAL, { weight: 900 });
  });
}

export function valanceTexture() {
  return canvasTexture(1024, 64, (g, w, h) => {
    g.fillStyle = '#e9f4f1';
    g.fillRect(0, 0, w, h);
    g.fillStyle = TEAL;
    g.fillRect(0, 0, w, 22);
    g.fillStyle = ORANGE;
    g.fillRect(0, 22, w, 8);
    for (let x = 0; x < w; x += 64) {
      g.fillStyle = '#d7e6e2';
      g.beginPath();
      g.moveTo(x, 30);
      g.lineTo(x + 32, h);
      g.lineTo(x + 64, 30);
      g.fill();
    }
  });
}

export function posterTexture(kind) {
  return canvasTexture(256, 360, (g, w, h) => {
    if (kind === 'oden') {
      g.fillStyle = '#fff4dc';
      g.fillRect(0, 0, w, h);
      g.fillStyle = '#c8332e';
      g.fillRect(0, 0, w, 92);
      text(g, 'おでん', w / 2, 48, 64, '#fff');
      text(g, '全品', w / 2, 140, 44, '#c8332e');
      text(g, '70円', w / 2, 210, 88, '#c8332e', { weight: 900 });
      g.fillStyle = '#e9b949';
      g.beginPath();
      g.arc(80, 300, 32, 0, 7);
      g.fill();
      g.fillStyle = '#f5f0e6';
      g.fillRect(130, 270, 60, 60);
      g.fillStyle = '#6e5a4a';
      g.beginPath();
      g.moveTo(205, 330);
      g.lineTo(235, 270);
      g.lineTo(250, 330);
      g.fill();
    } else if (kind === 'milk') {
      const gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, '#ffd3e2');
      gr.addColorStop(1, '#ff9fbf');
      g.fillStyle = gr;
      g.fillRect(0, 0, w, h);
      text(g, '新発売', w / 2, 46, 48, '#d4145a');
      roundRect(g, 78, 90, 100, 190, 18);
      g.fillStyle = '#fff';
      g.fill();
      g.fillStyle = '#e8456f';
      g.fillRect(78, 150, 100, 60);
      text(g, 'いちごミルク', w / 2, 318, 34, '#8a0f3c');
    } else if (kind === 'open') {
      g.fillStyle = '#1b2c55';
      g.fillRect(0, 0, w, h);
      text(g, '営業中', w / 2, 110, 60, '#ffe27a');
      text(g, 'OPEN', w / 2, 190, 64, '#fff', { font: 'Arial, sans-serif' });
      text(g, '24時間', w / 2, 270, 52, '#7fe0d6');
    } else {
      g.fillStyle = '#f5f7fb';
      g.fillRect(0, 0, w, h);
      g.fillStyle = BLUE;
      g.fillRect(0, 0, w, 120);
      text(g, 'ATM', w / 2, 62, 80, '#fff', { font: 'Arial, sans-serif', weight: 900 });
      text(g, '24時間', w / 2, 180, 46, BLUE);
      text(g, 'ご利用', w / 2, 240, 46, BLUE);
      text(g, 'いただけます', w / 2, 300, 34, '#333');
    }
  });
}

export function matTexture() {
  return canvasTexture(512, 192, (g, w, h) => {
    g.fillStyle = '#23303b';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = TEAL;
    g.lineWidth = 10;
    g.strokeRect(14, 14, w - 28, h - 28);
    text(g, 'いらっしゃいませ', w / 2, h / 2 - 12, 52, '#e8f3f1');
    text(g, 'WELCOME', w / 2, h / 2 + 44, 30, ORANGE, { font: 'Arial, sans-serif' });
  });
}

export function floorTexture() {
  return canvasTexture(1024, 1024, (g, w) => {
    // 5.85 m × 4.85 m interior mapped to the full canvas.
    const sx = w / 5.85;
    const sz = w / 4.85;
    g.fillStyle = '#efe6d6';
    g.fillRect(0, 0, w, w);
    g.strokeStyle = '#d8ccb6';
    g.lineWidth = 2;
    for (let x = 0; x < 5.85; x += 0.3) {
      g.beginPath();
      g.moveTo(x * sx, 0);
      g.lineTo(x * sx, w);
      g.stroke();
    }
    for (let z = 0; z < 4.85; z += 0.3) {
      g.beginPath();
      g.moveTo(0, z * sz);
      g.lineTo(w, z * sz);
      g.stroke();
    }
    // Queue guidance in front of the register (interior x -1.7…-1.1, z -2.4…-0.4).
    const px = (x) => (x + 3.05) * sx;
    const pz = (z) => (z + 4.05) * sz;
    g.fillStyle = '#2c9d93';
    for (const z of [-2.2, -1.5, -0.8]) {
      for (const dx of [-0.07, 0.07]) {
        g.beginPath();
        g.ellipse(px(-1.42 + dx), pz(z + (dx > 0 ? 0.05 : 0)), 0.045 * sx, 0.09 * sz, 0, 0, 7);
        g.fill();
      }
    }
    g.fillStyle = '#f08a3c';
    for (const z of [-0.2, 0.25]) {
      g.beginPath();
      g.moveTo(px(-1.42), pz(z - 0.2));
      g.lineTo(px(-1.25), pz(z));
      g.lineTo(px(-1.59), pz(z));
      g.fill();
      g.fillRect(px(-1.47), pz(z), 0.1 * sx, 0.14 * sz);
    }
    g.save();
    g.translate(px(-1.42), pz(-2.75));
    g.rotate(-Math.PI / 2);
    text(g, 'レジはこちら', 0, 0, 30, '#2c9d93');
    g.restore();
    // Entrance mat shadow line.
    g.fillStyle = '#c7baa3';
    g.fillRect(px(-0.2), pz(0.55), 1.4 * sx, 0.25 * sz);
  });
}

export function cigaretteTexture() {
  return canvasTexture(512, 256, (g, w, h) => {
    const r = rng(21);
    g.fillStyle = '#2d2a33';
    g.fillRect(0, 0, w, h);
    const cols = ['#f5f5f5', '#1d3b8f', '#c9302c', '#d8c07a', '#3a3a3a', '#2f8f5b', '#e6e1d0', '#7b4bb3'];
    for (let row = 0; row < 6; row++) {
      for (let c = 0; c < 16; c++) {
        const x = 6 + c * 31.5;
        const y = 8 + row * 41;
        g.fillStyle = cols[(r() * cols.length) | 0];
        g.fillRect(x, y, 26, 30);
        g.fillStyle = cols[(r() * cols.length) | 0];
        g.fillRect(x, y + 20, 26, 5);
      }
      g.fillStyle = '#fbfbfb';
      g.fillRect(0, 38 + row * 41, w, 4);
    }
  });
}

export function menuTexture() {
  return canvasTexture(768, 192, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, '#fff7e0');
    gr.addColorStop(1, '#ffe6b8');
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
    g.fillStyle = ORANGE;
    g.fillRect(0, 0, w, 44);
    text(g, 'ホットスナック・おでん・コーヒー', w / 2, 24, 30, '#fff');
    const items = [
      ['からあげ', '¥220', '#d98b2b'],
      ['肉まん', '¥150', '#f1ede3'],
      ['コロッケ', '¥90', '#c8873a'],
      ['コーヒー', '¥110', '#6b3f22'],
    ];
    items.forEach(([n, p, c], i) => {
      const x = 96 + i * 192;
      g.fillStyle = c;
      g.beginPath();
      g.arc(x, 100, 30, 0, 7);
      g.fill();
      text(g, n, x, 150, 28, '#3b2a1a');
      text(g, p, x, 178, 24, '#c8332e');
    });
  });
}

export function labelTexture(label, bg, fg) {
  return canvasTexture(512, 96, (g, w, h) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);
    text(g, label, w / 2, h / 2 + 2, 56, fg);
  });
}

export function magazineTexture(seed) {
  return canvasTexture(768, 160, (g, w, h) => {
    const r = rng(seed);
    const hues = [350, 20, 45, 190, 210, 280, 120, 0];
    for (let i = 0; i < 6; i++) {
      const x = i * 128;
      const hue = hues[(r() * hues.length) | 0];
      g.fillStyle = `hsl(${hue},70%,${55 + r() * 20}%)`;
      g.fillRect(x + 4, 4, 120, h - 8);
      g.fillStyle = `hsl(${(hue + 180) % 360},60%,95%)`;
      g.fillRect(x + 10, 10, 108, 26);
      g.fillStyle = `hsl(${hue},40%,30%)`;
      g.beginPath();
      g.arc(x + 64, 100, 34, 0, 7);
      g.fill();
      g.fillStyle = '#fff';
      g.fillRect(x + 14, 140, 70, 8);
    }
  });
}

export function staffDoorTexture() {
  return canvasTexture(128, 256, (g, w, h) => {
    g.fillStyle = '#b9c3cf';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#ffe2a6';
    g.fillRect(36, 30, 56, 60);
    g.fillStyle = '#2c3a4e';
    g.fillRect(24, 110, 80, 26);
    text(g, 'STAFF ONLY', 64, 124, 12, '#fff', { font: 'Arial, sans-serif' });
    g.fillStyle = '#6d7684';
    g.fillRect(96, 140, 16, 6);
  });
}
