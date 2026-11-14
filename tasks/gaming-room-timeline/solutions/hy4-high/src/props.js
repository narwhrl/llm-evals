import { buildKeepsakes, buildOldCorner, buildWallDecor } from './decor.js';
import { buildCarryOver, buildDesks, buildMonitors } from './desk.js';
import { buildChairs, buildRestArea, buildShelves } from './furniture.js';
import { collectTimeline, group, stamp } from './kit.js';
import { createMaterials } from './materials.js';

// Changeovers happen between representative years, so every stop reads cleanly.
const SPANS = [
  [2004.4, 2008.4], [2008.4, 2012.4], [2012.4, 2016.4],
  [2016.4, 2020.4], [2020.4, 2024.4], [2024.4, null],
];
const SHELF_SPANS = [
  [2004.4, 2008.4], [2008.4, 2012.4], [2012.4, 2016.4],
  [2016.4, 2020.4], [2020.4, null],
];
const REST_SPANS = [[2004.4, 2010.4], [2010.4, 2016.4], [2016.4, null]];

const eraConfig = (index, extra = {}) => ({ from: SPANS[index][0], to: SPANS[index][1], fade: 0.4, ...extra });

export function buildProps(scene, screenTexture, sideTexture) {
  const M = createMaterials(screenTexture, sideTexture);
  const root = group('props');
  const screenMeshes = [];

  const desks = buildDesks(M, screenMeshes);
  const monitors = buildMonitors(M, screenMeshes);
  const chairs = buildChairs(M);
  const shelves = buildShelves(M);
  const rest = buildRestArea(M);
  const walls = buildWallDecor(M);
  const carry = buildCarryOver(M);
  const keepsakes = buildKeepsakes(M);
  const corner = buildOldCorner(M);

  // the CRT keeps its screen dark once it is retired under the cloth
  monitors[0].traverse((child) => {
    if (child.userData.isScreen) child.userData.retireScreen = true;
  });

  desks.forEach((item, i) => stamp(item, eraConfig(i)));
  chairs.forEach((item, i) => stamp(item, eraConfig(i)));
  walls.forEach((item, i) => stamp(item, eraConfig(i)));
  monitors.forEach((item, i) => {
    if (i === 0) {
      stamp(item, {
        from: 2004.4, to: null, fade: 0.4,
        retire: { start: 2010.8, end: 2013.2, pos: [2.0, 0.02, 1.35], scale: 0.72, rotY: -0.45, dimScreen: true },
      });
    } else {
      stamp(item, eraConfig(i));
    }
  });

  shelves.forEach((item, i) => stamp(item, { from: SHELF_SPANS[i][0], to: SHELF_SPANS[i][1], fade: 0.4 }));
  rest.forEach((item, i) => stamp(item, { from: REST_SPANS[i][0], to: REST_SPANS[i][1], fade: 0.4 }));

  stamp(keepsakes.mug, { from: 2004.4, to: null });
  stamp(keepsakes.dino, { from: 2004.4, to: null });
  stamp(keepsakes.photo, { from: 2004.4, to: null });
  stamp(keepsakes.frame, { from: 2016.6, to: null, fade: 0.5 });

  stamp(carry.speakers, {
    from: 2004.4, to: null,
    retire: { start: 2012.6, end: 2014.4, pos: [-2.08, 1.29, -2.04], scale: 0.62 },
  });
  stamp(carry.lamp, {
    from: 2004.4, to: null,
    retire: { start: 2016.4, end: 2018.2, pos: [2.18, 0.02, 1.02], scale: 0.75, rotY: 0.5 },
  });
  stamp(corner, { from: 2012.6, to: null, fade: 0.5 });

  root.add(
    ...desks, ...monitors, ...chairs, ...shelves, ...rest, ...walls,
    carry.speakers, carry.lamp,
    keepsakes.mug, keepsakes.dino, keepsakes.photo, keepsakes.frame,
    corner,
  );
  scene.add(root);

  return {
    root,
    screenMeshes,
    keepsakes,
    timelineItems: collectTimeline(root),
  };
}
