import * as THREE from "three";
import { textTexture } from "./textures.js";

function mat(color, roughness = 0.8, metalness = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function box(parent, size, material, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function buildSoldier(actor) {
  const gr = actor.team === "gr";
  const root = new THREE.Group();
  const cloth = mat(gr ? 0x667248 : 0x2a384c, 0.86);
  const dark = mat(gr ? 0x3c4632 : 0x171c22, 0.9);
  const skin = mat(0xc9956e, 0.7);
  const helm = mat(gr ? 0x8d947c : 0x23272c, 0.5, 0.4);
  const band = mat(gr ? 0xd7a441 : 0x8d2f2f, 0.48, 0.1);
  const gunMat = mat(0x22262a, 0.4, 0.55);

  const hips = new THREE.Group();
  hips.position.y = 0.92;
  root.add(hips);
  const torso = box(hips, [0.46, 0.52, 0.26], cloth, 0, 0.28, 0);
  box(torso, [0.12, 0.08, 0.28], band, gr ? -0.16 : 0.16, 0.08, 0);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 10), skin);
  head.position.set(0, 0.68, 0.02);
  head.castShadow = true;
  torso.add(head);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.145, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.62), helm);
  helmet.position.set(0, 0.05, 0);
  head.add(helmet);
  const visor = box(head, [0.16, 0.045, 0.04], dark, 0, 0.01, 0.12);

  const armGeo = new THREE.BoxGeometry(0.1, 0.46, 0.1);
  const leftArm = new THREE.Mesh(armGeo, cloth);
  leftArm.position.set(-0.3, 0.02, 0);
  leftArm.geometry.translate(0, -0.2, 0);
  const rightArm = new THREE.Mesh(armGeo, cloth);
  rightArm.position.set(0.3, 0.02, 0);
  rightArm.geometry.translate(0, -0.2, 0);
  torso.add(leftArm, rightArm);

  const legGeo = new THREE.BoxGeometry(0.14, 0.78, 0.14);
  const leftLeg = new THREE.Mesh(legGeo, dark);
  const rightLeg = new THREE.Mesh(legGeo, dark);
  leftLeg.position.set(-0.12, -0.02, 0);
  rightLeg.position.set(0.12, -0.02, 0);
  leftLeg.geometry.translate(0, -0.36, 0);
  rightLeg.geometry.translate(0, -0.36, 0);
  leftLeg.castShadow = true;
  rightLeg.castShadow = true;
  hips.add(leftLeg, rightLeg);

  const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, actor.role === "sniper" ? 0.78 : 0.48), gunMat);
  rifle.position.set(0.06, -0.28, 0.22);
  rightArm.add(rifle);

  let label = null;
  if (!actor.isPlayer) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: textTexture([actor.name], {
          width: 256,
          height: 64,
          font: "36px sans-serif",
          color: gr ? "#f0d7a2" : "#f0c2c2",
        }),
        transparent: true,
        depthWrite: false,
      }),
    );
    sprite.position.set(0, 2.05, 0);
    sprite.scale.set(1.15, 0.29, 1);
    sprite.visible = false;
    root.add(sprite);
    label = sprite;
  }

  root.traverse((obj) => {
    obj.castShadow = true;
    if (actor.isPlayer) obj.layers.set(1);
  });
  root.userData = { actorId: actor.id, team: actor.team, torso, head, leftArm, rightArm, leftLeg, rightLeg, label, visor };
  return root;
}

export function createPeople(scene) {
  const meshes = new Map();
  let walk = 0;

  function ensure(actor) {
    const existing = meshes.get(actor.id);
    if (existing && existing.userData.team === actor.team) return existing;
    if (existing) {
      scene.remove(existing);
      existing.traverse((obj) => {
        obj.geometry?.dispose?.();
      });
    }
    const mesh = buildSoldier(actor);
    meshes.set(actor.id, mesh);
    scene.add(mesh);
    return mesh;
  }

  return {
    update(actors, playerTeam, dt) {
      walk += dt;
      for (const actor of actors) {
        const mesh = ensure(actor);
        const parts = mesh.userData;
        mesh.position.set(actor.x, actor.y, actor.z);
        mesh.rotation.x = 0;
        mesh.rotation.z = 0;
        if (!actor.alive) {
        mesh.visible = true;
        mesh.scale.y = 1;
        mesh.rotation.y = actor.yaw;
        mesh.rotation.z = actor.team === "gr" ? 1.2 : -1.2;
        mesh.position.y = actor.y + 0.25;
          mesh.traverse((obj) => obj.layers.set(0));
          if (parts.label) parts.label.visible = false;
          continue;
        }
        mesh.visible = true;
        mesh.rotation.y = actor.yaw;
        const crouch = actor.crouch ? 0.68 : 1;
        mesh.scale.y = crouch;
        const speed = Math.hypot(actor.vx, actor.vz);
        const swing = Math.sin(walk * 9 + actor.number) * Math.min(speed / 4.5, 1) * 0.55;
        parts.leftLeg.rotation.x = swing;
        parts.rightLeg.rotation.x = -swing;
        parts.leftArm.rotation.x = -swing * 0.6 - 0.9;
        parts.rightArm.rotation.x = swing * 0.35 - 1.25;
        parts.torso.material.emissive = new THREE.Color(actor.hurtFlash > 0 ? 0x6a1d1d : 0x000000);
        parts.torso.material.emissiveIntensity = actor.hurtFlash > 0 ? 0.7 : 0;
        const hideBody = actor.isPlayer && actor.alive;
        mesh.traverse((obj) => obj.layers.set(hideBody ? 1 : 0));
        if (parts.label) parts.label.visible = actor.team === playerTeam;
      }
    },
  };
}
