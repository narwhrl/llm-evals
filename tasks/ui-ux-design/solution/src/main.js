// 准星之后 —— 一件关于观看的仪器。
// 三幕共享同一条“焦距”状态：第一幕的镜筒、第二幕的玻璃片、第三幕的磨边都读它。
// 画面全部由 canvas 程序化绘制，不加载任何外部资源。

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const state = {
  focus: 0.42,
  selected: 'quiet',
  bevel: 0.62,
  dpr: Math.min(window.devicePixelRatio || 1, 2),
};

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

function fitCanvas(canvas) {
  const dpr = state.dpr;
  const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 320;
  const h = canvas.clientHeight || w;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

// ---------------------------------------------------------------------------
// 第一幕：可调焦的玻璃
// ---------------------------------------------------------------------------

const lensCanvas = document.getElementById('lens');
const dial = document.querySelector('.dial');
const dialFill = document.querySelector('.dial-fill');
const dialKnob = document.querySelector('.dial-knob');
const readoutValue = document.getElementById('readout-value');
const readoutState = document.getElementById('readout-state');
const focusTitle = document.getElementById('focus-title');

// 镜筒里由近及远的四层景物，焦距靠近某一层时它才清楚。
const LAYERS = [
  { depth: 0.84, color: '#8d8776', radius: 0.5 },
  { depth: 0.66, color: '#6d7a6c', radius: 0.42 },
  { depth: 0.48, color: '#b5542f', radius: 0.34 },
  { depth: 0.26, color: '#2f5d63', radius: 0.26 },
];

let lensClock = 0;
let lensVisible = true;

function drawLens() {
  const { ctx: c, w: s } = fitCanvas(lensCanvas);
  const focus = state.focus;
  c.clearRect(0, 0, s, s);

  const bg = c.createLinearGradient(0, 0, s, s);
  bg.addColorStop(0, '#efe9dc');
  bg.addColorStop(0.55, '#d9d2c2');
  bg.addColorStop(1, '#b8b1a0');
  c.fillStyle = bg;
  c.fillRect(0, 0, s, s);

  for (const layer of LAYERS) {
    const sharp = clamp(1 - Math.abs(focus - layer.depth) * 3.2);
    const blur = (1 - sharp) * 18;
    const radius = s * layer.radius;
    const cx = s * 0.5 + Math.sin(layer.depth * 6.1) * s * 0.05;
    const cy = s * 0.5 + Math.cos(layer.depth * 4.7) * s * 0.05;

    c.filter = blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : 'none';
    c.strokeStyle = layer.color;
    c.globalAlpha = 0.28 + sharp * 0.58;
    c.lineWidth = lerp(9, 1.1, sharp);
    c.beginPath();
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    c.stroke();

    const count = 24;
    c.fillStyle = layer.color;
    for (let k = 0; k < count; k += 1) {
      const a = (k / count) * Math.PI * 2 + layer.depth * 2.2;
      c.globalAlpha = 0.05 + sharp * 0.5;
      c.beginPath();
      c.arc(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, lerp(3.2, 1, sharp), 0, Math.PI * 2);
      c.fill();
    }
  }
  c.filter = 'none';

  // 主体：一条缓慢摆动的弧线，代表“正在看的东西”。
  const sharpMain = clamp(1 - Math.abs(focus - 0.5) * 2.2);
  c.globalAlpha = 1;
  c.strokeStyle = '#16150f';
  c.lineWidth = lerp(5, 1.4, sharpMain);
  c.filter = sharpMain > 0.86 ? 'none' : `blur(${((1 - sharpMain) * 10).toFixed(2)}px)`;
  c.beginPath();
  const amp = s * 0.11;
  for (let x = 0; x <= s; x += 6) {
    const t = x / s;
    const y =
      s * 0.63 -
      Math.sin(t * Math.PI * 1.6 + lensClock * 0.5) * amp * (0.4 + t * 0.6) -
      Math.sin(t * Math.PI * 4 + 1.2) * amp * 0.16;
    if (x === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.stroke();
  c.filter = 'none';

  const shine = c.createLinearGradient(s * 0.1, 0, s * 0.5, s);
  shine.addColorStop(0, 'rgba(255,255,255,0.34)');
  shine.addColorStop(0.35, 'rgba(255,255,255,0.05)');
  shine.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = shine;
  c.fillRect(0, 0, s, s);

  c.strokeStyle = 'rgba(22,21,15,0.5)';
  c.lineWidth = 1;
  c.beginPath();
  c.arc(s / 2, s / 2, s * (0.46 - focus * 0.04), 0, Math.PI * 2);
  c.stroke();

  // 十字准星：越对准越细。
  c.strokeStyle = 'rgba(22,21,15,0.72)';
  c.lineWidth = lerp(2.2, 0.8, focus);
  c.beginPath();
  c.moveTo(s / 2, s * 0.05);
  c.lineTo(s / 2, s * 0.15);
  c.moveTo(s / 2, s * 0.85);
  c.lineTo(s / 2, s * 0.95);
  c.moveTo(s * 0.05, s / 2);
  c.lineTo(s * 0.15, s / 2);
  c.moveTo(s * 0.85, s / 2);
  c.lineTo(s * 0.95, s / 2);
  c.stroke();

  const grain = (1 - focus) * 0.5;
  if (grain > 0.02) {
    c.globalAlpha = grain * 0.4;
    c.fillStyle = '#3a362c';
    for (let i = 0; i < 90; i += 1) {
      const px = ((i * 97 + 13) % 100) / 100;
      const py = ((i * 61 + 37) % 100) / 100;
      c.fillRect(px * s, py * s, 1.4, 1.4);
    }
  }
  c.globalAlpha = 1;
}

function focusLabel() {
  if (state.focus > 0.9) return '对准了';
  if (state.focus > 0.62) return '接近清晰';
  if (state.focus < 0.2) return '完全虚焦';
  return '正在靠近';
}

function syncFocusUI() {
  const v = Math.round(state.focus * 100);
  const label = focusLabel();
  readoutValue.textContent = String(v);
  readoutState.textContent = label;
  dialFill.style.width = `${v}%`;
  dialKnob.style.left = `${v}%`;
  dial.setAttribute('aria-valuenow', String(v));
  dial.setAttribute('aria-valuetext', `焦距 ${v}，${label}`);
  // 标题里的两处高亮随焦距依次点亮：先“看得更多”，再“对准”。
  focusTitle.style.setProperty('--em-fill', String(smooth(clamp(state.focus * 1.15))));
  focusTitle
    .querySelectorAll('.em')[1]
    ?.style.setProperty('--em-fill', String(smooth(clamp((state.focus - 0.45) * 2))));
}

function setFocus(next, redraw = true) {
  const value = clamp(next);
  if (Math.abs(value - state.focus) < 0.0005) return;
  state.focus = value;
  syncFocusUI();
  if (redraw) drawLens();
}

let dialPointer = null;
const dialValue = (event) => {
  const rect = dial.getBoundingClientRect();
  return clamp((event.clientX - rect.left) / rect.width);
};

dial.addEventListener('pointerdown', (event) => {
  dialPointer = event.pointerId;
  dial.setPointerCapture(event.pointerId);
  setFocus(dialValue(event));
});

dial.addEventListener('pointermove', (event) => {
  if (dialPointer !== event.pointerId) return;
  setFocus(dialValue(event));
});

dial.addEventListener('pointerup', (event) => {
  if (dialPointer !== event.pointerId) return;
  dial.releasePointerCapture(event.pointerId);
  dialPointer = null;
});

dial.addEventListener('keydown', (event) => {
  const step = event.shiftKey ? 0.1 : 0.02;
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault();
    setFocus(state.focus + step);
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault();
    setFocus(state.focus - step);
  } else if (event.key === 'Home') {
    event.preventDefault();
    setFocus(0);
  } else if (event.key === 'End') {
    event.preventDefault();
    setFocus(1);
  }
});

let lensPointer = null;
lensCanvas.addEventListener('pointerdown', (event) => {
  lensPointer = event.pointerId;
  lensCanvas.setPointerCapture(event.pointerId);
});

lensCanvas.addEventListener('pointermove', (event) => {
  if (lensPointer !== event.pointerId) return;
  const rect = lensCanvas.getBoundingClientRect();
  const dy = (event.clientY - rect.top) / rect.height - 0.5;
  setFocus(state.focus - dy * 0.012);
});

lensCanvas.addEventListener('pointerup', (event) => {
  if (lensPointer !== event.pointerId) return;
  lensCanvas.releasePointerCapture(event.pointerId);
  lensPointer = null;
});

lensCanvas.addEventListener(
  'wheel',
  (event) => {
    event.preventDefault();
    setFocus(state.focus - event.deltaY * 0.0006);
  },
  { passive: false },
);

// 滚动即转动镜筒：整段第一幕的滚动进度映射到焦距。
const focusStage = document.getElementById('act-focus');
const scrollDriven = !reduceMotion.matches;
let manualUntil = 0;

function markManual() {
  manualUntil = performance.now() + 2600;
}

dial.addEventListener('pointerdown', markManual);
lensCanvas.addEventListener('pointerdown', markManual);
lensCanvas.addEventListener('wheel', markManual);
dial.addEventListener('keydown', markManual);

function stageProgress(el) {
  const rect = el.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  if (travel <= 0) return 0;
  return clamp(-rect.top / travel);
}

function onScroll() {
  if (!scrollDriven) return;
  if (performance.now() < manualUntil) return;
  const p = stageProgress(focusStage);
  setFocus(0.1 + p * 0.88, false);
}

window.addEventListener('scroll', onScroll, { passive: true });

// ---------------------------------------------------------------------------
// 第二幕：三块玻璃，只有一块保持清晰
// ---------------------------------------------------------------------------

const plates = [...document.querySelectorAll('.plate')];
const decideNote = document.getElementById('decide-note');
const decideStage = document.getElementById('act-decide');

const PLATE_COPY = {
  quiet: {
    note: '你选了「克制」。另外两条路没有消失，它们留在刻度上，等下一次。',
    fill: '#d7d1c2',
    mark: '#16150f',
    form: 'grid',
  },
  loud: {
    note: '你选了「冲击」。清晰此刻属于一次推力，其余都退到后面去。',
    fill: '#c2522f',
    mark: '#2a1409',
    form: 'burst',
  },
  warm: {
    note: '你选了「温度」。画面变得可以久坐，边界也软了一档。',
    fill: '#e8ddc8',
    mark: '#2f5d63',
    form: 'soft',
  },
};

const plateSharp = { quiet: 1, loud: 0, warm: 0 };
const plateTarget = { quiet: 1, loud: 0, warm: 0 };
const plateCanvases = new Map();
let plateClock = 0;
let platesVisible = false;

for (const plate of plates) {
  plateCanvases.set(plate.dataset.plate, plate.querySelector('.plate-canvas'));
}

function drawPlate(key, sharp) {
  const canvas = plateCanvases.get(key);
  if (!canvas) return;
  const { ctx, w, h } = fitCanvas(canvas);
  const conf = PLATE_COPY[key];
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = conf.fill;
  ctx.fillRect(0, 0, w, h);

  const blur = (1 - sharp) * 9;
  ctx.filter = blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : 'none';
  ctx.strokeStyle = conf.mark;
  ctx.lineWidth = lerp(6.5, 1.3, sharp);
  ctx.globalAlpha = 0.3 + sharp * 0.7;

  if (conf.form === 'grid') {
    const step = w / 9;
    for (let x = step; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.22, 0, Math.PI * 2);
    ctx.stroke();
  } else if (conf.form === 'burst') {
    const cx = w * 0.5;
    const cy = h * 0.5;
    for (let i = 0; i < 28; i += 1) {
      const a = (i / 28) * Math.PI * 2 + plateClock * 0.18;
      const r1 = Math.min(w, h) * (0.1 + (i % 3) * 0.03);
      const r2 = Math.min(w, h) * (0.36 + (i % 4) * 0.03);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }
  } else {
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.ellipse(
        w * (0.28 + i * 0.12),
        h * (0.5 + Math.sin(i * 1.4) * 0.14),
        w * 0.16,
        h * 0.2,
        Math.sin(i) * 0.5,
        0,
        Math.PI * 2,
      );
      ctx.stroke();
    }
  }
  ctx.filter = 'none';
  ctx.globalAlpha = 1;
}

function selectPlate(key) {
  state.selected = key;
  for (const plate of plates) {
    const active = plate.dataset.plate === key;
    plate.setAttribute('aria-pressed', String(active));
    plate.querySelector('.plate-state').textContent = active ? '清晰' : '模糊';
    plateTarget[plate.dataset.plate] = active ? 1 : 0;
  }
  decideNote.textContent = PLATE_COPY[key].note;
}

for (const plate of plates) {
  plate.addEventListener('click', () => selectPlate(plate.dataset.plate));
}

// 滚动经过第二幕时，未被选中的两块玻璃会再退一步，形成“判断之后”的余韵。
let decideBias = 0;

// ---------------------------------------------------------------------------
// 第三幕：带倒角的玻璃边沿
// ---------------------------------------------------------------------------

const edgeCanvas = document.getElementById('edge');
const bevelInput = document.getElementById('bevel');
const bevelOut = document.getElementById('bevel-out');
const edgeCaption = document.getElementById('edge-caption');
let edgeVisible = false;

function captionFor(v) {
  const p = Math.round(v * 100);
  if (v < 0.12) return `${p}% — 几乎没有磨边，边缘锋利，容易割手。`;
  if (v < 0.4) return `${p}% — 倒角刚开始，形状还很硬。`;
  if (v < 0.8) return `${p}% — 边缘足够柔和，握得住，也不失去形状。`;
  return `${p}% — 磨得过头了，边界开始失去轮廓。`;
}

function drawEdge() {
  const { ctx, w, h } = fitCanvas(edgeCanvas);
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#e6e0d2';
  ctx.fillRect(0, 0, w, h);

  const pad = Math.min(w, h) * 0.12;
  const r = Math.min(w, h) * 0.34 * state.bevel + 2;
  const x = pad;
  const y = pad;
  const ww = w - pad * 2;
  const hh = h - pad * 2;

  ctx.save();
  ctx.shadowColor = 'rgba(22,21,15,0.18)';
  ctx.shadowBlur = 22 + state.bevel * 20;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, x, y, ww, hh, r);
  ctx.fillStyle = 'rgba(207,216,211,0.9)';
  ctx.fill();
  ctx.restore();

  const grad = ctx.createLinearGradient(x, y, x + ww, y + hh);
  grad.addColorStop(0, 'rgba(240,247,243,0.96)');
  grad.addColorStop(0.5, 'rgba(196,212,206,0.92)');
  grad.addColorStop(1, 'rgba(160,180,175,0.95)');
  roundRect(ctx, x, y, ww, hh, r);
  ctx.fillStyle = grad;
  ctx.fill();

  const inset = Math.max(2, r * 0.16);
  roundRect(ctx, x + inset, y + inset, ww - inset * 2, hh - inset * 2, Math.max(1, r - inset));
  ctx.strokeStyle = `rgba(255,255,255,${0.25 + state.bevel * 0.55})`;
  ctx.lineWidth = Math.max(1, r * 0.06);
  ctx.stroke();

  roundRect(ctx, x, y, ww, hh, r);
  ctx.strokeStyle = 'rgba(22,21,15,0.55)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + ww * 0.1, y + hh * 0.72);
  ctx.lineTo(x + ww * 0.5, y + hh * 0.2);
  ctx.lineTo(x + ww * 0.62, y + hh * 0.34);
  ctx.strokeStyle = `rgba(255,255,255,${0.18 + state.bevel * 0.3})`;
  ctx.lineWidth = 2 + state.bevel * 3;
  ctx.stroke();

  const scaleY = h - pad * 0.35;
  ctx.beginPath();
  ctx.moveTo(x, scaleY);
  ctx.lineTo(x + ww, scaleY);
  ctx.strokeStyle = 'rgba(22,21,15,0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + ww * state.bevel, y);
  ctx.lineTo(x + ww * state.bevel, scaleY);
  ctx.strokeStyle = 'rgba(194,82,47,0.85)';
  ctx.stroke();
}

bevelInput.addEventListener('input', () => {
  state.bevel = clamp(Number(bevelInput.value) / 100);
  bevelOut.textContent = String(Math.round(state.bevel * 100));
  edgeCaption.textContent = captionFor(state.bevel);
  drawEdge();
});

// ---------------------------------------------------------------------------
// 可见性与主循环：只画视口里的那一幕
// ---------------------------------------------------------------------------

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const id = entry.target.id;
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
      if (id === 'act-focus') lensVisible = entry.isIntersecting;
      if (id === 'act-decide') platesVisible = entry.isIntersecting;
      if (id === 'act-margin') edgeVisible = entry.isIntersecting;
    }
  },
  { threshold: 0.05 },
);
for (const stage of document.querySelectorAll('.stage')) observer.observe(stage);

let last = performance.now();
function loop(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  const still = reduceMotion.matches;

  if (!still) {
    lensClock += dt;
    plateClock += dt;
  }

  if (lensVisible) {
    if (!still) {
      const p = stageProgress(focusStage);
      decideBias = lerp(decideBias, p > 0.9 ? 1 : 0, 0.08);
    }
    drawLens();
  }

  if (platesVisible) {
    const p = stageProgress(decideStage);
    const settled = p > 0.55 ? 1 : p / 0.55;
    for (const plate of plates) {
      const key = plate.dataset.plate;
      const target = lerp(plateTarget[key], plateTarget[key] ? 1 : 0.22, settled * 0.5);
      plateSharp[key] = lerp(plateSharp[key], target, still ? 1 : 0.09);
      drawPlate(key, plateSharp[key]);
    }
  }

  if (edgeVisible) drawEdge();

  requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  drawLens();
  for (const plate of plates) drawPlate(plate.dataset.plate, plateSharp[plate.dataset.plate]);
  drawEdge();
});

// ---------------------------------------------------------------------------
// 启动
// ---------------------------------------------------------------------------

syncFocusUI();
selectPlate('quiet');
drawLens();
for (const plate of plates) drawPlate(plate.dataset.plate, plateSharp[plate.dataset.plate]);
drawEdge();
bevelOut.textContent = String(Math.round(state.bevel * 100));
edgeCaption.textContent = captionFor(state.bevel);
onScroll();
requestAnimationFrame(loop);

window.__studio = { state, setFocus, selectPlate, stageProgress };
