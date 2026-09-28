import * as THREE from "three";
import { toon, graffitiTex, stencilTex } from "../palette.js";
import { boxTruck, container, barrelCluster, crateStack, cardboardPile, palletStack, ladder, utilityPole } from "../props.js";

const PY = 1.2; // 高台顶面

// T 阵营出生点（北侧卸货区高台）
export function buildTSpawn(kit) {
  // 厢式货运卡车（左）
  boxTruck(kit, -10.6, PY, -12.6, 0.28);
  ladder(kit, -9.1, PY, -10.9, 3.4, 1.35, 0.28);

  // 右侧三层堆叠集装箱（高低两个架枪位）
  container(kit, 10.3, PY, -13.6, 0.02, "#3a5872", "CA-1042");
  container(kit, 13.1, PY, -13.8, -0.05, "#7a4a2c", "TR-2271");
  container(kit, 11.7, PY + 2.62, -13.6, 0.1, "#40584a", "MF-8830");

  // 缝隙穿行提示的小杂物
  crateStack(kit, 8.3, PY, -12.2, 0.4);
  cardboardPile(kit, 14.6, PY, -11.6, 2);

  // 斜坡旁油桶堆与托盘
  barrelCluster(kit, -5.2, PY, -10.9, 0.3);
  palletStack(kit, -5.4, PY, -12.4, 0.25);
  crateStack(kit, 0.6, PY, -15.4, -0.2);
  cardboardPile(kit, -1.6, PY, -14.7, 5);
  palletStack(kit, 2.6, PY, -14.9, -0.4);

  // 电线杆（高台西缘）
  const p1 = utilityPole(kit, -16.1, PY, -11.2, 7);

  // 出生点铁丝网门柱
  kit.box(0.14, 2.2, 0.14, toon(0x3a4046), 4, PY, -10.2, { outline: false });

  // 墙面涂鸦与阵营喷漆
  kit.decal(graffitiTex("RUST", 71, "#b8c4ce"), 3.4, 1.7, -7.2, PY + 0.85, -9.28, { ry: 0 });
  kit.decal(stencilTex("T SPAWN", "#b0743a", 512, 128, "bold 84px Arial Black"), 2.4, 0.6, -12.5, PY + 0.32, -16.66, { ry: Math.PI, opacity: 0.75 });

  return { wireAnchors: [p1] };
}
