import { describe, expect, it } from "vitest";
import { NavGraph } from "../src/ai/nav";
import { World } from "../src/core/world";
import { buildLayout, spawnPoints } from "../src/map/layout";

const world = new World(buildLayout());
const t0 = performance.now();
const nav = NavGraph.build(world, [...spawnPoints(0), ...spawnPoints(1)]);
const buildMs = performance.now() - t0;

const node = (x: number, y: number, z: number) => nav.nearest(x, y, z);
const zonesOf = (p: number[]) => new Set(p.map((i) => nav.nodes[i].zone));

describe("nav graph", () => {
  it("builds in reasonable time with a connected spawn-to-spawn route", () => {
    expect(buildMs).toBeLessThan(4000);
    expect(nav.nodes.length).toBeGreaterThan(3000);
    const p = nav.path(node(-47.8, 1.2, 0), node(47.8, 1.2, 0));
    expect(p).not.toBeNull();
  });

  it("the north flank lane connects through the cabin side doors", () => {
    const avoid = (n: { zone: string }) => (n.zone === "deck" || n.zone === "laneS" || n.zone === "platform" ? 50 : 0);
    const p = nav.path(node(-47.8, 1.2, 4.8), node(47.8, 1.2, 4.8), avoid)!;
    expect(p).not.toBeNull();
    expect(zonesOf(p).has("laneN")).toBe(true);
    // 侧门台阶位于 x≈-46.1
    expect(p.some((i) => Math.abs(nav.nodes[i].x + 46.1) < 1 && nav.nodes[i].z > 9.4)).toBe(true);
  });

  it("the red high point is reached only via jump links from the crate chain", () => {
    const top = node(-30, 2.6, 8.2);
    expect(nav.nodes[top].y).toBeCloseTo(2.6, 2);
    const p = nav.path(node(-40, 1.2, 0), top)!;
    expect(p).not.toBeNull();
    let jumps = 0;
    for (let i = 1; i < p.length; i++) if (nav.linkKind(p[i - 1], p[i]) === "jump") jumps++;
    expect(jumps).toBeGreaterThanOrEqual(1);
  });

  it("double-stacked container tops are not part of the graph", () => {
    expect(nav.nodes.some((n) => n.y > 4)).toBe(false);
  });

  it("walk links only climb stair-like slopes; crate-height rises require a jump", () => {
    for (const a of nav.nodes)
      for (const l of a.links) {
        const b = nav.nodes[l.to];
        const dy = Math.abs(b.y - a.y), dh = Math.hypot(b.x - a.x, b.z - a.z);
        // 台阶：每级 0.3 m / 0.4–0.6 m 深
        if (l.kind === "walk") expect(dy).toBeLessThanOrEqual(dh * 0.95 + 0.3);
      }
  });

  it("crate tops need a jump from the deck", () => {
    const crate = node(-24, 1.8, 2.6);
    expect(nav.nodes[crate].y).toBeCloseTo(1.8, 2);
    const into = nav.nodes.flatMap((n) => n.links.filter((l) => l.to === crate).map((l) => ({ from: n, l })));
    for (const { from, l } of into) if (from.y < 1.3) expect(l.kind).toBe("jump");
  });

  it("nearest() does not snap across floors (deck under the platform edge)", () => {
    const deck = node(-33.5, 0, 8.5);
    expect(nav.nodes[deck].y).toBeCloseTo(0, 2);
    const plat = node(-38, 1.2, 8.5);
    expect(nav.nodes[plat].y).toBeCloseTo(1.2, 2);
  });
});
