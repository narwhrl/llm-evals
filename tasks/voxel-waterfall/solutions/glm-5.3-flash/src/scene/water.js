// 水体：沿河道生成的阶梯状水带（每格一个水平面 + 落差处竖直立面）、终点湖面与浪花粒子。
// 水流条纹在片元着色器中按 uv.v 方向滚动，跌水处 v 按落差累加，形成顺崖而下的流动感。
import * as THREE from 'three'
import { WORLD_SIZE, cellToWorldX, cellToWorldZ } from './terrain.js'
import { makeRng } from './noise.js'

const VERT = [
  'varying vec2 vUv;',
  '#include <fog_pars_vertex>',
  'void main() {',
  '  vUv = uv;',
  '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
  '  gl_Position = projectionMatrix * mvPosition;',
  '  #include <fog_vertex>',
  '}',
].join('\n')

const FRAG = [
  'uniform float uTime;',
  'uniform float uSpeed;',
  'uniform float uMode;',
  'uniform vec3 uDeep;',
  'uniform vec3 uShallow;',
  'uniform vec3 uFoam;',
  'uniform vec3 uTint;',
  'varying vec2 vUv;',
  '#include <fog_pars_fragment>',
  'float vhash(vec2 p) {',
  '  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);',
  '}',
  'void main() {',
  '  vec3 col;',
  '  float alpha = 0.94;',
  '  if (uMode < 0.5) {',
  '    float flow = vUv.y * 1.1 - uTime * uSpeed;',
  '    vec2 cell = floor(vec2(vUv.x * 2.0, vUv.y * 6.0));',
  '    float n = vhash(cell);',
  '    float band = 0.5 + 0.5 * sin(flow + n * 1.2);',
  '    float streak = smoothstep(0.42, 0.9, band);',
  '    col = mix(uDeep, uShallow, clamp(0.55 + 0.45 * band, 0.0, 1.0));',
  '    col = mix(col, uFoam, streak * 0.6);',
  '    float edge = smoothstep(0.0, 0.07, vUv.x) * smoothstep(1.0, 0.93, vUv.x);',
  '    alpha = 0.96 + 0.04 * edge;',
  '  } else {',
  '    float r = length(vUv - 0.5) * 2.0;',
  '    float ripple = 0.5 + 0.5 * sin(r * 26.0 - uTime * 1.6);',
  '    vec2 cell = floor(vUv * 14.0);',
  '    float n = vhash(cell);',
  '    col = mix(uDeep, uShallow, 0.5 + 0.22 * ripple);',
  '    col = mix(col, uFoam, smoothstep(0.86, 0.98, r) * (0.25 + 0.35 * n));',
  '    alpha = 0.92;',
  '  }',
  '  gl_FragColor = vec4(col * uTint, alpha);',
  '  #include <fog_fragment>',
  '}',
].join('\n')

function makeWaterMaterial(mode) {
  const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      uTime: { value: 0 },
      uSpeed: { value: 1.0 },
      uMode: { value: mode },
      uDeep: { value: new THREE.Color(0x0d5c8c) },
      uShallow: { value: new THREE.Color(0x9adcf5) },
      uFoam: { value: new THREE.Color(0xffffff) },
      uTint: { value: new THREE.Color(1, 1, 1) },
    },
  ])
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    side: THREE.DoubleSide,
    fog: true,
    depthWrite: true,
  })
}

// 把一条路径展开成阶梯状水带几何。
function buildPathGeometry(path) {
  const positions = []
  const uvs = []
  const indices = []
  let vAcc = 0
  const yOf = (f) => f + 0.45

  const pushQuad = (corners, quadUvs) => {
    const base = positions.length / 3
    for (let k = 0; k < 4; k++) {
      positions.push(corners[k][0], corners[k][1], corners[k][2])
      uvs.push(quadUvs[k][0], quadUvs[k][1])
    }
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3)
  }

  for (let i = 0; i < path.length; i++) {
    const c = path[i]
    const px = cellToWorldX(c.x)
    const pz = cellToWorldZ(c.z)
    const y = yOf(c.f)

    // 该格的流动轴：优先看下游，首格看上游
    let axis = null // 'x' | 'z'
    if (i < path.length - 1) axis = path[i + 1].x !== c.x ? 'x' : 'z'
    else axis = path[i - 1].x !== c.x ? 'x' : 'z'

    // 水平面：u 横穿河道，v 沿流向累计
    let corners
    let quv
    if (axis === 'x') {
      corners = [
        [px - 0.5, y, pz - 0.5],
        [px + 0.5, y, pz - 0.5],
        [px + 0.5, y, pz + 0.5],
        [px - 0.5, y, pz + 0.5],
      ]
      quv = [
        [0, vAcc],
        [1, vAcc],
        [1, vAcc + 1],
        [0, vAcc + 1],
      ]
    } else {
      corners = [
        [px - 0.5, y, pz - 0.5],
        [px - 0.5, y, pz + 0.5],
        [px + 0.5, y, pz + 0.5],
        [px + 0.5, y, pz - 0.5],
      ]
      quv = [
        [0, vAcc],
        [0, vAcc + 1],
        [1, vAcc + 1],
        [1, vAcc],
      ]
    }
    pushQuad(corners, quv)
    vAcc += 1

    // 跌水立面：横跨河道宽度，v 按落差累加
    if (i < path.length - 1) {
      const drop = c.f - path[i + 1].f
      if (drop > 0.01) {
        const nx = cellToWorldX(path[i + 1].x)
        const nz = cellToWorldZ(path[i + 1].z)
        const mx = (px + nx) / 2
        const mz = (pz + nz) / 2
        const yb = yOf(path[i + 1].f)
        const dv = drop * 0.8
        if (axis === 'x') {
          pushQuad(
            [
              [mx, y, pz - 0.5],
              [mx, y, pz + 0.5],
              [mx, yb, pz + 0.5],
              [mx, yb, pz - 0.5],
            ],
            [
              [0, vAcc],
              [1, vAcc],
              [1, vAcc + dv],
              [0, vAcc + dv],
            ]
          )
        } else {
          pushQuad(
            [
              [px - 0.5, y, mz],
              [px + 0.5, y, mz],
              [px + 0.5, yb, mz],
              [px - 0.5, yb, mz],
            ],
            [
              [0, vAcc],
              [1, vAcc],
              [1, vAcc + dv],
              [0, vAcc + dv],
            ]
          )
        }
        vAcc += dv
      }
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  return geo
}

// 终点湖面：每格一个水面 quad，uv 以湖心为原点归一化，用于同心涟漪。
function buildPoolGeometry(paths, waterMask) {
  const positions = []
  const uvs = []
  const indices = []
  const N = WORLD_SIZE
  const idx = (x, z) => z * N + x

  for (const p of paths) {
    const pool = p.pool
    const level = pool.level + 0.45
    const pcx = cellToWorldX(pool.x)
    const pcz = cellToWorldZ(pool.z)
    const R = pool.r
    const RInt = Math.ceil(R) + 1
    for (let dz = -RInt; dz <= RInt; dz++) {
      for (let dx = -RInt; dx <= RInt; dx++) {
        const gx = pool.x + dx
        const gz = pool.z + dz
        if (gx < 0 || gz < 0 || gx >= N || gz >= N) continue
        if (waterMask[idx(gx, gz)] !== 2) continue
        const wx = cellToWorldX(gx)
        const wz = cellToWorldZ(gz)
        const base = positions.length / 3
        positions.push(
          wx - 0.5, level, wz - 0.5,
          wx + 0.5, level, wz - 0.5,
          wx + 0.5, level, wz + 0.5,
          wx - 0.5, level, wz + 0.5
        )
        const u0 = ((wx - 0.5 - pcx) / R) * 0.5 + 0.5
        const u1 = ((wx + 0.5 - pcx) / R) * 0.5 + 0.5
        const v0 = ((wz - 0.5 - pcz) / R) * 0.5 + 0.5
        const v1 = ((wz + 0.5 - pcz) / R) * 0.5 + 0.5
        uvs.push(u0, v0, u1, v0, u1, v1, u0, v1)
        indices.push(base, base + 2, base + 1, base, base + 3, base + 2)
      }
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  return geo
}

// 浪花粒子：每个跌水点喷射一簇小方块，简单抛物线循环。
class Foam {
  constructor(plunges) {
    const per = 26
    const total = Math.min(480, plunges.length * per)
    const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x777777, transparent: true, opacity: 0.95 })
    this.mesh = new THREE.InstancedMesh(geo, mat, total)
    this.mesh.frustumCulled = false
    this.items = []
    const rng = makeRng(4242)
    for (let i = 0; i < total; i++) {
      const p = plunges[i % plunges.length]
      this.items.push(this.spawn(p, rng, true))
    }
    this.dummy = new THREE.Object3D()
    this.update(0)
  }

  spawn(p, rng, randomPhase) {
    const life = 0.6 + rng() * 0.7
    const ang = rng() * Math.PI * 2
    const rad = rng() * 0.6
    return {
      px: p.x + Math.cos(ang) * rad,
      py: p.y + (randomPhase ? rng() * 2.0 : 0),
      pz: p.z + Math.sin(ang) * rad,
      vx: Math.cos(ang) * (0.5 + rng() * 0.9),
      vy: 3.5 + rng() * 3.5,
      vz: Math.sin(ang) * (0.5 + rng() * 0.9),
      life,
      age: randomPhase ? rng() * life : 0,
      s: 0.75 + rng() * 0.7,
      src: p,
    }
  }

  update(dt) {
    const rng = Math.random
    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i]
      it.age += dt
      if (it.age >= it.life) {
        Object.assign(it, this.spawn(it.src, rng, false))
      }
      it.vy -= 14 * dt
      it.px += it.vx * dt
      it.py += it.vy * dt
      it.pz += it.vz * dt
      const k = it.age / it.life
      this.dummy.position.set(it.px, it.py, it.pz)
      this.dummy.scale.setScalar(it.s * (1 - k * 0.6))
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)
    }
    this.mesh.instanceMatrix.needsUpdate = true
  }

  dispose() {
    this.mesh.geometry.dispose()
    this.mesh.material.dispose()
  }
}

export function createWater(paths, waterMask) {
  const group = new THREE.Group()
  const fallMat = makeWaterMaterial(0)
  const poolMat = makeWaterMaterial(1)

  const pathGeos = []
  for (const p of paths) {
    const g = buildPathGeometry(p.cells)
    pathGeos.push(g)
    const m = new THREE.Mesh(g, fallMat)
    m.renderOrder = 1
    group.add(m)
  }

  const poolGeo = buildPoolGeometry(paths, waterMask)
  const poolMesh = new THREE.Mesh(poolGeo, poolMat)
  poolMesh.renderOrder = 1
  group.add(poolMesh)

  const plunges = []
  for (const p of paths) for (const pl of p.plunges) plunges.push(pl)
  const foam = new Foam(plunges)
  group.add(foam.mesh)

  let time = 0
  let speed = 1

  return {
    group,
    setSpeed(v) {
      speed = v
    },
    setTint(c) {
      fallMat.uniforms.uTint.value.copy(c)
      poolMat.uniforms.uTint.value.copy(c)
    },
    update(dt) {
      time += dt * speed
      fallMat.uniforms.uTime.value = time
      poolMat.uniforms.uTime.value = time
      foam.update(dt)
    },
    waterCellCount: paths.reduce((acc, p) => acc + p.cells.length, 0),
    plungeCount: plunges.length,
    dispose() {
      for (const g of pathGeos) g.dispose()
      poolGeo.dispose()
      fallMat.dispose()
      poolMat.dispose()
      foam.dispose()
    },
  }
}
