import * as THREE from 'three';
import { createMaterials } from './common.js';
import { batchStatic } from '../core/batching.js';
import { buildShell } from './shell.js';
import { buildFloor } from './floor.js';
import { buildPortholes } from './portholes.js';
import { buildHatches } from './hatches.js';
import { buildRibs } from './ribs.js';
import { buildCables } from './cables.js';
import { buildDetails } from './details.js';
import { buildLightstrip } from './lightstrip.js';
import { buildShadowShell } from './shadow.js';

/** Build the textured, genuinely perforated cut-away structure. See docs/DESIGN.md. */
export function buildCabin(ctx) {
  const group = new THREE.Group(); group.name = 'cabin';
  const materials = createMaterials();
  buildShell(ctx, group, materials);
  group.traverse(o => { if (o.isMesh) o.castShadow = true; });
  buildFloor(ctx, group, materials);
  buildRibs(ctx, group, materials);
  buildPortholes(ctx, group, materials);
  buildHatches(ctx, group, materials);
  buildCables(ctx, group, materials);
  buildDetails(ctx, group, materials);
  buildLightstrip(ctx, group, materials);
  buildShadowShell(ctx, group);
  ctx.scene.add(group);
  batchStatic(group);
  return {};
}
