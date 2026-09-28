// 道具原型注册表：每个道具由若干基元 merge 成单个 BufferGeometry，实例化后即一次 draw call。
// 姿态约定：局部原点在底面中心，y = 0 即物体底部，x / z 居中；hangingLamp 的原点在顶部吊点、
// fluorescentTube 的原点在管体中心，这两个按任务约定例外处理。

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ---------- 基元 ----------

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (rTop, rBot, h, seg = 10, open = false) => new THREE.CylinderGeometry(rTop, rBot, h, seg, 1, open);
const torus = (r, tube, radial = 6, tubular = 14, arc = Math.PI * 2) => new THREE.TorusGeometry(r, tube, radial, tubular, arc);
const sphere = (r, segW = 8, segH = 6) => new THREE.SphereGeometry(r, segW, segH);
const disc = (r, seg = 12) => new THREE.CircleGeometry(r, seg);

// 两点之间的圆管，用于车架、斜撑、支架一类杆件。
function strut(ax, ay, az, bx, by, bz, r, seg = 6) {
  const dir = new THREE.Vector3(bx - ax, by - ay, bz - az);
  const g = cyl(r, r, dir.length(), seg);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()));
  return g.translate((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
}

// 合并成单一几何体：只保留 position / normal / uv，useGroups=false。
function merge(parts) {
  for (const part of parts) {
    for (const name of Object.keys(part.attributes)) {
      if (name !== 'position' && name !== 'normal' && name !== 'uv') part.deleteAttribute(name);
    }
  }
  const geometry = mergeGeometries(parts, false);
  if (!geometry) throw new Error('prop geometry merge failed');
  return geometry;
}

// 统一姿态：底面贴地、x / z 居中，构建完成后由 memoized 统一调用。
function onGround(geometry) {
  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  return geometry.translate(-(min.x + max.x) / 2, -min.y, -(min.z + max.z) / 2);
}

// ---------- 复用构件 ----------

// 板条木箱：六面薄板 + 四角护木，参数即箱体外廓。
function crate(w, h, d) {
  const t = 0.055;
  const b = 0.08;
  const parts = [
    box(t, h, d).translate(-(w - t) / 2, h / 2, 0),
    box(t, h, d).translate((w - t) / 2, h / 2, 0),
    box(w - t * 2, t, d).translate(0, t / 2, 0),
    box(w - t * 2, t, d).translate(0, h - t / 2, 0),
    box(w - t * 2, h - t * 2, t).translate(0, h / 2, -(d - t) / 2),
    box(w - t * 2, h - t * 2, t).translate(0, h / 2, (d - t) / 2),
  ];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      parts.push(box(b, h - 0.006, b).translate(sx * (w - b) / 2, h / 2, sz * (d - b) / 2));
    }
  }
  return parts;
}

// 钢桶桶身：桶体 + 上下滚箍 + 上下缘环，高 h、桶体半径 r（含箍环总径 0.58）。
function drumParts(h = 0.9, r = 0.27) {
  return [
    cyl(r, r, h, 12).translate(0, h / 2, 0),
    cyl(r + 0.012, r + 0.012, 0.05, 12, true).translate(0, h * 0.34, 0),
    cyl(r + 0.012, r + 0.012, 0.05, 12, true).translate(0, h * 0.68, 0),
    cyl(r + 0.02, r + 0.02, 0.045, 12, true).translate(0, 0.03, 0),
    cyl(r + 0.02, r + 0.02, 0.045, 12, true).translate(0, h - 0.03, 0),
  ];
}

// 沿 X 轴平躺的管件。
const pipeAlongX = (len, r, seg = 8) => cyl(r, r, len, seg).rotateZ(Math.PI / 2);

// 20ft 海运集装箱：箱体 + 角件 + 长面瓦楞筋 + +X 端双开门，外廓 6.06 × 2.59 × 2.44。
function containerBody() {
  const parts = [box(6.0, 2.59, 2.3).translate(0, 1.295, 0)];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      for (const sy of [0, 1]) {
        parts.push(box(0.22, 0.2, 0.24).translate(sx * 2.92, 0.1 + sy * 2.39, sz * 1.1));
      }
    }
  }
  for (const sz of [-1, 1]) {
    for (let i = 0; i < 8; i += 1) {
      parts.push(box(0.09, 2.2, 0.05).translate(-2.7 + i * 0.7714, 1.3, sz * 1.175));
    }
  }
  parts.push(
    box(0.07, 2.25, 1.12).translate(2.99, 1.29, -0.56),
    box(0.07, 2.25, 1.12).translate(2.99, 1.29, 0.56),
    box(0.1, 2.4, 0.12).translate(2.98, 1.3, -1.09),
    box(0.1, 2.4, 0.12).translate(2.98, 1.3, 1.09),
    box(0.05, 2.1, 0.05).translate(3.01, 1.3, -0.2),
    box(0.05, 2.1, 0.05).translate(3.01, 1.3, 0.2),
  );
  return parts;
}

// 混凝土隔离墩的截面：底部宽、上部收窄（XY 截面沿 Z 挤出后转向 X）。
function jerseyBarrier() {
  const shape = new THREE.Shape();
  const profile = [
    [-0.3, 0], [0.3, 0], [0.3, 0.18], [0.14, 0.56], [0.11, 0.8], [-0.11, 0.8], [-0.14, 0.56], [-0.3, 0.18],
  ];
  shape.moveTo(profile[0][0], profile[0][1]);
  for (let i = 1; i < profile.length; i += 1) shape.lineTo(profile[i][0], profile[i][1]);
  shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: 1.6, bevelEnabled: false, steps: 1 });
  g.translate(0, 0, -0.8);
  g.rotateY(Math.PI / 2);
  // ExtrudeGeometry 无索引，同批合并的箱体需同步去索引。
  return [box(1.6, 0.2, 0.6).translate(0, 0.1, 0).toNonIndexed(), g];
}

// ---------- 各道具几何体 ----------

const DEFS = {
  woodCrate: { material: 'crateWood', build: () => merge(crate(0.75, 0.75, 0.75)) },
  woodCrateTall: { material: 'crateWood', build: () => merge(crate(0.75, 1.1, 0.75)) },
  woodCrateLong: { material: 'crateWood', build: () => merge(crate(1.5, 0.75, 0.75)) },

  pallet: {
    material: 'wood',
    build: () => {
      const parts = [];
      for (let i = 0; i < 5; i += 1) {
        parts.push(box(1.2, 0.022, 0.13).translate(0, 0.129, -0.335 + i * 0.1675));
      }
      for (const z of [-0.35, 0, 0.35]) {
        parts.push(box(1.2, 0.098, 0.1).translate(0, 0.069, z));
        parts.push(box(1.2, 0.02, 0.09).translate(0, 0.01, z));
      }
      return merge(parts);
    },
  },

  plank: {
    material: 'wood',
    build: () => merge([box(2.2, 0.05, 0.28).translate(0, 0.025, 0)]),
  },

  barrelBlue: { material: 'paintedMetalBlue', build: () => merge(drumParts()) },
  barrelRust: { material: 'rustMetal', build: () => merge(drumParts()) },
  barrelOpen: {
    material: 'rustMetal',
    build: () => merge([
      // 外壁无盖，内部实体顶面即暗色桶底
      cyl(0.27, 0.27, 0.9, 12, true).translate(0, 0.45, 0),
      cyl(0.25, 0.25, 0.62, 12).translate(0, 0.31, 0),
      cyl(0.29, 0.29, 0.05, 12, true).translate(0, 0.875, 0),
      cyl(0.282, 0.282, 0.05, 12, true).translate(0, 0.29, 0),
      cyl(0.282, 0.282, 0.05, 12, true).translate(0, 0.6, 0),
    ]),
  },
  barrelFallen: {
    material: 'rustMetal',
    build: () => merge(drumParts().map((g) => g.rotateX(Math.PI / 2))),
  },

  gasBottle: {
    material: 'paintedMetalGreen',
    build: () => merge([
      cyl(0.15, 0.15, 0.8, 12).translate(0, 0.4, 0),
      cyl(0.055, 0.15, 0.12, 12).translate(0, 0.86, 0),
      cyl(0.045, 0.045, 0.08, 8).translate(0, 0.96, 0),
      box(0.12, 0.022, 0.022).translate(0, 0.985, 0),
    ]),
  },

  cardboardBox: {
    material: 'cardboard',
    build: () => merge([
      box(0.6, 0.5, 0.45).translate(0, 0.25, 0),
      box(0.6, 0.006, 0.07).translate(0, 0.498, 0),
      box(0.07, 0.5, 0.006).translate(0, 0.25, 0.226),
    ]),
  },
  cardboardBoxSmall: {
    material: 'cardboard',
    build: () => merge([
      box(0.38, 0.3, 0.3).translate(0, 0.15, 0),
      box(0.38, 0.006, 0.05).translate(0, 0.298, 0),
    ]),
  },

  barrier: {
    material: 'plasticBarrier',
    build: () => merge([
      box(0.26, 0.06, 0.6).translate(-0.65, 0.03, 0),
      box(0.26, 0.06, 0.6).translate(0.65, 0.03, 0),
      box(1.6, 0.1, 0.46).translate(0, 0.05, 0),
      box(1.5, 0.62, 0.2).translate(0, 0.43, 0),
      box(1.6, 0.16, 0.26).translate(0, 0.82, 0),
    ]),
  },
  concreteBlock: { material: 'concrete', build: () => merge(jerseyBarrier()) },

  bollard: {
    material: 'concrete',
    build: () => merge([
      cyl(0.09, 0.09, 0.8, 12).translate(0, 0.4, 0),
      cyl(0.095, 0.095, 0.12, 12, true).translate(0, 0.64, 0),
    ]),
  },

  tire: {
    material: 'rubber',
    build: () => merge([torus(0.24, 0.07, 6, 14).translate(0, 0.31, 0)]),
  },
  tireStack: {
    material: 'rubber',
    build: () => merge([0, 1, 2].map((i) => torus(0.24, 0.07, 6, 14).rotateX(Math.PI / 2).translate(0, 0.07 + i * 0.14, 0))),
  },

  sack: {
    material: 'sack',
    build: () => merge([
      sphere(0.5, 8, 6).scale(0.62, 0.34, 0.4).translate(0, 0.17, 0),
      sphere(0.5, 6, 4).scale(0.34, 0.26, 0.28).translate(0.08, 0.2, 0),
    ]),
  },
  sandbag: {
    material: 'sandbag',
    build: () => merge([sphere(0.5, 8, 6).scale(0.66, 0.26, 0.34).translate(0, 0.13, 0)]),
  },

  bucket: {
    material: 'rustMetal',
    build: () => merge([
      cyl(0.155, 0.155, 0.025, 12, true).translate(0, 0.328, 0),
      cyl(0.15, 0.115, 0.34, 12, true).translate(0, 0.17, 0),
      disc(0.115, 12).rotateX(-Math.PI / 2).translate(0, 0.012, 0),
      torus(0.15, 0.012, 4, 10, Math.PI).translate(0, 0.34, 0),
    ]),
  },

  pipe: {
    material: 'rustMetal',
    build: () => merge([pipeAlongX(3.2, 0.11, 10).translate(0, 0.11, 0)]),
  },
  pipeStack: {
    material: 'rustMetal',
    build: () => merge([
      // 下层两根并列，第三层卡在缝里，另有一根散落在旁
      pipeAlongX(3.1, 0.11, 8).translate(-0.1, 0.115, -0.115),
      pipeAlongX(3.3, 0.11, 8).translate(0.15, 0.115, 0.115),
      pipeAlongX(3.2, 0.11, 8).translate(0, 0.305, 0),
      pipeAlongX(3.24, 0.11, 8).translate(0.06, 0.115, 0.36),
    ]),
  },

  acUnit: {
    material: 'paintedMetalGray',
    build: () => {
      const parts = [
        box(0.9, 0.75, 0.38).translate(0, 0.375, 0),
        cyl(0.14, 0.14, 0.04, 10).rotateX(Math.PI / 2).translate(-0.22, 0.52, 0.19),
        box(0.9, 0.06, 0.06).translate(0, 0.71, -0.21),
        box(0.9, 0.06, 0.06).translate(0, 0.07, -0.21),
      ];
      for (let i = 0; i < 5; i += 1) {
        parts.push(box(0.86, 0.03, 0.03).translate(0, 0.16 + i * 0.12, 0.19));
      }
      return merge(parts);
    },
  },

  dumpster: {
    material: 'paintedMetalGreen',
    build: () => merge([
      box(1.72, 0.14, 1.0).translate(0, 0.07, 0),
      box(1.9, 0.86, 1.15).translate(0, 0.57, 0),
      box(0.09, 0.3, 0.42).translate(-0.95, 0.6, 0),
      box(0.09, 0.3, 0.42).translate(0.95, 0.6, 0),
      // 盖板半开：+X 端搭在桶沿上
      box(1.86, 0.07, 1.12).rotateZ(-0.08).translate(0.06, 1.11, 0),
    ]),
  },

  trashCan: {
    material: 'rustMetal',
    build: () => merge([
      cyl(0.275, 0.245, 0.75, 12).translate(0, 0.375, 0),
      cyl(0.29, 0.29, 0.05, 12, true).translate(0, 0.72, 0),
      cyl(0.29, 0.26, 0.08, 12).translate(0, 0.79, 0),
    ]),
  },

  roadSign: {
    material: 'paintedMetalGray',
    build: () => merge([
      box(0.34, 0.05, 0.34).translate(0, 0.025, 0),
      box(0.08, 1.8, 0.08).translate(0, 0.9, 0),
      box(0.9, 0.6, 0.06).translate(0, 1.6, 0.07),
    ]),
  },
  roadSignFallen: {
    material: 'paintedMetalGray',
    build: () => merge([
      box(0.34, 0.05, 0.34).translate(-0.85, 0.025, 0),
      box(1.8, 0.08, 0.08).translate(0, 0.04, 0),
      box(0.9, 0.06, 0.6).translate(0.72, 0.035, 0.05),
    ]),
  },

  bicycle: {
    material: 'rustMetal',
    build: () => {
      const parts = [];
      for (const sx of [-1, 1]) {
        parts.push(torus(0.29, 0.02, 4, 12).translate(sx * 0.55, 0.31, 0));
        parts.push(box(0.56, 0.018, 0.018).rotateZ(Math.PI / 4).translate(sx * 0.55, 0.31, 0));
        parts.push(box(0.56, 0.018, 0.018).rotateZ(-Math.PI / 4).translate(sx * 0.55, 0.31, 0));
      }
      const tubes = [
        [-0.55, 0.31, 0, -0.05, 0.28, 0],
        [-0.55, 0.31, 0, -0.22, 0.72, 0],
        [-0.05, 0.28, 0, -0.22, 0.72, 0],
        [-0.05, 0.28, 0, 0.4, 0.62, 0],
        [-0.22, 0.72, 0, 0.45, 0.78, 0],
        [0.55, 0.31, 0, 0.4, 0.62, 0],
        [0.4, 0.62, 0, 0.45, 0.78, 0],
        [0.45, 0.78, 0, 0.42, 0.88, 0],
        [-0.22, 0.72, 0, -0.26, 0.88, 0],
      ];
      for (const t of tubes) parts.push(strut(t[0], t[1], t[2], t[3], t[4], t[5], 0.022));
      parts.push(box(0.06, 0.03, 0.5).translate(0.42, 0.9, 0));
      parts.push(box(0.2, 0.045, 0.09).translate(-0.27, 0.9, 0));
      // 弃置车辆整体向一侧倾斜 8°
      return merge(parts).rotateX(-0.14);
    },
  },

  tableFlipped: {
    material: 'rustMetal',
    build: () => {
      const parts = [
        cyl(0.3, 0.3, 0.035, 12).translate(0, 0.7, 0),
        cyl(0.03, 0.03, 0.62, 8).translate(0, 0.36, 0),
        cyl(0.2, 0.2, 0.02, 10, true).translate(0, 0.28, 0),
      ];
      for (let i = 0; i < 3; i += 1) {
        parts.push(box(0.34, 0.05, 0.06).translate(0.15, 0.05, 0).rotateY(i * (Math.PI * 2) / 3));
      }
      // 翻倒后桌面竖直
      return merge(parts).rotateX(-Math.PI / 2);
    },
  },
  chairFlipped: {
    material: 'rustMetal',
    build: () => {
      const parts = [
        box(0.42, 0.035, 0.42).translate(0, 0.45, 0),
        box(0.4, 0.5, 0.035).translate(0, 0.72, -0.19),
        cyl(0.19, 0.19, 0.02, 8, true).translate(0, 0.2, 0),
      ];
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          parts.push(box(0.035, 0.45, 0.035).translate(sx * 0.18, 0.225, sz * 0.18));
        }
      }
      // 向后倒地，椅背贴地
      return merge(parts).rotateX(-1.45);
    },
  },

  locker: {
    material: 'paintedMetalGray',
    build: () => {
      const parts = [
        box(0.45, 1.77, 0.5).translate(0, 0.915, 0),
        box(0.42, 1.67, 0.02).translate(0, 0.94, 0.26),
      ];
      for (let i = 0; i < 4; i += 1) {
        parts.push(box(0.28, 0.025, 0.02).translate(0, 1.6 - i * 0.06, 0.27));
      }
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          parts.push(box(0.06, 0.06, 0.06).translate(sx * 0.17, 0.03, sz * 0.2));
        }
      }
      return merge(parts);
    },
  },

  shelfUnit: {
    material: 'paintedMetalOrange',
    build: () => {
      const parts = [];
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          parts.push(box(0.08, 2.6, 0.08).translate(sx * 0.96, 1.3, sz * 0.36));
        }
      }
      for (let i = 0; i < 5; i += 1) {
        parts.push(box(2.0, 0.05, 0.8).translate(0, 0.1 + i * 0.6, 0));
      }
      parts.push(box(3.12, 0.05, 0.05).rotateZ(0.876).translate(0, 1.3, -0.42));
      parts.push(box(3.12, 0.05, 0.05).rotateZ(-0.876).translate(0, 1.3, -0.42));
      return merge(parts);
    },
  },

  sortTable: {
    material: 'wood',
    build: () => {
      const parts = [
        box(1.6, 0.06, 0.9).translate(0, 0.82, 0),
        box(1.4, 0.04, 0.72).translate(0, 0.25, 0),
      ];
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          parts.push(box(0.08, 0.79, 0.08).translate(sx * 0.72, 0.395, sz * 0.38));
        }
      }
      return merge(parts);
    },
  },

  forklift: {
    material: 'paintedMetalOrange',
    build: () => {
      const parts = [
        box(0.7, 0.5, 0.62).translate(0.45, 0.38, 0),
        box(1.1, 0.045, 0.13).translate(-0.2, 0.06, -0.2),
        box(1.1, 0.045, 0.13).translate(-0.2, 0.06, 0.2),
        box(0.12, 0.12, 0.13).translate(0.3, 0.06, -0.2),
        box(0.12, 0.12, 0.13).translate(0.3, 0.06, 0.2),
        box(0.07, 1.1, 0.07).translate(0.1, 0.6, -0.24),
        box(0.07, 1.1, 0.07).translate(0.1, 0.6, 0.24),
        box(0.35, 0.06, 0.06).translate(0.1, 0.95, 0),
        box(0.5, 0.06, 0.06).rotateZ(0.9).translate(0.85, 0.6, 0),
      ];
      for (const sz of [-1, 1]) {
        parts.push(cyl(0.11, 0.11, 0.07, 8).rotateX(Math.PI / 2).translate(0.05, 0.11, sz * 0.3));
        parts.push(cyl(0.09, 0.09, 0.07, 8).rotateX(Math.PI / 2).translate(0.85, 0.09, sz * 0.24));
      }
      return merge(parts);
    },
  },

  console: {
    material: 'paintedMetalGray',
    build: () => merge([
      box(0.85, 0.78, 0.6).translate(0, 0.39, 0),
      box(0.06, 0.34, 0.6).translate(-0.395, 0.95, 0),
      box(0.06, 0.34, 0.6).translate(0.395, 0.95, 0),
      box(0.85, 0.06, 0.62).rotateX(-0.55).translate(0, 0.98, 0.02),
      box(0.5, 0.02, 0.3).rotateX(-0.55).translate(0, 1.02, 0.02),
    ]),
  },

  desk: {
    material: 'wood',
    build: () => {
      const parts = [box(1.5, 0.05, 0.7).translate(0, 0.755, 0)];
      for (const sx of [-1, 1]) {
        for (const sz of [-1, 1]) {
          parts.push(box(0.07, 0.73, 0.07).translate(sx * 0.7, 0.365, sz * 0.3));
        }
      }
      parts.push(box(0.46, 0.6, 0.62).translate(-0.45, 0.42, 0));
      for (let i = 0; i < 3; i += 1) {
        parts.push(box(0.42, 0.15, 0.03).translate(-0.45, 0.16 + i * 0.2, 0.32));
        parts.push(box(0.1, 0.025, 0.025).translate(-0.45, 0.23 + i * 0.2, 0.35));
      }
      return merge(parts);
    },
  },

  officeChair: {
    material: 'paintedMetalGray',
    build: () => {
      const parts = [
        box(0.5, 0.07, 0.5).translate(0, 0.47, 0),
        box(0.46, 0.52, 0.07).translate(0, 0.77, -0.24),
        cyl(0.035, 0.035, 0.3, 8).translate(0, 0.32, 0),
      ];
      for (let i = 0; i < 5; i += 1) {
        parts.push(box(0.32, 0.045, 0.07).translate(0.14, 0.09, 0).rotateY(i * 1.2566));
        parts.push(box(0.05, 0.05, 0.04).translate(0.28, 0.05, 0).rotateY(i * 1.2566));
      }
      // 侧翻倒地
      return merge(parts).rotateZ(1.5);
    },
  },

  binBag: {
    material: 'tarp',
    build: () => merge([
      sphere(0.5, 8, 6).scale(0.5, 0.48, 0.5).translate(0, 0.24, 0),
      cyl(0.045, 0.085, 0.11, 6).translate(0, 0.5, 0),
    ]),
  },

  shepherdHookPole: {
    material: 'concreteWall',
    build: () => merge([
      cyl(0.11, 0.115, 7.5, 10).translate(0, 3.75, 0),
      box(1.1, 0.09, 0.09).translate(0, 7.3, 0),
      cyl(0.06, 0.05, 0.14, 6).translate(-0.42, 7.42, 0),
      cyl(0.06, 0.05, 0.14, 6).translate(0.42, 7.42, 0),
      box(0.06, 0.5, 0.06).rotateZ(0.7).translate(-0.3, 7.0, 0),
      box(0.06, 0.5, 0.06).rotateZ(-0.7).translate(0.3, 7.0, 0),
    ]),
  },

  gratePanel: {
    material: 'rustMetal',
    build: () => {
      const parts = [
        box(1.0, 0.05, 0.06).translate(0, 0.025, -0.27),
        box(1.0, 0.05, 0.06).translate(0, 0.025, 0.27),
        box(0.06, 0.05, 0.48).translate(-0.47, 0.025, 0),
        box(0.06, 0.05, 0.48).translate(0.47, 0.025, 0),
      ];
      for (let i = 0; i < 5; i += 1) {
        parts.push(box(0.04, 0.04, 0.5).translate(-0.35 + i * 0.175, 0.025, 0));
      }
      return merge(parts);
    },
  },

  ventPipe: {
    material: 'rustMetal',
    build: () => merge([
      cyl(0.175, 0.175, 1.6, 10).translate(0, 0.8, 0),
      cyl(0.24, 0.19, 0.16, 10).translate(0, 1.62, 0),
      box(0.4, 0.03, 0.4).translate(0, 1.71, 0),
    ]),
  },

  cableSpool: {
    material: 'wood',
    build: () => {
      const parts = [
        cyl(0.16, 0.16, 0.62, 10),
        cyl(0.45, 0.45, 0.06, 12).translate(0, -0.32, 0),
        cyl(0.45, 0.45, 0.06, 12).translate(0, 0.32, 0),
      ];
      for (let i = 0; i < 3; i += 1) {
        parts.push(torus(0.2, 0.032, 4, 10).translate(0, -0.1 + i * 0.1, 0));
      }
      // 轮盘立放，轴向沿 Z
      return merge(parts).rotateX(Math.PI / 2);
    },
  },

  hoseCoil: {
    material: 'rubber',
    build: () => {
      const parts = [];
      for (let i = 0; i < 3; i += 1) {
        parts.push(torus(0.24 + i * 0.04, 0.033, 4, 12).rotateX(Math.PI / 2).translate(0, 0.033 + i * 0.066, 0));
      }
      return merge(parts);
    },
  },

  paintBucket: {
    material: 'paintedMetalWhite',
    build: () => merge([
      cyl(0.14, 0.115, 0.36, 10, true).translate(0, 0.18, 0),
      disc(0.115, 10).rotateX(-Math.PI / 2).translate(0, 0.012, 0),
      cyl(0.148, 0.148, 0.03, 10, true).translate(0, 0.35, 0),
      torus(0.14, 0.01, 4, 8, Math.PI).translate(0, 0.36, 0),
    ]),
  },

  trafficCone: {
    material: 'plasticBarrier',
    build: () => merge([
      box(0.36, 0.045, 0.36).translate(0, 0.0225, 0),
      cyl(0.032, 0.1, 0.55, 10).translate(0, 0.32, 0),
      cyl(0.058, 0.07, 0.09, 10, true).translate(0, 0.36, 0),
    ]),
  },

  newsPile: {
    material: 'rosterPaper',
    build: () => merge([
      box(0.5, 0.03, 0.4).translate(0, 0.015, 0).rotateY(0.12),
      box(0.48, 0.03, 0.38).translate(0.02, 0.045, 0.01).rotateY(-0.08),
      box(0.46, 0.03, 0.36).translate(-0.01, 0.075, -0.02).rotateY(0.05),
      box(0.42, 0.03, 0.34).translate(0.02, 0.105, 0.01).rotateY(-0.16),
    ]),
  },

  parcelBox: {
    material: 'cardboard',
    build: () => merge([
      box(0.5, 0.4, 0.35).translate(0, 0.2, 0),
      box(0.504, 0.404, 0.09).translate(0, 0.2, 0.05),
      box(0.09, 0.404, 0.354).translate(0.12, 0.2, 0),
      box(0.14, 0.4, 0.02).translate(-0.15, 0.2, 0.176),
    ]),
  },

  cementBag: {
    material: 'sandbag',
    build: () => merge([sphere(0.5, 8, 6).scale(0.75, 0.16, 0.45).translate(0, 0.08, 0)]),
  },

  shield: {
    material: 'glassDirty',
    build: () => {
      const parts = [
        box(0.5, 1.05, 0.035).translate(0, 0.525, 0),
        box(0.5, 0.06, 0.05).translate(0, 0.03, 0),
        box(0.5, 0.06, 0.05).translate(0, 1.02, 0),
        box(0.06, 1.05, 0.05).translate(-0.22, 0.525, 0),
        box(0.06, 1.05, 0.05).translate(0.22, 0.525, 0),
        box(0.05, 0.14, 0.06).translate(-0.1, 0.55, -0.05),
        box(0.05, 0.14, 0.06).translate(0.1, 0.55, -0.05),
      ];
      // 斜靠姿态，盾面略向后倾
      return merge(parts).rotateX(0.12);
    },
  },

  armorCrate: {
    material: 'paintedMetalGray',
    build: () => merge([
      box(0.9, 0.05, 0.6).translate(0, 0.025, 0),
      box(0.9, 0.45, 0.04).translate(0, 0.25, -0.28),
      box(0.9, 0.45, 0.04).translate(0, 0.25, 0.28),
      box(0.04, 0.45, 0.6).translate(-0.43, 0.25, 0),
      box(0.04, 0.45, 0.6).translate(0.43, 0.25, 0),
      box(0.42, 0.07, 0.34).translate(-0.12, 0.085, 0),
      box(0.42, 0.07, 0.34).translate(-0.14, 0.155, 0.01),
      box(0.4, 0.07, 0.32).translate(-0.1, 0.225, -0.01),
      sphere(0.16, 8, 6).scale(1, 0.85, 1).translate(0.26, 0.2, 0),
    ]),
  },

  fireEscapeStep: {
    material: 'paintedMetalGray',
    build: () => {
      const slope = Math.atan2(1.6, 3.0);
      const parts = [];
      for (let i = 0; i < 8; i += 1) {
        parts.push(box(0.375, 0.04, 0.6).translate(-1.3125 + i * 0.375, 0.2 * (i + 1), 0));
      }
      for (const sz of [-1, 1]) {
        parts.push(box(3.4, 0.14, 0.06).rotateZ(slope).translate(0, 0.74, sz * 0.3));
        parts.push(box(3.4, 0.05, 0.05).rotateZ(slope).translate(0, 1.64, sz * 0.3));
      }
      for (const x of [-1.3, 0, 1.3]) {
        for (const sz of [-1, 1]) {
          parts.push(box(0.05, 0.9, 0.05).translate(x, 1.19 + x * 0.533, sz * 0.3));
        }
      }
      return merge(parts);
    },
  },

  ladderSteel: {
    material: 'rustMetal',
    build: () => {
      const parts = [
        box(0.06, 3.2, 0.06).translate(-0.22, 1.6, 0),
        box(0.06, 3.2, 0.06).translate(0.22, 1.6, 0),
        box(0.06, 0.06, 0.26).translate(0, 1.0, -0.16),
        box(0.06, 0.06, 0.26).translate(0, 2.4, -0.16),
      ];
      for (let i = 0; i < 8; i += 1) {
        parts.push(box(0.5, 0.045, 0.045).translate(0, 0.35 + i * 0.4, 0.02));
      }
      return merge(parts);
    },
  },
  ladderWood: {
    material: 'wood',
    build: () => {
      const parts = [
        box(0.07, 2.6, 0.05).translate(-0.24, 1.3, 0),
        box(0.07, 2.6, 0.05).translate(0.24, 1.3, 0),
      ];
      for (let i = 0; i < 7; i += 1) {
        parts.push(box(0.48, 0.05, 0.045).translate(0, 0.25 + i * 0.35, 0));
      }
      // 木梯向 +Z 斜靠 15°
      return merge(parts).rotateX(0.2618);
    },
  },

  railingSegment: {
    material: 'paintedMetalGray',
    build: () => {
      const parts = [
        box(2.2, 0.06, 0.06).translate(0, 1.02, 0),
        box(2.2, 0.05, 0.05).translate(0, 0.55, 0),
      ];
      for (const x of [-1.02, 0, 1.02]) {
        parts.push(box(0.07, 1.05, 0.07).translate(x, 0.525, 0));
        parts.push(box(0.16, 0.03, 0.16).translate(x, 0.015, 0));
      }
      return merge(parts);
    },
  },

  fencePost: {
    material: 'rustMetal',
    build: () => merge([
      box(0.09, 1.9, 0.09).translate(0, 0.95, 0),
      box(0.18, 0.05, 0.05).translate(0.06, 0.5, 0),
      box(0.18, 0.05, 0.05).translate(0.06, 1.1, 0),
      box(0.18, 0.05, 0.05).translate(0.06, 1.7, 0),
      box(0.05, 0.16, 0.05).rotateZ(0.3).translate(0, 1.94, 0),
    ]),
  },

  barbedCoil: {
    material: 'rustMetal',
    build: () => {
      // 平铺在地上的铁丝圈 + 短尖刺，圈底与地面齐平
      const parts = [torus(0.32, 0.022, 4, 14).rotateX(Math.PI / 2).translate(0, 0.022, 0)];
      for (let i = 0; i < 6; i += 1) {
        const a = i * 1.0472;
        const spike = box(0.02, 0.08, 0.02);
        spike.applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(0.5, a, 0.7)));
        parts.push(spike.translate(Math.cos(a) * 0.32, 0.05, Math.sin(a) * 0.32));
      }
      return merge(parts);
    },
  },

  hangingLamp: {
    material: 'paintedMetalGray',
    anchored: false,
    build: () => merge([
      // 原点即天花板吊点，灯体向下悬挂
      box(0.14, 0.025, 0.14).translate(0, -0.0125, 0),
      cyl(0.012, 0.012, 0.34, 6).translate(0, -0.19, 0),
      cyl(0.08, 0.14, 0.18, 12, true).translate(0, -0.45, 0),
      sphere(0.05, 6, 4).translate(0, -0.545, 0),
    ]),
  },

  fluorescentTube: {
    material: 'paintedMetalWhite',
    anchored: false,
    build: () => merge([
      // 原点在管体中心
      cyl(0.045, 0.045, 1.2, 10).rotateZ(Math.PI / 2),
      cyl(0.055, 0.055, 0.06, 8).rotateZ(Math.PI / 2).translate(-0.57, 0, 0),
      cyl(0.055, 0.055, 0.06, 8).rotateZ(Math.PI / 2).translate(0.57, 0, 0),
    ]),
  },

  searchlightRig: {
    material: 'paintedMetalGray',
    build: () => {
      const parts = [];
      for (let i = 0; i < 3; i += 1) {
        parts.push(box(0.05, 1.15, 0.05).rotateX(0.22).rotateY(i * 2.0944).translate(0, 0.58, 0));
      }
      parts.push(
        box(0.05, 0.3, 0.05).translate(-0.28, 1.25, 0),
        box(0.05, 0.3, 0.05).translate(0.28, 1.25, 0),
        cyl(0.225, 0.225, 0.3, 12).rotateX(Math.PI / 2).translate(0, 1.35, 0),
        cyl(0.19, 0.19, 0.04, 12).rotateX(Math.PI / 2).translate(0, 1.35, 0.16),
      );
      return merge(parts);
    },
  },

  beaconBar: {
    material: 'paintedMetalWhite',
    build: () => {
      const parts = [
        box(1.1, 0.1, 0.16).translate(0, 0.05, 0),
        box(0.44, 0.12, 0.14).translate(-0.28, 0.155, 0),
        box(0.44, 0.12, 0.14).translate(0.28, 0.155, 0),
      ];
      for (const x of [-0.5, -0.06, 0.06, 0.5]) {
        parts.push(cyl(0.07, 0.07, 0.14, 6).rotateX(Math.PI / 2).translate(x, 0.155, 0));
      }
      return merge(parts);
    },
  },

  container: { material: 'paintedMetalRed', build: () => merge(containerBody()) },
  containerBlue: { material: 'paintedMetalBlue', build: () => merge(containerBody()) },
  containerGreen: { material: 'paintedMetalGreen', build: () => merge(containerBody()) },

  containerTruckBody: {
    material: 'paintedMetalGray',
    build: () => {
      const parts = [
        box(4.2, 2.3, 2.4).translate(0, 1.31, 0),
        box(4.2, 0.16, 0.14).translate(0, 0.08, -0.9),
        box(4.2, 0.16, 0.14).translate(0, 0.08, 0.9),
        // -X 端为尾门，货柜头由调用方在 +X 侧接上车头
        box(0.08, 2.2, 0.14).translate(-2.1, 1.26, -1.03),
        box(0.08, 2.2, 0.14).translate(-2.1, 1.26, 1.03),
        box(0.08, 0.14, 2.2).translate(-2.1, 2.32, 0),
        box(0.08, 0.12, 2.2).translate(-2.1, 0.22, 0),
        box(0.06, 2.0, 2.0).translate(-2.14, 1.3, 0),
      ];
      for (let i = 0; i < 5; i += 1) {
        parts.push(box(0.03, 0.05, 1.95).translate(-2.18, 0.55 + i * 0.36, 0));
      }
      return merge(parts);
    },
  },
};

// ---------- 惰性构建与导出 ----------

const cache = new Map();

// 惰性构建：首次调用 geometry() 时才生成并缓存；除吊挂类道具外统一落到地面基准。
function memoized(type, def) {
  return () => {
    let geometry = cache.get(type);
    if (geometry === undefined) {
      geometry = def.build();
      if (def.anchored !== false) onGround(geometry);
      cache.set(type, geometry);
    }
    return geometry;
  };
}

export const PROPS = {};
for (const type of Object.keys(DEFS)) {
  const def = DEFS[type];
  PROPS[type] = {
    geometry: memoized(type, def),
    material: def.material,
    castShadow: true,
    receiveShadow: true,
  };
}

export const PROP_TYPES = Object.freeze(Object.keys(PROPS));

export function getProp(type) {
  const prop = PROPS[type];
  if (!prop) throw new Error(`unknown prop type: ${type} (valid: ${PROP_TYPES.join(', ')})`);
  return prop;
}
