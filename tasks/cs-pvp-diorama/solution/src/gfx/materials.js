// 材质库：全部基于程序化贴图，按名称缓存；户外表面统一注入雨水下淌效果。
import * as THREE from 'three';
import * as tex from './textures.js';
import { toonMaterial, glowMaterial, addRunoff } from './toon.js';

const PAINTED = {
  paintedMetalBlue: 0x35618f,
  paintedMetalGreen: 0x2f5a49,
  paintedMetalGray: 0x8a9099,
  paintedMetalOrange: 0xb96a26,
  paintedMetalWhite: 0xb7bcc0,
  paintedMetalRed: 0x8d3a31,
  paintedMetalYellow: 0xb59a3a,
};

const LAMPS = {
  lampWarm: 0xffb257,
  lampCool: 0xd8e9ff,
  lampRed: 0xff3524,
  lampBlue: 0x3f74ff,
  lampGreen: 0x38e08a,
  lampOff: 0x2b3138,
};

function surface(set, options = {}) {
  const { map, normalMap } = set;
  const material = toonMaterial({ ...options, map, normalMap });
  if (normalMap) material.normalScale.set(options.normalScale ?? 1, options.normalScale ?? 1);
  return material;
}

export function createMaterials() {
  const cache = new Map();
  let runoffMap = null;

  const builders = {
    // ---- 混凝土与地面 ----------------------------------------------------
    concrete: () => surface(tex.concrete(), { color: 0xa9adb2 }),
    concreteWall: () => surface(tex.concreteWall(), { color: 0x9ba1a7 }),
    concreteFloor: () => surface(tex.concreteFloor(), { color: 0x9ea3a8 }),
    concreteDark: () => surface(tex.concrete(), { color: 0x7d838a }),
    concreteBase: () => surface(tex.concrete(), { color: 0x767c84 }),
    gravel: () => surface(tex.gravel(), { color: 0x6f6c66 }),

    // ---- 金属 ------------------------------------------------------------
    rustMetal: () => surface(tex.rustMetal(), { color: 0xb0a49a }),
    corrugated: () => surface(tex.corrugated(), { color: 0xa8b0b6 }),
    checkeredPlate: () => surface(tex.checkeredPlate(), { color: 0x8d949b }),
    darkMetal: () => toonMaterial({ color: 0x30363d }),
    wire: () => toonMaterial({ color: 0x1a1e23 }),

    // ---- 木、纸、织物 ----------------------------------------------------
    wood: () => surface(tex.wood(), { color: 0xa08c6e }),
    crateWood: () => surface(tex.crateWood(), { color: 0xa38f70 }),
    cardboard: () => surface(tex.cardboard(), { color: 0xa8916f }),
    sack: () => surface(tex.sack(), { color: 0x9c8f74 }),
    sandbag: () => surface(tex.sandbag(), { color: 0x9a917c }),
    tarp: () => surface(tex.tarp(), { color: 0x6d7261 }),
    rubber: () => surface(tex.rubber(), { color: 0x4a4f55 }),
    plasticBarrier: () => surface(tex.plasticBarrier(), { color: 0xc0b6ad }),
    rosterPaper: () => toonMaterial({ color: 0xb3ac9c }),

    // ---- 玻璃与镜面 ------------------------------------------------------
    glassDirty: () => {
      const set = tex.glassDirty();
      const material = toonMaterial({
        map: set.map,
        normalMap: set.normalMap,
        alphaMap: set.alpha,
        transparent: true,
        opacity: 0.72,
        color: 0x9fb2c2,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      material.alphaTest = 0;
      return material;
    },
  };

  for (const [name, hex] of Object.entries(PAINTED)) {
    builders[name] = () => surface(tex.paintedMetal(hex), { color: 0xffffff });
  }
  for (const [name, hex] of Object.entries(LAMPS)) {
    builders[name] = () => glowMaterial(hex);
  }

  return {
    get(name) {
      if (!cache.has(name)) {
        const build = builders[name];
        if (!build) {
          throw new Error(`unknown material: ${name} (valid: ${Object.keys(builders).join(', ')})`);
        }
        cache.set(name, build());
      }
      return cache.get(name);
    },
    // 户外表面叠加雨水下淌条纹的版本（同一材质，附加 shader 注入）。
    wet(name, options) {
      const key = `wet:${name}`;
      if (!cache.has(key)) {
        if (!runoffMap) runoffMap = tex.runoffStreak().map;
        const base = toonMaterial();
        base.copy(this.get(name));
        const runoff = { map: runoffMap, ...options };
        addRunoff(base, runoff);
        cache.set(key, base);
      }
      return cache.get(key);
    },
    names: () => Object.keys(builders),
    dispose() {
      for (const material of cache.values()) material.dispose();
      cache.clear();
    },
  };
}

// 静态几何可用的「湿面」处理：批量给一组材质挂上雨水条纹。
export function wettenUp(materials, names, options) {
  return names.map((name) => materials.wet(name, options));
}
