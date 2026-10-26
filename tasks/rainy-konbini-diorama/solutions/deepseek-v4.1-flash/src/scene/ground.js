import * as THREE from 'three';
import { canvasTexture, rng } from '../core/textures.js';
import { BASE_SIZE, BASE_HALF, BASE_TOP, BASE_EDGE, ROAD_Y, WALK_Y, AVENUE, SIDE_STREET, CROSSWALK, STORE, ALLEY } from './layout.js';

/**
 * Surface artwork. Each road/sidewalk texture packs colour in RGB and puddle
 * coverage in alpha so one wet shader can blend reflection strength per texel.
 */

function noiseOverlay(ctx, w, h, { count = 2400, alpha = 0.05, size = 1.6, random }) {
  for (let i = 0; i < count; i += 1) {
    const x = random() * w;
    const y = random() * h;
    const v = 120 + random() * 120;
    ctx.fillStyle = `rgba(${v},${v},${v},${alpha * (0.4 + random())})`;
    ctx.fillRect(x, y, size, size);
  }
}

function puddleBlobs(ctx, w, h, { count, minR, maxR, alpha, random }) {
  for (let i = 0; i < count; i += 1) {
    const x = random() * w;
    const y = random() * h;
    const r = minR + random() * (maxR - minR);
    const grad = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
    grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
    grad.addColorStop(0.62, `rgba(255,255,255,${alpha * 0.72})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.55 + random() * 0.5), random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Writes a puddle-coverage mask into the alpha channel.
 *
 * The mask has to live in alpha only: painting white blobs straight into the
 * colour channels would bake bright splotches into the asphalt albedo, which
 * reads as scattered snow rather than water. The mask is drawn on a scratch
 * canvas, then transferred channel-by-channel.
 */
function applyPuddleMask(ctx, w, h, drawMask) {
  const mask = document.createElement('canvas');
  mask.width = w;
  mask.height = h;
  const maskCtx = mask.getContext('2d');
  maskCtx.clearRect(0, 0, w, h);
  drawMask(maskCtx, w, h);

  const image = ctx.getImageData(0, 0, w, h);
  const maskImage = maskCtx.getImageData(0, 0, w, h);
  const data = image.data;
  const maskData = maskImage.data;
  for (let i = 3; i < data.length; i += 4) {
    data[i] = maskData[i];
  }
  ctx.putImageData(image, 0, 0);
}

/** Asphalt with lane paint, tar seams and puddle coverage in alpha. */
export function asphaltTexture() {
  const size = 1024;
  return canvasTexture(size, size, (ctx, w, h) => {
    const random = rng(9137);
    ctx.fillStyle = '#2b3140';
    ctx.fillRect(0, 0, w, h);

    // Coarse aggregate mottling.
    for (let i = 0; i < 9000; i += 1) {
      const x = random() * w;
      const y = random() * h;
      const v = random();
      const shade = v > 0.55 ? 60 + v * 40 : 28 + v * 22;
      ctx.fillStyle = `rgba(${shade},${shade + 4},${shade + 12},0.22)`;
      ctx.fillRect(x, y, 1 + random() * 2.2, 1 + random() * 2.2);
    }

    // Repaired tar seams.
    ctx.strokeStyle = 'rgba(16,19,26,0.55)';
    ctx.lineWidth = 5;
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      let x = random() * w;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < h) {
        y += 40 + random() * 60;
        x += (random() - 0.5) * 46;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Puddle coverage authored into alpha only.
    noiseOverlay(ctx, w, h, { count: 1600, alpha: 0.05, random });
    applyPuddleMask(ctx, w, h, (maskCtx) => {
      puddleBlobs(maskCtx, w, h, { count: 34, minR: 34, maxR: 132, alpha: 0.95, random: rng(9137) });
    });
  }, { anisotropy: 8 });
}

/** Pale concrete sidewalk slabs with expansion joints. */
export function sidewalkTexture() {
  const size = 1024;
  return canvasTexture(size, size, (ctx, w, h) => {
    const random = rng(4471);
    ctx.fillStyle = '#8d8f9c';
    ctx.fillRect(0, 0, w, h);

    const slabs = 4;
    const step = w / slabs;
    for (let i = 0; i < slabs; i += 1) {
      for (let j = 0; j < slabs; j += 1) {
        const tone = 132 + random() * 20;
        ctx.fillStyle = `rgba(${tone},${tone + 2},${tone + 12},0.5)`;
        ctx.fillRect(i * step + 3, j * step + 3, step - 6, step - 6);
      }
    }

    ctx.strokeStyle = 'rgba(48,50,60,0.55)';
    ctx.lineWidth = 4;
    for (let i = 0; i <= slabs; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, h);
      ctx.moveTo(0, i * step);
      ctx.lineTo(w, i * step);
      ctx.stroke();
    }

    noiseOverlay(ctx, w, h, { count: 5200, alpha: 0.07, random });
    applyPuddleMask(ctx, w, h, (maskCtx) => {
      puddleBlobs(maskCtx, w, h, { count: 26, minR: 22, maxR: 92, alpha: 0.72, random: rng(4471) });
    });
  }, { anisotropy: 8 });
}

/** Darker alley concrete, damp and stained. */
export function alleyTexture() {
  const size = 512;
  return canvasTexture(size, size, (ctx, w, h) => {
    const random = rng(2027);
    ctx.fillStyle = '#4a4e5c';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 2600; i += 1) {
      const v = 40 + random() * 46;
      ctx.fillStyle = `rgba(${v},${v + 3},${v + 10},0.35)`;
      ctx.fillRect(random() * w, random() * h, 1 + random() * 3, 1 + random() * 3);
    }
    // Damp streaks running towards the drain.
    for (let i = 0; i < 26; i += 1) {
      const x = random() * w;
      const grad = ctx.createLinearGradient(x, 0, x + 26, h);
      grad.addColorStop(0, 'rgba(120,130,150,0.16)');
      grad.addColorStop(1, 'rgba(30,34,44,0.30)');
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, 16 + random() * 44, h);
    }
    applyPuddleMask(ctx, w, h, (maskCtx) => {
      puddleBlobs(maskCtx, w, h, { count: 22, minR: 26, maxR: 88, alpha: 0.9, random: rng(2027) });
    });
  }, { anisotropy: 8 });
}

/** Plinth side artwork: stacked strata of a model base. */
export function plinthSideTexture() {
  const w = 512;
  const h = 160;
  return canvasTexture(w, h, (ctx) => {
    const random = rng(77);
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#3a3f52');
    grad.addColorStop(0.18, '#2b3040');
    grad.addColorStop(0.55, '#20242f');
    grad.addColorStop(1, '#12141c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Thin highlight line just under the top edge.
    ctx.fillStyle = 'rgba(150,170,210,0.28)';
    ctx.fillRect(0, 6, w, 2);

    for (let i = 0; i < 900; i += 1) {
      const v = 40 + random() * 40;
      ctx.fillStyle = `rgba(${v},${v + 4},${v + 14},0.2)`;
      ctx.fillRect(random() * w, random() * h, 2, 1 + random() * 2);
    }
  }, { anisotropy: 4 });
}

/** Painted road markings for the crosswalk, drawn straight into a plane texture. */
export function crosswalkTexture() {
  const w = 512;
  const h = 1024;
  return canvasTexture(w, h, (ctx) => {
    const random = rng(3355);
    ctx.clearRect(0, 0, w, h);
    const stripes = CROSSWALK.stripes;
    const gap = h / stripes;
    const barH = gap * 0.52;
    for (let i = 0; i < stripes; i += 1) {
      const y = i * gap + (gap - barH) / 2;
      ctx.fillStyle = 'rgba(226,230,240,0.92)';
      ctx.fillRect(w * 0.04, y, w * 0.92, barH);
      // Scuffed edges so the paint reads as worn.
      for (let k = 0; k < 130; k += 1) {
        ctx.clearRect(random() * w, y + random() * barH, 2 + random() * 7, 1 + random() * 3);
      }
    }
  }, { anisotropy: 8 });
}

/**
 * Lays the plinth, the two roads, the sidewalk and the alley floor.
 * Returns the wet meshes so the main loop can refresh their reflection matrix.
 */
export function buildGround({ scene, materials, wetFactory }) {
  const wetMeshes = [];
  const root = new THREE.Group();
  root.name = 'ground';
  scene.add(root);

  // --- Plinth -------------------------------------------------------------
  const plinthMat = materials.plinth;
  const sideTex = plinthSideTexture();
  const sideMat = new THREE.MeshToonMaterial({ map: sideTex, color: 0xffffff });
  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry(BASE_SIZE, BASE_TOP, BASE_SIZE),
    [sideMat, sideMat, plinthMat, sideMat, sideMat, sideMat],
  );
  plinth.position.set(0, BASE_TOP / 2, 0);
  plinth.receiveShadow = true;
  plinth.castShadow = true;
  root.add(plinth);

  // Slightly inset skirt so the base reads as a solid collectible block.
  const skirt = new THREE.Mesh(
    new THREE.BoxGeometry(BASE_SIZE + 0.06, 0.1, BASE_SIZE + 0.06),
    sideMat,
  );
  skirt.position.set(0, 0.05, 0);
  skirt.receiveShadow = true;
  root.add(skirt);

  // --- Roads --------------------------------------------------------------
  const roadW = AVENUE.xMax - AVENUE.xMin;
  const roadD = SIDE_STREET.zMax - SIDE_STREET.zMin;

  const avenueTex = asphaltTexture();
  avenueTex.wrapS = THREE.RepeatWrapping;
  avenueTex.wrapT = THREE.RepeatWrapping;
  avenueTex.repeat.set(1.1, 2.2);

  const avenueMat = wetFactory({
    surface: avenueTex,
    baseColor: 0xd6dcea,
    wet: 1,
    reflectStrength: 0.94,
    reflectionBlur: 0.0055,
    ripple: 0.006,
    puddleContrast: 1.35,
    tiling: [1.1, 2.2],
  });

  const avenue = new THREE.Mesh(new THREE.PlaneGeometry(roadW, BASE_SIZE - BASE_EDGE * 2), avenueMat);
  avenue.rotation.x = -Math.PI / 2;
  avenue.position.set((AVENUE.xMin + AVENUE.xMax) / 2, ROAD_Y, 0);
  avenue.receiveShadow = true;
  root.add(avenue);
  wetMeshes.push(avenue);

  const streetTex = asphaltTexture();
  streetTex.wrapS = THREE.RepeatWrapping;
  streetTex.wrapT = THREE.RepeatWrapping;
  streetTex.repeat.set(1.2, 0.62);

  const streetMat = wetFactory({
    surface: streetTex,
    baseColor: 0xd6dcea,
    wet: 1,
    reflectStrength: 0.92,
    reflectionBlur: 0.0055,
    ripple: 0.006,
    puddleContrast: 1.3,
    tiling: [1.2, 0.62],
  });

  const street = new THREE.Mesh(new THREE.PlaneGeometry(BASE_SIZE - BASE_EDGE * 2, roadD), streetMat);
  street.rotation.x = -Math.PI / 2;
  street.position.set(0, ROAD_Y + 0.001, (SIDE_STREET.zMin + SIDE_STREET.zMax) / 2);
  street.receiveShadow = true;
  root.add(street);
  wetMeshes.push(street);

  // --- Kerbs and sidewalk -------------------------------------------------
  const kerbMat = materials.kerb;
  const walkTex = sidewalkTexture();
  walkTex.wrapS = THREE.RepeatWrapping;
  walkTex.wrapT = THREE.RepeatWrapping;
  walkTex.repeat.set(1, 1);

  const walkMat = wetFactory({
    surface: walkTex,
    baseColor: 0xf2f4fa,
    wet: 0.82,
    reflectStrength: 0.55,
    reflectionBlur: 0.004,
    ripple: 0.003,
    puddleContrast: 1.1,
    tiling: [1, 1],
  });

  // West sidewalk strip along the avenue, in front of the store's west glass.
  const westWalkDepth = STORE.xMin - AVENUE.xMax;
  const westWalk = new THREE.Mesh(
    new THREE.PlaneGeometry(westWalkDepth, BASE_SIZE - BASE_EDGE * 2 - roadD),
    walkMat,
  );
  westWalk.rotation.x = -Math.PI / 2;
  westWalk.position.set(
    (AVENUE.xMax + STORE.xMin) / 2,
    WALK_Y,
    (AVENUE.zMin + SIDE_STREET.zMin) / 2,
  );
  westWalk.receiveShadow = true;
  root.add(westWalk);
  wetMeshes.push(westWalk);

  // South sidewalk strip in front of the storefront.
  const southWalk = new THREE.Mesh(
    new THREE.PlaneGeometry(BASE_SIZE - BASE_EDGE - STORE.xMin, STORE.zMax - SIDE_STREET.zMin + 0),
    walkMat,
  );
  southWalk.rotation.x = -Math.PI / 2;
  southWalk.position.set(
    (STORE.xMin + BASE_HALF - BASE_EDGE) / 2,
    WALK_Y + 0.001,
    (SIDE_STREET.zMin + STORE.zMax) / 2,
  );
  southWalk.receiveShadow = true;
  root.add(southWalk);
  wetMeshes.push(southWalk);

  // Walk slab thickness so the kerb reads as a step, not a decal.
  const walkSlab = new THREE.Mesh(
    new THREE.BoxGeometry(BASE_HALF - BASE_EDGE - STORE.xMin, KERB_HEIGHT, STORE.zMax - SIDE_STREET.zMin),
    materials.walkSide,
  );
  walkSlab.position.set(
    (STORE.xMin + BASE_HALF - BASE_EDGE) / 2,
    BASE_TOP + KERB_HEIGHT / 2,
    (SIDE_STREET.zMin + STORE.zMax) / 2,
  );
  walkSlab.receiveShadow = true;
  root.add(walkSlab);

  const walkSlabWest = new THREE.Mesh(
    new THREE.BoxGeometry(westWalkDepth, KERB_HEIGHT, BASE_SIZE - BASE_EDGE * 2 - roadD),
    materials.walkSide,
  );
  walkSlabWest.position.set(
    (AVENUE.xMax + STORE.xMin) / 2,
    BASE_TOP + KERB_HEIGHT / 2,
    (AVENUE.zMin + SIDE_STREET.zMin) / 2,
  );
  walkSlabWest.receiveShadow = true;
  root.add(walkSlabWest);

  // Kerb noses along both road edges.
  const kerbNorthSouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.09, KERB_HEIGHT + 0.02, BASE_SIZE - BASE_EDGE * 2 - roadD),
    kerbMat,
  );
  kerbNorthSouth.position.set(AVENUE.xMax + 0.045, BASE_TOP + KERB_HEIGHT / 2, (AVENUE.zMin + SIDE_STREET.zMin) / 2);
  kerbNorthSouth.receiveShadow = true;
  root.add(kerbNorthSouth);

  const kerbEastWest = new THREE.Mesh(
    new THREE.BoxGeometry(BASE_HALF - BASE_EDGE - STORE.xMin, KERB_HEIGHT + 0.02, 0.09),
    kerbMat,
  );
  kerbEastWest.position.set(
    (STORE.xMin + BASE_HALF - BASE_EDGE) / 2,
    BASE_TOP + KERB_HEIGHT / 2,
    SIDE_STREET.zMin - 0.045,
  );
  kerbEastWest.receiveShadow = true;
  root.add(kerbEastWest);

  // --- Crosswalk ----------------------------------------------------------
  const cwTex = crosswalkTexture();
  const cwMat = new THREE.MeshBasicMaterial({
    map: cwTex,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const crosswalk = new THREE.Mesh(
    new THREE.PlaneGeometry(CROSSWALK.xMax - CROSSWALK.xMin, CROSSWALK.zMax - CROSSWALK.zMin),
    cwMat,
  );
  crosswalk.rotation.x = -Math.PI / 2;
  crosswalk.position.set(
    (CROSSWALK.xMin + CROSSWALK.xMax) / 2,
    ROAD_Y + 0.006,
    (CROSSWALK.zMin + CROSSWALK.zMax) / 2,
  );
  root.add(crosswalk);

  // --- Alley floor --------------------------------------------------------
  const alleyTex = alleyTexture();
  alleyTex.wrapS = THREE.RepeatWrapping;
  alleyTex.wrapT = THREE.RepeatWrapping;
  const alleyMat = wetFactory({
    surface: alleyTex,
    baseColor: 0xb8c0d4,
    wet: 0.7,
    reflectStrength: 0.34,
    reflectionBlur: 0.003,
    ripple: 0.002,
    puddleContrast: 1,
    tiling: [1, 1],
  });
  const alleyFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(ALLEY.xMax - ALLEY.xMin, ALLEY.zMax - ALLEY.zMin),
    alleyMat,
  );
  alleyFloor.rotation.x = -Math.PI / 2;
  alleyFloor.position.set(
    (ALLEY.xMin + ALLEY.xMax) / 2,
    ALLEY.floorY,
    (ALLEY.zMin + ALLEY.zMax) / 2,
  );
  alleyFloor.receiveShadow = true;
  root.add(alleyFloor);
  wetMeshes.push(alleyFloor);

  // --- Drainage -----------------------------------------------------------
  buildDrainage(root, materials);

  return { root, wetMeshes };
}

const KERB_HEIGHT = WALK_Y - BASE_TOP;

function buildDrainage(root, materials) {
  const grate = materials.drainGrate;
  // Long channel drain hugging the kerb of the side street.
  const channel = new THREE.Mesh(
    new THREE.BoxGeometry(BASE_HALF - BASE_EDGE - STORE.xMin - 0.3, 0.02, 0.2),
    grate,
  );
  channel.position.set(
    (STORE.xMin + BASE_HALF - BASE_EDGE) / 2,
    ROAD_Y + 0.004,
    SIDE_STREET.zMin + 0.16,
  );
  channel.receiveShadow = true;
  root.add(channel);

  // Square gully at the junction corner.
  const gully = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.42), grate);
  gully.position.set(AVENUE.xMax + 0.32, ROAD_Y + 0.005, SIDE_STREET.zMin + 0.42);
  root.add(gully);

  // Manhole cover on the avenue.
  const manhole = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.02, 20), materials.manhole);
  manhole.position.set(AVENUE.xMin + 1.1, ROAD_Y + 0.005, -1.4);
  manhole.receiveShadow = true;
  root.add(manhole);
}

export { KERB_HEIGHT };
