// Orthographic isometric orbit controls (drag rotate, wheel zoom, eased focus). See DESIGN.md §3.
// Zero allocations per frame: all scratch vectors are module-level/closure-level.
import * as THREE from 'three';

const DEG = Math.PI / 180;
/** True isometric elevation: atan(1/sqrt(2)). */
export const ISO_ELEVATION = Math.atan(1 / Math.SQRT2); // 35.264°
/** Camera sits at +X/+Z of the target (azimuth measured from +Z toward +X). */
export const DEFAULT_AZIMUTH = 45 * DEG;
export const DEFAULT_TARGET = new THREE.Vector3(0, 1.25, 0); // projects to the center of the cabin's screen box
/** Vertical half-extent of the frustum at zoom 1 (world meters). */
export const FRUSTUM_HALF_HEIGHT = 3.95; // cabin screen box is 7.45 tall at iso -> ~6% margin
/** Minimum horizontal half-extent at zoom 1 (keeps 8 m cabin + margins on narrow screens). */
export const FRUSTUM_MIN_HALF_WIDTH = 4.7; // cabin screen box is 8.87 wide at iso

const AZ_RANGE = 35 * DEG;
const EL_MIN = 15 * DEG;
const EL_MAX = 60 * DEG;
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 4;
const DISTANCE = 30; // ortho: only needs to be outside the scene
const FOCUS_DURATION = 0.9;
const DAMPING = 10; // 1/s, exponential approach of current -> goal
const ROTATE_SPEED = 0.005; // rad per pixel

const clamp = THREE.MathUtils.clamp;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * @param {THREE.OrthographicCamera} camera
 * @param {HTMLElement} dom
 * @param {{target?: THREE.Vector3}} [opts]
 */
export function createControls(camera, dom, { target = DEFAULT_TARGET } = {}) {
  const homeTarget = target.clone();

  // Current (rendered) values and user goals (damped toward).
  const cur = { az: DEFAULT_AZIMUTH, el: ISO_ELEVATION, zoom: 1, target: homeTarget.clone() };
  const goal = { az: DEFAULT_AZIMUTH, el: ISO_ELEVATION, zoom: 1, target: homeTarget.clone() };
  // Focus transition state.
  const anim = { active: false, t: 0, from: { az: 0, el: 0, zoom: 1, target: new THREE.Vector3() } };

  const offset = new THREE.Vector3();
  const drag = { pointerId: -1, x: 0, y: 0, claimed: new Set() };

  const controls = {
    /** true while an eased focus/reset transition is running. */
    isAnimating: false,
    get zoom() {
      return cur.zoom;
    },
    get target() {
      return cur.target;
    },
    update,
    focusOn,
    resetView,
    claimPointer,
    resize,
  };

  function limitsAz(a) {
    return clamp(a, DEFAULT_AZIMUTH - AZ_RANGE, DEFAULT_AZIMUTH + AZ_RANGE);
  }

  function resize() {
    const w = dom.clientWidth || window.innerWidth;
    const h = dom.clientHeight || window.innerHeight;
    const aspect = w / Math.max(1, h);
    let halfH = FRUSTUM_HALF_HEIGHT;
    let halfW = halfH * aspect;
    if (halfW < FRUSTUM_MIN_HALF_WIDTH) {
      halfW = FRUSTUM_MIN_HALF_WIDTH;
      halfH = halfW / aspect;
    }
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.near = 0.1;
    camera.far = DISTANCE * 2 + 20;
    camera.updateProjectionMatrix();
  }

  /**
   * Smoothly move to a new target/zoom (and optionally angles, radians). ~0.9 s ease-in-out.
   * @param {THREE.Vector3} targetVec3
   * @param {number} zoom
   * @param {{azimuth?: number, elevation?: number}} [angles]
   */
  function focusOn(targetVec3, zoom, { azimuth, elevation } = {}) {
    anim.from.az = cur.az;
    anim.from.el = cur.el;
    anim.from.zoom = cur.zoom;
    anim.from.target.copy(cur.target);
    goal.target.copy(targetVec3);
    goal.zoom = clamp(zoom, ZOOM_MIN, ZOOM_MAX);
    goal.az = azimuth === undefined ? cur.az : limitsAz(azimuth);
    goal.el = elevation === undefined ? cur.el : clamp(elevation, EL_MIN, EL_MAX);
    anim.t = 0;
    anim.active = true;
    controls.isAnimating = true;
  }

  function resetView() {
    focusOn(homeTarget, 1, { azimuth: DEFAULT_AZIMUTH, elevation: ISO_ELEVATION });
  }

  /** Another handler (e.g. porthole scrub) owns this pointer gesture: stop/skip rotating. */
  function claimPointer(pointerId) {
    drag.claimed.add(pointerId);
    if (drag.pointerId === pointerId) drag.pointerId = -1;
  }

  function onPointerDown(e) {
    if (drag.claimed.has(e.pointerId)) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (drag.pointerId !== -1) return; // single-pointer rotate only
    drag.pointerId = e.pointerId;
    drag.x = e.clientX;
    drag.y = e.clientY;
  }

  function onPointerMove(e) {
    if (e.pointerId !== drag.pointerId) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    drag.x = e.clientX;
    drag.y = e.clientY;
    if (dx === 0 && dy === 0) return;
    if (anim.active) {
      // User takes over mid-transition: keep the destination, let damping finish the rest.
      anim.active = false;
      controls.isAnimating = false;
    }
    goal.az = limitsAz(goal.az - dx * ROTATE_SPEED);
    goal.el = clamp(goal.el + dy * ROTATE_SPEED, EL_MIN, EL_MAX);
  }

  function onPointerEnd(e) {
    if (e.pointerId === drag.pointerId) drag.pointerId = -1;
    drag.claimed.delete(e.pointerId);
  }

  function onWheel(e) {
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
    goal.zoom = clamp(goal.zoom * Math.exp(-e.deltaY * unit * 0.0015), ZOOM_MIN, ZOOM_MAX);
  }

  function update(dt) {
    if (anim.active) {
      anim.t = Math.min(1, anim.t + dt / FOCUS_DURATION);
      const k = easeInOutCubic(anim.t);
      cur.az = anim.from.az + (goal.az - anim.from.az) * k;
      cur.el = anim.from.el + (goal.el - anim.from.el) * k;
      cur.zoom = anim.from.zoom + (goal.zoom - anim.from.zoom) * k;
      cur.target.lerpVectors(anim.from.target, goal.target, k);
      if (anim.t >= 1) {
        anim.active = false;
        controls.isAnimating = false;
      }
    } else {
      const k = 1 - Math.exp(-DAMPING * dt);
      cur.az += (goal.az - cur.az) * k;
      cur.el += (goal.el - cur.el) * k;
      cur.zoom += (goal.zoom - cur.zoom) * k;
      cur.target.lerp(goal.target, k);
    }
    const ce = Math.cos(cur.el);
    offset.set(Math.sin(cur.az) * ce, Math.sin(cur.el), Math.cos(cur.az) * ce).multiplyScalar(DISTANCE);
    camera.position.copy(cur.target).add(offset);
    camera.up.set(0, 1, 0);
    camera.lookAt(cur.target);
    if (camera.zoom !== cur.zoom) {
      camera.zoom = cur.zoom;
      camera.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();
  }

  function onBlur() {
    drag.pointerId = -1;
    drag.claimed.clear();
  }

  dom.addEventListener('pointerdown', onPointerDown);
  dom.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerEnd);
  window.addEventListener('pointercancel', onPointerEnd);
  dom.addEventListener('lostpointercapture', onPointerEnd);
  window.addEventListener('blur', onBlur);
  dom.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('resize', resize);
  resize();
  update(0);
  return controls;
}
