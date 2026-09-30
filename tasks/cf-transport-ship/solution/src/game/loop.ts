// 固定步长累加器：渲染帧率不同，模拟推进的步数只取决于真实经过的时间。
import { MAX_FRAME_DT, SIM_DT } from "../config";

export class FixedStep {
  acc = 0;
  steps = 0;

  /** 推进一帧；单帧最多计入 MAX_FRAME_DT，避免失焦恢复后补算。返回插值系数。 */
  advance(frameDt: number, step: () => boolean | void): number {
    this.acc += Math.min(MAX_FRAME_DT, Math.max(0, frameDt));
    while (this.acc >= SIM_DT) {
      this.acc -= SIM_DT;
      this.steps++;
      if (step() === false) { this.acc = 0; break; }
    }
    return this.acc / SIM_DT;
  }

  reset(): void {
    this.acc = 0;
  }
}
