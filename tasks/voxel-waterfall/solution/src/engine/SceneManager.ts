// Three.js 场景管理总调度器

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TerrainGenerator, TerrainConfig, VoxelWorld } from './TerrainGenerator';
import { VoxelMesher, VoxelMeshes } from './VoxelMesher';
import { EnvironmentSystem, TimePreset } from './Environment';
import { CloudSystem, CloudConfig } from './CloudSystem';
import { WaterSystem } from './WaterSystem';
import { ParticleSystem } from './ParticleSystem';
import { SimplexNoise } from './Noise';

export interface StatsData {
  fps: number;
  voxelCount: number;
  triangleCount: number;
  drawCalls: number;
}

export class SceneManager {
  private container: HTMLDivElement | null = null;
  public renderer: THREE.WebGLRenderer | null = null;
  public scene: THREE.Scene | null = null;
  public camera: THREE.PerspectiveCamera | null = null;
  public controls: OrbitControls | null = null;

  private envSystem: EnvironmentSystem | null = null;
  private cloudSystem: CloudSystem | null = null;
  private waterSystem: WaterSystem | null = null;
  private particleSystem: ParticleSystem | null = null;

  private currentMeshes: VoxelMeshes | null = null;
  private currentWorld: VoxelWorld | null = null;
  private animFrameId: number | null = null;

  // 性能统计
  private lastTime: number = performance.now();
  private frameCount: number = 0;
  private fps: number = 60;
  private onStatsCallback: ((stats: StatsData) => void) | null = null;

  // 相机平滑运镜动画
  private targetCamPos: THREE.Vector3 | null = null;
  private targetCamLookAt: THREE.Vector3 | null = null;
  private isTransitioningCamera: boolean = false;

  private autoRotate: boolean = false;
  private autoRotateSpeed: number = 1.0;

  constructor() {}

  public init(container: HTMLDivElement) {
    this.container = container;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. 场景
    this.scene = new THREE.Scene();

    // 2. 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      logarithmicDepthBuffer: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    container.appendChild(this.renderer.domElement);

    // 3. 相机 (精心计算的最佳宏观鸟瞰透视机位，页面打开即可完整观赏 200x200 全貌)
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.set(192, 108, 202);

    // 4. 控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(100, 22, 100);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.05; // 禁止穿透地底基岩
    this.controls.minDistance = 20;
    this.controls.maxDistance = 550;
    this.controls.update();

    // 5. 初始化光影环境
    this.envSystem = new EnvironmentSystem(this.scene);
    this.scene.add(this.envSystem.group);

    // 6. 初始化水体与粒子系统
    this.waterSystem = new WaterSystem();
    this.particleSystem = new ParticleSystem();
    this.scene.add(this.particleSystem.group);

    // 7. 窗口尺寸调整监听
    window.addEventListener('resize', this.onResize);

    // 8. 启动渲染循环
    this.lastTime = performance.now();
    this.animate();
  }

  public generateTerrain(config: TerrainConfig) {
    if (!this.scene) return;

    // 移除旧网格
    if (this.currentMeshes) {
      this.scene.remove(this.currentMeshes.terrainMesh);
      this.scene.remove(this.currentMeshes.waterMesh);
      this.currentMeshes.terrainMesh.geometry.dispose();
      (this.currentMeshes.terrainMesh.material as THREE.Material).dispose();
      this.waterSystem?.dispose();
    }

    // 生成体素世界数据
    this.currentWorld = TerrainGenerator.generate(config);

    // 网格化
    this.currentMeshes = VoxelMesher.buildMeshes(this.currentWorld);
    this.scene.add(this.currentMeshes.terrainMesh);
    this.scene.add(this.currentMeshes.waterMesh);

    // 挂载水体动画
    this.waterSystem?.setWaterMesh(this.currentMeshes.waterMesh);

    // 设置飞瀑冲击粒子发射点
    this.particleSystem?.setImpactPoints(this.currentWorld.waterfallPoints);

    // 初始化/更新穿云系统
    const noise = new SimplexNoise(config.seed + 555);
    if (!this.cloudSystem) {
      const cloudConf: CloudConfig = {
        baseY: 34,
        thickness: 4,
        density: 0.52,
        speed: 1.0,
        opacity: 0.85,
        worldSizeX: config.sizeX,
        worldSizeZ: config.sizeZ
      };
      this.cloudSystem = new CloudSystem(noise, cloudConf);
      this.scene.add(this.cloudSystem.group);
    } else {
      this.cloudSystem.rebuild();
    }
  }

  public setAtmosphere(preset: TimePreset) {
    this.envSystem?.applyPreset(preset);
  }

  public setSunAngle(elev: number, azim: number) {
    this.envSystem?.setSunAngle(elev, azim);
  }

  public setFogDensity(density: number) {
    this.envSystem?.setFogDensity(density);
  }

  public setWaterSpeed(speed: number) {
    this.waterSystem?.setFlowSpeed(speed);
  }

  public setCloudConfig(config: Partial<CloudConfig>) {
    this.cloudSystem?.setConfig(config);
  }

  public setAutoRotate(enabled: boolean, speed: number = 1.0) {
    this.autoRotate = enabled;
    this.autoRotateSpeed = speed;
    if (this.controls) {
      this.controls.autoRotate = enabled;
      this.controls.autoRotateSpeed = speed;
    }
  }

  public setCameraPreset(presetName: 'overview' | 'waterfall' | 'peak' | 'lake' | 'top') {
    if (!this.camera || !this.controls) return;

    let targetPos = new THREE.Vector3(192, 108, 202);
    let targetLook = new THREE.Vector3(100, 22, 100);

    switch (presetName) {
      case 'overview': // 全景宏观
        targetPos.set(192, 108, 202);
        targetLook.set(100, 22, 100);
        break;
      case 'waterfall': // 瀑布特写
        targetPos.set(108, 38, 148);
        targetLook.set(106, 24, 110);
        break;
      case 'peak': // 主峰穿云
        targetPos.set(145, 68, 140);
        targetLook.set(85, 48, 78);
        break;
      case 'lake': // 山脚湖畔
        targetPos.set(90, 18, 175);
        targetLook.set(105, 14, 120);
        break;
      case 'top': // 俯视俯瞰
        targetPos.set(100, 250, 105);
        targetLook.set(100, 15, 100);
        break;
    }

    this.targetCamPos = targetPos;
    this.targetCamLookAt = targetLook;
    this.isTransitioningCamera = true;
  }

  public onStatsUpdate(cb: (stats: StatsData) => void) {
    this.onStatsCallback = cb;
  }

  private onResize = () => {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const now = performance.now();
    const delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    const time = now * 0.001;

    // 1. 相机平滑过渡
    if (this.isTransitioningCamera && this.camera && this.controls && this.targetCamPos && this.targetCamLookAt) {
      this.camera.position.lerp(this.targetCamPos, 0.06);
      this.controls.target.lerp(this.targetCamLookAt, 0.06);
      if (this.camera.position.distanceTo(this.targetCamPos) < 0.5) {
        this.camera.position.copy(this.targetCamPos);
        this.controls.target.copy(this.targetCamLookAt);
        this.isTransitioningCamera = false;
      }
    }

    // 2. 控制器更新
    this.controls?.update();

    // 3. 子系统动画
    this.waterSystem?.update(delta, time);
    this.cloudSystem?.update(delta);
    if (this.envSystem) {
      this.particleSystem?.update(delta, time, this.envSystem.getCurrentPreset());
    }

    // 4. 渲染
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    // 5. 帧率与性能统计
    this.frameCount++;
    if (this.frameCount >= 20) {
      const currentFps = Math.round(20 / ((now - (this.lastTime - delta * 1000 * 20)) / 1000));
      this.fps = Math.max(1, Math.min(144, currentFps));
      this.frameCount = 0;

      if (this.onStatsCallback && this.renderer && this.currentMeshes) {
        this.onStatsCallback({
          fps: this.fps,
          voxelCount: this.currentMeshes.voxelCount,
          triangleCount: this.currentMeshes.triangleCount,
          drawCalls: this.renderer.info.render.calls
        });
      }
    }
  };

  public dispose() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('resize', this.onResize);

    this.waterSystem?.dispose();
    this.cloudSystem?.dispose();
    this.particleSystem?.dispose();

    if (this.currentMeshes) {
      this.currentMeshes.terrainMesh.geometry.dispose();
      (this.currentMeshes.terrainMesh.material as THREE.Material).dispose();
      this.currentMeshes.waterMesh.geometry.dispose();
      (this.currentMeshes.waterMesh.material as THREE.Material).dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }
}
