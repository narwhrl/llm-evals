// Shared scene layout, in metres. The module is a cut-away capsule:
// floor 8 x 4, back wall 2.05 high, curved shoulder up to 2.55.
export const ROOM = {
  minX: -4,
  maxX: 4,
  minZ: -2,
  maxZ: 2,
  wallZ: -2,
  wallH: 2.05,
  wallT: 0.16,
  floorT: 0.2,
  shoulderR: 0.5,
  shoulderTop: 2.55,
  shoulderCutZ: -1.5,
  stubDepth: 1.25,
  stubTop: 2.05,
};

export const PORTHOLE = { x: 1.3, y: 1.2, r: 0.8 };

export const SMALL_PORTHOLES = [
  { x: -2.55, y: 1.72, r: 0.23 },
  { x: -1.65, y: 1.72, r: 0.23 },
];

// Ring frames (reinforcing ribs) across the back wall and shoulder.
export const FRAMES = [-3.0, -1.0, 1.2, 3.5];

export const ZONES = {
  sleep: { x: -3.25, z: -1.84 },
  plants: { x: -2.1, z: -1.6 },
  work: { x: 1.3, z: -1.55 },
  seat: { x: 1.3, z: -0.35 },
  bike: { x: 3.22, z: 0.5 },
  storage: { x: -0.25, z: -1.84 },
};

export const VIEW = {
  azimuth: 45,
  elevation: 35.264,
  height: 9.8,
  // Centres the module's projected bounding box (8.8 x 7.4 at true isometric).
  target: [-0.15, 0.86, -0.5],
  minAzimuth: 22,
  maxAzimuth: 68,
  minElevation: 20,
  maxElevation: 55,
  minZoom: 0.85,
  maxZoom: 2.6,
};

export const FOCUS = {
  workstation: { target: [1.3, 1.05, -1.5], zoom: 1.85, azimuth: 40, elevation: 26 },
  sleep: { target: [-3.25, 1.05, -1.7], zoom: 1.75, azimuth: 26, elevation: 24 },
  plants: { target: [-2.1, 1.15, -1.45], zoom: 1.95, azimuth: 32, elevation: 24 },
  seat: { target: [1.3, 0.9, -0.7], zoom: 1.9, azimuth: 36, elevation: 24 },
  bike: { target: [3.1, 0.9, 0.35], zoom: 1.95, azimuth: 58, elevation: 26 },
  storage: { target: [-0.5, 1.15, -1.6], zoom: 1.9, azimuth: 28, elevation: 24 },
};

export const ORBIT = {
  daySeconds: 90,
  fastSeconds: 15,
};

// --- Window sightline guard ------------------------------------------------
// Wall fittings must not cross a porthole in *any* view the user can reach, not
// just the first isometric framing: focusing re-aims the orthographic camera,
// which moves every porthole's projected ellipse. Clearance is therefore tested
// against the union of the first view and every focus framing.
const GUARD_VIEWS = [
  { az: VIEW.azimuth, el: VIEW.elevation },
  { az: FOCUS.workstation.azimuth, el: FOCUS.workstation.elevation },
  { az: FOCUS.sleep.azimuth, el: FOCUS.sleep.elevation },
  { az: FOCUS.plants.azimuth, el: FOCUS.plants.elevation },
  { az: FOCUS.seat.azimuth, el: FOCUS.seat.elevation },
  { az: FOCUS.bike.azimuth, el: FOCUS.bike.elevation },
  { az: FOCUS.storage.azimuth, el: FOCUS.storage.elevation },
  { az: VIEW.minAzimuth, el: VIEW.minElevation },
  { az: VIEW.maxAzimuth, el: VIEW.maxElevation },
];

function basisFor(azDeg, elDeg) {
  const az = (azDeg * Math.PI) / 180;
  const el = (elDeg * Math.PI) / 180;
  return {
    cosAz: Math.cos(az),
    sinAz: Math.sin(az),
    sinEl: Math.sin(el),
    cosEl: Math.cos(el),
  };
}

function screenXWith(basis, x, z) {
  return x * basis.cosAz - z * basis.sinAz;
}

function screenYWith(basis, x, y, z) {
  return -basis.sinEl * basis.sinAz * x + basis.cosEl * y - basis.sinEl * basis.cosAz * z;
}

function ellipsesFor(basis) {
  return [PORTHOLE, ...SMALL_PORTHOLES].map((porthole) => ({
    cx: screenXWith(basis, porthole.x, ROOM.wallZ),
    cy: screenYWith(basis, porthole.x, porthole.y, ROOM.wallZ),
    rx: porthole.r * Math.abs(basis.cosAz),
    ry: porthole.r * Math.hypot(basis.sinEl * basis.cosAz, basis.cosEl),
  }));
}

const GUARD = GUARD_VIEWS.map((v) => {
  const basis = basisFor(v.az, v.el);
  return { basis, ellipses: ellipsesFor(basis) };
});

export function screenX(x, z) {
  return screenXWith(basisFor(VIEW.azimuth, VIEW.elevation), x, z);
}

export function screenY(x, y, z) {
  return screenYWith(basisFor(VIEW.azimuth, VIEW.elevation), x, y, z);
}

// True when a wall fitting at (x, y) — with a footprint half-size of
// (halfW, halfH) in world metres — stays clear of every porthole from every
// reachable camera framing.
export function wallClear(x, y, halfW = 0, halfH = 0, z = ROOM.wallZ + 0.05) {
  return GUARD.every(({ basis, ellipses }) => {
    const sx = screenXWith(basis, x, z);
    const sy = screenYWith(basis, x, y, z);
    const ex = halfW * Math.abs(basis.cosAz);
    const ey = halfW * Math.abs(basis.sinEl * basis.sinAz) + halfH * basis.cosEl;
    return ellipses.every((e) => {
      const dx = Math.max(0, Math.abs(sx - e.cx) - ex) / e.rx;
      const dy = Math.max(0, Math.abs(sy - e.cy) - ey) / e.ry;
      return dx * dx + dy * dy > 1;
    });
  });
}

// True when every sampled world point stays outside every porthole in all
// guard framings. Used for curved fittings (shoulder ribs, handrails).
export function pathClear(points, radius = 0) {
  return GUARD.every(({ basis, ellipses }) => {
    const padX = radius * Math.abs(basis.cosAz);
    const padY = radius * Math.hypot(basis.sinEl * basis.cosAz, basis.cosEl);
    return points.every(([x, y, z]) => {
      const px = screenXWith(basis, x, z);
      const py = screenYWith(basis, x, y, z);
      return ellipses.every((e) => {
        const dx = Math.abs(px - e.cx) / (e.rx + padX);
        const dy = Math.abs(py - e.cy) / (e.ry + padY);
        return dx * dx + dy * dy > 1;
      });
    });
  });
}
