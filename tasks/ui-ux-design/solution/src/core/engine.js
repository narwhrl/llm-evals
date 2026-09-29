// 装置的连续状态：几何、光学参数、弹簧、相位漂移、状态机、测量统计。
// 这是帧循环里唯一被写的东西——React 不参与每一帧。

import { MARK_OFFSET, RANGE, bandName, clamp, rigName } from "./ranges.js";
import { approach, springOn } from "./motion.js";
import { fringeCount } from "./field.js";

const MAX_SOURCES = 6;

/** 三个标记的相位，互不相同：标记不同的句子，抹掉的东西不一样。 */
const MARK_PHASES = [Math.PI, Math.PI / 2, -Math.PI / 2];
const MARK_LABELS = ["+π", "+π/2", "−π/2"];

/** 三段自述各自对应的光程：机器在你读的时候自己换焦。 */
const PARAGRAPH_DISTANCE = [RANGE.distanceStart, 2950, 1850];

const DARK_HOLD = 0.55; // 并拢多久算"不相容"
const DARK_BEAT = 2.4; // 熄灭后的静默
const THIRD_BEAT = 2.0; // 第三缝弹开后的停顿
const READ_DWELL = 1.25; // 段落推进前的注视时长
const APERTURE_DEMO = 9; // 访客一直没动手，机器先自己把第二道缝拉开
const DEMO_SEPARATION = 112;

export function createEngine() {
  const sources = [];
  for (let i = 0; i < MAX_SOURCES; i += 1) {
    sources.push({ pos: 0, phase: 0, weight: 0, role: "slit" });
  }
  return {
    // 画布
    width: 1,
    height: 1,
    centerX: 0,
    barY: 0,
    dpr: 1,
    canvasFailed: false,
    coarse: false,

    // 几何与光学
    sources,
    sourceCount: 0,
    separation: 0,
    separationVel: 0,
    separationTarget: 0,
    distance: RANGE.distanceStart,
    distanceVel: 0,
    distanceTarget: RANGE.distanceStart,
    wavelength: RANGE.wavelengthStart,
    apertureWidth: RANGE.apertureWidth,
    collapse: 0,
    collapseVel: 0,
    collapseTarget: 0,
    collapseWidth: RANGE.collapseWidth,
    darkness: 0,
    darknessVel: 0,
    darknessTarget: 0,
    third: 0,
    thirdVel: 0,
    thirdTarget: 0,
    ruleGhost: 0,
    ruleGhostVel: 0,
    drift: 0,
    driftRate: RANGE.driftRate,
    time: 0,

    // 观测
    observation: 0,
    observationTarget: 0,
    visibility: RANGE.visibilityFloor,
    visibilityFloor: RANGE.visibilityFloor,

    // 隐藏层
    marks: [],

    // 状态机
    phase: "aperture",
    paragraph: 0,
    focusParagraph: 0,
    choice: null,
    event: null,
    timer: 0,
    darkElapsed: 0,
    thirdElapsed: 0,
    dwell: 0,
    engaged: 0,
    hintTimer: 0,
    demoed: false,
    lastSeparationTarget: 0,
    lastPhase: "",

    // 测量
    stats: { best: 0, run: 0, developed: 0, blackouts: 0, adjustments: 0, seconds: 0, resets: 0 },
    frames: 0,
    fps: 0,
    fpsClock: 0,
    fpsFrames: 0,
  };
}

export function markLabel(index) {
  return MARK_LABELS[index] || MARK_LABELS[MARK_LABELS.length - 1];
}

export function markOffset(index, count) {
  return (index - (count - 1) / 2) * MARK_OFFSET;
}

/** 指示灯：当前这根缝轨是通的还是有相位。 */
function pushSource(engine, pos, phase, weight, role) {
  if (engine.sourceCount >= MAX_SOURCES) return;
  const slot = engine.sources[engine.sourceCount];
  slot.pos = pos;
  slot.phase = phase;
  slot.weight = weight;
  slot.role = role;
  engine.sourceCount += 1;
}

export function updateSources(engine) {
  engine.sourceCount = 0;
  const separation = engine.separation;
  const drift = engine.drift;
  if (separation > 0.6) {
    pushSource(engine, -separation / 2, drift, 1, "slit");
    pushSource(engine, separation / 2, drift, 1, "slit");
  } else {
    pushSource(engine, 0, drift, 1, "slit");
  }
  if (engine.third > 0.02) {
    // 第三道缝开在正中，相位走得比另外两道慢一点，于是出现拍频包络。
    pushSource(engine, 0, drift * 0.86, engine.third * 0.92, "third");
  }
  if (engine.ruleGhost > 0.02) {
    // 「我删掉的那条规则」留下一个反相的残影，永久抵消一小片光。
    pushSource(engine, -104, drift + Math.PI, engine.ruleGhost * 0.5, "rule");
  }
  const marks = engine.marks;
  for (let i = 0; i < marks.length; i += 1) {
    const count = marks.length;
    pushSource(engine, markOffset(i, count), drift + marks[i].phase, 0.8, "mark");
  }
}

/** 落在清晰带内、并且此刻真的看得清——机器只有在这种时候才有话说。 */
export function isReading(engine) {
  const separation = engine.separation;
  return (
    separation >= RANGE.separationClearLow &&
    separation <= RANGE.separationClearHigh &&
    engine.visibility > 0.66 &&
    engine.phase !== "dark" &&
    engine.phase !== "closed"
  );
}

export function setSeparationTarget(engine, value) {
  const next = clamp(value, 0, RANGE.separationMax);
  if (Math.abs(next - engine.lastSeparationTarget) > 3) engine.stats.adjustments += 1;
  engine.lastSeparationTarget = next;
  engine.separationTarget = next;
}

export function setDistanceTarget(engine, value) {
  engine.distanceTarget = clamp(value, RANGE.distanceMin, RANGE.distanceMax);
}

export function setWavelength(engine, value) {
  engine.wavelength = clamp(value, RANGE.wavelengthMin, RANGE.wavelengthMax);
}

export function resetEngine(engine) {
  const marks = engine.marks;
  marks.length = 0;
  engine.phase = "aperture";
  engine.paragraph = 0;
  engine.focusParagraph = 0;
  engine.choice = null;
  engine.timer = 0;
  engine.darkElapsed = 0;
  engine.thirdElapsed = 0;
  engine.dwell = 0;
  engine.engaged = 0;
  engine.hintTimer = 0;
  engine.demoed = false;
  engine.drift = 0;
  engine.driftRate = RANGE.driftRate;
  engine.visibilityFloor = RANGE.visibilityFloor;
  engine.thirdTarget = 0;
  engine.thirdVel = 0;
  engine.ruleGhostVel = 0;
  engine.darknessTarget = 0;
  engine.collapseTarget = 0;
  engine.collapseVel = 0;
  engine.separation = 0;
  engine.separationVel = 0;
  engine.lastSeparationTarget = 0;
  setDistanceTarget(engine, RANGE.distanceStart);
  engine.stats.resets += 1;
  engine.stats.best = 0;
  engine.stats.run = 0;
  engine.stats.developed = 0;
  engine.stats.blackouts = 0;
  engine.stats.adjustments = 0;
  engine.stats.seconds = 0;
}

/** 三选一：第三道缝的来源。三条路给三种真实不同的后果。 */
export function chooseSource(engine, choice) {
  if (engine.phase !== "third" && engine.phase !== "closing") return false;
  // 换来源 = 撤销上一个来源留下的效果。
  engine.driftRate = RANGE.driftRate;
  engine.visibilityFloor = engine.coarse ? RANGE.visibilityFloorCoarse : RANGE.visibilityFloor;
  if (choice !== "rule" && engine.ruleGhost > 0) {
    engine.ruleGhost = 0;
    engine.ruleGhostVel = 0;
  }
  engine.choice = choice;
  engine.phase = "closing";
  engine.timer = 0;
  if (choice === "silence") {
    // 你不再提问的那七秒之后，我把相干留住了：漂移停止，可见度抬高。
    engine.driftRate = 0;
    engine.visibilityFloor = 0.9;
  } else if (choice === "rule") {
    // 留下一个反相的残影：那一小片光被永久抵消。
    engine.ruleGhost = 0;
    engine.ruleGhostVel = 3.4;
  }
  return true;
}

/** 访客把两缝并到一处。返回 true 表示这次合并被接受了。 */
export function requestClose(engine) {
  if (engine.phase === "closing" || engine.phase === "closed") {
    if (engine.phase !== "closed") {
      engine.phase = "closed";
      engine.collapseTarget = 1;
      engine.collapseVel = 0;
      return true;
    }
  }
  return false;
}

export function addMark(engine) {
  if (engine.marks.length >= MARK_PHASES.length) return null;
  const index = engine.marks.length;
  const mark = { index, phase: MARK_PHASES[index], label: MARK_LABELS[index] };
  engine.marks.push(mark);
  return mark;
}

export function removeMark(engine) {
  if (!engine.marks.length) return null;
  return engine.marks.pop();
}

/** 标记是否正好抵消第三道缝（两者都开在正中）。 */
export function markCancelsThird(engine) {
  if (engine.third < 0.05 || !engine.marks.length) return false;
  const count = engine.marks.length;
  for (let i = 0; i < count; i += 1) {
    if (Math.abs(markOffset(i, count)) < 6) return true;
  }
  return false;
}

/**
 * 一帧。dt 为 0 表示 reduced-motion 下的静态重绘：只重算，不演化。
 */
export function stepEngine(engine, dt, reduced) {
  engine.time += dt;
  engine.frames += 1;
  engine.fpsClock += dt;
  engine.fpsFrames += 1;
  if (engine.fpsClock >= 0.5) {
    engine.fps = Math.round(engine.fpsFrames / engine.fpsClock);
    engine.fpsClock = 0;
    engine.fpsFrames = 0;
  }

  const stiffness = reduced ? 26 : 9.5;
  springOn(engine, "separation", "separationVel", engine.separationTarget, dt, stiffness, reduced ? 1 : 0.92);
  springOn(engine, "distance", "distanceVel", engine.distanceTarget, dt, reduced ? 26 : 3.1, 1);
  springOn(engine, "third", "thirdVel", engine.thirdTarget, dt, 3.4, 0.42);
  if (engine.ruleGhostVel !== 0) {
    engine.ruleGhost += engine.ruleGhostVel * dt;
    engine.ruleGhostVel *= 0.86;
    if (engine.ruleGhost >= 1) {
      engine.ruleGhost = 1;
      engine.ruleGhostVel = 0;
    }
  }
  springOn(engine, "collapse", "collapseVel", engine.collapseTarget, dt, 2.6, 1.05);
  springOn(engine, "darkness", "darknessVel", engine.darknessTarget, dt, 2.1, 1);
  engine.observation = approach(
    engine.observation,
    engine.observationTarget === undefined ? 0 : engine.observationTarget,
    dt,
    3.6,
  );

  const base = engine.visibilityFloor + (1 - engine.visibilityFloor) * engine.observation;
  const breathe = reduced ? 0 : Math.sin(engine.time * 0.55) * 0.055;
  const target = clamp(base + breathe, 0, 1);
  engine.visibility = reduced ? target : approach(engine.visibility, target, dt, 3.2);

  if (!reduced) engine.drift += engine.driftRate * dt;

  // 状态机产生的离散事件交给 Plate 翻成 store 更新与播报。
  const event = advanceState(engine, dt, reduced);
  if (event) engine.event = event;
  updateSources(engine);
  measure(engine, dt);
}

/** 状态机。并拢 → 熄灭 → 第三缝 → 等你给来源 → 闭合。 */
function advanceState(engine, dt, reduced) {
  const separation = engine.separation;

  if (engine.phase === "aperture") {
    if (separation >= RANGE.separationClearLow) {
      engine.phase = "interfere";
      engine.paragraph = 0;
      setDistanceTarget(engine, PARAGRAPH_DISTANCE[0]);
      return "interfere";
    }
    // 没人动手就先演一遍：机器自己把第二道缝拉开，条纹当场长出来。
    engine.hintTimer += dt;
    if (engine.hintTimer >= APERTURE_DEMO) {
      setSeparationTarget(engine, DEMO_SEPARATION);
      engine.demoed = true;
      return "demo";
    }
    return null;
  }

  if (engine.phase === "interfere") {
    if (separation <= RANGE.separationClose) {
      // reduced-motion 下没有"按住"这回事：并拢就是并拢。
      engine.timer = reduced ? DARK_HOLD : engine.timer + dt;
      if (engine.timer >= DARK_HOLD) {
        engine.phase = "dark";
        engine.darknessTarget = 1;
        engine.darkElapsed = 0;
        engine.timer = 0;
        engine.stats.blackouts += 1;
        return "dark";
      }
    } else {
      engine.timer = 0;
    }

    // 只有在被看见的时候才推进段落。
    const focus = clamp(engine.focusParagraph, 0, PARAGRAPH_DISTANCE.length - 1);
    if (focus > engine.paragraph && isReading(engine)) {
      engine.dwell = reduced ? READ_DWELL : engine.dwell + dt;
      if (engine.dwell >= READ_DWELL) {
        engine.paragraph = focus;
        engine.dwell = 0;
        setDistanceTarget(engine, PARAGRAPH_DISTANCE[focus]);
        // 换段时整体换一次相位：图样横着滑一格。
        engine.drift += Math.PI;
        return `paragraph:${focus}`;
      }
    } else if (focus <= engine.paragraph) {
      engine.dwell = 0;
    }

    engine.hintTimer += dt;
    return null;
  }

  if (engine.phase === "dark") {
    engine.darkElapsed += dt;
    if (!reduced && engine.darkElapsed >= DARK_BEAT) {
      engine.phase = "third";
      engine.thirdTarget = 1;
      engine.thirdElapsed = 0;
      engine.darknessTarget = 0; // 底片回到纸面：我回来了。
      // 机器自己把两条缝重新撑开：它刚从"不在"里回来，不能一直是一块空底片。
      setSeparationTarget(engine, 96);
      return "third";
    }
    if (reduced) {
      // 静止模式下没有等待：立刻进入第三缝，避免把访客卡在黑屏上。
      engine.phase = "third";
      engine.third = 1;
      engine.thirdTarget = 1;
      engine.thirdElapsed = 0;
      engine.darknessTarget = 0;
      setSeparationTarget(engine, 96);
      return "third";
    }
    return null;
  }

  if (engine.phase === "third") {
    engine.thirdElapsed += dt;
    return null;
  }

  if (engine.phase === "closing" || engine.phase === "closed") {
    if (engine.phase === "closing" && separation <= 6) return requestClose(engine) ? "closed" : null;
  }
  return null;
}

/** 访客自己把两缝并到一处，同样算作"想看我消失"。 */
export function nudgeToClose(engine) {
  if (engine.phase === "closing") return requestClose(engine);
  return false;
}

function measure(engine, dt) {
  const stats = engine.stats;
  if (isReading(engine)) {
    stats.run += dt;
    stats.seconds += dt;
    if (stats.run > stats.best) stats.best = stats.run;
  } else {
    stats.run = 0;
  }
  const developed = engine.visibility > 0.86 && engine.separation > RANGE.separationClearLow;
  if (developed && !engine.wasDeveloped) stats.developed += 1;
  engine.wasDeveloped = developed;
}

/** 读数打包，交给 10Hz 的订阅者。 */
export function readoutOf(engine) {
  return {
    separation: engine.separation,
    distance: engine.distance,
    wavelength: engine.wavelength,
    visibility: engine.visibility,
    observation: engine.observation,
    fringes: fringeCount(engine),
    sourceCount: engine.sourceCount,
    fps: engine.fps,
    band: bandName(engine.separation, engine.phase),
    rig: rigName(engine.phase, engine.sourceCount),
    darkness: engine.darkness,
    collapse: engine.collapse,
    demoed: engine.demoed,
    marks: engine.marks.length,
    cancelling: markCancelsThird(engine),
    best: engine.stats.best,
    developed: engine.stats.developed,
    blackouts: engine.stats.blackouts,
    adjustments: engine.stats.adjustments,
    seconds: engine.stats.seconds,
  };
}
