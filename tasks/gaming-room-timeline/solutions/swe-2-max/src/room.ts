// Room assembly: the fixed shell (walls/floor/window/door/rug) plus a slot
// system whose children are rebuilt when the variant for a year changes.
// Keepsakes interpolate between anchor positions instead of swapping.

import * as THREE from "three";
import {
  REG, KEEPSAKES, CLUTTER, pickVariant, clutterLevel,
} from "./era";
import * as P from "./parts";

const ROOM_W = 4.6, ROOM_D = 3.8, ROOM_H = 2.6;

export const SLOTS: Record<string, { pos: [number, number, number]; rotY: number }> = {
  desk: { pos: [-1.35, 0, 0.55], rotY: 0 },
  chair: { pos: [-1.10, 0, 0.85], rotY: 0.25 },
  bed: { pos: [1.15, 0, -0.55], rotY: 0 },
  shelf: { pos: [1.55, 0, -1.55], rotY: 0 },
  router: { pos: [1.55, 0.82, -1.55], rotY: 0 },
  ups: { pos: [-2.05, 0, 0.20], rotY: 0.4 },
  retroNook: { pos: [1.55, 0, 1.30], rotY: -0.9 },
  plant: { pos: [1.75, 0, 1.40], rotY: 0 },
};

const DESK_Y = 0.76; // desktop surface height (≈big desk top)

export interface SlotState {
  id: string;
  group: THREE.Group;
  variant: string;
  fade: number; // 0..1 for smooth transitions
  dir: number;  // +1 appearing, -1 leaving, 0 stable
}

export class Room {
  scene = new THREE.Scene();
  slots = new Map<string, SlotState>();
  keepsakes = new Map<string, { group: THREE.Group; variant: string; from: THREE.Vector3; to: THREE.Vector3; t: number }>();
  clutterGroups = new Map<string, { group: THREE.Group; baseY: number }>();
  screenMesh?: THREE.Mesh;
  screenAnchor = new THREE.Vector3();
  screenSize = { w: 0, h: 0 };
  ledStrip?: THREE.Mesh;
  lampLight?: THREE.PointLight;
  private clock = 0;

  constructor() {
    this.scene.background = new THREE.Color(0x16130f);
    this.scene.fog = new THREE.Fog(0x16130f, 9, 18);
    this.buildShell();
    this.buildLights();
  }

  private buildShell() {
    const floorMat = P.std(0x6a5a48, 0.9);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);
    // rug
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.3), P.std(0x7a4a4a, 0.95));
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(-0.6, 0.005, 0.6);
    rug.receiveShadow = true;
    this.scene.add(rug);

    const wallMat = P.std(0xb8a68a, 0.95);
    const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
    wallBack.position.set(0, ROOM_H / 2, -ROOM_D / 2);
    wallBack.receiveShadow = true;
    this.scene.add(wallBack);
    const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
    wallLeft.rotation.y = Math.PI / 2;
    wallLeft.position.set(-ROOM_W / 2, ROOM_H / 2, 0);
    wallLeft.receiveShadow = true;
    this.scene.add(wallLeft);
    const wallRight = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
    wallRight.rotation.y = -Math.PI / 2;
    wallRight.position.set(ROOM_W / 2, ROOM_H / 2, 0);
    wallRight.receiveShadow = true;
    this.scene.add(wallRight);

    // ceiling omitted (open dollhouse view); add trim
    const trim = new THREE.Mesh(new THREE.BoxGeometry(ROOM_W + 0.02, 0.06, 0.02), P.std(0x8a7a62, 0.9));
    trim.position.set(0, ROOM_H - 0.03, -ROOM_D / 2 + 0.001);
    this.scene.add(trim);

    // window on left wall
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.30, 1.10), P.std(0xe8e8e8, 0.8));
    frame.position.set(-ROOM_W / 2 - 0.01, 1.35, -0.6);
    this.scene.add(frame);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 1.16),
      new THREE.MeshStandardMaterial({ color: 0x9fc8e8, emissive: 0x6a9ac8, emissiveIntensity: 0.25, roughness: 0.1 }));
    glass.rotation.y = Math.PI / 2;
    glass.position.set(-ROOM_W / 2 + 0.005, 1.35, -0.6);
    this.scene.add(glass);
    for (const dz of [-0.30, 0, 0.30])
      this.scene.add(P.box(0.02, 1.16, 0.02, P.std(0xe8e8e8, 0.8), -ROOM_W / 2 + 0.01, 1.35, -0.6 + dz));
    this.scene.add(P.box(0.02, 0.02, 0.96, P.std(0xe8e8e8, 0.8), -ROOM_W / 2 + 0.01, 1.35, -0.6));

    // door on right wall: near-wall-tone recessed slab
    const doorFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 1.98, 0.88), P.std(0xb09a7c, 0.92));
    doorFrame.position.set(ROOM_W / 2 - 0.02, 0.99, 1.55);
    this.scene.add(doorFrame);
    const doorSlab = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 1.90, 0.78),
      P.std(0xc0a888, 0.92, 0.02, 0x8a7050, 0.35));
    doorSlab.position.set(ROOM_W / 2 - 0.035, 0.96, 1.55);
    this.scene.add(doorSlab);
    this.scene.add(P.box(0.02, 0.02, 0.10, P.std(0xd8b03a, 0.4, 0.7),
      ROOM_W / 2 - 0.055, 1.0, 1.86));

    // poster slot marker on back wall (created dynamically)
    // AC on right wall
    // (both handled in update)
  }

  private buildLights() {
    this.scene.add(new THREE.HemisphereLight(0xd8e0f0, 0x3a2f26, 0.55));
    const sun = new THREE.DirectionalLight(0xfff0d8, 1.1);
    sun.position.set(-3.5, 4.5, 2.5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -4; sun.shadow.camera.right = 4;
    sun.shadow.camera.top = 4; sun.shadow.camera.bottom = -4;
    this.scene.add(sun);
    const lamp = new THREE.PointLight(0xffd8a0, 0.9, 5);
    lamp.position.set(-1.6, 1.2, 0.7);
    this.scene.add(lamp);
    this.lampLight = lamp;
    // soft fill from the right so the door/shelf side isn't a silhouette
    const fill = new THREE.PointLight(0xd8e0f0, 0.8, 7);
    fill.position.set(3.2, 2.0, 1.8);
    this.scene.add(fill);
  }

  private setFade(g: THREE.Object3D, fade: number) {
    g.traverse(o => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (!m || !("opacity" in m)) return;
      if (fade >= 0.999) { m.transparent = false; m.opacity = 1; }
      else { m.transparent = true; m.opacity = Math.max(0.02, fade); }
    });
    g.visible = fade > 0.02;
  }

  private builderFor(id: string, variant: string): THREE.Group {
    const key = `${id}:${variant}`;
    const table: Record<string, () => THREE.Group> = {
      "monitor:crt": P.crtMonitor, "monitor:lcd19": P.lcd19,
      "monitor:ips27": P.ips27, "monitor:uw34": P.uw34,
      "tower:beige": P.towerBeige, "tower:black": P.towerBlack,
      "tower:rgb": P.towerRgb, "tower:silent": P.towerSilent,
      "keyboard:ps2": P.kbPs2, "keyboard:mech": P.kbMech, "keyboard:custom": P.kbCustom,
      "mouse:opt": P.mouseOpt, "mouse:gaming": P.mouseGaming, "mouse:wireless": P.mouseWireless,
      "desk:small": P.deskSmall, "desk:std": P.deskStd, "desk:big": P.deskBig,
      "chair:wood": P.chairWood, "chair:office": P.chairOffice,
      "chair:gaming": P.chairGaming, "chair:ergo": P.chairErgo,
      "bed:yes": P.bed, "bed:gone": () => new THREE.Group(),
      "shelf:none": () => new THREE.Group(), "shelf:small": P.shelfSmall,
      "shelf:double": P.shelfDouble, "shelf:display": P.shelfDisplay,
      "discs:spindle": P.discSpindle, "discs:cases": P.discCases,
      "discs:steel": P.steelbooks, "discs:few": P.discsFew,
      "poster:cs": P.posterCs, "poster:wow": P.posterWow,
      "poster:dota": P.posterDota, "poster:collage": P.posterCollage,
      "poster:framed": P.posterFramed,
      "lamp:desk": P.deskLamp, "lamp:bar": P.screenBar,
      "ac:no": () => new THREE.Group(), "ac:yes": P.airCon,
      "curtains:floral": () => P.curtain(0xc8a8b8), "curtains:dark": () => P.curtain(0x3a4050),
      "router:adsl": P.routerAdsl, "router:wifi": P.routerWifi, "router:mesh": P.routerMesh,
      "headset:none": () => new THREE.Group(), "headset:yes": P.headset,
      "mic:none": () => new THREE.Group(), "mic:arm": P.micArm,
      "cam:none": () => new THREE.Group(), "cam:yes": P.webcam,
      "plant:none": () => new THREE.Group(), "plant:yes": P.plant,
      "leds:none": () => new THREE.Group(), "leds:soft": () => new THREE.Group(),
      "retroNook:none": () => new THREE.Group(), "retroNook:yes": () => this.buildRetroNook(),
      "ups:none": () => new THREE.Group(), "ups:yes": P.ups,
    };
    const b = table[key];
    const g = b ? b() : new THREE.Group();
    g.name = key;
    return g;
  }

  private buildRetroNook(): THREE.Group {
    const g = new THREE.Group();
    g.add(P.box(0.60, 0.42, 0.45, P.std(0x8a6a4a, 0.85), 0, 0.21, 0));
    const crt = P.crtMonitor();
    crt.scale.setScalar(0.7);
    crt.position.set(-0.10, 0.42, 0);
    g.add(crt);
    const gb = P.gameboySP();
    gb.position.set(0.18, 0.44, 0.12);
    g.add(gb);
    g.add(P.box(0.10, 0.06, 0.12, P.std(0x4a4f56, 0.7), 0.20, 0.45, -0.10));
    return g;
  }

  private slotPos(id: string): [number, number, number, number] {
    // desk-attached items sit on the desk surface; monitor slightly behind
    const d = SLOTS.desk;
    switch (id) {
      case "monitor": return [d.pos[0] - 0.05, DESK_Y, d.pos[2] - 0.18, 0];
      case "tower": return [d.pos[0] - 0.60, 0, d.pos[2] + 0.05, 0];
      case "keyboard": return [d.pos[0] + 0.05, DESK_Y, d.pos[2] + 0.12, 0];
      case "mouse": return [d.pos[0] + 0.35, DESK_Y, d.pos[2] + 0.12, 0];
      case "lamp": return [d.pos[0] - 0.35, DESK_Y, d.pos[2] - 0.15, 0];
      case "headset": return [d.pos[0] + 0.42, DESK_Y, d.pos[2] - 0.10, 0];
      case "mic": return [d.pos[0] + 0.55, DESK_Y, d.pos[2] - 0.05, 0];
      case "cam": return [d.pos[0] - 0.05, DESK_Y + 0.69, d.pos[2] - 0.18, 0];
      case "poster": return [-0.5, 1.45, -1.885, 0];
      case "curtains": return [-2.28, 1.72, -0.6, 0];
      case "ac": return [2.29, 2.20, -0.9, -Math.PI / 2];
      case "leds": return [-0.5, 1.30, -1.86, 0];
      case "discs": return [1.55, 1.15, -1.55, 0];
      default: {
        const s = SLOTS[id];
        return s ? [s.pos[0], s.pos[1], s.pos[2], s.rotY] : [0, 0, 0, 0];
      }
    }
  }

  private ensureSlot(id: string, year: number) {
    const variant = pickVariant(REG[id], year);
    let st = this.slots.get(id);
    if (!st) {
      const g = this.builderFor(id, variant);
      const [x, y, z, ry] = this.slotPos(id);
      g.position.set(x, y, z);
      g.rotation.y = ry;
      this.scene.add(g);
      st = { id, group: g, variant, fade: 1, dir: 0 };
      this.slots.set(id, st);
      this.onSlotRebuilt(id, g);
      return;
    }
    if (st.variant !== variant) {
      st.dir = -1; // start fade-out; rebuilt in tick
    }
  }

  private onSlotRebuilt(id: string, g: THREE.Group) {
    if (id === "monitor") {
      const scr = g.userData.screen as { w: number; h: number; y: number; z: number } | undefined;
      if (scr) {
        this.screenAnchor.set(g.position.x, g.position.y + scr.y, g.position.z + scr.z);
        this.screenSize = { w: scr.w, h: scr.h };
      }
    }
    if (id === "cam") {
      const st = this.slots.get("monitor");
      if (st) {
        g.position.set(st.group.position.x, DESK_Y + 0.69, st.group.position.z + 0.02);
      }
    }
  }

  private updateSlotFades(dt: number) {
    for (const st of this.slots.values()) {
      if (st.dir === 0) continue;
      st.fade += st.dir * dt / 0.45;
      if (st.dir < 0 && st.fade <= 0) {
        // rebuild with current variant at slot position
        this.scene.remove(st.group);
        const year = this.currentYear;
        const variant = pickVariant(REG[st.id], year);
        const g = this.builderFor(st.id, variant);
        const [x, y, z, ry] = this.slotPos(st.id);
        g.position.set(x, y, z);
        g.rotation.y = ry;
        this.scene.add(g);
        st.group = g; st.variant = variant; st.dir = 1; st.fade = 0;
        this.onSlotRebuilt(st.id, g);
      } else if (st.dir > 0 && st.fade >= 1) {
        st.fade = 1; st.dir = 0;
      }
      this.setFade(st.group, Math.max(0, Math.min(1, st.fade)));
    }
  }

  // ---------- keepsakes ----------
  private keepsakeAnchor(id: string, variant: string): THREE.Vector3 {
    const d = SLOTS.desk;
    switch (`${id}:${variant}`) {
      case "plush:bed": return new THREE.Vector3(1.05, 0.62, -0.50);
      case "plush:shelf": return new THREE.Vector3(1.55, 1.70, -1.52);
      case "trophy:desk": return new THREE.Vector3(d.pos[0] + 0.55, DESK_Y + 0.02, d.pos[2] - 0.12);
      case "trophy:shelf": return new THREE.Vector3(1.20, 1.15, -1.52);
      case "trophy:center": return new THREE.Vector3(1.55, 1.55, -1.52);
      case "gameboy:desk": return new THREE.Vector3(d.pos[0] - 0.55, DESK_Y + 0.02, d.pos[2] - 0.10);
      case "gameboy:shelf": return new THREE.Vector3(1.90, 1.15, -1.52);
      case "gameboy:dock": return new THREE.Vector3(1.72, 0.50, 1.42);
      case "mug:desk": return new THREE.Vector3(d.pos[0] + 0.60, DESK_Y + 0.02, d.pos[2] + 0.05);
      case "mug:pens": return new THREE.Vector3(d.pos[0] + 0.60, DESK_Y + 0.02, d.pos[2] - 0.18);
      default: return new THREE.Vector3();
    }
  }

  private keepsakeBuilder(id: string): THREE.Group {
    switch (id) {
      case "plush": return P.plushShark();
      case "trophy": return P.trophy();
      case "gameboy": return P.gameboySP();
      case "mug": return P.mug();
      default: return new THREE.Group();
    }
  }

  private ensureKeepsakes(year: number) {
    for (const id of Object.keys(KEEPSAKES)) {
      const variant = pickVariant(KEEPSAKES[id], year);
      let k = this.keepsakes.get(id);
      if (!k) {
        const g = this.keepsakeBuilder(id);
        const a = this.keepsakeAnchor(id, variant);
        g.position.copy(a);
        g.name = `keep:${id}`;
        this.scene.add(g);
        k = { group: g, variant, from: a.clone(), to: a.clone(), t: 1 };
        this.keepsakes.set(id, k);
        continue;
      }
      if (k.variant !== variant) {
        k.variant = variant;
        k.from = k.group.position.clone();
        k.to = this.keepsakeAnchor(id, variant);
        k.t = 0;
      }
    }
  }

  private updateKeepsakes(dt: number) {
    for (const k of this.keepsakes.values()) {
      if (k.t >= 1) continue;
      k.t = Math.min(1, k.t + dt / 1.2);
      const e = k.t * k.t * (3 - 2 * k.t);
      k.group.position.lerpVectors(k.from, k.to, e);
    }
  }

  // ---------- clutter ----------
  private clutterBuilder(id: string): THREE.Group {
    switch (id) {
      case "homework": return P.homeworkPile();
      case "noodles": return P.noodleCup();
      case "clothes": return P.clothesPile();
      case "cablemess": return P.cableMess();
      case "oldcrt": return P.oldCrtCorner();
      case "oldtower": return P.oldTowerCorner();
      case "cans": return P.canCluster();
      case "mcrate": return P.movingCrate();
      case "coffee": return P.coffeeGear();
      case "dockables": return P.dockables();
      default: return new THREE.Group();
    }
  }

  private clutterPos(id: string): [number, number, number] {
    const d = SLOTS.desk;
    switch (id) {
      case "homework": return [d.pos[0] + 0.30, DESK_Y, d.pos[2] + 0.05];
      case "noodles": return [d.pos[0] - 0.50, DESK_Y, d.pos[2] + 0.20];
      case "clothes": return [1.30, 0.02, 0.90];
      case "cablemess": return [d.pos[0] - 0.45, 0.02, d.pos[2] - 0.10];
      case "oldcrt": return [1.85, 0.02, 0.55];
      case "oldtower": return [1.80, 0.02, 0.20];
      case "cans": return [d.pos[0] + 0.62, DESK_Y, d.pos[2] + 0.18];
      case "mcrate": return [1.50, 0.02, 0.30];
      case "coffee": return [d.pos[0] - 0.62, DESK_Y, d.pos[2] - 0.20];
      case "dockables": return [d.pos[0] + 0.55, DESK_Y, d.pos[2] - 0.02];
      default: return [0, 0, 0];
    }
  }

  private updateClutter(year: number) {
    for (const def of CLUTTER) {
      const lv = clutterLevel(def, year);
      let c = this.clutterGroups.get(def.id);
      if (lv > 0.001 && !c) {
        const g = this.clutterBuilder(def.id);
        const [x, y, z] = this.clutterPos(def.id);
        g.position.set(x, y, z);
        g.name = `clutter:${def.id}`;
        this.scene.add(g);
        c = { group: g, baseY: y };
        this.clutterGroups.set(def.id, c);
      }
      if (c) {
        const s = 0.5 + 0.5 * lv;
        c.group.scale.setScalar(s);
        this.setFade(c.group, lv);
        c.group.position.y = c.baseY + (1 - lv) * -0.02;
      }
    }
  }

  // ---------- per-frame ----------
  currentYear = 2005;

  setYear(year: number) {
    this.currentYear = year;
    for (const id of Object.keys(REG)) this.ensureSlot(id, year);
    this.ensureKeepsakes(year);
    this.updateClutter(year);
    this.updateEraLighting(year);
  }

  private updateEraLighting(year: number) {
    // later years get a subtle warmer desk light and a faint LED accent
    const ledOn = year >= 2019;
    const lampWarm = year >= 2018 ? 0xffcf90 : 0xffd8a0;
    if (this.lampLight) {
      this.lampLight.color.set(lampWarm);
      this.lampLight.intensity = year >= 2018 ? 1.0 : 0.85;
    }
    if (ledOn && !this.ledStrip) {
      this.ledStrip = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.012, 0.012),
        P.emis(0x8a5af0, 0.5));
      this.ledStrip.position.set(-0.9, 1.02, -1.87);
      this.scene.add(this.ledStrip);
    } else if (!ledOn && this.ledStrip) {
      this.scene.remove(this.ledStrip);
      this.ledStrip = undefined;
    }
  }

  tick(dt: number) {
    this.clock += dt;
    this.updateSlotFades(dt);
    this.updateKeepsakes(dt);
    // gentle LED breathing
    if (this.ledStrip) {
      const m = this.ledStrip.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.4 + 0.12 * Math.sin(this.clock * 2.2);
    }
  }
}
