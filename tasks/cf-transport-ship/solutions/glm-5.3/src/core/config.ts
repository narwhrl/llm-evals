/**
 * 全局配置：所有平衡数值、规则常量集中于此。
 * 数值为本项目的设计目标（参照经典竞技手感调校），非官方数据。
 */

export type Team = 'blue' | 'red';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type MatchMode = 'official' | 'practice';
export type BodyPart = 'head' | 'torso' | 'legs';
export type SlotIndex = 0 | 1 | 2 | 3;

export interface WeaponDef {
  id: string;
  name: string;
  nameEn: string;
  cls: 'rifle' | 'carbine' | 'smg' | 'sniper' | 'pistol' | 'melee' | 'grenade';
  /** 弹匣 / 备弹 */
  mag: number;
  reserve: number;
  /** 基础躯干伤害（100 生命、有效交战距离、无护甲） */
  dmgTorso: number;
  /** 每分钟射速；近战为每分钟攻击次数 */
  rpm: number;
  auto: boolean;
  /** 射击间隔（秒），由 rpm 推导 */
  fireInterval: number;
  /** 腰射基础散布半角（度） */
  spreadHip: number;
  /** 开镜散布半角（度） */
  spreadAds: number;
  /** 每连续 1 秒射击增加的散布（度） */
  spreadGrow: number;
  /** 停火后散布恢复（度/秒） */
  spreadRecover: number;
  /** 移动附加散布系数（乘移动速度比例） */
  spreadMoveMul: number;
  /** 后坐：每次射击的垂直(度)与水平扰动(度) */
  recoilV: number;
  recoilH: number;
  /** 后坐恢复（度/秒） */
  recoilRecover: number;
  /** 弹丸穿透能力：可穿透的累计厚度（米）；0 = 不可穿透 */
  penThickness: number;
  /** 每穿透一次的伤害系数 */
  penDamageFactor: number;
  /** 距离伤害衰减起点/终点（米）与终点系数 */
  falloffStart: number;
  falloffEnd: number;
  falloffMul: number;
  /** 换弹时长（秒） */
  reloadTime: number;
  /** 栓动间隔（秒），0 = 无 */
  boltTime: number;
  /** 切枪时长（秒） */
  drawTime: number;
  /** 开镜（狙击）视野（垂直角度，度），0 = 无开镜 */
  adsFov: number;
  /** 弹速表现（曳光用，米/秒） */
  tracerSpeed: number;
  desc: string;
  stats: { 伤害: number; 射速: number; 精度: number; 控制: number; 机动: number };
}

const W = (w: Omit<WeaponDef, 'fireInterval'>): WeaponDef => ({
  ...w,
  fireInterval: 60 / w.rpm,
});

export const WEAPONS: Record<string, WeaponDef> = {
  ak: W({
    id: 'ak', name: 'AR-47 突击步枪', nameEn: 'AR-47', cls: 'rifle',
    mag: 30, reserve: 90, dmgTorso: 33, rpm: 600, auto: true,
    spreadHip: 1.5, spreadAds: 0.35, spreadGrow: 2.6, spreadRecover: 5.5, spreadMoveMul: 2.4,
    recoilV: 0.62, recoilH: 0.24, recoilRecover: 6.5,
    penThickness: 1.9, penDamageFactor: 0.68,
    falloffStart: 32, falloffEnd: 90, falloffMul: 0.62,
    reloadTime: 2.4, boltTime: 0, drawTime: 0.9, adsFov: 0, tracerSpeed: 380,
    desc: '高威力突击步枪。单发有力、后坐明显：短点射精准，压枪扫射在中近距离压制力强。可穿透木箱。',
    stats: { 伤害: 0.9, 射速: 0.62, 精度: 0.72, 控制: 0.5, 机动: 0.62 },
  }),
  m4: W({
    id: 'm4', name: 'M4-C 卡宾枪', nameEn: 'M4-C', cls: 'carbine',
    mag: 30, reserve: 90, dmgTorso: 29, rpm: 680, auto: true,
    spreadHip: 1.3, spreadAds: 0.3, spreadGrow: 1.7, spreadRecover: 7.2, spreadMoveMul: 2.2,
    recoilV: 0.4, recoilH: 0.14, recoilRecover: 8.2,
    penThickness: 1.7, penDamageFactor: 0.68,
    falloffStart: 30, falloffEnd: 85, falloffMul: 0.66,
    reloadTime: 2.2, boltTime: 0, drawTime: 0.85, adsFov: 0, tracerSpeed: 380,
    desc: '稳定型卡宾枪。射速略高、散布增长平缓、回正快，连续射击更容易控制，适合中距离节奏压制。',
    stats: { 伤害: 0.74, 射速: 0.7, 精度: 0.78, 控制: 0.82, 机动: 0.68 },
  }),
  mp5: W({
    id: 'mp5', name: 'MP-9 冲锋枪', nameEn: 'MP-9', cls: 'smg',
    mag: 30, reserve: 120, dmgTorso: 24, rpm: 900, auto: true,
    spreadHip: 1.9, spreadAds: 0.8, spreadGrow: 2.9, spreadRecover: 6.8, spreadMoveMul: 1.5,
    recoilV: 0.3, recoilH: 0.2, recoilRecover: 9,
    penThickness: 0.7, penDamageFactor: 0.5,
    falloffStart: 16, falloffEnd: 48, falloffMul: 0.5,
    reloadTime: 2.0, boltTime: 0, drawTime: 0.7, adsFov: 0, tracerSpeed: 320,
    desc: '高射速冲锋枪。近距离灵活凶狠，移动散布惩罚小；远距离伤害与精度明显落后，穿透薄弱。',
    stats: { 伤害: 0.55, 射速: 0.95, 精度: 0.5, 控制: 0.66, 机动: 0.9 },
  }),
  awp: W({
    id: 'awp', name: 'AWM-S 栓动狙击枪', nameEn: 'AWM-S', cls: 'sniper',
    mag: 5, reserve: 20, dmgTorso: 108, rpm: 46, auto: false,
    spreadHip: 7.5, spreadAds: 0.04, spreadGrow: 0, spreadRecover: 10, spreadMoveMul: 1.6,
    recoilV: 2.6, recoilH: 0.4, recoilRecover: 5,
    penThickness: 2.6, penDamageFactor: 0.8,
    falloffStart: 200, falloffEnd: 400, falloffMul: 0.85,
    reloadTime: 3.4, boltTime: 1.15, drawTime: 1.2, adsFov: 10, tracerSpeed: 900,
    desc: '大口径栓动狙击枪。开镜高倍精确，有效距离内躯干一击必杀；腰射散布巨大，射后需拉栓。穿透力最强。',
    stats: { 伤害: 1, 射速: 0.12, 精度: 1, 控制: 0.3, 机动: 0.4 },
  }),
  de: W({
    id: 'de', name: 'DE-50 战术手枪', nameEn: 'DE-50', cls: 'pistol',
    mag: 7, reserve: 35, dmgTorso: 46, rpm: 240, auto: false,
    spreadHip: 1.7, spreadAds: 0.9, spreadGrow: 1.2, spreadRecover: 8, spreadMoveMul: 1.8,
    recoilV: 1.5, recoilH: 0.3, recoilRecover: 7,
    penThickness: 0.6, penDamageFactor: 0.55,
    falloffStart: 20, falloffEnd: 55, falloffMul: 0.55,
    reloadTime: 1.9, boltTime: 0, drawTime: 0.5, adsFov: 0, tracerSpeed: 340,
    desc: '大口径半自动手枪。单发威力大、有明显射击节奏，快速点击仍受间隔限制；穿透很弱。',
    stats: { 伤害: 0.82, 射速: 0.4, 精度: 0.62, 控制: 0.5, 机动: 0.95 },
  }),
  knife: W({
    id: 'knife', name: '战术军刀', nameEn: 'KNIFE', cls: 'melee',
    mag: 0, reserve: 0, dmgTorso: 34, rpm: 240, auto: false,
    spreadHip: 0, spreadAds: 0, spreadGrow: 0, spreadRecover: 10, spreadMoveMul: 0,
    recoilV: 0, recoilH: 0, recoilRecover: 10,
    penThickness: 0, penDamageFactor: 0,
    falloffStart: 999, falloffEnd: 1000, falloffMul: 1,
    reloadTime: 0, boltTime: 0, drawTime: 0.35, adsFov: 0, tracerSpeed: 0,
    desc: '近战武器。左键轻击快，右键重击伤害高但恢复慢；命中判定有明确时刻与角度限制。',
    stats: { 伤害: 0.42, 射速: 0.7, 精度: 0.7, 控制: 1, 机动: 1 },
  }),
  he: W({
    id: 'he', name: '高爆手雷', nameEn: 'HE', cls: 'grenade',
    mag: 1, reserve: 0, dmgTorso: 0, rpm: 100, auto: false,
    spreadHip: 0, spreadAds: 0, spreadGrow: 0, spreadRecover: 10, spreadMoveMul: 0,
    recoilV: 0, recoilH: 0, recoilRecover: 10,
    penThickness: 0, penDamageFactor: 0,
    falloffStart: 999, falloffEnd: 1000, falloffMul: 1,
    reloadTime: 0, boltTime: 0, drawTime: 0.45, adsFov: 0, tracerSpeed: 0,
    desc: '高爆手雷。真实飞行与反弹，爆炸伤害随距离衰减并受实体遮挡。',
    stats: { 伤害: 0.9, 射速: 0.2, 精度: 0.3, 控制: 0.5, 机动: 0.8 },
  }),
  smoke: W({
    id: 'smoke', name: '烟雾弹', nameEn: 'SMOKE', cls: 'grenade',
    mag: 1, reserve: 0, dmgTorso: 0, rpm: 100, auto: false,
    spreadHip: 0, spreadAds: 0, spreadGrow: 0, spreadRecover: 10, spreadMoveMul: 0,
    recoilV: 0, recoilH: 0, recoilRecover: 10,
    penThickness: 0, penDamageFactor: 0,
    falloffStart: 999, falloffEnd: 1000, falloffMul: 1,
    reloadTime: 0, boltTime: 0, drawTime: 0.45, adsFov: 0, tracerSpeed: 0,
    desc: '烟雾弹。落地起烟，形成持续遮蔽视线的烟幕；烟雾不阻挡子弹，但会切断电脑的实时感知。',
    stats: { 伤害: 0, 射速: 0.2, 精度: 0.3, 控制: 0.5, 机动: 0.8 },
  }),
};

export const PRIMARY_IDS = ['ak', 'm4', 'mp5', 'awp'] as const;
export const GRENADE_IDS = ['he', 'smoke'] as const;

/** 部位倍率：头显著高于躯干，四肢较低 */
export const PART_MUL: Record<BodyPart, number> = { head: 4, torso: 1, legs: 0.75 };
/** 近战部位倍率（重击另有倍数） */
export const MELEE_PART_MUL: Record<BodyPart, number> = { head: 1.35, torso: 1, legs: 0.85 };

export const PLAYER = {
  walkSpeed: 4.55,
  silentSpeed: 2.1,
  crouchSpeed: 1.95,
  adsMoveMul: 0.62,
  accel: 42,
  airAccel: 7,
  friction: 11,
  gravity: 22,
  jumpVel: 6.55,
  eyeStand: 1.62,
  eyeCrouch: 1.08,
  capsuleRadius: 0.36,
  heightStand: 1.82,
  heightCrouch: 1.3,
  crouchLerp: 11,
  stepHeight: 0.52,
  fallDamageMin: 9,
  fallDamageVel: 13,
};

export const COMBAT = {
  hp: 100,
  armor: 100,
  /** 护甲吸收比例；护甲值按吸收量扣减 */
  armorAbsorb: 0.5,
  respawnDelay: 3,
  spawnProtect: 2.5,
  spawnProtectRadius: 4.5,
  /** 头部命中不使用整个人宽的命中盒（见 hitboxes） */
  meleeLightRange: 1.9,
  meleeLightArc: 62,
  meleeHeavyRange: 2.25,
  meleeHeavyArc: 44,
  meleeHeavyMul: 2.6,
  nadeFuse: 2.9,
  nadeBounce: 0.42,
  nadeThrowVel: 16.5,
  nadeUpBias: 0.24,
  heRadius: 7,
  heMaxDmg: 96,
  heMinDmg: 8,
  heBlockFactor: 0.18,
  smokeRadius: 3.6,
  smokeDelay: 1.1,
  smokeDuration: 13,
  smokeFade: 1.6,
  smokeVisionBlock: 0.72,
  lkpHoldTime: 3.2,
};

export const MATCH = {
  official: { killLimit: 100, duration: 600, label: '正式局（100 杀 / 10 分钟）' },
  practice: { killLimit: 25, duration: 180, label: '练习局（25 杀 / 3 分钟）' },
  teamSize: 5,
};

export interface DiffParams {
  reaction: number;
  aimErrDeg: number;
  viewDist: number;
  hearDist: number;
  fovDeg: number;
  turnRate: number;
  burstLen: number;
  pauseLen: number;
  strafe: number;
  nadeChance: number;
  repathMin: number;
  aimNoise: number;
}

export const DIFFICULTY: Record<Difficulty, DiffParams> = {
  easy: {
    reaction: 0.68, aimErrDeg: 5.4, viewDist: 44, hearDist: 13, fovDeg: 100,
    turnRate: 3.2, burstLen: 0.28, pauseLen: 0.75, strafe: 0.5, nadeChance: 0.12,
    repathMin: 3.5, aimNoise: 1.4,
  },
  normal: {
    reaction: 0.42, aimErrDeg: 2.9, viewDist: 58, hearDist: 17, fovDeg: 110,
    turnRate: 5.2, burstLen: 0.36, pauseLen: 0.5, strafe: 0.8, nadeChance: 0.22,
    repathMin: 2.4, aimNoise: 0.9,
  },
  hard: {
    reaction: 0.24, aimErrDeg: 1.5, viewDist: 72, hearDist: 22, fovDeg: 120,
    turnRate: 7.5, burstLen: 0.5, pauseLen: 0.32, strafe: 1.1, nadeChance: 0.32,
    repathMin: 1.6, aimNoise: 0.55,
  },
};

export const SIM = {
  /** 固定仿真步长：30/60/144Hz 下移动与射速一致 */
  dt: 1 / 120,
  maxStepsPerFrame: 10,
};

export const FX = {
  bulletHoleMax: 120,
  shellMax: 26,
  tracerMax: 48,
  bloodMax: 60,
  smokeParticles: 190,
  muzzleLight: true,
};

export const AUDIO = {
  master: 0.8,
  maxVoices: 24,
  seaGain: 0.16,
};
