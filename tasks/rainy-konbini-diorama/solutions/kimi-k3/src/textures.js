// Canvas-drawn textures: signage, posters, magazine covers, price strips.
import * as THREE from 'three';

export function canvasTexture(w, h, draw, opts = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (opts.repeat) { tex.wrapS = tex.wrapT = THREE.RepeatWrapping; }
  return tex;
}

const FONTS = '"Hiragino Sans", "Yu Gothic", "Meiryo", "Noto Sans JP", sans-serif';

// Main store sign: dark teal board, glowing letters.
export function storeSignTexture() {
  return canvasTexture(1024, 224, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0c3f4e'); g.addColorStop(1, '#082c38');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#7fe7ff'; ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    // moon mark
    ctx.fillStyle = '#ffd76a';
    ctx.beginPath(); ctx.arc(96, h / 2, 52, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0c3f4e';
    ctx.beginPath(); ctx.arc(116, h / 2 - 12, 46, 0, Math.PI * 2); ctx.fill();
    ctx.font = `700 104px ${FONTS}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = '#8df3ff'; ctx.shadowBlur = 26;
    ctx.fillStyle = '#f2feff';
    ctx.fillText('月ノ岬コンビニ', w / 2 + 60, h / 2 - 12);
    ctx.shadowBlur = 0;
    ctx.font = `600 34px ${FONTS}`;
    ctx.fillStyle = '#9fdceb';
    ctx.fillText('TSUKINOMISAKI  STORE  ·  24H', w / 2 + 60, h - 42);
  });
}

export function openSignTexture() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#1a1030'; ctx.fillRect(0, 0, w, h);
    ctx.font = `800 72px ${FONTS}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = '#ff9ad5'; ctx.shadowBlur = 22;
    ctx.fillStyle = '#ffd7f0';
    ctx.fillText('OPEN', w / 2, h / 2 + 4);
  });
}

// Interior lightbox strips above the drinks wall.
export function lightboxTexture(text, fg = '#fff8ea', bg1 = '#ffb03a', bg2 = '#ff7a1a') {
  return canvasTexture(512, 128, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, bg1); g.addColorStop(1, bg2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.font = `800 64px ${FONTS}`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255,255,255,.9)'; ctx.shadowBlur = 16;
    ctx.fillStyle = fg;
    ctx.fillText(text, w / 2, h / 2 + 2);
  });
}

export function posterTexture(kind) {
  return canvasTexture(256, 384, (ctx, w, h) => {
    if (kind === 'oden') {
      ctx.fillStyle = '#8c2f1b'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f6e3c2';
      ctx.beginPath(); ctx.ellipse(w / 2, 200, 96, 62, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c98a3d';
      for (const [x, y, r] of [[-46, -8, 26], [10, -20, 22], [52, 4, 24], [-6, 22, 20], [-58, 22, 18]]) {
        ctx.beginPath(); ctx.arc(w / 2 + x, 200 + y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = '#5b3410'; ctx.lineWidth = 6; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = `800 64px ${FONTS}`;
      ctx.textAlign = 'center';
      ctx.fillText('おでん', w / 2, 92);
      ctx.font = `700 40px ${FONTS}`; ctx.fillStyle = '#ffd76a';
      ctx.fillText('熱々 ¥120〜', w / 2, 330);
    } else if (kind === 'coffee') {
      ctx.fillStyle = '#2b1a12'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#e8e0d2';
      ctx.fillRect(w / 2 - 44, 150, 88, 90);
      ctx.beginPath(); ctx.arc(w / 2 + 56, 196, 26, -Math.PI / 2, Math.PI / 2); ctx.lineWidth = 12;
      ctx.strokeStyle = '#e8e0d2'; ctx.stroke();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 5;
      for (const dx of [-18, 0, 18]) {
        ctx.beginPath(); ctx.moveTo(w / 2 + dx, 132);
        ctx.bezierCurveTo(w / 2 + dx - 10, 110, w / 2 + dx + 10, 96, w / 2 + dx, 74); ctx.stroke();
      }
      ctx.fillStyle = '#ffb03a'; ctx.font = `800 56px ${FONTS}`; ctx.textAlign = 'center';
      ctx.fillText('ホット', w / 2, 300);
      ctx.fillText('コーヒー', w / 2, 352);
    } else if (kind === 'festival') {
      ctx.fillStyle = '#10294a'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ffe9a8';
      ctx.beginPath(); ctx.arc(w / 2, 128, 62, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ff7a9e';
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        ctx.beginPath(); ctx.arc(w / 2 + Math.cos(a) * 78, 300 + Math.sin(a) * 46, 12, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#fff'; ctx.font = `800 52px ${FONTS}`; ctx.textAlign = 'center';
      ctx.fillText('月見', w / 2, 220);
      ctx.fillText('フェア', w / 2, 276);
    } else {
      // generic bento ad
      ctx.fillStyle = '#0e5c46'; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f2f2ea'; ctx.fillRect(48, 96, 160, 120);
      ctx.fillStyle = '#e8604c';
      ctx.beginPath(); ctx.arc(128, 156, 40, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = `800 48px ${FONTS}`; ctx.textAlign = 'center';
      ctx.fillText('新発売', w / 2, 66);
      ctx.font = `700 42px ${FONTS}`; ctx.fillStyle = '#ffe9a8';
      ctx.fillText('幕の内弁当', w / 2, 280);
      ctx.fillText('¥480', w / 2, 340);
    }
  });
}

// Magazine covers grid for the magazine rack.
export function magazinesTexture() {
  return canvasTexture(512, 512, (ctx, w, h) => {
    const cols = 4, rows = 4;
    const palettes = [
      ['#e8604c', '#fff'], ['#2f6f8f', '#ffe9a8'], ['#8c4c9c', '#fff'], ['#0e5c46', '#ffd76a'],
      ['#d9a13b', '#2b1a12'], ['#c23a5e', '#fff'], ['#3a4a8c', '#cfe8ff'], ['#777', '#fff'],
    ];
    const titles = ['週刊', '月刊', '漫画', 'グルメ', '旅', 'アイドル', 'ニュース', 'TV'];
    let k = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++, k++) {
      const x = c * (w / cols), y = r * (h / rows), cw = w / cols, ch = h / rows;
      const [bg, fg] = palettes[k % palettes.length];
      ctx.fillStyle = bg; ctx.fillRect(x + 4, y + 4, cw - 8, ch - 8);
      ctx.fillStyle = 'rgba(255,255,255,.25)';
      ctx.fillRect(x + 12, y + ch * 0.45, cw - 24, ch * 0.42);
      ctx.fillStyle = fg; ctx.font = `800 34px ${FONTS}`; ctx.textAlign = 'center';
      ctx.fillText(titles[k % titles.length], x + cw / 2, y + 46);
      ctx.font = '700 20px sans-serif';
      ctx.fillText(`${(k % 9) + 1}月号`, x + cw / 2, y + ch - 18);
    }
  });
}

// Price-strip band on shelves.
export function priceStripTexture() {
  return canvasTexture(512, 64, (ctx, w, h) => {
    ctx.fillStyle = '#f8f4e8'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#c23a3a'; ctx.font = '700 30px sans-serif'; ctx.textAlign = 'center';
    const prices = [120, 158, 210, 98, 180, 240, 130, 168];
    for (let i = 0; i < 8; i++) {
      const x = (i + 0.5) * (w / 8);
      ctx.fillText(`¥${prices[i]}`, x, 42);
      if (i) { ctx.strokeStyle = '#bbb'; ctx.beginPath(); ctx.moveTo(i * (w / 8), 8); ctx.lineTo(i * (w / 8), h - 8); ctx.stroke(); }
    }
  });
}

// Crosswalk / road markings are done with plain materials instead.
// Awning stripes:
export function awningTexture() {
  return canvasTexture(512, 128, (ctx, w, h) => {
    const cols = ['#f3ede0', '#3f8f7a'];
    for (let i = 0; i < 8; i++) { ctx.fillStyle = cols[i % 2]; ctx.fillRect(i * (w / 8), 0, w / 8, h); }
  }, { repeat: true });
}

// Tissue-pack style freebie on the counter, store flyer, etc.
export function flyerTexture() {
  return canvasTexture(256, 128, (ctx, w, h) => {
    ctx.fillStyle = '#ffd76a'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#8c2f1b'; ctx.font = `800 40px ${FONTS}`; ctx.textAlign = 'center';
    ctx.fillText('ティッシュ', w / 2, 58);
    ctx.font = '600 24px sans-serif'; ctx.fillStyle = '#333';
    ctx.fillText('無料配布中', w / 2, 96);
  });
}

// Vending machine front: glowing drink window.
export function vendingTexture() {
  return canvasTexture(256, 384, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#d84040'); g.addColorStop(1, '#a82828');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // display window
    ctx.fillStyle = '#fdf6e0'; ctx.fillRect(16, 20, w - 32, 170);
    const cols = ['#e8604c', '#3a6fc2', '#3f8f4f', '#d9a13b', '#8c4c9c', '#40b8b0'];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
      ctx.fillStyle = cols[(r * 6 + c) % cols.length];
      ctx.fillRect(24 + c * 36, 32 + r * 54, 26, 42);
      ctx.fillStyle = 'rgba(255,255,255,.55)';
      ctx.fillRect(24 + c * 36, 32 + r * 54, 26, 10);
    }
    ctx.fillStyle = '#222'; ctx.fillRect(16, 210, w - 32, 46);
    ctx.fillStyle = '#ffd76a'; ctx.font = '700 28px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('つめた〜い', w / 2, 243);
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(16, 268, w - 32, 96);
    ctx.fillStyle = '#333'; ctx.fillRect(26, 278, w - 52, 76);
  });
}
