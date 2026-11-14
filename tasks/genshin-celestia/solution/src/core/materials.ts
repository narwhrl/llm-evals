import * as THREE from 'three';

export const SUN_DIRECTION = new THREE.Vector3(-0.62, 0.55, 0.56).normalize();

export interface GenshinShadingOptions {
  color: number | string;
  roughness?: number;
  metalness?: number;
  emissive?: number | string;
  emissiveIntensity?: number;
  shadowTint?: THREE.Color;
  sunTint?: THREE.Color;
  rimStrength?: number;
  aerialStrength?: number;
  abyssMistStrength?: number;
  toonMix?: number;
  vertexColors?: boolean;
  map?: THREE.Texture | null;
  bumpMap?: THREE.Texture | null;
  bumpScale?: number;
  flatShading?: boolean;
  side?: THREE.Side;
}

export interface CelestiaPalette {
  ivoryStone: THREE.MeshStandardMaterial;
  ivoryTrim: THREE.MeshStandardMaterial;
  plazaMarble: THREE.MeshStandardMaterial;
  sacredGold: THREE.MeshStandardMaterial;
  armillaryGold: THREE.MeshStandardMaterial;
  sanctumGlow: THREE.MeshStandardMaterial;
  sanctumRecess: THREE.MeshStandardMaterial;
  ancientRuinStone: THREE.MeshStandardMaterial;
  cliffRock: THREE.MeshStandardMaterial;
  undersideRock: THREE.MeshStandardMaterial;
  meadowGrass: THREE.MeshStandardMaterial;
  foliageLush: THREE.MeshStandardMaterial;
  foliageSunlit: THREE.MeshStandardMaterial;
  sacredBlossom: THREE.MeshStandardMaterial;
  treeBark: THREE.MeshStandardMaterial;
  dispose: () => void;
}

function createIvoryStoneTextures(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d')!;

  ctx.fillStyle = '#fbf7ef';
  ctx.fillRect(0, 0, size, size);

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bctx = bumpCanvas.getContext('2d')!;
  bctx.fillStyle = '#808080';
  bctx.fillRect(0, 0, size, size);

  // Subtle ashlar courses & warm/cool marble variation
  const rows = 8;
  const rowH = size / rows;
  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 4 : 5;
    const colW = size / cols;
    const offset = (r % 2) * (colW * 0.5);
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset;
      const y = r * rowH;
      const shade = 247 + (((r * 13 + c * 7) % 5) - 2) * 2;
      ctx.fillStyle = `rgb(${shade + 2}, ${shade}, ${shade - 5})`;
      ctx.fillRect(x + 1, y + 1, colW - 2, rowH - 2);

      bctx.strokeStyle = '#5c5c5c';
      bctx.lineWidth = 2;
      bctx.strokeRect(x + 0.5, y + 0.5, colW - 1, rowH - 1);
    }
  }

  // Delicate pale-gold celestial double-line inlay band near top & bottom of tile
  ctx.fillStyle = 'rgba(230, 194, 118, 0.42)';
  ctx.fillRect(0, 18, size, 4);
  ctx.fillRect(0, 28, size, 2);
  ctx.fillRect(0, size - 24, size, 4);

  // Diamond sacred geometry motif along upper frieze
  ctx.strokeStyle = 'rgba(224, 185, 104, 0.45)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) {
    const cx = (i + 0.5) * (size / 8);
    const cy = 54;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 12);
    ctx.lineTo(cx + 12, cy);
    ctx.lineTo(cx, cy + 12);
    ctx.lineTo(cx - 12, cy);
    ctx.closePath();
    ctx.stroke();
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 4;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.RepeatWrapping;

  return { map, bump };
}

function createPlazaCompassTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const grad = ctx.createRadialGradient(half, half, 20, half, half, half);
  grad.addColorStop(0, '#fffdf7');
  grad.addColorStop(0.65, '#f7f2e7');
  grad.addColorStop(1, '#ebe4d5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Concentric marble & gold astrolabe rings
  const radii = [80, 150, 235, 330, 420, 485];
  for (let i = 0; i < radii.length; i++) {
    ctx.beginPath();
    ctx.arc(half, half, radii[i], 0, Math.PI * 2);
    ctx.strokeStyle = i % 2 === 0 ? '#dec07a' : '#d6ceb8';
    ctx.lineWidth = i % 2 === 0 ? 5 : 3;
    ctx.stroke();
  }

  // 12-ray sacred star lines
  ctx.save();
  ctx.translate(half, half);
  for (let i = 0; i < 24; i++) {
    const ang = (i * Math.PI) / 12;
    ctx.beginPath();
    ctx.moveTo(Math.cos(ang) * 50, Math.sin(ang) * 50);
    ctx.lineTo(Math.cos(ang) * 485, Math.sin(ang) * 485);
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(218, 178, 92, 0.72)' : 'rgba(190, 184, 168, 0.45)';
    ctx.lineWidth = i % 2 === 0 ? 4 : 2;
    ctx.stroke();
  }

  // Eight-pointed celestial star in center
  for (let s = 0; s < 2; s++) {
    ctx.save();
    ctx.rotate((s * Math.PI) / 4);
    ctx.beginPath();
    ctx.moveTo(0, -145);
    ctx.lineTo(32, -32);
    ctx.lineTo(145, 0);
    ctx.lineTo(32, 32);
    ctx.lineTo(0, 145);
    ctx.lineTo(-32, 32);
    ctx.lineTo(-145, 0);
    ctx.lineTo(-32, -32);
    ctx.closePath();
    ctx.strokeStyle = '#d9af57';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createCliffStrataTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#9b9aa0';
  ctx.fillRect(0, 0, size, size);

  // Stratified sedimentary + crystalline vertical fractures
  for (let y = 0; y < size; y += 6) {
    const v = 142 + Math.sin(y * 0.09) * 16 + Math.cos(y * 0.27) * 9;
    ctx.fillStyle = `rgba(${v + 4}, ${v + 2}, ${v + 6}, 0.45)`;
    ctx.fillRect(0, y, size, 4);
  }
  for (let x = 0; x < size; x += 14) {
    const v = 126 + ((x * 29) % 34);
    ctx.fillStyle = `rgba(${v}, ${v + 3}, ${v + 10}, 0.22)`;
    ctx.fillRect(x, 0, 5, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createGenshinMaterial(opts: GenshinShadingOptions): THREE.MeshStandardMaterial {
  const shadowTint = opts.shadowTint ?? new THREE.Color('#758ec7');
  const sunTint = opts.sunTint ?? new THREE.Color('#fff5e0');
  const rimStrength = opts.rimStrength ?? 0.22;
  const aerialStrength = opts.aerialStrength ?? 1.0;
  const abyssMistStrength = opts.abyssMistStrength ?? 1.0;
  const toonMix = opts.toonMix ?? 0.72;

  const mat = new THREE.MeshStandardMaterial({
    color: opts.color,
    roughness: opts.roughness ?? 0.62,
    metalness: opts.metalness ?? 0.05,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1.0,
    vertexColors: opts.vertexColors ?? false,
    map: opts.map ?? null,
    bumpMap: opts.bumpMap ?? null,
    bumpScale: opts.bumpScale ?? 0.15,
    flatShading: opts.flatShading ?? false,
    side: opts.side ?? THREE.FrontSide,
  });

  const key = [
    shadowTint.getHexString(),
    sunTint.getHexString(),
    rimStrength.toFixed(2),
    aerialStrength.toFixed(2),
    abyssMistStrength.toFixed(2),
    toonMix.toFixed(2),
  ].join('_');

  mat.customProgramCacheKey = () => `celestia_toon_${key}`;

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uSunDir = { value: SUN_DIRECTION };
    shader.uniforms.uShadowTint = { value: shadowTint };
    shader.uniforms.uSunTint = { value: sunTint };
    shader.uniforms.uRimStrength = { value: rimStrength };
    shader.uniforms.uAerialStrength = { value: aerialStrength };
    shader.uniforms.uAbyssMistStrength = { value: abyssMistStrength };
    shader.uniforms.uToonMix = { value: toonMix };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vCelestiaWorldPos;
        varying vec3 vCelestiaWorldNormal;`,
      )
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
        vec4 celWorldPos = vec4( transformed, 1.0 );
        vec3 celObjNormal = objectNormal;
        #ifdef USE_INSTANCING
          celWorldPos = instanceMatrix * celWorldPos;
          celObjNormal = mat3( instanceMatrix ) * celObjNormal;
        #endif
        celWorldPos = modelMatrix * celWorldPos;
        vCelestiaWorldPos = celWorldPos.xyz;
        vCelestiaWorldNormal = normalize( mat3( modelMatrix ) * celObjNormal );`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform vec3 uSunDir;
        uniform vec3 uShadowTint;
        uniform vec3 uSunTint;
        uniform float uRimStrength;
        uniform float uAerialStrength;
        uniform float uAbyssMistStrength;
        uniform float uToonMix;
        varying vec3 vCelestiaWorldPos;
        varying vec3 vCelestiaWorldNormal;`,
      )
      .replace(
        '#include <opaque_fragment>',
        `
        vec3 celNormal = normalize(
          #ifdef FLAT_SHADED
            normalize( cross( dFdx( vCelestiaWorldPos ), dFdy( vCelestiaWorldPos ) ) )
          #else
            vCelestiaWorldNormal
          #endif
        );
        vec3 celViewDir = normalize( cameraPosition - vCelestiaWorldPos );
        float ndotl = dot( celNormal, uSunDir );

        // Combine Three.js shadowed direct diffuse with analytic NdotL for crisp anime cel ramp
        float directLum = dot( reflectedLight.directDiffuse, vec3( 0.3333 ) ) / max( 0.04, dot( diffuseColor.rgb, vec3( 0.3333 ) ) );
        float shadowFactor = clamp( directLum * 0.85, 0.0, 1.0 );
        float rawLit = mix( clamp( ndotl * 0.5 + 0.5, 0.0, 1.0 ), shadowFactor, 0.68 );

        float rampMain = smoothstep( 0.24, 0.50, rawLit );
        float rampHigh = smoothstep( 0.72, 0.93, rawLit );
        float terminator = smoothstep( 0.16, 0.34, rawLit ) * ( 1.0 - smoothstep( 0.34, 0.56, rawLit ) );

        // Sky dome & warm golden cloud-sea bounce
        float skyUp = clamp( celNormal.y * 0.5 + 0.5, 0.0, 1.0 );
        float cloudBounce = clamp( -celNormal.y, 0.0, 1.0 );
        vec3 envShadow = mix( vec3( 0.96, 0.82, 0.66 ), uShadowTint, skyUp );
        envShadow += vec3( 0.14, 0.10, 0.05 ) * cloudBounce;

        vec3 toonLit = diffuseColor.rgb * mix( envShadow, uSunTint * 1.12, rampMain );
        toonLit += diffuseColor.rgb * vec3( 0.16, 0.07, 0.03 ) * terminator;
        toonLit += diffuseColor.rgb * vec3( 0.12, 0.10, 0.06 ) * rampHigh;

        // Subtle anime rim light on sun-facing edges
        float fresnel = pow( 1.0 - max( dot( celNormal, celViewDir ), 0.0 ), 3.4 );
        float sunRim = fresnel * smoothstep( -0.25, 0.55, ndotl ) * uRimStrength;
        toonLit += vec3( 1.0, 0.94, 0.80 ) * sunRim;

        vec3 styledBase = mix( totalDiffuse, toonLit, uToonMix );
        outgoingLight = styledBase + totalSpecular + totalEmissiveRadiance;

        // Directional aerial perspective + deep-abyss golden-azure cloud mist
        float camDist = length( vCelestiaWorldPos - cameraPosition );
        float distHaze = smoothstep( 480.0, 2650.0, camDist ) * 0.62 * uAerialStrength;
        float abyssHaze = smoothstep( -75.0, -395.0, vCelestiaWorldPos.y ) * 0.74 * uAbyssMistStrength;
        float totalHaze = clamp( distHaze + abyssHaze * ( 1.0 - distHaze * 0.5 ), 0.0, 0.86 );

        float sunScatter = pow( max( dot( -celViewDir, uSunDir ), 0.0 ), 4.0 );
        vec3 hazeColorSrgb = mix( vec3( 0.50, 0.74, 0.96 ), vec3( 1.0, 0.91, 0.74 ), sunScatter * 0.65 + abyssHaze * 0.28 );
        vec3 hazeColor = pow( hazeColorSrgb, vec3( 2.2 ) );
        outgoingLight = mix( outgoingLight, hazeColor, totalHaze );

        #include <opaque_fragment>`,
      );
  };

  return mat;
}

export function createCelestiaPalette(): CelestiaPalette {
  const ivoryTex = createIvoryStoneTextures();
  const compassTex = createPlazaCompassTexture();
  const cliffTex = createCliffStrataTexture();

  const ivoryStone = createGenshinMaterial({
    color: '#fdf9f0',
    roughness: 0.48,
    metalness: 0.04,
    shadowTint: new THREE.Color('#7f97cc'),
    sunTint: new THREE.Color('#fff9ec'),
    rimStrength: 0.28,
    map: ivoryTex.map,
    bumpMap: ivoryTex.bump,
    bumpScale: 0.08,
  });

  const ivoryTrim = createGenshinMaterial({
    color: '#fffcf5',
    roughness: 0.38,
    metalness: 0.08,
    shadowTint: new THREE.Color('#869fd4'),
    sunTint: new THREE.Color('#fffaf0'),
    rimStrength: 0.32,
  });

  const plazaMarble = createGenshinMaterial({
    color: '#fcf8ef',
    roughness: 0.44,
    metalness: 0.05,
    shadowTint: new THREE.Color('#8299cb'),
    sunTint: new THREE.Color('#fff8ea'),
    rimStrength: 0.18,
    map: compassTex,
  });

  const sacredGold = createGenshinMaterial({
    color: '#f2c665',
    roughness: 0.26,
    metalness: 0.72,
    emissive: '#593c0a',
    emissiveIntensity: 0.32,
    shadowTint: new THREE.Color('#9c7338'),
    sunTint: new THREE.Color('#ffe8a3'),
    rimStrength: 0.42,
    toonMix: 0.48,
  });

  const armillaryGold = createGenshinMaterial({
    color: '#ffd670',
    roughness: 0.2,
    metalness: 0.82,
    emissive: '#8a5d14',
    emissiveIntensity: 0.52,
    shadowTint: new THREE.Color('#b58234'),
    sunTint: new THREE.Color('#fff2bd'),
    rimStrength: 0.55,
    aerialStrength: 0.35,
    toonMix: 0.42,
  });

  const sanctumGlow = new THREE.MeshStandardMaterial({
    color: '#fff9e6',
    emissive: '#ffe299',
    emissiveIntensity: 2.1,
    roughness: 0.15,
    metalness: 0.1,
  });

  const sanctumRecess = createGenshinMaterial({
    color: '#5b72a8',
    roughness: 0.7,
    metalness: 0.05,
    emissive: '#3a548f',
    emissiveIntensity: 0.35,
    shadowTint: new THREE.Color('#3f5282'),
    sunTint: new THREE.Color('#8ba5db'),
    rimStrength: 0.08,
  });

  const ancientRuinStone = createGenshinMaterial({
    color: '#ece6da',
    roughness: 0.58,
    metalness: 0.04,
    shadowTint: new THREE.Color('#738cc2'),
    sunTint: new THREE.Color('#fff6e4'),
    rimStrength: 0.24,
    abyssMistStrength: 0.85,
    map: ivoryTex.map,
  });

  const cliffRock = createGenshinMaterial({
    color: '#cfc8bc',
    roughness: 0.76,
    metalness: 0.03,
    shadowTint: new THREE.Color('#6882b8'),
    sunTint: new THREE.Color('#f7ecda'),
    rimStrength: 0.22,
    toonMix: 0.82,
    vertexColors: true,
    flatShading: true,
    map: cliffTex,
  });

  const undersideRock = createGenshinMaterial({
    color: '#bdbdc8',
    roughness: 0.8,
    metalness: 0.04,
    shadowTint: new THREE.Color('#5e78b0'),
    sunTint: new THREE.Color('#e8dfd0'),
    rimStrength: 0.25,
    abyssMistStrength: 0.92,
    toonMix: 0.82,
    vertexColors: true,
    flatShading: true,
    map: cliffTex,
  });

  const meadowGrass = createGenshinMaterial({
    color: '#63bf5e',
    roughness: 0.72,
    metalness: 0.02,
    shadowTint: new THREE.Color('#327868'),
    sunTint: new THREE.Color('#9be36d'),
    rimStrength: 0.24,
    vertexColors: true,
  });

  const foliageLush = createGenshinMaterial({
    color: '#46ad58',
    roughness: 0.66,
    metalness: 0.02,
    shadowTint: new THREE.Color('#286862'),
    sunTint: new THREE.Color('#92df68'),
    rimStrength: 0.34,
  });

  const foliageSunlit = createGenshinMaterial({
    color: '#7cd45b',
    roughness: 0.64,
    metalness: 0.02,
    shadowTint: new THREE.Color('#398265'),
    sunTint: new THREE.Color('#bcf279'),
    rimStrength: 0.38,
  });

  const sacredBlossom = createGenshinMaterial({
    color: '#f7efd9',
    roughness: 0.55,
    metalness: 0.04,
    emissive: '#f5d993',
    emissiveIntensity: 0.2,
    shadowTint: new THREE.Color('#9aaad1'),
    sunTint: new THREE.Color('#fffbe8'),
    rimStrength: 0.42,
  });

  const treeBark = createGenshinMaterial({
    color: '#8e7c6d',
    roughness: 0.85,
    metalness: 0.02,
    shadowTint: new THREE.Color('#535878'),
    sunTint: new THREE.Color('#baa58e'),
    rimStrength: 0.1,
  });

  return {
    ivoryStone,
    ivoryTrim,
    plazaMarble,
    sacredGold,
    armillaryGold,
    sanctumGlow,
    sanctumRecess,
    ancientRuinStone,
    cliffRock,
    undersideRock,
    meadowGrass,
    foliageLush,
    foliageSunlit,
    sacredBlossom,
    treeBark,
    dispose: () => {
      ivoryTex.map.dispose();
      ivoryTex.bump.dispose();
      compassTex.dispose();
      cliffTex.dispose();
      ivoryStone.dispose();
      ivoryTrim.dispose();
      plazaMarble.dispose();
      sacredGold.dispose();
      armillaryGold.dispose();
      sanctumGlow.dispose();
      sanctumRecess.dispose();
      ancientRuinStone.dispose();
      cliffRock.dispose();
      undersideRock.dispose();
      meadowGrass.dispose();
      foliageLush.dispose();
      foliageSunlit.dispose();
      sacredBlossom.dispose();
      treeBark.dispose();
    },
  };
}
