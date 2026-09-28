/**
 * 第一人称视模：独立场景 + 独立相机（保证近景质量）。
 * 待机呼吸、走路摆动、开火后坐、切枪、换弹（左手 + 弹匣）、拉栓、
 * 近战挥砍、投掷出手中，全部程序动画。
 * 视模不参与弹道：子弹从真实相机/枪口判定，贴墙由射线遮挡处理。
 */
import * as THREE from 'three';

const skinMat = () => new THREE.MeshStandardMaterial({ color: 0x77584a, roughness: 0.9 });
const gloveMat = () => new THREE.MeshStandardMaterial({ color: 0x2e3134, roughness: 0.85 });
const sleeveMat = (team: 'blue' | 'red') => new THREE.MeshStandardMaterial({
  color: team === 'blue' ? 0x2c4a6e : 0x3a3430, roughness: 0.9,
});
const gunDark = () => new THREE.MeshStandardMaterial({ color: 0x24262a, roughness: 0.5, metalness: 0.4 });
const gunWood = () => new THREE.MeshStandardMaterial({ color: 0x5e4326, roughness: 0.7, metalness: 0.05 });

function mkBox(parent: THREE.Object3D, w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

interface VMParts {
  root: THREE.Group;
  gun: THREE.Group;
  mag?: THREE.Mesh;
  boltHandle?: THREE.Mesh;
  leftHand: THREE.Group;
  rightHand: THREE.Group;
}

export type VMAnim = 'idle' | 'draw' | 'reload' | 'bolt' | 'melee' | 'meleeHeavy' | 'throw' | 'holster';

export class ViewModel {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  private holder = new THREE.Group();
  private parts: VMParts | null = null;
  private weaponCls = '';
  private team: 'blue' | 'red';
  private t = 0;
  anim: VMAnim = 'idle';
  animStart = 0;
  private animLen = 0;
  private kick = 0;           // 开火后坐强度 0..1
  private bobPhase = 0;
  private swayX = 0;
  private swayY = 0;
  private ads01 = 0;
  private walkAmt = 0;
  private light: THREE.PointLight;

  constructor(team: 'blue' | 'red') {
    this.team = team;
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 8);
    this.scene.add(this.holder);
    this.light = new THREE.PointLight(0xfff2dd, 1.6, 3.5);
    this.light.position.set(0.3, 0.4, 0.2);
    this.scene.add(this.light);
    this.scene.add(new THREE.AmbientLight(0xdfe8f0, 1.1));
    this.buildWeapon('rifle');
  }

  setTeam(team: 'blue' | 'red'): void {
    this.team = team;
  }

  buildWeapon(cls: string): void {
    if (cls === this.weaponCls) return;
    this.weaponCls = cls;
    this.holder.clear();
    const gun = new THREE.Group();
    const leftHand = new THREE.Group();
    const rightHand = new THREE.Group();
    const parts: VMParts = { root: this.holder, gun, leftHand, rightHand };

    const dark = gunDark(), wood = gunWood(), glove = gloveMat(), skin = skinMat(), sleeve = sleeveMat(this.team);

    const hand = (g: THREE.Group) => {
      mkBox(g, 0.085, 0.05, 0.13, glove, 0, 0, 0);
      mkBox(g, 0.075, 0.075, 0.14, glove, 0, 0.005, 0.1);
      const forearm = mkBox(g, 0.085, 0.085, 0.34, sleeve, 0, -0.02, 0.28);
      forearm.rotation.x = 0.18;
      mkBox(g, 0.07, 0.06, 0.1, skin, 0, 0.01, 0.2);
    };
    hand(leftHand);
    hand(rightHand);

    switch (cls) {
      case 'rifle': case 'carbine': {
        const len = cls === 'rifle' ? 0.68 : 0.6;
        mkBox(gun, 0.062, 0.085, len * 0.62, dark, 0, 0, -0.14);
        const barrel = mkBox(gun, 0.04, 0.04, len * 0.5, dark, 0, 0.008, -0.52);
        barrel.rotation.x = 0;
        mkBox(gun, 0.055, 0.2, 0.075, wood, 0, -0.13, 0.06);
        parts.mag = mkBox(gun, 0.05, 0.19, 0.062, cls === 'rifle' ? gunWood() : dark, 0, -0.12, -0.2);
        parts.mag.rotation.x = cls === 'rifle' ? 0.28 : 0.1;
        mkBox(gun, 0.058, 0.055, 0.3, wood, 0, -0.025, -0.46);
        mkBox(gun, 0.024, 0.035, 0.024, dark, 0, 0.062, -0.68);
        mkBox(gun, 0.05, 0.02, 0.05, dark, 0, 0.062, 0.1);
        if (cls === 'carbine') {
          mkBox(gun, 0.05, 0.05, 0.2, dark, 0, 0.065, -0.2); // 提把/镜座
        }
        parts.boltHandle = mkBox(gun, 0.02, 0.02, 0.07, dark, 0.045, 0.02, -0.05);
        rightHand.position.set(0.045, -0.14, 0.08);
        leftHand.position.set(-0.01, -0.1, -0.42);
        break;
      }
      case 'smg': {
        mkBox(gun, 0.06, 0.09, 0.42, dark, 0, 0, -0.1);
        mkBox(gun, 0.036, 0.036, 0.2, dark, 0, 0.005, -0.38);
        mkBox(gun, 0.05, 0.18, 0.06, gunWood(), 0, -0.11, 0.05);
        parts.mag = mkBox(gun, 0.042, 0.2, 0.05, dark, 0, -0.13, -0.16);
        mkBox(gun, 0.058, 0.05, 0.16, dark, 0, 0.005, -0.32);
        rightHand.position.set(0.04, -0.13, 0.06);
        leftHand.position.set(-0.005, -0.09, -0.3);
        break;
      }
      case 'sniper': {
        mkBox(gun, 0.06, 0.085, 0.86, gunWood(), 0, 0, -0.2);
        mkBox(gun, 0.034, 0.034, 0.56, dark, 0, 0.012, -0.86);
        mkBox(gun, 0.055, 0.2, 0.075, gunWood(), 0, -0.13, 0.1);
        parts.mag = mkBox(gun, 0.048, 0.13, 0.07, dark, 0, -0.1, -0.12);
        mkBox(gun, 0.052, 0.052, 0.26, gunWood(), 0, -0.02, -0.6);
        mkBox(gun, 0.05, 0.06, 0.2, dark, 0, 0.085, -0.4);   // 瞄准镜
        mkBox(gun, 0.042, 0.05, 0.12, dark, 0, 0.085, -0.62);
        parts.boltHandle = mkBox(gun, 0.022, 0.022, 0.09, dark, 0.05, 0.03, -0.02);
        mkBox(gun, 0.07, 0.02, 0.12, dark, 0, 0.06, 0.2);    // 脚架座
        rightHand.position.set(0.05, -0.15, 0.12);
        leftHand.position.set(-0.01, -0.11, -0.56);
        break;
      }
      case 'pistol': {
        mkBox(gun, 0.045, 0.07, 0.26, dark, 0, 0.01, -0.09);
        mkBox(gun, 0.042, 0.16, 0.06, gunWood(), 0, -0.1, 0.02);
        mkBox(gun, 0.02, 0.025, 0.02, dark, 0, 0.055, -0.2);
        parts.mag = mkBox(gun, 0.036, 0.1, 0.05, dark, 0, -0.09, 0.02);
        rightHand.position.set(0.01, -0.16, 0.02);
        leftHand.position.set(-0.05, -0.16, 0.03);
        break;
      }
      case 'melee': {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.045, 0.36), new THREE.MeshStandardMaterial({ color: 0xc4ccd2, roughness: 0.25, metalness: 0.85 }));
        blade.position.set(0, 0.02, -0.24);
        gun.add(blade);
        mkBox(gun, 0.035, 0.05, 0.12, gunWood(), 0, 0, 0.0);
        mkBox(gun, 0.05, 0.02, 0.02, dark, 0, 0.005, -0.06);
        rightHand.position.set(0.0, -0.03, 0.06);
        leftHand.visible = false;
        break;
      }
      case 'he': case 'smoke': {
        const bodyMat = cls === 'he'
          ? new THREE.MeshStandardMaterial({ color: 0x3d4a35, roughness: 0.6, metalness: 0.3 })
          : new THREE.MeshStandardMaterial({ color: 0x596270, roughness: 0.6, metalness: 0.3 });
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.11, 10), bodyMat);
        body.rotation.x = Math.PI / 2;
        gun.add(body);
        const cap = mkBox(gun, 0.03, 0.03, 0.03, dark, 0, 0.045, -0.05);
        cap.rotation.x = 0.3;
        rightHand.position.set(0.02, -0.09, 0.04);
        leftHand.visible = false;
        break;
      }
      default: break;
    }
    this.holder.add(gun);
    gun.add(leftHand);
    gun.add(rightHand);
    this.parts = parts;
  }

  playAnim(anim: VMAnim, now: number, len: number): void {
    this.anim = anim;
    this.animStart = now;
    this.animLen = len;
  }

  fireKick(strength: number): void {
    this.kick = Math.min(1.4, this.kick + strength);
  }

  setAds(k: number): void {
    this.ads01 = k;
  }

  update(dt: number, now: number, st: {
    walkSpeed: number; grounded: boolean; lookDX: number; lookDY: number; ads: number;
  }): void {
    this.t += dt;
    this.ads01 = st.ads;
    // 呼吸 + 走路摆动
    this.walkAmt += ((st.grounded && st.walkSpeed > 0.4 ? Math.min(1, st.walkSpeed / 4.5) : 0) - this.walkAmt) * Math.min(1, dt * 8);
    this.bobPhase += dt * (4 + st.walkSpeed * 2.2);
    this.swayX += (THREE.MathUtils.clamp(-st.lookDX * 0.02, -0.03, 0.03) - this.swayX) * Math.min(1, dt * 10);
    this.swayY += (THREE.MathUtils.clamp(st.lookDY * 0.016, -0.03, 0.03) - this.swayY) * Math.min(1, dt * 10);
    this.kick = Math.max(0, this.kick - dt * 6.5);

    if (!this.parts) return;
    const hip = new THREE.Vector3(0.235, -0.235, -0.5);
    const adsPos = new THREE.Vector3(0, -0.145, -0.34);
    const base = hip.clone().lerp(adsPos, this.ads01);
    const bob = this.ads01 > 0.7 ? 0.25 : 1;
    base.x += (Math.sin(this.bobPhase) * 0.014 * this.walkAmt + Math.sin(this.t * 1.1) * 0.0016) * bob - this.swayX * (1 - this.ads01 * 0.8);
    base.y += (Math.abs(Math.cos(this.bobPhase)) * 0.011 * this.walkAmt + Math.sin(this.t * 1.7) * 0.0012) * bob - this.swayY * (1 - this.ads01 * 0.8);
    base.z += this.kick * 0.055;
    let rotX = this.kick * 0.16 + this.swayY * 1.2;
    let rotZ = Math.sin(this.bobPhase) * 0.012 * this.walkAmt * (1 - this.ads01);
    let rotY = -this.swayX * 1.6 * (1 - this.ads01);

    const animK = this.anim === 'idle' ? 1 : Math.min(1, (now - this.animStart) / Math.max(0.001, this.animLen));
    const animT = (now - this.animStart);

    if (this.anim !== 'idle' && animK < 1) {
      const k = animK;
      switch (this.anim) {
        case 'draw': {
          const ease = 1 - Math.pow(1 - k, 3);
          base.y -= (1 - ease) * 0.4;
          rotX += (1 - ease) * 0.9;
          break;
        }
        case 'holster': {
          const ease = k * k;
          base.y -= ease * 0.5;
          rotX += ease * 1.1;
          break;
        }
        case 'reload': {
          // 三段：左手上（取匣）→ 下（换匣）→ 上（上膛）
          const p = k;
          const dip = p < 0.35 ? p / 0.35 : p < 0.7 ? 1 : (1 - (p - 0.7) / 0.3);
          base.y -= dip * 0.09;
          base.z += dip * 0.04;
          rotZ += dip * 0.5;
          rotX += dip * 0.22;
          if (this.parts.leftHand) this.parts.leftHand.position.y = -0.1 - dip * 0.12;
          if (this.parts.mag) {
            const magOut = p > 0.25 && p < 0.55 ? (p - 0.25) / 0.3 : p >= 0.55 && p < 0.75 ? 1 - (p - 0.55) / 0.2 : 0;
            this.parts.mag.position.y = (this.parts.mag.userData.baseY ??= this.parts.mag.position.y) - magOut * 0.24;
          }
          break;
        }
        case 'bolt': {
          const p = Math.sin(k * Math.PI);
          base.z += p * 0.06;
          rotZ += p * 0.25;
          if (this.parts.boltHandle) this.parts.boltHandle.position.z = (this.parts.boltHandle.userData.baseZ ??= this.parts.boltHandle.position.z) + p * 0.09;
          if (this.parts.rightHand) this.parts.rightHand.position.z = (this.parts.rightHand.userData.baseZ ??= this.parts.rightHand.position.z) + p * 0.1;
          break;
        }
        case 'melee': case 'meleeHeavy': {
          const heavy = this.anim === 'meleeHeavy';
          const wind = heavy ? 0.4 : 0.3;
          const p = k < wind ? -(k / wind) * 0.5 : ((k - wind) / (1 - wind));
          rotZ += p * (heavy ? 1.6 : 1.0);
          base.x -= p * (heavy ? 0.22 : 0.14);
          base.z += Math.abs(p) * 0.08;
          rotY += p * 0.5;
          break;
        }
        case 'throw': {
          const p = k < 0.4 ? -(k / 0.4) * 0.8 : Math.pow((k - 0.4) / 0.6, 0.5) * 1.6;
          base.z += p * 0.3;
          base.y += p * 0.18;
          rotX -= p * 1.8;
          break;
        }
        default: break;
      }
    } else if (this.anim !== 'idle' && animK >= 1) {
      this.anim = 'idle';
      if (this.parts.mag && this.parts.mag.userData.baseY !== undefined) this.parts.mag.position.y = this.parts.mag.userData.baseY as number;
      if (this.parts.boltHandle && this.parts.boltHandle.userData.baseZ !== undefined) this.parts.boltHandle.position.z = this.parts.boltHandle.userData.baseZ as number;
      if (this.parts.rightHand && this.parts.rightHand.userData.baseZ !== undefined) this.parts.rightHand.position.z = this.parts.rightHand.userData.baseZ as number;
    }

    this.holder.position.copy(base);
    this.holder.rotation.set(rotX, rotY, rotZ);
    // 近战/手雷时右手在枪身上随持握
    void animT;
  }

  render(renderer: THREE.WebGLRenderer, mainCam: THREE.PerspectiveCamera, scoped: boolean): void {
    if (scoped) return; // 开镜时隐藏视模
    this.camera.aspect = mainCam.aspect;
    this.camera.updateProjectionMatrix();
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(this.scene, this.camera);
    renderer.autoClear = true;
  }
}
