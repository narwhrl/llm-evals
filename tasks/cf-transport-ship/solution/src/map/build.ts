/**
 * 场景构建：mapData → three.js 网格（按材质合并，控制绘制调用）。
 * 船体、海面、天空、吊机、栏杆、海鸟等环境元素；碰撞体同步注册。
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { MapBlock, buildMapBlocks } from './mapData';
import { ColliderWorld } from '../physics/world';
import {
  cabinTex, containerTex, containerDoorTex, crateTex, deckTex, metalTex, seaTex, tarpTex,
} from './textures';

export interface MapBuildResult {
  group: THREE.Group;
  /** 动态环境更新（海面、云、海鸟、吊索） */
  update(t: number, dt: number): void;
  dispose(): void;
}

/** 按面尺寸缩放 Box UV，保持纹理密度 */
function scaleBoxUV(geo: THREE.BoxGeometry, w: number, h: number, d: number, s: number): THREE.BufferGeometry {
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  // 面：+x -x (d×h) / +y -y (w×d) / +z -z (w×h)
  const faces: Array<[number, number]> = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) {
    const [fu, fv] = faces[f];
    for (let i = 0; i < 4; i++) {
      const idx = f * 4 + i;
      uv.setXY(idx, uv.getX(idx) * fu * s, uv.getY(idx) * fv * s);
    }
  }
  return geo;
}

function tintGeo(geo: THREE.BufferGeometry, tint: [number, number, number]): THREE.BufferGeometry {
  const n = geo.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    arr[i * 3] = tint[0]; arr[i * 3 + 1] = tint[1]; arr[i * 3 + 2] = tint[2];
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

export function buildMap(world: ColliderWorld): MapBuildResult {
  const group = new THREE.Group();
  const blocks: MapBlock[] = buildMapBlocks();

  // 注册碰撞（一次）
  for (const b of blocks) {
    world.addBox({
      cx: b.cx, cy: b.cy, cz: b.cz, hx: b.hx, hy: b.hy, hz: b.hz, yaw: b.yaw,
      surface: b.surface, charBlock: b.charBlock, bulletBlock: b.bulletBlock,
      standable: b.standable, tag: b.tag,
    });
  }

  // 材质分组收集
  const buckets = new Map<string, { geos: THREE.BufferGeometry[]; mat: THREE.Material }>();
  const push = (key: string, mat: THREE.Material, geo: THREE.BufferGeometry) => {
    let b = buckets.get(key);
    if (!b) { b = { geos: [], mat }; buckets.set(key, b); }
    b.geos.push(geo);
  };

  const mkMat = (map: THREE.Texture, rough: number, metal: number) =>
    new THREE.MeshStandardMaterial({ map, roughness: rough, metalness: metal, vertexColors: true });

  const mDeck = mkMat(deckTex(), 0.94, 0.08);
  const mCabin = mkMat(cabinTex(), 0.82, 0.1);
  const mCrate = mkMat(crateTex(), 0.88, 0.02);
  const mTarp = mkMat(tarpTex(), 0.96, 0.0);
  const mMetalDark = mkMat(metalTex('#4a5054', 'dark'), 0.6, 0.7);
  const mCrane = mkMat(metalTex('#c9a13c', 'crane'), 0.55, 0.6);
  const mReel = mkMat(metalTex('#5d6a5f', 'reel'), 0.7, 0.5);
  const contMats: Record<string, THREE.Material> = {
    blue: mkMat(containerTex('#2e5f8a', '#9fc3e0'), 0.62, 0.35),
    rust: mkMat(containerTex('#8a5230', '#c98d5e'), 0.75, 0.3),
    green: mkMat(containerTex('#4a6b3a', '#a5c08a'), 0.68, 0.3),
  };
  const contDoorMats: Record<string, THREE.Material> = {
    blue: mkMat(containerDoorTex('#2e5f8a'), 0.6, 0.35),
    rust: mkMat(containerDoorTex('#8a5230'), 0.72, 0.3),
    green: mkMat(containerDoorTex('#4a6b3a'), 0.66, 0.3),
  };

  const jitter = () => 1 + (Math.random() - 0.5) * 0.12;

  for (const b of blocks) {
    const w = b.hx * 2, h = b.hy * 2, d = b.hz * 2;
    switch (b.kind) {
      case 'deck':
        continue; // 甲板用专用面片
      case 'container': {
        // 整箱用侧板材质 + 端面单独贴片
        const g = new THREE.BoxGeometry(w, h, d);
        push('cont' + b.variant, contMats[b.variant!], tintGeo(scaleBoxUV(g, w, h, d, 0.16), [jitter(), jitter(), jitter()]));
        // 门端贴片（两端）
        for (const s of [-1, 1]) {
          const gd = new THREE.PlaneGeometry(d * 0.96, h * 0.94);
          gd.translate(b.cx + s * (b.hx + 0.012) * Math.cos(b.yaw), b.cy, b.cz - s * (b.hx + 0.012) * Math.sin(b.yaw));
          gd.rotateY(b.yaw + (s > 0 ? Math.PI / 2 : -Math.PI / 2));
          push('contDoor' + b.variant, contDoorMats[b.variant!], tintGeo(gd, [1, 1, 1]));
        }
        continue;
      }
      case 'crate':
        push('crate', mCrate, tintGeo(scaleBoxUV(new THREE.BoxGeometry(w, h, d), w, h, d, 0.9), [jitter(), jitter(), jitter()]));
        break;
      case 'diagonal': {
        const g = new THREE.BoxGeometry(w, h, d);
        g.rotateY(b.yaw);
        g.translate(b.cx, b.cy, b.cz);
        push('tarp', mTarp, tintGeo(scaleBoxUV(g, w, h, d, 0.3).applyMatrix4(new THREE.Matrix4().makeRotationY(0)), [jitter(), jitter(), jitter()]));
        // 绑带（视觉）
        for (let i = -1; i <= 1; i++) {
          const strap = new THREE.BoxGeometry(0.16, h + 0.05, d + 0.06);
          strap.rotateY(b.yaw);
          strap.translate(b.cx + i * 2.6 * Math.cos(b.yaw), b.cy, b.cz - i * 2.6 * Math.sin(b.yaw));
          push('straps', mMetalDark, tintGeo(strap, [0.8, 0.8, 0.8]));
        }
        break;
      }
      case 'cabinWall': case 'lintel': case 'roof':
        push('cabin', mCabin, tintGeo(scaleBoxUV(new THREE.BoxGeometry(w, h, d), w, h, d, 0.22), [1, 1, 1]));
        break;
      case 'bulwark': case 'machinery': case 'locker':
        push('metal', mMetalDark, tintGeo(scaleBoxUV(new THREE.BoxGeometry(w, h, d), w, h, d, 0.3), [jitter(), jitter(), jitter()]));
        break;
      case 'post': {
        const g = new THREE.CylinderGeometry(0.045, 0.045, h, 6);
        g.translate(b.cx, b.cy, b.cz);
        push('posts', mMetalDark, tintGeo(g, [1, 1, 1]));
        break;
      }
      case 'craneBase':
        push('crane', mCrane, tintGeo(scaleBoxUV(new THREE.BoxGeometry(w, h, d), w, h, d, 0.5), [1, 1, 1]));
        break;
      case 'reel': {
        const g = new THREE.CylinderGeometry(0.75, 0.75, 1.0, 14);
        g.rotateZ(Math.PI / 2);
        g.translate(b.cx, b.cy, b.cz);
        push('reel', mReel, tintGeo(g, [1, 1, 1]));
        break;
      }
      case 'invisible':
        continue;
      default:
        break;
    }
  }

  // 甲板面片
  const deckGeo = new THREE.PlaneGeometry(130, 31);
  deckGeo.rotateX(-Math.PI / 2);
  deckGeo.translate(0, 0.005, 0);
  push('deckPlane', mDeck, tintGeo(deckGeo, [1, 1, 1]));
  // 甲板下裙板（船体甲板包边）
  const skirt = new THREE.BoxGeometry(130, 0.9, 31.2);
  skirt.translate(0, -0.45, 0);
  push('skirt', mMetalDark, tintGeo(skirt, [1, 1, 1]));

  // ---- 船体（视觉） ----
  const hullMat = new THREE.MeshStandardMaterial({ color: 0x7a2f24, roughness: 0.9, metalness: 0.25, vertexColors: true });
  const hullGeos: THREE.BufferGeometry[] = [];
  const hullMid = new THREE.BoxGeometry(108, 8.4, 30.6);
  hullMid.translate(-8, -4.4, 0);
  hullGeos.push(tintGeo(hullMid, [1, 1, 1]));
  const hullStern = new THREE.BoxGeometry(21, 8.4, 30.6);
  hullStern.translate(-64.5 + 10.5, -4.4, 0);
  hullGeos.push(tintGeo(hullStern, [1, 1, 1]));
  const bow = new THREE.CylinderGeometry(0.5, 15.3, 8.4, 4, 1, false, Math.PI * 0.25, Math.PI * 0.5);
  bow.rotateX(Math.PI / 2);
  bow.rotateY(Math.PI / 4);
  bow.translate(46, -4.4, 0);
  hullGeos.push(tintGeo(bow, [1, 1, 1]));
  // 水线亮带
  const waterline = new THREE.BoxGeometry(129.5, 0.5, 30.7);
  waterline.translate(-8, -7.8, 0);
  hullGeos.push(tintGeo(waterline, [1.6, 1.5, 1.3]));
  push('hull', hullMat, mergeGeometries(hullGeos.map((g) => g))!);

  // ---- 海面 ----
  const seaMat = new THREE.MeshStandardMaterial({ map: seaTex(), roughness: 0.25, metalness: 0.55, color: 0x9fc8d8 });
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), seaMat);
  sea.rotation.x = -Math.PI / 2;
  sea.position.y = -8.2;
  group.add(sea);

  // ---- 天空 ----
  const skyGeo = new THREE.SphereGeometry(420, 24, 16);
  const skyMat = new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true, fog: false });
  {
    const pos = skyGeo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const top = new THREE.Color(0x3f74a8), mid = new THREE.Color(0x9dc0d8), bot = new THREE.Color(0xc8d8de);
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 420;
      const c = y > 0 ? top.clone().lerp(mid, 1 - y) : mid.clone().lerp(bot, -y * 2);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    skyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }
  const sky = new THREE.Mesh(skyGeo, skyMat);
  group.add(sky);
  // 太阳
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(14, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xfff3d0, fog: false }),
  );
  sun.position.set(220, 260, -180);
  group.add(sun);

  // 云（缓慢漂移的公告板）
  const clouds: THREE.Mesh[] = [];
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xf2f6f8, transparent: true, opacity: 0.82, fog: false, side: THREE.DoubleSide });
  for (let i = 0; i < 10; i++) {
    const w = 60 + Math.random() * 90;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * 0.22), cloudMat);
    m.position.set((Math.random() - 0.5) * 600, 120 + Math.random() * 80, (Math.random() - 0.5) * 600);
    m.lookAt(0, 60, 0);
    clouds.push(m);
    group.add(m);
  }

  // ---- 栏杆横杆（视觉） ----
  const railMat = new THREE.MeshStandardMaterial({ color: 0x9aa4a8, roughness: 0.45, metalness: 0.8 });
  for (const s of [-1, 1]) {
    for (const h of [0.66, 1.02]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(103, 0.05, 0.05), railMat);
      rail.position.set(0, h, 14.72 * s);
      group.add(rail);
    }
  }

  // ---- 吊机（船首左舷） ----
  const crane = new THREE.Group();
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.9, 7.5, 0.9), mCrane.clone());
  tower.position.set(0, 3.75, 0);
  crane.add(tower);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 1.6), mMetalDark.clone());
  cab.position.set(0, 6.2, 0);
  crane.add(cab);
  const jib = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 12), mCrane.clone());
  jib.position.set(0, 7.3, -5.4);
  jib.rotation.x = 0.42;
  crane.add(jib);
  const cable = new THREE.Mesh(new THREE.BoxGeometry(0.03, 3.2, 0.03), railMat);
  cable.position.set(0, 5.2, -10.6);
  crane.add(cable);
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.3), railMat);
  hook.position.set(0, 3.4, -10.6);
  crane.add(hook);
  crane.position.set(46, 2, -8.5);
  crane.rotation.y = -0.5;
  group.add(crane);

  // ---- 舱室窗户（视觉玻璃，不碰撞不挡弹） ----
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x18262e, roughness: 0.15, metalness: 0.8 });
  for (const sx of [1, -1]) {
    for (const sz of [1, -1]) {
      const win = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8), glassMat);
      win.position.set((52 - 0.25) * sx, 4.2, 3 * sz);
      win.rotation.y = sx > 0 ? Math.PI : 0;
      group.add(win);
      const win2 = win.clone();
      win2.position.y = 4.2;
      win2.position.z = 3 * sz * -1;
      group.add(win2);
    }
    // 门框
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.0, 2.9), railMat);
    frame.position.set(52 * sx, 1.5, 0);
    group.add(frame);
  }

  // ---- 舱顶排风筒 ----
  const ventMat = mMetalDark.clone();
  for (const sx of [1, -1]) {
    const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 1.6, 8), ventMat);
    vent.position.set(58 * sx, 7.6, 3);
    group.add(vent);
    const vent2 = vent.clone();
    vent2.position.z = -3;
    group.add(vent2);
  }

  // ---- 海鸟 ----
  const gulls: Array<{ mesh: THREE.Mesh; phase: number; r: number; cy: number; speed: number }> = [];
  const gullMat = new THREE.MeshBasicMaterial({ color: 0xe8eef2, side: THREE.DoubleSide, fog: true });
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), gullMat);
    group.add(m);
    gulls.push({ mesh: m, phase: Math.random() * 6.28, r: 30 + Math.random() * 40, cy: 14 + Math.random() * 8, speed: 0.05 + Math.random() * 0.04 });
  }

  // ---- 合并静态几何 ----
  for (const [key, bucket] of buckets) {
    if (!bucket.geos.length) continue;
    const merged = mergeGeometries(bucket.geos, false);
    if (!merged) continue;
    const mesh = new THREE.Mesh(merged, bucket.mat);
    mesh.castShadow = key !== 'deckPlane' && key !== 'skirt';
    mesh.receiveShadow = true;
    mesh.name = 'static:' + key;
    group.add(mesh);
    bucket.geos.forEach((g) => g.dispose());
  }

  const seaTexRef = seaMat.map!;

  return {
    group,
    update(t: number, dt: number) {
      seaTexRef.offset.x = t * 0.008;
      seaTexRef.offset.y = t * 0.005;
      for (const c of clouds) {
        c.position.x += dt * 1.2;
        if (c.position.x > 330) c.position.x = -330;
      }
      for (const g of gulls) {
        g.phase += dt * g.speed;
        g.mesh.position.set(Math.cos(g.phase) * g.r, g.cy + Math.sin(g.phase * 3) * 1.5, Math.sin(g.phase) * g.r * 0.6);
        g.mesh.rotation.y = -g.phase + Math.PI / 2;
        g.mesh.scale.y = 0.4 + Math.abs(Math.sin(t * 9 + g.phase * 20)) * 0.9;
      }
    },
    dispose() {
      group.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
    },
  };
}
