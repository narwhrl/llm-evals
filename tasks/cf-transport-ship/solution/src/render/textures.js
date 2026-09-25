import * as THREE from "three";

function canvasTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  draw(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function noise(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function detailTexture(kind) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const image = ctx.createImageData(w, h);
    const data = image.data;
    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        let v = 188;
        if (kind === "ridge") v += Math.sin(x * 0.62) * 22 + Math.sin(y * 0.17) * 6;
        else if (kind === "wood") v += Math.sin(y * 0.55) * 16 + noise(x * 0.2, Math.floor(y / 18)) * 18 - 8;
        else if (kind === "metal") v += noise(x, y) * 28 - 16 + (x % 32 === 0 || y % 32 === 0 ? -18 : 0);
        else v += noise(x * 0.5, y * 0.5) * 22 - 10;
        if (noise(x * 0.15, y * 0.15) > 0.92) v -= 36;
        const i = (y * w + x) * 4;
        const c = Math.max(0, Math.min(255, v));
        data[i] = c;
        data[i + 1] = c;
        data[i + 2] = c;
        data[i + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
  });
}

export function deckTexture() {
  return canvasTexture(512, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#5a635d";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 1800; i += 1) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const g = 78 + Math.random() * 36;
      ctx.fillStyle = `rgba(${g},${g + 4},${g - 2},0.35)`;
      ctx.fillRect(x, y, 2 + Math.random() * 5, 1 + Math.random() * 2);
    }
    ctx.strokeStyle = "rgba(28,32,30,0.45)";
    ctx.lineWidth = 2;
    for (let x = 0; x <= w; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(214, 206, 184, 0.55)";
    ctx.lineWidth = 3;
    ctx.setLineDash([18, 16]);
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.18);
    ctx.lineTo(w * 0.5, h * 0.82);
    ctx.stroke();
    ctx.setLineDash([]);
    const paintHatch = (x, z) => {
      const px = ((x + 9) / 18) * w;
      const py = ((z + 32) / 64) * h;
      ctx.save();
      ctx.translate(px, py);
      ctx.strokeStyle = "#c6a15a";
      ctx.lineWidth = 4;
      ctx.strokeRect(-22, -34, 44, 68);
      ctx.fillStyle = "#1b2428";
      ctx.fillRect(-16, -26, 32, 52);
      ctx.restore();
    };
    paintHatch(5.15, -13.35);
    paintHatch(5.15, 12.85);
    ctx.fillStyle = "rgba(92, 58, 36, 0.28)";
    for (let i = 0; i < 30; i += 1) {
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, 10 + Math.random() * 24, 6 + Math.random() * 10, Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function textTexture(lines, options = {}) {
  const width = options.width || 512;
  const height = options.height || 128;
  return canvasTexture(width, height, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = options.background || "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = options.color || "#efe6d4";
    ctx.font = options.font || "64px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    lines.forEach((line, index) => {
      ctx.fillText(line, w / 2, h / 2 + (index - (lines.length - 1) / 2) * (options.leading || 36));
    });
  });
}

export function softTexture(inner, outer) {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

export function flagTexture(primary, mark) {
  return canvasTexture(256, 160, (ctx, w, h) => {
    ctx.fillStyle = primary;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = mark;
    ctx.beginPath();
    ctx.moveTo(18, 18);
    ctx.lineTo(w * 0.48, h * 0.5);
    ctx.lineTo(18, h - 18);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, w - 6, h - 6);
  });
}
