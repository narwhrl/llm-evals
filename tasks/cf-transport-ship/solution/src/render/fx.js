import * as THREE from "three";
import { softTexture } from "./textures.js";

function orient(mesh, from, to) {
  const delta = new THREE.Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
  const length = delta.length();
  if (length < 0.001) {
    mesh.visible = false;
    return;
  }
  mesh.visible = true;
  mesh.scale.set(1, 1, length);
  mesh.position.set(from.x + delta.x * 0.5, from.y + delta.y * 0.5, from.z + delta.z * 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), delta.multiplyScalar(1 / length));
}

export function createFx(scene) {
  const tracerGeo = new THREE.BoxGeometry(0.018, 0.018, 1);
  const tracers = Array.from({ length: 28 }, () => {
    const mesh = new THREE.Mesh(
      tracerGeo,
      new THREE.MeshBasicMaterial({ color: 0xf2d48a, transparent: true, opacity: 0, depthWrite: false }),
    );
    mesh.visible = false;
    mesh.frustumCulled = false;
    scene.add(mesh);
    return { mesh, life: 0 };
  });
  const decalGeo = new THREE.PlaneGeometry(0.16, 0.16);
  const decals = Array.from({ length: 40 }, () => {
    const mesh = new THREE.Mesh(
      decalGeo,
      new THREE.MeshBasicMaterial({ color: 0x241c16, transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }),
    );
    mesh.visible = false;
    mesh.renderOrder = 2;
    scene.add(mesh);
    return { mesh, life: 0 };
  });
  const flashMap = softTexture("rgba(255,220,160,0.95)", "rgba(255,120,40,0)");
  const flashes = Array.from({ length: 12 }, () => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: flashMap, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    sprite.visible = false;
    sprite.scale.setScalar(0.45);
    scene.add(sprite);
    return { sprite, life: 0 };
  });
  const smokeMap = softTexture("rgba(226,228,226,0.55)", "rgba(180,184,182,0)");
  const smokeGroups = [];
  const boomMap = softTexture("rgba(255,170,70,0.9)", "rgba(80,20,10,0)");
  const booms = [];
  const nadeGeo = new THREE.SphereGeometry(0.09, 8, 6);
  const nadeMat = new THREE.MeshStandardMaterial({ color: 0x3f6a3c, roughness: 0.55 });
  const smokeMat = new THREE.MeshStandardMaterial({ color: 0xd5d8d4, roughness: 0.6 });
  const nadeMeshes = Array.from({ length: 16 }, () => {
    const mesh = new THREE.Mesh(nadeGeo, nadeMat);
    mesh.visible = false;
    mesh.castShadow = true;
    scene.add(mesh);
    return mesh;
  });
  let tracerI = 0;
  let decalI = 0;
  let flashI = 0;

  return {
    reset() {
      for (const item of tracers) item.mesh.visible = false;
      for (const item of decals) item.mesh.visible = false;
      for (const item of flashes) item.sprite.visible = false;
      for (const group of smokeGroups) {
        scene.remove(group.root);
      }
      smokeGroups.length = 0;
      for (const boom of booms) {
        scene.remove(boom.sprite);
        scene.remove(boom.light);
      }
      booms.length = 0;
    },
    pushEvents(events) {
      for (const event of events) {
        if (event.type === "shot") {
          const tracer = tracers[tracerI % tracers.length];
          tracerI += 1;
          const start = {
            x: event.origin.x + event.dir.x * (event.actorId === "player" ? 0.85 : 0.2),
            y: event.origin.y + event.dir.y * (event.actorId === "player" ? 0.85 : 0.2),
            z: event.origin.z + event.dir.z * (event.actorId === "player" ? 0.85 : 0.2),
          };
          orient(tracer.mesh, start, event.point);
          tracer.mesh.material.opacity = 0.9;
          tracer.mesh.material.color.set(event.weapon === "bolt" ? 0xfff2c4 : 0xf0c56a);
          tracer.life = 0.08;
          if (event.actorId !== "player") {
            const flash = flashes[flashI % flashes.length];
            flashI += 1;
            flash.sprite.visible = true;
            flash.sprite.position.set(event.origin.x, event.origin.y, event.origin.z);
            flash.life = 0.05;
          }
        } else if (event.type === "impact" && event.kind !== "flesh") {
          const decal = decals[decalI % decals.length];
          decalI += 1;
          decal.mesh.visible = true;
          decal.mesh.position.set(event.x + event.nx * 0.02, event.y + event.ny * 0.02, event.z + event.nz * 0.02);
          decal.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(event.nx, event.ny, event.nz).normalize());
          const scale = event.kind === "wood" ? 1.4 : event.kind === "pen" ? 0.7 : 1;
          decal.mesh.scale.setScalar(scale);
          decal.mesh.material.color.set(event.kind === "wood" ? 0x4a3424 : 0x1a1c1e);
          decal.mesh.material.opacity = 0.85;
          decal.life = 8;
        } else if (event.type === "explode") {
          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: event.kind === "smoke" ? smokeMap : boomMap,
              transparent: true,
              depthWrite: false,
              blending: event.kind === "smoke" ? THREE.NormalBlending : THREE.AdditiveBlending,
            }),
          );
          sprite.position.set(event.x, event.y, event.z);
          sprite.scale.setScalar(event.kind === "smoke" ? 1.2 : 0.4);
          scene.add(sprite);
          const light = new THREE.PointLight(event.kind === "smoke" ? 0xcfd4d2 : 0xff9944, event.kind === "smoke" ? 0 : 18, 9, 2);
          light.position.copy(sprite.position);
          scene.add(light);
          booms.push({ sprite, light, life: event.kind === "smoke" ? 0.4 : 0.28, kind: event.kind });
        }
      }
    },
    update(dt, state) {
      for (const tracer of tracers) {
        if (tracer.life <= 0) continue;
        tracer.life -= dt;
        tracer.mesh.material.opacity = Math.max(0, tracer.life / 0.08);
        tracer.mesh.visible = tracer.life > 0;
      }
      for (const decal of decals) {
        if (decal.life <= 0) continue;
        decal.life -= dt;
        if (decal.life < 1) decal.mesh.material.opacity = Math.max(0, decal.life);
        decal.mesh.visible = decal.life > 0;
      }
      for (const flash of flashes) {
        if (flash.life <= 0) continue;
        flash.life -= dt;
        flash.sprite.material.opacity = Math.max(0, flash.life / 0.05);
        flash.sprite.visible = flash.life > 0;
      }
      for (let i = booms.length - 1; i >= 0; i -= 1) {
        const boom = booms[i];
        boom.life -= dt;
        const k = Math.max(boom.life, 0);
        boom.sprite.scale.setScalar((boom.kind === "smoke" ? 2.4 : 4.2) * (1 - k));
        boom.sprite.material.opacity = Math.max(0, k * 2);
        boom.light.intensity = boom.kind === "smoke" ? 0 : 30 * k;
        if (boom.life <= 0) {
          scene.remove(boom.sprite);
          scene.remove(boom.light);
          boom.sprite.material.dispose();
          booms.splice(i, 1);
        }
      }
      const live = new Set(state.smokes);
      for (let i = smokeGroups.length - 1; i >= 0; i -= 1) {
        if (!live.has(smokeGroups[i].smoke)) {
          scene.remove(smokeGroups[i].root);
          smokeGroups.splice(i, 1);
        }
      }
      for (const smoke of state.smokes) {
        let group = smokeGroups.find((item) => item.smoke === smoke);
        if (!group) {
          const root = new THREE.Group();
          const sprites = [];
          for (let n = 0; n < 6; n += 1) {
            const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeMap, transparent: true, depthWrite: false, opacity: 0.42 }));
            sprite.position.set((n - 2.5) * 0.45, n * 0.18, ((n * 3) % 5) * 0.22);
            sprite.scale.setScalar(2.1 + (n % 3) * 0.35);
            root.add(sprite);
            sprites.push(sprite);
          }
          scene.add(root);
          group = { smoke, root, sprites, spin: Math.random() * 3 };
          smokeGroups.push(group);
        }
        group.root.position.set(smoke.x, smoke.y, smoke.z);
        group.spin += dt;
        group.sprites.forEach((sprite, index) => {
          sprite.position.y = 0.2 + Math.sin(group.spin + index) * 0.25 + index * 0.16;
          sprite.material.opacity = 0.34 + Math.sin(group.spin * 2 + index) * 0.06;
        });
      }
      for (let i = 0; i < nadeMeshes.length; i += 1) {
        const mesh = nadeMeshes[i];
        const nade = state.nades[i];
        if (!nade) {
          mesh.visible = false;
          continue;
        }
        mesh.visible = true;
        mesh.position.set(nade.x, nade.y, nade.z);
        mesh.material = nade.kind === "smoke" ? smokeMat : nadeMat;
      }
    },
  };
}
