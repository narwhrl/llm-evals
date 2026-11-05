// Slider time t is a float year. Calendar year Y spans [Y - 0.5, Y + 0.5), so a key year sits at its July.
export const T0 = 2005, T1 = 2025;
export const ym = (y, m = 1) => y - 0.5 + (m - 1) / 12;
export const yearOf = (t) => Math.round(t);
export const monthOf = (t) => Math.min(12, Math.floor((t - yearOf(t) + 0.5) * 12) + 1);

// Era boundaries: every key year's furniture is in place a few months before its July.
export const E08 = ym(2008, 2), E12 = ym(2012, 1), E16 = ym(2016, 1), E20 = ym(2019, 11), WFH = ym(2020, 2), E25 = ym(2024, 3);

export const ERAS = [
  { year: 2005, age: '13 岁 · 初一', title: '卧室一角的第一台电脑',
    text: '爸爸用年终奖配的组装机，和作业本挤在同一张写字台上。规定每天只能玩一小时。' },
  { year: 2008, age: '16 岁 · 高一', title: '压岁钱换来的液晶屏',
    text: 'CRT 退到了床尾的纸箱上。QQ 群里约 DotA，杂志越堆越高，校服总搭在椅背。' },
  { year: 2012, age: '20 岁 · 大二暑假', title: '回家的假期',
    text: '行李箱还没打开，先插上了机械键盘。第一次在夏季促销里囤游戏，房间安静了许多。' },
  { year: 2016, age: '24 岁 · 工作第二年', title: '第一份年终奖',
    text: '新书桌、电竞椅、144Hz。旧写字台被挤到床尾，堆满纸箱。外卖盒和奶茶杯成了常客。' },
  { year: 2020, age: '28 岁 · 居家办公', title: '房间翻新',
    text: '爸妈回了老家，床搬走了，墙刷成灰绿。白天在这里开会，晚上和老朋友语音开黑。' },
  { year: 2025, age: '33 岁 · 小满 4 岁', title: '完整的游戏房',
    text: '吸音板、带鱼屏、木纹机箱。保温杯泡着枸杞，旧马克杯里插着小满的蜡笔。' },
];

const STARTS = [0, E08, E12, E16, E20, E25];
export function eraAt(t) {
  let i = 0;
  while (i + 1 < STARTS.length && t >= STARTS[i + 1]) i++;
  return ERAS[i];
}

export const smooth = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));
export const FADE = 0.22, MOVE = 0.3;

// 0..1 presence of an item with life ranges [[from, to], ...].
export function presence(life, t) {
  let v = 0;
  for (const [a, b] of life) v = Math.max(v, Math.min(smooth((t - a) / FADE), smooth((b - t) / FADE)));
  return v;
}

// Keyframed placement: each key {t, p:[x,y,z], r:[rx,ry,rz]} holds from t on; moves play over [t - MOVE, t] with a lift.
export function placement(track, t, out) {
  const k0 = track[0];
  out.p[0] = k0.p[0]; out.p[1] = k0.p[1]; out.p[2] = k0.p[2];
  const r0 = k0.r ?? [0, 0, 0];
  out.r[0] = r0[0]; out.r[1] = r0[1]; out.r[2] = r0[2];
  out.lift = 0;
  for (let i = 1; i < track.length; i++) {
    const k = smooth((t - (track[i].t - MOVE)) / MOVE);
    if (k <= 0) break;
    const r = track[i].r ?? [0, 0, 0];
    for (let j = 0; j < 3; j++) {
      out.p[j] += (track[i].p[j] - out.p[j]) * k;
      out.r[j] += (r[j] - out.r[j]) * k;
    }
    out.lift = Math.max(out.lift, Math.sin(Math.PI * k) * (track[i].lift ?? 0.25));
  }
  return out;
}
