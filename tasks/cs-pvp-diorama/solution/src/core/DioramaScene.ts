import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DioramaBase } from '../environment/DioramaBase';
import { TSpawnZone } from '../zones/TSpawnZone';
import { ASiteZone } from '../zones/ASiteZone';
import { MidLaneZone } from '../zones/MidLaneZone';
import { BSiteZone } from '../zones/BSiteZone';
import { CTSpawnZone } from '../zones/CTSpawnZone';
import { WeatherEffects } from '../effects/WeatherEffects';

export class DioramaScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;

  private weatherEffects: WeatherEffects;
  private clock: THREE.Clock;

  constructor(container: HTMLElement) {
    this.clock = new THREE.Clock();

    // 1. Scene & Atmospheric Fog
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080b10);
    this.scene.fog = new THREE.FogExp2(0x0a1018, 0.016);

    // 2. Camera Setup (Exquisite 3/4 high angle overview of the full diorama)
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 200);
    this.camera.position.set(24, 22, 28);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    // 4. OrbitControls (Smooth damping, constrained pitch & zoom)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.2, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2.08; // Keep above base horizon
    this.controls.minDistance = 6.0;
    this.controls.maxDistance = 65.0;
    this.controls.update();

    // 5. Environmental Lighting (Cool industrial rain-night palette)
    const ambientLight = new THREE.AmbientLight(0x182433, 0.9);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38557a, 1.6);
    dirLight.position.set(16, 28, 14);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 70;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    dirLight.shadow.bias = -0.001;
    this.scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x203548, 0.8);
    rimLight.position.set(-18, 15, -16);
    this.scene.add(rimLight);

    // 6. Assemble Map Zones
    const base = new DioramaBase();
    this.scene.add(base.group);

    const tSpawn = new TSpawnZone();
    this.scene.add(tSpawn.group);

    const aSite = new ASiteZone();
    this.scene.add(aSite.group);

    const midLane = new MidLaneZone();
    this.scene.add(midLane.group);

    const bSite = new BSiteZone();
    this.scene.add(bSite.group);

    const ctSpawn = new CTSpawnZone();
    this.scene.add(ctSpawn.group);

    // 7. Initialize Dynamic Weather Effects
    this.weatherEffects = new WeatherEffects({
      ambientLight,
      directionalLight: dirLight,
      streetLampLight: bSite.streetLampLight,
      streetLampSpot: bSite.streetLampSpot,
      guardhouseLight: bSite.guardhouseLight,
      warehouseLight: aSite.warehouseLight,
      rearDoorGlow: aSite.rearDoorGlow,
      policeBeaconRed: ctSpawn.policeBeaconRed,
      policeBeaconBlue: ctSpawn.policeBeaconBlue,
      searchLightSpot: ctSpawn.searchLightSpot,
      rollUpDoorMesh: aSite.rollUpDoorMesh
    });
    this.scene.add(this.weatherEffects.group);

    // Window Resize handling
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // Update orbit controls
    this.controls.update();

    // Update dynamic micro-effects
    this.weatherEffects.update(delta, elapsedTime);

    // Render frame
    this.renderer.render(this.scene, this.camera);
  }
}
