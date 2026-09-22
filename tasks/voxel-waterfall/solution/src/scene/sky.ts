import * as THREE from 'three'
import { lerp, smooth01 } from './noise'
import { TIME_ORDER, TIME_PRESETS } from './options'
import type { TimePreset } from './options'

export type SkyUniforms = {
  uTop: { value: THREE.Color }
  uHorizon: { value: THREE.Color }
  uGlow: { value: THREE.Color }
  uSunDirection: { value: THREE.Vector3 }
  uGlowStrength: { value: number }
}

/** 渐变天穹：不写深度、最先绘制，永远贴在相机背后的背景上。 */
export function createSkyDome(): { mesh: THREE.Mesh; uniforms: SkyUniforms } {
  const uniforms: SkyUniforms = {
    uTop: { value: new THREE.Color(0x3d79c4) },
    uHorizon: { value: new THREE.Color(0xd2e6f6) },
    uGlow: { value: new THREE.Color(0xfff3da) },
    uSunDirection: { value: new THREE.Vector3(0.4, 0.5, 0.6) },
    uGlowStrength: { value: 0.55 },
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    fog: false,
    vertexShader: /* glsl */ `
      varying vec3 vDirection;
      void main() {
        vDirection = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop;
      uniform vec3 uHorizon;
      uniform vec3 uGlow;
      uniform vec3 uSunDirection;
      uniform float uGlowStrength;
      varying vec3 vDirection;
      void main() {
        vec3 direction = normalize(vDirection);
        float blend = smoothstep(-0.05, 0.62, direction.y);
        vec3 color = mix(uHorizon, uTop, blend);
        float sun = max(dot(direction, normalize(uSunDirection)), 0.0);
        color += uGlow * pow(sun, 12.0) * uGlowStrength;
        color += uGlow * pow(sun, 3.0) * 0.14 * uGlowStrength;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  })

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), material)
  mesh.frustumCulled = false
  mesh.renderOrder = -1000
  mesh.scale.setScalar(1200)
  return { mesh, uniforms }
}

export type ResolvedTime = {
  sunDirection: THREE.Vector3
  sunColor: THREE.Color
  sunIntensity: number
  hemiSky: THREE.Color
  hemiGround: THREE.Color
  hemiIntensity: number
  skyTop: THREE.Color
  skyHorizon: THREE.Color
  glowColor: THREE.Color
  glowStrength: number
  fogColor: THREE.Color
  exposure: number
}

export function createResolvedTime(): ResolvedTime {
  return {
    sunDirection: new THREE.Vector3(0, 1, 0),
    sunColor: new THREE.Color(0xffffff),
    sunIntensity: 1,
    hemiSky: new THREE.Color(0xffffff),
    hemiGround: new THREE.Color(0x444444),
    hemiIntensity: 0.6,
    skyTop: new THREE.Color(0x3d79c4),
    skyHorizon: new THREE.Color(0xd2e6f6),
    glowColor: new THREE.Color(0xfff3da),
    glowStrength: 0.5,
    fogColor: new THREE.Color(0xcfe1ef),
    exposure: 1,
  }
}

const scratch = new THREE.Color()

function blend(a: TimePreset, b: TimePreset, t: number, out: ResolvedTime): void {
  out.sunColor.setHex(a.sunColor).lerp(scratch.setHex(b.sunColor), t)
  out.hemiSky.setHex(a.hemiSky).lerp(scratch.setHex(b.hemiSky), t)
  out.hemiGround.setHex(a.hemiGround).lerp(scratch.setHex(b.hemiGround), t)
  out.skyTop.setHex(a.skyTop).lerp(scratch.setHex(b.skyTop), t)
  out.skyHorizon.setHex(a.skyHorizon).lerp(scratch.setHex(b.skyHorizon), t)
  out.glowColor.setHex(a.glowColor).lerp(scratch.setHex(b.glowColor), t)
  out.fogColor.setHex(a.fogColor).lerp(scratch.setHex(b.fogColor), t)

  const azimuth = THREE.MathUtils.degToRad(lerp(a.sunAzimuth, b.sunAzimuth, t))
  const elevation = THREE.MathUtils.degToRad(lerp(a.sunElevation, b.sunElevation, t))
  const horizontal = Math.cos(elevation)
  out.sunDirection.set(horizontal * Math.sin(azimuth), Math.sin(elevation), horizontal * Math.cos(azimuth))

  out.sunIntensity = lerp(a.sunIntensity, b.sunIntensity, t)
  out.hemiIntensity = lerp(a.hemiIntensity, b.hemiIntensity, t)
  out.glowStrength = lerp(a.glowStrength, b.glowStrength, t)
  out.exposure = lerp(a.exposure, b.exposure, t)
}

export function timePhaseOf(label: string): number {
  const index = TIME_ORDER.indexOf(label as (typeof TIME_ORDER)[number])
  return index < 0 ? 0 : index
}

/** 把循环相位（以预设序号为单位，可含小数）解析成一组可直接套用的光照参数。 */
export function sampleTime(phase: number, out: ResolvedTime): void {
  const count = TIME_ORDER.length
  const wrapped = ((phase % count) + count) % count
  const index = Math.floor(wrapped)
  const fraction = smooth01(wrapped - index)
  blend(
    TIME_PRESETS[TIME_ORDER[index]],
    TIME_PRESETS[TIME_ORDER[(index + 1) % count]],
    fraction,
    out,
  )
}

export type LightingRig = {
  sun: THREE.DirectionalLight
  hemi: THREE.HemisphereLight
  fog: THREE.FogExp2
  renderer: THREE.WebGLRenderer
  sky: SkyUniforms
}

export function applyTime(resolved: ResolvedTime, rig: LightingRig, sunDistance: number): void {
  rig.sun.color.copy(resolved.sunColor)
  rig.sun.intensity = resolved.sunIntensity
  rig.sun.position.copy(resolved.sunDirection).multiplyScalar(sunDistance)
  rig.sun.target.position.set(0, 0, 0)
  rig.sun.target.updateMatrixWorld()

  rig.hemi.color.copy(resolved.hemiSky)
  rig.hemi.groundColor.copy(resolved.hemiGround)
  rig.hemi.intensity = resolved.hemiIntensity

  rig.fog.color.copy(resolved.fogColor)
  rig.sky.uTop.value.copy(resolved.skyTop)
  rig.sky.uHorizon.value.copy(resolved.skyHorizon)
  rig.sky.uGlow.value.copy(resolved.glowColor)
  rig.sky.uGlowStrength.value = resolved.glowStrength
  rig.sky.uSunDirection.value.copy(resolved.sunDirection)
  rig.renderer.toneMappingExposure = resolved.exposure
}
