// 《双缝》的光学模型：夫琅禾费近似下的 N 缝干涉。
//
// 屏上横坐标 u（相对底片中心，单位 px）处，第 j 个光源到该点的光程
//   r_j = hypot(u, y_j, L)
// 复振幅求和后取模平方
//   S = Σ w_j·cos(τ_j),  T = Σ w_j·sin(τ_j),  τ_j = 2π r_j / λ + φ_j
//   I_coh = (S² + T²) / W²,  W = Σ w_j
// 单缝衍射包络
//   env(u) = sinc²(π a u / (λ L))
// 可见度 V 把不相干（无条纹）与相干（满条纹）两种情况线性混合
//   I = env · ((1 − V) + V · I_coh)
//
// 屏上每个像素列只求值一次，帧循环内不新建任何对象。

export const TAU = Math.PI * 2;

/** sinc²(x)，x→0 时返回 1，避免 0/0。 */
function sinc2(x) {
  if (x > -1e-4 && x < 1e-4) return 1 - (x * x) / 3;
  const s = Math.sin(x) / x;
  return s * s;
}

/**
 * 把一整行（每列一个采样）的强度写进 row[0..width-1]，值域 0..1。
 * 期望结果为满条纹且包络中央最亮。
 */
export function sampleField(row, plate) {
  const sources = plate.sources;
  const count = plate.sourceCount;
  const wavelength = plate.wavelength;
  const distance = plate.distance;
  const envScale = (Math.PI * plate.apertureWidth) / (wavelength * distance);
  const visibility = plate.visibility;
  const collapse = plate.collapse;
  const collapseWidth = plate.collapseWidth;
  const centerX = plate.centerX;

  let weight = 0;
  for (let j = 0; j < count; j += 1) weight += sources[j].weight;
  const norm = weight > 0 ? weight * weight : 1;
  const k = TAU / wavelength;
  const distSq = distance * distance;
  const collapseDen = collapseWidth * collapseWidth;

  for (let x = 0; x < plate.width; x += 1) {
    const u = x - centerX;
    const uSq = u * u;
    let re = 0;
    let im = 0;
    for (let j = 0; j < count; j += 1) {
      const s = sources[j];
      // 缝与屏在同一根轴上：光程差来自 (u − pos)，这正是条纹会随缝距变密的原因。
      const du = u - s.pos;
      const r = Math.sqrt(du * du + distSq);
      const t = k * r + s.phase;
      const w = s.weight;
      re += w * Math.cos(t);
      im += w * Math.sin(t);
    }
    const coherent = (re * re + im * im) / norm;
    let v = sinc2(envScale * u) * ((1 - visibility) + visibility * coherent);
    if (collapse > 0.001) {
      // 收束：全部结构塌成中央一条亮线。
      const line = Math.exp(-uSq / collapseDen);
      v += (line - v) * collapse;
    }
    row[x] = v < 0 ? 0 : v > 1 ? 1 : v;
  }
}

/** 屏上可见的条纹数（主极大个数），用于读数与自检。 */
export function fringeCount(plate) {
  const spacing = (plate.wavelength * plate.distance) / Math.max(plate.separation, 1e-3);
  return plate.width / spacing;
}
