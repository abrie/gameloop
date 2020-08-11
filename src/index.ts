export interface GameLoop {
  nextFrame: (time: number) => void;
}

export interface Game {
  integrate: (t: number, dt: number) => void;
  interpolate: (alpha: number) => void;
  reconcile: () => void;
  render: () => void;
}

export function NewGameLoop(game: Game, dt: number): GameLoop {
  var t = 0;
  var accumulator = 0;
  var previousTime = 0;

  const nextFrame = (newTime: number) => {
    const timeDiff = newTime - previousTime;
    previousTime = newTime;

    const frameTime = Math.min(0.25, timeDiff);
    accumulator += frameTime;

    game.reconcile();

    while (accumulator >= dt) {
      game.integrate(t, dt);
      t += dt;
      accumulator -= dt;
    }

    game.interpolate(accumulator / dt);

    game.render();
  };

  return {
    nextFrame,
  };
}
