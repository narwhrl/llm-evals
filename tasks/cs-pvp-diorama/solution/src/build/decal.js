// 贴花：涂鸦、货运编号、弹孔、包点喷漆、警徽等，贴在墙面/地面且不参与描边取样。
import * as THREE from 'three';
import * as tex from '../gfx/textures.js';
import { LAYER } from '../core/stage.js';

const DECAL_SOURCES = {
  graffiti: () => tex.graffitiSheet().map,
  freight: () => tex.freightNumber().map,
  bullets: () => tex.bulletHoles().map,
  siteA: () => tex.bombSiteMark('A').map,
  siteB: () => tex.bombSiteMark('B').map,
  badge: () => tex.policeBadge().map,
  warning: () => tex.warningSign().map,
  roster: () => tex.rosterPaper().map,
};

// 贴花走不受光的 MeshBasicMaterial，夜里若按原始亮度绘制会像贴纸。按类型压暗并控制不透明度，
// 让它接近墙面的明度层次；包点喷漆最亮，以保证可读性。
const DECAL_STYLE = {
  graffiti: { tint: 0x9098a0, opacity: 0.8 },
  freight: { tint: 0xa8aeb4, opacity: 0.85 },
  bullets: { tint: 0x8c9298, opacity: 0.7 },
  siteA: { tint: 0xc6ccd2, opacity: 0.95 },
  siteB: { tint: 0xc6ccd2, opacity: 0.95 },
  badge: { tint: 0xa8aeb4, opacity: 0.9 },
  warning: { tint: 0xa8aeb4, opacity: 0.9 },
  roster: { tint: 0xa8aeb4, opacity: 0.9 },
};

export function createDecalFactory({ parent }) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const materials = new Map();
  let count = 0;

  function materialFor(type, opacity) {
    const style = DECAL_STYLE[type];
    const source = DECAL_SOURCES[type];
    if (!source) {
      throw new Error(`unknown decal: ${type} (valid: ${Object.keys(DECAL_SOURCES).join(', ')})`);
    }
    const alpha = Math.round(style.opacity * opacity * 100) / 100;
    const key = `${type}|${alpha}`;
    if (!materials.has(key)) {
      materials.set(
        key,
        new THREE.MeshBasicMaterial({
          map: source(),
          color: style.tint,
          opacity: alpha,
          transparent: true,
          depthWrite: false,
          alphaTest: 0.02,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: -6,
          polygonOffsetUnits: -6,
          fog: true,
        }),
      );
    }
    return materials.get(key);
  }

  return {
    add(type, x, y, z, options = {}) {
      const {
        rotX = -Math.PI / 2,
        rotY = 0,
        rotZ = 0,
        w = 1.6,
        h = 1.6,
        opacity = 1,
      } = options;

      const mesh = new THREE.Mesh(geometry, materialFor(type, opacity));
      mesh.name = `decal:${type}`;
      mesh.userData.auditExclude = true;
      mesh.renderOrder = 3;
      mesh.layers.set(LAYER.DECAL);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rotX, rotY, rotZ);
      mesh.scale.set(w, h, 1);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      parent.add(mesh);
      count += 1;
      return mesh;
    },
    get count() {
      return count;
    },
  };
}
