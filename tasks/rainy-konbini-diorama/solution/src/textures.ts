import * as THREE from 'three';

// Deterministic pseudo-random so every reload draws identical textures.
function rng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function make(w: number, h: number, draw: Draw): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function memo<T>(gen: () => T): () => T {
  let cached: T | null = null;
  return () => {
    if (!cached) cached = gen();
    return cached;
  };
}

const JP = '"Yu Gothic", "Meiryo", "MS Gothic", sans-serif';
const LATIN = '"Arial Black", "Segoe UI", Arial, sans-serif';

/* ---------------------------------------------------------------- sky */

export const radialGlow = memo(() =>
  make(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }),
);

/* ------------------------------------------------------------- grounds */

export const asphalt = memo(() =>
  make(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#242a38';
    ctx.fillRect(0, 0, w, h);
    const r = rng(11);
    for (let i = 0; i < 900; i++) {
      const v = r();
      ctx.fillStyle =
        v > 0.55 ? 'rgba(140,150,175,0.10)' : 'rgba(8,10,16,0.22)';
      ctx.fillRect(r() * w, r() * h, 1 + r() * 2.5, 1 + r() * 2.5);
    }
  }),
);

export const sidewalk = memo(() =>
  make(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#464d60';
    ctx.fillRect(0, 0, w, h);
    const r = rng(23);
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = r() > 0.5 ? 'rgba(160,170,195,0.08)' : 'rgba(10,12,20,0.15)';
      ctx.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
    }
    ctx.strokeStyle = 'rgba(28,32,44,0.85)';
    ctx.lineWidth = 3;
    for (let i = 0; i <= 4; i++) {
      const p = (i * w) / 4;
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, h);
      ctx.moveTo(0, p);
      ctx.lineTo(w, p);
      ctx.stroke();
    }
  }),
);

export const grate = memo(() =>
  make(128, 64, (ctx, w, h) => {
    ctx.fillStyle = '#2b3242';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0a0d15';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(10, 8 + i * 11, w - 20, 6);
    }
    ctx.strokeStyle = '#3a4356';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, w - 4, h - 4);
  }),
);

export const interiorFloor = memo(() =>
  make(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#e9dfc9';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(150,135,105,0.55)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
      const p = (i * w) / 4;
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, h);
      ctx.moveTo(0, p);
      ctx.lineTo(w, p);
      ctx.stroke();
    }
  }),
);

/* -------------------------------------------------------------- signs */

export const fasciaSign = memo(() =>
  make(1024, 224, (ctx, w, h) => {
    ctx.fillStyle = '#f2f5f8';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#0e7c8c';
    ctx.lineWidth = 16;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    // red 24 badge
    ctx.fillStyle = '#d63a45';
    ctx.beginPath();
    ctx.arc(150, h / 2, 78, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 86px ${LATIN}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('24', 150, h / 2 + 6);
    // main wordmark, dark navy on white for strong contrast
    ctx.fillStyle = '#14335f';
    ctx.font = `900 128px ${LATIN}`;
    ctx.textAlign = 'left';
    ctx.fillText('KONBINI', 270, h / 2 + 8);
    ctx.fillStyle = '#0e7c8c';
    ctx.font = `700 52px ${JP}`;
    ctx.textAlign = 'right';
    ctx.fillText('24時間営業', w - 48, h / 2 + 8);
  }),
);

export const sideSign = memo(() =>
  make(144, 480, (ctx, w, h) => {
    ctx.fillStyle = '#0b6472';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#eaf6f8';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.fillStyle = '#ffffff';
    ctx.font = `700 86px ${JP}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const chars = ['コ', 'ン', 'ビ', 'ニ'];
    chars.forEach((c, i) => ctx.fillText(c, w / 2, 86 + i * 88));
    ctx.fillStyle = '#ffd76e';
    ctx.font = `900 58px ${LATIN}`;
    ctx.fillText('24H', w / 2, h - 52);
  }),
);

export const billboard = memo(() =>
  make(640, 200, (ctx, w, h) => {
    ctx.fillStyle = '#101826';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#3fd6e8';
    ctx.lineWidth = 10;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.fillStyle = '#7ce8f4';
    ctx.font = `700 92px ${JP}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ドラッグストア', w / 2, h / 2 - 8);
    ctx.fillStyle = '#c9d6e8';
    ctx.font = `700 44px ${LATIN}`;
    ctx.fillText('DRUG STORE', w / 2, h / 2 + 64);
  }),
);

export const ramenSign = memo(() =>
  make(224, 96, (ctx, w, h) => {
    ctx.fillStyle = '#1a0f12';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#e2483f';
    ctx.lineWidth = 6;
    ctx.strokeRect(5, 5, w - 10, h - 10);
    ctx.fillStyle = '#ff7a5c';
    ctx.font = `700 56px ${JP}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('らーめん', w / 2, h / 2);
  }),
);

export const noParking = memo(() =>
  make(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#1c66c8';
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d8402f';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(28, 28);
    ctx.lineTo(100, 100);
    ctx.moveTo(100, 28);
    ctx.lineTo(28, 100);
    ctx.stroke();
  }),
);

export const pSign = memo(() =>
  make(96, 96, (ctx, w, h) => {
    ctx.fillStyle = '#1c66c8';
    ctx.fillRect(4, 4, w - 8, h - 8);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 64px ${LATIN}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', w / 2, h / 2 + 4);
  }),
);

/* ------------------------------------------------------------- posters */

export const posterNew = memo(() =>
  make(160, 224, (ctx, w, h) => {
    ctx.fillStyle = '#e23b48';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ffd76e';
    ctx.beginPath();
    ctx.arc(w / 2, 74, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e23b48';
    ctx.font = `900 34px ${LATIN}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NEW', w / 2, 74);
    ctx.fillStyle = '#ffffff';
    ctx.font = `700 52px ${JP}`;
    ctx.fillText('新発売', w / 2, 156);
    ctx.font = `700 26px ${JP}`;
    ctx.fillText('毎日お得', w / 2, 198);
  }),
);

export const noticePapers = memo(() =>
  make(256, 200, (ctx, w, h) => {
    ctx.fillStyle = '#8a6a4a';
    ctx.fillRect(0, 0, w, h);
    const papers: [string, number, number, number][] = [
      ['#f4efe2', 14, 16, -0.04],
      ['#ffe9a8', 96, 26, 0.05],
      ['#f4efe2', 176, 14, -0.02],
      ['#d8e8f4', 52, 108, 0.03],
      ['#ffe9a8', 158, 112, -0.05],
    ];
    const r = rng(41);
    for (const [col, x, y, rot] of papers) {
      ctx.save();
      ctx.translate(x + 32, y + 36);
      ctx.rotate(rot);
      ctx.fillStyle = col;
      ctx.fillRect(-32, -36, 64, 72);
      ctx.fillStyle = 'rgba(40,50,70,0.65)';
      for (let i = 0; i < 6; i++) {
        ctx.fillRect(-24, -24 + i * 10, 48 * (0.5 + r() * 0.5), 3);
      }
      ctx.restore();
    }
    ctx.fillStyle = '#f4efe2';
    ctx.fillRect(0, 0, w, 22);
    ctx.fillStyle = '#22344c';
    ctx.font = `700 16px ${JP}`;
    ctx.textAlign = 'center';
    ctx.fillText('お知らせ・掲示板', w / 2, 16);
  }),
);

export const bannerHang = memo(() =>
  make(144, 384, (ctx, w, h) => {
    ctx.fillStyle = '#f7f3e8';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#d63a45';
    ctx.lineWidth = 10;
    ctx.strokeRect(7, 7, w - 14, h - 14);
    ctx.fillStyle = '#14335f';
    ctx.font = `700 62px ${JP}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ['お', 'に', 'ぎ', 'り'].forEach((c, i) => ctx.fillText(c, w / 2, 92 + i * 64));
    ctx.fillStyle = '#d63a45';
    ctx.font = `900 46px ${JP}`;
    ctx.fillText('120円', w / 2, h - 48);
  }),
);

/* ------------------------------------------------------------ machines */

export const vendingFront = memo(() =>
  make(288, 720, (ctx, w, h) => {
    ctx.fillStyle = '#2a303e';
    ctx.fillRect(0, 0, w, h);
    // brand band
    ctx.fillStyle = '#0e7c8c';
    ctx.fillRect(10, 12, w - 20, 84);
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 54px ${JP}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ドリンク', w / 2, 54);
    // glowing showcase
    ctx.fillStyle = '#0c1420';
    ctx.fillRect(18, 108, w - 36, 420);
    const r = rng(97);
    const cols = ['#e85d4a', '#f2b04a', '#5cc8e8', '#7ed07a', '#ee88a8', '#f0f0e8'];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        const x = 34 + col * 46;
        const y = 130 + row * 98;
        ctx.fillStyle = cols[Math.floor(r() * cols.length)];
        ctx.fillRect(x, y, 36, 62);
        ctx.fillStyle = 'rgba(255,255,255,0.28)';
        ctx.fillRect(x, y, 36, 10);
        ctx.fillStyle = '#ffd76e';
        ctx.fillRect(x + 4, y + 66, 28, 14);
        ctx.fillStyle = '#3a3020';
        ctx.font = `700 12px ${LATIN}`;
        ctx.fillText('140', x + 18, y + 73);
      }
    }
    // shelf glow lines
    ctx.fillStyle = 'rgba(140,210,255,0.30)';
    for (let row = 0; row < 4; row++) {
      ctx.fillRect(18, 122 + row * 98, w - 36, 4);
    }
    // dispensing slot with warm glow
    const g = ctx.createLinearGradient(0, 560, 0, 700);
    g.addColorStop(0, '#ffd9a0');
    g.addColorStop(1, '#8a5c30');
    ctx.fillStyle = '#101620';
    ctx.fillRect(18, 556, w - 36, 128);
    ctx.fillStyle = g;
    ctx.fillRect(30, 574, w - 60, 66);
    ctx.fillStyle = '#0a0e16';
    ctx.fillRect(38, 586, w - 76, 40);
    ctx.fillStyle = '#cfd8e8';
    ctx.font = `700 20px ${JP}`;
    ctx.fillText('つめた〜い', w / 2, 700);
  }),
);

export const coolerFront = memo(() =>
  make(224, 480, (ctx, w, h) => {
    ctx.fillStyle = '#3a4150';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0e1a2a';
    ctx.fillRect(10, 34, w - 20, h - 92);
    const r = rng(59);
    const cols = ['#5cc8e8', '#f2b04a', '#e85d4a', '#7ed07a', '#f0ede2', '#ee88a8'];
    for (let shelf = 0; shelf < 4; shelf++) {
      const y = 52 + shelf * 92;
      ctx.fillStyle = 'rgba(150,220,255,0.35)';
      ctx.fillRect(10, y - 6, w - 20, 4);
      for (let col = 0; col < 6; col++) {
        const x = 20 + col * 32;
        ctx.fillStyle = cols[Math.floor(r() * cols.length)];
        ctx.fillRect(x, y, 24, 58);
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(x, y, 24, 8);
      }
    }
    ctx.fillStyle = '#f4f6f8';
    ctx.fillRect(0, 0, w, 26);
    ctx.fillStyle = '#22344c';
    ctx.font = `700 18px ${JP}`;
    ctx.textAlign = 'center';
    ctx.fillText('冷やしてください', w / 2, 19);
    ctx.fillStyle = '#9fe8ff';
    ctx.font = `700 20px ${JP}`;
    ctx.fillText('キンキンに冷えてます', w / 2, h - 30);
  }),
);

export const beerCrate = memo(() =>
  make(128, 96, (ctx, w, h) => {
    ctx.fillStyle = '#d9a73c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#8a6418';
    ctx.lineWidth = 6;
    ctx.strokeRect(4, 4, w - 8, h - 8);
    ctx.fillStyle = '#1c2a4a';
    ctx.font = `900 34px ${JP}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ビール', w / 2, h / 2);
    ctx.fillStyle = '#3a7a4a';
    for (let i = 0; i < 4; i++) ctx.fillRect(14 + i * 28, 8, 18, 8);
  }),
);

export const shutter = memo(() =>
  make(128, 256, (ctx, w, h) => {
    ctx.fillStyle = '#4a5162';
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 14) {
      ctx.fillStyle = 'rgba(12,16,26,0.5)';
      ctx.fillRect(0, y, w, 4);
      ctx.fillStyle = 'rgba(170,180,205,0.16)';
      ctx.fillRect(0, y + 4, w, 3);
    }
  }),
);

/* ------------------------------------------------------ misc controls */

export const floorArrow = memo(() =>
  make(112, 224, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f08c2e';
    ctx.beginPath();
    ctx.moveTo(w / 2, 8);
    ctx.lineTo(w - 26, 92);
    ctx.lineTo(w / 2 + 14, 92);
    ctx.lineTo(w / 2 + 14, h - 34);
    ctx.lineTo(w / 2 - 14, h - 34);
    ctx.lineTo(w / 2 - 14, 92);
    ctx.lineTo(26, 92);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#14335f';
    ctx.font = `700 44px ${JP}`;
    ctx.textAlign = 'center';
    ctx.fillText('レジ', w / 2, h - 76);
  }),
);

export const staffDoor = memo(() =>
  make(96, 128, (ctx, w, h) => {
    ctx.fillStyle = '#d8d2c4';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#8a8272';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.fillStyle = '#43536a';
    ctx.font = `700 26px ${JP}`;
    ctx.textAlign = 'center';
    ctx.fillText('スタッフ', w / 2, 58);
    ctx.fillText('専用', w / 2, 90);
  }),
);

export const welcomeMat = memo(() =>
  make(256, 96, (ctx, w, h) => {
    ctx.fillStyle = '#2b3040';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#4a5468';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    ctx.fillStyle = '#8e99ad';
    ctx.font = `700 40px ${LATIN}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('WELCOME', w / 2, h / 2);
  }),
);

export const awningTop = memo(() =>
  make(256, 128, (ctx, w, h) => {
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#efe6d4' : '#2e8ea0';
      ctx.fillRect((i * w) / 8, 0, w / 8, h);
    }
  }),
);

/* ----------------------------------------------------- effect sprites */

// Vertical light smear used as the wet-street reflection under light sources.
export const streak = memo(() =>
  make(64, 256, (ctx, w, h) => {
    const v = ctx.createLinearGradient(0, 0, 0, h);
    v.addColorStop(0, 'rgba(255,255,255,0.95)');
    v.addColorStop(0.4, 'rgba(255,255,255,0.35)');
    v.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
    // fade the side edges so the smear reads as a soft vertical streak
    ctx.globalCompositeOperation = 'destination-in';
    const hv = ctx.createLinearGradient(0, 0, w, 0);
    hv.addColorStop(0, 'rgba(255,255,255,0)');
    hv.addColorStop(0.3, 'rgba(255,255,255,1)');
    hv.addColorStop(0.7, 'rgba(255,255,255,1)');
    hv.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hv;
    ctx.fillRect(0, 0, w, h);
  }),
);

export const guardRail = memo(() =>
  make(128, 32, (ctx, w, h) => {
    ctx.fillStyle = '#e8c832';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#20242c';
    for (let i = -1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 32, h);
      ctx.lineTo(i * 32 + 16, h);
      ctx.lineTo(i * 32 + 32 + 16, 0);
      ctx.lineTo(i * 32 + 32, 0);
      ctx.closePath();
      ctx.fill();
    }
  }),
);

export const steam = memo(() =>
  make(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 6, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(235,242,250,0.5)');
    g.addColorStop(0.6, 'rgba(235,242,250,0.18)');
    g.addColorStop(1, 'rgba(235,242,250,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }),
);
