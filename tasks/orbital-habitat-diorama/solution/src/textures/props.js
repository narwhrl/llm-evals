// Local, deterministic canvas materials: no network assets or shiny PBR surfaces.
import { canvasTexture, rng, drawGrime, drawRivet, FONT, MONO } from './canvas.js';

export function fabricTexture(base, stitch = '#b9c7ba') {
  return canvasTexture(512, 512, (c, w, h) => {
    c.fillStyle = base; c.fillRect(0, 0, w, h);
    for (let i = 0; i < w; i += 4) {
      c.strokeStyle = i % 8 ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.12)';
      c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke();
      c.beginPath(); c.moveTo(0, i); c.lineTo(w, i); c.stroke();
    }
    c.strokeStyle = stitch; c.lineWidth = 3; c.setLineDash([6, 4]);
    c.strokeRect(15, 15, w - 30, h - 30); c.setLineDash([]);
    drawGrime(c, w, h, { scratches: 25, grime: 7, seed: 14 });
  });
}

export function paintedTexture(base = '#bdc6c1') {
  return canvasTexture(256, 256, (c, w, h) => {
    c.fillStyle = base; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(40,49,47,.2)'; c.lineWidth = 2;
    c.strokeRect(8, 8, w - 16, h - 16);
    for (const x of [14, 242]) for (const y of [14, 242]) drawRivet(c, x, y, 3);
    drawGrime(c, w, h, { scratches: 100, grime: 8, seed: 23 });
  });
}

export function webbingTexture(tape = false) {
  return canvasTexture(256, 256, (c, w, h) => {
    c.fillStyle = tape ? '#d9c49a' : '#333d39'; c.fillRect(0, 0, w, h);
    const r = rng(82); c.strokeStyle = tape ? '#beaa85' : '#738077';
    for (let i = 0; i < 2600; i++) {
      const x = r() * w, y = r() * h;
      c.beginPath(); c.moveTo(x, y); c.lineTo(x + 1, y + 3); c.stroke();
    }
    c.strokeStyle = tape ? '#f1e2be' : '#adbaac'; c.lineWidth = 3;
    c.setLineDash([5, 3]); c.strokeRect(8, 8, w - 16, h - 16);
  });
}

export function paperTexture(title, lines, { color = '#ece7d4', ink = '#31464b', hand = false } = {}) {
  return canvasTexture(768, 1024, (c, w, h) => {
    c.fillStyle = color; c.fillRect(0, 0, w, h);
    const r = rng(18);
    for (let i = 0; i < 4500; i++) {
      c.fillStyle = `rgba(70,56,28,${r() * .05})`;
      c.fillRect(r() * w, r() * h, 1, 2);
    }
    c.strokeStyle = '#c4cbbb'; c.lineWidth = 2;
    for (let y = 170; y < h - 60; y += 94) {
      c.beginPath(); c.moveTo(40, y); c.lineTo(w - 40, y); c.stroke();
    }
    c.fillStyle = ink; c.font = `700 68px ${hand ? '"Segoe Print", cursive' : FONT}`;
    c.fillText(title, 40, 110, w - 80);
    c.font = `${hand ? 'italic' : '400'} 48px ${hand ? '"Segoe Print", cursive' : MONO}`;
    for (let i = 0; i < lines.length; i++) c.fillText(lines[i], 44, 238 + i * 94, w - 88);
    drawGrime(c, w, h, { scratches: 10, grime: 5, seed: 27 });
  });
}

export function photoTexture(which = 0) {
  return canvasTexture(512, 640, (c, w, h) => {
    c.fillStyle = '#ede8d8'; c.fillRect(0, 0, w, h);
    c.fillStyle = ['#8cb8bd', '#b1c6bf', '#d9b88c'][which % 3]; c.fillRect(25, 25, 462, 495);
    c.fillStyle = '#49767a'; c.beginPath(); c.moveTo(25, 340);
    c.lineTo(175, 125); c.lineTo(302, 321); c.lineTo(405, 190); c.lineTo(487, 300);
    c.lineTo(487, 520); c.lineTo(25, 520); c.fill();
    c.fillStyle = '#658b65'; c.fillRect(25, 400, 462, 120);
    c.fillStyle = '#f2dfb1'; c.beginPath(); c.arc(390, 107, 38, 0, Math.PI * 2); c.fill();
    for (let i = 0; i < 3; i++) {
      const x = 115 + i * 129, y = i === 1 ? 330 : 285;
      c.fillStyle = '#c99472'; c.beginPath(); c.arc(x, y, 32, 0, Math.PI * 2); c.fill();
      c.fillStyle = ['#c07d61', '#ead7a3', '#51606a'][i];
      c.beginPath(); c.moveTo(x - 31, y + 33); c.lineTo(x + 31, y + 33);
      c.lineTo(x + 42, 496); c.lineTo(x - 42, 496); c.fill();
      c.fillStyle = '#423e37'; c.fillRect(x - 21, y - 34, 43, 17);
    }
    c.fillStyle = '#5e6257'; c.font = 'italic 30px "Segoe Print", cursive';
    c.fillText(['HOME / JUNE 14', 'Mei + us, by the sea', 'See you next spring!'][which % 3], 37, 584);
    drawGrime(c, w, h, { scratches: 6, grime: 3, seed: which + 2 });
  });
}

export function labelTexture(text, sub = '', color = '#ece5cf') {
  return canvasTexture(512, 256, (c, w, h) => {
    c.fillStyle = color; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#545f54'; c.lineWidth = 6; c.strokeRect(10, 10, w - 20, h - 20);
    c.fillStyle = '#253b38'; c.font = `700 72px ${FONT}`; c.fillText(text, 30, 110, w - 60);
    c.font = `30px ${MONO}`; c.fillText(sub, 32, 167, w - 64);
    const r = rng(5); for (let x = 34; x < 240; x += 6) c.fillRect(x, 194, r() * 3 + 1, 28);
    drawGrime(c, w, h, { scratches: 20, grime: 4 });
  });
}

export function leafTexture() {
  return canvasTexture(256, 512, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, '#315939'); g.addColorStop(.5, '#87b555'); g.addColorStop(1, '#4d7f3f');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#b9d58a'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(128, 0); c.lineTo(128, 512); c.stroke();
    c.lineWidth = 1.5;
    for (let y = 45; y < h; y += 46) {
      c.beginPath(); c.moveTo(128, y); c.lineTo(15, y + 76); c.stroke();
      c.beginPath(); c.moveTo(128, y); c.lineTo(241, y + 76); c.stroke();
    }
    const r = rng(62);
    for (let i = 0; i < 15; i++) {
      const x = r() * 220 + 18, y = r() * 480 + 16, rad = r() * 6 + 3;
      c.fillStyle = 'rgba(21,58,39,.45)'; c.beginPath(); c.ellipse(x + 2, y + 3, rad, rad * 1.2, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = '#b2dfce'; c.stroke(); c.fillStyle = '#edfbe0';
      c.beginPath(); c.arc(x - 1, y - 2, rad * .3, 0, Math.PI * 2); c.fill();
    }
  });
}

export function drawingTexture(title, lines, which) {
  const texture = paperTexture(title, lines);
  const c = texture.image.getContext('2d');
  c.fillStyle = '#e7e3d2'; c.fillRect(32, 595, 704, 390);
  c.strokeStyle = '#507a80'; c.lineWidth = 4;
  c.setLineDash([10, 8]); c.strokeRect(75, 655, 600, 270); c.setLineDash([]);
  if (which === 0) {
    for (const r of [75, 110]) { c.beginPath(); c.arc(375, 785, r, 0, Math.PI * 2); c.stroke(); }
    c.beginPath(); c.moveTo(180, 785); c.lineTo(580, 785); c.moveTo(375, 630); c.lineTo(375, 945); c.stroke();
  } else if (which === 1) {
    for (let i = 0; i < 3; i++) c.strokeRect(125 + i * 200, 725, 130, 115);
    c.beginPath(); c.moveTo(65, 785); c.lineTo(705, 785); c.stroke();
    c.font = `28px ${MONO}`; c.fillStyle = '#3c6266'; c.fillText('BUS → BATT → LOAD', 150, 900);
  } else {
    c.beginPath(); c.ellipse(375, 780, 260, 90, -.17, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(375, 780, 48, 0, Math.PI * 2); c.stroke();
    c.fillStyle = '#557c78'; c.fillRect(558, 717, 22, 22);
    c.font = `28px ${MONO}`; c.fillText('GROUND TRACK / +Z', 158, 915);
  }
  texture.needsUpdate = true; return texture;
}
