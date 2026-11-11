import * as THREE from "three";
import { mulberry32 } from "./textures.js";

const roundedRect = (ctx, x, y, width, height, radius) => {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
};

const starSeed = (count, seed) => {
  const random = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    size: 0.35 + random() * 1.3,
    speed: 0.008 + random() * 0.035,
    alpha: 0.18 + random() * 0.75,
  }));
};

const drawStars = (ctx, width, height, stars, time, color = "#d9f2ff") => {
  for (const star of stars) {
    const y = ((star.y + time * star.speed) % 1) * height;
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = color;
    const size = Math.max(1, star.size * Math.min(width, height) * 0.0025);
    ctx.fillRect(star.x * width, y, size, size);
  }
  ctx.globalAlpha = 1;
};

const text = (ctx, value, x, y, size, color, weight = 400, align = "left", family = "mono") => {
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.font =
    family === "serif"
      ? `${weight} ${size}px "Songti SC", "STSong", "Noto Serif CJK SC", serif`
      : family === "sans"
        ? `${weight} ${size}px "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif`
        : `${weight} ${size}px "SFMono-Regular", "Cascadia Mono", Consolas, monospace`;
  ctx.fillText(value, x, y);
};

const glow = (ctx, x, y, radius, inner, outer = "rgba(0,0,0,0)") => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
};

const drawShip = (ctx, x, y, size, color, pixel = false) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  if (pixel) {
    const unit = size / 8;
    ctx.fillRect(-unit, 0, unit * 2, unit * 5);
    ctx.fillRect(-unit * 3, unit * 2, unit * 6, unit * 2);
    ctx.fillRect(-unit * 5, unit * 3, unit * 2, unit);
    ctx.fillRect(unit * 3, unit * 3, unit * 2, unit);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillRect(-unit * 0.5, -unit * 2, unit, unit * 2);
  } else {
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.9);
    ctx.lineTo(size * 0.48, size * 0.62);
    ctx.lineTo(0, size * 0.32);
    ctx.lineTo(-size * 0.48, size * 0.62);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.68)";
    ctx.fillRect(-size * 0.08, -size * 0.55, size * 0.16, size * 0.45);
  }
  ctx.restore();
};

class MonitorPainter {
  constructor(era) {
    this.era = era;
    this.year = era.year;
    this.width = 1024;
    this.height = yearAspect(era.year) === "4:3" ? 768 : yearAspect(era.year) === "21:9" ? 432 : 576;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.anisotropy = 8;
    this.stars = starSeed(100, 1200 + era.year);
    this.lastDraw = -1000;
    this.draw(0);
  }

  update(now) {
    if (now - this.lastDraw < 105) return;
    this.lastDraw = now;
    this.draw(now / 1000);
    this.texture.needsUpdate = true;
  }

  draw(time) {
    const { ctx, width: w, height: h, year } = this;
    ctx.clearRect(0, 0, w, h);
    if (year === 2005) this.draw2005(time);
    else if (year === 2010) this.draw2010(time);
    else if (year === 2015) this.draw2015(time);
    else if (year === 2020) this.draw2020(time);
    else this.draw2025(time);
  }

  draw2005(time) {
    const { ctx, width: w, height: h } = this;
    const sky = ctx.createRadialGradient(w * 0.48, h * 0.42, 0, w * 0.48, h * 0.42, w * 0.7);
    sky.addColorStop(0, "#5ba098");
    sky.addColorStop(1, "#195654");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    drawStars(ctx, w, h, this.stars, time, "#b8ffe9");

    const iconY = h * 0.1;
    [
      ["我的电脑", "▣"],
      ["星港：远征", "✦"],
      ["作业", "▤"],
    ].forEach(([label, glyph], i) => {
      const x = w * 0.045;
      const y = iconY + i * h * 0.12;
      ctx.fillStyle = "rgba(255,255,255,0.68)";
      ctx.fillRect(x, y, w * 0.038, w * 0.038);
      text(ctx, glyph, x + w * 0.019, y + w * 0.028, h * 0.033, "#215c58", 600, "center", "sans");
      text(ctx, label, x + w * 0.02, y + w * 0.057, h * 0.016, "rgba(255,255,255,0.78)", 400, "center", "sans");
    });

    const box = { x: w * 0.22, y: h * 0.09, width: w * 0.74, height: h * 0.77 };
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#b8b7a9";
    ctx.fillRect(box.x, box.y, box.width, box.height);
    ctx.restore();
    const titleGradient = ctx.createLinearGradient(box.x, box.y, box.x, box.y + h * 0.065);
    titleGradient.addColorStop(0, "#427bd8");
    titleGradient.addColorStop(1, "#1d499f");
    ctx.fillStyle = titleGradient;
    ctx.fillRect(box.x + 4, box.y + 4, box.width - 8, h * 0.058);
    text(ctx, "星港：远征  -  1024 × 768", box.x + w * 0.018, box.y + h * 0.038, h * 0.021, "white", 600, "left", "sans");
    ["—", "□", "×"].forEach((symbol, i) => {
      const x = box.x + box.width - w * 0.045 + i * w * 0.022;
      ctx.fillStyle = "#ece6d4";
      ctx.fillRect(x, box.y + h * 0.012, w * 0.017, h * 0.023);
      text(ctx, symbol, x + w * 0.0085, box.y + h * 0.03, h * 0.017, "#203b67", 600, "center", "sans");
    });
    const gameY = box.y + h * 0.065;
    const gameH = box.height - h * 0.09;
    const gameGradient = ctx.createRadialGradient(box.x + box.width * 0.5, gameY + gameH * 0.4, 0, box.x + box.width * 0.5, gameY + gameH * 0.4, box.width * 0.58);
    gameGradient.addColorStop(0, "#12293e");
    gameGradient.addColorStop(1, "#040b12");
    ctx.fillStyle = gameGradient;
    ctx.fillRect(box.x + 4, gameY, box.width - 8, gameH);
    drawStars(ctx, box.width - 8, gameH, this.stars, time, "#8fc7e6");
    for (let i = 0; i < 5; i += 1) {
      const px = box.x + 50 + ((i * 143 + time * 24) % (box.width - 130));
      const py = gameY + 35 + ((i * 97 + time * 11) % (gameH - 120));
      ctx.fillStyle = i % 2 ? "#a18965" : "#61778b";
      ctx.fillRect(px, py, 18 + i * 3, 11 + i * 2);
    }
    drawShip(ctx, box.x + box.width * 0.52, gameY + gameH * 0.8, h * 0.036, "#dff7ff", true);
    text(ctx, "得分 1280", box.x + w * 0.03, gameY + h * 0.04, h * 0.018, "#d5e7ec", 600);
    text(ctx, "护盾", box.x + w * 0.03, gameY + h * 0.065, h * 0.014, "#93b5c2", 400);
    ctx.fillStyle = "rgba(69,104,118,0.8)";
    ctx.fillRect(box.x + w * 0.03, gameY + h * 0.076, w * 0.18, h * 0.011);
    ctx.fillStyle = "#8ae2b3";
    ctx.fillRect(box.x + w * 0.03, gameY + h * 0.076, w * 0.13, h * 0.011);
    text(ctx, "按 空格 发射", box.x + box.width - w * 0.03, gameY + gameH - h * 0.022, h * 0.014, "rgba(217,242,255,0.55)", 400, "right");

    const taskbarY = h - h * 0.072;
    const taskbar = ctx.createLinearGradient(0, taskbarY, 0, h);
    taskbar.addColorStop(0, "#2456a3");
    taskbar.addColorStop(0.12, "#2f7eda");
    taskbar.addColorStop(1, "#1d4f9e");
    ctx.fillStyle = taskbar;
    ctx.fillRect(0, taskbarY, w, h - taskbarY);
    const startGradient = ctx.createLinearGradient(0, taskbarY + 4, 0, h - 4);
    startGradient.addColorStop(0, "#72b755");
    startGradient.addColorStop(1, "#3c8c2f");
    ctx.fillStyle = startGradient;
    roundedRect(ctx, w * 0.012, taskbarY + h * 0.009, w * 0.088, h * 0.052, h * 0.022);
    ctx.fill();
    text(ctx, "开始", w * 0.056, taskbarY + h * 0.044, h * 0.021, "white", 700, "center", "sans");
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    roundedRect(ctx, w * 0.11, taskbarY + h * 0.009, w * 0.22, h * 0.052, 3);
    ctx.fill();
    text(ctx, "星港：远征", w * 0.125, taskbarY + h * 0.043, h * 0.018, "white", 500, "left", "sans");
    text(ctx, "12:47", w - w * 0.035, taskbarY + h * 0.044, h * 0.019, "white", 400, "right");

    ctx.globalAlpha = 0.15;
    for (let y = 0; y < h; y += 4) {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, y, w, 1);
    }
    ctx.globalAlpha = 1;
    glow(ctx, w / 2, h / 2, h * 0.72, "rgba(255,244,211,0.05)", "rgba(0,0,0,0)");
    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.82);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.38)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  }

  draw2010(time) {
    const { ctx, width: w, height: h } = this;
    const bg = ctx.createRadialGradient(w * 0.5, h * 0.46, 0, w * 0.5, h * 0.46, w * 0.7);
    bg.addColorStop(0, "#2b91c7");
    bg.addColorStop(0.58, "#125b8a");
    bg.addColorStop(1, "#08263f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(137,223,255,0.12)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.ellipse(w * 0.5, h * 0.55, w * 0.22 + i * w * 0.07, h * 0.09 + i * h * 0.035, -0.2, 0, Math.PI * 2);
      ctx.stroke();
    }
    drawStars(ctx, w, h, this.stars, time, "#a8e8ff");

    const x = w * 0.035;
    const y = h * 0.12;
    ["计算机", "星港 2", "音乐", "回收站"].forEach((label, i) => {
      const iy = y + i * h * 0.15;
      ctx.fillStyle = "rgba(232,249,255,0.72)";
      roundedRect(ctx, x, iy, w * 0.034, w * 0.034, 4);
      ctx.fill();
      ctx.fillStyle = "rgba(5,35,53,0.75)";
      ctx.fillRect(x + w * 0.008, iy + w * 0.008, w * 0.018, w * 0.018);
      text(ctx, label, x + w * 0.017, iy + w * 0.051, h * 0.015, "rgba(238,251,255,0.76)", 400, "center", "sans");
    });

    const win = { x: w * 0.18, y: h * 0.11, width: w * 0.6, height: h * 0.74 };
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(win.x + w * 0.012, win.y + h * 0.016, win.width, win.height);
    ctx.restore();
    ctx.strokeStyle = "rgba(220,246,255,0.5)";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(226,248,255,0.2)";
    roundedRect(ctx, win.x, win.y, win.width, win.height, 8);
    ctx.fill();
    ctx.stroke();
    const titleBg = ctx.createLinearGradient(win.x, win.y, win.x, win.y + h * 0.06);
    titleBg.addColorStop(0, "rgba(219,248,255,0.55)");
    titleBg.addColorStop(1, "rgba(126,208,239,0.38)");
    ctx.fillStyle = titleBg;
    roundedRect(ctx, win.x, win.y, win.width, h * 0.06, 8);
    ctx.fill();
    text(ctx, "星港 2：逆光", win.x + w * 0.02, win.y + h * 0.037, h * 0.022, "#e9fbff", 600, "left", "sans");
    text(ctx, "—  □  ×", win.x + win.width - w * 0.08, win.y + h * 0.037, h * 0.019, "rgba(235,251,255,0.75)", 400, "right", "sans");
    const artY = win.y + h * 0.075;
    const artH = win.height - h * 0.19;
    const art = ctx.createLinearGradient(win.x, artY, win.x + win.width, artY + artH);
    art.addColorStop(0, "#062d49");
    art.addColorStop(0.55, "#0b5a7a");
    art.addColorStop(1, "#07131e");
    ctx.fillStyle = art;
    ctx.fillRect(win.x + 8, artY, win.width - 16, artH);
    drawStars(ctx, win.width - 16, artH, this.stars, time, "#a4f3ff");
    const shipX = win.x + win.width * 0.4;
    const shipY = artY + artH * 0.43;
    ctx.save();
    ctx.translate(shipX, shipY);
    ctx.rotate(-0.18);
    ctx.fillStyle = "#dffcff";
    ctx.beginPath();
    ctx.moveTo(-h * 0.09, 0);
    ctx.lineTo(h * 0.06, -h * 0.025);
    ctx.lineTo(h * 0.09, 0);
    ctx.lineTo(h * 0.06, h * 0.025);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#65def5";
    ctx.fillRect(-h * 0.08, -h * 0.014, h * 0.12, h * 0.028);
    ctx.restore();
    text(ctx, "星港 2：逆光", win.x + w * 0.035, artY + artH * 0.7, h * 0.052, "#e8feff", 600, "left", "serif");
    text(ctx, "THE SECOND VOYAGE", win.x + w * 0.037, artY + artH * 0.77, h * 0.014, "rgba(208,250,255,0.55)", 300, "left");
    ctx.fillStyle = "rgba(238,253,255,0.24)";
    ctx.fillRect(win.x + w * 0.035, win.y + win.height - h * 0.095, win.width * 0.55, h * 0.014);
    const progress = 0.3 + (time % 8) / 16;
    ctx.fillStyle = "#b6f6ff";
    ctx.fillRect(win.x + w * 0.035, win.y + win.height - h * 0.095, win.width * 0.55 * progress, h * 0.014);
    text(ctx, `正在更新  ${Math.round(progress * 100)}%`, win.x + w * 0.035, win.y + win.height - h * 0.05, h * 0.015, "rgba(235,252,255,0.7)", 400);
    ctx.fillStyle = "rgba(219,247,255,0.85)";
    roundedRect(ctx, win.x + win.width - w * 0.16, win.y + win.height - h * 0.08, w * 0.125, h * 0.042, 4);
    ctx.fill();
    text(ctx, "开始游戏", win.x + win.width - w * 0.0975, win.y + win.height - h * 0.051, h * 0.018, "#0e4158", 600, "center", "sans");

    const taskY = h - h * 0.065;
    ctx.fillStyle = "rgba(6,25,39,0.7)";
    ctx.fillRect(0, taskY, w, h - taskY);
    ctx.fillStyle = "rgba(210,247,255,0.16)";
    roundedRect(ctx, w * 0.012, taskY + 5, w * 0.075, h - taskY - 10, 4);
    ctx.fill();
    text(ctx, "开始", w * 0.0495, taskY + h * 0.043, h * 0.017, "#d6f8ff", 600, "center", "sans");
    ctx.fillStyle = "rgba(209,248,255,0.11)";
    roundedRect(ctx, w * 0.1, taskY + 5, w * 0.2, h - taskY - 10, 4);
    ctx.fill();
    text(ctx, "星港 2：逆光", w * 0.115, taskY + h * 0.042, h * 0.017, "rgba(226,251,255,0.8)", 400, "left", "sans");
    text(ctx, "21:08  ·  2010/06/18", w - w * 0.045, taskY + h * 0.043, h * 0.016, "rgba(226,251,255,0.7)", 400, "right");
    ctx.globalAlpha = 0.04;
    for (let y = 0; y < h; y += 2) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, y, w, 1);
    }
    ctx.globalAlpha = 1;
  }

  draw2015(time) {
    const { ctx, width: w, height: h } = this;
    ctx.fillStyle = "#0b0f10";
    ctx.fillRect(0, 0, w, h);
    const glowGradient = ctx.createRadialGradient(w * 0.66, h * 0.36, 0, w * 0.66, h * 0.36, h * 0.8);
    glowGradient.addColorStop(0, "rgba(36, 97, 80, 0.62)");
    glowGradient.addColorStop(1, "rgba(11,15,16,0)");
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#111719";
    ctx.fillRect(0, 0, w * 0.15, h);
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.beginPath();
    ctx.moveTo(w * 0.15, 0);
    ctx.lineTo(w * 0.15, h);
    ctx.stroke();
    text(ctx, "STARPORT", w * 0.025, h * 0.09, h * 0.03, "#d9e4df", 600, "left", "sans");
    text(ctx, "库", w * 0.025, h * 0.24, h * 0.02, "#86cbb4", 600, "left", "sans");
    ["最近", "动作", "独立", "收藏", "好友"].forEach((label, i) => {
      text(ctx, label, w * 0.03, h * 0.33 + i * h * 0.065, h * 0.018, i === 0 ? "rgba(220,231,225,0.84)" : "rgba(157,177,168,0.5)", 400, "left", "sans");
    });
    text(ctx, "在线好友", w * 0.025, h * 0.68, h * 0.012, "rgba(149,174,162,0.5)", 400);
    ["阿哲", "舟舟", "北窗", "小满"].forEach((name, i) => {
      const y = h * 0.73 + i * h * 0.055;
      ctx.fillStyle = i === 2 ? "#7cf0c8" : "rgba(159,179,169,0.45)";
      ctx.beginPath();
      ctx.arc(w * 0.032, y - h * 0.006, h * 0.004, 0, Math.PI * 2);
      ctx.fill();
      text(ctx, name, w * 0.043, y, h * 0.015, i === 2 ? "rgba(215,235,226,0.82)" : "rgba(159,179,169,0.5)", 400, "left", "sans");
    });
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    roundedRect(ctx, w * 0.175, h * 0.06, w * 0.6, h * 0.065, 3);
    ctx.fill();
    text(ctx, "搜索你的游戏", w * 0.195, h * 0.102, h * 0.017, "rgba(168,185,178,0.45)", 400, "left", "sans");
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(w * 0.175, h * 0.145);
    ctx.lineTo(w * 0.775, h * 0.145);
    ctx.stroke();
    const heroX = w * 0.175;
    const heroY = h * 0.18;
    const heroW = w * 0.6;
    const heroH = h * 0.31;
    const hero = ctx.createLinearGradient(heroX, heroY, heroX + heroW, heroY + heroH);
    hero.addColorStop(0, "#0c2923");
    hero.addColorStop(0.32, "#245e4f");
    hero.addColorStop(1, "#071513");
    ctx.fillStyle = hero;
    ctx.fillRect(heroX, heroY, heroW, heroH);
    glow(ctx, heroX + heroW * 0.63, heroY + heroH * 0.5, heroH * 0.8, "rgba(124,240,200,0.17)", "rgba(0,0,0,0)");
    ctx.fillStyle = "rgba(124,240,200,0.75)";
    ctx.beginPath();
    ctx.arc(heroX + heroW * 0.66, heroY + heroH * 0.45, h * 0.032, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(124,240,200,0.28)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(heroX + heroW * 0.66, heroY + heroH * 0.45, h * 0.075, 0, Math.PI * 2);
    ctx.stroke();
    text(ctx, "星港：边境", heroX + w * 0.035, heroY + heroH * 0.54, h * 0.06, "#ecfff8", 600, "left", "serif");
    text(ctx, "BEYOND THE BORDER", heroX + w * 0.037, heroY + heroH * 0.64, h * 0.013, "rgba(210,245,232,0.55)", 300);
    text(ctx, "2015 · 首次全 3D", heroX + w * 0.037, heroY + heroH * 0.74, h * 0.018, "rgba(187,231,216,0.68)", 400, "left", "sans");
    ctx.fillStyle = "#59d3a9";
    roundedRect(ctx, heroX + w * 0.035, heroY + heroH * 0.8, w * 0.12, h * 0.06, 2);
    ctx.fill();
    text(ctx, "开始游戏", heroX + w * 0.095, heroY + heroH * 0.84, h * 0.018, "#09231b", 600, "center", "sans");
    text(ctx, "上次游玩：昨天 03:12", heroX + w * 0.17, heroY + heroH * 0.84, h * 0.012, "rgba(185,217,204,0.48)", 400, "left");
    const rowY = h * 0.54;
    text(ctx, "最近游玩", heroX, rowY, h * 0.016, "rgba(194,214,205,0.7)", 500, "left", "sans");
    ["星港：边境", "峡谷之路", "长夜列车", "无主星区"].forEach((title, i) => {
      const cardX = heroX + i * (heroW / 4 + w * 0.005);
      const cardW = heroW / 4 - w * 0.005;
      const cardH = h * 0.26;
      const colors = [["#173e35", "#59d3a9"], ["#39211c", "#e38b62"], ["#24243a", "#8da0e8"], ["#2b3520", "#a7c984"]][i];
      const cg = ctx.createLinearGradient(cardX, rowY + h * 0.04, cardX, rowY + h * 0.04 + cardH);
      cg.addColorStop(0, colors[0]);
      cg.addColorStop(1, "#0c1112");
      ctx.fillStyle = cg;
      ctx.fillRect(cardX, rowY + h * 0.045, cardW, cardH);
      ctx.fillStyle = colors[1];
      ctx.beginPath();
      ctx.arc(cardX + cardW * 0.5, rowY + h * 0.14, h * 0.023, 0, Math.PI * 2);
      ctx.fill();
      text(ctx, title, cardX + w * 0.01, rowY + h * 0.245, h * 0.014, "rgba(226,239,232,0.8)", 500, "left", "sans");
      text(ctx, `${(8 + i * 13) % 60} 小时`, cardX + w * 0.01, rowY + h * 0.275, h * 0.011, "rgba(172,194,183,0.48)", 400);
    });
    const friendX = w * 0.795;
    ctx.fillStyle = "rgba(255,255,255,0.03)";
    roundedRect(ctx, friendX, h * 0.18, w * 0.185, h * 0.37, 3);
    ctx.fill();
    text(ctx, "好友 · 3 人在玩", friendX + w * 0.02, h * 0.225, h * 0.014, "rgba(206,226,216,0.7)", 500, "left", "sans");
    ["星港：边境", "峡谷之路", "星港：边境"].forEach((game, i) => {
      const fy = h * 0.27 + i * h * 0.09;
      ctx.fillStyle = "rgba(133,176,160,0.34)";
      ctx.beginPath();
      ctx.arc(friendX + w * 0.028, fy - h * 0.006, h * 0.009, 0, Math.PI * 2);
      ctx.fill();
      text(ctx, ["阿哲", "舟舟", "小满"][i], friendX + w * 0.045, fy, h * 0.014, "rgba(213,232,222,0.72)", 400, "left", "sans");
      text(ctx, game, friendX + w * 0.02, fy + h * 0.026, h * 0.011, "rgba(152,179,165,0.5)", 400);
    });
    const taskY = h - h * 0.045;
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, taskY, w, h - taskY);
    text(ctx, "库", w * 0.025, taskY + h * 0.03, h * 0.014, "rgba(154,178,166,0.7)", 400, "left", "sans");
    text(ctx, "02:14  ·  2015/09/06", w - w * 0.025, taskY + h * 0.03, h * 0.012, "rgba(154,178,166,0.45)", 400, "right");
  }

  draw2020(time) {
    const { ctx, width: w, height: h } = this;
    ctx.fillStyle = "#0c0a10";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#15111b";
    ctx.fillRect(0, 0, w, h * 0.075);
    text(ctx, "OBS STUDIO", w * 0.02, h * 0.047, h * 0.024, "#d8cfe8", 600, "left", "sans");
    text(ctx, "场景：夜航", w * 0.135, h * 0.046, h * 0.018, "rgba(200,190,216,0.56)", 400, "left", "sans");
    ctx.fillStyle = "#ba403b";
    roundedRect(ctx, w * 0.275, h * 0.019, w * 0.035, h * 0.038, 2);
    ctx.fill();
    text(ctx, "LIVE", w * 0.2925, h * 0.046, h * 0.017, "#ffece6", 700, "center", "sans");
    text(ctx, "00:42:17", w * 0.325, h * 0.046, h * 0.016, "rgba(230,213,199,0.66)", 400, "left");
    text(ctx, "观众 128", w * 0.92, h * 0.046, h * 0.016, "rgba(230,213,199,0.7)", 400, "right");

    const previewX = w * 0.02;
    const previewY = h * 0.1;
    const previewW = w * 0.64;
    const previewH = h * 0.72;
    const gameBg = ctx.createLinearGradient(previewX, previewY, previewX + previewW, previewY + previewH);
    gameBg.addColorStop(0, "#241c2c");
    gameBg.addColorStop(0.45, "#432d33");
    gameBg.addColorStop(1, "#0d0c10");
    ctx.fillStyle = gameBg;
    ctx.fillRect(previewX, previewY, previewW, previewH);
    glow(ctx, previewX + previewW * 0.58, previewY + previewH * 0.45, previewH * 0.9, "rgba(225,135,83,0.2)", "rgba(0,0,0,0)");
    drawStars(ctx, previewW, previewH, this.stars, time, "#ffd9b3");
    ctx.fillStyle = "rgba(238,178,125,0.9)";
    ctx.beginPath();
    ctx.arc(previewX + previewW * 0.7, previewY + previewH * 0.4, previewH * 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,159,101,0.14)";
    ctx.beginPath();
    ctx.arc(previewX + previewW * 0.7, previewY + previewH * 0.4, previewH * 0.17, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(16,14,18,0.55)";
    ctx.beginPath();
    ctx.moveTo(previewX, previewY + previewH * 0.72);
    ctx.bezierCurveTo(previewX + previewW * 0.25, previewY + previewH * 0.58, previewX + previewW * 0.52, previewY + previewH * 0.7, previewX + previewW, previewY + previewH * 0.55);
    ctx.lineTo(previewX + previewW, previewY + previewH);
    ctx.lineTo(previewX, previewY + previewH);
    ctx.fill();
    drawShip(ctx, previewX + previewW * 0.53, previewY + previewH * 0.8, previewH * 0.035, "#ffe4c7");
    text(ctx, "星港：余烬", previewX + w * 0.03, previewY + previewH * 0.13, h * 0.045, "#ffead3", 600, "left", "serif");
    text(ctx, "第二章 · 失落航线", previewX + w * 0.03, previewY + previewH * 0.19, h * 0.016, "rgba(255,225,197,0.56)", 400, "left", "sans");
    text(ctx, "探索度 68%", previewX + previewW - w * 0.03, previewY + previewH * 0.13, h * 0.015, "rgba(255,221,191,0.56)", 400, "right");
    const webcam = { x: previewX + previewW - w * 0.155, y: previewY + h * 0.04, w: w * 0.14, h: h * 0.21 };
    ctx.fillStyle = "rgba(56,44,48,0.85)";
    ctx.fillRect(webcam.x, webcam.y, webcam.w, webcam.h);
    glow(ctx, webcam.x + webcam.w * 0.5, webcam.y + webcam.h * 0.45, webcam.h * 0.6, "rgba(255,176,118,0.16)", "rgba(0,0,0,0)");
    ctx.fillStyle = "rgba(255, 205, 160, 0.35)";
    ctx.beginPath();
    ctx.arc(webcam.x + webcam.w * 0.5, webcam.y + webcam.h * 0.43, webcam.h * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillRect(webcam.x + 6, webcam.y + 6, 22, 2);
    text(ctx, "CAM", webcam.x + 10, webcam.y + 20, h * 0.011, "rgba(255,255,255,0.4)", 400);

    const chatX = w * 0.685;
    ctx.fillStyle = "rgba(25,21,28,0.92)";
    ctx.fillRect(chatX, previewY, w - chatX - w * 0.015, previewH);
    text(ctx, "直播聊天", chatX + w * 0.02, previewY + h * 0.055, h * 0.017, "rgba(224,210,228,0.7)", 500, "left", "sans");
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(chatX, previewY + h * 0.075);
    ctx.lineTo(chatX + w - chatX - w * 0.015, previewY + h * 0.075);
    ctx.stroke();
    const messages = [
      ["夜航员", "这张旧地图还有彩蛋吗"],
      ["北窗", "豆豆今天也在"],
      ["momo", "2005 那版我也有！"],
      ["阿哲", "光追开满也太稳了"],
      ["小满", "主播今天播到几点"],
      ["K", "这个星云好漂亮"],
      ["夜航员", "再来一局"],
      ["豆豆", "喵"],
    ];
    messages.forEach(([name, message], i) => {
      const y = previewY + h * 0.115 + i * h * 0.075 + Math.sin(time * 0.35 + i) * 1.5;
      text(ctx, name, chatX + w * 0.02, y, h * 0.014, i % 3 === 1 ? "#ffc188" : "rgba(178,197,208,0.64)", 500, "left", "sans");
      text(ctx, message, chatX + w * 0.02, y + h * 0.026, h * 0.014, "rgba(232,220,231,0.78)", 400, "left", "sans");
    });
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundedRect(ctx, chatX + w * 0.015, previewY + previewH - h * 0.065, w - chatX - w * 0.045, h * 0.045, 3);
    ctx.fill();
    text(ctx, "说点什么…", chatX + w * 0.028, previewY + previewH - h * 0.035, h * 0.013, "rgba(205,195,213,0.38)", 400);
    const barY = h - h * 0.09;
    ctx.fillStyle = "rgba(26,21,29,0.95)";
    ctx.fillRect(0, barY, w, h - barY);
    text(ctx, "场景 1 · 星港", w * 0.02, barY + h * 0.04, h * 0.014, "rgba(219,203,221,0.72)", 400, "left", "sans");
    text(ctx, "场景 2 · 桌面", w * 0.13, barY + h * 0.04, h * 0.014, "rgba(219,203,221,0.35)", 400, "left", "sans");
    text(ctx, "码率 6000 kbps", w * 0.72, barY + h * 0.04, h * 0.012, "rgba(202,188,207,0.44)", 400, "right");
    ctx.fillStyle = "rgba(255,255,255,0.09)";
    ctx.fillRect(w * 0.02, h - h * 0.025, w * 0.96, 2);
    for (let i = 0; i < 22; i += 1) {
      const barH = h * (0.008 + (0.5 + Math.sin(time * 2 + i) * 0.5) * 0.025);
      ctx.fillStyle = "rgba(255, 181, 112, 0.45)";
      ctx.fillRect(w * 0.8 + i * 6, barY + h * 0.045 - barH, 2, barH);
    }
  }

  draw2025(time) {
    const { ctx, width: w, height: h } = this;
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#15110d");
    bg.addColorStop(0.48, "#38261a");
    bg.addColorStop(1, "#0b0907");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    glow(ctx, w * 0.68, h * 0.45, h * 0.9, "rgba(232,162,91,0.24)", "rgba(0,0,0,0)");
    const planet = ctx.createRadialGradient(w * 0.7, h * 0.42, h * 0.02, w * 0.7, h * 0.42, h * 0.22);
    planet.addColorStop(0, "#d9a565");
    planet.addColorStop(0.55, "#7d4f30");
    planet.addColorStop(1, "#1b120c");
    ctx.fillStyle = planet;
    ctx.beginPath();
    ctx.arc(w * 0.7, h * 0.42, h * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,206,147,0.18)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(w * 0.7, h * 0.42, h * 0.34, h * 0.08, -0.25, 0, Math.PI * 2);
    ctx.stroke();
    drawStars(ctx, w, h, this.stars, time, "#ffe3b7");

    text(ctx, "23:36", w * 0.045, h * 0.12, h * 0.055, "#f9e7ca", 300, "left", "mono");
    text(ctx, "2025 / 11 / 11  周二", w * 0.047, h * 0.15, h * 0.014, "rgba(247,226,195,0.42)", 400);
    const musicX = w * 0.045;
    const musicY = h * 0.23;
    ctx.fillStyle = "rgba(255,244,227,0.06)";
    roundedRect(ctx, musicX, musicY, w * 0.19, h * 0.14, 4);
    ctx.fill();
    text(ctx, "正在播放", musicX + w * 0.014, musicY + h * 0.035, h * 0.012, "rgba(245,224,195,0.42)", 400);
    text(ctx, "夜航 · 环境声", musicX + w * 0.014, musicY + h * 0.07, h * 0.018, "rgba(250,233,208,0.78)", 500, "left", "sans");
    for (let i = 0; i < 26; i += 1) {
      const barH = h * (0.006 + (0.5 + Math.sin(time * 2.4 + i * 0.65) * 0.5) * 0.026);
      ctx.fillStyle = "rgba(226, 173, 113, 0.45)";
      ctx.fillRect(musicX + w * 0.014 + i * 5.5, musicY + h * 0.115 - barH, 2.5, barH);
    }

    const cardX = w * 0.36;
    const cardY = h * 0.18;
    const cardW = w * 0.42;
    const cardH = h * 0.57;
    ctx.fillStyle = "rgba(255,244,226,0.055)";
    roundedRect(ctx, cardX, cardY, cardW, cardH, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,237,209,0.13)";
    ctx.stroke();
    ctx.fillStyle = "rgba(255,222,176,0.12)";
    ctx.beginPath();
    ctx.arc(cardX + cardW * 0.5, cardY + cardH * 0.35, h * 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,205,147,0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cardX + cardW * 0.5, cardY + cardH * 0.35, h * 0.11, 0, Math.PI * 2);
    ctx.stroke();
    drawShip(ctx, cardX + cardW * 0.5, cardY + cardH * 0.35, h * 0.033, "#ffe3b6");
    text(ctx, "星港：二十年", cardX + cardW * 0.5, cardY + cardH * 0.58, h * 0.043, "#f6e3c7", 600, "center", "serif");
    text(ctx, "2005 — 2025  ·  二十周年纪念版", cardX + cardW * 0.5, cardY + cardH * 0.65, h * 0.014, "rgba(245,224,195,0.5)", 400, "center", "sans");
    ctx.fillStyle = "rgba(234,178,109,0.9)";
    roundedRect(ctx, cardX + cardW * 0.33, cardY + cardH * 0.75, cardW * 0.34, h * 0.07, 3);
    ctx.fill();
    text(ctx, "继续航行", cardX + cardW * 0.5, cardY + cardH * 0.792, h * 0.016, "#26180d", 600, "center", "sans");
    text(ctx, "上次游玩  2005 年地图", cardX + cardW * 0.5, cardY + cardH * 0.9, h * 0.012, "rgba(245,224,195,0.34)", 400, "center", "sans");

    const dockY = h - h * 0.1;
    const dockW = w * 0.28;
    const dockX = (w - dockW) / 2;
    ctx.fillStyle = "rgba(255,242,221,0.07)";
    roundedRect(ctx, dockX, dockY, dockW, h * 0.065, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,239,215,0.1)";
    ctx.stroke();
    ["✦", "▤", "♫", "◌"].forEach((glyph, i) => {
      text(ctx, glyph, dockX + dockW * (0.18 + i * 0.21), dockY + h * 0.045, h * 0.023, i === 0 ? "#ffd7a0" : "rgba(249,232,208,0.45)", 400, "center", "sans");
    });
    text(ctx, "2005", w * 0.9, h * 0.91, h * 0.014, "rgba(245,224,195,0.26)", 400, "right");
    text(ctx, "2025", w * 0.955, h * 0.91, h * 0.014, "rgba(255,213,155,0.62)", 400, "right");
    ctx.strokeStyle = "rgba(245,224,195,0.16)";
    ctx.beginPath();
    ctx.moveTo(w * 0.77, h * 0.905);
    ctx.lineTo(w * 0.905, h * 0.905);
    ctx.stroke();
    ctx.fillStyle = "#dba46b";
    ctx.fillRect(w * 0.935, h * 0.899, w * 0.006, 4);
  }
}

function yearAspect(year) {
  if (year === 2005) return "4:3";
  if (year === 2020) return "21:9";
  return "16:9";
}

export const createScreenPainters = (eras) => {
  const painters = new Map();
  for (const era of eras) painters.set(era.year, new MonitorPainter(era));
  return painters;
};

const iconSvg = (type) => {
  const paths = {
    computer:
      '<rect x="3" y="4" width="17" height="12" rx="1.5"/><path d="M8 20h7M11.5 16v4"/><path d="M6 7h7M6 10h4"/>',
    game: '<path d="M5 7h14a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-2l-2.2-2H9.2L7 17H5a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3Z"/><path d="M7 10v4M5 12h4M16 11h.01M18.5 13h.01"/>',
    folder: '<path d="M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 10h18"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    library: '<path d="M4 5h4v15H4zM10 5h4v15h-4zM16 6l3.8-1 3.6 14.2-3.8 1z"/>',
    friends: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5a3 3 0 0 1 0 6M17 14c2.5.5 4 2.5 4 5"/>',
    live: '<circle cx="12" cy="12" r="4"/><path d="M6 6a8.5 8.5 0 0 0 0 12M18 6a8.5 8.5 0 0 1 0 12M2.5 2.5a14 14 0 0 0 0 19M21.5 2.5a14 14 0 0 1 0 19"/>',
    chat: '<path d="M4 4h16v12H9l-5 4Z"/><path d="M8 9h8M8 12h5"/>',
    photos: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[type] ?? paths.game}</svg>`;
};

const desktopMessages = {
  2005: [
    "我的电脑：80GB 硬盘，已用 72%。",
    "星港：远征 · 正在运行。",
    "作业文件夹：明天要交的作文还没写。",
  ],
  2010: [
    "计算机：还在下载星港 2 的资料片。",
    "星港 2：逆光 · 版本 1.4.2。",
    "音乐：放一张刻录碟，音量已经调到最大。",
  ],
  2015: [
    "库：47 款游戏，13 款没通关。",
    "星港：边境 · 上次游玩 03:12。",
    "好友：阿哲、舟舟、小满在线。",
  ],
  2020: [
    "OBS：直播已持续 42 分钟。",
    "星港：余烬 · 正在直播。",
    "弹幕：豆豆今天也在。",
  ],
  2025: [
    "星港：二十年 · 继续上次存档。",
    "相册：2005 年的第一张桌面照片。",
    "环境声：夜航 · 播放中。",
  ],
};

const chromeMarkup = (era) => {
  const s = era.screen;
  const icons = s.icons
    .map(
      ([type, label], index) =>
        `<button class="desk-icon${index === 1 ? " is-primary" : ""}" type="button" data-icon="${index}">
          <span class="desk-icon-art">${iconSvg(type)}</span><span>${label}</span>
        </button>`
    )
    .join("");
  const status = s.status.map((item) => `<span>${item}</span>`).join("");
  return `
  <div class="os-screen os-${s.chrome}" data-year="${era.year}">
    <div class="os-wallpaper"></div>
    <div class="os-topline"><span>${s.os}</span><span>${era.screen.window}</span></div>
    <div class="desk-icons">${icons}</div>
    <section class="game-window" aria-label="${s.title}">
      <header class="game-titlebar">
        <span class="title-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="game-title">${s.window}</span>
        <span class="title-buttons" aria-hidden="true">—&nbsp;&nbsp;□&nbsp;&nbsp;×</span>
      </header>
      <div class="game-stage">
        <canvas class="arcade-canvas"></canvas>
        <div class="arcade-scanlines" aria-hidden="true"></div>
        <div class="game-cover">
          <p class="cover-kicker">${s.subtitle}</p>
          <h2>${s.title}</h2>
          <p class="cover-tagline">${s.tagline}</p>
          <div class="cover-art" aria-hidden="true">
            <span class="cover-orbit"></span>
            <span class="cover-planet"></span>
            <span class="cover-ship">✦</span>
            <span class="cover-spark s1"></span>
            <span class="cover-spark s2"></span>
            <span class="cover-spark s3"></span>
          </div>
          <button class="launch-button" type="button" data-launch>启动游戏</button>
          <p class="cover-note">${s.note}</p>
        </div>
        <div class="arcade-hud" hidden>
          <span>星港积分 <b data-score>0</b></span>
          <span>巡航空域 <b data-time>30</b>s</span>
          <button type="button" class="hud-restart" data-retry>重开</button>
        </div>
        <div class="arcade-end" hidden>
          <p class="end-kicker">本次巡航结束</p>
          <p class="end-score"><b data-final>0</b> 分</p>
          <p class="end-line">按住左键点掉漂来的碎片。</p>
          <button class="launch-button" type="button" data-retry>再来一局</button>
        </div>
        <p class="game-hint">${era.year === 2005 ? "移动鼠标瞄准 · 点击开火" : "移动鼠标 · 点击发射"}</p>
      </div>
      <footer class="game-statusbar"><span class="status-led"></span><span>${s.status[0]}</span><span>${s.status[1]}</span><span class="status-right">${s.status[2]}</span></footer>
    </section>
    <aside class="memory-slip">
      <p class="slip-kicker">${era.year} · 主人的记忆</p>
      <h3>${s.window}</h3>
      <p>${s.note}</p>
      <div class="slip-rule"></div>
      <p class="slip-foot">${era.caption}</p>
    </aside>
    <div class="os-taskbar">
      <button type="button" class="start-pill" data-start>开始</button>
      <span class="task-app">${s.window}</span>
      <span class="task-tray">${s.status[2]}</span>
    </div>
    <div class="screen-toast" hidden></div>
  </div>`;
};

class StarportGame {
  constructor(canvas, era, elements) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.era = era;
    this.elements = elements;
    this.pixel = era.year <= 2010;
    this.running = false;
    this.raf = 0;
    this.last = 0;
    this.stars = starSeed(90, 7100 + era.year);
    this.targets = [];
    this.bullets = [];
    this.particles = [];
    this.tracers = [];
    this.score = 0;
    this.timeLeft = 30;
    this.spawnClock = 0;
    this.shipX = 0.5;
    this.pointerX = 0.5;
    this.pointerY = 0.5;
    this.resize = this.resize.bind(this);
    this.frame = this.frame.bind(this);
    this.pointerMove = this.pointerMove.bind(this);
    this.pointerDown = this.pointerDown.bind(this);
    this.canvas.addEventListener("pointermove", this.pointerMove);
    this.canvas.addEventListener("pointerdown", this.pointerDown);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(this.canvas);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.dpr = dpr;
    this.width = rect.width;
    this.height = rect.height;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  start() {
    this.resize();
    this.running = true;
    this.score = 0;
    this.timeLeft = 30;
    this.targets = [];
    this.bullets = [];
    this.particles = [];
    this.tracers = [];
    this.spawnClock = 0;
    this.shipX = 0.5;
    this.pointerX = 0.5;
    this.pointerY = 0.5;
    this.last = performance.now();
    this.elements.hud.hidden = false;
    this.elements.end.hidden = true;
    this.elements.canvas.classList.add("is-running");
    this.updateHud();
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.frame);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  destroy() {
    this.stop();
    this.resizeObserver.disconnect();
    this.canvas.removeEventListener("pointermove", this.pointerMove);
    this.canvas.removeEventListener("pointerdown", this.pointerDown);
  }

  pointerMove(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointerX = Math.max(0.04, Math.min(0.96, (event.clientX - rect.left) / rect.width));
    this.pointerY = Math.max(0.04, Math.min(0.96, (event.clientY - rect.top) / rect.height));
  }

  pointerDown(event) {
    if (!this.running) return;
    event.preventDefault();
    this.pointerMove(event);
    this.shootAt(this.pointerX, this.pointerY);
  }

  fire(x) {
    this.bullets.push({ x, y: 0.88, life: 0 });
  }

  shootAt(x, y) {
    const px = x * this.width;
    const py = y * this.height;
    const index = this.targets.findIndex((target) => {
      const dx = target.x * this.width - px;
      const dy = target.y * this.height - py;
      return Math.hypot(dx, dy) < Math.max(24, target.size * 1.25);
    });
    if (index >= 0) {
      const target = this.targets[index];
      this.score += this.pixel ? 10 : 12 + Math.round(target.size / 6);
      this.burst(target);
      this.tracers.push({
        x1: this.shipX,
        y1: 0.87,
        x2: target.x,
        y2: target.y,
        life: 0.16,
      });
      this.targets.splice(index, 1);
      this.updateHud();
      return;
    }
    this.fire(x);
  }

  spawnTarget() {
    const palette = this.era.screen;
    const target = {
      x: 0.1 + Math.random() * 0.8,
      y: 0.08 + Math.random() * 0.2,
      size: 16 + Math.random() * 24,
      speed: 0.025 + Math.random() * 0.045,
      drift: (Math.random() - 0.5) * 0.045,
      phase: Math.random() * Math.PI * 2,
      color: this.pixel ? (Math.random() > 0.5 ? "#c2d8dd" : "#8e7b62") : palette.accent,
      ship: !this.pixel && Math.random() > 0.4,
      rot: Math.random() * Math.PI,
    };
    this.targets.push(target);
  }

  frame(now) {
    if (!this.running) return;
    const dt = Math.min(0.2, (now - this.last) / 1000);
    this.last = now;
    this.timeLeft = Math.max(0, this.timeLeft - dt);
    this.shipX += (this.pointerX - this.shipX) * Math.min(1, dt * 9);
    this.spawnClock += dt;
    if (this.spawnClock > (this.era.year <= 2010 ? 0.95 : 0.78)) {
      this.spawnClock = 0;
      this.spawnTarget();
    }
    for (const target of this.targets) {
      target.y += target.speed * dt * 4.4;
      target.x = Math.max(0.04, Math.min(0.96, target.x + Math.sin(now / 900 + target.phase) * target.drift * dt));
      target.rot += dt * 0.4;
    }
    for (const bullet of this.bullets) bullet.life += dt;
    this.bullets = this.bullets.filter((bullet) => bullet.life < 0.34);
    const hitTargets = new Set();
    for (const bullet of this.bullets) {
      for (const target of this.targets) {
        if (hitTargets.has(target)) continue;
        const dx = (target.x - bullet.x) * this.width;
        const dy = (target.y - (0.88 - bullet.life * 2.9)) * this.height;
        if (Math.hypot(dx, dy) < target.size * 0.82) {
          hitTargets.add(target);
          this.score += this.pixel ? 10 : 12 + Math.round(target.size / 6);
          this.burst(target);
          bullet.life = 1;
        }
      }
    }
    this.targets = this.targets.filter((target) => {
      if (hitTargets.has(target)) return false;
      if (target.y > 1.04) {
        this.timeLeft = Math.max(0, this.timeLeft - 1.2);
        return false;
      }
      return true;
    });
    for (const particle of this.particles) {
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += 0.12 * dt;
      particle.life -= dt;
    }
    this.particles = this.particles.filter((particle) => particle.life > 0);
    for (const tracer of this.tracers) tracer.life -= dt;
    this.tracers = this.tracers.filter((tracer) => tracer.life > 0);
    this.draw(now / 1000);
    this.updateHud();
    if (this.timeLeft <= 0) {
      this.finish();
      return;
    }
    this.raf = requestAnimationFrame(this.frame);
  }

  burst(target) {
    for (let i = 0; i < 14; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.28;
      this.particles.push({
        x: target.x,
        y: target.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.35 + Math.random() * 0.55,
        max: 0.9,
        color: this.pixel ? "#d9e9ee" : this.era.screen.accent,
      });
    }
  }

  updateHud() {
    this.elements.score.textContent = String(this.score);
    this.elements.time.textContent = String(Math.ceil(this.timeLeft));
  }

  draw(time) {
    const { ctx, width: w, height: h } = this;
    if (!w || !h) return;
    const palette = this.era.screen;
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, palette.dark);
    bg.addColorStop(1, this.pixel ? "#02070b" : "#110c0b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    if (!this.pixel) glow(ctx, w * 0.7, h * 0.35, h * 0.9, `${palette.accent}22`, "rgba(0,0,0,0)");
    drawStars(ctx, w, h, this.stars, time * 0.55, this.pixel ? "#9ecfdc" : palette.accent);

    for (const target of this.targets) {
      const x = target.x * w;
      const y = target.y * h;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(target.rot);
      if (this.pixel) {
        const s = Math.max(8, target.size * 0.7);
        ctx.fillStyle = target.color;
        ctx.fillRect(-s / 2, -s / 2, s, s * 0.7);
        ctx.fillStyle = "rgba(255,255,255,0.38)";
        ctx.fillRect(-s / 2 + 3, -s / 2 + 3, s * 0.25, s * 0.16);
        ctx.fillStyle = "#4b4136";
        ctx.fillRect(-s * 0.55, s * 0.22, s * 1.1, 3);
      } else if (target.ship) {
        ctx.fillStyle = target.color;
        ctx.beginPath();
        ctx.moveTo(0, target.size * 0.8);
        ctx.lineTo(target.size * 0.8, -target.size * 0.45);
        ctx.lineTo(0, -target.size * 0.2);
        ctx.lineTo(-target.size * 0.8, -target.size * 0.45);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(-target.size * 0.08, -target.size * 0.02, target.size * 0.16, target.size * 0.2);
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.strokeStyle = target.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 7; i += 1) {
          const a = (i / 7) * Math.PI * 2;
          const r = target.size * (0.65 + ((i * 7) % 5) * 0.07);
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }

    for (const bullet of this.bullets) {
      ctx.strokeStyle = this.pixel ? "#e7fbff" : palette.accent;
      ctx.lineWidth = this.pixel ? 3 : 2;
      const x = bullet.x * w;
      const y = (0.88 - bullet.life * 2.9) * h;
      ctx.beginPath();
      ctx.moveTo(x, y + 12);
      ctx.lineTo(x, y - 18);
      ctx.stroke();
    }
    for (const tracer of this.tracers) {
      ctx.strokeStyle = this.pixel ? "rgba(223,247,255,0.82)" : palette.accent;
      ctx.lineWidth = this.pixel ? 2 : 1.3;
      ctx.globalAlpha = Math.min(1, tracer.life / 0.08);
      ctx.beginPath();
      ctx.moveTo(tracer.x1 * w, tracer.y1 * h);
      ctx.lineTo(tracer.x2 * w, tracer.y2 * h);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    for (const particle of this.particles) {
      ctx.globalAlpha = Math.max(0, particle.life / particle.max);
      ctx.fillStyle = particle.color;
      const size = this.pixel ? 3 : 2;
      ctx.fillRect(particle.x * w, particle.y * h, size, size);
    }
    ctx.globalAlpha = 1;
    drawShip(ctx, this.shipX * w, h * 0.87, this.pixel ? 18 : 20, this.pixel ? "#e6f8ff" : palette.accent, this.pixel);
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, h * 0.945, w, 1);
  }

  finish() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.elements.hud.hidden = true;
    this.elements.end.hidden = false;
    this.elements.final.textContent = String(this.score);
    this.draw(performance.now() / 1000);
  }
}

export class ScreenOverlay {
  constructor(modal, surface, label, caption, closeButton) {
    this.modal = modal;
    this.surface = surface;
    this.label = label;
    this.caption = caption;
    this.closeButton = closeButton;
    this.game = null;
    this.onClose = null;
    this.toastTimer = 0;
    this.handleKey = this.handleKey.bind(this);
  }

  open(era) {
    this.closeGame();
    this.modal.dataset.era = String(era.year);
    this.modal.classList.add("is-open");
    this.modal.setAttribute("aria-hidden", "false");
    this.label.textContent = era.screen.label;
    this.caption.textContent = era.screen.monitor;
    this.surface.innerHTML = chromeMarkup(era);
    const canvas = this.surface.querySelector(".arcade-canvas");
    const elements = {
      canvas,
      hud: this.surface.querySelector(".arcade-hud"),
      end: this.surface.querySelector(".arcade-end"),
      score: this.surface.querySelector("[data-score]"),
      time: this.surface.querySelector("[data-time]"),
      final: this.surface.querySelector("[data-final]"),
    };
    this.game = new StarportGame(canvas, era, elements);
    if (import.meta.env.DEV) window.__screenGame = this.game;
    this.attach(era);
    document.addEventListener("keydown", this.handleKey);
    requestAnimationFrame(() => this.closeButton.focus({ preventScroll: true }));
  }

  attach(era) {
    const launch = this.surface.querySelector("[data-launch]");
    const cover = this.surface.querySelector(".game-cover");
    const hint = this.surface.querySelector(".game-hint");
    const startGame = () => {
      if (!this.game) return;
      cover.hidden = true;
      hint.hidden = true;
      this.game.start();
      this.game.canvas.focus?.();
    };
    launch?.addEventListener("click", startGame);
    this.surface.querySelectorAll("[data-retry]").forEach((button) => button.addEventListener("click", startGame));
    const toast = this.surface.querySelector(".screen-toast");
    let toastTimer = 0;
    const showToast = (message) => {
      if (!toast) return;
      toast.textContent = message;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => {
        toast.hidden = true;
      }, 2400);
    };
    this.surface.querySelectorAll(".desk-icon").forEach((button, index) => {
      button.addEventListener("click", () => {
        if (index === 1) {
          startGame();
          return;
        }
        showToast(desktopMessages[era.year][index] ?? "这里只有一段旧记忆。");
      });
    });
    this.surface.querySelector("[data-start]")?.addEventListener("click", () => {
      showToast("开始菜单：星港 · 相册 · 关闭计算机");
    });
    this.toastTimer = toastTimer;
  }

  closeGame() {
    if (this.game) {
      this.game.destroy();
      this.game = null;
    }
  }

  close() {
    if (!this.modal.classList.contains("is-open")) return;
    this.modal.classList.remove("is-open");
    this.modal.setAttribute("aria-hidden", "true");
    this.closeGame();
    if (import.meta.env.DEV) window.__screenGame = null;
    document.removeEventListener("keydown", this.handleKey);
    this.surface.innerHTML = "";
    this.onClose?.();
  }

  handleKey(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
    }
  }
}
