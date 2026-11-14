import * as THREE from 'three'
import { Ctx, addBlinker } from './state'
import { bowZ, wallRotY } from './cabin'
import {
  fabric, photoCard, stickyNote, blueprint, manualPages, screenStatic, drawScreen,
  keyboardTex, bookCover, towelTex, netTex, foodPouch, shirtTex, labelPlate, ctex, ventGrille
} from './textures'

export interface PropsRefs {
  laptopCanvas: HTMLCanvasElement
  laptopTex: THREE.CanvasTexture
  pen: THREE.Group
  penHome: THREE.Vector3
  penSpin: { v: number }
  penAvoid: THREE.Vector3
  plantBarMat: THREE.MeshStandardMaterial
  plantLight: THREE.PointLight
  plantRack: THREE.Group
  zipper: THREE.Mesh
  growGlow: THREE.MeshStandardMaterial
}

function M (color: number, roughness = 0.85, metalness = 0.05): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness })
}

export function buildProps (ctx: Ctx): PropsRefs {
  const { scene } = ctx
  const g = new THREE.Group()
  scene.add(g)
  const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh => {
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, y, z)
    g.add(m)
    return m
  }
  const onWall = (m: THREE.Object3D, x: number, y: number, dy = 0.1): void => {
    m.position.set(x, y, bowZ(x) + dy)
    m.rotation.y = wallRotY(x)
  }

  // ================= sleep corner (left end) =================
  const sleepG = new THREE.Group()
  g.add(sleepG)
  const bagTex = fabric('#5a6e8c', 'rgba(255,255,255,0.25)')
  bagTex.repeat.set(2, 3)
  const bag = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.9, 0.32), new THREE.MeshStandardMaterial({ map: bagTex, roughness: 0.95 }))
  bag.position.set(-3.15, 1.15, bowZ(-3.15) + 0.3)
  bag.rotation.y = wallRotY(-3.15)
  sleepG.add(bag)
  // straps holding the bag
  for (const y of [0.6, 1.7]) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.07, 0.34), M(0x3a3f45, 0.9))
    strap.position.set(-3.15, y, bowZ(-3.15) + 0.3)
    strap.rotation.y = wallRotY(-3.15)
    sleepG.add(strap)
  }
  // pillow peeking from half-open zipper
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.28, 0.2), M(0xe9e4d6, 0.95))
  pillow.position.set(-3.0, 1.95, bowZ(-3.0) + 0.32)
  pillow.rotation.set(0.2, wallRotY(-3.0), 0.12)
  sleepG.add(pillow)
  const zip = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.5, 0.02), M(0x2c2f34, 0.6))
  zip.position.set(-2.85, 1.15, bowZ(-2.85) + 0.47)
  zip.rotation.y = wallRotY(-2.85)
  sleepG.add(zip)
  const zipper = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.03), M(0xc9a44a, 0.4, 0.6))
  zipper.position.set(-2.85, 0.75, bowZ(-2.85) + 0.48)
  sleepG.add(zipper)
  ctx.tickers.push((dt, t) => {
    zipper.rotation.x = Math.sin(t * 1.7) * 0.35
    zipper.position.y = 0.75 + Math.sin(t * 1.7) * 0.012
  })
  // shelf + photos + sticky note
  const shelf = mesh(new THREE.BoxGeometry(1.0, 0.045, 0.26), M(0x8a6f4d, 0.7), -2.7, 1.78, bowZ(-2.7) + 0.22)
  shelf.rotation.y = wallRotY(-2.7)
  const photoDefs: Array<[string, number, number]> = [['妈妈', 12, -2.95], ['全家福', 200, -2.7], ['发射日', 45, -2.45]]
  photoDefs.forEach(([cap, hue, x], i) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.012),
      new THREE.MeshStandardMaterial({ map: photoCard(cap, hue), roughness: 0.85 }))
    p.position.set(x, 1.98 + (i % 2) * 0.02, bowZ(x) + 0.1)
    p.rotation.set(-0.06, wallRotY(x) + (i - 1) * 0.09, (i - 1) * 0.04)
    g.add(p)
    const tape = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.035, 0.005),
      new THREE.MeshStandardMaterial({ color: 0xe8dcc0, transparent: true, opacity: 0.75, roughness: 0.6 }))
    tape.position.set(x, 2.11 + (i % 2) * 0.02, bowZ(x) + 0.108)
    tape.rotation.y = wallRotY(x)
    g.add(tape)
  })
  const note = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.01),
    new THREE.MeshStandardMaterial({ map: stickyNote(['记得喝水!', '第142天', '加油']), roughness: 0.9 }))
  note.position.set(-2.35, 1.95, bowZ(-2.35) + 0.1)
  note.rotation.y = wallRotY(-2.35) - 0.06
  g.add(note)
  // reading lamp: arm + shade + warm bulb
  const lampArmM = M(0x3a3d42, 0.5, 0.5)
  const arm1 = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8), lampArmM, -2.45, 1.35, bowZ(-2.45) + 0.25)
  arm1.rotation.set(0.5, 0, 0.4)
  const shade = mesh(new THREE.ConeGeometry(0.11, 0.14, 16, 1, true), new THREE.MeshStandardMaterial({ color: 0xc96a2e, roughness: 0.6, side: THREE.DoubleSide }), -2.3, 1.45, bowZ(-2.3) + 0.42)
  shade.rotation.set(1.1, 0, 0.5)
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xfff1cf, emissive: 0xffc873, emissiveIntensity: 3 })
  mesh(new THREE.SphereGeometry(0.035, 10, 8), bulbMat, -2.28, 1.42, bowZ(-2.28) + 0.44)
  const readLight = new THREE.PointLight(0xffbe78, 5, 4.5, 1.9)
  readLight.position.set(-2.5, 1.5, bowZ(-2.5) + 0.6)
  scene.add(readLight)
  ctx.clickables.push({
    id: 'sleep', object: sleepG, action: 'focus',
    focus: { cam: new THREE.Vector3(-0.4, 2.7, 3.0), tgt: new THREE.Vector3(-2.9, 1.25, -1.5), zoom: 2.3 }
  })

  // ================= work desk under the big porthole =================
  const deskG = new THREE.Group()
  g.add(deskG)
  const deskMat = M(0x9a7f56, 0.7)
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.05, 0.72), deskMat)
  top.position.set(2.65, 0.74, -1.35)
  deskG.add(top)
  for (const [lx, lz] of [[2.1, -1.05], [3.2, -1.05], [2.1, -1.65], [3.2, -1.65]] as Array<[number, number]>) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.74, 0.05), deskMat)
    leg.position.set(lx, 0.37, lz)
    deskG.add(leg)
  }
  // laptop: base + glowing telemetry screen
  const laptopCanvas = screenStatic()
  const laptopTex = new THREE.CanvasTexture(laptopCanvas)
  laptopTex.colorSpace = THREE.SRGBColorSpace
  drawScreen(laptopCanvas, 0)
  const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.03, 0.34), M(0x2b2f35, 0.5, 0.3))
  lapBase.position.set(2.5, 0.78, -1.32)
  lapBase.rotation.y = -0.12
  deskG.add(lapBase)
  const keys = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.17),
    new THREE.MeshStandardMaterial({ map: keyboardTex(), roughness: 0.7 }))
  keys.rotation.x = -Math.PI / 2
  keys.position.set(2.5, 0.798, -1.28)
  keys.rotation.z = -0.12
  deskG.add(keys)
  const lapScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.52, 0.325),
    new THREE.MeshBasicMaterial({ map: laptopTex }))
  lapScreen.position.set(2.5, 0.95, -1.47)
  lapScreen.rotation.set(-0.22, -0.12, 0)
  deskG.add(lapScreen)
  const lapLid = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.35, 0.015), M(0x23262b, 0.5, 0.3))
  lapLid.position.set(2.5, 0.948, -1.478)
  lapLid.rotation.set(-0.22, -0.12, 0)
  lapLid.translateZ(-0.009)
  deskG.add(lapLid)
  const screenGlow = new THREE.PointLight(0x66d8ff, 1.6, 2.2, 2)
  screenGlow.position.set(2.5, 1.0, -1.15)
  scene.add(screenGlow)
  let lastDraw = -1
  ctx.tickers.push((_dt, t) => {
    if (t - lastDraw > 0.18) { lastDraw = t; drawScreen(laptopCanvas, t); laptopTex.needsUpdate = true }
    screenGlow.intensity = 1.4 + Math.sin(t * 7.3) * 0.15 + Math.sin(t * 2.1) * 0.1
  })
  // headphones on a wall hook
  const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.09, 8), M(0x3a3d42, 0.5, 0.5))
  hook.rotation.x = Math.PI / 2 - 0.3
  onWall(hook, 3.3, 1.7, 0.1)
  g.add(hook)
  const hpG = new THREE.Group()
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 20, Math.PI), M(0x2e6b6e, 0.6))
  hpG.add(band)
  for (const s of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.045, 14), M(0x22383a, 0.6))
    cup.rotation.z = Math.PI / 2
    cup.position.set(s * 0.095, -0.01, 0)
    hpG.add(cup)
  }
  onWall(hpG, 3.3, 1.58, 0.16)
  hpG.rotation.x = 0.15
  g.add(hpG)
  // velcro-fixed thermos mug
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.13, 16), M(0xc9563c, 0.55))
  mug.position.set(3.0, 0.83, -1.25)
  deskG.add(mug)
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.01, 8, 14, Math.PI), M(0xc9563c, 0.55))
  handle.position.set(3.05, 0.83, -1.25)
  handle.rotation.y = Math.PI / 2
  deskG.add(handle)
  const strap = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.03, 0.11), M(0x2c2c2c, 0.95))
  strap.position.set(3.0, 0.775, -1.25)
  deskG.add(strap)
  // floating open manual above the desk
  const manL = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.34),
    new THREE.MeshStandardMaterial({ map: manualPages(), roughness: 0.9 }))
  manL.position.set(2.65, 1.5, -0.9)
  manL.rotation.set(0.15, 0.5, 0.06)
  g.add(manL)
  ctx.tickers.push((dt, t) => {
    manL.position.y = 1.5 + Math.sin(t * 0.5) * 0.05
    manL.rotation.y = 0.5 + Math.sin(t * 0.23) * 0.15
    manL.rotation.x = 0.15 + Math.sin(t * 0.31) * 0.06
    void dt
  })
  // pinned drawings beside the porthole
  const draw1 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.45),
    new THREE.MeshStandardMaterial({ map: blueprint(), roughness: 0.9 }))
  onWall(draw1, 3.42, 1.55, 0.07)
  draw1.rotation.z = 0.05
  g.add(draw1)
  const draw2 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4),
    new THREE.MeshStandardMaterial({ map: blueprint(), roughness: 0.9 }))
  onWall(draw2, 0.55, 1.75, 0.07)
  draw2.rotation.z = -0.07
  g.add(draw2)
  ctx.clickables.push({
    id: 'workstation', object: deskG, action: 'focus',
    focus: { cam: new THREE.Vector3(3.4, 2.7, 1.4), tgt: new THREE.Vector3(2.65, 0.9, -1.3), zoom: 2.4 }
  })

  // ================= viewing chair facing the porthole =================
  const chairG = new THREE.Group()
  g.add(chairG)
  const chairMat = M(0x746a8f, 0.8)
  const seatTex = fabric('#6b6285', 'rgba(0,0,0,0.2)')
  const seatMat = new THREE.MeshStandardMaterial({ map: seatTex, roughness: 0.95 })
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.58), seatMat)
  seat.position.set(2.0, 0.5, -0.25)
  chairG.add(seat)
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.75, 0.12), seatMat)
  back.position.set(2.0, 0.95, 0.06)
  back.rotation.x = 0.22
  chairG.add(back)
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.1), seatMat)
  head.position.set(2.0, 1.36, 0.15)
  head.rotation.x = 0.22
  chairG.add(head)
  for (const s of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.5), chairMat)
    arm.position.set(2.0 + s * 0.36, 0.72, -0.25)
    chairG.add(arm)
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.06), chairMat)
    post.position.set(2.0 + s * 0.36, 0.6, -0.25)
    chairG.add(post)
  }
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.3, 0.45, 12), M(0x3a3d42, 0.5, 0.5))
  pedestal.position.set(2.0, 0.22, -0.25)
  chairG.add(pedestal)
  void head
  // armrest control panel with glowing buttons
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.3), M(0x23262b, 0.5))
  panel.position.set(2.36, 0.76, -0.3)
  chairG.add(panel)
  const btnCols = [0x39e663, 0xffb13d, 0xff4444]
  btnCols.forEach((c, i) => {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.02, 10), addBlinker(ctx, c, 0.8 + i * 0.7))
    b.position.set(2.36, 0.78, -0.4 + i * 0.09)
    chairG.add(b)
  })
  ctx.clickables.push({
    id: 'chair', object: chairG, action: 'focus',
    focus: { cam: new THREE.Vector3(3.3, 2.5, 1.6), tgt: new THREE.Vector3(2.0, 0.8, -0.5), zoom: 2.3 }
  })

  // ================= plant rack between the small portholes =================
  const rackG = new THREE.Group()
  g.add(rackG)
  const rackMat = M(0xb9bec4, 0.45, 0.55)
  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.5, 0.05), rackMat)
    post.position.set(-2.6 + s * 0.45, 0.75, -1.55)
    rackG.add(post)
  }
  const leafCols = [0x4da64d, 0x63c263, 0x3d8a3d]
  for (let s = 0; s < 3; s++) {
    const y = 0.35 + s * 0.42
    const shelfM = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.4), rackMat)
    shelfM.position.set(-2.6, y, -1.55)
    rackG.add(shelfM)
    const tray = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.07, 0.32), M(0x3c4046, 0.7))
    tray.position.set(-2.6, y + 0.055, -1.55)
    rackG.add(tray)
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.05 + (i % 3) * 0.014, 0),
        M(leafCols[(i + s) % 3], 0.8))
      leaf.position.set(-2.95 + i * 0.115 + (s * 0.03), y + 0.14, -1.62 + (i % 2) * 0.14)
      leaf.scale.y = 0.72
      leaf.rotation.set(i, i * 2.1, 0.4)
      rackG.add(leaf)
      if ((i + s) % 3 === 0) {
        const drop = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6),
          new THREE.MeshStandardMaterial({ color: 0xcfeaff, roughness: 0.05, metalness: 0.1 }))
        drop.position.set(leaf.position.x + 0.03, leaf.position.y + 0.045, leaf.position.z + 0.02)
        rackG.add(drop)
      }
    }
  }
  // grow-light bar (clickable toggle)
  const plantBarMat = new THREE.MeshStandardMaterial({
    color: 0x2a2f38, emissive: new THREE.Color(0xc05cff), emissiveIntensity: 2.2, roughness: 0.5
  })
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.12), plantBarMat)
  bar.position.set(-2.6, 1.72, -1.55)
  rackG.add(bar)
  for (const s of [-1, 1]) {
    const drop2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.18, 8), rackMat)
    drop2.position.set(-2.6 + s * 0.45, 1.62, -1.55)
    rackG.add(drop2)
  }
  const plantLight = new THREE.PointLight(0xc05cff, 4, 3.5, 1.9)
  plantLight.position.set(-2.6, 1.5, -1.3)
  scene.add(plantLight)
  const growGlow = new THREE.MeshStandardMaterial({
    color: 0x69448a, emissive: new THREE.Color(0x9a4dff), emissiveIntensity: 0.35,
    transparent: true, opacity: 0.85, roughness: 0.9
  })
  ctx.tickers.push((_dt, t) => {
    const breathe = 0.82 + Math.sin(t * 1.1) * 0.18
    if (plantBarMat.emissiveIntensity > 0.1) plantBarMat.emissiveIntensity = 1.6 * breathe
    if (plantLight.intensity > 0.1) plantLight.intensity = 3 * breathe
  })
  ctx.clickables.push({
    id: 'plants', object: rackG, action: 'plant',
    focus: { cam: new THREE.Vector3(-0.2, 2.5, 2.4), tgt: new THREE.Vector3(-2.6, 1.0, -1.5), zoom: 2.5 }
  })

  // ================= exercise bike (right end) =================
  const bikeG = new THREE.Group()
  g.add(bikeG)
  const bikeMat = M(0x37424e, 0.5, 0.4)
  const wheelG = new THREE.TorusGeometry(0.26, 0.035, 10, 24)
  for (const [wx, wz] of [[3.15, 0.35], [3.75, 0.35]] as Array<[number, number]>) {
    const wh = new THREE.Mesh(wheelG, bikeMat)
    wh.position.set(wx, 0.3, 0.55)
    bikeG.add(wh)
    for (let i = 0; i < 3; i++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 6), bikeMat)
      spoke.position.copy(wh.position)
      spoke.rotation.z = (i / 3) * Math.PI
      bikeG.add(spoke)
    }
  }
  const frame = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.75, 8), M(0xc9563c, 0.5, 0.3))
  frame.position.set(3.45, 0.55, 0.55)
  frame.rotation.z = 1.1
  bikeG.add(frame)
  const seatPost = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.4, 8), bikeMat)
  seatPost.position.set(3.28, 0.75, 0.55)
  seatPost.rotation.z = -0.25
  bikeG.add(seatPost)
  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.12), M(0x23262b, 0.9))
  saddle.position.set(3.24, 0.96, 0.55)
  bikeG.add(saddle)
  const barM = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.44, 8), bikeMat)
  barM.position.set(3.66, 0.98, 0.55)
  barM.rotation.x = Math.PI / 2
  bikeG.add(barM)
  // sweatband-wrapped grips
  for (const s of [-1, 1]) {
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), M(0xd8cba8, 0.95))
    grip.position.set(3.66, 0.98, 0.55 + s * 0.17)
    grip.rotation.x = Math.PI / 2
    bikeG.add(grip)
  }
  const consoleM = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x111417, emissive: 0x2affd8, emissiveIntensity: 0.7, roughness: 0.4 }))
  consoleM.position.set(3.66, 1.1, 0.55)
  consoleM.rotation.x = -0.4
  bikeG.add(consoleM)
  // towel on wall hook above
  const towel = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.55, 1, 4),
    new THREE.MeshStandardMaterial({ map: towelTex(), roughness: 0.95, side: THREE.DoubleSide }))
  onWall(towel, 3.45, 1.75, 0.09)
  g.add(towel)
  ctx.clickables.push({
    id: 'bike', object: bikeG, action: 'focus',
    focus: { cam: new THREE.Vector3(2.9, 2.4, 2.0), tgt: new THREE.Vector3(3.45, 0.75, 0.45), zoom: 2.3 }
  })

  // ================= storage: nets, clothes, extinguisher, first aid =================
  const netMat = new THREE.MeshStandardMaterial({
    map: netTex(), transparent: true, roughness: 0.9, side: THREE.DoubleSide, alphaTest: 0.2
  })
  const netSpots: Array<[number, number]> = [[-1.15, 1.35], [0.35, 0.75]]
  netSpots.forEach(([x, y], ni) => {
    const net = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.55), netMat)
    onWall(net, x, y, 0.16)
    g.add(net)
    const goods: THREE.Mesh[] = []
    const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.1),
      new THREE.MeshStandardMaterial({ map: foodPouch(ni ? '咖喱' : '米饭', ni ? '#c9563c' : '#3f7fbf'), roughness: 0.7 }))
    pouch.position.set(x - 0.15, y - 0.08, bowZ(x) + 0.14)
    pouch.rotation.y = wallRotY(x)
    goods.push(pouch)
    const pouch2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.1),
      new THREE.MeshStandardMaterial({ map: foodPouch('面条', '#3f8a4d'), roughness: 0.7 }))
    pouch2.position.set(x + 0.14, y - 0.05, bowZ(x) + 0.14)
    pouch2.rotation.y = wallRotY(x) + 0.1
    goods.push(pouch2)
    if (!ni) {
      // wrench + 魔方 in the left net
      const wrench = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.3, 0.03), M(0x8f959c, 0.35, 0.7))
      wrench.position.set(x + 0.02, y + 0.05, bowZ(x) + 0.13)
      wrench.rotation.z = 0.4
      goods.push(wrench)
      const cubeTex = ctex(96, 96, (gg, w, h) => {
        const cols = ['#e33', '#3a3', '#36c', '#ec3', '#f80', '#eee']
        cols.forEach((c, i) => {
          gg.fillStyle = c
          gg.fillRect((i % 3) * 32 + 2, Math.floor(i / 3) * 32 + 2, 28, 28)
        })
        void w; void h
      })
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09),
        new THREE.MeshStandardMaterial({ map: cubeTex, roughness: 0.5 }))
      cube.position.set(x - 0.05, y + 0.12, bowZ(x) + 0.15)
      cube.rotation.set(0.4, 0.5, 0.2)
      goods.push(cube)
    }
    goods.forEach(m => g.add(m))
  })
  // velcro-fixed clothes upper-left wall
  const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.05),
    new THREE.MeshStandardMaterial({ map: shirtTex('#4a6b8a', '#e8e2d2'), roughness: 0.95 }))
  onWall(shirt, -3.5, 2.05, 0.09)
  shirt.rotation.z = 0.04
  g.add(shirt)
  const pants = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.5, 0.05),
    new THREE.MeshStandardMaterial({ map: shirtTex('#5a5f66', '#c9563c'), roughness: 0.95 }))
  onWall(pants, -1.75, 2.1, 0.09)
  pants.rotation.z = -0.05
  g.add(pants)
  // extinguisher + first aid
  const ext = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.4, 14), M(0xc03a2e, 0.5))
  ext.position.set(3.5, 0.85, bowZ(3.5) + 0.2)
  g.add(ext)
  const extLbl = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.1),
    new THREE.MeshStandardMaterial({ map: labelPlate('灭火器', { bg: '#f2ede0', fg: '#c03a2e' }), roughness: 0.7 }))
  extLbl.position.set(3.5, 0.85, bowZ(3.5) + 0.278)
  extLbl.rotation.y = wallRotY(3.5)
  g.add(extLbl)
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.12, 8), M(0x23262b, 0.5))
  nozzle.position.set(3.5, 1.1, bowZ(3.5) + 0.2)
  g.add(nozzle)
  const aidTex = ctex(200, 140, (gg, w, h) => {
    gg.fillStyle = '#f2f2ee'; gg.fillRect(0, 0, w, h)
    gg.fillStyle = '#c03a2e'; gg.fillRect(w / 2 - 18, 24, 36, 92); gg.fillRect(w / 2 - 46, 52, 92, 36)
    gg.fillStyle = '#333'; gg.font = 'bold 24px sans-serif'; gg.textAlign = 'center'
    gg.fillText('急救箱', w / 2, h - 16)
  })
  const aid = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.24, 0.14),
    new THREE.MeshStandardMaterial({ map: aidTex, roughness: 0.7 }))
  aid.position.set(-1.2, 0.55, bowZ(-1.2) + 0.16)
  aid.rotation.y = wallRotY(-1.2)
  g.add(aid)
  // velcro slippers on the floor
  for (const s of [-1, 1]) {
    const slip = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.045, 0.28), M(s > 0 ? 0x4a6b8a : 0x8a5a4a, 0.95))
    slip.position.set(1.35 + s * 0.09, 0.025, 0.35 + s * 0.03)
    slip.rotation.y = s * 0.25
    g.add(slip)
  }
  // coiled cable + tools on a wall hook near desk
  const coil = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.022, 8, 20), M(0xd8b93a, 0.7))
  onWall(coil, 0.62, 1.05, 0.1)
  g.add(coil)

  // ================= floaters: pen, book, earphones, droplet, crumb =================
  const mkFloater = (obj: THREE.Object3D, x: number, y: number, z: number, amp: number, spd: number, rspd: number): void => {
    obj.position.set(x, y, z)
    g.add(obj)
    const bx = x, by = y, bz = z
    const ph = x * 3.1 + y * 1.7
    ctx.tickers.push((dt, t) => {
      obj.position.set(
        bx + Math.sin(t * spd + ph) * amp,
        by + Math.sin(t * spd * 0.8 + ph * 2) * amp * 0.7,
        bz + Math.cos(t * spd * 0.6 + ph) * amp * 0.6
      )
      obj.rotation.x += dt * rspd
      obj.rotation.y += dt * rspd * 0.7
      obj.rotation.z += dt * rspd * 0.4
    })
  }
  // hero pen (interactive): white barrel, blue grip
  const pen = new THREE.Group()
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.16, 10), M(0xe8e8e4, 0.4))
  pen.add(barrel)
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.04, 10), M(0x2a5aaa, 0.5))
  grip.position.y = -0.05
  pen.add(grip)
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.03, 10), M(0x3a3d42, 0.4, 0.5))
  tip.position.y = -0.095
  tip.rotation.x = Math.PI
  pen.add(tip)
  pen.position.set(2.1, 1.35, -0.75)
  pen.rotation.set(0.6, 0.3, 1.1)
  g.add(pen)
  const penHome = pen.position.clone()
  const penSpin = { v: 0 }
  const penAvoid = new THREE.Vector3()
  ctx.tickers.push((dt, t) => {
    if (penSpin.v > 0.01) {
      pen.rotation.y += dt * penSpin.v
      penSpin.v *= 0.985
    }
    pen.position.x += (penHome.x + Math.sin(t * 0.4) * 0.09 + penAvoid.x - pen.position.x) * Math.min(1, dt * 2)
    pen.position.y += (penHome.y + Math.sin(t * 0.53 + 1) * 0.07 + penAvoid.y - pen.position.y) * Math.min(1, dt * 2)
    pen.position.z += (penHome.z + Math.cos(t * 0.33) * 0.06 + penAvoid.z - pen.position.z) * Math.min(1, dt * 2)
    if (penSpin.v <= 0.01) pen.rotation.z += dt * 0.25
    penAvoid.multiplyScalar(0.94)
  })
  // floating star atlas
  const book = new THREE.Group()
  const cover = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.015, 0.28),
    new THREE.MeshStandardMaterial({ map: bookCover(), roughness: 0.8 }))
  book.add(cover)
  const pages = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.025, 0.26), M(0xe9e4d6, 0.9))
  pages.position.y = -0.018
  book.add(pages)
  mkFloater(book, -1.6, 1.5, -0.6, 0.07, 0.35, 0.3)
  // wireless earphones: case + buds
  const ears = new THREE.Group()
  const caseM = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.04, 0.07), M(0xe8e8e4, 0.5))
  ears.add(caseM)
  for (const s of [-1, 1]) {
    const bud = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), M(0xeeeeea, 0.5))
    bud.position.set(s * 0.07, 0.03, 0.01)
    ears.add(bud)
  }
  mkFloater(ears, 0.4, 1.7, -0.5, 0.08, 0.42, 0.5)
  // stray water droplet from the rack
  const drop = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 8),
    new THREE.MeshStandardMaterial({ color: 0xcfeaff, roughness: 0.05, metalness: 0.1 }))
  mkFloater(drop, -2.2, 1.35, -0.9, 0.06, 0.3, 0.2)
  // cookie crumb
  const crumb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.022, 0), M(0x9a6b3c, 0.95))
  mkFloater(crumb, 1.2, 1.15, 0.15, 0.05, 0.5, 0.9)
  // pen registered separately (avoid + spin handled in main)
  ctx.clickables.push({ id: 'pen', object: pen, action: 'pen' })
  void ventGrille

  return {
    laptopCanvas, laptopTex, pen, penHome, penSpin, penAvoid,
    plantBarMat, plantLight, plantRack: rackG, zipper, growGlow
  }
}
