/**
 * 屋顶与木构构件。
 *
 * steppedRoof 用逐层收分的实心体素层搭出庑殿顶（四面坡收到正脊）、
 * 歇山顶（xStop 后 x 向停止收分形成山花）与攒尖顶（endX=endZ=0 收成一点）；
 * 檐口四角用 eaveTips 摆出翘起的飞檐。
 */

/**
 * 逐层收分的实心屋顶。
 * @param o.shrinkX / o.shrinkZ  每层每侧收进的体素数（默认 1）
 * @param o.xStop                第 xStop 层后 x 向不再收分（歇山顶山面）
 * @param o.ridgeX / o.ridgeZ    收头时 x / z 向保留的半宽（0 = 收成点/垂直脊）
 * @param o.eaveColor            檐口层颜色（默认同 color）
 * @param o.ridgeColor           正脊颜色（默认同 color）
 * @param o.tips                 檐角飞檐长度（0 关闭）
 * @param o.ornaments            是否在正脊两端加鸱吻（默认 x 向有长度时加）
 * @returns 正脊高度 y
 */
export function steppedRoof(world, x0, x1, z0, z1, y0, color, o = {}) {
  const rx = o.shrinkX ?? 1;
  const rz = o.shrinkZ ?? 1;
  const xStop = o.xStop ?? Infinity;
  const endX = o.ridgeX ?? 0;
  const endZ = o.ridgeZ ?? 0;
  const eaveColor = o.eaveColor ?? color;
  const ridgeColor = o.ridgeColor ?? color;

  let a = x0, b = x1, c = z0, d = z1, k = 0;
  for (;;) {
    world.box(a, y0 + k, c, b, y0 + k, d, k === 0 ? eaveColor : color);
    if (k === 0 && o.tips !== 0) eaveTips(world, a, b, c, d, y0, eaveColor, o.tips ?? 3);

    const xShrink = k < xStop && b - a > 2 * endX;
    const zShrink = d - c > 2 * endZ;
    if (!xShrink && !zShrink) {
      // 收头：把最后一段夹到目标半宽，作为正脊 / 宝顶
      const ry = y0 + k + 1;
      const cx = (a + b) / 2;
      const cz = (c + d) / 2;
      const xa = Math.max(a, Math.floor(cx - endX));
      const xb = Math.min(b, Math.ceil(cx + endX));
      const za = Math.max(c, Math.floor(cz - endZ));
      const zb = Math.min(d, Math.ceil(cz + endZ));
      world.box(xa, ry, za, xb, ry, zb, ridgeColor);
      if ((o.ornaments ?? true) && xb - xa >= 2) {
        const zc = Math.round((za + zb) / 2);
        world.set(xa, ry + 1, zc, ridgeColor);
        world.set(xa, ry + 2, zc, ridgeColor);
        world.set(xb, ry + 1, zc, ridgeColor);
        world.set(xb, ry + 2, zc, ridgeColor);
      }
      return ry;
    }
    if (xShrink) {
      a += rx;
      b -= rx;
    }
    if (zShrink) {
      c += rz;
      d -= rz;
    }
    k++;
  }
}

/** 檐角翘起的飞檐：从檐口矩形四角向对角线外上方挑出。 */
export function eaveTips(world, x0, x1, z0, z1, y, color, len = 3) {
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const cx = sx < 0 ? x0 : x1;
      const cz = sz < 0 ? z0 : z1;
      for (let i = 1; i <= len; i++) {
        const yy = y + i;
        world.set(cx + sx * i, yy, cz + sz * i, color);
        world.set(cx + sx * i, yy, cz + sz * (i - 1), color);
        world.set(cx + sx * (i - 1), yy, cz + sz * i, color);
      }
    }
  }
}

/**
 * 檐下斗拱带：墙面外一圈 1 高的横带，间以金色的斗。
 * 坐标为墙体矩形外扩一圈后的范围。
 */
export function dougongBand(world, x0, x1, z0, z1, y, base, accent) {
  const span = (xa, xb, za, zb) => {
    for (let x = xa; x <= xb; x++) {
      const t = x % 4 === 0 ? accent : base;
      world.set(x, y, za, t);
      world.set(x, y, zb, t);
    }
    for (let z = za; z <= zb; z++) {
      const t = z % 4 === 0 ? accent : base;
      world.set(xa, y, z, t);
      world.set(xb, y, z, t);
    }
  };
  span(Math.min(x0, x1), Math.max(x0, x1), Math.min(z0, z1), Math.max(z0, z1));
}

/**
 * 格扇窗：在竖直墙面上刷暗色窗格，木棂每隔 mx / my 一格。
 * face: 'n'|'s'|'e'|'w'，(u0,u1) 为沿墙方向的坐标范围。
 */
export function lattice(world, face, u0, u1, v0, v1, w, dark, frame) {
  for (let u = u0; u <= u1; u++) {
    for (let v = v0; v <= v1; v++) {
      const mullion = u % 3 === 0 || v % 2 === 1;
      const c = mullion ? frame : dark;
      if (face === 'n' || face === 's') world.set(u, v, w, c);
      else world.set(w, v, u, c);
    }
  }
}
