// 环境与光照：渐变天空穹顶（含太阳光晕与夜晚星空）、方向光/半球光、时段预设与平滑过渡。
import * as THREE from 'three'

export const PRESETS = {
  dawn: {
    skyTop: 0x6f8fc4,
    skyHorizon: 0xf4c99a,
    sunColor: 0xffd9a8,
    sunAz: 105,
    sunEl: 14,
    sunIntensity: 2.6,
    hemiSky: 0xbcd0e8,
    hemiGround: 0x6b5a48,
    hemiIntensity: 0.9,
    ambient: 0.28,
    fog: 0xe3c4a2,
    fogNear: 130,
    fogFar: 640,
    waterTint: [1.0, 0.9, 0.82],
    night: 0,
  },
  day: {
    skyTop: 0x3f83d6,
    skyHorizon: 0xbfe2f7,
    sunColor: 0xfff2dc,
    sunAz: 55,
    sunEl: 60,
    sunIntensity: 3.1,
    hemiSky: 0xcfe4f7,
    hemiGround: 0x7a8a6a,
    hemiIntensity: 1.0,
    ambient: 0.3,
    fog: 0xcfe3f2,
    fogNear: 150,
    fogFar: 700,
    waterTint: [1, 1, 1],
    night: 0,
  },
  dusk: {
    skyTop: 0x2f3f68,
    skyHorizon: 0xf28f4e,
    sunColor: 0xffab5e,
    sunAz: -80,
    sunEl: 11,
    sunIntensity: 2.7,
    hemiSky: 0x8a7ea8,
    hemiGround: 0x4a4038,
    hemiIntensity: 0.8,
    ambient: 0.24,
    fog: 0xdf9a68,
    fogNear: 120,
    fogFar: 620,
    waterTint: [1.0, 0.86, 0.76],
    night: 0,
  },
  night: {
    skyTop: 0x0a1230,
    skyHorizon: 0x22345a,
    sunColor: 0xbcccf0,
    sunAz: -40,
    sunEl: 42,
    sunIntensity: 0.75,
    hemiSky: 0x2a3c60,
    hemiGround: 0x141a26,
    hemiIntensity: 0.5,
    ambient: 0.16,
    fog: 0x18243c,
    fogNear: 110,
    fogFar: 560,
    waterTint: [0.6, 0.7, 0.95],
    night: 1,
  },
}

const SKY_VERT = [
  'varying vec3 vDir;',
  'void main() {',
  '  vDir = position;',
  '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
  '  gl_Position = projectionMatrix * mvPosition;',
  '}',
].join('\n')

const SKY_FRAG = [
  'uniform vec3 uTop;',
  'uniform vec3 uHorizon;',
  'uniform vec3 uSunColor;',
  'uniform vec3 uSunDir;',
  'uniform float uNight;',
  'varying vec3 vDir;',
  'float shash(vec3 p) {',
  '  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);',
  '}',
  'void main() {',
  '  vec3 dir = normalize(vDir);',
  '  vec3 col = mix(uHorizon, uTop, smoothstep(0.0, 0.45, dir.y));',
  '  if (dir.y < 0.0) {',
  '    col = mix(uHorizon, uHorizon * 0.55, smoothstep(0.0, -0.4, dir.y));',
  '  }',
  '  float sunAmt = max(dot(dir, uSunDir), 0.0);',
  '  col += uSunColor * (pow(sunAmt, 260.0) * 1.4 + pow(sunAmt, 24.0) * 0.30);',
  '  if (uNight > 0.01 && dir.y > 0.02) {',
  '    vec3 cellp = floor(dir * 130.0);',
  '    float s = shash(cellp);',
  '    float star = step(0.9985, s) * smoothstep(0.02, 0.2, dir.y);',
  '    col += vec3(star) * uNight * (0.7 + 0.5 * shash(cellp + 7.0));',
  '  }',
  '  gl_FragColor = vec4(col, 1.0);',
  '}',
].join('\n')

function dirFromAzEl(azDeg, elDeg) {
  const az = (azDeg * Math.PI) / 180
  const el = (elDeg * Math.PI) / 180
  return new THREE.Vector3(Math.cos(el) * Math.sin(az), Math.sin(el), Math.cos(el) * Math.cos(az))
}

export function createEnvironment(scene) {
  const skyUniforms = {
    uTop: { value: new THREE.Color() },
    uHorizon: { value: new THREE.Color() },
    uSunColor: { value: new THREE.Color() },
    uSunDir: { value: new THREE.Vector3(0, 1, 0) },
    uNight: { value: 0 },
  }
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    vertexShader: SKY_VERT,
    fragmentShader: SKY_FRAG,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  })
  const sky = new THREE.Mesh(new THREE.SphereGeometry(850, 32, 16), skyMat)
  sky.renderOrder = -10
  scene.add(sky)

  const sun = new THREE.DirectionalLight(0xffffff, 3)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.left = -145
  sun.shadow.camera.right = 145
  sun.shadow.camera.top = 145
  sun.shadow.camera.bottom = -145
  sun.shadow.camera.near = 20
  sun.shadow.camera.far = 520
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.9
  scene.add(sun)
  scene.add(sun.target)

  const hemi = new THREE.HemisphereLight(0xcfe4f7, 0x7a8a6a, 1.0)
  scene.add(hemi)
  const ambient = new THREE.AmbientLight(0xffffff, 0.3)
  scene.add(ambient)

  scene.fog = new THREE.Fog(0xdf9a68, 120, 620)

  // 当前插值状态（向目标预设平滑过渡）
  const cur = {
    skyTop: new THREE.Color(),
    skyHorizon: new THREE.Color(),
    sunColor: new THREE.Color(),
    hemiSky: new THREE.Color(),
    hemiGround: new THREE.Color(),
    fog: new THREE.Color(),
    sunDir: new THREE.Vector3(0, 1, 0),
    sunIntensity: 3,
    hemiIntensity: 1,
    ambient: 0.3,
    fogNear: 130,
    fogFar: 640,
    waterTint: new THREE.Color(1, 1, 1),
    night: 0,
  }
  let target = PRESETS.dusk
  const tmpDir = new THREE.Vector3()
  const tmpColor = new THREE.Color()

  const applyTarget = (p, immediate) => {
    target = p
    if (immediate) {
      cur.skyTop.set(p.skyTop)
      cur.skyHorizon.set(p.skyHorizon)
      cur.sunColor.set(p.sunColor)
      cur.hemiSky.set(p.hemiSky)
      cur.hemiGround.set(p.hemiGround)
      cur.fog.set(p.fog)
      cur.sunDir.copy(dirFromAzEl(p.sunAz, p.sunEl))
      cur.sunIntensity = p.sunIntensity
      cur.hemiIntensity = p.hemiIntensity
      cur.ambient = p.ambient
      cur.fogNear = p.fogNear
      cur.fogFar = p.fogFar
      cur.waterTint.setRGB(p.waterTint[0], p.waterTint[1], p.waterTint[2])
      cur.night = p.night
      commit()
    }
  }

  const commit = () => {
    skyUniforms.uTop.value.copy(cur.skyTop)
    skyUniforms.uHorizon.value.copy(cur.skyHorizon)
    skyUniforms.uSunColor.value.copy(cur.sunColor)
    skyUniforms.uSunDir.value.copy(cur.sunDir).normalize()
    skyUniforms.uNight.value = cur.night
    sun.color.copy(cur.sunColor)
    sun.intensity = cur.sunIntensity
    tmpDir.copy(cur.sunDir).normalize().multiplyScalar(230)
    sun.position.copy(tmpDir)
    hemi.color.copy(cur.hemiSky)
    hemi.groundColor.copy(cur.hemiGround)
    hemi.intensity = cur.hemiIntensity
    ambient.intensity = cur.ambient
    scene.fog.color.copy(cur.fog)
    scene.fog.near = cur.fogNear
    scene.fog.far = cur.fogFar
  }

  const lerp = (k) => {
    cur.skyTop.lerp(tmpColor.set(target.skyTop), k)
    cur.skyHorizon.lerp(tmpColor.set(target.skyHorizon), k)
    cur.sunColor.lerp(tmpColor.set(target.sunColor), k)
    cur.hemiSky.lerp(tmpColor.set(target.hemiSky), k)
    cur.hemiGround.lerp(tmpColor.set(target.hemiGround), k)
    cur.fog.lerp(tmpColor.set(target.fog), k)
    cur.sunDir.lerp(dirFromAzEl(target.sunAz, target.sunEl), k)
    cur.sunIntensity += (target.sunIntensity - cur.sunIntensity) * k
    cur.hemiIntensity += (target.hemiIntensity - cur.hemiIntensity) * k
    cur.ambient += (target.ambient - cur.ambient) * k
    cur.fogNear += (target.fogNear - cur.fogNear) * k
    cur.fogFar += (target.fogFar - cur.fogFar) * k
    cur.waterTint.lerp(tmpColor.setRGB(target.waterTint[0], target.waterTint[1], target.waterTint[2]), k)
    cur.night += (target.night - cur.night) * k
    commit()
  }

  return {
    sun,
    applyTarget,
    currentTint: cur.waterTint,
    update(dt) {
      lerp(1 - Math.exp(-2.5 * dt))
    },
    dispose() {
      sky.geometry.dispose()
      skyMat.dispose()
      scene.remove(sky, sun, hemi, ambient, sun.target)
    },
  }
}
