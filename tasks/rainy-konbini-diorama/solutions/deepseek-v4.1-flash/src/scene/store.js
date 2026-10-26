import * as THREE from 'three';
import { canvasTexture, roundRect, rng } from '../core/textures.js';
import { toon, glow } from '../core/toon.js';
import { GEO, box, plane, group } from '../core/geometry.js';
import { STORE, WALK_Y, ALLEY } from './layout.js';

/**
 * The convenience store shell: walls, roof band, glass storefront, automatic
 * sliding door, awning, signage and the wet-glass shader that lets the warm
 * interior read through the rain.
 */

const SIGN_BLUE = '#2a6fbf';
const SIGN_GREEN = '#2f9e6a';
const SIGN_RED = '#d1453f';
const SIGN_ORANGE = '#e8862f';

/** The store's fascia sign band: white field, three colour stripes, katakana. */
function fasciaSignTexture() {
  const w = 2048;
  const h = 320;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#fbfaf6';
    ctx.fillRect(0, 0, w, h);

    // Colour stripes along the bottom of the band.
    const stripes = [SIGN_BLUE, SIGN_GREEN, SIGN_RED, SIGN_ORANGE];
    const stripeH = h * 0.11;
    const stripeW = w / stripes.length;
    stripes.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * stripeW, h - stripeH, stripeW, stripeH);
    });

    // Wordmark.
    ctx.fillStyle = SIGN_BLUE;
    ctx.font = `700 ${Math.round(h * 0.42)}px "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText('コンビニ', w * 0.055, h * 0.4);

    ctx.fillStyle = SIGN_GREEN;
    ctx.font = `700 ${Math.round(h * 0.2)}px "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`;
    ctx.fillText('まちかど店', w * 0.055 + h * 0.02, h * 0.71);

    // English subline on the right.
    ctx.textAlign = 'right';
    ctx.fillStyle = '#4a5a72';
    ctx.font = `600 ${Math.round(h * 0.16)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('OPEN 24 HOURS', w * 0.945, h * 0.32);

    ctx.fillStyle = SIGN_ORANGE;
    ctx.font = `700 ${Math.round(h * 0.15)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('KONBINI  ·  MACHIKADO', w * 0.945, h * 0.6);
    ctx.textAlign = 'left';
  });
}

/** Vertical projecting sign seen from the avenue. */
function bladeSignTexture() {
  const w = 256;
  const h = 768;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#fdfcf8';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = SIGN_BLUE;
    ctx.fillRect(0, 0, w, h * 0.055);

    const stripes = [SIGN_BLUE, SIGN_GREEN, SIGN_RED, SIGN_ORANGE];
    stripes.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * (w / 4), h * 0.945, w / 4, h * 0.055);
    });

    ctx.fillStyle = SIGN_BLUE;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const chars = ['コ', 'ン', 'ビ', 'ニ'];
    const startY = h * 0.14;
    const stepY = h * 0.19;
    ctx.font = `700 ${Math.round(w * 0.62)}px "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif`;
    chars.forEach((c, i) => ctx.fillText(c, w * 0.5, startY + i * stepY));

    ctx.fillStyle = SIGN_GREEN;
    ctx.font = `700 ${Math.round(w * 0.2)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('24H', w * 0.5, h * 0.9);
  });
}

/** Poster art for the store's window and the notice board. */
function posterTexture(kind) {
  const w = 320;
  const h = 448;
  return canvasTexture(w, h, (ctx) => {
    const random = rng(kind === 'oden' ? 11 : kind === 'coffee' ? 22 : 33);
    if (kind === 'oden') {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#3a2418');
      grad.addColorStop(1, '#1c1210');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#f0c26a';
      ctx.font = `700 ${Math.round(h * 0.13)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('おでん', w / 2, h * 0.19);
      ctx.fillStyle = '#e8dcc0';
      ctx.font = `600 ${Math.round(h * 0.06)}px "Hiragino Sans", sans-serif`;
      ctx.fillText('あったか〜い', w / 2, h * 0.28);
      // Steam and bowls.
      for (let i = 0; i < 4; i += 1) {
        const cx = w * (0.22 + i * 0.19);
        const cy = h * (0.56 + (i % 2) * 0.06);
        ctx.fillStyle = '#d8b878';
        ctx.beginPath();
        ctx.ellipse(cx, cy, w * 0.1, h * 0.035, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#8a5a34';
        ctx.beginPath();
        ctx.ellipse(cx, cy - h * 0.012, w * 0.072, h * 0.022, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(240,220,190,0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy - h * 0.05);
        ctx.quadraticCurveTo(cx + 12, cy - h * 0.11, cx - 4, cy - h * 0.16);
        ctx.stroke();
      }
      ctx.fillStyle = '#f0c26a';
      ctx.font = `700 ${Math.round(h * 0.085)}px "Helvetica Neue", Arial, sans-serif`;
      ctx.fillText('¥120', w / 2, h * 0.85);
    } else if (kind === 'coffee') {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#f6efe0');
      grad.addColorStop(1, '#e2d6c0');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#4a3020';
      ctx.font = `700 ${Math.round(h * 0.1)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('ホット', w / 2, h * 0.15);
      ctx.fillText('コーヒー', w / 2, h * 0.27);
      // Cup.
      ctx.fillStyle = '#fbf6ea';
      ctx.beginPath();
      ctx.moveTo(w * 0.28, h * 0.42);
      ctx.lineTo(w * 0.72, h * 0.42);
      ctx.lineTo(w * 0.65, h * 0.76);
      ctx.lineTo(w * 0.35, h * 0.76);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#c8783c';
      ctx.beginPath();
      ctx.ellipse(w / 2, h * 0.44, w * 0.21, h * 0.028, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(w * 0.38, h * 0.5);
      ctx.quadraticCurveTo(w * 0.5, h * 0.54, w * 0.62, h * 0.5);
      ctx.stroke();
      ctx.fillStyle = SIGN_ORANGE;
      ctx.font = `700 ${Math.round(h * 0.09)}px "Helvetica Neue", Arial, sans-serif`;
      ctx.fillText('¥100', w / 2, h * 0.88);
    } else {
      // Generic sale poster.
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#e8443f');
      grad.addColorStop(1, '#b8283a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#ffe8a0';
      ctx.beginPath();
      ctx.arc(w / 2, h * 0.4, w * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#b8283a';
      ctx.font = `800 ${Math.round(h * 0.16)}px "Hiragino Sans", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('半額', w / 2, h * 0.4);
      ctx.fillStyle = '#fff6e0';
      ctx.font = `700 ${Math.round(h * 0.09)}px "Hiragino Sans", sans-serif`;
      ctx.fillText('本日限り', w / 2, h * 0.7);
      ctx.font = `600 ${Math.round(h * 0.055)}px "Helvetica Neue", Arial, sans-serif`;
      ctx.fillText('TODAY ONLY', w / 2, h * 0.8);
    }

    // Paper edge wear.
    for (let i = 0; i < 120; i += 1) {
      ctx.fillStyle = `rgba(0,0,0,${0.03 + random() * 0.05})`;
      ctx.fillRect(random() * w, random() * h, 1 + random() * 3, 1 + random() * 3);
    }
  });
}

/** Night poster boards seen through the glass: fluorescent ceiling and shelving. */
function ceilingLightTexture() {
  const w = 128;
  const h = 128;
  return canvasTexture(w, h, (ctx) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w * 0.6);
    grad.addColorStop(0, '#fffaf0');
    grad.addColorStop(0.55, '#ffe9c0');
    grad.addColorStop(1, '#d8b884');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

/** Rain runoff streaks that animate down the glass. */
function glassRunoffTexture() {
  const w = 512;
  const h = 512;
  const tex = canvasTexture(w, h, (ctx) => {
    const random = rng(8821);
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < 74; i += 1) {
      const x = random() * w;
      const len = h * (0.08 + random() * 0.4);
      const y = random() * h;
      const grad = ctx.createLinearGradient(x, y, x, y + len);
      grad.addColorStop(0, 'rgba(226,240,255,0)');
      grad.addColorStop(0.35, `rgba(226,240,255,${0.1 + random() * 0.2})`);
      grad.addColorStop(1, 'rgba(226,240,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1 + random() * 2.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (random() - 0.5) * 6, y + len);
      ctx.stroke();
    }
    // Beaded droplets.
    for (let i = 0; i < 210; i += 1) {
      const x = random() * w;
      const y = random() * h;
      const r = 1 + random() * 2.6;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(240,250,255,0.55)');
      grad.addColorStop(1, 'rgba(200,225,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, { wrap: true });
  return tex;
}

/** Scrolling glass material: rain runs down and fades at the frame edges. */
function createGlassMaterial() {
  const runoff = glassRunoffTexture();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tRunoff: { value: runoff },
      uTime: { value: 0 },
      uTint: { value: new THREE.Color(0xbfe0ff) },
      uOpacity: { value: 0.2 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D tRunoff;
      uniform float uTime;
      uniform vec3 uTint;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        // Two offset scrolls so streaks never visibly loop in unison.
        vec2 uvA = vec2(uv.x * 1.6, uv.y * 1.1 - uTime * 0.085);
        vec2 uvB = vec2(uv.x * 2.3 + 0.37, uv.y * 0.8 - uTime * 0.052);
        float a = texture2D(tRunoff, uvA).a;
        float b = texture2D(tRunoff, uvB).a;
        float runoff = clamp(a * 0.85 + b * 0.65, 0.0, 1.0);

        // Fade the sheet where it meets the frame.
        // NOTE: smoothstep with edge0 > edge1 is undefined in GLSL; some drivers
        // return NaN, and a single NaN here is amplified by the bloom pass into a
        // fully black screen. Always write these as ascending ramps.
        float edge = smoothstep(0.0, 0.06, uv.x) * (1.0 - smoothstep(0.94, 1.0, uv.x));
        edge *= smoothstep(0.0, 0.04, uv.y) * (1.0 - smoothstep(0.9, 1.0, uv.y));

        // Broad glass sheen, brightest towards the top.
        float sheen = pow(max(1.0 - uv.y, 0.0), 1.6) * 0.13;

        float alpha = (runoff * 0.5 + sheen) * uOpacity * edge;
        gl_FragColor = vec4(uTint * (0.85 + runoff * 0.5), clamp(alpha, 0.0, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  material.userData.isGlass = true;
  return material;
}

/**
 * Builds the store shell and returns an update() driving the automatic door,
 * sign flicker and glass runoff.
 */
export function buildStore({ scene, materials, wetFactory, lighting }) {
  const root = new THREE.Group();
  root.name = 'store';
  scene.add(root);

  const wetMeshes = [];
  const width = STORE.xMax - STORE.xMin;
  const depth = STORE.zMax - STORE.zMin;
  const midX = (STORE.xMin + STORE.xMax) / 2;
  const midZ = (STORE.zMin + STORE.zMax) / 2;
  const wallH = STORE.wallTop - WALK_Y;

  // --- Structure ---------------------------------------------------------
  // Back and side walls (solid), leaving the south and west faces glazed.
  box(root, materials.wallWarm, [width, wallH, 0.16], [midX, WALK_Y + wallH / 2, STORE.zMin + 0.08]);
  box(root, materials.wallSide, [0.16, wallH, depth], [STORE.xMax - 0.08, WALK_Y + wallH / 2, midZ]);

  // Corner pilasters give the facade crisp anime edges.
  const pilasterW = 0.16;
  box(root, materials.trim, [pilasterW, wallH, pilasterW], [STORE.xMin + 0.08, WALK_Y + wallH / 2, STORE.zMin + 0.08]);
  box(root, materials.trim, [pilasterW, wallH, pilasterW], [STORE.xMax - 0.08, WALK_Y + wallH / 2, STORE.zMin + 0.08]);
  box(root, materials.trim, [pilasterW, wallH, pilasterW], [STORE.xMax - 0.08, WALK_Y + wallH / 2, STORE.zMax - 0.08]);

  // Interior floor, ceiling and inner back wall so the inside is enclosed.
  box(root, materials.interiorFloor, [width - 0.2, 0.06, depth - 0.2], [midX, WALK_Y + 0.03, midZ], { cast: false });
  box(root, materials.ceiling, [width - 0.2, 0.08, depth - 0.2], [midX, STORE.wallTop - 0.05, midZ], { cast: false });

  // --- Roof band and parapet ---------------------------------------------
  const roofY = STORE.wallTop;
  box(root, materials.roof, [width + 0.16, 0.12, depth + 0.16], [midX, roofY + 0.06, midZ]);
  // The parapet is a hollow rim: four thin walls around the roof deck. A solid
  // slab here would read as a bright blank lid from any elevated view.
  const rimH = STORE.parapetTop - roofY;
  const rimY = roofY + rimH / 2;
  const rimT = 0.1;
  box(root, materials.trim, [width + 0.3, rimH, rimT], [midX, rimY, STORE.zMax + 0.11]);
  box(root, materials.trim, [width + 0.3, rimH, rimT], [midX, rimY, STORE.zMin - 0.11]);
  box(root, materials.trim, [rimT, rimH, depth + 0.3], [STORE.xMin - 0.11, rimY, midZ]);
  box(root, materials.trim, [rimT, rimH, depth + 0.3], [STORE.xMax + 0.11, rimY, midZ]);
  // Dark cap strip along the very top of the rim.
  box(root, materials.trimDark, [width + 0.34, 0.04, rimT + 0.03], [midX, STORE.parapetTop, STORE.zMax + 0.11], { cast: false });
  box(root, materials.trimDark, [width + 0.34, 0.04, rimT + 0.03], [midX, STORE.parapetTop, STORE.zMin - 0.11], { cast: false });
  box(root, materials.trimDark, [rimT + 0.03, 0.04, depth + 0.34], [STORE.xMin - 0.11, STORE.parapetTop, midZ], { cast: false });
  box(root, materials.trimDark, [rimT + 0.03, 0.04, depth + 0.34], [STORE.xMax + 0.11, STORE.parapetTop, midZ], { cast: false });

  // Rooftop clutter: vent, small compressor and a satellite dish silhouette.
  box(root, materials.metalDark, [0.5, 0.34, 0.44], [STORE.xMax - 1.1, roofY + 0.31, STORE.zMin + 1.0]);
  box(root, materials.metal, [0.42, 0.06, 0.36], [STORE.xMax - 1.1, roofY + 0.5, STORE.zMin + 1.0]);
  box(root, materials.metalDark, [0.62, 0.42, 0.5], [STORE.xMin + 1.2, roofY + 0.35, STORE.zMin + 1.5]);
  for (let i = 0; i < 5; i += 1) {
    box(root, materials.metal, [0.58, 0.02, 0.44], [STORE.xMin + 1.2, roofY + 0.2 + i * 0.06, STORE.zMin + 1.5], { cast: false });
  }
  // Railing along the roof edge.
  const railMat = materials.metal;
  for (let i = 0; i <= 8; i += 1) {
    const x = STORE.xMin + 0.3 + (i / 8) * (width - 0.6);
    box(root, railMat, [0.03, 0.42, 0.03], [x, roofY + 0.35, STORE.zMin + 0.05], { cast: false });
  }
  box(root, railMat, [width - 0.6, 0.04, 0.04], [midX, roofY + 0.56, STORE.zMin + 0.05], { cast: false });

  // --- Fascia sign -------------------------------------------------------
  const fasciaTex = fasciaSignTexture();
  const fasciaMat = glow('fasciaSign', { color: 0xffffff, map: fasciaTex, transparent: false, opacity: 1 });
  const fasciaH = STORE.fasciaTop - STORE.fasciaBottom;
  const fasciaY = (STORE.fasciaBottom + STORE.fasciaTop) / 2;

  // Sign band on the south face. The plane must sit just proud of the backing
  // board (which spans zMax-0.06..zMax+0.10), otherwise the white board renders
  // in front of the artwork and the fascia reads as a blank lit strip.
  const fasciaSouth = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.1, fasciaH), fasciaMat);
  fasciaSouth.position.set(midX, fasciaY, STORE.zMax + 0.105);
  root.add(fasciaSouth);

  // Matching band on the west face, seen from the avenue.
  const fasciaWest = new THREE.Mesh(new THREE.PlaneGeometry(depth - 0.1, fasciaH), fasciaMat);
  fasciaWest.rotation.y = -Math.PI / 2;
  fasciaWest.position.set(STORE.xMin - 0.105, fasciaY, midZ);
  root.add(fasciaWest);

  // Backing board so the sign reads as a solid lit box, not a decal.
  box(root, materials.fascia, [width + 0.12, fasciaH + 0.06, 0.16], [midX, fasciaY, STORE.zMax + 0.02], { cast: false });
  box(root, materials.fascia, [0.16, fasciaH + 0.06, depth + 0.12], [STORE.xMin - 0.02, fasciaY, midZ], { cast: false });

  // --- Projecting blade sign --------------------------------------------
  const bladeTex = bladeSignTexture();
  const bladeMat = glow('bladeSign', { color: 0xffffff, map: bladeTex, transparent: false });
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.28, 0.46), materials.fascia);
  blade.position.set(STORE.xMin - 0.42, 3.62, STORE.zMax - 0.72);
  blade.castShadow = true;
  root.add(blade);

  const bladeFaceA = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 1.24), bladeMat);
  bladeFaceA.position.set(STORE.xMin - 0.42, 3.62, STORE.zMax - 0.72 + 0.235);
  root.add(bladeFaceA);

  const bladeFaceB = bladeFaceA.clone();
  bladeFaceB.rotation.y = Math.PI;
  bladeFaceB.position.z = STORE.zMax - 0.72 - 0.235;
  root.add(bladeFaceB);

  // Bracket.
  box(root, materials.metalDark, [0.5, 0.05, 0.05], [STORE.xMin - 0.24, 4.22, STORE.zMax - 0.72], { cast: false });

  // --- Awning ------------------------------------------------------------
  const awningY = 2.62;
  const awning = new THREE.Group();
  awning.position.set(midX, awningY, STORE.zMax);
  root.add(awning);

  // The awning is a deep, matte canopy: its top surface must stay dark against
  // the bright fascia above it, so it never blows out into a white slab.
  const awningSlab = new THREE.Mesh(new THREE.BoxGeometry(width - 0.05, 0.09, 0.86), materials.canopy);
  awningSlab.position.set(0, 0.02, 0.43);
  awningSlab.rotation.x = -0.12;
  awningSlab.castShadow = true;
  awningSlab.receiveShadow = true;
  awning.add(awningSlab);

  // Dark underside panel so the shaded face under the canopy stays readable.
  const awningUnder = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.1, 0.03, 0.8),
    toon('awningUnder', { color: 0x5a5e6c }),
  );
  awningUnder.position.set(0, -0.04, 0.43);
  awningUnder.rotation.x = -0.12;
  awning.add(awningUnder);

  // Awning lip: a modest trim edge, deliberately darker than the fascia.
  const awningLip = new THREE.Mesh(new THREE.BoxGeometry(width - 0.05, 0.12, 0.05), materials.trimDark);
  awningLip.position.set(0, -0.05, 0.86);
  awning.add(awningLip);

  // Support brackets.
  for (let i = 0; i < 5; i += 1) {
    const x = -width / 2 + 0.5 + (i / 4) * (width - 1);
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.72), materials.metalDark);
    bracket.position.set(x, 0.14, 0.38);
    bracket.rotation.x = -0.5;
    awning.add(bracket);
  }

  // --- Glass storefront --------------------------------------------------
  const glassMat = createGlassMaterial();
  const glassTop = STORE.glassTop;
  const glassBottom = STORE.glassBottom;
  const glassH = glassTop - glassBottom;

  // South glazing, split around the automatic door.
  const doorW = STORE.doorWidth;
  const doorX = STORE.doorCenterX;
  const leftGlassW = doorX - doorW / 2 - (STORE.xMin + 0.18);
  const rightGlassW = STORE.xMax - 0.18 - (doorX + doorW / 2);

  const glassPanels = [];
  const addGlass = (w, x, z, rotY) => {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, glassH), glassMat);
    pane.position.set(x, glassBottom + glassH / 2, z);
    pane.rotation.y = rotY;
    pane.renderOrder = 2;
    root.add(pane);
    glassPanels.push(pane);
    return pane;
  };

  addGlass(leftGlassW, STORE.xMin + 0.18 + leftGlassW / 2, STORE.zMax + 0.06, 0);
  addGlass(rightGlassW, doorX + doorW / 2 + rightGlassW / 2, STORE.zMax + 0.06, 0);

  // West glazing along the avenue.
  const westGlassW = depth - 0.36;
  addGlass(westGlassW, STORE.xMin - 0.06, midZ, -Math.PI / 2);

  // Mullions. Kept slim and mid-toned: at storefront viewing distance a heavy
  // dark bar reads as a black column across the interior rather than a frame.
  const mullionMat = materials.metal;
  const mullionCount = 4;
  for (let i = 0; i <= mullionCount; i += 1) {
    const x = STORE.xMin + 0.18 + (i / mullionCount) * leftGlassW;
    box(root, mullionMat, [0.035, glassH + 0.1, 0.06], [x, glassBottom + glassH / 2, STORE.zMax + 0.06], { cast: false });
  }
  for (let i = 0; i <= 3; i += 1) {
    const x = doorX + doorW / 2 + (i / 3) * rightGlassW;
    box(root, mullionMat, [0.035, glassH + 0.1, 0.06], [x, glassBottom + glassH / 2, STORE.zMax + 0.06], { cast: false });
  }
  for (let i = 0; i <= 5; i += 1) {
    const z = STORE.zMin + 0.18 + (i / 5) * westGlassW;
    box(root, mullionMat, [0.06, glassH + 0.1, 0.035], [STORE.xMin - 0.06, glassBottom + glassH / 2, z], { cast: false });
  }

  // Glass frame sill and head.
  box(root, mullionMat, [width - 0.2, 0.1, 0.1], [midX, glassBottom - 0.05, STORE.zMax + 0.06], { cast: false });
  box(root, mullionMat, [width - 0.2, 0.1, 0.1], [midX, glassTop + 0.05, STORE.zMax + 0.06], { cast: false });
  box(root, mullionMat, [0.1, 0.1, depth - 0.2], [STORE.xMin - 0.06, glassBottom - 0.05, midZ], { cast: false });
  box(root, mullionMat, [0.1, 0.1, depth - 0.2], [STORE.xMin - 0.06, glassTop + 0.05, midZ], { cast: false });

  // --- Automatic sliding door -------------------------------------------
  const doorGroup = new THREE.Group();
  doorGroup.position.set(doorX, glassBottom, STORE.zMax + 0.075);
  root.add(doorGroup);

  const doorPanelW = doorW / 2 + 0.05;
  const doorFrameMat = materials.trimDark;
  const doorGlassMat = createGlassMaterial();

  const makeDoorPanel = (dir) => {
    const panel = new THREE.Group();
    panel.position.set(dir * doorPanelW / 2, 0, 0);
    doorGroup.add(panel);

    const glass = new THREE.Mesh(new THREE.PlaneGeometry(doorPanelW - 0.1, glassH - 0.16), doorGlassMat);
    glass.position.set(0, (glassH - 0.16) / 2 + 0.08, 0);
    glass.renderOrder = 3;
    panel.add(glass);

    // Frame rails.
    box(panel, doorFrameMat, [0.06, glassH, 0.06], [-doorPanelW / 2 + 0.03, glassH / 2, 0], { cast: false });
    box(panel, doorFrameMat, [0.06, glassH, 0.06], [doorPanelW / 2 - 0.03, glassH / 2, 0], { cast: false });
    box(panel, doorFrameMat, [doorPanelW, 0.08, 0.06], [0, glassH - 0.04, 0], { cast: false });
    box(panel, doorFrameMat, [doorPanelW, 0.1, 0.06], [0, 0.05, 0], { cast: false });

    // Sticker strip typical of Japanese automatic doors.
    const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.1, glassH * 0.6), materials.plasticWhite);
    sticker.position.set(dir * (doorPanelW / 2 - 0.16), glassH * 0.5, 0.035);
    panel.add(sticker);

    return panel;
  };

  const doorLeft = makeDoorPanel(-1);
  const doorRight = makeDoorPanel(1);

  // Door head box and sensor.
  box(root, materials.trim, [doorW + 0.2, 0.22, 0.26], [doorX, glassTop + 0.16, STORE.zMax + 0.12], { cast: false });
  const sensor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.08), materials.metalDark);
  sensor.position.set(doorX, glassTop + 0.02, STORE.zMax + 0.26);
  root.add(sensor);

  // --- Entrance mat ------------------------------------------------------
  const matTexture = canvasTexture(256, 160, (ctx, w, h) => {
    ctx.fillStyle = '#3c4250';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(150,160,180,0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, w - 16, h - 16);
    for (let i = 0; i < 500; i += 1) {
      const v = 50 + Math.random() * 40;
      ctx.fillStyle = `rgba(${v},${v + 4},${v + 12},0.5)`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
  });
  const matMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(doorW * 0.92, 0.62),
    toon('entranceMat', { color: 0xffffff, map: matTexture }),
  );
  matMesh.rotation.x = -Math.PI / 2;
  matMesh.position.set(doorX, WALK_Y + 0.006, STORE.zMax + 0.42);
  matMesh.receiveShadow = true;
  root.add(matMesh);

  // --- Posters on the glass ---------------------------------------------
  // Small decals in the lower corner of each pane: large posters here would
  // hide the interior, which is the point of the glazing.
  const posterA = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.47), glow('posterOden', {
    color: 0xffffff, map: posterTexture('oden'), transparent: false, opacity: 1,
  }));
  posterA.position.set(STORE.xMin + 0.46, 1.02, STORE.zMax + 0.1);
  root.add(posterA);

  const posterB = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.45), glow('posterCoffee', {
    color: 0xffffff, map: posterTexture('coffee'), transparent: false, opacity: 1,
  }));
  posterB.position.set(STORE.xMax - 0.44, 1.04, STORE.zMax + 0.1);
  root.add(posterB);

  const posterC = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.42), glow('posterSale', {
    color: 0xffffff, map: posterTexture('sale'), transparent: false, opacity: 1,
  }));
  posterC.rotation.y = -Math.PI / 2;
  posterC.position.set(STORE.xMin - 0.1, 1.1, STORE.zMin + 1.7);
  root.add(posterC);

  // --- Interior ceiling light panels -------------------------------------
  const panelTex = ceilingLightTexture();
  const panelMat = glow('ceilingPanelTex', { color: 0xffffff, map: panelTex, transparent: false });
  const panelGeo = new THREE.PlaneGeometry(1.0, 0.34);
  const panelPositions = [
    [-0.9, -0.6], [0.9, -0.6],
    [-0.9, -2.0], [0.9, -2.0],
    [-0.9, -3.1], [0.9, -3.1],
  ];
  for (const [px, pz] of panelPositions) {
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.rotation.x = Math.PI / 2;
    panel.position.set(px + 0.2, STORE.wallTop - 0.1, pz);
    root.add(panel);
  }

  // --- Interior light spill onto the sidewalk ---------------------------
  // A soft additive card on the ground sells the warm light leaving the shop.
  // The gradient is fully transparent at every edge so the card never shows a
  // rectangular seam against the sidewalk.
  const spillTex = canvasTexture(256, 256, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w * 0.5);
    grad.addColorStop(0, 'rgba(255,216,156,0.62)');
    grad.addColorStop(0.35, 'rgba(255,208,146,0.32)');
    grad.addColorStop(0.7, 'rgba(255,200,136,0.1)');
    grad.addColorStop(1, 'rgba(255,196,130,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
  const spill = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 1.5, 3.2),
    glow('spillCard', {
      color: 0xffffff, map: spillTex, transparent: true, opacity: 0.42,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }),
  );
  spill.rotation.x = -Math.PI / 2;
  spill.position.set(midX, WALK_Y + 0.012, STORE.zMax + 1.1);
  spill.renderOrder = 1;
  root.add(spill);

  // Same effect on the avenue side.
  const spillWest = new THREE.Mesh(
    new THREE.PlaneGeometry(depth * 1.1, 2.9),
    spill.material,
  );
  spillWest.rotation.x = -Math.PI / 2;
  spillWest.rotation.z = Math.PI / 2;
  spillWest.position.set(STORE.xMin - 1.05, WALK_Y + 0.012, midZ);
  spillWest.renderOrder = 1;
  root.add(spillWest);

  // --- Alley side door ---------------------------------------------------
  const backDoor = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.95, 0.86), materials.metalDark);
  backDoor.position.set(STORE.xMax + 0.02, WALK_Y + 0.98, STORE.zMin + 1.1);
  backDoor.castShadow = true;
  root.add(backDoor);
  box(root, materials.metal, [0.05, 0.05, 0.12], [STORE.xMax + 0.06, WALK_Y + 1.0, STORE.zMin + 0.78], { cast: false });

  // --- Exterior AC unit on the alley wall -------------------------------
  const acGroup = group(root, [STORE.xMax + 0.18, WALK_Y + 0.42, STORE.zMin + 2.3]);
  box(acGroup, materials.plasticGrey, [0.42, 0.5, 0.72], [0, 0, 0]);
  box(acGroup, materials.metalDark, [0.04, 0.44, 0.64], [0.22, 0, 0], { cast: false });
  for (let i = 0; i < 7; i += 1) {
    box(acGroup, materials.metal, [0.03, 0.02, 0.6], [0.23, -0.18 + i * 0.06, 0], { cast: false });
  }
  // Fan circle on the face.
  const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.02, 16), materials.metalDark);
  fan.rotation.z = Math.PI / 2;
  fan.position.set(0.23, 0, 0);
  acGroup.add(fan);

  // --- Sign flicker ------------------------------------------------------
  const flickerTargets = [fasciaMat, bladeMat, panelMat];

  // --- Door animation ----------------------------------------------------
  const doorState = { open: 0, timer: 5.5, direction: 1 };

  function setDoor(open) {
    doorState.timer = open ? 7.5 : 0.4;
    doorState.direction = open ? 1 : -1;
  }

  const store = {
    root,
    wetMeshes,
    doorOpenAmount: 0,
    setDoor,
    update(dt, elapsed) {
      // Door cycles every so often: opens, holds, closes.
      doorState.timer -= dt;
      if (doorState.timer <= 0) {
        doorState.direction *= -1;
        doorState.timer = doorState.direction > 0 ? 6.5 + Math.random() * 4 : 5.0 + Math.random() * 3;
      }
      const target = doorState.direction > 0 ? 1 : 0;
      doorState.open += (target - doorState.open) * Math.min(1, dt * 2.6);
      const travel = doorState.open * (doorPanelW * 0.92);
      doorLeft.position.x = -doorPanelW / 2 - travel;
      doorRight.position.x = doorPanelW / 2 + travel;
      store.doorOpenAmount = doorState.open;

      glassMat.uniforms.uTime.value = elapsed;
      doorGlassMat.uniforms.uTime.value = elapsed;

      // Restrained signage flicker: the blade sign and one fascia dip briefly.
      const flicker = lighting.flicker ?? 1;
      const dip = flicker < 0.9 ? 0.62 + flicker * 0.4 : 1;
      fasciaMat.color.setScalar(0.92 * dip + 0.08);
      bladeMat.color.setScalar(0.9 * dip + 0.1);
      panelMat.color.setScalar(0.95 + 0.05 * Math.sin(elapsed * 1.7));
    },
  };

  return store;
}
