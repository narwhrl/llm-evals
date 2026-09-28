import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TacticalProps } from '../props/TacticalProps';
import { TextureGenerator } from '../textures/TextureGenerator';

export class CTSpawnZone {
  public group: THREE.Group;
  public policeBeaconRed: THREE.PointLight | null = null;
  public policeBeaconBlue: THREE.PointLight | null = null;
  public searchLightSpot: THREE.SpotLight | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 10.5);
    this.buildPerimeterWallWithPoliceSeal();
    this.buildPoliceVan();
    this.buildElevatedSearchlightPlatform();
    this.buildDefensiveBlockade();
    this.buildTacticalGearBoxes();
  }

  /**
   * Closed security perimeter wall with Police Crest badge & Warning Slogan banner
   */
  private buildPerimeterWallWithPoliceSeal(): void {
    const wallMat = ToonMaterials.getConcreteWallMaterial('#3c4550');
    const wallHeight = 4.2;

    // Rear wall along South perimeter (Z = 5.0 in local coords => Z = 15.5 global)
    const wallGeom = new THREE.BoxGeometry(26, wallHeight, 0.6);
    const wall = new THREE.Mesh(wallGeom, wallMat);
    wall.position.set(0, wallHeight / 2, 4.6);
    wall.castShadow = true;
    wall.receiveShadow = true;
    this.group.add(wall);

    // Wall top barbed wire
    const postMat = ToonMaterials.getDarkSteelMaterial();
    for (let x = -12; x <= 12; x += 3.0) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6), postMat);
      p.position.set(x, wallHeight + 0.6, 4.6);
      p.rotation.x = -0.3; // Angled outward
      this.group.add(p);
    }

    // Police Badge Crest & SWAT warning banner on wall
    const bannerMat = ToonMaterials.getDecalMaterial(TextureGenerator.getPoliceWallTexture(), 0.95);
    const bannerGeom = new THREE.PlaneGeometry(6.5, 3.2);
    const banner = new THREE.Mesh(bannerGeom, bannerMat);
    banner.position.set(0, 2.2, 4.28);
    this.group.add(banner);
  }

  /**
   * Armored SWAT / Police Van with roof emergency flashing lightbar
   */
  private buildPoliceVan(): void {
    const van = new THREE.Group();
    van.position.set(-6.5, 0, 0.5);
    van.rotation.y = -0.35;

    const vanBodyMat = ToonMaterials.createToonStandardMaterial({
      color: '#1a283e', // Deep police navy blue
      roughness: 0.35,
      metalness: 0.45,
      rimColor: '#3a6699'
    });

    const vanStripeMat = new THREE.MeshStandardMaterial({ color: '#f8f9fa', roughness: 0.3 });
    const wheelMat = ToonMaterials.createToonStandardMaterial({ color: '#16181b', roughness: 0.85 });

    // 1. Van Main Hull
    const hullGeom = new THREE.BoxGeometry(2.3, 2.1, 4.8);
    const hull = new THREE.Mesh(hullGeom, vanBodyMat);
    hull.position.y = 1.45;
    hull.castShadow = true;
    hull.receiveShadow = true;
    van.add(hull);

    // Van Hull Outline
    const hullOutline = new THREE.Mesh(hullGeom, ToonMaterials.getOutlineMaterial(0.03));
    hullOutline.position.copy(hull.position);
    van.add(hullOutline);

    // White Police livery side stripe
    const stripeGeom = new THREE.BoxGeometry(2.34, 0.3, 4.6);
    const stripe = new THREE.Mesh(stripeGeom, vanStripeMat);
    stripe.position.y = 1.35;
    van.add(stripe);

    // Windshield & side windows
    const glassMat = ToonMaterials.getGlassWindowMaterial();
    const windGeom = new THREE.BoxGeometry(2.1, 0.75, 0.1);
    const wind = new THREE.Mesh(windGeom, glassMat);
    wind.position.set(0, 1.7, -2.41);
    van.add(wind);

    // Front reinforced steel bullbar / ram bumper
    const bumperMat = ToonMaterials.getDarkSteelMaterial();
    const bumperGeom = new THREE.BoxGeometry(2.4, 0.6, 0.4);
    const bumper = new THREE.Mesh(bumperGeom, bumperMat);
    bumper.position.set(0, 0.55, -2.55);
    bumper.castShadow = true;
    van.add(bumper);

    // 4 Wheels
    const wheelGeom = new THREE.CylinderGeometry(0.44, 0.44, 0.3, 14);
    wheelGeom.rotateZ(Math.PI / 2);

    const wPos = [
      [-1.15, 0.44, -1.4], [1.15, 0.44, -1.4],
      [-1.15, 0.44, 1.4], [1.15, 0.44, 1.4]
    ];
    wPos.forEach(p => {
      const w = new THREE.Mesh(wheelGeom, wheelMat);
      w.position.set(p[0], p[1], p[2]);
      w.castShadow = true;
      van.add(w);
    });

    // 2. Rooftop Emergency Lightbar (Red & Blue Strobe)
    const barFrame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.35), bumperMat);
    barFrame.position.set(0, 2.56, 0.2);
    van.add(barFrame);

    // Red lens (left)
    const redMat = new THREE.MeshBasicMaterial({ color: '#ff1744' });
    const redLens = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.16, 0.3), redMat);
    redLens.position.set(-0.42, 2.62, 0.2);
    van.add(redLens);

    // Blue lens (right)
    const blueMat = new THREE.MeshBasicMaterial({ color: '#2979ff' });
    const blueLens = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.16, 0.3), blueMat);
    blueLens.position.set(0.42, 2.62, 0.2);
    van.add(blueLens);

    // Point lights for police beacon flashing effect
    this.policeBeaconRed = new THREE.PointLight(0xff1744, 3.0, 10, 2.0);
    this.policeBeaconRed.position.set(-0.42, 2.8, 0.2);
    van.add(this.policeBeaconRed);

    this.policeBeaconBlue = new THREE.PointLight(0x2979ff, 3.0, 10, 2.0);
    this.policeBeaconBlue.position.set(0.42, 2.8, 0.2);
    van.add(this.policeBeaconBlue);

    this.group.add(van);
  }

  /**
   * Elevated Concrete Watch Platform with outdoor stairs & mounted searchlight
   */
  private buildElevatedSearchlightPlatform(): void {
    const platGroup = new THREE.Group();
    platGroup.position.set(7.2, 0, 0.5);

    const concreteMat = ToonMaterials.getConcreteWallMaterial('#5c6670');
    const steelMat = ToonMaterials.getDarkSteelMaterial();

    const pHeight = 2.8;
    const pWidth = 4.5;
    const pDepth = 4.0;

    // Platform solid concrete slab
    const slab = new THREE.Mesh(new THREE.BoxGeometry(pWidth, 0.3, pDepth), concreteMat);
    slab.position.y = pHeight;
    slab.castShadow = true;
    slab.receiveShadow = true;
    platGroup.add(slab);

    // Support pillars
    const colGeom = new THREE.BoxGeometry(0.4, pHeight, 0.4);
    const colPos = [
      [-pWidth / 2 + 0.3, pHeight / 2, -pDepth / 2 + 0.3],
      [pWidth / 2 - 0.3, pHeight / 2, -pDepth / 2 + 0.3],
      [-pWidth / 2 + 0.3, pHeight / 2, pDepth / 2 - 0.3],
      [pWidth / 2 - 0.3, pHeight / 2, pDepth / 2 - 0.3]
    ];
    colPos.forEach(p => {
      const c = new THREE.Mesh(colGeom, concreteMat);
      c.position.set(p[0], p[1], p[2]);
      c.castShadow = true;
      platGroup.add(c);
    });

    // Guardrail
    const rail = new THREE.Mesh(new THREE.BoxGeometry(pWidth, 0.9, 0.05), steelMat);
    rail.position.set(0, pHeight + 0.45, -pDepth / 2);
    platGroup.add(rail);

    // Outdoor concrete access staircase
    const stepCount = 9;
    const stepH = pHeight / stepCount;
    for (let i = 0; i < stepCount; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.2, stepH, 0.38), concreteMat);
      step.position.set(-pWidth / 2 - 0.8, (i + 0.5) * stepH, pDepth / 2 - 0.4 - i * 0.38);
      step.castShadow = true;
      platGroup.add(step);
    }

    // Heavy Mounted Searchlight / Spotlight
    const slBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.8, 8), steelMat);
    slBase.position.set(-0.8, pHeight + 0.55, -pDepth / 2 + 0.8);
    platGroup.add(slBase);

    const slCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.7, 12), steelMat);
    slCylinder.rotation.x = Math.PI / 2.3;
    slCylinder.position.set(-0.8, pHeight + 1.1, -pDepth / 2 + 0.8);
    platGroup.add(slCylinder);

    // Searchlight bright lens
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.33, 12), new THREE.MeshBasicMaterial({ color: '#d0ecff' }));
    lens.position.set(-0.8, pHeight + 1.1, -pDepth / 2 + 0.44);
    platGroup.add(lens);

    // Spotlight aimed at Mid corridor
    this.searchLightSpot = new THREE.SpotLight(0xcde8ff, 5.0, 28, Math.PI / 5, 0.4, 1.2);
    this.searchLightSpot.position.set(-0.8, pHeight + 1.1, -pDepth / 2 + 0.44);
    this.searchLightSpot.target.position.set(-3.5, 0, -10.0);
    platGroup.add(this.searchLightSpot);
    platGroup.add(this.searchLightSpot.target);

    this.group.add(platGroup);
  }

  /**
   * Defensive blockade: Plastic roadblocks, Jersey barriers, SWAT riot shields in formation
   */
  private buildDefensiveBlockade(): void {
    // Plastic barricades & Jersey barriers across the front (Z = -2.5)
    const b1 = TacticalProps.createPlasticBarricade('#e63946');
    b1.position.set(-1.8, 0, -2.8);
    b1.rotation.y = 0.1;
    this.group.add(b1);

    const b2 = TacticalProps.createPlasticBarricade('#f77f00');
    b2.position.set(0.6, 0, -2.8);
    b2.rotation.y = -0.15;
    this.group.add(b2);

    const j1 = TacticalProps.createJerseyBarrier(2.2);
    j1.position.set(2.8, 0, -2.8);
    j1.rotation.y = 0.3;
    this.group.add(j1);

    // SWAT Police Riot Shields propped against barricades
    const shieldMat = ToonMaterials.createToonStandardMaterial({
      color: '#1a222c',
      roughness: 0.3,
      metalness: 0.6
    });
    const shieldGeom = new THREE.BoxGeometry(0.65, 1.1, 0.05);

    const s1 = new THREE.Mesh(shieldGeom, shieldMat);
    s1.position.set(-0.8, 0.55, -3.15);
    s1.rotation.x = -0.25;
    s1.castShadow = true;
    this.group.add(s1);

    const s2 = new THREE.Mesh(shieldGeom, shieldMat);
    s2.position.set(1.4, 0.55, -3.15);
    s2.rotation.x = -0.22;
    s2.castShadow = true;
    this.group.add(s2);
  }

  /**
   * Tactical gear crates with Kevlar vests & tactical helmets
   */
  private buildTacticalGearBoxes(): void {
    const boxGroup = new THREE.Group();
    boxGroup.position.set(2.5, 0, 3.4);

    const crate1 = TacticalProps.createWoodCrate(0.85, 'CT-TACTICAL');
    crate1.position.set(0, 0.425, 0);
    boxGroup.add(crate1);

    const crate2 = TacticalProps.createWoodCrate(0.85, 'BODY-ARMOR');
    crate2.position.set(0.9, 0.425, 0);
    crate2.rotation.y = 0.2;
    boxGroup.add(crate2);

    // Helmet models on top of crate
    const helmetMat = ToonMaterials.createToonStandardMaterial({ color: '#1b263b', roughness: 0.4, metalness: 0.5 });
    const helmetGeom = new THREE.SphereGeometry(0.16, 10, 10, 0, Math.PI * 2, 0, Math.PI / 1.8);

    const h1 = new THREE.Mesh(helmetGeom, helmetMat);
    h1.position.set(0, 0.95, 0);
    boxGroup.add(h1);

    const h2 = new THREE.Mesh(helmetGeom, helmetMat);
    h2.position.set(0.9, 0.95, 0);
    boxGroup.add(h2);

    this.group.add(boxGroup);
  }
}
