import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { makeCtx, Ctx } from './world/state'
import { buildShell, ShellRefs } from './world/cabin'
import { buildProps, PropsRefs } from './world/props'
import { buildEarth, EarthRig } from './world/earth'

const V3 = (x: number, y: number, z: number): THREE.Vector3 => new THREE.Vector3(x, y, z)
interface DioramaDebug {
  setTime: (t01: number) => void
  getTime: () => number
  setFast: (b: boolean) => void
  setCruise: (b: boolean) => void
  setPlant: (b: boolean) => void
  focus: (id: string | null) => void
  penSpin: () => void
  setCam: (px: number, py: number, pz: number, tx: number, ty: number, tz: number, zoom: number) => void
  screenPos: (name: string) => { x: number, y: number } | null
  state: () => { t: number, fast: boolean, cruise: boolean, plant: boolean, focused: string | null }
}

const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v))
const sstep = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

async function main (): Promise<void> {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  document.body.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x02030a)

  const aspect = window.innerWidth / window.innerHeight
  const camera = new THREE.OrthographicCamera(-3.1 * aspect, 3.1 * aspect, 3.1, -3.1, 0.1, 200)
  const HOME = { pos: V3(7.8, 8.0, 7.6), tgt: V3(0.2, 0.85, -0.5), zoom: 1 }
  camera.position.copy(HOME.pos)
  camera.zoom = HOME.zoom
  camera.updateProjectionMatrix()

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.copy(HOME.tgt)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.enablePan = false
  // keep the interior readable: clamp to front-top-right octant
  controls.minPolarAngle = 0.68
  controls.maxPolarAngle = 1.22
  controls.minAzimuthAngle = 0.45
  controls.maxAzimuthAngle = 1.15
  controls.minZoom = 0.65
  controls.maxZoom = 3.4

  const ctx: Ctx = makeCtx(scene)
  const shell: ShellRefs = buildShell(ctx)
  const props: PropsRefs = buildProps(ctx)
  const earth: EarthRig = await buildEarth(scene)

  // ---------------- lights ----------------
  const hemi = new THREE.HemisphereLight(0xbccfe4, 0x3a3227, 0.55)
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(0xffe7c4, 2.8)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.left = -7; sun.shadow.camera.right = 7
  sun.shadow.camera.top = 7; sun.shadow.camera.bottom = -7
  sun.shadow.camera.far = 60
  sun.shadow.bias = -0.0004
  sun.target.position.set(0, 0.8, 0)
  scene.add(sun, sun.target)
  // cool earthshine through the porthole at night
  const earthshine = new THREE.DirectionalLight(0x5a7fff, 0.0)
  earthshine.position.set(-2.1, 0.5, -6.5)
  earthshine.target.position.set(0.5, 0.8, 1)
  scene.add(earthshine, earthshine.target)
  // disable wall shadowing so sunlight floods the interior; furniture still shades
  scene.traverse(o => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true } })
  // thin additive planes must not cast
  shell.sunPatch.castShadow = false

  // ---------------- orbital state ----------------
  const S = {
    t: 0.19, // orbital phase [0,1): el peaks at 0.25
    fast: false,
    cruise: false, // night-cruise: strip off
    plantOn: true,
    scrubbing: false,
    tween: null as null | {
      p0: THREE.Vector3, p1: THREE.Vector3, t0: THREE.Vector3, t1: THREE.Vector3,
      z0: number, z1: number, k: number
    },
    focused: null as string | null
  }
  const period = (): number => (S.fast ? 15 : 90)

  const sunDir = new THREE.Vector3()
  const lightDir = new THREE.Vector3()
  // Earth shows its own day side to the viewer during cabin-day and its
  // night side at cabin-night (diorama license: the cabin sun sits behind
  // the wall so it can stream through the porthole).
  const earthSun = new THREE.Vector3()
  const earthDayVec = new THREE.Vector3(0.35, 0.42, 1).normalize()
  const earthNightVec = new THREE.Vector3(-0.25, -0.12, -1).normalize()
  function orbital (t01: number): { el: number, day: number } {
    const ang = t01 * Math.PI * 2
    const el = Math.sin(ang)
    const az = 0.5 + 0.3 * Math.cos(ang)
    sunDir.set(az, 0.15 + el * 0.8, -1).normalize()
    const day = sstep(-0.1, 0.3, el)
    earthSun.copy(earthNightVec).lerp(earthDayVec, day).normalize()
    return { el, day }
  }

  function applyLighting (day: number): void {
    const cruiseDim = S.cruise ? 0 : 1
    sun.color.setHSL(0.09, 0.5, 0.5 + day * 0.18)
    sun.intensity = 2.8 * day + 0.02
    sun.position.copy(sunDir).multiplyScalar(22)
    earthshine.intensity = 1.1 * (1 - day) * (S.cruise ? 1.6 : 1)
    hemi.intensity = 0.2 + 0.44 * day * (S.cruise ? 0.45 : 1)
    // strip
    shell.stripMat.emissiveIntensity = 1.8 * cruiseDim * (0.35 + 0.65 * Math.max(day, 0.25))
    for (const pl of shell.stripLights) pl.intensity = 7 * cruiseDim * (0.3 + 0.7 * day)
    // porthole rim catches cold blue at night
    shell.bigFrameRim.emissiveIntensity = 1.6 * (1 - day)
    // sun patch decal: ray from window centre along light travel dir
    lightDir.copy(sunDir).negate()
    const wc = shell.portholeCenter
    const m = shell.sunPatch
    const patchMat = m.material as THREE.MeshBasicMaterial // created above as MeshBasicMaterial
    if (day > 0.02 && lightDir.y < -0.06) {
      const s = (0.03 - wc.y) / lightDir.y
      const px = wc.x + lightDir.x * s
      const pz = wc.z + lightDir.z * s
      if (Math.abs(px) < 3.7 && pz > -2.2 && pz < 2.1) {
        m.visible = true
        m.position.set(px, 0.025, pz)
        const stretch = clamp(1 / Math.max(0.35, -lightDir.y), 1, 2.6)
        const size = 1.5 * stretch * (0.5 + day * 0.5)
        m.scale.set(size, size * 0.82, 1)
        m.rotation.z = Math.atan2(lightDir.x, lightDir.z)
        patchMat.opacity = 0.85 * day
      } else m.visible = false
    } else m.visible = false
  }

  // ---------------- interaction ----------------
  const ray = new THREE.Raycaster()
  const ptr = new THREE.Vector2()
  const setPtr = (e: PointerEvent): void => {
    ptr.x = (e.clientX / window.innerWidth) * 2 - 1
    ptr.y = -(e.clientY / window.innerHeight) * 2 + 1
  }
  const pick = (e: PointerEvent): { c: (typeof ctx.clickables)[number], point: THREE.Vector3 } | null => {
    setPtr(e)
    ray.setFromCamera(ptr, camera)
    const objs = ctx.clickables.map(c => c.object)
    const hits = ray.intersectObjects(objs, true)
    if (!hits.length) return null
    let o: THREE.Object3D | null = hits[0].object
    while (o) {
      const found = ctx.clickables.find(c => c.object === o)
      if (found) return { c: found, point: hits[0].point }
      o = o.parent
    }
    return null
  }
  // earth drag = scrub; glass/frame also scrub, click = fast toggle
  const earthPick = (e: PointerEvent): boolean => {
    setPtr(e)
    ray.setFromCamera(ptr, camera)
    const hits = ray.intersectObjects([shell.bigGlass, earth.group], true)
    return hits.length > 0
  }

  function flyTo (pos: THREE.Vector3, tgt: THREE.Vector3, zoom: number): void {
    S.tween = { p0: camera.position.clone(), p1: pos.clone(), t0: controls.target.clone(), t1: tgt.clone(), z0: camera.zoom, z1: zoom, k: 0 }
  }
  function goHome (): void {
    S.focused = null
    flyTo(HOME.pos, HOME.tgt, HOME.zoom)
  }
  controls.addEventListener('start', () => { S.tween = null })

  let downAt = 0
  let downXY: [number, number] = [0, 0]
  let downHit: string | null = null
  let downOnEarth = false
  let lastX = 0
  const dom = renderer.domElement
  dom.addEventListener('pointerdown', e => {
    downAt = performance.now()
    downXY = [e.clientX, e.clientY]
    lastX = e.clientX
    const p = pick(e)
    downHit = p ? p.c.id : null
    downOnEarth = earthPick(e)
    if (downOnEarth) controls.enabled = false
  })
  dom.addEventListener('pointermove', e => {
    if (downOnEarth && e.buttons > 0) {
      // scrub orbital time by horizontal drag
      const dx = e.clientX - lastX
      lastX = e.clientX
      if (Math.abs(e.clientX - downXY[0]) > 6) {
        S.scrubbing = true
        S.t = ((S.t + dx * 0.0009) % 1 + 1) % 1
      }
      return
    }
    if (e.buttons === 0) {
      // pen avoidance: push the pen away from the cursor ray
      setPtr(e)
      ray.setFromCamera(ptr, camera)
      const plane = new THREE.Plane()
      plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()).negate(), props.penHome)
      const hit = new THREE.Vector3()
      if (ray.ray.intersectPlane(plane, hit)) {
        const d = props.pen.position.clone().sub(hit)
        d.z = 0
        const dist = d.length()
        if (dist < 0.5) {
          if (dist < 1e-4) d.set(0.2, 0.3, 0)
          d.normalize().multiplyScalar((0.5 - dist) * 0.55)
          d.x = clamp(d.x, -0.3, 0.3); d.y = clamp(d.y, -0.3, 0.3)
          props.penAvoid.copy(d)
        }
      }
    }
  })
  const clickAction = (id: string | null, onEarth: boolean): void => {
    if (id === 'pen') { props.penSpin.v = 14; return }
    if (id === 'plants') {
      S.plantOn = !S.plantOn
      props.plantBarMat.emissiveIntensity = S.plantOn ? 1.6 : 0.02
      props.plantLight.intensity = S.plantOn ? 3 : 0
      props.growGlow.emissiveIntensity = S.plantOn ? 0.35 : 0.02
      return
    }
    if (id === 'workstation' || id === 'sleep' || id === 'chair' || id === 'bike') {
      if (S.focused === id) { goHome(); return }
      const c = ctx.clickables.find(c => c.id === id)
      if (c?.focus) {
        S.focused = id
        flyTo(c.focus.cam, c.focus.tgt, c.focus.zoom)
      }
      return
    }
    if (id === null && onEarth) { S.fast = !S.fast; return }
    // strip mesh is registered below; empty space returns home
    if (id === 'strip') { S.cruise = !S.cruise; return }
    if (id === null) goHome()
  }
  // light strip clickable (registered after build since it lives in shell)
  ctx.clickables.push({ id: 'strip', object: shell.sunPatch, action: 'strip' })
  // NOTE: sunPatch is a floor decal; use an invisible fat box around the strip instead
  ctx.clickables.pop()
  {
    const hit = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.5, 0.6),
      new THREE.MeshBasicMaterial({ visible: false }))
    hit.position.set(0, 0.2, 0.1)
    scene.add(hit)
    ctx.clickables.push({ id: 'strip', object: hit, action: 'strip' })
  }
  // porthole glass toggles fast mode; also registered for scrub cursor
  ctx.clickables.push({ id: 'porthole', object: shell.bigGlass, action: 'porthole' })

  dom.addEventListener('pointerup', e => {
    const moved = Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1])
    const dtMs = performance.now() - downAt
    controls.enabled = true
    const wasScrub = S.scrubbing
    S.scrubbing = false
    if (moved < 6 && dtMs < 800 && !wasScrub) {
      const p = pick(e)
      const id = p ? p.c.id : null
      if (id === 'porthole' || (id === null && downOnEarth)) clickAction(null, true)
      else clickAction(id, false)
    }
    downHit = null
    downOnEarth = false
    void downHit
  })

  // ---------------- debug / evidence API (no visible UI) ----------------
  const w = window as unknown as { __diorama: DioramaDebug } // test/evidence hook, no visible UI
  w.__diorama = {
    setTime: (t01: number) => { S.t = ((t01 % 1) + 1) % 1 },
    getTime: () => S.t,
    setFast: (b: boolean) => { S.fast = b },
    setCruise: (b: boolean) => { S.cruise = b },
    setPlant: (b: boolean) => { if (S.plantOn !== b) clickAction('plants', false) },
    focus: (id: string | null) => { id ? clickAction(id, false) : goHome() },
    penSpin: () => clickAction('pen', false),
    setCam: (px: number, py: number, pz: number, tx: number, ty: number, tz: number, zoom: number) => {
      S.tween = null
      camera.position.set(px, py, pz)
      controls.target.set(tx, ty, tz)
      camera.zoom = zoom
      camera.updateProjectionMatrix()
    },
    screenPos: (name: string) => {
      const spots: Record<string, THREE.Vector3> = {
        pen: props.pen.position.clone(),
        porthole: shell.portholeCenter.clone(),
        earth: shell.portholeCenter.clone(),
        strip: new THREE.Vector3(0, 0.2, 0.6),
        plant: new THREE.Vector3(-2.6, 1.72, -1.55),
        desk: new THREE.Vector3(2.65, 0.9, -1.35),
        chair: new THREE.Vector3(2.0, 0.8, -0.25),
        bike: new THREE.Vector3(3.45, 0.8, 0.55),
        sleep: new THREE.Vector3(-3.0, 1.2, -1.6)
      }
      const p = spots[name]
      if (!p) return null
      const v = p.clone().project(camera)
      return { x: (v.x + 1) / 2 * window.innerWidth, y: (1 - v.y) / 2 * window.innerHeight }
    },
    state: () => ({ t: S.t, fast: S.fast, cruise: S.cruise, plant: S.plantOn, focused: S.focused })
  }

  window.addEventListener('resize', () => {
    const a = window.innerWidth / window.innerHeight
    camera.left = -3.1 * a; camera.right = 3.1 * a
    camera.top = 3.1; camera.bottom = -3.1
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  // ---------------- loop ----------------
  const clock = new THREE.Clock()
  let elapsed = 0
  function frame (): void {
    requestAnimationFrame(frame)
    const dt = Math.min(clock.getDelta(), 0.05)
    elapsed += dt
    if (!S.scrubbing) S.t = (S.t + dt / period()) % 1
    const { day } = orbital(S.t)
    applyLighting(day)
    earth.update(dt, earthSun, 0.008)
    for (const tk of ctx.tickers) tk(dt, elapsed)
    for (const b of ctx.blinkers) {
      const k = 0.5 + 0.5 * Math.sin(elapsed * b.speed + b.phase)
      b.mat.emissive.copy(b.dim).lerp(b.color, k * k)
      b.mat.emissiveIntensity = 0.4 + 1.8 * k * k
    }
    if (S.tween) {
      const tw = S.tween
      tw.k = Math.min(1, tw.k + dt / 1.15)
      const e = tw.k * tw.k * tw.k * (tw.k * (tw.k * 6 - 15) + 10)
      camera.position.lerpVectors(tw.p0, tw.p1, e)
      controls.target.lerpVectors(tw.t0, tw.t1, e)
      camera.zoom = tw.z0 + (tw.z1 - tw.z0) * e
      camera.updateProjectionMatrix()
      if (tw.k >= 1) S.tween = null
    }
    controls.update()
    renderer.render(scene, camera)
  }
  applyLighting(orbital(S.t).day)
  frame()
}

main().catch(err => {
  console.error(err)
  const pre = document.createElement('pre')
  pre.textContent = String(err)
  document.body.appendChild(pre)
})
