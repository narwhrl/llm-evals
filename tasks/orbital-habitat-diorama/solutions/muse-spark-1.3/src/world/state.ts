import * as THREE from 'three'

// Shared registries: builders add to these, main.ts owns the loop + interaction.
export interface Clickable {
  id: string
  object: THREE.Object3D
  focus?: { cam: THREE.Vector3, tgt: THREE.Vector3, zoom: number }
  action?: 'pen' | 'plant' | 'strip' | 'porthole' | 'focus'
}

export interface Blinker {
  mat: THREE.MeshStandardMaterial
  color: THREE.Color
  dim: THREE.Color
  speed: number
  phase: number
}

export interface Ctx {
  scene: THREE.Scene
  clickables: Clickable[]
  blinkers: Blinker[]
  tickers: Array<(dt: number, t: number) => void>
  leds: THREE.MeshStandardMaterial[]
}

export function makeCtx (scene: THREE.Scene): Ctx {
  return { scene, clickables: [], blinkers: [], tickers: [], leds: [] }
}

export function addBlinker (ctx: Ctx, color: number, speed: number): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    emissive: new THREE.Color(color),
    emissiveIntensity: 1,
    roughness: 0.4
  })
  ctx.blinkers.push({
    mat,
    color: new THREE.Color(color),
    dim: new THREE.Color(color).multiplyScalar(0.06),
    speed,
    phase: Math.random() * Math.PI * 2
  })
  return mat
}

export function fmt2 (n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

export const rnd = (() => {
  let s = 987654321
  return () => (s = (s * 16807) % 2147483647) / 2147483647
})()
