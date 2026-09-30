import * as THREE from 'three';
import { globeVertex, globeFragment, atmosphereFragment } from './shaders.js';

function stencilSettings(ref) {
  return {
    depthTest: false, depthWrite: false,
    stencilWrite: true, stencilRef: ref, stencilFunc: THREE.EqualStencilFunc,
    stencilFail: THREE.KeepStencilOp, stencilZFail: THREE.KeepStencilOp,
    stencilZPass: THREE.KeepStencilOp,
  };
}

function loadTexture(ctx, filename, color) {
  const map = ctx.loader.load(`${ctx.baseUrl}textures/${filename}`);
  map.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.magFilter = THREE.LinearFilter;
  map.generateMipmaps = true;
  map.anisotropy = ctx.quality.maxAnisotropy;
  return map;
}

/** Camera-pinned 3D globes, clipped to the three physical wall openings. */
export function createEarth(ctx) {
  const { scene, camera, clock, portholes } = ctx;
  const textures = {
    dayMap: { value: loadTexture(ctx, 'earth_day.jpg', true) },
    nightMap: { value: loadTexture(ctx, 'earth_night.jpg', true) },
    cloudMap: { value: loadTexture(ctx, 'earth_clouds.jpg', false) },
  };
  const sunDirection = new THREE.Vector3();
  const viewDirection = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3();
  const shared = {
    ...textures,
    sunDirection: { value: sunDirection }, viewDirection: { value: viewDirection },
    cloudOffset: { value: 0 }, twilight: { value: 0 },
  };
  const geometry = new THREE.SphereGeometry(1, 96, 64);
  const windows = [];
  for (const p of portholes) {
    // The mask sits in the frame's front plane (rim face, radius = rim bore) and is drawn after the
    // opaque cabin (renderOrder 0.5), so it only marks pixels where nothing stands in front of the
    // window. It paints those pixels space-black (hiding the 0.36 m deep bore: wall hole + frame tube),
    // then the globe ignores depth and paints every marked pixel: the opening shows Earth plus black space.
    const big = p.id === 'big';
    const mask = new THREE.Mesh(new THREE.CircleGeometry(p.radius + 0.022, 96), new THREE.MeshBasicMaterial({
      color: 0x000000, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
      stencilWrite: true, stencilRef: p.stencil, stencilFunc: THREE.AlwaysStencilFunc,
      stencilZPass: THREE.ReplaceStencilOp,
    }));
    mask.name = `portholeMask-${p.id}`;
    mask.position.copy(p.center);
    mask.position.z = -1.95 + (big ? 0.17 : 0.105);
    mask.renderOrder = 0.5;
    mask.userData.pickThrough = !big;
    scene.add(mask);
    if (p.id === 'big') {
      ctx.registry.addInteractive(mask, {
        id: 'porthole', scrub: true, priority: 5, cursor: 'ew-resize',
        onClick: () => ctx.toggleState('fastForward'),
      });
    }
    const group = new THREE.Group();
    group.name = `earth-${p.id}`;
    const surface = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
      uniforms: shared, vertexShader: globeVertex, fragmentShader: globeFragment,
      ...stencilSettings(p.stencil),
    }));
    surface.name = `earthSurface-${p.id}`;
    surface.userData.pickThrough = true;
    surface.renderOrder = 1;
    const atmosphere = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
      uniforms: shared, vertexShader: globeVertex, fragmentShader: atmosphereFragment,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      ...stencilSettings(p.stencil),
    }));
    atmosphere.name = `earthAtmosphere-${p.id}`;
    atmosphere.userData.pickThrough = true;
    atmosphere.scale.setScalar(1.024);
    atmosphere.renderOrder = 2;
    group.add(surface, atmosphere);
    scene.add(group);
    group.scale.setScalar(big ? 1.2 : 0.36);
    windows.push({ p, group, surface, atmosphere, down: big ? 0.76 : 0.16,
      yaw: p.id === 'smallA' ? 0.9 : p.id === 'smallB' ? -0.6 : 0,
      pitch: p.id === 'smallA' ? 0.25 : p.id === 'smallB' ? -0.15 : 0.12 });
  }
  function update(_dt, t = clock.elapsed) {
    // The clock accumulates tick/scrub spin, while explicit setPhase resets the seek deterministically.
    const spin = clock.earthRotation * 0.25;
    viewDirection.set(0, 0, 1).applyQuaternion(camera.quaternion);
    right.set(1, 0, 0).applyQuaternion(camera.quaternion);
    up.set(0, 1, 0).applyQuaternion(camera.quaternion);
    // Orbital eclipse changes the Earth-facing hemisphere, retaining the clock's sun sweep.
    sunDirection.copy(viewDirection).multiplyScalar((clock.sunFactor * 2 - 1) * 1.25)
      .addScaledVector(right, 0.42 + clock.sunDir.x * 0.6)
      .addScaledVector(up, 0.22 + clock.sunDir.y * 0.25).normalize();
    shared.cloudOffset.value = t * 0.0005;
    shared.twilight.value = Math.max(clock.dawnFactor, clock.glare,
      1 - Math.abs(clock.sunFactor * 2 - 1));
    for (let i = 0; i < windows.length; i++) {
      const w = windows[i];
      w.group.position.copy(w.p.center).addScaledVector(viewDirection, -12)
        .addScaledVector(up, -w.down).addScaledVector(right, -w.p.radius * 0.08);
      w.group.quaternion.copy(camera.quaternion);
      w.group.rotateZ(0.18);
      w.surface.rotation.set(w.pitch, 1.75 + spin + w.yaw, 0);
      w.atmosphere.quaternion.copy(w.surface.quaternion);
    }
  }
  update(0);
  return { update };
}
