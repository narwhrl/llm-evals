// room.js — 房间：持续骨架 + 持续物 + 各年代组（按年份显隐，透明度交叉淡化）
// 房间 8×6 米，墙高 2.8 米。全部程序化几何体，MeshStandardMaterial。
import * as THREE from 'three'

/* ---------- 帮助函数 ---------- */
function mat(color, rough = 0.85, metal = 0.05) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal })
}
function box(w, h, d, m, x = 0, y = 0, z = 0, opts = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
  mesh.position.set(x, y, z)
  if (opts.ry) mesh.rotation.y = opts.ry
  if (opts.rz) mesh.rotation.z = opts.rz
  mesh.castShadow = opts.cast !== false
  mesh.receiveShadow = true
  mesh.userData.tags = opts.tags || []
  return mesh
}
function cyl(rt, rb, h, m, seg = 16) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.userData.tags = []
  return mesh
}
function tagAll(root, tags) { root.traverse(o => { if (o.isMesh) o.userData.tags = [...(o.userData.tags || []), ...tags] }) }

// 克隆材质并设为可透明，便于按年份交叉淡化；返回材质引用数组
function makeFadable(root) {
  const mats = new Set()
  root.traverse(o => {
    if (o.isMesh && o.material) {
      if (!o.userData._matCloned) {
        o.material = o.material.clone()
        o.material.transparent = true
        o.userData._matCloned = true
      }
      mats.add(o.material)
    }
  })
  return [...mats]
}
function setOpacity(mats, v) {
  const vis = v > 0.001
  for (const m of mats) m.opacity = Math.max(0, Math.min(1, v))
  return vis
}

/* ---------- 材质库 ---------- */
const M = {
  plastic: mat(0x2b2e35, 0.6),
  beige: mat(0xcbb59a, 0.9),
  black: mat(0x16181c, 0.5),
  silver: mat(0xb8bec6, 0.35, 0.35),
  darkMetal: mat(0x22262c, 0.45, 0.4),
  woodLight: mat(0x9a7b55, 0.8),
  woodDark: mat(0x5a4230, 0.85),
  fabric: mat(0x6b7a99, 1),
  cream: mat(0xe8e0cc, 0.95),
  ledWhite: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2d9, emissiveIntensity: 1.2, roughness: 0.4 }),
  ledWarm: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe9c4, emissiveIntensity: 1.0, roughness: 0.4 }),
  ledPurple: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x8e7bff, emissiveIntensity: 1.3, roughness: 0.4 }),
  lcd: new THREE.MeshStandardMaterial({ color: 0x0a0d10, roughness: 0.15, metalness: 0.1 }),
  crt: new THREE.MeshStandardMaterial({ color: 0x101418, roughness: 0.2, metalness: 0.1 }),
  screenOn: new THREE.MeshStandardMaterial({ color: 0x101418, emissive: 0xe8f4ff, emissiveIntensity: 0.25, roughness: 0.2 }),
  brown: mat(0x8a5a3b),
  red: mat(0xb03a2e),
  green: mat(0x3f7a4e),
  blue: mat(0x3b6ea5),
  orange: mat(0xd97a2b),
  cdSilver: mat(0xd0d4da, 0.3, 0.7),
  bookRed: mat(0x8e2f32, 0.9), bookBlue: mat(0x2e4a6b, 0.9), bookGreen: mat(0x3a5a3a, 0.9),
  jarGlass: new THREE.MeshStandardMaterial({ color: 0xbfd8dd, transparent: true, opacity: 0.45, roughness: 0.1 }),
  plant: mat(0x4a8a5a, 0.9), pot: mat(0xb56545, 0.9),
  shelfWood: mat(0x6e4f33, 0.9), panel: mat(0xd8d2c4, 0.95),
  floorWood: mat(0x8a6a4a, 0.85), rug: mat(0x5e3a3a, 1),
  pvc: mat(0xe6e2d8, 0.7),
  paper: mat(0xf2ead6, 0.95),
  stickyY: mat(0xf2e07a, 0.95), stickyR: mat(0xf28a7a, 0.95), stickyG: mat(0x9ad28a, 0.95),
  steel: mat(0x8f969e, 0.4, 0.5),
}

function poster(w, h, colorA, colorB, text) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 320
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 0, 320)
  grad.addColorStop(0, colorA); grad.addColorStop(1, colorB)
  g.fillStyle = grad; g.fillRect(0, 0, 256, 320)
  g.fillStyle = '#ffffff'; g.font = 'bold 40px system-ui, sans-serif'; g.textAlign = 'center'
  g.fillText(text, 128, 150)
  g.font = '18px system-ui, sans-serif'; g.fillText('POSTER', 128, 195)
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }))
  m.castShadow = false; m.receiveShadow = true; m.userData.tags = ['poster']
  return m
}

function mouseBall(color) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), color)
  m.scale.set(1, 0.6, 1.3); m.castShadow = true; m.userData.tags = ['mouse']
  return m
}
function chairG(color, h = 0.5, wing = null) {
  const g = new THREE.Group()
  const seat = box(0.52, 0.07, 0.52, color, 0, h, 0, { tags: ['chair'] }); g.add(seat)
  const back = box(0.52, 0.55, 0.07, color, 0, h + 0.45, -0.23, { tags: ['chair'] }); g.add(back)
  if (wing) g.add(box(0.09, 0.3, 0.42, wing, 0, h + 0.55, -0.23, { tags: ['chair'] }))
  const pole = cyl(0.03, 0.03, h, M.darkMetal, 10); pole.position.set(0, h / 2, 0)
  pole.userData.tags = ['chair']; g.add(pole)
  const base = cyl(0.22, 0.24, 0.03, M.darkMetal, 16); base.position.set(0, 0.015, 0)
  base.userData.tags = ['chair']; g.add(base)
  g.position.set(0, 0, -1.55)
  return g
}

/* ---------- 持续骨架 ---------- */
export function buildShell() {
  const g = new THREE.Group()
  g.add(box(8, 0.06, 6, M.floorWood, 0, -0.03, 0, { cast: false, tags: [] }))
  for (let i = -8; i < 8; i++) {
    const strip = box(8, 0.062, 0.02, M.woodDark, 0, -0.045, i * 0.375, { cast: false, tags: [] })
    g.add(strip)
  }
  g.add(box(8, 2.8, 0.08, M.panel, 0, 1.4, -3, { tags: [] }))
  g.add(box(0.08, 2.8, 6, M.panel, -4, 1.4, 0, { tags: [] }))
  g.add(box(0.08, 2.8, 6, M.panel, 4, 1.4, 0, { tags: [] }))
  g.add(box(0.06, 1.1, 1.6, M.pvc, -3.96, 1.7, 0.8, { cast: false, tags: [] }))
  g.add(box(0.02, 0.95, 1.4, M.jarGlass, -3.95, 1.7, 0.8, { cast: false, tags: [] }))
  // 桌面（结构全程不变）
  g.add(box(2.4, 0.08, 1.0, M.shelfWood, 0, 0.72, -2.3, { tags: [] }))
  for (const sx of [-1.08, 1.08]) g.add(box(0.08, 0.68, 0.9, M.darkMetal, sx, 0.36, -2.3, { tags: [] }))
  // 天花灯
  const lampBase = cyl(0.09, 0.12, 0.06, M.plastic, 16); lampBase.position.set(0, 2.78, 0)
  lampBase.userData.tags = ['ceiling-lamp']; g.add(lampBase)
  const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), M.ledWarm)
  lampBulb.position.set(0, 2.7, 0); lampBulb.castShadow = false
  lampBulb.userData.tags = ['ceiling-lamp']; g.add(lampBulb)
  return g
}

/* ---------- 持续物：情感线索（从未消失） ---------- */
export function buildKeepsakes() {
  const g = new THREE.Group(); g.name = 'keepsakes'
  // 深木书架
  for (let i = 0; i < 3; i++) g.add(box(1.5, 0.05, 0.35, M.shelfWood, 2.8, 0.15 + i * 0.6, -2.75, { tags: ['shelf'] }))
  for (const sx of [2.08, 3.52]) g.add(box(0.05, 2.0, 0.35, M.shelfWood, sx, 1.0, -2.75, { tags: ['shelf'] }))
  // 书
  for (const [bx, by] of [[2.45, 0.42], [2.65, 1.02], [2.9, 1.62]]) {
    for (let i = 0; i < 4; i++) {
      const b = box(0.08, 0.42, 0.2, [M.bookRed, M.bookBlue, M.bookGreen][i % 3], bx + i * 0.09, by, -2.75, { tags: ['books'] })
      g.add(b)
    }
  }
  // 绿植
  const pot = cyl(0.13, 0.1, 0.22, M.pot, 14); pot.position.set(-2.9, 0.11, -2.6)
  pot.userData.tags = ['plant']; g.add(pot)
  const bush = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), M.plant)
  bush.position.set(-2.9, 0.45, -2.6); bush.castShadow = true; bush.userData.tags = ['plant']; g.add(bush)
  // 鱼缸
  g.add(box(0.8, 0.7, 0.4, M.shelfWood, -3.4, 0.35, 1.4, { tags: ['fish-tank'] }))
  g.add(box(0.6, 0.35, 0.3, M.jarGlass, -3.4, 0.9, 1.4, { tags: ['fish-tank'] }))
  const water = box(0.56, 0.3, 0.26, new THREE.MeshStandardMaterial({ color: 0x3a7ca5, transparent: true, opacity: 0.55, roughness: 0.1 }), -3.4, 0.9, 1.4, { tags: ['fish-tank'] })
  g.add(water)
  const fish = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), M.orange)
  fish.scale.set(1.6, 0.8, 0.8); fish.position.set(-3.4, 0.95, 1.4); fish.castShadow = true; fish.userData.tags = ['fish-tank']; fish.name = 'fish'
  g.add(fish)
  // 旧臂chair
  const chair = new THREE.Group()
  chair.add(box(0.75, 0.25, 0.7, M.fabric, 0, 0.35, 0, { tags: ['armchair'] }))
  chair.add(box(0.75, 0.6, 0.18, M.fabric, 0, 0.72, -0.26, { tags: ['armchair'] }))
  for (const sx of [-0.33, 0.33]) chair.add(box(0.12, 0.3, 0.6, M.fabric, sx, 0.6, 0, { tags: ['armchair'] }))
  chair.position.set(3.2, 0, 0.8); chair.rotation.y = -0.6
  g.add(chair)
  // 旧电脑（角落，越旧越好）
  g.add(box(0.48, 0.42, 0.45, M.beige, -1.7, 0.21, -2.6, { tags: ['old-pc'] }))
  g.add(box(0.42, 0.32, 0.38, M.beige, -1.7, 0.76, -2.6, { tags: ['old-pc'] }))
  g.add(box(0.3, 0.22, 0.02, M.crt, -1.7, 0.76, -2.41, { tags: ['old-pc'] }))
  const night = cyl(0.04, 0.05, 0.12, M.ledWarm, 10); night.position.set(-2.2, 0.06, -2.7)
  night.userData.tags = ['night-lamp']; g.add(night)
  return g
}

/* ---------- 各年代组 ---------- */
function era2005() {
  const g = new THREE.Group()
  g.add(box(0.48, 0.4, 0.42, M.beige, -0.2, 0.96, -2.3, { tags: ['monitor'] }))
  g.add(box(0.34, 0.26, 0.02, M.crt, -0.2, 0.98, -2.10, { tags: ['monitor'] }))
  g.add(box(0.22, 0.42, 0.44, M.beige, 0.55, 0.97, -2.5, { tags: ['pc'] }))
  const mouse = mouseBall(M.beige); mouse.position.set(0.35, 0.79, -1.95); g.add(mouse)
  g.add(box(0.42, 0.03, 0.16, M.beige, -0.15, 0.78, -1.95, { tags: ['keyboard'] }))
  for (let i = 0; i < 3; i++) {
    const cd = cyl(0.065, 0.065, 0.012, M.cdSilver, 20)
    cd.rotation.x = Math.PI / 2; cd.position.set(0.7, 0.78 + i * 0.02, -2.0)
    cd.userData.tags = ['cd']; g.add(cd)
  }
  const post = poster(0.5, 0.62, '#e8a33d', '#c0392b', '2005'); post.position.set(1.4, 1.6, -2.94); g.add(post)
  for (const [px, py, pc] of [[-1.5, 1.5, M.stickyY], [-1.2, 1.35, M.stickyR], [-1.7, 1.3, M.stickyG]]) {
    g.add(box(0.14, 0.14, 0.01, pc, px, py, -2.94, { tags: ['sticky-note'] }))
  }
  g.add(chairG(M.plastic, 0.48))
  return g
}
function era2008() {
  const g = new THREE.Group()
  g.add(box(0.56, 0.36, 0.05, M.black, -0.2, 0.98, -2.55, { tags: ['monitor'] }))
  g.add(box(0.52, 0.32, 0.01, M.lcd, -0.2, 0.98, -2.52, { tags: ['monitor'] }))
  g.add(box(0.24, 0.44, 0.46, M.black, 0.6, 0.98, -2.55, { tags: ['pc'] }))
  g.add(box(0.01, 0.3, 0.3, M.silver, 0.72, 1.0, -2.55, { tags: ['pc'] }))
  const fan = cyl(0.09, 0.09, 0.01, M.ledWhite, 20); fan.rotation.z = Math.PI / 2; fan.position.set(0.73, 1.02, -2.55)
  fan.userData.tags = ['pc']; g.add(fan)
  g.add(box(0.44, 0.03, 0.17, M.black, -0.15, 0.78, -1.95, { tags: ['keyboard'] }))
  const mouse = mouseBall(M.black); mouse.position.set(0.35, 0.79, -1.95); g.add(mouse)
  const headset = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 8, 20, Math.PI), M.black)
  headset.position.set(0.85, 0.78, -2.1); headset.rotation.x = Math.PI / 2; headset.castShadow = true
  headset.userData.tags = ['headset']; g.add(headset)
  for (let i = 0; i < 4; i++) {
    const d = cyl(0.065, 0.065, 0.012, M.cdSilver, 20)
    d.rotation.x = Math.PI / 2; d.position.set(-0.8, 0.78 + i * 0.02, -2.05)
    d.userData.tags = ['dvd']; g.add(d)
  }
  g.add(box(0.28, 0.04, 0.2, M.blue, 0.75, 0.78, -1.95, { tags: ['manga'] }))
  g.add(chairG(M.fabric, 0.5))
  g.add(box(2.2, 0.02, 0.02, M.ledWhite, 0, 2.6, -2.9, { tags: ['led-strip'] }))
  const slogan = poster(0.6, 0.4, '#2b3a42', '#16202a', '加班'); slogan.position.set(-1.6, 1.7, -2.94); g.add(slogan)
  return g
}
function era2011() {
  const g = new THREE.Group()
  g.add(box(0.58, 0.38, 0.06, M.silver, -0.25, 0.99, -2.58, { tags: ['monitor'] }))
  g.add(box(0.53, 0.33, 0.01, M.lcd, -0.25, 0.99, -2.54, { tags: ['monitor'] }))
  g.add(box(0.24, 0.46, 0.48, M.black, 0.75, 1.0, -2.58, { tags: ['pc'] }))
  g.add(box(0.26, 0.02, 0.02, M.ledWhite, 0.75, 1.2, -2.34, { tags: ['pc'] }))
  g.add(box(0.46, 0.05, 0.18, M.darkMetal, -0.18, 0.79, -1.95, { tags: ['keyboard'] }))
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) {
    g.add(box(0.028, 0.02, 0.028, [M.black, M.red, M.blue][(r + c) % 3], -0.34 + c * 0.036, 0.825, -2.0 + r * 0.035, { tags: ['keyboard'] }))
  }
  const mouse = mouseBall(M.darkMetal); mouse.position.set(0.32, 0.8, -1.95); g.add(mouse)
  g.add(box(0.22, 0.1, 0.14, M.black, 0.75, 0.81, -1.98, { tags: ['controller'] }))
  g.add(box(0.3, 0.08, 0.3, M.brown, -0.9, 0.8, -2.2, { tags: ['collectible'] }))
  g.add(box(0.07, 0.12, 0.07, M.orange, -0.9, 0.9, -2.2, { tags: ['collectible'] }))
  g.add(chairG(M.black, 0.52, M.red))
  return g
}
function era2014() {
  const g = new THREE.Group()
  g.add(box(0.58, 0.38, 0.05, M.black, -0.55, 1.0, -2.55, { tags: ['monitor'] }))
  g.add(box(0.54, 0.34, 0.01, M.lcd, -0.55, 1.0, -2.52, { tags: ['monitor'] }))
  g.add(box(0.58, 0.38, 0.05, M.black, 0.55, 1.0, -2.55, { tags: ['monitor'], ry: -0.12 }))
  g.add(box(0.54, 0.34, 0.01, M.lcd, 0.55, 1.0, -2.52, { tags: ['monitor'], ry: -0.12 }))
  g.add(box(0.24, 0.44, 0.46, M.black, 1.1, 0.98, -2.45, { tags: ['pc'] }))
  g.add(box(0.01, 0.28, 0.3, M.jarGlass, 1.23, 1.0, -2.45, { tags: ['pc'] }))
  g.add(box(0.46, 0.03, 0.18, M.black, -0.1, 0.78, -1.95, { tags: ['keyboard'] }))
  const mouse = mouseBall(M.black); mouse.position.set(0.45, 0.79, -1.95); g.add(mouse)
  g.add(box(0.24, 0.12, 0.18, M.black, -0.75, 0.82, -2.15, { tags: ['vr'] }))
  const badge = poster(0.7, 0.5, '#7c3aed', '#2b1a5e', 'TOP 500'); badge.position.set(1.5, 1.65, -2.94); g.add(badge)
  g.add(chairG(M.black, 0.53, M.blue))
  return g
}
function era2017() {
  const g = new THREE.Group()
  for (const [mx, ry] of [[-0.95, 0.35], [0, 0], [0.95, -0.35]]) {
    g.add(box(0.56, 0.36, 0.05, M.black, mx, 1.0, -2.5, { tags: ['monitor'], ry }))
    g.add(box(0.52, 0.32, 0.01, M.lcd, mx + Math.sin(ry) * 0.03, 1.0, -2.47, { tags: ['monitor'], ry }))
  }
  g.add(box(0.26, 0.48, 0.5, M.black, 1.15, 1.0, -2.4, { tags: ['pc'] }))
  g.add(box(0.01, 0.34, 0.34, M.jarGlass, 1.29, 1.02, -2.4, { tags: ['pc'] }))
  const mic = new THREE.Group()
  const micHead = cyl(0.05, 0.05, 0.15, M.darkMetal, 14); micHead.position.set(0, 0.18, 0); micHead.userData.tags = ['mic']; mic.add(micHead)
  const micArm = cyl(0.015, 0.015, 0.3, M.darkMetal, 8); micArm.position.set(0, 0, 0); micArm.userData.tags = ['mic']; mic.add(micArm)
  mic.position.set(0.75, 0.77, -2.1); mic.rotation.z = 0.3; g.add(mic)
  g.add(box(0.12, 0.05, 0.05, M.black, 0, 1.32, -2.45, { tags: ['camera'] }))
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.008, 8, 24), M.ledWhite)
  ring.position.set(0, 1.15, -2.45); ring.userData.tags = ['camera']; g.add(ring)
  for (let i = 0; i < 3; i++) g.add(box(0.2, 0.1, 0.13, [M.black, M.blue, M.red][i], -0.9 + i * 0.24, 0.81, -2.25, { tags: ['controller'] }))
  const flag = poster(0.65, 0.45, '#1a3a5e', '#0d1f33', 'GG'); flag.position.set(-1.5, 1.65, -2.94); g.add(flag)
  g.add(chairG(M.black, 0.54))
  return g
}
function era2020() {
  const g = new THREE.Group()
  g.add(box(0.9, 0.4, 0.05, M.black, 0.1, 1.02, -2.55, { tags: ['monitor'] }))
  g.add(box(0.86, 0.36, 0.01, M.lcd, 0.1, 1.02, -2.52, { tags: ['monitor'] }))
  g.add(box(0.28, 0.52, 0.5, M.black, 1.2, 1.02, -2.35, { tags: ['pc'] }))
  g.add(box(0.01, 0.4, 0.4, M.ledWhite, 1.35, 1.05, -2.35, { tags: ['pc'] }))
  g.add(box(0.48, 0.03, 0.18, M.black, -0.05, 0.78, -1.95, { tags: ['keyboard'] }))
  for (let i = 0; i < 6; i++) g.add(box(0.03, 0.02, 0.03, M.blue, -0.24 + i * 0.04, 0.8, -2.0, { tags: ['keyboard'] }))
  const mouse = mouseBall(M.black); mouse.position.set(0.6, 0.8, -1.95); g.add(mouse)
  const lamp = new THREE.PointLight(0x8e7bff, 4, 6); lamp.position.set(0, 1.3, -1.9); lamp.userData.tags = ['desk-lamp']; g.add(lamp)
  g.add(box(0.03, 0.5, 0.03, M.darkMetal, 0, 1.05, -1.95, { tags: ['desk-lamp'] }))
  g.add(box(3.5, 0.03, 0.03, M.ledWhite, 0, 2.15, -2.92, { tags: ['led-strip'] }))
  g.add(box(0.03, 1.2, 0.03, M.ledWhite, -2.2, 1.5, -2.92, { tags: ['led-strip'] }))
  g.add(box(0.5, 1.2, 0.4, M.darkMetal, -1.6, 0.6, -2.6, { tags: ['rack'] }))
  for (let i = 0; i < 3; i++) g.add(box(0.44, 0.06, 0.02, M.black, -1.6, 0.3 + i * 0.2, -2.39, { tags: ['rack'] }))
  const cup = cyl(0.045, 0.03, 0.1, M.silver, 12); cup.position.set(1.15, 0.81, -2.1)
  cup.userData.tags = ['trophy']; g.add(cup)
  g.add(chairG(M.black, 0.55))
  g.add(box(2.6, 0.02, 1.8, M.rug, 0, 0.01, -1.6, { cast: false, tags: [] }))
  return g
}
function era2023() {
  const g = new THREE.Group()
  g.add(box(0.92, 0.42, 0.05, M.silver, 0.1, 1.03, -2.55, { tags: ['monitor'] }))
  g.add(box(0.88, 0.38, 0.01, M.lcd, 0.1, 1.03, -2.52, { tags: ['monitor'] }))
  g.add(box(0.3, 0.55, 0.52, M.silver, 1.22, 1.03, -2.35, { tags: ['pc'] }))
  const tube = cyl(0.02, 0.02, 0.4, M.ledWarm, 10); tube.rotation.x = Math.PI / 2; tube.position.set(1.38, 1.15, -2.35)
  tube.userData.tags = ['pc']; g.add(tube)
  g.add(box(0.5, 0.03, 0.19, M.cream, -0.05, 0.78, -1.95, { tags: ['keyboard'] }))
  const mouse = mouseBall(M.cream); mouse.position.set(0.6, 0.8, -1.95); g.add(mouse)
  const stand = cyl(0.015, 0.015, 0.35, M.darkMetal, 8); stand.position.set(0.85, 0.95, -2.2)
  stand.userData.tags = ['headset-stand']; g.add(stand)
  const ph = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.018, 8, 20, Math.PI), M.cream)
  ph.position.set(0.85, 1.1, -2.2); ph.rotation.x = Math.PI / 2; ph.userData.tags = ['headset-stand']; g.add(ph)
  g.add(box(1.6, 2.2, 0.4, M.panel, -3.0, 1.1, -2.72, { tags: ['cabinet'] }))
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
    g.add(box(0.16, 0.42, 0.26, [M.bookRed, M.bookBlue, M.bookGreen, M.brown][(r + c) % 4], -3.65 + c * 0.26, 0.45 + r * 0.55, -2.72, { tags: ['cabinet'] }))
  }
  const lamp = new THREE.PointLight(0xffd9a0, 5, 7); lamp.position.set(0, 1.35, -1.8)
  lamp.userData.tags = ['desk-lamp']; g.add(lamp)
  g.add(box(3.8, 0.03, 0.03, M.ledWarm, 0, 2.35, -2.92, { tags: ['led-strip'] }))
  g.add(box(0.03, 2.0, 0.03, M.ledWarm, 2.4, 1.4, -2.92, { tags: ['led-strip'] }))
  g.add(box(0.5, 1.4, 0.35, M.black, 1.8, 0.7, -2.7, { tags: ['display'] }))
  for (let i = 0; i < 3; i++) g.add(box(0.09, 0.14, 0.09, [M.red, M.blue, M.green][i], 1.8 + (i - 1) * 0.16, 0.35 + (i % 2) * 0.45, -2.7, { tags: ['display'] }))
  g.add(chairG(M.black, 0.56))
  g.add(box(2.8, 0.02, 2.0, M.rug, 0, 0.01, -1.6, { cast: false, tags: [] }))
  return g
}

/* ---------- 按年份装配 ---------- */
const ERAS = [
  { from: 2005, to: 2008.5, build: era2005 },
  { from: 2008.5, to: 2011, build: era2008 },
  { from: 2011, to: 2014, build: era2011 },
  { from: 2014, to: 2017, build: era2014 },
  { from: 2017, to: 2020, build: era2017 },
  { from: 2020, to: 2023, build: era2020 },
  { from: 2023, to: 2026, build: era2023 },
]

export function buildYearScenes() {
  const groups = []
  for (const era of ERAS) {
    const g = era.build()
    const mats = makeFadable(g)
    g.userData.fadeFrom = era.from
    g.userData.fadeTo = era.to
    groups.push({ group: g, mats, from: era.from, to: era.to })
  }
  // 旧物收藏角：2011 后出现
  const retired = new THREE.Group()
  retired.add(box(0.24, 0.44, 0.46, M.beige, -3.3, 0.22, -2.55, { tags: ['retired'] }))
  retired.add(box(0.48, 0.4, 0.42, M.beige, -3.3, 0.65, -2.55, { tags: ['retired'] }))
  retired.add(box(0.5, 0.5, 0.06, M.plastic, 3.3, 0.7, -2.55, { tags: ['retired'] }))
  const rmats = makeFadable(retired)
  retired.userData.fadeFrom = 2011; retired.userData.fadeTo = 2026
  groups.push({ group: retired, mats: rmats, from: 2011, to: 2026 })
  return groups
}

// 按系统时间设置每个年代组的不透明度（交叉淡化窗口 ±0.5 年）
export function applyYear(groups, year, scene) {
  for (const e of groups) {
    if (!e.group.parent) scene.add(e.group)
  }
  const W = 0.5
  for (const e of groups) {
    let a = 0
    if (year >= e.from && year < e.to) a = 1
    if (year >= e.from - W && year < e.from) a = (year - (e.from - W)) / W
    if (year >= e.to - W && year < e.to) a = 1 - (year - (e.to - W)) / W
    if (year < e.from - W || year >= e.to + W) a = 0
    // 收藏角特殊：2011 起常驻
    if (e.from === 2011 && e.to === 2026) a = year >= 2011 ? 1 : (year >= 2010.5 ? (year - 2010.5) / W : 0)
    const vis = setOpacity(e.mats, a)
    e.group.visible = vis
  }
}

export { M }
