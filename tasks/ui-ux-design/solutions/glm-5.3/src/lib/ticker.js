/**
 * 全站唯一的 rAF 驱动器。所有逐帧动效（Canvas 字段、弹簧、呼吸）
 * 都订阅这里，避免多个 requestAnimationFrame 循环。
 * 浏览器在标签页隐藏时会自动暂停 rAF，无需额外处理。
 */

const subscribers = new Set()
let running = false
let last = 0

function frame(t) {
  const dt = last === 0 ? 1 / 60 : Math.min((t - last) / 1000, 1 / 20)
  last = t
  for (const fn of subscribers) fn(t / 1000, dt)
  if (subscribers.size > 0) {
    requestAnimationFrame(frame)
  } else {
    running = false
    last = 0
  }
}

export function onFrame(fn) {
  subscribers.add(fn)
  if (!running) {
    running = true
    last = 0
    requestAnimationFrame(frame)
  }
  return () => subscribers.delete(fn)
}

/**
 * 半隐式欧拉弹簧。返回 [新位置, 新速度]。
 * stiffness 越大越"硬"，damping 越大越"钝"。
 */
export function springStep(pos, vel, target, stiffness, damping, dt) {
  const a = (target - pos) * stiffness - vel * damping
  const nv = vel + a * dt
  return [pos + nv * dt, nv]
}

/** 线性插值（帧率无关的平滑追随） */
export function damp(current, target, lambda, dt) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}
