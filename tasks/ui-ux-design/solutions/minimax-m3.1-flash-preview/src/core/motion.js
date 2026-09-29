// 动效基元：阻尼弹簧、可见性感知的主循环、reduced-motion 订阅。
// 页面里没有一条 CSS 过渡负责"位置"——位移一律由弹簧积分，
// 这样指针的"重量"和装置的"惯性"是同一套物理。

export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export function clampDt(dt) {
  // 标签页切回、窗口拖动都会产生巨大的 dt；夹住它，积分才不会炸。
  return dt > 0.05 ? 0.05 : dt < 0 ? 0 : dt;
}

/**
 * 半隐式欧拉积分的阻尼弹簧，直接作用在 engine 的两个扁平字段上
 * （例如 springOn(engine, "separation", "separationVel", target, dt, 9.5, 0.92)）。
 * 用字段名而不是 {value, velocity} 包装，是为了让引擎保持扁平、可被探针直接读取。
 */
export function springOn(engine, key, velocityKey, target, dt, omega, zeta = 1) {
  const accel = omega * omega * (target - engine[key]) - 2 * zeta * omega * engine[velocityKey];
  engine[velocityKey] += accel * dt;
  engine[key] += engine[velocityKey] * dt;
  return engine[key];
}

/** 指数趋近：用于不需要惯性的量（可见度、统计量）。 */
export function approach(current, target, dt, rate) {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}

export function createMotionPreference() {
  const query = window.matchMedia(REDUCED_QUERY);
  const listeners = new Set();
  let reduced = query.matches;
  const onChange = (event) => {
    reduced = event.matches;
    for (const listener of listeners) listener(reduced);
  };
  if (typeof query.addEventListener === "function") query.addEventListener("change", onChange);
  else query.addListener(onChange);
  return {
    get: () => reduced,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/**
 * 主循环。
 * - 正常模式：rAF 驱动，页面隐藏时挂起，回到前台不会跳变（dt 夹住）。
 * - reduced-motion：不跑连续循环；invalidate() 只补一帧静止图样。
 */
export function createLoop(onFrame) {
  const motion = createMotionPreference();
  let handle = 0;
  let last = 0;
  let running = false;
  let visible = !document.hidden;

  const onVisibility = () => {
    visible = !document.hidden;
    if (visible && running) {
      last = performance.now();
      handle = requestAnimationFrame(tick);
    }
  };

  function tick(now) {
    const dt = clampDt((now - last) / 1000);
    last = now;
    onFrame(dt, now);
    if (running && visible) handle = requestAnimationFrame(tick);
  }

  const kick = () => {
    if (handle || !running) return;
    last = performance.now();
    handle = requestAnimationFrame(tick);
  };

  return {
    motion,
    get reduced() {
      return motion.get();
    },
    start() {
      if (running) return;
      running = true;
      document.addEventListener("visibilitychange", onVisibility);
      kick();
    },
    stop() {
      running = false;
      document.removeEventListener("visibilitychange", onVisibility);
      if (handle) cancelAnimationFrame(handle);
      handle = 0;
    },
    /** reduced-motion 下用：状态变了就重画一帧，不做连续动画。 */
    invalidate() {
      if (!running) return;
      if (motion.get()) onFrame(0, performance.now());
      else kick();
    },
  };
}
