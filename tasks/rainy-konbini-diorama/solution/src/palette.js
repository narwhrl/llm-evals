// Night palette for the konbini corner.
// The scene is deliberately split: everything outdoors is cool and desaturated,
// everything behind the glass is warm and bright.

export const P = {
  // atmosphere
  sky: 0x0b1226,
  fog: 0x141f38,
  horizonGlow: 0x2a3c63,

  // ground
  asphalt: 0x222a3c,
  asphaltSheen: 0x37445e,
  sidewalk: 0x6d7688,
  sidewalkDark: 0x5b6376,
  curb: 0x8d95a6,
  gutter: 0x161c2a,
  paint: 0xdfe5ef,
  paintWarm: 0xf0c860,

  // base plinth
  plinth: 0x424e6b,
  plinthTop: 0x4c5876,
  plinthEdge: 0x222a3c,

  // store shell
  wall: 0xc6cedb,
  wallSide: 0xaab3c2,
  wallBack: 0x98a2b2,
  trim: 0x2f8f76,
  trimDeep: 0x1d6553,
  orange: 0xef8a3c,
  orangeDeep: 0xcf6d24,
  awning: 0xece6d8,
  awningTrim: 0xd8564a,
  kick: 0x4b5668,
  frame: 0x3b4557,
  roof: 0x515c72,

  // interior — kept warm so the shop reads golden against the cool street
  floor: 0xe8dcc4,
  floorGuide: 0xe8bd52,
  ceiling: 0xf7ecd8,
  wallIn: 0xf2e6cf,
  wallInShade: 0xdcd0bb,
  shelf: 0xf6f1e6,
  shelfEdge: 0xa89e8e,
  counter: 0xf2ece0,
  warm: 0xffd49a,
  warmDeep: 0xffb055,

  // exterior props
  vending: 0xd33f30,
  vendingFace: 0xf5f6f2,
  vendingGlow: 0xfff0c8,
  bike: 0x2f6d8c,
  bikeAccent: 0xe4e8ee,
  bin: 0x3d6d5a,
  binLid: 0x2a5145,
  pole: 0x8f867a,
  poleDark: 0x6a6258,
  guard: 0xd2d8e2,
  guardPost: 0xb7bec9,
  signPost: 0xbcc3ce,
  ac: 0xd6dbe3,
  notice: 0x2b3345,
  neighbour: 0x9aa3b2,
  neighbourDark: 0x7d8697,
  crate: 0x9a7b4f,
  shrub: 0x3c5a49,
  shrubLight: 0x4e6f59,

  // goods
  goods: [
    0xe4573f, 0x3f8ec4, 0xf0b429, 0x59b96a, 0xd8587f,
    0x7a6bd0, 0x2fa8a0, 0xf07c3e, 0x5a6b8c, 0xefe6cf,
    0xc8452f, 0x6fb0e0, 0xffd166, 0x86c46b, 0xb565a8,
  ],

  // lights
  moon: 0xa9c6ff,
  lampWarm: 0xffd6a0,
  signGlow: 0x8ff0dd,
  vendingGlowColor: 0xff6a4a,
  trafficGreen: 0x55e089,
  trafficAmber: 0xffc451,
  trafficRed: 0xff5a55,
  outline: 0x0a0e1a,
};
