import * as THREE from "three";
import { buildCapsule, Capsule, BIG_WINDOW, FLOOR_HALF_DEPTH } from "./capsule";
import { buildEarth, Earth } from "./earth";
import { buildProps, PropRefs } from "./props";
import { loadTextures, TextureSet } from "./textures";

/**
 * The diorama.
 *
 * An orthographic camera, a capsule module cut open along its length, and
 * the Earth outside the big porthole. The module orbits: the sun swings
 * around it once every ninety seconds, the light comes in through the window
 * and lays a round patch on the floor, and when the module passes into the
 * Earth's shadow the window fills with the night side of the planet.
 */

const ISOMETRIC_AZIMUTH = 45;
const ISOMETRIC_ELEVATION = 33;
const ORBIT_PERIOD = 90;
const FAST_ORBIT_PERIOD = 15;

export interface HabitatOptions {
  canvas: HTMLCanvasElement;
  onReady?: () => void;
}

export interface HabitatState {
  /** The orbital phase, 0 to 1. */
  phase: number;
  fastForward: boolean;
  nightCruise: boolean;
  plantLight: boolean;
  focus: string | null;
  day: boolean;
  /** How hard the floating pen is spinning, for the acceptance harness. */
  penSpin: number;
}

export class Habitat {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.OrthographicCamera;
  private readonly textures: TextureSet;
  private readonly capsule: Capsule;
  private readonly props: PropRefs;
  private readonly earth: Earth;

  private readonly sunLight = new THREE.DirectionalLight(0xfff6e6, 0);
  private readonly earthGlow = new THREE.PointLight(0x6fa8ff, 0, 6, 2);
  private readonly ambient = new THREE.HemisphereLight(0x9fb4cc, 0x4a443c, 0.5);

  private viewSize = 7.9;
  private targetViewSize = 7.9;
  private azimuth = THREE.MathUtils.degToRad(ISOMETRIC_AZIMUTH);
  private elevation = THREE.MathUtils.degToRad(ISOMETRIC_ELEVATION);
  private targetAzimuth = this.azimuth;
  private targetElevation = this.elevation;
  private target = new THREE.Vector3(0.25, 1.0, -1.05);
  private targetFocus = this.target.clone();

  private phase = 0;
  private fastForward = false;
  private nightCruise = false;
  private plantLightOn = true;
  private focusedName: string | null = null;

  private running = true;
  /** True while the browser has taken the WebGL context away. */
  private contextLost = false;
  private disposed = false;
  private frame = 0;
  private lastTime = 0;
  private clock = 0;

  private pointer = new THREE.Vector2(-10, -10);
  private pointerActive = false;
  private dragging = false;
  private dragMoved = 0;
  private dragStart = new THREE.Vector2();
  private lastPointer = new THREE.Vector2();
  private scrubbing = false;
  private scrubStartPhase = 0;
  private scrubStartX = 0;
  private penSpin = 0;
  private penVelocity = new THREE.Vector3();
  private pointerWorld = new THREE.Vector3();

  private readonly onPointerDown: (event: PointerEvent) => void;
  private readonly onPointerMove: (event: PointerEvent) => void;
  private readonly onPointerUp: (event: PointerEvent) => void;
  private readonly onWheel: (event: WheelEvent) => void;
  private readonly onContextLost: (event: Event) => void;
  private readonly onContextRestored: () => void;

  constructor(options: HabitatOptions) {
    const canvas = options.canvas;
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x02030a, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
    this.scene.add(this.camera);
    this.scene.add(this.ambient);

    this.textures = loadTextures();
    this.capsule = buildCapsule(this.textures);
    this.scene.add(this.capsule.group);

    this.props = buildProps(this.textures);
    this.scene.add(this.props.group);

    this.earth = buildEarth(this.textures, 0.7);
    this.scene.add(this.earth.group);

    /* --- the sun ---------------------------------------------------------- */

    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.left = -6;
    this.sunLight.shadow.camera.right = 6;
    this.sunLight.shadow.camera.top = 6;
    this.sunLight.shadow.camera.bottom = -6;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 60;
    this.sunLight.shadow.bias = -0.0006;
    this.sunLight.shadow.normalBias = 0.02;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    this.earthGlow.position.set(
      BIG_WINDOW.x,
      BIG_WINDOW.y,
      -FLOOR_HALF_DEPTH + 0.35,
    );
    this.scene.add(this.earthGlow);

    // The stars behind everything.
    this.scene.add(this.buildStars());

    this.resize();
    this.updateCamera(0);
    this.updateSun();

    /* --- input ------------------------------------------------------------ */

    this.onPointerDown = (event) => {
      this.canvas.setPointerCapture(event.pointerId);
      this.dragging = true;
      this.dragMoved = 0;
      this.dragStart.set(event.clientX, event.clientY);
      this.lastPointer.set(event.clientX, event.clientY);
      this.pointerActive = true;
      this.updatePointer(event);
      // A press on the porthole starts a scrub of the orbit. Whether the
      // press speeds the cycle up is decided when the button comes back up.
      this.scrubbing = this.hitPorthole();
      if (this.scrubbing) {
        this.scrubStartPhase = this.phase;
        this.scrubStartX = event.clientX;
      }
    };
    this.onPointerMove = (event) => {
      this.updatePointer(event);
      if (!this.dragging) return;
      const dx = event.clientX - this.lastPointer.x;
      const dy = event.clientY - this.lastPointer.y;
      this.lastPointer.set(event.clientX, event.clientY);
      this.dragMoved += Math.abs(dx) + Math.abs(dy);
      if (this.scrubbing) {
        this.phase = this.wrapPhase(this.scrubStartPhase - (event.clientX - this.scrubStartX) * 0.004);
        this.updateSun();
        return;
      }
      this.targetAzimuth -= dx * 0.006;
      this.targetAzimuth = THREE.MathUtils.clamp(this.targetAzimuth, 0.32, 1.4);
      this.targetElevation = THREE.MathUtils.clamp(this.targetElevation + dy * 0.005, 0.3, 1.05);
    };
    this.onPointerUp = (event) => {
      if (!this.dragging) return;
      this.dragging = false;
      try {
        this.canvas.releasePointerCapture(event.pointerId);
      } catch {
        // The pointer may already be gone.
      }
      if (this.scrubbing) {
        this.scrubbing = false;
        if (this.dragMoved < 6) this.toggleFastForward();
        return;
      }
      if (this.dragMoved < 6) this.handleClick();
    };
    this.onWheel = (event) => {
      event.preventDefault();
      this.targetViewSize = THREE.MathUtils.clamp(
        this.targetViewSize * (1 + Math.sign(event.deltaY) * 0.08),
        1.6,
        13,
      );
    };
    this.onContextLost = (event) => {
      event.preventDefault();
      this.contextLost = true;
      this.running = false;
    };
    this.onContextRestored = () => {
      this.contextLost = false;
      this.running = true;
      this.lastTime = 0;
      this.resize();
    };

    this.canvas.addEventListener("pointerdown", this.onPointerDown);
    this.canvas.addEventListener("pointermove", this.onPointerMove);
    this.canvas.addEventListener("pointerup", this.onPointerUp);
    this.canvas.addEventListener("pointercancel", this.onPointerUp);
    this.canvas.addEventListener("wheel", this.onWheel, { passive: false });
    this.canvas.addEventListener("webglcontextlost", this.onContextLost, false);
    this.canvas.addEventListener("webglcontextrestored", this.onContextRestored, false);

    const observer = new ResizeObserver(() => this.resize());
    observer.observe(this.canvas.parentElement ?? this.canvas);
    this.observer = observer;

    this.renderer.setAnimationLoop(() => this.tick());
  }

  private observer: ResizeObserver | null = null;

  /* ---------------------------------------------------------------------- */
  /*  Public surface                                                          */
  /* ---------------------------------------------------------------------- */

  setPhase(phase: number): void {
    this.phase = this.wrapPhase(phase);
    this.updateSun();
  }

  getPhase(): number {
    return this.phase;
  }

  setFastForward(on: boolean): void {
    this.fastForward = on;
  }

  setNightCruise(on: boolean): void {
    this.nightCruise = on;
    this.applyNightCruise();
  }

  setPlantLight(on: boolean): void {
    this.plantLightOn = on;
    this.props.plantLight.visible = on;
    const material = this.props.plantLamp.children[1] as THREE.Mesh;
    const standard = material.material as THREE.MeshStandardMaterial;
    standard.emissiveIntensity = on ? 1.9 : 0.05;
  }

  setFocus(name: string | null): void {
    this.focusedName = name;
    if (name === null) {
      this.targetFocus.set(0.25, 1.0, -1.05);
      this.targetViewSize = 7.9;
      return;
    }
    const target = this.props.focusTargets.find((entry) => entry.name === name);
    if (!target) return;
    this.targetFocus.copy(target.position);
    this.targetViewSize = name === "The porthole" ? 2.6 : 3.1;
  }

  /** A small window into the scene, used by the acceptance probes. */
  debugInfo() {
    const view = new THREE.Vector3();
    this.camera.getWorldDirection(view);
    const project = (point: THREE.Vector3) => {
      const p = point.clone().project(this.camera);
      return [Math.round((p.x * 0.5 + 0.5) * 1440), Math.round((-p.y * 0.5 + 0.5) * 900)];
    };
    return {
      view: view.toArray().map((v) => +v.toFixed(3)),
      camera: this.camera.position.toArray().map((v) => +v.toFixed(2)),
      target: this.target.toArray().map((v) => +v.toFixed(2)),
      earth: this.earth.group.position.toArray().map((v) => +v.toFixed(2)),
      earthScreen: project(this.earth.group.position),
      windowScreen: project(this.capsule.bigWindow.centre),
      windowWorld: this.capsule.bigWindow.centre.toArray(),
      earthRadius: this.earth.radius,
    };
  }

  /** The screen position of a point in the world, for the acceptance harness. */
  project(point: [number, number, number]): [number, number] {
    const projected = new THREE.Vector3(point[0], point[1], point[2]).project(this.camera);
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(rect.left + (projected.x * 0.5 + 0.5) * rect.width),
      Math.round(rect.top + (-projected.y * 0.5 + 0.5) * rect.height),
    ];
  }

  /** Where the clickable things are, in world space. */
  landmarks(): { name: string; point: [number, number, number] }[] {
    const pen = this.props.pen.position;
    return [
      ...this.props.focusTargets.map((entry) => ({
        name: entry.name,
        point: entry.position.toArray() as [number, number, number],
      })),
      { name: "The pen", point: [pen.x, pen.y, pen.z] },
      { name: "The floor strip", point: [0, 0.02, -FLOOR_HALF_DEPTH * 0.48] },
      { name: "The porthole", point: this.capsule.bigWindow.centre.toArray() as [number, number, number] },
      { name: "The plant lamp", point: [-2.4, 1.72, -FLOOR_HALF_DEPTH + 0.32] },
    ];
  }

  getState(): HabitatState {
    return {
      phase: this.phase,
      fastForward: this.fastForward,
      nightCruise: this.nightCruise,
      plantLight: this.plantLightOn,
      focus: this.focusedName,
      day: this.sunLight.intensity > 0.4,
      penSpin: this.penSpin,
    };
  }

  dispose(): void {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.canvas.removeEventListener("pointerdown", this.onPointerDown);
    this.canvas.removeEventListener("pointermove", this.onPointerMove);
    this.canvas.removeEventListener("pointerup", this.onPointerUp);
    this.canvas.removeEventListener("pointercancel", this.onPointerUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
    this.canvas.removeEventListener("webglcontextlost", this.onContextLost, false);
    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored, false);
    this.observer?.disconnect();
    this.renderer.dispose();
  }

  /* ---------------------------------------------------------------------- */
  /*  The sky                                                                  */
  /* ---------------------------------------------------------------------- */

  private buildStars(): THREE.Points {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colours = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // A shell around the module.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 70;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const warmth = Math.random();
      const brightness = 0.25 + Math.random() * 0.75;
      colours[i * 3] = brightness * (0.75 + warmth * 0.25);
      colours[i * 3 + 1] = brightness * 0.92;
      colours[i * 3 + 2] = brightness * (1 - warmth * 0.3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colours, 3));
    const material = new THREE.PointsMaterial({
      size: 0.16,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    return new THREE.Points(geometry, material);
  }

  /* ---------------------------------------------------------------------- */
  /*  The sun                                                                  */
  /* ---------------------------------------------------------------------- */

  private wrapPhase(value: number): number {
    const wrapped = value % 1;
    return wrapped < 0 ? wrapped + 1 : wrapped;
  }

  /**
   * The sun swings around the module once per orbit. Its path is tilted so
   * that at noon it sits above the window's axis: the light then rakes down
   * through the aperture and lands on the floor instead of crossing the room
   * sideways.
   */
  private sunDirection(phase: number): THREE.Vector3 {
    const angle = phase * Math.PI * 2 + THREE.MathUtils.degToRad(35);
    // The window looks out along -Z; the sun's path is the vertical plane
    // that contains that direction.
    const normal = new THREE.Vector3(0, 0, -1);
    const up = new THREE.Vector3(0, 1, 0);
    return normal
      .clone()
      .multiplyScalar(Math.cos(angle))
      .add(up.multiplyScalar(Math.sin(angle)))
      .normalize();
  }

  private updateSun(): void {
    const direction = this.sunDirection(this.phase);
    const alignment = Math.max(0, -direction.z);
    const daylight = Math.pow(alignment, 1.4);

    this.sunLight.position.copy(direction).multiplyScalar(26);
    this.sunLight.target.position.set(0, 0.4, -1.2);
    this.sunLight.intensity = daylight * 11;
    this.sunLight.color.setHex(daylight > 0.02 ? 0xfff4e2 : 0xffffff);

    // The light that comes through the porthole.
    const spot = this.capsule.bigWindow.spot;
    spot.target.position
      .copy(this.capsule.bigWindow.centre)
      .addScaledVector(direction, -3.0);
    spot.target.updateMatrixWorld();
    spot.intensity = daylight * 4.5;

    // The small windows take a sliver of the same light.
    for (const small of this.capsule.smallWindows) {
      small.spot.target.position.copy(small.centre).addScaledVector(direction, -3.0);
      small.spot.target.updateMatrixWorld();
      small.spot.intensity = daylight * 1.6;
    }

    // The night side of the planet, and the earthshine on the frame.
    this.earthGlow.intensity = (1 - daylight) * (1 - daylight) * 4.2;

    // The cabin's own lights take over at night.
    const stripPower = this.nightCruise ? 0.06 : 1;
    for (const light of this.capsule.stripLights) {
      light.intensity = 3.0 * stripPower * (0.35 + 0.65 * (1 - daylight));
    }
    this.capsule.floorStripMaterial.emissiveIntensity = 0.9 * stripPower * (0.55 + 0.45 * (1 - daylight));
    this.ambient.intensity = 0.5 + 0.7 * daylight;
  }

  private applyNightCruise(): void {
    this.updateSun();
  }

  /* ---------------------------------------------------------------------- */
  /*  Interaction                                                              */
  /* ---------------------------------------------------------------------- */

  private updatePointer(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
  }

  /** The world point under the cursor, on the plane of the module. */
  private pointerOnFloor(): THREE.Vector3 {
    const ray = new THREE.Raycaster();
    ray.setFromCamera(this.pointer, this.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.0);
    const hit = new THREE.Vector3();
    ray.ray.intersectPlane(plane, hit);
    return hit;
  }

  /** Is the cursor over the big porthole? */
  private hitPorthole(): boolean {
    const ray = new THREE.Raycaster();
    ray.setFromCamera(this.pointer, this.camera);
    return ray.intersectObject(this.capsule.bigWindow.group, true).length > 0;
  }

  private handleClick(): void {
    const ray = new THREE.Raycaster();
    ray.setFromCamera(this.pointer, this.camera);

    // The floating pen: click to spin it.
    const penHit = ray.intersectObject(this.props.pen, true);
    if (penHit.length > 0) {
      this.penSpin = 1;
      return;
    }

    // The plant lamp.
    const lampHit = ray.intersectObject(this.props.plantLamp, true);
    if (lampHit.length > 0) {
      this.setPlantLight(!this.plantLightOn);
      return;
    }

    // The floor strip: night cruise.
    const stripHit = ray.intersectObject(this.capsule.floorStrip, true);
    if (stripHit.length > 0) {
      this.setNightCruise(!this.nightCruise);
      return;
    }

    // Anything else with a focus target.
    for (const entry of this.props.focusTargets) {
      if (ray.intersectObject(entry.object, true).length > 0) {
        this.setFocus(this.focusedName === entry.name ? null : entry.name);
        return;
      }
    }

    // Empty space: back to the overview.
    this.setFocus(null);
  }

  private toggleFastForward(): void {
    this.fastForward = !this.fastForward;
  }

  /* ---------------------------------------------------------------------- */
  /*  Frame                                                                    */
  /* ---------------------------------------------------------------------- */

  private tick(): void {
    if (this.disposed) return;
    if (this.contextLost) {
      // Some browsers give the context back without firing the event, so the
      // frame loop watches for it and carries on from where it stopped.
      if (!this.renderer.getContext().isContextLost()) {
        this.contextLost = false;
        this.running = true;
        this.lastTime = 0;
        this.resize();
      }
      return;
    }
    if (!this.running) return;
    const now = performance.now();
    const delta = this.lastTime ? Math.min((now - this.lastTime) / 1000, 0.1) : 0;
    this.lastTime = now;
    this.clock += delta;
    this.frame += 1;

    if (!this.scrubbing) {
      const period = this.fastForward ? FAST_ORBIT_PERIOD : ORBIT_PERIOD;
      this.phase = this.wrapPhase(this.phase + delta / period);
      this.updateSun();
    }

    this.updateCamera(delta);
    this.updateFloaters(delta);
    this.updateEarth();

    this.props.screen.update(delta);
    this.updateIndicators();

    this.renderer.render(this.scene, this.camera);
  }

  private updateCamera(delta: number): void {
    const ease = 1 - Math.pow(0.0015, delta || 0.016);
    this.azimuth += (this.targetAzimuth - this.azimuth) * ease;
    this.elevation += (this.targetElevation - this.elevation) * ease;
    this.viewSize += (this.targetViewSize - this.viewSize) * ease;
    this.target.lerp(this.targetFocus, ease);

    const distance = 40;
    const horizontal = Math.cos(this.elevation) * distance;
    this.camera.position.set(
      this.target.x + horizontal * Math.cos(this.azimuth),
      this.target.y + Math.sin(this.elevation) * distance,
      this.target.z + horizontal * Math.sin(this.azimuth),
    );
    this.camera.lookAt(this.target);

    const aspect = this.canvas.clientWidth / Math.max(1, this.canvas.clientHeight);
    this.camera.left = (-this.viewSize * aspect) / 2;
    this.camera.right = (this.viewSize * aspect) / 2;
    this.camera.top = this.viewSize / 2;
    this.camera.bottom = -this.viewSize / 2;
    this.camera.updateProjectionMatrix();
  }

  /**
   * The Earth is placed along the ray that goes through the big porthole, so
   * the window always frames the planet whatever the camera is doing. It is
   * offset just far enough that its limb crosses the aperture.
   */
  private updateEarth(): void {
    const view = new THREE.Vector3();
    this.camera.getWorldDirection(view);
    const right = new THREE.Vector3().crossVectors(view, this.camera.up).normalize();
    const screenDown = new THREE.Vector3().crossVectors(view, right).normalize();

    const centre = this.capsule.bigWindow.centre;
    this.earth.group.position
      .copy(centre)
      .addScaledVector(view, 3.0)
      .addScaledVector(screenDown, 0.02);
    this.earth.group.rotation.y = this.phase * Math.PI * 2 * 0.25 + 1.1;

    // The planet carries its own phase. The sun that lights the cabin comes
    // straight through the window, so a globe beyond it would be a thin
    // crescent from where the observer sits; the planet is therefore lit from
    // the direction that shows its face, and it turns through its day while
    // the module orbits. By night the same globe is a dark disc full of
    // city lights.
    const toCamera = view.clone().negate();
    const phaseAngle = 0.45 + Math.PI * 1.4 * this.phase;
    const earthSun = toCamera
      .multiplyScalar(Math.cos(phaseAngle))
      .addScaledVector(right, Math.sin(phaseAngle))
      .normalize();
    this.earth.material.uniforms.uSunDirection.value.copy(earthSun);
    this.earth.material.uniforms.uViewDirection.value
      .copy(this.camera.position)
      .sub(this.earth.group.position)
      .normalize();
    this.earth.material.uniforms.uCloudOffset.value = this.phase * 0.08 + 0.02;
  }

  private updateFloaters(delta: number): void {
    // The floating things drift and turn, and never stop.
    for (const floater of this.props.floaters) {
      const object = floater.object;
      const t = this.clock * floater.spin + floater.phase;
      object.rotation.x += delta * floater.spin * 0.7;
      object.rotation.y += delta * floater.spin;
      object.position.y += Math.sin(t * 0.9) * delta * floater.bob;
      object.position.x += Math.cos(t * 0.7) * delta * floater.bob * 0.6;
      object.position.z += Math.sin(t * 0.5 + 1.2) * delta * floater.bob * 0.6;
    }

    // The pen dodges the cursor and can be spun.
    const pen = this.props.pen;
    this.pointerWorld.copy(this.pointerOnFloor());
    const dx = pen.position.x - this.pointerWorld.x;
    const dz = pen.position.z - this.pointerWorld.z;
    const distance = Math.hypot(dx, dz);
    if (this.pointerActive && distance < 0.9 && distance > 0.001) {
      const push = (0.9 - distance) * 2.4;
      this.penVelocity.x += (dx / distance) * push * delta;
      this.penVelocity.z += (dz / distance) * push * delta;
    }
    this.penVelocity.multiplyScalar(0.94);
    pen.position.x = THREE.MathUtils.clamp(pen.position.x + this.penVelocity.x * delta, 0.55, 2.1);
    pen.position.z = THREE.MathUtils.clamp(pen.position.z + this.penVelocity.z * delta, -1.6, -0.2);
    if (this.penSpin > 0) {
      pen.rotation.y += this.penSpin * delta * 22;
      pen.rotation.z += this.penSpin * delta * 9;
      this.penSpin = Math.max(0, this.penSpin - delta * 1.4);
    }

    // The zipper pull sways.
    this.props.zipper.rotation.z = Math.sin(this.clock * 1.6) * 0.22;
  }

  private updateIndicators(): void {
    for (const indicator of this.props.indicators) {
      const material = indicator.mesh.material as THREE.MeshStandardMaterial;
      const wave = Math.sin((this.clock / indicator.period + indicator.offset) * Math.PI * 2);
      const on = wave > 0.25 ? 1 : 0.12;
      material.emissiveIntensity = 0.4 + on * 2.6;
    }

    // The grow lamp breathes.
    const lampMaterial = (this.props.plantLamp.children[1] as THREE.Mesh)
      .material as THREE.MeshStandardMaterial;
    if (this.plantLightOn) {
      lampMaterial.emissiveIntensity = 1.8 + Math.sin(this.clock * 0.9) * 0.3;
      this.props.plantLight.intensity = 1.6 + Math.sin(this.clock * 0.9) * 0.3;
    }
  }

  private resize(): void {
    const parent = this.canvas.parentElement;
    const width = Math.max(1, parent?.clientWidth ?? this.canvas.clientWidth);
    const height = Math.max(1, parent?.clientHeight ?? this.canvas.clientHeight);
    this.renderer.setSize(width, height, false);
  }
}
