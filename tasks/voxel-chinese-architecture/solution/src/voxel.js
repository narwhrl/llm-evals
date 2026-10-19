import * as THREE from 'three';

/* Voxel engine — every block is a unit cube instanced per colour. Buildings are
 * composed from a small vocabulary of parts (platform, columns, walls,
 * dougong brackets, flying-eave roofs). Coordinates are in voxel units. */

export const PAL = {
  stone:  0x9a958c,   // 台基/铺装灰石
  stoneD: 0x7a756c,   // 暗石
  red:    0x9a2f22,   // 红墙/柱
  redD:   0x7c2418,   // 暗红
  wood:   0x6b4a2f,   // 木色
  woodD:  0x4e3320,
  gold:   0xc9912f,   // 琉璃瓦(黄)
  goldD:  0xa87a24,
  teal:   0x2f6f5f,   // 青瓦/绿琉璃
  tealD:  0x245448,
  white:  0xd9d2c4,   // 汉白玉
  green:  0x4a7a3a,   // 草
  greenD: 0x3a5f2e,
  lampRed:0xd8442a,   // 灯笼
  window: 0x2a2018,   // 窗棂/暗
};

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3(1, 1, 1);
const _p = new THREE.Vector3();

export class VoxelWorld {
  constructor(scene) {
    this.scene = scene;
    this.batches = new Map(); // color -> Matrix4[]
  }
  add(color, x, y, z) {
    _p.set(x, y, z); _q.identity(); _s.set(1, 1, 1);
    _m.compose(_p, _q, _s);
    if (!this.batches.has(color)) this.batches.set(color, []);
    this.batches.get(color).push(_m.clone());
  }
  // fill an axis-aligned box [x0..x1] inclusive
  fill(color, x0, y0, z0, x1, y1, z1) {
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++)
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++)
        for (let z = Math.min(z0, z1); z <= Math.max(z0, z1); z++)
          this.add(color, x, y, z);
  }
  build() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    let total = 0;
    for (const [color, mats] of this.batches) {
      const inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0.02 }), mats.length);
      mats.forEach((m, i) => inst.setMatrixAt(i, m));
      inst.instanceMatrix.needsUpdate = true;
      inst.castShadow = true; inst.receiveShadow = true;
      this.scene.add(inst);
      total += mats.length;
    }
    return total;
  }
}

/* ---------------- building parts ------------------------------------ */

// raised stone platform with steps on the front (-z)
export function platform(v, x, y, z, w2, d, steps = 3) {
  v.fill(PAL.stone, x - Math.floor(w2 / 2), y, z - Math.floor(d / 2), x + Math.floor(w2 / 2), y + 1, z + Math.floor(d / 2));
  // front steps descending toward -z
  for (let s = 0; s < steps; s++)
    v.fill(PAL.white, x - Math.floor(w2 / 2) + s, y - s, z - Math.floor(d / 2) - 1 - s, x + Math.floor(w2 / 2) - s, y - s, z - Math.floor(d / 2) - 1 - s);
}

// a row of columns
export function columns(v, x0, x1, y, z, step, color = PAL.red) {
  for (let x = x0; x <= x1; x += step) v.fill(color, x, y, z, x, y + 4, z);
}

// dougong bracket clusters under an eave line
export function dougong(v, x0, x1, y, z, step) {
  for (let x = x0; x <= x1; x += step) {
    v.fill(PAL.woodD, x, y, z, x, y + 1, z);          // base block
    v.fill(PAL.wood, x - 1, y + 1, z, x + 1, y + 1, z); // cross arm
    v.fill(PAL.wood, x, y + 2, z - 1, x, y + 2, z + 1); // fore-aft arm
    v.fill(PAL.woodD, x, y + 2, z, x, y + 3, z);        // riser
  }
}

/* Hip-and-gable / flying-eave roof.
 * w,d = eave span in voxels, y = base height, cx,cz = centre.
 * `tier` 0 = flat hip, 1 = rising hip with upturned corners (飞檐). */
export function roof(v, cx, y, cz, w, d, color = PAL.gold, ridge = true, tier = 1) {
  const hw = Math.floor(w / 2), hd = Math.floor(d / 2);
  const levels = Math.max(2, Math.floor(Math.min(w, d) / 4));
  for (let l = 0; l <= levels; l++) {
    const iw = hw - Math.floor(l * (hw / (levels + 1)));
    const id = hd - Math.floor(l * (hd / (levels + 1)));
    const yy = y + l;
    for (let x = cx - iw; x <= cx + iw; x++)
      for (let z = cz - id; z <= cz + id; z++)
        v.add(l === levels ? PAL.goldD : color, x, yy, z);
  }
  // upturned eave corners (飞檐翘角): lift the four corners of the base ring
  if (tier >= 1) {
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const ex = cx + sx * hw, ez = cz + sz * hd;
      v.add(color, ex, y + 1, ez);
      v.add(color, ex + sx, y + 2, ez + sz);          // the flipped tip
      v.add(color, ex + sx, y + 1, ez);
      v.add(color, ex, y + 1, ez + sz);
    }
  }
  // ridge + little finials
  if (ridge) {
    const top = y + levels + 1;
    v.fill(PAL.goldD, cx - Math.floor(hw / 2), top, cz, cx + Math.floor(hw / 2), top, cz);
    v.add(PAL.goldD, cx - Math.floor(hw / 2) - 0, top + 1, cz);
    v.add(PAL.goldD, cx + Math.floor(hw / 2) + 0, top + 1, cz);
  }
}

// a simple walled hall body (walls + door gap + windows)
export function hallBody(v, cx, y, cz, w, h, d, wallC = PAL.red, doorFront = true) {
  const hw = Math.floor(w / 2), hd = Math.floor(d / 2);
  for (let yy = 0; yy < h; yy++) {
    for (let x = cx - hw; x <= cx + hw; x++) {
      for (const z of [cz - hd, cz + hd]) {
        // door gap centred on the front wall
        if (doorFront && z === cz + hd && Math.abs(x - cx) <= 1 && yy < 3) continue;
        // windows every few voxels on the upper half
        const isWin = yy >= 1 && yy <= 2 && ((x - cx + hw) % 4 === 2) && Math.abs(x - cx) > 1;
        v.add(isWin ? PAL.window : wallC, x, y + yy, z);
      }
    }
    for (let z = cz - hd; z <= cz + hd; z++) {
      for (const x of [cx - hw, cx + hw]) {
        v.add(wallC, x, y + yy, z);
      }
    }
  }
}
