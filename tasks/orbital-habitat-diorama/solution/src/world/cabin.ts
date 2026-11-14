import * as THREE from 'three'
import { Ctx, addBlinker, rnd } from './state'
import { wallPanel, floorGrate, sandwich, labelPlate, ventGrille, radialGlow } from './textures'

// Cabin shell: bowed rear wall with 3 portholes, grating floor with light
// strip, two end hatches, ribs + rivets + pipes + labels for density.
export const WALL_H = 2.5
export const bowZ = (x: number): number => -2 - 0.55 * (1 - (x / 4) * (x / 4))
export const wallRotY = (x: number): number => Math.atan2(0.55 * 2 * x / 16, 1)

const BIG = { x: 2.0, y: 1.5, r: 0.75, frame: 1.02 }
const SML = [
  { x: -2.0, y: 1.55, r: 0.3, frame: 0.45 },
  { x: -3.2, y: 1.55, r: 0.3, frame: 0.45 }
]

export interface ShellRefs {
  bigGlass: THREE.Mesh
  bigFrameRim: THREE.MeshStandardMaterial
  stripMat: THREE.MeshStandardMaterial
  stripLights: THREE.PointLight[]
  sunPatch: THREE.Mesh
  portholeCenter: THREE.Vector3
}

export function buildShell (ctx: Ctx): ShellRefs {
  const { scene } = ctx
  const wallTex = wallPanel()
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x4a4f55, roughness: 0.6, metalness: 0.35 })
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x8f959c, roughness: 0.45, metalness: 0.5 })

  const shell = new THREE.Group()
  scene.add(shell)

  const panel = (cx: number, w: number, y0: number, y1: number): void => {
    const h = y1 - y0
    if (w <= 0.01 || h <= 0.01) return
    const tex = wallTex.clone()
    tex.needsUpdate = true
    tex.repeat.set(Math.max(1, Math.round(w / 0.85)), Math.max(1, Math.round(h / 0.85)))
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.1),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85, metalness: 0.08 }))
    m.position.set(cx, (y0 + y1) / 2, bowZ(cx) - 0.05)
    m.rotation.y = wallRotY(cx)
    shell.add(m)
  }


  interface Hole { x0: number, x1: number, y0: number, y1: number }
  const holes: Hole[] = [
    { x0: BIG.x - BIG.frame, x1: BIG.x + BIG.frame, y0: BIG.y - BIG.frame, y1: BIG.y + BIG.frame },
    ...SML.map(s => ({ x0: s.x - s.frame, x1: s.x + s.frame, y0: s.y - s.frame, y1: s.y + s.frame }))
  ].sort((a, b) => a.x0 - b.x0)
  let cursor = -4
  for (const h of holes) {
    panel((cursor + h.x0) / 2, h.x0 - cursor, 0, WALL_H) // full strip left of hole
    panel((h.x0 + h.x1) / 2, h.x1 - h.x0, 0, h.y0) // below hole
    panel((h.x0 + h.x1) / 2, h.x1 - h.x0, h.y1, WALL_H) // above hole
    cursor = h.x1
  }
  panel((cursor + 4) / 2, 4 - cursor, 0, WALL_H)

  // ---- wall top cut edge: sandwich strip following the bow ----
  {
    const mat = new THREE.MeshStandardMaterial({ map: sandwich(), roughness: 0.8 })
    for (let i = 0; i < 16; i++) {
      const x0 = -4 + i * 0.5
      const seg = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.14), mat)
      seg.position.set(x0 + 0.25, WALL_H + 0.05, bowZ(x0 + 0.25) - 0.05)
      seg.rotation.y = wallRotY(x0 + 0.25)
      shell.add(seg)
    }
  }

  // ---- ribs over the wall ----
  const ribMat = new THREE.MeshStandardMaterial({ color: 0x9ba1a8, roughness: 0.5, metalness: 0.4 })
  for (const y of [0.62, 1.66, 2.44]) {
    for (let i = 0; i < 16; i++) {
      const x = -3.75 + i * 0.5
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.09, 0.05), ribMat)
      rib.position.set(x, y, bowZ(x) + 0.03)
      rib.rotation.y = wallRotY(x)
      shell.add(rib)
    }
  }
  for (const x of [-3.68, -2.6, -1.52, 0.95, 3.05]) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.09, WALL_H, 0.05), ribMat)
    rib.position.set(x, WALL_H / 2, bowZ(x) + 0.03)
    rib.rotation.y = wallRotY(x)
    shell.add(rib)
  }

  // ---- rivets: one instanced mesh along ribs ----
  {
    const spots: Array<[number, number, number]> = []
    for (const y of [0.62, 1.66, 2.44]) {
      for (let x = -3.9; x <= 3.9; x += 0.22) spots.push([x, y + 0.07, bowZ(x) + 0.055])
    }
    for (const x of [-3.68, -2.6, -1.52, 0.95, 3.05]) {
      for (let y = 0.12; y < WALL_H; y += 0.22) spots.push([x + 0.07, y, bowZ(x) + 0.055])
    }
    const geo = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 8)
    geo.rotateX(Math.PI / 2)
    const inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0x6d7278, roughness: 0.4, metalness: 0.6 }), spots.length)
    const m4 = new THREE.Matrix4()
    spots.forEach(([x, y, z], i) => {
      m4.makeRotationY(wallRotY(x))
      m4.setPosition(x, y, z)
      inst.setMatrixAt(i, m4)
    })
    shell.add(inst)
  }

  // ---- portholes ----
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xbfe0ff, transparent: true, opacity: 0.1, roughness: 0.1, metalness: 0.2,
    depthWrite: false
  })
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x70767e, roughness: 0.4, metalness: 0.55,
    emissive: new THREE.Color(0x2a5aff), emissiveIntensity: 0
  })
  const mkPorthole = (cx: number, cy: number, rIn: number, rOut: number): THREE.Mesh => {
    const grp = new THREE.Group()
    const zc = bowZ(cx)
    const frame = new THREE.Mesh(new THREE.TorusGeometry((rIn + rOut) / 2, (rOut - rIn) / 2, 12, 40), frameMat)
    grp.add(frame)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(rIn + 0.015, 0.02, 8, 40), rimMat)
    rim.position.z = 0.055
    grp.add(rim)
    // tunnel through the wall
    const tunnel = new THREE.Mesh(
      new THREE.CylinderGeometry(rIn, rIn, 0.34, 40, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x3c4046, roughness: 0.7, side: THREE.DoubleSide })
    )
    tunnel.rotation.x = Math.PI / 2
    tunnel.position.z = -0.12
    grp.add(tunnel)
    const glass = new THREE.Mesh(new THREE.CircleGeometry(rIn * 0.99, 40), glassMat)
    glass.position.z = 0.02
    grp.add(glass)
    // bolts around frame
    for (let i = 0; i < Math.round(rOut * 22); i++) {
      const a = (i / Math.round(rOut * 22)) * Math.PI * 2
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.03, 6), darkMetal)
      bolt.rotation.x = Math.PI / 2
      bolt.position.set(Math.cos(a) * (rIn + rOut) / 2, Math.sin(a) * (rIn + rOut) / 2, 0.055)
      grp.add(bolt)
    }
    // sill shelf under the ring
    const sill = new THREE.Mesh(new THREE.BoxGeometry(rOut * 1.7, 0.05, 0.24), frameMat)
    sill.position.set(0, -rOut - 0.03, 0.12)
    grp.add(sill)
    grp.position.set(cx, cy, zc + 0.02)
    grp.rotation.y = wallRotY(cx)
    shell.add(grp)
    return glass
  }
  const bigGlass = mkPorthole(BIG.x, BIG.y, BIG.r, BIG.frame)
  mkPorthole(SML[0].x, SML[0].y, SML[0].r, SML[0].frame)
  mkPorthole(SML[1].x, SML[1].y, SML[1].r, SML[1].frame)

  // ---- floor + base ----
  const floorTex = floorGrate()
  floorTex.repeat.set(4, 2)
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(8, 0.14, 4.2),
    new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.9, metalness: 0.05 })
  )
  floor.position.set(0, -0.07, 0.1)
  shell.add(floor)
  // display base slab (model-box feel)
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(9.2, 0.35, 5.6),
    new THREE.MeshStandardMaterial({ color: 0x23262b, roughness: 0.7 })
  )
  base.position.set(0, -0.32, 0.1)
  shell.add(base)
  const baseTrim = new THREE.Mesh(
    new THREE.BoxGeometry(9.3, 0.06, 5.7),
    new THREE.MeshStandardMaterial({ color: 0x5a4c30, roughness: 0.55, metalness: 0.35 })
  )
  baseTrim.position.set(0, -0.16, 0.1)
  shell.add(baseTrim)
  // sandwich cut on floor front edge
  {
    const mat = new THREE.MeshStandardMaterial({ map: sandwich(), roughness: 0.8 })
    const edge = new THREE.Mesh(new THREE.BoxGeometry(8, 0.14, 0.04), mat)
    edge.position.set(0, -0.07, 2.2)
    shell.add(edge)
  }

  // ---- warm light strip (clickable: night cruise) ----
  const stripMat = new THREE.MeshStandardMaterial({
    color: 0xfff2d8, emissive: new THREE.Color(0xffe9c0), emissiveIntensity: 2.4, roughness: 0.5
  })
  const strip = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.025, 0.16), stripMat)
  strip.position.set(0, 0.008, 0.1)
  shell.add(strip)
  const stripLights: THREE.PointLight[] = []
  for (const x of [-2.4, 0, 2.4]) {
    const pl = new THREE.PointLight(0xffdfae, 9, 7.5, 1.8)
    pl.position.set(x, 0.75, 0.1)
    scene.add(pl)
    stripLights.push(pl)
  }

  // ---- sunlight patch decal (sharp porthole-shaped pool) ----
  const sunPatch = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: radialGlow('rgba(255,244,220,0.95)', 'rgba(255,244,220,0)'),
      transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
    })
  )
  sunPatch.rotation.x = -Math.PI / 2
  sunPatch.position.y = 0.02
  sunPatch.renderOrder = 5
  scene.add(sunPatch)

  // ---- end walls + hatches ----
  const endMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85, metalness: 0.08 })
  for (const sx of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.12, WALL_H, 4.3), endMat)
    wall.position.set(sx * 4, WALL_H / 2, 0.05)
    shell.add(wall)
    // hatch
    const hz = -0.3
    const door = new THREE.Group()
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.99, 0.055, 12, 44), frameMat)
    ring.rotation.y = Math.PI / 2
    door.add(ring)
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(0.95, 40),
      new THREE.MeshStandardMaterial({ color: 0xb9bec4, roughness: 0.7, metalness: 0.15 })
    )
    disc.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2
    disc.position.x = sx > 0 ? -0.02 : 0.02
    door.add(disc)
    // small hatch window: dark space + frame
    const hw = new THREE.Mesh(new THREE.CircleGeometry(0.2, 24),
      new THREE.MeshStandardMaterial({ color: 0x05070d, roughness: 0.2 }))
    hw.rotation.y = disc.rotation.y
    hw.position.set(sx > 0 ? -0.045 : 0.045, 0.25, 0)
    door.add(hw)
    const hwRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 8, 24), darkMetal)
    hwRing.rotation.y = Math.PI / 2
    hwRing.position.set(sx > 0 ? -0.04 : 0.04, 0.25, 0)
    door.add(hwRing)
    // wheel handle
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 8, 24), darkMetal)
    wheel.rotation.y = Math.PI / 2
    wheel.position.set(sx > 0 ? -0.09 : 0.09, -0.25, 0)
    door.add(wheel)
    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.03), darkMetal)
      spoke.rotation.x = (i / 3) * Math.PI
      spoke.position.copy(wheel.position)
      door.add(spoke)
    }
    door.position.set(sx * 4 + (sx > 0 ? -0.08 : 0.08), 1.25, hz)
    shell.add(door)
    // dress the bare end wall: vent + stencils (density on every surface)
    const face = sx > 0 ? -Math.PI / 2 : Math.PI / 2
    const ex = sx * 3.91 // stands 15 mm proud of the wall face: no z-fighting
    const ventMat = new THREE.MeshStandardMaterial({ map: ventGrille(), roughness: 0.8 })
    ventMat.emissive = new THREE.Color(0xffffff)
    ventMat.emissiveMap = ventMat.map
    ventMat.emissiveIntensity = 0.5
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.3, 0.5), ventMat)
    const tag = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.2, 0.4),
      new THREE.MeshStandardMaterial({ map: labelPlate(sx > 0 ? 'B' : 'A', { bg: '#e8e8e4', fg: '#333', sub: '舱门' }), roughness: 0.7 }))
    tag.position.set(ex, 2.02, -1.5)
    tag.rotation.y = face
    shell.add(tag)
    const caut = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.16, 0.5),
      new THREE.MeshStandardMaterial({ map: labelPlate('注意', { stripe: true, sub: '气密' }), roughness: 0.7 }))
    caut.position.set(ex, 0.35, 1.3)
    caut.rotation.y = face
    shell.add(caut)
  }

  // ---- pipes along the wall base + verticals, with zip ties ----
  {
    const pipeCols = [0x7a7f86, 0x8a5f3c, 0x4a6b8a]
    const runs = [
      { y: 0.18, r: 0.045, pts: 12 },
      { y: 0.3, r: 0.032, pts: 12 },
      { y: 0.42, r: 0.026, pts: 10 }
    ]
    runs.forEach((run, ri) => {
      const pts: THREE.Vector3[] = []
      const n = run.pts
      for (let i = 0; i <= n; i++) {
        const x = -3.9 + (7.8 * i) / n
        pts.push(new THREE.Vector3(x, run.y + Math.sin(i * 1.7 + ri) * 0.008, bowZ(x) + 0.12 + ri * 0.055))
      }
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, run.r, 8),
        new THREE.MeshStandardMaterial({ color: pipeCols[ri], roughness: 0.55, metalness: 0.45 })
      )
      shell.add(tube)
      // zip ties
      const tieMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d2, roughness: 0.7 })
      for (let i = 1; i < n; i += 2) {
        const tie = new THREE.Mesh(new THREE.TorusGeometry(run.r + 0.008, 0.008, 6, 12), tieMat)
        tie.position.copy(pts[i])
        tie.rotation.y = Math.PI / 2 - 0.2
        shell.add(tie)
      }
    })
  }

  // ---- vents, labels, equipment panels with blinkers ----
  const stick = (m: THREE.Mesh, x: number, y: number, dy = 0.062): void => {
    m.position.set(x, y, bowZ(x) + dy)
    m.rotation.y = wallRotY(x)
    shell.add(m)
  }
  const ventMat = new THREE.MeshStandardMaterial({ map: ventGrille(), roughness: 0.8 })
  for (const [x, y] of [[-1.1, 2.0], [3.35, 0.7], [-3.6, 0.5], [0.4, 0.45]] as Array<[number, number]>) {
    stick(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.26, 0.03), ventMat), x, y)
  }
  const labelDefs: Array<[string, { bg?: string, fg?: string, stripe?: boolean, sub?: string }, number, number, number]> = [
    ['CAUTION', { stripe: true, sub: '高压管线' }, 0.5, 0.42, 0.42],
    ['O₂', { bg: '#3f7fbf', fg: '#fff' }, -0.5, 0.5, 0.24],
    ['04', { bg: '#e8e8e4', fg: '#333' }, -1.5, 1.05, 0.2],
    ['CAUTION', { stripe: true, sub: '当心碰头' }, -3.5, 2.2, 0.4],
    ['N₂', { bg: '#3f7fbf', fg: '#fff' }, 3.4, 1.9, 0.24],
    ['07', { bg: '#e8e8e4', fg: '#333' }, 0.2, 2.05, 0.2],
    ['急救', { bg: '#c03a2e', fg: '#fff' }, 3.3, 1.35, 0.3],
    ['灭火', { bg: '#c03a2e', fg: '#fff' }, -0.9, 0.62, 0.24]
  ]
  for (const [txt, o, x, y, w] of labelDefs) {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, w / 2, 0.015),
      new THREE.MeshStandardMaterial({ map: labelPlate(txt, o), roughness: 0.7 })
    )
    stick(m, x, y)
  }
  // equipment panels with blinking indicators
  const panelSpots: Array<[number, number]> = [[-1.15, 1.15], [0.35, 1.3], [3.3, 2.0]]
  const ledCols = [0x39e663, 0xffb13d, 0x41c8ff]
  panelSpots.forEach(([x, y], pi) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.3, 0.06), darkMetal)
    stick(p, x, y, 0.08)
    for (let i = 0; i < 3; i++) {
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.045, 0.02),
        addBlinker(ctx, ledCols[(pi + i) % 3], 1.5 + rnd() * 3))
      led.position.set(x - 0.11 + i * 0.11, y + 0.05, bowZ(x) + 0.12)
      led.rotation.y = wallRotY(x)
      shell.add(led)
    }
    // toggle switches
    for (let i = 0; i < 2; i++) {
      const sw = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.07, 0.04), frameMat)
      sw.position.set(x - 0.06 + i * 0.12, y - 0.07, bowZ(x) + 0.11)
      shell.add(sw)
    }
  })

  return {
    bigGlass, bigFrameRim: rimMat, stripMat, stripLights, sunPatch,
    portholeCenter: new THREE.Vector3(BIG.x, BIG.y, bowZ(BIG.x))
  }
}
