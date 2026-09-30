// Procedural cabin paint and industrial surfaces; generated locally once at startup.
import { canvasTexture, rng, roundRect, drawGrime, drawRivetRow, drawLabel,
  drawHazardStripes, FONT, MONO } from './canvas.js';

export function wallTexture() {
  return canvasTexture(2048, 2048, (c, w, h) => {
    c.fillStyle = '#dddeda'; c.fillRect(0, 0, w, h);
    const r = rng(104);
    for (let i = 0; i < 24000; i++) {
      c.fillStyle = `rgba(88,94,89,${r() * 0.025})`;
      c.fillRect(r() * w, r() * h, 2 + r() * 4, 2 + r() * 3);
    }
    roundRect(c, 28, 28, w - 56, h - 56, 85);
    c.fillStyle = '#e8e8e0'; c.fill();
    c.strokeStyle = '#818d8a'; c.lineWidth = 7; c.stroke();
    roundRect(c, 39, 39, w - 78, h - 78, 75);
    c.strokeStyle = '#f7f6ef'; c.lineWidth = 7; c.stroke();
    for (const edge of [[98, 72, w - 98, 72], [98, h - 72, w - 98, h - 72],
      [72, 98, 72, h - 98], [w - 72, 98, w - 72, h - 98]]) {
      drawRivetRow(c, ...edge, 8, 9);
    }
    drawGrime(c, w, h, { scratches: 170, grime: 16, seed: 79 });
    c.fillStyle = '#657b79'; c.font = `22px ${MONO}`;
    c.fillText('HAB / THERMAL PANEL · 28V', 125, h - 126);
    c.fillStyle = '#a6b1aa'; c.fillRect(125, h - 200, 58, 8);
    c.fillRect(194, h - 200, 23, 8);
  }, { wrap: true });
}

export function surfaceTexture(base = '#9caaa9', seed = 19, kind = 'metal') {
  return canvasTexture(512, 512, (c, w, h) => {
    c.fillStyle = base; c.fillRect(0, 0, w, h);
    const r = rng(seed);
    for (let i = 0; i < 6500; i++) {
      c.fillStyle = `rgba(${i % 2 ? '245,246,232' : '32,40,42'},${0.015 + r() * 0.06})`;
      const size = kind === 'foam' ? 1 + r() * 5 : 0.6 + r();
      c.fillRect(r() * w, r() * h, size, kind === 'metal' ? 1 : size);
    }
    drawGrime(c, w, h, { scratches: kind === 'foam' ? 5 : 75, grime: 10, seed });
    if (kind === 'cable') {
      c.strokeStyle = 'rgba(232,225,211,.3)'; c.lineWidth = 3;
      for (let x = -512; x < 1024; x += 38) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x + 512, h); c.stroke();
      }
      c.strokeStyle = 'rgba(15,23,25,.28)';
      for (let y = 8; y < h; y += 16) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
      }
    }
  }, { wrap: true });
}

export function floorTexture() {
  return canvasTexture(1024, 1024, (c, w, h) => {
    c.fillStyle = '#56666b'; c.fillRect(0, 0, w, h);
    // Light matte deck (albedo ≈ 0.35) so the porthole sun patch reads bright against it.
    c.fillStyle = '#a3aeac'; c.fillRect(8, 8, w - 16, h - 16);
    for (let y = 45; y < h - 40; y += 59) {
      for (let x = 39; x < w - 40; x += 113) {
        roundRect(c, x, y, 91, 29, 9);
        c.fillStyle = '#3e4c52'; c.fill();
        c.strokeStyle = '#c1c9c6'; c.lineWidth = 3; c.stroke();
        c.fillStyle = '#26323a'; c.fillRect(x + 8, y + 6, 75, 8);
        c.fillStyle = '#d6dcd8'; c.fillRect(x + 8, y + 32, 74, 3);
      }
    }
    drawRivetRow(c, 27, 27, w - 27, 27, 5, 8);
    drawRivetRow(c, 27, h - 27, w - 27, h - 27, 5, 8);
    drawGrime(c, w, h, { scratches: 110, grime: 14, seed: 44 });
  }, { wrap: true });
}

export function labelTexture(text, subtitle = '', bg = '#dedfd5', fg = '#263c40') {
  return canvasTexture(1024, 256, (c, w, h) => {
    c.fillStyle = bg; c.fillRect(0, 0, w, h);
    c.strokeStyle = fg; c.lineWidth = 10; c.strokeRect(11, 11, w - 22, h - 22);
    c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `800 ${text.length > 11 ? 70 : 96}px ${FONT}`;
    c.fillText(text, w / 2, subtitle ? 97 : 129);
    if (subtitle) {
      c.font = `26px ${MONO}`; c.fillText(subtitle, w / 2, 195);
    }
    drawGrime(c, w, h, { scratches: 25, grime: 4, seed: text.length * 31 });
  });
}

export function serviceTexture(type = 'access', number = '04') {
  return canvasTexture(1024, 1024, (c, w, h) => {
    c.fillStyle = '#b7c2be'; c.fillRect(0, 0, w, h);
    roundRect(c, 19, 19, w - 38, h - 38, 45);
    c.fillStyle = '#d9dfd6'; c.fill();
    c.strokeStyle = '#586b6e'; c.lineWidth = 12; c.stroke();
    drawLabel(c, number, 64, 65, 170, 108, { bg: '#385259', fg: '#e9ebe1' });
    c.fillStyle = '#3e5556'; c.font = `25px ${MONO}`;
    c.fillText('HABITAT // SERVICE ONLY', 278, 111);
    c.fillText('PRESSURE VERIFIED · 101.3 kPa', 66, 925);
    if (type === 'vent') {
      for (let y = 244; y < 820; y += 59) {
        roundRect(c, 85, y, 854, 27, 9); c.fillStyle = '#25373b'; c.fill();
        c.fillStyle = '#869998'; c.fillRect(96, y + 26, 830, 7);
      }
    } else {
      c.strokeStyle = '#758b89'; c.lineWidth = 4; c.strokeRect(78, 241, 868, 597);
      drawLabel(c, 'QUARTER TURN', 160, 370, 704, 95, { bg: '#d2d8ce', fg: '#526b6c' });
      c.font = `43px ${MONO}`; c.fillText('←  OPEN    LOCK  →', 180, 602);
      drawHazardStripes(c, 84, 782, 858, 39, 36);
      c.fillStyle = '#778b87'; c.fillRect(384, 659, 258, 25);
    }
    drawGrime(c, w, h, { scratches: 80, grime: 12, seed: 51 + number.length });
  });
}
