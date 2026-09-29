import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { Game, armorDamage } from '../src/game';
import { findPath } from '../src/navigation';
import { navigationBlocked } from '../src/map';
import { makeBody, moveBody } from '../src/physics';

function isolated() {
  const g = new Game(317); g.start('red', 'vandal', 'normal'); g.now = 5;
  const p = g.player, target = g.actors.find(a => a.team === 'blue')!;
  for (const a of g.actors) if (a !== p && a !== target) { a.alive = false; a.respawnAt = Infinity; }
  p.protectedUntil = 0; target.protectedUntil = 0;
  return { g, p, target };
}

describe('combat rules', () => {
  it('uses the same ray path for open, wood and steel cover', () => {
    const { g, p, target } = isolated();
    target.body.x = -7.1; target.body.z = 1.5;
    const wood = g.traceShot(p, 'vandal', new THREE.Vector3(-7.1, 1, -5), new THREE.Vector3(0, 0, 1), 15);
    expect(wood.target?.id).toBe(target.id); expect(wood.penetrated).toBe(1); expect(wood.damage).toBeGreaterThan(0);
    const woodDamage = wood.damage;
    target.health = 100; target.armor = 100; target.alive = true;
    const clear = g.traceShot(p, 'vandal', new THREE.Vector3(-7.1, 1, -.45), new THREE.Vector3(0, 0, 1), 5);
    expect(clear.target?.id).toBe(target.id); expect(clear.damage).toBeGreaterThan(woodDamage);
    target.body.x = 9.65; target.body.z = 22; target.health = 100; target.alive = true;
    const steel = g.traceShot(p, 'longshot', new THREE.Vector3(9.65, 1, 8), new THREE.Vector3(0, 0, 1), 25);
    expect(steel.block).toContain('starboard-container'); expect(steel.damage).toBe(0);
    expect(target.health).toBe(100);
  });
  it('applies location and armor once, then ends a score-limited match only once', () => {
    const { g, p, target } = isolated(); g.scoreLimit = 1;
    expect(armorDamage(100, 100)).toEqual({ health: 62, armor: 49.4 });
    const point = new THREE.Vector3(target.body.x, 1.5, target.body.z);
    g.damage(p, target, 40, 'limb', point, 'vandal'); expect(target.health).toBe(75.2);
    g.damage(p, target, 300, 'head', point, 'vandal');
    expect(target.alive).toBe(false); expect(target.deaths).toBe(1); expect(p.kills).toBe(1);
    expect(g.score.red).toBe(1); expect(g.phase).toBe('ended'); expect(g.winner).toBe('red');
    g.damage(p, target, 300, 'head', point, 'vandal'); expect(g.score.red).toBe(1); expect(target.deaths).toBe(1);
  });
  it('preserves ammunition when reload is interrupted and restores loadout on respawn', () => {
    const { g, p, target } = isolated(); target.alive = false; target.respawnAt = Infinity;
    for (let i = 0; i < 3; i++) { g.attack(p); g.now += .13; }
    expect(p.gear.vandal.mag).toBe(27); expect(p.gear.vandal.reserve).toBe(90);
    g.reload(p); expect(p.gear.vandal.reloadEnd).toBeGreaterThan(g.now);
    g.switchWeapon(p, 'revolver'); expect(p.gear.vandal.reloadEnd).toBe(0);
    g.switchWeapon(p, 'vandal'); g.reload(p); g.update(2.4);
    expect(p.gear.vandal.mag).toBe(30); expect(p.gear.vandal.reserve).toBe(87);
    const enemy = g.actors.find(a => a.team === 'blue')!; enemy.alive = true; enemy.protectedUntil = 0;
    g.damage(enemy, p, 1000, 'head', new THREE.Vector3(p.body.x, 1, p.body.z), 'longshot');
    expect(p.alive).toBe(false); g.update(3.1);
    expect(p.alive).toBe(true); expect(p.gear.vandal.mag).toBe(30); expect(p.gear.vandal.reserve).toBe(90);
    expect(p.grenades).toEqual({ he: 1, smoke: 1 });
  });
  it('finishes an AI reload once instead of resetting the timer on every frame', () => {
    const { g, p, target } = isolated(); p.alive = false; p.respawnAt = Infinity; target.alive = false; target.respawnAt = Infinity;
    const bot = g.actors.find(a => a.ai && a.team === 'red')!; bot.alive = true;
    bot.gear[bot.primary].mag = 0;
    g.update(1 / 60);
    expect(bot.gear[bot.primary].reloadEnd).toBeGreaterThan(g.now);
    g.update(3);
    expect(bot.gear[bot.primary].reloadEnd).toBe(0);
    expect(bot.gear[bot.primary].mag).toBeGreaterThan(0);
  });
  it('smoke removes a live target from bot sight while leaving bullets independent', () => {
    const { g, p, target } = isolated();
    p.body.x = 5; p.body.z = -10; p.yaw = 0;
    target.body.x = 5; target.body.z = -7;
    const sight = g as unknown as { visible: (a: typeof p, b: typeof p) => boolean };
    expect(sight.visible(p, target)).toBe(true);
    g.smokes.push({ x: 5, y: .9, z: -8.5, radius: 4.3, start: 3, end: 20 });
    expect(sight.visible(p, target)).toBe(false);
    const result = g.traceShot(p, 'vandal', new THREE.Vector3(5, 1, -10), new THREE.Vector3(0, 0, 1), 5);
    expect(result.target?.id).toBe(target.id);
  });
});

describe('movement and navigation', () => {
  it('moves the same distance at 30 and 60 fixed physics updates', () => {
    const a = makeBody(0, -27), b = makeBody(0, -27);
    for (let i = 0; i < 30; i++) moveBody(a, 0, 4.65, 1 / 30);
    for (let i = 0; i < 60; i++) moveBody(b, 0, 4.65, 1 / 60);
    expect(Math.abs(a.z - b.z)).toBeLessThan(.01);
    expect(a.z).toBeGreaterThan(-27);
  });
  it('keeps player travel and automatic fire close at 30, 60 and 144 updates per second', () => {
    const outcomes = [30, 60, 144].map(hz => {
      const g = new Game(817); g.start('red', 'vandal', 'normal');
      for (const a of g.actors) if (!a.player) { a.alive = false; a.respawnAt = Infinity; }
      g.player.body.x = 1.1; g.player.body.z = -27;
      g.input.forward = 1; g.input.fire = true;
      for (let i = 0; i < hz * 2; i++) g.update(1 / hz);
      return { z: g.player.body.z, shots: 30 - g.player.gear.vandal.mag };
    });
    expect(Math.max(...outcomes.map(o => o.z)) - Math.min(...outcomes.map(o => o.z))).toBeLessThan(.03);
    expect(Math.max(...outcomes.map(o => o.shots)) - Math.min(...outcomes.map(o => o.shots))).toBeLessThanOrEqual(1);
    expect(outcomes.every(o => o.shots > 10)).toBe(true);
  });
  it('resets actors, timers and transient combat state on five consecutive matches', () => {
    const g = new Game(817);
    for (let i = 0; i < 5; i++) {
      g.start('red', 'vandal', 'normal');
      expect(g.phase).toBe('playing'); expect(g.actors).toHaveLength(10);
      expect(g.now).toBe(0); expect(g.remaining).toBe(600);
      expect(g.score).toEqual({ red: 0, blue: 0 });
      expect(g.grenades).toHaveLength(0); expect(g.smokes).toHaveLength(0);
      g.update(1 / 60);
      g.grenades.push({ kind: 'he', owner: 0, team: 'red', x: 0, y: 1, z: 0, vx: 0, vy: 0, vz: 0, detonateAt: 2, bounces: 0 });
      g.smokes.push({ x: 0, y: .9, z: 0, radius: 4, start: 0, end: 10 });
    }
  });
  it('finds a continuous ground route across the ship without occupied cells', () => {
    const path = findPath({ x: -5.8, z: -33.2 }, { x: 0, z: 33.2 });
    expect(path.length).toBeGreaterThan(2);
    expect(path.every(p => !navigationBlocked(p.x, p.z, .41))).toBe(true);
  });
  it('walks through both covered side passages with the real body collider', () => {
    for (const x of [-12.05, 12.05]) {
      const body = makeBody(x, -8);
      for (let i = 0; i < 240; i++) moveBody(body, 0, 4.65, 1 / 60);
      expect(body.z).toBeGreaterThan(7);
      expect(Math.abs(body.x - x)).toBeLessThan(.001);
      expect(body.y).toBe(0);
    }
  });
  it('sends multiple bots out of their spawn rooms into the combat deck', () => {
    const g = new Game(710283); g.start('red', 'vandal', 'normal');
    const reached = new Set<number>();
    for (let i = 0; i < 60 * 12; i++) {
      g.update(1 / 60);
      for (const a of g.actors) if (a.ai && Math.abs(a.body.z) < 28) reached.add(a.id);
    }
    expect(reached.size).toBeGreaterThanOrEqual(5);
  });
});
