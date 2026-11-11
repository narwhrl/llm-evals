import * as THREE from "three";

export const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const makeCanvas = (width = 512, height = 512) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const canvasTexture = (canvas, repeatX = 1, repeatY = 1) => {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.anisotropy = 8;
  return texture;
};

const grain = (ctx, width, height, seed, amount = 0.045, count = 24000) => {
  const random = mulberry32(seed);
  ctx.save();
  for (let i = 0; i < count; i += 1) {
    const alpha = random() * amount;
    ctx.fillStyle = random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
    ctx.fillRect(random() * width, random() * height, 1 + random() * 1.4, 1 + random() * 1.2);
  }
  ctx.restore();
};

const rounded = (ctx, x, y, w, h, r) => {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
};

export const woodTexture = ({
  base = "#8a5d38",
  dark = "#4d301c",
  light = "#c28d57",
  seed = 1,
  direction = "x",
  contrast = 1,
} = {}) => {
  const width = 768;
  const height = 512;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const along = direction === "x" ? width : height;
  const across = direction === "x" ? height : width;
  for (let i = 0; i < 260; i += 1) {
    const offset = random() * across;
    const wobble = 1 + random() * 5;
    ctx.beginPath();
    for (let x = -10; x <= along + 10; x += 16) {
      const y = offset + Math.sin(x * 0.014 + i * 0.17) * wobble + Math.sin(x * 0.043 + i) * 0.8;
      if (direction === "x") {
        if (x === -10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      } else {
        if (x === -10) ctx.moveTo(y, x);
        else ctx.lineTo(y, x);
      }
    }
    ctx.strokeStyle = random() > 0.45 ? dark : light;
    ctx.globalAlpha = (0.025 + random() * 0.09) * contrast;
    ctx.lineWidth = 0.45 + random() * 1.8;
    ctx.stroke();
  }

  for (let i = 0; i < 7; i += 1) {
    const x = random() * width;
    const y = random() * height;
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = 0.14 * contrast;
    for (let k = 0; k < 7; k += 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, 5 + k * 5, 2 + k * 1.9, random() * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = dark;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    ctx.restore();
  }

  const gradient = ctx.createLinearGradient(0, 0, direction === "x" ? 0 : width, direction === "x" ? height : 0);
  gradient.addColorStop(0, "rgba(255,255,255,0.06)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.09)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  grain(ctx, width, height, seed + 8, 0.03, 10000);
  return canvasTexture(canvas);
};

export const fabricTexture = ({
  base = "#526070",
  dark = "#36424f",
  light = "#7a8a99",
  seed = 3,
  weave = 0.05,
} = {}) => {
  const canvas = makeCanvas(512, 512);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 3) {
    ctx.strokeStyle = y % 6 === 0 ? light : dark;
    ctx.globalAlpha = 0.035 + random() * weave;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(512, y + 0.5);
    ctx.stroke();
  }
  for (let x = 0; x < 512; x += 3) {
    ctx.strokeStyle = x % 9 === 0 ? light : dark;
    ctx.globalAlpha = 0.02 + random() * weave * 0.7;
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, 512);
    ctx.stroke();
  }
  grain(ctx, 512, 512, seed + 13, 0.035, 13000);
  return canvasTexture(canvas);
};

export const plaidTexture = (base, accent, accent2, seed = 1) => {
  const canvas = makeCanvas(512, 512);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 512, 512);
  const bands = [
    [0, 58, accent, 0.42],
    [76, 20, accent2, 0.34],
    [176, 5, "#f0e7d4", 0.3],
    [252, 34, accent, 0.34],
    [340, 62, accent2, 0.2],
  ];
  for (let i = 0; i < 512; i += 2) {
    ctx.fillStyle = i % 4 === 0 ? "rgba(255,255,255,0.018)" : "rgba(0,0,0,0.018)";
    ctx.fillRect(0, i, 512, 1);
  }
  for (const [offset, thickness, color, alpha] of bands) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(offset, 0, thickness, 512);
    ctx.fillRect(0, offset, 512, thickness);
  }
  ctx.globalAlpha = 1;
  grain(ctx, 512, 512, seed + 4, 0.03, 10000);
  return canvasTexture(canvas);
};

export const plasterTexture = (base = "#d3c6b2", seed = 5, scratches = true) => {
  const canvas = makeCanvas(768, 512);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 768, 512);
  for (let i = 0; i < 220; i += 1) {
    const x = random() * 768;
    const y = random() * 512;
    const radius = 8 + random() * 60;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(0,0,0,${0.015 + random() * 0.025})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  if (scratches) {
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 8; i += 1) {
      ctx.strokeStyle = "#6a5945";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      const x = random() * 768;
      const y = random() * 512;
      ctx.moveTo(x, y);
      ctx.lineTo(x + 8 + random() * 30, y + 4 + random() * 18);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  grain(ctx, 768, 512, seed + 12, 0.045, 28000);
  return canvasTexture(canvas);
};

export const wallpaperTexture = (year) => {
  const canvas = makeCanvas(768, 512);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(101 + year);

  if (year === 2005) {
    ctx.fillStyle = "#d9d1c0";
    ctx.fillRect(0, 0, 768, 512);
    for (let x = 0; x < 768; x += 36) {
      ctx.fillStyle = "rgba(141, 165, 160, 0.18)";
      ctx.fillRect(x, 0, 8, 512);
    }
    for (let i = 0; i < 90; i += 1) {
      const x = random() * 768;
      const y = random() * 512;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(96, 133, 143, ${0.08 + random() * 0.1})`;
      ctx.beginPath();
      for (let k = 0; k < 10; k += 1) {
        const radius = k % 2 === 0 ? 3.2 : 1.3;
        const angle = (Math.PI * 2 * k) / 10;
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    const stain = ctx.createLinearGradient(0, 380, 0, 512);
    stain.addColorStop(0, "rgba(126, 101, 62, 0)");
    stain.addColorStop(1, "rgba(126, 101, 62, 0.13)");
    ctx.fillStyle = stain;
    ctx.fillRect(0, 380, 768, 132);
  } else if (year === 2010) {
    ctx.fillStyle = "#d7cfbe";
    ctx.fillRect(0, 0, 768, 512);
    for (let y = 0; y < 512; y += 14) {
      for (let x = 0; x < 768; x += 14) {
        ctx.fillStyle = `rgba(112, 99, 80, ${0.03 + random() * 0.04})`;
        ctx.fillRect(x + 4, y + 4, 1.2, 1.2);
      }
    }
    ctx.strokeStyle = "rgba(94, 76, 52, 0.12)";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(640, 380, 130, 0, Math.PI * 2);
    ctx.stroke();
  } else if (year === 2015) {
    ctx.fillStyle = "#9ba3a7";
    ctx.fillRect(0, 0, 768, 512);
    for (let i = 0; i < 130; i += 1) {
      ctx.globalAlpha = 0.025 + random() * 0.03;
      ctx.fillStyle = random() > 0.55 ? "#dbe0df" : "#5f6b70";
      ctx.fillRect(random() * 768, random() * 512, 20 + random() * 80, 2 + random() * 5);
    }
    ctx.globalAlpha = 1;
  } else if (year === 2020) {
    ctx.fillStyle = "#383735";
    ctx.fillRect(0, 0, 768, 512);
    for (let i = 0; i < 120; i += 1) {
      ctx.globalAlpha = 0.03 + random() * 0.035;
      ctx.fillStyle = random() > 0.5 ? "#665d52" : "#211f1c";
      ctx.fillRect(random() * 768, random() * 512, 16 + random() * 90, 1 + random() * 4);
    }
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = "#4a453d";
    ctx.fillRect(0, 0, 768, 512);
    for (let x = 0; x < 768; x += 6) {
      ctx.fillStyle = "rgba(255,235,203,0.024)";
      ctx.fillRect(x, 0, 1, 512);
    }
    for (let i = 0; i < 70; i += 1) {
      ctx.globalAlpha = 0.02 + random() * 0.03;
      ctx.fillStyle = random() > 0.5 ? "#796e5d" : "#2c2822";
      ctx.fillRect(random() * 768, random() * 512, 30 + random() * 120, 3 + random() * 7);
    }
    ctx.globalAlpha = 1;
  }
  grain(ctx, 768, 512, 200 + year, 0.025, 16000);
  return canvasTexture(canvas);
};

export const rugTexture = (year) => {
  const canvas = makeCanvas(1024, 640);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(300 + year);
  const fill = {
    2005: "#667d88",
    2010: "#8f7963",
    2015: "#4b504b",
    2020: "#8c5f44",
    2025: "#b7a88d",
  }[year];
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, 1024, 640);

  if (year === 2005) {
    ctx.strokeStyle = "rgba(230, 220, 197, 0.4)";
    ctx.lineWidth = 12;
    ctx.strokeRect(36, 36, 952, 568);
    ctx.strokeStyle = "rgba(47, 71, 89, 0.48)";
    ctx.lineWidth = 5;
    ctx.strokeRect(58, 58, 908, 524);
    for (let x = 100; x < 930; x += 90) {
      ctx.fillStyle = "rgba(222, 215, 193, 0.13)";
      ctx.fillRect(x, 80, 28, 480);
    }
  } else if (year === 2010) {
    for (let x = 0; x < 1024; x += 74) {
      ctx.fillStyle = x % 148 === 0 ? "rgba(54, 43, 32, 0.26)" : "rgba(233, 219, 193, 0.13)";
      ctx.fillRect(x, 0, 30, 640);
    }
    ctx.strokeStyle = "rgba(61, 46, 33, 0.36)";
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, 976, 592);
  } else if (year === 2015) {
    ctx.strokeStyle = "rgba(199, 214, 202, 0.18)";
    ctx.lineWidth = 2;
    for (let i = -640; i < 1024; i += 92) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 640, 640);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i + 640, 0);
      ctx.lineTo(i, 640);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(234, 224, 202, 0.1)";
    ctx.fillRect(40, 40, 944, 10);
    ctx.fillRect(40, 590, 944, 10);
  } else if (year === 2020) {
    for (let i = 0; i < 90; i += 1) {
      ctx.strokeStyle = random() > 0.5 ? "rgba(43, 31, 23, 0.25)" : "rgba(232, 197, 155, 0.18)";
      ctx.lineWidth = 1 + random() * 4;
      ctx.beginPath();
      const y = random() * 640;
      ctx.moveTo(20 + random() * 100, y);
      ctx.bezierCurveTo(300, y + random() * 30, 700, y - random() * 30, 980, y + random() * 16);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(46, 32, 22, 0.4)";
    ctx.lineWidth = 10;
    ctx.strokeRect(28, 28, 968, 584);
    ctx.strokeStyle = "rgba(232, 196, 154, 0.22)";
    ctx.lineWidth = 3;
    for (let ring = 0; ring < 3; ring += 1) {
      ctx.beginPath();
      ctx.ellipse(512, 320, 170 + ring * 80, 90 + ring * 54, 0.12, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "rgba(239, 230, 213, 0.1)";
    for (let i = 0; i < 55; i += 1) {
      const x = random() * 1024;
      const y = random() * 640;
      ctx.beginPath();
      ctx.arc(x, y, 18 + random() * 90, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(78, 63, 48, 0.26)";
    ctx.lineWidth = 3;
    ctx.strokeRect(42, 42, 940, 556);
    ctx.strokeStyle = "rgba(84, 67, 49, 0.17)";
    ctx.lineWidth = 6;
    ctx.strokeRect(66, 66, 892, 508);
    for (let i = 0; i < 5; i += 1) {
      const cx = 512 + (i - 2) * 146;
      ctx.save();
      ctx.translate(cx, 320);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = "rgba(92, 75, 56, 0.15)";
      ctx.lineWidth = 3;
      ctx.strokeRect(-42, -42, 84, 84);
      ctx.restore();
    }
  }
  grain(ctx, 1024, 640, 400 + year, 0.075, 38000);
  return canvasTexture(canvas);
};

export const skyTexture = (year) => {
  const canvas = makeCanvas(1024, 640);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(500 + year);
  const gradients = {
    2005: ["#7598a8", "#e8c7a2", "#6b6f62"],
    2010: ["#7294ab", "#efd1a7", "#8e7c64"],
    2015: ["#4c6178", "#d69364", "#554739"],
    2020: ["#111b2c", "#293b4b", "#17140f"],
    2025: ["#182531", "#4b5451", "#17130f"],
  }[year];
  const sky = ctx.createLinearGradient(0, 0, 0, 640);
  sky.addColorStop(0, gradients[0]);
  sky.addColorStop(0.58, gradients[1]);
  sky.addColorStop(1, gradients[2]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 1024, 640);

  const sunX = year === 2020 || year === 2025 ? 760 : 240;
  const sunY = year === 2015 ? 380 : 320;
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, year === 2020 || year === 2025 ? 70 : 280);
  glow.addColorStop(0, year === 2020 || year === 2025 ? "rgba(238,231,201,0.82)" : "rgba(255,232,190,0.9)");
  glow.addColorStop(0.18, year === 2020 || year === 2025 ? "rgba(219,224,208,0.3)" : "rgba(255,211,160,0.35)");
  glow.addColorStop(1, "rgba(255,200,140,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1024, 640);
  if (year === 2020 || year === 2025) {
    ctx.beginPath();
    ctx.arc(sunX, sunY, 26, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(244,240,215,0.8)";
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(sunX, sunY, 44, 0, Math.PI * 2);
    ctx.fillStyle = year === 2015 ? "rgba(255,217,166,0.88)" : "rgba(255,238,206,0.42)";
    ctx.fill();
  }

  ctx.fillStyle = year === 2020 || year === 2025 ? "rgba(16,19,21,0.7)" : "rgba(77,69,58,0.32)";
  for (let i = 0; i < 9; i += 1) {
    const x = i * 130 - 60 + random() * 50;
    const h = 100 + random() * 220;
    ctx.fillRect(x, 640 - h, 120 + random() * 70, h);
    if (year === 2020 || year === 2025) {
      for (let row = 0; row < 8; row += 1) {
        for (let col = 0; col < 5; col += 1) {
          if (random() > 0.63) {
            ctx.fillStyle = `rgba(255, 199, 117, ${0.3 + random() * 0.45})`;
            ctx.fillRect(x + 12 + col * 18, 640 - h + 16 + row * 23, 4, 5);
            ctx.fillStyle = "rgba(16,19,21,0.7)";
          }
        }
      }
    }
  }

  ctx.strokeStyle = year === 2020 || year === 2025 ? "rgba(11,14,14,0.65)" : "rgba(48,44,35,0.3)";
  ctx.lineWidth = 8;
  for (let i = 0; i < 5; i += 1) {
    const x = 40 + i * 240 + random() * 50;
    ctx.beginPath();
    ctx.moveTo(x, 640);
    ctx.bezierCurveTo(x + 30, 500, x - 20, 380, x + 45, 300);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 20, 500);
    ctx.lineTo(x - 25, 440);
    ctx.moveTo(x + 12, 440);
    ctx.lineTo(x + 80, 390);
    ctx.stroke();
    ctx.lineWidth = 8;
  }
  grain(ctx, 1024, 640, 600 + year, 0.028, 22000);
  return canvasTexture(canvas);
};

const paperNoise = (ctx, width, height, seed = 1) => {
  const random = mulberry32(seed);
  ctx.fillStyle = "#eee8da";
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < 3200; i += 1) {
    ctx.fillStyle = random() > 0.5 ? `rgba(91,73,49,${random() * 0.05})` : `rgba(255,255,255,${random() * 0.2})`;
    ctx.fillRect(random() * width, random() * height, 1, 1);
  }
};

export const posterTexture = (kind) => {
  const width = 560;
  const height = 760;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(kind.length * 97 + 4);
  if (kind === "space2005") {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#0b1e35");
    bg.addColorStop(1, "#081018");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 150; i += 1) {
      ctx.fillStyle = `rgba(176, 218, 255, ${0.25 + random() * 0.7})`;
      ctx.fillRect(random() * width, random() * height, random() > 0.85 ? 4 : 2, random() > 0.85 ? 4 : 2);
    }
    ctx.fillStyle = "#9ecbe4";
    ctx.fillRect(258, 310, 44, 26);
    ctx.fillStyle = "#d8eee8";
    ctx.fillRect(274, 292, 12, 18);
    ctx.fillStyle = "#6f9eb4";
    ctx.fillRect(238, 322, 22, 8);
    ctx.fillRect(300, 322, 22, 8);
    ctx.fillStyle = "#e5d7bb";
    ctx.font = '600 92px "Songti SC", "STSong", serif';
    ctx.textAlign = "center";
    ctx.fillText("星港", width / 2, 530);
    ctx.font = '300 24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.letterSpacing = "12px";
    ctx.fillText("远 征", width / 2, 578);
    ctx.fillStyle = "rgba(229,215,187,0.65)";
    ctx.fillRect(140, 620, 280, 1);
    ctx.font = '300 15px "SFMono-Regular", monospace';
    ctx.fillText("STARPORT / 2005", width / 2, 660);
    ctx.strokeStyle = "rgba(229,215,187,0.3)";
    ctx.lineWidth = 14;
    ctx.strokeRect(18, 18, width - 36, height - 36);
  } else if (kind === "space2010") {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, "#072338");
    bg.addColorStop(0.52, "#0b516d");
    bg.addColorStop(1, "#101b28");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, 300);
    ctx.rotate(-0.22);
    ctx.fillStyle = "#dffaff";
    ctx.beginPath();
    ctx.moveTo(-160, 0);
    ctx.lineTo(70, -22);
    ctx.lineTo(120, 0);
    ctx.lineTo(70, 22);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#65def5";
    ctx.fillRect(-150, -21, 240, 42);
    ctx.restore();
    ctx.font = '600 96px "Songti SC", "STSong", serif';
    ctx.textAlign = "center";
    ctx.fillStyle = "#d7fbff";
    ctx.fillText("星港 2", width / 2, 530);
    ctx.font = '300 34px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = "#7de8f7";
    ctx.fillText("逆 光", width / 2, 580);
    ctx.font = '300 14px "SFMono-Regular", monospace';
    ctx.fillStyle = "rgba(222,251,255,0.55)";
    ctx.fillText("THE SECOND VOYAGE / 2010", width / 2, 674);
    ctx.strokeStyle = "rgba(101,222,245,0.5)";
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, width - 52, height - 52);
  } else if (kind === "band") {
    ctx.fillStyle = "#262323";
    ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(280, 250, 0, 280, 250, 360);
    glow.addColorStop(0, "rgba(220,99,61,0.5)");
    glow.addColorStop(1, "rgba(220,99,61,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 4; i += 1) {
      const x = 120 + i * 100;
      ctx.fillStyle = "rgba(18,16,15,0.88)";
      ctx.beginPath();
      ctx.arc(x, 350, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x - 16, 370, 32, 120);
    }
    ctx.fillStyle = "#e8ddc8";
    ctx.textAlign = "center";
    ctx.font = '600 58px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText("夜班巴士", width / 2, 132);
    ctx.font = '300 17px "SFMono-Regular", monospace';
    ctx.fillStyle = "rgba(232,221,200,0.55)";
    ctx.fillText("NIGHT BUS / LIVE 2010", width / 2, 170);
    ctx.strokeStyle = "rgba(232,221,200,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, width - 64, height - 64);
  } else if (kind === "space2015") {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#071814");
    bg.addColorStop(0.55, "#163c36");
    bg.addColorStop(1, "#07100e");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(112, 233, 195, 0.12)";
    ctx.beginPath();
    ctx.moveTo(0, 560);
    ctx.bezierCurveTo(120, 440, 180, 520, 280, 470);
    ctx.bezierCurveTo(390, 420, 430, 500, 560, 430);
    ctx.lineTo(560, 760);
    ctx.lineTo(0, 760);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#7cf0c8";
    ctx.beginPath();
    ctx.arc(320, 300, 54, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(124,240,200,0.18)";
    ctx.beginPath();
    ctx.arc(320, 300, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = "#e6fff7";
    ctx.font = '600 56px "Songti SC", "STSong", serif';
    ctx.fillText("星港：边境", width / 2, 540);
    ctx.font = '300 17px "SFMono-Regular", monospace';
    ctx.fillStyle = "rgba(230,255,247,0.46)";
    ctx.fillText("BEYOND THE BORDER / 2015", width / 2, 580);
  } else if (kind === "photo") {
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, "#778b91");
    bg.addColorStop(0.5, "#b48f6e");
    bg.addColorStop(1, "#51463b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(36,31,25,0.45)";
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.bezierCurveTo(160, 520, 270, 620, 400, 530);
    ctx.bezierCurveTo(480, 470, 520, 580, 560, 520);
    ctx.lineTo(560, 760);
    ctx.lineTo(0, 760);
    ctx.fill();
    ctx.fillStyle = "rgba(249,240,218,0.72)";
    ctx.font = '300 20px "SFMono-Regular", monospace';
    ctx.textAlign = "right";
    ctx.fillText("2019 · 海边", width - 28, height - 28);
  } else {
    ctx.fillStyle = "#e7dfd0";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#534437";
    ctx.textAlign = "center";
    ctx.font = '600 54px "Songti SC", "STSong", serif';
    ctx.fillText(kind === "space2025" ? "星港" : "留白", width / 2, 380);
  }
  grain(ctx, width, height, 700 + kind.length, 0.05, 18000);
  return canvasTexture(canvas);
};

export const drawingTexture = () => {
  const width = 760;
  const height = 560;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(888);
  paperNoise(ctx, width, height, 34);
  ctx.fillStyle = "rgba(203, 186, 151, 0.35)";
  ctx.fillRect(0, 0, 38, 24);
  ctx.fillRect(width - 46, height - 30, 32, 22);
  ctx.globalAlpha = 0.3;
  ctx.fillRect(18, 16, 44, 12);
  ctx.globalAlpha = 1;

  const wobbleLine = (points, color, widthLine = 4, jitter = 1.5) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = widthLine;
    ctx.lineCap = "round";
    ctx.beginPath();
    points.forEach(([x, y], index) => {
      const jx = x + (random() - 0.5) * jitter;
      const jy = y + (random() - 0.5) * jitter;
      if (index === 0) ctx.moveTo(jx, jy);
      else ctx.lineTo(jx, jy);
    });
    ctx.stroke();
  };

  ctx.strokeStyle = "#6a95bb";
  ctx.fillStyle = "rgba(89, 135, 177, 0.2)";
  ctx.beginPath();
  ctx.arc(590, 386, 62, 0, Math.PI * 2);
  ctx.fill();
  wobbleLine(
    Array.from({ length: 30 }, (_, i) => {
      const a = (Math.PI * 2 * i) / 30;
      return [590 + Math.cos(a) * 62, 386 + Math.sin(a) * 62];
    }),
    "#5b83a7",
    3.2
  );
  for (let i = 0; i < 14; i += 1) {
    ctx.fillStyle = i % 2 ? "#d4a649" : "#7da3c0";
    const x = 70 + random() * 620;
    const y = 50 + random() * 350;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(random());
    ctx.beginPath();
    for (let k = 0; k < 8; k += 1) {
      const radius = k % 2 === 0 ? 9 : 3;
      const angle = (Math.PI * 2 * k) / 8;
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.translate(330, 410);
  ctx.fillStyle = "#bf7b43";
  ctx.beginPath();
  ctx.ellipse(0, 40, 76, 118, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#d79b62";
  ctx.beginPath();
  ctx.arc(0, -86, 66, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-42, -134);
  ctx.lineTo(-18, -168);
  ctx.lineTo(-2, -132);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(42, -134);
  ctx.lineTo(18, -168);
  ctx.lineTo(2, -132);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#3f6f92";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, -86, 52, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(158, 204, 228, 0.18)";
  ctx.beginPath();
  ctx.arc(0, -86, 52, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#462d1b";
  ctx.beginPath();
  ctx.arc(-22, -94, 6, 0, Math.PI * 2);
  ctx.arc(22, -94, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#462d1b";
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, -80, 12, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.strokeStyle = "rgba(70,45,27,0.7)";
  ctx.lineWidth = 2;
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(i * 26 - 10, -66);
    ctx.lineTo(i * 26 + 10, -76);
    ctx.stroke();
  }
  ctx.strokeStyle = "#d7e9ef";
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(-32, -148);
  ctx.lineTo(-62, -106);
  ctx.moveTo(32, -148);
  ctx.lineTo(62, -106);
  ctx.stroke();
  ctx.fillStyle = "#d7e9ef";
  ctx.fillRect(-58, -56, 116, 18);
  ctx.fillStyle = "#8d6235";
  ctx.beginPath();
  ctx.ellipse(80, 90, 42, 66, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#4f4338";
  ctx.textAlign = "left";
  ctx.font = '600 40px "Kaiti SC", "STKaiti", "Songti SC", serif';
  ctx.fillText("我的太空猫", 52, 88);
  ctx.font = '300 22px "Kaiti SC", "STKaiti", serif';
  ctx.fillText("2005 · 给未来的我", 55, 126);
  grain(ctx, width, height, 91, 0.03, 10000);
  return canvasTexture(canvas);
};

export const keyboardTexture = (year) => {
  const width = 1024;
  const height = 360;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const schemes = {
    2005: { body: "#c7beaa", key: "#d8d0be", edge: "#a29782", legend: "#7e715f", accent: "#b8aa90", rows: 6, cols: 20, pad: true },
    2010: { body: "#20201e", key: "#2d2d2a", edge: "#0d0d0c", legend: "#8c8b85", accent: "#43433e", rows: 6, cols: 20, pad: true },
    2015: { body: "#171716", key: "#252523", edge: "#050505", legend: "#c9d3d2", accent: "#374b4b", rows: 5, cols: 17, pad: false },
    2020: { body: "#e1dbcf", key: "#efe9dc", edge: "#b7ad9b", legend: "#6a6257", accent: "#c78154", rows: 5, cols: 16, pad: false },
    2025: { body: "#3a3a3a", key: "#4b4b49", edge: "#1e1e1e", legend: "#c8c3b9", accent: "#85745f", rows: 5, cols: 16, pad: false },
  };
  const scheme = schemes[year];
  ctx.fillStyle = scheme.body;
  ctx.fillRect(0, 0, width, height);
  const radius = year === 2005 ? 18 : 14;
  rounded(ctx, 10, 10, width - 20, height - 20, radius);
  ctx.fillStyle = scheme.body;
  ctx.fill();
  ctx.strokeStyle = scheme.edge;
  ctx.lineWidth = 4;
  ctx.stroke();
  const mainCols = scheme.pad ? 15 : scheme.cols;
  const mainRows = scheme.rows;
  const keyW = (width - 100) / mainCols;
  const keyH = (height - 82) / mainRows;
  for (let row = 0; row < mainRows; row += 1) {
    for (let col = 0; col < mainCols; col += 1) {
      const special = (row === 0 && col === 0) || (row === mainRows - 1 && (col === 0 || col === mainCols - 1));
      if (row === mainRows - 1 && col > 3 && col < mainCols - 3) {
        if (col === 4) {
          const wide = keyW * (mainCols - 10);
          rounded(ctx, 52 + col * keyW + 3, 42 + row * keyH + 3, wide, keyH - 6, year === 2005 ? 7 : 5);
          ctx.fillStyle = scheme.key;
          ctx.fill();
          ctx.strokeStyle = scheme.edge;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        continue;
      }
      if (special) {
        rounded(ctx, 52 + col * keyW + 3, 42 + row * keyH + 3, keyW * 1.24, keyH - 6, year === 2005 ? 7 : 5);
        ctx.fillStyle = scheme.accent;
        ctx.fill();
        ctx.strokeStyle = scheme.edge;
        ctx.lineWidth = 2;
        ctx.stroke();
        continue;
      }
      const offset = row === 1 || row === 2 ? keyW * 0.18 : 0;
      rounded(ctx, 52 + col * keyW + 3 + offset, 42 + row * keyH + 3, keyW - 6, keyH - 6, year === 2005 ? 6 : 4);
      ctx.fillStyle = scheme.key;
      ctx.fill();
      ctx.strokeStyle = scheme.edge;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = scheme.legend;
      ctx.globalAlpha = year <= 2010 ? 0.38 : 0.5;
      const label = row === 0 ? ["ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "DEL", "INS"][col] : "";
      if (label) {
        ctx.font = '500 10px "SFMono-Regular", monospace';
        ctx.textAlign = "center";
        ctx.fillText(label, 52 + col * keyW + 3 + offset + keyW / 2 - 3, 42 + row * keyH + 3 + keyH / 2 + 4);
      }
      ctx.globalAlpha = 1;
    }
  }
  if (scheme.pad) {
    const padX = 52 + mainCols * keyW + 18;
    for (let row = 1; row < mainRows; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const w = col === 0 ? keyW * 0.9 : keyW * 0.9;
        rounded(ctx, padX + col * (keyW * 0.9 + 4), 42 + row * keyH + 3, w, keyH - 6, 4);
        ctx.fillStyle = scheme.key;
        ctx.fill();
        ctx.strokeStyle = scheme.edge;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }
  if (year === 2020) {
    rounded(ctx, 52 + 3 * keyW + 4, 42 + 3 * keyH + 4, keyW - 8, keyH - 8, 4);
    ctx.fillStyle = scheme.accent;
    ctx.fill();
  }
  if (year === 2015) {
    ctx.fillStyle = "rgba(111, 242, 208, 0.38)";
    ctx.fillRect(20, height - 28, width - 40, 3);
  }
  return canvasTexture(canvas);
};

export const mousepadTexture = (year) => {
  const canvas = makeCanvas(800, 500);
  const ctx = canvas.getContext("2d");
  const palette = {
    2005: ["#8b9ca3", "#3f5560"],
    2010: ["#5e5e59", "#20201f"],
    2015: ["#1c2b2a", "#5bdcc0"],
    2020: ["#2b2428", "#bd8156"],
    2025: ["#292521", "#d1b184"],
  }[year];
  const gradient = ctx.createLinearGradient(0, 0, 800, 500);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(1, palette[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 500);
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 6;
  rounded(ctx, 8, 8, 784, 484, 24);
  ctx.stroke();
  ctx.globalAlpha = 0.15;
  for (let i = 0; i < 500; i += 1) {
    ctx.fillStyle = i % 2 ? "#fff" : "#000";
    ctx.fillRect((i * 83) % 800, (i * 47) % 500, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = year === 2005 ? "rgba(245,240,225,0.5)" : "rgba(255,240,216,0.5)";
  ctx.font = '500 26px "SFMono-Regular", monospace';
  ctx.textAlign = "center";
  ctx.fillText(year === 2005 ? "STARPORT" : "STARPORT / " + year, 400, 260);
  return canvasTexture(canvas);
};

export const contactShadowTexture = () => {
  const canvas = makeCanvas(256, 256);
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(128, 128, 4, 128, 128, 124);
  gradient.addColorStop(0, "rgba(0,0,0,0.5)");
  gradient.addColorStop(0.35, "rgba(0,0,0,0.28)");
  gradient.addColorStop(0.75, "rgba(0,0,0,0.07)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const glowTexture = (inner = "rgba(255,212,144,0.75)") => {
  const canvas = makeCanvas(128, 128);
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.22, "rgba(255,188,112,0.28)");
  gradient.addColorStop(1, "rgba(255,170,90,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

export const labelTexture = (text, background = "#e9dfca", color = "#514333") => {
  const canvas = makeCanvas(512, 128);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 512, 128);
  grain(ctx, 512, 128, text.length * 19, 0.05, 2000);
  ctx.strokeStyle = "rgba(80,65,47,0.3)";
  ctx.lineWidth = 3;
  ctx.strokeRect(8, 8, 496, 112);
  ctx.fillStyle = color;
  ctx.font = '500 44px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(text, 256, 80);
  return canvasTexture(canvas);
};

export const gameBoxTexture = (year) => {
  const canvas = makeCanvas(512, 640);
  const ctx = canvas.getContext("2d");
  const palettes = {
    2005: ["#0b1e35", "#e3d2ac", "#8fb6cf"],
    2010: ["#072338", "#d7fbff", "#65def5"],
    2015: ["#071814", "#e6fff7", "#7cf0c8"],
    2020: ["#0c0a10", "#ffd9b2", "#ffb36b"],
    2025: ["#0b0907", "#ffe4ba", "#d4a15f"],
  }[year];
  const gradient = ctx.createLinearGradient(0, 0, 0, 640);
  gradient.addColorStop(0, palettes[0]);
  gradient.addColorStop(1, "#080807");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 640);
  const random = mulberry32(77 + year);
  for (let i = 0; i < 90; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${0.1 + random() * 0.5})`;
    ctx.fillRect(random() * 512, random() * 430, 1.5, 1.5);
  }
  ctx.fillStyle = palettes[2];
  ctx.fillRect(220, 260, 72, 28);
  ctx.fillStyle = palettes[1];
  ctx.fillRect(242, 240, 28, 20);
  ctx.font = '600 54px "Songti SC", "STSong", serif';
  ctx.fillStyle = palettes[1];
  ctx.textAlign = "center";
  ctx.fillText(year === 2005 ? "星港" : "星港", 256, 390);
  ctx.font = '300 19px "PingFang SC", sans-serif';
  ctx.fillText(year === 2005 ? "远 征" : year === 2025 ? "二 十 年" : "边 境", 256, 430);
  ctx.font = '300 13px "SFMono-Regular", monospace';
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fillText(`STARPORT / ${year}`, 256, 585);
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, 488, 616);
  return canvasTexture(canvas);
};

export const cityPhotoTexture = (variant = 0) => {
  const canvas = makeCanvas(600, 420);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(900 + variant);
  const skies = [
    ["#7c939c", "#d8b28d", "#55483e"],
    ["#405b6d", "#cb8b62", "#241d1a"],
    ["#283c48", "#6e7b78", "#171411"],
  ][variant % 3];
  const gradient = ctx.createLinearGradient(0, 0, 0, 420);
  gradient.addColorStop(0, skies[0]);
  gradient.addColorStop(0.6, skies[1]);
  gradient.addColorStop(1, skies[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 600, 420);
  ctx.fillStyle = "rgba(35,30,25,0.55)";
  ctx.beginPath();
  ctx.moveTo(0, 300);
  for (let x = 0; x <= 600; x += 40) {
    ctx.lineTo(x, 220 + Math.sin(x * 0.02 + variant) * 35 + random() * 16);
  }
  ctx.lineTo(600, 420);
  ctx.lineTo(0, 420);
  ctx.fill();
  ctx.fillStyle = "rgba(245,233,207,0.6)";
  ctx.font = '300 16px "SFMono-Regular", monospace';
  ctx.textAlign = "right";
  ctx.fillText(`${2016 + variant} · ${["山", "海", "城"][variant % 3]}`, 560, 390);
  return canvasTexture(canvas);
};

export const heightChartTexture = () => {
  const width = 320;
  const height = 1100;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const random = mulberry32(6407);
  paperNoise(ctx, width, height, 55);
  ctx.fillStyle = "rgba(206, 192, 165, 0.4)";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(101, 85, 62, 0.3)";
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, width - 24, height - 24);
  ctx.fillStyle = "rgba(87, 71, 52, 0.6)";
  ctx.textAlign = "center";
  ctx.font = '500 24px "Kaiti SC", "STKaiti", "Songti SC", serif';
  ctx.fillText("我 长 高 了", width / 2, 58);
  const marks = [
    [2005, 106.7, "十岁"],
    [2007, 116.5, "十二岁"],
    [2009, 128.2, "十四岁"],
    [2011, 139.9, "十六岁"],
    [2013, 150.4, "十八岁"],
  ];
  for (let i = 0; i < marks.length; i += 1) {
    const [year, markHeight, label] = marks[i];
    const y = height - 90 - i * 148;
    ctx.strokeStyle = "rgba(82, 68, 52, 0.56)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(32, y);
    ctx.lineTo(205 + random() * 35, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(78, 63, 47, 0.62)";
    ctx.font = '400 16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(`${year}  ${markHeight}cm`, 44, y - 10);
    ctx.fillStyle = "rgba(78, 63, 47, 0.46)";
    ctx.font = '400 13px "Kaiti SC", "STKaiti", serif';
    ctx.fillText(label, 44, y + 21);
  }
  ctx.fillStyle = "rgba(84, 69, 50, 0.38)";
  ctx.font = '400 15px "Kaiti SC", "STKaiti", serif';
  ctx.fillText("下一次量身高：下次一定", 44, height - 76);
  grain(ctx, width, height, 78, 0.04, 12000);
  return canvasTexture(canvas);
};
