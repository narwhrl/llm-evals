// 可调参数集中于此。所有数值均为本项目的设计目标，并非官方武器或地图数据。

export const PLAYER = {
  radius: 0.34,
  standHeight: 1.8,
  crouchHeight: 1.2,
  eyeStand: 1.62,
  eyeCrouch: 1.06,
  stepHeight: 0.45,
  gravity: 20,
  // 站立起跳顶点约 0.98 m；空中下蹲收腿 0.4 m，跳蹲可达约 1.38 m。
  jumpSpeed: 6.25,
  airTuck: 0.4,
  runSpeed: 5.0,
  walkMul: 0.52,
  crouchMul: 0.4,
  groundAccel: 55,
  airAccel: 9,
  friction: 11,
  fallKillY: -4,
  crouchSpeed: 7, // 蹲起过渡速率（每秒完成比例）
};

export type WeaponId = "ak" | "m4" | "mp5" | "awm" | "deagle" | "knife" | "he" | "smoke";
export type PrimaryId = "ak" | "m4" | "mp5" | "awm";
export type Slot = 0 | 1 | 2 | 3; // 主武器、手枪、近战、投掷物
export type FireMode = "auto" | "semi" | "bolt";

export interface GunDef {
  id: WeaponId;
  name: string;
  short: string;
  slot: Slot;
  mode: FireMode;
  mag: number;
  reserve: number;
  rpm: number;
  damage: number;
  headMul: number;
  limbMul: number;
  legMul: number;
  armorRatio: number; // 有护甲时进入生命的伤害比例
  falloffStart: number;
  falloffEnd: number;
  minDamageMul: number;
  range: number;
  pen: number; // 可消耗的木材等效穿透力
  maxPenObjects: number;
  spreadBase: number; // 弧度，静止站立
  spreadMove: number; // 满速移动附加
  spreadAir: number;
  crouchMul: number;
  spreadPerShot: number;
  spreadMax: number;
  spreadRecover: number; // 每秒回落
  recoilUp: number; // 度
  recoilSide: number;
  recoilGrow: number;
  recoilRecover: number; // 度/秒
  reloadTime: number;
  reloadKeys: [number, number]; // 退匣、上匣时刻（占换弹时长比例）
  drawTime: number;
  moveMul: number;
  boltTime?: number;
  scopeFov?: number[]; // 水平视野（度）
  scopedSpread?: number;
  unscopedSpreadMul?: number;
}

export interface MeleeDef {
  id: "knife";
  name: string;
  short: string;
  slot: 2;
  moveMul: number;
  drawTime: number;
  armorRatio: number;
  light: MeleeAttack;
  heavy: MeleeAttack;
}

export interface MeleeAttack {
  damage: number;
  range: number;
  halfAngle: number; // 弧度
  hitTime: number; // 出手后多少秒判定
  recovery: number; // 整个动作耗时
}

export const GUNS: Record<"ak" | "m4" | "mp5" | "awm" | "deagle", GunDef> = {
  ak: {
    id: "ak", name: "AK-47 突击步枪", short: "AK-47", slot: 0, mode: "auto",
    mag: 30, reserve: 90, rpm: 600, damage: 36, headMul: 4, limbMul: 0.85, legMul: 0.75, armorRatio: 0.775,
    falloffStart: 30, falloffEnd: 90, minDamageMul: 0.78, range: 160, pen: 1.6, maxPenObjects: 2,
    spreadBase: 0.0035, spreadMove: 0.05, spreadAir: 0.16, crouchMul: 0.75,
    spreadPerShot: 0.0065, spreadMax: 0.07, spreadRecover: 0.16,
    recoilUp: 0.62, recoilSide: 0.32, recoilGrow: 0.07, recoilRecover: 9,
    reloadTime: 2.45, reloadKeys: [0.3, 0.72], drawTime: 0.75, moveMul: 0.96,
  },
  m4: {
    id: "m4", name: "M4A1 卡宾枪", short: "M4A1", slot: 0, mode: "auto",
    mag: 30, reserve: 90, rpm: 720, damage: 31, headMul: 4, limbMul: 0.85, legMul: 0.75, armorRatio: 0.7,
    falloffStart: 30, falloffEnd: 90, minDamageMul: 0.8, range: 160, pen: 1.35, maxPenObjects: 2,
    spreadBase: 0.003, spreadMove: 0.042, spreadAir: 0.15, crouchMul: 0.7,
    spreadPerShot: 0.0042, spreadMax: 0.05, spreadRecover: 0.22,
    recoilUp: 0.4, recoilSide: 0.16, recoilGrow: 0.04, recoilRecover: 12,
    reloadTime: 2.2, reloadKeys: [0.28, 0.7], drawTime: 0.7, moveMul: 1.0,
  },
  mp5: {
    id: "mp5", name: "MP5 冲锋枪", short: "MP5", slot: 0, mode: "auto",
    mag: 30, reserve: 120, rpm: 850, damage: 26, headMul: 3, limbMul: 0.85, legMul: 0.8, armorRatio: 0.6,
    falloffStart: 10, falloffEnd: 40, minDamageMul: 0.55, range: 110, pen: 0.4, maxPenObjects: 1,
    spreadBase: 0.006, spreadMove: 0.022, spreadAir: 0.1, crouchMul: 0.8,
    spreadPerShot: 0.0035, spreadMax: 0.055, spreadRecover: 0.3,
    recoilUp: 0.26, recoilSide: 0.2, recoilGrow: 0.02, recoilRecover: 14,
    reloadTime: 2.0, reloadKeys: [0.3, 0.68], drawTime: 0.55, moveMul: 1.08,
  },
  awm: {
    id: "awm", name: "AWM 栓动狙击枪", short: "AWM", slot: 0, mode: "bolt",
    mag: 5, reserve: 20, rpm: 60, damage: 115, headMul: 2.5, limbMul: 0.8, legMul: 0.72, armorRatio: 0.97,
    falloffStart: 200, falloffEnd: 300, minDamageMul: 1, range: 220, pen: 2.6, maxPenObjects: 3,
    spreadBase: 0.09, spreadMove: 0.12, spreadAir: 0.25, crouchMul: 0.9,
    spreadPerShot: 0.0, spreadMax: 0.2, spreadRecover: 0.5,
    recoilUp: 3.2, recoilSide: 0.4, recoilGrow: 0, recoilRecover: 16,
    reloadTime: 3.4, reloadKeys: [0.3, 0.68], drawTime: 0.9, moveMul: 0.86,
    boltTime: 1.35, scopeFov: [40, 14], scopedSpread: 0.0008,
  },
  deagle: {
    id: "deagle", name: "沙漠之鹰 大口径手枪", short: "沙鹰", slot: 1, mode: "semi",
    mag: 7, reserve: 35, rpm: 240, damage: 48, headMul: 3.6, limbMul: 0.8, legMul: 0.75, armorRatio: 0.9,
    falloffStart: 18, falloffEnd: 60, minDamageMul: 0.7, range: 120, pen: 0.65, maxPenObjects: 1,
    spreadBase: 0.006, spreadMove: 0.04, spreadAir: 0.14, crouchMul: 0.8,
    spreadPerShot: 0.022, spreadMax: 0.08, spreadRecover: 0.2,
    recoilUp: 2.1, recoilSide: 0.5, recoilGrow: 0, recoilRecover: 10,
    reloadTime: 1.9, reloadKeys: [0.3, 0.7], drawTime: 0.5, moveMul: 1.08,
  },
};

export const KNIFE: MeleeDef = {
  id: "knife", name: "战术刀", short: "战术刀", slot: 2, moveMul: 1.15, drawTime: 0.4, armorRatio: 0.85,
  light: { damage: 34, range: 1.7, halfAngle: 0.5, hitTime: 0.14, recovery: 0.45 },
  heavy: { damage: 68, range: 1.45, halfAngle: 0.38, hitTime: 0.42, recovery: 1.05 },
};

export const GRENADE = {
  throwSpeed: 16,
  lobSpeed: 9,
  radius: 0.07,
  restitution: 0.38,
  friction: 0.65,
  drawTime: 0.45,
  throwTime: 0.32, // 出手动作到出手的延迟
  he: { fuse: 1.75, radius: 6.5, damage: 105, armorRatio: 0.5 },
  smoke: { fuse: 1.4, grow: 1.6, hold: 13, fade: 3.5, radius: 4.4, height: 3.2, blockChord: 1.6 },
};

export const MATCH = {
  standard: { killTarget: 100, timeLimit: 600, label: "标准对局 · 100 击杀 / 10 分钟" },
  practice: { killTarget: 30, timeLimit: 180, label: "练习局 · 30 击杀 / 3 分钟" },
  respawnDelay: 3,
  spawnProtect: 2.0,
  maxHealth: 100,
  maxArmor: 100,
  teamSize: 5,
};

export type Difficulty = "easy" | "normal" | "hard";

export interface BotSkill {
  label: string;
  reaction: number; // 首次发现到开火（秒）
  aimError: number; // 初始误差（度）
  errorDecay: number; // 每秒收敛比例
  turnSpeed: number; // 度/秒
  burstMin: number;
  burstMax: number;
  burstPause: number;
  fov: number; // 度
  headAim: number; // 瞄头概率
  coordination: number; // 协同/投掷意愿 0..1
  strafe: number;
}

export const DIFFICULTY: Record<Difficulty, BotSkill> = {
  easy: { label: "简单", reaction: 0.6, aimError: 5.5, errorDecay: 0.7, turnSpeed: 170, burstMin: 2, burstMax: 4, burstPause: 0.55, fov: 100, headAim: 0.05, coordination: 0.2, strafe: 0.2 },
  normal: { label: "普通", reaction: 0.34, aimError: 3.2, errorDecay: 1.3, turnSpeed: 280, burstMin: 3, burstMax: 5, burstPause: 0.35, fov: 110, headAim: 0.15, coordination: 0.5, strafe: 0.5 },
  hard: { label: "困难", reaction: 0.2, aimError: 1.8, errorDecay: 2.2, turnSpeed: 420, burstMin: 3, burstMax: 6, burstPause: 0.25, fov: 120, headAim: 0.3, coordination: 0.8, strafe: 0.8 },
};

export const SIM_DT = 1 / 120;
export const MAX_FRAME_DT = 0.1; // 单帧最多推进的真实时间，避免失焦恢复后补算
