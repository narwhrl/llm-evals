import { canvasTexture, FONT, MONO } from '../textures/canvas.js';

// Static labels live in a backing canvas; only the telemetry paths redraw at 12 Hz.
export function createLaptopScreen() {
  const values = ['ALT 408.2 km', 'INC 51.64°', 'VEL 7.66 km/s', 'PERIOD 92.8 min'];
  const background = document.createElement('canvas'); background.width = 1024; background.height = 640;
  const b = background.getContext('2d');
  b.fillStyle = '#071d25'; b.fillRect(0, 0, 1024, 640);
  b.fillStyle = '#3b7c83'; b.fillRect(0, 0, 1024, 68);
  b.fillStyle = '#e1f5df'; b.font = `700 40px ${FONT}`; b.fillText('ORBIT / LIVE TELEMETRY', 24, 48);
  b.fillStyle = '#86e7d8'; b.font = `700 44px ${MONO}`;
  for (let i = 0; i < 4; i++) b.fillText(values[i], 25, 130 + i * 64);
  b.fillStyle = '#aecac4'; b.font = `22px ${MONO}`;
  b.fillText('GROUND TRACK / 04', 588, 111); b.fillText('UTC 06:42:18   LINK: LOCKED', 24, 607);
  b.fillText('O₂  21.1%       CABIN  22.6°C', 24, 407);
  b.strokeStyle = '#23464d'; b.lineWidth = 2;
  for (let x = 585; x < 995; x += 50) { b.beginPath(); b.moveTo(x, 135); b.lineTo(x, 354); b.stroke(); }
  for (let y = 135; y < 365; y += 43) { b.beginPath(); b.moveTo(585, y); b.lineTo(995, y); b.stroke(); }
  const land = [
    [597, 161, 640, 145, 688, 158, 702, 193, 675, 229, 650, 221, 624, 181],
    [677, 235, 712, 258, 728, 294, 705, 326, 687, 286],
    [783, 174, 814, 150, 875, 159, 939, 183, 976, 216, 919, 236, 863, 201, 827, 218],
    [789, 221, 831, 217, 853, 258, 825, 301, 792, 267],
    [911, 288, 949, 278, 974, 309, 943, 326, 912, 316],
  ];
  b.fillStyle = '#345b53';
  for (const poly of land) {
    b.beginPath(); b.moveTo(poly[0], poly[1]);
    for (let i = 2; i < poly.length; i += 2) b.lineTo(poly[i], poly[i + 1]); b.closePath(); b.fill();
  }
  b.fillStyle = '#65a097'; b.font = `20px ${MONO}`; b.fillText('ATTITUDE / PITCH +0.04°', 588, 400);
  for (let x = 25; x < 1000; x += 48) { b.beginPath(); b.moveTo(x, 432); b.lineTo(x, 563); b.stroke(); }
  for (let y = 432; y < 565; y += 26) { b.beginPath(); b.moveTo(25, y); b.lineTo(994, y); b.stroke(); }
  // Subtle raster pixels are baked once, avoiding new gradients and text per frame.
  b.fillStyle = 'rgba(0,0,0,.09)'; for (let y = 0; y < 640; y += 3) b.fillRect(0, y, 1024, 1);
  const texture = canvasTexture(1024, 640, (c) => c.drawImage(background, 0, 0), { mipmaps: false });
  const c = texture.image.getContext('2d'); let accumulated = 0;
  function draw(t) {
    c.drawImage(background, 0, 0); c.lineWidth = 3;
    for (let n = 0; n < 2; n++) {
      c.strokeStyle = n ? '#54bdad' : '#b7f3ce'; c.beginPath();
      for (let x = 26; x < 995; x += 3) {
        const y = 494 + n * 30 + 18 * Math.sin(x * .012 + t * .26 + n * 1.8) + 8 * Math.sin(x * .044 + t * .19);
        if (x === 26) c.moveTo(x, y); else c.lineTo(x, y);
      }
      c.stroke();
    }
    c.strokeStyle = '#61dbdd'; c.lineWidth = 3; c.beginPath();
    for (let x = 587; x < 995; x += 3) {
      const y = 244 + 75 * Math.sin((x - 587) * .015 + t * .022);
      if (x === 587) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.stroke(); c.fillStyle = '#f0bd78';
    const markerX = 587 + (t * 4 % 400), markerY = 244 + 75 * Math.sin((markerX - 587) * .015 + t * .022);
    c.fillRect(markerX - 4, markerY - 4, 8, 8); texture.needsUpdate = true;
  }
  draw(0);
  return { texture, update(dt, t) { accumulated += dt; if (accumulated >= 1 / 12) { accumulated %= 1 / 12; draw(t); } } };
}
