// Turns the story table into scene objects and moves them through the years.
import * as THREE from 'three';
import { group } from './kit.js';
import * as furniture from './furniture.js';
import * as tech from './tech.js';
import * as gear from './gear.js';
import * as keepsakes from './keepsakes.js';
import * as clutter from './clutter.js';
import * as collection from './collection.js';
import { ITEMS, active, poseAt } from './story.js';

const BUILD = {
  ...furniture, ...tech, ...gear, ...keepsakes, ...clutter, ...collection,
  cabinetFull: () => group(furniture.cabinet(), collection.cabinetStuff()),
};
const IN = 0.6, OUT = 0.4; // seconds for an object to arrive / leave
const easeOutBack = (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);

export function buildTimeline(scene, walls, screens) {
  const retro = new THREE.MeshBasicMaterial({ map: keepsakes.retroTex(), toneMapped: false });
  const entries = ITEMS.map((it, i) => {
    if (!BUILD[it.kind]) throw new Error(`no builder for ${it.kind}`);
    const obj = BUILD[it.kind](...(it.args ?? []));
    obj.userData.item = it;
    obj.visible = false; // first update snaps it into place
    (it.parent ? walls[it.parent] : scene).add(obj);
    const lights = [];
    obj.traverse((o) => o.isLight && lights.push([o, o.intensity]));
    return { it, obj, lights, w: null, delay: (i % 5) * 0.05, target: new THREE.Vector3() };
  });
  const byId = Object.fromEntries(entries.map((e) => [e.it.id, e]));

  function role(it, year, on) {
    if (!on) return tech.SCREEN_OFF;
    if (it.main && year >= it.main[0] && year < it.main[1]) return screens.main.mat;
    if (it.retro) return year >= it.retro ? retro : tech.SCREEN_OFF;
    return screens.side.mat;
  }

  function update(year, dt, time) {
    const move = 1 - Math.exp(-dt * 5);
    let sideAspect = 0;
    for (const e of entries) {
      const { it, obj } = e, on = active(it, year);
      const [x, y, z, ry = 0] = poseAt(it, year);
      e.target.set(x, y, z);
      if (e.w === null) e.w = on ? 1 : -e.delay;
      else e.w = on ? Math.min(1, e.w + dt / IN) : Math.max(-e.delay, e.w - dt / OUT);

      if (e.w <= 0 || !obj.visible) {
        // not on stage: jump to where it will next appear
        obj.position.copy(e.target);
        obj.rotation.y = ry;
      } else {
        obj.position.lerp(e.target, move);
        const turn = Math.atan2(Math.sin(ry - obj.rotation.y), Math.cos(ry - obj.rotation.y));
        obj.rotation.y += turn * move;
      }
      obj.visible = e.w > 0;
      if (!obj.visible) continue;
      obj.scale.setScalar(on ? easeOutBack(e.w) : e.w * e.w);
      for (const [light, base] of e.lights) light.intensity = base * e.w;
      obj.userData.update?.(year);
      obj.userData.tick?.(time);

      const scr = obj.userData.screen;
      if (scr) {
        scr.material = role(it, year, on);
        if (scr.material === screens.side.mat) sideAspect = obj.userData.aspect;
      }
    }
    return sideAspect;
  }

  // Objects the pointer can currently hit (three.js raycasts invisible meshes too, so filter here).
  const pickable = () => entries.filter((e) => e.obj.visible && e.obj.parent.visible).map((e) => e.obj);
  return { update, pickable, byId, entries };
}
