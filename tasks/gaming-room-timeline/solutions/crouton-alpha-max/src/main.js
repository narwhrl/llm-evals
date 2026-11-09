// main.js — 场景入口：渲染、自由观察、时间轴、点击说明、屏幕小游戏
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { buildShell, buildKeepsakes, buildYearScenes, applyYear } from './room.js'
import { ScreenUI } from './screen.js'

const app = document.getElementById('app')
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.05
app.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x14100d)
scene.fog = new THREE.Fog(0x14100d, 12, 26)

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100)
camera.position.set(4.2, 3.0, 4.6)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0.8, -1.6)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.maxPolarAngle = Math.PI / 2 - 0.04
controls.minDistance = 0.8
controls.maxDistance = 11

// 基础光：温暖
const ambient = new THREE.AmbientLight(0xffe9c9, 0.5)
scene.add(ambient)
const key = new THREE.DirectionalLight(0xffe6bf, 1.4)
key.position.set(3, 5, 4)
key.castShadow = true
key.shadow.mapSize.set(2048, 2048)
key.shadow.camera.left = -6; key.shadow.camera.right = 6
key.shadow.camera.top = 6; key.shadow.camera.bottom = -6
scene.add(key)
const fill = new THREE.PointLight(0xffd9a0, 2, 9)
fill.position.set(0, 2.4, 0.5)
scene.add(fill)

// 房间骨架 + 持续物
scene.add(buildShell())
const keeps = buildKeepsakes()
scene.add(keeps)

// 各年代组
const eraGroups = buildYearScenes()
for (const e of eraGroups) scene.add(e.group)

// 屏幕：3D 区域贴图 + DOM 面板小画布（点击/键盘映射）
const screenCanvas = document.createElement('canvas')
screenCanvas.width = 512; screenCanvas.height = 320
const screenTex = new THREE.CanvasTexture(screenCanvas)
screenTex.colorSpace = THREE.SRGBColorSpace

// 屏幕贴图挂在每个年代组的主显示器上（复用其平面位置）——简化：独立一块贴在桌前显示器位置，
const screenPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(0.84, 0.525),
  new THREE.MeshBasicMaterial({ map: screenTex })
)
screenPlane.position.set(0.1, 1.02, -2.49)
screenPlane.rotation.y = 0
scene.add(screenPlane)

const screenUI = new ScreenUI(screenCanvas)
screenUI.setYear(2005)

// ---------- UI ----------
const wrap = document.createElement('div')
wrap.style.cssText = 'position:fixed;inset:0;pointer-events:none;font-family:system-ui,sans-serif;'
app.appendChild(wrap)

// 标题与年代
const hud = document.createElement('div')
hud.style.cssText = 'position:absolute;left:16px;top:14px;color:#f5ecdb;pointer-events:none'
hud.innerHTML = '<div style="font-size:18px;font-weight:700">电竞房 · 2005—2025</div><div id="yearLabel" style="font-size:13px;opacity:.85">2005 年 · 卧室电脑角</div>'
wrap.appendChild(hud)

// 说明面板（点击物体）
const panel = document.createElement('div')
panel.style.cssText = 'position:absolute;right:16px;top:16px;width:300px;background:rgba(20,16,12,.88);border:1px solid #6b5836;border-radius:10px;padding:12px 14px;color:#f5ecdb;pointer-events:auto;display:none'
panel.innerHTML = '<div id="panelTitle" style="font-weight:700;font-size:14px;margin-bottom:6px"></div><div id="panelBody" style="font-size:13px;line-height:1.55;opacity:.92"></div><div id="panelClose" style="margin-top:10px;font-size:12px;opacity:.7;cursor:pointer">点击任意空白处关闭</div>'
wrap.appendChild(panel)
panel.querySelector('#panelClose').addEventListener('click', () => panel.style.display = 'none')

// 屏幕面板（可玩）
const sp = document.createElement('div')
sp.style.cssText = 'position:absolute;left:16px;bottom:92px;width:300px;background:rgba(10,10,16,.9);border:1px solid #3a3f4a;border-radius:10px;padding:8px;color:#fff;pointer-events:auto;display:none'
sp.innerHTML = '<div style="font-size:12px;opacity:.7;margin-bottom:6px">电脑屏幕 · 方向键操作，鼠标可点击</div><canvas id="screenHud" width="256" height="160" style="width:100%;border-radius:6px"></canvas><div id="screenHint" style="font-size:12px;opacity:.7;margin-top:6px"></div>'
wrap.appendChild(sp)
const hudCanvas = sp.querySelector('#screenHud')
const hudCtx = hudCanvas.getContext('2d')

// 时间轴
const tl = document.createElement('div')
tl.style.cssText = 'position:absolute;left:50%;transform:translateX(-50%);bottom:18px;width:min(760px,92vw);background:rgba(20,16,12,.86);border:1px solid #6b5836;border-radius:12px;padding:10px 14px;pointer-events:auto;color:#f5ecdb'
tl.innerHTML = '<div style="display:flex;gap:10px;align-items:center"><button id="playBtn" style="padding:6px 12px;border-radius:8px;border:1px solid #6b5836;background:#2a2118;color:#f5ecdb;cursor:pointer">▶ 自动播放</button><input id="slider" type="range" min="2005" max="2025" step="0.1" value="2005" style="flex:1"><span id="yearNum" style="min-width:52px;text-align:right;font-weight:700">2005</span></div><div style="display:flex;justify-content:space-between;font-size:11px;opacity:.7;margin-top:4px"><span>2005</span><span>2008</span><span>2011</span><span>2014</span><span>2017</span><span>2020</span><span>2023</span><span>2025</span></div><div style="font-size:12px;opacity:.75;margin-top:4px">拖动鼠标查看房间 · 滚轮靠近桌面 · 点击物品看故事 · 点击显示器操作屏幕</div>'
wrap.appendChild(tl)

const slider = tl.querySelector('#slider')
const yearNum = tl.querySelector('#yearNum')
const yearLabel = wrap.querySelector('#yearLabel')
const playBtn = tl.querySelector('#playBtn')

const ERALABEL = {
  2005: '卧室电脑角 · CRT 时代',
  2008: '宽屏 + 拉风机箱 · 网吧风初现',
  2011: '机械键盘 · 收藏与手办',
  2014: '双屏 · VR 雏形',
  2017: '三屏 · 直播开局',
  2020: '电竞房成型 · RGB 灯带',
  2023: '终章 · 满墙柜与超宽屏',
}
function labelFor(y) {
  const keys = [2005, 2008.5, 2011, 2014, 2017, 2020, 2023]
  let cur = keys[0]
  for (const k of keys) if (y >= k) cur = k
  return ERALABEL[cur] || ERALABEL[2005]
}

let year = 2005
let playing = false
let direction = 1

function setYearUI(y) {
  year = y
  yearNum.textContent = y.toFixed(0)
  yearLabel.textContent = y.toFixed(0) + ' 年 · ' + labelFor(y)
  slider.value = String(y)
  screenUI.setYear(y)
}
slider.addEventListener('input', e => { playing = false; playBtn.textContent = '▶ 自动播放'; setYearUI(parseFloat(e.target.value)) })
playBtn.addEventListener('click', () => {
  playing = !playing
  playBtn.textContent = playing ? '⏸ 暂停' : '▶ 自动播放'
})

// 点击物体：说明
const INFO = {
  monitor: { 2005: '17 英寸 CRT，显像管伸出老长。', title: '显示器' },
  pc: { 2005: '米色塔箱，侧板拧着螺丝。', title: '主机' },
  keyboard: { 2005: '薄膜键盘，敲起来像敲计算器。', title: '键盘' },
  mouse: { 2005: '滚轮鼠标，滚轮咔哒作响。', title: '鼠标' },
  cd: { 2005: '游戏 CD 盒堆在桌角，安装要换三张盘。', title: '光盘' },
  dvd: { 2008: 'DVD 碟，电影和游戏都靠它。', title: '碟片' },
  manga: { 2008: '桌边的小漫画。', title: '漫画' },
  poster: { 2005: '亲手贴的海报，胶带都黄了。', title: '海报' },
  'sticky-note': { 2005: '提醒自己打游戏的便利贴。', title: '便利贴' },
  chair: { 2005: '二手的塑料椅，坐久了腰疼。', title: '椅子' },
  headset: { 2008: '耳机，听脚步声救了无数次命。', title: '耳机' },
  'led-strip': { 2008: '第一根灯带，贴在墙上就觉得像电竞房。', title: '灯带' },
  controller: { 2011: '手柄，跳过键盘练手感。', title: '手柄' },
  collectible: { 2011: '第一只手办，盒子都不舍得拆。', title: '收藏' },
  vr: { 2014: 'VR 盒子，戴上头盱晕乎乎的。', title: 'VR 设备' },
  mic: { 2017: '直播麦，声音比以前清楚了。', title: '麦克风' },
  camera: { 2017: '直播摄像头，桌面上多了个补光灯。', title: '摄像头' },
  trophy: { 2020: '奖杯，放在鼠标旁边。', title: '奖杯' },
  rack: { 2020: '机架，服务器灯一闪一闪。', title: '机架' },
  cabinet: { 2023: '满墙柜，游戏盒和书都摆满了。', title: '展示柜' },
  display: { 2023: '展示柜，收藏品都放这里。', title: '展示柜' },
  table: { 2005: '一直是这张桌子。', title: '书桌' },
  plant: { 2005: '从 2005 年就摆在那儿的绿植。', title: '绿植' },
  'fish-tank': { 2005: '鱼缸里的鱼一直在。', title: '鱼缸' },
  books: { 2005: '摸过的书还在书架上。', title: '书' },
  shelf: { 2005: '深木书架，伴随二十年。', title: '书架' },
  armchair: { 2005: '旧臂chair，靠着它看天花板。', title: '旧椅子' },
  'old-pc': { 2005: '角落里的老电脑，偶尔还开一下。', title: '老电脑' },
  'night-lamp': { 2005: '小夜灯，亮了二十年。', title: '小夜灯' },
  retired: { 2011: '退役的旧设备，收在角落里。', title: '旧物' },
  'ceiling-lamp': { 2005: '天花灯一直都在。', title: '天花灯' },
}
function showInfo(tag) {
  const e = INFO[tag] || { title: tag, 2005: '这里的故事要靠你慢慢发现。' }
  // 取当前年份最近的说明（简单：用当前年份区间）
  const keys = Object.keys(e).filter(k => !isNaN(Number(k))).map(Number).sort((a, b) => a - b)
  if (!keys.length) {
    panel.querySelector('#panelTitle').textContent = e.title
    panel.querySelector('#panelBody').textContent = e['2005'] || ''
  } else {
    let c = keys[0]
    for (const k of keys) if (year >= k) c = k
    panel.querySelector('#panelTitle').textContent = e.title
    panel.querySelector('#panelBody').textContent = e[c]
  }
  panel.style.display = 'block'
}

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let downPos = null
let downTime = 0
renderer.domElement.addEventListener('pointerdown', e => { downPos = [e.clientX, e.clientY]; downTime = performance.now() })
renderer.domElement.addEventListener('pointerup', e => {
  if (!downPos) return
  const dx = e.clientX - downPos[0], dy = e.clientY - downPos[1]
  const dt = performance.now() - downTime
  downPos = null
  if (Math.hypot(dx, dy) > 6 || dt > 450) return
  pointer.x = (e.clientX / innerWidth) * 2 - 1
  pointer.y = -(e.clientY / innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects([...keeps.children, ...eraGroups.flatMap(g => g.group.children)], true)
  if (!hits.length) { panel.style.display = 'none'; return }
  const obj = hits[0].object
  // 屏幕点击：打开屏幕面板并映射点击
  if (obj === screenPlane) {
    sp.style.display = 'block'
    document.getElementById('screenHint').textContent = screenUI.era().title
    const rect = renderer.domElement.getBoundingClientRect()
    // 用命中点的 UV 映射到 512×320
    const uv = hits[0].uv
    if (uv) screenUI.click(uv.x * 512, (1 - uv.y) * 320)
    return
  }
  sp.style.display = 'none'
  for (let o = obj; o; o = o.parent) {
    const tags = o.userData.tags || []
    if (tags.length) { showInfo(tags[0]); return }
  }
})

// 屏幕 HUD 点击映射
hudCanvas.addEventListener('pointerdown', e => {
  const r = hudCanvas.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width) * 512
  const y = ((e.clientY - r.top) / r.height) * 320
  screenUI.click(x, y)
})
hudCanvas.addEventListener('pointermove', e => {
  const r = hudCanvas.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width) * 512
  const y = ((e.clientY - r.top) / r.height) * 320
  screenUI.move(x, y)
})
addEventListener('keydown', e => screenUI.key(e.key))

// ---------- 主循环 ----------
const clock = new THREE.Clock()
let fishT = 0

function tick() {
  requestAnimationFrame(tick)
  const dt = Math.min(clock.getDelta(), 0.05)
  fishT += dt

  if (playing) {
    direction = 1
    let ny = year + dt * 1.6 // 约 12.5 秒走完 20 年
    if (ny >= 2025) { ny = 2025; playing = false; playBtn.textContent = '▶ 自动播放' }
    setYearUI(ny)
  }

  applyYear(eraGroups, year, scene)

  // 鱼游动
  const fish = keeps.getObjectByName('fish')
  if (fish) { fish.position.x = -3.4 + Math.sin(fishT * 1.2) * 0.18; fish.rotation.y = Math.cos(fishT * 1.2) > 0 ? 0 : Math.PI }

  // 光：随年代微调（保持温暖树调，不只靠 RGB）
  const t = (year - 2005) / 20
  const warm = new THREE.Color(0xffe6bf).lerp(new THREE.Color(0xfff3dd), t)
  key.color.copy(warm)
  key.intensity = 1.2 + Math.sin(year * 0.4) * 0.08

  screenUI.update(dt)
  screenUI.render(fishT)
  screenTex.needsUpdate = true
  if (sp.style.display === 'block') {
    hudCtx.drawImage(screenCanvas, 0, 0, hudCanvas.width, hudCanvas.height)
  }

  controls.update()
  renderer.render(scene, camera)
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})

setYearUI(2005)
tick()
