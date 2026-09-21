export const TIMES = {
  dawn: {
    label: "晨",
    sky: 0xc98662,
    horizon: 0xf2c9a0,
    fog: 0xd7b291,
    sun: 0xffc48a,
    ambient: 0x8ea4c4,
    sunIntensity: 1.35,
    ambientIntensity: 0.38,
    elevation: 0.28,
    azimuth: 0.85,
  },
  day: {
    label: "昼",
    sky: 0x8eb7dd,
    horizon: 0xd7e7f5,
    fog: 0xc5d7e6,
    sun: 0xfff1d2,
    ambient: 0xb7c7dc,
    sunIntensity: 1.55,
    ambientIntensity: 0.5,
    elevation: 0.72,
    azimuth: 0.4,
  },
  dusk: {
    label: "昏",
    sky: 0x6d4d78,
    horizon: 0xe39262,
    fog: 0xb07a62,
    sun: 0xff9a62,
    ambient: 0x6d7ea6,
    sunIntensity: 1.15,
    ambientIntensity: 0.42,
    elevation: 0.18,
    azimuth: -0.7,
  },
  night: {
    label: "夜",
    sky: 0x1b2744,
    horizon: 0x31486d,
    fog: 0x24324d,
    sun: 0xb9c7ef,
    ambient: 0x6e82b4,
    sunIntensity: 0.35,
    ambientIntensity: 0.28,
    elevation: 0.42,
    azimuth: 2.4,
  },
};

export function timeOfDay(id) {
  return TIMES[id] ?? TIMES.dusk;
}
