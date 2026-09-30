// Worker B: furniture only; every actual light belongs to the lighting module.
import { createKit } from './kit.js';
import { batchStatic, auditFurnitureShadows } from '../core/batching.js';
import { buildSleeping } from './sleeping.js';
import { buildWorkstation } from './workstation.js';
import { buildChair } from './chair.js';
import { buildPlants } from './plants.js';
import { buildFitness } from './fitness.js';
import { buildStorage } from './storage.js';
import { buildClutter } from './clutter.js';
import { buildFloaters } from './floaters.js';

/** @param {object} ctx shared context from main.js */
export function buildFurniture(ctx) {
  const k = createKit(ctx);
  const root = new ctx.THREE.Group(); root.name = 'furniture'; ctx.scene.add(root);
  const sleeping = buildSleeping(k, root);
  const workstation = buildWorkstation(k, root);
  const chair = buildChair(k, root);
  const plants = buildPlants(k, root);
  buildFitness(k, root); buildStorage(k, root); buildClutter(k, root, workstation.group);
  const floaters = buildFloaters(k, root);
  auditFurnitureShadows(root, ctx.portholes);
  const animated = new Set([root.getObjectByName('zipperPull'),
    ...root.children.filter(o => o.name.startsWith('floating'))]);
  batchStatic(root, animated);
  const lightPositions = {
    reading: sleeping.readingPosition, laptop: workstation.laptopPosition, grow: plants.growPosition,
  };
  root.userData.lightPositions = lightPositions;
  ctx.scene.userData.furnitureLightPositions = lightPositions;
  const updates = [sleeping.update, workstation.update, chair.update, plants.update, floaters.update];
  return { lightPositions, update(dt, t) {
    for (let i = 0; i < updates.length; i++) updates[i](dt, t);
  } };
}
