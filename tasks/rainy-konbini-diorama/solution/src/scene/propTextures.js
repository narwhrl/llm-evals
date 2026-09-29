import { canvasTexture, text, roundRect, rng, moonLogo } from '../core/canvas.js';

export function vendingTexture(seed, frame) {
  return canvasTexture(256, 320, (g, w, h) => {
    const r = rng(seed);
    g.fillStyle = '#f4f8ff';
    g.fillRect(0, 0, w, h);
    g.fillStyle = frame;
    g.fillRect(0, 0, w, 22);
    const cans = ['#e04848', '#3a7de0', '#f2c230', '#48b870', '#ffffff', '#7a5230', '#f28ab0', '#1d2b4f', '#e87a2a'];
    for (let row = 0; row < 3; row++) {
      const y = 34 + row * 96;
      for (let c = 0; c < 6; c++) {
        const x = 12 + c * 40;
        const col = cans[(r() * cans.length) | 0];
        roundRect(g, x, y, 28, 58, 8);
        g.fillStyle = col;
        g.fill();
        g.fillStyle = 'rgba(255,255,255,0.55)';
        g.fillRect(x + 5, y + 8, 5, 40);
        g.fillStyle = '#222';
        g.fillRect(x + 2, y + 70, 24, 10);
        g.fillStyle = r() > 0.3 ? '#56ff8f' : '#ff5a5a';
        g.fillRect(x + 8, y + 72, 12, 6);
      }
    }
  });
}

export function binLabel(label, color) {
  return canvasTexture(256, 96, (g, w, h) => {
    g.fillStyle = color;
    g.fillRect(0, 0, w, h);
    text(g, label, w / 2, h / 2 + 2, 38, '#ffffff');
  });
}

export function pylonTexture() {
  return canvasTexture(256, 512, (g, w, h) => {
    g.fillStyle = '#fbfaf5';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#19a39a';
    g.fillRect(0, 0, w, 24);
    g.fillStyle = '#f08a3c';
    g.fillRect(0, 24, w, 12);
    g.fillStyle = '#2c5fb8';
    g.fillRect(0, 36, w, 12);
    moonLogo(g, w / 2, 130, 58, '#f4b93a', '#fbfaf5');
    text(g, 'つきみ', w / 2, 236, 60, '#19a39a', { weight: 900 });
    text(g, 'マート', w / 2, 300, 60, '#19a39a', { weight: 900 });
    g.fillStyle = '#f08a3c';
    g.fillRect(24, 350, w - 48, 64);
    text(g, 'OPEN 24H', w / 2, 384, 40, '#fff', { font: 'Arial, sans-serif', weight: 900 });
    g.fillStyle = '#2c5fb8';
    g.fillRect(24, 428, w - 48, 64);
    text(g, 'P 2台', w / 2, 462, 44, '#fff', { weight: 900 });
  });
}

export function noticeTexture() {
  return canvasTexture(512, 320, (g, w, h) => {
    const r = rng(12);
    g.fillStyle = '#b9895a';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#d8b98c';
    g.fillRect(12, 12, w - 24, h - 24);
    const flyers = [
      ['夏祭り', '#ffe9a8', '#c8332e'],
      ['防犯パトロール', '#dff2ff', '#1d3b8f'],
      ['ごみの日', '#e5ffd9', '#2f7a3a'],
      ['迷い猫', '#fff', '#333'],
      ['町内会', '#ffe0ec', '#a0265a'],
    ];
    flyers.forEach(([t, bg, fg], i) => {
      const x = 28 + (i % 3) * 158 + r() * 10;
      const y = 26 + ((i / 3) | 0) * 146 + r() * 10;
      g.save();
      g.translate(x + 64, y + 60);
      g.rotate((r() - 0.5) * 0.12);
      g.fillStyle = bg;
      g.fillRect(-64, -60, 128, 124);
      text(g, t, 0, -30, t.length > 4 ? 18 : 28, fg);
      g.fillStyle = 'rgba(0,0,0,0.25)';
      for (let k = 0; k < 4; k++) g.fillRect(-48, -2 + k * 14, 96 - k * 10, 5);
      g.fillStyle = '#d42a2a';
      g.beginPath();
      g.arc(0, -56, 5, 0, 7);
      g.fill();
      g.restore();
    });
  });
}

export function windowTexture(kind, seed) {
  return canvasTexture(128, 128, (g, w, h) => {
    const r = rng(seed);
    if (kind === 'lit') {
      const gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, '#ffd99a');
      gr.addColorStop(1, '#ffb866');
      g.fillStyle = gr;
      g.fillRect(0, 0, w, h);
      g.fillStyle = r() > 0.5 ? '#e7a0a0' : '#9fc4a8';
      g.fillRect(0, 0, 30, h);
      g.fillRect(w - 30, 0, 30, h);
      g.fillStyle = 'rgba(120,70,40,0.35)';
      g.fillRect(40, 80, 48, 48);
    } else if (kind === 'tv') {
      g.fillStyle = '#6fa0d8';
      g.fillRect(0, 0, w, h);
      g.fillStyle = '#9dc8ff';
      g.fillRect(30, 50, 60, 36);
      g.fillStyle = '#34507a';
      g.fillRect(0, 0, 26, h);
      g.fillRect(w - 26, 0, 26, h);
    } else {
      g.fillStyle = '#1c2640';
      g.fillRect(0, 0, w, h);
      g.fillStyle = '#2a3658';
      g.fillRect(8, 8, w - 16, h - 16);
    }
    g.fillStyle = '#d6d9de';
    g.fillRect(w / 2 - 2, 0, 4, h);
    g.fillRect(0, 0, w, 5);
    g.fillRect(0, h - 5, w, 5);
  });
}

export function shutterTexture() {
  return canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = '#8f98a6';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 8) {
      g.fillStyle = '#a8b0bd';
      g.fillRect(0, y, w, 3);
      g.fillStyle = '#6f7887';
      g.fillRect(0, y + 6, w, 2);
    }
    g.fillStyle = 'rgba(40,40,50,0.35)';
    g.fillRect(0, h - 26, w, 26);
    text(g, '本日休業', w / 2, 120, 26, '#3b3f48');
  });
}

export function shopSignTexture() {
  return canvasTexture(512, 128, (g, w, h) => {
    g.fillStyle = '#243a2f';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#c9b27a';
    g.lineWidth = 6;
    g.strokeRect(8, 8, w - 16, h - 16);
    text(g, '田中酒店', w / 2, h / 2 + 4, 76, '#e9d9a8', { weight: 700 });
  });
}

export function neonTexture() {
  return canvasTexture(128, 512, (g, w, h) => {
    g.fillStyle = '#2a0f2a';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#ff6fd0';
    g.lineWidth = 6;
    roundRect(g, 8, 8, w - 16, h - 16, 18);
    g.stroke();
    const chars = ['ス', 'ナ', 'ッ', 'ク', '灯'];
    chars.forEach((c, i) => text(g, c, w / 2, 62 + i * 92, 72, i === 4 ? '#7ff3ff' : '#ffd1f2', { weight: 900 }));
  });
}

export function nameplateTexture() {
  return canvasTexture(256, 96, (g, w, h) => {
    g.fillStyle = '#efe6d2';
    g.fillRect(0, 0, w, h);
    text(g, '月見荘', w / 2, h / 2 + 2, 56, '#3d2e22', { weight: 700 });
  });
}
