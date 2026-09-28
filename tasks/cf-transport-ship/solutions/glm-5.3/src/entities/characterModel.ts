/**
 * 人形角色模型：程序化低多边形（头/躯干/四肢/持枪姿态 + 队伍配色）。
 * 走路摆腿、蹲姿、瞄准俯仰、换弹左手、死亡倒地均程序驱动。
 */
import * as THREE from 'three';
import { Team } from '../core/config';

export interface CharModelOpts {
  team: Team;
  weaponCls: string;
}

const TEAM_COLORS = {
  blue: { cloth: 0x2c4a6e, vest: 0x24384f, pants: 0x3a4a58, skin: 0xc9a284, helm: 0xdde4ea, accent: 0x69a4d8 },
  red: { cloth: 0x3a3430, vest: 0x26221e, pants: 0x2e2a26, skin: 0xb08a68, helm: 0x1d1a17, accent: 0xd87a2c },
};

function box(w: number, h: number, d: number, color: number, rough = 0.85): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.05 }));
  m.castShadow = true;
  return m;
}

/** 手持枪模型（按武器类别） */
export function buildGunMesh(cls: string): THREE.Group {
  const g = new THREE.Group();
  const dark = 0x232527, grip = 0x4a4030;
  const mk = (w: number, h: number, d: number, color: number, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.35 }));
    m.position.set(x, y, z);
    m.castShadow = true;
    g.add(m);
    return m;
  };
  switch (cls) {
    case 'rifle': case 'carbine': {
      const len = cls === 'rifle' ? 0.62 : 0.56;
      mk(0.05, 0.07, len, dark, 0, 0, -len / 2 + 0.1);          // 机匣
      mk(0.035, 0.035, 0.34, 0x35383b, 0, 0.005, -len + 0.28);  // 枪管
      mk(0.05, 0.16, 0.06, grip, 0, -0.1, 0.05);   // 握把
      mk(0.045, 0.13, 0.05, dark, 0, -0.09, -0.22);             // 弹匣
      mk(0.05, 0.05, 0.2, 0x3b3227, 0, -0.02, -0.42);           // 护木
      mk(0.02, 0.03, 0.03, 0x181a1c, 0, 0.05, -0.5);            // 准星
      break;
    }
    case 'smg': {
      mk(0.05, 0.08, 0.4, dark, 0, 0, -0.14);
      mk(0.03, 0.03, 0.18, 0x35383b, 0, 0, -0.42);
      mk(0.045, 0.14, 0.05, 0x4a4030, 0, -0.09, 0.02);
      mk(0.04, 0.16, 0.045, dark, 0, -0.06, -0.18);
      break;
    }
    case 'sniper': {
      mk(0.05, 0.07, 0.78, 0x2e4a36, 0, 0, -0.3);
      mk(0.032, 0.032, 0.5, 0x35383b, 0, 0.01, -0.85);
      mk(0.05, 0.15, 0.06, 0x4a4030, 0, -0.1, 0.08);
      mk(0.05, 0.05, 0.22, 0x2e4a36, 0, -0.02, -0.55);
      mk(0.04, 0.05, 0.14, 0x181a1c, 0, 0.07, -0.36);           // 瞄准镜
      mk(0.03, 0.03, 0.1, 0x181a1c, 0, 0.07, -0.62);
      break;
    }
    case 'pistol': {
      mk(0.04, 0.06, 0.22, dark, 0, 0, -0.06);
      mk(0.04, 0.12, 0.05, 0x4a4030, 0, -0.08, 0.03);
      break;
    }
    case 'melee': {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.03, 0.3), new THREE.MeshStandardMaterial({ color: 0xb8c0c6, roughness: 0.3, metalness: 0.8 }));
      blade.position.set(0, 0, -0.17);
      g.add(blade);
      mk(0.03, 0.045, 0.1, 0x232527, 0, 0, 0.02);
      break;
    }
    default: break;
  }
  return g;
}

export class CharacterModel {
  group = new THREE.Group();
  private pelvis: THREE.Group;
  private torso: THREE.Group;
  private head: THREE.Group;
  private legL: THREE.Group;
  private legR: THREE.Group;
  private armL: THREE.Group;
  private armR: THREE.Group;
  private gunSlot: THREE.Group;
  private walkPhase = 0;
  private deathT = -1;
  private gunCls = '';
  readonly team: Team;
  marker: THREE.Sprite | null = null;

  constructor(opts: CharModelOpts) {
    this.team = opts.team;
    const c = TEAM_COLORS[opts.team];
    this.pelvis = new THREE.Group();
    this.pelvis.position.y = 0.86;
    this.group.add(this.pelvis);

    this.torso = new THREE.Group();
    this.pelvis.add(this.torso);
    const chest = box(0.42, 0.5, 0.26, c.cloth);
    chest.position.y = 0.28;
    this.torso.add(chest);
    const vest = box(0.46, 0.34, 0.3, c.vest);
    vest.position.y = 0.3;
    this.torso.add(vest);
    const badge = box(0.1, 0.06, 0.02, c.accent);
    badge.position.set(0.12, 0.38, 0.16);
    this.torso.add(badge);

    this.head = new THREE.Group();
    this.head.position.y = 0.58;
    this.torso.add(this.head);
    const skull = box(0.2, 0.22, 0.22, c.skin);
    this.head.add(skull);
    const helm = box(0.24, 0.1, 0.25, c.helm);
    helm.position.y = 0.1;
    this.head.add(helm);
    if (opts.team === 'red') {
      const mask = box(0.205, 0.1, 0.02, 0x15130f);
      mask.position.set(0, -0.01, 0.105);
      this.head.add(mask);
    }

    const mkLeg = (side: number) => {
      const leg = new THREE.Group();
      leg.position.set(0.11 * side, 0, 0);
      const thigh = box(0.15, 0.42, 0.17, c.pants);
      thigh.position.y = -0.21;
      leg.add(thigh);
      const shin = box(0.13, 0.42, 0.15, c.pants);
      shin.position.y = -0.63;
      leg.add(shin);
      const boot = box(0.14, 0.09, 0.24, 0x1c1c1e);
      boot.position.set(0, -0.88, -0.03);
      leg.add(boot);
      this.pelvis.add(leg);
      return leg;
    };
    this.legL = mkLeg(-1);
    this.legR = mkLeg(1);

    const mkArm = (side: number) => {
      const arm = new THREE.Group();
      arm.position.set(0.25 * side, 0.45, 0);
      const upper = box(0.1, 0.3, 0.12, c.cloth);
      upper.position.y = -0.14;
      arm.add(upper);
      const fore = box(0.09, 0.28, 0.1, c.cloth);
      fore.position.y = -0.4;
      arm.add(fore);
      const glove = box(0.09, 0.09, 0.11, 0x2a2a2c);
      glove.position.y = -0.56;
      arm.add(glove);
      this.torso.add(arm);
      return arm;
    };
    this.armL = mkArm(-1);
    this.armR = mkArm(1);

    this.gunSlot = new THREE.Group();
    this.gunSlot.position.set(0.16, 0.32, -0.18);
    this.torso.add(this.gunSlot);
    this.setWeapon(opts.weaponCls);

    // 阴影
    this.group.traverse((o) => { o.castShadow = true; });
  }

  setWeapon(cls: string): void {
    if (cls === this.gunCls) return;
    this.gunCls = cls;
    this.gunSlot.clear();
    const gun = buildGunMesh(cls);
    gun.rotation.y = Math.PI; // 枪口朝 -Z（角色前方）
    this.gunSlot.add(gun);
  }

  update(dt: number, st: {
    speed: number; crouch01: number; yaw: number; aimPitch: number; alive: boolean;
    firing: boolean; reloading: boolean; grounded: boolean;
  }): void {
    if (!st.alive) {
      if (this.deathT < 0) this.deathT = 0;
      this.deathT += dt;
      const k = Math.min(1, this.deathT / 0.55);
      this.group.rotation.x = -k * Math.PI / 2 * 0.96;
      this.group.position.y = -0.12 * k;
      return;
    }
    this.deathT = -1;
    this.group.rotation.x = 0;
    this.group.position.y = 0;
    this.group.rotation.y = st.yaw + Math.PI;

    // 蹲：骨盆下移
    this.pelvis.position.y = 0.86 - 0.34 * st.crouch01;
    this.torso.rotation.x = 0.28 * st.crouch01;
    this.head.rotation.x = -st.aimPitch * 0.7 - 0.28 * st.crouch01;

    // 走路摆腿
    if (st.grounded && st.speed > 0.3) {
      this.walkPhase += dt * (2.2 + st.speed * 1.7);
      const sw = Math.min(1, st.speed / 4.5);
      const a = Math.sin(this.walkPhase) * 0.62 * sw;
      this.legL.rotation.x = a;
      this.legR.rotation.x = -a;
      this.torso.rotation.z = Math.sin(this.walkPhase) * 0.03 * sw;
    } else {
      this.legL.rotation.x *= 0.85;
      this.legR.rotation.x *= 0.85;
      this.torso.rotation.z *= 0.85;
    }
    if (!st.grounded) {
      this.legL.rotation.x = 0.35;
      this.legR.rotation.x = -0.2;
    }

    // 持枪臂 + 瞄准俯仰
    const aim = -st.aimPitch;
    this.torso.rotation.x += aim * 0.25;
    this.armR.rotation.x = -1.25 + aim * 0.8;
    this.armR.rotation.z = 0.32;
    this.armL.rotation.x = -1.35 + aim * 0.8;
    this.armL.rotation.z = -0.55;
    this.gunSlot.rotation.x = aim * 0.9;

    // 换弹：左手下探
    if (st.reloading) {
      this.armL.rotation.x = -0.7;
      this.armL.position.y = 0.45 - 0.12;
    } else {
      this.armL.position.y = 0.45;
    }
    // 开火后坐
    this.gunSlot.position.z = -0.18 + (st.firing ? 0.05 : 0);
  }
}
