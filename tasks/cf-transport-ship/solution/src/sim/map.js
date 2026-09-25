import { makeFloors } from "./constants.js";

const C = {
  hull: "#7f878e",
  deck: "#5c6560",
  red: "#b84332",
  blue: "#2f649f",
  orange: "#d08a2e",
  green: "#3f7a49",
  wood: "#8d6238",
  iron: "#6c747b",
  wall: "#8e969c",
  dark: "#3c444b",
  yellow: "#c6a15a",
  rust: "#7a4e36",
};

function add(list, x, y, z, sx, sy, sz, opt = {}) {
  const pass = opt.pass || "block";
  list.push({
    x,
    y,
    z,
    sx,
    sy,
    sz,
    yaw: opt.yaw || 0,
    pass,
    blocksMove: opt.blocksMove !== false,
    stand: opt.stand !== false,
    penCost: opt.penCost ?? (pass === "wood" ? 0.55 : 99),
    color: opt.color || C.wall,
    tag: opt.tag || "metal",
  });
}

function cabin(solids, sign, alcove) {
  const zf = sign;
  const front = -21.15 * zf;
  const back = -29.78 * zf;
  const zMid = (front + back) / 2;
  const zSpan = Math.abs(front - back);
  add(solids, 0, 1.62, back, 9.7, 3.24, 0.34, { color: C.wall, tag: "wall" });
  add(solids, -3.05 * zf, 1.62, front, 3.5, 3.24, 0.3, { color: C.wall, tag: "wall" });
  add(solids, 3.05 * zf, 1.62, front, 3.5, 3.24, 0.3, { color: C.wall, tag: "wall" });
  add(solids, 0, 2.86, front, 2.5, 0.78, 0.3, { color: C.wall, tag: "wall" });
  if (!alcove) {
    add(solids, -4.78 * zf, 1.62, zMid, 0.3, 3.24, zSpan, { color: C.wall, tag: "wall" });
  } else {
    const sideX = -4.78 * zf;
    add(solids, sideX, 1.62, 22.6, 0.3, 3.24, 2.9, { color: C.wall, tag: "wall" });
    add(solids, sideX, 1.62, 28.2, 0.3, 3.24, 3.15, { color: C.wall, tag: "wall" });
    add(solids, sideX, 2.78, 25.3, 0.3, 0.92, 2.7, { color: C.wall, tag: "wall" });
  }
  const doorZs = [
    [-29.7 * zf, -26.5 * zf],
    [-24.5 * zf, -21.2 * zf],
  ];
  for (const [a, b] of doorZs) {
    const z0 = Math.min(a, b);
    const z1 = Math.max(a, b);
    add(solids, 4.78 * zf, 1.62, (z0 + z1) / 2, 0.3, 3.24, z1 - z0, { color: C.wall, tag: "wall" });
  }
  add(solids, 4.78 * zf, 2.78, -25.5 * zf, 0.3, 0.95, 2.05, { color: C.wall, tag: "wall" });
  add(solids, 0, 3.32, zMid, 9.2, 0.28, zSpan - 0.2, { color: C.dark, tag: "wall", stand: false });
  add(solids, -3.55 * zf, 0.95, back - 0.15 * zf, 0.8, 1.9, 1.5, { color: C.iron, tag: "iron" });
}

function flank(solids, sign, platformTop) {
  const inner = 6.72 * sign;
  // sign > 0 is the defender's right-hand passage. The vestibule gap stays open.
  const segments =
    sign > 0
      ? [
          [-27.3, -26.6],
          [-24.4, 5.15],
        ]
      : [
          [26.6, 27.3],
          [-5.15, 24.4],
        ];
  for (const [a, b] of segments) {
    const z0 = Math.min(a, b);
    const z1 = Math.max(a, b);
    add(solids, inner, 1.35, (z0 + z1) / 2, 0.24, 2.7, z1 - z0, { color: C.dark, tag: "wall" });
  }
  const vestZ = -25.5 * sign;
  add(solids, 5.85 * sign, 1.3, vestZ - 1.08 * sign, 2.15, 2.6, 0.22, { color: C.wall, tag: "wall" });
  add(solids, 5.85 * sign, 1.3, vestZ + 1.08 * sign, 2.15, 2.6, 0.22, { color: C.wall, tag: "wall" });

  const steps = 4;
  const rise = platformTop / steps;
  for (let i = 0; i < steps; i += 1) {
    const top = rise * (i + 1);
    const z = sign > 0 ? 5.2 + i * 0.72 : -5.2 - i * 0.72;
    add(solids, 7.48 * sign, top - 0.28, z, 1.05, 0.56, 0.74, { color: C.deck, tag: "step" });
  }
  const platZ = sign > 0 ? 7.85 : -7.85;
  add(solids, 7.48 * sign, platformTop - 0.18, platZ, 1.05, 0.36, 1.7, {
    color: C.deck,
    tag: "step",
  });
  add(solids, 7.48 * sign, platformTop + 0.55, platZ + 1.05 * sign, 1.05, 1.1, 0.18, {
    color: C.iron,
    tag: "rail",
  });
}

function stairs(solids, zOuter, zInner, x) {
  const n = 5;
  const dz = (zInner - zOuter) / n;
  for (let i = 0; i < n; i += 1) {
    const top = -((i + 1) / n) * 2.55;
    const zc = zOuter + dz * (i + 0.5);
    add(solids, x, top - 0.32, zc, 1.32, 0.64, Math.abs(dz) + 0.02, {
      color: C.iron,
      tag: "step",
    });
  }
}

function containerRow(solids, x, segments) {
  for (const [z0, z1, color] of segments) {
    const sz = z1 - z0;
    add(solids, x, 1.23, (z0 + z1) / 2, 2.35, 2.46, sz, { color, tag: "container" });
  }
}

export function buildMap() {
  const solids = [];
  add(solids, -8.22, 0.55, 0, 0.18, 1.1, 60.7, { color: C.hull, tag: "rail" });
  add(solids, 8.22, 0.55, 0, 0.18, 1.1, 60.7, { color: C.hull, tag: "rail" });
  add(solids, 0, 1.55, -30.48, 16.5, 3.1, 0.36, { color: C.hull, tag: "wall" });
  add(solids, 0, 1.55, 30.48, 16.5, 3.1, 0.36, { color: C.hull, tag: "wall" });

  cabin(solids, 1, false);
  cabin(solids, -1, true);
  // 潜伏者左舷多出的无线电舱，开口朝舱内。
  add(solids, 6.55, 1.45, 25.3, 0.24, 2.9, 4.3, { color: C.wall, tag: "wall" });
  add(solids, 5.65, 1.45, 23.15, 1.9, 2.9, 0.24, { color: C.wall, tag: "wall" });
  add(solids, 5.65, 1.45, 27.5, 1.9, 2.9, 0.24, { color: C.wall, tag: "wall" });
  add(solids, 5.65, 3.05, 25.3, 1.85, 0.24, 4.05, { color: C.dark, tag: "wall", stand: false });

  flank(solids, 1, 1.72);
  flank(solids, -1, 1.4);

  containerRow(solids, -2.55, [
    [-16.4, -12.4, C.red],
    [-10.4, -5.6, C.blue],
    [-3.4, 2.2, C.orange],
    [4.4, 9.2, C.red],
    [11.2, 16.4, C.blue],
  ]);
  containerRow(solids, 2.55, [
    [-16.4, -11.0, C.orange],
    [-8.8, -3.6, C.blue],
    [-1.4, 4.2, C.red],
    [6.4, 11.6, C.green],
    [13.6, 16.4, C.orange],
  ]);

  // 八字绿箱，开口朝船尾，中间仍留出中路。
  add(solids, -3.2, 1.23, 0.8, 4.2, 2.46, 1.4, { yaw: 0.42, color: C.green, tag: "container" });
  add(solids, 3.25, 1.23, 1.45, 4.0, 2.46, 1.4, { yaw: -0.36, color: C.green, tag: "container" });

  // 斜箱，留出贴外舷的缝。
  add(solids, -3.78, 1.12, -6.85, 1.55, 2.2, 0.82, { yaw: 0.7, color: C.orange, tag: "container" });
  add(solids, 4.45, 1.08, 5.7, 1.8, 2.16, 0.95, { yaw: -0.5, color: C.blue, tag: "container" });

  // 木箱：挡视线，步枪可穿。
  add(solids, 4.85, 0.6, -15.7, 1.15, 1.2, 1.15, { pass: "wood", color: C.wood, tag: "wood" });
  add(solids, -4.9, 0.6, 15.45, 1.15, 1.2, 1.15, { pass: "wood", color: C.wood, tag: "wood" });
  add(solids, -4.85, 0.62, -3.15, 1.15, 1.24, 1.15, { pass: "wood", color: C.wood, tag: "wood" });
  add(solids, 5.25, 0.62, -1.7, 1.18, 1.24, 1.18, { pass: "wood", color: C.wood, tag: "wood" });
  add(solids, -4.7, 0.61, -8.05, 1.2, 1.22, 1.2, { pass: "wood", color: C.wood, tag: "wood" });
  add(solids, 4.62, 0.61, 9.05, 1.2, 1.22, 1.2, { pass: "wood", color: C.wood, tag: "wood" });
  add(solids, 2.55, 2.89, 9.15, 1.02, 0.86, 1.02, { pass: "wood", color: C.wood, tag: "wood" });

  // 保卫者左路出口铁箱，不可穿透。
  add(solids, -5.2, 0.55, -17.7, 1.16, 1.1, 1.16, { color: C.iron, tag: "iron" });

  // 三箱，逐级垫上左舷集装箱。
  add(solids, -4.95, 0.25, -15.15, 0.92, 0.5, 0.92, { color: C.iron, tag: "iron" });
  add(solids, -4.4, 0.5, -14.35, 0.92, 1.0, 0.92, { color: C.iron, tag: "iron" });
  add(solids, -4.05, 0.75, -13.55, 0.9, 1.5, 0.9, { color: C.iron, tag: "iron" });

  // 潜伏者小门前的绿箱。
  add(solids, -3.55, 0.68, 18.35, 1.45, 1.36, 1.25, { color: C.green, tag: "container" });

  const barrels = [
    [3.55, -19.1],
    [-2.4, -19.3],
    [1.9, 6.4],
    [-1.85, -6.6],
    [3.7, 17.6],
    [-6.4, -18.4],
  ];
  for (const [x, z] of barrels) {
    add(solids, x, 0.46, z, 0.72, 0.92, 0.72, { color: C.rust, tag: "iron" });
  }

  add(solids, 5.15, -2.78, -0.25, 1.72, 0.46, 28.8, { color: C.dark, tag: "floor" });
  add(solids, 5.15, -0.14, -0.25, 1.68, 0.28, 23.7, { color: C.deck, tag: "floor" });
  add(solids, 4.32, -1.35, -0.25, 0.22, 2.4, 23.5, { color: C.dark, tag: "wall" });
  add(solids, 5.98, -1.35, -0.25, 0.22, 2.4, 23.5, { color: C.dark, tag: "wall" });
  add(solids, 5.15, -1.35, -14.62, 1.55, 2.4, 0.22, { color: C.dark, tag: "wall" });
  add(solids, 5.15, -1.35, 14.12, 1.55, 2.4, 0.22, { color: C.dark, tag: "wall" });
  stairs(solids, -14.55, -12.15, 5.15);
  stairs(solids, 14.05, 11.65, 5.15);

  // 舱内灯槽只做视觉阻挡以上的薄板，不另加碰撞。
  const nodes = [];
  const links = [];
  const N = (id, x, y, z, extra = {}) => nodes.push({ id, x, y, z, ...extra });
  const L = (a, b, type = "walk") => links.push({ a, b, type });
  const chain = (ids, type = "walk") => {
    for (let i = 0; i < ids.length - 1; i += 1) L(ids[i], ids[i + 1], type);
  };

  N("gr-spawn", 0, 0, -26.2);
  N("gr-door", 0, 0, -20.2, { look: [0, 1.5, 20], role: "sniper" });
  N("gr-left", -4.15, 0, -18.15, { look: [0, 1.5, 18], role: "sniper" });
  N("gr-vest", 5.7, 0, -25.5);
  N("gr-pipe-in", 7.4, 0, -24.6);
  N("gr-pipe-a", 7.4, 0, -12);
  N("gr-pipe-b", 7.4, 0, 0);
  N("gr-pipe-c", 7.4, 0.86, 5.7);
  N("gr-pipe-high", 7.48, 1.72, 7.7, { look: [0, 1.4, 0], role: "flank" });
  N("gr-drop", 6.05, 0, 7.4);

  N("bl-spawn", 0, 0, 26.2);
  N("bl-door", 0, 0, 20.2, { look: [0, 1.5, -20], role: "sniper" });
  N("bl-right", -5.55, 0, 17.35, { look: [0, 1.5, -16], role: "sniper" });
  N("bl-vest", -5.7, 0, 25.5);
  N("bl-pipe-in", -7.4, 0, 24.6);
  N("bl-pipe-a", -7.4, 0, 12);
  N("bl-pipe-b", -7.4, 0, 0);
  N("bl-pipe-c", -7.4, 0.7, -5.6);
  N("bl-pipe-high", -7.48, 1.4, -7.7, { look: [0, 1.4, 0], role: "flank" });
  N("bl-drop", -6.05, 0, -7.3);

  N("mid-a", 0, 0, -14);
  N("mid-b", 0, 0, -6);
  N("mid-c", 0, 0, 2);
  N("mid-d", 0, 0, 10);
  N("mid-e", 0, 0, 16);

  N("port-a", -5.95, 0, -15.2);
  N("port-b", -5.95, 0, -8.2);
  N("port-c", -5.95, 0, -3.2);
  N("port-d", -5.95, 0, 3.4);
  N("port-e", -5.95, 0, 10.2);
  N("port-f", -5.95, 0, 16.2);

  N("star-a", 6.02, 0, -15.6);
  N("star-b", 6.02, 0, -9.6);
  N("star-c", 6.22, 0, -3.55);
  N("star-d", 6.02, 0, 5.2);
  N("star-e", 6.02, 0, 11.2);
  N("star-f", 6.02, 0, 15.8);

  N("high-gr", -3.05, 2.46, -8.0, { role: "sniper" });
  N("crate-gr", -4.7, 1.22, -8.05);
  N("high-bl", 3.4, 2.46, 10.55, { role: "sniper" });
  N("crate-bl", 4.62, 1.22, 9.05);
  N("triple", -4.05, 1.5, -13.55);

  N("hat-gr", 5.15, -1.0, -13.2);
  N("tun-a", 5.15, -2.55, -11.2);
  N("tun-b", 5.15, -2.55, 0);
  N("tun-c", 5.15, -2.55, 10.6);
  N("hat-bl", 5.15, -1.0, 12.7);

  chain(["gr-spawn", "gr-door", "mid-a", "mid-b", "mid-c", "mid-d", "mid-e", "bl-door", "bl-spawn"]);
  chain(["gr-door", "port-a", "port-b", "port-c", "port-d", "port-e", "port-f", "bl-door"]);
  chain(["gr-door", "star-a", "star-b", "star-c", "star-d", "star-e", "star-f", "bl-door"]);
  chain(["gr-spawn", "gr-vest", "gr-pipe-in", "gr-pipe-a", "gr-pipe-b", "gr-pipe-c", "gr-pipe-high", "gr-drop", "star-d"]);
  chain(["bl-spawn", "bl-vest", "bl-pipe-in", "bl-pipe-a", "bl-pipe-b", "bl-pipe-c", "bl-pipe-high", "bl-drop", "port-c"]);
  chain(["gr-door", "gr-left"]);
  chain(["bl-door", "bl-right"]);
  L("port-b", "mid-b");
  L("port-d", "mid-c");
  L("port-e", "mid-d");
  L("star-b", "mid-b");
  L("star-c", "mid-b");
  L("star-d", "mid-d");
  L("star-a", "hat-gr");
  chain(["hat-gr", "tun-a", "tun-b", "tun-c", "hat-bl"]);
  L("hat-bl", "star-e");
  L("port-b", "crate-gr");
  L("crate-gr", "high-gr", "jump");
  L("star-e", "crate-bl");
  L("crate-bl", "high-bl", "jump");
  L("port-a", "triple");
  L("triple", "high-gr", "jump");

  const spawns = {
    gr: [
      { x: -2.6, y: 0, z: -27.4 },
      { x: 2.5, y: 0, z: -27.2 },
      { x: -3.1, y: 0, z: -25.4 },
      { x: 3.0, y: 0, z: -25.8 },
      { x: -2.2, y: 0, z: -24.7 },
    ],
    bl: [
      { x: 2.4, y: 0, z: 27.2 },
      { x: -2.5, y: 0, z: 26.8 },
      { x: 2.8, y: 0, z: 25.2 },
      { x: -3.0, y: 0, z: 25.6 },
      { x: -2.2, y: 0, z: 28.0 },
    ],
  };

  return {
    solids,
    nodes,
    links,
    spawns,
    floors: makeFloors(),
    sights: {
      grDoor: { x: 0, y: 1.6, z: -20.35 },
      blDoor: { x: 0, y: 1.6, z: 20.35 },
      grSniper: { x: -4.15, y: 1.6, z: -18.15 },
      sideFrom: { x: -4.85, y: 1.0, z: -4.7 },
      sideTo: { x: -4.85, y: 1.0, z: -1.5 },
      platform: { x: 7.48, y: 3.32, z: 7.7 },
      blInterior: { x: 0.2, y: 1.45, z: 26.4 },
      mid: { x: 0, y: 1.5, z: 0 },
      greenBox: { x: -3.55, y: 1.7, z: 18.35 },
    },
  };
}
