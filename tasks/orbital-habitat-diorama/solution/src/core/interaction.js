// Pointer interaction: nearest visible surface blocks picking; only coplanar overlays compete.
import * as THREE from 'three';
const CLICK_SLOP_PX = 6;
const CLICK_MAX_MS = 400;
const SCRUB_PX_PER_CYCLE = 900;
const PRIORITY_DEPTH_EPS = 0.03;

export function createInteraction({ dom, scene, camera, controls, clock, state, setState }) {
  const raycaster = new THREE.Raycaster(), hits = [], candidates = [];
  const pointerNdc = new THREE.Vector2(-10, -10);
  const press = { active: false, pointerId: -1, x: 0, y: 0, lastX: 0,
    time: 0, entry: null, hit: null, scrubbing: false, maxDistance: 0 };
  let hovered = null, movePending = false, pointerInside = false;
  const api = { pointerNdc, pointerWorldRay: raycaster.ray,
    get hovered() { return hovered; }, update, rebuildCandidates };

  // Called once after construction/batching, never from an input event.
  function rebuildCandidates() {
    candidates.length = 0;
    scene.traverse(o => {
      if (o.isMesh && !o.userData.pickThrough && o.material.colorWrite !== false) candidates.push(o);
    });
  }
  function visible(o) {
    if (o.material.visible === false) return false;
    for (let p = o; p; p = p.parent) if (!p.visible) return false;
    return true;
  }
  function setNdc(e) {
    const r = dom.getBoundingClientRect();
    pointerNdc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }
  function findEntry(o) {
    for (; o; o = o.parent) if (o.userData.interactive) return o.userData.interactive;
    return null;
  }
  const pick = { entry: null, hit: null };
  function raycast() {
    raycaster.setFromCamera(pointerNdc, camera);
    pick.entry = pick.hit = null;
    if (!pointerInside) return pick;
    hits.length = 0;
    raycaster.intersectObjects(candidates, false, hits);
    const first = hits.find(h => visible(h.object));
    if (!first) return pick;
    pick.hit = first; pick.entry = findEntry(first.object);
    if (!pick.entry) return pick; // An opaque non-interactive surface occludes everything behind it.
    for (const hit of hits) {
      if (hit.distance > first.distance + PRIORITY_DEPTH_EPS) break;
      if (!visible(hit.object)) continue;
      const entry = findEntry(hit.object);
      if (entry && entry.priority > pick.entry.priority) { pick.entry = entry; pick.hit = hit; }
    }
    return pick;
  }
  function setHover(entry) {
    hovered = entry;
    if (!press.scrubbing) dom.style.cursor = entry ? entry.cursor : press.active ? 'grabbing' : 'grab';
  }
  function update() {
    if (movePending) {
      movePending = false;
      if (press.scrubbing) raycaster.setFromCamera(pointerNdc, camera);
      else setHover(raycast().entry);
    }
    if (controls.isAnimating) movePending = true;
  }
  function trackMovement(e) {
    press.maxDistance = Math.max(press.maxDistance, Math.hypot(e.clientX - press.x, e.clientY - press.y));
  }
  function onPointerMove(e) {
    pointerInside = true; setNdc(e); movePending = true;
    if (!press.active || e.pointerId !== press.pointerId) return;
    trackMovement(e);
    if (press.entry?.scrub) {
      if (!press.scrubbing && press.maxDistance > CLICK_SLOP_PX) {
        press.scrubbing = true; clock.beginScrub(); dom.style.cursor = 'ew-resize'; press.lastX = press.x;
      }
      if (press.scrubbing) { clock.scrubBy((e.clientX - press.lastX) / SCRUB_PX_PER_CYCLE); press.lastX = e.clientX; }
    }
  }
  function onPointerDown(e) {
    if (press.active || (e.pointerType === 'mouse' && e.button !== 0)) return;
    pointerInside = true; setNdc(e);
    const { entry, hit } = raycast();
    Object.assign(press, { active: true, pointerId: e.pointerId, x: e.clientX, lastX: e.clientX,
      y: e.clientY, time: performance.now(), entry, hit, scrubbing: false, maxDistance: 0 });
    if (entry?.scrub) controls.claimPointer(e.pointerId);
    try { dom.setPointerCapture(e.pointerId); } catch { /* Synthetic pointers cannot be captured. */ }
    setHover(entry);
  }
  function endPress(e, cancelled) {
    if (!press.active || e.pointerId !== press.pointerId) return;
    const wasScrub = press.scrubbing, entry = press.entry, hit = press.hit;
    if (!cancelled) trackMovement(e);
    press.active = press.scrubbing = false; press.entry = press.hit = null;
    if (wasScrub) clock.endScrub();
    if (dom.hasPointerCapture(e.pointerId)) dom.releasePointerCapture(e.pointerId);
    if (!cancelled && !wasScrub && press.maxDistance <= CLICK_SLOP_PX
      && performance.now() - press.time < CLICK_MAX_MS) handleClick(entry, hit);
    movePending = true;
  }
  function handleClick(entry, hit) {
    if (!entry) {
      if (state.focused !== null) { controls.resetView(); setState('focused', null); }
      return;
    }
    if (entry.focus) {
      if (state.focused === entry.id) {
        let retain = false;
        for (let o = hit.object; o; o = o.parent) retain ||= !!o.userData.keepFocus;
        if (!retain) { controls.resetView(); setState('focused', null); }
      } else {
        const f = entry.focus;
        controls.focusOn(f.target, f.zoom, { azimuth: f.azimuth, elevation: f.elevation });
        setState('focused', entry.id);
      }
    }
    if (entry.onClick) entry.onClick(hit);
  }
  function onPointerUp(e) {
    const r = dom.getBoundingClientRect();
    const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    endPress(e, outside);
  }
  const onCancel = e => endPress(e, true);
  function onBlur() {
    endPress({ pointerId: press.pointerId }, true);
    pointerInside = false; pointerNdc.set(-10, -10); movePending = true;
  }
  function onPointerLeave() {
    if (press.active) return;
    pointerInside = false; pointerNdc.set(-10, -10); movePending = true;
  }
  dom.addEventListener('pointermove', onPointerMove);
  dom.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onCancel);
  dom.addEventListener('lostpointercapture', onCancel);
  window.addEventListener('blur', onBlur);
  dom.addEventListener('pointerleave', onPointerLeave);
  dom.style.cursor = 'grab';
  return api;
}
