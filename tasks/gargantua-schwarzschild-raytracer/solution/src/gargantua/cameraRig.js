import * as THREE from 'three';
import { OrbitControls } from '../../vendor/three/addons/OrbitControls.js';
import { CAMERA_PRESETS } from './state.js';

const DEG = Math.PI / 180;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

/**
 * OrbitControls wrapper that feeds the shader a real pinhole camera.
 *
 * The OrbitControls camera position/basis/FOV are the single source of truth
 * for the ray generation uniforms; parameters (distance/azimuth/elevation)
 * are a spherical read-out of the same camera, so HUD sliders and drag input
 * always describe one true view. A cinematic loop slowly orbits the camera;
 * any user interaction disables it so the user never loses control.
 */
export class CameraRig {
  constructor(camera, domElement, { onUserInteract, onChange }) {
    this.camera = camera;
    this.controls = new OrbitControls(camera, domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 3.2;
    this.controls.maxDistance = 80;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 0.8;

    this.cinematic = false;
    this.cinematicTime = 0;
    this.cinematicBase = null; // { distance, azimuth(rad), elevation(rad) }

    this.handlePointerDown = () => {
      if (this.cinematic) this.stopCinematic();
      onUserInteract?.();
    };
    this.controls.addEventListener('start', this.handlePointerDown);
    this.controls.addEventListener('change', () => onChange?.());

    this.applyState(CAMERA_PRESETS[0]);
  }

  /** Position the camera from spherical parameters (degrees). */
  applyState({ distance, azimuth, elevation, fov }) {
    const polar = (90 - THREE.MathUtils.clamp(elevation, -89, 89)) * DEG;
    const azim = azimuth * DEG;
    this.camera.position.setFromSphericalCoords(distance, polar, azim);
    this.camera.lookAt(0, 0, 0);
    if (typeof fov === 'number' && this.camera.fov !== fov) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
    this.controls.update();
  }

  /** Spherical read-out of the live camera (degrees). */
  getState() {
    const spherical = new THREE.Spherical().setFromVector3(this.camera.position);
    return {
      distance: spherical.radius,
      azimuth: THREE.MathUtils.radToDeg(spherical.theta),
      elevation: 90 - THREE.MathUtils.radToDeg(spherical.phi),
      fov: this.camera.fov,
    };
  }

  isCinematic() {
    return this.cinematic;
  }

  startCinematic() {
    this.cinematic = true;
    this.cinematicTime = 0;
    const state = this.getState();
    this.cinematicBase = {
      distance: state.distance,
      azimuth: state.azimuth * DEG,
      elevation: state.elevation * DEG,
    };
  }

  stopCinematic() {
    this.cinematic = false;
    this.cinematicBase = null;
  }

  toggleCinematic() {
    if (this.cinematic) this.stopCinematic();
    else this.startCinematic();
    return this.cinematic;
  }

  /** Per-frame update: damping, plus the cinematic drift when active. */
  update(dt) {
    if (this.cinematic && this.cinematicBase) {
      this.cinematicTime += dt;
      const t = this.cinematicTime;
      const azimuth = this.cinematicBase.azimuth + t * 0.045;
      const elevation =
        this.cinematicBase.elevation + 0.07 * Math.sin(t * 0.11);
      const distance = this.cinematicBase.distance;
      const polar = Math.PI / 2 - elevation;
      this.camera.position.setFromSphericalCoords(distance, polar, azimuth);
      this.camera.lookAt(0, 0, 0);
    }
    this.controls.update();
  }

  presetAt(index) {
    return CAMERA_PRESETS[index] ?? null;
  }

  dispose() {
    this.controls.removeEventListener('start', this.handlePointerDown);
    this.controls.dispose();
  }
}
