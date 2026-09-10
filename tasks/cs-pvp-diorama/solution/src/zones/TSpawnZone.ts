import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TacticalProps } from '../props/TacticalProps';
import { TextureGenerator } from '../textures/TextureGenerator';

export class TSpawnZone {
  public group: THREE.Group;

  constructor() {
    this.group = new THREE.Group();
    this.buildEnclosureFence();
    this.buildBoxTruck();
    this.buildContainerStack();
    this.buildRampAndBreachWall();
    this.buildTacticalProps();
  }

  /**
   * Barbed wire and security fence enclosing T spawn
   */
  private buildEnclosureFence(): void {
    const postMat = ToonMaterials.getDarkSteelMaterial();
    const postGeom = new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8);

    // Fence posts along North perimeter (Z = -15.5)
    for (let x = -13; x <= 13; x += 3.2) {
      const post = new THREE.Mesh(postGeom, postMat);
      post.position.set(x, 1.6, -15.5);
      post.castShadow = true;
      this.group.add(post);

      // Barbed wire strands
      const wireMat = new THREE.LineBasicMaterial({ color: '#3a4450' });
      for (let y = 0.6; y <= 3.0; y += 0.6) {
        const p1 = new THREE.Vector3(x - 1.6, y, -15.5);
        const p2 = new THREE.Vector3(x + 1.6, y, -15.5);
        const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const line = new THREE.Line(geom, wireMat);
        this.group.add(line);
      }
    }
  }

  /**
   * Weathered Delivery Box Truck with leaning wooden ladder
   */
  private buildBoxTruck(): void {
    const truck = new THREE.Group();
    truck.position.set(-8.5, 0, -12.5);
    truck.rotation.y = 0.25;

    const bodyMat = ToonMaterials.createToonStandardMaterial({
      color: '#344c3d', // Military / weathered green
      roughness: 0.45,
      metalness: 0.4,
      rimColor: '#4f755c'
    });

    const cabMat = ToonMaterials.createToonStandardMaterial({
      color: '#2a3d31',
      roughness: 0.35,
      metalness: 0.5
    });

    const wheelMat = ToonMaterials.createToonStandardMaterial({
      color: '#1a1c20',
      roughness: 0.85
    });

    // 1. Cargo box
    const boxGeom = new THREE.BoxGeometry(2.3, 2.2, 4.2);
    const boxMesh = new THREE.Mesh(boxGeom, bodyMat);
    boxMesh.position.set(0, 1.8, -0.6);
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    truck.add(boxMesh);

    // Box outline
    const boxOutline = new THREE.Mesh(boxGeom, ToonMaterials.getOutlineMaterial(0.03));
    boxOutline.position.copy(boxMesh.position);
    truck.add(boxOutline);

    // 2. Truck Cab
    const cabGeom = new THREE.BoxGeometry(2.2, 1.8, 1.8);
    const cabMesh = new THREE.Mesh(cabGeom, cabMat);
    cabMesh.position.set(0, 1.4, 2.0);
    cabMesh.castShadow = true;
    truck.add(cabMesh);

    // Cab windshield
    const glassMat = ToonMaterials.getGlassWindowMaterial();
    const windGeom = new THREE.BoxGeometry(2.0, 0.75, 0.1);
    const wind = new THREE.Mesh(windGeom, glassMat);
    wind.position.set(0, 1.7, 2.9);
    truck.add(wind);

    // Headlights
    const lightMat = new THREE.MeshBasicMaterial({ color: '#fff275' });
    const hlGeom = new THREE.BoxGeometry(0.3, 0.2, 0.1);
    const hlL = new THREE.Mesh(hlGeom, lightMat);
    hlL.position.set(-0.8, 0.9, 2.91);
    truck.add(hlL);
    const hlR = new THREE.Mesh(hlGeom, lightMat);
    hlR.position.set(0.8, 0.9, 2.91);
    truck.add(hlR);

    // Wheels (6 wheels: 2 front, 4 rear)
    const wheelGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.32, 14);
    wheelGeom.rotateZ(Math.PI / 2);

    const wheelPositions = [
      [-1.15, 0.48, 2.0], [1.15, 0.48, 2.0],
      [-1.15, 0.48, -1.5], [1.15, 0.48, -1.5],
      [-1.15, 0.48, -2.5], [1.15, 0.48, -2.5]
    ];

    wheelPositions.forEach(pos => {
      const w = new THREE.Mesh(wheelGeom, wheelMat);
      w.position.set(pos[0], pos[1], pos[2]);
      w.castShadow = true;
      truck.add(w);
    });

    // Leaning Wooden Ladder against truck cargo box
    const ladder = this.buildWoodenLadder(2.6);
    ladder.position.set(1.4, 0, -0.6);
    ladder.rotation.z = -0.28;
    truck.add(ladder);

    this.group.add(truck);
  }

  /**
   * Builds a simple wooden ladder
   */
  private buildWoodenLadder(length: number): THREE.Group {
    const ladder = new THREE.Group();
    const woodMat = ToonMaterials.createToonStandardMaterial({
      color: '#7a5a3a',
      roughness: 0.7
    });

    // Side rails
    const railGeom = new THREE.BoxGeometry(0.06, length, 0.06);
    const r1 = new THREE.Mesh(railGeom, woodMat);
    r1.position.set(-0.25, length / 2, 0);
    ladder.add(r1);

    const r2 = new THREE.Mesh(railGeom, woodMat);
    r2.position.set(0.25, length / 2, 0);
    ladder.add(r2);

    // Rungs
    const rungGeom = new THREE.BoxGeometry(0.46, 0.04, 0.04);
    for (let y = 0.3; y < length - 0.2; y += 0.35) {
      const rung = new THREE.Mesh(rungGeom, woodMat);
      rung.position.set(0, y, 0);
      ladder.add(rung);
    }

    return ladder;
  }

  /**
   * 3-Tier Stacked Shipping Containers with high & low sniper perches and narrow gap
   */
  private buildContainerStack(): void {
    const stack = new THREE.Group();
    stack.position.set(7.5, 0, -12.0);

    const contGeom = new THREE.BoxGeometry(2.4, 2.5, 5.8);

    // Level 1 - Container A (Blue)
    const c1Mat = ToonMaterials.getContainerMaterial('#1d4875', 'T-CARGO 881');
    const c1 = new THREE.Mesh(contGeom, c1Mat);
    c1.position.set(0, 1.25, 0);
    c1.castShadow = true;
    c1.receiveShadow = true;
    stack.add(c1);

    // Level 1 - Container B (Red rust) adjacent with narrow 0.9m walk-through gap
    const c2Mat = ToonMaterials.getContainerMaterial('#7a2c1d', 'LINE-902');
    const c2 = new THREE.Mesh(contGeom, c2Mat);
    c2.position.set(3.3, 1.25, 0);
    c2.castShadow = true;
    c2.receiveShadow = true;
    stack.add(c2);

    // Level 2 - Container C stacked across level 1 (forming high shooting platform)
    const c3Mat = ToonMaterials.getContainerMaterial('#2d5a3c', 'TACTICAL-55');
    const c3 = new THREE.Mesh(contGeom, c3Mat);
    c3.position.set(1.6, 3.75, 0.3);
    c3.rotation.y = 0.08;
    c3.castShadow = true;
    c3.receiveShadow = true;
    stack.add(c3);

    // Level 3 - Container D at highest tier
    const c4Mat = ToonMaterials.getContainerMaterial('#504538', 'DEFUSAL-01');
    const c4 = new THREE.Mesh(contGeom, c4Mat);
    c4.position.set(0.8, 6.25, 0.1);
    c4.scale.set(0.9, 0.9, 0.7);
    c4.castShadow = true;
    stack.add(c4);

    // Guardrail / sniper perch platform on top of Level 2
    const railMat = ToonMaterials.getDarkSteelMaterial();
    const railGeom = new THREE.BoxGeometry(2.2, 0.9, 0.05);
    const rail = new THREE.Mesh(railGeom, railMat);
    rail.position.set(1.6, 5.45, 3.0);
    stack.add(rail);

    this.group.add(stack);
  }

  /**
   * Gentle ramp corridor toward Mid / A site with damaged breach hole wall
   */
  private buildRampAndBreachWall(): void {
    const rampGroup = new THREE.Group();
    rampGroup.position.set(0, 0, -8.5);

    // Concrete side wall along T ramp
    const wallMat = ToonMaterials.getConcreteWallMaterial('#58626c');

    // Wall with breach gap
    const wallGeom1 = new THREE.BoxGeometry(4.0, 2.4, 0.5);
    const w1 = new THREE.Mesh(wallGeom1, wallMat);
    w1.position.set(-3.5, 1.2, 0);
    w1.castShadow = true;
    rampGroup.add(w1);

    const wallGeom2 = new THREE.BoxGeometry(3.5, 2.4, 0.5);
    const w2 = new THREE.Mesh(wallGeom2, wallMat);
    w2.position.set(3.5, 1.2, 0);
    w2.castShadow = true;
    rampGroup.add(w2);

    // Damaged breach peek hole between w1 and w2 (peeking into Mid)
    const breachCurb = new THREE.BoxGeometry(3.0, 0.65, 0.5);
    const bc = new THREE.Mesh(breachCurb, wallMat);
    bc.position.set(0, 0.325, 0);
    bc.castShadow = true;
    rampGroup.add(bc);

    // Broken rebar steel rods protruding from breach hole
    const rodMat = ToonMaterials.getDarkSteelMaterial();
    const rodGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 6);
    for (let r = -0.8; r <= 0.8; r += 0.4) {
      const rod = new THREE.Mesh(rodGeom, rodMat);
      rod.position.set(r, 0.85, 0);
      rod.rotation.z = (Math.random() - 0.5) * 0.4;
      rampGroup.add(rod);
    }

    // Graffiti tag on wall
    const graffitiMat = ToonMaterials.getDecalMaterial(TextureGenerator.getGraffitiTexture('TERROR'));
    const gGeom = new THREE.PlaneGeometry(2.0, 1.0);
    const gMesh = new THREE.Mesh(gGeom, graffitiMat);
    gMesh.position.set(-3.5, 1.3, 0.26);
    rampGroup.add(gMesh);

    this.group.add(rampGroup);
  }

  /**
   * Assorted tactical props in T Spawn
   */
  private buildTacticalProps(): void {
    // 4-barrel pallet cluster beside slope
    const barrels = TacticalProps.createOilDrumPalletCluster();
    barrels.position.set(-2.8, 0, -10.5);
    this.group.add(barrels);

    // Wooden crates & pallets
    const crateStack = TacticalProps.createCrateStack();
    crateStack.position.set(3.2, 0, -10.5);
    this.group.add(crateStack);

    // Rubber tires stack
    const tires = TacticalProps.createTireStack();
    tires.position.set(-5.5, 0, -14.0);
    this.group.add(tires);

    // Cardboard boxes
    const cboxes = TacticalProps.createCardboardStack();
    cboxes.position.set(5.5, 0, -14.2);
    this.group.add(cboxes);
  }
}
