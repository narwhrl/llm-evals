import * as THREE from 'three';
import { buildWorld } from './world';
import { buildStore } from './store';
import { buildProps } from './props';
import {
  Rain,
  RippleField,
  DripSystem,
  SteamPlume,
  FlickerController,
  addStreak,
  type Updatable,
} from './effects';

export function buildScene(scene: THREE.Scene): Updatable {
  scene.background = new THREE.Color('#10141f');
  scene.fog = new THREE.FogExp2(0x10141f, 0.015);

  const world = buildWorld(scene);
  const store = buildStore(scene);
  const props = buildProps(scene);

  /* --------------------------------------------------------- lighting */
  scene.add(new THREE.HemisphereLight('#46587e', '#141824', 0.55));
  const moon = new THREE.DirectionalLight('#9fb6e8', 0.85);
  moon.position.set(-7, 11, -5);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const cam = moon.shadow.camera as THREE.OrthographicCamera;
  cam.left = -9;
  cam.right = 9;
  cam.top = 9;
  cam.bottom = -9;
  cam.near = 2;
  cam.far = 30;
  moon.shadow.bias = -0.0004;
  moon.shadow.normalBias = 0.03;
  scene.add(moon);

  /* --------------------------------------------------- wet reflections */
  addStreak(scene, -1.5, 1.52, 2.4, 0.6, '#bfeaff', 0.4); // fascia lightbox
  addStreak(scene, -3.0, 1.5, 1.7, 0.8, '#ffca7a', 0.26); // storefront warm band
  addStreak(scene, -1.4, 1.5, 1.7, 0.8, '#ffca7a', 0.26);
  addStreak(scene, 0.3, 1.5, 1.7, 0.8, '#ffca7a', 0.26);
  addStreak(scene, 1.4, 0.2, 2.0, 0.7, '#ffca7a', 0.24); // side showcase glass
  addStreak(scene, 2.0, 0.5, 1.3, 0.35, '#7fd0ff', 0.34); // vending machines
  addStreak(scene, 2.0, -0.45, 1.3, 0.35, '#7fd0ff', 0.34);
  addStreak(scene, -5.35, 1.7, 1.2, 0.3, '#7fd0ff', 0.3);
  addStreak(scene, -3.95, 2.45, 2.2, 0.5, '#dfe9ff', 0.3); // streetlights
  addStreak(scene, 2.4, 4.15, 2.0, 0.5, '#dfe9ff', 0.28);
  addStreak(scene, -0.1, 4.8, 1.9, 0.5, '#7ce8f4', 0.2); // rooftop billboard
  addStreak(scene, -5.2, 4.8, 1.5, 0.4, '#ff7a5c', 0.2); // ramen sign
  addStreak(scene, -5.5, 1.62, 1.2, 0.5, '#ffd28f', 0.14); // apartment windows
  addStreak(scene, 4.84, 0.9, 1.4, 0.45, '#ffd28f', 0.14); // east block windows
  addStreak(scene, -1.7, 3.3, 2.2, 2.4, '#aebfd8', 0.07); // crosswalk sheen
  addStreak(scene, 1.0, -4.12, 0.9, 0.25, '#7ca8ff', 0.18); // P sign
  const trafficStreak = addStreak(scene, 5.05, 5.05, 1.2, 0.3, '#58e07a', 0.26);

  /* -------------------------------------------------------- animation */
  const ripples = new RippleField(scene, world.puddles);
  const flickers = new FlickerController(store.flickers);
  const anims: Updatable[] = [
    store.door,
    props.traffic,
    new Rain(scene),
    ripples,
    new DripSystem(scene, [...store.drips, ...props.drips], ripples),
    new SteamPlume(scene, world.steamPoints, 1.25), // manhole steam
    new SteamPlume(scene, store.steamPoints, 0.75), // oden pot steam
    flickers,
  ];

  const trafficStreakMat = trafficStreak.material as THREE.MeshBasicMaterial;

  // Passive runtime diagnostics for verification tooling; mirrors live state only.
  const diag = window as unknown as Record<string, unknown>;
  let fps = 60;
  diag.__diag = { fps: 0, doorOpen: 0, traffic: 'g', flicker: flickers.values };

  return {
    update(dt: number, t: number): void {
      for (const a of anims) a.update(dt, t);
      for (const g of store.glassMats) g.uniforms.uTime.value = t;
      for (const f of store.fans) f.mesh.rotation.z += f.speed * dt;
      for (const f of props.fans) f.mesh.rotation.z += f.speed * dt;
      trafficStreakMat.color.copy(props.traffic.activeColor());
      fps += (1 / Math.max(dt, 1 / 240) - fps) * 0.05;
      const d = diag.__diag as { fps: number; doorOpen: number; traffic: string };
      d.fps = Math.round(fps);
      d.doorOpen = store.door.openness;
      d.traffic = props.traffic.phase();
    },
  };
}
