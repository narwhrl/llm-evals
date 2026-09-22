function addUpturns(vol, x, z, w, d, y, color, n) {
  if (!n || !color) return;
  const corners = [
    [x, z, -1, -1],
    [x + w - 1, z, 1, -1],
    [x, z + d - 1, -1, 1],
    [x + w - 1, z + d - 1, 1, 1],
  ];
  for (const [cx, cz, dx, dz] of corners) {
    vol.set(cx, y + 1, cz, color);
    for (let i = 1; i <= n; i++) {
      const px = cx + dx * i;
      const pz = cz + dz * i;
      const py = y + i;
      vol.set(px, py, pz, color);
      vol.set(px - dx, py, pz, color);
      vol.set(px, py, pz - dz, color);
      vol.set(px, py - 1, pz, color);
    }
  }
}

function addSoffit(vol, x, z, w, d, y, color) {
  if (!color || w < 4 || d < 4) return;
  vol.fill(x, y - 1, z, w, 1, 2, color);
  vol.fill(x, y - 1, z + d - 2, w, 1, 2, color);
  vol.fill(x, y - 1, z, 2, 1, d, color);
  vol.fill(x + w - 2, y - 1, z, 2, 1, d, color);
}

function paintRidge(vol, ix, iz, iw, id, y, ridge, beasts, alongX) {
  vol.fill(ix, y, iz, iw, 1, id, ridge);
  if (alongX) {
    vol.fill(ix, y, iz, 1, 3, id, ridge);
    vol.fill(ix + iw - 1, y, iz, 1, 3, id, ridge);
    const midZ = iz + Math.floor((id - 1) / 2);
    vol.set(ix - 1, y + 2, midZ, ridge);
    vol.set(ix + iw, y + 2, midZ, ridge);
    if (beasts) {
      const midX = ix + Math.floor((iw - 1) / 2);
      for (let dx = 0; dx <= iw / 2; dx += 3) {
        vol.set(midX + dx, y + 1, midZ, beasts);
        if (dx) vol.set(midX - dx, y + 1, midZ, beasts);
      }
    }
    return;
  }
  vol.fill(ix, y, iz, iw, 3, 1, ridge);
  vol.fill(ix, y, iz + id - 1, iw, 3, 1, ridge);
}

/** 庑殿: hip roof, slopes on all four sides, ridge on the long axis. */
export function addWudian(vol, o) {
  const { x, z, w, d, y, tile, tileShade, ridge, upturn = 3, upturnColor, soffit, beasts } = o;
  const limit = Math.floor((Math.min(w, d) - 1) / 2);
  let top = null;
  for (let s = 0; s <= limit; s++) {
    const ix = x + s;
    const iz = z + s;
    const iw = w - 2 * s;
    const id = d - 2 * s;
    if (iw <= 0 || id <= 0) break;
    const onRidge = iw <= 2 || id <= 2;
    vol.fill(ix, y + s, iz, iw, 1, id, onRidge ? ridge : s % 2 === 0 ? tile : tileShade);
    top = { ix, iz, iw, id, s };
  }
  if (top) {
    paintRidge(vol, top.ix, top.iz, top.iw, top.id, y + top.s + 1, ridge, beasts, top.iw >= top.id);
  }
  addUpturns(vol, x, z, w, d, y, upturnColor ?? tileShade, upturn);
  addSoffit(vol, x, z, w, d, y, soffit);
}

/** Lower skirt of a double-eave roof. Stops after `rise` steps so a clerestory can sit inside. */
export function addHipSkirt(vol, o) {
  const { x, z, w, d, y, rise, tile, tileShade, upturn = 3, upturnColor, soffit } = o;
  for (let s = 0; s < rise; s++) {
    const iw = w - 2 * s;
    const id = d - 2 * s;
    if (iw <= 2 || id <= 2) break;
    vol.fill(x + s, y + s, z + s, iw, 1, id, s % 2 === 0 ? tile : tileShade);
  }
  addUpturns(vol, x, z, w, d, y, upturnColor ?? tileShade, upturn);
  addSoffit(vol, x, z, w, d, y, soffit);
}

/**
 * 歇山: hip-and-gable. The lower courses inset on every side; above `hipRun`
 * the gable ends become vertical while the long slopes continue to the ridge.
 */
export function addXieshan(vol, o) {
  const {
    x, z, w, d, y, tile, tileShade, gable, barge, ridge,
    hipRun = 3, upturn = 3, upturnColor, soffit,
  } = o;
  const longX = w >= d;
  const limit = Math.floor(((longX ? d : w) - 1) / 2);
  let top = null;
  for (let s = 0; s <= limit; s++) {
    const insetRun = s;
    const insetGable = Math.min(s, hipRun);
    const ix = x + (longX ? insetGable : insetRun);
    const iz = z + (longX ? insetRun : insetGable);
    const iw = w - 2 * (longX ? insetGable : insetRun);
    const id = d - 2 * (longX ? insetRun : insetGable);
    if (iw <= 0 || id <= 0) break;
    const onRidge = (longX ? id : iw) <= 2;
    vol.fill(ix, y + s, iz, iw, 1, id, onRidge ? ridge : s % 2 === 0 ? tile : tileShade);
    if (!onRidge && s >= hipRun) {
      if (longX) {
        vol.fill(ix, y + s, iz, 1, 1, id, gable);
        vol.fill(ix + iw - 1, y + s, iz, 1, 1, id, gable);
        if (barge) {
          vol.set(ix, y + s, iz, barge);
          vol.set(ix, y + s, iz + id - 1, barge);
          vol.set(ix + iw - 1, y + s, iz, barge);
          vol.set(ix + iw - 1, y + s, iz + id - 1, barge);
        }
      } else {
        vol.fill(ix, y + s, iz, iw, 1, 1, gable);
        vol.fill(ix, y + s, iz + id - 1, iw, 1, 1, gable);
        if (barge) {
          vol.set(ix, y + s, iz, barge);
          vol.set(ix + iw - 1, y + s, iz, barge);
          vol.set(ix, y + s, iz + id - 1, barge);
          vol.set(ix + iw - 1, y + s, iz + id - 1, barge);
        }
      }
    }
    if (onRidge) top = { ix, iz, iw, id, s };
  }
  if (top) paintRidge(vol, top.ix, top.iz, top.iw, top.id, y + top.s + 1, ridge, null, longX);
  addUpturns(vol, x, z, w, d, y, upturnColor ?? tileShade, upturn);
  addSoffit(vol, x, z, w, d, y, soffit);
}

/** 攒尖: square roof gathered to a point, with a finial. */
export function addCuanjian(vol, o) {
  const { cx, cz, half, y, tile, tileShade, finial, upturn = 3, upturnColor, soffit } = o;
  const w = half * 2 + 1;
  const x = cx - half;
  const z = cz - half;
  for (let s = 0; s <= half; s++) {
    const size = w - 2 * s;
    const color = s === half ? finial : s % 2 === 0 ? tile : tileShade;
    vol.fill(x + s, y + s, z + s, size, 1, size, color);
  }
  vol.fill(cx - 1, y + half + 1, cz - 1, 3, 1, 3, finial);
  vol.fill(cx, y + half + 2, cz, 1, 4, 1, finial);
  addUpturns(vol, x, z, w, w, y, upturnColor ?? tileShade, upturn);
  addSoffit(vol, x, z, w, w, y, soffit);
}
