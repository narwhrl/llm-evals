const point = (x, z) => Object.freeze([x, z]);
const footprint = (id, center, size) =>
  Object.freeze({ id, center: Object.freeze(center), size: Object.freeze(size) });
const route = (id, connects, points, maxElevation) =>
  Object.freeze({
    id,
    connects: Object.freeze(connects),
    points: Object.freeze(points.map(([x, z]) => point(x, z))),
    maxElevation,
  });

export const BASE = Object.freeze({
  width: 40,
  depth: 40,
  thickness: 1.8,
  buildLimit: 19.2,
  surfaceY: 0,
});

export const CORE_REGIONS = Object.freeze({
  tSpawn: Object.freeze({ id: 't-spawn', position: point(0, -15.2) }),
  ctSpawn: Object.freeze({ id: 'ct-spawn', position: point(0, 14.2) }),
  aSite: Object.freeze({ id: 'a-site', position: point(-11.4, -8.6) }),
  bSite: Object.freeze({ id: 'b-site', position: point(10.8, -7.8) }),
});

export const REGION_FOOTPRINTS = Object.freeze({
  tSpawn: footprint('t-spawn', [0, -15.2], [11, 6.8]),
  ctSpawn: footprint('ct-spawn', [0, 14.1], [14, 7.4]),
  aWarehouse: footprint('a-warehouse', [-11.5, -8.3], [10.6, 10.8]),
  bCompound: footprint('b-compound', [10.9, -7.7], [9.8, 11.2]),
  midLane: footprint('mid-lane', [0, 0], [7.2, 28]),
  leftAlley: footprint('left-flank', [-15.2, 0.8], [3.4, 31.8]),
  rightFlank: footprint('right-flank', [14.5, 0.4], [4.4, 31.4]),
});

export const ROUTES = Object.freeze({
  mid: route(
    'mid',
    ['tSpawn', 'ctSpawn'],
    [
      [0, -15.2],
      [0, -8.2],
      [0, -1.4],
      [0.4, 6.8],
      [0, 14.2],
    ],
    0.35,
  ),
  leftFlank: route(
    'left-flank',
    ['tSpawn', 'aSite', 'ctSpawn'],
    [
      [-3.2, -15.2],
      [-10.8, -13.9],
      [-15.4, -8.4],
      [-15.3, 2.3],
      [-10.2, 10.7],
      [-3.2, 14.2],
    ],
    1.2,
  ),
  rightFlank: route(
    'right-flank',
    ['tSpawn', 'bSite', 'ctSpawn'],
    [
      [3.1, -15.2],
      [10.8, -13.8],
      [15.2, -8.2],
      [15.1, 2.7],
      [10.7, 10.1],
      [3.2, 14.2],
    ],
    4.4,
  ),
});

export const CAMERA_LIMITS = Object.freeze({
  target: Object.freeze([0, 2.1, 0]),
  initialPosition: Object.freeze([30, 27, 34]),
  minDistance: 25,
  maxDistance: 69,
  minPolarAngle: Math.PI * 0.15,
  maxPolarAngle: Math.PI * 0.48,
});
