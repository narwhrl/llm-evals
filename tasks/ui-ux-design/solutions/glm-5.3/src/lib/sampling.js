/**
 * 采样模型：温度 θ 如何影响一台语言模型。
 * 权重经 w^(1/θ) 蒸馏——θ 越低越接近贪心(argmax)，越高分布越平。
 * 这是整件作品的物理引擎。
 */

export function temperedWeights(candidates, theta) {
  const p = Math.max(0.08, theta)
  const raw = candidates.map((c) => Math.pow(c.w, 1 / p))
  const sum = raw.reduce((a, b) => a + b, 0)
  return raw.map((w) => w / sum)
}

/** 加权采样一个候选下标；exclude 用于「重采样要给出新反馈」 */
export function sampleIndex(candidates, theta, exclude = -1) {
  if (candidates.length === 1) return 0
  const ws = temperedWeights(candidates, theta)
  for (let attempt = 0; attempt < 16; attempt++) {
    let r = Math.random()
    let acc = 0
    let idx = ws.length - 1
    for (let j = 0; j < ws.length; j++) {
      acc += ws[j]
      if (r <= acc) {
        idx = j
        break
      }
    }
    if (idx !== exclude) return idx
  }
  return (exclude + 1) % candidates.length
}

/** 颤动期按分布随机展示一个候选（视觉上的「未坍缩」） */
export function flickerIndex(candidates, theta) {
  return sampleIndex(candidates, theta)
}
