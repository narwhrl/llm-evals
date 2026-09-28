// 世界装配：构造区域 API（ctx）并依次调用各区域模块，最终统一 flush 道具批次。
import * as THREE from 'three';
import { LAYOUT } from './layout.js';
import { buildBase } from './base.js';
import { createMeshBuilder } from '../build/meshBuilder.js';
import { createPropBatch } from '../build/propBatch.js';
import { createDecalFactory } from '../build/decal.js';
import { createGround, createWaterSurface } from '../ground/ground.js';
import { buildTSpawn } from './tSpawn.js';
import { buildASite } from './aSite.js';
import { buildMid } from './mid.js';
import { buildBSite } from './bSite.js';
import { buildCTSpawn } from './ctSpawn.js';
import { buildRoutes } from './routes.js';
import { buildOverhead } from './overhead.js';
import { buildInteriors } from './interiors.js';

// 区域 API 工厂：与浏览器渲染无关，可在 Node 中复用做无头构建校验。
export function createWorldContext({
  root,
  materials,
  rng,
  propBatch,
  decals,
  lightRig,
  fxSources,
  waterFactory,
}) {
  const stats = { builders: 0, decals: 0, lights: 0, props: 0, water: 0 };
  let builderIndex = 0;
  let currentRegion = 'world';

  const api = {
    LAYOUT,
    rng,
    region(name) {
      currentRegion = name;
      return api;
    },
    mat(name) {
      return materials.get(name);
    },
    matWet(name, options) {
      return materials.wet(name, options);
    },
    // 静态几何构建器：finish() 自动合并进世界根节点并按区域命名。
    mb(materialName, options = {}) {
      const name = `${currentRegion}:${materialName}#${builderIndex++}`;
      const builder = createMeshBuilder(api.mat(materialName), name);
      const merge = builder.finish;
      builder.finish = (finishOptions = {}) => {
        stats.builders += 1;
        return merge(root, {
          name,
          castShadow: options.castShadow ?? true,
          receiveShadow: options.receiveShadow ?? true,
          layer: options.layer,
          ...finishOptions,
        });
      };
      return builder;
    },
    prop(type, x, y, z, options) {
      stats.props += 1;
      return propBatch.add(type, x, y, z, options);
    },
    decal(type, x, y, z, options) {
      stats.decals += 1;
      return decals.add(type, x, y, z, options);
    },
    light(options) {
      stats.lights += 1;
      return lightRig.add(options);
    },
    registerEmissive(material, anim, options) {
      return lightRig.registerEmissive(material, anim, options);
    },
    // 排水沟/下水道等静止水面
    water(x, y, z, width, depth, options = {}) {
      if (!waterFactory) throw new Error('water factory unavailable');
      stats.water += 1;
      const surface = waterFactory({ width, depth, time: options.time ?? 0 });
      surface.mesh.position.set(x, y, z);
      surface.mesh.name = `${currentRegion}:water#${stats.water}`;
      root.add(surface.mesh);
      return surface.mesh;
    },
    // 带门洞/窗洞的墙，沿局部 X 轴布置；holes: [{ at, width, from, height }]
    wall({ x, z, length, height, thickness, rotY = 0, material = 'concreteWall', holes = [], anchor = 'start' }) {
      const builder = api.mb(material);
      const originOffset = anchor === 'center' ? -length / 2 : 0;
      const pieces = [];
      let cursor = 0;
      const sorted = [...holes].sort((a, b) => a.at - b.at);
      const pushPiece = (from, to, fromY, toY) => {
        if (to - from <= 0.001 || toY - fromY <= 0.001) return;
        pieces.push({ from, to, fromY, toY });
      };
      for (const hole of sorted) {
        pushPiece(cursor, hole.at, 0, height);
        const holeTop = hole.from + hole.height;
        if (hole.from > 0) pushPiece(hole.at, hole.at + hole.width, 0, hole.from);
        if (holeTop < height) pushPiece(hole.at, hole.at + hole.width, holeTop, height);
        cursor = hole.at + hole.width;
      }
      pushPiece(cursor, length, 0, height);

      for (const piece of pieces) {
        const width = piece.to - piece.from;
        const localX = originOffset + (piece.from + piece.to) / 2;
        const pieceHeight = piece.toY - piece.fromY;
        const dx = Math.cos(rotY) * localX;
        const dz = -Math.sin(rotY) * localX;
        builder.box(width, pieceHeight, thickness, x + dx, piece.fromY, z + dz, { rotY, anchor: 'bottom' });
      }
      return builder.finish();
    },
    fx: {
      drip(x, y, z, options = {}) {
        fxSources.drips.push({ x, y, z, ...options });
      },
      steam(x, y, z, options = {}) {
        fxSources.steam.push({ x, y, z, ...options });
      },
    },
    stats,
    get currentRegion() {
      return currentRegion;
    },
  };

  return api;
}

export function buildWorld({ scene, materials, reflection, timeUniform, lightRig, keyLight, rng }) {
  const root = new THREE.Group();
  root.name = 'world';
  scene.add(root);

  const propBatch = createPropBatch({ materials, rng });
  const decals = createDecalFactory({ parent: root });
  const fxSources = { drips: [], steam: [] };

  const base = buildBase({ root, materials, rng });
  const ground = createGround({ reflection, timeUniform, scene, keyLight, size: LAYOUT.bounds.maxX - LAYOUT.bounds.minX });
  ground.mesh.name = 'ground:base';
  root.add(ground.mesh);

  const waterFactory = (options) => {
    const surface = createWaterSurface({ reflection, timeUniform, scene, ...options });
    surface.mesh.castShadow = false;
    surface.mesh.receiveShadow = false;
    return surface;
  };

  const api = createWorldContext({ root, materials, rng, propBatch, decals, lightRig, fxSources, waterFactory });

  api.region('t-spawn');
  buildTSpawn(api);
  api.region('a-site');
  buildASite(api);
  api.region('mid');
  buildMid(api);
  api.region('b-site');
  buildBSite(api);
  api.region('ct-spawn');
  buildCTSpawn(api);
  api.region('routes');
  buildRoutes(api);
  api.region('overhead');
  buildOverhead(api);
  api.region('interiors');
  buildInteriors(api);

  propBatch.flush(root);

  return {
    root,
    ground,
    propBatch,
    decals,
    fxSources,
    stats: api.stats,
    audit() {
      return {
        props: propBatch.count,
        propBatches: propBatch.batchCount,
        staticMeshes: api.stats.builders,
        decals: decals.count,
        waterSurfaces: api.stats.water,
        lightsRegistered: api.stats.lights,
        dripSources: fxSources.drips.length,
        steamSources: fxSources.steam.length,
        propSummary: propBatch.summary(),
      };
    },
  };
}
