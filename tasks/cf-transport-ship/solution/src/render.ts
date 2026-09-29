import * as THREE from 'three';
import { buildWorld, createHuman, createViewModel, poseHuman } from './assets';
import { smokeOpacity } from './game';
import type { Actor, Game, GameEvent } from './game';
import { direction } from './game';
import { eyeHeight } from './physics';
import type { Settings, WeaponId } from './config';

type Human = ReturnType<typeof createHuman>;
type VisualEffect = { mesh: THREE.Object3D; expires: number; kind: string; vx?: number; vy?: number; vz?: number };
export class GameRenderer {
  renderer: THREE.WebGLRenderer; scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(78, 1, .045, 1500);
  viewScene = new THREE.Scene(); viewCamera = new THREE.PerspectiveCamera(68, 1, .015, 5);
  private world: ReturnType<typeof buildWorld>;
  private humans = new Map<number, Human>(); private effects: VisualEffect[] = [];
  private grenades: THREE.Mesh[] = []; private smokeGroups: THREE.Group[] = [];
  private viewModels = new Map<WeaponId, ReturnType<typeof createViewModel>>();
  private grenadeView = new THREE.Group(); private lastWeapon: WeaponId | 'grenade' | '' = '';
  private shotFlashUntil = 0; private lastShot = 0; private lastTime = 0;
  aimProgress = 0;
  private lastShotOrigins = new Map<number, THREE.Vector3>();
  private cameraDir = new THREE.Vector3();
  private smokeMaterial = new THREE.MeshBasicMaterial({ color: 0x9faeb0, transparent: true, opacity: .16, depthWrite: false, side: THREE.DoubleSide });
  constructor(canvas: HTMLCanvasElement, quality: Settings['quality']) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: quality !== 'low', powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.24;
    this.renderer.shadowMap.enabled = quality !== 'low';
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.autoClear = false;
    this.world = buildWorld(this.scene, quality);
    this.viewScene.add(new THREE.AmbientLight(0xffffff, 1.25));
    const viewLight = new THREE.DirectionalLight(0xffffff, 1.6); viewLight.position.set(-2, 4, 1); this.viewScene.add(viewLight);
    this.grenadeView.position.set(.38, -.44, -.98); this.grenadeView.scale.setScalar(.78);
    const grenadeBody = new THREE.Mesh(new THREE.SphereGeometry(.12, 12, 10), new THREE.MeshStandardMaterial({ color: 0x677264, metalness: .4, roughness: .7 }));
    this.grenadeView.add(grenadeBody);
    const pin = new THREE.Mesh(new THREE.TorusGeometry(.045, .011, 6, 12), new THREE.MeshStandardMaterial({ color: 0xb5babb, metalness: .7, roughness: .3 }));
    pin.position.set(.06, .13, 0); this.grenadeView.add(pin);
    this.viewScene.add(this.grenadeView); this.grenadeView.visible = false;
    for (const id of ['vandal', 'sentinel', 'vector', 'longshot', 'revolver', 'knife'] as WeaponId[]) {
      const model = createViewModel(id); model.root.visible = false; this.viewModels.set(id, model); this.viewScene.add(model.root);
    }
  }
  resize(width: number, height: number, quality: Settings['quality']) {
    const ratio = quality === 'low' ? .8 : quality === 'high' ? Math.min(devicePixelRatio, 1.5) : 1;
    this.renderer.setPixelRatio(ratio); this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height; this.viewCamera.aspect = width / height;
    this.camera.updateProjectionMatrix(); this.viewCamera.updateProjectionMatrix();
  }
  reset(fov = 78) {
    this.aimProgress = 0; this.lastTime = 0; this.lastShot = 0; this.shotFlashUntil = 0; this.lastWeapon = '';
    this.camera.fov = fov; this.camera.updateProjectionMatrix();
    for (const rig of this.humans.values()) { this.scene.remove(rig.root); this.disposeObject(rig.root); }
    this.humans.clear();
    for (const effect of this.effects) { this.scene.remove(effect.mesh); this.disposeObject(effect.mesh, true); }
    this.effects = [];
    for (const mesh of this.grenades) { this.scene.remove(mesh); mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose(); }
    this.grenades = [];
    for (const smoke of this.smokeGroups) { this.scene.remove(smoke); this.disposeObject(smoke, true); }
    this.smokeGroups = [];
  }
  setQuality(quality: Settings['quality']) {
    this.renderer.shadowMap.enabled = quality !== 'low';
    this.world.sun.castShadow = quality !== 'low';
    this.world.sun.shadow.mapSize.set(quality === 'high' ? 2048 : 1024, quality === 'high' ? 2048 : 1024);
    this.world.sun.shadow.map?.dispose();
    this.world.sun.shadow.map = null;
    this.resize(innerWidth, innerHeight, quality);
  }
  private disposeObject(object: THREE.Object3D, materials = false) { object.traverse(o => { if (o instanceof THREE.Mesh || o instanceof THREE.Line) { o.geometry.dispose(); if (materials) { const list = Array.isArray(o.material) ? o.material : [o.material]; for (const mat of list) mat.dispose(); } } }); }
  private syncHumans(game: Game) {
    for (const actor of game.actors) {
      if (actor.player) continue;
      let rig = this.humans.get(actor.id);
      if (!rig) { rig = createHuman(actor.team); this.humans.set(actor.id, rig); this.scene.add(rig.root); }
      poseHuman(rig, game.now + actor.id * .24, actor.moving, actor.body.crouched, actor.alive, actor.firing, actor.selected !== 'grenade' && actor.gear[actor.selected].reloadEnd > game.now);
      rig.root.position.set(actor.body.x, actor.body.y + (actor.alive ? 0 : .31), actor.body.z);
      rig.root.rotation.y = actor.yaw;
      rig.root.visible = actor.alive || game.now < actor.respawnAt - 1.1;
    }
  }
  private updateView(game: Game, settings: Settings, frameDt: number) {
    const player = game.player;
    if (!player) return;
    const height = eyeHeight(player.body), movingBob = settings.bob && player.body.grounded ? Math.sin(game.now * (player.moving > .1 ? 10 : 2)) * Math.min(player.moving / 5, 1) * .023 : 0;
    this.camera.position.set(player.body.x, player.body.y + height + movingBob, player.body.z);
    direction(player.yaw, player.pitch, this.cameraDir);
    this.camera.lookAt(this.camera.position.clone().add(this.cameraDir));
    const aiming = game.phase === 'playing' && player.alive && player.ads && player.selected === 'longshot';
    const step = Math.min(1, Math.max(0, frameDt) / .3);
    this.aimProgress = Math.max(0, Math.min(1, this.aimProgress + (aiming ? step : -step)));
    const aim = this.aimProgress * this.aimProgress * (3 - 2 * this.aimProgress);
    this.camera.fov = settings.fov + (24 - settings.fov) * aim;
    this.camera.updateProjectionMatrix();
    this.viewCamera.fov = 68; this.viewCamera.updateProjectionMatrix();
    const weapon = player.selected;
    if (this.lastWeapon !== weapon) {
      for (const model of this.viewModels.values()) model.root.visible = false;
      this.grenadeView.visible = false;
      if (weapon === 'grenade') this.grenadeView.visible = true;
      else this.viewModels.get(weapon)!.root.visible = true;
      this.lastWeapon = weapon;
    }
    for (const [id, model] of this.viewModels) {
      if (id !== weapon) continue;
      const g = player.gear[id];
      const reloadProgress = g.reloadEnd > game.now ? 1 - (g.reloadEnd - game.now) / Math.max(.01, id === 'longshot' ? 2.8 : id === 'revolver' ? 1.7 : id === 'vector' ? 1.84 : 2.2) : 0;
      const recoil = Math.max(0, 1 - (game.now - this.lastShot) * 9);
      const sway = settings.bob ? Math.sin(game.now * 10) * Math.min(player.moving / 5, 1) : 0;
      const scopeLift = id === 'longshot' ? aim : 0;
      model.root.position.set(.42 + sway * .011 - scopeLift * .36, -.48 + Math.abs(sway) * .014 - recoil * .04 + scopeLift * .2, -1.13 + recoil * .08 + scopeLift * .25);
      model.root.rotation.x = -.08 * recoil + (reloadProgress > 0 ? Math.sin(Math.PI * reloadProgress) * .38 : 0) - scopeLift * .06;
      model.root.rotation.z = reloadProgress > 0 ? Math.sin(Math.PI * reloadProgress) * -.29 : sway * .006;
      model.root.rotation.y = scopeLift * -.04;
      model.magazine.position.y = -.14 - (reloadProgress > .3 && reloadProgress < .73 ? Math.sin((reloadProgress - .3) / .43 * Math.PI) * .18 : 0);
      model.leftHand.position.y = -.15 - (reloadProgress > 0 ? Math.sin(Math.PI * reloadProgress) * .11 : 0);
      model.flash.visible = game.now < this.shotFlashUntil;
      model.root.visible = player.alive && !(id === 'longshot' && this.aimProgress >= .98);
    }
    this.grenadeView.visible = player.alive && weapon === 'grenade';
  }
  processEvents(events: GameEvent[], game: Game) {
    for (const e of events) {
      if (e.type === 'shot') {
        this.lastShotOrigins.set(e.actor!, new THREE.Vector3(e.x, e.y, e.z));
        if (e.actor === game.player.id) { this.lastShot = game.now; this.shotFlashUntil = game.now + .07; }
        if (e.actor === game.player.id) {
          const casing = new THREE.Mesh(new THREE.CylinderGeometry(.024, .024, .085, 6), new THREE.MeshStandardMaterial({ color: 0xbba06a, metalness: .85, roughness: .3 }));
          casing.rotation.z = Math.PI / 2; casing.position.set(e.x + .12, e.y - .09, e.z);
          this.scene.add(casing); this.effects.push({ mesh: casing, expires: game.now + .9, kind: 'shell', vx: .85, vy: 1.2, vz: -.35 });
        }
      } else if (e.type === 'impact') {
        const origin = this.lastShotOrigins.get(e.actor!);
        if (origin && origin.distanceToSquared(new THREE.Vector3(e.x, e.y, e.z)) < 70 * 70) {
          const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3(e.x, e.y, e.z)]), new THREE.LineBasicMaterial({ color: 0xffdfaa, transparent: true, opacity: .4, depthWrite: false }));
          this.scene.add(line); this.effects.push({ mesh: line, expires: game.now + .055, kind: 'tracer' });
        }
        if (e.text !== 'air') {
          const particle = new THREE.Mesh(new THREE.SphereGeometry(e.text === 'actor' ? .045 : .057, 6, 4), new THREE.MeshBasicMaterial({ color: e.text === 'actor' ? 0xde5147 : 0x17252a, transparent: true, opacity: .88, depthWrite: false }));
          particle.position.set(e.x, e.y, e.z); this.scene.add(particle);
          this.effects.push({ mesh: particle, expires: game.now + (e.text === 'actor' ? .34 : 6), kind: 'impact' });
        }
      } else if (e.type === 'explosion') {
        const blast = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffb055, transparent: true, opacity: .6, depthWrite: false }));
        blast.position.set(e.x, e.y, e.z); this.scene.add(blast); this.effects.push({ mesh: blast, expires: game.now + .48, kind: 'blast' });
      }
    }
    while (this.effects.length > 90) { const old = this.effects.shift()!; this.scene.remove(old.mesh); this.disposeObject(old.mesh, true); }
  }
  private syncGrenades(game: Game) {
    while (this.grenades.length < game.grenades.length) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(.13, 10, 8), new THREE.MeshStandardMaterial({ color: 0x586b50, metalness: .38, roughness: .64 }));
      mesh.castShadow = true; this.grenades.push(mesh); this.scene.add(mesh);
    }
    while (this.grenades.length > game.grenades.length) { const m = this.grenades.pop()!; this.scene.remove(m); m.geometry.dispose(); (m.material as THREE.Material).dispose(); }
    for (let i = 0; i < game.grenades.length; i++) this.grenades[i].position.set(game.grenades[i].x, game.grenades[i].y, game.grenades[i].z);
  }
  private syncSmoke(game: Game) {
    while (this.smokeGroups.length < game.smokes.length) {
      const group = new THREE.Group();
      for (let i = 0; i < 10; i++) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 11, 9), this.smokeMaterial.clone());
        const angle = i * 2.4, radius = (i % 4) * .5;
        mesh.position.set(Math.cos(angle) * radius, (i % 3) * .32, Math.sin(angle) * radius);
        mesh.scale.set(1.5 + (i % 3) * .29, 1.05 + (i % 2) * .4, 1.6 + (i % 4) * .2);
        group.add(mesh);
      }
      this.scene.add(group); this.smokeGroups.push(group);
    }
    while (this.smokeGroups.length > game.smokes.length) { const group = this.smokeGroups.pop()!; this.scene.remove(group); this.disposeObject(group, true); }
    for (let i = 0; i < game.smokes.length; i++) {
      const smoke = game.smokes[i], group = this.smokeGroups[i], strength = smokeOpacity(smoke, game.now);
      group.position.set(smoke.x, smoke.y, smoke.z);
      group.scale.setScalar(.35 + strength * 1.1);
      group.traverse(o => { if (o instanceof THREE.Mesh) (o.material as THREE.MeshBasicMaterial).opacity = .1 * strength; });
    }
  }
  render(game: Game, settings: Settings, width: number, height: number, frameDt = 0) {
    const dt = Math.max(0, game.now - this.lastTime); this.lastTime = game.now;
    if (this.renderer.domElement.width !== Math.floor(width * this.renderer.getPixelRatio()) || this.renderer.domElement.height !== Math.floor(height * this.renderer.getPixelRatio())) this.resize(width, height, settings.quality);
    if (game.actors.length) { this.syncHumans(game); this.updateView(game, settings, frameDt); }
    this.syncGrenades(game); this.syncSmoke(game);
    const seaMat = this.world.sea.material as THREE.ShaderMaterial; seaMat.uniforms.uTime.value = game.now;
    this.world.sky.rotation.y = game.now * .00015;
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const effect = this.effects[i];
      if (game.now >= effect.expires) { this.scene.remove(effect.mesh); this.disposeObject(effect.mesh, true); this.effects.splice(i, 1); continue; }
      if (effect.kind === 'blast') {
        const scale = 1 + (1 - (effect.expires - game.now) / .48) * 4.3;
        effect.mesh.scale.setScalar(scale);
        ((effect.mesh as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = (effect.expires - game.now) / .48 * .48;
      }
      if (effect.kind === 'shell') {
        const mesh = effect.mesh; const age = .9 - (effect.expires - game.now);
        mesh.position.x += (effect.vx ?? 0) * dt; mesh.position.y += (effect.vy ?? 0) * dt; mesh.position.z += (effect.vz ?? 0) * dt;
        effect.vy = 1.2 - age * 8; mesh.rotation.z += dt * 9;
        if (mesh.position.y < .06) { mesh.position.y = .06; effect.vy = 0; effect.vx = 0; effect.vz = 0; }
      }
    }
    this.renderer.clear(); this.renderer.render(this.scene, this.camera);
    if (game.actors.length && game.player.alive && game.phase !== 'menu') {
      this.renderer.clearDepth(); this.renderer.render(this.viewScene, this.viewCamera);
    }
    return { calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles, dt };
  }
  dispose() { this.reset(); this.world.dispose(); this.renderer.dispose(); }
}
