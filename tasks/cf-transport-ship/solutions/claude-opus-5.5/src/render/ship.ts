// 船体、甲板构件与货物的渲染组装。
import * as THREE from "three";
import type { Box, World } from "../core/world";
import { DECK } from "../map/layout";
import { MeshBuilder, makeMaterials, sub } from "./worldmesh";

const TOP = 2, BOTTOM = 3;

export interface ShipVisual {
  group: THREE.Group;
  materials: Record<string, THREE.Material>;
}

export function buildShip(world: World, shadows: boolean): ShipVisual {
  const mats = makeMaterials();
  const mb = new MeshBuilder();
  for (const b of world.boxes) {
    switch (b.kind) {
      case "deck": mb.box(b, (f) => (f === TOP ? { key: "deck", scale: 2 } : f === BOTTOM ? null : { key: "hull", scale: 3 })); break;
      case "platform": mb.box(b, (f) => (f === TOP ? { key: "deck2", scale: 2 } : f === BOTTOM ? null : { key: "steelDark", scale: 2 })); break;
      case "stair": mb.box(b, (f) => (f === TOP ? { key: "deckDark", scale: 1 } : f === BOTTOM ? null : { key: "frame" })); break;
      case "bulwark": bulwark(mb, b); break;
      case "cabin-wall": case "lintel": mb.box(b, (f) => (f === BOTTOM ? null : { key: "cabin", scale: 3 })); break;
      case "roof": mb.box(b, (f) => (f === TOP ? { key: "croof", scale: 3 } : { key: "cabin", scale: 3 })); roofDetail(mb, b); break;
      case "bridge": bridge(mb, b); break;
      case "locker": locker(mb, b); break;
      case "bench": mb.box(b, (f) => (f === BOTTOM ? null : { key: "woodDark", scale: 1 })); break;
      case "bollard": bollard(mb, b); break;
      case "rail": railing(mb, b); break;
      case "container": container(mb, b); break;
      case "crate-big": case "crate-small": crate(mb, b); break;
      case "tarp": tarpCargo(mb, b); break;
      default: break; // clip：不可见
    }
    if (b.kind === "lintel") doorFrame(mb, b);
  }
  // 端部船舱顶灯：自发光灯罩（点光源逐片元成本过高，舱内亮度由半球光、环境反射与墙面微自发光提供）
  for (const sx of [-1, 1]) {
    for (const z of [-5, 0, 5]) {
      mb.geometry("frame", new THREE.BoxGeometry(1.0, 0.05, 0.34), new THREE.Matrix4().makeTranslation(sx * 46.5, 4.37, z));
      mb.geometry("lamp", new THREE.BoxGeometry(0.9, 0.03, 0.26), new THREE.Matrix4().makeTranslation(sx * 46.5, 4.335, z));
    }
  }
  const group = mb.build(mats, shadows);
  group.add(hull(mats));
  return { group, materials: mats };
}

function bulwark(mb: MeshBuilder, b: Box): void {
  mb.box(b, (f) => (f === BOTTOM ? null : f === TOP ? { key: "frame" } : { key: "hull", scale: 2 }));
  const dir = b.cz > 0 ? -1 : 1;
  // 扶手与立柱（向内一侧）
  mb.box(sub(b, 0, b.hy + 0.03, dir * 0.05, b.hx, 0.03, 0.05), () => ({ key: "rail" }));
  for (let x = -DECK.halfLength + 1; x < DECK.halfLength; x += 2.5)
    mb.box({ cx: x, cy: 0.5, cz: b.cz + dir * (b.hz + 0.05), hx: 0.04, hy: 0.5, hz: 0.05, cos: 1, sin: 0 }, () => ({ key: "frame" }));
}

function doorFrame(mb: MeshBuilder, l: Box): void {
  // 门框：两侧立柱 + 门楣下缘，略突出墙面
  const floor = 1.2, h = l.bottom - floor;
  const alongZ = l.hz > l.hx;
  const len = alongZ ? l.hz : l.hx, th = (alongZ ? l.hx : l.hz) + 0.04;
  for (const s of [-1, 1]) {
    const lx = alongZ ? 0 : s * (len + 0.05), lz = alongZ ? s * (len + 0.05) : 0;
    mb.box({ cx: l.cx + lx, cy: floor + h / 2, cz: l.cz + lz, hx: alongZ ? th : 0.06, hy: h / 2, hz: alongZ ? 0.06 : th, cos: 1, sin: 0 }, () => ({ key: "frame" }));
  }
  mb.box({ cx: l.cx, cy: l.bottom + 0.05, cz: l.cz, hx: alongZ ? th : len + 0.1, hy: 0.06, hz: alongZ ? len + 0.1 : th, cos: 1, sin: 0 }, () => ({ key: "frame" }));
}

function roofDetail(mb: MeshBuilder, b: Box): void {
  // 屋檐与通风管
  for (const z of [-7.5, 7.5]) {
    const g = new THREE.CylinderGeometry(0.22, 0.22, 1.2, 12);
    mb.geometry("frame", g, new THREE.Matrix4().makeTranslation(b.cx + Math.sign(b.cx) * 2.5, b.top + 0.6, z));
    const c = new THREE.CylinderGeometry(0.34, 0.34, 0.12, 12);
    mb.geometry("frame", c, new THREE.Matrix4().makeTranslation(b.cx + Math.sign(b.cx) * 2.5, b.top + 1.26, z));
  }
  // 舷窗：前墙外侧一排
  const fx = b.cx > 0 ? b.cx - b.hx + 0.3 - 0.02 : b.cx + b.hx - 0.3 + 0.02;
  for (const z of [-8.2, -3.3, 3.3, 8.2]) {
    const g = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 16);
    const m = new THREE.Matrix4().makeRotationZ(Math.PI / 2).setPosition(fx, 3.1, z);
    mb.geometry("glass", g, m);
    const ring = new THREE.TorusGeometry(0.26, 0.04, 6, 18);
    mb.geometry("frame", ring, new THREE.Matrix4().makeRotationY(Math.PI / 2).setPosition(fx, 3.1, z));
  }
}

function bridge(mb: MeshBuilder, b: Box): void {
  mb.box(b, (f) => (f === BOTTOM ? null : f === TOP ? { key: "croof", scale: 3 } : { key: "cabin", scale: 3 }));
  // 驾驶室窗带（四周）
  mb.box(sub(b, 0, 0.55, 0, b.hx + 0.02, 0.45, b.hz + 0.02), (f) => (f === TOP || f === BOTTOM ? null : { key: "glass", scale: 1 }));
  for (let z = -b.hz; z <= b.hz + 1e-3; z += 1.1) mb.box(sub(b, 0, 0.55, z, b.hx + 0.05, 0.46, 0.04), () => ({ key: "cabin" }));
  // 桅杆与雷达
  const mast = new THREE.CylinderGeometry(0.1, 0.14, 4.2, 10);
  mb.geometry("cabin", mast, new THREE.Matrix4().makeTranslation(b.cx, b.top + 2.1, b.cz));
  mb.box({ cx: b.cx, cy: b.top + 3.6, cz: b.cz, hx: 0.12, hy: 0.06, hz: 1.4, cos: 1, sin: 0 }, () => ({ key: "frame" }));
}

function locker(mb: MeshBuilder, b: Box): void {
  mb.box(b, (f) => (f === BOTTOM ? null : { key: "locker", fit: true }));
  const fx = b.cx > 0 ? -1 : 1; // 柜门朝舱内
  for (const dz of [-0.19, 0.19]) mb.box(sub(b, fx * (b.hx + 0.01), 0.2, dz, 0.012, 0.03, 0.08), () => ({ key: "frame" }));
}

function bollard(mb: MeshBuilder, b: Box): void {
  mb.box(sub(b, 0, -b.hy + 0.03, 0, b.hx, 0.03, b.hz), () => ({ key: "frame" }));
  for (const dx of [-0.16, 0.16]) {
    const g = new THREE.CylinderGeometry(0.1, 0.11, b.hy * 2 - 0.06, 12);
    mb.geometry("frame", g, new THREE.Matrix4().makeTranslation(b.cx + dx, b.cy + 0.03, b.cz));
  }
}

function railing(mb: MeshBuilder, b: Box): void {
  // 管材栏杆：立柱 + 两道横杆（与碰撞体同位，弹道规则见 MAP_REFERENCE）
  for (let x = -b.hx; x <= b.hx + 1e-3; x += 1.4) mb.box(sub(b, x, 0, 0, 0.03, b.hy, 0.03), () => ({ key: "rail" }));
  for (const y of [b.hy - 0.04, 0]) mb.box(sub(b, 0, y, 0, b.hx, 0.03, 0.03), () => ({ key: "rail" }));
}

function container(mb: MeshBuilder, b: Box): void {
  const look = b.look || "blue";
  mb.box(b, (f) => (f === TOP ? { key: "croof", scale: 2 } : f === BOTTOM ? null : f <= 1 ? { key: `cdoor-${look}`, fit: true } : { key: `cside-${look}`, fit: true }));
  const e = 0.035;
  // 角柱、上下纵梁、端框
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) mb.box(sub(b, sx * (b.hx - 0.08), 0, sz * (b.hz - 0.08), 0.1, b.hy + 0.005, 0.1 + e), () => ({ key: "frame" }));
  for (const sy of [-1, 1]) for (const sz of [-1, 1]) mb.box(sub(b, 0, sy * (b.hy - 0.07), sz * (b.hz - 0.06), b.hx - 0.1, 0.07, 0.06 + e), () => ({ key: "frame" }));
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) mb.box(sub(b, sx * (b.hx - 0.06), sy * (b.hy - 0.1), 0, 0.06 + e, 0.1, b.hz - 0.1), () => ({ key: "frame" }));
    // 门端闭锁杆
    for (const dz of [-0.95, -0.52, 0.52, 0.95]) mb.box(sub(b, sx * (b.hx + 0.03), 0, dz * b.hz, 0.025, b.hy - 0.22, 0.025), () => ({ key: "frame" }));
  }
}

function crate(mb: MeshBuilder, b: Box): void {
  const key = b.look === "small" ? "wood2" : "wood";
  mb.box(b, (f) => (f === BOTTOM ? null : { key, scale: b.hx * 2 }));
  const t = 0.05, o = 0.02;
  // 十二条边框木条
  for (const sy of [-1, 1]) for (const sz of [-1, 1]) mb.box(sub(b, 0, sy * (b.hy - t), sz * (b.hz - t + o), b.hx + o, t, t), () => ({ key: "woodDark", scale: 1 }));
  for (const sy of [-1, 1]) for (const sx of [-1, 1]) mb.box(sub(b, sx * (b.hx - t + o), sy * (b.hy - t), 0, t, t, b.hz + o), () => ({ key: "woodDark", scale: 1 }));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) mb.box(sub(b, sx * (b.hx - t + o), 0, sz * (b.hz - t + o), t, b.hy, t), () => ({ key: "woodDark", scale: 1 }));
  // 四个侧面的中横档
  for (const s of [-1, 1]) {
    mb.box(sub(b, 0, 0, s * (b.hz + o), b.hx, t * 0.8, 0.02), () => ({ key: "woodDark", scale: 1 }));
    mb.box(sub(b, s * (b.hx + o), 0, 0, 0.02, t * 0.8, b.hz), () => ({ key: "woodDark", scale: 1 }));
  }
}

function tarpCargo(mb: MeshBuilder, b: Box): void {
  const skidH = 0.22;
  // 木质底座：三根纵梁 + 横档
  for (const z of [-0.8, 0, 0.8]) mb.box(sub(b, 0, -b.hy + skidH / 2, z * b.hz, b.hx - 0.1, skidH / 2, 0.1), () => ({ key: "woodDark", scale: 1 }));
  for (let x = -b.hx + 0.3; x <= b.hx - 0.3; x += 1.2) mb.box(sub(b, x, -b.hy + skidH - 0.04, 0, 0.12, 0.04, b.hz), () => ({ key: "woodDark", scale: 1 }));
  // 篷布主体：细分盒体，顶面与侧面做下垂褶皱
  const w = b.hx * 2, h = b.hy * 2 - skidH, d = b.hz * 2;
  const g = new THREE.BoxGeometry(w, h, d, 24, 4, 8);
  const p = g.getAttribute("position");
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const ex = Math.abs(x) / (w / 2), ez = Math.abs(z) / (d / 2), ey = (y + h / 2) / h;
    const sag = (1 - ex ** 6) * (1 - ez ** 4) * 0.06 * (0.6 + 0.4 * Math.sin(x * 2.1 + z));
    const bulge = ey * (1 - ex ** 8) * 0.03 * Math.sin(x * 3.3 + y * 5);
    p.setY(i, y - (y > 0 ? sag : 0));
    p.setZ(i, z * (1 - 0.04 * ey ** 2) + Math.sign(z) * bulge);
    p.setX(i, x * (1 - 0.02 * ey ** 2));
  }
  g.computeVertexNormals();
  const m = new THREE.Matrix4().makeRotationY(b.yaw).setPosition(b.cx, b.cy - b.hy + skidH + h / 2, b.cz);
  mb.geometry("tarp", g, m);
  // 横向绑带
  for (const x of [-0.78, -0.3, 0.3, 0.78]) {
    mb.box(sub(b, x * b.hx, b.hy - 0.035, 0, 0.05, 0.02, b.hz + 0.02), () => ({ key: "strap" }));
    for (const s of [-1, 1]) mb.box(sub(b, x * b.hx, skidH / 2, s * (b.hz + 0.02), 0.05, b.hy - skidH / 2, 0.015), () => ({ key: "strap" }));
  }
}

/** 船壳：尖首方尾，水线下红色防污漆、水线白带、上部黑色 */
function hull(mats: Record<string, THREE.Material>): THREE.Mesh {
  const L = DECK.halfLength, W = DECK.halfWidth;
  const s = new THREE.Shape();
  s.moveTo(-L - 4, -W + 1.5);
  s.lineTo(L, -W);
  s.quadraticCurveTo(L + 12, -W + 1, L + 17, 0);
  s.quadraticCurveTo(L + 12, W - 1, L, W);
  s.lineTo(-L - 4, W - 1.5);
  s.quadraticCurveTo(-L - 6, 0, -L - 4, -W + 1.5);
  const depth = 9.2;
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, steps: 20, curveSegments: 16 });
  g.rotateX(-Math.PI / 2);
  g.translate(0, -depth - 0.42, 0);
  const pos = g.getAttribute("position");
  const col = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < -6.2) c.setRGB(0.42, 0.1, 0.08);
    else if (y < -5.8) c.setRGB(0.85, 0.85, 0.82);
    else c.setRGB(0.13, 0.14, 0.15);
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const side = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.7, metalness: 0.35 });
  const mesh = new THREE.Mesh(g, [mats.deck, side]);
  mesh.receiveShadow = true;
  return mesh;
}
