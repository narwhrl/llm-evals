import * as THREE from 'three';

// Seeded rand so the diorama is identical on every load.
export function rng(seed = 7) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  return t;
}

function grain(g, w, h, rand, n, alpha, dark = true) {
  for (let i = 0; i < n; i++) {
    const v = Math.floor(rand() * 60);
    g.fillStyle = dark
      ? `rgba(${10 + v},${12 + v},${16 + v},${alpha})`
      : `rgba(${180 + v},${180 + v},${175 + v},${alpha})`;
    g.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 3);
  }
}

function rustStreaks(g, w, h, rand, n, x0 = 0, x1 = 1) {
  for (let i = 0; i < n; i++) {
    const x = w * (x0 + rand() * (x1 - x0));
    const len = 20 + rand() * 90;
    const gr = g.createLinearGradient(0, 0, 0, len);
    gr.addColorStop(0, 'rgba(122,66,32,0.55)');
    gr.addColorStop(1, 'rgba(122,66,32,0)');
    g.fillStyle = gr;
    g.save();
    g.translate(x, rand() * h * 0.4);
    g.fillRect(-1 - rand() * 2, 0, 2 + rand() * 4, len);
    g.restore();
  }
}

export function asphaltTex() {
  const rand = rng(11);
  return canvasTex(512, 512, (g, w, h) => {
    g.fillStyle = '#23262c';
    g.fillRect(0, 0, w, h);
    grain(g, w, h, rand, 2600, 0.5);
    // patches / cracks
    g.strokeStyle = 'rgba(12,13,16,0.8)';
    for (let i = 0; i < 7; i++) {
      g.lineWidth = 1 + rand() * 2;
      g.beginPath();
      let x = rand() * w, y = rand() * h;
      g.moveTo(x, y);
      for (let k = 0; k < 5; k++) {
        x += (rand() - 0.5) * 120;
        y += (rand() - 0.5) * 120;
        g.lineTo(x, y);
      }
      g.stroke();
    }
    // wet sheen blotches
    for (let i = 0; i < 26; i++) {
      const r = 20 + rand() * 70;
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, r);
      gr.addColorStop(0, 'rgba(70,90,120,0.16)');
      gr.addColorStop(1, 'rgba(70,90,120,0)');
      g.save();
      g.translate(rand() * w, rand() * h);
      g.fillStyle = gr;
      g.fillRect(-r, -r, r * 2, r * 2);
      g.restore();
    }
    // faded lane paint
    g.fillStyle = 'rgba(200,190,150,0.28)';
    for (let i = 0; i < 6; i++) g.fillRect(40 + i * 80, 240, 44, 8);
  }, [6, 6]);
}

export function concreteTex(base = '#5b5e63') {
  const rand = rng(23);
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = base;
    g.fillRect(0, 0, w, h);
    grain(g, w, h, rand, 1500, 0.35);
    grain(g, w, h, rand, 500, 0.2, false);
    for (let i = 0; i < 12; i++) {
      const r = 15 + rand() * 50;
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, r);
      gr.addColorStop(0, 'rgba(20,22,26,0.22)');
      gr.addColorStop(1, 'rgba(20,22,26,0)');
      g.save();
      g.translate(rand() * w, rand() * h);
      g.fillStyle = gr;
      g.fillRect(-r, -r, r * 2, r * 2);
      g.restore();
    }
  }, [4, 4]);
}

export function corrugatedTex(color = '#6e7680') {
  const rand = rng(31);
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = color;
    g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 16) {
      const gr = g.createLinearGradient(x, 0, x + 16, 0);
      gr.addColorStop(0, 'rgba(0,0,0,0.35)');
      gr.addColorStop(0.5, 'rgba(255,255,255,0.14)');
      gr.addColorStop(1, 'rgba(0,0,0,0.35)');
      g.fillStyle = gr;
      g.fillRect(x, 0, 16, h);
    }
    rustStreaks(g, w, h, rand, 26);
    grain(g, w, h, rand, 500, 0.3);
  }, [2, 1]);
}

export function woodTex() {
  const rand = rng(47);
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#8a6b42';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 32) {
      g.fillStyle = `rgba(60,40,20,${0.15 + rand() * 0.2})`;
      g.fillRect(0, y, w, 3);
      for (let i = 0; i < 30; i++) {
        g.strokeStyle = `rgba(70,48,24,${0.2 + rand() * 0.3})`;
        g.lineWidth = 1;
        const yy = y + 4 + rand() * 26;
        g.beginPath();
        g.moveTo(0, yy);
        g.bezierCurveTo(w * 0.3, yy + rand() * 4 - 2, w * 0.6, yy + rand() * 4 - 2, w, yy);
        g.stroke();
      }
    }
    // stencil marking
    g.fillStyle = 'rgba(30,30,34,0.65)';
    g.font = 'bold 34px monospace';
    g.fillText('7.62', 60, 140);
    g.font = 'bold 22px monospace';
    g.fillText('LOT-88', 70, 170);
  }, [1, 1]);
}

export function containerTex(color, code) {
  const rand = rng(code.length * 97 + 5);
  return canvasTex(512, 128, (g, w, h) => {
    g.fillStyle = color;
    g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 32) {
      const gr = g.createLinearGradient(x, 0, x + 32, 0);
      gr.addColorStop(0, 'rgba(0,0,0,0.3)');
      gr.addColorStop(0.5, 'rgba(255,255,255,0.08)');
      gr.addColorStop(1, 'rgba(0,0,0,0.3)');
      g.fillStyle = gr;
      g.fillRect(x, 0, 32, h);
    }
    rustStreaks(g, w, h, rand, 30);
    g.fillStyle = 'rgba(235,235,230,0.8)';
    g.font = 'bold 30px monospace';
    g.fillText(code, 30, 52);
    g.font = '20px monospace';
    g.fillText('MAX 30480 KG', 30, 82);
    g.fillText('RAIN FREIGHT LINES', 30, 106);
    // faded tag
    g.save();
    g.translate(400, 70);
    g.rotate(-0.15);
    g.strokeStyle = 'rgba(240,240,240,0.5)';
    g.lineWidth = 3;
    g.strokeRect(-52, -26, 104, 52);
    g.fillStyle = 'rgba(240,240,240,0.55)';
    g.font = 'bold 26px sans-serif';
    g.fillText('T-4', -26, 8);
    g.restore();
  }, [1, 1]);
}

export function bombsiteTex(letter) {
  return canvasTex(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(232,232,228,0.85)';
    g.lineWidth = 10;
    g.setLineDash([26, 16]);
    g.strokeRect(28, 28, w - 56, h - 56);
    g.setLineDash([]);
    g.fillStyle = 'rgba(232,232,228,0.9)';
    g.font = `bold 120px sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(letter, w / 2, h / 2 + 6);
    // wear
    g.globalCompositeOperation = 'destination-out';
    const rand = rng(letter === 'A' ? 3 : 9);
    for (let i = 0; i < 700; i++) {
      g.fillStyle = 'rgba(0,0,0,0.5)';
      g.fillRect(rand() * w, rand() * h, 2, 2);
    }
    g.globalCompositeOperation = 'source-over';
  });
}

export function graffitiTex(kind) {
  return canvasTex(256, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const rand = rng(kind * 131 + 17);
    if (kind === 0) {
      g.fillStyle = 'rgba(200,60,50,0.75)';
      g.font = 'bold italic 64px sans-serif';
      g.fillText('RUSH B!', 18, 80);
    } else if (kind === 1) {
      g.strokeStyle = 'rgba(90,200,230,0.7)';
      g.lineWidth = 5;
      g.beginPath();
      g.arc(70, 64, 40, 0, Math.PI * 2);
      g.stroke();
      g.fillStyle = 'rgba(90,200,230,0.7)';
      g.font = 'bold 44px sans-serif';
      g.fillText('CT', 130, 80);
    } else if (kind === 2) {
      g.fillStyle = 'rgba(220,200,90,0.7)';
      g.font = 'bold 40px sans-serif';
      g.fillText('MID OR', 20, 56);
      g.fillText('FEED', 20, 100);
    } else {
      g.fillStyle = 'rgba(210,210,210,0.6)';
      for (let i = 0; i < 5; i++) {
        g.fillRect(20, 24 + i * 16, 120 + rand() * 90, 5);
      }
    }
  });
}

export function bulletTex() {
  return canvasTex(128, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const rand = rng(77);
    for (let i = 0; i < 9; i++) {
      const x = 20 + rand() * (w - 40);
      const y = 20 + rand() * (h - 40);
      const r = 3 + rand() * 3;
      g.fillStyle = 'rgba(8,8,10,0.95)';
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = 'rgba(150,150,155,0.5)';
      g.lineWidth = 1.5;
      g.beginPath();
      g.arc(x, y, r + 2.5, 0, Math.PI * 2);
      g.stroke();
      g.strokeStyle = 'rgba(8,8,10,0.6)';
      for (let k = 0; k < 3; k++) {
        const a = rand() * Math.PI * 2;
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x + Math.cos(a) * (r + 9), y + Math.sin(a) * (r + 9));
        g.stroke();
      }
    }
  });
}

export function signTex(lines, bg = '#3d4a3a', fg = '#d8d4c0') {
  return canvasTex(256, 128, (g, w, h) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(20,20,20,0.8)';
    g.lineWidth = 10;
    g.strokeRect(5, 5, w - 10, h - 10);
    g.fillStyle = fg;
    g.textAlign = 'center';
    lines.forEach((ln, i) => {
      g.font = `${i === 0 ? 'bold 34px' : '24px'} sans-serif`;
      g.fillText(ln, w / 2, 52 + i * 36);
    });
    const rand = rng(lines.join('').length * 13 + 1);
    rustStreaks(g, w, h, rand, 10);
  });
}

export function policeTex() {
  return canvasTex(256, 128, (g, w, h) => {
    g.fillStyle = '#1d2f52';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#dfe6f2';
    g.font = 'bold 44px sans-serif';
    g.textAlign = 'center';
    g.fillText('POLICE', w / 2, 58);
    g.font = '22px sans-serif';
    g.fillText('封锁线 · 禁止通行', w / 2, 94);
    // shield
    g.strokeStyle = '#dfe6f2';
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(34, 30);
    g.lineTo(58, 30);
    g.lineTo(58, 58);
    g.quadraticCurveTo(58, 78, 46, 88);
    g.quadraticCurveTo(34, 78, 34, 58);
    g.closePath();
    g.stroke();
  }, [1, 1]);
}

export function emblemTex() {
  return canvasTex(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = 'rgba(215,225,240,0.75)';
    g.lineWidth = 8;
    g.beginPath();
    g.moveTo(128, 30);
    g.lineTo(200, 60);
    g.lineTo(200, 140);
    g.quadraticCurveTo(200, 195, 128, 225);
    g.quadraticCurveTo(56, 195, 56, 140);
    g.lineTo(56, 60);
    g.closePath();
    g.stroke();
    g.fillStyle = 'rgba(215,225,240,0.75)';
    g.font = 'bold 72px sans-serif';
    g.textAlign = 'center';
    g.fillText('CT', 128, 150);
  });
}

export function rosterTex() {
  return canvasTex(256, 256, (g, w, h) => {
    g.fillStyle = '#b9b2a0';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#2a2a2a';
    g.font = 'bold 22px sans-serif';
    g.textAlign = 'center';
    g.fillText('值班表 DUTY', w / 2, 32);
    g.strokeStyle = '#2a2a2a';
    g.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      g.beginPath();
      g.moveTo(16, 48 + i * 34);
      g.lineTo(w - 16, 48 + i * 34);
      g.stroke();
    }
    g.font = '16px monospace';
    g.fillText('22:00  B POST  ×2', w / 2, 72);
    g.fillText('23:30  MID  ×1', w / 2, 106);
    g.fillText('01:00  A  ×2', w / 2, 140);
  });
}

export function grateTex() {
  return canvasTex(128, 256, (g, w, h) => {
    g.fillStyle = '#15171b';
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#4a4e55';
    for (let y = 8; y < h; y += 24) g.fillRect(6, y, w - 12, 8);
    const rand = rng(55);
    rustStreaks(g, w, h, rand, 12);
  }, [1, 4]);
}

export function streakTex() {
  // vertical light streak for fake wet-ground reflections
  return canvasTex(64, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, 'rgba(255,255,255,0.55)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr;
    g.fillRect(w * 0.3, 0, w * 0.4, h);
  });
}

export function glowTex() {
  return canvasTex(128, 128, (g, w, h) => {
    const gr = g.createRadialGradient(64, 64, 2, 64, 64, 62);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.35, 'rgba(255,255,255,0.35)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
  });
}

export function smokeTex() {
  const rand = rng(91);
  return canvasTex(128, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    for (let i = 0; i < 14; i++) {
      const x = 30 + rand() * 68;
      const y = 30 + rand() * 68;
      const r = 12 + rand() * 22;
      const gr = g.createRadialGradient(x, y, 0, x, y, r);
      gr.addColorStop(0, 'rgba(200,210,225,0.20)');
      gr.addColorStop(1, 'rgba(200,210,225,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, w, h);
    }
  });
}

export function rainTex() {
  return canvasTex(32, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, 'rgba(170,200,240,0)');
    gr.addColorStop(0.5, 'rgba(170,200,240,0.8)');
    gr.addColorStop(1, 'rgba(170,200,240,0)');
    g.fillStyle = gr;
    g.fillRect(13, 0, 6, h);
  });
}
