// 光学台的量程、单位与档位命名。
// canvas 上画的东西和 DOM 里读到的数字，全部来自这一份定义。

export const RANGE = {
  /** 缝距 d（px）：两缝可以拉开的最大距离。 */
  separationMax: 232,
  /** 图样最清晰的带。 */
  separationClearLow: 48,
  separationClearHigh: 176,
  /** 并到此处以下：只剩中央主极大，结构消失。 */
  separationClose: 27,
  /** 高于此值：条纹细到接近显影分辨率。 */
  separationFine: 196,
  /** 光程 L（px）：缝到屏的距离。 */
  distanceMin: 1600,
  distanceMax: 3200,
  distanceStart: 2400,
  /** 波长 λ（px）。乘以 190 得到纳米。 */
  wavelengthMin: 1.5,
  wavelengthMax: 3.9,
  wavelengthStart: 2.9,
  /** 单缝宽度 a（px）：决定衍射包络。取小值让包络横跨整块底片，条纹落在一层柔和的光里。 */
  apertureWidth: 4.6,
  /** 收束时那条亮线的半宽（px）。 */
  collapseWidth: 22,
  /** 指针离开后可见度的回落下限。 */
  visibilityFloor: 0.32,
  /** 触屏设备保底：没有指针可"看"，图样仍需成立。 */
  visibilityFloorCoarse: 0.6,
  /** 相位漂移角速度（rad/s）。条纹在屏上的爬行速度 ∝ Λ。 */
  driftRate: 0.62,
};

/** 画布坐标 → 仪表读数的换算，让面板上的数字自洽。 */
export const UNIT = {
  separation: 0.01, // px → mm
  distance: 0.001, // px → m
  wavelength: 190, // px → nm
};

/** 一句话标记在缝轨上的固定排布（最多三处）。 */
export const MARK_OFFSET = 56;

export const clamp = (value, low, high) => (value < low ? low : value > high ? high : value);

/** 缝距的档位命名，出现在读数块与 aria 播报里。 */
export function bandName(separation, phase) {
  if (phase === "dark") return "不相容";
  if (separation <= RANGE.separationClose) return "并拢";
  if (separation < RANGE.separationClearLow) return "稀疏";
  if (separation > RANGE.separationFine) return "细密";
  return "清晰";
}

/** 装置状态的短句，写在画布左上角的铭牌上。 */
export function rigName(phase, sourceCount) {
  if (phase === "aperture") return "单缝";
  if (phase === "interfere") return "双缝";
  if (phase === "dark") return "不相容";
  if (phase === "third" || phase === "closing") return sourceCount > 2 ? "三缝" : "双缝＋规则残影";
  if (phase === "closed") return "闭合";
  return "光学台";
}

/**
 * 波长（纳米）→ 一个克制的印刷墨色。
 * 只在墨色里混一点点色相：换波长 = 换一种写法，而不是换一套霓虹。
 * 返回 0..255 的 RGB，画布每帧直接用，不再做字符串解析。
 */
export function inkTone(nm) {
  const hue = wavelengthToHue(nm);
  const s = 0.38;
  const l = 0.2;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb;
  if (hue < 60) rgb = [c, x, 0];
  else if (hue < 120) rgb = [x, c, 0];
  else if (hue < 180) rgb = [0, c, x];
  else if (hue < 240) rgb = [0, x, c];
  else if (hue < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return [
    Math.round((rgb[0] + m) * 255),
    Math.round((rgb[1] + m) * 255),
    Math.round((rgb[2] + m) * 255),
  ];
}

function wavelengthToHue(nm) {
  if (nm < 380) return 265;
  if (nm < 440) return 255 - ((nm - 380) / 60) * 35;
  if (nm < 490) return 220 - ((nm - 440) / 50) * 120;
  if (nm < 510) return 165 - ((nm - 490) / 20) * 20;
  if (nm < 580) return 60 - ((nm - 510) / 70) * 30;
  if (nm < 645) return 30 - ((nm - 580) / 65) * 25;
  return 5;
}
