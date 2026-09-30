// 键鼠输入：按物理键位（KeyboardEvent.code）记录；一次性动作缓存到下一个模拟步消费，保证高刷新率下不丢失。
import type { Intent } from "./actor";

export class Input {
  private keys = new Set<string>();
  private buttons = new Set<number>();
  /** 指针锁定或调试无锁模式下才接收游戏输入 */
  active = false;
  lookX = 0;
  lookY = 0;
  private edge = { jump: 0, alt: false, reload: false, slot: -1 as -1 | 0 | 1 | 2 | 3, cycle: 0 as -1 | 0 | 1, quick: false, nade: false };
  tabHeld = false;
  onKey: ((code: string) => void) | null = null;

  constructor(private target: HTMLElement) {
    window.addEventListener("keydown", this.kd, { capture: true });
    window.addEventListener("keyup", this.ku, { capture: true });
    target.addEventListener("mousedown", this.md);
    window.addEventListener("mouseup", this.mu);
    window.addEventListener("mousemove", this.mm);
    target.addEventListener("wheel", this.wh, { passive: false });
    target.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  private kd = (e: KeyboardEvent): void => {
    if (e.code === "Tab") { e.preventDefault(); if (this.active) this.tabHeld = true; }
    if (!this.active) { this.onKey?.(e.code); return; }
    // 锁定时阻止浏览器默认行为（滚动、切焦点、Ctrl 组合键中的常见项）
    if (["Space", "Tab", "KeyW", "KeyA", "KeyS", "KeyD", "ControlLeft", "ControlRight", "KeyC", "KeyQ", "KeyG", "KeyR"].includes(e.code) || e.ctrlKey) e.preventDefault();
    if (!e.repeat) {
      switch (e.code) {
        case "Space": this.edge.jump = 0.12; break;
        case "KeyR": this.edge.reload = true; break;
        case "Digit1": this.edge.slot = 0; break;
        case "Digit2": this.edge.slot = 1; break;
        case "Digit3": this.edge.slot = 2; break;
        case "Digit4": this.edge.slot = 3; break;
        case "KeyQ": this.edge.quick = true; break;
        case "KeyG": this.edge.nade = true; break;
      }
    }
    this.keys.add(e.code);
    this.onKey?.(e.code);
  };

  private ku = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
    if (e.code === "Tab") this.tabHeld = false;
  };

  private md = (e: MouseEvent): void => {
    if (!this.active) return;
    e.preventDefault();
    this.buttons.add(e.button);
    if (e.button === 2) this.edge.alt = true;
  };

  private mu = (e: MouseEvent): void => {
    this.buttons.delete(e.button);
  };

  private mm = (e: MouseEvent): void => {
    if (!this.active) return;
    // 个别浏览器在锁定切换瞬间给出异常大的位移，丢弃
    if (Math.abs(e.movementX) > 600 || Math.abs(e.movementY) > 600) return;
    this.lookX += e.movementX;
    this.lookY += e.movementY;
  };

  private wh = (e: WheelEvent): void => {
    if (!this.active) return;
    e.preventDefault();
    if (e.deltaY !== 0) this.edge.cycle = e.deltaY > 0 ? 1 : -1;
  };

  down(code: string): boolean {
    return this.keys.has(code);
  }

  /** 调试/自动化入口：注入与真实事件相同的键位状态 */
  inject(code: string, pressed: boolean): void {
    if (pressed) this.kd(new KeyboardEvent("keydown", { code }));
    else this.ku(new KeyboardEvent("keyup", { code }));
  }

  injectButton(button: number, pressed: boolean): void {
    if (pressed) { this.buttons.add(button); if (button === 2) this.edge.alt = true; }
    else this.buttons.delete(button);
  }

  consumeLook(): [number, number] {
    const r: [number, number] = [this.lookX, this.lookY];
    this.lookX = this.lookY = 0;
    return r;
  }

  /** 写入一个模拟步的意图；一次性动作只在第一个步中生效 */
  fill(it: Intent, dt: number): void {
    const k = this.keys;
    it.fwd = (k.has("KeyW") ? 1 : 0) - (k.has("KeyS") ? 1 : 0);
    it.right = (k.has("KeyD") ? 1 : 0) - (k.has("KeyA") ? 1 : 0);
    it.walk = k.has("ShiftLeft") || k.has("ShiftRight");
    it.crouch = k.has("ControlLeft") || k.has("ControlRight") || k.has("KeyC");
    it.fire = this.buttons.has(0);
    // 起跳请求保留 0.12 s，落地前一刻按下也能起跳；起跳后立即清除
    it.jump = this.edge.jump > 0;
    this.edge.jump = Math.max(0, this.edge.jump - dt);
    it.alt = this.edge.alt;
    it.reload = this.edge.reload;
    it.slot = this.edge.slot;
    it.cycle = this.edge.cycle;
    it.quick = this.edge.quick;
    it.throwNade = this.edge.nade;
    this.edge.alt = this.edge.reload = this.edge.quick = this.edge.nade = false;
    this.edge.slot = -1;
    this.edge.cycle = 0;
  }

  consumedJump(): void {
    this.edge.jump = 0;
  }

  /** 失焦、暂停、死亡、结算：清空所有按键与待处理动作 */
  clear(): void {
    this.keys.clear();
    this.buttons.clear();
    this.lookX = this.lookY = 0;
    this.tabHeld = false;
    this.edge = { jump: 0, alt: false, reload: false, slot: -1, cycle: 0, quick: false, nade: false };
  }

  get element(): HTMLElement {
    return this.target;
  }
}
