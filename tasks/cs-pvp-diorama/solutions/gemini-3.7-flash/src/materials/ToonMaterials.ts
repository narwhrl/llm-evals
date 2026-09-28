import * as THREE from 'three';
import { TextureGenerator } from '../textures/TextureGenerator';

export class ToonMaterials {
  private static gradientMap: THREE.DataTexture | null = null;

  /**
   * Generates a 3-step toon gradient map for quantized cel-shading
   */
  public static getToonGradientMap(): THREE.DataTexture {
    if (this.gradientMap) return this.gradientMap;

    const colors = new Uint8Array([
      60, 60, 75, 255,   // Dark shadow band
      140, 145, 160, 255, // Midtone band
      240, 245, 255, 255  // Direct highlight band
    ]);
    const texture = new THREE.DataTexture(colors, 3, 1, THREE.RGBAFormat);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    this.gradientMap = texture;
    return texture;
  }

  /**
   * Enhances a standard/toon material with cel-shading bands and rim lighting
   */
  public static createToonStandardMaterial(params: THREE.MeshStandardMaterialParameters & { rimColor?: string; rimPower?: number }): THREE.MeshStandardMaterial {
    const mat = new THREE.MeshStandardMaterial({
      ...params,
      roughness: params.roughness ?? 0.45,
      metalness: params.metalness ?? 0.15,
    });

    // Custom shader modification for toon banding + sharp rim highlight
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uRimColor = { value: new THREE.Color(params.rimColor || '#38557a') };
      shader.uniforms.uRimPower = { value: params.rimPower ?? 3.5 };

      shader.fragmentShader = `
        uniform vec3 uRimColor;
        uniform float uRimPower;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // Three-to-two cel banding step
        float brightness = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
        float toonStep = floor(brightness * 3.8) / 3.2;
        gl_FragColor.rgb = mix(gl_FragColor.rgb * 0.75, gl_FragColor.rgb * 1.15, clamp(toonStep, 0.3, 1.2));

        // Subtle crisp stylized rim lighting
        vec3 viewDir = normalize(vViewPosition);
        vec3 normal = normalize(vNormal);
        float rim = 1.0 - max(dot(viewDir, normal), 0.0);
        rim = smoothstep(0.65, 0.98, rim);
        gl_FragColor.rgb += uRimColor * rim * 0.35;
        `
      );
    };

    return mat;
  }

  /**
   * Base Concrete Plinth Material
   */
  public static getDioramaPlinthMaterial(): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#343a40',
      roughness: 0.65,
      metalness: 0.1,
      map: TextureGenerator.getConcreteTexture('#424950'),
      rimColor: '#2b4162'
    });
  }

  /**
   * Ground Wet Asphalt Material (with shiny puddles & micro-gloss)
   */
  public static getGroundWetAsphaltMaterial(): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#282f38',
      roughness: 0.25, // Wet slick surface
      metalness: 0.2,
      map: TextureGenerator.getWetAsphaltTexture(),
      rimColor: '#4d7298',
      rimPower: 2.8
    });
  }

  /**
   * Puddle Mirror Water Material
   */
  public static getPuddleWaterMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: '#0d1520',
      roughness: 0.03, // Mirror reflection
      metalness: 0.85,
      transparent: true,
      opacity: 0.88,
      envMapIntensity: 1.5
    });
  }

  /**
   * Concrete Bunker & Wall Material
   */
  public static getConcreteWallMaterial(tint: string = '#616a73'): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: tint,
      roughness: 0.7,
      metalness: 0.05,
      map: TextureGenerator.getConcreteTexture(tint),
      rimColor: '#304a6e'
    });
  }

  /**
   * Shipping Container Material
   */
  public static getContainerMaterial(color: string = '#1d4875', label: string = 'CS-4088'): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#ffffff',
      roughness: 0.35,
      metalness: 0.45,
      map: TextureGenerator.getContainerTexture(color, label),
      rimColor: '#5c88b8'
    });
  }

  /**
   * Military Crate Material
   */
  public static getMilitaryCrateMaterial(label: string = 'CS-ARMAMENT'): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#ffffff',
      roughness: 0.55,
      metalness: 0.1,
      map: TextureGenerator.getWoodCrateTexture(label),
      rimColor: '#455d7a'
    });
  }

  /**
   * Metal Oil Drum Material
   */
  public static getOilDrumMaterial(color: string = '#1d5a8a'): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#ffffff',
      roughness: 0.3,
      metalness: 0.6,
      map: TextureGenerator.getOilDrumTexture(color),
      rimColor: '#5a8cb8'
    });
  }

  /**
   * Cardboard Box Material
   */
  public static getCardboardMaterial(): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#ffffff',
      roughness: 0.75,
      metalness: 0.02,
      map: TextureGenerator.getCardboardTexture(),
      rimColor: '#4a3828'
    });
  }

  /**
   * Rusted Corrugated Sheet Metal Material (A Site warehouse walls / roof / shutter)
   */
  public static getRustedShutterMaterial(): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#ffffff',
      roughness: 0.45,
      metalness: 0.5,
      map: TextureGenerator.getRustedShutterTexture(),
      rimColor: '#5a4535'
    });
  }

  /**
   * Dark Steel / Iron Metal Material (I-beams, railings, ladders, fences)
   */
  public static getDarkSteelMaterial(): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#242b33',
      roughness: 0.35,
      metalness: 0.8,
      rimColor: '#4a627d'
    });
  }

  /**
   * Rusty Iron Grate Material (drainage trench)
   */
  public static getDrainGrateMaterial(): THREE.MeshStandardMaterial {
    return this.createToonStandardMaterial({
      color: '#ffffff',
      roughness: 0.5,
      metalness: 0.7,
      map: TextureGenerator.getDrainGrateTexture(),
      transparent: true,
      opacity: 0.95
    });
  }

  /**
   * Glass Window Material with Rain Condensation
   */
  public static getGlassWindowMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: '#658296',
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.45,
      map: TextureGenerator.getGlassRainTexture(),
      depthWrite: false
    });
  }

  /**
   * Inverted Hull Outline Material for Crisp Dark Cartoon Edges
   */
  public static getOutlineMaterial(thickness: number = 0.04, color: string = '#090d12'): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: {
        uThickness: { value: thickness },
        uColor: { value: new THREE.Color(color) }
      },
      vertexShader: `
        uniform float uThickness;
        void main() {
          vec3 transformed = position + normal * uThickness;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        void main() {
          gl_FragColor = vec4(uColor, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: true
    });
  }

  /**
   * Decal / Stencil Material (Bomb Site A, B, Graffiti, Police Seal)
   */
  public static getDecalMaterial(texture: THREE.Texture, opacity: number = 0.9): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      opacity: opacity,
      roughness: 0.5,
      metalness: 0.1,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    });
  }

  /**
   * Creates an inverted hull outline mesh clone
   */
  public static createOutlinedMesh(geometry: THREE.BufferGeometry, material: THREE.Material, outlineThickness: number = 0.03): THREE.Group {
    const group = new THREE.Group();
    const mainMesh = new THREE.Mesh(geometry, material);
    mainMesh.castShadow = true;
    mainMesh.receiveShadow = true;
    group.add(mainMesh);

    const outlineMat = this.getOutlineMaterial(outlineThickness);
    const outlineMesh = new THREE.Mesh(geometry, outlineMat);
    group.add(outlineMesh);

    return group;
  }
}
