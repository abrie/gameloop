# Reusable Gameloop Package

Provides a lean, typed, and testable gameloop for use in browsers and node environments. This is implementation follows the ['fix-your-timestep'](https://gafferongames.com/post/fix_your_timestep/) pattern popularized by [Gaffer on Games](https://gafferongames.com/). To use this lib, provide a frame driver (such as `window.requestAnimationFrame`) and implement the following callbacks:

- `integrate`: Apply physics or motion rules.
- `interpolate`: Account for leftover accumulator time.
- `reconcile`: Check for collisions, process inputs, and adjucate world state.
- `render`: Draw to the screen.

## Install

Install the package:

- `npm install @eirba/gameloop -S`
- `yarn add @eirba/gameloop -S`
- `pnpm add @eirba/gameloop`
- or some other package manager...

## Sample Code

Here is an example using `window.requestAnimationFrame()`:

```javascript
import { Game, NewGameLoop } from '@eirba/gameloop';

const game: Game = {
  reconcile: () => scene.reconcile(),
  integrate: (t, dt) => scene.integrate(t, dt),
  interpolate: (alpha) => scene.interpolate(alpha),
  render: () => renderManager.render(scene.renderables()),
};

const gameLoop = NewGameLoop(game, 1 / 60); // 60FPS

const onAnimationFrame = (time: number) => {
  gameLoop.nextFrame(time);
  window.requestAnimationFrame(onAnimationFrame);
};

window.requestAnimationFrame(onAnimationFrame);

```
