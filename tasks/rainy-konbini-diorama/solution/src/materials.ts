import * as THREE from 'three';

export const OUTLINE_COLOR = '#0a0d16';

let gradientMap: THREE.DataTexture | null = null;

// Four-step grayscale ramp that gives MeshToonMaterial its cel-band look.
function toonGradient(): THREE.DataTexture {
  if (!gradientMap) {
    const data = new Uint8Array([95, 155, 210, 255]);
    gradientMap = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.generateMipmaps = false;
    gradientMap.needsUpdate = true;
  }
  return gradientMap;
}

export function toon(color: THREE.ColorRepresentation): THREE.MeshToonMaterial {
  return new THREE.MeshToonMaterial({ color, gradientMap: toonGradient() });
}

export function flat(
  color: THREE.ColorRepresentation,
  toneMapped = true,
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color, toneMapped });
}

// Inverted-hull outline: renders the same geometry with back faces pushed out
// along their normals, producing the crisp anime contour line around a mesh.
const HULL_VERT = /* glsl */ `
  uniform float uThickness;
  void main() {
    vec3 p = position + normal * uThickness;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const HULL_FRAG = /* glsl */ `
  uniform vec3 uColor;
  void main() { gl_FragColor = vec4(uColor, 1.0); }
`;

export function hull(mesh: THREE.Mesh, thickness = 0.028): void {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uThickness: { value: thickness },
      uColor: { value: new THREE.Color(OUTLINE_COLOR) },
    },
    vertexShader: HULL_VERT,
    fragmentShader: HULL_FRAG,
    side: THREE.BackSide,
  });
  mesh.add(new THREE.Mesh(mesh.geometry, mat));
}

// Places a box mesh with the given size/position and optional hull outline.
export function box(
  parent: THREE.Object3D,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
  mat: THREE.Material,
  opts: { outline?: number; rotY?: number; rotX?: number; rotZ?: number; shadow?: boolean } = {},
): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (opts.rotY) m.rotation.y = opts.rotY;
  if (opts.rotX) m.rotation.x = opts.rotX;
  if (opts.rotZ) m.rotation.z = opts.rotZ;
  if (opts.shadow) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  parent.add(m);
  if (opts.outline) hull(m, opts.outline);
  return m;
}

// Places a cylinder with its base sitting at y and optional hull outline.
export function cyl(
  parent: THREE.Object3D,
  rTop: number,
  rBottom: number,
  h: number,
  x: number,
  y: number,
  z: number,
  mat: THREE.Material,
  opts: { outline?: number; rotZ?: number; rotX?: number; seg?: number; shadow?: boolean } = {},
): THREE.Mesh {
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(rTop, rBottom, h, opts.seg ?? 14),
    mat,
  );
  m.position.set(x, y + h / 2, z);
  if (opts.rotZ) m.rotation.z = opts.rotZ;
  if (opts.rotX) m.rotation.x = opts.rotX;
  if (opts.shadow) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  parent.add(m);
  if (opts.outline) hull(m, opts.outline);
  return m;
}
