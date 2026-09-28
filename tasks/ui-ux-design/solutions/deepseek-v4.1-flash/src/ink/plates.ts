import type { Field, FieldParams } from "./field";

export interface PlateSpec {
  temperature: number;
  ambient: number;
  originX: number;
  originY: number;
  /** 这张版画相当于"写了多少秒" */
  seconds: number;
  /** 这张版画新增多少条笔迹（纸是累积的，所以按增量算） */
  strokes: number;
  /** 是否在最后斩一刀（章节二的定格） */
  cut?: boolean;
}

/**
 * 静置呈现：同一套模拟离线跑完，一次性把墨写进纸里。
 * 不为动效花时间，但版画与完整动效路径是同一个系统画出来的。
 * 不清空纸面——静置版也是"越读越脏"，换不换纸由调用方决定。
 */
export function bakePlate(
  field: Field,
  spec: PlateSpec,
  drain: () => void,
  maxStrokes: number,
): void {
  const dt = 1 / 60;
  const steps = Math.round(spec.seconds * 60);
  const baseline = field.spawned;
  const params: FieldParams = {
    temperature: spec.temperature,
    pointerX: 0,
    pointerY: 0,
    pointerActive: false,
    originX: spec.originX * field.width,
    originY: spec.originY * field.height,
    maxStrokes,
    ambient: spec.ambient,
    attract: 0,
  };

  for (let i = 0; i < steps; i += 1) {
    if (field.spawned - baseline >= spec.strokes && field.liveCount === 0) break;
    field.update(dt, params);
    if (field.paint.count > 2400) drain();
  }

  if (spec.cut) field.cutSweep(field.height * 0.52, false);
  drain();
}
