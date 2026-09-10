import * as THREE from 'three';
import { TimeOfDay, SceneConfig } from '../utils/types';
import { LIGHTING_PRESETS } from '../utils/colors';

export class SkyLightingSystem {
  private scene: THREE.Scene;
  private dirLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private ambientLight: THREE.AmbientLight;
  private lanternLight: THREE.PointLight;
  private sunMesh: THREE.Mesh;
  private sunHaloMesh: THREE.Mesh;
  private starsPoints: THREE.Points;
  private fog: THREE.FogExp2;
  private skyDome: THREE.Mesh;
  private skyMaterial: THREE.ShaderMaterial;
  
  private currentTimeOfDay: TimeOfDay = 'day';
  private time = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // 1. Sky Dome with Atmospheric Gradient Shader
    const skyGeo = new THREE.SphereGeometry(380, 24, 16);
    this.skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTopColor: { value: new THREE.Color(0x4ba3e3) },
        uBottomColor: { value: new THREE.Color(0xb5e0f8) },
        uHorizonOffset: { value: 0.15 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        uniform float uHorizonOffset;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y + uHorizonOffset;
          float factor = clamp(pow(max(0.0, h), 0.7), 0.0, 1.0);
          vec3 sky = mix(uBottomColor, uTopColor, factor);
          gl_FragColor = vec4(sky, 1.0);
        }
      `,
    });
    this.skyDome = new THREE.Mesh(skyGeo, this.skyMaterial);
    this.scene.add(this.skyDome);

    // 2. Directional Sun/Moon Light with Shadows
    this.dirLight = new THREE.DirectionalLight(0xfffae8, 2.0);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 450;
    
    const d = 110;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0004;
    this.dirLight.shadow.normalBias = 0.02;

    this.scene.add(this.dirLight);
    this.scene.add(this.dirLight.target);

    // 3. Hemisphere Light for soft sky/ground bounce
    this.hemiLight = new THREE.HemisphereLight(0x8ebbdb, 0x3d4825, 0.7);
    this.scene.add(this.hemiLight);

    // 4. Ambient Light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(this.ambientLight);

    // 5. Pier Lantern Point Light
    this.lanternLight = new THREE.PointLight(0xffaa22, 2.8, 50, 1.2);
    this.lanternLight.position.set(22, 16, 22);
    this.scene.add(this.lanternLight);

    // 6. Voxel Sun / Moon Cube & Atmospheric Halo
    const sunGeo = new THREE.BoxGeometry(12, 12, 12);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfffae8 });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.scene.add(this.sunMesh);

    const haloGeo = new THREE.PlaneGeometry(36, 36);
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 64;
    haloCanvas.height = 64;
    const hCtx = haloCanvas.getContext('2d')!;
    const grad = hCtx.createRadialGradient(32, 32, 4, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 250, 220, 0.8)');
    grad.addColorStop(0.4, 'rgba(255, 230, 180, 0.3)');
    grad.addColorStop(1, 'rgba(255, 200, 150, 0)');
    hCtx.fillStyle = grad;
    hCtx.fillRect(0, 0, 64, 64);
    const haloTex = new THREE.CanvasTexture(haloCanvas);

    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    this.sunHaloMesh = new THREE.Mesh(haloGeo, haloMat);
    this.sunMesh.add(this.sunHaloMesh);

    // 7. Stars System (for Night / Fantasy mode)
    const starCount = 650;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 260 + Math.random() * 30;
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 15;
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.8,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    this.starsPoints = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starsPoints);

    // 8. Exponential Fog
    this.fog = new THREE.FogExp2(0xcae8fa, 0.0032);
    this.scene.fog = this.fog;
  }

  public applyConfig(config: SceneConfig) {
    this.setTimeOfDay(config.timeOfDay, config.fogDensity);
    if (config.sunIntensity !== undefined) {
      const preset = LIGHTING_PRESETS[config.timeOfDay];
      this.dirLight.intensity = preset.sunIntensity * config.sunIntensity;
    }
  }

  public update(delta: number, camera: THREE.Camera) {
    this.time += delta;

    // 1. Lantern organic flicker
    const flicker = Math.sin(this.time * 8.0) * 0.15 + Math.sin(this.time * 19.3) * 0.08 + Math.cos(this.time * 31.0) * 0.05;
    const baseLanternInt = (this.currentTimeOfDay === 'night' || this.currentTimeOfDay === 'sunset' || this.currentTimeOfDay === 'fantasy') ? 3.2 : 0.6;
    this.lanternLight.intensity = baseLanternInt + flicker;

    // 2. Make Sun Halo face camera
    if (this.sunHaloMesh) {
      this.sunHaloMesh.lookAt(camera.position);
    }
  }

  public setTimeOfDay(time: TimeOfDay, customFogDensity?: number) {
    this.currentTimeOfDay = time;
    const preset = LIGHTING_PRESETS[time];
    if (!preset) return;

    // Sky Dome Colors
    this.skyMaterial.uniforms.uTopColor.value.setHex(preset.skyTopColor);
    this.skyMaterial.uniforms.uBottomColor.value.setHex(preset.skyBottomColor);

    // Transition lighting colors
    this.dirLight.color.setHex(preset.sunColor);
    this.dirLight.intensity = preset.sunIntensity;
    this.dirLight.position.set(...preset.sunPosition);
    this.dirLight.target.position.set(0, 20, 0);

    this.hemiLight.color.setHex(preset.skyTopColor);
    this.hemiLight.groundColor.setHex(preset.skyBottomColor);
    this.hemiLight.intensity = preset.ambientIntensity;

    this.ambientLight.color.setHex(preset.ambientColor);
    this.ambientLight.intensity = preset.ambientIntensity * 0.45;

    // Sun / Moon mesh position
    this.sunMesh.position.set(
      preset.sunPosition[0] * 1.8,
      preset.sunPosition[1] * 1.8,
      preset.sunPosition[2] * 1.8
    );
    (this.sunMesh.material as THREE.MeshBasicMaterial).color.setHex(
      time === 'night' ? 0xd0e4ff : (time === 'sunset' ? 0xff6622 : 0xfffae8)
    );

    // Stars intensity
    if (time === 'night' || time === 'sunset' || time === 'fantasy') {
      (this.starsPoints.material as THREE.PointsMaterial).opacity = time === 'night' ? 0.95 : (time === 'fantasy' ? 0.8 : 0.45);
    } else {
      (this.starsPoints.material as THREE.PointsMaterial).opacity = 0.0;
    }

    // Fog & Background
    this.scene.background = new THREE.Color(preset.skyBottomColor);
    this.fog.color.setHex(preset.fogColor);
    this.fog.density = customFogDensity ?? (time === 'dawn' ? 0.0038 : 0.0032);
  }

  public setFogDensity(density: number) {
    this.fog.density = density;
  }

  public getSunMesh() {
    return this.sunMesh;
  }

  public destroy() {
    this.scene.remove(this.skyDome);
    this.scene.remove(this.dirLight);
    this.scene.remove(this.hemiLight);
    this.scene.remove(this.ambientLight);
    this.scene.remove(this.lanternLight);
    this.scene.remove(this.sunMesh);
    this.scene.remove(this.sunHaloMesh);
    this.scene.remove(this.starsPoints);
    this.skyDome.geometry.dispose();
    this.skyMaterial.dispose();
    this.sunMesh.geometry.dispose();
    (this.sunMesh.material as THREE.Material).dispose();
    this.sunHaloMesh.geometry.dispose();
    (this.sunHaloMesh.material as THREE.Material).dispose();
    this.starsPoints.geometry.dispose();
    (this.starsPoints.material as THREE.Material).dispose();
  }
}
