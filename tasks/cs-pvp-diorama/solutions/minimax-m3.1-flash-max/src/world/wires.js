import * as P from '../props.js';

/**
 * Utility poles and sagging power lines that cross the yard, tying the
 * regions together overhead.
 */
export function buildWires(b) {
  const poles = [
    { x: -15.1, z: -12.0, h: 6.2, rot: 0 },
    { x: -15.1, z: -2.0, h: 6.6, rot: 0 },
    { x: -15.1, z: 6.4, h: 6.2, rot: 0 },
    { x: 15.3, z: -8.4, h: 6.0, rot: 0 },
    { x: 15.3, z: 1.2, h: 6.4, rot: 0 },
    { x: 15.3, z: 11.0, h: 6.0, rot: 0 },
    { x: 7.9, z: -13.0, h: 5.4, rot: Math.PI / 2 },
  ];

  for (const p of poles) P.powerPole(b, p.x, 0, p.z, p.h, p.rot);

  const top = (p, dx = 0, dy = -0.5) => [p.x + dx, p.h + dy, p.z];
  const link = (a, c, count = 3, sag = 0.45) => {
    for (let i = 0; i < count; i++) {
      const o = (i - (count - 1) / 2) * 0.62;
      P.wire(b, [a[0] + o, a[1], a[2]], [c[0] + o, c[1], c[2]], sag + i * 0.05, 0.032);
    }
  };

  // pole to pole runs along both edges
  link(top(poles[0]), top(poles[1]), 3);
  link(top(poles[1]), top(poles[2]), 3);
  link(top(poles[3]), top(poles[4]), 3);
  link(top(poles[4]), top(poles[5]), 3);

  // crossings over the middle lane and the courtyards
  P.wire(b, [-15.1, 5.8, -2.0], [-13.4, 4.6, -6.6], 0.6, 0.03);
  P.wire(b, [-13.4, 4.6, -6.6], [-7.4, 4.3, -8.4], 0.7, 0.03);
  P.wire(b, [15.3, 5.5, 1.2], [14.4, 5.2, -6.8], 0.75, 0.03);
  P.wire(b, [14.4, 5.2, -6.8], [9.4, 4.6, -10.8], 0.6, 0.03);
  P.wire(b, [7.9, 4.9, -13.0], [-1.0, 5.4, -14.2], 0.8, 0.03);
  P.wire(b, [15.3, 5.5, 11.0], [7.6, 5.0, 14.6], 0.7, 0.03);
  P.wire(b, [-15.1, 5.7, 6.4], [-7.6, 5.0, 12.4], 0.9, 0.03);

  // service drops onto the buildings
  P.wire(b, [15.3, 5.4, -8.4], [14.4, 4.9, -10.6], 0.35, 0.026);
  P.wire(b, [-15.1, 5.7, -12.0], [-13.4, 4.9, -13.0], 0.35, 0.026);
}
