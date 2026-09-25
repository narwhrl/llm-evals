import * as THREE from "three";

function mat(color, roughness, metalness) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

const M = {
  black: mat(0x1c1e20, 0.42, 0.62),
  steel: mat(0xa0a6aa, 0.28, 0.84),
  wood: mat(0x6d452b, 0.8, 0.02),
  tan: mat(0xb08a58, 0.72, 0.05),
  green: mat(0x3f6a3c, 0.55, 0.08),
  smoke: mat(0xd5d8d4, 0.6, 0.1),
  blade: mat(0xd9dde0, 0.22, 0.9),
};

function part(parent, size, material, x, y, z, rot) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  mesh.position.set(x, y, z);
  if (rot) mesh.rotation.set(rot[0] || 0, rot[1] || 0, rot[2] || 0);
  parent.add(mesh);
  return mesh;
}

function rifle() {
  const g = new THREE.Group();
  part(g, [0.07, 0.09, 0.62], M.black, 0, 0, -0.18);
  part(g, [0.045, 0.05, 0.34], M.steel, 0, 0.03, -0.52);
  part(g, [0.06, 0.16, 0.07], M.black, 0, -0.1, -0.02);
  part(g, [0.05, 0.08, 0.22], M.wood, 0, -0.02, 0.22);
  part(g, [0.03, 0.08, 0.04], M.wood, 0, -0.08, 0.02, [0.5, 0, 0]);
  return g;
}

function carbine() {
  const g = new THREE.Group();
  part(g, [0.065, 0.08, 0.48], M.black, 0, 0, -0.12);
  part(g, [0.04, 0.045, 0.26], M.steel, 0, 0.025, -0.4);
  part(g, [0.055, 0.14, 0.055], M.black, 0, -0.09, 0);
  part(g, [0.05, 0.07, 0.2], M.tan, 0, -0.01, 0.18);
  return g;
}

function smg() {
  const g = new THREE.Group();
  part(g, [0.07, 0.1, 0.28], M.black, 0, 0, -0.05);
  part(g, [0.035, 0.04, 0.16], M.steel, 0, 0.03, -0.22);
  part(g, [0.05, 0.2, 0.05], M.black, 0, -0.12, 0.02);
  part(g, [0.025, 0.04, 0.16], M.steel, 0, 0.02, 0.16);
  return g;
}

function pistol() {
  const g = new THREE.Group();
  part(g, [0.05, 0.08, 0.2], M.black, 0, 0, -0.04);
  part(g, [0.03, 0.035, 0.1], M.steel, 0, 0.03, -0.12);
  part(g, [0.04, 0.12, 0.045], M.wood, 0, -0.08, 0.02);
  return g;
}

function bolt() {
  const g = new THREE.Group();
  part(g, [0.06, 0.07, 0.78], M.black, 0, 0, -0.22);
  part(g, [0.035, 0.035, 0.42], M.steel, 0, 0.02, -0.62);
  part(g, [0.05, 0.05, 0.18], M.black, 0, 0.07, -0.12);
  part(g, [0.045, 0.08, 0.22], M.wood, 0, -0.03, 0.24);
  part(g, [0.02, 0.04, 0.08], M.steel, 0.05, 0.02, 0.02);
  return g;
}

function knife() {
  const g = new THREE.Group();
  part(g, [0.012, 0.05, 0.28], M.blade, 0, 0.02, -0.16);
  part(g, [0.03, 0.045, 0.1], M.wood, 0, 0, 0.04);
  return g;
}

function frag() {
  const g = new THREE.Group();
  part(g, [0.08, 0.1, 0.08], M.green, 0, 0, -0.04);
  part(g, [0.02, 0.05, 0.02], M.steel, 0, 0.07, -0.02);
  return g;
}

function smoke() {
  const g = new THREE.Group();
  part(g, [0.075, 0.13, 0.075], M.smoke, 0, 0, -0.02);
  part(g, [0.08, 0.02, 0.08], M.green, 0, 0.02, -0.02);
  return g;
}

const BUILD = { rifle, carbine, smg, pistol, bolt, knife, frag, smoke };

const HIP = {
  rifle: new THREE.Vector3(0.24, -0.24, -0.48),
  carbine: new THREE.Vector3(0.22, -0.23, -0.46),
  smg: new THREE.Vector3(0.2, -0.22, -0.4),
  pistol: new THREE.Vector3(0.2, -0.22, -0.38),
  bolt: new THREE.Vector3(0.22, -0.24, -0.55),
  knife: new THREE.Vector3(0.28, -0.22, -0.4),
  frag: new THREE.Vector3(0.26, -0.2, -0.42),
  smoke: new THREE.Vector3(0.26, -0.2, -0.42),
};

const ADS = {
  rifle: new THREE.Vector3(0.0, -0.16, -0.38),
  carbine: new THREE.Vector3(0.0, -0.155, -0.36),
  smg: new THREE.Vector3(0.02, -0.15, -0.34),
  pistol: new THREE.Vector3(0.0, -0.15, -0.32),
  bolt: new THREE.Vector3(0, -0.12, -0.3),
  knife: HIP.knife,
  frag: HIP.frag,
  smoke: HIP.smoke,
};

export function createViewmodel(camera) {
  const root = new THREE.Group();
  camera.add(root);
  const guns = {};
  for (const id of Object.keys(BUILD)) {
    guns[id] = BUILD[id]();
    guns[id].visible = false;
    root.add(guns[id]);
  }
  const flash = new THREE.PointLight(0xffc27a, 0, 3.5, 2);
  flash.position.set(0, 0, -0.8);
  root.add(flash);
  root.traverse((obj) => {
    obj.frustumCulled = false;
    obj.renderOrder = 20;
    if (obj.material) {
      obj.material.depthTest = false;
      obj.material.depthWrite = false;
    }
  });
  let flashT = 0;
  let shown = null;

  return {
    trigger() {
      flashT = 0.045;
    },
    update(actor, time, dt, visible) {
      root.visible = visible && !!actor?.alive;
      if (!actor) return;
      const id = actor.weapon in guns ? actor.weapon : "rifle";
      if (shown !== id) {
        if (shown) guns[shown].visible = false;
        guns[id].visible = true;
        shown = id;
      }
      const scoped = id === "bolt" && actor.ads;
      guns[id].visible = root.visible && !scoped;
      const hip = HIP[id];
      const aim = ADS[id];
      const blend = actor.ads ? 1 : 0;
      const bob = actor.ads ? 0.25 : 1;
      const speed = Math.hypot(actor.vx || 0, actor.vz || 0);
      const swing = Math.sin(time * 9) * Math.min(speed / 6, 1) * 0.012 * bob;
      const breathe = Math.sin(time * 1.6) * 0.004 * bob;
      root.scale.setScalar(1.35);
      root.position.set(
        THREE.MathUtils.lerp(hip.x, aim.x, blend) + swing,
        THREE.MathUtils.lerp(hip.y, aim.y, blend) + breathe + Math.abs(swing),
        THREE.MathUtils.lerp(hip.z, aim.z, blend),
      );
      const since = Math.max(0, time - (actor.lastShot || -10));
      const kick = Math.exp(-since * 16) * (id === "bolt" ? 0.12 : 0.055);
      root.position.z += kick;
      root.rotation.x = -kick * 1.4;
      if (actor.reload > 0) {
        const p = 1 - actor.reload / Math.max(actor.reloadMax, 0.01);
        root.rotation.x += Math.sin(p * Math.PI) * 0.45;
        root.position.y -= Math.sin(p * Math.PI) * 0.08;
      }
      if (id === "knife") {
        const swingKnife = actor.cooldown > 0 ? Math.sin((0.46 - actor.cooldown) * 8) : 0;
        root.rotation.y = -swingKnife * 0.8;
        root.rotation.z = swingKnife * 0.4;
      } else root.rotation.y = root.rotation.z = 0;
      if (actor.holdingNade) root.position.y += Math.sin(time * 18) * 0.01;
      flashT = Math.max(0, flashT - dt);
      flash.intensity = flashT > 0 ? 6 : 0;
    },
  };
}
