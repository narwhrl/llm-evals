import * as THREE from "three";

let seed = 417;
const random = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

export function canvasTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  draw(context, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function speckle(ctx, w, h, count, alpha = 0.08) {
  for (let i = 0; i < count; i++) {
    const light = random() > 0.5;
    ctx.fillStyle = light ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(random() * w, random() * h, random() * 3 + 1, random() * 2 + 1);
  }
}

export function makeTextures() {
  const metal = canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.fillStyle = "#c7c9bc";
    ctx.fillRect(0, 0, w, h);
    speckle(ctx, w, h, 22000, 0.065);
    for (let y = 0; y < h; y += 512) {
      for (let x = 0; x < w; x += 256) {
        ctx.strokeStyle = "rgba(58,72,73,.32)";
        ctx.lineWidth = 3;
        ctx.strokeRect(x + 5, y + 5, 246, 502);
        ctx.strokeStyle = "rgba(255,255,240,.38)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 9, y + 9, 238, 494);
        for (const [rx, ry] of [[18, 18], [238, 18], [18, 494], [238, 494]]) {
          ctx.fillStyle = "#637273";
          ctx.beginPath(); ctx.arc(x + rx, y + ry, 4, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#e1e3d3";
          ctx.fillRect(x + rx - 1, y + ry - 2, 2, 1);
        }
      }
    }
    for (let i = 0; i < 250; i++) {
      const x = random() * w, y = random() * h;
      ctx.strokeStyle = `rgba(48,58,54,${random() * 0.13})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + random() * 27, y + random() * 3); ctx.stroke();
    }
  });
  metal.wrapS = metal.wrapT = THREE.RepeatWrapping;
  metal.repeat.set(0.28, 0.3);

  const painted = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#e2ddc9"; ctx.fillRect(0, 0, w, h);
    speckle(ctx, w, h, 14000, 0.06);
    for (let i = 0; i < 75; i++) {
      ctx.strokeStyle = "rgba(75,76,58,.08)";
      const x = random() * w, y = random() * h;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 10, y + 2); ctx.stroke();
    }
  });

  const floor = canvasTexture(1024, 512, (ctx, w, h) => {
    ctx.fillStyle = "#465155"; ctx.fillRect(0, 0, w, h);
    speckle(ctx, w, h, 18000, 0.12);
    for (let y = 8; y < h; y += 32) {
      for (let x = 8; x < w; x += 32) {
        ctx.fillStyle = "#202d32";
        ctx.beginPath(); ctx.roundRect(x, y, 23, 8, 3); ctx.fill();
        ctx.fillStyle = "rgba(184,191,179,.4)"; ctx.fillRect(x + 3, y + 1, 16, 1);
        ctx.fillStyle = "rgba(11,24,28,.5)"; ctx.fillRect(x + 3, y + 7, 16, 1);
      }
    }
    for (let x = 0; x < w; x += 256) {
      ctx.fillStyle = "rgba(14,29,33,.8)"; ctx.fillRect(x, 0, 4, h);
      ctx.fillStyle = "rgba(151,169,165,.32)"; ctx.fillRect(x + 4, 0, 2, h);
    }
    for (let y = 0; y < h; y += 128) {
      ctx.fillStyle = "rgba(14,29,33,.65)"; ctx.fillRect(0, y, w, 3);
    }
  });
  floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
  floor.repeat.set(2, 1);

  const cloth = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#517b79"; ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) {
      ctx.strokeStyle = y % 6 ? "rgba(219,232,204,.12)" : "rgba(15,40,40,.17)";
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y + 1); ctx.stroke();
    }
    for (let x = 0; x < w; x += 3) {
      ctx.strokeStyle = x % 6 ? "rgba(225,233,211,.08)" : "rgba(15,40,40,.15)";
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 1, h); ctx.stroke();
    }
    for (let y = 64; y < h; y += 128) {
      ctx.fillStyle = "rgba(13,40,38,.4)"; ctx.fillRect(0, y, w, 5);
      ctx.strokeStyle = "rgba(190,207,175,.6)"; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(0, y - 4); ctx.lineTo(w, y - 4); ctx.stroke();
      ctx.setLineDash([]);
    }
  });

  const orangeCloth = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#b66e44"; ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 3) {
      ctx.fillStyle = y % 2 ? "rgba(247,206,144,.09)" : "rgba(69,33,19,.12)";
      ctx.fillRect(0, y, w, 1);
    }
    for (let x = 0; x < w; x += 3) {
      ctx.fillStyle = "rgba(255,227,173,.09)"; ctx.fillRect(x, 0, 1, h);
    }
    for (let y = 32; y < h; y += 128) {
      ctx.fillStyle = "rgba(83,42,27,.3)"; ctx.fillRect(0, y, w, 6);
      ctx.fillStyle = "rgba(224,158,95,.4)"; ctx.fillRect(0, y + 8, w, 2);
    }
  });

  const worktop = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.fillStyle = "#78827b"; ctx.fillRect(0, 0, w, h);
    speckle(ctx, w, h, 10000, 0.08);
    for (let i = 0; i < 200; i++) {
      const y = random() * h;
      ctx.strokeStyle = "rgba(28,45,43,.11)";
      ctx.beginPath(); ctx.moveTo(random() * w, y); ctx.lineTo(random() * w, y + 1); ctx.stroke();
    }
  });

  return { metal, painted, floor, cloth, orangeCloth, worktop };
}

export function labelTexture(title, subtitle = "", color = "#d7d7be", ink = "#273b41") {
  return canvasTexture(512, 192, (ctx, w, h) => {
    ctx.fillStyle = color; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = ink; ctx.lineWidth = 4; ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = ink;
    ctx.font = `bold ${subtitle ? 64 : 86}px Arial`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(title, w / 2, subtitle ? 72 : 99, w - 36);
    if (subtitle) {
      ctx.font = "23px monospace";
      ctx.fillText(subtitle, w / 2, 142, w - 30);
    }
  });
}

export function screenTexture() {
  return canvasTexture(1024, 640, (ctx, w, h) => {
    ctx.fillStyle = "#071b25"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#69d5d5"; ctx.font = "bold 30px monospace";
    ctx.fillText("ORBITAL ENVIRONMENT", 34, 49);
    ctx.fillStyle = "#347983"; ctx.font = "18px monospace";
    ctx.fillText("STATION 04 / LIVE TELEMETRY", 35, 80);
    ctx.strokeStyle = "#20434e"; ctx.lineWidth = 1;
    for (let x = 32; x < 690; x += 48) { ctx.beginPath(); ctx.moveTo(x, 112); ctx.lineTo(x, 490); ctx.stroke(); }
    for (let y = 114; y < 490; y += 40) { ctx.beginPath(); ctx.moveTo(32, y); ctx.lineTo(684, y); ctx.stroke(); }
    ctx.strokeStyle = "#65ded2"; ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 32; x < 684; x += 3) {
      const y = 293 + Math.sin(x * 0.024) * 60 + Math.sin(x * 0.071) * 18;
      x === 32 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "#5c91c7"; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 32; x < 684; x += 3) {
      const y = 363 + Math.sin(x * 0.016 + 2) * 38;
      x === 32 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    const readings = [["ALTITUDE", "408.2", "KM"], ["VELOCITY", "7.66", "KM/S"], ["O₂ CABIN", "20.9", "%"], ["PRESSURE", "101.3", "KPA"]];
    readings.forEach(([label, value, unit], i) => {
      const y = 143 + i * 91;
      ctx.fillStyle = "#5894a4"; ctx.font = "19px monospace"; ctx.fillText(label, 728, y);
      ctx.fillStyle = i === 2 ? "#e8d599" : "#a2ede1"; ctx.font = "bold 43px monospace"; ctx.fillText(value, 728, y + 43);
      ctx.fillStyle = "#569399"; ctx.font = "15px monospace"; ctx.fillText(unit, 921, y + 43);
    });
    ctx.fillStyle = "#12343d"; ctx.fillRect(32, 532, 960, 64);
    ctx.fillStyle = "#71d5ba"; ctx.font = "21px monospace";
    ctx.fillText("● SYSTEM NOMINAL", 49, 573);
    ctx.fillStyle = "#73a3aa"; ctx.fillText("ORBIT  2841   /   UTC  06:42:18", 476, 573);
    for (let y = 0; y < h; y += 4) { ctx.fillStyle = "rgba(0,0,0,.09)"; ctx.fillRect(0, y, w, 1); }
  });
}

export function paperTexture(kind = "manual") {
  return canvasTexture(512, 640, (ctx, w, h) => {
    ctx.fillStyle = "#e5ddc1"; ctx.fillRect(0, 0, w, h);
    speckle(ctx, w, h, 10000, 0.035);
    ctx.fillStyle = "#3c514e";
    ctx.font = "bold 26px monospace";
    ctx.fillText(kind === "manual" ? "ORBITAL SYSTEMS" : "SERVICE / REV. 04", 35, 57);
    ctx.font = "14px monospace";
    ctx.fillText(kind === "manual" ? "HABITAT OPERATIONS MANUAL" : "ENVIRONMENTAL CONTROL UNIT", 35, 85);
    ctx.strokeStyle = "#6f8175"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(34, 103); ctx.lineTo(478, 103); ctx.stroke();
    if (kind === "blueprint") {
      ctx.strokeStyle = "#547c82"; ctx.lineWidth = 3;
      ctx.strokeRect(75, 157, 352, 182); ctx.strokeRect(103, 185, 295, 126);
      for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(120 + i * 65, 250, 23, 0, Math.PI * 2); ctx.stroke(); }
      ctx.beginPath(); ctx.moveTo(35, 393); ctx.lineTo(475, 393); ctx.stroke();
      ctx.font = "14px monospace";
      ["1. INSPECT PANEL SEALS", "2. CHECK O₂ RETURN VALVE", "3. SECURE ALL FASTENERS", "4. RECORD PRESSURE"].forEach((s, i) => ctx.fillText(s, 42, 434 + i * 29));
    } else {
      ctx.font = "15px monospace";
      const lines = ["4.2  DAILY HABITAT CHECKS", "", "The environmental system maintains", "a stable atmosphere and temperature", "throughout each orbital period.", "", "Keep ventilation inlets clear of", "loose objects. Secure equipment", "before sleep or orbital maneuvers.", "", "O₂       20.9 %", "CO₂      0.04 %", "PRESSURE 101.3 kPa", "TEMP     22.0 C", "", "In case of pressure loss, close", "the inner hatch and contact", "ground control immediately.", "", "PROCEDURE 04-118 / PAGE 27"];
      lines.forEach((s, i) => ctx.fillText(s, 37, 143 + i * 24));
    }
    ctx.font = "13px monospace"; ctx.fillText("ESA · LOW EARTH ORBIT · 400 KM", 36, 606);
  });
}

export function photoTexture(index) {
  return canvasTexture(256, 300, (ctx, w, h) => {
    ctx.fillStyle = "#eee4cd"; ctx.fillRect(0, 0, w, h);
    const palettes = [["#9bb3b0", "#4e7276", "#d8b67d"], ["#bdaf91", "#7e937b", "#e6c596"], ["#708c9b", "#d1ac87", "#e9d2aa"]];
    const p = palettes[index % 3];
    ctx.fillStyle = p[0]; ctx.fillRect(14, 14, 228, 222);
    ctx.fillStyle = p[1]; ctx.beginPath(); ctx.moveTo(14, 168); ctx.lineTo(81, 94); ctx.lineTo(154, 174); ctx.lineTo(201, 113); ctx.lineTo(242, 176); ctx.lineTo(242, 236); ctx.lineTo(14, 236); ctx.fill();
    ctx.fillStyle = p[2]; ctx.beginPath(); ctx.arc(188, 60, 26, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 3; i++) {
      const x = 65 + i * 55, y = 174 + (i === 1 ? 9 : 0);
      ctx.fillStyle = i === 1 ? "#c48459" : "#394e51";
      ctx.beginPath(); ctx.arc(x, y - 27, i === 1 ? 13 : 17, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(x - 17, y - 9, 34, 55, 12); ctx.fill();
    }
    ctx.fillStyle = "#6f7463"; ctx.font = "italic 16px Georgia";
    ctx.textAlign = "center"; ctx.fillText(["home, whenever.", "summer / 2025", "see you soon"][index % 3], 128, 270);
    ctx.fillStyle = "#d4b36d"; ctx.globalAlpha = 0.7; ctx.fillRect(87, 0, 81, 20); ctx.globalAlpha = 1;
  });
}

export function noteTexture() {
  return canvasTexture(320, 320, (ctx, w, h) => {
    ctx.fillStyle = "#e7c978"; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(105,81,35,.16)"; ctx.fillRect(0, h - 10, w, 10);
    ctx.fillStyle = "#655441"; ctx.font = "italic 27px cursive";
    ["Don't forget", "to water the", "little basil!", "", "— home"].forEach((s, i) => ctx.fillText(s, 28, 64 + i * 45));
    ctx.strokeStyle = "#9b7350"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(33, 180); ctx.bezierCurveTo(80, 164, 122, 194, 172, 176); ctx.stroke();
  });
}
