/** 纸纹：开局生成一次噪声布纹，作为整页的纸面。 */

export function createPaperGrain(size = 220, seed = 7): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 确定性伪随机，保证每次生成同一张纸
  let s = seed >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };

  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = rand();
    const shade = v < 0.5 ? 0 : 255;
    img.data[i] = shade;
    img.data[i + 1] = shade;
    img.data[i + 2] = shade;
    img.data[i + 3] = v < 0.5 ? 6 + v * 14 : 4 + v * 8;
  }
  ctx.putImageData(img, 0, 0);

  // 纤维：细短的斜向发丝
  ctx.strokeStyle = 'rgba(120, 100, 60, 0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const len = 6 + rand() * 22;
    const ang = (rand() - 0.5) * 0.7 + (rand() > 0.5 ? 0.5 : -2.6);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.stroke();
  }

  return canvas.toDataURL('image/png');
}
