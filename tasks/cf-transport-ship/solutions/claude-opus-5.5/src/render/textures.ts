// 程序生成的画布纹理：全部在本地运行时绘制，不依赖外部图片。
import * as THREE from "three";
import { Rng } from "../core/rng";

type Draw = (g: CanvasRenderingContext2D, w: number, h: number, r: Rng) => void;

function canvas(w: number, h: number, seed: number, draw: Draw): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d")!;
  draw(g, w, h, new Rng(seed));
  return c;
}

function tex(c: HTMLCanvasElement, color = true, repeat = true): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}

function speckle(g: CanvasRenderingContext2D, w: number, h: number, r: Rng, n: number, color: string, maxR: number, alpha: number): void {
  g.fillStyle = color;
  for (let i = 0; i < n; i++) {
    g.globalAlpha = alpha * r.range(0.3, 1);
    g.beginPath();
    g.arc(r.range(0, w), r.range(0, h), r.range(0.3, maxR), 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
}

function streaks(g: CanvasRenderingContext2D, w: number, h: number, r: Rng, n: number, color: string, alpha: number, fromTop = true): void {
  for (let i = 0; i < n; i++) {
    const x = r.range(0, w), len = r.range(h * 0.15, h * 0.7), wd = r.range(1, 5);
    const y0 = fromTop ? r.range(0, h * 0.12) : h - len;
    const grad = g.createLinearGradient(0, y0, 0, y0 + len);
    grad.addColorStop(0, color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.globalAlpha = alpha * r.range(0.4, 1);
    g.fillStyle = grad;
    g.fillRect(x, y0, wd, len);
  }
  g.globalAlpha = 1;
}

export const CONTAINER_COLORS: Record<string, string> = {
  blue: "#2d5f8a", rust: "#8a4430", green: "#4f6a45", red: "#8e3a33", grey: "#7c8588", orange: "#b0642c", white: "#b9b8ae",
};

/** 集装箱侧板：波纹、上下梁、锈迹与编号（编号为虚构） */
export function containerSide(color: string, seed: number): THREE.CanvasTexture {
  return tex(canvas(512, 256, seed, (g, w, h, r) => {
    g.fillStyle = color;
    g.fillRect(0, 0, w, h);
    for (let x = 0; x < w; x += 16) {
      g.fillStyle = "rgba(255,255,255,0.10)"; g.fillRect(x, 0, 5, h);
      g.fillStyle = "rgba(0,0,0,0.20)"; g.fillRect(x + 9, 0, 5, h);
    }
    g.fillStyle = "rgba(0,0,0,0.35)"; g.fillRect(0, 0, w, 10); g.fillRect(0, h - 12, w, 12);
    streaks(g, w, h, r, 26, "rgba(92,48,22,0.9)", 0.45);
    const dirt = g.createLinearGradient(0, h * 0.6, 0, h);
    dirt.addColorStop(0, "rgba(40,30,20,0)"); dirt.addColorStop(1, "rgba(40,30,20,0.45)");
    g.fillStyle = dirt; g.fillRect(0, 0, w, h);
    speckle(g, w, h, r, 260, "#5a3a24", 2.2, 0.5);
    speckle(g, w, h, r, 120, "#ddd", 1.2, 0.25);
    g.font = "bold 22px monospace";
    g.fillStyle = "rgba(240,240,230,0.82)";
    const code = ["TSKU", "HMCU", "OCLU", "NRWU"][r.int(0, 3)] + " " + r.int(100000, 999999) + " " + r.int(0, 9);
    g.fillText(code, w - 250, 42);
    g.font = "bold 14px monospace";
    g.fillText("MAX GROSS 30480 KG", w - 250, 62);
  }));
}

/** 集装箱端门：门板、锁杆、铰链 */
export function containerDoor(color: string, seed: number): THREE.CanvasTexture {
  return tex(canvas(256, 256, seed, (g, w, h, r) => {
    g.fillStyle = color; g.fillRect(0, 0, w, h);
    for (let y = 18; y < h - 18; y += 22) {
      g.fillStyle = "rgba(255,255,255,0.08)"; g.fillRect(8, y, w - 16, 6);
      g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(8, y + 10, w - 16, 5);
    }
    g.fillStyle = "rgba(0,0,0,0.5)"; g.fillRect(w / 2 - 2, 0, 4, h);
    g.strokeStyle = "rgba(0,0,0,0.5)"; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8);
    for (const x of [36, 92, 164, 220]) {
      g.fillStyle = "#3b3b38"; g.fillRect(x - 4, 10, 8, h - 20);
      g.fillStyle = "#56544e"; g.fillRect(x - 9, h * 0.55, 18, 26);
    }
    for (const y of [30, 110, 190]) { g.fillStyle = "#2c2c2a"; g.fillRect(0, y, 12, 20); g.fillRect(w - 12, y, 12, 20); }
    streaks(g, w, h, r, 14, "rgba(92,48,22,0.9)", 0.4);
    speckle(g, w, h, r, 120, "#5a3a24", 2, 0.5);
  }), false);
}

/** 波纹高度图（凹凸），所有集装箱共用 */
export function corrugationBump(): THREE.CanvasTexture {
  return tex(canvas(512, 32, 1, (g, w, h) => {
    for (let x = 0; x < w; x++) {
      const v = 0.5 + 0.5 * Math.sin((x / 16) * Math.PI * 2);
      const c = Math.round(60 + v * 180);
      g.fillStyle = `rgb(${c},${c},${c})`;
      g.fillRect(x, 0, 1, h);
    }
  }), false);
}

export function woodPlanks(seed: number, base = "#a88455"): THREE.CanvasTexture {
  return tex(canvas(256, 256, seed, (g, w, h, r) => {
    const planks = 5, ph = h / planks;
    for (let i = 0; i < planks; i++) {
      const l = r.range(-14, 14);
      g.fillStyle = shade(base, l);
      g.fillRect(0, i * ph, w, ph);
      for (let k = 0; k < 18; k++) {
        g.strokeStyle = `rgba(60,38,16,${r.range(0.08, 0.25)})`;
        g.lineWidth = r.range(0.6, 1.8);
        g.beginPath();
        const y = i * ph + r.range(2, ph - 2);
        g.moveTo(0, y);
        for (let x = 0; x <= w; x += 32) g.lineTo(x, y + Math.sin(x * 0.03 + k) * r.range(0.5, 2.5));
        g.stroke();
      }
      if (r.chance(0.5)) {
        g.fillStyle = "rgba(70,40,15,0.45)";
        g.beginPath(); g.ellipse(r.range(20, w - 20), i * ph + ph / 2, 7, 4, 0, 0, Math.PI * 2); g.fill();
      }
      g.fillStyle = "rgba(30,18,6,0.7)"; g.fillRect(0, i * ph, w, 2);
      for (const x of [14, w - 14]) { g.fillStyle = "#3a3a36"; g.fillRect(x - 2, i * ph + ph / 2 - 2, 4, 4); }
    }
    speckle(g, w, h, r, 90, "#4a3018", 1.8, 0.35);
    g.fillStyle = "rgba(20,12,4,0.55)";
    g.font = "bold 20px sans-serif";
    if (r.chance(0.6)) g.fillText("FRAGILE ↑", 70, 140);
  }));
}

export function tarp(seed: number): THREE.CanvasTexture {
  return tex(canvas(512, 256, seed, (g, w, h, r) => {
    g.fillStyle = "#56643a"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) {
      const y = r.range(0, h), a = r.range(0.05, 0.16);
      const grd = g.createLinearGradient(0, y - 10, 0, y + 10);
      grd.addColorStop(0, "rgba(0,0,0,0)"); grd.addColorStop(0.5, `rgba(20,24,10,${a})`); grd.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = grd;
      g.save(); g.translate(0, y); g.rotate(r.range(-0.08, 0.08)); g.fillRect(0, -10, w, 20); g.restore();
    }
    for (let i = 0; i < 40; i++) {
      g.fillStyle = `rgba(180,190,130,${r.range(0.03, 0.08)})`;
      g.fillRect(r.range(0, w), r.range(0, h), r.range(20, 120), r.range(2, 6));
    }
    speckle(g, w, h, r, 200, "#2d3420", 1.5, 0.4);
    g.strokeStyle = "rgba(210,210,190,0.35)"; g.lineWidth = 2; g.setLineDash([6, 5]);
    g.strokeRect(10, 10, w - 20, h - 20); g.setLineDash([]);
  }));
}

export function deckPlate(seed: number, base = "#5f6264"): THREE.CanvasTexture {
  return tex(canvas(256, 256, seed, (g, w, h, r) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16)
      for (let x = (y / 16) % 2 ? 8 : 0; x < w; x += 16) {
        g.save(); g.translate(x + 4, y + 8); g.rotate(((y / 16) % 2 ? 1 : -1) * 0.7);
        g.fillStyle = "rgba(255,255,255,0.13)"; g.fillRect(-5, -1.3, 10, 2.6);
        g.fillStyle = "rgba(0,0,0,0.25)"; g.fillRect(-5, 1.3, 10, 1.2);
        g.restore();
      }
    g.fillStyle = "rgba(20,20,20,0.6)"; g.fillRect(0, 0, w, 2); g.fillRect(0, 0, 2, h);
    for (let i = 0; i < 7; i++) {
      g.fillStyle = `rgba(110,60,30,${r.range(0.08, 0.2)})`;
      g.beginPath(); g.ellipse(r.range(0, w), r.range(0, h), r.range(8, 28), r.range(5, 16), r.range(0, 3), 0, Math.PI * 2); g.fill();
    }
    speckle(g, w, h, r, 220, "#2e2f30", 1.4, 0.45);
  }));
}

export function cabinWall(seed: number): THREE.CanvasTexture {
  return tex(canvas(256, 256, seed, (g, w, h, r) => {
    g.fillStyle = "#cfcdc3"; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, 0, w, 3); g.fillRect(0, 0, 3, h); g.fillRect(w / 2, 0, 2, h);
    for (let y = 12; y < h; y += 42) for (let x = 10; x < w; x += 42) { g.fillStyle = "rgba(70,70,64,0.55)"; g.beginPath(); g.arc(x, y, 1.8, 0, 7); g.fill(); }
    streaks(g, w, h, r, 16, "rgba(120,70,30,0.9)", 0.3);
    const grime = g.createLinearGradient(0, h * 0.55, 0, h);
    grime.addColorStop(0, "rgba(60,55,45,0)"); grime.addColorStop(1, "rgba(60,55,45,0.35)");
    g.fillStyle = grime; g.fillRect(0, 0, w, h);
    speckle(g, w, h, r, 140, "#8b8a80", 1.6, 0.35);
  }));
}

export function hullSide(seed: number): THREE.CanvasTexture {
  return tex(canvas(256, 128, seed, (g, w, h, r) => {
    g.fillStyle = "#3a3d40"; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(0,0,0,0.3)"; g.fillRect(0, 0, w, 3);
    for (let x = 0; x < w; x += 64) g.fillRect(x, 0, 2, h);
    streaks(g, w, h, r, 20, "rgba(110,55,25,0.9)", 0.5);
    speckle(g, w, h, r, 120, "#222", 1.5, 0.5);
  }));
}

export function railMetal(): THREE.CanvasTexture {
  return tex(canvas(64, 64, 9, (g, w, h, r) => {
    g.fillStyle = "#c9a227"; g.fillRect(0, 0, w, h);
    speckle(g, w, h, r, 60, "#6b4a1a", 1.4, 0.6);
  }));
}

function shade(hex: string, d: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number) => Math.max(0, Math.min(255, v + d));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 255)},${c(n & 255)})`;
}
