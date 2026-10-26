import * as THREE from 'three';
import { createHabitat } from './habitat.js';
import { advanceOrbit, clamp, daylight, isDrag, scrubOrbit, TAU } from './orbit.js';
import { drawScreen } from './textures.js';

const canvas = document.querySelector('canvas');
const errorPanel = document.querySelector('#error');
function fail(error) {
  console.error(error);
  errorPanel.textContent = `The habitat could not start: ${error.message}. Please use a WebGL2-capable browser and check that local textures loaded.`;
  errorPanel.style.display = 'block'; canvas.style.display = 'none';
}

async function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-6, 6, 3.75, -3.75, 0.1, 120);
  const space = new THREE.Scene(); space.background = new THREE.Color('#030b15');
  const planetTarget = new THREE.WebGLRenderTarget(1440, 900, { type: THREE.HalfFloatType });
  const dimensions = new THREE.Vector2();
  const portalMaterial = new THREE.ShaderMaterial({
    uniforms: { image: { value: planetTarget.texture }, resolution: { value: dimensions } },
    vertexShader: 'void main(){gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}',
    fragmentShader: `uniform sampler2D image; uniform vec2 resolution;
      void main(){
        gl_FragColor = vec4(texture2D(image, gl_FragCoord.xy / resolution).rgb, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const loader = new THREE.TextureLoader();
  const [dayMap, nightMap, cloudsMap] = await Promise.all(['earth-day.jpg', 'earth-night.jpg', 'earth-clouds.jpg'].map((name) => loader.loadAsync(`${import.meta.env.BASE_URL}textures/${name}`)));
  for (const map of [dayMap, nightMap, cloudsMap]) {
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = THREE.RepeatWrapping; map.anisotropy = 8;
  }
  const earthUniforms = { dayMap: { value: dayMap }, nightMap: { value: nightMap }, cloudsMap: { value: cloudsMap }, day: { value: 1 }, cloudShift: { value: 0 } };
  const earthMaterial = new THREE.ShaderMaterial({
    uniforms: earthUniforms,
    vertexShader: `varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
      void main(){vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-mv.xyz); gl_Position = projectionMatrix * mv;}`,
    fragmentShader: `uniform sampler2D dayMap; uniform sampler2D nightMap; uniform sampler2D cloudsMap;
      uniform float day; uniform float cloudShift; varying vec2 vUv; varying vec3 vNormal; varying vec3 vView;
      void main(){
        vec3 n = normalize(vNormal);
        vec3 land = texture2D(dayMap, vUv).rgb;
        vec3 cities = texture2D(nightMap, vUv).rgb;
        float cloud = texture2D(cloudsMap, vec2(fract(vUv.x + cloudShift), vUv.y)).r;
        float terminator = smoothstep(-0.15, 0.2, n.x * 0.45 + n.z * 0.2 + (day - 0.5) * 2.0);
        float facing = max(dot(n, normalize(vView)), 0.0);
        vec3 daylightColor = land * vec3(0.78, 1.07, 1.16) * (0.85 + facing * 0.6);
        daylightColor = mix(daylightColor, vec3(1.1, 1.25, 1.3), cloud * 0.66);
        vec3 nightColor = land * vec3(0.035, 0.08, 0.16) + cities * vec3(4.8, 3.2, 1.65);
        nightColor += vec3(0.04, 0.08, 0.14) * cloud;
        vec3 color = mix(nightColor, daylightColor, terminator);
        float rim = pow(1.0 - facing, 3.5);
        color += vec3(0.03, 0.23, 0.53) * rim * (0.25 + day * 0.75);
        gl_FragColor = vec4(color, 1.0);
      }`,
  });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(4.32, 96, 64), earthMaterial);
  earth.position.set(-5.465, -4.781, -3.643); space.add(earth);
  const sightline = new THREE.Vector3(1, 1, 1).normalize();
  const fromCenter = new THREE.Vector3(1.42, 2.13, -1.85).sub(earth.position);
  const normal = fromCenter.clone().addScaledVector(sightline, -fromCenter.dot(sightline));
  normal.addScaledVector(sightline, Math.sqrt(4.32 ** 2 - normal.lengthSq())).normalize();
  const latitude = 0.235 * Math.PI, longitude = 0.54 * TAU;
  const earthOrientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(-Math.cos(longitude) * Math.cos(latitude), Math.sin(latitude), Math.sin(longitude) * Math.cos(latitude)), normal);
  const earthSpin = new THREE.Quaternion(), polarAxis = new THREE.Vector3(0, 1, 0);
  const atmosphereMaterial = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide,
    uniforms: { strength: { value: 1 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; void main(){vec4 p = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-p.xyz); gl_Position = projectionMatrix*p;}`,
    fragmentShader: `varying vec3 vN; varying vec3 vV; uniform float strength;
      void main(){float edge = pow(max(0.0, 1.0 - abs(dot(normalize(vN), normalize(vV)))), 5.0); gl_FragColor = vec4(vec3(0.08,0.45,1.0) * strength, edge * 0.68);}`,
  });
  const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(4.38, 80, 48), atmosphereMaterial); atmosphere.position.copy(earth.position); space.add(atmosphere);

  const habitat = createHabitat(scene, portalMaterial);
  const ambient = new THREE.HemisphereLight('#bad8de', '#9d7650', 1.45); scene.add(ambient);
  const key = new THREE.DirectionalLight('#fff0ce', 2.0); key.position.set(-3, 8, 5); scene.add(key);
  key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0003; key.shadow.normalBias = 0.025;
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 6, bottom: -6, near: 0.5, far: 22 });
  const rim = new THREE.DirectionalLight('#83c5eb', 0.8); rim.position.set(0, 4, -5); scene.add(rim);
  const earthLight = new THREE.PointLight('#77bce9', 4, 5, 2); earthLight.position.set(1.42, 2.15, -1.2); scene.add(earthLight);
  const sun = new THREE.SpotLight('#fff2cb', 36, 10, 0.65, 0.06, 2);
  sun.position.set(1.42, 2.2, -1.82); sun.target.position.set(0.5, 0, 0.5); scene.add(sun, sun.target);

  const sunUniforms = { strength: { value: 1 }, direction: { value: new THREE.Vector3(-0.2, -0.82, 0.58) } };
  const sunlight = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 4.1), new THREE.ShaderMaterial({
    uniforms: sunUniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `varying vec3 world; void main(){vec4 p = modelMatrix * vec4(position,1.0); world = p.xyz; gl_Position = projectionMatrix*viewMatrix*p;}`,
    fragmentShader: `varying vec3 world; uniform vec3 direction; uniform float strength;
      void main(){
        float t = (world.z + 1.85) / direction.z;
        vec3 aperture = world - t * direction;
        float r = length(aperture.xy - vec2(1.42,2.13));
        float edge = 1.0 - smoothstep(1.005,1.025,r);
        float ribs = 1.0 - 0.08 * step(0.97, fract(world.x * 16.0));
        gl_FragColor = vec4(vec3(1.0,0.81,0.46) * strength * 1.8, edge * strength * ribs * 0.68);
      }`,
  }));
  sunlight.rotation.x = -Math.PI / 2; sunlight.position.set(0, 0.058, 0.06); sunlight.raycast = () => {}; scene.add(sunlight);

  const starPositions = [];
  let starSeed = 12;
  const rand = () => { starSeed = (starSeed * 16807) % 2147483647; return starSeed / 2147483647; };
  for (let i = 0; i < 130; i++) starPositions.push((rand() - 0.5) * 65, (rand() - 0.5) * 35, -18 - rand() * 12);
  const starGeo = new THREE.BufferGeometry(); starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#acc4d3', size: 0.024, transparent: true, opacity: 0.45, sizeAttenuation: true })); scene.add(stars);
  const spaceStars = stars.clone(); space.add(spaceStars);

  const state = { phase: 0.01, fast: false, grow: true, cruise: false, focus: null, penSpin: 0, scrubs: 0 };
  const homeTarget = new THREE.Vector3(0, 1.48, 0);
  const view = { azimuth: Math.PI / 4, elevation: Math.asin(1 / Math.sqrt(3)), zoom: 1, target: homeTarget.clone() };
  const desired = { ...view, target: homeTarget.clone() };
  const focusPoints = {
    workstation: [1.02, 1.28, -0.87], sleeping: [-3.4, 1.35, -1.25], garden: [-2.44, 2.12, -1.3],
    chair: [1.45, 0.87, 0.63], bike: [3.1, 0.72, 0.14], storage: [-2.2, 0.4, 0.65],
  };
  function goHome() {
    state.focus = null; desired.target.copy(homeTarget); desired.zoom = 1;
    desired.azimuth = Math.PI / 4; desired.elevation = Math.asin(1 / Math.sqrt(3));
  }
  function activate(action) {
    if (action === 'window') state.fast = !state.fast;
    else if (action === 'growlight') state.grow = !state.grow;
    else if (action === 'strip') state.cruise = !state.cruise;
    else if (action === 'pen') { spinVelocity = 22; state.penSpin++; }
    else if (focusPoints[action] && state.focus !== action) {
      state.focus = action; desired.target.set(...focusPoints[action]); desired.zoom = action === 'workstation' ? 2.4 : 2.7;
    } else goHome();
  }
  const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2(5, 5);
  let pointer = null, spinVelocity = 0, spinAngle = 0;
  function updateMouse(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  }
  function pick() {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObject(habitat.root, true);
    if (!hits.length) return null;
    let object = hits[0].object;
    while (object && !object.userData.action) object = object.parent;
    return object?.userData.action ?? null;
  }
  const pointers = new Map(); let pinch = null;
  canvas.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    canvas.focus({ preventScroll: true }); canvas.setPointerCapture(event.pointerId); updateMouse(event);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()]; pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: desired.zoom };
      pointer = null; return;
    }
    if (pointers.size > 2) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, action: pick(), phase: state.phase, azimuth: desired.azimuth, elevation: desired.elevation, dragged: false };
  });
  canvas.addEventListener('pointermove', (event) => {
    updateMouse(event);
    if (pointers.has(event.pointerId)) pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch && pointers.size >= 2) {
      const [a, b] = [...pointers.values()]; desired.zoom = clamp(pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(pinch.distance, 1), 0.75, 3.4); return;
    }
    if (!pointer || pointer.id !== event.pointerId) { canvas.style.cursor = pick() ? 'pointer' : 'grab'; return; }
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    pointer.dragged ||= isDrag(pointer, { x: event.clientX, y: event.clientY });
    if (!pointer.dragged) return;
    if (pointer.action === 'window') state.phase = scrubOrbit(pointer.phase, dx, canvas.clientWidth);
    else {
      desired.azimuth = clamp(pointer.azimuth - dx * 0.006, 0.2, 1.15);
      desired.elevation = clamp(pointer.elevation + dy * 0.005, 0.32, 0.9);
    }
    canvas.style.cursor = 'grabbing';
  });
  function release(event, cancelled = false) {
    pointers.delete(event.pointerId);
    if (pointer?.id === event.pointerId) {
      if (!cancelled && !pointer.dragged) activate(pointer.action);
      if (pointer.dragged && pointer.action === 'window') state.scrubs++;
      pointer = null;
    }
    if (pointers.size < 2) pinch = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    canvas.style.cursor = 'grab';
  }
  canvas.addEventListener('pointerup', (event) => release(event));
  canvas.addEventListener('pointercancel', (event) => release(event, true));
  canvas.addEventListener('lostpointercapture', (event) => { if (pointer?.id === event.pointerId) { pointers.delete(event.pointerId); pointer = null; } });
  canvas.addEventListener('pointerleave', () => { if (!pointer) mouse.set(5, 5); });
  canvas.addEventListener('wheel', (event) => { event.preventDefault(); desired.zoom = clamp(desired.zoom * Math.exp(-event.deltaY * 0.001), 0.75, 3.4); }, { passive: false });
  canvas.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') goHome();
    else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-'].includes(event.key)) {
      event.preventDefault();
      if (event.key === '+') desired.zoom = clamp(desired.zoom + 0.15, 0.75, 3.4);
      if (event.key === '-') desired.zoom = clamp(desired.zoom - 0.15, 0.75, 3.4);
      desired.azimuth = clamp(desired.azimuth + (event.key === 'ArrowLeft' ? -0.06 : event.key === 'ArrowRight' ? 0.06 : 0), 0.2, 1.15);
      desired.elevation = clamp(desired.elevation + (event.key === 'ArrowUp' ? 0.06 : event.key === 'ArrowDown' ? -0.06 : 0), 0.32, 0.9);
    }
  });

  function resize() {
    const w = innerWidth, h = innerHeight, aspect = w / h;
    renderer.setSize(w, h); renderer.getDrawingBufferSize(dimensions); planetTarget.setSize(dimensions.x, dimensions.y);
    const height = Math.max(9.3, 10.7 / aspect);
    camera.left = -height * aspect / 2; camera.right = height * aspect / 2; camera.top = height / 2; camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();
  let last = performance.now(), elapsed = 0, lastScreen = -1, lastStatus = -1;
  const projected = new THREE.Vector3();
  let stopped = false;
  canvas.addEventListener('webglcontextlost', (event) => { event.preventDefault(); stopped = true; fail(new Error('WebGL context lost; reload to resume')); });
  function frame(now) {
    if (stopped) return;
    // Wall-clock orbit timing survives slow frames; only interpolation steps are capped.
    const realDt = (now - last) / 1000, dt = Math.min(realDt, 0.06); last = now; elapsed += realDt;
    if (!(pointer?.action === 'window' && pointer.dragged)) state.phase = advanceOrbit(state.phase, realDt, state.fast);
    const smooth = 1 - Math.exp(-dt * 7);
    view.azimuth = THREE.MathUtils.lerp(view.azimuth, desired.azimuth, smooth);
    view.elevation = THREE.MathUtils.lerp(view.elevation, desired.elevation, smooth);
    view.zoom = THREE.MathUtils.lerp(view.zoom, desired.zoom, smooth); view.target.lerp(desired.target, smooth);
    camera.position.set(18 * Math.sin(view.azimuth) * Math.cos(view.elevation), 18 * Math.sin(view.elevation), 18 * Math.cos(view.azimuth) * Math.cos(view.elevation)).add(view.target);
    camera.lookAt(view.target); camera.zoom = view.zoom; camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    const day = daylight(state.phase);
    const dawn = Math.sin(state.phase * TAU);
    earthUniforms.day.value = day; earthUniforms.cloudShift.value = elapsed * 0.0005;
    earth.quaternion.copy(earthOrientation).multiply(earthSpin.setFromAxisAngle(polarAxis, elapsed * 0.0012 + Math.sin(state.phase * TAU) * 0.08));
    atmosphereMaterial.uniforms.strength.value = 0.6 + day * 0.65;
    ambient.intensity = state.cruise ? 0.28 + day * 0.7 : 0.68 + day * 0.9;
    key.intensity = state.cruise ? 0.2 + day * 1.5 : 0.55 + day * 1.6;
    rim.intensity = 0.75 + (1 - day) * 0.25;
    earthLight.intensity = 2.3 + (1 - day) * 2.6;
    sun.intensity = day * 38;
    sunUniforms.strength.value = day;
    sunUniforms.direction.value.set(-0.2 + dawn * 0.25, -0.82, 0.58);
    sun.target.position.x = 0.5 + dawn * 1.1;
    habitat.stripMat.emissiveIntensity = state.cruise ? 0 : 2.4;
    habitat.stripMat.color.set(state.cruise ? '#515d62' : '#f4dec0');
    habitat.stripLights.forEach((l) => { l.intensity = state.cruise ? 0 : 2.6; });
    const breathing = 0.92 + Math.sin(elapsed * 1.3) * 0.08;
    const growActive = state.grow && !state.cruise;
    habitat.plantLight.intensity = growActive ? 2.4 * breathing : 0;
    habitat.growMat.emissiveIntensity = growActive ? 2.0 * breathing : 0;
    habitat.growMat.color.set(growActive ? '#f7badd' : '#554752');
    habitat.zipper.rotation.z = Math.sin(elapsed * 1.1) * 0.15;
    habitat.indicators.forEach(({ bulb, halo }, i) => {
      const on = Math.sin(elapsed * (0.9 + i % 4 * 0.37) + i * 1.9) > -0.75;
      bulb.material.color.set(on ? (i % 3 === 0 ? '#e9b776' : '#a3e5bf') : '#44675f'); halo.material.opacity = on ? 0.75 : 0.12;
    });
    spinAngle += spinVelocity * dt; spinVelocity *= Math.exp(-dt * 1.7);
    for (const [i, { group, home }] of habitat.floating.entries()) {
      group.position.set(home.center[0] + Math.sin(elapsed * 0.43 + i * 2) * 0.035, home.center[1] + Math.sin(elapsed * 0.57 + i) * 0.04, home.center[2] + Math.cos(elapsed * 0.37 + i) * 0.035);
      group.rotation.x = Math.sin(elapsed * 0.36 + i) * 0.14;
      group.rotation.y = elapsed * (0.12 + i * 0.015);
      group.rotation.z = home.id === 'pen' ? elapsed * 0.22 + spinAngle : Math.sin(elapsed * 0.3 + i) * 0.13;
      if (home.id === 'pen') {
        projected.copy(group.position).project(camera);
        const dx = (projected.x - mouse.x) * innerWidth / 2, dy = (projected.y - mouse.y) * innerHeight / 2;
        const distance = Math.hypot(dx, dy), influence = Math.max(0, 1 - distance / 85);
        group.position.x += influence * (dx >= 0 ? 0.09 : -0.09);
        group.position.y += influence * (dy >= 0 ? 0.045 : -0.045);
      }
    }
    if (elapsed - lastScreen > 0.12) { drawScreen(habitat.screenContext, elapsed, state.phase); habitat.screenMap.needsUpdate = true; lastScreen = elapsed; }
    if (elapsed - lastStatus > 0.5) {
      canvas.dataset.state = JSON.stringify({ ...state, phase: +state.phase.toFixed(5), daylight: +day.toFixed(3), elapsed: +elapsed.toFixed(2), azimuth: +view.azimuth.toFixed(3), elevation: +view.elevation.toFixed(3), zoom: +view.zoom.toFixed(3) });
      lastStatus = elapsed;
    }
    renderer.setRenderTarget(planetTarget); renderer.render(space, camera);
    renderer.setRenderTarget(null); renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

start().catch(fail);
