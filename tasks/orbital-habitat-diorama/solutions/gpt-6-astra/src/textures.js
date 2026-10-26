import * as THREE from 'three';

let seed = 904;
const random = () => {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 4294967296;
};

export function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function surface(kind) {
  const texture = canvasTexture(512, 512, (c, w, h) => {
    c.fillStyle = kind === 'grate' ? '#545e5e' : kind === 'wood' ? '#cab58e' : '#e5e4d5';
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 18000; i++) {
      c.fillStyle = `rgba(${random() > 0.5 ? '255,255,255' : '35,42,42'},${random() * 0.09})`;
      c.fillRect(random() * w, random() * h, kind === 'wood' ? random() * 70 : 1, 1);
    }
    if (kind === 'fabric') {
      for (let x = 0; x < w; x += 4) {
        c.fillStyle = x % 8 ? '#7d827923' : '#ffffff48';
        c.fillRect(x, 0, 1, h);
        c.fillRect(0, x, w, 1);
      }
      c.strokeStyle = '#666f6640';
      c.setLineDash([4, 5]);
      c.lineWidth = 2;
      c.strokeRect(16, 16, w - 32, h - 32);
    } else if (kind === 'grate') {
      for (let y = 8; y < h; y += 24) {
        for (let x = 8; x < w; x += 32) {
          c.fillStyle = '#a1aaa2';
          c.fillRect(x, y, 24, 12);
          c.fillStyle = '#293637';
          c.fillRect(x + 1, y + 2, 23, 9);
          c.fillStyle = '#15262a';
          c.fillRect(x + 2, y + 2, 22, 3);
        }
      }
      c.strokeStyle = '#d5d0b5';
      c.lineWidth = 3;
      c.strokeRect(2, 2, w - 4, h - 4);
    } else if (kind === 'metal') {
      c.strokeStyle = '#737b792b';
      for (let i = 0; i < 260; i++) {
        const x = random() * w, y = random() * h;
        c.beginPath(); c.moveTo(x, y); c.lineTo(x + random() * 18, y - 2); c.stroke();
      }
      c.strokeStyle = '#5c6e7020';
      c.lineWidth = 3;
      c.strokeRect(5, 5, w - 10, h - 10);
    }
  });
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function label(text, { color = '#334947', background = '#e2ddc7', size = 52 } = {}) {
  const lines = text.split('\n');
  return canvasTexture(512, Math.max(128, lines.length * 76), (c, w, h) => {
    if (background) { c.fillStyle = background; c.fillRect(0, 0, w, h); }
    c.fillStyle = color;
    c.textBaseline = 'middle';
    c.font = `bold ${size}px "Courier New", monospace`;
    lines.forEach((line, i) => c.fillText(line, 22, h * (i + 0.5) / lines.length, w - 44));
    if (background) {
      c.strokeStyle = `${color}50`;
      c.lineWidth = 2;
      c.strokeRect(7, 7, w - 14, h - 14);
      for (let i = 0; i < 50; i++) {
        c.fillStyle = '#ffffff18'; c.fillRect(random() * w, random() * h, 12, 1);
      }
    }
  });
}

export function paper(kind) {
  return canvasTexture(512, 640, (c, w, h) => {
    c.fillStyle = kind === 'note' ? '#ebce7e' : '#e9e3ce';
    c.fillRect(0, 0, w, h);
    c.fillStyle = '#3e6066';
    c.font = 'bold 30px monospace';
    c.fillText(kind === 'note' ? 'Remember to look up.' : 'HAB-04 / SYSTEMS', 35, 60);
    c.font = '19px monospace';
    if (kind === 'note') {
      ['Water the basil.', 'Call home on Sunday.', '', '180 days up here.', 'Still beautiful.', '', 'Love, M.'].forEach((s, i) => c.fillText(s, 35, 130 + i * 52));
    } else {
      c.strokeStyle = '#4a828f'; c.lineWidth = 3;
      c.strokeRect(55, 100, 402, 210);
      for (let i = 0; i < 5; i++) {
        c.beginPath(); c.arc(125 + i * 64, 200, 29, 0, Math.PI * 2); c.stroke();
      }
      c.beginPath(); c.moveTo(70, 200); c.lineTo(440, 200); c.stroke();
      ['01  LIFE SUPPORT CIRCUIT', '02  OXYGEN / 21.0 kPa', '03  PRESSURE / NOMINAL', '04  RECYCLE / CLOSED LOOP', '', 'CHECK SEALS BEFORE EVA', 'FLIGHT MANUAL    REV. 06'].forEach((s, i) => c.fillText(s, 40, 355 + i * 34));
    }
    for (let i = 0; i < 2500; i++) { c.fillStyle = '#786c4010'; c.fillRect(random() * w, random() * h, 1, 2); }
  });
}

export function photo(index) {
  return canvasTexture(256, 300, (c, w, h) => {
    c.fillStyle = '#eee8d5'; c.fillRect(0, 0, w, h);
    c.fillStyle = ['#93bbc4', '#d4b39a', '#829ca8'][index % 3]; c.fillRect(15, 15, w - 30, 225);
    c.fillStyle = '#f0d6a0'; c.beginPath(); c.arc(177, 65, 24, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#557b72'; c.beginPath(); c.moveTo(15, 190); c.lineTo(90, 80); c.lineTo(157, 190); c.lineTo(215, 114); c.lineTo(241, 190); c.lineTo(241, 240); c.lineTo(15, 240); c.fill();
    if (index === 1) {
      for (let i = 0; i < 3; i++) {
        c.fillStyle = ['#b95942', '#e2c774', '#405e69'][i]; c.fillRect(54 + i * 55, 159, 33, 70);
        c.fillStyle = '#d7a07a'; c.beginPath(); c.arc(70 + i * 55, 144, 17, 0, Math.PI * 2); c.fill();
      }
    }
    c.fillStyle = '#5d6159'; c.font = '18px monospace'; c.fillText(['HOME / 07.12', 'see you soon', 'somewhere below'][index % 3], 19, 276);
  });
}

export function leafTexture() {
  return canvasTexture(128, 256, (c, w, h) => {
    c.fillStyle = '#709a42'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#c3ce67'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(64, 0); c.lineTo(64, h); c.stroke();
    for (let y = 30; y < h; y += 28) {
      c.lineWidth = 1.5; c.beginPath(); c.moveTo(10, y - 20); c.lineTo(64, y + 16); c.lineTo(118, y - 20); c.stroke();
    }
    for (let i = 0; i < 22; i++) {
      const x = 12 + random() * 104, y = random() * h;
      c.fillStyle = '#e9f8d7a0'; c.beginPath(); c.arc(x, y, 2, 0, Math.PI * 2); c.fill();
    }
  });
}

export function glowTexture() {
  return canvasTexture(128, 128, (c) => {
    const g = c.createRadialGradient(64, 64, 2, 64, 64, 64);
    g.addColorStop(0, '#ffffffa0'); g.addColorStop(0.25, '#ffffff30'); g.addColorStop(1, '#ffffff00');
    c.fillStyle = g; c.fillRect(0, 0, 128, 128);
  });
}

export function drawScreen(c, time, phase) {
  c.fillStyle = '#081b25'; c.fillRect(0, 0, 768, 480);
  c.fillStyle = '#7ce4d3'; c.font = 'bold 27px monospace'; c.fillText('HAB-04 / ORBITAL TELEMETRY', 25, 40);
  c.fillStyle = '#27606a'; c.fillRect(24, 57, 720, 2);
  c.font = '18px monospace'; c.fillStyle = '#a8c5bf';
  c.fillText('ALT 400.2 km     VEL 7.66 km/s', 26, 95);
  c.fillText('INC 51.64 deg    O2  21.0 kPa', 26, 126);
  c.fillText(`ORBIT ${String(Math.floor(time / 90) + 2880).padStart(5, '0')}     PHASE ${(phase * 360).toFixed(1)} deg`, 26, 157);
  c.strokeStyle = '#173b46'; c.lineWidth = 1;
  for (let x = 26; x < 740; x += 36) { c.beginPath(); c.moveTo(x, 185); c.lineTo(x, 380); c.stroke(); }
  for (let y = 185; y <= 380; y += 26) { c.beginPath(); c.moveTo(26, y); c.lineTo(740, y); c.stroke(); }
  ['#69efc9', '#6c9cc8'].forEach((color, i) => {
    c.strokeStyle = color; c.lineWidth = 3; c.beginPath();
    for (let x = 26; x < 740; x += 3) {
      const y = 265 + i * 37 + Math.sin(x * 0.018 + time * 0.6 + i) * (39 - i * 15) + Math.sin(x * 0.05 - time * 0.3) * 6;
      if (x === 26) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.stroke();
  });
  c.fillStyle = '#d5bb71'; c.font = '18px monospace'; c.fillText('UPLINK: LOCKED   /   ALL SYSTEMS NOMINAL', 26, 421);
  c.fillStyle = '#244851'; c.fillRect(26, 443, 710, 8);
  c.fillStyle = '#6ac7b2'; c.fillRect(26, 443, 710 * phase, 8);
  c.fillStyle = '#00000013';
  for (let y = 0; y < 480; y += 3) c.fillRect(0, y, 768, 1);
}
