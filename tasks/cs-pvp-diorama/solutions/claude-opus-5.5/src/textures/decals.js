import { rand, range } from '../core/rng.js';
import { makeCanvas, toTexture, speckle } from '../core/canvas.js';

// 4 x 4 atlas of 256 px cells. Names map to cell indices used by decal placement.
export const DECAL = {
  siteA: 0, siteB: 1, tSpray: 2, ctEmblem: 3,
  arrowA: 4, arrowB: 5, bullets: 6, hazard: 7,
  freightNo: 8, tagDust: 9, tagGG: 10, policeLine: 11,
  roster: 12, freightSign: 13, rushB: 14, newspaper: 15,
};

const C = 256;
const FONT = '"Arial Black", Impact, "Microsoft YaHei", sans-serif';

function drips(x, cx, cy, w, color, n) {
  x.fillStyle = color;
  for (let i = 0; i < n; i++) {
    const px = cx + range(-w / 2, w / 2);
    const len = range(10, 50);
    x.fillRect(px, cy, range(1.5, 3.5), len);
    x.beginPath();
    x.arc(px + 1.5, cy + len, 2.4, 0, 7);
    x.fill();
  }
}

// Worn paint: knock random holes into the cell so decals look faded.
function wear(x, amount) {
  x.save();
  x.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < amount; i++) {
    x.fillStyle = `rgba(0,0,0,${range(0.2, 0.8)})`;
    x.beginPath();
    x.arc(rand() * C, rand() * C, range(1, 6), 0, 7);
    x.fill();
  }
  x.restore();
}

function stencilLetter(x, letter, color) {
  x.strokeStyle = color;
  x.lineWidth = 12;
  x.beginPath();
  x.arc(128, 128, 104, 0, Math.PI * 2);
  x.stroke();
  x.fillStyle = color;
  x.font = `190px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(letter, 128, 140);
  // stencil bridges
  x.save();
  x.globalCompositeOperation = 'destination-out';
  x.fillRect(0, 124, C, 7);
  x.restore();
  wear(x, 260);
}

function arrow(x, letter) {
  x.fillStyle = 'rgba(240,240,232,0.92)';
  x.beginPath();
  x.moveTo(30, 108); x.lineTo(150, 108); x.lineTo(150, 70); x.lineTo(226, 128);
  x.lineTo(150, 186); x.lineTo(150, 148); x.lineTo(30, 148);
  x.closePath();
  x.fill();
  x.fillStyle = '#1a1a1a';
  x.font = `64px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(letter, 92, 130);
  wear(x, 120);
}

function bulletHoles(x) {
  for (let i = 0; i < 26; i++) {
    const px = 128 + range(-100, 100) * rand();
    const py = 128 + range(-100, 100) * rand();
    const r = range(3, 7);
    x.fillStyle = 'rgba(180,176,168,0.6)';
    x.beginPath(); x.arc(px, py, r * 2.1, 0, 7); x.fill();
    x.fillStyle = 'rgba(12,12,14,0.95)';
    x.beginPath(); x.arc(px, py, r, 0, 7); x.fill();
    x.strokeStyle = 'rgba(20,20,20,0.6)';
    x.lineWidth = 1;
    for (let k = 0; k < 4; k++) {
      const a = rand() * 7;
      x.beginPath();
      x.moveTo(px, py);
      x.lineTo(px + Math.cos(a) * r * 3, py + Math.sin(a) * r * 3);
      x.stroke();
    }
  }
}

function textBlock(x, lines, bg, fg) {
  if (bg) { x.fillStyle = bg; x.fillRect(8, 40, 240, 176); }
  x.fillStyle = fg;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  lines.forEach(([t, size, y]) => {
    x.font = `${size}px ${FONT}`;
    x.fillText(t, 128, y);
  });
}

function paper(x, lined) {
  x.fillStyle = 'rgba(214,208,190,0.95)';
  x.fillRect(40, 20, 176, 216);
  x.strokeStyle = 'rgba(60,60,70,0.7)';
  x.lineWidth = 2;
  if (lined) {
    for (let r = 0; r < 9; r++) { x.beginPath(); x.moveTo(52, 60 + r * 19); x.lineTo(204, 60 + r * 19); x.stroke(); }
    for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(52 + k * 50, 60); x.lineTo(52 + k * 50, 212); x.stroke(); }
    x.fillStyle = '#222';
    x.font = `20px ${FONT}`;
    x.textAlign = 'center';
    x.fillText('值班表 DUTY', 128, 42);
  } else {
    x.fillStyle = '#2a2a2a';
    x.font = `26px ${FONT}`;
    x.textAlign = 'center';
    x.fillText('DAILY NEWS', 128, 50);
    x.fillStyle = 'rgba(40,40,40,0.55)';
    for (let r = 0; r < 12; r++) x.fillRect(52, 70 + r * 13, r % 4 === 3 ? 90 : 152, 6);
  }
  speckle(x, C, 200, '90,80,60', 0.4, 3);
}

export function decalAtlas() {
  const canvas = makeCanvas(C * 4);
  const ctx = canvas.getContext('2d');
  const draws = [
    (x) => stencilLetter(x, 'A', 'rgba(236,236,228,0.95)'),
    (x) => stencilLetter(x, 'B', 'rgba(236,236,228,0.95)'),
    (x) => { textBlock(x, [['T', 170, 118]], null, 'rgba(196,40,28,0.92)'); drips(x, 128, 190, 110, 'rgba(196,40,28,0.85)', 9); wear(x, 90); },
    (x) => {
      x.fillStyle = 'rgba(28,62,140,0.95)';
      x.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 48 : 112;
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        x.lineTo(128 + Math.cos(a) * r, 128 + Math.sin(a) * r);
      }
      x.closePath(); x.fill();
      x.fillStyle = '#e8c250'; x.beginPath(); x.arc(128, 128, 36, 0, 7); x.fill();
      textBlock(x, [['CT', 34, 130]], null, '#1c2c5a');
    },
    (x) => arrow(x, 'A'),
    (x) => arrow(x, 'B'),
    (x) => bulletHoles(x),
    (x) => { x.fillStyle = '#e0b420'; x.fillRect(0, 70, C, 116); x.fillStyle = '#141414';
      for (let i = -2; i < 8; i++) { x.beginPath(); x.moveTo(i * 48, 186); x.lineTo(i * 48 + 24, 186); x.lineTo(i * 48 + 140, 70); x.lineTo(i * 48 + 116, 70); x.fill(); }
      wear(x, 200); },
    (x) => { textBlock(x, [['FRT-0417', 50, 100], ['MAX GROSS 30480 KG', 18, 150], ['货运 07', 36, 190]], null, 'rgba(232,232,224,0.9)'); wear(x, 160); },
    (x) => { x.lineWidth = 10; x.strokeStyle = '#141414'; x.fillStyle = '#e8702a'; x.font = `92px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.strokeText('DUST', 128, 118); x.fillText('DUST', 128, 118); x.fillStyle = '#3ab0d8'; x.font = `30px ${FONT}`; x.fillText('crew', 180, 186); drips(x, 128, 150, 180, 'rgba(232,112,42,0.8)', 7); wear(x, 120); },
    (x) => { x.lineWidth = 8; x.strokeStyle = '#101010'; x.fillStyle = '#6ad04a'; x.font = `130px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.strokeText('GG', 128, 128); x.fillText('GG', 128, 128); drips(x, 128, 170, 150, 'rgba(106,208,74,0.8)', 8); wear(x, 90); },
    (x) => { x.fillStyle = '#e8c21e'; x.fillRect(0, 92, C, 72); textBlock(x, [['POLICE LINE 警戒线', 26, 128]], null, '#111'); },
    (x) => paper(x, true),
    (x) => { textBlock(x, [['FREIGHT 07', 44, 100], ['货运站 卸货区', 34, 160]], 'rgba(28,70,54,0.95)', '#e8e6d8'); x.strokeStyle = '#e8e6d8'; x.lineWidth = 5; x.strokeRect(16, 48, 224, 160); wear(x, 60); },
    (x) => { x.fillStyle = 'rgba(236,236,236,0.9)'; x.font = `60px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.save(); x.translate(128, 128); x.rotate(-0.18); x.fillText('RUSH B', 0, 0); x.restore(); drips(x, 128, 150, 170, 'rgba(236,236,236,0.7)', 8); wear(x, 90); },
    (x) => paper(x, false),
  ];
  draws.forEach((draw, i) => {
    ctx.save();
    ctx.translate((i % 4) * C, Math.floor(i / 4) * C);
    ctx.beginPath();
    ctx.rect(0, 0, C, C);
    ctx.clip();
    draw(ctx);
    ctx.restore();
  });
  return toTexture(canvas, { repeat: false });
}
