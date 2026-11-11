import * as THREE from "three";

export function seededRandom(seed = 1) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(width, height, paint, repeat = [1, 1]) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  paint(context, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createWoodTexture() {
  const random = seededRandom(23);

  return canvasTexture(
    1024,
    512,
    (context, width, height) => {
      const background = context.createLinearGradient(0, 0, 0, height);
      background.addColorStop(0, "#75472e");
      background.addColorStop(0.46, "#623a27");
      background.addColorStop(1, "#523120");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < 150; index += 1) {
        const y = random() * height;
        const amplitude = 2 + random() * 8;
        context.beginPath();
        context.moveTo(-10, y);
        for (let x = 0; x <= width + 20; x += 36) {
          const wave = Math.sin(x * 0.021 + index) * amplitude + (random() - 0.5) * 3;
          context.lineTo(x, y + wave);
        }
        context.strokeStyle =
          random() > 0.44
            ? `rgba(44, 21, 12, ${0.035 + random() * 0.09})`
            : `rgba(230, 176, 112, ${0.025 + random() * 0.055})`;
        context.lineWidth = 0.5 + random() * 2.1;
        context.stroke();
      }

      for (let index = 0; index < 7; index += 1) {
        const x = 90 + random() * (width - 180);
        const y = 40 + random() * (height - 80);
        const radiusX = 8 + random() * 28;
        const radiusY = 2.5 + random() * 7;
        context.strokeStyle = "rgba(36, 17, 10, 0.18)";
        context.lineWidth = 1.2;
        for (let ring = 0; ring < 3; ring += 1) {
          context.beginPath();
          context.ellipse(x, y, radiusX + ring * 5, radiusY + ring * 1.4, 0, 0, Math.PI * 2);
          context.stroke();
        }
      }

      const sheen = context.createLinearGradient(0, 0, width, 0);
      sheen.addColorStop(0, "rgba(255, 230, 190, 0.03)");
      sheen.addColorStop(0.5, "rgba(255, 230, 190, 0.1)");
      sheen.addColorStop(1, "rgba(255, 230, 190, 0.02)");
      context.fillStyle = sheen;
      context.fillRect(0, 0, width, height);
    },
    [1.6, 1],
  );
}

export function createGrassTexture() {
  const random = seededRandom(71);

  return canvasTexture(
    512,
    512,
    (context, width, height) => {
      context.fillStyle = "#71875a";
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < 28; index += 1) {
        const x = random() * width;
        const y = random() * height;
        const radius = 22 + random() * 85;
        const patch = context.createRadialGradient(x, y, 0, x, y, radius);
        patch.addColorStop(0, `rgba(153, 159, 102, ${0.08 + random() * 0.09})`);
        patch.addColorStop(1, "rgba(153, 159, 102, 0)");
        context.fillStyle = patch;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      for (let index = 0; index < 4300; index += 1) {
        const x = random() * width;
        const y = random() * height;
        const light = random() > 0.5;
        context.strokeStyle = light
          ? `rgba(181, 190, 124, ${0.08 + random() * 0.19})`
          : `rgba(56, 75, 46, ${0.08 + random() * 0.17})`;
        context.lineWidth = 0.55 + random() * 0.8;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (random() - 0.5) * 2.4, y - 1.4 - random() * 2.2);
        context.stroke();
      }
    },
    [6, 4],
  );
}

export function createBallastTexture() {
  const random = seededRandom(98);

  return canvasTexture(
    512,
    512,
    (context, width, height) => {
      context.fillStyle = "#8e877a";
      context.fillRect(0, 0, width, height);

      for (let index = 0; index < 4800; index += 1) {
        const x = random() * width;
        const y = random() * height;
        const size = 0.6 + random() * 2.4;
        const shade = 112 + Math.floor(random() * 68);
        context.fillStyle = `rgba(${shade}, ${shade - 5}, ${shade - 12}, ${0.35 + random() * 0.5})`;
        context.beginPath();
        context.ellipse(x, y, size, size * (0.55 + random() * 0.6), random() * Math.PI, 0, Math.PI * 2);
        context.fill();
      }
    },
    [4, 4],
  );
}

export function createCobbleTexture() {
  const random = seededRandom(203);

  return canvasTexture(
    512,
    512,
    (context, width, height) => {
      context.fillStyle = "#8d7e6b";
      context.fillRect(0, 0, width, height);
      const rowHeight = 34;

      for (let row = -1; row < height / rowHeight + 2; row += 1) {
        const y = row * rowHeight;
        const offset = row % 2 === 0 ? 0 : 22;
        for (let x = -60 + offset; x < width + 60; x += 45) {
          const stoneWidth = 35 + random() * 17;
          const stoneHeight = 24 + random() * 6;
          const shade = 144 + Math.floor(random() * 28);
          context.fillStyle = `rgb(${shade}, ${shade - 12}, ${shade - 25})`;
          context.beginPath();
          context.roundRect(
            x + random() * 3,
            y + random() * 3,
            stoneWidth,
            stoneHeight,
            5,
          );
          context.fill();
          context.strokeStyle = "rgba(83, 73, 60, 0.36)";
          context.lineWidth = 2;
          context.stroke();
          context.strokeStyle = "rgba(237, 218, 187, 0.14)";
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(x + 5, y + 5);
          context.lineTo(x + stoneWidth - 4, y + 6);
          context.stroke();
        }
      }
    },
    [2.5, 2.5],
  );
}

export function createRoofTexture(base = "terracotta") {
  const palette =
    base === "slate"
      ? { fill: "#4b5552", edge: "#2c3635", highlight: "#7f8b84" }
      : base === "moss"
        ? { fill: "#66715b", edge: "#3d493c", highlight: "#8e9a7e" }
        : { fill: "#a4583f", edge: "#663025", highlight: "#cc7b5a" };
  const random = seededRandom(base === "slate" ? 12 : base === "moss" ? 35 : 78);

  return canvasTexture(
    512,
    512,
    (context, width, height) => {
      context.fillStyle = palette.fill;
      context.fillRect(0, 0, width, height);
      const rowHeight = 34;
      const tileWidth = 38;

      for (let row = -1; row < height / rowHeight + 2; row += 1) {
        const y = row * rowHeight;
        for (let x = -tileWidth; x < width + tileWidth; x += tileWidth) {
          const offset = row % 2 === 0 ? 0 : tileWidth / 2;
          const vary = Math.floor((random() - 0.5) * 18);
          context.fillStyle = `rgba(255, 255, 255, ${0.02 + random() * 0.05})`;
          context.beginPath();
          context.roundRect(x + offset + 1, y + 2, tileWidth - 2, rowHeight - 4, 4);
          context.fill();
          context.strokeStyle = palette.edge;
          context.globalAlpha = 0.42;
          context.lineWidth = 2;
          context.beginPath();
          context.arc(x + offset + tileWidth / 2, y + rowHeight, tileWidth / 2, Math.PI, Math.PI * 2);
          context.stroke();
          context.globalAlpha = 1;
          context.strokeStyle = palette.highlight;
          context.lineWidth = 0.8;
          context.beginPath();
          context.moveTo(x + offset + 5 + vary * 0.04, y + 4);
          context.lineTo(x + offset + tileWidth - 6, y + 4);
          context.stroke();
        }
        context.strokeStyle = palette.edge;
        context.globalAlpha = 0.5;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
        context.globalAlpha = 1;
      }
    },
    [2, 2],
  );
}

export function createPlasterTexture(color = "#d9c8a8") {
  const random = seededRandom(319);

  return canvasTexture(
    256,
    256,
    (context, width, height) => {
      context.fillStyle = color;
      context.fillRect(0, 0, width, height);
      for (let index = 0; index < 2400; index += 1) {
        const shade = random() > 0.5 ? 255 : 54;
        context.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${0.008 + random() * 0.018})`;
        const radius = 0.4 + random() * 1.6;
        context.beginPath();
        context.arc(random() * width, random() * height, radius, 0, Math.PI * 2);
        context.fill();
      }
    },
    [2, 2],
  );
}

export function createStoneTexture() {
  const random = seededRandom(512);

  return canvasTexture(
    512,
    512,
    (context, width, height) => {
      context.fillStyle = "#92887a";
      context.fillRect(0, 0, width, height);
      const rowHeight = 42;

      for (let row = -1; row < height / rowHeight + 2; row += 1) {
        const y = row * rowHeight;
        const offset = row % 2 === 0 ? 0 : 45;
        for (let x = -80 + offset; x < width + 80; x += 88) {
          const blockWidth = 78 + random() * 18;
          const shade = 112 + Math.floor(random() * 36);
          context.fillStyle = `rgb(${shade + 18}, ${shade + 11}, ${shade})`;
          context.beginPath();
          context.roundRect(x + 2, y + 2, blockWidth, rowHeight - 4, 3);
          context.fill();
          context.strokeStyle = "rgba(54, 50, 44, 0.33)";
          context.lineWidth = 2;
          context.stroke();
          context.strokeStyle = "rgba(239, 225, 202, 0.15)";
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(x + 6, y + 6);
          context.lineTo(x + blockWidth - 4, y + 7);
          context.stroke();
        }
      }
    },
    [2, 2],
  );
}

export function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 244, 204, 1)");
  gradient.addColorStop(0.12, "rgba(255, 216, 137, 0.9)");
  gradient.addColorStop(0.42, "rgba(255, 188, 93, 0.24)");
  gradient.addColorStop(1, "rgba(255, 172, 68, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createSmokeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 96;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(48, 48, 6, 48, 48, 46);
  gradient.addColorStop(0, "rgba(248, 241, 224, 0.68)");
  gradient.addColorStop(0.42, "rgba(225, 218, 205, 0.32)");
  gradient.addColorStop(1, "rgba(211, 204, 192, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 96, 96);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createContactShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  context.translate(128, 128);
  context.scale(1, 0.72);
  const gradient = context.createRadialGradient(0, 0, 18, 0, 0, 124);
  gradient.addColorStop(0, "rgba(22, 18, 13, 0.38)");
  gradient.addColorStop(0.56, "rgba(22, 18, 13, 0.19)");
  gradient.addColorStop(1, "rgba(22, 18, 13, 0)");
  context.fillStyle = gradient;
  context.fillRect(-128, -178, 256, 356);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPlaqueTexture() {
  return canvasTexture(1024, 192, (context, width, height) => {
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#dab76f");
    gradient.addColorStop(0.5, "#b68a43");
    gradient.addColorStop(1, "#927034");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(77, 53, 23, 0.7)";
    context.lineWidth = 4;
    context.strokeRect(22, 22, width - 44, height - 44);
    context.strokeStyle = "rgba(255, 242, 193, 0.45)";
    context.lineWidth = 2;
    context.strokeRect(30, 30, width - 60, height - 60);

    context.fillStyle = "#4e3b20";
    context.textAlign = "center";
    context.font = "600 68px Georgia, serif";
    context.letterSpacing = "7px";
    context.fillText("WILLOW CREEK", width / 2, 104);
    context.font = "600 17px Arial, sans-serif";
    context.letterSpacing = "5px";
    context.fillText("TABLE RAILWAY  ·  Nº 07", width / 2, 143);
  });
}

export function createStationSignTexture() {
  return canvasTexture(512, 160, (context, width, height) => {
    context.fillStyle = "#2f493e";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#ead9b2";
    context.lineWidth = 5;
    context.strokeRect(16, 16, width - 32, height - 32);
    context.fillStyle = "#f1e6cc";
    context.textAlign = "center";
    context.font = "600 54px Georgia, serif";
    context.letterSpacing = "4px";
    context.fillText("WILLOW CREEK", width / 2, 94);
    context.font = "500 14px Arial, sans-serif";
    context.letterSpacing = "4px";
    context.fillText("JUNCTION", width / 2, 125);
  });
}

export function createClockTexture() {
  return canvasTexture(256, 256, (context, width, height) => {
    context.fillStyle = "#eee1c8";
    context.beginPath();
    context.arc(width / 2, height / 2, 118, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "#33453c";
    context.lineWidth = 10;
    context.stroke();
    context.fillStyle = "#33453c";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "600 20px Georgia, serif";
    for (let hour = 1; hour <= 12; hour += 1) {
      const angle = (hour / 12) * Math.PI * 2 - Math.PI / 2;
      context.fillText(
        String(hour),
        width / 2 + Math.cos(angle) * 86,
        height / 2 + Math.sin(angle) * 86,
      );
    }
    context.lineCap = "round";
    context.strokeStyle = "#273a31";
    context.lineWidth = 8;
    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.lineTo(width / 2 - 28, height / 2 - 40);
    context.stroke();
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.lineTo(width / 2 + 48, height / 2 - 22);
    context.stroke();
    context.fillStyle = "#8d5b39";
    context.beginPath();
    context.arc(width / 2, height / 2, 9, 0, Math.PI * 2);
    context.fill();
  });
}
