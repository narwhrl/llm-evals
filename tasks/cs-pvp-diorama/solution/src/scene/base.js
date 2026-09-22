// 沙盘底座：一块完整的正方形混凝土底座，侧面收边、顶面由湿地地面覆盖。
import * as THREE from 'three';
import { LAYOUT } from './layout.js';
import { LAYER, BASE_SIZE, BASE_SLAB } from '../core/stage.js';
import { createMeshBuilder } from '../build/meshBuilder.js';

export function buildBase({ root, materials, rng }) {
  const half = BASE_SIZE / 2;
  const group = new THREE.Group();
  group.name = 'region:base';
  root.add(group);

  // 主体：一块方形混凝土底板，顶面与地面 shader 齐平。
  const slab = createMeshBuilder(materials.get('concreteBase'), 'base:slab');
  slab.box(BASE_SIZE, BASE_SLAB, BASE_SIZE, 0, -BASE_SLAB, 0, { anchor: 'bottom' });
  slab.finish(group, { castShadow: true, receiveShadow: true });

  // 顶部窄边：小一圈的收边条，形成微缩模型的“台面”层次。
  const lip = createMeshBuilder(materials.get('concrete'), 'base:lip');
  lip.box(BASE_SIZE + 0.12, 0.2, BASE_SIZE + 0.12, 0, -0.2, 0, { anchor: 'bottom' });
  lip.finish(group, { castShadow: true, receiveShadow: true });

  // 底座四角的斑驳与积水痕：贴地深色条带，避免侧面过于干净。
  const wear = createMeshBuilder(materials.get('concreteDark'), 'base:wear');
  const bandHeight = 0.5;
  for (let i = 0; i < 4; i += 1) {
    const angle = (i * Math.PI) / 2;
    const offset = half + 0.07;
    const x = Math.sin(angle) * offset;
    const z = Math.cos(angle) * offset;
    wear.box(BASE_SIZE * 0.86, bandHeight, 0.06, x, -BASE_SLAB + 0.05, z, { rotY: angle, anchor: 'bottom' });
  }
  wear.finish(group, { castShadow: false, receiveShadow: true });

  // 底座整体归到地面层：不参与反射自身，但保留描边轮廓。
  group.traverse((object) => {
    if (object.isMesh) object.layers.set(LAYER.GROUND);
  });

  return { group, bounds: { minX: -half, maxX: half, minZ: -half, maxZ: half } };
}

export const BASE_INFO = { size: BASE_SIZE, slab: BASE_SLAB, layout: LAYOUT.bounds };
