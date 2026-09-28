// 远处雷光：低频随机的短促脉冲序列，返回 0..1 强度供主循环叠加到环境光与合成 pass。
const ENVELOPE = [
  { at: 0.0, width: 0.045, gain: 0.9 },
  { at: 0.09, width: 0.05, gain: 0.55 },
  { at: 0.31, width: 0.12, gain: 0.7 },
];

function envelope(time) {
  let value = 0;
  for (let i = 0; i < ENVELOPE.length; i += 1) {
    const pulse = ENVELOPE[i];
    const dt = time - pulse.at;
    if (dt < 0) continue;
    value += pulse.gain * Math.exp(-((dt / pulse.width) ** 2));
  }
  return Math.min(1, value);
}

export function createLightning({ rng }) {
  let nextAt = rng.range(9, 16);
  let activeUntil = -1;
  let startedAt = 0;
  let strength = 0;

  return {
    update(elapsed) {
      if (activeUntil < 0 && elapsed >= nextAt) {
        startedAt = elapsed;
        activeUntil = elapsed + 0.62;
        nextAt = elapsed + rng.range(13, 27);
      }
      if (activeUntil >= 0) {
        const local = elapsed - startedAt;
        strength = local <= 0.62 ? envelope(local) : 0;
        if (local > 0.62) activeUntil = -1;
      } else {
        strength = 0;
      }
      return strength;
    },
    get strength() {
      return strength;
    },
  };
}
