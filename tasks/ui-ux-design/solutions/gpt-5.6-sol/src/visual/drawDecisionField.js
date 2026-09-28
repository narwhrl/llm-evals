const TAU = Math.PI * 2;
const THREAD_COUNT = 38;
const THREAD_SEEDS = new Float32Array(THREAD_COUNT * 3);

for (let index = 0; index < THREAD_COUNT; index += 1) {
  THREAD_SEEDS[index * 3] = Math.sin(index * 91.73) * 0.5 + 0.5;
  THREAD_SEEDS[index * 3 + 1] = Math.sin(index * 47.11 + 2.7) * 0.5 + 0.5;
  THREAD_SEEDS[index * 3 + 2] = Math.sin(index * 13.37 + 5.1) * 0.5 + 0.5;
}

const clamp = (value, minimum = 0, maximum = 1) =>
  Math.min(maximum, Math.max(minimum, value));
const mix = (from, to, amount) => from + (to - from) * amount;
const smoothstep = (from, to, value) => {
  const amount = clamp((value - from) / (to - from));
  return amount * amount * (3 - 2 * amount);
};

function drawRegistrationCross(ctx, x, y, size, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.34, 0, TAU);
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.restore();
}

function drawPaperGrid(ctx, width, height, progress) {
  const spacing = Math.max(38, Math.min(width, height) * 0.075);
  const offset = (progress * spacing * 0.7) % spacing;

  ctx.save();
  ctx.strokeStyle = 'rgba(27, 25, 20, 0.075)';
  ctx.lineWidth = 1;
  ctx.setLineDash([1, spacing - 1]);

  for (let x = -spacing + offset; x < width + spacing; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = -spacing + offset * 0.6; y < height + spacing; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawDiscardedPaths(ctx, width, height, state, focusX, focusY, radius) {
  const reveal = state.reveal;
  if (reveal < 0.002) return;

  ctx.save();
  ctx.strokeStyle = '#d83925';
  ctx.lineWidth = 0.9;
  ctx.globalAlpha = reveal * 0.45;
  ctx.setLineDash([4, 7]);

  for (let index = 1; index < THREAD_COUNT; index += 3) {
    const t = index / (THREAD_COUNT - 1);
    const seed = THREAD_SEEDS[index * 3 + 1];
    const startY = height * (0.12 + t * 0.76);
    const alternateY = height * (0.16 + ((index * 7) % THREAD_COUNT) / THREAD_COUNT * 0.68);
    const direction = startY < focusY ? -1 : 1;
    const bendY = focusY + direction * radius * (1.1 + seed * 0.8);

    ctx.beginPath();
    ctx.moveTo(width * 0.06, startY);
    ctx.bezierCurveTo(
      focusX - radius * 2.4,
      startY + (seed - 0.5) * height * 0.2,
      focusX - radius * 0.8,
      bendY,
      focusX,
      bendY,
    );
    ctx.bezierCurveTo(
      focusX + radius * 0.9,
      bendY,
      width * 0.77,
      alternateY,
      width * 0.95,
      alternateY,
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawThreads(ctx, width, height, state, time, focusX, focusY, radius) {
  const listen = smoothstep(0.05, 0.35, state.progress);
  const pressure = smoothstep(0.24, 0.64, state.progress);
  const resolution = state.cut;
  const travel = Math.min(width, height);
  const rawAmplitude = travel * (0.045 + state.surprise * 0.09);
  const ambient = Math.sin(time * 0.00038) * travel * 0.006 * (1 - resolution);
  const outputCenter = height * (0.46 - (state.care - state.clarity) * 0.12);
  const outputSpan = height * (0.5 - state.clarity * 0.24);
  const signatureTwist = state.surprise * Math.PI * 1.6;

  ctx.save();
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#191713';

  for (let index = 0; index < THREAD_COUNT; index += 1) {
    const t = index / (THREAD_COUNT - 1);
    const centered = t * 2 - 1;
    const seedA = THREAD_SEEDS[index * 3];
    const seedB = THREAD_SEEDS[index * 3 + 1];
    const seedC = THREAD_SEEDS[index * 3 + 2];
    const startY =
      height * (0.11 + t * 0.78) +
      (seedA - 0.5) * rawAmplitude * (1 - listen * 0.72);
    const distance = (startY - focusY) / Math.max(radius, 1);
    const fieldStrength = Math.exp(-distance * distance * 0.46);
    const side = distance === 0 ? (index % 2 ? 1 : -1) : Math.sign(distance);
    const apertureY =
      startY +
      side * fieldStrength * radius * (0.46 + pressure * 0.98) +
      ambient * Math.sin(index * 0.71);
    const rawEndY =
      height * (0.14 + ((index * 11) % THREAD_COUNT) / THREAD_COUNT * 0.72) +
      Math.sin(time * 0.00024 + index) * rawAmplitude * 0.2;
    const signatureY =
      outputCenter +
      centered * outputSpan * (0.44 + state.care * 0.28) +
      Math.sin(centered * Math.PI * 1.35 + signatureTwist) *
        outputSpan *
        state.surprise *
        0.24;
    const endY = mix(rawEndY, signatureY, pressure * 0.64 + resolution * 0.36);
    const survivorSignal =
      Math.sin(index * 2.11 + state.clarity * 4.2 - state.surprise * 3.1) * 0.5 + 0.5;
    const survivor = smoothstep(0.27, 0.71, survivorSignal + state.care * 0.13);
    const alpha = mix(0.23 + seedC * 0.43, 0.08 + survivor * 0.88, resolution);
    const weight = mix(0.65 + seedB * 0.9, 0.8 + survivor * 1.35, resolution);

    ctx.globalAlpha = alpha;
    ctx.lineWidth = weight;
    ctx.beginPath();
    ctx.moveTo(width * 0.045, startY);
    ctx.bezierCurveTo(
      focusX - travel * (0.27 + seedA * 0.08),
      startY + (seedB - 0.5) * rawAmplitude * (1 - listen),
      focusX - radius * 0.9,
      apertureY,
      focusX,
      apertureY,
    );
    ctx.bezierCurveTo(
      focusX + radius * (0.72 + state.care * 0.34),
      apertureY,
      width * (0.72 + seedC * 0.08),
      endY,
      width * 0.955,
      endY,
    );
    ctx.stroke();
  }

  ctx.restore();
}

function drawDecisionAperture(ctx, width, height, state, focusX, focusY, radius) {
  const pressure = smoothstep(0.2, 0.66, state.progress);
  const turn = Math.max(smoothstep(0.57, 0.84, state.progress), state.cut);
  const ellipseX = radius * (1.05 + state.clarity * 0.46);
  const ellipseY = radius * (0.78 + state.care * 0.64);

  ctx.save();
  ctx.strokeStyle = '#d83925';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.2 + pressure * 0.62;
  ctx.setLineDash([2, 5]);
  ctx.beginPath();
  ctx.ellipse(focusX, focusY, ellipseX, ellipseY, state.surprise * 0.2 - 0.08, 0, TAU);
  ctx.stroke();
  ctx.setLineDash([]);

  const bladeX = mix(width * 0.12, width * 0.88, turn);
  const bladeTilt = height * (0.08 + state.surprise * 0.13);
  ctx.globalAlpha = 0.16 + turn * 0.84;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(bladeX - bladeTilt * 0.32, height * 0.08);
  ctx.lineTo(bladeX + bladeTilt * 0.32, height * 0.92);
  ctx.stroke();

  ctx.fillStyle = '#d83925';
  ctx.globalAlpha = 0.95;
  ctx.fillRect(bladeX - 3, height * 0.075, 6, 6);
  ctx.fillRect(bladeX - 3, height * 0.919, 6, 6);

  ctx.lineWidth = 1;
  drawRegistrationCross(ctx, focusX, focusY, radius * 0.22, 0.74);
  ctx.restore();
}

function drawResolvedMark(ctx, width, height, state, focusX, focusY, radius) {
  const resolution = state.cut;
  if (resolution < 0.002) return;

  const markWidth = radius * (1.2 + state.surprise * 0.65);
  const markHeight = radius * (1.55 + state.care * 0.5);

  ctx.save();
  ctx.globalAlpha = resolution;
  ctx.fillStyle = '#d83925';
  ctx.translate(focusX, focusY);
  ctx.rotate((state.surprise - state.clarity) * 0.22);
  ctx.fillRect(-markWidth * 0.5, -markHeight * 0.06, markWidth, markHeight * 0.12);
  ctx.fillRect(-markWidth * 0.06, -markHeight * 0.5, markWidth * 0.12, markHeight);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(0, 0, radius * (0.13 + state.clarity * 0.08), 0, TAU);
  ctx.fill();
  ctx.restore();
}

export function drawDecisionField(ctx, width, height, state, time) {
  if (width <= 0 || height <= 0) return;

  ctx.clearRect(0, 0, width, height);
  drawPaperGrid(ctx, width, height, state.progress);

  const focusX = width * (0.5 + (state.clarity - state.surprise) * 0.12);
  const focusY = height * (0.5 - (state.care - 0.33) * 0.2);
  const radius = Math.min(width, height) * (0.08 + state.care * 0.095);

  drawDiscardedPaths(ctx, width, height, state, focusX, focusY, radius);
  drawThreads(ctx, width, height, state, time, focusX, focusY, radius);
  drawDecisionAperture(ctx, width, height, state, focusX, focusY, radius);
  drawResolvedMark(ctx, width, height, state, focusX, focusY, radius);

  ctx.save();
  ctx.strokeStyle = 'rgba(25, 23, 19, 0.48)';
  ctx.lineWidth = 1;
  drawRegistrationCross(ctx, width * 0.055, height * 0.085, 7, 1);
  drawRegistrationCross(ctx, width * 0.945, height * 0.915, 7, 1);
  ctx.restore();
}
