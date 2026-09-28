/**
 * 程序化纹理：全部自制（Canvas 生成），无外部资源。
 * 集装箱波纹、木箱板拼、篷布褶皱、防滑甲板、舱壁污渍。
 */
import * as THREE from 'three';

const cache = new Map<string, THREE.Texture>();

function canvas(size = 256): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return [c, c.getContext('2d')!];
}

function noise(ctx: CanvasRenderingContext2D, size: number, alpha: number, dots = 900): void {
  for (let i = 0; i < dots; i++) {
    const x = Math.random() * size, y = Math.random() * size;
    const v = Math.floor(Math.random() * 90);
    ctx.fillStyle = `rgba(${v},${v},${v},${alpha})`;
    ctx.fillRect(x, y, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
}

function finish(c: HTMLCanvasElement, repeat: [number, number]): THREE.Texture {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function tex(key: string, gen: () => THREE.Texture): THREE.Texture {
  let t = cache.get(key);
  if (!t) { t = gen(); cache.set(key, t); }
  return t;
}

/** 防滑甲板钢板 */
export const deckTex = () => tex('deck', () => {
  const [c, ctx] = canvas(256);
  ctx.fillStyle = '#3c4348';
  ctx.fillRect(0, 0, 256, 256);
  // 防滑菱形纹
  ctx.strokeStyle = 'rgba(255,255,255,0.045)';
  ctx.lineWidth = 2;
  for (let y = 8; y < 256; y += 14) {
    for (let x = 8 + ((y / 14) % 2) * 7; x < 256; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x - 3, y + 3); ctx.lineTo(x + 3, y - 3);
      ctx.stroke();
    }
  }
  // 板缝
  ctx.strokeStyle = 'rgba(10,12,14,0.8)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 256; i += 64) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
  }
  // 锈渍与油污
  for (let i = 0; i < 26; i++) {
    const x = Math.random() * 256, y = Math.random() * 256, r = 6 + Math.random() * 22;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const rust = Math.random() < 0.5;
    g.addColorStop(0, rust ? 'rgba(96,62,38,0.20)' : 'rgba(14,16,18,0.22)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  noise(ctx, 256, 0.05);
  return finish(c, [8, 2]);
});

/** 舱室白色漆壁 */
export const cabinTex = () => tex('cabin', () => {
  const [c, ctx] = canvas(256);
  ctx.fillStyle = '#cfd6d4';
  ctx.fillRect(0, 0, 256, 256);
  // 竖向污渍流痕
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * 256;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, 'rgba(120,124,118,0.16)');
    g.addColorStop(1, 'rgba(120,124,118,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, 0, 3 + Math.random() * 8, 256);
  }
  // 拼缝
  ctx.strokeStyle = 'rgba(80,88,86,0.5)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 256; i += 85) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
  }
  // 下缘锈带
  const g2 = ctx.createLinearGradient(0, 200, 0, 256);
  g2.addColorStop(0, 'rgba(110,74,44,0)');
  g2.addColorStop(1, 'rgba(110,74,44,0.35)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 200, 256, 56);
  noise(ctx, 256, 0.04);
  return finish(c, [3, 1]);
});

/** 集装箱波纹侧板：颜色可配置 */
export const containerTex = (base: string, accent: string) => tex('cont:' + base, () => {
  const [c, ctx] = canvas(256);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  // 波纹：竖条明暗
  for (let x = 0; x < 256; x += 32) {
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fillRect(x, 0, 14, 256);
    ctx.fillStyle = 'rgba(0,0,0,0.22)';
    ctx.fillRect(x + 22, 0, 10, 256);
    ctx.fillStyle = 'rgba(0,0,0,0.10)';
    ctx.fillRect(x + 14, 0, 8, 256);
  }
  // 顶底边框梁
  ctx.fillStyle = 'rgba(0,0,0,0.30)';
  ctx.fillRect(0, 0, 256, 12);
  ctx.fillRect(0, 244, 256, 12);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 12, 256, 3);
  ctx.fillRect(0, 241, 256, 3);
  ctx.globalAlpha = 1;
  // 锈蚀斑块
  for (let i = 0; i < 16; i++) {
    const x = Math.random() * 256, y = Math.random() * 256, r = 4 + Math.random() * 18;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(112,64,34,0.4)');
    g.addColorStop(1, 'rgba(112,64,34,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  noise(ctx, 256, 0.05);
  return finish(c, [1.6, 1]);
});

/** 集装箱门端（闭锁杆） */
export const containerDoorTex = (base: string) => tex('contDoor:' + base, () => {
  const [c, ctx] = canvas(256);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  // 两扇门中缝
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(124, 8, 8, 240);
  // 闭锁杆
  for (const x of [34, 74, 182, 222]) {
    ctx.fillStyle = 'rgba(40,42,44,0.9)';
    ctx.fillRect(x, 14, 7, 228);
    ctx.fillStyle = 'rgba(160,166,170,0.8)';
    ctx.fillRect(x + 2, 14, 2, 228);
    for (const y of [30, 120, 214]) {
      ctx.fillStyle = '#2c2e30';
      ctx.fillRect(x - 6, y, 19, 10);
    }
  }
  // 角件
  ctx.fillStyle = '#222527';
  for (const [x, y] of [[4, 4], [228, 4], [4, 236], [228, 236]] as Array<[number, number]>) {
    ctx.fillRect(x, y, 24, 16);
  }
  noise(ctx, 256, 0.06);
  return finish(c, [1, 1]);
});

/** 木箱 */
export const crateTex = () => tex('crate', () => {
  const [c, ctx] = canvas(128);
  ctx.fillStyle = '#9a7b4f';
  ctx.fillRect(0, 0, 128, 128);
  // 横向木板
  for (let i = 0; i < 5; i++) {
    const y = i * 26;
    ctx.fillStyle = i % 2 ? '#93744a' : '#a08153';
    ctx.fillRect(0, y + 1, 128, 24);
    ctx.strokeStyle = 'rgba(60,42,22,0.6)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0.5, y + 1, 127, 24);
    // 木纹
    ctx.strokeStyle = 'rgba(70,50,26,0.25)';
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.moveTo(0, y + 5 + k * 7 + Math.random() * 3);
      ctx.bezierCurveTo(40, y + 5 + k * 7 + Math.random() * 4, 90, y + 5 + k * 7 + Math.random() * 4, 128, y + 5 + k * 7 + Math.random() * 3);
      ctx.stroke();
    }
  }
  // 边框与钉
  ctx.strokeStyle = '#6d532f';
  ctx.lineWidth = 7;
  ctx.strokeRect(3, 3, 122, 122);
  ctx.fillStyle = '#4c3a20';
  for (const [x, y] of [[10, 10], [118, 10], [10, 118], [118, 118]] as Array<[number, number]>) {
    ctx.beginPath(); ctx.arc(x, y, 2.4, 0, 7); ctx.fill();
  }
  noise(ctx, 128, 0.05, 400);
  return finish(c, [1, 1]);
});

/** 绿色篷布货物 */
export const tarpTex = () => tex('tarp', () => {
  const [c, ctx] = canvas(256);
  ctx.fillStyle = '#5a6b46';
  ctx.fillRect(0, 0, 256, 256);
  // 帆布织纹
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 256; i += 4) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
  }
  // 褶皱明暗（斜向）
  for (let i = 0; i < 22; i++) {
    const y = Math.random() * 256;
    const g = ctx.createLinearGradient(0, y, 256, y + 40);
    const dark = Math.random() < 0.5;
    g.addColorStop(0, dark ? 'rgba(20,26,14,0.28)' : 'rgba(190,205,160,0.14)');
    g.addColorStop(0.5, 'rgba(0,0,0,0)');
    g.addColorStop(1, dark ? 'rgba(20,26,14,0.28)' : 'rgba(190,205,160,0.14)');
    ctx.fillStyle = g;
    ctx.save();
    ctx.translate(0, y);
    ctx.rotate((Math.random() - 0.5) * 0.15);
    ctx.fillRect(0, -8, 256, 24);
    ctx.restore();
  }
  noise(ctx, 256, 0.05);
  return finish(c, [2, 1]);
});

/** 通用喷涂金属 */
export const metalTex = (base: string, key: string) => tex('metal:' + key, () => {
  const [c, ctx] = canvas(128);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 128, 128);
  noise(ctx, 128, 0.07, 500);
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * 128, y = Math.random() * 128, r = 4 + Math.random() * 14;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(90,60,34,0.28)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return finish(c, [1, 1]);
});

/** 海面颜色纹理（配合 UV 滚动） */
export const seaTex = () => tex('sea', () => {
  const [c, ctx] = canvas(256);
  ctx.fillStyle = '#17384a';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * 256, y = Math.random() * 256;
    const w = 30 + Math.random() * 90, h = 3 + Math.random() * 9;
    const g = ctx.createLinearGradient(x, y, x + w, y);
    g.addColorStop(0, 'rgba(120,170,190,0)');
    g.addColorStop(0.5, `rgba(150,200,215,${0.10 + Math.random() * 0.14})`);
    g.addColorStop(1, 'rgba(120,170,190,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
  }
  for (let i = 0; i < 24; i++) {
    const x = Math.random() * 256, y = Math.random() * 256, r = 10 + Math.random() * 30;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(10,26,36,0.25)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  return finish(c, [26, 26]);
});
