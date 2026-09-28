import { C } from './palette.js';

/** 石狮：底座 + 蹲坐身躯 + 昂首 + 卷尾，成对出现，面朝朝向 dir（+1 南 / -1 北）。 */
export function lion(w, x, z, dir, baseY = 0) {
  const S = C.lionStone, D = C.lionStoneDark;
  const y = baseY;
  w.box(x - 1, y, z - 1, x + 1, y, z + 1, C.stoneWhite);        // 石座
  const b = y + 1;
  // 身躯（坐姿，前高后低）
  w.box(x - 1, b, z - 1, x + 1, b + 1, z + dir * 1, S);
  // 前腿
  w.set(x - 1, b, z + dir * 1, D);
  w.set(x + 1, b, z + dir * 1, D);
  // 头
  const hz = z + dir * 1;
  w.box(x - 1, b + 2, hz, x + 1, b + 3, hz, S);
  w.set(x - 1, b + 4, hz, D);                                   // 耳
  w.set(x + 1, b + 4, hz, D);
  w.set(x, b + 2, hz + dir, D);                                 // 吻部
  // 鬃毛与尾
  w.set(x - 1, b + 2, hz - dir, D);
  w.set(x + 1, b + 2, hz - dir, D);
  w.set(x, b + 2, z - dir, D);
  w.set(x, b + 3, z - dir, D);
}

/**
 * 石灯笼柱：木柱顶横臂，红灯笼吊在臂端。
 * 灯笼芯为自发光体素，夜里也透亮；此处黄昏氛围下呈暖红光点。
 */
export function lanternPost(w, x, z) {
  for (let y = 1; y <= 5; y++) w.set(x, y, z, C.woodDark);
  const ax = x > 0 ? x - 1 : x + 1;
  w.set(ax, 5, z, C.woodDark);            // 横臂
  w.set(ax, 4, z, C.lanternGlow, true);   // 灯笼（发光）
  w.set(ax, 3, z, C.lanternRed);          // 灯穗
}

/** 檐下吊灯：挂在屋檐角下的红灯笼。 */
export function eaveLantern(w, x, y, z) {
  w.set(x, y, z, C.lanternGlow, true);
  w.set(x, y - 1, z, C.lanternRed);
}

/** 铜香炉：四足双耳，置于大阶两侧。 */
export function burner(w, x, z) {
  w.box(x - 1, 0, z - 2, x + 1, 0, z + 2, C.stoneDark);          // 石座
  for (const dx of [-1, 1]) for (const dz of [-1, 1]) w.set(x + dx, 1, z + dz, C.bronze);
  w.box(x - 1, 2, z - 1, x + 1, 3, z + 1, C.bronze);             // 炉身
  w.box(x - 2, 4, z - 2, x + 2, 4, z + 2, C.bronze);             // 炉沿
  w.set(x - 2, 5, z, C.bronze);                                  // 双耳
  w.set(x + 2, 5, z, C.bronze);
  w.set(x, 5, z, C.gold);                                        // 顶珠
}

/** 幡旗：高杆红幡（旗面朝南北主视角），金箍收口。 */
export function banner(w, x, z) {
  for (let y = 1; y <= 11; y++) w.set(x, y, z, C.woodDark);
  w.set(x, 12, z, C.gold);
  w.box(x - 1, 7, z, x + 1, 10, z, C.bannerRed);
  w.box(x - 1, 10, z, x + 1, 10, z, C.bannerGold);
}

/** 桧柏：锥形三层冠。 */
export function cypress(w, x, z) {
  for (let y = 0; y <= 2; y++) w.set(x, y, z, C.trunk);
  w.box(x - 1, 3, z - 1, x + 1, 4, z + 1, C.cypress1);
  for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
    if ((dx + dz + x + z) % 2 === 0) w.set(x + dx, 4, z + dz, C.cypress2);
  w.set(x, 5, z, C.cypress2);
  w.set(x, 6, z, C.cypress1);
}

/** 花树：粉色花冠点缀。 */
export function blossomTree(w, x, z) {
  for (let y = 0; y <= 3; y++) w.set(x, y, z, C.trunk);
  w.box(x - 1, 4, z - 1, x + 1, 5, z + 1, C.blossom);
  w.set(x - 1, 5, z, C.blossom2);
  w.set(x + 1, 5, z, C.blossom2);
  w.set(x, 5, z - 1, C.blossom2);
  w.set(x, 6, z, C.blossom);
}
