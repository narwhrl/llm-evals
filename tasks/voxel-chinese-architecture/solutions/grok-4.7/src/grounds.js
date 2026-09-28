import { Color } from "./palette.js";
import { plan } from "./buildings.js";

function addPlinth(vol, box) {
  vol.fill(box.x, 0, box.z, box.w, box.h, box.d, Color.stone);
  vol.fill(box.x, box.h - 1, box.z, box.w, 1, box.d, Color.stoneLight);
}

function addCourt(vol, box) {
  vol.fill(box.x, 0, box.z, box.w, 1, box.d, Color.stone);
  const reachX = Math.floor((box.w - 1) / 2);
  for (let dx = 0; dx <= reachX; dx += 6) {
    vol.fillSym(box.x + reachX - dx, 0, box.z, 1, 1, box.d, Color.stoneDark);
  }
  for (let z = box.z; z < box.z + box.d; z += 6) {
    vol.fill(box.x, 0, z, box.w, 1, 1, Color.stoneDark);
  }
}

function addPine(vol, x, z) {
  vol.set(x, 0, z, Color.dirt);
  vol.fill(x, 1, z, 1, 6, 1, Color.trunk);
  const layers = [
    [4, 3, Color.foliageDeep],
    [6, 2, Color.foliage],
    [8, 2, Color.foliageDeep],
    [10, 1, Color.foliage],
  ];
  for (const [y, r, color] of layers) {
    const size = r * 2 + 1;
    vol.fill(x - r, y, z - r, size, 2, size, color);
  }
}

function addLion(vol, x, z) {
  const { w, d } = plan.lions;
  vol.fill(x, 0, z, w, 2, d, Color.stoneDark);
  vol.fill(x + 1, 2, z + 2, 5, 3, 5, Color.lion);
  vol.fill(x + 1, 2, z, 5, 2, 3, Color.lion);
  vol.fill(x + 1, 5, z, 5, 3, 4, Color.lion);
  vol.fill(x, 7, z + 1, 1, 2, 2, Color.lionDark);
  vol.fill(x + 6, 7, z + 1, 1, 2, 2, Color.lionDark);
  vol.fill(x + 1, 2, z, 2, 2, 2, Color.lion);
  vol.fill(x + 4, 2, z, 2, 2, 2, Color.lion);
  vol.set(x + 2, 6, z, Color.lionDark);
  vol.set(x + 4, 6, z, Color.lionDark);
  vol.fill(x + 2, 5, z, 3, 1, 1, Color.lionDark);
  vol.fill(x + 3, 5, z + 6, 1, 3, 2, Color.lion);
}

function addCourtLantern(vol, x, z) {
  vol.fill(x, 1, z, 1, 5, 1, Color.woodDark);
  vol.fill(x - 1, 6, z - 1, 3, 3, 3, Color.lantern);
  vol.fill(x, 7, z, 1, 1, 1, Color.lanternCore);
  vol.fill(x - 1, 9, z - 1, 3, 1, 3, Color.woodDark);
}

export function addGrounds(volume) {
  const ground = plan.ground;
  volume.fill(ground.x, -1, ground.z, ground.w, 1, ground.d, Color.dirt);
  volume.fill(ground.x, 0, ground.z, ground.w, 1, ground.d, Color.grass);

  const beds = [
    [34, 34, 12, 8],
    [52, 46, 16, 8],
    [58, 96, 14, 10],
  ];
  for (const [x, z, w, d] of beds) {
    volume.fillSym(x, 0, z, w, 1, d, Color.grassDeep);
  }

  addCourt(volume, plan.court);
  addCourt(volume, plan.rearCourt);

  const path = plan.path;
  volume.fill(path.x, 0, path.z0, path.w, 1, path.z1 - path.z0 + 1, Color.path);
  for (let z = path.z0; z <= path.z1; z += 5) {
    volume.fill(path.x, 0, z, path.w, 1, 1, Color.stoneDark);
  }

  addPlinth(volume, plan.gate.plinth);
  addPlinth(volume, plan.main.plinth);
  volume.fillSym(
    plan.side.plinth.x,
    0,
    plan.side.plinth.z,
    plan.side.plinth.w,
    plan.side.plinth.h,
    plan.side.plinth.d,
    Color.stone,
  );
  volume.fillSym(
    plan.side.plinth.x,
    plan.side.plinth.h - 1,
    plan.side.plinth.z,
    plan.side.plinth.w,
    1,
    plan.side.plinth.d,
    Color.stoneLight,
  );

  const pagoda = plan.pagoda;
  const pagodaX = pagoda.cx - pagoda.plinthHalf;
  const pagodaZ = pagoda.cz - pagoda.plinthHalf;
  const pagodaS = pagoda.plinthHalf * 2 + 1;
  volume.fillSym(pagodaX, 0, pagodaZ, pagodaS, pagoda.plinthH, pagodaS, Color.stone);
  volume.fillSym(pagodaX, pagoda.plinthH - 1, pagodaZ, pagodaS, 1, pagodaS, Color.stoneLight);

  const lion = plan.lions;
  addLion(volume, lion.x, lion.z);
  const lionMirror = -lion.x - lion.w + 1;
  addLion(volume, lionMirror, lion.z);

  for (const [x, z] of plan.trees) {
    addPine(volume, x, z);
    addPine(volume, -x, z);
  }

  for (const [x, z] of plan.lanterns) {
    addCourtLantern(volume, x, z);
    addCourtLantern(volume, -x, z);
  }
}
