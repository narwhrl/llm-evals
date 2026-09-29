import * as THREE from 'three';
import { P } from './palette.js';

// Shared construction kit: geometry cache, toon materials, inverted-hull
// outlines, primitive builders and runtime canvas textures.
//
// Everything in the diorama is static geometry, so every buffer here is
// created once at build time and reused by every part.

const gradientMap = (() => {
  const tex = new THREE.DataTexture(new Uint8Array([74, 168, 255]), 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
})();

const geoCache = new Map();
const outlineCache = new Map();
const boundsCache = new WeakMap();

export const OUTLINE_WIDTH = 0.024;

function cached(map, key, make) {
  let value = map.get(key);
  if (value === undefined) {
    value = make();
    map.set(key, value);
  }
  return value;
}

export const BOX = (w, h, d) => cached(geoCache, `b|${w}|${h}|${d}`, () => new THREE.BoxGeometry(w, h, d));
export const CYL = (rt, rb, h, seg = 12) =>
  cached(geoCache, `c|${rt}|${rb}|${h}|${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg));
export const PLANE = (w, h) => cached(geoCache, `p|${w}|${h}`, () => new THREE.PlaneGeometry(w, h));
export const CIRCLE = (r, seg = 28) => cached(geoCache, `d|${r}|${seg}`, () => new THREE.CircleGeometry(r, seg));
export const SPHERE = (r, seg = 12) =>
  cached(geoCache, `s|${r}|${seg}`, () => new THREE.SphereGeometry(r, seg, Math.max(4, seg >> 1)));
export const CONE = (r, h, seg = 12) => cached(geoCache, `k|${r}|${h}|${seg}`, () => new THREE.ConeGeometry(r, h, seg));
export const TORUS = (r, t, seg = 20) => cached(geoCache, `t|${r}|${t}|${seg}`, () => new THREE.TorusGeometry(r, t, 6, seg));

// ---------------------------------------------------------------- materials
//
// Materials are deliberately NOT shared. Callers routinely follow up with
// `mat.map = someTexture` (signage, posters, pavement), and a shared instance
// would silently alias every one of them onto a single material. Geometry
// caching below is safe because those buffers are never mutated.

/** Flat-shaded toon material. `emissive` drives the warm shop glow. */
export function toon(color, opts = {}) {
  const m = new THREE.MeshToonMaterial({
    color,
    gradientMap,
    transparent: (opts.opacity ?? 1) < 1,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
  const emissive = opts.emissive ?? 0x000000;
  if (emissive) {
    m.emissive = new THREE.Color(emissive);
    m.emissiveIntensity = opts.emissiveIntensity ?? 1;
  }
  return m;
}

/** Unlit material — used for anything that should read as a light source. */
export function flat(color, opts = {}) {
  const opacity = opts.opacity ?? 1;
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1 || (opts.transparent ?? false),
    opacity,
    side: opts.side ?? THREE.FrontSide,
    blending: opts.blending ?? THREE.NormalBlending,
    depthWrite: opts.depthWrite ?? true,
    fog: opts.fog ?? true,
  });
}

export function textured(map, opts = {}) {
  return new THREE.MeshBasicMaterial({
    map,
    transparent: opts.transparent ?? true,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
    blending: opts.blending ?? THREE.NormalBlending,
    depthWrite: opts.depthWrite ?? false,
    fog: opts.fog ?? true,
  });
}

function outlineMaterial(width) {
  return cached(outlineCache, String(width), () =>
    new THREE.MeshBasicMaterial({ color: P.outline, side: THREE.BackSide })
  );
}

// ------------------------------------------------------------------ outlines

function sizeOf(geometry) {
  let size = boundsCache.get(geometry);
  if (!size) {
    geometry.computeBoundingBox();
    const bb = geometry.boundingBox;
    size = new THREE.Vector3(
      Math.max(1e-4, bb.max.x - bb.min.x),
      Math.max(1e-4, bb.max.y - bb.min.y),
      Math.max(1e-4, bb.max.z - bb.min.z)
    );
    boundsCache.set(geometry, size);
  }
  return size;
}

/**
 * Inverted-hull outline with a constant world-space thickness, so line weight
 * stays even whether the prop is a 7-unit wall or a 0.2-unit shelf lip.
 * Skipped for slivers that are thinner than the line itself.
 */
function addOutline(parent, geometry, width, opts) {
  const size = sizeOf(geometry);
  const w = width ?? OUTLINE_WIDTH;
  if (Math.min(size.x, size.y, size.z) < w * 2.6) return;
  const shell = new THREE.Mesh(geometry, outlineMaterial(w));
  place(shell, opts);
  const s = opts.scale ?? [1, 1, 1];
  shell.scale.set(
    s[0] * ((size.x + w * 2) / size.x),
    s[1] * ((size.y + w * 2) / size.y),
    s[2] * ((size.z + w * 2) / size.z)
  );
  parent.add(shell);
}

// ---------------------------------------------------------------- primitives

function place(mesh, opts) {
  if (opts.rot) mesh.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
  if (opts.scale) mesh.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
  mesh.position.set(opts.pos ? opts.pos[0] : 0, opts.pos ? opts.pos[1] : 0, opts.pos ? opts.pos[2] : 0);
}

/**
 * Build a mesh, optionally wrapped in its outline shell.
 * `pos` is the centre of the geometry; `rot` is applied before the position.
 */
export function make(geometry, material, opts = {}) {
  const inner = new THREE.Mesh(geometry, material);
  if (opts.cast) inner.castShadow = true;
  if (opts.receive) inner.receiveShadow = true;
  place(inner, opts);

  if (opts.outline === false) return inner;

  const group = new THREE.Group();
  group.add(inner);
  addOutline(group, geometry, opts.outline, opts);
  return group;
}

/** Axis-aligned box given by its extents rather than its centre. */
export function slab(x0, x1, y0, y1, z0, z1, material, opts = {}) {
  const w = x1 - x0;
  const h = y1 - y0;
  const d = z1 - z0;
  return make(BOX(w, h, d), material, {
    ...opts,
    pos: [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2],
  });
}

/** Thin panel standing in the XY plane, facing +Z by default. */
export function panel(w, h, material, opts = {}) {
  return make(PLANE(w, h), material, opts);
}

export function tube(points, radius, material, opts = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(p[0], p[1], p[2])));
  const geo = new THREE.TubeGeometry(curve, opts.steps ?? 28, radius, opts.radial ?? 5, false);
  const m = new THREE.Mesh(geo, material);
  if (opts.cast) m.castShadow = true;
  return m;
}

// ------------------------------------------------------------------ textures

const JP_FONT = '"Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, "Noto Sans JP", sans-serif';

/** Draw into an offscreen canvas and wrap it as a texture. */
export function canvasTexture(w, h, draw, opts = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (opts.repeat) {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  return tex;
}

function fitText(ctx, text, maxWidth, startPx, family = JP_FONT, weight = '700') {
  let size = startPx;
  do {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 1;
  } while (size > 6);
  return size;
}

const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;

/** Horizontal konbini fascia: colour band, shop name, 24H badge. */
export function signTexture() {
  return canvasTexture(1024, 224, (ctx, w, h) => {
    ctx.fillStyle = hex(P.wall);
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = hex(P.trim);
    ctx.fillRect(0, 0, w, 74);
    ctx.fillStyle = hex(P.orange);
    ctx.fillRect(0, h - 74, w, 74);
    ctx.fillStyle = hex(P.trimDeep);
    ctx.fillRect(0, 74, w, 5);
    ctx.fillRect(0, h - 79, w, 5);

    ctx.fillStyle = hex(P.wall);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    fitText(ctx, 'ハローストア', 620, 104);
    ctx.fillText('ハローストア', 44, 122);

    // 24H badge
    ctx.fillStyle = hex(P.orange);
    ctx.beginPath();
    ctx.arc(870, 122, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '700 52px ' + JP_FONT;
    ctx.fillText('24', 848, 116);
    ctx.font = '700 30px ' + JP_FONT;
    ctx.fillText('OPEN', 890, 150);

    // coffee cup mark
    ctx.fillStyle = hex(P.trimDeep);
    ctx.fillRect(742, 86, 46, 70);
    ctx.fillStyle = hex(P.wall);
    ctx.fillRect(750, 96, 30, 14);
  });
}

/** Blade sign hanging perpendicular to the fascia. */
export function bladeTexture() {
  return canvasTexture(256, 512, (ctx, w, h) => {
    ctx.fillStyle = hex(P.wall);
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = hex(P.trim);
    ctx.fillRect(0, 0, w, 64);
    ctx.fillStyle = hex(P.orange);
    ctx.fillRect(0, h - 64, w, 64);
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = hex(P.trimDeep);
    ctx.font = '700 132px ' + JP_FONT;
    ctx.fillText('温', 0, -96);
    ctx.fillText('か', 0, 44);
    ctx.restore();
  });
}

/** Aisle category strips hung above the shelves. */
export function aisleTexture(label, color) {
  return canvasTexture(512, 96, (ctx, w, h) => {
    ctx.fillStyle = hex(color);
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 46px ' + JP_FONT;
    ctx.fillText(label, w / 2, h / 2 + 2);
  });
}

/** Backlit poster for the notice case and the shop windows. */
export function posterTexture(kind) {
  const palettes = {
    milk: [0x2f6f8f, 0x8fd0e8, '新しいミルク'],
    sale: [0xd8564a, 0xffb0a0, 'お買得'],
    coffee: [0x6b4a2f, 0xf0c58a, 'ホット珈琲'],
    bento: [0x59b96a, 0xbfe8a8, 'お弁当'],
  };
  const [bg, fg, text] = palettes[kind] ?? palettes.sale;
  return canvasTexture(384, 512, (ctx, w, h) => {
    ctx.fillStyle = hex(bg);
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = hex(fg);
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.36, 110, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = hex(bg);
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.36, 62, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '700 52px ' + JP_FONT;
    ctx.fillText(text, w / 2, h * 0.72);
    ctx.font = '600 26px ' + JP_FONT;
    ctx.fillText('HALLO STORE', w / 2, h * 0.82);
  });
}

/** Sidewalk paving. */
export function pavementTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = hex(P.sidewalk);
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(20,26,40,0.28)';
    ctx.lineWidth = 3;
    for (let i = 1; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo((w / 4) * i, 0);
      ctx.lineTo((w / 4) * i, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, (h / 4) * i);
      ctx.lineTo(w, (h / 4) * i);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, (h / 4) * i + 3);
      ctx.lineTo(w, (h / 4) * i + 3);
      ctx.stroke();
    }
  });
}

/** Road asphalt with a faint aggregate speckle. */
export function asphaltTexture() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = hex(P.asphalt);
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i += 1) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const v = Math.random();
      ctx.fillStyle = v > 0.5 ? 'rgba(150,170,200,0.07)' : 'rgba(8,12,22,0.16)';
      ctx.fillRect(x, y, 2, 2);
    }
  });
}

/** Drink rows seen through the fridge glass. */
export function fridgeTexture() {
  return canvasTexture(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#e8eef6';
    ctx.fillRect(0, 0, w, h);
    const rows = 4;
    const cols = 16;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const x = (w / cols) * c + 4;
        const y = (h / rows) * r + 8;
        const cw = w / cols - 8;
        const ch = h / rows - 18;
        ctx.fillStyle = hex(P.goods[(r * 5 + c * 3) % P.goods.length]);
        ctx.fillRect(x, y, cw, ch);
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillRect(x + 2, y + 3, cw - 4, ch * 0.22);
      }
      ctx.fillStyle = 'rgba(40,52,72,0.5)';
      ctx.fillRect(0, (h / rows) * (r + 1) - 6, w, 4);
    }
  });
}

/** Vertical runoff streaks for the storefront glass. */
export function runoffTexture() {
  return canvasTexture(256, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 46; i += 1) {
      const x = Math.random() * w;
      const len = 40 + Math.random() * 240;
      const y = Math.random() * h;
      const width = 1 + Math.random() * 3;
      const grad = ctx.createLinearGradient(0, y, 0, y + len);
      grad.addColorStop(0, 'rgba(226,240,255,0)');
      grad.addColorStop(0.4, 'rgba(226,240,255,0.55)');
      grad.addColorStop(1, 'rgba(226,240,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, width, len);
    }
    for (let i = 0; i < 130; i += 1) {
      ctx.fillStyle = `rgba(226,240,255,${0.08 + Math.random() * 0.22})`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 0.8 + Math.random() * 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

/** Soft vertical smear standing in for a reflection on wet ground. */
export function smearTexture(color) {
  return canvasTexture(128, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, hex(color));
    grad.addColorStop(0.35, `${hex(color)}88`);
    grad.addColorStop(1, `${hex(color)}00`);
    ctx.fillStyle = grad;
    for (let i = 0; i < 22; i += 1) {
      const x = Math.random() * w;
      const cw = 3 + Math.random() * 12;
      ctx.globalAlpha = 0.25 + Math.random() * 0.6;
      ctx.fillRect(x, 0, cw, h);
    }
    ctx.globalAlpha = 1;
  });
}

/** Soft round falloff, used for lamp pools and light spill. */
export function glowTexture(color) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    grad.addColorStop(0, hex(color));
    grad.addColorStop(0.45, `${hex(color)}66`);
    grad.addColorStop(1, `${hex(color)}00`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}
