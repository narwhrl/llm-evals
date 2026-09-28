import * as THREE from "three";
import { C, toon, std } from "./palette.js";

// 共享单位几何
export const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
export const UNIT_BOX_EDGES = new THREE.EdgesGeometry(UNIT_BOX, 20);
const hullMat = new THREE.ShaderMaterial({
  uniforms: { uThickness: { value: 0.02 } },
  vertexShader: `
    uniform float uThickness;
    void main() {
      vec3 p = position + normal * uThickness;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }`,
  fragmentShader: `
    void main() { gl_FragColor = vec4(0.043, 0.055, 0.086, 1.0); }`,
  side: THREE.BackSide,
});

const edgeLineMat = new THREE.LineBasicMaterial({ color: C.outline });
edgeLineMat.transparent = true;
edgeLineMat.opacity = 0.85;

const cylEdgesCache = new Map();
function edgesFor(geometry) {
  const key = geometry.uuid;
  if (!cylEdgesCache.has(key)) cylEdgesCache.set(key, new THREE.EdgesGeometry(geometry, 28));
  return cylEdgesCache.get(key);
}

// 深色轮廓线：硬表面用棱线，曲面用 inverted hull
export function outline(mesh, opts = {}) {
  const geo = mesh.geometry;
  if (geo === UNIT_BOX) {
    const lines = new THREE.LineSegments(UNIT_BOX_EDGES, edgeLineMat);
    lines.renderOrder = (mesh.renderOrder ?? 0) + 1;
    mesh.add(lines);
    return mesh;
  }
  if (opts.hull) {
    const hull = new THREE.Mesh(geo, hullMat);
    hull.renderOrder = (mesh.renderOrder ?? 0) + 1;
    mesh.add(hull);
    return mesh;
  }
  const lines = new THREE.LineSegments(edgesFor(geo), edgeLineMat);
  lines.renderOrder = (mesh.renderOrder ?? 0) + 1;
  mesh.add(lines);
  return mesh;
}

let uid = 0;
export function nextUid() {
  return ++uid;
}

// 建造器：统一创建网格、投影、描边
export class Kit {
  constructor(root) {
    this.root = root;
    this.stack = []; // kit.group() 推入，kit.end() 弹出；期间所有 kit.* 挂到组内
    this.dynamic = []; // 需要每帧更新的对象（flicker/jitter）
  }

  add(object) {
    (this.stack[this.stack.length - 1] || this.root).add(object);
    return object;
  }

  group(x = 0, y = 0, z = 0) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    this.root.add(g);
    this.stack.push(g);
    return g;
  }

  end() {
    this.stack.pop();
  }

  mesh(geometry, material, x = 0, y = 0, z = 0, opts = {}) {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    if (opts.rx) m.rotation.x = opts.rx;
    if (opts.ry) m.rotation.y = opts.ry;
    if (opts.rz) m.rotation.z = opts.rz;
    m.castShadow = opts.cast !== false;
    m.receiveShadow = opts.receive !== false;
    (this.stack[this.stack.length - 1] || this.root).add(m);
    return m;
  }

  // 带描边的盒体（w/h/d 全尺寸），y 为底面高度
  box(w, h, d, material, x = 0, y = 0, z = 0, opts = {}) {
    const m = this.mesh(UNIT_BOX, material, x, y + h / 2, z, opts);
    m.scale.set(w, h, d);
    if (opts.outline !== false) outline(m);
    return m;
  }

  cyl(rt, rb, h, seg, material, x = 0, y = 0, z = 0, opts = {}) {
    const geo = new THREE.CylinderGeometry(rt, rb, h, seg, 1);
    const m = this.mesh(geo, material, x, y + h / 2, z, opts);
    if (opts.outline !== false) outline(m, { hull: true });
    return m;
  }

  // 贴地/贴墙 decal 平面
  decal(tex, w, h, x, y, z, opts = {}) {
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      opacity: opts.opacity ?? 1,
    });
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -2;
    const m = this.mesh(new THREE.PlaneGeometry(w, h), mat, x, y, z, {
      cast: false,
      receive: false,
      rx: opts.rx ?? -Math.PI / 2,
      ry: opts.ry ?? 0,
      rz: opts.rz ?? 0,
    });
    m.renderOrder = 5;
    return m;
  }

  light(color, intensity, distance, x, y, z, opts = {}) {
    const l = new THREE.PointLight(color, intensity, distance, opts.decay ?? 2);
    l.position.set(x, y, z);
    if (opts.cast) {
      l.castShadow = true;
      l.shadow.mapSize.set(512, 512);
      l.shadow.bias = -0.004;
    }
    (this.stack[this.stack.length - 1] || this.root).add(l);
    return l;
  }

  spot(color, intensity, distance, angle, penumbra, x, y, z, tx, ty, tz, opts = {}) {
    const s = new THREE.SpotLight(color, intensity, distance, angle, penumbra, opts.decay ?? 1.6);
    s.position.set(x, y, z);
    s.target.position.set(tx, ty, tz);
    if (opts.cast) {
      s.castShadow = true;
      s.shadow.mapSize.set(1024, 1024);
      s.shadow.bias = -0.003;
      s.shadow.camera.near = 0.5;
      s.shadow.camera.far = distance;
    }
    this.root.add(s);
    this.root.add(s.target);
    return s;
  }

  // 光晕精灵（加色）
  halo(color, size, x, y, z, tex, opacity = 0.35) {
    const mat = new THREE.SpriteMaterial({
      map: tex,
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const s = new THREE.Sprite(mat);
    s.scale.set(size, size, 1);
    s.position.set(x, y, z);
    (this.stack[this.stack.length - 1] || this.root).add(s);
    return s;
  }
}

export { toon, std };
