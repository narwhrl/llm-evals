import { expect, it } from 'vitest';
import { Game } from '../src/game';

it('completes an untouched default match with bot combat, respawns and bounded state', () => {
  const game = new Game(710283); game.start('red', 'vandal', 'normal');
  const observedLanes = { red: new Set<number>(), blue: new Set<number>() };
  const passages = new Set<number>();
  let maxGrenades = 0, maxSmokes = 0;
  for (let step = 0; step < 600 * 60 && game.phase === 'playing'; step++) {
    game.update(1 / 60);
    if (step % 60 === 0) {
      for (const actor of game.actors) if (actor.ai && Math.abs(actor.body.z) < 25) {
        observedLanes[actor.team].add(Math.sign(actor.body.x));
        if (Math.abs(actor.body.x) > 11.25 && Math.abs(actor.body.z) < 5) passages.add(Math.sign(actor.body.x));
      }
      maxGrenades = Math.max(maxGrenades, game.grenades.length);
      maxSmokes = Math.max(maxSmokes, game.smokes.length);
    }
    game.events.length = 0;
  }
  expect(game.phase).toBe('ended');
  expect(game.score.red).toBeGreaterThan(0); expect(game.score.blue).toBeGreaterThan(0);
  expect(game.score.red + game.score.blue).toBeGreaterThan(15);
  expect(observedLanes.red.size).toBeGreaterThan(1); expect(observedLanes.blue.size).toBeGreaterThan(1);
  expect(passages.size).toBe(2);
  expect(maxGrenades).toBeLessThan(10); expect(maxSmokes).toBeLessThan(10);
  expect(game.actors).toHaveLength(10);
});
