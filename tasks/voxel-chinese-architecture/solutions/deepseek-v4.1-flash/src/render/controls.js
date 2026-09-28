import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/** 机位清单：方位角以 +z 为 0、向 +x 为正；仰角为与水平面的夹角（弧度）。 */
export const VIEWS = [
  { key: "bird", label: "鸟瞰" },
  { key: "axis", label: "中轴" },
  { key: "top", label: "总平面" },
  { key: "gate", label: "山门" },
  { key: "mainHall", label: "主殿" },
  { key: "courtyard", label: "庭院" },
  { key: "pagoda", label: "后院宝塔" },
];

const scratchForward = new Vector3();
const scratchRight = new Vector3();
const scratchUp = new Vector3();
const scratchCorner = new Vector3();
const scratchOffset = new Vector3();
const WORLD_UP = new Vector3(0, 1, 0);

export function readUrlOptions(search = typeof location === "undefined" ? "" : location.search) {
  const params = new URLSearchParams(search);
  return { view: params.get("view"), tod: params.get("tod") };
}

/**
 * 按包围盒求相机距离：把 8 个角点投到相机的三个轴上，
 * 取同时满足横向与纵向 FOV 的最小距离，保证首屏一定装得下整个建筑群。
 */
export function fitDistance(box, focus, azimuth, elevation, fovDeg, aspect, margin = 1.08) {
  scratchForward
    .set(-Math.cos(elevation) * Math.sin(azimuth), -Math.sin(elevation), -Math.cos(elevation) * Math.cos(azimuth))
    .normalize();
  scratchRight.crossVectors(WORLD_UP, scratchForward).normalize();
  scratchUp.crossVectors(scratchForward, scratchRight).normalize();
  const vFov = MathUtils.degToRad(fovDeg);
  const tanV = Math.tan(vFov / 2);
  const tanH = tanV * aspect;

  let distance = 0;
  for (let i = 0; i < 8; i++) {
    scratchCorner.set(
      i & 1 ? box.maxX : box.minX,
      i & 2 ? box.maxY : box.minY,
      i & 4 ? box.maxZ : box.minZ,
    );
    scratchOffset.copy(scratchCorner).sub(focus);
    const along = scratchOffset.dot(scratchForward);
    const lateral = Math.abs(scratchOffset.dot(scratchRight));
    const vertical = Math.abs(scratchOffset.dot(scratchUp));
    distance = Math.max(distance, lateral / tanH - along, vertical / tanV - along);
  }
  return Math.max(distance * margin, 40);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export class CameraRig {
  constructor({ canvas, anchors, aspect = 16 / 9, fov = 46 }) {
    this.anchors = anchors;
    this.camera = new PerspectiveCamera(fov, aspect, 0.6, 2600);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.rotateSpeed = 0.72;
    this.controls.zoomSpeed = 0.9;
    this.controls.minDistance = 30;
    this.controls.maxDistance = 760;
    this.controls.maxPolarAngle = 1.47;
    this.controls.screenSpacePanning = false;
    this.transition = null;
    this.view = null;
    this.controls.addEventListener("start", () => {
      this.transition = null;
    });
  }

  applyView(key, { immediate = false } = {}) {
    const anchor = this.anchors[key];
    if (!anchor) return false;
    const focus = new Vector3().fromArray(anchor.focus);
    // `fit` 既可以直接是包围盒，也可以是 ANCHORS 里某个盒的名字（如 "ensemble"）。
    const fitBox = typeof anchor.fit === "string" ? this.anchors[anchor.fit] : anchor.fit;
    const distance = fitBox
      ? fitDistance(fitBox, focus, anchor.azimuth, anchor.elevation, this.camera.fov, this.camera.aspect, anchor.margin ?? 1.08)
      : anchor.distance;
    const direction = new Vector3(
      Math.cos(anchor.elevation) * Math.sin(anchor.azimuth),
      Math.sin(anchor.elevation),
      Math.cos(anchor.elevation) * Math.cos(anchor.azimuth),
    );
    const position = focus.clone().addScaledVector(direction, distance);

    if (immediate) {
      this.camera.position.copy(position);
      this.controls.target.copy(focus);
      this.controls.update();
      this.transition = null;
    } else {
      this.transition = {
        fromPosition: this.camera.position.clone(),
        toPosition: position,
        fromTarget: this.controls.target.clone(),
        toTarget: focus,
        elapsed: 0,
        duration: 1.15,
      };
    }
    this.view = key;
    return true;
  }

  update(delta) {
    const transition = this.transition;
    if (transition) {
      transition.elapsed = Math.min(transition.duration, transition.elapsed + delta);
      const t = easeInOutCubic(transition.elapsed / transition.duration);
      this.camera.position.lerpVectors(transition.fromPosition, transition.toPosition, t);
      this.controls.target.lerpVectors(transition.fromTarget, transition.toTarget, t);
      if (transition.elapsed >= transition.duration) this.transition = null;
    }
    this.controls.update();
  }

  setAspect(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}
