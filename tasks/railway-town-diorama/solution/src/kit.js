// Shared building blocks: seeded randomness, canvas textures, materials and unit-geometry mesh helpers.
import * as THREE from 'three'

// Seeded so the scenery is identical on every load.
export function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function canvasTexture(size, paint) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  paint(canvas.getContext('2d'), size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.anisotropy = 8
  return texture
}

export function speckleTexture(base, dots, count, seed) {
  const random = seeded(seed)
  return canvasTexture(256, (ctx, size) => {
    ctx.fillStyle = base
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = dots[i % dots.length]
      ctx.fillRect(random() * size, random() * size, 1 + random() * 2, 1 + random() * 2)
    }
  })
}

export function woodTexture(base, grain, seed) {
  const random = seeded(seed)
  return canvasTexture(512, (ctx, size) => {
    ctx.fillStyle = base
    ctx.fillRect(0, 0, size, size)
    ctx.strokeStyle = grain
    for (let i = 0; i < 90; i++) {
      const y = random() * size
      const wobble = 2 + random() * 5
      ctx.globalAlpha = 0.08 + random() * 0.28
      ctx.lineWidth = 0.6 + random() * 2.2
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.bezierCurveTo(size / 3, y + wobble, (2 * size) / 3, y - wobble, size, y)
      ctx.stroke()
    }
  })
}

export const mat = (color, options) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, ...options })

// Materials that light up at night; lighting.js drives their emissiveIntensity.
export const glow = {
  window: mat(0x3a4651, { roughness: 0.35, emissive: 0xffbf66, emissiveIntensity: 0 }),
  lamp: mat(0xf3ead6, { roughness: 0.4, emissive: 0xffd493, emissiveIntensity: 0 }),
}
export const darkWindow = mat(0x3a4651, { roughness: 0.35 })
export const asphalt = mat(0x857f78, { roughness: 0.95 })

const unitBox = new THREE.BoxGeometry(1, 1, 1)
const unitCylinder = new THREE.CylinderGeometry(1, 1, 1, 18)
const unitCones = {}
const unitGable = new THREE.ExtrudeGeometry(
  new THREE.Shape([new THREE.Vector2(-0.5, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0, 1)]),
  { depth: 1, bevelEnabled: false },
).translate(0, 0, -0.5)

function place(parent, geometry, material, x, y, z) {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)
  mesh.castShadow = mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

// Every helper positions the mesh by its centre except gable and cone, which sit on their base at y.
export function box(parent, material, w, h, d, x, y, z) {
  const mesh = place(parent, unitBox, material, x, y, z)
  mesh.scale.set(w, h, d)
  return mesh
}

export function cyl(parent, material, radius, h, x, y, z) {
  const mesh = place(parent, unitCylinder, material, x, y, z)
  mesh.scale.set(radius, h, radius)
  return mesh
}

export function cone(parent, material, radius, h, x, y, z, sides = 14) {
  unitCones[sides] ??= new THREE.ConeGeometry(1, 1, sides).translate(0, 0.5, 0)
  const mesh = place(parent, unitCones[sides], material, x, y, z)
  mesh.scale.set(radius, h, radius)
  if (sides === 4) mesh.rotation.y = Math.PI / 4
  return mesh
}

// Pitched roof with its ridge along x.
export function gable(parent, material, length, h, span, x, y, z) {
  const mesh = place(parent, unitGable, material, x, y, z)
  mesh.rotation.y = Math.PI / 2
  mesh.scale.set(span, h, length)
  return mesh
}
