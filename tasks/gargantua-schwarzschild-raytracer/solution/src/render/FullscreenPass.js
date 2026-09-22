/**
 * A single full-screen-triangle pass: one geometry shared by every stage of the pipeline, with the
 * material swapped per draw. The vertex shader ignores the camera entirely and writes clip-space
 * positions directly, so no projection state can leak into the physical render.
 */
import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
} from 'three'

const TRIANGLE = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])

export function createFullscreenGeometry() {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(TRIANGLE.slice(), 3))
  return geometry
}

/** Dummy camera: the vertex shader writes gl_Position directly, so nothing here affects the image. */
export function createPassCamera() {
  return new OrthographicCamera(-1, 1, 1, -1, 0, 1)
}

export function createPassScene() {
  const scene = new Scene()
  const camera = createPassCamera()
  const geometry = createFullscreenGeometry()
  const mesh = new Mesh(geometry, null)
  mesh.frustumCulled = false
  scene.add(mesh)
  return { scene, camera, mesh }
}

export function createShaderMaterial({ vertexShader, fragmentShader, uniforms, name }) {
  const material = new ShaderMaterial({
    name,
    vertexShader,
    fragmentShader,
    uniforms,
    depthTest: false,
    depthWrite: false,
  })
  // ShaderMaterial defaults to GLSL1; these shaders are GLSL ES 3.00.
  material.glslVersion = '300 es'
  return material
}
