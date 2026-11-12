import * as THREE from "three";
import { Kit, trs } from "./util";

/** Material keys shared by all architecture: ivory stone, pale-gold ornament, cool white roofs. */
export const IVORY = "ivory", GOLD = "gold", ROOF = "roof";

/** A wall panel pierced by a pointed arch. Local x = width, y = 0..h, z = thickness (centred). */
function archPanel(w: number, h: number, t: number, opening = 0.7, spring = 0.45): THREE.BufferGeometry {
  const a = (w * opening) / 2, sp = h * spring, apex = Math.min(h * 0.9, sp + a * 1.9);
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0);
  s.lineTo(-a, 0);
  s.lineTo(-a, sp);
  s.quadraticCurveTo(-a, sp + (apex - sp) * 0.72, 0, apex);
  s.quadraticCurveTo(a, sp + (apex - sp) * 0.72, a, sp);
  s.lineTo(a, 0);
  s.lineTo(w / 2, 0);
  s.lineTo(w / 2, h);
  s.lineTo(-w / 2, h);
  return new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false, curveSegments: 5 }).translate(0, 0, -t / 2);
}

/** Column with a flared base and capital. */
export function column(h: number, r: number, seg = 8): THREE.BufferGeometry {
  const p = (x: number, y: number) => new THREE.Vector2(r * x, h * y);
  return new THREE.LatheGeometry(
    [p(1.55, 0), p(1.55, 0.035), p(1.05, 0.07), p(0.86, 0.9), p(1.45, 0.95), p(1.45, 1), p(0, 1)],
    seg,
  );
}

/** Concave, needle-like roof. */
export function spireRoof(r: number, h: number, seg = 10): THREE.BufferGeometry {
  const p = (x: number, y: number) => new THREE.Vector2(r * x, h * y);
  return new THREE.LatheGeometry([p(1, 0), p(0.6, 0.16), p(0.32, 0.42), p(0.12, 0.74), p(0, 1)], seg);
}

/** Gold finial: orb, collar and spike. */
export function finial(kit: Kit, x: number, y: number, z: number, r: number): void {
  kit.add(GOLD, new THREE.SphereGeometry(r, 8, 6), trs(x, y + r * 0.8, z));
  kit.add(GOLD, new THREE.ConeGeometry(r * 0.5, r * 5, 6), trs(x, y + r * 3.6, z));
}

/**
 * Ring of pointed arches with a column on every corner and a gold coping.
 * `keep(i)` decides which bays still stand, so the same builder makes intact and ruined rings.
 */
export function arcade(
  kit: Kit, x: number, y: number, z: number, R: number, h: number, bays: number,
  t = R * 0.09, keep: (i: number) => boolean = () => true,
): void {
  const w = 2 * R * Math.tan(Math.PI / bays), corner = R / Math.cos(Math.PI / bays);
  const panel = archPanel(w, h, t);
  const col = column(h, Math.max(t * 0.55, w * 0.07));
  const coping = new THREE.BoxGeometry(w, h * 0.03, t * 1.2);
  for (let i = 0; i < bays; i++) {
    if (!keep(i)) continue;
    const a = (i / bays) * Math.PI * 2, b = a + Math.PI / bays, ry = -(a + Math.PI / 2);
    kit.add(IVORY, panel, trs(x + Math.cos(a) * R, y, z + Math.sin(a) * R, ry));
    kit.add(GOLD, coping, trs(x + Math.cos(a) * R, y + h * 1.015, z + Math.sin(a) * R, ry));
    kit.add(IVORY, col, trs(x + Math.cos(b) * corner, y, z + Math.sin(b) * corner));
  }
}

/** One storey of a tower: drum, arcade, gold-banded cornice and a crown of pinnacles. Returns the top height. */
export function tier(kit: Kit, y: number, R: number, h: number, bays: number): number {
  kit.add(IVORY, new THREE.CylinderGeometry(R * 0.74, R * 0.8, h, 28), trs(0, y + h / 2, 0));
  arcade(kit, 0, y, 0, R, h, bays);
  const top = y + h;
  kit.add(GOLD, new THREE.CylinderGeometry(R * 1.07, R * 1.03, h * 0.035, 36), trs(0, top + h * 0.017, 0));
  kit.add(IVORY, new THREE.CylinderGeometry(R * 1.13, R * 1.07, h * 0.05, 36), trs(0, top + h * 0.06, 0));
  const corner = R / Math.cos(Math.PI / bays);
  const pin = spireRoof(R * 0.075, h * 0.34, 6);
  for (let i = 0; i < bays; i++) {
    const b = ((i + 0.5) / bays) * Math.PI * 2;
    kit.add(IVORY, pin, trs(Math.cos(b) * corner, top + h * 0.085, Math.sin(b) * corner));
  }
  return top + h * 0.085;
}

/** Slender tower with a lantern storey, needle roof and gold finial. */
export function spirelet(kit: Kit, x: number, y: number, z: number, r: number, h: number): void {
  const shaft = h * 0.6;
  kit.add(IVORY, new THREE.CylinderGeometry(r * 0.78, r, shaft, 12), trs(x, y + shaft / 2, z));
  kit.add(GOLD, new THREE.CylinderGeometry(r * 1.12, r * 0.95, h * 0.02, 12), trs(x, y + shaft + h * 0.01, z));
  const lantern = new Kit();
  arcade(lantern, 0, 0, 0, r * 0.95, h * 0.1, 8, r * 0.16);
  kit.addKit(lantern, trs(x, y + shaft + h * 0.02, z));
  kit.add(IVORY, new THREE.CylinderGeometry(r * 1.15, r * 1.05, h * 0.02, 12), trs(x, y + shaft + h * 0.13, z));
  kit.add(ROOF, spireRoof(r * 1.1, h * 0.26), trs(x, y + shaft + h * 0.14, z));
  finial(kit, x, y + h, z, r * 0.16);
}

/** Round pavilion: stepped plinth, arcade of pointed arches, needle roof. Returns its total height. */
export function pavilion(kit: Kit, x: number, y: number, z: number, r: number): number {
  const local = new Kit();
  local.add(IVORY, new THREE.CylinderGeometry(r * 1.28, r * 1.4, r * 0.14, 24), trs(0, r * 0.07, 0));
  local.add(IVORY, new THREE.CylinderGeometry(r * 1.12, r * 1.2, r * 0.14, 24), trs(0, r * 0.21, 0));
  local.add(IVORY, new THREE.CylinderGeometry(r * 0.55, r * 0.6, r * 1.5, 16), trs(0, r * 1.03, 0));
  arcade(local, 0, r * 0.28, 0, r, r * 1.5, 10);
  local.add(GOLD, new THREE.CylinderGeometry(r * 1.1, r * 1.06, r * 0.07, 24), trs(0, r * 1.815, 0));
  local.add(IVORY, new THREE.CylinderGeometry(r * 1.18, r * 1.1, r * 0.1, 24), trs(0, r * 1.9, 0));
  local.add(ROOF, spireRoof(r * 1.12, r * 2.1), trs(0, r * 1.95, 0));
  finial(local, 0, r * 4.02, 0, r * 0.11);
  kit.addKit(local, trs(x, y, z));
  return r * 4.6;
}

export interface BaySize {
  /** Length along the road. */
  L: number;
  /** Deck width. */
  W: number;
  /** Height of the arch wall under the deck. */
  H: number;
}

/**
 * One bay of the sky road (local x = along the road, deck top at y = 0): deck, parapets, a pointed
 * arch below and a hanging pier that tapers to a point. `colonnade` adds columns and lintels on top.
 */
export function bridgeBay({ L, W, H }: BaySize, colonnade: boolean): Kit {
  const kit = new Kit();
  const box = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
  kit.add(IVORY, box(L, 4, W), trs(0, -2, 0));
  kit.add(GOLD, box(L, 1.2, W + 1.6), trs(0, -4.6, 0));
  kit.add(IVORY, archPanel(L, H, W * 0.62, 0.78, 0.3), trs(0, -5 - H, 0));
  // Hanging pier under the bay joint, ending in a downward spike.
  kit.add(IVORY, box(L * 0.2, H * 0.5, W * 0.74), trs(-L / 2, -5 - H * 1.25, 0));
  const spike = new THREE.ConeGeometry(L * 0.14, H * 1.1, 4).rotateX(Math.PI).rotateY(Math.PI / 4);
  kit.add(IVORY, spike, trs(-L / 2, -5 - H * 2.05, 0, 0, [1, 1, (W * 0.74) / (L * 0.2)]));
  for (const side of [-1, 1]) {
    const z = side * (W / 2 - 1.2);
    kit.add(IVORY, box(L, 3.2, 1.6), trs(0, 1.6, z));
    if (!colonnade) continue;
    const col = column(H * 0.8, L * 0.035);
    kit.add(IVORY, col, trs(-L / 2, 3.2, z)).add(IVORY, col, trs(0, 3.2, z));
    kit.add(IVORY, box(L, 3.4, 3.4), trs(0, 3.2 + H * 0.8 + 1.7, z));
    kit.add(GOLD, box(L, 0.9, 3.9), trs(0, 3.2 + H * 0.8 + 3.8, z));
  }
  if (colonnade) kit.add(IVORY, box(3, 3, W), trs(-L / 2, 3.2 + H * 0.8 + 1.7, 0));
  return kit;
}
