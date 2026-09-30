// 人物运动与碰撞：玩家与电脑共用。只在固定步长 SIM_DT 下调用，因此与渲染帧率无关。
import { PLAYER } from "../config";
import { type Box, type World, toLocalX, toLocalZ } from "./world";

export interface MoveInput {
  fwd: number; // -1..1
  right: number; // -1..1
  jump: boolean; // 本步是否请求起跳
  crouch: boolean;
  walk: boolean;
  yaw: number;
  speedMul: number; // 武器等附加倍率
}

export class Motor {
  x = 0; y = 0; z = 0;
  vx = 0; vy = 0; vz = 0;
  grounded = false;
  crouched = false;
  tucked = false; // 空中下蹲收腿
  eyeOff: number = PLAYER.eyeStand;
  landSpeed = 0; // 本步落地时的下落速度（无落地为 0）
  jumped = false;
  outOfBounds = false;
  private scratch: Box[] = [];
  private scratch2: Box[] = [];

  get height(): number {
    return this.crouched ? PLAYER.crouchHeight : PLAYER.standHeight;
  }
  get eyeY(): number {
    return this.y + this.eyeOff;
  }
  get horizSpeed(): number {
    return Math.hypot(this.vx, this.vz);
  }

  place(x: number, y: number, z: number): void {
    this.x = x; this.y = y; this.z = z;
    this.vx = this.vy = this.vz = 0;
    this.grounded = true;
    this.crouched = false;
    this.tucked = false;
    this.eyeOff = PLAYER.eyeStand;
    this.outOfBounds = false;
  }

  step(inp: MoveInput, dt: number, world: World): void {
    this.landSpeed = 0;
    this.jumped = false;
    this.updateCrouch(inp.crouch, world);

    // 期望速度（斜向归一化）
    let wx = 0, wz = 0;
    const len = Math.hypot(inp.fwd, inp.right);
    if (len > 1e-3) {
      const f = inp.fwd / Math.max(1, len), r = inp.right / Math.max(1, len);
      const s = Math.sin(inp.yaw), c = Math.cos(inp.yaw);
      let mul = inp.speedMul;
      if (this.crouched && this.grounded) mul *= PLAYER.crouchMul;
      else if (inp.walk) mul *= PLAYER.walkMul;
      const sp = PLAYER.runSpeed * mul;
      wx = (-s * f + c * r) * sp;
      wz = (-c * f - s * r) * sp;
    }
    if (this.grounded) {
      approach(this, wx, wz, (len > 1e-3 ? PLAYER.groundAccel : PLAYER.friction * Math.max(1, this.horizSpeed)) * dt);
    } else if (len > 1e-3) {
      approach(this, wx, wz, PLAYER.airAccel * dt);
    }

    if (inp.jump && this.grounded && !this.blockedAbove(world, 0.3)) {
      this.vy = PLAYER.jumpSpeed;
      this.grounded = false;
      this.jumped = true;
    }

    this.x += this.vx * dt;
    this.z += this.vz * dt;
    this.resolveHorizontal(world);
    this.integrateVertical(dt, world);

    const target = this.crouched ? PLAYER.eyeCrouch : PLAYER.eyeStand;
    const rate = 5.5 * dt;
    this.eyeOff += Math.max(-rate, Math.min(rate, target - this.eyeOff));

    if (this.y < PLAYER.fallKillY || Math.abs(this.x) > 54 || Math.abs(this.z) > 15) this.outOfBounds = true;
  }

  private updateCrouch(want: boolean, world: World): void {
    const r = PLAYER.radius * 0.95;
    if (want && !this.crouched) {
      this.crouched = true;
      if (!this.grounded) {
        this.tucked = true;
        this.y += PLAYER.airTuck;
        this.eyeOff -= PLAYER.airTuck;
      }
    } else if (!want && this.crouched) {
      const drop = this.tucked ? PLAYER.airTuck : 0;
      const ny = this.y - drop;
      if (drop > 0 && world.groundAt(this.x, this.z, r, this.y, this.scratch) > ny) return;
      if (world.cylinderBlocked(this.x, this.z, r, ny + 0.02, ny + PLAYER.standHeight, this.scratch)) return;
      this.crouched = false;
      this.tucked = false;
      this.y = ny;
      this.eyeOff += drop;
    }
  }

  private blockedAbove(world: World, extra: number): boolean {
    const top = this.y + this.height;
    return world.cylinderBlocked(this.x, this.z, PLAYER.radius * 0.9, top - 0.01, top + extra, this.scratch);
  }

  resolveHorizontal(world: World): void {
    const r = PLAYER.radius;
    for (let iter = 0; iter < 4; iter++) {
      let moved = false;
      const boxes = world.query(this.x - r, this.z - r, this.x + r, this.z + r, this.scratch);
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (!b.move || b.top <= this.y + 1e-3 || b.bottom >= this.y + this.height) continue;
        const lx = toLocalX(b, this.x - b.cx, this.z - b.cz);
        const lz = toLocalZ(b, this.x - b.cx, this.z - b.cz);
        const qx = Math.max(-b.hx, Math.min(b.hx, lx));
        const qz = Math.max(-b.hz, Math.min(b.hz, lz));
        let px = lx - qx, pz = lz - qz;
        const d2 = px * px + pz * pz;
        if (d2 >= r * r) continue;
        // 可跨越台阶：只在着地时、且上方有站立空间
        const rise = b.top - this.y;
        if (this.grounded && rise <= PLAYER.stepHeight &&
            !world.cylinderBlocked(this.x, this.z, r * 0.9, b.top + 0.01, b.top + this.height, this.scratch2)) {
          this.y = b.top;
          moved = true;
          break;
        }
        let push: number;
        if (d2 > 1e-10) {
          const d = Math.sqrt(d2);
          push = r - d;
          px /= d; pz /= d;
        } else {
          // 圆心已进入盒体：沿最小穿深轴推出
          const ox = b.hx - Math.abs(lx), oz = b.hz - Math.abs(lz);
          if (ox < oz) { px = Math.sign(lx) || 1; pz = 0; push = ox + r; }
          else { px = 0; pz = Math.sign(lz) || 1; push = oz + r; }
        }
        const wx = px * b.cos + pz * b.sin;
        const wz = -px * b.sin + pz * b.cos;
        this.x += wx * push;
        this.z += wz * push;
        // 去掉指向墙内的速度分量，实现贴墙滑动
        const vn = this.vx * wx + this.vz * wz;
        if (vn < 0) { this.vx -= vn * wx; this.vz -= vn * wz; }
        moved = true;
      }
      if (!moved) break;
    }
  }

  private integrateVertical(dt: number, world: World): void {
    const r = PLAYER.radius * 0.92;
    const wasGrounded = this.grounded;
    if (!this.grounded || this.vy > 0) this.vy -= PLAYER.gravity * dt;
    const ny = this.y + this.vy * dt;
    if (this.vy <= 0) {
      const ground = world.groundAt(this.x, this.z, r, this.y + 0.02, this.scratch);
      if (ny <= ground) {
        if (!wasGrounded) this.landSpeed = -this.vy;
        this.y = ground;
        this.vy = 0;
        this.grounded = true;
        this.tucked = false;
      } else if (wasGrounded && this.y - ground <= PLAYER.stepHeight + 0.01) {
        this.y = ground; // 下台阶时贴地
        this.vy = 0;
      } else {
        this.y = ny;
        this.grounded = false;
      }
    } else {
      const top = this.y + this.height;
      const boxes = world.query(this.x - r, this.z - r, this.x + r, this.z + r, this.scratch);
      let ceil = Infinity;
      for (const b of boxes) {
        if (!b.move || b.bottom < top - 0.1 || b.bottom >= ceil) continue;
        const lx = toLocalX(b, this.x - b.cx, this.z - b.cz), lz = toLocalZ(b, this.x - b.cx, this.z - b.cz);
        if (Math.abs(lx) < b.hx + r && Math.abs(lz) < b.hz + r) ceil = b.bottom;
      }
      if (ny + this.height > ceil) {
        this.y = ceil - this.height;
        this.vy = 0;
      } else this.y = ny;
      this.grounded = false;
    }
  }
}

function approach(m: Motor, tx: number, tz: number, maxDelta: number): void {
  const dx = tx - m.vx, dz = tz - m.vz;
  const d = Math.hypot(dx, dz);
  if (d <= maxDelta || d < 1e-6) { m.vx = tx; m.vz = tz; return; }
  m.vx += (dx / d) * maxDelta;
  m.vz += (dz / d) * maxDelta;
}
