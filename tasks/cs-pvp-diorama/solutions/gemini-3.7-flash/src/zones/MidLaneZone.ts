import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TacticalProps } from '../props/TacticalProps';
import { TextureGenerator } from '../textures/TextureGenerator';

export class MidLaneZone {
  public group: THREE.Group;
  public sewerLight: THREE.PointLight | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);
    this.buildDoubleIronDoorsAndBunkerWalls();
    this.buildDrainageTrenchAndGrates();
    this.buildCTSideLowWallCover();
    this.buildUndergroundSewerTunnel();
    this.buildSentryKiosks();
  }

  /**
   * Builds heavy double iron doors (half-open duel peeking gap) and concrete bunker walls with sniper slits
   */
  private buildDoubleIronDoorsAndBunkerWalls(): void {
    const wallMat = ToonMaterials.getConcreteWallMaterial('#5a646e');
    const ironDoorMat = ToonMaterials.createToonStandardMaterial({
      color: '#3d4852',
      roughness: 0.45,
      metalness: 0.7,
      map: TextureGenerator.getRustedShutterTexture(),
      rimColor: '#5a789c'
    });
    const steelMat = ToonMaterials.getDarkSteelMaterial();

    const wallHeight = 4.8;

    // 1. West Concrete Bunker High Wall (Left of Mid Doors)
    const westBunker = new THREE.Mesh(new THREE.BoxGeometry(4.2, wallHeight, 1.4), wallMat);
    westBunker.position.set(-4.2, wallHeight / 2, 0);
    westBunker.castShadow = true;
    westBunker.receiveShadow = true;
    this.group.add(westBunker);

    // Sniper peek slit on West wall
    const slitHole1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 1.5), new THREE.MeshBasicMaterial({ color: '#090d12' }));
    slitHole1.position.set(-3.2, 3.2, 0);
    this.group.add(slitHole1);

    // Elevated Sniper Platform behind West Wall
    const platWest = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 2.2), wallMat);
    platWest.position.set(-4.2, 2.4, -1.8);
    platWest.receiveShadow = true;
    this.group.add(platWest);

    // Access stairs to West Platform
    for (let step = 0; step < 8; step++) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.35), wallMat);
      st.position.set(-5.4, 0.15 + step * 0.3, -3.2 + step * 0.35);
      st.castShadow = true;
      this.group.add(st);
    }

    // 2. East Concrete Bunker High Wall (Right of Mid Doors)
    const eastBunker = new THREE.Mesh(new THREE.BoxGeometry(4.2, wallHeight, 1.4), wallMat);
    eastBunker.position.set(4.2, wallHeight / 2, 0);
    eastBunker.castShadow = true;
    eastBunker.receiveShadow = true;
    this.group.add(eastBunker);

    // Sniper peek slit on East wall
    const slitHole2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 1.5), new THREE.MeshBasicMaterial({ color: '#090d12' }));
    slitHole2.position.set(3.2, 3.2, 0);
    this.group.add(slitHole2);

    // Elevated Sniper Platform behind East Wall
    const platEast = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 2.2), wallMat);
    platEast.position.set(4.2, 2.4, 1.8);
    platEast.receiveShadow = true;
    this.group.add(platEast);

    // 3. Central Gateway Arch & Lintel
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.2, 1.4), wallMat);
    archTop.position.set(0, wallHeight - 0.6, 0);
    archTop.castShadow = true;
    this.group.add(archTop);

    // 4. Double-Leaf Heavy Iron Doors (Half Open - Iconic CS Mid Gap)
    const doorLeafGeom = new THREE.BoxGeometry(1.9, 3.6, 0.15);

    // Left door leaf (hinged at -2.0, swung slightly open at 35 degrees)
    const leftDoor = new THREE.Mesh(doorLeafGeom, ironDoorMat);
    leftDoor.position.set(-1.1, 1.8, 0.4);
    leftDoor.rotation.y = -0.55; // Half open peeking gap
    leftDoor.castShadow = true;
    this.group.add(leftDoor);

    // Right door leaf (hinged at +2.0, swung inward at 20 degrees)
    const rightDoor = new THREE.Mesh(doorLeafGeom, ironDoorMat);
    rightDoor.position.set(1.1, 1.8, -0.3);
    rightDoor.rotation.y = 0.35;
    rightDoor.castShadow = true;
    this.group.add(rightDoor);

    // Heavy iron reinforcement hinges & rivets
    const hingeGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8);
    const h1 = new THREE.Mesh(hingeGeom, steelMat);
    h1.position.set(-2.05, 3.0, 0);
    this.group.add(h1);
    const h2 = new THREE.Mesh(hingeGeom, steelMat);
    h2.position.set(-2.05, 0.8, 0);
    this.group.add(h2);
    const h3 = new THREE.Mesh(hingeGeom, steelMat);
    h3.position.set(2.05, 3.0, 0);
    this.group.add(h3);
    const h4 = new THREE.Mesh(hingeGeom, steelMat);
    h4.position.set(2.05, 0.8, 0);
    this.group.add(h4);
  }

  /**
   * Rectangular drainage trench covered with rusty iron grates and water reflections
   */
  private buildDrainageTrenchAndGrates(): void {
    // Trench channel running along mid axis Z = -6 to +6
    const trenchMat = ToonMaterials.getConcreteWallMaterial('#323940');
    const grateMat = ToonMaterials.getDrainGrateMaterial();
    const waterMat = ToonMaterials.getPuddleWaterMaterial();

    const tLength = 10.0;
    const tWidth = 1.4;

    // Recessed trench basin
    const basin = new THREE.Mesh(new THREE.BoxGeometry(tWidth + 0.2, 0.4, tLength), trenchMat);
    basin.position.set(0, -0.18, 0);
    basin.receiveShadow = true;
    this.group.add(basin);

    // Standing water in trench
    const water = new THREE.Mesh(new THREE.PlaneGeometry(tWidth, tLength), waterMat);
    water.rotateX(-Math.PI / 2);
    water.position.set(0, -0.06, 0);
    water.receiveShadow = true;
    this.group.add(water);

    // Rusty iron grates on top of drainage trench
    const grateCount = 8;
    const gStep = tLength / grateCount;
    for (let i = 0; i < grateCount; i++) {
      const grate = new THREE.Mesh(new THREE.PlaneGeometry(tWidth, gStep - 0.05), grateMat);
      grate.rotateX(-Math.PI / 2);
      grate.position.set(0, 0.018, -tLength / 2 + gStep / 2 + i * gStep);
      grate.receiveShadow = true;
      this.group.add(grate);
    }
  }

  /**
   * CT-side low concrete wall barrier with ammo crates & discarded street signs
   */
  private buildCTSideLowWallCover(): void {
    const ctGroup = new THREE.Group();
    ctGroup.position.set(-1.2, 0, 4.5);

    // Low concrete half-wall
    const lowWall = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 1.15, 0.45),
      ToonMaterials.getConcreteWallMaterial('#6c757d')
    );
    lowWall.position.set(0, 0.575, 0);
    lowWall.castShadow = true;
    lowWall.receiveShadow = true;
    ctGroup.add(lowWall);

    // Low wall outline
    const wallOutline = new THREE.Mesh(lowWall.geometry, ToonMaterials.getOutlineMaterial(0.025));
    wallOutline.position.copy(lowWall.position);
    ctGroup.add(wallOutline);

    // Military crates stacked behind low wall
    const c1 = TacticalProps.createWoodCrate(0.9, 'CS-AMMO');
    c1.position.set(-0.9, 0.45, 0.7);
    ctGroup.add(c1);

    const c2 = TacticalProps.createWoodCrate(0.8, 'TACTICAL');
    c2.position.set(0.6, 0.4, 0.7);
    c2.rotation.y = 0.4;
    ctGroup.add(c2);

    // Discarded bent street road signs
    const signMat = ToonMaterials.createToonStandardMaterial({ color: '#ffb703', roughness: 0.35 });
    const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.0, 8), ToonMaterials.getDarkSteelMaterial());
    signPost.position.set(1.4, 0.6, 0.6);
    signPost.rotation.z = -0.7; // Knocked over / bent
    ctGroup.add(signPost);

    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.03), signMat);
    signBoard.position.set(2.0, 1.2, 0.6);
    signBoard.rotation.z = -0.7;
    ctGroup.add(signBoard);

    this.group.add(ctGroup);
  }

  /**
   * Underground sewer / drainage tunnel with intake opening below T ramp and exit near CT flank
   */
  private buildUndergroundSewerTunnel(): void {
    const sewerGroup = new THREE.Group();
    const pipeMat = ToonMaterials.createToonStandardMaterial({
      color: '#343c44',
      roughness: 0.8,
      metalness: 0.3
    });

    // 1. T-Side Sewer Entrance Arch & Iron Bars (North, near Z = -7.5, X = -6.5)
    const tEntrance = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.5, 12, 1, false, 0, Math.PI), pipeMat);
    tEntrance.position.set(-6.5, 0.2, -7.5);
    tEntrance.rotation.x = Math.PI / 2;
    sewerGroup.add(tEntrance);

    // Entrance iron bars
    const barMat = ToonMaterials.getDarkSteelMaterial();
    for (let bx = -6.8; bx <= -6.2; bx += 0.2) {
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 6), barMat);
      bar.position.set(bx, 0.4, -7.3);
      sewerGroup.add(bar);
    }

    // 2. CT-Side Sewer Exit Pipe (South flank, near Z = 6.8, X = -6.5)
    const ctExit = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.5, 12, 1, false, 0, Math.PI), pipeMat);
    ctExit.position.set(-6.5, 0.2, 6.8);
    ctExit.rotation.x = -Math.PI / 2;
    sewerGroup.add(ctExit);

    // Sewer Interior faint green/cyan tactical phosphor light
    this.sewerLight = new THREE.PointLight(0x38ef7d, 1.2, 5, 2);
    this.sewerLight.position.set(-6.5, 0.3, 0);
    sewerGroup.add(this.sewerLight);

    this.group.add(sewerGroup);
  }

  /**
   * Sentry / Guard Kiosks on both sides of Mid with console desks and rain-streaked glass
   */
  private buildSentryKiosks(): void {
    const kioskMat = ToonMaterials.getConcreteWallMaterial('#4a535e');
    const glassMat = ToonMaterials.getGlassWindowMaterial();
    const steelMat = ToonMaterials.getDarkSteelMaterial();

    // Sentry Kiosk (Left side of Mid)
    const kiosk1 = new THREE.Group();
    kiosk1.position.set(-7.5, 0, -1.5);

    // Base booth
    const boothBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.0, 2.0), kioskMat);
    boothBase.position.y = 0.5;
    boothBase.castShadow = true;
    kiosk1.add(boothBase);

    // Glass windows upper section
    const win = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.4, 1.9), glassMat);
    win.position.y = 1.7;
    kiosk1.add(win);

    // Roof cap
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.18, 2.3), steelMat);
    roof.position.y = 2.45;
    roof.castShadow = true;
    kiosk1.add(roof);

    // Interior control console
    const consoleMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.75, 0.6),
      ToonMaterials.createToonStandardMaterial({ color: '#2b3038' })
    );
    consoleMesh.position.set(0, 0.85, 0);
    kiosk1.add(consoleMesh);

    this.group.add(kiosk1);
  }
}
