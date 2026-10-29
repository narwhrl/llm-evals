import * as THREE from 'three';
import { PALETTE as P } from './voxel.js';

// 中式屋顶构件：把庑殿/歇山/攒尖的屋面拆成一层层体素，
// 每层向内收进，并在檐角起翘处抬高，形成飞檐。

/**
 * 逐层向内收进的屋面。
 * @param {import('./voxel.js').Batch} batch
 * @param {object} spec
 *   x0,x1,z0,z1  檐口范围
 *   y            檐口高度
 *   layers       收进层数
 *   step         每层收进格数
 *   color/dark   瓦色与暗部瓦色
 *   ridgeColor   正脊颜色
 *   hip          是否做四角起翘
 *   ridgeAxis    'x' 或 'z'，正脊走向
 */
export function roof(batch, spec) {
  const {
    x0,
    x1,
    z0,
    z1,
    y,
    layers,
    step = 1,
    color = P.tileGreen,
    dark = P.tileGreenDark,
    ridgeColor = P.tileGold,
    hip = true,
    ridgeAxis = 'x',
  } = spec;

  let ax0 = x0;
  let ax1 = x1;
  let az0 = z0;
  let az1 = z1;

  for (let l = 0; l < layers; l += 1) {
    const ly = y + l;
    for (let x = ax0; x <= ax1; x += 1) {
      for (let z = az0; z <= az1; z += 1) {
        const onEdge = x === ax0 || x === ax1 || z === az0 || z === az1;
        if (!onEdge && l > 0) continue;
        // 瓦垄：沿正脊方向交替深浅，读起来像筒瓦
        const groove = ridgeAxis === 'x' ? (z - az0) % 2 === 0 : (x - ax0) % 2 === 0;
        batch.add(groove ? color : dark, x, ly, z);

        // 四角起翘：靠近檐角的位置再抬高一格，形成翘角
        if (hip && l === 0) {
          const cornerX = Math.min(x - ax0, ax1 - x);
          const cornerZ = Math.min(z - az0, az1 - z);
          if (cornerX === 0 && cornerZ === 0) {
            batch.add(ridgeColor, x, ly + 1, z);
            batch.add(color, x, ly + 2, z);
          } else if ((cornerX === 1 && cornerZ === 0) || (cornerX === 0 && cornerZ === 1)) {
            batch.add(color, x, ly + 1, z);
          }
        }
      }
    }
    if (l === 0) {
      // 檐口：外扩一圈滴水瓦，颜色更暗，形成屋檐阴影线
      for (let x = ax0 - 1; x <= ax1 + 1; x += 1) {
        batch.add(dark, x, ly, az0 - 1);
        batch.add(dark, x, ly, az1 + 1);
      }
      for (let z = az0 - 1; z <= az1 + 1; z += 1) {
        batch.add(dark, ax0 - 1, ly, z);
        batch.add(dark, ax1 + 1, ly, z);
      }
    }
    ax0 += step;
    ax1 -= step;
    az0 += step;
    az1 -= step;
    if (ax0 > ax1 || az0 > az1) break;
  }

  // 正脊
  const topY = y + layers - 1;
  if (ridgeAxis === 'x') {
    const zc = Math.round((z0 + z1) / 2);
    batch.fill(ridgeColor, ax0, ax1, topY + 1, topY + 1, zc, zc);
    // 脊饰：两端上翘
    batch.add(ridgeColor, ax0 - 1, topY + 2, zc);
    batch.add(ridgeColor, ax1 + 1, topY + 2, zc);
  } else {
    const xc = Math.round((x0 + x1) / 2);
    batch.fill(ridgeColor, xc, xc, topY + 1, topY + 1, az0, az1);
    batch.add(ridgeColor, xc, topY + 2, az0 - 1);
    batch.add(ridgeColor, xc, topY + 2, az1 + 1);
  }
  return topY + 2;
}

/**
 * 攒尖顶：方形逐层收进到一点，顶上收宝顶。用于宝塔与亭子。
 */
export function pyramidRoof(batch, spec) {
  const {
    cx,
    cz,
    half,
    y,
    color = P.tileGrey,
    dark = P.tileGreyDark,
    finial = P.tileGold,
    hip = true,
  } = spec;
  let h = half;
  let ly = y;
  while (h >= 0) {
    for (let x = cx - h; x <= cx + h; x += 1) {
      for (let z = cz - h; z <= cz + h; z += 1) {
        const onEdge = Math.abs(x - cx) === h || Math.abs(z - cz) === h;
        if (h > 0 && !onEdge) continue;
        const groove = (x + z) % 2 === 0;
        batch.add(groove ? color : dark, x, ly, z);
        if (hip && h === half && Math.abs(x - cx) === h && Math.abs(z - cz) === h) {
          batch.add(finial, x, ly + 1, z);
        }
      }
    }
    h -= 1;
    ly += 1;
  }
  // 宝顶
  batch.fill(finial, cx, cx, ly, ly + 1, cz, cz);
  return ly + 2;
}

/**
 * 歇山/庑殿通用：在屋面下补一圈斗拱与檐口。
 */
export function eaves(batch, x0, x1, y, z0, z1, { bracket = P.gold, beam = P.woodDark } = {}) {
  for (let x = x0; x <= x1; x += 1) {
    batch.add(beam, x, y, z0);
    batch.add(beam, x, y, z1);
    if (x % 3 === 0) {
      batch.add(bracket, x, y - 1, z0);
      batch.add(bracket, x, y - 1, z1);
    }
  }
  for (let z = z0; z <= z1; z += 1) {
    batch.add(beam, x0, y, z);
    batch.add(beam, x1, y, z);
    if (z % 3 === 0) {
      batch.add(bracket, x0, y - 1, z);
      batch.add(bracket, x1, y - 1, z);
    }
  }
}

/**
 * 立柱：四角与等距中柱，柱础为石。
 */
export function pillars(batch, x0, x1, y0, y1, z0, z1, spacing = 4, color = P.wallRed) {
  const xs = [];
  for (let x = x0; x <= x1; x += spacing) xs.push(x);
  if (xs[xs.length - 1] !== x1) xs.push(x1);
  const zs = [];
  for (let z = z0; z <= z1; z += spacing) zs.push(z);
  if (zs[zs.length - 1] !== z1) zs.push(z1);

  for (const x of xs) {
    for (const z of zs) {
      if (x !== x0 && x !== x1 && z !== z0 && z !== z1) continue;
      batch.fill(color, x, x, y0, y1, z, z);
      batch.add(P.stoneLight, x, y0 - 1, z);
    }
  }
}

/**
 * 木格窗：红框 + 深色窗心 + 金色棂条。
 */
export function latticeWindow(batch, x0, x1, y0, y1, z, { axis = 'x', frame = P.woodDark } = {}) {
  if (axis === 'x') {
    for (let x = x0; x <= x1; x += 1) {
      for (let y = y0; y <= y1; y += 1) {
        const border = x === x0 || x === x1 || y === y0 || y === y1;
        if (border) batch.add(frame, x, y, z);
        else if ((x - x0) % 2 === 0 || (y - y0) % 3 === 0) batch.add(P.window, x, y, z);
        else batch.add(P.gold, x, y, z);
      }
    }
  } else {
    for (let zz = x0; zz <= x1; zz += 1) {
      for (let y = y0; y <= y1; y += 1) {
        const border = zz === x0 || zz === x1 || y === y0 || y === y1;
        if (border) batch.add(frame, z, y, zz);
        else if ((zz - x0) % 2 === 0 || (y - y0) % 3 === 0) batch.add(P.window, z, y, zz);
        else batch.add(P.gold, z, y, zz);
      }
    }
  }
}

export const DEG = Math.PI / 180;

export function lampMesh(x, y, z, scale = 1) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.5 * scale, 0.7 * scale, 0.5 * scale),
    new THREE.MeshLambertMaterial({ color: P.lantern, emissive: 0x8f1d12 }),
  );
  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(0.34 * scale, 0.5 * scale, 0.34 * scale),
    new THREE.MeshBasicMaterial({ color: P.lanternGlow }),
  );
  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(0.62 * scale, 0.12 * scale, 0.62 * scale),
    new THREE.MeshLambertMaterial({ color: P.gold }),
  );
  cap.position.y = 0.4 * scale;
  group.add(body, glow, cap);
  group.position.set(x, y, z);
  return group;
}
