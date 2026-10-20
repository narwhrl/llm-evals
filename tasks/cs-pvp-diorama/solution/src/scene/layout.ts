/**
 * The layout of the map.
 *
 * North is -z and holds the terrorist spawn, south is +z and holds the
 * counter-terrorist spawn. The A site sits in the north west, the B site in
 * the north east, and mid runs down the middle between them.
 */

export const MAP = {
  half: 7,
  /** The raised loading yard the terrorists start in. */
  tSpawn: { x0: -6.8, x1: 6.8, z0: -6.8, z1: -4.4, y: 0.9 },
  /** The A bomb site and its warehouse. */
  aSite: { x0: -6.8, x1: -2.4, z0: -4.4, z1: 0.6 },
  /** The B bomb site and its tin shed. */
  bSite: { x0: 2.4, x1: 6.8, z0: -4.4, z1: 0.6 },
  /** The central duel corridor. */
  mid: { x0: -2.3, x1: 2.3, z0: -4.4, z1: 2.6 },
  /** The counter-terrorist spawn and its high platform. */
  ctSpawn: { x0: -5.4, x1: 5.4, z0: 2.6, z1: 6.8, y: 1.4 },
  /** The low sewer that runs under mid. */
  sewer: { x0: -0.7, x1: 0.7, z0: -4.2, z1: 2.4, y: -0.9 },
} as const;

/** The painted bomb site markers. */
export const BOMBS = {
  a: { x: -4.5, z: -1.6, w: 2.6, d: 2.6 },
  b: { x: 4.6, z: -0.35, w: 2.2, d: 1.7 },
} as const;
