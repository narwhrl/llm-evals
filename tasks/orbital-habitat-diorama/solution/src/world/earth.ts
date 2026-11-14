import * as THREE from 'three'
import dayUrl from '../assets/earth_day.png'
import nightUrl from '../assets/earth_night.png'
import cloudUrl from '../assets/earth_clouds.png'

export interface EarthRig {
  group: THREE.Group
  update: (dt: number, sunDir: THREE.Vector3, spin: number) => void
}

export async function buildEarth (scene: THREE.Scene): Promise<EarthRig> {
  const loader = new THREE.TextureLoader()
  const [dayMap, nightMap, cloudMap] = await Promise.all(
    [dayUrl, nightUrl, cloudUrl].map(u => loader.loadAsync(u))
  )
  for (const t of [dayMap, nightMap]) {
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
  }
  cloudMap.colorSpace = THREE.SRGBColorSpace

  const group = new THREE.Group()
  // large & centred on the default sight-line through the big porthole,
  // so the disc fills the ring from every allowed camera angle
  const R = 5
  group.position.set(-3.2, -3.2, -8.2)

  const uniforms = {
    dayMap: { value: dayMap },
    nightMap: { value: nightMap },
    sunDir: { value: new THREE.Vector3(0, 0, 1) }
  }
  const earthMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vNormalW;
      varying vec3 vPosW;
      void main () {
        vUv = uv;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vPosW = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D dayMap, nightMap;
      uniform vec3 sunDir;
      varying vec2 vUv;
      varying vec3 vNormalW;
      varying vec3 vPosW;
      void main () {
        vec3 n = normalize(vNormalW);
        float d = dot(n, normalize(sunDir));
        float dayMix = smoothstep(-0.10, 0.28, d);
        vec3 day = texture2D(dayMap, vUv).rgb * (0.12 + 1.25 * max(d, 0.0));
        vec3 night = texture2D(nightMap, vUv).rgb * 2.6 + vec3(0.012, 0.02, 0.045);
        vec3 col = mix(night, day, dayMix);
        // warm terminator line
        col += vec3(1.0, 0.42, 0.18) * pow(max(0.0, 1.0 - abs(d + 0.06)), 8.0) * 0.5;
        // blue limb glow, stronger on day side
        vec3 vdir = normalize(cameraPosition - vPosW);
        float fr = pow(1.0 - max(dot(n, vdir), 0.0), 2.6);
        col += vec3(0.32, 0.58, 1.0) * fr * (0.3 + 1.3 * dayMix);
        gl_FragColor = vec4(col, 1.0);
      }`
  })
  // fixed yaw so a landmass faces the default camera sight-line
  const face = new THREE.Group()
  face.rotation.y = -2.0
  group.add(face)
  face.add(new THREE.Mesh(new THREE.SphereGeometry(R, 72, 48), earthMat))

  // clouds: separate shell, own slow drift
  const cloudMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { cloudMap: { value: cloudMap }, sunDir: uniforms.sunDir },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      varying vec3 vNormalW;
      void main () {
        vUv = uv;
        vNormalW = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D cloudMap;
      uniform vec3 sunDir;
      varying vec2 vUv;
      varying vec3 vNormalW;
      void main () {
        vec4 c = texture2D(cloudMap, vUv);
        float d = dot(normalize(vNormalW), normalize(sunDir));
        float dayMix = smoothstep(-0.10, 0.28, d);
        vec3 col = c.rgb * (0.06 + 1.1 * max(d, 0.0) + 0.25 * dayMix);
        gl_FragColor = vec4(col, c.a * (0.25 + 0.75 * dayMix));
      }`
  })
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(R * 1.015, 48, 32), cloudMat)
  face.add(clouds)

  // atmosphere halo
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(R * 1.12, 48, 32),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */`
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main () {
          vNormalW = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vPosW = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: /* glsl */`
        varying vec3 vNormalW;
        varying vec3 vPosW;
        void main () {
          vec3 vdir = normalize(cameraPosition - vPosW);
          float f = pow(max(dot(normalize(vNormalW), vdir) * -1.0 + 0.72, 0.0), 3.2);
          gl_FragColor = vec4(vec3(0.3, 0.55, 1.0) * f * 0.9, f * 0.8);
        }`
    })
  )
  group.add(halo)
  scene.add(group)

  // starfield backdrop
  {
    const N = 900
    const pos = new Float32Array(N * 3)
    let s = 1234567
    const frand = () => (s = (s * 16807) % 2147483647) / 2147483647
    for (let i = 0; i < N; i++) {
      const th = frand() * Math.PI * 2, ph = Math.acos(2 * frand() - 1)
      const Rr = 70 + frand() * 30
      pos[i * 3] = Rr * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = Rr * Math.cos(ph)
      pos[i * 3 + 2] = Rr * Math.sin(ph) * Math.sin(th)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const stars = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xcdd8ff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0.85, depthWrite: false
    }))
    scene.add(stars)
  }

  const spinAxis = new THREE.Vector3(0.18, 1, 0.08).normalize()
  return {
    group,
    update: (dt, sunDir, spin) => {
      uniforms.sunDir.value.copy(sunDir)
      group.rotateOnAxis(spinAxis, dt * spin)
      clouds.rotateOnAxis(spinAxis, dt * spin * 1.6)
    }
  }
}
