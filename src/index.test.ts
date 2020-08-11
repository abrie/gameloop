import { Game, NewGameLoop } from './index';

test('Gameloop callbacks are ordered correctly.', () => {
  const events: any[] = [];
  const game: Game = {
    integrate: (_, __) => events.push('integrate'),
    interpolate: _ => events.push('interpolate'),
    reconcile: () => events.push('reconcile'),
    render: () => events.push('render'),
  };

  const dt = 1 / 60;
  const gameloop = NewGameLoop(game, dt);
  gameloop.nextFrame(dt);

  const want = ['reconcile', 'integrate', 'interpolate', 'render'];
  expect(events).toEqual(want);
});

test('Gameloop correctly handles times larger than an even multiple of timestep.', () => {
  const events: any[] = [];
  const game: Game = {
    integrate: (t, dt) => events.push({ event: 'integrate', t, dt }),
    interpolate: alpha => events.push({ event: 'interpolate', alpha }),
    reconcile: () => {},
    render: () => {},
  };

  const dt = 1 / 60;
  const extra = 1 / 120;
  const gameloop = NewGameLoop(game, dt);
  gameloop.nextFrame(dt * 2 + extra);

  expect(events).toHaveLength(3);

  expect(events[0].event).toBe('integrate');
  expect(events[0].t).toBe(0);
  expect(events[0].dt).toBeCloseTo(dt);

  expect(events[1].event).toBe('integrate');
  expect(events[1].t).toBe(dt);
  expect(events[1].dt).toBeCloseTo(dt);

  expect(events[2].event).toBe('interpolate');
  expect(events[2].alpha).toBeCloseTo(extra / dt);
});
